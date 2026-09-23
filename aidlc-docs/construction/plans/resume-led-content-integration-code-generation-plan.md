# Code Generation Plan - U-03 Resume-Led Content Integration

> **Status: Part 1 approved with Option A for all sixteen decisions; Part 2 and Completion Revision B are complete and awaiting the standardized Code Generation approval. This document is the single source of truth for U-03 Code Generation.**

## Candidate Revision A - 2026-09-23

The user's explicit Option B review feedback authorizes this bounded candidate revision. Active promotion remains gated.

- [x] Record Option B feedback and keep candidate activation paused.
- [x] Resolve the new portrait dimensions, all old-portrait references, deleted former-owner assets, and affected layout components.
- [x] Switch published and legacy portrait consumers to `profile_pic.jpg`, update integrity metadata, and remove the superseded portrait recoverably after a clean reference scan.
- [x] Remove the requested vertical accents and correct Laboratory Research, Academic Trajectory, Evidence, Methods and Tools, Contact, and Research Note layout.
- [x] Update focused assertions and run static, unit, boundary, and build validation.
- [x] Rebuild candidate review evidence and return to the explicit activation gate.

## Completion Revision B - 2026-09-23

The user's explicit eleven-item change request reopens the U-03 completion gate and authorizes this bounded revision. The currently active implementation remains recoverable and the stage cannot complete until this revision is reviewed.

- [x] Record the completion-gate change request, reopen U-03 Code Generation, and inventory the affected identity, question, research, academic, evidence, resume-presentation, and asset seams.
- [x] Remove the portrait visual-field overlay, repair identity metadata alignment, simplify the question explanation, reduce constellation markers, and align computational workflow arrows.
- [x] Replace visitor-facing source/provenance distinctions with natural portfolio copy and set the two unspecified research contributions to Research assistant.
- [x] Reassign the current Data image to First Place - Future Innovator Camp, remove unsupported retail-project visual evidence, and remove the SIM-LSE project-note action.
- [x] Remove the academic transcript action, align the Academic Trajectory header, and publish non-destructive two-page scholarship display PDFs while retaining originals.
- [x] Integrate the complete curated 2026 Protein Docking folder into the first computational project and Project Visuals evidence group.
- [x] Update focused contracts, regenerate governed catalog/evidence, and run TypeScript, lint, complete/focused tests, privacy, integrity, boundaries, builds, measurements, and browser review.
- [x] Update the completion summary and return to the standardized two-option Code Generation gate.

## Unit Generation Context

- **Stories**: US-003 through US-007.
- **Requirements**: FR-004, FR-005, FR-013 through FR-017, NFR-015, PBT-R08, and U03-NFR-01 through U03-NFR-27.
- **Consumes**: U-01 safe media, catalog, privacy, source integrity, PBT, and recovery contracts; U-02 masthead resume slot, semantic summaries, responsive tokens, and rendered-review adapter.
- **Provides**: Human-reviewed public claim catalog, reconciliation/mapping core, immutable per-section resume groups, shared verified resume download, candidate/evidence tooling, and reversible active integration.
- **Brownfield boundary**: Modify existing files in place; do not create `_new`, `_modified`, backup siblings, replacement entries, or duplicate content stores.
- **Excluded**: U-04 archive browser, U-05 PDF/image previews or dialogs, U-06 deployment/security headers, API, database, infrastructure, analytics, telemetry, runtime PDF parsing, source deletion, and unrelated refactoring.

## Source Drift Preflight

The source path originally supplied by the user currently differs from the U-01 protected copy:

| File | Bytes | SHA-256 |
| --- | ---: | --- |
| Current attached `/Users/nhamhhung/ASEAN/Resume_Minh Tam.pdf` | 113,775 | `8de5fc42ca8c443a7dcad6daa2766d7cd5f3a596369a463e54a74b101ec49282` |
| Protected canonical `src/assets/documents/Tran-Gia-Minh-Tam-Resume.pdf` | 169,191 | `c9cca8a890cff3e0a6836539312b4eb8313732426aa207143a9f8f4d3179e8d6` |
| Pre-existing unrelated `src/assets/documents/resume.pdf` | 103,033 | `7ca0d97a208bbb9fd0e026ae51a164792e2efa6b2388c303141c1466853874dd` |

No file has been changed. Question 1 explicitly resolves which source becomes authoritative.

## Planned Application and Tooling Paths

### Create

