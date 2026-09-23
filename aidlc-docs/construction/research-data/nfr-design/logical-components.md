# Logical Components - U-04 Research and Data

## Component Model

U-04 separates pure verified-data selection, endpoint indexing, evidence capability resolution, normalized relationships, domain-specific view models, native React bodies, composed registry integration, and build-time acceptance evidence. Browser components cannot read legacy data, files, build manifests, or journal content. Verification components cannot become application imports.

## Dependency Flow

1. U-01 verified project records enter the Research Project Selector.
2. Published evidence enters the Evidence Capability Adapter.
3. Closed domain allocation and contribution catalogs constrain the selector.
4. Endpoint indexes and the Relationship Builder produce one normalized collection.
5. The Research Data Assembler produces three immutable view models.
6. Domain projectors feed the Computational Pipeline, Laboratory Bench, and Analytical Signal Sheet.
7. The shared Semantic Relationship Projector feeds each adjacent relationship summary.
8. The U-04 registry composes with the approved U-03 registry and enters the existing resolver.
9. Boundary, budget, accessibility, visual, test, and recovery collectors feed the Candidate Guard and Evidence Reporter.

Text alternative: verified records, published evidence, and closed catalogs feed pure selectors and an evidence adapter. Indexed endpoints feed one relationship builder, which supplies both three domain-specific visual projectors and a shared semantic projector. Accepted view models enter three React bodies and an immutable composed registry. Separately, development-time evidence collectors feed a candidate guard and reporter; they never enter browser code.

## Execution Boundaries

| Boundary | Browser bundle | Browser globals | Build/filesystem access | Can block acceptance |
| --- | --- | --- | --- | --- |
| Selectors, catalogs, adapter, relationships, assembler | Yes | No | No | Through typed findings |
| React research bodies and shared primitives | Yes | Image error and optional focus state only | No | Through semantic/rendered evidence |
| Composed body registry | Yes | No | No | Through ownership validation |
| Existing shell resolver/controllers | Existing | Existing adapters | No | Through regression evidence |
| Build/test collectors and candidate guard | No | Optional test browser | Yes | Yes |
| Evidence reporter | No | No | Approved result files only | Yes |

## Pure Browser-Safe Components

## ResearchProjectSelector

- **Purpose**: select exactly one verified project for each U-04 domain in stable order.
- **Inputs**: U-01 verified content records and closed project allocation.
- **Outputs**: normalized required project inputs or ordered blocking findings.
- **Failure behavior**: rejects missing, duplicate, empty, or misallocated required projects.
- **Boundary**: no React, DOM, asset import, journal input, browser access, or inferred role.
- **NFRs**: SCL-001, REL-001, REL-003, MNT-001.

## ProjectAllocationCatalog

- **Purpose**: map the three approved project identifiers to computational, laboratory, and data-story ownership.
- **Inputs**: branded project identifier.
- **Outputs**: closed domain kind and contribution disclosure policy.
- **Failure behavior**: unknown project returns a blocking finding.
- **Invariant**: each approved project appears exactly once.
- **NFRs**: REL-001, MNT-002, UNI-001.

## ContributionDisclosureCatalog

- **Purpose**: provide `not-specified` for docking and cashew and verified `Team-led project` for SIM-LSE.
- **Boundary**: cannot derive contribution from method or tool lists.
- **NFRs**: REL-001, USE-001.

## EvidenceCapabilityAdapter

- **Purpose**: convert a published evidence record into an image or document capability.
- **Inputs**: evidence identifier and manifest index.
- **Outputs**: resolved capability, optional-missing finding, or invalid-reference finding.
- **Controls**: same-origin source, closed media kind, accessible text, loading classification, and no raw-source path.
- **NFRs**: PER-003/004, AVL-001, SEC-001.

## EndpointIndex

- **Purpose**: index projects, methods, tools, time bands, and resolved evidence by stable identifier.
- **Algorithm**: one pass per endpoint collection.
- **Failure behavior**: rejects duplicate identifiers before relationship projection.
- **NFRs**: SCL-001, REL-001/002.

## ResearchRelationshipBuilder

- **Purpose**: create ordered `uses-method`, `uses-tool`, `occurred-during`, and `supported-by` relationships.
- **Inputs**: normalized projects and endpoint indexes.
- **Outputs**: immutable unique relationships and stable findings.
- **Failure behavior**: broken endpoint or duplicate relationship is blocking.
- **NFRs**: SCL-001, REL-001/002, MNT-001.

## DomainVisualProjectors

- **Purpose**: transform canonical relationships into computational pipeline, laboratory bench, or analytical signal values.
- **Inputs**: one project and its ordered relationships.
- **Outputs**: presentation-only values with text markers and sequence.
- **Boundary**: visual position is not an experimental measurement; projectors cannot add facts.
- **NFRs**: PER-001/002, REL-002, UNI-001.

