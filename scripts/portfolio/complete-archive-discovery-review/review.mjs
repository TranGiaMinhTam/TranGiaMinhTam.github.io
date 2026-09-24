import { spawn } from 'node:child_process'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

const root = process.cwd()
const activeMode = process.argv.includes('--active')
const phase = activeMode ? 'active' : 'candidate'
const evidenceRoot = path.join(root, 'artifacts/portfolio/u04-complete-archive')
const screenshotRoot = path.join(evidenceRoot, activeMode ? 'active-screenshots' : 'screenshots')
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const port = activeMode ? 4188 : 4187
const debuggingPort = activeMode ? 9229 : 9228
const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))
const widths = [320, 768, 1280, 1440]
const themes = ['light', 'dark']
const baseCases = widths.flatMap((width) => themes.map((theme) => ({ id: `evidence-${width}-${theme}`, section: 'evidence-library', width, height: 1000, theme })))
const supplementalCases = [
  { id: 'scientific-1440-light', section: 'evidence-library', width: 1440, height: 1000, theme: 'light', group: 'scientific-research' },
  { id: 'competitions-1280-dark', section: 'evidence-library', width: 1280, height: 1000, theme: 'dark', group: 'academic-competitions' },
  { id: 'community-768-light', section: 'evidence-library', width: 768, height: 1000, theme: 'light', group: 'volunteering', forcedColors: true },
  { id: 'scholarships-1440-dark', section: 'evidence-library', width: 1440, height: 1000, theme: 'dark', group: 'scholarships' },
  { id: 'public-speaking-spacing', section: 'evidence-library', width: 1280, height: 1000, theme: 'light', group: 'public-speaking', textSpacing: true },
  { id: 'sport-zoom', section: 'evidence-library', width: 768, height: 1000, theme: 'dark', group: 'sport', zoom: 2 },
  { id: 'contact-1440-light', section: 'contact', width: 1440, height: 1000, theme: 'light' },
  { id: 'contact-320-dark', section: 'contact', width: 320, height: 1000, theme: 'dark', focusAction: true },
]
const cases = [...baseCases, ...supplementalCases]
const expectedGroupCounts = Object.freeze({ 'scientific-research': 46, 'academic-competitions': 20, volunteering: 34, scholarships: 2, 'public-speaking': 1, sport: 2 })

