import { spawn } from 'node:child_process'
import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { createReviewCases, supplementalCases } from './cases.mjs'

const root = process.cwd()
const activeMode = process.argv.includes('--active')
const reviewPhase = activeMode ? 'active' : 'candidate'
const reviewedDist = activeMode ? path.join(root, 'dist') : '/private/tmp/portfolio-u02-masthead-candidate-dist'
const evidenceRoot = path.join(root, 'artifacts/portfolio/u02-masthead-alignment')
const screenshotRoot = path.join(evidenceRoot, activeMode ? 'active-screenshots' : 'screenshots')
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const port = activeMode ? 4183 : 4182
const debuggingPort = activeMode ? 9224 : 9223
const previewConfig = activeMode ? 'vite.config.ts' : 'scripts/portfolio/masthead-alignment-candidate/vite.config.mjs'
const baseline = JSON.parse(await readFile(path.join(evidenceRoot, 'baseline.json'), 'utf8'))

await rm(screenshotRoot, { recursive: true, force: true })
await mkdir(screenshotRoot, { recursive: true })
const server = spawn(process.execPath, [path.join(root, 'node_modules/vite/bin/vite.js'), 'preview', '--config', path.join(root, previewConfig), '--host', '127.0.0.1', '--port', String(port), '--strictPort'], { cwd: root, stdio: 'ignore' })
const chromeProfile = await mkdtemp(path.join(tmpdir(), 'u02-chrome-session-'))
const browser = spawn(chrome, ['--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${debuggingPort}`, `--user-data-dir=${chromeProfile}`, 'about:blank'], { stdio: 'ignore' })

const waitForServer = async () => {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try { if ((await fetch(`http://127.0.0.1:${port}/`)).ok) return } catch { /* retry */ }
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
  throw new Error('U02_REVIEW_SERVER_UNAVAILABLE')
}

const waitForDebugTarget = async () => {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${debuggingPort}/json`)
      const targets = await response.json()
      const page = targets.find((target) => target.type === 'page')
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl
    } catch { /* retry */ }
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
  throw new Error('U02_CHROME_DEBUG_TARGET_UNAVAILABLE')
}

const connectCdp = async (url) => {
  const socket = new WebSocket(url)
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true })
    socket.addEventListener('error', reject, { once: true })
  })
  let sequence = 0
  const pending = new Map()
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data)
    if (!message.id) return
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

const screenshotIds = new Set([
  'masthead-1440-light', 'masthead-1440-dark', 'questions-320-dark', 'questions-1440-light',
  'computational-projects-760-light', 'laboratory-research-1440-light', 'laboratory-research-320-dark',
  'data-stories-760-dark', 'academic-trajectory-1100-light', 'evidence-library-320-light',
  'tools-1440-dark', 'contact-320-dark',
])

try {
  await waitForServer()
  const cdp = await connectCdp(await waitForDebugTarget())
  await cdp.send('Page.enable')
  await cdp.send('Runtime.enable')
  if (activeMode) {
    await cdp.send('Page.addScriptToEvaluateOnNewDocument', { source: `
      window.__u02CumulativeLayoutShift = 0;
      try {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__u02CumulativeLayoutShift += entry.value;
        }).observe({ type: 'layout-shift', buffered: true });
      } catch {}
    ` })
    await cdp.send('Page.navigate', { url: `http://127.0.0.1:${port}/` })
    await cdp.send('Runtime.evaluate', {
      expression: `new Promise((resolve, reject) => { const started = Date.now(); const check = () => { if (document.querySelector('[data-testid="portfolio-observatory"]')) resolve(true); else if (Date.now() - started > 5000) reject(new Error('active seed timeout')); else setTimeout(check, 25); }; check(); })`,
      awaitPromise: true,
    })
  }
  const cases = [...createReviewCases(), ...supplementalCases]
  const results = []
  for (const reviewCase of cases) {
    if (activeMode) await cdp.send('Runtime.evaluate', { expression: `localStorage.setItem('portfolio-theme', ${JSON.stringify(reviewCase.theme)})` })
    const query = new URLSearchParams({
      'u02-probe': '1', case: reviewCase.id, theme: reviewCase.theme,
      zoom: String(reviewCase.zoom), textSpacing: reviewCase.textSpacing ? '1' : '0',
    })
    const hash = reviewCase.section === 'top' ? '' : `#${reviewCase.section}`
    const url = `http://127.0.0.1:${port}/?${query.toString()}${hash}`
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: reviewCase.width, height: reviewCase.height, deviceScaleFactor: 1, mobile: false })
    await cdp.send('Page.navigate', { url })
    let probe
    if (activeMode) {
      const evaluation = await cdp.send('Runtime.evaluate', {
        expression: `new Promise((resolve, reject) => {
          const started = Date.now();
          const check = () => {
            const masthead = document.querySelector('[data-testid="observatory-masthead"]');
            if (!masthead && Date.now() - started <= 5000) return setTimeout(check, 25);
            if (!masthead) return reject(new Error('active probe timeout'));
            const probeStyle = document.createElement('style');
            if (${reviewCase.textSpacing}) probeStyle.textContent = '*{letter-spacing:.12em!important;word-spacing:.16em!important;line-height:1.8!important}';
            document.head.append(probeStyle);
            document.documentElement.style.fontSize = '${reviewCase.zoom * 100}%';
            requestAnimationFrame(() => requestAnimationFrame(() => {
              window.__u02CumulativeLayoutShift = 0;
              setTimeout(() => {
              const themeControl = document.querySelector('[data-testid="theme-control-button"]');
              const parseRgb = (value) => (value.match(/[\\d.]+/g) || []).slice(0, 3).map(Number);
              const luminance = ([red = 0, green = 0, blue = 0]) => [red, green, blue].map((channel) => { const normalized = channel / 255; return normalized <= .03928 ? normalized / 12.92 : ((normalized + .055) / 1.055) ** 2.4; }).reduce((sum, channel, index) => sum + channel * [.2126, .7152, .0722][index], 0);
              const contrast = (foreground, background) => { const first = luminance(parseRgb(foreground)); const second = luminance(parseRgb(background)); return Number(((Math.max(first, second) + .05) / (Math.min(first, second) + .05)).toFixed(2)); };
              const defectSelectors = ['[data-testid="laboratory-research-body"]','[data-testid="computational-projects-body"]','[data-testid="research-questions-body"]','[data-testid="data-stories-body"]','[data-testid="academic-trajectory-body"]','[data-testid="evidence-spectrum-summary"]'];
              const rect = themeControl?.getBoundingClientRect();
              const style = themeControl ? getComputedStyle(themeControl) : null;
                resolve(JSON.stringify({
                caseId: ${JSON.stringify(reviewCase.id)}, theme: ${JSON.stringify(reviewCase.theme)}, width: window.innerWidth, height: window.innerHeight,
                documentOverflowPixels: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
                cumulativeLayoutShift: Number((window.__u02CumulativeLayoutShift || 0).toFixed(4)),
                tableCount: document.querySelectorAll('table').length,
                semanticSummaryCount: document.querySelectorAll('[data-testid$="relationship-summary"]').length,
                sectionCount: document.querySelectorAll('main section[aria-labelledby]').length,
                themeControl: { inMasthead: Boolean(themeControl && masthead.contains(themeControl)), label: themeControl?.getAttribute('aria-label') || null, width: rect ? Number(rect.width.toFixed(2)) : null, height: rect ? Number(rect.height.toFixed(2)) : null, contrast: style ? contrast(style.color, style.backgroundColor) : null },
                resumeActionCount: masthead.querySelectorAll('a[download]').length,
                defectOverflow: defectSelectors.map((selector) => { const element = document.querySelector(selector); return { selector, present: Boolean(element), overflowPixels: element ? Math.max(0, element.scrollWidth - element.clientWidth) : null }; }),
                }));
              }, 250);
            }));
          };
          check();
        })`,
        awaitPromise: true,
        returnByValue: true,
      })
      if (typeof evaluation.result?.value !== 'string') throw new Error('U02_ACTIVE_PROBE_RESULT_MISSING')
      probe = JSON.parse(evaluation.result.value)
    } else {
      const evaluation = await cdp.send('Runtime.evaluate', {
        expression: `new Promise((resolve, reject) => { const started = Date.now(); const check = () => { const node = document.querySelector('#u02-probe-results'); if (node) resolve(node.textContent); else if (Date.now() - started > 5000) reject(new Error('probe timeout')); else setTimeout(check, 25); }; check(); })`,
        awaitPromise: true,
        returnByValue: true,
      })
      const serialized = evaluation.result?.value
      if (typeof serialized !== 'string') throw new Error('U02_PROBE_RESULT_MISSING')
      probe = JSON.parse(serialized)
    }
    if (screenshotIds.has(reviewCase.id)) {
      const scrollExpression = reviewCase.section === 'top'
        ? 'window.scrollTo(0, 0)'
        : `document.getElementById(${JSON.stringify(reviewCase.section)})?.scrollIntoView({ block: 'start' })`
      await cdp.send('Runtime.evaluate', {
        expression: `new Promise((resolve) => { ${scrollExpression}; requestAnimationFrame(() => requestAnimationFrame(resolve)); })`,
        awaitPromise: true,
      })
      const offset = await cdp.send('Runtime.evaluate', {
        expression: reviewCase.section === 'top'
          ? '0'
          : `document.getElementById(${JSON.stringify(reviewCase.section)})?.getBoundingClientRect().top + window.scrollY || 0`,
        returnByValue: true,
      })
      const screenshot = path.join(screenshotRoot, `${reviewCase.id}.png`)
      const captured = await cdp.send('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: true,
        clip: { x: 0, y: offset.result?.value ?? 0, width: reviewCase.width, height: reviewCase.height, scale: 1 },
      })
      await writeFile(screenshot, Buffer.from(captured.data, 'base64'))
      probe.screenshot = path.relative(root, screenshot).split(path.sep).join('/')
    }
    results.push(probe)
  }
  cdp.socket.close()

  const manifest = JSON.parse(await readFile(path.join(reviewedDist, '.vite/manifest.json'), 'utf8'))
  const entry = Object.values(manifest).find((record) => record.isEntry)
  if (!entry) throw new Error('U02_CANDIDATE_ENTRY_MISSING')
  const jsBytes = (await stat(path.join(reviewedDist, entry.file))).size
  const cssBytes = await Promise.all((entry.css ?? []).map(async (file) => (await stat(path.join(reviewedDist, file))).size)).then((values) => values.reduce((sum, value) => sum + value, 0))
  const findings = []
  for (const result of results) {
    if (result.documentOverflowPixels > 0) findings.push({ code: 'U02-DOCUMENT-OVERFLOW', caseId: result.caseId })
    if (result.cumulativeLayoutShift > 0.1) findings.push({ code: 'U02-CLS-BUDGET', caseId: result.caseId })
    if (result.tableCount > 0) findings.push({ code: 'U02-VISIBLE-TABLE', caseId: result.caseId })
    if (!result.themeControl.inMasthead) findings.push({ code: 'U02-THEME-POSITION', caseId: result.caseId })
    if ((result.themeControl.width ?? 0) < 44 || (result.themeControl.height ?? 0) < 44) findings.push({ code: 'U02-TARGET-SIZE', caseId: result.caseId })
    if ((result.themeControl.contrast ?? 0) < 4.5) findings.push({ code: 'U02-CONTRAST', caseId: result.caseId })
    const expectedResumeActionCount = activeMode ? 1 : 0
    if (result.resumeActionCount !== expectedResumeActionCount) findings.push({
      code: activeMode ? 'U03R-RESUME-ACTIVE' : 'U02-RESUME-EARLY',
      caseId: result.caseId,
    })
    for (const defect of result.defectOverflow) if (defect.present && defect.overflowPixels > 0) findings.push({ code: 'U02-DEFECT-OVERFLOW', caseId: result.caseId, target: defect.selector })
  }
  const budgets = {
    javascriptBytes: activeMode ? 327680 : 307200,
    cssBytes: 56320,
    requestCount: baseline.entry.initialRequestCount,
    javascriptRegressionPercent: activeMode ? 8 : 5,
    cssRegressionPercent: 12,
  }
  if (jsBytes > budgets.javascriptBytes || jsBytes > baseline.entry.javascriptBytes * (1 + budgets.javascriptRegressionPercent / 100)) findings.push({ code: 'U02-JS-BUDGET' })
  if (cssBytes > budgets.cssBytes || cssBytes > baseline.entry.cssBytes * 1.12) findings.push({ code: 'U02-CSS-BUDGET' })
  const report = {
    schemaVersion: 1,
    phase: reviewPhase,
    automatedEngine: 'Google Chrome headless',
    cases: results,
    matrix: { baseCaseCount: createReviewCases().length, supplementalCaseCount: supplementalCases.length, screenshotCount: results.filter(({ screenshot }) => screenshot).length },
    manualStatus: { firefox: 'pending', safari: 'pending', iosSafari: 'pending' },
    performance: { baseline: baseline.entry, candidate: { javascriptBytes: jsBytes, cssBytes, initialRequestCount: 3 }, budgets },
    findings,
    canProceedToCandidateReview: findings.length === 0,
  }
  await writeFile(path.join(evidenceRoot, `${reviewPhase}-review.json`), `${JSON.stringify(report, null, 2)}\n`)
  process.stdout.write(`${JSON.stringify({ matrix: report.matrix, performance: report.performance, findingCount: findings.length, canProceedToCandidateReview: report.canProceedToCandidateReview }, null, 2)}\n`)
  if (findings.length > 0) process.exitCode = 1
} finally {
  server.kill('SIGTERM')
  browser.kill('SIGTERM')
  if (browser.exitCode === null) await new Promise((resolve) => browser.once('exit', resolve))
  await rm(chromeProfile, { recursive: true, force: true })
}
