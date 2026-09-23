# Code Generation Plan - U-01 Foundation and Safe Migration

> **Status: Completed and approved on 2026-09-14. This is the single source of truth for U-01 Code Generation.**

## Unit Context

- **Workspace root**: `/Users/nhamhhung/student_ports/TranGiaMinhTam.github.io`
- **Project type**: Brownfield single-package React, TypeScript, and Vite static application.
- **Review boundary**: VU-07.
- **Primary stories**: ST-013, ST-016, ST-017, ST-018, ST-019, ST-020, ST-021.
- **Prerequisite unit**: None; U-01 establishes contracts consumed by U-02 through U-07.
- **Deployment**: One existing GitHub Pages artifact; no infrastructure changes.
- **Application-code location**: Workspace root, primarily `src/portfolio/` and `scripts/portfolio/`.
- **Documentation location**: Markdown only under `aidlc-docs/construction/foundation-safe-migration/code/`.

## Implementation Boundary

U-01 creates an inactive foundation beside the rejected presentation. It does not change `src/main.tsx` or `src/App.tsx`, switch the active application entry, remove rejected files, transform source evidence, remove dependencies, or implement the observatory shell and final content domains.

Before any application or configuration mutation, U-01 creates and verifies a non-destructive recovery package for the rejected application state and records a reproducible build baseline.

## Interfaces and Responsibilities

### Owned browser-safe contracts

- Canonical verified source, stable IDs, provenance, relationships, and ten-section registry.
- Typed evidence publication manifest and safe resolver.
- Immutable index and selector foundations.
- Stable validation findings and deterministic aggregation.
- Informational/decorative visualization models and semantic-summary equivalence.
- Semantic region, evidence action, scientific label, hidden text, and accessible data-summary primitives.
- Light/dark semantic tokens and foundation-only styles.

### Owned build/test boundaries

- Read-only source and deployable boundary inspection.
- Recovery manifest verification.
- Vite entry-graph classification and exact budget evaluation.
- Machine-readable evidence under `artifacts/portfolio/u01/` and Markdown summaries under the unit code directory.

### Expected downstream interfaces

- U-02 consumes section, token, validation, and semantic-region contracts.
- U-03 through U-06 consume verified source, evidence, visualization, action, and token contracts.
- U-07 consumes evidence and semantic foundations and owns journal/contact behavior.
- Later units may amend a shared contract only through an explicit approved plan with regression checks.

### API, repository, database, and infrastructure scope

- **HTTP/API layer**: Not applicable; no endpoints or runtime requests are introduced.
- **Repository/data-access layer**: Not applicable; canonical data is local immutable TypeScript.
- **Database/migrations**: Not applicable.
- **Runtime infrastructure**: Not applicable; no cache, queue, service, worker, analytics, or persistence.
- **Deployment artifacts**: Existing GitHub Pages workflow remains unchanged; only local build evidence is produced.

## Exact File Scope

### Existing files to modify

- `.gitignore` - ignore the non-deployable local recovery directory only.
- `package.json` - add focused U-01 test, boundary, measurement, and recovery-verification scripts; do not change dependencies.
- `vite.config.ts` - enable deterministic Vite build-manifest output without changing base path or active plugins.

### Application files to create

- `src/portfolio/index.ts`
- `src/portfolio/model/portfolio.types.ts`
- `src/portfolio/model/sectionRegistry.ts`
- `src/portfolio/model/verifiedPortfolioSource.ts`
- `src/portfolio/model/evidenceManifest.ts`
- `src/portfolio/model/indexes.ts`
- `src/portfolio/model/selectors.ts`
- `src/portfolio/model/validation.types.ts`
- `src/portfolio/model/validators.ts`
- `src/portfolio/model/validation.ts`
- `src/portfolio/visualization/visualization.types.ts`
- `src/portfolio/visualization/validateVisualization.ts`
- `src/portfolio/visualization/AccessibleDataSummary.tsx`
- `src/portfolio/shared/SectionRegion.tsx`
- `src/portfolio/shared/EvidenceAction.tsx`
- `src/portfolio/shared/ScientificLabel.tsx`
- `src/portfolio/shared/VisuallyHidden.tsx`
- `src/portfolio/shared/VisuallyHidden.module.css`
- `src/portfolio/styles/tokens.css`
- `src/portfolio/styles/foundations.css`

