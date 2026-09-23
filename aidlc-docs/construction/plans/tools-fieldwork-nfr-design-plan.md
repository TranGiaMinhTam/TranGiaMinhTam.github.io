# NFR Design Plan - U-06 Tools and Fieldwork

> **Status: NFR Design artifacts complete and awaiting explicit approval. No U-06 application source has been generated.**

## Design Context

- **Approved NFRs**: U06-NFR-SCL-001 through U06-NFR-EVD-001
- **Approved stack**: React 19, strict TypeScript, native semantic HTML, optional passive SVG, CSS Modules, Vite, Vitest, and Testing Library
- **Approved limits**: 285,000-byte initial JavaScript, 46,080-byte initial CSS, 8-percent JavaScript growth, zero evidence bytes
- **Deployment**: Existing static GitHub Pages artifact; no runtime infrastructure
- **Body ownership**: Exactly `tools` and `fieldwork-leadership`

## Design Steps

- [x] Read the approved U-06 Functional Design, NFR Requirements, and Technology Stack Decisions.
- [x] Evaluate resilience, retry, scalability, performance, security, accessibility, logical-component, candidate, recovery, and infrastructure design choices.
- [x] Create twelve A/B/X questions with concrete recommended patterns.
- [x] Receive complete answers to Questions 1 through 12.
- [x] Resolve every ambiguity or add focused clarification questions. All answers were explicit and consistent; no clarification was required.
- [x] Generate `nfr-design-patterns.md`.
- [x] Generate `logical-components.md`.
- [x] Validate pattern-to-NFR coverage, component responsibilities, tables, parsing compatibility, and whitespace.
- [x] Update plan checkboxes, state, README, and append-only audit.
- [x] Present the standardized U-06 NFR Design completion message and wait for explicit approval.

## Question 1 - Required and Optional Failure Partition

Which resilience pattern should separate required tool/activity content from an unmapped-tool or broken-link condition?

A) Use a typed fail-closed result for missing/duplicate tool or activity records, unmapped-tool findings, and required-fact failures, plus a typed local finding for a broken context-link target that preserves accepted content
B) Catch all failures inside components and render whichever values happen to exist
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It makes blocking and locally recoverable failures deterministic before rendering.

## Question 2 - Retry Strategy

How should deterministic selector and context-link failures be retried?

A) Use no application retry loop: findings remain stable and a broken context link remains a local omission until a later approved data or design change
B) Automatically retry selectors and link resolution with timers
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. Immutable local records and a closed lookup table do not benefit from hidden retry machinery.

## Question 3 - Linear Assembly Architecture

Which scalability pattern should support thirty-two tool records and eight activity records?

A) Build tool, category, activity, and linking-table indexes once, then project immutable classified tools, category groups, activity groups, and semantic summaries in linear passes
B) Let each component repeatedly filter all records while rendering
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It provides deterministic linear growth and repeatable ordering.

## Question 4 - Context Link and Evidence Reservation Adapter

How should tool context links and any future evidence action be isolated?

A) Use a lookup adapter that resolves a demonstrated tool's linked section id against the existing `sectionById` registry and returns a typed context-link capability; reserve the existing `EvidenceAction` component, invoked only if a future manifest id resolves, with no new construction path
B) Let every tool component infer its own anchor string and evidence URL independently
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It centralizes link-target validation and evidence reservation without a runtime service.

## Question 5 - Budget Enforcement

Where should bundle and request budgets be enforced?

A) Use preflight and isolated-candidate manifest snapshots, exact byte comparators, zero-evidence-request classification, and a blocking gate before live registration
B) Inspect approximate production size only after activation
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. An over-budget or unexpectedly asset-loading candidate should never alter the live registry.

## Question 6 - Safe Context-Link and Publication Pattern

How should context-link destinations and any future evidence destination be validated?

A) Use a closed allowlist: context links resolve only to ids present in `sectionById`; any future evidence action resolves only through published same-origin manifest records, reusing the U-04/U-05 rule; reject every unsafe, remote, or dynamic destination before view-model creation
B) Accept arbitrary strings and remove invalid links only after rendering
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It keeps disallowed destinations outside the rendered and build-reachable U-06 graph.

## Question 7 - Shared Category/Group and Semantic Projection

How should category/classification visuals, activity-group visuals, and their semantic summaries stay equivalent?

A) Normalize accepted tools and activity records once and derive all visual and semantic projections from the same ordered collections, verifying exact identifiers, membership, order, and counts
B) Author visual groupings and accessible summaries independently
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It prevents accessible summaries from drifting from visible content.

## Question 8 - Domain Component Boundaries

How should Methods and Tools and Fieldwork and Leadership share implementation?

A) Share typed classification, context-link, and semantic-summary primitives while keeping the capability-map and activity-group structures as separate domain components and geometry
B) Use one generic card-list component with a mode prop and palette changes
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It reuses behavior without collapsing the required visual uniqueness.

## Question 9 - Local Interaction State

What state should U-06 components own?

A) Own no local interaction state beyond React defaults; keep tools, classification, category membership, activity groups, and counts immutable in props
B) Copy view models into component state and add filters, accordions, pagination, and modal controllers
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It minimizes failure modes and keeps every core fact in the reading flow, consistent with U-04/U-05 having only local image-failure state (which U-06 does not need today).

## Question 10 - Two-Body Shell Integration

How should U-06 enter the active experience?

A) Compose exactly two U-06 factories with the approved seven-body registry, preserving shell controllers and the final temporary Contact/Journal fallback
B) Hard-code tools and activity components into the shell and replace its resolver
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It keeps ownership explicit and activation limited to a small guarded seam.

## Question 11 - Candidate and Recovery Pattern

Which release pattern should U-06 use?

A) Build an isolated nine-body candidate, pass every P0 gate and eight-state rendered review, obtain explicit approval, then make a minimal live registry switch backed by exact pre-switch recovery content
B) Activate each new body as soon as it compiles
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It preserves the successful recoverable migration pattern used by every earlier unit.

## Question 12 - Infrastructure and Observability

Does U-06 require runtime infrastructure, queues, caches, circuit breakers, monitoring agents, remote logging, or content services?

A) No; use build/test artifacts, manifest measurements, deterministic findings, rendered review evidence, and existing static hosting as the complete observability boundary
B) Add a backend lookup service, remote content cache, and monitoring agent
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. The unit is static, same-origin, deterministic, and introduces no runtime service failure domain.

## Recommendation Summary

Option A is recommended for all twelve questions. The combined design uses typed failure partitioning, no hidden retries, indexed linear assembly, a context-link/evidence-reservation adapter, pre-activation budget gates, a closed link/publication allowlist, shared category/group/semantic projection, separate section geometries, no local interaction state, composed ownership, recoverable activation, and build-time observability without infrastructure.

## Extension Compliance

- **Security Baseline**: Disabled; full extension rules remain unloaded. Approved link-safety and publication patterns remain mandatory.
- **Property-Based Testing**: Disabled; full extension rules remain unloaded. Deterministic malformed tables, capacity fixtures, and repeated-run verification remain mandatory.
