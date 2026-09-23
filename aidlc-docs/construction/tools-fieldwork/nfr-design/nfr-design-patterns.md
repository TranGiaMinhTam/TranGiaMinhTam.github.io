# NFR Design Patterns - U-06 Tools and Fieldwork

## Design Objective

U-06 must activate two unique, verified-grounded bodies without inventing a proficiency rating, silently defaulting an unmapped tool, misclassifying fieldwork as leadership or vice versa, rendering a fabricated evidence action, or exceeding cumulative budgets. Required tool/activity structure fails closed; an unmapped tool or broken context link remains a stable, non-destructive local finding.

## Pattern P-01 - Typed Required and Optional Failure Partition

- A pure assembler validates required tool and activity records, category/kind membership, and Tool Linking Table coverage.
- A missing, duplicate, or unmapped-tool condition returns a closed rejected result with stable ordered findings.
- A linked-context target that no longer resolves returns a non-blocking finding and omits only that context link.
- Identical input always produces identical acceptance and findings; deterministic failures are never retried.

Supports U06-NFR-AVL-001, U06-NFR-REL-001/002, U06-NFR-MNT-001, and U06-NFR-EVD-001.

## Pattern P-02 - Indexed Linear Tool and Activity Assembly

1. Index tool records, categories, activity records, and Tool Linking Table entries once.
2. Validate the closed classification and linking catalog against every tool.
3. Project classified tools into category groups in stable source order.
4. Project activity records into Fieldwork and Leadership groups in stable source order.
5. Derive semantic summaries from the same category/group collections.
6. Verify membership, order, and count equivalence.

The path remains linear for thirty-two tool records and eight activity records. Components never classify or rescan complete collections while rendering.

Supports U06-NFR-SCL-001, U06-NFR-REL-001/002/003, and U06-NFR-MNT-001.

## Pattern P-03 - Context-Link and Evidence-Reservation Adapter

- A pure adapter accepts only a demonstrated tool's linked section id and the existing `sectionById` registry.
- It returns a typed context-link capability containing the target section id and accessible label, or no capability if the target does not resolve.
- A separate reservation path accepts an optional evidence id and, only if `evidenceManifest.ts` resolves it, returns the existing U-04/U-05 `EvidenceAction` capability; no evidence capability is constructed today because no id resolves.
- Components cannot concatenate anchor strings, construct evidence URLs, or import asset directories.

Supports U06-NFR-PER-003, U06-NFR-AVL-001, U06-NFR-SEC-001, and U06-NFR-REL-001.

## Pattern P-04 - Native Zero-Asset Presentation

- No image, document, or media asset is requested, embedded, or preloaded by either body.
- Context links use native in-page anchors only; no external navigation, iframe, or programmatic request is added.
- If a future plan-approved manifest entry supplies an evidence id, the existing on-demand PDF or lazy-image behavior is reused without a new loading strategy.
- Emitted assets and initial requests remain measured and confirmed at zero for evidence bytes.

Supports U06-NFR-PER-003/004 and U06-NFR-AVL-001.

## Pattern P-05 - Closed Linking and Publication Allowlist

- A frozen Tool Linking Table contains all sixteen verified tools' classification and, where demonstrated, linked section id.
- Context-link destinations resolve only through the existing `sectionById` registry; unknown or removed ids produce a finding rather than a broken link.
- Any future evidence destination must resolve only through same-origin published manifest records, reusing the U-04/U-05 rule.
- Unsafe schemes, arbitrary remote URLs, and dynamic execution are rejected before view-model creation.

Supports U06-NFR-SEC-001, U06-NFR-REL-001, and U06-NFR-MNT-002.

## Pattern P-06 - Shared Category/Group and Semantic Projection

- One immutable ordered category-group collection owns tool classification and membership.
- One immutable ordered activity-group collection owns Fieldwork/Leadership membership.
- The capability-map projector creates visible category clusters from the first collection.
- The activity-group projector creates visible group panels from the second collection.
- Each semantic projector creates an adjacent summary list from the same source collection it visualizes.
- Exact group/category identifiers, labels, order, item membership, and counts are verified.
- Labels and markers communicate classification/group meaning independently of color or SVG.

Supports U06-NFR-REL-003 and U06-NFR-USE-001/002.

## Pattern P-07 - Behavior Reuse, Geometry Separation

- Shared primitives own classification markers, context links, and semantic summaries.
- Methods and Tools alone owns category clustering and capability-map geometry.
- Fieldwork and Leadership alone owns kind-based grouping and activity-record geometry.
- No generic card-list component or visual-mode prop produces both section structures.

