# NFR Requirements - U-01 Foundation and Safe Migration

## Scope and Acceptance Semantics

These requirements apply to the foundation contracts and become inherited constraints for later units. `P0` requirements block U-01 approval when unmet. `P1` requirements also require evidence, but an environmental limitation may be recorded with an explicit disposition when it does not weaken a product requirement. Final integrated measurements are repeated during Build and Test.

## NFR Summary

| ID | Category | Priority | Measurable target |
| --- | --- | --- | --- |
| U01-NFR-SCL-001 | Scalability | P1 | Support at least 2x launch content, relationship, and published-evidence counts without architecture change. |
| U01-NFR-PER-001 | JavaScript | P0 | Final initial minified JavaScript is at most 450 KiB. |
| U01-NFR-PER-002 | CSS | P0 | Final initial CSS is at most 75 KiB. |
| U01-NFR-PER-003 | Asset loading | P0 | Full PDFs and high-resolution evidence are absent from the initial request/import graph. |
| U01-NFR-PER-004 | Regression control | P0 | A greater-than-10-percent increase from the latest approved measurement requires explicit review. |
| U01-NFR-AVL-001 | Recovery | P0 | Verified restoration of captured rejected-attempt state is documented and achievable within 30 minutes in a compatible checkout. |
| U01-NFR-SEC-001 | Static privacy boundary | P0 | No secrets, runtime APIs, persisted visitor data, private evidence, unsafe schemes, or opener exposure. |
| U01-NFR-REL-001 | Determinism | P0 | Repeated validation of identical inputs produces identical ordered findings. |
| U01-NFR-MNT-001 | Maintainability | P0 | Strict typing, lint, focused tests, documented contracts, one-way imports, and locally owned styles pass without unexplained new warnings. |
| U01-NFR-USE-001 | Accessibility | P0 | Applicable WCAG 2.2 AA criteria and defined measurable checks pass. |
| U01-NFR-CMP-001 | Compatibility | P1 | Support the latest two stable major desktop browser versions plus current iOS Safari and Android Chrome. |
| U01-NFR-EVD-001 | Review evidence | P0 | Exact commands, versions, results, measurements, warnings, and dispositions are recorded. |

## Scalability Requirements

### U01-NFR-SCL-001 - Bounded Static Growth

- The canonical model, relationship validation, publication manifest, selectors, and finding aggregation must accept at least twice the approved launch counts of their respective records without schema or architectural changes.
- Doubling records must not require a database, API, CMS, separate application, or runtime pagination service.
- Deterministic ordering and unique-ID validation must remain correct at the target size.
- Growth beyond the target triggers content curation, asset optimization, and build-measurement review before architecture expansion is considered.

**Acceptance method**: Fixture-based focused tests use synthetic structural records containing no fabricated visible student claims. The fixture doubles record counts and verifies successful derivation, stable ordering, relationship validation, and absence of runtime service dependencies.

### U01-NFR-SCL-002 - Asset Growth Isolation

- Adding published evidence must not add full documents or high-resolution sources to the initial execution path.
- Manifest growth must not require domain components to import asset directories or enumerate filenames.
- Build output must report initial-code and evidence-asset totals separately.

**Acceptance method**: Import-graph check, manifest validation, and categorized build measurement.

## Performance Requirements

### Measurement Definitions

- **Initial JavaScript**: All emitted JavaScript required to render the root continuous-page entry before a visitor opens journal detail or evidence, measured as exact minified emitted bytes.
- **Initial CSS**: All emitted CSS requested by that initial root path, measured as exact emitted bytes.
- **Initial graph**: Entry HTML, its eagerly referenced code and CSS, and eagerly imported assets. Lazy journal chunks and user-opened full evidence are excluded only when the build graph confirms separation.
- **Approved measurement**: A recorded result produced by an exact command, source revision, lockfile identity, runtime/tool versions, base-path input, and timestamp.
- **Regression percentage**: `(new bytes - approved bytes) / approved bytes * 100` for the same measurement category and method.

### U01-NFR-PER-001 - Initial JavaScript Budget

- Final initial minified JavaScript must be no more than 450 KiB, equivalent to 460,800 bytes.
- It must also remain below the measured current baseline; the approximate 893 kB figure is contextual until replaced by the reproducible baseline.
- U-01 does not switch the entry, so its own new foundation modules must not enter the active initial graph during this unit.

**Acceptance method**: Reproducible Vite production-build artifact enumeration at baseline, after U-01, after each entry-affecting unit, and during final Build and Test.

### U01-NFR-PER-002 - Initial CSS Budget

- Final initial CSS must be no more than 75 KiB, equivalent to 76,800 bytes.
- U-01 token and foundation styles must not reproduce or extend the 2,474-line rejected override stack.

**Acceptance method**: Exact emitted CSS bytes plus prohibited-selector and style-boundary checks.

