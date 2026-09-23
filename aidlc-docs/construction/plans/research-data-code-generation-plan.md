# Code Generation Plan - U-04 Research and Data

> **Status: Completed and approved on 2026-09-16. This document is the single source of truth for U-04 Code Generation.**

> **Execution amendment:** During Step 21, the user conditionally approved the corrected U-04 candidate and explicitly requested one U-03 portrait-crop adjustment. The allowed cross-unit change is limited to `object-position: 88% 50%` plus its source-level test so the person in the white shirt is centered without editing the source image. Candidate and prior-unit regression gates must pass before activation.

## Unit Context

- **Workspace root**: `/Users/nhamhhung/student_ports/TranGiaMinhTam.github.io`
- **Project type**: Brownfield single-package React, TypeScript, and Vite static application.
- **Review boundary**: VU-03.
- **Primary stories**: ST-005, ST-006, and ST-007.
- **Requirements**: FR-006, FR-007, FR-008, FR-010 research evidence, FR-013, and U04-NFR-SCL-001 through U04-NFR-EVD-001.
- **Approved domains**: `computational-projects`, `laboratory-research`, and `data-stories`.
- **Application ownership**: `src/portfolio/research/`, the smallest typed-model and body-registry integrations, U-04 verification scripts, package scripts, and the final approved `src/App.tsx` registry composition.
- **Documentation ownership**: `aidlc-docs/construction/research-data/code/` only.
- **Activation rule**: Generate and verify an isolated candidate first. Do not change the active `src/App.tsx` body registration until the candidate passes every P0 gate and receives separate explicit user approval.

## Stories and Outcomes

| Story | Planned outcome | Acceptance focus |
| --- | --- | --- |
| ST-005 | A computational method pipeline for the molecular-docking project | Exact context, transparent unspecified role, ordered methods/tools/time, evidence terminals, semantic equivalent, no invented result |
| ST-006 | A specimen-to-assay laboratory bench for the cashew testa project | Exact intent and methods, transparent unspecified role, prototype boundary, on-demand evidence, local figure failure |
| ST-007 | An analytical signal sheet for the SIM-LSE project | Team-led disclosure, verified analytical workflow, evidence, no former-owner writing, non-interactive future-note status |

## Dependencies and Stable Contracts

- U-01 supplies branded identifiers, verified content records, the published evidence manifest, validation contracts, semantic tokens, shared accessibility primitives, boundary safeguards, and recovery tooling.
- U-02 supplies the immutable section registry, shell slots, hash navigation, progress, focus, responsive shell, theme, and temporary-body fallback.
- U-03 supplies the approved two-body identity/questions registry and the active 223,999-byte JavaScript baseline.
- U-04 consumes these contracts but does not change shell controllers, Identity, Questions, later-domain folders, the deployment workflow, dependencies, or the GitHub Pages architecture.
- U-04 provides an immutable three-body research registry plus a typed empty future-note destination collection for later U-07 consumption.

## Interfaces and Boundaries

### Browser interfaces

- `ResearchDataSelection` is an accepted immutable three-domain value or a rejected result with stable ordered findings.
- `ResearchRelationship` joins one project to one indexed method, tool, time, or published-evidence endpoint.
- Visual projectors and the semantic projector consume the same relationship collection and preserve identical identifiers and order.
- `U04SectionBodyRegistry` owns exactly three factories; `PortfolioBodyRegistryComposer` combines them with the approved U-03 registry and rejects duplicates.
- Evidence figures are lazy, asynchronously decoded, intrinsically sized, and locally recoverable; evidence documents are native user-initiated anchors only.

### Non-browser interfaces

- The boundary inspector, verifier, budget evaluator, review collector, candidate guard, recovery snapshot, and evidence reporter remain development-only.
- No API layer, repository layer, database entity, database migration, backend service, runtime cache, queue, monitoring agent, or deployment artifact is introduced.

## Approved File Scope

