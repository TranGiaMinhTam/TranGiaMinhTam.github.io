# Code Generation Plan - U-05 PDF and Image Detail Viewers

> **Status: Part 1 approved with Option A; Part 2 generation is in progress.** This document is the single source of truth for U-05 Code Generation.

## User-Directed Stage Routing

- [x] U-05 Functional Design approved on 2026-09-24.
- [x] U-05 NFR Requirements approved on 2026-09-24.
- [x] U-05 NFR Design skipped by explicit user instruction to go straight to Code Generation.
- [x] Infrastructure Design is N/A because U-05 adds no hosting, backend, persistence, network, or deployment architecture.
- [x] Carry every approved Functional Design and NFR requirement directly into Part 2.

## Unit Generation Context

- **Stories**: US-014, US-015, US-016, and US-019.
- **Requirements**: FR-026 through FR-035; NFR-001 through NFR-003, NFR-005 through NFR-012, and NFR-018 through NFR-020; PBT-R07; SEC-R02, SEC-R06, SEC-R07, and SEC-R08.
- **Consumes**: U-01 safe media capabilities and generated previews, U-02 layout/theme tokens, U-03 resume capability, U-04 archive groups/order/detail triggers, and the approved U-05 Functional Design and NFR artifacts.
- **Provides**: One accessible shared host; on-demand native PDF and uncropped image detail bodies; bounded group navigation; safe failure states; focus/inertness/scroll cleanup; and adapters for archive, academic, research, shared evidence, and resume surfaces.
- **Active content rule**: The first computational project exposes only `IMG_4208.JPG` plus its publication. Its image group is `Image 1 of 1`; both navigation directions remain disabled. The other four docking photographs stay in Scientific Research.
- **Brownfield boundary**: Modify existing files in place and create only the planned focused modules; never create replacement copies.
- **Excluded**: Backend/API/database work, remote conversion, analytics, authentication, deployment/header configuration, a PDF rendering library, a modal library, dependency changes, or source-file deletion.

## Planned Application Paths

### Create

- `src/portfolio/media-viewer/mediaViewer.types.ts`
- `src/portfolio/media-viewer/mediaCapability.ts`
- `src/portfolio/media-viewer/mediaViewerReducer.ts`
- `src/portfolio/media-viewer/MediaViewerContext.tsx`
- `src/portfolio/media-viewer/MediaViewerHost.tsx`
- `src/portfolio/media-viewer/PdfViewerBody.tsx`
- `src/portfolio/media-viewer/ImageViewerBody.tsx`
- `src/portfolio/media-viewer/MediaFailureBody.tsx`
- `src/portfolio/media-viewer/MediaViewer.module.css`
- `src/portfolio/media-viewer/index.ts`
- Focused example and property-based tests beside those modules.
- `scripts/portfolio/pdf-image-detail-viewers-candidate/` isolated candidate entry and Vite configuration.
- `scripts/portfolio/pdf-image-detail-viewers-review/` recovery, boundary, integrity, performance, request, and browser-review tooling.
- Schema-versioned evidence under `artifacts/portfolio/u05-media-viewers/`.
- `aidlc-docs/construction/pdf-image-detail-viewers/code/code-generation-summary.md`.

### Modify in place

- `src/portfolio/archive/archive.types.ts`, `ArchiveCards.tsx`, `ArchiveGroup.tsx`, `ArchiveExplorer.tsx`, and focused tests to provide group-aware detail capabilities.
- `src/portfolio/academics/AcademicEvidenceAction.tsx`, `LazyEvidenceImage.tsx`, `TextDocumentPreview.tsx`, `CompleteEvidenceLibrary.tsx`, and focused tests to request shared detail views while retaining direct safe actions.
- `src/portfolio/research/ResearchFigure.tsx`, `ResearchEvidenceAction.tsx`, `ComputationalProjects.tsx`, `LaboratoryResearch.tsx`, and focused tests for single-/multi-image narrative groups and PDFs.
- `src/portfolio/shared/EvidenceAction.tsx` and tests for shared typed detail requests.
- `src/portfolio/resume/ResumeAction.tsx`, resume integrations, and tests to retain Download and add an explicit resume preview capability.
- `src/portfolio/shell/PortfolioExperience.tsx` or the smallest equivalent composition seam to mount exactly one shared host.
- `src/App.tsx` only after isolated candidate approval, through one reversible active-composition change.
- `src/portfolio/index.ts`, boundary tests/scripts, and `package.json` scripts only; dependency declarations and `package-lock.json` remain unchanged.

