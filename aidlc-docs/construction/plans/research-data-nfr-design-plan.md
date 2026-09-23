# NFR Design Plan - U-04 Research and Data

> **Status: Approved on 2026-09-16. No U-04 application source was generated during this stage.**

## Design Context

- **Approved NFRs**: U04-NFR-SCL-001 through U04-NFR-EVD-001
- **Approved stack**: React 19, strict TypeScript, native semantic HTML, passive SVG where informative, CSS Modules, Vite, Vitest, and Testing Library
- **Approved limits**: 250,000-byte initial JavaScript, 30,720-byte initial CSS, 12-percent JavaScript growth, lazy 1,251,556-byte figure set, and user-initiated 11,244,477-byte document set
- **Deployment**: Existing static GitHub Pages artifact; no runtime infrastructure
- **Body ownership**: Exactly `computational-projects`, `laboratory-research`, and `data-stories`

## Design Steps

- [x] Read the approved U-04 Functional Design, NFR Requirements, and Technology Stack Decisions.
- [x] Evaluate resilience, retry, scalability, performance, security, accessibility, logical-component, candidate, and infrastructure design choices.
- [x] Create twelve A/B/X questions with concrete recommended patterns.
- [x] Receive complete answers to Questions 1 through 12.
- [x] Resolve every ambiguity or add focused follow-up questions.
- [x] Generate `nfr-design-patterns.md`.
- [x] Generate `logical-components.md`.
- [x] Validate pattern-to-NFR coverage, component responsibilities, diagrams or text alternatives, tables, parsing compatibility, and whitespace.
- [x] Update plan checkboxes, state, README, and append-only audit.
- [x] Present the standardized U-04 NFR Design completion message and wait for explicit approval.

## Question 1 - Required and Optional Failure Partition

Which resilience pattern should separate required project content from optional evidence?

A) Use a typed fail-closed assembly result for required project/domain/endpoints and typed optional-evidence findings that preserve accepted project text
B) Catch all failures inside components and render whichever fields happen to exist
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It makes blocking and recoverable failures deterministic before rendering.

## Question 2 - Retry Strategy

How should deterministic data and asset failures be retried?

A) Use no application retry loop: deterministic selector failures remain stable, native browser evidence actions remain user initiated, and a failed figure exposes a local status that can recover only through a later browser reload
B) Automatically retry missing files and selectors with timers
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. Static local assets and immutable records do not benefit from hidden retry machinery.

## Question 3 - Linear Selector Architecture

Which scalability pattern should support six projects and 36 relationships?

A) Build closed project-kind maps and endpoint indexes once, then project immutable domain models, visible values, and semantic rows in linear passes
B) Let every component repeatedly filter the complete record, relationship, and evidence collections while rendering
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It provides deterministic O(projects plus endpoints plus relationships) behavior.

## Question 4 - Media Loading Component

How should figure and document loading be isolated?

A) Use a manifest-backed evidence adapter that returns typed figure or document capabilities; figures own lazy load/failure state and documents remain native unrequested anchors
B) Let each project component construct asset paths and loading behavior independently
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It centralizes publication and request classification without creating a runtime service.

## Question 5 - Budget Enforcement

Where should code and asset budgets be enforced?

A) Use preflight and candidate manifest snapshots, exact byte comparators, request-classification evidence, and a blocking candidate gate before live registration
B) Inspect production bundle size only after activation
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It prevents an over-budget candidate from touching the live body registry.

## Question 6 - Safe Destination Pattern

How should evidence and future-note destinations be validated?

A) Use closed typed destination unions: manifest-owned same-origin evidence or an approved local journal hash; reject every other scheme and keep the current future-note collection empty
B) Accept arbitrary strings and validate only when a visitor clicks
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It keeps unsafe and former-owner destinations outside the rendered tree.

## Question 7 - Shared Visual/Semantic Projection

How should relationship visuals and accessible alternatives stay equivalent?

A) Normalize relationships once and derive both domain-specific visual values and a shared semantic-row model, with exact identifier-set verification
B) Author visual connectors and semantic tables independently for each section
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It prevents accessible content from drifting from the visible scientific structures.

## Question 8 - Domain Component Boundaries

How should the three visual structures share implementation?

A) Share only typed primitives for evidence, statuses, and semantic summaries; keep computational pipeline, laboratory bench, and analytical signal sheet as separate domain components and geometry
B) Use one generic project component with a mode prop and theme color changes
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It preserves reuse of behavior without collapsing the required structural uniqueness.

## Question 9 - Local Interaction State

What state should research components own?

A) Allow only per-figure failure and optional transient relationship emphasis; keep all verified data, ordering, and publication status immutable in props
B) Copy project models into component state and add filter, carousel, and disclosure controllers
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It minimizes failure modes and keeps every core fact visible.

## Question 10 - Three-Body Shell Integration

How should U-04 enter the active experience?

A) Extend the immutable body registry by composing the approved U-03 registry with exactly three U-04 factories, preserving shell controllers and five temporary fallbacks
B) Hard-code research components into the shell and replace its registry resolver
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It keeps ownership explicit and makes candidate activation a small guarded seam.

## Question 11 - Candidate and Recovery Pattern

Which release pattern should U-04 use?

A) Build an isolated three-body candidate, verify all P0 gates and the eight-state review, obtain explicit approval, then perform a minimal live registry switch with exact pre-switch recovery content
B) activate each section as soon as its component compiles
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It matches the successful prior-unit migration and preserves a recoverable active experience.

## Question 12 - Infrastructure and Observability

Does U-04 require runtime infrastructure, queues, caches, circuit breakers, monitoring agents, or remote logging?

A) No; use build/test artifacts, manifest measurements, deterministic findings, browser review evidence, and existing static hosting as the complete observability boundary
B) add a backend monitoring service and remote asset cache
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. The feature is static, same-origin, deterministic, and introduces no runtime service failure domain.

## Recommendation Summary

Option A is recommended for all twelve questions. The combined design uses typed fail-closed assembly, explicit optional-evidence findings, no hidden retries, indexed linear derivation, a manifest-backed media adapter, pre-activation budget gates, closed destinations, shared relationship projection, separate visual geometries, minimal local state, composed body ownership, guarded activation, and build-time observability without infrastructure.

## Extension Compliance

- Security Baseline: disabled; full extension rules remain unloaded. The approved safe-destination and static-publication patterns remain mandatory.
- Property-Based Testing: disabled; full extension rules remain unloaded. Deterministic malformed tables, capacity fixtures, and repeated-run verification remain mandatory.