### Create in application source

- `src/portfolio/research/research.types.ts`
- `src/portfolio/research/projectCatalog.ts`
- `src/portfolio/research/researchDataModel.ts`
- `src/portfolio/research/ResearchEvidenceAction.tsx`
- `src/portfolio/research/ResearchFigure.tsx`
- `src/portfolio/research/ResearchRelationshipSummary.tsx`
- `src/portfolio/research/ContributionStatus.tsx`
- `src/portfolio/research/PublicationStatus.tsx`
- `src/portfolio/research/ComputationalProjects.tsx`
- `src/portfolio/research/LaboratoryResearch.tsx`
- `src/portfolio/research/DataStories.tsx`
- `src/portfolio/research/ResearchData.module.css`
- `src/portfolio/research/sectionBodies.tsx`
- `src/portfolio/research/index.ts`
- `src/portfolio/research/projectCatalog.test.ts`
- `src/portfolio/research/researchDataModel.test.ts`
- `src/portfolio/research/ResearchBodies.test.tsx`
- `src/portfolio/research/researchStyles.test.ts`
- `src/portfolio/research/sectionBodies.test.tsx`

### Create candidate and verification tooling

- `scripts/portfolio/research-candidate/index.html`
- `scripts/portfolio/research-candidate/main.tsx`
- `scripts/portfolio/research-candidate/vite.config.mjs`
- `scripts/portfolio/verify-research-data.mjs`

### Modify only where required

- `src/portfolio/model/portfolio.types.ts` for the approved time relationship and typed U-04 contract support.
- `src/portfolio/index.ts` to export the approved research public boundary.
- `scripts/portfolio/check-boundaries.mjs` for U-04 source, candidate, active, ownership, destination, and former-owner checks.
- `package.json` for focused U-04 candidate, measurement, and verification commands without dependency changes.
- `src/App.tsx` only after candidate approval, to activate the composed U-03 plus U-04 body registry.

### Generate verification evidence

- `artifacts/portfolio/u04/` for machine-readable preflight, candidate, review-decision, measurement, and post-activation evidence.
- `aidlc-docs/construction/research-data/code/implementation-summary.md`
- `aidlc-docs/construction/research-data/code/verification-summary.md`
- `aidlc-docs/construction/research-data/code/recovery-summary.md`

No duplicate `_new`, `_modified`, alternate component, or parallel active-entry file is permitted.

## Part 1 - Planning and Approval

- [x] Step 1 - Read the approved U-04 Functional Design, NFR Requirements, NFR Design, primary stories, unit contracts, dependency map, current state, reverse-engineered structure, and active U-01 through U-03 interfaces.
- [x] Step 2 - Confirm U-04 readiness, the brownfield workspace root, exact ownership, story coverage, stable dependencies, and absence of API, repository, database, infrastructure, or deployment work.
- [x] Step 3 - Define the exact create/modify/documentation scope and prohibit duplicate brownfield files.
- [x] Step 4 - Define the sequential business-logic, component, test, candidate, review, activation, recovery, and evidence steps below.
- [x] Step 5 - Validate this plan's Markdown, tables, paths, checkboxes, story traceability, parsing compatibility, and extension status.
- [x] Step 6 - Summarize the complete plan and log the approval prompt.
- [x] Step 7 - Receive explicit approval for this complete Code Generation plan.
- [x] Step 8 - Record the exact approval response and mark Code Generation Part 1 complete in workflow state.

## Part 2 - Generation

### Step 9 - Capture the U-04 Preflight and Recovery Boundary

- [x] Record source revision, working-tree scope, dependency and lockfile hashes, active entry hash, approved U-03 registry content, existing test/build baseline, and exact figure/document bytes.
- [x] Run the active U-03 type, lint, test, boundary, recovery, build, and measurement commands before U-04 mutation.
- [x] Write the machine-readable preflight and exact recoverable active-registration snapshot under `artifacts/portfolio/u04/`.
- [x] Stop without source generation if an unexplained prerequisite failure or baseline mismatch exists. No unexplained failure exists; the default U-02 candidate-phase hash result is recorded, and its active-phase verification passes.

