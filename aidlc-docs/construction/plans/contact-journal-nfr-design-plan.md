# NFR Design Plan - U-07 Contact and Journal

> **Status: NFR Design approved on 2026-09-18. No U-07 application source was generated during this stage.**

## Design Context

- **Approved NFRs**: U07-NFR-PER-001 through U07-NFR-MAI-002
- **Approved stack**: strict TypeScript, React 19, controlled local form state, pure validators, native mailto/hash behavior, `React.lazy`, `Suspense`, CSS Modules, Vite, Vitest, and Testing Library
- **Approved limits**: 296,000-byte initial JavaScript, 51,200-byte initial CSS, 6-percent initial JavaScript growth, 18,432-byte lazy Journal JavaScript, 6,144-byte lazy Journal CSS, and zero U-07 evidence bytes
- **Deployment**: existing static GitHub Pages artifact with no server rewrite or runtime infrastructure
- **Ownership**: exactly one Contact body plus a separate lazy Journal route presentation

## Design Steps

- [x] Read the approved U-07 Functional Design, NFR Requirements, and Technology Stack Decisions.
- [x] Evaluate resilience, retry, scalability, performance, privacy/security, accessibility, logical-component, lazy-loading, candidate, recovery, cleanup, and infrastructure patterns.
- [x] Create twelve A/B/X questions with concrete recommended patterns.
- [x] Receive complete answers to Questions 1 through 12.
- [x] Resolve every ambiguity or add focused clarification questions. Every answer was A and consistent; no clarification was required.
- [x] Generate `nfr-design-patterns.md`.
- [x] Generate `logical-components.md`.
- [x] Validate pattern-to-NFR coverage, component responsibilities, tables, parsing compatibility, and whitespace.
- [x] Update plan checkboxes, state, README, and append-only audit.
- [x] Present the standardized U-07 NFR Design completion message and wait for explicit approval.

## Question 1 - Required and Local Failure Partition

Which resilience pattern should separate Contact, note, evidence, route, and handoff failures?

A) Use typed fail-closed selection for invalid required contact or note source, typed field findings for editable draft errors, typed local omission for optional evidence, explicit article/not-found/loading/failure route states, and an honest external-handoff limitation that never becomes a false success
B) Catch every condition in the top-level component and render whichever values remain
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. Each failure stays inside the smallest safe capability while required source-integrity failures remain blocking.

## Question 2 - Retry Strategy

How should deterministic source, validation, route, and lazy-load failures be retried?

A) Use no timer or automatic retry for immutable source, validation, or route findings; expose one user-initiated retry only for a lazy chunk failure, while always preserving the Data Stories return
B) Retry every failure automatically with timers and exponential backoff
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. Only a transient chunk load can plausibly benefit from a retry; deterministic local failures cannot.

## Question 3 - Neutral Descriptor and Linear Assembly

Where should the canonical note identity and growth indexes live?

A) Use an immutable neutral `researchNoteCatalog` under the shared portfolio model boundary; build descriptor, project, evidence, and slug indexes once; let Data Stories and Journal consume typed projections without cross-importing visual components
B) Duplicate the slug and title inside both Data Stories and Journal components and scan all project data while rendering
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It provides one source for discovery and routing while preserving domain presentation ownership.

## Question 4 - Contact Validation and Mailto Pipeline

Which security pattern should implement the local composer?

A) Use a staged pure pipeline—normalize, validate, create a branded valid draft, then encode through a recipient-locked mailto builder—and inject a narrow handoff adapter into the component so tests never mutate real browser location
B) Build the mailto string directly from component state during rendering and assign it without validation
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It makes invalid states unrepresentable at the encoding boundary and keeps external handoff independently testable.

## Question 5 - Hash Route Orchestration

How should the continuous portfolio and Journal route be selected?

A) Add a small top-level route hook using the existing hash resolver and browser adapter; return continuous, article, or not-found intent; keep malformed-hash normalization in the existing shell contract and introduce no second router
B) Add a third-party router and duplicate all section routes as path routes
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It extends the established hash architecture with the smallest explicit state boundary.

