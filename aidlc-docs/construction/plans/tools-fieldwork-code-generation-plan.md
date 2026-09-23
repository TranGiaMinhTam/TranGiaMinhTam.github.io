# Code Generation Plan - U-06 Tools and Fieldwork

> **Status: Part 2 executing. Complete plan explicitly approved on 2026-09-17. Externally generated U-06 source remains unactivated while it is audited through this plan. This document is the single source of truth for U-06 Code Generation.**

> **Workspace reconciliation note (2026-09-17):** Approval will authorize auditing and adopting, correcting, or replacing only the in-scope external source through the steps below. Its presence does not constitute verified work, candidate approval, or permission for live activation.

## Unit Context

- **Workspace root**: `/Users/nhamhhung/student_ports/TranGiaMinhTam.github.io`
- **Project type**: Brownfield single-package React, TypeScript, and Vite static application.
- **Review boundary**: VU-05.
- **Primary stories**: ST-011 and ST-012.
- **Requirements**: FR-011, FR-012, and U06-NFR-SCL-001 through U06-NFR-EVD-001.
- **Approved domains**: `tools` and `fieldwork-leadership`.
- **Application ownership**: `src/portfolio/impact/`, the public export and body-registry integration seams, U-06 verification scripts, package scripts, and the final approved `src/App.tsx` registry composition.
- **Documentation ownership**: `aidlc-docs/construction/tools-fieldwork/code/` only.
- **Activation rule**: Generate and verify an isolated candidate first. Do not change active `src/App.tsx` registration until the candidate passes every P0 gate and receives separate explicit rendered approval.

## Stories and Outcomes

| Story | Planned outcome | Acceptance focus |
| --- | --- | --- |
| ST-011 | A relationship-based capability map for sixteen verified tools | Exact category, classification (demonstrated/interest from the closed Tool Linking Table), linked context, no invented rating, and semantic equivalence |
| ST-012 | A two-group Fieldwork and Leadership presentation | Exact role, organization, period, description text by verified kind, no evidence action while none exists, and responsive/accessible grouping without a log or timeline |

## Dependencies and Stable Contracts

- U-01 supplies branded identifiers, `verifiedPortfolioSource.ts` (already producing the sixteen `tool` and four `fieldwork`/`leadership` records), `sectionRegistry.ts`/`sectionById`, `evidenceManifest.ts`, validation contracts, semantic tokens, shared accessibility primitives (`EvidenceAction`, `VisuallyHidden`), boundary safeguards, and recovery tooling.
- U-02 supplies immutable section order, shell slots, hash navigation, focus, progress, themes, responsive shell, and temporary fallback.
- U-03 and U-04 supply the approved Identity, Questions, and Research bodies; their evidence and presentation remain outside U-06.
- U-05 supplies the approved seven-body composed registry, duplicate-rejecting composer, and active 268,491-byte JavaScript / 42,005-byte CSS baseline.
- U-06 consumes these contracts but does not change shell controllers, completed-domain components, the final temporary Contact/Journal domain, dependencies, deployment, or GitHub Pages architecture.
- U-06 does not read, import, adopt, or delete `src/data/awards.ts`, `src/data/gallery.ts`, `src/data/videos.ts`, or `src/components/Awards.tsx`.

## External Source Reconciliation Boundary

- Preserve the externally generated `src/portfolio/impact/` files until Step 9 captures their exact hashes and recovery boundary.
- In Steps 10 through 17, compare every existing file against the approved Functional Design, NFR Requirements, NFR Design, story criteria, file scope, token system, and accessibility rules before adopting it.
- Passing TypeScript, 23 focused tests, and lint is preliminary diagnostic evidence only; it is not candidate approval or permission to activate.
- Do not import `toolsFieldworkBodyRegistry` into `src/App.tsx` before the isolated candidate passes every P0 gate and receives rendered approval.
- Preserve the active seven-body application hash `761f8a588bc2152a81fc970fb743843f566adb82523a837880ffbf2d78b3be8e` and lockfile hash `db382652e91d7bd4ab3c154cf79d53b6b26ecb4430efe5961273572ce25b9bb1` throughout inactive work.

## Interfaces and Boundaries

### Browser interfaces