## SemanticRelationshipProjector

- **Purpose**: derive complete captioned rows from the normalized relationships.
- **Invariant**: visual and semantic relationship identifier sets and order match exactly.
- **NFRs**: REL-002, USE-001/002.

## ResearchDataAssembler

- **Purpose**: coordinate selection, capabilities, indexes, relationships, and projectors.
- **Outputs**: accepted immutable computational, laboratory, and data-story view models, or a rejected typed result.
- **Failure behavior**: required findings block all three accepted bodies; optional evidence findings remain attached to otherwise valid projects.
- **NFRs**: AVL-001, REL-001/002/003, MNT-001, EVD-001.

## DestinationCatalog

- **Purpose**: expose safe research-note discovery destinations to future U-07.
- **Current output**: frozen empty collection.
- **Controls**: future entries must be approved branded `#/journal/{slug}` values.
- **NFRs**: SEC-001, REL-003, MNT-002.

## React Shared Components

## ResearchEvidenceAction

- Renders one native same-origin evidence anchor from a document or image capability.
- Accessible name includes project context, evidence purpose, and type.
- Adds no programmatic fetch, embed, preload, arbitrary target, or custom button role.
- Is absent for optional-missing evidence.
- **NFRs**: PER-004/005, AVL-001, SEC-001, USE-001.

## ResearchFigure

- Renders an image capability with intrinsic/reserved geometry, accurate alternative text, lazy loading, and async decoding.
- Owns one local failure boolean.
- Failure renders local status text and does not affect project facts or other actions.
- **NFRs**: PER-003/005, AVL-001, USE-001/002.

## ContributionStatus

- Renders verified or not-specified contribution text as ordinary semantic content.
- Uses text and optional non-color marker; never a tooltip or inferred badge.
- **NFRs**: REL-001, USE-001.

## ResearchRelationshipSummary

- Renders the complete shared semantic rows as an ordered list or native table.
- Remains readable at 320 pixels and with CSS/SVG unavailable.
- **NFRs**: AVL-001, REL-002, USE-001/002, CMP-001.

## PublicationStatus

- Renders `Research notes are being prepared` as non-interactive status text.
- Contains no anchor, button, placeholder URL, or hidden former-owner destination.
- **NFRs**: SEC-001, REL-003, USE-001.

## React Domain Bodies

## ComputationalProjects

- Composes the exact docking question/context, not-specified contribution, method pipeline, tools, time band, evidence terminals, and semantic summary.
- May own one optional emphasized relationship identifier.
- Uses a vertical ordered pipeline at narrow widths.
- **NFRs**: PER-001/002/005, AVL-001, USE-001/002, UNI-001.

## LaboratoryResearch

- Composes specimen intent, not-specified contribution, ordered assay stations, prototype boundary, tools, time band, evidence strip, and semantic summary.
- Does not reuse computational pipeline geometry or imply results.
- **NFRs**: PER-001/002/005, AVL-001, USE-001/002, UNI-001.

## DataStories

- Composes SIM-LSE context, team-led disclosure, analytical stages, tools, 2026 context, evidence, semantic summary, and publication status.
- Has no current journal or external-writing action.
- Does not render invented dashboard charts or metrics.
- **NFRs**: PER-001/002/005, SEC-001, REL-003, USE-001/002, UNI-001.

## Integration Components

## U04SectionBodyRegistry

- Exports exactly three immutable factories for `computational-projects`, `laboratory-research`, and `data-stories`.
- Owns no shell controller or later-domain fallback.
- **NFRs**: MNT-002, UNI-001.

## PortfolioBodyRegistryComposer

- Combines approved U-03 and U-04 registries.
- Rejects duplicate keys and exposes an immutable partial registry.
- Ten-slot tests require five finished and five temporary bodies in approved order.
- **NFRs**: AVL-001, MNT-002, EVD-001.

## Existing SectionBodyResolver

- Remains the shell integration owner.
- Resolves composed bodies by registered section identifier and retains unchanged temporary fallback.
- Navigation, progress, theme, focus, history, and observation remain outside U-04.
- **NFRs**: MNT-002, CMP-001.

## Build and Test Components

## U04BoundaryInspector

- Enforces exact source scope and import direction.
- Rejects direct legacy-data, former-owner writing, raw evidence, unsafe URL/HTML/SVG, network client, rejected presentation, identity component, and later-domain imports.
- Confirms three U-04 keys, unchanged dependencies, and unchanged shell controllers.

## U04BudgetEvaluator

- Traverses candidate and active Vite manifests.
- Enforces 250,000-byte JavaScript, 12-percent growth, and 30,720-byte CSS gates.
- Records exact figure and document bytes and separates emitted assets from initial requests.

## ResearchEquivalenceVerifier

- Compares canonical, visual, and semantic relationship identifiers and order.
- Validates endpoints, uniqueness, repeated-run equality, and six-project/36-relationship capacity.

