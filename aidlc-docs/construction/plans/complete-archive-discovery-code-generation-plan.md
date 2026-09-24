# Code Generation Plan - U-04 Complete Archive Discovery

> **Status: Part 1 approved with Option A for all thirteen decisions; Part 2 generation is in progress.** This document is the single source of truth for U-04 Code Generation.

## Protein Docking Deduplication Amendment - 2026-09-24

- [x] Trace every current Protein Docking import, physical PDF alias, deleted gallery path, generated manifest entry, and visitor placement.
- [x] Confirm the source publication and `certificates/protein-docking-research.pdf` are byte-identical at SHA-256 `dcc1b81a83eb9d3b10e6b9dc36c4452735e34f4f93db16355a2c782bf1669e74`.
- [x] Confirm the five relevant images no longer exist in the working tree, but their distinct tracked Git blobs remain recoverable with hashes `33f273...`, `6ac9d9...`, `2fe544...`, `02ed82...`, and `2e7f77...`.
- [x] Preserve the user's deletion of the duplicate `gallery/2026 Protein Docking/` folder and plan one canonical source-backed collection instead of recreating that duplicate folder.
- [x] Resolve Question 13 with Option A and carry the canonical asset and visitor-placement strategy into Part 2.

The current source tree contains the authoritative publication under `source/Science research /2026 Protein Docking/`. The five photos can be retrieved from their tracked Git blobs into that source project folder during approved generation. No deleted duplicate folder or second public gallery is required.

## User-Directed Stage Routing

- [x] U-04 Functional Design approved on 2026-09-23.
- [x] U-04 NFR Requirements skipped by explicit user instruction.
- [x] U-04 NFR Design skipped by explicit user instruction.
- [x] Infrastructure Design is N/A because U-04 changes only the existing static client application.
- [x] Carry the approved Functional Design performance, accessibility, security, privacy, source-integrity, lazy-loading, and PBT constraints directly into Code Generation.

## Unit Generation Context

- **Stories**: US-013 and US-017.
- **Requirements**: FR-020, FR-021, FR-032; NFR-008 through NFR-012; PBT-R05.
- **Consumes**: U-01 canonical archive and media-source contracts, U-02 shell/layout contracts, U-03 narrative/evidence reconciliation, and the approved U-04 Functional Design artifacts.
- **Provides**: Complete activity-based archive discovery, lazy group loading, safe image/document cards, U-05 media trigger contracts, and the approved Contact presentation correction.
- **Governed inventory**: 127 physical files, 110 canonical items, and complete membership for all 109 non-system files under `src/assets/minh-tam/source/` after canonical Protein Docking relocation.
- **Explicit exclusion**: Academic transcripts remain internally inventoried but unpublished.
- **Brownfield boundary**: Modify existing files in place; do not create replacement copies or delete source files.
- **Excluded**: PDF/image dialogs, backend/API/database work, analytics, uploads, deployment/header changes, source deletion, and runtime source parsing.

## Planned Application and Tooling Paths

### Create

- `src/portfolio/archive/archiveEligibility.ts`
- `src/portfolio/archive/archiveDiscoveryModel.ts`
- `src/portfolio/archive/archiveGroupLoaders.ts`
- `src/portfolio/archive/archiveGroups.ts`
- `src/portfolio/archive/ArchiveExplorer.tsx`
- `src/portfolio/archive/ArchiveGroup.tsx`
- `src/portfolio/archive/ArchiveCards.tsx`
- `src/portfolio/archive/ArchiveExplorer.module.css`
- Generated, statically bounded group modules under `src/portfolio/archive/generated/groups/`
- Focused example and PBT files beside the archive modules.
- Isolated U-04 candidate and review adapters under `scripts/portfolio/complete-archive-discovery-*`.
- Schema-versioned local evidence under `artifacts/portfolio/u04-complete-archive/`.
- `aidlc-docs/construction/complete-archive-discovery/code/code-generation-summary.md`.

### Modify in place

- `src/portfolio/archive/archive.types.ts`, `archiveMetadata.ts`, `archiveModel.ts`, and `index.ts`.
- `src/portfolio/archive/generated/archive-manifest.json` only through the approved deterministic generator when metadata or eligibility output requires regeneration.
- `src/portfolio/academics/EvidenceLibrary.tsx`, `AcademicEvidence.module.css`, the academic view model/registry, and focused tests.
- `src/portfolio/contact/ContactSignal.tsx`, `Contact.module.css`, contact copy constants, and focused tests.
- `src/portfolio/model/evidenceManifest.ts` and related selectors only where archive capability references require a compatible extension.
- `src/portfolio/boundaries.test.ts`, `src/portfolio/sourceGovernanceBoundaries.test.ts`, and `scripts/portfolio/check-boundaries.mjs`.
- `package.json` scripts only; dependency/version objects remain unchanged.
- `src/App.tsx` only at the final explicitly approved candidate promotion seam if composition wiring changes.

