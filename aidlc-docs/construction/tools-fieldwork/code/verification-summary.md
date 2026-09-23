# U-06 Tools and Fieldwork Verification Summary

## Acceptance Result

Post-activation acceptance passed with zero current active-state P0 findings. The active application SHA-256 is `4078f40a9f9cc9b8f3b3f748ffabf2705b90ad9d51464a97abe3bc943881ece5`.

## Automated Verification

| Check | Result |
| --- | --- |
| Strict TypeScript project build | Passed |
| Tools and Fieldwork tests | 6 files, 28 tests passed |
| Academic tests | 6 files, 18 tests passed |
| Research tests | 6 files, 19 tests passed |
| Identity tests | 7 files, 18 tests passed |
| Shell tests | 12 files, 39 tests passed |
| Portfolio tests | 41 files, 134 tests passed |
| Complete repository tests | 49 files, 180 tests passed |
| ESLint | Passed |
| U-06 active boundaries | Passed with zero findings |
| U-06 active verification | Passed with zero findings |
| U-03 through U-05 active verification | Passed with zero findings |
| Current shell active boundaries | Passed with zero findings |
| U-01 recovery verification | Passed with zero findings |
| Production build | Passed; 126 modules transformed |
| Active production measurement | Passed with zero findings |
| Protected legacy-file and lockfile hashes | Unchanged |

The historical U-02 `verify:shell` command is candidate-only and compares current entry files with its 2026-09-14 candidate snapshot. It reports the expected later approved changes to `index.html`, `src/main.tsx`, and `src/App.tsx`; it is not an active-state verifier. The current shell active-boundary check passed and this limitation was not suppressed or misreported.

## Production Measurements

| Measure | Active result | Approved limit | Result |
| --- | ---: | ---: | --- |
| Initial JavaScript | 281,183 bytes | 285,000 bytes | Passed |
| JavaScript growth from U-05 baseline | 4.7272 percent | 8 percent | Passed |
| Initial CSS | 46,045 bytes | 46,080 bytes | Passed |
| U-06 incremental evidence | 0 bytes | 0 bytes | Passed |
| Inherited evidence | 24,195,314 bytes | Exact inventory | Passed |

Candidate and active JavaScript differ by 56 bytes because the isolated candidate and live entry modules are different. The U-06 registry, source content, CSS, evidence inventory, and runtime network surface are equivalent.

## Review Evidence

- The user supplied rendered screenshots and requested both the readability and alignment corrections recorded in `tools-fieldwork-candidate-review-questions.md`.
- The user conditionally approved activation after the alignment correction; the passing candidate gate fulfilled that condition.
- Responsive source contracts and focused tests cover the 320, 768, 1280, and 1440 CSS-pixel layout expectations and both theme token sets.
- No automated browser-version matrix or mobile performance timing is claimed; those remain recorded P1 environment limitations.

Machine-readable preflight, candidate, decision, and active measurements are stored under `artifacts/portfolio/u06/`.
