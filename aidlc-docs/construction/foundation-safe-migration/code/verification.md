# U-01 Verification

## Result

U-01 passes its focused tests, the complete repository test suite, lint, production build, source boundary inspection, and recovery verification. The inactive foundation adds zero bytes to the current eager JavaScript and CSS graph. Recovery remains verified and the raw evidence inventory is unchanged.

## Environment and Commands

| Command | Result |
| --- | --- |
| `npm run test:portfolio` | Passed: 8 files, 18 tests |
| `npm test` | Passed: 16 files, 63 tests |
| `npm run lint` | Passed with no findings |
| `npm run build` | Passed: 1,589 modules; Vite 3.69 seconds |
| `npm run check:portfolio` | Passed: 0 findings |
| `npm run verify:recovery` | Passed: payloads, 19 archive members, 104 protected files, and rehearsal evidence verified |
| `npm run measure:portfolio -- --output artifacts/portfolio/u01/post-unit.json` | Passed the no-regression gate |
| `npm ls --all` | Passed; dependency tree readable |
| `npm audit --omit=dev --json` | Completed after approved network access; 6 existing advisories recorded |

Runtime versions were Node v24.0.0, npm 11.3.0, Vite 7.3.0, and TypeScript 5.9.3. The package lock remained unchanged at SHA-256 `db382652e91d7bd4ab3c154cf79d53b6b26ecb4430efe5961273572ce25b9bb1`.

## Measurements

| Category | Baseline bytes | Post-U-01 bytes | Change | Result |
| --- | ---: | ---: | ---: | --- |
| Initial JavaScript | 893,367 | 893,367 | 0% | No U-01 regression; inherited final-budget breach |
| Initial CSS | 68,577 | 68,577 | 0% | Within 76,800-byte budget |
| Other initial | 459 | 459 | 0% | Stable |
| Evidence assets | 37,604,542 | 37,604,542 | 0% | Outside eager HTML references |

The additional 4,043-byte Vite manifest is build metadata outside the initial graph. The inherited JavaScript output remains above the final 460,800-byte target; U-01 intentionally cannot change the active entry, and the reduction is assigned to the U-02 shell migration and later composition work.

## Accessibility and Manual Review

Automated checks cover semantic regions, evidence links, safe new-tab relationships, visible and hidden labels, list/table visualization alternatives, exact visualization-summary values, token-role presence, and declared light/dark contrast pairs. Manual source review confirmed a visible focus foundation, 24-by-24-CSS-pixel minimum interactive sizing, reduced-motion overrides, reflow-safe media, and system-font fallbacks.

Rendered shell checks for keyboard navigation, focus obstruction, 200-percent zoom, 320-CSS-pixel reflow, full browser compatibility, and domain visualization geometry are deferred to U-02 and the owning presentation units because U-01 is deliberately not rendered.

## Dependency Review

The registry audit reports five high and one moderate advisory in the existing dependency tree, including Vite and transitive packages; fixes are available. U-01 made no dependency or lockfile changes, as required by the approved plan. Remediation is recorded for a separately approved dependency-maintenance change rather than being applied silently.

## Scope and Integrity

- `src/App.tsx` and `src/main.tsx` do not import U-01.
- No rejected application file was removed by U-01.
- No `_new`, `_modified`, or alternate foundation file exists.
- The 104-file protected raw evidence tree retains inventory hash `32f3a6023fe84f865f95843e128030783d9705458353e45f74d2f48cddcd335a`.
- API, repository, database, runtime infrastructure, analytics, persistence, and deployment architecture changes are not applicable.
- Security Baseline and Property-Based Testing extensions were disabled and therefore skipped.