### Step 10 - Generate Typed Research Models and Closed Catalogs

- [x] Add only the approved model support to `portfolio.types.ts`; preserve existing branded identifiers and prior-unit contracts.
- [x] Generate research types, closed project allocation, contribution disclosure, future-note destination, evidence capability, and stable finding catalogs.
- [x] Map docking to Computational Projects, cashew testa to Laboratory Research, and SIM-LSE to Data Stories exactly once.
- [x] Keep docking and cashew contribution as `Role not specified in verified source`; publish only verified `Team-led project` for SIM-LSE.
- [x] Keep the current future-note destination collection frozen and empty.

### Step 11 - Generate Deterministic Selection and Relationship Logic

- [x] Implement one-pass project selection, evidence lookup, endpoint indexing, normalized relationship construction, domain projection, semantic projection, and three-view-model assembly.
- [x] Return stable blocking findings for required project, field, allocation, identifier, and endpoint failures.
- [x] Return typed non-blocking findings for optional evidence while preserving accepted project text.
- [x] Guarantee linear processing, stable order, repeated-run equality, and exact visual/semantic relationship identifier equivalence.
- [x] Exclude former-owner journal and WordPress content from every selector, destination, and result.

### Step 12 - Generate Shared Research Presentation Primitives

- [x] Implement purpose-labeled native evidence anchors with stable `{domain}-{purpose}-evidence-link` test identifiers and no preload, embed, fetch, or unsafe destination.
- [x] Implement lazy asynchronous figures with intrinsic geometry, accurate alternatives, stable figure test identifiers, and local accessible failure status.
- [x] Implement contribution, publication-status, and complete semantic relationship components using immutable props.
- [x] Keep every core fact and relationship available without hover, focus, pointer, motion, SVG, or successful media.

### Step 13 - Generate the Three Distinct Research Bodies

- [x] Implement Computational Projects as a horizontal method pipeline with context, contribution, tools, time, evidence terminals, and a vertical narrow-width rail.
- [x] Implement Laboratory Research as a specimen-to-assay bench with intent, stations, prototype boundary, contribution, time, evidence strip, and numbered narrow-width sequence.
- [x] Implement Data Stories as an analytical signal sheet with context, team-led disclosure, workflow stages, tools, time, evidence, semantic rows, and `Research notes are being prepared` status.
- [x] Do not create generic project cards, repeated tile grids, a journal list, an invented dashboard, a carousel, an accordion, or a relabeled copy of one geometry.

### Step 14 - Generate U-04 Responsive and Accessible Styles

- [x] Create one locally owned CSS Module using U-01 tokens, native Grid/Flexbox, logical properties, visible focus, non-color cues, and reserved figure geometry.
- [x] Preserve separate computational, laboratory, and analytical geometry at wide widths and one continuous reading sequence at narrow widths.
- [x] Support 320, 768, 1280, and 1440 CSS-pixel widths, both themes, increased text spacing, 200-percent zoom, and reduced motion without document-level overflow.
- [x] Add no global override, routine `!important`, rejected selector family, duplicate responsive tree, or dependency-driven styling.

### Step 15 - Generate and Compose the Three-Body Registry

- [x] Generate a U-04 registry containing exactly `computational-projects`, `laboratory-research`, and `data-stories`.
- [x] Generate immutable duplicate-rejecting composition with the approved U-03 registry while preserving the existing resolver and temporary fallback.
- [x] Keep the active `src/App.tsx` unchanged during candidate generation.
- [x] Verify the ten-slot shell resolves five finished bodies and five unchanged temporary bodies in approved order.

### Step 16 - Generate Pure Model and Capacity Tests

