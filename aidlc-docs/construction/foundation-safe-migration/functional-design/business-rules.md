# Business Rules - U-01 Foundation and Safe Migration

## Rule Semantics

- **Error**: Blocks U-01 handoff or publication until resolved.
- **Warning**: Records an optional omission or non-blocking maintenance concern; verified core content remains usable.
- **Determinism**: The same normalized inputs must yield identical rule codes, targets, severities, and ordering.
- **Scope**: These rules govern foundation data and contracts. Later units add domain-specific rules without weakening these controls.

## Recovery Rules

| Rule | Severity | Policy |
| --- | --- | --- |
| REC-001 | Error | Replacement work cannot begin until relevant tracked changes and untracked rejected-attempt files are represented in a recovery record. |
| REC-002 | Error | The recovery record must identify the source revision, capture time, included paths, deliberate exclusions, sizes, and restoration instructions. |
| REC-003 | Error | Missing, unreadable, or integrity-mismatched recovery material makes the snapshot invalid. |
| REC-004 | Error | Application-entry switching is prohibited in U-01. |
| REC-005 | Error | Cleanup is prohibited until the responsible later unit names exact targets, proves them unused, and receives Code Generation approval. |
| REC-006 | Warning | Generated dependency caches and build outputs may be excluded when they are reproducible and explicitly listed. |
| REC-007 | Error | Pre-existing unrelated user changes must not be absorbed into cleanup scope merely because they are uncommitted. |

## Canonical Content Rules

| Rule | Severity | Policy |
| --- | --- | --- |
| CNT-001 | Error | The canonical source must identify Minh Tam and must not expose former-owner identity or portfolio facts. |
| CNT-002 | Error | Every referencable record must have a unique, stable, nonempty typed ID. |
| CNT-003 | Error | Visible facts require approved source or explicitly reviewed evidence provenance. |
| CNT-004 | Error | Conflicting approved facts must produce a conflict; file modification time is not authority. |
| CNT-005 | Error | Scientific measurements, sequences, results, authorship, impact, links, metrics, or proficiency may not be inferred or invented. |
| CNT-006 | Error | Required identity and all ten approved section definitions must be present. |
| CNT-007 | Warning | Unsupported optional facts are omitted and reported when their absence could surprise a maintainer. |
| CNT-008 | Error | Presentation JSX, CSS, filenames, and visual labels cannot become independent factual sources. |
| CNT-009 | Error | Dates and external URLs must use accepted normalized forms and preserve their verified meaning. |
| CNT-010 | Error | Relationships may reference only existing, correctly typed target IDs. |

## Section Registry Rules

| Rule | Severity | Policy |
| --- | --- | --- |
| SEC-001 | Error | The registry contains exactly the ten approved section IDs in requirements order. |
| SEC-002 | Error | IDs, labels, short labels, hashes, order values, and component keys are unique and nonempty. |
| SEC-003 | Error | A section hash must map to its own section ID and may not enter the journal namespace. |
| SEC-004 | Error | Rejected home, about, experience, awards, gallery, skills, or journal-list IDs cannot appear as active top-level domains. |

## Evidence Publication Rules

| Rule | Severity | Policy |
| --- | --- | --- |
| EVD-001 | Error | Published evidence requires a stable ID, `published` status, valid kind, provenance, title, caption, accessible text, full source, and loading strategy. |
| EVD-002 | Error | A published full source must exist, be readable, and use an approved local scheme. |
| EVD-003 | Warning | A preview is optional; if declared, it must resolve to an approved derivative or be omitted. |
| EVD-004 | Error | Raw source archives, private items, and non-published records cannot enter the active application import graph. |
| EVD-005 | Error | Components cannot resolve evidence by ad hoc filename or import raw evidence directly. |
| EVD-006 | Warning | Missing optional evidence preserves verified text and removes only the unavailable action or preview. |
| EVD-007 | Error | A visible reference to missing or unpublished evidence is invalid. |
| EVD-008 | Error | Full documents and high-resolution evidence use on-demand loading; they cannot block the initial view. |
| EVD-009 | Error | Captions and accessible text must describe supported context without adding claims. |

## Domain Derivation Rules

| Rule | Severity | Policy |
| --- | --- | --- |
| DRV-001 | Error | Selectors accept validated canonical records and the publication manifest, not presentation state. |
| DRV-002 | Error | Selectors are pure: they do not mutate inputs, access the DOM, persist state, or perform network or filesystem I/O at runtime. |
| DRV-003 | Error | Output view models are read-only and deterministically ordered. |
| DRV-004 | Error | Derived counts, groups, and relationships must be exactly reproducible from canonical records. |
| DRV-005 | Error | Missing optional relationships are omitted safely; required invalid relationships block validation. |
| DRV-006 | Error | Selector output cannot contain layout instructions or rejected presentation concepts. |

## Visualization Accessibility Rules

| Rule | Severity | Policy |
| --- | --- | --- |
| VIS-001 | Error | Every visualization declares `informational` or `decorative` purpose. |
| VIS-002 | Error | Informational visualizations require a concise accessible title and description. |
| VIS-003 | Error | Informational visualizations require a semantic list or table derived from the exact same typed values. |
| VIS-004 | Error | Category and state meaning cannot rely on color, shape, position, or motion alone. |
| VIS-005 | Error | Decorative graphics are excluded from the accessibility tree and contain no unique information. |
| VIS-006 | Error | Graphics may not imply unavailable biological sequences, measurements, statistical results, scales, or confidence. |
| VIS-007 | Error | Reduced motion must preserve every informational relationship and state. |

