# Logical Components - U-05 Academic and Evidence

## Component Model

U-05 separates verified academic selection, explicit fact mapping, evidence eligibility, endpoint indexing, grouping, normalized relationships, shared semantic projection, two domain view models, native React bodies, composed registry integration, and development-only acceptance evidence. Browser components cannot read legacy data, raw assets, build manifests, Identity media, pending CV placeholders, or former-owner content.

## Dependency Flow

1. U-01 verified academic records enter the Academic Program Selector.
2. Explicit status and fact catalogs constrain normalization.
3. Published evidence enters the Evidence Capability Adapter through the U-05 eligibility catalog.
4. Endpoint indexes and the Academic Evidence Relationship Builder connect transcript and scholarship evidence.
5. The Evidence Grouper produces one accepted ordered group collection.
6. The Academic Evidence Assembler produces two immutable view models.
7. The Archive, Spectrum, and Semantic Count projectors consume the same group collection.
8. Two React bodies enter the approved registry composer.
9. Development-only collectors feed the Candidate Guard and Evidence Reporter.

Text alternative: verified programs and explicit catalogs feed pure academic selectors, while the publication manifest and closed eligibility catalog feed a capability adapter. Indexed endpoints connect academic records to canonical evidence. One grouped evidence collection supplies archive rows, visual counts, and semantic counts. Accepted view models enter two React bodies and the composed registry. Build-time collectors separately feed a candidate guard and reporter and never enter browser code.

## Execution Boundaries

| Boundary | Browser bundle | Browser globals | Build/filesystem access | Can block acceptance |
| --- | --- | --- | --- | --- |
| Selectors, catalogs, adapter, indexes, relationships, assembler | Yes | No | No | Through typed findings |
| React bodies and shared primitives | Yes | Image error only | No | Through semantic/rendered evidence |
| Composed body registry | Yes | No | No | Through ownership validation |
| Existing shell resolver and controllers | Existing | Existing adapters | No | Through regression evidence |
| Build/test collectors and candidate guard | No | Optional test browser | Yes | Yes |
| Evidence reporter | No | No | Approved result files only | Yes |

## Pure Browser-Safe Components

### AcademicProgramSelector

- Selects exactly one current AS & A-Level and one completed IGCSE record in stable order.
- Validates identifiers, program, institution, period, specialization, details, provenance, status, and order.
- Rejects missing, duplicate, empty, or unsupported required records without inference.

### AcademicFactCatalog

- Maps reviewed source facts to completed result, language qualification, current study, subject focus, or academic development.
- Supplies fixed source order and explicit `in-progress` or `completed` status.
- Never parses arbitrary prose at runtime or predicts grades and outcomes.

### EvidenceEligibilityCatalog

- Owns the ten U-05 evidence identifiers, closed group assignments, and deterministic order.
- Excludes the Identity portrait, pending CV, raw/private files, former-owner writing, and later-unit evidence.
- Unknown identifiers return findings rather than implicit inclusion.

### EvidenceCapabilityAdapter

- Converts an eligible published manifest record into `text-document` or `lazy-image` capability.
- Enforces same-origin source, closed media kind, accessible text, provenance, and loading classification.
- Produces optional-missing or invalid-reference findings without browser or fetch logic.

### AcademicEvidenceEndpointIndex

- Indexes programs, recognition markers, evidence items, and groups by stable identifier in one pass.
- Rejects duplicate identifiers before relationship or count projection.

### AcademicEvidenceRelationshipBuilder

- Creates ordered `documented-in` and `recognized-by` relationships.
- Requires valid source and target endpoints.
- Reuses canonical transcript and scholarship records without asset duplication.

### EvidenceGrouper

- Groups accepted items into Academic Record, Scholarships, Research Outputs, and Project Visuals.
- Computes counts from actual accepted membership.
- Uses closed type/identifier rules rather than caption matching.

### ArchiveProjector

