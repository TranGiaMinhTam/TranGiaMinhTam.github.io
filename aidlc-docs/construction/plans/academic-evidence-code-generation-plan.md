# Code Generation Plan - U-05 Academic and Evidence

> **Status: Part 2 executing. Complete plan explicitly approved on 2026-09-16. This document is the single source of truth for U-05 Code Generation.**

## Unit Context

- **Workspace root**: `/Users/nhamhhung/student_ports/TranGiaMinhTam.github.io`
- **Project type**: Brownfield single-package React, TypeScript, and Vite static application.
- **Review boundary**: VU-04.
- **Primary stories**: ST-009 and ST-010.
- **Requirements**: FR-009, FR-010, FR-017, and U05-NFR-SCL-001 through U05-NFR-EVD-001.
- **Approved domains**: `academic-trajectory` and `evidence-library`.
- **Application ownership**: `src/portfolio/academics/`, the public export and body-registry integration seams, U-05 verification scripts, package scripts, and the final approved `src/App.tsx` registry composition.
- **Documentation ownership**: `aidlc-docs/construction/academic-evidence/code/` only.
- **Activation rule**: Generate and verify an isolated candidate first. Do not change active `src/App.tsx` registration until the candidate passes every P0 gate and receives separate explicit rendered approval.

## Stories and Outcomes

| Story | Planned outcome | Acceptance focus |
| --- | --- | --- |
| ST-009 | A curriculum cross-section for two verified academic programs | Exact institution, period, subject, grade, language, status, recognition, evidence, and responsive chronology without a ledger or timeline |
| ST-010 | A full-width grouped archival Evidence Library | Ten canonical records, typed provenance, text-first PDFs, lazy images, semantic counts, safe actions, exclusions, and local failure |

## Dependencies and Stable Contracts

- U-01 supplies branded identifiers, verified academic records, the publication manifest, validation contracts, semantic tokens, shared accessibility primitives, boundary safeguards, and recovery tooling.
- U-02 supplies immutable section order, shell slots, hash navigation, focus, progress, themes, responsive shell, and temporary fallback.
- U-03 supplies the approved Identity and Questions bodies; its portrait and pending-CV boundary remain outside U-05.
- U-04 supplies the approved five-body composed registry, duplicate-rejecting composer, active 249,238-byte JavaScript and 30,359-byte CSS baseline, and research evidence use without transferring presentation ownership.
- U-05 consumes these contracts but does not change shell controllers, completed-domain components, final three temporary domains, dependencies, deployment, or GitHub Pages architecture.

## Interfaces and Boundaries

### Browser interfaces

- `AcademicEvidenceSelection` is an accepted immutable two-domain value or a rejected value with stable ordered findings.
- `AcademicProgram` and `AcademicFact` preserve exact verified wording and explicit completed/in-progress status.
- `AcademicEvidenceRelationship` joins academic programs or recognition markers to canonical published evidence.
- `EvidenceCapability` is a typed text-document or lazy-image capability resolved through the closed eligibility catalog.
- Archive rows, spectrum entries, and semantic counts consume the same ordered accepted group collection.
- `U05SectionBodyRegistry` owns exactly two factories; the existing composer combines them with the approved five-body registry and rejects duplicates.

### Non-browser interfaces

- The boundary inspector, verifier, budget evaluator, review collector, candidate guard, recovery snapshot, and evidence reporter remain development-only.
- No API layer, repository layer, database entity, migration, backend service, runtime cache, queue, PDF service, monitoring agent, or deployment artifact is introduced.

## Approved File Scope

### Create in application source