### Protein Docking asset resolution

- Retrieve the five unique tracked images into `src/assets/minh-tam/source/Science research /2026 Protein Docking/` only after plan approval.
- Use the existing source-folder conference publication as the single public PDF capability.
- Remove all runtime imports that target the deleted `src/assets/minh-tam/gallery/2026 Protein Docking/` paths.
- Keep byte-identical aliases as internal provenance only; do not render duplicate cards or issue duplicate network requests.
- Do not restore the deleted duplicate gallery directory.

## Layer Applicability

- Business logic, unit tests, frontend components, frontend tests, candidate tooling, browser evidence, and documentation: applicable.
- API, repository/database, migration, infrastructure, authentication, and deployment artifact generation: N/A.
- U-05 dialog/viewer implementation and U-06 response-header/SBOM delivery: excluded.

## Code Generation Questions

Complete every `[Answer]:` tag with one option letter. Option A is recommended.

## Question 1 - Recovery Scope

What must be recoverable before U-04 application changes begin?

A) Capture all planned archive, Evidence Library, Contact, boundary, script, manifest, package-script, and active-composition targets plus absence states; rehearse isolated restoration and stop on mismatch (recommended)
B) Capture only React and CSS files expected to change
C) Depend on Git/editor undo without a unit recovery package
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 2 - Public Eligibility

How should public archive eligibility be enforced?

A) Add an explicit typed eligibility layer that keeps every physical membership internally, excludes both transcript canonical items, and blocks any eligible item without exactly one primary disposition (recommended)
B) Remove transcript files from the source folders and manifest
C) Publish every manifest item regardless of prior exclusions
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 3 - Titles, Captions, and Subcollections

How should generic archive labels become relevant showcases?

A) Replace generic `Archive record` visitor copy with reviewed natural titles/captions and explicit project/activity subcollections for all eligible items, while keeping raw paths and technical provenance internal (recommended)
B) Keep generic titles and show source folder names as captions
C) Generate public titles automatically from filenames at runtime
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 4 - Group Module Splitting

How should on-demand group loading be implemented?

A) Generate one statically bounded data module per public group, expose a closed dynamic-import registry, keep summaries eager, and reject unknown IDs before import (recommended)
B) Dynamically import one module containing all archive items
C) Bundle all group data and media imports into the initial Evidence Library module
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 5 - Explorer Interaction

How should the Evidence Library activate groups?

A) Render summary buttons with counts, keep all groups closed initially, allow one expanded group at a time, and cache successful group data for the page session (recommended)
B) Automatically open the first group on page load
C) Render every group simultaneously
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 6 - Media Cards and U-05 Boundary

What should image and document cards do in U-04?

A) Use dimensioned lazy thumbnails and compact document/original actions with typed detail triggers, but do not implement PDF/image dialogs or full-document embeds (recommended)
B) Show metadata only and no media/actions
C) Implement the complete U-05 viewer functionality now
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 7 - Contact Correction

How should the approved Contact presentation be implemented?

A) Use the approved inclusive personal-portfolio copy, rename the action to Open email draft, and create a balanced note/button row that stacks full-width on narrow screens without changing validation or mailto behavior (recommended)
B) Change copy only and retain the current button geometry
C) Remove the local composer and keep only the direct email link
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 8 - Example and Property Tests

How should U-04 logic be verified?

A) Implement U04-P01 through U04-P09 with reusable constrained generators, at least 100 runs/property, shrinking and fixed/logged seed; add separate examples for coverage, transcript exclusion, key groups, loading/failure, Contact, and request boundaries (recommended)
B) Use example tests only
C) Test only the rendered happy path
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 9 - Performance Budgets

Which measurements should block candidate activation?

A) Preserve approved initial JavaScript/CSS/request ceilings, prohibit archive originals on initial load, measure first/repeat group activation, require declared media dimensions, and require explicit approval for any increase (recommended)
B) Allow up to 25 percent initial growth without further approval
C) Skip numeric performance evidence
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 10 - Safe Failure and Security

How should invalid group/media conditions behave?

A) Fail closed before imports or unsafe URL rendering, show concise visitor-safe states with Retry where recoverable, retain metadata/safe actions, and prohibit paths/stacks/raw exceptions in UI or evidence (recommended)
B) Hide all failed content silently
C) Show raw technical errors to visitors
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 11 - Candidate Review

How should the completed interface be reviewed before active promotion?

A) Build an isolated candidate and test both themes, 320/768/1280/1440 widths, keyboard, zoom/text spacing, forced colors, representative groups, empty/not-found/failure states, Contact, requests, budgets, and screenshots (recommended)
B) Review one desktop screenshot only
C) Activate first and review the live page afterward
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 12 - Promotion Gate

