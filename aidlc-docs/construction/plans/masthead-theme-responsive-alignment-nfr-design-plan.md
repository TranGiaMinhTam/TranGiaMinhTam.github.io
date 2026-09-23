# NFR Design Plan - U-02 Masthead, Theme, and Responsive Alignment

> **Status: Answers approved and NFR design artifacts complete; awaiting explicit NFR Design review approval. This plan creates design documentation only and does not authorize application-code, dependency, or activation changes.**

## Unit Context

- **Approved Functional Design**: typed masthead/action presentation, controlled theme flow, shared hidden semantic summaries, deterministic responsive variants, six domain alignment contracts, and U02-P01 through U02-P10.
- **Approved NFR Requirements**: measurable accessibility, capacity, bundle, CLS, compatibility, recovery, privacy/security, reliability, maintainability, and rendered-review gates.
- **Stack boundary**: React 19, strict TypeScript, Vite, CSS Modules, semantic HTML, Vitest, Testing Library, and exact `fast-check` 4.10.2; no new runtime dependency or service.
- **Infrastructure applicability**: queues, caches, circuit breakers, APIs, databases, load balancers, and server observability are N/A. U-02 needs logical client/build components and repository-local evidence only.

## NFR Design Category Assessment

- **Resilience patterns**: Applicable to controlled theme/storage failure, progressive CSS fallbacks, retained active presentation, recovery, and fail-closed activation. Network retry/circuit-breaker patterns are N/A.
- **Scalability patterns**: Applicable to linear semantic projection, bounded static section/summary capacity, and growth findings. Horizontal infrastructure scaling is N/A.
- **Performance patterns**: Applicable to CSS-first layout, no runtime dependency/request, stable action membership, bundle deltas, CLS, and bounded measurement.
- **Security patterns**: Applicable to typed capability admission, normal React escaping, safe findings, privacy re-verification, boundary scans, and layered activation gates.
- **Logical components**: Applicable to presentation builder, semantic projector, hidden renderer, layout contract registry, candidate harness, rendered-review adapter, measurement/evidence collector, recovery preflight, and activation gate.

## NFR Design Questions

Complete every `[Answer]:` tag with one option letter. Option A is recommended.

## Question 1 - Resilient Candidate Pattern

How should U-02 isolate visible changes before activation?

A) Use a separate candidate entry/build that composes the proposed masthead, summaries, and layouts against the same approved models; keep the active entry hash-protected until every gate and explicit rendered approval passes, then perform one small reversible activation change
B) Modify the live entry first and use feature flags inside each component
C) Activate each layout correction independently as it is coded
X) Other (describe after the answer tag)

[Answer]: A

## Question 2 - Theme and Storage Resilience

Which pattern should handle theme preference failures?

A) Retain the existing controlled in-memory theme transition, wrap preference read/write at the controller boundary, use deterministic system/light fallback, and expose no storage error in the masthead
B) Retry localStorage writes until they succeed
C) Disable the theme button when persistence is unavailable
X) Other (describe after the answer tag)

[Answer]: A

## Question 3 - Progressive CSS Fallback

How should optional visual features degrade?

A) Define readable base surface, border, spacing, wrap, and focus styles first; layer grid marks, color mixing, backdrop blur, balanced wrapping, and transitions through supported declarations/media queries so their absence never changes content or action availability
B) Use JavaScript feature detection to render separate browser-specific components
C) Require all enhancements and show an unsupported-browser page otherwise
X) Other (describe after the answer tag)

[Answer]: A

## Question 4 - Semantic Projection Architecture

Which scalability/reliability pattern should own hidden summary generation?

A) Use one pure linear projector with kind-specific validators, stable finding normalization, immutable outputs, and a shared renderer; domain adapters provide already-reviewed rows and no component performs inference
B) Let every domain component build assistive prose independently
C) Serialize the summaries into HTML during a maintenance script
X) Other (describe after the answer tag)

[Answer]: A

## Question 5 - Responsive Layout Architecture

How should the six corrections share alignment behavior without losing domain identity?

A) Use shared purpose-named tokens and alignment-contract helpers for measures/gaps/tracks, while each domain CSS Module owns its component grid and collapses the same DOM order through container/media queries
B) Move all six components into one universal grid component
C) Use JavaScript viewport listeners to select separate markup trees
X) Other (describe after the answer tag)

[Answer]: A

## Question 6 - Performance and Stability Measurement

How should bundle, CLS, and interaction budgets be enforced?

A) Capture a pre-mutation production baseline, build the isolated candidate, compare exact initial JS/CSS bytes and request graph, collect local browser CLS/interaction evidence, and block promotion on unapproved budget breaches
B) Compare only final minified file names
C) Skip candidate measurement and inspect the active build after activation
X) Other (describe after the answer tag)