## FormerOwnerExclusionVerifier

- Fails if the existing local journal slug/content, WordPress URLs/titles, or former-owner biography phrases enter U-04 source, view models, rendered output, or candidate assets.

## U04AccessibilityCollector

- Aggregates semantic tests, equivalence, alternative text, image failure, evidence names, keyboard/focus, contrast, reduced motion, text spacing, zoom, narrow reflow, and stylesheet/SVG degradation.
- Distinguishes automated, calculated, rendered, and unavailable evidence.

## U04VisualReviewCollector

- Records 320, 768, 1280, and 1440 CSS-pixel states in both themes.
- Checks distinct pipeline, bench, and signal-sheet structures plus prohibited generic patterns.
- Records available browsers, local overflow, wrapping, performance observations, and P1 limitations.

## U04CandidateGuard

- Accepts tests, types, lint, build, recovery, boundaries, budgets, requests, content integrity, former-owner exclusion, accessibility, responsive, uniqueness, compatibility, and warning dispositions.
- Returns `eligible-for-review` only when every P0 input passes.
- Never converts unavailable P1 measurement into a pass.
- Requires separate explicit user candidate approval before activation.

## U04RecoverySnapshot

- Captures exact pre-switch active-entry/registry content and hashes.
- Supplies the only approved restoration content when post-activation P0 acceptance fails.
- Uses recoverable patch application rather than destructive Git commands.

## U04EvidenceReporter

- Writes machine-readable measurements and concise Markdown verification.
- Records exact commands, versions, timestamps, file scope, tests, budgets, assets, requests, review states, decisions, warnings, limitations, and recovery result.
- Never enters browser code or mutates source evidence.

## Failure Routing

| Failure | Owner | Result |
| --- | --- | --- |
| Missing, duplicate, empty, or misallocated required project | ResearchProjectSelector | Blocking finding; no accepted U-04 selection |
| Duplicate or broken endpoint | EndpointIndex or RelationshipBuilder | Blocking finding |
| Missing optional evidence | EvidenceCapabilityAdapter | Accepted project without that action |
| Figure request/decode failure | ResearchFigure | Local accessible status; text remains |
| Unsafe or former-owner destination | DestinationCatalog or boundary inspector | Excluded and reported |
| Visual/semantic mismatch | ResearchEquivalenceVerifier | Candidate blocked |
| Code, asset, accessibility, or uniqueness P0 failure | U04CandidateGuard | Live registry remains unchanged |
| Target browser/performance runner unavailable | Evidence collectors | Honest P1 limitation |
| Post-activation P0 failure | U04RecoverySnapshot | Exact registry restoration and recorded failure |

## Runtime Infrastructure Decision

Queues, caches, circuit breakers, workers, monitoring agents, remote logging, APIs, databases, remote media services, and retry subsystems are not applicable. U-04 deploys static browser modules and same-origin assets. Build/test collectors are development-only logical components.

## Traceability Matrix

| NFR | Primary patterns and components |
| --- | --- |
| U04-NFR-SCL-001 | P-02; EndpointIndex, ResearchRelationshipBuilder, ResearchEquivalenceVerifier |
| U04-NFR-PER-001, U04-NFR-PER-002 | P-09, P-12; native bodies, CSS Module, U04BudgetEvaluator |
| U04-NFR-PER-003, U04-NFR-PER-004 | P-03, P-04; EvidenceCapabilityAdapter, ResearchFigure, ResearchEvidenceAction |
| U04-NFR-PER-005 | P-04, P-08, P-09; reserved geometry and rendered evidence |
| U04-NFR-AVL-001 | P-01, P-03, P-04; assembler, adapter, figure |
| U04-NFR-SEC-001 | P-03, P-05; DestinationCatalog, BoundaryInspector |
| U04-NFR-REL-001, U04-NFR-REL-002 | P-01, P-02, P-06; selectors, relationships, equivalence verifier |
| U04-NFR-REL-003 | P-05; DestinationCatalog, FormerOwnerExclusionVerifier |
| U04-NFR-MNT-001, U04-NFR-MNT-002 | P-07, P-09, P-10, P-12; registries, inspectors, guard |
| U04-NFR-USE-001, U04-NFR-USE-002 | P-06, P-07, P-08, P-11; semantic components and collectors |
| U04-NFR-CMP-001 | P-11; native baseline and available-browser evidence |
| U04-NFR-UNI-001 | P-07, P-10, P-12; domain bodies and visual collector |
| U04-NFR-EVD-001 | P-12; all collectors, guard, snapshot, reporter |

## Extension Compliance

- Security Baseline: disabled and not loaded; the adapter, destination catalog, and boundary inspector enforce approved controls.
- Property-Based Testing: disabled and not loaded; fixed malformed tables, capacity fixtures, and repeated-run checks remain mandatory.
