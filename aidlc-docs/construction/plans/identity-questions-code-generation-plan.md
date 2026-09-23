# Code Generation Plan - U-03 Identity and Questions

> **Status: Part 2 in progress. Complete sixteen-step plan explicitly approved on 2026-09-15. This document is the single source of truth for U-03 Code Generation.**

> **Execution note:** The Step 12 option A scope amendment was explicitly approved on 2026-09-15 and implemented. The amended isolated candidate is being revalidated before rendered review. No live activation occurred.

## Unit Context

- **Workspace root**: `/Users/nhamhhung/student_ports/TranGiaMinhTam.github.io`
- **Project type**: Brownfield single-package React, TypeScript, and Vite static application.
- **Review boundary**: VU-02.
- **Primary stories**: ST-001, ST-004, and ST-014.
- **Requirements**: FR-004, FR-005, FR-013, truthful FR-017 publication intent, and U03-NFR-SCL-001 through U03-NFR-EVD-001.
- **Prerequisite units**: U-01 Foundation and Safe Migration and U-02 Scientific Shell, both completed and approved.
- **Deployment**: Existing GitHub Pages artifact; runtime and deployment infrastructure remain unchanged.
- **Application-code location**: Workspace root, primarily `src/portfolio/identity/` plus the smallest approved U-02 slot seam.
- **Documentation location**: Markdown only under `aidlc-docs/construction/identity-questions/code/` and the candidate-review question file named below.

## Generation Approach

U-03 uses an inactive-candidate sequence. Pure selectors, the closed discipline/geometry catalog, immutable view models, custom identity and question bodies, focused tests, and a typed optional body registry are generated first. The active `PortfolioApp` continues rendering the current U-02 temporary bodies while an isolated candidate supplies the new `identity` and `questions` bodies to the existing shell.

Only after the candidate passes strict types, focused and full tests, lint, boundary/recovery checks, exact relationship equivalence, asset/request checks, cumulative 256,000-byte JavaScript and 24,576-byte CSS checkpoints, and the eight-state rendered review will the user receive a separate A/B/X candidate gate. Explicit option A approval authorizes the one-file live body-registration switch in `src/App.tsx`. No rejected source, dependency, lockfile, raw evidence, shell controller, or later section is changed.

## Interfaces and Responsibilities

### Owned browser-safe contracts

- Read-only U-03 identity, direction, question, discipline, geometry, relationship, semantic-row, and selection-result types.
- Pure verified identity/question selection and fail-closed ordered findings.
- Closed approved-domain to discipline/coordinate mapping with deterministic presentation geometry.
- One normalized relationship collection from which both SVG values and semantic rows derive.
- Native semantic identity and question compositions with stable automation identifiers on interactive elements.
- A partial immutable body registry containing exactly `identity` and `questions`.

### Consumed interfaces

- U-01 `verifiedPortfolioSource`, evidence manifest resolver, section registry/IDs, validation findings, visualization contracts, tokens, and semantic primitives.
- U-02 `PortfolioExperience`, `ObservatoryShell`, native navigation action, registered slots, section-body fallback, theme, progress, focus transfer, and responsive shell.

### Provided downstream interfaces

- Stable `identity` and `questions` body registrations for the U-02 resolver.
- The registered `questions` target remains available for U-04 research discovery; U-04 cannot import U-03 presentation components.
- U-04 through U-07 retain the existing eight temporary slot bodies and unchanged shell controllers.

### API, repository, database, and infrastructure scope

- **HTTP/API layer**: Not applicable; U-03 introduces no endpoint or runtime request client.
- **Repository/data-access layer**: Not applicable; verified data remains immutable local TypeScript.
- **Database/migrations**: Not applicable.
- **Runtime infrastructure**: Not applicable; no queue, cache service, worker, analytics, remote image processor, or retry subsystem.
- **Deployment artifacts**: No workflow change. Existing GitHub Pages build behavior remains in place.

## Exact File Scope

### Existing application and test files to modify before candidate review