- [x] Cover exact project allocation, source wording, contribution disclosures, method/tool/time order, evidence capabilities, empty destinations, and accepted assembly.
- [x] Cover missing, duplicate, empty, misallocated, broken-endpoint, duplicate-relationship, unsafe-destination, and optional-evidence cases with stable findings.
- [x] Cover six projects and at least 36 relationships with indexed linear processing and repeated-run equality.
- [x] Prove exact canonical, visual, and semantic relationship identifier and order equality.
- [x] Prove former-owner titles, URLs, journal content, unsupported claims, metrics, repositories, and roles are absent.

### Step 17 - Generate Component, Accessibility, Style, and Integration Tests

- [x] Cover headings, full factual text, contribution text, method/tool/time sequences, evidence names/types/targets/test IDs, publication status, and figure attributes/failure.
- [x] Cover native link behavior, keyboard order, semantic rows, non-color cues, no hidden facts, and stylesheet/SVG/media degradation.
- [x] Cover three-body registry ownership, duplicate rejection, five temporary bodies, and unchanged shell, Identity, and Questions behavior.
- [x] Inspect styles for tokens, geometry uniqueness, narrow reflow, focus, target sizing, reduced motion, reserved media space, and forbidden patterns.

### Step 18 - Generate Candidate and Verification Tooling

- [x] Create an isolated U-04 candidate entry and Vite configuration that compose approved U-03 bodies with the three U-04 bodies.
- [x] Extend boundary checks with U-04 source, candidate, and active modes; exact ownership; safe destinations; no raw evidence, former-owner writing, identity, or later-domain imports; and unchanged dependencies.
- [x] Generate `verify-research-data.mjs` for file scope, facts, relationships, figures, documents, requests, budgets, body ownership, decision state, activation state, and recovery data.
- [x] Add focused package scripts only; verify `package-lock.json` and dependency declarations remain unchanged.

### Step 19 - Run the Inactive Candidate Automated Gate

- [x] Run strict TypeScript, focused U-01 through U-04 tests, the complete suite, lint, candidate boundaries, U-01 recovery, U-02 shell verification, U-03 identity verification, and protected-source checks.
- [x] Run required-data failures, optional-evidence failure, figure failure, doubled-volume capacity, repeat determinism, relationship equivalence, former-owner exclusion, and ten-slot ownership tests.
- [x] Record exact commands, versions, durations, results, warnings, and dispositions.
- [x] Keep `src/App.tsx` unchanged if any P0 result fails. No P0 result failed; its SHA-256 remains the preflight value.

### Step 20 - Build, Measure, and Inspect the Isolated Candidate

- [x] Build the isolated candidate to a temporary directory and traverse its Vite manifest.
- [x] Enforce no more than 250,000 JavaScript bytes, 12-percent JavaScript growth from 223,999 bytes, and 30,720 CSS bytes.
- [x] Verify the three figures total 1,251,556 source bytes and remain lazy with reserved geometry; verify the three documents total 11,244,477 bytes and remain user initiated.
- [x] Record emitted versus initial-request assets, dependency hashes, source boundaries, and any unavailable P1 browser-performance evidence honestly.
- [x] Produce a candidate decision record; only a P0-clean candidate may become `eligible-for-review`.

### Step 21 - Conduct the Rendered Candidate Review

- [x] Start the isolated candidate and create `research-data-candidate-review-questions.md` with the required A/B/X review decision.
- [x] Review 320, 768, 1280, and 1440 CSS-pixel widths in light and dark themes.
- [x] Review pipeline, bench, and signal-sheet uniqueness; content accuracy; keyboard and focus; media failure; semantic alternatives; zoom; text spacing; reduced motion; wrapping; and overflow.
- [x] Record browser versions, mobile-profile timing when available, screenshots or observations, limitations, and the exact user response.
- [x] Do not activate U-04 until the user explicitly approves this candidate gate. Approval was conditional on the portrait crop; the condition was implemented and all gates passed before activation.