## Semantic Frontend Foundation Rules

| Rule | Severity | Policy |
| --- | --- | --- |
| UI-001 | Error | Shared primitives may own landmark, heading, action, focus, hidden-text, evidence, and visualization semantics. |
| UI-002 | Error | Shared primitives may not impose reusable card, ledger, timeline, sidebar, casebook, notebook, Quarto, or domain-section geometry. |
| UI-003 | Error | Interactive behavior uses native semantics when sufficient and exposes an accessible name, state, visible focus, and keyboard operation. |
| UI-004 | Error | Informational alternatives remain available in normal document flow or through a clearly associated disclosure. |
| UI-005 | Error | Semantic tokens define roles for both themes; components do not branch their content structure by theme. |
| UI-006 | Error | Foundations honor reduced motion and system-font fallback without hiding or reordering information. |
| UI-007 | Error | U-01 does not render the final shell or a content-domain composition. |

## Dependency and Style Boundary Rules

| Rule | Severity | Policy |
| --- | --- | --- |
| BND-001 | Error | Active modules under the new portfolio boundary cannot import rejected template modules, rejected global presentation CSS, or Chakra UI. |
| BND-002 | Error | Domain folders cannot import another domain folder. |
| BND-003 | Error | Only approved model or evidence publication boundaries may reference allowlisted asset URLs. |
| BND-004 | Error | New CSS cannot select rejected `.business-*`, `.clinical-*`, `.quarto-*`, sidebar, ledger, timeline, or generic-card classes. |
| BND-005 | Error | Routine `!important` usage is prohibited; an exceptional use requires explicit design rationale and approval. |
| BND-006 | Error | Global styles own semantic tokens and safe document foundations, not domain geometry. |

## Performance Baseline Rules

| Rule | Severity | Policy |
| --- | --- | --- |
| PER-001 | Error | The baseline must record source revision, dependency-lock identity, tool versions, build command, base-path input, and capture time. |
| PER-002 | Error | Exact emitted JavaScript, CSS, and complete deployable asset byte totals are required. |
| PER-003 | Error | A failed or incomplete baseline build must be diagnosed before the approximate 893 kB reference may be superseded. |
| PER-004 | Error | Initial-code and total-asset measures remain distinct so evidence files do not conceal bundle changes. |
| PER-005 | Warning | Compressed totals may supplement but cannot replace exact emitted byte totals. |
| PER-006 | Error | Later measurements may append comparisons but cannot silently redefine the U-01 baseline. |

## Integration and Persistence Rules

| Rule | Severity | Policy |
| --- | --- | --- |
| INT-001 | Error | U-01 introduces no runtime API, database, CMS, analytics, authentication, upload, or hosted form integration. |
| INT-002 | Error | Browser storage cannot become a source for content, evidence metadata, recovery state, or validation results. |
| INT-003 | Error | Validation and derivation remain local and deterministic. |
| INT-004 | Error | Visitor information is neither collected nor persisted. |
| INT-005 | Error | Build-time filesystem access cannot leak into browser runtime contracts. |

## Finding and Publication Decision Rules

1. Normalize inputs without changing factual meaning.
2. Evaluate rules in stable rule-code order within each entity.
3. Emit at most one finding per rule code and target unless distinct paths require separate action.
4. Sort errors before warnings, then by rule code and stable target.
5. Set `canProceed` to `false` when one or more errors exist.
6. Set `canProceed` to `true` when no errors exist, retaining warnings in the report.
7. Never catch and silently discard a validation failure.

## Edge-Case Decision Table

| Condition | Rule outcome | Visible future behavior |
| --- | --- | --- |
| Conflicting project dates | CNT-004 error | No guessed date is published. |
| Empty required identity | CNT-006 error | Handoff is blocked. |
| Optional portrait unavailable | EVD-006 warning when modeled as evidence | Identity text remains; no broken image action. |
| Optional preview unavailable | EVD-003 warning | Caption and valid full action may remain. |
| Referenced evidence is private | EVD-004 and EVD-007 errors | Evidence is not shipped or rendered. |
| Informational visual has no table/list | VIS-003 error | Component is not review-ready. |
| Storage is unavailable | INT-002 prevents dependence | Foundation output remains deterministic. |
| Remote font fails | UI-006 applies | System fallback preserves content and layout usability. |
| Recovery completeness cannot be proven | REC-003 error | Replacement work is blocked. |
| Current production build fails | PER-003 error | Baseline comparison is blocked pending diagnosis. |

## Traceability

- REC rules support ST-021 and AR-001 through AR-005.
- CNT, EVD, and DRV rules support ST-013 and NFR-006/NFR-007.
- VIS and UI rules support ST-016, ST-017, NFR-001, FR-013, and FR-016.
- PER rules support ST-018, NFR-002, and FR-017.
- UI and boundary rules support ST-019, NFR-003, NFR-004, and NFR-008.
- Deterministic finding and integration rules support ST-020 and NFR-005.

## Extension Compliance

- **Security Baseline**: Skipped because it is disabled in the active workflow state.
- **Property-Based Testing**: Skipped because it is disabled in the active workflow state.
