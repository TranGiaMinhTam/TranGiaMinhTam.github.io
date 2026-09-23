# Logical Components - U-06 Tools and Fieldwork

## Component Model

U-06 separates verified tool/activity selection, closed Tool Linking Table classification, context-link/evidence-reservation adaptation, category/kind grouping, shared semantic projection, two domain view models, native React bodies, composed registry integration, and development-only acceptance evidence. Browser components cannot read `src/data/skills.ts`, `src/data/experience.ts`, raw asset directories, or the unreferenced legacy `awards.ts`/`gallery.ts`/`videos.ts`/`Awards.tsx` files.

## Dependency Flow

1. U-01 verified `tool`, `fieldwork`, and `leadership` records enter the Tool Selector and Activity Selector.
2. The closed Tool Linking Table constrains classification and linked-context resolution.
3. The Context-Link Adapter resolves a demonstrated tool's linked section id against the existing `sectionById` registry.
4. The Evidence Reservation Adapter checks `evidenceManifest.ts` for a matching id, currently resolving none.
5. The Category Grouper produces one accepted ordered category-group collection for tools.
6. The Activity Grouper produces one accepted ordered Fieldwork/Leadership collection.
7. The Tools and Fieldwork Assembler produces two immutable view models.
8. The Capability-Map and Activity Semantic projectors consume the same source collections as their visual counterparts.
9. Two React bodies enter the approved registry composer.
10. Development-only collectors feed the Candidate Guard and Evidence Reporter.

Text alternative: verified tool and activity records feed pure selectors constrained by a closed linking table. A context-link adapter resolves in-page anchors through the existing section registry, and an evidence-reservation adapter checks for (currently absent) manifest ids. One grouped tool collection and one grouped activity collection each supply a visual projection and an identical semantic projection. Accepted view models enter two React bodies and the composed registry. Build-time collectors separately feed a candidate guard and reporter and never enter browser code.

## Execution Boundaries

| Boundary | Browser bundle | Browser globals | Build/filesystem access | Can block acceptance |
| --- | --- | --- | --- | --- |
| Selectors, linking table, adapters, groupers, assembler | Yes | No | No | Through typed findings |
| React bodies and shared primitives | Yes | No | No | Through semantic/rendered evidence |
| Composed body registry | Yes | No | No | Through ownership validation |
| Existing shell resolver and controllers | Existing | Existing adapters | No | Through regression evidence |
| Build/test collectors and candidate guard | No | Optional test browser | Yes | Yes |
| Evidence reporter | No | No | Approved result files only | Yes |

## Pure Browser-Safe Components

### ToolSelector

- Selects exactly the sixteen verified `tool` records in stable category and source order.
- Validates identifiers, category, title, facts, provenance, and order.
- Rejects missing, duplicate, empty, or unsupported required records without inference.

### ToolLinkingTable

- Owns the closed sixteen-entry classification-and-link catalog approved in Functional Design.
- Supplies `demonstrated`/`interest` classification and, where demonstrated, a linked `SectionId` and label.
- Returns a blocking finding for any tool absent from the table; never defaults silently.

### ActivitySelector

- Selects exactly the four verified `fieldwork`/`leadership` records in stable source order.
- Validates identifiers, kind, title, organization, period, and description points.
- Rejects missing, duplicate, empty, or unsupported required records without inference.

### ContextLinkAdapter

- Converts a demonstrated tool's linked section id into a typed context-link capability by resolving it against the existing `sectionById` registry.
- Returns no capability, plus a non-blocking finding, if the target id no longer resolves.
- Performs no path concatenation or string inference.

### EvidenceReservationAdapter

- Checks whether a tool or activity record's id has a matching entry in `evidenceManifest.ts`.
- Returns the existing U-04/U-05 evidence capability shape only when a match resolves; today, no record produces one.
- Reserved for forward compatibility; introduces no new asset-loading behavior.

### CategoryGrouper

- Groups classified tools into the four verified categories (Academic, Research & Data, Laboratory, Languages & Interests) in source order.
- Computes counts from actual accepted membership.

### ActivityGrouper

- Groups accepted activity records into Fieldwork and Leadership, Fieldwork first, in source order.
- Computes counts from actual accepted membership.

### CapabilityMapProjector

- Produces ordered category-cluster row models with tool title, classification, and optional context-link capability.
- Cannot add or rewrite tool facts or classification.

### ActivityGroupProjector

- Produces ordered group-panel models with role/title, organization, period, and description points.
- Cannot add or rewrite activity facts.

### ToolClassificationSummaryProjector / ActivitySummaryProjector

- Produce adjacent semantic entries from the same category/activity collections used by their visual counterpart.
- Require exact equality with visual identifiers, labels, counts, and order.

### ToolsFieldworkAssembler

- Coordinates selection, linking-table classification, context-link/evidence adaptation, grouping, and projection for both domains.
- Returns accepted Methods and Tools and Fieldwork and Leadership view models or a rejected typed result.
- Preserves non-blocking context-link findings with otherwise valid content.

## React Shared Components

### ToolContextLink

- Renders a native in-page anchor with the tool name and linked context in its accessible name.
- Absent entirely for interest-classified tools or an unresolved context-link capability.
- Adds no programmatic fetch, external target, or custom button role.

### ClassificationMarker

- Renders `Demonstrated` or `Interest` as visible semantic text with a non-color marker.
- Cannot infer classification from category text.

### ActivityRecordCard

- Renders title, organization, period, and description points as visible text.
- Renders an evidence action only if the Evidence Reservation Adapter resolves one; renders none today.

### ToolClassificationSummary / ActivitySummary

- Render the complete semantic classification/group entries adjacent to their visual counterpart.
- Remain understandable with CSS or SVG unavailable.

## React Domain Bodies

