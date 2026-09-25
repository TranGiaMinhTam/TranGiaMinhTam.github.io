import { spawn } from 'node:child_process'
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

const root = process.cwd()
const activeMode = process.argv.includes('--active')
const phase = activeMode ? 'active' : 'candidate'
const evidenceRoot = path.join(root, 'artifacts/portfolio/u05-media-viewers')
const screenshotRoot = path.join(evidenceRoot, activeMode ? 'active-screenshots' : 'screenshots')
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const port = activeMode ? 4192 : 4191
const debuggingPort = activeMode ? 9232 : 9231
const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))
const cases = [
  ...[320, 768, 1280, 1440].flatMap((width) => ['light', 'dark'].map((theme) => ({ id: `base-${width}-${theme}`, width, height: 1000, theme, section: 'identity' }))),
  { id: 'pdf-1440-light', width: 1440, height: 1000, theme: 'light', section: 'computational-projects', action: 'pdf' },
  { id: 'single-image-1280-dark', width: 1280, height: 1000, theme: 'dark', section: 'computational-projects', action: 'single-image' },
  { id: 'archive-image-768-light', width: 768, height: 1000, theme: 'light', section: 'evidence-library', action: 'archive-image' },
  { id: 'resume-pdf-320-dark', width: 320, height: 1000, theme: 'dark', section: 'identity', action: 'resume', textSpacing: true },
  { id: 'image-zoom-768-dark', width: 768, height: 1000, theme: 'dark', section: 'computational-projects', action: 'single-image', zoom: 2 },
  { id: 'pdf-forced-colors-reduced', width: 1280, height: 1000, theme: 'light', section: 'computational-projects', action: 'pdf', forcedColors: true, reducedMotion: true },
  { id: 'archive-summary-1440-light', width: 1440, height: 1000, theme: 'light', section: 'evidence-library' },
  { id: 'archive-cards-1440-light', width: 1440, height: 1000, theme: 'light', section: 'evidence-library', action: 'archive-cards' },
  { id: 'data-stories-1440-light', width: 1440, height: 1000, theme: 'light', section: 'data-stories' },
  { id: 'data-stories-768-dark', width: 768, height: 1000, theme: 'dark', section: 'data-stories' },
  { id: 'methods-tools-1280-light', width: 1280, height: 1000, theme: 'light', section: 'tools' },
  { id: 'fieldwork-1280-dark', width: 1280, height: 1000, theme: 'dark', section: 'fieldwork-leadership' },
  { id: 'contact-1440-light', width: 1440, height: 1000, theme: 'light', section: 'contact' },
  { id: 'contact-320-dark', width: 320, height: 1000, theme: 'dark', section: 'contact' },
  { id: 'future-innovator-preview-1280-light', width: 1280, height: 1000, theme: 'light', section: 'data-stories', action: 'future-preview' },
  { id: 'contact-action-768-dark', width: 768, height: 1000, theme: 'dark', section: 'contact', action: 'contact-button' },
]

await rm(screenshotRoot, { recursive: true, force: true })
await mkdir(screenshotRoot, { recursive: true })
const previewConfig = activeMode ? 'vite.config.ts' : 'scripts/portfolio/pdf-image-detail-viewers-candidate/vite.config.mjs'
const server = spawn(process.execPath, [path.join(root, 'node_modules/vite/bin/vite.js'), 'preview', '--config', path.join(root, previewConfig), '--host', '127.0.0.1', '--port', String(port), '--strictPort'], { cwd: root, stdio: 'ignore' })
const profile = await mkdtemp(path.join(tmpdir(), 'u05-media-viewer-chrome-'))
const browser = spawn(chrome, ['--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${debuggingPort}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' })