## Layer Applicability

- Typed business logic, reducers, effects, frontend components, adapters, example tests, property tests, isolated candidate tooling, browser evidence, recovery, and documentation: applicable.
- API, repository/database, migrations, infrastructure, authentication, remote service, and deployment artifacts: N/A.
- U-06 CSP/header, dependency scanning, SBOM, and integrated delivery controls: excluded and preserved as later gates.

## Part 2 Execution Steps

- [x] Step 1 - Capture all planned existing targets, new-file absence states, package/dependency hashes, active composition, and generated evidence paths in a U-05 recovery package; rehearse isolated restoration and stop on mismatch. Captured 20 existing files across 23 governed targets, recorded two absent states and dependency hashes, and passed isolated hash restoration with zero findings.
- [x] Step 2 - Add closed immutable viewer capability, group, action, state, event, layout, and finding types; implement central source/size admission with visitor-safe discriminated results. Added closed capability/resolution contracts, same-origin/approved-HTTPS admission, geometry/media validation, 64 MiB PDF and 16 MiB image embed limits, immutable actions/groups, and non-reflective failures.
- [x] Step 3 - Implement the pure reducer, bounded navigation helpers, deterministic group ordering, replacement-open behavior, Close behavior, and safe failure downgrade. Added clamped index normalization, immutable open/navigation transitions, replacement-open semantics, safe media-failure downgrade, and Close-to-closed behavior.
- [x] Step 4 - Add reusable fast-check generators and property tests for bounds, clamped-index oracle equivalence, item preservation, layout ranges, Close-to-closed behavior, and stateful event sequences with shrinking and replayable seeds. Added 120-run fixed-seed fast-check coverage with shrinking plus concrete admission/reducer tests; all 20 focused tests and strict TypeScript pass.
- [x] Step 5 - Implement one React context/controller and native `<dialog>` host with accessible naming, initial focus, focus containment, background inertness, scroll locking, Escape/backdrop dismissal, replacement-open cleanup, unmount cleanup, and exact trigger restoration. Added the provider/controller and single host with native/fallback open behavior, Tab containment, inert/scroll effects, three dismissal paths, and connected-trigger restoration.
- [x] Step 6 - Implement dynamically imported PDF, image, and failure bodies. Use native same-origin PDF embedding, uncropped contained images, 64 MiB PDF/16 MiB image embed limits, Download/Open actions, bounded Previous/Next, and `Image n of m` announcements. Added separate lazy chunks with safe direct actions and operable over-limit/failure states.
- [x] Step 7 - Implement shared token-based viewer geometry: desktop centered dialog, narrow safe-area sheet, stable header/actions, 44-pixel controls, `4 / 3` image cards, `3 / 4` PDF cards, reduced motion, long-text containment, and zero document overflow. Added shared clamped geometry, safe-area layout, contained detail media, touch targets, long-text wrapping, and reduced-motion rules; card-frame adaptations remain in their owning Step 8/9 integrations.
- [x] Step 8 - Adapt archive cards and group/explorer propagation to open group-aware viewers without losing lazy group loading, deterministic order, direct fallbacks, metadata, or failure isolation. Archive document cards now request the shared PDF viewer, image cards open deterministic collection-aware groups, no-provider and legacy-detail fallbacks remain intact, and fixed `4 / 3` image plus contained `3 / 4` document previews pass strict TypeScript and 16 focused archive tests.
- [x] Step 9 - Adapt academic evidence, shared evidence, research figures/actions, and resume actions to the shared host. Academic document/image actions, research evidence/figures, shared PDF actions, and the resume preview now request the shared host only when its provider exists and retain their direct actions otherwise. Fixed-ratio thumbnails remain cropped while detail images remain contained. Existing source-governance assertions retain only `IMG_4208.JPG` in the first computational narrative and keep all five canonical photographs discoverable under Scientific Research; strict TypeScript and 20 focused domain tests pass.
- [x] Step 10 - Add concrete component/regression tests for keyboard, focus containment/restoration, backdrop/Escape/Close, background inertness, cleanup, accessible naming, PDF unsupported/oversized fallback, crop-versus-contain behavior, single-/multi-image navigation, rapid interaction, and removed triggers. Added host and style regression suites covering all listed interaction paths, safe image failure, replacement-open behavior, disconnected triggers, unmount cleanup, and responsive geometry; strict TypeScript and 51 focused tests across 12 files pass.
- [x] Step 11 - Add U-05 boundary, integrity, privacy, and request checks that reject unsafe schemes, raw/internal visitor copy, eager originals/full PDFs, dependency drift, duplicate hosts, and out-of-scope U-06 behavior. Added schema-versioned recovery/dependency, source boundary, visitor-copy privacy, Protein Docking allocation, lazy-chunk/request, and performance-budget verifiers. All source-phase checks and Node syntax validation pass with zero findings.
- [x] Step 12 - Build an isolated candidate that composes the current active portfolio with the viewer provider/host but does not modify `src/App.tsx`; add package scripts without changing dependency declarations. Added a minimal candidate entry that wraps the exported active `PortfolioApp` in exactly one `MediaViewerProvider`, dedicated Vite configuration and scripts, and a public barrel export. Strict TypeScript, candidate boundary checks, and the candidate production build pass while active `src/App.tsx` remains unchanged and dependency declarations remain hash-identical.
- [x] Step 13 - Run focused and full tests, fast-check properties, strict TypeScript, ESLint, boundaries, privacy, recovery, production/candidate builds, Vite-manifest/request checks, and performance budgets. Resolve every blocking finding. All 291 tests across 79 files, strict TypeScript, ESLint, source/candidate boundaries, privacy, recovery, integrity, candidate build, and lazy request checks pass. Candidate initial output is 326,514 bytes JavaScript and 63,517 bytes CSS versus a 321,812/59,475-byte baseline; three viewer bodies remain separate lazy chunks totaling 2,146 bytes, with zero blocking findings.
- [x] Step 14 - Review the isolated candidate in Chrome at 320/768/1280/1440 in both themes plus zoom, text spacing, reduced motion, keyboard, forced colors where supported, PDF/image/failure states, single-image boundaries, and screenshots. Record unavailable manual browsers honestly. A 14-case/14-screenshot headless Chrome matrix passes with zero overflow, eager-media, dialog, PDF, single-image, multi-image, focus, inertness, or cleanup findings. Representative PDF, docking image, archive group, and mobile resume screenshots were manually inspected; Firefox, Safari, and iOS Safari are unavailable and were not run.
- [x] Step 15 - Present the isolated candidate evidence and a dedicated two-option candidate-activation question. Do not change active composition before explicit approval. Created `pdf-image-detail-viewers-candidate-review-questions.md` with the complete gate evidence, exact activation boundary, and pending A/B decision; active composition remains unchanged.
- [x] Step 16 - After candidate approval, record the answer and promote only the reversible provider/host composition seam to `src/App.tsx` or the smallest approved active entry. Recorded Option A and wrapped the existing `PortfolioApp` in exactly one `MediaViewerProvider`; no registry, content, asset, dependency, or other active component changed.
- [x] Step 17 - Repeat all applicable active-production tests, builds, boundaries, integrity, privacy, request, performance, accessibility, and responsive browser-review gates; resolve every blocking finding. Narrowed one stale legacy boundary to permit exactly the approved single `MediaViewerProvider` while retaining all other provider and retired-presentation bans. The active site passes 291 tests across 79 files, strict TypeScript, ESLint, general/U-05 boundaries, privacy, recovery, integrity/request verification, production build, performance budgets, and the 14-case/14-screenshot Chrome matrix with zero findings. Active output is 326,548 bytes JavaScript, 63,517 bytes CSS, three initial requests, and three 2,146-byte lazy viewer chunks.
- [x] Step 18 - Generate the Code Generation summary, verify no duplicate replacement files or dependency changes, close all plan/story checkboxes, and present the standardized Code Generation completion gate. Generated `aidlc-docs/construction/pdf-image-detail-viewers/code/code-generation-summary.md`, confirmed all four owned stories and applicable requirements complete, found no `_modified`, `_new`, or replacement-copy application files, and confirmed `package-lock.json` plus dependency declarations remain unchanged.

