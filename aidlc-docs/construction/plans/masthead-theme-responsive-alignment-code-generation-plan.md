# Code Generation Plan - U-02 Masthead, Theme, and Responsive Alignment

> **Status: Approved. Part 2 generation is authorized through the isolated candidate review gate; active composition remains blocked until separate candidate approval.**

## Unit Context

- **Workspace**: `/Users/nhamhhung/student_ports/TranGiaMinhTam.github.io`.
- **Project**: Brownfield React 19, strict TypeScript, Vite 7, CSS Modules, Vitest, Testing Library, and `fast-check` static portfolio.
- **Unit outcome**: Replace the plain masthead with a polished scientific panel, move the theme action to the top, remove visible relationship tables while preserving assistive meaning, and correct the six supplied alignment defects across the approved review matrix.
- **Stories**: US-001, US-002, US-008, and US-009.
- **Primary requirements**: FR-001 through FR-003, FR-007 through FR-012; NFR-001, NFR-003 through NFR-007, NFR-019; all approved U-02 NFRs and U02-P01 through U02-P10.
- **Consumes**: Approved U-01 capabilities/evidence, U-02 Functional/NFR designs, existing controlled theme, ten-section shell, and current domain semantic rows.
- **Provides**: Polished masthead, top action cluster, optional resume-action geometry for U-03, shared hidden summary, corrected responsive layouts, candidate/rendered evidence, and reversible activation.
- **Infrastructure Design**: N/A. No hosting, API, persistence, IAM, network, or deployment-topology change is introduced.

## Brownfield and Capability Findings

- The worktree is extensively dirty and contains approved/user work. U-02 must capture a fresh target-specific recovery baseline and must not reset, clean, overwrite unrelated changes, or modify protected originals.
- The active shell renders `ThemeControl` inside the sticky navigation. `SpecimenMasthead` has no props/actions and uses a plain three-column surface.
- Four source components can render visible tables: Identity, Research, Academics, and the generic `AccessibleDataSummary`. Three are active relationship-summary paths; the generic component is an exported latent path.
- Existing domain models already expose reviewed semantic rows, so visible tables can become hidden semantic lists/descriptions without changing source facts.
- The six screenshots map to `LaboratoryResearch`, `ComputationalProjects`, `ResearchQuestions`, `DataStories`, `AcademicTrajectory`, and `EvidenceCountSummary` plus their CSS Modules/shell framing.
- Current CSS uses horizontal overflow for relationship tables and contains the exact rigid grids responsible for the supplied wrapping/alignment defects.
- Google Chrome is available locally at a reviewed absolute executable path. Playwright, Puppeteer, axe, Lighthouse, Firefox, and a callable Safari automation binary are not installed as project tools. The plan installs nothing automatically.
- U-01 already supplies exact `fast-check` 4.10.2, source-governance tests, privacy verification, recovery primitives, and browser/tool boundary checks.

## Planned Existing Files Modified In Place

### Shell and shared presentation

- `src/portfolio/shell/shell.types.ts`
- `src/portfolio/shell/PortfolioExperience.tsx`
- `src/portfolio/shell/ObservatoryShell.tsx`
- `src/portfolio/shell/SpecimenMasthead.tsx`
- `src/portfolio/shell/ThemeControl.tsx`
- `src/portfolio/shell/Shell.module.css`
- `src/portfolio/styles/tokens.css`
- `src/portfolio/index.ts`
- focused shell/token tests

### Visible-summary migrations

- `src/portfolio/identity/RelationshipSummary.tsx`
- `src/portfolio/identity/IdentityQuestions.module.css`
- `src/portfolio/research/ResearchRelationshipSummary.tsx`
- `src/portfolio/research/ResearchData.module.css`
- `src/portfolio/academics/AcademicRelationshipSummary.tsx`
- `src/portfolio/academics/AcademicEvidence.module.css`
- `src/portfolio/visualization/AccessibleDataSummary.tsx`
- existing focused identity/research/academic/visualization tests

