# Code Generation Plan - U-02 Scientific Shell

> **Status: Completed and explicitly approved on 2026-09-15. This document is the single source of truth for U-02 Code Generation.**

> **Execution note:** The first approved Step 12 switch was rolled back after Step 14 found one stale U-01 boundary-test expectation. The one-file scope amendment was explicitly approved on 2026-09-15.

## Unit Context

- **Workspace root**: `/Users/nhamhhung/student_ports/TranGiaMinhTam.github.io`
- **Project type**: Brownfield single-package React, TypeScript, and Vite static application.
- **Review boundary**: VU-01.
- **Primary stories**: ST-002 and ST-003.
- **Requirements**: FR-002, FR-003, FR-015, FR-016 and U02-NFR-SCL-001 through U02-NFR-EVD-001.
- **Prerequisite unit**: U-01 Foundation and Safe Migration, completed and approved.
- **Deployment**: Existing GitHub Pages artifact; runtime and deployment infrastructure remain unchanged.
- **Application-code location**: Workspace root, primarily `src/portfolio/shell/` and `scripts/portfolio/`.
- **Documentation location**: Markdown only under `aidlc-docs/construction/scientific-shell/code/` and the candidate-review question file named below.

## Generation Approach

U-02 uses a two-phase migration. First, it creates the new full-width bioinformatics observatory as an inactive candidate and verifies its state logic, fallbacks, accessibility semantics, responsive structure, active-graph boundaries, recovery status, and bundle headroom. The current entry remains unchanged during this work. Second, a dedicated candidate-review gate asks the user to approve the rendered candidate. Only an approved candidate may replace the live template composition.

The active switch removes the Chakra provider, rejected global styles, template registry, layout-mode hook, and old presentation composition from the eager import graph. It does not delete those files, remove dependencies, mutate the lockfile, modify raw source evidence, or implement the final content owned by U-03 through U-07.

## Interfaces and Responsibilities

### Owned browser-safe contracts

- Exact registered-section and reserved-journal hash classification.
- Deterministic visibility winner, navigation intent, progress, theme, capability, state, event, effect, and finding contracts.
- One navigation/progress controller with direct anchors, push/replace history policy, one observer or constant-listener fallback, and complete teardown.
- One theme controller with root `data-theme`, exact value parsing, apply-first persistence, system-preference behavior, and storage failure isolation.
- One full-width four-band observatory shell with a skip link, specimen masthead, horizontal locus navigation, textual and graphical progress, ten ordered section slots, and a restrained footer.

### Owned build/test boundaries

- An isolated candidate Vite entry that does not alter `index.html`, `src/main.tsx`, or `src/App.tsx` before review.
- Active-graph inspection that rejects Chakra, Tailwind presentation, templates, legacy layout hooks, rejected styles, raw evidence, and later-domain modules from the new eager graph.
- Parameterized Vite-manifest measurement enforcing 307,200-byte JavaScript and 51,200-byte CSS ceilings.
- Machine-readable candidate, entry-decision, post-switch, responsive/accessibility, and validation evidence.

### Expected downstream interfaces

- U-03 through U-07 receive the ten stable `RegisteredSectionSlot` seams and must not create parallel navigation, progress, or theme controllers.
- U-07 owns journal detail behavior; U-02 only preserves and classifies its reserved hash namespace.
- Later units may replace temporary slot bodies without changing section IDs, order, shell geometry, or active-controller ownership.

### API, repository, database, and infrastructure scope

- **HTTP/API layer**: Not applicable; U-02 introduces no endpoint or runtime request.
- **Repository/data-access layer**: Not applicable; section metadata remains local immutable TypeScript.
- **Database/migrations**: Not applicable.
- **Runtime infrastructure**: Not applicable; no cache, queue, worker, analytics, service worker, or persistence service.
- **Deployment artifacts**: No workflow change. Existing GitHub Pages build behavior remains in place.

## Exact File Scope

### Existing files to modify

