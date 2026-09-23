# U-05 Academic and Evidence Verification Summary

## Acceptance Result

Post-activation acceptance passed with zero remaining P0 findings. The active application hash is `761f8a588bc2152a81fc970fb743843f566adb82523a837880ffbf2d78b3be8e`.

One P0 failure was found and corrected during this gate. The complete repository suite failed `src/App.test.tsx > renders the complete ordered shell` because two named `section` elements inside Academic Trajectory added unnamed landmark regions to the shell region order. The strata became `article` elements and the entire gate was rerun from strict TypeScript onward.

## Automated Verification

| Check | Result |
| --- | --- |
| Strict TypeScript project build (`npx tsc -b`) | Passed |
| Academic tests | 6 files, 18 tests passed |
| Research tests | 6 files, 19 tests passed |
| Identity tests | 7 files, 18 tests passed |
| Shell tests | 12 files, 39 tests passed |
| Portfolio tests | 36 files, 108 tests passed |
| Complete repository tests | 44 files, 154 tests passed |
| ESLint | Passed |
| Academic active boundaries | Passed with zero findings |
| Research, shell, and portfolio active boundaries | Passed with zero findings |
| U-01 recovery verification | Passed with zero findings |
| U-02 shell verification, active phase | Passed with zero findings |
| U-03 identity verification, active phase | Passed with zero findings |
| U-04 research verification, active phase | Passed with zero findings |
| U-05 academic verification, active phase | Passed with zero findings |
| Isolated candidate build and measurement | Passed with zero findings |
| Production build (`npm run build`) | Passed |
| Active production measurement | Passed with zero findings |

The `academic-source` and `academic-candidate` boundary and verifier modes now report `U05-GATE-001` and `U05-GATE-003` on `src/App.tsx`. These are pre-activation gates that assert the live registry is unchanged; after approved activation they are expected to report, and the active-phase modes are the governing post-activation checks. They are recorded here rather than suppressed.

## Production Measurements

| Measure | Active result | Approved limit | Result |
| --- | ---: | ---: | --- |
| Initial JavaScript | 268,491 bytes | 274,000 bytes | Passed |
| JavaScript growth from U-04 baseline (candidate 268,429 bytes) | 7.6999% | 10% | Passed |
| Initial CSS | 42,005 bytes | 43,008 bytes | Passed |
| Seven evidence documents | 22,866,108 bytes | Exact approved inventory | Passed |
| Three evidence images | 1,251,556 bytes | Exact approved inventory | Passed |
| One prior-unit PNG asset | 77,650 bytes | Carried from prior units | Recorded |

Candidate and active JavaScript differ by 62 bytes, which is the isolated candidate entry module only; registry and content equivalence holds. Images remain lazy, asynchronously decoded, and intrinsically sized. Documents remain native, user-initiated evidence links with no runtime data requests.

## Review Evidence

- The isolated candidate passed all code budgets, then went through two user-requested alignment correction cycles recorded in `academic-evidence-candidate-review-questions.md`.
- The user approved activation on 2026-09-17 (`artifacts/portfolio/u05/candidate-decision.json`, decision A).
- Responsive review at 320, 768, 1280, and 1440 CSS pixels in light and dark themes was performed by the user with screenshots. No browser version or mobile timing is claimed; automated browser-matrix and timing evidence remain P1 limitations.

Machine-readable evidence is stored under `artifacts/portfolio/u05/`.