Supports U06-NFR-MNT-002, U06-NFR-USE-002, and U06-NFR-UNI-001.

## Pattern P-08 - No Local Interaction State

- Immutable tools, classification, category membership, activity records, groups, and counts remain props.
- No component owns a failure boolean, filter, accordion, carousel, pagination, modal-only metadata, reducer, provider, global store, or persistence, because no asset load exists to fail.
- Native context links and category/group anchors require no React state.

Supports U06-NFR-PER-004, U06-NFR-AVL-001, and U06-NFR-USE-001.

## Pattern P-09 - Headroom-Preserving Native Composition

- Strict TypeScript, native React, semantic HTML, CSS Grid/Flexbox, and bounded passive SVG replace new runtime packages.
- One U-06 CSS Module uses existing semantic tokens and one DOM per section.
- Candidate manifest evaluation enforces 285,000-byte JavaScript, 8-percent growth, and 46,080-byte CSS limits.
- State-free navigation and native links support LCP, CLS, and interaction targets without media-driven layout shift.

Supports U06-NFR-PER-001/002/004 and U06-NFR-MNT-001.

## Pattern P-10 - Immutable Composed Body Registry

- U-06 exports exactly `tools` and `fieldwork-leadership` factories.
- The existing duplicate-rejecting composer combines them with the approved seven-body registry.
- A ten-slot test requires nine finished bodies and one unchanged temporary Contact/Journal fallback.
- Shell navigation, progress, focus, history, theme, and observation remain unchanged.

Supports U06-NFR-AVL-001, U06-NFR-MNT-002, and U06-NFR-EVD-001.

## Pattern P-11 - Layered Accessibility and Responsive Evidence

1. Pure tests establish exact tool classification, linked context, activity grouping, and Tool Linking Table coverage.
2. Semantic tests verify headings, lists, links, statuses, and names.
3. Calculated evidence checks text, focus, control, and meaningful-graphic contrast.
4. Failure tests cover unmapped tools and a broken context-link target.
5. Keyboard, focus, reduced motion, target, zoom, and text-spacing review covers interaction.
6. The 320, 768, 1280, and 1440 CSS-pixel light/dark matrix covers stacking, wrapping, clipping, and overflow.

Supports U06-NFR-AVL-001, U06-NFR-REL-003, U06-NFR-USE-001/002, and U06-NFR-CMP-001.

## Pattern P-12 - Guarded Candidate, Recovery, and Evidence

### Candidate phase

- Capture active-entry, registry, dependency, and recovery baselines.
- Build an isolated nine-body candidate in a temporary output directory.
- Run types, lint, focused/full tests, boundary checks, recovery verification, capacity, failure, equivalence, ownership, and budget checks.
- Any P0 failure leaves the live registry unchanged.

### Rendered review and activation

- Review eight width/theme states, keyboard and focus, reduced motion, text spacing, zoom, long description wrapping, overflow, semantic summaries, and structural uniqueness.
- Record browser performance when available and classify unavailable P1 evidence honestly.
- Require explicit candidate approval, capture exact pre-switch registration, and change only the registry composition seam.
- Restore the recorded registration through a recoverable patch if post-activation P0 acceptance fails.

Supports every U-06 NFR, especially U06-NFR-MNT-001/002, U06-NFR-UNI-001, and U06-NFR-EVD-001.

## Static Observability and Infrastructure Decision

Runtime queues, caches, circuit breakers, workers, monitoring agents, remote logging, APIs, databases, content processors, remote services, and retry subsystems are not applicable. Observability consists of typed findings, automated results, boundary reports, manifest measurements, rendered-review evidence, user decisions, and recovery hashes. Development-only collectors never enter the browser bundle.

## Pattern Traceability

| NFR family | Primary patterns |
| --- | --- |
| U06-NFR-SCL | P-02 |
| U06-NFR-PER | P-03, P-04, P-08, P-09, P-12 |
| U06-NFR-AVL | P-01, P-03, P-04, P-08 |
| U06-NFR-SEC | P-03, P-05 |
| U06-NFR-REL | P-01, P-02, P-05, P-06 |
| U06-NFR-MNT | P-02, P-07, P-09, P-10, P-12 |
| U06-NFR-USE/CMP | P-06, P-07, P-08, P-11 |
| U06-NFR-UNI | P-07, P-10, P-12 |
| U06-NFR-EVD | P-12 |

## Extension Compliance

- Security Baseline is disabled and not loaded; P-03 and P-05 implement approved product-specific controls.
- Property-Based Testing is disabled and not loaded; P-02 uses deterministic capacity and repeat-run fixtures.