- `src/portfolio/index.ts` - publish the approved shell seam for later units.
- `src/App.tsx` - replace template selection and layout composition with `PortfolioExperience` only after the candidate gate passes.
- `src/main.tsx` - remove the Chakra provider and rejected global stylesheet from the active tree; import U-01 tokens/foundations and render the new app.
- `index.html` - remove starter favicon and duplicate source stylesheet link; add accurate title and static metadata.
- `src/App.test.tsx` - replace old active-template expectations with new shell, landmark, navigation, progress, hash, fallback, and theme expectations.
- `src/templates/business/businessTemplate.test.tsx` - decouple quarantined legacy-presentation coverage from the active `PortfolioApp` entry while retaining direct legacy component checks.
- `scripts/portfolio/check-boundaries.mjs` - replace the U-01 inactive-entry prohibition with U-02 active-shell requirements and rejected-graph checks.
- `scripts/portfolio/measure-build.mjs` - support an explicit distribution directory, comparison artifact, output path, and byte budgets while retaining U-01 defaults.
- `package.json` - add only focused U-02 candidate, verification, and measurement scripts; dependencies and versions remain unchanged.

### Shell application files to create

- `src/portfolio/shell/index.ts`
- `src/portfolio/shell/shell.types.ts`
- `src/portfolio/shell/sectionHash.ts`
- `src/portfolio/shell/visibility.ts`
- `src/portfolio/shell/progress.ts`
- `src/portfolio/shell/theme.ts`
- `src/portfolio/shell/shellReducer.ts`
- `src/portfolio/shell/browserAdapters.ts`
- `src/portfolio/shell/useSectionProgress.ts`
- `src/portfolio/shell/usePortfolioTheme.ts`
- `src/portfolio/shell/PortfolioExperience.tsx`
- `src/portfolio/shell/ObservatoryShell.tsx`
- `src/portfolio/shell/SpecimenMasthead.tsx`
- `src/portfolio/shell/LocusNavigator.tsx`
- `src/portfolio/shell/SectionProgress.tsx`
- `src/portfolio/shell/ThemeControl.tsx`
- `src/portfolio/shell/RegisteredSectionSlot.tsx`
- `src/portfolio/shell/ObservatoryFooter.tsx`
- `src/portfolio/shell/Shell.module.css`

### Tests to create

- `src/portfolio/shell/sectionHash.test.ts`
- `src/portfolio/shell/visibility.test.ts`
- `src/portfolio/shell/progress.test.ts`
- `src/portfolio/shell/theme.test.ts`
- `src/portfolio/shell/shellReducer.test.ts`
- `src/portfolio/shell/browserAdapters.test.ts`
- `src/portfolio/shell/useSectionProgress.test.tsx`
- `src/portfolio/shell/usePortfolioTheme.test.tsx`
- `src/portfolio/shell/shellComponents.test.tsx`
- `src/portfolio/shell/PortfolioExperience.test.tsx`
- `src/portfolio/shell/shellStyles.test.ts`

### Candidate and verification tooling to create

- `scripts/portfolio/candidate/index.html`
- `scripts/portfolio/candidate/main.tsx`
- `scripts/portfolio/candidate/vite.config.mjs`
- `scripts/portfolio/verify-shell.mjs`

The candidate configuration writes only to a dedicated directory under the operating-system temporary directory. It never changes or reuses the deployable `dist/` directory and does not enter the final application graph.

### Machine-readable evidence to create

- `artifacts/portfolio/u02/pre-switch.json`
- `artifacts/portfolio/u02/candidate.json`
- `artifacts/portfolio/u02/review-matrix.json`
- `artifacts/portfolio/u02/entry-decision.json`
- `artifacts/portfolio/u02/post-shell.json`
- `artifacts/portfolio/u02/validation.json`

### Markdown documentation to create

- `aidlc-docs/construction/plans/scientific-shell-candidate-review-questions.md`
- `aidlc-docs/construction/scientific-shell/code/pre-switch.md`
- `aidlc-docs/construction/scientific-shell/code/candidate-verification.md`
- `aidlc-docs/construction/scientific-shell/code/verification.md`
- `aidlc-docs/construction/scientific-shell/code/code-generation-summary.md`

No other application, configuration, test, evidence, or documentation file may be created, modified, moved, or deleted without an explicitly approved plan amendment.

### Approved one-file scope amendment

- `src/portfolio/boundaries.test.ts` - preserve every U-01 raw-evidence, dependency, unsafe-pattern, recovery, and measurement assertion while making its active-entry expectation phase-aware for the approved U-02 shell.

Question 2 in `scientific-shell-candidate-review-questions.md` received explicit option A approval on 2026-09-15T00:42:52Z.

## Entry-Switch Preconditions