- `src/portfolio/shell/PortfolioExperience.tsx` - accept an optional immutable section-body registry while preserving the current empty/default behavior.
- `src/portfolio/shell/ObservatoryShell.tsx` - pass optional owned bodies to registered slots without changing shell geometry or controllers.
- `src/portfolio/shell/RegisteredSectionSlot.tsx` - delegate body selection to the typed resolver while retaining the exact temporary fallback.
- `src/portfolio/shell/PortfolioExperience.test.tsx` - cover supplied-body and default-temporary behavior without weakening U-02 tests.
- `src/portfolio/shell/shellComponents.test.tsx` - verify the shell passes only registered bodies and preserves order, headings, and all ten targets.
- `src/portfolio/boundaries.test.ts` - add U-03 active-boundary, evidence, dependency, and two-slot ownership assertions without weakening U-01/U-02 protections.
- `scripts/portfolio/check-boundaries.mjs` - add an explicit U-03 candidate/active mode and prohibited identity-boundary patterns.
- `package.json` - add only focused U-03 test, candidate, measurement, and verification scripts; dependencies and versions remain unchanged.

### Existing application file to modify only after candidate approval

- `src/App.tsx` - import the approved U-03 body registry and pass it to `PortfolioExperience`; no other active entry or shell behavior changes.

### Identity application files to create

- `src/portfolio/identity/identity.types.ts`
- `src/portfolio/identity/disciplineCatalog.ts`
- `src/portfolio/identity/identityQuestionsModel.ts`
- `src/portfolio/identity/ResearchIdentity.tsx`
- `src/portfolio/identity/PortraitAperture.tsx`
- `src/portfolio/identity/ExplorationSpectrum.tsx`
- `src/portfolio/identity/IdentityActions.tsx`
- `src/portfolio/identity/ResearchQuestions.tsx`
- `src/portfolio/identity/QuestionLedger.tsx`
- `src/portfolio/identity/QuestionConstellation.tsx`
- `src/portfolio/identity/RelationshipSummary.tsx`
- `src/portfolio/identity/IdentityQuestions.module.css`
- `src/portfolio/identity/sectionBodies.tsx`
- `src/portfolio/identity/index.ts`

### Shell seam file to create

- `src/portfolio/shell/SectionBodyResolver.tsx`

### Focused tests to create

- `src/portfolio/identity/disciplineCatalog.test.ts`
- `src/portfolio/identity/identityQuestionsModel.test.ts`
- `src/portfolio/identity/ResearchIdentity.test.tsx`
- `src/portfolio/identity/ResearchQuestions.test.tsx`
- `src/portfolio/identity/sectionBodies.test.tsx`
- `src/portfolio/identity/identityStyles.test.ts`
- `src/portfolio/shell/SectionBodyResolver.test.tsx`

### Candidate and verification tooling to create

- `scripts/portfolio/identity-candidate/index.html`
- `scripts/portfolio/identity-candidate/main.tsx`
- `scripts/portfolio/identity-candidate/vite.config.mjs`
- `scripts/portfolio/verify-identity-questions.mjs`

The candidate configuration writes only to `/private/tmp/portfolio-u03-candidate-dist`. It never changes or reuses deployable `dist/` before the candidate decision.

### Machine-readable evidence to create

- `artifacts/portfolio/u03/preflight.json`
- `artifacts/portfolio/u03/candidate.json`
- `artifacts/portfolio/u03/review-matrix.json`
- `artifacts/portfolio/u03/candidate-decision.json`
- `artifacts/portfolio/u03/post-identity.json`
- `artifacts/portfolio/u03/validation.json`

### Markdown documentation to create

- `aidlc-docs/construction/plans/identity-questions-candidate-review-questions.md`
- `aidlc-docs/construction/identity-questions/code/preflight.md`
- `aidlc-docs/construction/identity-questions/code/candidate-verification.md`
- `aidlc-docs/construction/identity-questions/code/verification.md`
- `aidlc-docs/construction/identity-questions/code/code-generation-summary.md`

No other application, configuration, test, evidence, asset, or documentation file may be created, modified, moved, or deleted without an explicitly approved plan amendment.

## Candidate Activation Preconditions

All conditions below must pass before `src/App.tsx` is modified:

1. U-01 recovery payloads, protected raw-source inventory, U-02 shell files, dependency declarations, lockfile, and current active entry verify unchanged from the preflight record.
2. Strict TypeScript, focused U-01/U-02/U-03 tests, the complete suite, lint, and U-03 candidate boundary inspection pass.
3. Missing/duplicate identity, missing transcript, absent question, unknown domain, duplicate/broken relationship, portrait failure, and repeated-render behaviors match the approved design.
4. A six-question, twelve-relationship fixture passes with deterministic linear/shared-source derivation.
5. Normalized SVG and semantic relationship identifier sets match exactly and contain no broken or duplicate endpoint.
6. Candidate initial JavaScript is at most 256,000 bytes and CSS is at most 24,576 bytes; inherited U-02 ceilings and regression gates also pass.
7. The portrait is at most 77,650 bytes, has intrinsic reserved geometry and asynchronous decoding, and the 6,817,646-byte transcript is absent from the candidate's initial request inventory.
8. Semantic, keyboard, focus, contrast, non-color cue, portrait-failure, reduced-motion, stylesheet-degraded, text-spacing, 200-percent zoom, and 320-pixel reflow evidence contains no unresolved P0 failure.
9. The 320, 768, 1280, and 1440 CSS-pixel light/dark matrix confirms required custom structures, no forbidden original/rejected patterns, and eight unchanged temporary bodies.
10. The user explicitly approves option A in the candidate-review question file after reviewing the rendered candidate.

If a precondition fails, generation stops before activation and the live U-02 page remains unchanged. If a post-activation P0 check fails, the exact `src/App.tsx` preflight content is restored with `apply_patch`; no destructive Git command is used.

## Story Tracking

- [x] **ST-001** - Present the verified identity, role, scientific direction, portrait, and first-viewport actions in the approved custom composition.
- [x] **ST-004** - Present the exact three questions, closed discipline relationships, constellation, and equivalent semantic mapping.
- [x] **ST-014** - Superseded by the user-approved pending CV amendment; expose no false or broken download while retaining the verified transcript for later academic presentation.

Inherited safeguards for accessible visual alternatives, performance, responsiveness, integrity, resilience, and uniqueness are verification obligations rather than duplicate story ownership.

## Step-by-Step Generation Plan

### Step 1 - Preflight and Scope Lock

- [x] Re-read this complete approved plan and select Step 1 as the first incomplete generation step.
- [x] Confirm workspace root, active unit, approved U-01/U-02 dependencies, disabled extensions, and exact target-file presence.
- [x] Capture revision, dirty-worktree inventory, dependency and lockfile hashes, active `src/App.tsx` hash/content, U-02 shell hashes, protected evidence inventory, asset sizes, tool versions, and current build facts in `preflight.json` and `preflight.md`.
- [x] Verify every target is inside the approved scope and no unrelated user change would be overwritten.
- [x] Stop for an explicit plan amendment if the workspace differs materially from this scope; no material mismatch was found.

### Step 2 - Generate U-03 Contracts and Closed Catalogs

- [x] Create read-only identity, direction, portrait, academic-record, question, discipline, geometry, relationship, semantic-row, finding, and selection-result types.
- [x] Create the exhaustive approved-domain mapping and normalized presentation geometry catalog.
- [x] Keep coordinates explicitly presentational and use branded/stable identifiers.
- [x] Validate no React, browser, filesystem, network, legacy-data, or later-domain dependency enters these modules.
- [x] Mark Step 2 complete immediately after validating the created files.

### Step 3 - Generate Fail-Closed View-Model Assembly

- [x] Implement verified identity and exact-three-question selection using U-01 source and evidence contracts only.
- [x] Derive the supported `Currently exploring` direction and `Fields in exploration` terms through closed approved mappings.
- [x] Resolve the published portrait and academic transcript, preserving the truthful `Download academic record` label and registered `questions` target.
- [x] Build unique normalized relationships, SVG values, and semantic rows from one immutable collection with stable ordered findings.
- [x] Reject missing/duplicate identity, missing transcript, absent question, unknown domain, duplicate relationship, and broken endpoint without fabricated fallback.

### Step 4 - Generate Research Identity Components

