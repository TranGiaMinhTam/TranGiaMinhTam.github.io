import { execFileSync, spawnSync } from 'node:child_process'
import crypto from 'node:crypto'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

describe('U-01 and U-02 portfolio boundary', () => {
  it('passes the machine-readable boundary inspector', () => {
    const report = JSON.parse(execFileSync(process.execPath, ['scripts/portfolio/check-boundaries.mjs'], { encoding: 'utf8' }))
    expect(report).toMatchObject({ canProceed: true, findings: [] })
  })

  it('keeps U-03 inside its verified two-body boundary before activation', () => {
    const report = JSON.parse(execFileSync(process.execPath, ['scripts/portfolio/check-boundaries.mjs', '--mode', 'identity-source'], { encoding: 'utf8' }))
    expect(report).toMatchObject({ canProceed: true, findings: [] })
  })

  it('keeps raw assets and rejected dependencies outside the isolated source', () => {
    const files = fs.readdirSync(path.resolve('src/portfolio'), { recursive: true }).filter((item): item is string => typeof item === 'string' && /\.(?:ts|tsx|css)$/.test(item) && !/\.test\.[^.]+$/.test(item))
    const source = files.map((item) => fs.readFileSync(path.resolve('src/portfolio', item), 'utf8')).join('\n')
    expect(source).not.toMatch(/assets\/minh-tam\/source\//)
    expect(source).not.toMatch(/from\s+['"](?:@chakra-ui|tailwindcss|@tailwindcss)/)
    expect(source).not.toMatch(/!important\b/)
    const activeEntry = ['src/App.tsx', 'src/main.tsx']
      .map((entry) => fs.readFileSync(path.resolve(entry), 'utf8'))
      .join('\n')
    if (activeEntry.includes('PortfolioExperience')) {
      expect(activeEntry).toMatch(/portfolio\/shell\/PortfolioExperience/)
      expect(activeEntry).not.toMatch(/(?:Provider|App\.css|index\.css|getPortfolioTemplate|usePortfolioLayout)/)
    } else {
      expect(activeEntry).not.toMatch(/(?:from\s+|import\s+)['"](?:\.\.\/|\.\/)*portfolio(?:\/|['"])/)
    }
  })

  it('returns machine-readable failures for representative boundary, recovery, and measurement fixtures', () => {
    const scripts = path.resolve('scripts/portfolio')

    const boundaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'u01-boundary-fixture-'))
    fs.mkdirSync(path.join(boundaryRoot, 'src/portfolio'), { recursive: true })
    fs.writeFileSync(path.join(boundaryRoot, 'src/portfolio/bad.ts'), "import ui from '@chakra-ui/react'\nvoid ui\n")
    const boundary = spawnSync(process.execPath, [path.join(scripts, 'check-boundaries.mjs')], { cwd: boundaryRoot, encoding: 'utf8' })
    expect(boundary.status).toBe(1)
    expect(JSON.parse(boundary.stdout).findings[0].code).toBe('BND-001')

    const recoveryRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'u01-recovery-fixture-'))
    const payload = path.join(recoveryRoot, '.aidlc-recovery/test')
    fs.mkdirSync(path.join(recoveryRoot, 'artifacts/portfolio/u01'), { recursive: true })
    fs.mkdirSync(path.join(recoveryRoot, 'src/assets/minh-tam/source'), { recursive: true })
    fs.mkdirSync(payload, { recursive: true })
    fs.writeFileSync(path.join(payload, 'tracked.patch'), 'changed')
    fs.writeFileSync(path.join(recoveryRoot, 'empty-list'), '')
    execFileSync('tar', ['-czf', path.join(payload, 'untracked.tar.gz'), '-T', path.join(recoveryRoot, 'empty-list')])
    const emptyInventoryHash = crypto.createHash('sha256').update('\n').digest('hex')
    fs.writeFileSync(path.join(recoveryRoot, 'artifacts/portfolio/u01/recovery-manifest.json'), JSON.stringify({ payloadDirectory: '.aidlc-recovery/test', trackedPatch: { path: 'tracked.patch', sha256: 'incorrect' }, untrackedArchive: { path: 'untracked.tar.gz', sha256: crypto.createHash('sha256').update(fs.readFileSync(path.join(payload, 'untracked.tar.gz'))).digest('hex'), memberCount: 0 }, protectedSourceEvidence: { path: 'src/assets/minh-tam/source', fileCount: 0, inventorySha256: emptyInventoryHash } }))
    fs.writeFileSync(path.join(recoveryRoot, 'artifacts/portfolio/u01/recovery-verification.json'), JSON.stringify({ normalizedInventoryMatched: true, withinObjective: true }))
    const recovery = spawnSync(process.execPath, [path.join(scripts, 'verify-recovery.mjs')], { cwd: recoveryRoot, encoding: 'utf8' })
    expect(recovery.status).toBe(1)
    expect(JSON.parse(recovery.stdout).findings[0].code).toBe('REC-003')

    const measureRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'u01-measure-fixture-'))
    fs.mkdirSync(path.join(measureRoot, 'dist/.vite'), { recursive: true })
    fs.mkdirSync(path.join(measureRoot, 'dist/assets'), { recursive: true })
    fs.mkdirSync(path.join(measureRoot, 'artifacts/portfolio/u01'), { recursive: true })
    fs.writeFileSync(path.join(measureRoot, 'dist/assets/main.js'), 'x'.repeat(100))
    fs.writeFileSync(path.join(measureRoot, 'dist/index.html'), '<script src="/assets/main.js"></script>')
    fs.writeFileSync(path.join(measureRoot, 'dist/.vite/manifest.json'), JSON.stringify({ 'index.html': { file: 'assets/main.js', isEntry: true } }))
    fs.writeFileSync(path.join(measureRoot, 'artifacts/portfolio/u01/baseline.json'), JSON.stringify({ entryGraph: { javascript: { bytes: 50 }, css: { bytes: 0 } } }))
    const measure = spawnSync(process.execPath, [path.join(scripts, 'measure-build.mjs')], { cwd: measureRoot, encoding: 'utf8' })
    expect(measure.status).toBe(1)
    expect(JSON.parse(measure.stdout).findings[0].code).toBe('PER-004')
  })
})