- `src/portfolio/resume/resumeClaims.ts`
- `src/portfolio/resume/resumeReconciliation.ts`
- `src/portfolio/resume/resumeSectionMap.ts`
- `src/portfolio/resume/resumeContentModel.ts`
- `src/portfolio/resume/ResumeAction.tsx`
- `src/portfolio/resume/ResumeContentGroup.tsx`
- `src/portfolio/resume/ResumeContent.module.css`
- Focused example and PBT files beside the resume modules.
- `scripts/portfolio/resume-content-candidate/` isolated candidate entry/config.
- `scripts/portfolio/resume-content-review/` recovery, privacy, integrity, matrix, measurement, evidence, and review adapters.
- `artifacts/portfolio/u03-resume-content/` generated local evidence and screenshots.

### Modify in place

- `src/portfolio/resume/resume.types.ts` and `index.ts`.
- `src/portfolio/model/portfolio.types.ts` only where shared authority/provenance contracts require a compatible extension.
- Existing identity, research, academic, impact, and contact section registry/components to consume approved per-section groups without duplicating domain facts.
- `src/portfolio/identity/IdentityActions.tsx`, `identity.types.ts`, `identityQuestionsModel.ts`, and related tests to replace the pending CV state with the shared validated action.
- `src/portfolio/shell/PortfolioExperience.tsx` and related tests to pass the same action into the existing U-02 masthead slot.
- `src/App.tsx` only at the final approved promotion seam.
- `src/portfolio/boundaries.test.ts`, `src/portfolio/sourceGovernanceBoundaries.test.ts`, and `scripts/portfolio/check-boundaries.mjs` for U-03 ownership/privacy/later-unit gates.
- `package.json` scripts only; dependency and version objects remain unchanged.
- Approved NFR/source-integrity documentation only if Question 1 authorizes a newly supplied canonical resume baseline.

### Asset handling

- The selected canonical resume target remains `src/assets/documents/Tran-Gia-Minh-Tam-Resume.pdf`.
- The external source is read-only.
- The unrelated `src/assets/documents/resume.pdf` is neither deleted nor activated in U-03.
- No `src/assets/minh-tam/` source file is modified or deleted.

## Layer Applicability

- Business logic, unit tests, frontend components, frontend tests, documentation, candidate tooling, and evidence generation: applicable.
- API layer, repository/database layer, migrations, infrastructure, server deployment artifacts, authentication, and runtime services: N/A.
- Production security-header and SBOM delivery remain U-06-owned.

## Code Generation Questions

Complete every `[Answer]:` tag with one option letter. Option A is recommended.

## Question 1 - Current Resume Source Drift

Which PDF should govern U-03 content and download publication?

A) Treat the current attached file at `/Users/nhamhhung/ASEAN/Resume_Minh Tam.pdf` as the newly supplied authority, capture both old and new facts in recovery/evidence, update the canonical bundled target only after isolated verification, and amend numeric integrity references to the newly approved bytes/hash (recommended)
B) Ignore the current attached file and retain the 169,191-byte protected bundled copy as authority
C) Publish both resume versions with separate download actions
X) Other (describe after the answer tag)

[Answer]: A

## Question 2 - Recovery Scope

What must be recoverable before any U-03 mutation?

A) Capture every planned existing/new target, current attached/canonical/stale resume facts, active entry/registry hashes, tracked diffs, U-01/U-02 protected facts, and relevant untracked payload; rehearse byte-for-byte restoration in an isolated target and stop on any mismatch (recommended)
B) Capture only files expected to be modified
C) Depend on Git and editor undo
X) Other (describe after the answer tag)

[Answer]: A

## Question 3 - Resume Extraction and Review

How should content be derived from the selected PDF?

A) Extract locally into transient memory, never echo or persist raw text/private values, normalize one public claim at a time, manually compare every claim against the selected PDF, and persist only reviewed public claims plus safe page/category/provenance metadata (recommended)
B) Commit the complete extracted text and filter it at render time
C) Parse the PDF in the visitor's browser
X) Other (describe after the answer tag)

[Answer]: A

## Question 4 - Public Claim Catalog

How should reviewed resume facts be stored?

A) Create one immutable typed public claim catalog with stable IDs, closed categories, exact reviewed facts, periods, safe source-page locators, publication/review state, and explicit evidence IDs; private/document-only facts never enter the module (recommended)
B) Copy prose directly into each JSX component
C) Store a page-level free-form transcript and parse it dynamically
X) Other (describe after the answer tag)

[Answer]: A

## Question 5 - Reconciliation Architecture

How should resume-led content coexist with existing verified domain models?

A) Keep existing verified domain selections intact, reconcile the central public claim catalog against them, and provide one immutable per-section resume-content selection that domain registries consume alongside existing content without changing exact domain cardinalities (recommended)
B) Append every resume claim directly into `verifiedPortfolioSource.records`, even when existing selectors require exact counts
C) Replace all existing verified domain records with resume claims
X) Other (describe after the answer tag)