- [x] Implement `ResearchIdentity`, `PortraitAperture`, `ExplorationSpectrum`, and `IdentityActions` from immutable view-model props.
- [x] Create the asymmetric specimen field, oversized identity typography, integrated microscopy aperture, horizontal metadata sequence, typographic exploration spectrum, and two direct actions without a hero card or circular avatar.
- [x] Use intrinsic portrait dimensions, reserved aspect ratio, eager eligibility, asynchronous decoding, accurate alternative text, and local image-failure degradation.
- [x] Use native stable anchors with `data-testid="identity-academic-record-link"` and `data-testid="identity-questions-link"`; do not preload the transcript.

### Step 5 - Generate Research Questions Components

- [x] Implement `ResearchQuestions`, `QuestionLedger`, `QuestionConstellation`, and `RelationshipSummary` from one immutable view model.
- [x] Render all three exact questions with explicit exploratory status in a continuous non-card sequence.
- [x] Render passive inline SVG from normalized geometry using labels, marker/line variation, space, and color with no scripts, external references, or runtime measurements.
- [x] Render the complete semantic mapping from the same relationships and keep all information present without filter or disclosure state.
- [x] Use stable automation identifiers for any focusable emphasis seam without making decorative paths interactive.

### Step 6 - Generate Unique Responsive Styles

- [x] Create one U-03 CSS Module using U-01 semantic tokens, Grid/Flexbox, logical properties, and one shared light/dark DOM.
- [x] Transform wide asymmetry and relationship geometry into one intentional mobile reading sequence at narrow widths.
- [x] Keep actions locally wrapped, relationship alternatives vertically readable, focus visible, targets sufficient, and document overflow absent.
- [x] Add reduced-motion behavior and prohibit global overrides, routine `!important`, generic cards, sidebars, drawers, layout selectors, rejected selector families, and duplicated responsive trees.

### Step 7 - Generate the Typed Section-Body Seam

- [x] Create `SectionBodyResolver` with an immutable partial `SectionId` to React-body registry and the exact existing temporary fallback.
- [x] Modify `RegisteredSectionSlot`, `ObservatoryShell`, and `PortfolioExperience` to accept optional bodies while preserving default U-02 output, controllers, geometry, order, headings, focus, navigation, progress, and theme.
- [x] Create the U-03 registry with exactly `identity` and `questions` entries and no later-domain fallback ownership.
- [x] Keep the active `PortfolioApp` unchanged so U-03 remains outside the live body registration until candidate approval.

### Step 8 - Generate Pure Model and Growth Tests

- [x] Cover valid selection, exact verified wording/order, supported exploration derivation, evidence resolution, and truthful action contracts.
- [x] Cover every required-data fault, stable finding codes/order, duplicate and broken relationships, repeated identical input, and no fabricated fallback.
- [x] Cover exhaustive catalog behavior and a six-question, twelve-relationship capacity fixture.
- [x] Prove exact canonical, SVG, and semantic relationship-set equality.

### Step 9 - Generate Component, Accessibility, Style, and Integration Tests

- [x] Cover semantic identity headings/text, portrait attributes and failure, exploration labels, native action names/targets/filename, and automation identifiers.
- [x] Cover exact question text/status, passive SVG semantics, non-color source cues, all-present relationships, and semantic list/table equivalence.
- [x] Cover supplied two-body registration, default temporary fallback, ten-slot order, eight unchanged temporary bodies, and U-02 controller regressions.
- [x] Inspect style sources for tokens, Grid/Flexbox, aspect ratio, visible focus, target sizing, reduced motion, narrow reflow, uniqueness requirements, and forbidden patterns.

### Step 10 - Generate Candidate and Verification Tooling

- [x] Create the isolated U-03 candidate HTML, React entry, and Vite configuration using the new two-body registry.
- [x] Extend boundary checks with explicit U-03 candidate/active modes, exact ownership, safe SVG/URL patterns, no legacy/later-domain imports, and unchanged dependency assertions.
- [x] Create `verify-identity-questions.mjs` for exact files, content integrity, relationship equivalence evidence, asset attributes/sizes, body ownership, candidate decision, active registration, and recovery data.
- [x] Add package scripts only and confirm `package-lock.json` plus dependency declarations are unchanged.