[Answer]: A

## Question 7 - Rendered Review Harness

What logical design should drive the 80-case base matrix and accessibility variants?

A) Generate canonical case records from section, viewport, and theme dimensions; run them through a capability-detected local browser adapter; record deterministic pass/fail metrics and only necessary screenshots; permit documented manual completion for an engine unavailable locally without claiming it was automated
B) Capture ad hoc screenshots and name files manually
C) Upload the site and sources to a hosted visual-review service
X) Other (describe after the answer tag)

[Answer]: A

## Question 8 - Security and Privacy Layers

Which defense-in-depth path should guard presentation inputs and activation?

A) Combine TypeScript capability contracts, pure validation, React escaping, unsafe-pattern/import scans, U-01 privacy/source checks, production request inspection, and the final activation gate; failures use generic public text and safe repository-relative evidence
B) Depend only on React escaping
C) Allow raw paths internally as long as they are not visibly printed
X) Other (describe after the answer tag)

[Answer]: A

## Question 9 - Recovery Design

How should U-02 meet its 30-minute recovery objective?

A) Capture target existence/content/hash plus active-entry and protected-source facts before mutation, rehearse restoration in an isolated temporary target, and verify the recovery payload at candidate and activation gates without resetting unrelated work
B) Store copies beside each source file with a `.backup` suffix
C) Depend on the Git working tree and editor undo
X) Other (describe after the answer tag)

[Answer]: A

## Question 10 - Evidence and Diagnostics

How should local review results be represented?

A) Use schema-versioned canonical JSON for machine measurements/findings and Markdown for review summaries; normalize ordering, separate timestamps from deterministic content, use safe relative targets, and emit non-zero status for blocking gates
B) Print human-readable console messages only
C) Add production analytics and error reporting
X) Other (describe after the answer tag)

[Answer]: A

## Question 11 - PBT Harness Integration

How should U-02 properties integrate with the U-01 harness?

A) Reuse the exact framework/configuration and shared safe primitives, add focused semantic/layout arbitraries and reference oracles, run at least 100 cases with a fixed default seed, preserve shrinking/replay/no-retry, and keep DOM/rendered examples separate
B) Create a second random-test framework for CSS behavior
C) Run properties only on developer demand, outside CI
X) Other (describe after the answer tag)

[Answer]: A

## Question 12 - Final Activation Gate Composition

Which components must agree before promotion?

A) Require recovery, focused examples/PBT, strict TypeScript, lint, full regression tests, accessibility/contrast/target checks, complete rendered matrix, bundle/request/CLS budgets, browser compatibility evidence, privacy/source boundaries, and explicit candidate approval; any blocker retains the active presentation
B) Promote when component tests pass and treat other checks as advisory
C) Let each component self-activate after its local tests
X) Other (describe after the answer tag)

[Answer]: A

## Execution Checklist

### Planning and Approval

- [x] Read the approved U-02 Functional Design, NFR Requirements, tech-stack decisions, active architecture, Security Baseline, and full PBT rules.
- [x] Evaluate resilience, scalability, performance, security, and logical-component categories, including explicit infrastructure N/A decisions.
- [x] Create pattern/component questions for candidate isolation, storage/CSS fallback, semantic projection, layout ownership, measurement, rendered review, security, recovery, evidence, PBT, and activation.
- [x] Receive answers to all twelve questions.
- [x] Analyze every answer for ambiguity, contradictions, combined choices, and missing pattern boundaries.
- [x] Add and resolve clarification questions if required; none were required because all Option A decisions are complete and mutually compatible.
- [x] Obtain explicit approval of the completed U-02 NFR Design plan.

### Design Generation

- [x] Generate `nfr-design-patterns.md` for resilient candidate/promotion, controlled theme fallback, progressive CSS, pure scalable projection, CSS-first layout, layered security, measurement, evidence, PBT, and recovery.
- [x] Generate `logical-components.md` with responsibilities, inputs/outputs, dependencies, failure ownership, concurrency/state boundaries, and acceptance gates.
- [x] Map patterns/components to all U-02 NFRs and applicable Security/PBT rules; mark infrastructure patterns N/A with rationale.
- [x] Validate all Markdown, diagrams/text alternatives if used, signatures, numeric thresholds, and extension compliance.
- [x] Present the standardized NFR Design completion gate and wait for explicit approval.

## Required Artifacts

- `aidlc-docs/construction/masthead-theme-responsive-alignment/nfr-design/nfr-design-patterns.md`
- `aidlc-docs/construction/masthead-theme-responsive-alignment/nfr-design/logical-components.md`

## Boundary

Approval authorizes NFR Design documentation only. It does not authorize React/CSS mutation, browser/dependency installation, candidate activation, deployment, archive/resume content integration, or media-viewer work.