- `ToolsFieldworkSelection` is an accepted immutable two-domain value or a rejected value with stable ordered findings.
- `ToolLinkingTable` is a closed, immutable sixteen-entry classification-and-link catalog; an unmapped tool is a blocking finding.
- `ContextLinkCapability` resolves only against the existing `sectionById` registry.
- `ActivityRecord` preserves exact verified role/title, organization, period, and description text, grouped only by the already-approved `kind` field.
- Category-group and activity-group visuals and their semantic summaries consume the same ordered accepted collection.
- `U06SectionBodyRegistry` owns exactly two factories; the existing composer combines them with the approved seven-body registry and rejects duplicates.

### Non-browser interfaces

- The boundary inspector, verifier, budget evaluator, review collector, candidate guard, recovery snapshot, and evidence reporter remain development-only.
- No API layer, repository layer, database entity, migration, backend service, runtime cache, queue, remote content service, monitoring agent, or deployment artifact is introduced.

## Approved File Scope

### Create in application source

- `src/portfolio/impact/impact.types.ts`
- `src/portfolio/impact/toolLinkingTable.ts`
- `src/portfolio/impact/toolsFieldworkModel.ts`
- `src/portfolio/impact/ToolContextLink.tsx`
- `src/portfolio/impact/ClassificationMarker.tsx`
- `src/portfolio/impact/ToolClassificationSummary.tsx`
- `src/portfolio/impact/ActivityRecordCard.tsx`
- `src/portfolio/impact/ActivitySummary.tsx`
- `src/portfolio/impact/MethodsAndTools.tsx`
- `src/portfolio/impact/FieldworkAndLeadership.tsx`
- `src/portfolio/impact/ToolsFieldwork.module.css`
- `src/portfolio/impact/sectionBodies.tsx`
- `src/portfolio/impact/index.ts`
- `src/portfolio/impact/toolLinkingTable.test.ts`
- `src/portfolio/impact/toolsFieldworkModel.test.ts`
- `src/portfolio/impact/ToolsFieldworkBodies.test.tsx`
- `src/portfolio/impact/toolsFieldworkStyles.test.ts`
- `src/portfolio/impact/sectionBodies.test.tsx`

### Create candidate and verification tooling

- `scripts/portfolio/tools-fieldwork-candidate/index.html`
- `scripts/portfolio/tools-fieldwork-candidate/main.tsx`
- `scripts/portfolio/tools-fieldwork-candidate/vite.config.mjs`
- `scripts/portfolio/verify-tools-fieldwork.mjs`

### Modify only where required

- `src/portfolio/index.ts` to export the approved U-06 public boundary.
- `scripts/portfolio/check-boundaries.mjs` for U-06 source, candidate, active, ownership, and legacy-file-exclusion checks.
- `package.json` for focused U-06 candidate, measurement, boundary, test, preview, and verification commands without dependency changes.
- `src/App.tsx` only after rendered candidate approval, to activate the composed nine-body registry.

### Generate verification evidence

- `artifacts/portfolio/u06/` for preflight, recovery, baseline, candidate, review, decision, validation, and post-activation evidence.
- `aidlc-docs/construction/tools-fieldwork/code/implementation-summary.md`
- `aidlc-docs/construction/tools-fieldwork/code/verification-summary.md`
- `aidlc-docs/construction/tools-fieldwork/code/recovery-summary.md`

No duplicate `_new`, `_modified`, alternate component, or parallel active-entry file is permitted.

## Part 1 - Planning and Approval

- [x] Step 1 - Read the approved U-06 Functional Design, NFR Requirements, NFR Design, stories, unit contracts, dependency map, workflow state, reverse-engineered structure, and active U-01 through U-05 interfaces.
- [x] Step 2 - Confirm U-06 readiness, brownfield workspace root, exact ownership, story coverage, stable dependencies, and absence of API, repository, database, infrastructure, or deployment work.
- [x] Step 3 - Define the exact create, modify, evidence, and documentation scope and prohibit duplicate brownfield files.
- [x] Step 4 - Define the sequential model, component, test, candidate, rendered-review, activation, recovery, and evidence steps below.
- [x] Step 5 - Validate this plan's Markdown, tables, paths, checkboxes, story traceability, parsing compatibility, and extension status.
- [x] Step 6 - Summarize the complete plan and log the approval prompt.
- [x] Step 7 - Receive explicit approval for this complete Code Generation plan.
- [x] Step 8 - Record the exact approval response and mark Code Generation Part 1 complete in workflow state.