### Build/test tooling to create

- `scripts/portfolio/check-boundaries.mjs`
- `scripts/portfolio/measure-build.mjs`
- `scripts/portfolio/verify-recovery.mjs`

### Tests to create

- `src/portfolio/model/sectionRegistry.test.ts`
- `src/portfolio/model/evidenceManifest.test.ts`
- `src/portfolio/model/validation.test.ts`
- `src/portfolio/model/growth.test.ts`
- `src/portfolio/visualization/validateVisualization.test.ts`
- `src/portfolio/shared/foundationComponents.test.tsx`
- `src/portfolio/styles/tokens.test.ts`
- `src/portfolio/boundaries.test.ts`

### Recovery and evidence outputs to create

- `.aidlc-recovery/research-atlas-pre-u01/tracked-application.patch`
- `.aidlc-recovery/research-atlas-pre-u01/untracked-application.tar.gz`
- `.aidlc-recovery/research-atlas-pre-u01/SHA256SUMS`
- `artifacts/portfolio/u01/recovery-manifest.json`
- `artifacts/portfolio/u01/recovery-verification.json`
- `artifacts/portfolio/u01/baseline.json`
- `artifacts/portfolio/u01/post-unit.json`
- `artifacts/portfolio/u01/validation.json`

The `.aidlc-recovery/` files are local recovery payloads and are not application imports or deployment inputs. The JSON files under `artifacts/portfolio/u01/` are machine-readable review evidence and contain no private document contents.

### Markdown documentation to create

- `aidlc-docs/construction/foundation-safe-migration/code/recovery-record.md`
- `aidlc-docs/construction/foundation-safe-migration/code/baseline.md`
- `aidlc-docs/construction/foundation-safe-migration/code/verification.md`
- `aidlc-docs/construction/foundation-safe-migration/code/code-generation-summary.md`

## Approved Recovery Scope

