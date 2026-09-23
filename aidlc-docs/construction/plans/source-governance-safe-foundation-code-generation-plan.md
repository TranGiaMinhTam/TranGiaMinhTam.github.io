# Code Generation Plan: U-01 Source Governance and Safe Foundation

> **Status: Implementation decisions awaiting answers and explicit approval. This document is the single source of truth for U-01 Code Generation. No implementation mutation is authorized yet.**

## Unit Context

- **Workspace**: `/Users/nhamhhung/student_ports/TranGiaMinhTam.github.io`
- **Project**: Brownfield single-package React 19, TypeScript 5.9, Vite 7, Vitest 4 static portfolio.
- **Unit outcome**: Build a deterministic, privacy-safe source/catalog/conversion foundation without changing the active visual presentation.
- **Stories**: US-010, US-011, US-012, and US-021.
- **Primary requirements**: FR-006, FR-018, FR-019, FR-022 through FR-025; NFR-013, NFR-014, NFR-016 through NFR-018, NFR-020; PBT-R01 through PBT-R06; all forty U-01 NFRs.
- **Consumes**: Approved U-01 Functional Design, NFR Requirements, NFR Design, the external resume, the current 122-file `src/assets/minh-tam/` archive, existing portfolio models/scripts, and the dirty worktree that must be preserved.
- **Provides**: Recovery evidence, complete physical inventory, exact-content groups, reviewed alias/metadata overlays, derivative outcomes, a byte-identical resume copy/capability, safe media policy, generated manifests, reproducible example/PBT suites, and review evidence.
- **No database entities**: U-01 is static build/local tooling and owns no database, API, server, queue, cache, IAM resource, or runtime service.
- **Infrastructure Design**: N/A. Hosting and delivery controls remain assigned to U-06.

## Brownfield and Safety Findings

- The worktree contains extensive existing tracked and untracked user work; no reset, checkout, cleanup, or source deletion is allowed.
- `src/assets/minh-tam/` currently contains exactly 122 physical files totaling approximately 293 MiB: 94 JPG, 20 PDF, 3 PNG, 3 HEIC, 1 SVG, and 1 DOCX.
- The approved inventory root is the whole existing `src/assets/minh-tam/` tree. New derivatives therefore live outside that root at `src/assets/generated/minh-tam/`; the resume copy lives at `src/assets/documents/Tran-Gia-Minh-Tam-Resume.pdf`.
- The local machine currently provides Node 24.0.0, npm 11.3.0, ImageMagick 7.1.1-43 with HEIC/PDF delegates, Ghostscript 10.04.0, and macOS `sips` 316. LibreOffice, `pdftoppm`, and `pdfinfo` are absent.
- `fast-check` is not installed. The repository has a lockfile and CI uses Node 20.
- The private phone-marker environment inputs are absent. Real privacy activation evidence therefore requires a non-committed local value at execution time; the value must never enter chat, source, fixtures, logs, reports, or audit.

## Planned Application and Tooling Paths

### Existing files modified in place

- `package.json` - focused source-governance scripts and exact `fast-check` development dependency entry produced by npm.
- `package-lock.json` - npm-resolved exact dependency graph from the official registry.
- `.gitignore` - non-public recovery/staging/private-input patterns only if current rules are insufficient.
- `.github/workflows/deploy.yml` - only the approved focused example/PBT/boundary commands needed for U-01 CI; no deployment topology change.
- `src/portfolio/index.ts` - export stable archive/resume contracts only when doing so cannot activate UI or import generated assets into initial chunks.
- `scripts/portfolio/check-boundaries.mjs` - add source-governance browser/tool import and bundle exclusions.

### New application contracts

- `src/portfolio/archive/archive.types.ts`
- `src/portfolio/archive/archiveModel.ts`
- `src/portfolio/archive/mediaSourcePolicy.ts`
- `src/portfolio/archive/archiveMetadata.ts`
- `src/portfolio/archive/archiveAliases.ts`
- `src/portfolio/archive/generated/archive-manifest.json`
- `src/portfolio/archive/index.ts`
- `src/portfolio/resume/resume.types.ts`
- `src/portfolio/resume/resumeSource.ts`
- `src/portfolio/resume/index.ts`

### New Node ESM tooling

- `scripts/portfolio/source-governance/config.mjs`
- `scripts/portfolio/source-governance/paths.mjs`
- `scripts/portfolio/source-governance/findings.mjs`
- `scripts/portfolio/source-governance/hash.mjs`
- `scripts/portfolio/source-governance/recovery.mjs`
- `scripts/portfolio/source-governance/inventory.mjs`
- `scripts/portfolio/source-governance/canonicalize.mjs`
- `scripts/portfolio/source-governance/metadata.mjs`
- `scripts/portfolio/source-governance/manifest.mjs`
- `scripts/portfolio/source-governance/derivatives.mjs`
- `scripts/portfolio/source-governance/privacy.mjs`
- `scripts/portfolio/source-governance/evidence.mjs`
- `scripts/portfolio/source-governance/cli.mjs`
- `scripts/portfolio/source-governance/adapters/imagemagick.mjs`
- `scripts/portfolio/source-governance/adapters/sips.mjs`
- `scripts/portfolio/source-governance/adapters/libreoffice.mjs`

