# NFR Design Plan - U-05 Academic and Evidence

> **Status: NFR Design artifacts complete and awaiting explicit approval. No U-05 application source has been generated.**

## Design Context

- **Approved NFRs**: U05-NFR-SCL-001 through U05-NFR-EVD-001
- **Approved stack**: React 19, strict TypeScript, native semantic HTML, optional passive SVG, CSS Modules, Vite, Vitest, and Testing Library
- **Approved limits**: 274,000-byte initial JavaScript, 43,008-byte initial CSS, 10-percent JavaScript growth, 22,866,108 on-demand PDF bytes, and 1,251,556 lazy image bytes
- **Deployment**: Existing static GitHub Pages artifact; no runtime infrastructure
- **Body ownership**: Exactly `academic-trajectory` and `evidence-library`

## Design Steps

- [x] Read the approved U-05 Functional Design, NFR Requirements, and Technology Stack Decisions.
- [x] Evaluate resilience, retry, scalability, performance, security, accessibility, logical-component, candidate, recovery, and infrastructure design choices.
- [x] Create twelve A/B/X questions with concrete recommended patterns.
- [x] Receive complete answers to Questions 1 through 12.
- [x] Resolve every ambiguity or add focused clarification questions. All answers were explicit and consistent; no clarification was required.
- [x] Generate `nfr-design-patterns.md`.
- [x] Generate `logical-components.md`.
- [x] Validate pattern-to-NFR coverage, component responsibilities, tables, parsing compatibility, and whitespace.
- [x] Update plan checkboxes, state, README, and append-only audit.
- [x] Present the standardized U-05 NFR Design completion message and wait for explicit approval.

## Question 1 - Required and Optional Failure Partition

Which resilience pattern should separate required academic content from optional evidence?

A) Use a typed fail-closed result for required program, fact, status, duplicate, and endpoint failures plus typed optional-evidence findings that preserve accepted academic content
B) Catch all failures inside components and render whichever values happen to exist
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It makes blocking and locally recoverable failures deterministic before rendering.

## Question 2 - Retry Strategy

How should deterministic selector and static-asset failures be retried?

A) Use no application retry loop: selector findings remain stable, document actions remain user initiated, and failed images expose local status until a later browser reload
B) Automatically retry selectors, images, and documents with timers
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. Immutable local records and static files do not benefit from hidden retry machinery.

## Question 3 - Linear Assembly Architecture

Which scalability pattern should support four programs, twenty evidence items, and eighty relationships?

A) Build program, evidence, endpoint, and group indexes once, then project immutable strata, archive rows, spectrum entries, and semantic counts in linear passes
B) Let each component repeatedly filter all records and assets while rendering
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It provides deterministic linear growth and repeatable ordering.

## Question 4 - Evidence Capability Adapter

How should PDF and image capabilities be isolated?

A) Use a manifest-backed adapter that validates publication state and returns typed text-document or lazy-image capabilities; components never construct paths
B) Let every archive row infer media behavior and concatenate asset paths independently
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It centralizes publication, safety, and request classification without a runtime service.

## Question 5 - Budget Enforcement

Where should bundle, media, and request budgets be enforced?

A) Use preflight and isolated-candidate manifest snapshots, exact byte comparators, request classification, and a blocking gate before live registration
B) Inspect approximate production size only after activation
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. An over-budget or eagerly loading candidate should never alter the live registry.

## Question 6 - Safe Publication Pattern

How should eligible evidence destinations be validated?

A) Use a closed identifier allowlist resolved through published same-origin manifest records; reject every unsafe, private, raw, portrait, pending-CV, former-owner, and later-unit destination before view-model creation
B) Accept arbitrary strings and remove invalid links only after rendering
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It keeps disallowed content outside the rendered and build-reachable U-05 graph.

## Question 7 - Shared Archive and Semantic Projection

How should archive groups, evidence-spectrum marks, and semantic counts stay equivalent?

A) Normalize accepted evidence once and derive all three projections from the same ordered group collection, verifying exact identifiers, membership, order, and counts
B) Author archive rows, visual counts, and accessible counts independently
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It prevents accessible evidence summaries from drifting from visible archive content.

## Question 8 - Domain Component Boundaries

How should the two section structures share implementation?

A) Share typed evidence actions, preview capabilities, statuses, and semantic summaries while keeping curriculum cross-section and archival index as separate domain components and geometry
B) Use one generic card-list component with a mode prop and palette changes
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It reuses behavior without collapsing the required visual uniqueness.

## Question 9 - Local Interaction State

What state should U-05 components own?

A) Allow only per-image failure state; keep programs, status, ordering, group membership, counts, and publication metadata immutable in props
B) Copy view models into component state and add filters, accordions, pagination, and modal controllers
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It minimizes failure modes and keeps every core fact in the reading flow.

## Question 10 - Two-Body Shell Integration

How should U-05 enter the active experience?

A) Compose exactly two U-05 factories with the approved five-body registry, preserving shell controllers and the final three temporary fallbacks
B) hard-code academic and evidence components into the shell and replace its resolver
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It keeps ownership explicit and activation limited to a small guarded seam.

## Question 11 - Candidate and Recovery Pattern

Which release pattern should U-05 use?

A) Build an isolated seven-body candidate, pass every P0 gate and eight-state rendered review, obtain explicit approval, then make a minimal live registry switch backed by exact pre-switch recovery content
B) activate each new body as soon as it compiles
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It preserves the successful recoverable migration pattern used by earlier units.

## Question 12 - Infrastructure and Observability

Does U-05 require runtime infrastructure, queues, caches, circuit breakers, monitoring agents, remote logging, or document services?

A) No; use build/test artifacts, manifest measurements, deterministic findings, rendered review evidence, and existing static hosting as the complete observability boundary
B) add a backend PDF service, remote image cache, and monitoring agent
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. The unit is static, same-origin, deterministic, and introduces no runtime service failure domain.

## Recommendation Summary

Option A is recommended for all twelve questions. The combined design uses typed failure partitioning, no hidden retries, indexed linear assembly, manifest-backed media capabilities, pre-activation budget gates, a closed publication allowlist, shared archive/semantic projection, separate section geometries, minimal local state, composed ownership, recoverable activation, and build-time observability without infrastructure.

## Extension Compliance

- **Security Baseline**: Disabled; full extension rules remain unloaded. Approved publication and safe-destination patterns remain mandatory.
- **Property-Based Testing**: Disabled; full extension rules remain unloaded. Deterministic malformed tables, capacity fixtures, and repeated-run verification remain mandatory.
