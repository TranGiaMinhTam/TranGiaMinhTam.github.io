# NFR Design Plan - U-01 Foundation and Safe Migration

> **Status: Approved on 2026-09-13 using all option A decisions.**

## Purpose

Translate the approved U-01 quality targets into technical patterns and logical components for deterministic validation, recoverable migration, asset isolation, bundle measurement, accessible semantic foundations, boundary enforcement, and reproducible review evidence.

## Design Context

- The foundation supports two-times launch data growth within one static application.
- Final initial JavaScript is limited to 450 KiB minified and initial CSS to 75 KiB.
- Full evidence and high-resolution assets remain outside the initial graph.
- Recovery must be verified and restorable within 30 minutes in a compatible checkout.
- WCAG 2.2 AA, deterministic validation, one-way imports, and current evergreen compatibility are blocking.
- The selected stack is React 19, strict TypeScript, Vite, Vitest, Testing Library, native HTML/SVG, CSS Modules, and CSS custom properties with no new UI framework.

## Category Assessment

| Category | Applicability | Reason |
| --- | --- | --- |
| Resilience patterns | Applicable | Required failures must block cleanly while optional evidence degrades without blank output or nondeterminism. |
| Scalability patterns | Applicable | Model lookup, relationship validation, and manifest resolution must support two-times growth without services. |
| Performance patterns | Applicable | Build-graph separation, exact measurement, budgets, and regression review require concrete design. |
| Security patterns | Applicable within product scope | Static boundary checks must prevent secrets, unsafe destinations, raw/private assets, and runtime data surfaces. |
| Logical components | Applicable | Validators, aggregators, manifest resolvers, recovery verification, boundary inspection, and measurement need explicit ownership. |

## Questions

## Question 1 - Failure Isolation

Which resilience pattern should validation and derivation use?

A) Use typed result values and deterministic findings: required invalid state fails closed without partial publication, optional evidence returns safe absence with warnings, and no retries are used for local deterministic operations
B) Throw exceptions for every missing optional value and let callers decide whether to recover
C) Retry all validation and selector operations three times before returning a result
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 2 - Recovery Verification Pattern

How should snapshot completeness and restoration readiness be designed?

A) Use an inventory-first manifest with explicit inclusions/exclusions, integrity values, reconciliation against the captured workspace state, and a documented non-destructive restoration rehearsal before marking the snapshot verified
B) Mark a snapshot verified as soon as an archive file exists
C) Use a manual checklist without path reconciliation or integrity values
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 3 - Static Growth Pattern

How should the foundation handle two-times record growth?

A) Normalize immutable arrays once, build typed keyed indexes for relationship and evidence lookup, validate in predictable linear passes, and keep rendering contracts independent of storage or record count
B) Repeatedly scan all raw arrays inside every future component render
C) Introduce a client-side database and cache layer
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 4 - Bundle Budget Enforcement

How should JavaScript and CSS budgets be enforced?

A) Parse deterministic Vite output metadata or entry references, classify initial versus lazy artifacts, calculate exact byte totals, compare absolute and 10-percent regression budgets, and fail the review check on an unapproved breach
B) Read the build console visually and estimate totals from displayed filenames
C) Measure only compressed JavaScript and ignore CSS and initial/lazy classification
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 5 - Asset Isolation Pattern

How should published evidence remain outside the initial graph?

A) Separate typed metadata, optional optimized preview references, and full on-demand references; allow only the publication resolver to expose eligible assets and verify the generated graph against the manifest
B) Import every evidence file into one barrel module and hide unused items with CSS
C) Fetch raw source directories dynamically from the browser
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 6 - Static Security Controls

How should the approved security and privacy boundary be implemented?

A) Combine typed URL allowlists, safe-link helpers, published-asset validation, prohibited import/path checks, deployable inventory review, and scoped secret/dependency scans with no runtime security service
B) Add authentication middleware and a token store to the static app
C) Rely on reviewer observation and omit automated boundary checks
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 7 - Validation Architecture

How should the validation logic be decomposed?

A) Use focused pure validators by rule family feeding one deterministic aggregator that de-duplicates and sorts findings, with adapters kept outside canonical domain modules
B) Put all validation and formatting in one large application component
C) Let every future component define its own versions of shared validation rules
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 8 - Accessibility Enforcement Pattern

How should accessibility foundations be enforced across later units?

A) Provide semantic primitive contracts, theme-token contrast fixtures, visualization-model-to-summary equivalence checks, reduced-motion foundations, and a reusable manual review matrix without imposing shared layout geometry
B) Use one automated accessibility scan after all seven units and no contract-level checks
C) Build a generic accessible card and timeline system for all sections
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 9 - Evidence and Gate Reporting

How should NFR evidence be collected and reported?

A) Use deterministic local/CI checks that emit stable machine-readable results plus a concise Markdown summary of commands, versions, totals, warnings, dispositions, and manual checks
B) Store only screenshots of terminal output
C) Record a pass/fail statement without commands, versions, or measurements
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 10 - Logical Infrastructure

Which infrastructure-like components should U-01 introduce?

A) None at runtime; use local pure modules and narrowly scoped build/test tooling only, with no cache server, queue, circuit breaker, database, API gateway, monitoring agent, or new runtime dependency
B) Add a browser cache and background synchronization service
C) Add a queue, object store, and serverless validation API
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Execution Checklist

### Planning and Approval

- [x] Read the approved U-01 NFR requirements and technology decisions.
- [x] Evaluate resilience, scalability, performance, security, and logical-component categories.
- [x] Create context-specific NFR pattern and component questions.
- [x] Receive answers to all ten NFR Design questions.
- [x] Analyze answers for ambiguity, contradictions, combined choices, and undefined implementation rules.
- [x] Add and resolve follow-up questions if required; all option A decisions are compatible and require none.
- [x] Record explicit approval of the completed NFR Design plan.

### Design Generation

- [x] Generate `nfr-design-patterns.md` with resilience, scalability, performance, privacy, accessibility, maintainability, compatibility, and evidence patterns.
- [x] Generate `logical-components.md` with responsibilities, inputs, outputs, dependencies, failure behavior, and execution boundaries.
- [x] Validate both artifacts against approved NFR IDs, technology decisions, Functional Design rules, and U-01 boundaries.
- [x] Validate Markdown, Mermaid if used, tables, and text alternatives.
- [x] Present completed NFR Design for explicit approval before Code Generation Part 1 planning.

## Required Artifacts

- [x] `aidlc-docs/construction/foundation-safe-migration/nfr-design/nfr-design-patterns.md`
- [x] `aidlc-docs/construction/foundation-safe-migration/nfr-design/logical-components.md`

## Boundary

- Approval of this plan authorizes NFR Design documentation only.
- It does not authorize source changes, commands that create a recovery snapshot, dependency changes, build measurement, asset transformation, entry switching, cleanup, or deletion.
- Infrastructure Design remains skipped because no hosting architecture changes are required.
