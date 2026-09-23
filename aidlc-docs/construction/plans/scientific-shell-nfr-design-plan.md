# NFR Design Plan - U-02 Scientific Shell

> **Status: Completed and explicitly approved on 2026-09-14. All option A decisions were used.**

## Purpose

Map the approved U-02 quality requirements into concrete resilience, scalability, performance, security, accessibility, evidence, and logical-component patterns. This stage designs how the shell will meet its thresholds; it does not authorize source generation or the active-entry switch.

## Inputs

- Approved U-02 Functional Design and business rules.
- Approved U-02 NFR Requirements and selected native React/TypeScript stack.
- U-01 recovery, validation, token, boundary, and manifest-measurement foundations.
- Existing static GitHub Pages architecture with no backend services.

## Mandatory Category Assessment

| Category | Applicability | Reason |
| --- | --- | --- |
| Resilience patterns | Applicable | Observer, geometry, history, storage, media, hash, and target failures require isolated degradation without retries. |
| Scalability patterns | Applicable | Registry and event growth must retain one controller, keyed lookup, bounded listeners, and linear batch work. |
| Performance patterns | Applicable | The entry switch has 300-KiB JavaScript, 50-KiB CSS, timing, scheduling, and lazy-boundary requirements. |
| Security patterns | Applicable | Registered hashes, theme storage, active imports, unsafe DOM/pattern exclusion, and dependency reachability require layered controls. |
| Logical components | Applicable | Pure evaluators, hooks, browser adapters, shell components, build inspectors, and evidence reporters need explicit boundaries. |
| Runtime infrastructure components | Not applicable | The approved static site requires no queue, cache server, circuit breaker, database, API gateway, monitoring agent, or retry service. |

## Design Questions

## Question 1 - Resilient State Coordination

Which pattern should isolate expected browser failures from shell state?

A) Use a pure transition reducer fed by normalized adapter events; expected capability failures become typed degraded states, unexpected programmer errors remain visible, and deterministic local operations are never retried
B) Catch every exception inside components, log it, and retry navigation or theme operations automatically
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 2 - Navigation and History Races

How should competing deliberate, observer, geometry, and history events be coordinated?

A) Use one event-priority state machine with a single pending intent, monotonic observation batches, idempotent hash writes, and explicit interruption rules for back/forward and newer deliberate actions
B) Let each component update active state and history independently, using debounce delays to reduce conflicts
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 3 - Observer and Geometry Fallback

Which resilience pattern should support missing IntersectionObserver?

A) Place observation behind one injectable adapter that normalizes observer and single-animation-frame geometry batches into the same pure winner selector, with one lifecycle owner and explicit cleanup
B) Implement separate observer and scroll-listener selection algorithms in different components
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 4 - Theme Failure Isolation

How should theme preference remain usable when browser facilities fail?

A) Resolve stored, system, and default values through pure helpers; apply in-memory/root state first; attempt persistence second; return typed results; and subscribe to system changes only while no explicit preference exists
B) Couple rendering to successful localStorage access and reload the page after every theme change
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 5 - Static Growth Pattern

Which structure should enforce doubled-volume capacity and bounded work?

A) Use the frozen registry plus keyed maps, one target registry, one normalized observation batch, linear winner selection, no per-section global listeners, and no runtime service or pagination layer
B) Create one controller and listener per section so each slot can scale independently
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 6 - Bundle and Timing Enforcement

How should performance requirements be designed into migration?

A) Keep pure shell logic dependency-free, use native semantic components and local CSS, reserve journal/evidence/domain code behind later boundaries, measure the Vite entry before and after the switch, and fail the switch when 307,200-byte JavaScript, 51,200-byte CSS, timing, scheduling, or regression gates fail
B) Switch first, then optimize only if the browser feels slow during review
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 7 - Static Security Defense

Which layered security pattern should govern the new active shell?

A) Combine typed allowlists, exact hash/theme parsing, real safe anchors, no unsafe HTML, isolated adapters, prohibited-import/style checks, active-manifest dependency inspection, and zero personal-data/network surface
B) Depend on React escaping alone because the site is static
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 8 - Accessibility Verification Pattern

How should WCAG shell acceptance be enforced?

A) Combine semantic contracts and queries, deterministic state tests, token contrast calculations, rendered keyboard/focus/motion/zoom/reflow checks in both themes, and an eight-state viewport/theme matrix before entry acceptance
B) Use an automated accessibility scanner as the sole acceptance mechanism
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 9 - Logical Component Boundaries

How should shell responsibilities be divided?

A) Separate pure hash/theme/progress/winner evaluators, injected browser adapters, navigation and theme hooks, presentational shell components, entry migration guard, and build/test evidence adapters with one-way dependencies
B) Place browser access, state decisions, rendering, migration, and measurement in one `PortfolioExperience` component
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 10 - Runtime Infrastructure

Should U-02 introduce any cache, queue, circuit breaker, worker, monitoring agent, API, database, or runtime retry component?

A) No; use only local browser-safe modules and build/test adapters because the shell is deterministic and static, and record runtime infrastructure as not applicable
B) Add a client event queue and monitoring service to coordinate navigation and capture failures
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Execution Checklist

### Planning and Approval

- [x] Read the approved U-02 NFR Requirements, technology decisions, Functional Design, and U-01 inherited patterns.
- [x] Evaluate every mandatory NFR Design category, including explicit runtime-infrastructure applicability.
- [x] Create targeted questions for resilience, races, fallbacks, theme isolation, growth, performance, security, accessibility, logical boundaries, and infrastructure.
- [x] Receive answers to all ten questions.
- [x] Analyze every answer for ambiguity, contradictions, feasibility, and NFR coverage.
- [x] Add and resolve follow-up questions if required; all option A decisions are compatible and require none.
- [x] Record explicit approval of the completed U-02 NFR Design plan.

### Design Generation

- [x] Generate `nfr-design-patterns.md` mapping each selected pattern to measurable U-02 NFRs.
- [x] Generate `logical-components.md` with browser-safe, component, adapter, build/test, and evidence boundaries.
- [x] Map failure behavior, performance enforcement, accessibility evidence, entry migration, and rollback across components.
- [x] Record runtime infrastructure as not applicable and prohibit unapproved services.
- [x] Validate all U-02 NFR IDs, approved answers, diagrams, text alternatives, tables, and content formatting.
- [x] Present the completed U-02 NFR Design for explicit approval before Code Generation Part 1.

## Required Artifacts

- [x] `aidlc-docs/construction/scientific-shell/nfr-design/nfr-design-patterns.md`
- [x] `aidlc-docs/construction/scientific-shell/nfr-design/logical-components.md`

## Boundary

- Approval authorizes NFR Design documentation only.
- Infrastructure Design remains skipped because deployment architecture is unchanged.
- Source generation, entry switching, dependency mutation, cleanup, and later domain implementation require separately approved Code Generation plans.
- Security Baseline and Property-Based Testing remain disabled unless explicitly changed in workflow state.