## Part 2 - Generation

### Step 9 - Capture U-06 Preflight and Recovery Boundary

- [x] Record source revision, working-tree scope, dependency/lockfile hashes, active entry and seven-body registry hashes, tests, build baseline, and exact byte measurements.
- [x] Inventory and hash every externally generated U-06 source and preliminary artifact before adopting, correcting, or replacing it.
- [x] Run active U-01 through U-05 type, lint, focused/full test, boundary, recovery, verification, build, and measurement commands before U-06 source mutation.
- [x] Write machine-readable preflight, U-05 measurement baseline, and exact recoverable active-registration content under `artifacts/portfolio/u06/`.
- [x] Stop without source generation if an unexplained prerequisite failure or baseline mismatch exists. No unexplained prerequisite failure or baseline mismatch exists.

### Step 10 - Generate Typed Tool and Activity Catalogs

- [x] Generate closed classification, category, activity-kind, context-link, evidence-reservation, semantic-group, and finding types.
- [x] Encode and audit the exact sixteen-entry Tool Linking Table approved in Functional Design.
- [x] Keep `src/data/awards.ts`, `src/data/gallery.ts`, `src/data/videos.ts`, and `src/components/Awards.tsx` outside every U-06 catalog and import graph; preserve their exact hashes.
- [x] Preserve canonical titles, categories, roles, organizations, periods, and source order without runtime prose or path inference.

### Step 11 - Generate Deterministic Selection, Classification, and Grouping Logic

- [x] Implement one-pass tool selection, Tool Linking Table lookup, demonstrated-first category grouping, activity selection, kind-based grouping, context-link and reserved-evidence resolution, and two-view-model assembly.
- [x] Return stable blocking findings for missing/duplicate/empty records, activity cardinality, and an unmapped tool.
- [x] Return typed non-blocking findings for unresolved context-link and reserved-evidence targets while preserving accepted content and recomputed counts.
- [x] Guarantee linear processing, stable order, repeated-run equality, and exact category/group/semantic equivalence.

### Step 12 - Generate Shared Tools and Activity Primitives

- [x] Implement native in-page context links with stable purpose identifiers, resolving only against `sectionById`.
- [x] Implement a textual, non-color classification marker for demonstrated/interest tools.
- [x] Implement activity records rendering role/title, organization, period, description points, stable `{group-kind}-{record-id}` identifiers, and no evidence action unless one resolves.
- [x] Implement semantic classification and activity summaries from the same accepted grouped collections as their visual counterparts.

### Step 13 - Generate the Two Distinct U-06 Bodies

- [x] Implement Methods and Tools as a relationship-based capability map with four category clusters, classification markers, and context links.
- [x] Implement Fieldwork and Leadership as two labeled kind-based groups (Fieldwork, Leadership) with full record text.
- [x] Keep every fact and accepted record visible without filters, accordions, carousels, hover, modal-only metadata, or rating graphics.
- [x] Do not create a proficiency matrix, star/bar rating, tag cloud without classification, activity log, chronological timeline, ledger, or relabeled earlier-unit layout.

### Step 14 - Generate U-06 Responsive and Accessible Styles

- [x] Create one locally owned CSS Module using U-01 tokens, Grid/Flexbox, logical properties, visible focus, and non-color cues.
- [x] Preserve aligned capability-map and activity-group geometry at wide widths and one continuous reading order at narrow widths.
- [x] Support 320, 768, 1280, and 1440 CSS-pixel widths, both themes, increased text spacing, 200-percent zoom, reduced motion, long description text, and context-link wrapping without document-level overflow.
- [x] Add no global override, routine `!important`, rejected selector family, duplicate theme/mobile tree, or dependency-driven styling.

### Step 15 - Generate and Compose the Two-Body Registry

- [x] Generate a U-06 registry containing exactly `tools` and `fieldwork-leadership`.
- [x] Compose it immutably with the approved seven-body registry while preserving duplicate rejection, resolver behavior, and temporary fallback.
- [x] Keep active `src/App.tsx` unchanged during candidate generation.
- [x] Verify the ten-slot candidate resolves nine finished bodies and one unchanged temporary body in approved order.

