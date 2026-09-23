# NFR Requirements Plan - U-02 Scientific Shell

> **Status: Generated and awaiting explicit review approval. All option A decisions were used.**

## Purpose

Define measurable quality targets and technology constraints for the new active scientific shell before NFR Design or source generation. The assessment covers scalability, performance, availability, product security, reliability, maintainability, compatibility, accessibility, responsive usability, and migration evidence.

## Context

- U-02 activates a completely new full-width shell and removes the rejected template composition from the initial graph.
- U-01 measured 893,367 bytes of initial JavaScript and 68,577 bytes of initial CSS, verified recovery, and established final limits of 460,800 and 76,800 bytes respectively.
- U-02 must create headroom for later domain units, not merely fall below the old baseline.
- Existing dependency advisories are recorded; U-02 may avoid vulnerable runtime imports but cannot change dependencies without an approved Code Generation plan.

## Category Assessment

| Category | Applicability | Reason |
| --- | --- | --- |
| Scalability | Applicable | Ten stable sections, navigation facts, and later slot replacement must tolerate content growth without parallel controllers. |
| Performance | Applicable | U-02 changes the initial entry graph and must deliver substantial bundle reduction and responsive interaction. |
| Availability | Applicable | Core navigation and mode selection require fallbacks for observer, history, media, and storage limitations. |
| Security | Applicable | Hash parsing, history writes, root attributes, storage, links, and dependency exposure form the static threat boundary. |
| Technology stack | Applicable | The shell must choose React/CSS/browser primitives without reintroducing the rejected UI stack. |
| Reliability | Applicable | Event ordering, cleanup, rapid navigation, restoration, and fallback transitions must be deterministic. |
| Maintainability | Applicable | One controller, stable contracts, local styles, focused tests, and ownership boundaries are required. |
| Usability and accessibility | Applicable | The shell owns global keyboard access, focus, progress semantics, modes, responsive controls, and landmarks. |

## NFR Questions

## Question 1 - Shell Bundle Headroom

What post-U-02 initial-code budgets should reserve room for the six later domain units?

A) Require at most 300 KiB (307,200 bytes) initial minified JavaScript and 50 KiB (51,200 bytes) initial CSS after the active shell switch, while also enforcing the inherited 10-percent regression gate
B) Require only the inherited final limits of 450 KiB JavaScript and 75 KiB CSS, leaving no explicit shell headroom
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 2 - Navigation Responsiveness

What measurable interaction timing should the shell meet under normal local execution?

A) Reflect deliberate navigation and theme changes in state within 100 ms, settle active-section/progress state within 200 ms after stable visibility input, and execute at most one geometry evaluation per animation frame
B) Define no timing targets as long as navigation eventually completes
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 3 - Static Growth Capacity

How much shell-level growth must the design tolerate without an architectural change?

A) Support at least twice the approved section metadata and navigation-event fixture volume while retaining one controller, deterministic ordering, bounded listener count, and linear processing
B) Optimize only for exactly ten items and revisit the architecture for any registry growth
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 4 - Capability Availability

What availability standard should apply to browser features?

A) Keep all section links and theme toggling usable when IntersectionObserver, geometry measurement, History API, matchMedia, or localStorage are individually unavailable, with typed fallbacks and no blank shell
B) Require all named modern APIs and show an unsupported-browser screen when one is absent
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 5 - Static Security and Privacy

Which shell security boundary should be enforced?

A) Accept only registry-owned hashes and valid theme values; store only the theme string; introduce no runtime network, analytics, secrets, form persistence, unsafe HTML, unsafe schemes, opener access, or raw evidence; audit active runtime imports before entry switching
B) Permit general hash strings and storage metadata because the site has no backend
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 6 - Technology Stack

Which implementation stack should U-02 use?

A) Use React 19, strict TypeScript, native landmarks and anchors, CSS Modules plus U-01 tokens, native browser APIs behind injectable adapters, Vitest and Testing Library, and no new runtime or UI dependency; exclude Chakra and Tailwind utility composition from the new active shell
B) Build the new shell with the existing Chakra and Tailwind presentation layers to reduce initial implementation work
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 7 - Deterministic Reliability

How should event races and failures be accepted?

A) Require deterministic tests for rapid repeated navigation, observer ties, hash changes, back/forward events, target removal, storage exceptions, capability absence, teardown, and repeated identical inputs; no leaked listeners, feedback loops, or swallowed programmer errors
B) Test only the normal click-to-section and theme-toggle paths
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 8 - Accessibility Acceptance

What accessibility evidence must block shell approval?

A) Require WCAG 2.2 AA checks for skip navigation, landmarks, heading order, keyboard operation, current state, concise progress status, visible and unobscured focus, 4.5:1 text and 3:1 meaningful-graphic contrast, 24-by-24 targets, reduced motion, 200-percent zoom, and 320-CSS-pixel reflow in both themes
B) Require automated semantic tests only and defer manual focus, zoom, reflow, and contrast review
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 9 - Responsive and Browser Matrix

Which compatibility matrix should U-02 document?

A) Review 320, 768, 1280, and 1440 CSS-pixel layouts in light and dark modes; target the latest two stable Chrome, Edge, Firefox, and Safari majors plus current iOS Safari and Android Chrome; record exact available test versions and capability fallbacks
B) Review only one desktop Chrome viewport and rely on fluid CSS for other environments
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 10 - Migration and Review Evidence

What evidence is required before replacing the live template entry?

A) Require exact changed-file scope, U-01 recovery verification, focused and full tests, lint, production build, import-boundary results, before/after manifest measurements, theme and viewport captures or structured review, warning dispositions, and confirmation that rollback remains executable; failed P0 checks prohibit the switch
B) Permit the entry switch after focused component tests and collect build and recovery evidence later
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Execution Checklist

### Planning and Approval

- [x] Read the approved U-02 Functional Design artifacts and inherited U-01 NFR requirements.
- [x] Evaluate scalability, performance, availability, security, stack, reliability, maintainability, usability, accessibility, responsiveness, compatibility, and review-evidence categories.
- [x] Create measurable context-specific questions with explicit alternatives and Other options.
- [x] Receive answers to all ten questions.
- [x] Analyze answers for ambiguity, contradiction, and feasibility against the approved shell.
- [x] Add and resolve follow-up questions if required; all option A decisions are compatible and require none.
- [x] Record explicit approval of the completed U-02 NFR Requirements plan.

### Requirements Generation

- [x] Generate `nfr-requirements.md` with IDs, priorities, numerical thresholds, acceptance methods, and traceability.
- [x] Generate `tech-stack-decisions.md` with selected technologies, constraints, alternatives, version policy, and migration implications.
- [x] Validate every mandatory NFR category and all approved answers.
- [x] Validate content, tables, conversions, code spans, and nonempty artifacts.
- [x] Present the completed U-02 NFR Requirements for explicit approval before NFR Design.

## Required Artifacts

- [x] `aidlc-docs/construction/scientific-shell/nfr-requirements/nfr-requirements.md`
- [x] `aidlc-docs/construction/scientific-shell/nfr-requirements/tech-stack-decisions.md`

## Boundary

- Approval authorizes NFR documentation only.
- It does not authorize U-02 source generation, entry switching, dependency mutation, rejected-file cleanup, or later-domain implementation.
- Security Baseline and Property-Based Testing remain disabled unless the workflow state is explicitly changed.