- `src/portfolio/academics/academic.types.ts`
- `src/portfolio/academics/academicEvidenceCatalog.ts`
- `src/portfolio/academics/academicEvidenceModel.ts`
- `src/portfolio/academics/AcademicEvidenceAction.tsx`
- `src/portfolio/academics/TextDocumentPreview.tsx`
- `src/portfolio/academics/LazyEvidenceImage.tsx`
- `src/portfolio/academics/AcademicStatus.tsx`
- `src/portfolio/academics/EvidenceCountSummary.tsx`
- `src/portfolio/academics/AcademicRelationshipSummary.tsx`
- `src/portfolio/academics/AcademicTrajectory.tsx`
- `src/portfolio/academics/EvidenceLibrary.tsx`
- `src/portfolio/academics/AcademicEvidence.module.css`
- `src/portfolio/academics/sectionBodies.tsx`
- `src/portfolio/academics/index.ts`
- `src/portfolio/academics/academicEvidenceCatalog.test.ts`
- `src/portfolio/academics/academicEvidenceModel.test.ts`
- `src/portfolio/academics/AcademicEvidenceBodies.test.tsx`
- `src/portfolio/academics/academicEvidenceStyles.test.ts`
- `src/portfolio/academics/sectionBodies.test.tsx`

### Create candidate and verification tooling

- `scripts/portfolio/academic-candidate/index.html`
- `scripts/portfolio/academic-candidate/main.tsx`
- `scripts/portfolio/academic-candidate/vite.config.mjs`
- `scripts/portfolio/verify-academic-evidence.mjs`

### Modify only where required

- `src/portfolio/index.ts` to export the approved U-05 public boundary.
- `scripts/portfolio/check-boundaries.mjs` for U-05 source, candidate, active, ownership, publication, and exclusion checks.
- `package.json` for focused U-05 candidate, measurement, boundary, test, preview, and verification commands without dependency changes.
- `src/App.tsx` only after rendered candidate approval, to activate the composed seven-body registry.

### Generate verification evidence

- `artifacts/portfolio/u05/` for preflight, recovery, baseline, candidate, review, decision, validation, and post-activation evidence.
- `aidlc-docs/construction/academic-evidence/code/implementation-summary.md`
- `aidlc-docs/construction/academic-evidence/code/verification-summary.md`
- `aidlc-docs/construction/academic-evidence/code/recovery-summary.md`

No duplicate `_new`, `_modified`, alternate component, or parallel active-entry file is permitted.

## Part 1 - Planning and Approval

- [x] Step 1 - Read the approved U-05 Functional Design, NFR Requirements, NFR Design, stories, unit contracts, dependency map, workflow state, reverse-engineered structure, and active U-01 through U-04 interfaces.
- [x] Step 2 - Confirm U-05 readiness, brownfield workspace root, exact ownership, story coverage, stable dependencies, and absence of API, repository, database, infrastructure, or deployment work.
- [x] Step 3 - Define the exact create, modify, evidence, and documentation scope and prohibit duplicate brownfield files.
- [x] Step 4 - Define the sequential model, component, test, candidate, rendered-review, activation, recovery, and evidence steps below.
- [x] Step 5 - Validate this plan's Markdown, tables, paths, checkboxes, story traceability, parsing compatibility, and extension status.
- [x] Step 6 - Summarize the complete plan and log the approval prompt.
- [x] Step 7 - Receive explicit approval for this complete Code Generation plan.
- [x] Step 8 - Record the exact approval response and mark Code Generation Part 1 complete in workflow state.

## Part 2 - Generation

### Step 9 - Capture U-05 Preflight and Recovery Boundary

- [x] Record source revision, working-tree scope, dependency/lockfile hashes, active entry and five-body registry hashes, tests, build baseline, and exact evidence bytes.
- [x] Run active U-01 through U-04 type, lint, focused/full test, boundary, recovery, verification, build, and measurement commands before U-05 source mutation.
- [x] Write machine-readable preflight, U-04 measurement baseline, and exact recoverable active-registration content under `artifacts/portfolio/u05/`.
- [x] Stop without source generation if an unexplained prerequisite failure or baseline mismatch exists. No unexplained failure or mismatch exists.

### Step 10 - Generate Typed Academic and Evidence Catalogs

- [x] Generate closed academic status/fact, evidence eligibility/group, preview capability, relationship, finding, and view-model types.
- [x] Map the exact two verified programs, ten U-05 evidence identifiers, four archive groups, transcript relationship, and two scholarship-offer relationships.
- [x] Keep the Identity portrait, pending CV, raw/private evidence, former-owner writing, and later-unit records outside every U-05 catalog.
- [x] Preserve canonical titles, captions, provenance, media kinds, source order, and status without runtime prose or path inference.