All conditions below must pass before `src/App.tsx`, `src/main.tsx`, or `index.html` is modified:

1. U-01 recovery payloads and the protected raw-source inventory verify unchanged.
2. The exact pre-switch file/hash record is complete and the dependency lockfile is unchanged.
3. Strict TypeScript, focused shell tests, the full test suite, lint, and source-boundary checks pass against the inactive candidate.
4. Candidate manifest JavaScript is no more than 307,200 bytes and CSS is no more than 51,200 bytes.
5. State timing, one-frame scheduling, lifecycle cleanup, hash/history, observer/geometry, storage/media, and doubled-volume checks pass.
6. Semantic, keyboard, contrast, reduced-motion, focus, zoom/reflow, and 320/768/1280/1440 light/dark results are recorded with no unresolved P0 failure.
7. The candidate contains all ten section targets and none of the rejected layout structures or imports.
8. The user explicitly approves option A in the candidate-review question file after reviewing the candidate.

If a precondition fails, generation stops before the active switch. The current active files remain unchanged and the failure is recorded. If a post-switch P0 check fails, rejected files remain intact and the three entry-file changes are reverted through an exact `apply_patch` derived from `pre-switch.json`; no destructive Git command is used.

## Story Tracking

- [x] **ST-002** - Compact direct navigation, stable hashes, continuous ordered sections, deterministic active state, and text-equivalent progress are implemented and verified.
- [x] **ST-003** - One coherent light/dark semantic theme, resilient preference handling, and accessible active-mode control are implemented and verified.

Inherited safeguards ST-013, ST-016, ST-018, ST-019, ST-020, and ST-021 are evidence obligations for this unit, not duplicate primary story ownership.

## Step-by-Step Generation Plan

### Step 1 - Preflight and Scope Lock

- [x] Re-read this complete approved plan and select Step 1 as the first incomplete generation step.
- [x] Confirm the workspace root, active unit, approved U-01 dependency, disabled extensions, and exact target-file presence.
- [x] Capture revision, dirty-worktree inventory, dependency and lockfile hashes, active-entry hashes, source-evidence inventory, tool versions, and current build facts in `pre-switch.json` and `pre-switch.md`.
- [x] Verify every target is inside the approved scope and no unrelated user change would be overwritten.
- [x] Stop for a plan amendment if the workspace differs materially from this scope.

### Step 2 - Generate Pure Shell Contracts and Decisions

- [x] Create the read-only shell state, event, effect, capability, finding, navigation, progress, visibility, and theme contracts.
- [x] Implement exact section/journal/invalid hash classification without selector interpolation.
- [x] Implement keyed progress derivation, deterministic visibility winner selection, exact theme precedence, and the pure transition reducer.
- [x] Preserve registry order and fail visibly for internal invariant violations while representing expected capability loss as typed results.
- [x] Mark this step complete immediately after validating the created files.

### Step 3 - Generate Browser Adapters

- [x] Implement injected location/history, visibility observer, one-frame geometry fallback, theme storage, media preference, reduced-motion, and root-theme adapters.
- [x] Use one observer or constant-count passive listeners, at most one scheduled geometry batch per frame, and complete teardown.
- [x] Preserve native anchor behavior when history enhancement cannot safely run.
- [x] Store only the exact theme string and expose no raw storage exception to the UI.

### Step 4 - Generate React Controllers

- [x] Implement `useSectionProgress` as the sole owner of target registration, active-section arbitration, navigation effects, and progress state.
- [x] Implement `usePortfolioTheme` as the sole owner of root theme application, system preference, visitor choice, and optional persistence.
- [x] Make both hooks Strict Mode safe, avoid unchanged-winner state updates, and clean up every subscription and scheduled frame.

### Step 5 - Generate the Inactive Observatory Candidate

- [x] Implement `PortfolioExperience` and the visible shell components with stable automation identifiers on every interactive element.
- [x] Render a focus-revealed skip link, slim specimen masthead, named horizontal locus navigator, text-equivalent coordinate progress, one main scan field, ten ordered registered sections, and semantic footer.
- [x] Use explicitly temporary non-factual slot copy; do not fabricate student claims or implement content owned by U-03 through U-07.
- [x] Implement locally owned responsive CSS with fluid full-width bands, bounded reading measure inside sections, local navigation overflow, visible focus, 24-pixel targets, reduced-motion behavior, and no sidebar, drawer, hamburger, selector, casebook, notebook, Quarto chrome, or repeated card frame.
- [x] Export the inactive shell through `src/portfolio/index.ts` without changing the active entry.

