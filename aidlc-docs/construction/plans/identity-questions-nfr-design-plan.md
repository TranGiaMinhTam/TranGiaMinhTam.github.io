# NFR Design Plan - U-03 Identity and Questions

> **Status: Generated; awaiting explicit NFR Design artifact approval. All twelve recommended option A decisions were approved.**

## Purpose

Map the approved U-03 quality requirements into concrete resilience, scalability, performance, security, accessibility, review, and logical-component patterns. This stage defines how U-03 will satisfy its thresholds; it does not authorize source generation.

## Inputs

- Approved U-03 Functional Design, domain entities, component hierarchy, and business rules.
- Approved U-03 NFR Requirements and technology decisions.
- U-01 verified source, evidence manifest, visualization contracts, validation, recovery, and measurement foundations.
- U-02 typed section-body seam, native navigation, theme, responsive shell, and active bundle baseline.
- Existing static GitHub Pages delivery with no backend service.

## Mandatory Category Assessment

| Category | Applicability | Reason |
| --- | --- | --- |
| Resilience patterns | Applicable | Required-data failures must block deterministically, while portrait, SVG styling, and optional enhancements must degrade without blank sections. |
| Scalability patterns | Applicable | Questions and relationships need keyed, linear, shared-source derivation through doubled-volume fixtures. |
| Performance patterns | Applicable | Cumulative bundle budgets, first-viewport portrait delivery, transcript deferral, stable layout, and response targets need enforcement patterns. |
| Security patterns | Applicable | Evidence URLs, section destinations, text/SVG rendering, deployable assets, and prohibited runtime surfaces need layered controls. |
| Logical components | Applicable | Selectors, mappers, model assembly, components, slot registration, build inspectors, and evidence collectors need one-way boundaries. |
| Runtime infrastructure components | Not applicable | The static deterministic unit needs no queue, server cache, circuit breaker, worker, API, database, monitoring agent, or runtime retry service. |

## Design Questions

## Question 1 - Required-Data Resilience

Which pattern should distinguish blocking content faults from recoverable presentation failures?

A) Use one pure fail-closed assembler that returns typed ordered findings for missing or invalid required records, while the portrait component owns only a local recoverable image-error state; never retry deterministic validation or invent fallback data
B) Catch all errors inside the visible components, omit the affected content, and retry asset or data assembly automatically
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 2 - Progressive Visual Degradation

How should the constellation and enhancements remain available under partial capability or style failure?

A) Treat native question text, semantic relationships, and anchors as the authoritative baseline; layer SVG and emphasis as supplementary presentation so missing SVG styles, motion queries, or navigation enhancement cannot remove meaning
B) Make the interactive SVG the authoritative relationship interface and show a generic error when it cannot render
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 3 - Scalable Relationship Derivation

Which pattern should satisfy six-question and twelve-relationship capacity?

A) Index immutable questions and discipline coordinates once, validate and derive relationships in linear passes, generate SVG values and semantic rows from the same normalized collection, and prohibit render-loop nested searches or a second mapping source
B) Let each visual and text component independently scan and classify the question list during every render
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 4 - Deterministic Constellation Geometry

How should visual placement avoid runtime instability and layout measurement overhead?

A) Use a documented normalized coordinate map keyed by approved discipline and question identifiers, scale it through the SVG viewBox and CSS, and keep coordinates presentational rather than inferred measurements
B) Measure rendered text and calculate a force-directed layout in the browser on every resize
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 5 - First-Viewport Asset Pattern

Which loading pattern should protect LCP and CLS while keeping the portrait meaningful?

A) Render the manifest portrait with intrinsic dimensions, reserved aspect ratio, eager first-viewport eligibility, asynchronous decoding, and isolated failure handling; expose the transcript only through a non-preloaded native download anchor
B) Lazy-load the portrait without reserved geometry and preload the complete transcript for faster later download
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 6 - Bundle and Render Enforcement

How should cumulative performance gates be applied?

A) Keep pure U-03 logic dependency-free, assemble stable view models outside repeated component work, use native elements and CSS, extend the existing manifest evaluator for 256,000-byte JavaScript and 24,576-byte CSS checkpoints, and fail acceptance on any P0 breach
B) Add visualization and animation libraries first, then optimize only if the final page feels slow
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 7 - Static Security Defense