- Produces ordered row models with kind, title, caption, provenance, preview capability, action, and stable identifiers.
- Cannot add or rewrite evidence facts.

### EvidenceSpectrumProjector

- Produces compact visual entries from accepted groups.
- Carries group identifier, label, count, order, and non-color marker.

### SemanticCountProjector

- Produces adjacent semantic entries from the same groups.
- Requires exact equality with spectrum identifiers, labels, counts, and order.

### AcademicEvidenceAssembler

- Coordinates selection, fact mapping, evidence capabilities, indexes, relationships, grouping, and projection.
- Returns accepted Academic Trajectory and Evidence Library view models or a rejected typed result.
- Preserves non-blocking optional-evidence findings with otherwise valid content.

## React Shared Components

### AcademicEvidenceAction

- Renders a native same-origin anchor with purpose, evidence kind, PDF/image format, and new-context information.
- Adds no programmatic fetch, viewer, embed, preload, arbitrary target, or custom button role.

### TextDocumentPreview

- Renders kind, title, caption, provenance, format, and the native evidence action.
- Contains no iframe, object, embed, canvas, image synthesis, or viewer state.

### LazyEvidenceImage

- Renders intrinsic or reserved geometry, accurate alternative text, lazy loading, and async decoding.
- Owns one local failure boolean and keeps metadata plus action available after preview failure.

### AcademicStatus

- Renders `In progress` or `Completed` as visible semantic text with a non-color marker.
- Cannot infer status from period text.

### EvidenceCountSummary

- Renders the complete semantic group counts adjacent to the visual spectrum.
- Remains understandable with CSS or SVG unavailable.

## React Domain Bodies

### AcademicTrajectory

- Composes current and completed learning strata, institution anchors, periods, subject/result clusters, status, scholarship-offer recognition, transcript evidence, and semantic relationships.
- Owns no mutable data or interaction state.
- Uses one continuous reading order at narrow widths.

### EvidenceLibrary

- Composes optional category anchors, evidence spectrum, semantic counts, four archive groups, rows, text previews, lazy images, and actions.
- Accepted evidence remains visible without filtering, expansion, pagination, or carousel state.
- Uses stacked row metadata at narrow widths.

## Integration Components

### U05SectionBodyRegistry

- Exports exactly two immutable factories for `academic-trajectory` and `evidence-library`.
- Owns no shell controller or later-domain fallback.

### PortfolioBodyRegistryComposer

- Combines the approved five-body registry with U-05 entries and rejects duplicates.
- Ten-slot tests require seven finished and three temporary bodies in approved order.

### Existing SectionBodyResolver

- Remains the only shell integration owner.
- Navigation, progress, focus, history, theme, observation, and fallback behavior remain unchanged.

## Build and Test Components

### U05BoundaryInspector

- Enforces exact source scope and import direction.
- Rejects direct legacy data, raw assets, unsafe URLs/HTML/SVG, runtime network APIs, portrait, false CV, former-owner content, other-domain presentation, and dependency changes.

### U05BudgetEvaluator

- Traverses candidate and active Vite manifests.
- Enforces 274,000-byte JavaScript, 10-percent growth, and 43,008-byte CSS gates.
- Records seven PDF and three image bytes and separates emitted from initially requested assets.

### AcademicEvidenceEquivalenceVerifier

- Compares canonical group membership, archive rows, spectrum entries, semantic counts, and relationship endpoints.
- Validates uniqueness, stable order, repeated-run equality, and four-program/twenty-item/eighty-relationship capacity.

### PublicationExclusionVerifier

- Fails when portrait, pending-CV substitution, former-owner writing, raw/private evidence, unsafe destination, or later-unit-only content enters U-05 source, view models, rendered output, or candidate assets.

### U05AccessibilityCollector

- Aggregates semantics, status, alternatives, image failure, evidence names, keyboard/focus, contrast, reduced motion, text spacing, zoom, narrow reflow, and CSS/SVG degradation evidence.

