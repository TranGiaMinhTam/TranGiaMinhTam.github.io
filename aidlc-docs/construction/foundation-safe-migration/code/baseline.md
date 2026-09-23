# U-01 Pre-Generation Baseline

## Outcome

The existing rejected application builds successfully before U-01 foundation generation. Its initial JavaScript is already above the approved final budget, while initial CSS remains within budget. U-01 is required to remain outside the active entry graph, so it must introduce no initial-graph regression.

## Reproducible Inputs

- Revision: `3d8dd530e375f6b93a22ce834a5602d822175384`
- Lockfile SHA-256: `db382652e91d7bd4ab3c154cf79d53b6b26ecb4430efe5961273572ce25b9bb1`
- Node: `v24.0.0`
- npm: `11.3.0`
- Vite: `7.3.0`
- TypeScript: `5.9.3`
- Build command: `npm run build`
- Base path: `/`
- Capture time: `2026-09-13T16:27:29Z`

## Build Result

The build passed in 8.0 seconds, including a 3.78-second Vite build and 1,589 transformed modules. Vite reported one existing warning because the initial JavaScript chunk exceeds 500 kB.

| Category | Exact bytes | Gzip bytes | Approved limit | Result |
| --- | ---: | ---: | ---: | --- |
| Initial JavaScript | 893,367 | 272,286 | 460,800 | Above final budget at baseline |
| Initial CSS | 68,577 | 12,412 | 76,800 | Within budget |
| Other initial HTML | 459 | N/A | N/A | Measured |
| Evidence assets | 37,604,542 | Supplemental per-file values recorded during measurement | On demand | Emitted outside eager HTML references |
| Static public asset | 1,497 | N/A | N/A | Measured |
| Total deployable output | 38,568,442 | N/A | N/A | Measured |

The machine-readable baseline is `artifacts/portfolio/u01/baseline.json`. Later measurement compares exact bytes and flags any greater-than-10-percent regression; gzip values are supplemental rather than budget inputs.