### Six alignment owners

- `src/portfolio/research/LaboratoryResearch.tsx`
- `src/portfolio/research/ComputationalProjects.tsx`
- `src/portfolio/research/DataStories.tsx`
- `src/portfolio/identity/ResearchQuestions.tsx`
- `src/portfolio/academics/AcademicTrajectory.tsx`
- `src/portfolio/academics/EvidenceCountSummary.tsx`
- the domain CSS/test files listed above

### Build, boundary, and CI integration

- `package.json` only for focused commands; no dependency addition.
- `.github/workflows/deploy.yml` for focused U-02 checks before build.
- `vite.config.ts` only if the dedicated Node/browser-review tests require a separate exclusion/configuration.
- `scripts/portfolio/check-boundaries.mjs`

## Planned New Files

### Runtime-safe shared contracts

- `src/portfolio/shared/semanticSummary.types.ts`
- `src/portfolio/shared/semanticSummaryModel.ts`
- `src/portfolio/shared/SemanticSummary.tsx`
- `src/portfolio/shared/SemanticSummary.module.css`
- focused example and property tests beside these modules
- `src/portfolio/shell/mastheadModel.ts`
- focused masthead model/component tests

### Candidate and verification tooling

- `scripts/portfolio/masthead-alignment-candidate/index.html`
- `scripts/portfolio/masthead-alignment-candidate/main.tsx`
- `scripts/portfolio/masthead-alignment-candidate/vite.config.mjs`
- `scripts/portfolio/masthead-alignment-review/` modules for case generation, Chrome capability/run adapter, DOM/geometry/CLS probe, canonical evidence, recovery, and gate aggregation
- focused Node example/PBT tests for review tooling
- `artifacts/portfolio/u02-masthead-alignment/` for non-public baseline, candidate, render-matrix, privacy, boundary, recovery, and activation evidence
- `.aidlc-recovery/masthead-theme-responsive-alignment/` for ignored recovery payload and rehearsal evidence

### Documentation

- `aidlc-docs/construction/masthead-theme-responsive-alignment/code/code-generation-summary.md`

Exact helper filenames may be consolidated when a listed module would be an empty wrapper. Consolidation must preserve ownership and be documented; duplicate replacement files are prohibited.

## Decisions Requiring Approval

Complete every `[Answer]:` tag. Option A is recommended.

## Question 1 - Recovery Before Mutation

How should U-02 protect the dirty worktree?

A) Capture all planned existing/new targets, active-entry/config hashes, current tracked diffs, U-01 protected-source/resume facts, and relevant untracked payload; rehearse restoration in an isolated target and stop before mutation on any failure
B) Reuse U-01 recovery without reconciling newer files
C) Depend on Git status and editor history
X) Other (describe after the answer tag)

[Answer]: A

## Question 2 - Shared Semantic Summary

How should visible relationship tables be removed?

A) Implement one pure typed projector and visually-hidden list/description renderer, then adapt Identity, Research, Academics, and generic `AccessibleDataSummary` table mode so no active or exported U-02 path emits a visible table
B) Hide each existing table with CSS while keeping its table markup and scrolling wrapper
C) Delete the tables and their relationship meaning
X) Other (describe after the answer tag)

[Answer]: A

## Question 3 - Masthead Action Boundary

What should U-02 activate in the top action cluster?

A) Move and activate the existing labelled theme control in the masthead now; implement a typed optional resume slot and final geometry, but leave the resume capability unpassed until U-03 completes reviewed resume-content integration
B) Activate the resume download in U-02 despite the approved unit boundary
C) Keep the theme control in sticky navigation until U-03
X) Other (describe after the answer tag)

[Answer]: A

## Question 4 - Masthead Visual Treatment

Which implementation should make the header less plain?

A) Use existing tokens plus approved new semantic tokens for an accent-tinted surface, restrained grid/specimen pseudo-elements, deliberate rule/highlight, stronger type hierarchy, compact status, and wrap-safe actions, with reduced-motion/forced-colors fallbacks
B) Add animated particles and a large background image
C) Change only the background color
X) Other (describe after the answer tag)

