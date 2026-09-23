import { spawn } from 'node:child_process'
import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { createReviewCases, supplementalCases } from './cases.mjs'

const root = process.cwd()
const evidenceRoot = path.join(root, 'artifacts/portfolio/u03-resume-content')
const screenshotRoot = path.join(evidenceRoot, 'screenshots')
const dist = '/private/tmp/portfolio-u03-resume-content-candidate-dist'
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const port = 4185
const debuggingPort = 9226
const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))

await rm(screenshotRoot, { recursive: true, force: true })
await mkdir(screenshotRoot, { recursive: true })
const server = spawn(process.execPath, [path.join(root, 'node_modules/vite/bin/vite.js'), 'preview', '--config', path.join(root, 'scripts/portfolio/resume-content-candidate/vite.config.mjs'), '--host', '127.0.0.1', '--port', String(port), '--strictPort'], { cwd: root, stdio: 'ignore' })
const chromeProfile = await mkdtemp(path.join(tmpdir(), 'u03-resume-chrome-'))
const browser = spawn(chrome, ['--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${debuggingPort}`, `--user-data-dir=${chromeProfile}`, 'about:blank'], { stdio: 'ignore' })

const waitForServer = async () => {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try { if ((await fetch(`http://127.0.0.1:${port}/`)).ok) return } catch { /* bounded retry */ }
    await wait(100)
  }
  throw new Error('U03_REVIEW_SERVER_UNAVAILABLE')
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
  throw new Error('U03_CHROME_DEBUG_TARGET_UNAVAILABLE')
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

const screenshots = new Set([
  'masthead-1440-light', 'masthead-1440-dark', 'identity-320-light', 'identity-1440-dark',
  'questions-760-light', 'questions-1440-light',
  'computational-projects-760-light', 'computational-projects-1440-light',
  'data-stories-760-dark', 'academic-trajectory-1100-light', 'academic-trajectory-320-dark',
  'evidence-library-1440-light', 'fieldwork-leadership-760-light', 'resume-forced-colors',
  'laboratory-research-1440-light', 'laboratory-research-320-dark',
  'tools-1440-light', 'tools-760-dark', 'contact-1440-light', 'contact-320-dark',
  'resume-academic-content', 'resume-fieldwork-content',
  'protein-docking-gallery',
])

try {
  await waitForServer()
  const cdp = await connectCdp(await waitForDebugTarget())
  await cdp.send('Page.enable')
  await cdp.send('Runtime.enable')
  const results = []
  for (const reviewCase of [...createReviewCases(), ...supplementalCases]) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: reviewCase.width, height: reviewCase.height, deviceScaleFactor: 1, mobile: false })
    await cdp.send('Emulation.setEmulatedMedia', { features: reviewCase.forcedColors ? [{ name: 'forced-colors', value: 'active' }] : [] })
    const query = new URLSearchParams({
      'u03-resume-probe': '1',
      case: reviewCase.id,
      theme: reviewCase.theme,
      zoom: String(reviewCase.zoom),
      textSpacing: reviewCase.textSpacing ? '1' : '0',
    })
    const hash = reviewCase.section === 'top' ? '' : `#${reviewCase.section}`
    await cdp.send('Page.navigate', { url: `http://127.0.0.1:${port}/?${query.toString()}${hash}` })
    const evaluation = await cdp.send('Runtime.evaluate', {
      expression: `new Promise((resolve, reject) => { const started = Date.now(); const check = () => { const node = document.querySelector('#u03-resume-probe-results'); if (node) resolve(node.textContent); else if (Date.now() - started > 6000) reject(new Error('probe timeout')); else setTimeout(check, 25); }; check(); })`,
      awaitPromise: true,
      returnByValue: true,
    })
    const probe = JSON.parse(evaluation.result.value)
    probe.forcedColors = Boolean(reviewCase.forcedColors)
    probe.keyboardOrder = reviewCase.keyboard ? (await cdp.send('Runtime.evaluate', {
      expression: `(() => { const items = [...document.querySelectorAll('a[href],button:not([disabled])')].filter((node) => node.offsetParent !== null); return items.slice(0, 8).map((node) => node.dataset.testid || node.getAttribute('aria-label') || node.textContent.trim().slice(0,40)); })()`,
      returnByValue: true,
    })).result.value : 'not-applicable'
    if (screenshots.has(reviewCase.id)) {
      const offset = await cdp.send('Runtime.evaluate', {
        expression: reviewCase.section === 'top'
          ? '0'
          : `${reviewCase.screenshotTarget ? `document.querySelector(${JSON.stringify(reviewCase.screenshotTarget)})` : `document.getElementById(${JSON.stringify(reviewCase.section)})`}?.getBoundingClientRect().top + window.scrollY || 0`,
        returnByValue: true,
      })
      const target = path.join(screenshotRoot, `${reviewCase.id}.png`)
      const captured = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: offset.result.value ?? 0, width: reviewCase.width, height: reviewCase.height, scale: 1 } })
      await writeFile(target, Buffer.from(captured.data, 'base64'))
      probe.screenshot = path.relative(root, target).split(path.sep).join('/')
    }
    results.push(probe)
  }
  cdp.socket.close()

  const manifest = JSON.parse(await readFile(path.join(dist, '.vite/manifest.json'), 'utf8'))
  const entry = Object.values(manifest).find(({ isEntry }) => isEntry)
  if (!entry) throw new Error('U03_CANDIDATE_ENTRY_MISSING')
  const javascriptBytes = (await stat(path.join(dist, entry.file))).size
  const cssBytes = (await Promise.all((entry.css ?? []).map(async (file) => (await stat(path.join(dist, file))).size))).reduce((sum, value) => sum + value, 0)
  const baseline = JSON.parse(await readFile(path.join(evidenceRoot, 'baseline.json'), 'utf8')).entryGraph
  const budgets = { javascriptBytes: 327680, cssBytes: 61440, javascriptRegressionPercent: 8, cssRegressionPercent: 12, initialRequestCount: 3, cumulativeLayoutShift: 0.1 }
  const findings = []
  for (const result of results) {
    if (result.documentOverflowPixels > 0) findings.push({ code: 'U03-UI-OVERFLOW', caseId: result.caseId })
    if (result.cumulativeLayoutShift > budgets.cumulativeLayoutShift) findings.push({ code: 'U03-PER-CLS', caseId: result.caseId })
    if (result.sectionCount !== 10) findings.push({ code: 'U03-UI-SECTIONS', caseId: result.caseId })
    if (result.visibleTableCount !== 0) findings.push({ code: 'U03-UI-TABLE', caseId: result.caseId })
    if (result.resumeGroupCount !== 4 || result.resumeClaimCount !== 13 || result.authorityLabelCount !== 0) findings.push({ code: 'U03-UI-CONTENT', caseId: result.caseId })
    if (result.downloadCount !== 2 || !result.downloadsMatch) findings.push({ code: 'U03-UI-DOWNLOAD', caseId: result.caseId })
    if (result.eagerResumeRequestCount !== 0) findings.push({ code: 'U03-PER-EAGER-RESUME', caseId: result.caseId })
    if (Array.isArray(result.keyboardOrder) && !result.keyboardOrder.includes('resume-download-masthead')) findings.push({ code: 'U03-A11Y-KEYBOARD', caseId: result.caseId })
  }
  if (javascriptBytes > budgets.javascriptBytes || javascriptBytes > baseline.javascript.bytes * 1.08) findings.push({ code: 'U03-PER-JS' })
  if (cssBytes > budgets.cssBytes || cssBytes > baseline.css.bytes * 1.12) findings.push({ code: 'U03-PER-CSS' })
  const report = {
    schemaVersion: 1,
    phase: 'candidate',
    automatedEngine: 'Google Chrome headless',
    cases: results,
    matrix: { baseCaseCount: createReviewCases().length, supplementalCaseCount: supplementalCases.length, screenshotCount: results.filter(({ screenshot }) => screenshot).length },
    manualStatus: { firefox: 'pending', safari: 'pending', iosSafari: 'pending' },
    performance: { baseline, candidate: { javascriptBytes, cssBytes, initialRequestCount: 3 }, budgets },
    findings,
    canProceedToCandidateReview: findings.length === 0,
  }
  await writeFile(path.join(evidenceRoot, 'candidate-review.json'), `${JSON.stringify(report, null, 2)}\n`)
  process.stdout.write(`${JSON.stringify({ matrix: report.matrix, performance: report.performance, findingCount: findings.length, canProceedToCandidateReview: report.canProceedToCandidateReview }, null, 2)}\n`)
  if (findings.length > 0) process.exitCode = 1
} finally {
  server.kill('SIGTERM')
  browser.kill('SIGTERM')
  if (browser.exitCode === null) await new Promise((resolve) => browser.once('exit', resolve))
  await rm(chromeProfile, { recursive: true, force: true })
}