### Step 11 - Generate Deterministic Selection, Grouping, and Relationship Logic

- [x] Implement one-pass program selection, fact normalization, evidence lookup, endpoint indexing, relationship construction, grouping, archive projection, spectrum projection, semantic projection, and two-view-model assembly.
- [x] Return stable blocking findings for required program, field, status, duplicate, unsafe record, and endpoint failures.
- [x] Return typed non-blocking findings for optional evidence while preserving accepted academic content and recomputed counts.
- [x] Guarantee linear processing, stable order, repeated-run equality, canonical asset reuse, and exact archive/spectrum/semantic equivalence.

### Step 12 - Generate Shared Academic and Evidence Primitives

- [x] Implement purpose-labeled native evidence anchors with stable `{section}-{purpose}-evidence-link` test identifiers and safe same-origin destinations.
- [x] Implement metadata-only document previews with no embed, rasterization, preload, prefetch, or fetch behavior.
- [x] Implement lazy asynchronous images with intrinsic geometry, accurate alternatives, and local accessible failure.
- [x] Implement textual academic status, semantic evidence counts, and complete academic/evidence relationship summaries from immutable props.

### Step 13 - Generate the Two Distinct U-05 Bodies

- [x] Implement Academic Trajectory as a curriculum cross-section with current and completed strata, institution anchors, subject/result clusters, exact status, recognition, transcript evidence, and semantic relationships.
- [x] Implement Evidence Library as four grouped asymmetric archive surfaces with category anchors, spectrum, semantic counts, text PDF rows, lazy image rows, provenance, and full-evidence actions.
- [x] Keep every fact and accepted record visible without filters, accordions, carousels, hover, modal-only metadata, or image success.
- [x] Do not create a ledger, conventional timeline, repeated education cards, uniform evidence grid, embedded viewer, or relabeled earlier-unit layout.

### Step 14 - Generate U-05 Responsive and Accessible Styles

- [x] Create one locally owned CSS Module using U-01 tokens, Grid/Flexbox, logical properties, visible focus, non-color cues, and reserved image geometry.
- [x] Preserve curriculum and archival geometry at wide widths and one continuous reading order at narrow widths.
- [x] Support 320, 768, 1280, and 1440 CSS-pixel widths, both themes, increased text spacing, 200-percent zoom, reduced motion, long provenance, and action wrapping without document-level overflow.
- [x] Add no global override, routine `!important`, rejected selector family, duplicate theme/mobile tree, or dependency-driven styling.

### Step 15 - Generate and Compose the Two-Body Registry

- [x] Generate a U-05 registry containing exactly `academic-trajectory` and `evidence-library`.
- [x] Compose it immutably with the approved five-body registry while preserving duplicate rejection, resolver behavior, and temporary fallback.
- [x] Keep active `src/App.tsx` unchanged during candidate generation.
- [x] Verify the ten-slot candidate resolves seven finished bodies and three unchanged temporary bodies in approved order.

### Step 16 - Generate Pure Model, Failure, and Capacity Tests

- [x] Cover exact program facts/status/order, evidence eligibility/group/order, relationships, preview capabilities, exclusions, and accepted assembly.
- [x] Cover missing, duplicate, empty, unsafe, misgrouped, broken-endpoint, optional-evidence, and repeated-run cases with stable findings.
- [x] Cover four programs, twenty evidence items, and at least eighty relationships through indexed linear processing.
- [x] Prove exact canonical group, archive row, spectrum entry, semantic count, relationship identifier, membership, order, and count equality.

### Step 17 - Generate Component, Accessibility, Style, and Integration Tests