Which layered pattern should govern evidence and SVG rendering?

A) Combine branded identifiers, exact manifest and section allowlists, React text rendering, passive inline SVG, no arbitrary URL/selector interpolation, prohibited-pattern scans, deployable-inventory checks, and unchanged dependency/lockfile evidence
B) Rely only on React's default escaping and omit asset, SVG, destination, and active-graph boundary checks
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 8 - Accessibility Acceptance Pattern

How should the visual and semantic experiences be verified together?

A) Use an accessibility pyramid: pure relationship-set equality, semantic role/name tests, token contrast checks, keyboard/focus and portrait-failure review, reduced-motion and stylesheet-disabled review, then the eight-state viewport/theme matrix with zoom and reflow
B) Use an automated accessibility scanner as the only gate and do not compare the SVG with its semantic alternative
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 9 - Logical Component Boundaries

How should U-03 responsibilities be divided?

A) Separate pure verified selectors and assemblers, the closed discipline/geometry catalog, identity components, question components, a two-entry body registration, and build/test evidence adapters with one-way dependencies toward U-01 contracts
B) Put content lookup, classification, SVG geometry, actions, presentation, and shell integration into one large section component
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 10 - Two-Slot Integration Guard

Which pattern should prevent U-03 from changing the shell or later sections?

A) Supply an immutable partial body registry containing exactly `identity` and `questions`, let the existing U-02 resolver retain its fallback for eight slots, and verify registry keys, shell controller imports, order, and temporary-body results
B) Branch directly inside the shell for all ten sections and restyle the temporary bodies for visual consistency
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 11 - Candidate and Evidence Gate

How should rendered acceptance be incorporated into Code Generation?

A) Build behind the approved boundary, pass automated P0 gates and exact measurements, review the eight viewport/theme states plus failure/accessibility cases, and require a separate explicit candidate approval before treating U-03 as complete
B) Activate the two sections immediately after compilation and collect visual, performance, and accessibility evidence afterward
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 12 - Runtime Infrastructure

Should U-03 add a cache, queue, circuit breaker, worker, monitoring service, API, database, remote image processor, or retry subsystem?

A) No; use only deterministic browser-safe modules and build/test evidence adapters, and record runtime infrastructure as not applicable
B) Add a client queue and remote asset service to coordinate questions, portrait delivery, and failure reporting
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Execution Checklist

### Planning and Approval

- [x] Read the approved U-03 NFR Requirements, technology decisions, Functional Design, and inherited U-01/U-02 patterns.
- [x] Evaluate every mandatory NFR Design category, including explicit runtime-infrastructure applicability.
- [x] Create targeted questions for required-data resilience, progressive degradation, growth, geometry, assets, bundle enforcement, security, accessibility, boundaries, integration, candidate review, and infrastructure.
- [x] Receive answers to all twelve questions.
- [x] Analyze every answer for ambiguity, contradictions, feasibility, and NFR coverage.
- [x] Add and resolve follow-up questions if required; none were required because all recommended A choices are compatible.
- [x] Record explicit approval of the completed U-03 NFR Design plan.

### Design Generation

- [x] Generate `nfr-design-patterns.md` mapping each selected pattern to measurable U-03 NFRs.
- [x] Generate `logical-components.md` with pure, React, integration, build/test, and evidence boundaries.
- [x] Map failure behavior, performance enforcement, relationship equivalence, accessibility evidence, and candidate review across components.
- [x] Record runtime infrastructure as not applicable and prohibit unapproved services.
- [x] Validate every U-03 NFR identifier, approved answer, diagram, text alternative, table, and content rule.
- [x] Present the completed U-03 NFR Design for explicit approval before Code Generation Part 1.

## Required Artifacts

- [x] `aidlc-docs/construction/identity-questions/nfr-design/nfr-design-patterns.md`
- [x] `aidlc-docs/construction/identity-questions/nfr-design/logical-components.md`

## Boundary

- Approval of this answered plan authorizes NFR Design documentation only.
- Infrastructure Design remains skipped because deployment architecture is unchanged.
- Source generation, asset mutation, dependency changes, shell restructuring, later-domain implementation, and publication require a separately approved Code Generation plan or amendment.
- Security Baseline and Property-Based Testing remain disabled in the active workflow state.