### MethodsAndTools

- Composes four category clusters, classified tools, classification markers, and context links.
- Owns no mutable data or interaction state.
- Uses one continuous reading order at narrow widths.

### FieldworkAndLeadership

- Composes the Fieldwork group followed by the Leadership group, each with full record text.
- Accepted records remain visible without filtering, expansion, pagination, or carousel state.
- Uses one continuous per-record reading order at narrow widths.

## Integration Components

### U06SectionBodyRegistry

- Exports exactly two immutable factories for `tools` and `fieldwork-leadership`.
- Owns no shell controller or later-domain fallback.

### PortfolioBodyRegistryComposer

- Combines the approved seven-body registry with U-06 entries and rejects duplicates.
- Ten-slot tests require nine finished and one temporary body in approved order.

### Existing SectionBodyResolver

- Remains the only shell integration owner.
- Navigation, progress, focus, history, theme, observation, and fallback behavior remain unchanged.

## Build and Test Components

### U06BoundaryInspector

- Enforces exact source scope and import direction.
- Rejects direct `src/data/skills.ts`/`src/data/experience.ts` imports from components, unsafe URLs/HTML/SVG, runtime network APIs, other-domain presentation, and dependency changes.
- Confirms `src/data/awards.ts`, `src/data/gallery.ts`, `src/data/videos.ts`, and `src/components/Awards.tsx` remain unreferenced by U-06 source.

### U06BudgetEvaluator

- Traverses candidate and active Vite manifests.
- Enforces 285,000-byte JavaScript, 8-percent growth, and 46,080-byte CSS gates.
- Confirms zero evidence bytes are emitted or initially requested by U-06.

### ToolsFieldworkEquivalenceVerifier

- Compares canonical category/group membership, capability-map rows, activity-group rows, and semantic summaries.
- Validates uniqueness, stable order, repeated-run equality, and thirty-two-tool/eight-activity capacity.

### U06AccessibilityCollector

- Aggregates semantics, classification/group labeling, context-link names, keyboard/focus, contrast, reduced motion, text spacing, zoom, narrow reflow, and CSS/SVG degradation evidence.

### U06VisualReviewCollector

- Records 320, 768, 1280, and 1440 CSS-pixel states in both themes.
- Checks capability-map and activity-group uniqueness, long description wrapping, stacking, and overflow.

### U06CandidateGuard

- Accepts types, lint, tests, builds, recovery, boundaries, budgets, content integrity, equivalence, accessibility, responsiveness, uniqueness, and compatibility dispositions.
- Returns `eligible-for-review` only when all P0 inputs pass and never converts unavailable P1 evidence into a pass.

### U06RecoverySnapshot

- Captures exact pre-switch active-entry and registry content plus hashes.
- Supplies the only approved restoration content after post-activation P0 failure.

### U06EvidenceReporter

- Writes machine-readable measurements and concise Markdown summaries of scope, commands, versions, tests, budgets, review, decisions, limitations, and recovery.
- Never enters browser code or mutates source evidence.

## Failure Routing

| Failure | Owner | Result |
| --- | --- | --- |
| Missing, duplicate, empty, or unsupported tool/activity record | ToolSelector / ActivitySelector | Blocking finding; no accepted assembly |
| Tool absent from the Tool Linking Table | ToolLinkingTable | Blocking finding; no inferred classification |
| Linked context target no longer resolves | ContextLinkAdapter | Non-blocking finding; only that context link is omitted |
| A future manifest id fails to resolve for a tool/activity record | EvidenceReservationAdapter | No capability produced; no action rendered |
| Capability-map/activity-group vs. semantic mismatch | Equivalence verifier | Candidate blocked |
| Code, boundary, accessibility, or uniqueness P0 failure | Candidate Guard | Live registry remains unchanged |
| Browser/performance runner unavailable | Evidence collectors | Honest P1 limitation |
| Post-activation P0 failure | Recovery Snapshot | Exact registry restoration and recorded failure |

## Runtime Infrastructure Decision

Queues, caches, circuit breakers, workers, monitoring agents, remote logging, APIs, databases, content services, and retry subsystems are not applicable. U-06 deploys static browser modules only. Build/test collectors remain development-only.

## Traceability Matrix

| NFR | Primary patterns and components |
| --- | --- |
| U06-NFR-SCL-001 | P-02; selectors, groupers, assembler, equivalence verifier |
| U06-NFR-PER-001/002 | P-09, P-12; native bodies, CSS Module, Budget Evaluator |
| U06-NFR-PER-003 | P-03, P-04; evidence reservation adapter, Budget Evaluator |
| U06-NFR-PER-004 | P-04, P-08, P-09; state-free native composition and rendered evidence |
| U06-NFR-AVL-001 | P-01, P-03, P-04; assembler, context-link adapter |
| U06-NFR-SEC-001 | P-03, P-05; context-link/evidence adapters, Boundary Inspector |
| U06-NFR-REL-001/002/003 | P-01, P-02, P-05, P-06; linking table, selectors, groupers, projectors, verifier |
| U06-NFR-MNT-001/002 | P-07, P-09, P-10, P-12; registries, inspectors, guard |
| U06-NFR-USE-001/002 | P-06, P-07, P-08, P-11; semantic components and collectors |
| U06-NFR-CMP-001 | P-11; native baseline and available-browser evidence |
| U06-NFR-UNI-001 | P-07, P-10, P-12; domain bodies and visual collector |
| U06-NFR-EVD-001 | P-12; collectors, guard, snapshot, reporter |

## Extension Compliance

- Security Baseline is disabled and not loaded; the context-link/evidence adapters and boundary inspector enforce approved controls.
- Property-Based Testing is disabled and not loaded; fixed malformed tables, capacity fixtures, and repeated-run checks remain mandatory.