### Generated non-source and public asset boundaries

- `.aidlc-recovery/source-governance-safe-foundation/` - ignored recoverable pre-unit payload and rehearsal evidence.
- `artifacts/portfolio/source-governance/` - non-public inventory, findings, timings, PBT, privacy, bundle, recovery, and gate evidence.
- `src/assets/generated/minh-tam/` - approved deterministic web-display, thumbnail, PDF-first-page, and optional document-preview derivatives.
- `src/assets/documents/Tran-Gia-Minh-Tam-Resume.pdf` - byte-identical bundled resume copy.

### Tests

- `scripts/portfolio/source-governance/tests/paths.example.test.mjs`
- `scripts/portfolio/source-governance/tests/catalog.example.test.mjs`
- `scripts/portfolio/source-governance/tests/derivatives.example.test.mjs`
- `scripts/portfolio/source-governance/tests/privacy.example.test.mjs`
- `scripts/portfolio/source-governance/tests/recovery.example.test.mjs`
- `scripts/portfolio/source-governance/tests/arbitraries.mjs`
- `scripts/portfolio/source-governance/tests/source-governance.pbt.test.mjs`
- `src/portfolio/archive/archiveModel.test.ts`
- `src/portfolio/archive/mediaSourcePolicy.test.ts`
- `src/portfolio/resume/resumeSource.test.ts`
- `src/portfolio/sourceGovernanceBoundaries.test.ts`

Paths may be consolidated only when implementation proves two listed modules would be empty wrappers. Any consolidation must be documented in the code summary and must not duplicate policy ownership.

## Decisions Requiring Approval

Please answer each question by placing the selected letter after its `[Answer]:` tag. The recommended choice is listed first.

## Question 1 - Recovery Before Mutation

How should Part 2 protect the current dirty worktree before package, source, generated-asset, or workflow changes?

A) Create a new target-specific recovery payload and manifest covering every planned target, tracked diff, relevant untracked content, all 122 protected source hashes, and the external resume hash; rehearse restoration in an isolated temporary target and stop if any check fails
B) Reuse the older `research-atlas-pre-u01` recovery payload without reconciling current changes
C) Depend on Git status and avoid a restoration rehearsal
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 2 - Property-Test Dependency

How should `fast-check` be added?

A) Install it as an exact development dependency from the official npm registry through npm, preserve the lockfile, inspect resolved version/license/audit output, and stop on an unresolved blocking supply-chain finding
B) Implement a custom random generator with no new dependency
C) Load a browser/CDN copy only during tests
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 3 - Local Converter Adapters

Which converter strategy should implementation use?

A) Implement capability-detected local adapters: ImageMagick plus Ghostscript for current HEIC/raster/PDF work, macOS `sips` as an image fallback, and optional reviewed LibreOffice for DOCX-to-PDF when present; install no converter automatically and emit honest unavailable outcomes otherwise
B) Depend only on the current macOS tools and fail on Linux/CI
C) Upload source files to a hosted conversion service when local tools are missing
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 4 - Generated Output Policy

Where should reproducible visitor-facing derivatives and the resume copy live?

A) Keep derivatives in `src/assets/generated/minh-tam/` outside the 122-file source root and the verified resume copy in `src/assets/documents/Tran-Gia-Minh-Tam-Resume.pdf`; commit approved outputs only after integrity/privacy/determinism checks
B) Write generated derivatives into `src/assets/minh-tam/` and allow later inventory runs to count them as originals
C) Generate all derivatives only in an uncommitted temporary directory, so later deployment may differ by machine
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 5 - Canonical and Curated Metadata

How should all 122 physical files become complete catalog inputs without inventing facts?

A) Inventory all files; merge exact SHA-256 duplicates automatically; apply non-identical aliases only from explicit reviewed mappings; give every canonical item a stable neutral reviewed record/disposition and preserve unresolved descriptive uncertainty as a blocking review finding rather than guessing from filenames
B) Merge similarly named/sized files automatically and generate captions from directory/file names as factual claims
C) Omit files that lack confident descriptive metadata
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 6 - Private Phone Verification Input

How should the document-only phone boundary be verified?