### Step 11 - Run the Inactive Candidate Automated Gate

- [x] Run strict TypeScript, focused U-01/U-02/U-03 tests, the complete suite, lint, U-03 candidate boundaries, U-01 recovery, U-02 shell verification, and protected-source checks.
- [x] Run required-data failures, doubled-volume capacity, repeated-run determinism, relationship equivalence, portrait failure, and ten-slot ownership checks.
- [x] Record exact commands, versions, durations, results, warnings, and dispositions.
- [x] Keep `src/App.tsx` unchanged if any P0 result fails; no P0 result failed and its SHA-256 remains the preflight value.

### Step 12 - Build, Measure, and Inspect the Isolated Candidate

- [x] Build only into `/private/tmp/portfolio-u03-candidate-dist` without writing to deployable `dist/`.
- [x] Traverse the candidate manifest and enforce initial JavaScript at or below 256,000 bytes and CSS at or below 24,576 bytes plus inherited gates.
- [x] Record portrait and transcript emitted sizes, verify portrait attributes, and confirm the transcript is absent from the documented initial request inventory.
- [x] Confirm the eager graph includes U-01, U-02, and U-03 approved modules only and excludes rejected presentation, raw evidence, and later domains.
- [x] Record exact measurements, classifications, findings, and environment in `candidate.json` and `candidate-verification.md`.

### Approved Step 12 Scope Amendment - Option A

The mandatory question and approved options are recorded in `aidlc-docs/construction/plans/identity-questions-bundle-amendment-questions.md`.

Option A was explicitly approved on 2026-09-15, adding these exact files to scope:

- [x] Create `src/data/researchQuestions.ts` as the lightweight canonical question/domain fact source.
- [x] Modify `src/data/research.ts` to consume those facts while preserving the existing `researchProjects` public output and all project details.
- [x] Create `src/portfolio/model/verifiedIdentityQuestionsSource.ts` to assemble only verified identity/question records and their portrait/transcript evidence from the canonical data sources.
- [x] Modify `src/portfolio/identity/sectionBodies.tsx` to consume the lightweight U-01 projection instead of the full cross-domain source and manifest.
- [x] Modify `src/portfolio/identity/identityQuestionsModel.test.ts` and existing U-01 model/evidence tests as needed to prove factual equivalence and unchanged full-source behavior.

No visible copy, asset content, dependency, lockfile, shell controller, active entry, later-domain component, or approved threshold changes under this amendment.

### Approved Step 13 Readability Amendment

The user explicitly requested more space for the main content area on 2026-09-15. This authorizes the smallest candidate-aware shell geometry seam:

- [x] Modify `RegisteredSectionSlot.tsx` to mark only slots with registered custom bodies.
- [x] Modify `Shell.module.css` so marked desktop slots allocate 86 percent of their two-column fraction to main content, use a smaller gap and side padding, and return to one column below 48rem.
- [x] Modify `shellComponents.test.tsx` and `shellStyles.test.ts` to prove only registered custom bodies receive the expanded layout and mobile reflow remains one column.
- [x] Reduce only custom-section headings to a compact 1.5rem-to-2.75rem responsive scale so the label rail cannot collide with main content.

The default temporary-section geometry, U-02 controllers, verified content, dependencies, active U-03 registration, assets, and approved thresholds remain unchanged.

### Approved Step 13 Pending CV Amendment

On 2026-09-15, the user approved the corrected visual candidate and requested that the visible academic-record download be replaced by a CV download before proceeding, noting that the CV file will be supplied later.

- [x] Add a typed pending-CV action state with the exact visible label `Download CV` and status `Available soon`.
- [x] Replace the visible academic-record anchor with a non-clickable, clearly unavailable CV status; do not mislabel the transcript, fabricate a CV URL, or create a broken download.
- [x] Update focused model, component, and style tests for the truthful pending state.
- [x] Rebuild and verify the amended candidate before honoring the user's activation approval.