### Step 16 - Generate Pure Model, Failure, and Capacity Tests

- [x] Cover exact tool category/classification/linked-context, activity kind/role/organization/period/description, relationships, evidence absence, and accepted assembly.
- [x] Cover missing, duplicate, empty, unmapped-tool, activity-cardinality, broken-context, and unresolved-evidence cases with stable findings.
- [x] Cover thirty-two tool records and eight activity records through indexed linear processing.
- [x] Prove exact category/group membership, order, and count equality between visual and semantic projections.

### Step 17 - Generate Component, Accessibility, Style, and Integration Tests

- [x] Cover headings, categories, classification, context links, activity groups, roles, organizations, periods, descriptions, test IDs, and no evidence action rendered.
- [x] Cover native links, keyboard order, semantic groups/counts, non-color cues, CSS degradation, and no hidden facts or nested section landmarks.
- [x] Cover two-body ownership, duplicate rejection, nine finished bodies, one temporary body, and unchanged prior-unit behavior.
- [x] Inspect styles for defined tokens, aligned unique geometry, narrow reflow, focus, target sizing, reduced motion, long text, and forbidden patterns.

### Step 18 - Generate Candidate and Verification Tooling

- [x] Create an isolated U-06 candidate entry and Vite configuration that compose approved U-01 through U-05 bodies with U-06.
- [x] Extend boundary checks with U-06 source, candidate, and active modes; exact ownership; safe publication; no legacy-file imports; and unchanged dependencies.
- [x] Generate `verify-tools-fieldwork.mjs` for scope, classification, context links, groups, counts, budgets, requests, exclusions, body ownership, decision, activation, and recovery.
- [x] Add focused package scripts only and verify dependency declarations and `package-lock.json` remain unchanged.

### Step 19 - Run the Inactive Candidate Automated Gate

- [x] Run strict TypeScript, focused U-01 through U-06 tests, complete tests, lint, candidate boundaries, recovery, all active prior-unit verifiers, and protected-source checks.
- [x] Run required-data, unmapped-tool, broken-link, unresolved-evidence, capacity, repeatability, and equivalence cases.
- [x] Record exact commands, versions, durations, results, warnings, and dispositions.
- [x] Keep `src/App.tsx` unchanged if any P0 result fails. No P0 result failed, and the protected active-entry hash remained unchanged.

### Step 20 - Build, Measure, and Inspect the Isolated Candidate

- [x] Build the isolated candidate to a temporary directory and traverse its Vite manifest.
- [x] Enforce no more than 285,000 JavaScript bytes, 8-percent JavaScript growth from 268,491 bytes, 46,080 CSS bytes, and zero incremental U-06 evidence bytes.
- [x] Record emitted versus initial-request assets, dependency hashes, source boundaries, and unavailable P1 browser-performance evidence honestly.
- [x] Produce a candidate gate record; after resolving the CSS-budget P0 finding without relaxing the limit, the candidate is `eligible-for-review`.

### Step 21 - Conduct the Rendered Candidate Review

- [x] Start the isolated candidate and create `tools-fieldwork-candidate-review-questions.md` with the required A/B/X decision.
- [x] Record the first rendered-review Option B response and keep live activation blocked.
- [x] Replace transparent U-06 reading surfaces and inherited display-label copy with an opaque theme-aware surface and normal high-contrast body typography.
- [x] Rebuild, remeasure, and rerun the complete inactive candidate gate without relaxing any approved ceiling.
- [x] Align each capability row to a shared top edge and verify consistent tool, classification, and context-link geometry before applying the user's conditional approval.
- [x] Review responsive behavior for 320, 768, 1280, and 1440 CSS-pixel layouts and both tokenized themes through the responsive source contract, focused tests, and user-supplied wide rendered observations.
- [x] Review capability-map and activity-group uniqueness, exact content, keyboard/focus, semantic counts, zoom, text spacing, reduced motion, wrapping, and overflow through focused assertions and the user's rendered observations.
- [x] Record browser/mobile timing as unavailable, the user-supplied screenshots and observations, the limitation, and the exact conditional approval response.
- [x] Do not activate U-06 until this candidate gate receives explicit approval. Conditional approval was fulfilled by the passing alignment gate before activation.