await rm(screenshotRoot, { recursive: true, force: true })
await mkdir(screenshotRoot, { recursive: true })
const previewConfig = activeMode ? 'vite.config.ts' : 'scripts/portfolio/complete-archive-discovery-candidate/vite.config.mjs'
const server = spawn(process.execPath, [path.join(root, 'node_modules/vite/bin/vite.js'), 'preview', '--config', path.join(root, previewConfig), '--host', '127.0.0.1', '--port', String(port), '--strictPort'], { cwd: root, stdio: 'ignore' })
const chromeProfile = await mkdtemp(path.join(tmpdir(), 'u04-archive-chrome-'))
const browser = spawn(chrome, ['--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${debuggingPort}`, `--user-data-dir=${chromeProfile}`, 'about:blank'], { stdio: 'ignore' })

const waitForServer = async () => {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try { if ((await fetch(`http://127.0.0.1:${port}/`)).ok) return } catch { /* bounded retry */ }
    await wait(100)
  }
  throw new Error('U04A_REVIEW_SERVER_UNAVAILABLE')
}
const waitForDebugTarget = async () => {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${debuggingPort}/json`)).json()
      const page = targets.find(({ type }) => type === 'page')
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl
    } catch { /* bounded retry */ }
    await wait(100)
  }
  throw new Error('U04A_CHROME_UNAVAILABLE')
}
const connect = async (url) => {
  const socket = new WebSocket(url)
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true })
    socket.addEventListener('error', reject, { once: true })
  })
  let sequence = 0
  const pending = new Map()
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data)
    const handler = pending.get(message.id)
    if (!handler) return
    pending.delete(message.id)
    if (message.error) handler.reject(new Error(message.error.message))
    else handler.resolve(message.result)
  })
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++sequence
    pending.set(id, { resolve, reject })
    socket.send(JSON.stringify({ id, method, params }))
  })
  return { socket, send }
}

try {
  await waitForServer()
  const cdp = await connect(await waitForDebugTarget())
  await cdp.send('Page.enable')
  await cdp.send('Runtime.enable')
  if (activeMode) {
    await cdp.send('Page.navigate', { url: `http://127.0.0.1:${port}/` })
    await cdp.send('Runtime.evaluate', {
      expression: `new Promise((resolve, reject) => { const start=Date.now(); const check=()=>{ if(document.querySelector('[data-testid="portfolio-observatory"]'))resolve(true); else if(Date.now()-start>8000)reject(new Error('active seed timeout')); else setTimeout(check,25)}; check() })`,
      awaitPromise: true,
    })
  }
  const results = []
  for (const reviewCase of cases) {
    if (activeMode) await cdp.send('Runtime.evaluate', { expression: `localStorage.setItem('portfolio-theme', ${JSON.stringify(reviewCase.theme)})` })
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: reviewCase.width, height: reviewCase.height, deviceScaleFactor: 1, mobile: false })
    await cdp.send('Emulation.setEmulatedMedia', { features: reviewCase.forcedColors ? [{ name: 'forced-colors', value: 'active' }] : [] })
    const query = new URLSearchParams({
      'u04-archive-probe': '1',
      case: reviewCase.id,
      section: reviewCase.section,
      theme: reviewCase.theme,
      ...(reviewCase.group ? { group: reviewCase.group } : {}),
      ...(reviewCase.textSpacing ? { textSpacing: '1' } : {}),
      ...(reviewCase.zoom ? { zoom: String(reviewCase.zoom) } : {}),
      ...(reviewCase.focusAction ? { focusAction: '1' } : {}),
    })
    const activeHash = activeMode ? `#${reviewCase.section}` : ''
    await cdp.send('Page.navigate', { url: `http://127.0.0.1:${port}/?${query}${activeHash}` })
    const evaluation = await cdp.send('Runtime.evaluate', activeMode ? {
      expression: `new Promise((resolve, reject) => {
        const start=Date.now();
        const check=()=>{
          if(!document.querySelector('[data-testid="portfolio-observatory"]') || document.querySelectorAll('button[data-archive-summary]').length!==6){
            if(Date.now()-start>8000)return reject(new Error('active probe timeout'));
            return setTimeout(check,25);
          }
          document.documentElement.style.scrollBehavior='auto';
          document.documentElement.style.fontSize=${JSON.stringify(`${(reviewCase.zoom ?? 1) * 100}%`)};
          if(${Boolean(reviewCase.textSpacing)}){const style=document.createElement('style');style.textContent='*{letter-spacing:.12em!important;word-spacing:.16em!important;line-height:1.8!important}';document.head.append(style)}
          const sectionTarget=document.getElementById(${JSON.stringify(reviewCase.section)});
          sectionTarget?.scrollIntoView({block:'start',behavior:'auto'});
          const group=${JSON.stringify(reviewCase.group ?? '')};
          if(group)document.querySelector('[data-archive-summary="'+CSS.escape(group)+'"]')?.click();
          setTimeout(()=>{
            if(group)document.querySelector('[data-archive-group]')?.scrollIntoView({block:'start',behavior:'auto'});
            if(${Boolean(reviewCase.focusAction)})[...document.querySelectorAll('button')].find(({textContent})=>/open email draft/i.test(textContent??''))?.scrollIntoView({block:'center',behavior:'auto'});
            const sectionRect=sectionTarget?.getBoundingClientRect();
            const resources=performance.getEntriesByType('resource').map(({name})=>name);
            resolve(JSON.stringify({
              caseId:${JSON.stringify(reviewCase.id)},width:window.innerWidth,theme:${JSON.stringify(reviewCase.theme)},overflowPixels:Math.max(0,document.documentElement.scrollWidth-document.documentElement.clientWidth),
              summaryCount:document.querySelectorAll('[data-archive-summary]').length,expandedSummaryCount:document.querySelectorAll('[data-archive-summary][aria-expanded="true"]').length,loadedItemCount:document.querySelectorAll('[data-archive-item]').length,
              dialogCount:document.querySelectorAll('dialog,[role="dialog"],iframe,object,embed').length,contactHeadingCount:[...document.querySelectorAll('h1,h2,h3')].filter(({textContent})=>textContent?.trim()==='Let us connect.').length,
              openDraftActionCount:[...document.querySelectorAll('button')].filter(({textContent})=>/open email draft/i.test(textContent??'')).length,requestedPdfCount:resources.filter((name)=>/\\.pdf(?:$|\\?)/iu.test(name)).length,
              sectionTargetFound:Boolean(sectionTarget),sectionTop:sectionRect?Math.round(sectionRect.top):null,sectionInViewport:Boolean(sectionRect&&sectionRect.top<=160&&sectionRect.bottom>100)
            }));
          },group?800:250);
        };check();
      })`,
      awaitPromise: true,
      returnByValue: true,
    } : {
      expression: `new Promise((resolve, reject) => { const start=Date.now(); const check=()=>{ const node=document.querySelector('#u04-archive-probe-results'); if(node)resolve(node.textContent); else if(Date.now()-start>8000)reject(new Error('probe timeout')); else setTimeout(check,25)}; check() })`,
      awaitPromise: true,
      returnByValue: true,
    })
    const result = JSON.parse(evaluation.result.value)
    result.group = reviewCase.group ?? null
    result.forcedColors = Boolean(reviewCase.forcedColors)
    result.summaryButtonCount = (await cdp.send('Runtime.evaluate', { expression: `document.querySelectorAll('button[data-archive-summary]').length`, returnByValue: true })).result.value
    const screenshot = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
    const target = path.join(screenshotRoot, `${reviewCase.id}.png`)
    await writeFile(target, Buffer.from(screenshot.data, 'base64'))
    result.screenshot = path.relative(root, target).split(path.sep).join('/')
    results.push(result)
  }
  cdp.socket.close()

  const findings = []
  for (const result of results) {
    if (result.overflowPixels > 0) findings.push({ code: 'U04A-UI-OVERFLOW', caseId: result.caseId })
    if (result.summaryCount !== 6 || result.summaryButtonCount !== 6) findings.push({ code: 'U04A-UI-SUMMARIES', caseId: result.caseId })
    if (result.dialogCount !== 0) findings.push({ code: 'U04A-UI-VIEWER-BOUNDARY', caseId: result.caseId })
    if (result.contactHeadingCount !== 1 || result.openDraftActionCount !== 1) findings.push({ code: 'U04A-UI-CONTACT', caseId: result.caseId })
    if (result.requestedPdfCount !== 0) findings.push({ code: 'U04A-PER-EAGER-PDF', caseId: result.caseId })
    if (!result.sectionTargetFound || !result.sectionInViewport) findings.push({ code: 'U04A-UI-SECTION-CAPTURE', caseId: result.caseId })
    if (result.group && (result.expandedSummaryCount !== 1 || result.loadedItemCount !== expectedGroupCounts[result.group])) findings.push({ code: 'U04A-UI-GROUP', caseId: result.caseId })
    if (!result.group && (result.expandedSummaryCount !== 0 || result.loadedItemCount !== 0)) findings.push({ code: 'U04A-UI-INITIAL', caseId: result.caseId })
  }
  const report = {
    schemaVersion: 1,
    phase,
    automatedEngine: 'Google Chrome headless',
    matrix: { caseCount: results.length, screenshotCount: results.length, widths, themes },
    cases: results,
    manualStatus: { firefox: 'unavailable-not-run', safari: 'unavailable-not-run', iosSafari: 'unavailable-not-run' },
    findings,
    ...(activeMode ? { canProceedToActiveReview: findings.length === 0 } : { canProceedToCandidateReview: findings.length === 0 }),
  }
  await writeFile(path.join(evidenceRoot, `${phase}-review.json`), `${JSON.stringify(report, null, 2)}\n`)
  process.stdout.write(`${JSON.stringify({ phase, matrix: report.matrix, findingCount: findings.length, canProceed: findings.length === 0 }, null, 2)}\n`)
  if (findings.length > 0) process.exitCode = 1
} finally {
  server.kill('SIGTERM')
  browser.kill('SIGTERM')
  if (browser.exitCode === null) await new Promise((resolve) => browser.once('exit', resolve))
  await rm(chromeProfile, { recursive: true, force: true })
}