## Review Amendment - Layout and Content Consolidation

- [x] Step 19 - Record the requested review amendment and reopen U-05 Code Generation completion without advancing the workflow. The approved amendment covers evidence-card spacing and crops, Data Stories alignment and the Future Innovator preview, simplified methods/tools, one consolidated activity sequence, and Contact form spacing.
- [x] Step 20 - Add consistent card gutters, internal padding, and fixed preview geometry throughout the Evidence Library while preserving complete detail viewing. All archive cards now have larger responsive gaps, internal padding around media and copy, and a shared `4 / 3` cropped preview frame for photographs, PDF thumbnails, and supporting-file placeholders; the popup detail view remains uncropped. Four focused archive tests pass.
- [ ] Step 21 - Correct Data Stories alignment and add a clearly independent project preview for `1st Place — Future Innovator Camp` without presenting it as visual proof for the SIM-LSE retail project.
- [ ] Step 22 - Replace Methods and Tools connection/evidence panels with a simple, consistently aligned categorized list.
- [ ] Step 23 - Merge Fieldwork and Leadership records into one continuous activity section with one consistent card format and no additional-activities subdivision.
- [ ] Step 24 - Add label separation above the Name and Reply-to email fields and increase the Open email draft button's internal padding.
- [ ] Step 25 - Add or update focused regression coverage, run all applicable quality and active browser-review gates, refresh the Code Generation summary/state, and re-present the standardized completion gate.