[Answer]: A

## Question 5 - Alignment Corrections

How should the six supplied defects be fixed?

A) Refactor each owning CSS Module to bounded shrinkable tracks and content-aware measures using the same DOM order; remove fixed/minimum widths and table-overflow rules that cause fragmentation, while preserving each domain's visual identity
B) Add screenshot-specific margins and manual line breaks
C) Apply one identical universal grid to all six components
X) Other (describe after the answer tag)

[Answer]: A

## Question 6 - Responsive Thresholds

How should breakpoints be implemented?

A) Preserve existing broad 48/52-rem and 760/1100-pixel compatibility where useful, tune only from measured content failure points, and keep CSS/container-query logic rather than runtime viewport state
B) Replace every breakpoint with JavaScript `resize` listeners
C) Use only one 768-pixel breakpoint for all components
X) Other (describe after the answer tag)

[Answer]: A

## Question 7 - Browser Review Tooling

How should the required rendered matrix be collected with current local capabilities?

A) Build a dependency-free local review harness around the installed headless Chrome executable and candidate-side DOM/CLS probes; record Chrome automation honestly, generate the complete canonical matrix, and document equivalent manual Firefox/Safari/iOS Safari cases as required incomplete evidence until performed rather than fabricating automation
B) Install Playwright and browser binaries automatically
C) Skip browser review and rely on jsdom
X) Other (describe after the answer tag)

[Answer]: A

## Question 8 - Rendered Candidate Approval

When should the visible candidate be activated?

A) Build and validate the complete isolated candidate, present key screenshots and the matrix/budget findings through a dedicated review question file, and wait for explicit candidate approval before changing the active entry/composition
B) Activate immediately after local tests and ask for feedback afterward
C) Activate the masthead first and alignment fixes later
X) Other (describe after the answer tag)

[Answer]: A

## Question 9 - Property-Based Testing

How should U02-P01 through U02-P10 be implemented?

A) Reuse the U-01 Vitest/fast-check harness, add constrained semantic/layout/action arbitraries and simple reference oracles, run at least 100 cases under a fixed default seed with shrinking/replay/no retry, and keep DOM/CSS examples separate
B) Generate arbitrary CSS strings with a new random helper
C) Skip properties because the page is visual
X) Other (describe after the answer tag)

[Answer]: A

## Question 10 - Dependency Policy

May implementation add packages?

A) Add no runtime or development dependency; use current React/Vite/Vitest/Testing Library/fast-check and reviewed local Chrome capability only, stopping for a new approval if an essential gate cannot be met
B) Add any accessibility or screenshot package that simplifies implementation
C) Add a hosted visual-regression SDK
X) Other (describe after the answer tag)

[Answer]: A

## Question 11 - Evidence and Budget Policy

How should candidate evidence and budget deviations be handled?

A) Write schema-versioned canonical JSON plus Markdown summaries, compare exact before/candidate/active bytes and request graphs, record CLS/interaction/overflow/contrast/target checks, and block every unexplained or unapproved threshold breach
B) Keep console output only and accept approximate formatted sizes
C) Treat budgets as advisory after activation
X) Other (describe after the answer tag)

[Answer]: A

## Question 12 - Privacy Verification

How should U-02 repeat the document-only phone boundary?

A) Reuse the approved one-time local resume extraction into process memory for candidate and active scans, never echoing or persisting the marker, and block activation on any finding
B) Commit the phone value in a U-02 test fixture
C) Skip privacy verification because U-02 edits only layout
X) Other (describe after the answer tag)

[Answer]: A

## Question 13 - Activation Scope

What may the activation change include?

A) Activate only the approved U-02 masthead/theme/hidden-summary/alignment work; preserve section IDs/order, Journal, contact, verified content, U-01 assets/capabilities, and defer actual resume action/content, archive browser, and media dialogs
B) Combine U-03 through U-05 features into the same activation
C) Replace the whole page structure and content while correcting alignment
X) Other (describe after the answer tag)