## Question 6 - Lazy Route Resilience

Which pattern should load and recover the Journal presentation?

A) Place `React.lazy` behind journal intent, wrap it in a route-local `Suspense` fallback and error boundary, expose one manual retry keyed by a bounded attempt token, and keep the Data Stories return outside the failed lazy subtree
B) Dynamically import during every render with no fallback or error boundary
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It guarantees useful loading and failure output while preventing unbounded retry loops.

## Question 7 - Shared Projection Equivalence

How should Data Stories discovery and Journal route resolution remain equivalent?

A) Derive both from the same accepted descriptor collection and verify exact slug, href, title, project id, source type, membership, and order across discovery and route indexes
B) Author discovery buttons and Journal routes independently and compare them only during visual review
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It turns the canonical-link promise into a deterministic invariant.

## Question 8 - Manifest and Budget Enforcement

How should initial and lazy budgets be measured and gated?

A) Build an isolated ten-body plus Journal candidate, traverse the Vite manifest from the entry, classify initial versus dynamic imports and their CSS, assert the Journal chunk is absent from initial requests, enforce all four byte ceilings and zero evidence growth, and block activation on any P0 finding
B) Compare only the total `dist` directory size after activation
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It measures the actual request topology required by the approved split.

## Question 9 - Component and State Boundaries

How should Contact and Journal share implementation?

A) Keep separate `contact/` and `journal/` domain folders; share only neutral descriptors, existing evidence actions, token foundations, and browser adapter contracts; Contact owns raw form state and findings, while Journal owns route focus and retry state
B) Use one generic page component with contact, note, and failure mode switches
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It shares infrastructure contracts without collapsing the distinct approved visual and behavioral designs.

## Question 10 - Cleanup Inventory and Recovery

Which pattern should govern final legacy cleanup?

A) Generate a machine-readable candidate inventory with exact paths, SHA-256 hashes, sizes, incoming references, duplicate/alias disposition, unique-content disposition, and recovery payload; permit only explicitly approved zero-reference targets and verify restoration before deletion
B) Delete files by name pattern after the new pages compile
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It turns cleanup into an auditable, reversible operation rather than a broad destructive action.

## Question 11 - Layered Verification and Activation

Which release pattern should U-07 use?

A) Gate pure models, contact behavior, route states, lazy failure, descriptor equivalence, capacity, security scans, chunk topology, budgets, full regression, and rendered states in an inactive candidate; obtain explicit approval; then activate the Contact registry and top-level route seam together with exact pre-switch recovery content
B) Activate Contact first and add Journal routing directly to live code later without a combined candidate
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. Contact discovery and Journal detail form one user journey and should be reviewed and recoverable as one unit.

## Question 12 - Infrastructure and Observability

Does U-07 require queues, caches, circuit breakers, databases, email services, monitoring agents, remote logging, analytics, or deployment changes?

A) No; use typed local findings, focused tests, static security scans, candidate screenshots or observations, manifest measurements, cleanup inventory, recovery artifacts, and existing static hosting as the complete observability boundary
B) Add a contact backend, email delivery provider, remote journal store, cache, and monitoring service
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. The unit is static and local; runtime infrastructure would violate both scope and privacy.

## Recommendation Summary

Option A is recommended for all twelve questions. The combined design uses typed failure partitioning, a single manual retry only for transient lazy-load failure, neutral indexed note catalogs, a branded validation-to-mailto pipeline, the existing hash adapter, a route-local lazy boundary, shared discovery/route projection, manifest-aware budget enforcement, separate Contact and Journal ownership, machine-readable recoverable cleanup, combined candidate activation, and build-time observability without runtime infrastructure.

## Extension Compliance

- **Security Baseline**: Disabled; full extension rules remain unloaded. The approved local-only, encoding, route, content-integrity, and cleanup controls remain mandatory.
- **Property-Based Testing**: Disabled; full extension rules remain unloaded. Deterministic boundary, capacity, repeatability, route-state, and encoding fixtures remain mandatory.