[Answer]: A

## Question 6 - Section Presentation Integration

How should complete resume-led groups appear across the ten sections?

A) Use one shared semantic `ResumeContentGroup` renderer supplied through each existing domain registry/component, with domain-specific placement and styling hooks; keep core records visible, preserve section order, and prevent duplicated primary statements (recommended)
B) Append one identical generic resume panel after every section
C) Add a new eleventh Resume section
X) Other (describe after the answer tag)

[Answer]: A

## Question 7 - Download Integration

How should the two download actions be activated?

A) Verify the selected bundled PDF, create one immutable `DownloadableResume`, adapt it once to the existing masthead action contract, inject it through `PortfolioExperience`, and use the same object in Identity with stable `data-testid` values and native download behavior (recommended)
B) Build separate raw href strings in masthead and Identity
C) Use JavaScript fetch/blob downloads
X) Other (describe after the answer tag)

[Answer]: A

## Question 8 - Authority and Conflict UI

How should visible authority be rendered?

A) Render restrained text labels `Evidence-backed` or `Resume-sourced` from validated authority only; conflicted/unreviewed claims never render, and detailed source paths/page locators stay out of visitor UI (recommended)
B) Render every claim as verified
C) Show absolute source paths and raw conflict values on cards
X) Other (describe after the answer tag)

[Answer]: A

## Question 9 - Evidence and Later-Unit Boundary

How should U-03 link supporting documents and images?

A) Preserve explicit canonical evidence IDs and current safe evidence actions, add no temporary archive browser/preview/dialog, and fail on broken references before candidate composition (recommended)
B) Implement PDF and image popups now inside U-03
C) Remove evidence actions until U-05
X) Other (describe after the answer tag)

[Answer]: A

## Question 10 - Privacy Verification

How should the phone/document-only boundary be enforced during generation?

A) Reuse approved one-time local non-echoing extraction solely to derive an ephemeral marker, scan source/build/DOM/metadata/tests/logs/evidence, allow the marker only inside approved PDF bytes, and block without printing the value or persisting it (recommended)
B) Store the phone in test fixtures and snapshots for verification
C) Search only visible text manually
X) Other (describe after the answer tag)

[Answer]: A

## Question 11 - PBT and Example Coverage

How should the reconciliation/mapping core be tested?

A) Implement U03-P01 through U03-P10 with constrained reusable generators, simple oracles, at least 100 cases/property, fixed/logged seed, shrinking, replay, and no silent retry; add separate examples for all five stories, source drift, privacy, conflicts, downloads, invalid references, capacity, and later-unit boundaries (recommended)
B) Use generated arbitrary strings and remove example tests
C) Defer properties until final Build and Test
X) Other (describe after the answer tag)

[Answer]: A

## Question 12 - Candidate and Render Matrix

How should the isolated U-03 candidate be reviewed?

A) Compose all ten active sections plus both downloads, generate the four-width/two-theme base matrix with focused keyboard/zoom/text-spacing/forced-colors/request cases, automate available Chromium checks/screenshots, record Firefox/Safari/iOS Safari honestly, and require explicit candidate approval before active promotion (recommended)
B) Review Identity only at desktop width
C) Activate first and review the production page afterward
X) Other (describe after the answer tag)

[Answer]: A

## Question 13 - Performance and Dependency Gate

Which build constraints should block the candidate?

A) Add no dependency; require initial JavaScript at most 320 KiB and 8 percent growth, CSS at most 60 KiB and 12 percent growth, three initial requests, no eager resume request, CLS at most 0.1, and exact candidate-manifest evidence (recommended)
B) Allow dependency additions and bundle growth below one megabyte
C) Skip performance measurement for content changes
X) Other (describe after the answer tag)

[Answer]: A

## Question 14 - Stale Resume Asset Handling

How should `src/assets/documents/resume.pdf` be treated?

A) Preserve it untouched and unreferenced because deletion is outside U-03; add a boundary assertion that public resume actions use only the selected canonical `Tran-Gia-Minh-Tam-Resume.pdf` (recommended)
B) Delete it during U-03
C) Expose it as a third resume download
X) Other (describe after the answer tag)

[Answer]: A

## Question 15 - Evidence and Diagnostics Format

How should generation/review evidence be stored?

A) Write schema-versioned canonical JSON plus concise Markdown summaries with stable ordering, safe relative targets, counts/hashes/measurements/findings/browser status, non-zero blocking exits, and no raw resume text or private values (recommended)
B) Use console messages only
C) Upload evidence and resume content to a remote service
X) Other (describe after the answer tag)