## Story Traceability

| Story | Planned implementation | Verification |
| --- | --- | --- |
| US-014 | PDF preview/detail capability, native embed, Download/Open/Close, fallback | Steps 2, 5, 6, 7, 9, 10, 13, 14, 17 |
| US-015 | Image detail, caption/context, original access, bounded group navigation | Steps 2 through 10, 13, 14, 17 |
| US-016 | Focus, inertness, keyboard, dismissal, cleanup, trigger restoration | Steps 3, 5, 10, 13, 14, 17 |
| US-019 | Safe capability admission and operable failure state | Steps 2, 3, 5, 6, 10, 11, 13, 14, 17 |

## Requirement and Extension Traceability

| Requirement/rule | Plan steps |
| --- | --- |
| FR-026 through FR-035 | 2, 5 through 10, 13, 14, 17 |
| NFR-001 through NFR-003 | 5, 7, 10, 13, 14, 17 |
| NFR-005 through NFR-012 | 6 through 14 and 17 |
| NFR-018 through NFR-020 | 2 through 13 and 17 |
| SEC-R02, SEC-R06, SEC-R07, SEC-R08 | 2, 3, 5, 6, 10, 11, 13, 17 |
| SECURITY-09, SECURITY-11, SECURITY-13, SECURITY-15 | 2, 3, 5, 6, 10, 11, 13, 17 |
| PBT-01, PBT-03, PBT-05 through PBT-10, PBT-R07 | 3, 4, 10, 13, 17 |

## Mandatory Gates

- Application code remains in the workspace root; only Markdown summaries enter `aidlc-docs/`.
- Every completed step is checked in this file in the same interaction.
- All new interactive controls receive stable role-based names and `data-testid` values.
- No active promotion occurs before recovery, candidate verification, browser review, and explicit candidate approval.
- No performance-ceiling increase, dependency addition, unsafe media source, source-file deletion, or U-06 scope is permitted without a new explicit decision.
- SECURITY-01 through SECURITY-03, SECURITY-05 through SECURITY-08, SECURITY-12, and SECURITY-14 remain N/A for this static unit. SECURITY-04 and SECURITY-10 remain U-06 gates.
- PBT-02 and PBT-04 remain N/A because the design adds no inverse pair or idempotent operation.