- [x] Cover headings, programs, institutions, periods, subjects, grades, IELTS, status, recognition, evidence metadata, provenance, targets, test IDs, and file types.
- [x] Cover native links, keyboard order, text document previews, lazy image attributes/failure, semantic counts, non-color cues, CSS/SVG/media degradation, and no hidden facts.
- [x] Cover two-body ownership, duplicate rejection, seven finished bodies, three temporary bodies, and unchanged prior-unit behavior.
- [x] Inspect styles for tokens, unique geometry, narrow reflow, focus, target sizing, reduced motion, reserved space, long text, and forbidden patterns.

### Step 18 - Generate Candidate and Verification Tooling

- [x] Create an isolated U-05 candidate entry and Vite configuration that compose approved U-01 through U-04 bodies with U-05.
- [x] Extend boundary checks with U-05 source, candidate, and active modes; exact ownership; safe publication; no raw/private/portrait/false-CV/former-owner/later-domain imports; and unchanged dependencies.
- [x] Generate `verify-academic-evidence.mjs` for scope, facts, status, relationships, groups, counts, assets, requests, budgets, exclusions, body ownership, decision, activation, and recovery.
- [x] Add focused package scripts only and verify dependency declarations and `package-lock.json` remain unchanged.

### Step 19 - Run the Inactive Candidate Automated Gate

- [x] Run strict TypeScript, focused U-01 through U-05 tests, complete tests, lint, candidate boundaries, recovery, all active prior-unit verifiers, and protected-source checks.
- [x] Run required-data, optional-evidence, image-failure, duplicate/unsafe record, capacity, repeatability, equivalence, exclusion, and ten-slot ownership cases.
- [x] Record exact commands, versions, durations, results, warnings, and dispositions.
- [x] Keep `src/App.tsx` unchanged if any P0 result fails. No P0 result failed, and the protected active-entry hash remained unchanged.

### Step 20 - Build, Measure, and Inspect the Isolated Candidate

- [x] Build the isolated candidate to a temporary directory and traverse its Vite manifest.
- [x] Enforce no more than 274,000 JavaScript bytes, 10-percent JavaScript growth from 249,238 bytes, and 43,008 CSS bytes.
- [x] Verify seven PDFs total 22,866,108 bytes and remain user initiated; verify three images total 1,251,556 bytes and remain lazy with reserved geometry.
- [x] Record emitted versus initial-request assets, dependency hashes, source boundaries, and unavailable P1 browser-performance evidence honestly.
- [x] Produce a candidate gate record; the P0-clean candidate is `eligible-for-review`.

### Step 21 - Conduct the Rendered Candidate Review

- [x] Start the isolated candidate and create `academic-evidence-candidate-review-questions.md` with the required A/B/X decision.
- [x] Record the first rendered-review Option B response and keep live activation blocked.
- [x] Correct undefined design-token references and unify header, navigation, spectrum, archive, preview, action, and responsive alignment rules.
- [x] Add alignment regression coverage; rerun strict TypeScript, 18 focused tests, 154 complete tests, lint, boundaries, recovery, prior-unit verification, build, measurement, and candidate verification.
- [x] Restart the corrected isolated candidate at the same review URL.
- [x] Record the second Option B response, remove the IGCSE-only horizontal offset, and let its verified record occupy the unused evidence column across responsive layouts.
- [x] Rebuild and revalidate the IGCSE correction with 18 focused tests, 154 complete tests, strict TypeScript, lint, boundaries, measurement, candidate verification, protected hashes, and the running preview response.
- [x] Review 320, 768, 1280, and 1440 CSS-pixel widths in light and dark themes. User rendered review and approval recorded; automated browser-matrix evidence remains an explicit P1 limitation.
- [x] Review curriculum/archive uniqueness, exact content, keyboard/focus, long provenance, media failure, semantic counts, zoom, text spacing, reduced motion, wrapping, and overflow. Automated structural coverage and user visual review passed after two correction cycles.
- [x] Record available browser versions, mobile timing, screenshots or observations, limitations, and exact user response. No browser version or mobile timing is claimed; user screenshots, two change requests, corrections, and final approval are recorded.
- [x] Do not activate U-05 until this candidate gate receives explicit approval. Approval received on 2026-09-17.

### Step 22 - Activate the Approved Candidate