### U01-NFR-PER-003 - Evidence and Journal Isolation

- Full PDFs, high-resolution evidence, raw archives, and journal-detail presentation code must not be eagerly loaded by the root path.
- Below-the-fold preview images in later units require explicit dimensions and appropriate lazy loading.
- A full evidence source is accessed only after explicit visitor action.

**Acceptance method**: Manifest inspection, generated import graph or bundle metadata, and later network/request review.

### U01-NFR-PER-004 - Regression Review

- Any measurement more than 10 percent larger than the latest approved comparable result blocks automatic acceptance.
- The responsible unit must document cause, alternatives, effect on the absolute budget, and explicit disposition.
- A regression below 10 percent still cannot exceed an absolute P0 budget.

**Acceptance method**: Recorded byte comparison using identical measurement definitions.

## Availability and Recovery Requirements

### U01-NFR-AVL-001 - Recovery Objective

- Before replacement work, the capture must cover relevant tracked modifications and relevant untracked rejected-attempt files.
- The record includes source revision, timestamp, inclusions, exclusions with rationales, byte sizes, integrity values where appropriate, and restoration instructions.
- A maintainer using a compatible checkout must be able to reconstruct the captured state within 30 minutes without editor history or an external service.
- Completeness, readability, and restoration steps must be verified before the record is marked `verified`.

**Acceptance method**: Manifest reconciliation plus a documented restoration rehearsal or non-destructive verification demonstrating every restoration input is present. Exact mechanics are selected in the Code Generation plan.

### U01-NFR-AVL-002 - Static Continuity

- U-01 does not claim or introduce a hosting uptime SLA.
- Core verified text must remain available when optional previews, evidence, storage, motion, or remote fonts are unavailable.
- A missing optional resource cannot produce a blank application or uncaught exception.

**Acceptance method**: Focused fallback tests and later browser review.

## Product Security and Privacy Requirements

The optional Security Baseline extension remains disabled. These requirements derive from approved NFR-007 and the static product boundary.

### U01-NFR-SEC-001 - No Sensitive Runtime Surface

- No secret, credential, private token, authentication state, runtime API endpoint, database client, upload path, analytics collector, or visitor-data persistence may be introduced.
- Browser storage cannot hold portfolio content, evidence metadata, validation results, or recovery data.
- Raw source archives and unapproved personal documents remain outside the active application graph and deployable allowlist.

**Acceptance method**: Source/import inspection, published-manifest validation, deployable-asset inventory, and secret-pattern checks appropriate to the approved Code Generation plan.

### U01-NFR-SEC-002 - Safe Destinations

- URLs use only explicitly allowed schemes appropriate to the record type.
- New-tab links prevent opener access using safe relationship behavior.
- Evidence actions resolve only repository-local published records; a domain cannot construct a raw path.

**Acceptance method**: URL-rule tests, component contract tests, and link inspection.

### U01-NFR-SEC-003 - Dependency Review

- U-01 adds no UI framework or runtime dependency.
- Delivery evidence records the dependency tree and available audit results without silently changing packages.
- A material known issue affecting shipped runtime code blocks approval until disposition; exact remediation requires a separately approved Code Generation plan.

**Acceptance method**: Lockfile-based dependency inventory and approved audit command output.

## Reliability Requirements

### U01-NFR-REL-001 - Deterministic Validation

- Every documented rule family has focused coverage for representative success and failure behavior.
- Identical normalized input yields identical finding codes, targets, severities, and order.
- Findings are de-duplicated by rule and target.
- Any uncaught validator exception or nondeterministic result blocks approval.

**Acceptance method**: Repeat-run tests, invalid fixtures, and exact result assertions.

### U01-NFR-REL-002 - Safe Optional Omission

- Missing optional evidence or preview preserves verified textual content.
- An unavailable optional action is omitted rather than shown broken or disabled without purpose.
- Required invalid relationships, conflicts, unsafe assets, and absent core identity are errors, not silent omissions.

**Acceptance method**: Focused selector, evidence, and validation tests.

### U01-NFR-REL-003 - Foundation Independence

- U-01 passes focused type, lint, and test checks without switching the application entry or importing unfinished later unit components.
- It performs no runtime network or filesystem I/O.

**Acceptance method**: Build graph, import-boundary checks, and focused tests.

## Maintainability Requirements

### U01-NFR-MNT-001 - Quality Gate

- TypeScript strict mode, unused-code checks, ESLint, focused tests, and the production build must pass for the approved unit scope.
- New public contracts and rule codes are documented and stable.
- New foundation code contains no unexplained warnings, unapproved suppressions, or routine `!important`.
- Imports remain one-way: presentation may consume model/shared contracts; models do not consume React, DOM, CSS, or presentation.

**Acceptance method**: Exact type/build, lint, test, source-boundary, and style-boundary results.

### U01-NFR-MNT-002 - Presentation Isolation