const waitForServer = async () => {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try { if ((await fetch(`http://127.0.0.1:${port}/`)).ok) return } catch { /* bounded retry */ }
    await wait(100)
  }
  throw new Error('U05_REVIEW_SERVER_UNAVAILABLE')
}
const waitForTarget = async () => {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${debuggingPort}/json`)).json()
      const page = targets.find(({ type }) => type === 'page')
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl
    } catch { /* bounded retry */ }
    await wait(100)
  }
  throw new Error('U05_CHROME_UNAVAILABLE')
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

const actionExpression = (reviewCase) => `new Promise((resolve, reject) => {
  const started=Date.now();
  const ready=()=>{
    if(!document.querySelector('[data-testid="portfolio-observatory"]')){if(Date.now()-started>8000)return reject(new Error('portfolio timeout'));return setTimeout(ready,30)}
    document.documentElement.style.scrollBehavior='auto';
    document.documentElement.style.fontSize=${JSON.stringify(`${(reviewCase.zoom ?? 1) * 100}%`)};
    if(${Boolean(reviewCase.textSpacing)}){const style=document.createElement('style');style.textContent='*:not(svg):not(path){letter-spacing:.12em!important;word-spacing:.16em!important;line-height:1.8!important}';document.head.append(style)}
    const section=document.getElementById(${JSON.stringify(reviewCase.section)});section?.scrollIntoView({block:'start',behavior:'auto'});
    const action=${JSON.stringify(reviewCase.action ?? '')};
    if(action==='pdf')document.querySelector('[data-testid="computational-projects-publication-protein-docking-publication-evidence-link"]')?.click();
    if(action==='single-image')document.querySelector('[data-testid="computational-projects-figure-docking-conference-poster-evidence-link"]')?.click();
    if(action==='resume')document.querySelector('[data-testid="resume-download-identity-preview-button"]')?.click();
    if(action==='archive-image'||action==='archive-cards')document.querySelector('[data-archive-summary="scientific-research"]')?.click();
    const finish=()=>{
      if((action==='archive-image'||action==='archive-cards')&&!document.querySelector('[data-archive-group]'))return setTimeout(finish,40);
      if(action==='archive-image')document.querySelector('[data-archive-kind="image"] button')?.click();
      if(action==='archive-cards')document.querySelector('[data-archive-kind]')?.scrollIntoView({block:'start',behavior:'auto'});
      if(action==='future-preview')document.getElementById('future-innovator-preview-title')?.closest('section')?.scrollIntoView({block:'center',behavior:'auto'});
      if(action==='contact-button')document.querySelector('[data-testid="contact-email-draft-button"]')?.scrollIntoView({block:'center',behavior:'auto'});
      if(['pdf','single-image','resume','archive-image'].includes(action)&&!document.querySelector('[data-testid="media-viewer-dialog"]'))return setTimeout(finish,40);
      if((action==='pdf'||action==='resume')&&!document.querySelector('[data-testid="media-viewer-pdf-body"]'))return setTimeout(finish,40);
      if((action==='single-image'||action==='archive-image')&&!document.querySelector('[data-testid="media-viewer-position"]'))return setTimeout(finish,40);
      setTimeout(()=>resolve(true),250);
    };
    finish();
  };ready();
})`

try {
  await waitForServer()
  const cdp = await connect(await waitForTarget())
  await cdp.send('Page.enable')
  await cdp.send('Runtime.enable')
  const results = []
  for (const reviewCase of cases) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: reviewCase.width, height: reviewCase.height, deviceScaleFactor: 1, mobile: false })
    await cdp.send('Emulation.setEmulatedMedia', { features: [
      ...(reviewCase.forcedColors ? [{ name: 'forced-colors', value: 'active' }] : []),
      ...(reviewCase.reducedMotion ? [{ name: 'prefers-reduced-motion', value: 'reduce' }] : []),
    ] })
    await cdp.send('Page.navigate', { url: `http://127.0.0.1:${port}/#${reviewCase.section}` })
    await cdp.send('Runtime.evaluate', { expression: `new Promise((resolve)=>{const run=()=>{if(document.querySelector('[data-testid="portfolio-observatory"]')){localStorage.setItem('portfolio-theme',${JSON.stringify(reviewCase.theme)});resolve(true)}else setTimeout(run,25)};run()})`, awaitPromise: true })
    await cdp.send('Page.reload')
    await cdp.send('Runtime.evaluate', { expression: actionExpression(reviewCase), awaitPromise: true })
    const evaluation = await cdp.send('Runtime.evaluate', { expression: `JSON.stringify((()=>{const dialog=document.querySelector('[data-testid="media-viewer-dialog"]');const active=document.activeElement;const resources=performance.getEntriesByType('resource').map(({name})=>name);return {overflowPixels:Math.max(0,document.documentElement.scrollWidth-document.documentElement.clientWidth),dialogCount:document.querySelectorAll('[data-testid="media-viewer-dialog"]').length,dialogName:dialog?.querySelector('h2')?.textContent??null,closeFocused:Boolean(active?.matches('[data-testid="media-viewer-close-button"]')),mainInert:document.querySelector('#scan-field')?.hasAttribute('inert')??false,position:dialog?.querySelector('[data-testid="media-viewer-position"]')?.textContent??null,previousDisabled:dialog?.querySelector('[data-testid="media-viewer-previous-button"]')?.disabled??null,nextDisabled:dialog?.querySelector('[data-testid="media-viewer-next-button"]')?.disabled??null,pdfFrameCount:dialog?.querySelectorAll('iframe').length??0,requestedPdfCount:resources.filter((name)=>/\\.pdf(?:$|\\?)/i.test(name)).length}})())`, returnByValue: true })
    const result = JSON.parse(evaluation.result.value)
    if (reviewCase.action === 'archive-image') {
      await cdp.send('Runtime.evaluate', { expression: `document.querySelector('[data-testid="media-viewer-next-button"]:not(:disabled)')?.click()` })
      const position = await cdp.send('Runtime.evaluate', { expression: `document.querySelector('[data-testid="media-viewer-position"]')?.textContent??null`, returnByValue: true })
      result.afterNextPosition = position.result.value
    }
    const screenshot = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
    const screenshotPath = path.join(screenshotRoot, `${reviewCase.id}.png`)
    await writeFile(screenshotPath, Buffer.from(screenshot.data, 'base64'))
    result.caseId = reviewCase.id
    result.action = reviewCase.action ?? null
    result.screenshot = path.relative(root, screenshotPath).split(path.sep).join('/')
    if (['pdf', 'single-image', 'resume', 'archive-image'].includes(reviewCase.action)) {
      await cdp.send('Runtime.evaluate', { expression: `document.querySelector('[data-testid="media-viewer-close-button"]')?.click()` })
      await wait(50)
      const restored = await cdp.send('Runtime.evaluate', { expression: `!document.querySelector('[data-testid="media-viewer-dialog"]')&&!document.querySelector('#scan-field')?.hasAttribute('inert')`, returnByValue: true })
      result.closeCleanupPassed = restored.result.value
    }
    results.push(result)
  }
  cdp.socket.close()
  const findings = []
  for (const result of results) {
    if (result.overflowPixels > 0) findings.push({ code: 'U05-UI-OVERFLOW', caseId: result.caseId })
    if (['pdf', 'single-image', 'resume', 'archive-image'].includes(result.action) && (result.dialogCount !== 1 || !result.closeFocused || !result.mainInert || !result.closeCleanupPassed)) findings.push({ code: 'U05-UI-DIALOG', caseId: result.caseId })
    if ((!result.action || ['archive-cards', 'future-preview', 'contact-button'].includes(result.action)) && (result.dialogCount !== 0 || result.requestedPdfCount !== 0)) findings.push({ code: 'U05-UI-EAGER-MEDIA', caseId: result.caseId })
    if (result.action === 'single-image' && (result.position !== 'Image 1 of 1' || !result.previousDisabled || !result.nextDisabled)) findings.push({ code: 'U05-UI-SINGLE-IMAGE', caseId: result.caseId })
    if (result.action === 'archive-image' && (!/^Image 2 of /u.test(result.afterNextPosition ?? '') || result.nextDisabled === true)) findings.push({ code: 'U05-UI-GROUP-NAVIGATION', caseId: result.caseId })
    if ((result.action === 'pdf' || result.action === 'resume') && result.pdfFrameCount !== 1) findings.push({ code: 'U05-UI-PDF', caseId: result.caseId })
  }
  const report = { schemaVersion: 1, phase, automatedEngine: 'Google Chrome headless', matrix: { caseCount: results.length, screenshotCount: results.length, widths: [320, 768, 1280, 1440], themes: ['light', 'dark'] }, cases: results, manualStatus: { firefox: 'unavailable-not-run', safari: 'unavailable-not-run', iosSafari: 'unavailable-not-run' }, findings, canProceed: findings.length === 0 }
  await writeFile(path.join(evidenceRoot, `${phase}-review.json`), `${JSON.stringify(report, null, 2)}\n`)
  process.stdout.write(`${JSON.stringify({ matrix: report.matrix, findingCount: findings.length, canProceed: report.canProceed }, null, 2)}\n`)
  if (!report.canProceed) process.exitCode = 1
} finally {
  server.kill('SIGTERM')
  const browserExit = browser.exitCode === null
    ? new Promise((resolve) => browser.once('exit', resolve))
    : Promise.resolve()
  browser.kill('SIGTERM')
  await Promise.race([browserExit, wait(2000)])
  await rm(profile, { recursive: true, force: true })
}