A) Require the maintainer to provide the value through `PORTFOLIO_PRIVATE_PHONE_MARKER` or an ignored restricted marker file at execution time; the scanner never echoes it, excludes only the hash-verified resume PDF bytes, and blocks final activation evidence while the real marker is absent
B) Commit the phone value to a fixture for reliable CI access
C) Skip the real-value scan and rely only on generic phone-number regular expressions
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 7 - U-01 Activation Boundary

What should this unit activate in the visitor application?

A) Activate no visible UI; publish only validated contracts, generated facts/assets, safe capabilities, tests, and evidence for U-02 through U-05 to consume after their own approvals
B) Also implement the masthead, archive browser, and media dialogs now
C) Replace the active portfolio with a source-governance report
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 8 - Validation Depth

Which validation sequence should gate U-01 completion?

A) Run focused examples, all U01-P01 through U01-P12 properties, current 122-file reconciliation, resume equality, converter success/fallback checks, privacy checks, strict TypeScript, ESLint, full Vitest, production build, import/bundle isolation, two-run determinism, source-preservation hashes, and recovery rehearsal; record every command/result
B) Run only the new focused unit tests
C) Defer all execution until the final Build and Test stage
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Executable Generation Sequence

### Part 1 - Planning and Approval

- [x] Step 1 - Load the approved Functional Design, NFR Requirements, NFR Design, unit/story map, reverse-engineered structure, and enabled Security/PBT rules.
- [x] Step 2 - Inspect the brownfield codebase, dirty worktree, package/CI configuration, current 122-file archive boundary, external resume accessibility, and local converter/PBT/privacy-input capabilities without changing application code.
- [x] Step 3 - Define exact implementation, generated-output, evidence, test, and documentation paths; mark API, repository/database, frontend-component, and infrastructure generation N/A where U-01 owns none.
- [x] Step 4 - Create the complete numbered U-01 Code Generation plan with story/requirement/PBT/security traceability.
- [x] Step 5 - Receive and validate answers to all eight implementation questions.
- [x] Step 6 - Resolve any ambiguity or contradiction through a dedicated clarification file; none was required because all recommended choices are mutually consistent.
- [x] Step 7 - Obtain explicit approval of the entire plan and generation sequence.

### Part 2 - Generation

- [x] Step 8 - Capture a fresh U-01 recovery baseline and verify an isolated restoration rehearsal before any implementation mutation. Mark no later step complete unless recovery passes. **Stories**: US-010, US-012. **Controls**: U01-REC-001 through REC-004, SECURITY-15.
- [x] Step 9 - Add and verify the exact `fast-check` development dependency and focused npm commands; inspect the lockfile diff, registry source, license, audit result, and Node 20/Vitest compatibility. **Story**: US-021. **Controls**: SECURITY-10, PBT-09.
- [x] Step 10 - Implement root/path, finding, streaming hash, recovery, and evidence primitives under `scripts/portfolio/source-governance/`, with safe top-level error handling and no absolute-path/sensitive diagnostics. Add concrete tests immediately. **Stories**: US-010, US-021. **Properties**: U01-P02, U01-P10, U01-P11.
- [x] Step 11 - Implement immutable archive/resume/media contracts under `src/portfolio/archive/` and `src/portfolio/resume/`, including discriminated capabilities, schema versioning, fail-closed media admission, and no phone field. Add TypeScript examples immediately. **Stories**: US-010, US-012. **Properties**: U01-P08, U01-P09.
- [x] Step 12 - Implement complete streaming inventory for `src/assets/minh-tam/`, reconcile exactly 122 physical members, validate types/signatures and source stability, and record deterministic repository-relative facts without modifying originals. Add examples and capacity fixtures. **Story**: US-010. **Properties**: U01-P02.
- [x] Step 13 - Implement pure exact-hash canonicalization, reviewed alias resolution, curated metadata/disposition validation, deterministic ordering, finding normalization, canonical JSON round trip, and complete provenance accounting. Add example tests and central domain arbitraries. **Stories**: US-011, US-021. **Properties**: U01-P01, U01-P03 through U01-P07, U01-P10 through U01-P12.
- [x] Step 14 - Review the current exact-content groups and author `archiveAliases.ts`/`archiveMetadata.ts` so every physical member remains represented and every canonical item has a reviewed disposition or an explicit blocker; do not infer claims from filenames. **Stories**: US-010, US-011.
- [x] Step 15 - Implement capability probes and bounded ImageMagick/Ghostscript, `sips`, and optional LibreOffice adapters; implement the two-job scheduler, 120-second timeouts, deterministic names, output ceilings, validation, cleanup, and honest fallback outcomes. Add absent-tool, timeout, malformed/oversized-output, and collision tests. **Story**: US-012. **Controls**: SECURITY-11, SECURITY-13, SECURITY-15.
- [x] Step 16 - Copy the supplied resume into the approved document boundary, prove byte length/SHA-256 equality, generate the stable `Tran-Gia-Minh-Tam-Resume.pdf` download capability, and verify the original remains unchanged. **Stories**: US-010, US-012. **Controls**: U01-RES-001 through RES-005.
- [x] Step 17 - Generate validated HEIC/raster/PDF-first-page and optional DOCX-preview outcomes into the separate derivative root; preserve originals and record every unavailable tool/fallback honestly. **Story**: US-012.
- [x] Step 18 - Implement non-echoing privacy verification over source models, generated metadata, tests/snapshots, diagnostics, rendered text evidence, and production text output, excluding only the hash-verified resume PDF bytes. Final real-value evidence is fail-closed when the private marker is absent. **Stories**: US-010, US-021. **Controls**: U01-NFR-SEC-004, SECURITY-09, SECURITY-15.
- [x] Step 19 - Implement all U01-P01 through U01-P12 properties with shared constrained arbitraries, shrinking, seed/path replay, no silent retry, and separate critical examples; add permanent regressions for any discovered business-critical shrunk case. **Story**: US-021. **Controls**: PBT-01 through PBT-10 except PBT-06 N/A.
- [x] Step 20 - Generate the internal/public-safe manifest candidates, validate twice-run byte determinism, and promote only the complete approved resume/derivative/manifest set; retain active outputs on any blocker. **Stories**: US-010 through US-012.
- [x] Step 21 - Extend import/bundle boundary verification and CI commands so Node tooling, original archive assets, private inputs, and PBT generators cannot enter initial browser chunks; do not activate any U-02 through U-05 UI. **Stories**: US-010, US-021. **Controls**: U01-NFR-PER-006, U01-NFR-MNT-002.
- [x] Step 22 - Run focused and full validation: strict TypeScript, ESLint, example tests, PBT, current/capacity inventory, converter paths/fallbacks, resume equality, privacy, production build, bundle/request isolation, performance/memory measurement, source pre/post hashes, deterministic rerun, and recovery verification. Stop on every applicable security/PBT blocker. **Stories**: US-010 through US-012, US-021.
- [x] Step 23 - Generate `aidlc-docs/construction/source-governance-safe-foundation/code/code-generation-summary.md` with created/modified files, command evidence, counts, hashes, converter availability, fallback decisions, performance, privacy status without sensitive values, PBT seeds/results, security/PBT compliance, and remaining downstream boundaries.
- [x] Step 24 - Verify no duplicate replacement files, no source mutation/deletion, no unexpected public activation, no unchecked plan steps, and present the required Code Generation completion gate.