- The new active portfolio boundary does not import rejected template modules, `business.css`, Chakra UI, raw archives, or another domain's presentation.
- Shared primitives cannot impose generic card, timeline, ledger, sidebar, casebook, notebook, Quarto, or domain-section geometry.
- Semantic tokens and locally owned CSS Modules replace layered global overrides.

**Acceptance method**: Static boundary checks and focused component/style review.

### U01-NFR-MNT-003 - Change Ownership

- Each contract has a named owner and consumers.
- Later contract amendments must identify affected approved units and their regression suites.
- Recovery and cleanup steps remain exact, recoverable, and separately approved.

**Acceptance method**: Code summary traceability and AI-DLC plan/audit inspection.

## Accessibility and Usability Requirements

### U01-NFR-USE-001 - WCAG 2.2 AA Foundation

- All later interactive behavior must be keyboard operable with visible focus that is not obscured.
- Normal text contrast is at least 4.5:1; large text and meaningful graphical objects are at least 3:1 where the criterion applies.
- Applicable pointer targets are at least 24 by 24 CSS pixels or satisfy a WCAG 2.2 AA spacing exception.
- Content and controls reflow without two-dimensional scrolling at 320 CSS pixels for ordinary content.
- Text remains usable at 200 percent zoom.
- Reduced motion removes nonessential movement without changing information or operation.
- Semantic landmarks, headings, actions, labels, states, lists, tables, and status messages are programmatically meaningful.

**Acceptance method**: Automated checks plus manual keyboard, focus, zoom, reflow, contrast, reduced-motion, and semantic inspection. Automation alone is insufficient.

### U01-NFR-USE-002 - Visualization Equivalence

- Every informational graphic has a concise accessible title and description and a paired semantic list or table derived from identical typed values.
- Category/state meaning does not rely on color, shape, position, or motion alone.
- Decorative graphics are removed from the accessibility tree and contain no unique information.

**Acceptance method**: Contract tests compare visual-model values with summary values; manual semantic inspection confirms understandable context.

### U01-NFR-USE-003 - Understandable Findings

- Validation findings identify severity, stable rule, target, cause, and actionable resolution.
- Messages do not expose private source content unnecessarily.
- Warning disposition remains visible in review evidence.

**Acceptance method**: Representative finding review and exact snapshot/result assertions.

## Compatibility Requirements

### U01-NFR-CMP-001 - Browser Policy

- Target the latest two stable major versions of Chrome, Edge, Firefox, and Safari plus current iOS Safari and Android Chrome at the time of final verification.
- Exact tested versions are recorded rather than frozen in this document.
- No Internet Explorer compatibility is required.

### U01-NFR-CMP-002 - Capability Fallbacks

- System fonts preserve usable hierarchy if remote fonts fail.
- Unavailable browser storage does not affect U-01 source or evidence contracts.
- Reduced or disabled motion preserves meaning.
- Features relying later on `IntersectionObserver` must define a stable no-observer fallback in their owning unit.
- GitHub Pages operation assumes no server-side routing.

**Acceptance method**: Target-browser matrix in final Build and Test plus focused adapter/fallback tests in owning units.

## Required Review Evidence

### U01-NFR-EVD-001 - Evidence Package

The U-01 Code Generation summary must record:

1. Exact commands and relevant environment/tool versions.
2. Focused type, lint, test, build, boundary, and validation results.
3. Documented rule-family coverage and any deliberate exclusions.
4. Automated and manual accessibility checks applicable to U-01 primitives.
5. Recovery manifest completeness and restoration verification.
6. Baseline and post-unit JavaScript, CSS, initial-graph, evidence-asset, and deployable totals in exact bytes.
7. Warnings, limitations, and explicit dispositions.
8. Confirmation that no application-entry switch, rejected-file cleanup, or unapproved dependency mutation occurred.

## Traceability

| NFR area | Project requirements | Stories |
| --- | --- | --- |
| Scalability and curation | NFR-003, FR-017 | ST-021 |
| Performance and loading | NFR-002, FR-017 | ST-018 |
| Recovery and continuity | NFR-005, AR-001, AR-002 | ST-020, ST-021 |
| Privacy and safe publication | NFR-007 | ST-013, ST-021 |
| Deterministic reliability | NFR-005, NFR-006 | ST-013, ST-020 |
| Maintainability and testing | NFR-003, NFR-004, AR-002 through AR-005 | ST-021 |
| Accessibility and visualization | NFR-001, FR-013, FR-016 | ST-016, ST-017, ST-019 |
| Compatibility | NFR-008, FR-018 | ST-019, ST-020 |

## Extension Compliance

- **Security Baseline**: Skipped because it is disabled in the active workflow state; approved product privacy requirements are defined above.
- **Property-Based Testing**: Skipped because it is disabled in the active workflow state; example-based deterministic validation remains required.