[Answer]: A

## Question 16 - Final Validation and Promotion

What must pass before the active composition changes?

A) Require recovery, selected-source/canonical integrity, claim review and category/mapping completeness, zero conflict/privacy/duplicate/reference findings, focused examples/PBT, strict TypeScript, lint, full tests, source boundaries, production build, exact budgets/requests/CLS, complete candidate matrix, browser status, accessibility, `git diff --check`, and explicit candidate approval; then make one reversible promotion and repeat all applicable gates (recommended)
B) Promote after TypeScript and build pass
C) Promote sections independently as their local tests pass
X) Other (describe after the answer tag)

[Answer]: A

## Story Completion Gates

- **US-003**: Both native actions download the selected bundled PDF with identical stable semantics and no public phone leakage.
- **US-004**: Identity and Methods represent all applicable profile, language, skill, laboratory, and interest claims once with honest authority.
- **US-005**: Academic content retains reviewed institutions, periods, results, qualifications, scholarships, and recognition with field-level reconciliation.
- **US-006**: Research/data content retains reviewed projects, honors, quantities, and contribution boundaries without inferred roles/results.
- **US-007**: Fieldwork/Leadership represents all reviewed leadership, volunteering, mentoring, debate, conservation, summit, and sports records once.

## Numbered Execution Plan

### Part 1 - Planning

- [x] Step 1 - Read U-03 unit/story/requirement maps, approved Functional/NFR designs, active U-01/U-02 interfaces, reverse-engineered structure, current domain selectors/components, resume tooling, package scripts, extension rules, and active measurements.
- [x] Step 2 - Inspect exact brownfield targets and detect current resume-source drift without mutating source, bundle, or application code.
- [x] Step 3 - Define created/modified application, candidate, recovery, evidence, test, and documentation paths; mark API, repository/database, migration, infrastructure, and deployment generation N/A.
- [x] Step 4 - Create this complete numbered plan with questions, story/requirement/NFR/property/security traceability, candidate approval, recovery, and downstream boundaries.
- [x] Step 5 - Receive and validate answers to all sixteen questions. All answers are Option A.
- [x] Step 6 - Resolve every ambiguity or contradiction through a dedicated clarification file if required. The Option A decisions consistently select the newly supplied resume and introduce no unresolved ambiguity; no clarification file is required.
- [x] Step 7 - Obtain explicit approval of the complete plan and generation sequence. Approved on 2026-09-23.

### Part 2 - Generation