[Answer]: A

## Question 14 - Final Validation Depth

Which checks gate U-02 Code Generation completion?

A) Require recovery, focused examples, U02-P01 through P10, strict TypeScript, ESLint, full Vitest, production build, semantic/table scans, accessibility/style checks, complete candidate/active matrix status, exact budgets, Chrome rendered metrics/screenshots, documented Firefox/Safari manual status, privacy/source/resume integrity, bundle/request boundaries, and `git diff --check`
B) Run only focused U-02 tests and build
C) Defer all validation to final Build and Test
X) Other (describe after the answer tag)

[Answer]: A

## Executable Generation Sequence

### Part 1 - Planning and Approval

- [x] Step 1 - Load approved U-02 Functional Design, NFR Requirements, NFR Design, unit/story map, U-01 contracts/evidence, active code, Security Baseline, full PBT rules, and Code Generation rules.
- [x] Step 2 - Inspect the dirty brownfield worktree, shell/theme/summary/domain files, test and candidate conventions, package/CI/boundary configuration, and local browser/tool capabilities without mutating application code.
- [x] Step 3 - Define exact existing/new application, candidate, recovery, evidence, test, and documentation paths; mark API, repository/database, infrastructure, and deployment generation N/A.
- [x] Step 4 - Create the numbered U-02 Code Generation plan with story, requirement, NFR, property, security, candidate-review, and recovery traceability.
- [x] Step 5 - Receive and validate answers to all fourteen implementation questions.
- [x] Step 6 - Resolve every ambiguity or contradiction through a dedicated clarification file if required. No ambiguity or contradiction was found; no clarification file was needed.
- [x] Step 7 - Obtain explicit approval of the complete plan and generation sequence.

### Part 2 - Generation