### Step 22 - Activate the Approved Candidate

- [x] Reconfirm the active entry and U-03 registry still match the preflight recovery snapshot.
- [x] Modify only the approved registry-composition seam and `src/App.tsx` so the live shell receives five completed bodies.
- [x] Do not alter shell controllers, section order, Identity, Questions, later temporary bodies, dependencies, or deployment configuration. The sole user-approved exception is the Step 21 portrait `object-position` amendment.
- [x] Mark ST-005, ST-006, and ST-007 implemented only after live registration succeeds.

### Step 23 - Run Post-Activation Acceptance and Recovery Checks

- [x] Run strict TypeScript, focused/full tests, lint, active boundaries, all verification scripts, production build, measurements, and protected-source checks.
- [x] Confirm active code/assets/requests remain within budgets and the candidate-to-active registry is equivalent.
- [x] Confirm five finished bodies, five temporary bodies, former-owner exclusion, exact relationship equivalence, safe evidence actions, and unchanged lockfile/dependencies.
- [x] If any post-activation P0 check fails, restore the exact pre-switch registration through a recoverable patch and record the failed acceptance. No application P0 check failed; recovery was not required.

### Step 24 - Generate Completion Evidence and Summaries

- [x] Write implementation, verification, and recovery summaries under `aidlc-docs/construction/research-data/code/`.
- [x] Record created and modified files, story/requirement traceability, commands, versions, tests, budgets, asset/request inventory, rendered review, limitations, user candidate decision, activation, and recovery status.
- [x] Verify no duplicate brownfield files, unplanned application files, dependency changes, infrastructure artifacts, or non-Markdown files under `aidlc-docs/` were created.
- [x] Validate all generated documentation for Markdown parsing, tables, paths, special characters, and whitespace.

### Step 25 - Present the U-04 Code Generation Review Gate

- [x] Update all plan checkboxes and workflow state in the same interaction as completed work.
- [x] Present the standardized U-04 Code Generation completion message with application and documentation locations.
- [x] Wait for explicit approval before advancing to U-05 Academic and Evidence. Approved on 2026-09-16.

## Planned Verification Commands

- `npx tsc -b`
- `npm run test:research`
- `npm run test:identity`
- `npm run test:shell`
- `npm run test:portfolio`
- `npm test`
- `npm run lint`
- `npm run check:research:candidate`
- `npm run check:research:active`
- `npm run verify:research:source`
- `npm run verify:research:candidate`
- `npm run verify:research:active`
- `npm run verify:identity:active`
- `npm run verify:shell`
- `npm run verify:recovery`
- `npm run build:research-candidate`
- `npm run measure:research-candidate`
- `npm run build`

Exact commands may add plan-defined output arguments but cannot expand application scope or dependencies.

## Completion Criteria

- ST-005, ST-006, and ST-007 satisfy every approved acceptance criterion.
- All 18 U-04 NFRs have reproducible evidence or an honestly recorded P1 environment limitation.
- Three unique research bodies are active; five later bodies remain temporary.
- Candidate approval precedes activation, and post-activation P0 checks pass or exact recovery is applied.
- JavaScript, CSS, figure, and document budgets pass; evidence delivery remains lazy or user initiated as approved.
- Former-owner writing, unsafe destinations, raw evidence, unsupported claims, and cross-domain presentation imports remain absent.
- Dependencies, lockfile, GitHub Pages deployment, shell controllers, Identity, and Questions remain unchanged except for the approved typed registry seam.
- Every execution checkbox is marked immediately when its work completes.

## Extension Compliance

- **Security Baseline**: Disabled in workflow state; its full rules remain unloaded. Approved U04-NFR-SEC-001 controls remain mandatory.
- **Property-Based Testing**: Disabled in workflow state; its full rules remain unloaded. Deterministic malformed tables, capacity fixtures, and repeated-run checks remain mandatory.