- [x] Step 8 - Capture and verify a fresh target-specific recovery package before mutation, including the three resume facts, planned absence states, active composition, registries, protected sources, and isolated restoration rehearsal. Captured 36 existing targets and 18 absence states across 54 targets; isolated byte-for-byte restoration passed with zero findings and the newly supplied external resume remained read-only.
- [x] Step 9 - Resolve Question 1's source authority, verify PDF signature/size/hash and external-source stability, update the canonical bundled PDF atomically if authorized, and refresh source-integrity facts without touching the stale unrelated PDF or external original. The approved current source and canonical copy are byte-identical at 113,775 bytes with SHA-256 `8de5fc42ca8c443a7dcad6daa2766d7cd5f3a596369a463e54a74b101ec49282`; the external and stale PDF remained unchanged and the prior canonical is recoverable.
- [x] Step 10 - Perform approved transient local extraction and human claim-by-claim comparison; persist only the reviewed public claim catalog and safe metadata, with no raw transcript or document-only value. Reviewed 21 public claims across 12 categories and two pages; no raw transcript, email, phone, or document-only value was persisted.
- [x] Step 11 - Implement U-03 types, validators, indexed field-level reconciliation, closed section map, immutable projection, normalized findings, and U03-P01 through U03-P10 reference seams. Added a closed twelve-category map, deterministic immutable ten-section projection, fail-closed duplicate/reference/completeness findings, shared validated download model, and pure seams for the approved property suite; strict TypeScript passes.
- [x] Step 12 - Implement the shared authority label, resume content group, native resume action, CSS, and exact local-capability adapter with stable automation identifiers. Added semantic, responsive and forced-colors-aware presentation with visible Evidence-backed/Resume-sourced labels, safe existing evidence actions, native download semantics, and stable test identifiers; strict TypeScript passes.
- [x] Step 13 - Integrate the immutable resume selection into existing identity, research, academic, impact, and contact registries/components while preserving their verified selections, cardinalities, section IDs/order, evidence actions, Journal, contact, theme, and hidden summaries. Added a non-mutating registry decorator that retains every existing body and appends only that section's validated primary claims; empty groups render nothing and the active registry remains unchanged.
- [x] Step 14 - Pass the single validated action through `PortfolioExperience` to the U-02 masthead slot and replace the Identity pending CV state; do not activate the live entry yet. Added optional typed propagation, a candidate-capable Identity registry factory, and stable masthead/Identity identifiers while preserving the current pending state in the active default registry and leaving `src/App.tsx` unchanged.
- [x] Step 15 - Add focused examples, component/accessibility/style/boundary/integrity/privacy/capacity tests and U03-P01 through U03-P10 with deterministic seed/replay evidence. Added 29 focused passing tests across nine files, including all ten properties at 100 runs each with seed 20260923, reviewed-model counts, fail-closed references, privacy/source integrity, immutable registry composition, textual authority, native dual-download seams, responsive/forced-colors CSS, and pre-approval activation boundaries; strict TypeScript and lint pass. Recovery payloads are excluded from normal Vitest discovery.
- [x] Step 16 - Implement isolated candidate entry/build, U-03 boundary mode, canonical render-case generator, browser probe, privacy/integrity/recovery verifiers, exact measurement, and schema-versioned evidence without installing a package. Added an isolated ten-section candidate with both downloads, 80-case base matrix plus seven focused cases, headless-Chromium probe/reviewer, baseline and manifest measurement, non-echoing privacy scan, selected/stale PDF integrity checks, targeted recovery verification, source/candidate/active boundary modes, and package commands with no dependency change. Script syntax, both pre-activation boundary modes, strict TypeScript, and lint pass.
- [x] Step 17 - Build and validate the isolated candidate; run all non-browser gates and the complete locally available rendered matrix, write screenshots/evidence, and document unavailable engines honestly. After approved clarification Option A isolated four unreachable former-owner suites tied to 27 concurrent legacy-asset deletions, 68 files/237 tests, strict TypeScript, lint, production/candidate builds, boundaries, privacy, integrity, recovery, exact budgets, and diff checks pass. The 80-case base plus nine-case supplemental Chrome matrix produced 12 screenshots and zero findings; Firefox, Safari, and iOS Safari remain manual-pending.
- [x] Step 18 - Create a dedicated candidate review question file summarizing content counts, source reconciliation, privacy/integrity, exact performance, browser status, screenshots, and blockers; wait for explicit candidate approval. Initial Option B feedback was implemented and revalidated; revised Question 2 Option A was approved on 2026-09-23.
- [x] Step 19 - After candidate approval only, perform the smallest reversible active composition change and immediately repeat integrity, privacy, focused tests, boundaries, build, budgets, requests, rendered checks, and recovery verification. Activated the reviewed registry decoration and shared download seam; all current active gates pass.
- [x] Step 20 - Run comprehensive validation: strict TypeScript, ESLint, focused and full Vitest, U03-P01 through P10 with seed, production build, source/privacy/integrity scans, claim/category/reference completeness, accessibility/style checks, exact bundles/requests/CLS, browser matrix status, downstream-boundary checks, and `git diff --check`. Final results: 68 files and 238 tests, 29 focused tests, zero active Chrome findings across 84 cases, maximum CLS 0.0247, zero overflow, three initial requests, and passing current boundaries/build/lint/diff gates.
- [x] Step 21 - Generate `aidlc-docs/construction/resume-led-content-integration/code/code-generation-summary.md` with created/modified files, selected resume facts, claim/category counts, reconciliation outcomes, tests/PBT, measurements, privacy/security, recovery, browser status, evidence paths, and downstream boundaries.
- [x] Step 22 - Verify no duplicate replacement files, raw transcript/private-value persistence, protected-source deletion/mutation, stale-resume activation, unapproved dependency, U-04/U-05 feature activation, unchecked plan step, or unresolved blocker; present the standardized Code Generation completion gate. Final audit found no blocker; package dependency and development-dependency objects exactly match the recovery baseline.

## Security and PBT Gates

- SECURITY-09, SECURITY-10, SECURITY-11, SECURITY-13, and SECURITY-15 are blocking. SECURITY-04 remains U-06-owned; SECURITY-01 through 03, 05 through 08, 12, and 14 are N/A to U-03.
- PBT-01, PBT-03 through 05, and PBT-07 through 10 are blocking. PBT-02 and PBT-06 remain N/A unless implementation introduces an inverse pair or mutable domain state.
- Candidate approval and Code Generation completion cannot offer continuation while an applicable blocker remains.

Approval authorizes only this numbered U-03 sequence. It does not pre-approve candidate promotion, deployment, package installation, archive browsing, PDF/image dialogs, source deletion, infrastructure, or unrelated changes.