- [x] Step 8 - Capture a fresh target-specific recovery baseline and verify an isolated restoration rehearsal before any application/config mutation. Stop on failure. Captured 25 existing targets plus 8 absence states; isolated byte-for-byte rehearsal passed and protected resume/source facts were reconciled.
- [x] Step 9 - Capture exact active-entry, initial JS/CSS/request, current DOM/table, privacy/source/resume, and six-defect baseline evidence; record Chrome capability and honest unavailable/manual engine status. Baseline: 295,847 JS bytes, 50,935 CSS bytes, three initial requests, four table owners, privacy clean, source/resume facts intact, Chrome automated locally, other engines manual-pending.
- [x] Step 10 - Implement typed masthead presentation and semantic-summary contracts/projectors with stable findings, pure reference oracles, constrained arbitraries, examples, and U02-P01 through U02-P10. Ten properties pass 100 deterministic cases at seed 20260921.
- [x] Step 11 - Implement the shared hidden `SemanticSummary` and migrate Identity, Research, Academics, and generic visualization table paths; prove exact semantic membership/order and remove obsolete visible-table/overflow CSS. Static source scan finds no table element in `src/portfolio`.
- [x] Step 12 - Refactor the masthead and theme control: move the labelled control into the upper-right action cluster, add approved scientific treatment and typed optional resume geometry, preserve controlled theme behavior, and activate no U-03 resume action.
- [x] Step 13 - Add purpose-named layout/accessibility tokens and base-first reduced-motion/forced-colors/progressive-enhancement rules without adding a runtime dependency or request.
- [x] Step 14 - Correct laboratory stations, computational header, question introduction, data signal sheet, academic header, and evidence spectrum through bounded shrinkable domain grids and stable source order.
- [x] Step 15 - Add/repair component, style-contract, accessibility, theme-storage, long-label, capacity, unsafe-input, boundary, and regression examples for every supplied defect. The focused six-area suite passes 103 tests across 31 files.
- [x] Step 16 - Implement isolated candidate entry/build/measurement commands without modifying the active composition; verify U-01 and existing behavior boundaries. The dedicated candidate builds independently and the portfolio boundary gate passes without findings.
- [x] Step 17 - Implement canonical render-case generation, candidate-side DOM/CLS/overflow probe, reviewed local headless-Chrome adapter, evidence writer, and composite gate; install no package. The deterministic 80-case matrix model and its focused tests pass.
- [x] Step 18 - Build and validate the isolated candidate, execute the complete automated Chrome subset and all non-browser gates, generate deterministic evidence/screenshots, and record Firefox/Safari/iOS Safari manual cases honestly as pending or completed. All 84 automated cases and non-browser gates pass with zero findings; other engines are manual-pending.
- [x] Step 19 - Create a dedicated candidate review question file containing the rendered evidence summary and wait for explicit candidate approval. Do not activate while approval or any blocking gate is absent. Review question created; activation is awaiting the user's answer.
- [x] Step 20 - After candidate approval only, perform the smallest reversible active composition/style activation and immediately repeat focused validation, privacy/source/resume integrity, budgets, render checks, and recovery verification. Option A promoted the approved in-place source through the unchanged active composition; the 84-case active matrix, privacy gate, recovery verification, and exact budgets pass with zero findings.
- [x] Step 21 - Run complete validation: focused examples/PBT, strict TypeScript, ESLint, full Vitest, production build, semantic/table/source/privacy scans, accessibility/style/contrast/target checks, matrix completeness, exact bundle/request/CLS budgets, Chrome evidence, documented other-engine status, `git diff --check`, and no unexpected U-03 through U-05 activation. All executable gates pass; 84 active cases have zero findings and manual-only engines remain documented pending.
- [x] Step 22 - Generate `aidlc-docs/construction/masthead-theme-responsive-alignment/code/code-generation-summary.md` with modified/created files, visual outcomes, commands/results, matrix/browser status, measurements, hashes, recovery, privacy, PBT seed/results, security/PBT compliance, and downstream boundaries.
- [x] Step 23 - Verify no duplicate replacement files, no protected-source mutation/deletion, no visible relationship table or obsolete overflow rule, no unexpected content/route/media activation, no unchecked plan steps, and present the required Code Generation completion gate. Final audit passed with zero findings; `completeness.json` records the evidence and the completion gate is presented.

## Story Completion Gates

- **US-001**: Distinctive masthead hierarchy and restrained scientific treatment pass both-theme responsive review.
- **US-002**: Theme control is above sticky navigation, names the next action, preserves preference behavior, and passes keyboard/focus checks.
- **US-008**: No visible relationship table remains; exact equivalent meaning is exposed through hidden semantic structures without layout space/scroll.
- **US-009**: All six supplied defects and all ten sections pass the approved width/theme/zoom/text-spacing review.

## Security and PBT Gates

- SECURITY-09, SECURITY-10, SECURITY-11, SECURITY-13, and SECURITY-15 are blocking and require executable evidence.
- SECURITY-01 through SECURITY-03, SECURITY-05 through SECURITY-08, SECURITY-12, and SECURITY-14 are N/A to U-02. SECURITY-04 remains deferred to U-06.
- PBT-01 through PBT-05 and PBT-07 through PBT-10 are blocking at applicable gates. PBT-02 is N/A unless implementation introduces a codec. PBT-06 is N/A for the immutable business core.
- No candidate approval or Code Generation completion prompt may offer continuation while an applicable blocker remains.

## N/A Generation Categories

- **API and service layer**: N/A; no endpoint or runtime service exists.
- **Repository/database and migrations**: N/A; no persistence is introduced.
- **Infrastructure/deployment topology**: N/A; U-06 owns hosting and delivery.
- **New dependency installation**: N/A under the approved recommended plan.

## Approval Boundary

Approval authorizes only the numbered U-02 Part 2 sequence. It does not pre-approve rendered candidate activation, a package installation, U-03 resume-content work, U-04 archive discovery, U-05 media dialogs, deployment, source deletion, or unrelated refactoring.