When may U-04 change the active composition?

A) Only after recovery, source coverage, transcript exclusion, examples/PBT, TypeScript, lint, full tests, boundaries, production/candidate builds, performance/request evidence, browser review, and explicit candidate approval all pass; then repeat applicable gates after one reversible promotion (recommended)
B) After TypeScript and unit tests pass
C) Promote each group independently as it is implemented
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 13 - Protein Docking Canonical Collection

How should the duplicated 2026 Protein Docking evidence be canonicalized and displayed?

A) Retrieve the five unique tracked images into the existing source project folder, use the source-folder conference PDF as the single public document, keep one image showcase in the first Computational Project, and let Evidence Library reference that narrative placement without repeating the same five cards (recommended)
B) Put the full image gallery only in Evidence Library and reduce the Computational Project to one representative image plus the PDF action
C) Restore the deleted duplicate gallery folder and continue showing the same items in both sections
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Numbered Execution Plan

### Part 1 - Planning

- [x] Step 1 - Read the approved U-04 Functional Design artifacts, unit/story/requirement maps, U-01 through U-03 contracts, current archive/catalog/Evidence/Contact implementation, active state, and Code Generation rules.
- [x] Step 2 - Confirm brownfield targets, application/documentation locations, stage override, layer applicability, source inventory, exclusions, and U-05/U-06 boundaries.
- [x] Step 3 - Create this detailed plan with exact paths, questions, sequential implementation, recovery, candidate approval, story traceability, Security Baseline, and PBT gates.
- [x] Step 4 - Receive and validate answers to all thirteen questions. All answers are Option A and introduce no ambiguity or contradiction.
- [x] Step 5 - Obtain explicit approval of the complete plan and generation sequence. Approved on 2026-09-24.

### Part 2 - Generation