- The tracked patch covers application and repository configuration paths only: `src/`, `public/`, `index.html`, `package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `eslint.config.js`, `.github/workflows/deploy.yml`, `README.md`, and `DEPLOYMENT.md` when present.
- The untracked archive includes rejected-attempt application files under `src/`, including curated `src/assets/minh-tam/` derivatives, while excluding `src/assets/minh-tam/source/` because that approximately 258 MB tree is protected user-supplied source evidence rather than rejected generated presentation state.
- The raw source-evidence tree receives a path, size, and integrity inventory in the recovery manifest and is explicitly protected from mutation or cleanup; U-01 neither copies nor transforms it.
- AI-DLC documentation is not placed in the rejected-application archive because it is the active approved workflow record.
- Capture is staged in a newly resolved `mktemp` directory under `/private/tmp`, then copied to the fixed `.aidlc-recovery/research-atlas-pre-u01/` target only after completeness checks. If the fixed target already exists, generation stops rather than overwriting it.
- Restoration verification uses a fresh local no-hardlink clone in a new `/private/tmp` directory, applies the binary tracked patch, extracts the untracked archive, and compares the normalized application inventory and integrity values. It does not modify the shared workspace or delete the temporary verification directory.

## Step-by-Step Generation Plan

### Step 1 - Preflight and Scope Lock

- [x] Re-read this complete plan and select Step 1 as the first incomplete step.
- [x] Confirm the workspace root from `aidlc-state.md` and verify every source/config target above exists or is absent as documented.
- [x] Capture read-only `git status`, current revision, staged state, untracked inventory, current `src/portfolio/` absence, and relevant asset sizes.
- [x] Verify that no target requires overwriting an unrelated user-created file and that application entry files remain out of scope.
- [x] Stop and request a plan change if the resolved workspace differs materially from the approved scope.

### Step 2 - Capture and Verify the Rejected Application State

- [x] Resolve a new temporary staging directory with `mktemp`; fail if `.aidlc-recovery/research-atlas-pre-u01/` already exists.
- [x] Generate the binary tracked-application patch for the explicit application/configuration path allowlist.
- [x] Generate a null-safe compressed archive of relevant untracked application files, excluding the protected raw source-evidence tree and active AI-DLC documentation.
- [x] Inventory and calculate integrity values for the patch, archive, archived members, and protected raw source-evidence files.
- [x] Create the machine-readable recovery manifest with source revision, capture time, inclusions, exclusions, sizes, integrity values, and restoration sequence.
- [x] Rehearse restoration in a fresh local no-hardlink clone under `/private/tmp`; apply the patch, extract the archive, compare normalized inventories and integrity values, and record elapsed time.
- [x] Require successful restoration within 30 minutes before marking recovery verified.
- [x] Copy verified payloads to `.aidlc-recovery/research-atlas-pre-u01/`, create `SHA256SUMS`, and add only `.aidlc-recovery/` to `.gitignore` using `apply_patch`.
- [x] Create `recovery-record.md` and `recovery-verification.json`; do not delete the original or verification workspace.

### Step 3 - Record the Reproducible Pre-U-01 Baseline

- [x] Before creating foundation source, record revision, lockfile integrity, Node/npm/Vite/TypeScript versions, build command, base path, and timestamp.
- [x] Run the existing production build without source mutation.
- [x] Parse the current entry HTML and emitted files to calculate exact initial JavaScript, initial CSS, other initial assets, evidence assets, and total deployable bytes; record supplemental gzip values where deterministic.
- [x] Treat build or measurement failure as blocking and diagnose it before continuing.
- [x] Create `artifacts/portfolio/u01/baseline.json` and `baseline.md` with the reproducible results.

### Step 4 - Generate Canonical Domain Types and Section Registry

- [x] Create `portfolio.types.ts` with branded IDs, provenanced records, relationships, section definitions, evidence records, immutable view-model bases, validation results, recovery facts, measurements, and visualization contracts shared across later units.
- [x] Create `sectionRegistry.ts` with exactly the ten approved IDs, labels, short labels, hashes, order, and component keys.
- [x] Enforce type-level read-only boundaries and avoid React, DOM, CSS, filesystem, and presentation imports in model files.
- [x] Map ST-013, ST-019, ST-020, ST-021 and SEC/CNT/DRV rules to exported contracts.

### Step 5 - Generate Verified Source, Evidence, Index, and Selector Foundations

- [x] Create `verifiedPortfolioSource.ts` as an adapter over approved Minh Tam data, explicitly excluding the former-owner WordPress records and unsupported claims.
- [x] Create `evidenceManifest.ts` with explicit published records for approved curated Minh Tam documents and images; include provenance, kind, accessible text, full source, optional preview, and loading strategy.
- [x] Create `indexes.ts` with duplicate-detecting immutable index builders and keyed relationship resolution.
- [x] Create `selectors.ts` with pure shared selector helpers and safe optional-evidence resolution; leave final domain-specific composition to owning units.
- [x] Do not modify existing `src/data/`, raw source assets, or visible presentation in this step.

### Step 6 - Generate Deterministic Validation Logic

- [x] Create `validation.types.ts` with stable rule codes, findings, severities, normalized targets, contexts, and reports.
- [x] Create `validators.ts` with focused pure validation by recovery, content, section, evidence, derivation, visualization, UI, boundary, performance, and integration rule family.
- [x] Create `validation.ts` with coordinator, de-duplication, deterministic severity/code/target sorting, counts, and `canProceed`.
- [x] Ensure expected invalid inputs return findings while unexpected programmer errors remain visible to tests.
- [x] Use no retries, runtime I/O, logging side effects, process termination, or swallowed exceptions in browser-safe validation.

### Step 7 - Generate Visualization Contracts and Semantic Alternative

- [x] Create `visualization.types.ts` with discriminated informational/decorative models and typed relationship/category values.
- [x] Create `validateVisualization.ts` to enforce purpose, title, description, non-color meaning, absence of fabricated measurements, and visual/summary equivalence.
- [x] Create `AccessibleDataSummary.tsx` to render an associated semantic list or table from the same informational model.
- [x] Keep SVG geometry and domain-specific visualization components out of U-01.

### Step 8 - Generate Shared Semantic Primitives

- [x] Create `SectionRegion.tsx`, `EvidenceAction.tsx`, `ScientificLabel.tsx`, and `VisuallyHidden.tsx` with typed props, native semantics, stable purpose-based test seams only where justified, and no domain geometry.
- [x] Create `VisuallyHidden.module.css` using a focus-safe visually hidden technique.
- [x] Ensure evidence actions accept only resolved published evidence, omit unavailable actions upstream, and prevent opener access for new-tab behavior.
- [x] Do not create a generic card, layout shell, timeline, ledger, modal, gallery, toast, or state store.

### Step 9 - Generate Semantic Tokens and Foundation Styles

- [x] Create `tokens.css` with complete light/dark semantic roles for canvas, surfaces, text, accents, focus, rules, data categories, typography, spacing, borders, motion, and elevation.
- [x] Create `foundations.css` with safe document defaults, visible focus, reduced motion, system-font fallback, reflow-safe media defaults, and no domain geometry.
- [x] Do not import these styles from the active application entry during U-01.
- [x] Include no rejected selector, Tailwind utility composition, Chakra style dependency, or routine `!important`.

### Step 10 - Generate Local Boundary, Recovery, and Measurement Tooling

- [x] Create `check-boundaries.mjs` to inspect only explicit new-boundary/config/build scopes and emit stable machine-readable findings for prohibited imports, paths, selectors, unsafe schemes, and unexpected deployable assets.
- [x] Create `measure-build.mjs` to consume deterministic Vite manifest/entry facts, classify initial/lazy/evidence assets, total exact bytes, calculate regression percentages, and evaluate 460,800-byte JavaScript and 76,800-byte CSS limits.
- [x] Create `verify-recovery.mjs` to reconcile the approved manifest, payload hashes, member inventory, protected-source inventory, and restoration evidence without mutating the workspace.
- [x] Modify `vite.config.ts` with `build.manifest: true` only; preserve current base path and plugins.
- [x] Modify `package.json` without dependency changes to add `test:portfolio`, `check:portfolio`, `measure:portfolio`, and `verify:recovery` scripts pointing to the exact local checks.

### Step 11 - Generate Model and Validation Tests

- [x] Create `sectionRegistry.test.ts` for exact order, uniqueness, hash mapping, and rejected-ID absence.
- [x] Create `evidenceManifest.test.ts` for eligibility, safe optional absence, URL/path rules, loading strategies, and raw/private exclusion.
- [x] Create `validation.test.ts` for every rule family, blocking/warning behavior, de-duplication, stable ordering, repeat-run determinism, conflicts, and representative invalid relationships.
- [x] Create `growth.test.ts` with two-times structural fixtures verifying stable indexes, ordering, and architecture independence without fabricated visible student claims.

### Step 12 - Generate Visualization, Component, and Token Tests

- [x] Create `validateVisualization.test.ts` for informational/decorative discrimination, required names/descriptions, non-color categories, no fabricated measurements, and identical summary values.
- [x] Create `foundationComponents.test.tsx` using semantic queries for section headings, published evidence actions, safe new-tab relationships, labels, visually hidden text, and list/table summaries.
- [x] Create `tokens.test.ts` to parse required token roles in both themes, calculate approved contrast pairs, and reject missing or below-threshold roles.
- [x] Record which WCAG checks require later rendered/manual verification rather than claiming automation is complete.

### Step 13 - Generate Boundary and Build-Tool Tests

- [x] Create `boundaries.test.ts` to verify one-way model dependencies, rejected-import absence, raw-asset isolation, prohibited selector absence, no routine `!important`, and no U-01 entry import.
- [x] Exercise boundary, recovery, and measurement scripts against passing and representative failing fixtures without altering the shared workspace.
- [x] Verify the machine-readable schemas remain deterministic and exclude private document contents.

### Step 14 - Run U-01 Verification and Measure Post-Unit State

- [x] Run `npm run test:portfolio`, `npm test`, `npm run lint`, and `npm run build`; record exact results.
- [x] Run the new boundary, recovery-verification, and measurement scripts; create `validation.json` and `post-unit.json`.
- [x] Compare baseline and post-unit results, confirm U-01 remains outside the active initial graph, and disposition every warning.
- [x] Record dependency inventory and available audit results; request network approval only if a required audit cannot run in the sandbox.
- [x] Perform applicable manual review of semantic primitives, token contrast output, reduced-motion foundations, and documentation; mark visible shell/domain checks as deferred to their owning units.
- [x] Verify no duplicate `_new`, `_modified`, or alternate foundation files were created and no original/rejected application file was removed.

### Step 15 - Generate Code and Review Summaries

- [x] Create `verification.md` with exact commands, versions, results, rule coverage, accessibility checks, recovery status, measurements, warnings, limitations, and dispositions.
- [x] Create `code-generation-summary.md` separating modified, created, generated evidence, tests, and intentionally untouched files.
- [x] Include business-logic, frontend-contract, test, and build-tool summaries; record API, repository, database, infrastructure, and deployment changes as N/A or unchanged.
- [x] Confirm all seven U-01 stories and every U-01 NFR ID are traceable to implementation and evidence.
- [x] Mark every completed step and story checkbox in this plan and update `aidlc-state.md` in the same interaction.
- [x] Present the standardized U-01 Code Generation completion gate without advancing to U-02.

## Story Completion Tracking

- [x] ST-013 - Trust Every Portfolio Claim.
- [x] ST-016 - Operate the Entire Site Accessibly.
- [x] ST-017 - Understand Scientific Visuals Without Sight or Color.
- [x] ST-018 - Receive a Fast First View.
- [x] ST-019 - Use the Portfolio Across Supported Viewports.
- [x] ST-020 - Recover Gracefully from Client-Side Edge Cases.
- [x] ST-021 - Update, Validate, and Publish Safely.

## Plan Preparation Checklist

- [x] Read U-01 Functional Design, NFR Requirements, NFR Design, unit definition, story map, and dependency artifacts.
- [x] Read the workspace root and project type from `aidlc-state.md`.
- [x] Reviewed the brownfield code structure and current target-file inventory.
- [x] Documented exact application, tool, test, evidence, and Markdown paths.
- [x] Numbered all generation and verification steps sequentially.
- [x] Documented story mapping, dependencies, contracts, service boundaries, and non-applicable database/API/infrastructure layers.
- [x] Verified that the plan creates no duplicate modified-file variants and performs no unapproved cleanup.

## Estimated Scope

- **Generation steps**: 15.
- **Existing files modified**: 3 (`.gitignore`, `package.json`, `vite.config.ts`).
- **Application source/style files created**: 20.
- **Build/test tools created**: 3.
- **Focused test files created**: 8.
- **Machine-readable evidence files created**: 5.
- **Markdown code/review records created**: 4.
- **Application entry changes**: 0.
- **Deleted application files**: 0.
- **Dependency additions/removals/upgrades**: 0.

## Approval Meaning

Approval authorizes only the 15 steps and exact scope in this plan. It authorizes creation of the non-destructive recovery payload and baseline before application edits. It does not authorize the U-02 entry switch, later domain components, dependency cleanup, raw source-evidence mutation, rejected-file deletion, deployment changes, or any later unit.

## Extension Compliance

- **Security Baseline**: Skipped because it is disabled; approved product-specific static boundary checks remain in scope.
- **Property-Based Testing**: Skipped because it is disabled; deterministic example-based and doubled-volume fixture tests remain in scope.