### Step 6 - Generate Pure and Adapter Unit Tests

- [x] Cover valid, empty, malformed, encoded, repeated, and reserved-journal hash inputs.
- [x] Cover navigation intent priority, observer ties, oscillation, target removal, identical inputs, back/forward interruption, and deterministic history effects.
- [x] Cover stored/system/fallback theme precedence, invalid storage values, storage exceptions, media absence, and visitor-choice persistence.
- [x] Cover doubled metadata and event fixtures, keyed lookup, linear batch behavior, constant listener count, one-frame scheduling, and full cleanup.
- [x] Cover representative success and failure behavior for every pure rule family.

### Step 7 - Generate Hook, Component, Style, and Accessibility Tests

- [x] Cover Strict Mode mount/unmount/remount lifecycle, capability-by-capability degradation, native-link fallback, and timing with fake clocks.
- [x] Verify one main landmark, named navigation, skip target, heading order, all ten anchors and sections, `aria-current`, concise progress status, and theme control semantics.
- [x] Verify root theme changes immediately even when persistence fails and content remains one shared DOM tree.
- [x] Verify CSS source rules for full-width geometry, local-only horizontal overflow, visible focus, sticky offsets, target sizing, token use, reduced motion, 320-pixel reflow, and rejected-selector absence.
- [x] Calculate and assert approved token contrast pairs for both themes.

### Step 8 - Generate Candidate and Migration Tooling

- [x] Add the isolated candidate HTML, React entry, and Vite configuration under `scripts/portfolio/candidate/`.
- [x] Parameterize `measure-build.mjs` while preserving its U-01 default behavior and exact exit semantics for absolute budgets and regression review.
- [x] Update `check-boundaries.mjs` so inactive candidate checks and eventual active-shell checks use explicit modes and reject the prohibited import graph.
- [x] Create `verify-shell.mjs` to validate exact files, registry targets, test/measurement evidence, dependency immutability, protected-source integrity, candidate review, active-entry graph, and rollback data.
- [x] Add package scripts only; confirm `package-lock.json` and dependency declarations are unchanged.

### Step 9 - Run the Inactive Candidate Quality Gate

- [x] Run strict TypeScript, focused U-01/U-02 tests, the complete test suite, lint, inactive boundary inspection, U-01 recovery verification, and protected-source verification.
- [x] Measure deliberate state response, stable progress settlement, geometry scheduling, listener counts, and repeated-run determinism.
- [x] Record exact commands, versions, durations, results, warnings, and dispositions.
- [x] Keep the current application entry unchanged if any P0 result fails.

### Step 10 - Build and Measure the Isolated Candidate

- [x] Build the candidate into its dedicated operating-system temporary directory without writing to `dist/`.
- [x] Traverse its Vite manifest and verify initial JavaScript at or below 307,200 bytes and CSS at or below 51,200 bytes.
- [x] Confirm the candidate eager graph includes React, U-01 contracts/styles, and U-02 shell only, and excludes rejected and later-domain modules.
- [x] Record exact files, bytes, gzip supplements, graph classifications, network-surface inspection, and findings in `candidate.json` and `candidate-verification.md`.
- [x] Stop before candidate review if any entry-switch precondition is incomplete.

### Step 11 - Candidate Responsive, Accessibility, and User Review Gate

- [x] Serve the isolated candidate locally and provide the review URL without changing the live entry.
- [x] Complete and record the 320, 768, 1280, and 1440 CSS-pixel matrix in light and dark modes, including document/client width, local navigation overflow, focus visibility, keyboard reachability, target obstruction, wrapping, contrast, reduced motion, and 200-percent zoom/reflow.
- [x] Record exact automated browser versions, manual devices, and standards-inferred compatibility separately; never claim untested browsers.
- [x] Create `scientific-shell-candidate-review-questions.md` using the mandatory A/B/X and `[Answer]:` format and log the approval prompt.
- [x] Wait for explicit user option A approval of the rendered candidate. Option B requests changes and leaves the current entry unchanged.
- [x] Record the exact response and `canSwitch` decision in `entry-decision.json` before continuing.

### Step 12 - Perform the Guarded Active-Entry Switch