- [x] Step 6 - Capture and verify a fresh U-04 recovery package for all planned existing/new targets, active composition, generated catalog/manifest facts, package scripts, and absence states; rehearse isolated restoration. Captured 38 existing files and 22 absence states across 60 targets; verified all five Protein Docking Git blobs and the canonical source publication; isolated restoration passed with zero findings.
- [x] Step 7 - Implement typed publication eligibility and complete-discovery validation, preserving all physical memberships while excluding transcripts and system metadata from public projection. Added explicit immutable public/excluded decisions, narrative ownership for identity and Protein Docking visuals, safe findings, and focused passing tests; strict TypeScript passes.
- [x] Step 8 - Replace generic public archive metadata with reviewed natural group/subcollection titles, captions, accessibility text, orders, and primary dispositions; retrieve the five unique Protein Docking images into the source project folder, canonicalize the source PDF, remove deleted-gallery imports and duplicate public placement, then regenerate governed outputs deterministically. The governed projection now contains 127 physical files and 110 canonical items; all five images live only in the source project folder, the source publication is the only imported public PDF, the deleted duplicate folder remains absent, and the academic Evidence Library no longer repeats the five project images.
- [x] Step 9 - Implement immutable group summaries, group selection, closed lazy-loader registry, generated per-group modules, session cache seam, safe findings, and U04-P01 through U04-P09 pure test interfaces. Generated six closed lazy groups covering 101 primary public cards; eager summaries contain counts only, unknown IDs fail before import, successful groups cache for the page session, and focused loader/model tests plus strict TypeScript validation pass.
- [x] Step 10 - Implement Archive Explorer, summary controls, one-group region, loading/retry/empty/not-found states, responsive image/document/narrative cards, and U-05 trigger boundary with stable automation identifiers. Added keyboard-native summary buttons, single-group loading, visitor-safe Retry/empty/failure states, dimensioned lazy image and PDF-preview cards, native fallback actions, a typed detail trigger without a dialog, responsive/forced-color styling, and passing component tests.
- [x] Step 11 - Replace the current limited Evidence Library body with the Archive Explorer while retaining the section identity, concise header, source order, and existing responsive shell contracts. Added a candidate-only complete Evidence Library and registry with 101-item activity navigation, a concise narrative-placement reference for the Protein Docking gallery, no initial media requests, and no active-composition change; candidate component tests and strict validation pass.
- [x] Step 12 - Implement the approved Contact copy and balanced Open email draft action row without changing recipient, validation, privacy, or mailto behavior. Added a candidate-only personal-portfolio presentation with inclusive enquiry copy, truthful local privacy language, Open email draft labeling, a balanced wide action row and stacked narrow layout; legacy active presentation and all validation/mailto behavior remain intact, with passing tests.
- [x] Step 13 - Add example tests, component/accessibility/style tests, source-coverage and transcript-exclusion tests, safe-failure tests, and U04-P01 through U04-P09 with constrained generators, shrinking, and reproducible seed evidence. Added nine 100-run properties at seed 20260924 plus source membership, transcript/narrative exclusion, Protein Docking location, public-copy, initial-media, interaction, Contact, cache, retry, and U-05-boundary examples; 44 focused tests pass and schema-versioned PBT evidence is recorded.
- [x] Step 14 - Add U-04 source/candidate/active boundaries, recovery/integrity/privacy checks, exact bundle/request/group-load measurements, isolated candidate entry, render matrix, screenshots, and schema-versioned evidence without adding a dependency. Added a full isolated candidate using only candidate registries, a browser probe and 16-case responsive/theme/group/Contact matrix, Chrome screenshot adapter, initial and per-group bundle measurement, source/integrity/privacy/recovery gates, package scripts, and an explicit raw-source-import allowlist limited to canonical build-time modules; source boundaries and recovery/integrity prechecks pass with no dependency change.
- [x] Step 15 - Build and validate the isolated candidate across static, unit, property, boundary, privacy, integrity, recovery, performance, accessibility, responsive, theme, keyboard, and browser gates; document unavailable engines honestly. The corrected candidate passes 262 tests across 74 files, strict TypeScript, ESLint, whitespace, deterministic source generation, source/candidate boundaries, 127-file/110-item/109-source-member integrity, transcript exclusion, recovery rehearsal, private-marker scanning, production build, initial and per-group performance budgets, and a 16-case Chrome matrix at 320/768/1280/1440 in light/dark themes with zero findings. Representative Evidence, gallery, scholarship, and Contact screenshots passed manual visual inspection. Firefox, Safari, and iOS Safari remain honestly recorded as unavailable/not run.
- [x] Step 16 - Create a dedicated candidate-review question file and wait for explicit candidate approval before changing the active composition. Option A was explicitly approved on 2026-09-24; the validated candidate may now be promoted through the reversible active-composition seam.
- [x] Step 17 - After candidate approval only, perform the smallest reversible active integration and repeat every applicable blocking gate against the production composition. Promoted only the approved Evidence Library and Contact registries in `src/App.tsx`. The active production entry passes 262 tests across 74 files, TypeScript, ESLint, the active boundary, 127-file/110-item/109-source-member integrity, transcript and Protein Docking deduplication checks, recovery, privacy, production build, all initial/per-group performance budgets, and a 16-case active Chrome matrix with zero findings; representative active screenshots passed visual inspection.
- [x] Step 18 - Generate the Code Generation summary, verify no duplicate replacement files/source deletion/transcript publication/unsafe provenance/U-05 viewer/U-06 deployment behavior/unchecked step remains, and present the standardized Code Generation completion gate. The final constraint audit found no replacement-copy filenames, no deletion under the canonical source tree, no transcript import in public groups, no visitor-facing technical provenance, no dialog/embed/runtime PDF parser, no deployment or dependency change, and no unchecked execution step. The summary is recorded at `aidlc-docs/construction/complete-archive-discovery/code/code-generation-summary.md`.

## Story and Requirement Completion Gates

- **US-013**: Every eligible canonical item is reachable once through natural narrative, gallery, document, or original-action placement; group controls and counts are keyboard accessible and correct.
- **US-017**: Initial rendering contains summaries only; group code/thumbnails are on demand and originals remain explicit-action only; measurements stay within approved ceilings.
- **FR-020/021/032**: Complete eligible discovery, activity-based group navigation, and dimensioned lazy image cards pass.
- **NFR-008 through 012**: Eager/lazy boundaries, initial requests, budgets, splitting, and layout stability pass.
- **PBT-R05**: Deterministic grouping/order and catalog-membership preservation properties pass reproducibly.
- **Contact amendment**: Personal-portfolio copy and responsive Open email draft action row pass without changing local-only behavior.
- **Protein Docking amendment**: One source-backed collection supplies the five unique images and one canonical PDF; runtime imports and visitor placements contain no duplicated gallery.

## Security and PBT Gates

- SECURITY-09, SECURITY-11, SECURITY-13, and SECURITY-15 are blocking for safe media, closed loaders, integrity, misuse cases, and fail-safe behavior.
- SECURITY-04 and SECURITY-10 delivery verification remain U-06-owned; all other static-client-inapplicable rules retain the Functional Design N/A rationale.
- PBT-01 and PBT-03 through PBT-05, PBT-07, PBT-08, and PBT-10 are blocking as specified by U04-P01 through U04-P09.
- PBT-02 and PBT-06 remain N/A unless implementation introduces an inverse pair or business state machine.
- `fast-check` and Vitest remain the approved framework; no dependency addition is authorized.

Approval authorizes only this numbered U-04 sequence. It does not pre-approve candidate promotion, full media viewers, deployment, package installation, source deletion, infrastructure, or unrelated changes.