## N/A Generation Categories

| Standard code-generation category | U-01 decision |
| --- | --- |
| Project structure setup | N/A; brownfield structure is reused. |
| API layer and tests | N/A; no API exists or is introduced. |
| Repository/database layer and tests | N/A; no database/persistence service exists. |
| Frontend components and interaction tests | N/A; visible UI is explicitly deferred. Only immutable browser contracts/policies are added. |
| Database migrations | N/A; no data store exists. |
| Deployment artifacts/topology | N/A; U-06 owns delivery/infrastructure. U-01 may only add CI verification commands. |

## Story Completion Gates

| Story | Completion evidence |
| --- | --- |
| US-010 | Exactly 122 protected physical members, deterministic IDs/order, hashes/types/bytes/categories/dispositions, safe relative paths, no source change. |
| US-011 | Exact duplicates consolidated, reviewed aliases only, all provenance retained once, deterministic/idempotent/oracle properties pass. |
| US-012 | HEIC/DOCX/PDF/image adapters produce validated derivatives or honest fallbacks; originals remain accessible and unchanged. |
| US-021 | Exact `fast-check` dependency, reusable arbitraries, U01-P01 through U01-P12, shrinking/replay evidence, example regressions, and CI inclusion. |

## Security and PBT Gates

- SECURITY-09, SECURITY-10, SECURITY-11, SECURITY-13, and SECURITY-15 are blocking and must have executable evidence.
- SECURITY-01 through SECURITY-08, SECURITY-12, and SECURITY-14 remain N/A for U-01; SECURITY-04 remains assigned to U-06.
- PBT-01 through PBT-05 and PBT-07 through PBT-10 are blocking at their applicable implementation gates.
- PBT-06 remains N/A because the business core is immutable/stateless; adapter lifecycles use deterministic integration examples.
- No Code Generation completion prompt may include “Continue” while an applicable blocker remains.

## Approval Boundary

- Approval authorizes only the numbered U-01 Part 2 sequence.
- It does not authorize destructive cleanup, source deletion/move/replacement, external upload/conversion, visible UI activation, deployment, unrelated refactoring, or changes outside the listed/reconciled targets.
- A new target, dependency, converter installation, material scope change, or unresolved conflict returns to plan review before execution.
- If the private phone marker is absent at the real privacy gate, work pauses safely without printing the value and without promoting candidate outputs.
