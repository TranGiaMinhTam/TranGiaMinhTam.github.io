# U-04 Research and Data Verification Summary

## Acceptance Result

Post-activation acceptance passed with zero P0 findings. The active application hash is `be06360156977349a7147e0f6a5bda3eb47dfb067d719b894482c7fc9f80ea86`.

## Automated Verification

| Check | Result |
| --- | --- |
| Strict TypeScript project build | Passed |
| Research tests | 6 files, 19 tests passed |
| Identity tests | 7 files, 18 tests passed |
| Shell tests | 12 files, 39 tests passed |
| Portfolio tests | 31 files, 92 tests passed |
| Complete repository tests | 39 files, 138 tests passed |
| ESLint | Passed |
| Research active boundaries | Passed with zero findings |
| Portfolio and shell active boundaries | Passed with zero findings |
| U-01 recovery verification | Passed with zero findings |
| U-02 shell verification | Passed with zero findings |
| U-03 identity verification | Passed with zero findings |
| U-04 research verification | Passed with zero findings |
| Production build | Passed; 94 modules transformed |

The active identity verifier initially reported a false incompatibility because it only recognized the earlier direct registry binding. Its active-phase rule was corrected to accept either the approved direct binding or a duplicate-rejecting composed registry. The complete gate was rerun after that correction and passed.

## Production Measurements

| Measure | Active result | Approved limit | Result |
| --- | ---: | ---: | --- |
| Initial JavaScript | 249,238 bytes | 250,000 bytes | Passed |
| JavaScript growth from U-03 | 11.2675% | 12% | Passed |
| Initial CSS | 30,359 bytes | 30,720 bytes | Passed |
| JavaScript gzip | 77,391 bytes | Informational | Recorded |
| CSS gzip | 6,153 bytes | Informational | Recorded |
| Three research figures | 1,251,556 bytes | Exact approved inventory | Passed |
| Three research documents | 11,244,477 bytes | Exact approved inventory | Passed |

Figures remain lazy, asynchronously decoded, intrinsically sized, and locally recoverable. Documents remain native, user-initiated evidence links. The emitted production graph contains the approved U-03 portrait and transcript plus the exact U-04 figure and document inventory; unrelated later-unit evidence is absent.

## Review Evidence

- The initial candidate passed code budgets but was revised after the user identified unclear spacing in Laboratory Research.
- The corrected full-width laboratory composition passed the candidate gate.
- The user conditionally approved activation after requesting that the portrait be shifted left to center the person in the white shirt.
- The portrait crop condition was implemented and regression tested before activation.
- Automated browser timing was unavailable in the environment and remains documented as a P1 limitation. Source, component, responsive-style, build, boundary, and user-rendered review evidence cover the P0 gate.

Machine-readable evidence is stored under `artifacts/portfolio/u04/`.