- [x] Reconfirm every precondition and the explicit candidate approval immediately before mutation.
- [x] Modify only `src/App.tsx`, `src/main.tsx`, and `index.html` to activate `PortfolioExperience`, U-01 tokens/foundations, and accurate document metadata.
- [x] Remove Chakra provider, rejected global CSS, template selection, layout-mode, and journal-detail imports from the active entry graph without deleting their source files.
- [x] Verify the exact post-switch diff before proceeding.

### Step 13 - Align Active and Quarantined Legacy Tests

- [x] Replace `src/App.test.tsx` expectations with active scientific-shell behavior and fallbacks.
- [x] Decouple `businessTemplate.test.tsx` from `PortfolioApp` and directly render the quarantined legacy template seam for regression coverage.
- [x] Confirm no test reintroduces a rejected module into the production entry graph.

### Step 14 - Run the Post-Switch Acceptance Gate

- [x] Run strict TypeScript, focused U-01/U-02 tests, full tests, lint, production build, active boundary inspection, U-01 recovery verification, and shell verification.
- [x] Measure the real `dist/` manifest against the shell budgets and candidate result; investigate any unexplained difference or greater-than-10-percent regression.
- [x] Confirm all ten hashes, direct reload, back/forward, deliberate push, passive replace, invalid-hash normalization, observer fallback, storage/media failure, theme persistence, and lifecycle cleanup.
- [x] Recheck accessibility, responsive, timing, static privacy, runtime requests, exact dependency inventory, available registry audit, protected-source integrity, and no deleted rejected file.
- [x] Restore the three entry files through an exact non-destructive patch and stop if any P0 post-switch result fails.

### Step 15 - Produce Verification Evidence and Documentation

- [x] Write `post-shell.json`, `validation.json`, `verification.md`, and `code-generation-summary.md` from approved result data without including raw/private evidence.
- [x] Record modified versus created files, exact commands and versions, manifest totals, timing, responsive/accessibility matrix, browser coverage, warnings, advisory reachability, rollback status, and remaining later-unit placeholders.
- [x] Verify every evidence field is supported, all Markdown is parse-compatible, and no temporary candidate output enters the deployable tree.

### Step 16 - Close U-02 Generation and Present Review Gate

- [x] Mark ST-002 complete only when navigation, progress, hashes, and responsive shell acceptance all pass.
- [x] Mark ST-003 complete only when both themes, preference fallbacks, contrast, and shared-tree behavior all pass.
- [x] Mark every completed plan checkbox in the same interaction and update `aidlc-state.md` plus `aidlc-docs/README.md`.
- [x] Verify no duplicate modified files, dependency mutation, rejected-file deletion, raw-evidence mutation, or scope drift occurred.
- [x] Present the standardized two-option U-02 Code Generation completion message and wait for explicit approval before U-03.

## Plan Preparation Checklist

- [x] Read all U-02 Functional Design, NFR Requirements, NFR Design, story-map, dependency, and active workspace inputs.
- [x] Confirm U-01 is approved and U-02 is ready for Code Generation planning.
- [x] Review the brownfield entry, active tests, build scripts, measurement tool, boundary tool, and exact existing files that require in-place modification.
- [x] Define exact application, test, tooling, evidence, and documentation paths.
- [x] Define explicit story traceability, interfaces, ownership, exclusions, and non-applicable layers.
- [x] Define a fail-closed inactive candidate phase and separate rendered candidate approval gate before activation.
- [x] Validate the plan structure, paths, thresholds, checkboxes, Markdown, and content before creation.
- [x] Log the plan approval prompt and pause before Part 2.

## Approval Boundary

- Approval authorizes the complete 16-step sequence, including inactive candidate generation and testing.
- Approval does not pre-approve the rendered candidate or active-entry switch. Step 11 remains a separate explicit gate.
- No dependency changes, lockfile changes, source deletions, raw-evidence changes, backend work, deployment changes, or later-domain implementations are authorized.
- If the candidate needs a file or action outside this exact scope, generation stops for a plan amendment.

## Extension Compliance

- **Security Baseline**: Disabled in `aidlc-state.md`; extension rules are skipped. The approved product-specific U-02 static security and privacy controls remain mandatory.
- **Property-Based Testing**: Disabled in `aidlc-state.md`; extension rules are skipped. Approved deterministic matrix, doubled-volume, failure, and repeated-run tests remain mandatory.