The academic transcript remains verified evidence for later academic presentation but is no longer offered as the Identity action. When the user supplies a CV, its asset registration and enabled native download will require a separate verified-data update.

### Step 13 - Candidate Accessibility, Responsive, Performance, and User Review Gate

- [x] Serve the isolated candidate locally and provide the review URL without changing `src/App.tsx`.
- [x] Record the 320, 768, 1280, and 1440 CSS-pixel light/dark matrix, portrait failure, keyboard order, focus, contrast, non-color cues, reduced motion, stylesheet-degraded meaning, text spacing, zoom/reflow, overflow, custom structures, and prohibited patterns.
- [x] Record exact available browser versions and a documented mobile-profile LCP, CLS, and interaction result or an honest P1 environment limitation.
- [x] Create `identity-questions-candidate-review-questions.md` with mandatory A/B/X and `[Answer]:` format and log its prompt.
- [x] Wait for explicit user option A approval; option B requests changes and leaves the live bodies temporary.
- [x] Record the exact response and `canActivate` decision in `candidate-decision.json` before continuing.

### Step 14 - Perform the Guarded Live Body Activation

- [x] Reconfirm all ten activation preconditions and explicit candidate approval immediately before mutation.
- [x] Modify only `src/App.tsx` to import the approved U-03 body registry and pass it to `PortfolioExperience`.
- [x] Verify Identity and Questions now use U-03 bodies while the other eight slots, active entry, U-02 controllers, shell geometry, dependencies, lockfile, and evidence remain unchanged.
- [x] If any post-activation P0 check fails, restore the exact preflight `src/App.tsx` with `apply_patch` and record the failure; no P0 failure occurred, so restoration was not required.

### Step 15 - Run Post-Activation Acceptance

- [x] Run strict TypeScript, all focused tests, the complete suite, lint, production build, active boundaries, U-01 recovery, U-02 shell verification, and U-03 verification.
- [x] Measure the deployable active manifest against all U-03 and inherited JavaScript/CSS thresholds and inspect initial request classification.
- [x] Repeat identity/question semantics, relationship equivalence, portrait/document actions, ten-slot ownership, responsive/theme matrix, accessibility, uniqueness, and available performance checks against the active page.
- [x] Confirm no duplicate file, rejected import, raw evidence mutation, dependency change, or unauthorized later-domain body exists.

### Step 16 - Generate Evidence and Complete the Unit

- [x] Write `post-identity.json` and `validation.json` with exact commands, versions, measurements, findings, warnings, limitations, scope, recovery state, and final P0/P1 disposition.
- [x] Generate `verification.md` and `code-generation-summary.md` with modified/created files, story/NFR traceability, tests, budgets, asset behavior, candidate approval, and remaining temporary sections.
- [x] Mark ST-001, ST-004, and ST-014 complete only after all acceptance checks pass, with ST-014's user-approved pending-CV supersession recorded.
- [x] Mark every completed plan checkbox in the same interaction and update `aidlc-state.md`, `README.md`, and append-only `audit.md`.
- [x] Present the standardized U-03 Code Generation completion message and wait for explicit approval before U-04.

## Part 1 Planning Checklist

- [x] Read all U-03 Functional Design, NFR Requirements, NFR Design, story-map, unit, dependency, and reverse-engineering context.
- [x] Confirm the brownfield workspace root and existing code structure.
- [x] Identify exact existing files to modify and new application, test, candidate, evidence, and documentation files.
- [x] Define sixteen sequential steps with immediate checkbox tracking and story traceability.
- [x] Define the inactive-candidate boundary, ten activation preconditions, one-file live switch, and safe restoration rule.
- [x] Record API, repository, database, infrastructure, dependency, asset, and deployment exclusions.
- [x] Validate that application code remains at the workspace root and Markdown documentation remains under `aidlc-docs/`.
- [x] Summarize the plan and log the approval prompt.
- [x] Receive explicit approval of the complete U-03 Code Generation plan before executing Step 1.

## Extension Compliance

- Security Baseline: disabled and not loaded; approved product-specific static security checks remain part of Steps 10 through 15.
- Property-Based Testing: disabled and not loaded; deterministic table-driven, capacity, and repeat-run tests remain required.