### Step 22 - Activate the Approved Candidate

- [x] Reconfirm active entry, approved seven-body registry, prior-unit source boundaries, and lockfile match the preflight recovery snapshot.
- [x] Modify only the approved registry-composition seam in `src/App.tsx` so the live shell receives nine completed bodies.
- [x] Do not alter shell controllers, section order, prior completed bodies, the final temporary body, dependencies, or deployment configuration.
- [x] Mark ST-011 and ST-012 implemented only after live registration succeeds.

### Step 23 - Run Post-Activation Acceptance and Recovery Checks

- [x] Run strict TypeScript, focused/full tests, lint, active boundaries, applicable active verifiers, production build, measurements, and protected-source checks. The historical U-02 candidate-only verifier was recorded as not applicable after later approved entry changes.
- [x] Confirm active code/requests remain within budgets and candidate-to-active registry/content equivalence holds.
- [x] Confirm nine finished bodies, one temporary body, exact tool/activity facts, classification/group/count equivalence, and safe actions.
- [x] If any P0 check fails, restore exact pre-switch registration through a recoverable patch and record failed acceptance. No current active-state P0 check failed, so recovery was not invoked.

### Step 24 - Generate Completion Evidence and Summaries

- [x] Write implementation, verification, and recovery summaries under `aidlc-docs/construction/tools-fieldwork/code/`.
- [x] Record created/modified files, story/NFR traceability, commands, versions, tests, budgets, rendered review, limitations, candidate decision, activation, and recovery.
- [x] Verify no duplicate brownfield files, unplanned application files, dependency changes, infrastructure artifacts, or non-Markdown files under `aidlc-docs/` were created.
- [x] Validate documentation for Markdown parsing, tables, paths, special characters, and whitespace.

### Step 25 - Present the U-06 Code Generation Review Gate

- [x] Update every plan checkbox and workflow state in the same interaction as completed work.
- [x] Present the standardized U-06 Code Generation completion message with application and documentation locations.
- [x] Wait for explicit approval before advancing to U-07 Contact and Journal. Approved on 2026-09-17.

## Planned Verification Commands

- `npx tsc -b`
- `npm run test:tools-fieldwork`
- `npm run test:academic`
- `npm run test:research`
- `npm run test:identity`
- `npm run test:shell`
- `npm run test:portfolio`
- `npm test`
- `npm run lint`
- `npm run check:tools-fieldwork:source`
- `npm run check:tools-fieldwork:candidate`
- `npm run check:tools-fieldwork:active`
- `npm run verify:tools-fieldwork:source`
- `npm run verify:tools-fieldwork:candidate`
- `npm run verify:tools-fieldwork:active`
- `npm run verify:academic:active`
- `npm run verify:research:active`
- `npm run verify:identity:active`
- `npm run verify:shell -- --phase active`
- `npm run verify:recovery`
- `npm run build:tools-fieldwork-candidate`
- `npm run measure:tools-fieldwork-candidate`
- `npm run build`

Exact commands may add plan-defined output arguments but cannot expand application scope or dependencies.

## Completion Criteria

- ST-011 and ST-012 satisfy every approved acceptance criterion.
- All 17 U-06 NFRs have reproducible evidence or an honestly recorded P1 environment limitation.
- Methods and Tools and Fieldwork and Leadership are active; the Contact/Journal body remains temporary.
- Candidate approval precedes activation, and post-activation P0 checks pass or exact recovery is applied.
- JavaScript, CSS, and request budgets pass; zero evidence bytes are emitted or requested.
- Exact tool classification, linked context, activity facts, group/count equivalence, and no invented rating pass.
- Dependencies, lockfile, GitHub Pages deployment, shell controllers, and prior completed bodies remain unchanged except for the approved registry seam.
- `src/data/awards.ts`, `src/data/gallery.ts`, `src/data/videos.ts`, and `src/components/Awards.tsx` remain untouched.
- Every execution checkbox is marked immediately when its work completes.

## Extension Compliance

- **Security Baseline**: Disabled in workflow state; its full rules remain unloaded. Approved U06-NFR-SEC-001 controls remain mandatory.
- **Property-Based Testing**: Disabled in workflow state; its full rules remain unloaded. Deterministic malformed tables, capacity fixtures, and repeated-run tests remain mandatory.