- [x] Reconfirm active entry, approved five-body registry, prior-unit source boundaries, and lockfile match the preflight recovery snapshot.
- [x] Modify only the approved registry-composition seam in `src/App.tsx` so the live shell receives seven completed bodies.
- [x] Do not alter shell controllers, section order, prior completed bodies, final temporary bodies, dependencies, or deployment configuration.
- [x] Mark ST-009 and ST-010 implemented only after live registration succeeds. Live registration succeeded; both stories are implemented.

### Step 23 - Run Post-Activation Acceptance and Recovery Checks

- [x] Run strict TypeScript, focused/full tests, lint, active boundaries, every verifier, production build, measurements, and protected-source checks. All passed after one corrected P0 failure.
- [x] Confirm active code/assets/requests remain within budgets and candidate-to-active registry/content equivalence holds. Active JavaScript is 268,491 bytes and CSS is 42,005 bytes; the 62-byte candidate difference is the isolated entry module only.
- [x] Confirm seven finished bodies, three temporary bodies, exact academic facts, group/count equivalence, exclusions, safe actions, and unchanged lockfile/dependencies.
- [x] If any P0 check fails, restore exact pre-switch registration through a recoverable patch and record failed acceptance. The one P0 failure was a body-local landmark defect, corrected in place with the full gate rerun; no registration rollback was required.

### Step 24 - Generate Completion Evidence and Summaries

- [x] Write implementation, verification, and recovery summaries under `aidlc-docs/construction/academic-evidence/code/`.
- [x] Record created/modified files, story/NFR traceability, commands, versions, tests, budgets, assets, requests, rendered review, limitations, candidate decision, activation, and recovery.
- [x] Verify no duplicate brownfield files, unplanned application files, dependency changes, infrastructure artifacts, or non-Markdown files under `aidlc-docs/` were created.
- [x] Validate documentation for Markdown parsing, tables, paths, special characters, and whitespace.

### Step 25 - Present the U-05 Code Generation Review Gate

- [x] Update every plan checkbox and workflow state in the same interaction as completed work.
- [x] Present the standardized U-05 Code Generation completion message with application and documentation locations.
- [ ] Wait for explicit approval before advancing to U-06 Tools and Fieldwork.

## Planned Verification Commands

- `npx tsc -b`
- `npm run test:academic`
- `npm run test:research`
- `npm run test:identity`
- `npm run test:shell`
- `npm run test:portfolio`
- `npm test`
- `npm run lint`
- `npm run check:academic:source`
- `npm run check:academic:candidate`
- `npm run check:academic:active`
- `npm run verify:academic:source`
- `npm run verify:academic:candidate`
- `npm run verify:academic:active`
- `npm run verify:research:active`
- `npm run verify:identity:active`
- `npm run verify:shell -- --phase active`
- `npm run verify:recovery`
- `npm run build:academic-candidate`
- `npm run measure:academic-candidate`
- `npm run build`

Exact commands may add plan-defined output arguments but cannot expand application scope or dependencies.

## Completion Criteria

- ST-009 and ST-010 satisfy every approved acceptance criterion.
- All 18 U-05 NFRs have reproducible evidence or an honestly recorded P1 environment limitation.
- Academic Trajectory and Evidence Library are active; three later bodies remain temporary.
- Candidate approval precedes activation, and post-activation P0 checks pass or exact recovery is applied.
- JavaScript, CSS, PDF, image, and request budgets pass; full evidence remains lazy or user initiated.
- Exact academic facts, explicit status, canonical evidence reuse, group/count equivalence, and exclusions pass.
- Dependencies, lockfile, GitHub Pages deployment, shell controllers, and prior completed bodies remain unchanged except for the approved registry seam.
- Every execution checkbox is marked immediately when its work completes.

## Extension Compliance

- **Security Baseline**: Disabled in workflow state; its full rules remain unloaded. Approved U05-NFR-SEC-001 controls remain mandatory.
- **Property-Based Testing**: Disabled in workflow state; its full rules remain unloaded. Deterministic malformed tables, capacity fixtures, and repeated-run tests remain mandatory.