### U05VisualReviewCollector

- Records 320, 768, 1280, and 1440 CSS-pixel states in both themes.
- Checks curriculum and archive uniqueness, long provenance, multi-line grades, wrapping, stacking, actions, and overflow.

### U05CandidateGuard

- Accepts types, lint, tests, builds, recovery, boundaries, budgets, requests, content integrity, exclusions, equivalence, accessibility, responsiveness, uniqueness, compatibility, and warning dispositions.
- Returns `eligible-for-review` only when all P0 inputs pass and never converts unavailable P1 evidence into a pass.

### U05RecoverySnapshot

- Captures exact pre-switch active-entry and registry content plus hashes.
- Supplies the only approved restoration content after post-activation P0 failure.

### U05EvidenceReporter

- Writes machine-readable measurements and concise Markdown summaries of scope, commands, versions, tests, budgets, assets, requests, review, decisions, limitations, and recovery.
- Never enters browser code or mutates source evidence.

## Failure Routing

| Failure | Owner | Result |
| --- | --- | --- |
| Missing, duplicate, empty, or unsupported academic program | AcademicProgramSelector | Blocking finding; no accepted trajectory |
| Unsupported or ambiguous academic fact | AcademicFactCatalog | Blocking finding; no inferred value |
| Missing optional transcript or scholarship evidence | EvidenceCapabilityAdapter | Accepted academics without that marker/action |
| Duplicate or unsafe evidence | Eligibility catalog or endpoint index | Excluded or blocking according to ambiguity |
| Image request or decode failure | LazyEvidenceImage | Local status; metadata and action remain |
| Archive/spectrum/semantic mismatch | Equivalence verifier | Candidate blocked |
| Code, asset, accessibility, or uniqueness P0 failure | Candidate Guard | Live registry remains unchanged |
| Browser/performance runner unavailable | Evidence collectors | Honest P1 limitation |
| Post-activation P0 failure | Recovery Snapshot | Exact registry restoration and recorded failure |

## Runtime Infrastructure Decision

Queues, caches, circuit breakers, workers, monitoring agents, remote logging, APIs, databases, PDF services, image processors, and retry subsystems are not applicable. U-05 deploys static browser modules and same-origin assets. Build/test collectors remain development-only.

## Traceability Matrix

| NFR | Primary patterns and components |
| --- | --- |
| U05-NFR-SCL-001 | P-02; indexes, grouper, relationship builder, equivalence verifier |
| U05-NFR-PER-001/002 | P-09, P-12; native bodies, CSS Module, Budget Evaluator |
| U05-NFR-PER-003/004 | P-03, P-04; capability adapter, document preview, lazy image, evidence action |
| U05-NFR-PER-005 | P-04, P-08, P-09; reserved geometry and rendered evidence |
| U05-NFR-AVL-001 | P-01, P-03, P-04; assembler, adapter, lazy image |
| U05-NFR-SEC-001 | P-03, P-05; eligibility catalog, Boundary Inspector |
| U05-NFR-REL-001/002 | P-01, P-02, P-06; selectors, groupers, projectors, verifier |
| U05-NFR-REL-003 | P-05; eligibility catalog and Exclusion Verifier |
| U05-NFR-MNT-001/002 | P-07, P-09, P-10, P-12; registries, inspectors, guard |
| U05-NFR-USE-001/002 | P-06, P-07, P-08, P-11; semantic components and collectors |
| U05-NFR-CMP-001 | P-11; native baseline and available-browser evidence |
| U05-NFR-UNI-001 | P-07, P-10, P-12; domain bodies and visual collector |
| U05-NFR-EVD-001 | P-12; collectors, guard, snapshot, reporter |

## Extension Compliance

- Security Baseline is disabled and not loaded; the adapter, eligibility catalog, and boundary inspector enforce approved controls.
- Property-Based Testing is disabled and not loaded; fixed malformed tables, capacity fixtures, and repeated-run checks remain mandatory.
