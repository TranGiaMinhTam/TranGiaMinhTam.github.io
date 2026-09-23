# U-04 Business Rules - Complete Archive Discovery

## Catalog and Eligibility Rules

- **U04-BR01**: The generated manifest is the complete internal inventory; React components cannot enumerate the filesystem or infer assets at runtime.
- **U04-BR02**: Every non-system file under `src/assets/minh-tam/source/` must retain one physical membership in the canonical catalog, including exact duplicates consolidated under a shared canonical item.
- **U04-BR03**: `.DS_Store` and other system metadata are never visitor content.
- **U04-BR04**: Public selection uses explicit reviewed eligibility. The two academic transcript records remain inventoried but unpublished.
- **U04-BR05**: Every eligible certificate and picture must be reachable through exactly one primary narrative, gallery, document collection, or safe original action.
- **U04-BR06**: An item already placed in the portfolio narrative is not duplicated as a second primary archive card; the explorer may reference its placement.
- **U04-BR07**: Missing metadata, unsafe paths, invalid hashes, broken derivative ownership, duplicate IDs, unresolved physical membership, and missing dispositions are blocking findings.
- **U04-BR08**: Technical source paths, hashes, authority categories, and resume/evidence distinctions remain internal and never appear in visitor copy.

## Grouping and Ordering Rules

- **U04-BR09**: Visitor groups use natural activity labels and reviewed subcollections rather than raw folder names or numbered `Archive record` labels.
- **U04-BR10**: Group order is explicit. Item order is curated order followed by stable canonical ID as the tie-breaker.
- **U04-BR11**: Displayed counts are derived from eligible canonical membership and cannot be manually duplicated in components.
- **U04-BR12**: Empty public groups are omitted from the default summary grid; an explicit empty state remains testable for loader and integrity scenarios.
- **U04-BR13**: The academic-records group stays absent while its only members are excluded transcripts.
- **U04-BR14**: The technical `complete-archive` label does not imply a downloadable archive. A literal archive action requires a real admitted file capability.
- **U04-BR15**: The five curated 2026 Protein Docking images remain available as Featured Project Visuals and connected to the computational project without duplicate primary cards.

## Lazy Loading and Interaction Rules

- **U04-BR16**: The initial Evidence Library module contains group summaries only; it does not import group records, thumbnails, PDFs, or originals.
- **U04-BR17**: Group activation occurs through a real keyboard-operable button and dynamically imports only the selected approved group module.
- **U04-BR18**: Exactly one group body is expanded at a time. Successfully loaded immutable data may be retained in a page-session cache.
- **U04-BR19**: Every summary button exposes expanded and controlled-region state. Focus order follows document order and never depends on pointer input.
- **U04-BR20**: Images use generated, dimensioned thumbnails with native lazy loading. Original images and documents are requested only after explicit action.
- **U04-BR21**: U-04 exposes typed viewer triggers but implements no modal, focus trap, next/previous viewer navigation, or full PDF viewer; those belong to U-05.
- **U04-BR22**: Unknown group IDs fail closed before dynamic import or media resolution.
- **U04-BR23**: Recoverable group-load failures provide Retry and preserve all other summary controls.
- **U04-BR24**: Item failures preserve natural metadata and safe direct actions without paths, stacks, framework details, or invented preview claims.

## Contact Correction Rules

- **U04-BR25**: Contact language addresses general personal-portfolio enquiries, projects, collaboration, opportunities, and questions rather than research mentorship alone.
- **U04-BR26**: The primary action label is `Open email draft`; it accurately describes the local handoff and does not imply message delivery.
- **U04-BR27**: The action note and button share a balanced row on wide layouts and stack with a full-width button on narrow layouts.
- **U04-BR28**: The contact form remains local-only. It introduces no submission endpoint, tracking, persistence, or delivery confirmation.
- **U04-BR29**: Current recipient selection, field limits, input validation, encoded `mailto:` construction, and focus-to-first-error behavior remain unchanged.

## Performance and Review Rules

- **U04-BR30**: The current approved initial JavaScript, CSS, and request ceilings remain blocking. Any increase requires explicit approval before activation.
- **U04-BR31**: No archive original may appear in the initial request set. Measurements record initial load and representative first/repeat group activations.
- **U04-BR32**: Media dimensions or aspect ratios are declared before loading to constrain layout shift.
- **U04-BR33**: Activation requires an isolated candidate review across supported widths, both themes, keyboard use, zoom/text spacing, loading/error states, request tracing, and representative screenshots.
- **U04-BR34**: Source files are read-only. Generated derivatives never overwrite originals, and recovery evidence precedes implementation changes.

## Security Baseline Compliance

| Rule | Status | Rationale |
| --- | --- | --- |
| SECURITY-01, 02, 03, 05, 06, 07, 08, 12, 14 | N/A | U-04 introduces no persistence store, intermediary, server/API, IAM/network/authentication, credential flow, or monitoring service. |
| SECURITY-04 | N/A for U-04 | HTTP response-header delivery remains owned by U-06. |
| SECURITY-09 | Compliant by design | Visitor failures are generic; originals are not eagerly exposed; no internal path or stack appears. |
| SECURITY-10 | Compliant boundary | U-04 selects no new package. Lockfile, vulnerability scan, unused-dependency review, SBOM, and CI integrity remain enforced by U-06. |
| SECURITY-11 | Compliant by design | Catalog validation, source admission, lazy loading, and presentation are separate; unknown-ID and loader-abuse cases fail closed. |
| SECURITY-13 | Compliant by design | Catalog hashes and stable identifiers preserve integrity; runtime code consumes validated generated data only. |
| SECURITY-15 | Compliant by design | Unknown, invalid, missing, and failed media states retain safe navigation and reveal no implementation details. |

No blocking Security Baseline finding remains in Functional Design.

## Property-Based Testing Compliance

| Rule | Status | Functional Design treatment |
| --- | --- | --- |
| PBT-01 | Compliant | U04-P01 through U04-P09 identify invariants, determinism, idempotence, oracle comparison, and easy verification. |
| PBT-02 | N/A | U-04 defines no encode/decode or serialize/parse inverse pair in its public-selection layer. |
| PBT-03 | Compliant by design | Membership, counts, references, safe rejection, input immutability, and source coverage are explicit invariants. |
| PBT-04 | Compliant by design | Public catalog projection idempotence is U04-P04. |
| PBT-05 | Compliant by design | Group selection is compared with a simple filter-and-sort oracle in U04-P05. |
| PBT-06 | N/A | Catalog data is immutable and UI expansion does not form a business state machine requiring command-model testing. |
| PBT-07 | Compliant by design | Code Generation must extend the shared generators with constrained archive groups, eligibility, derivatives, and edge sizes. |
| PBT-08 | Compliant by design | Shrinking stays enabled and fixed or logged seeds make failures replayable. |
| PBT-09 | Compliant | Existing `fast-check` and Vitest integration is retained. |
| PBT-10 | Compliant by design | Critical source coverage, exclusion, Contact, interaction, and failure scenarios also receive example tests. |

No blocking PBT finding remains in Functional Design.
