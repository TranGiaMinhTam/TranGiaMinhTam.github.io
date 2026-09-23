# NFR Requirements Plan - U-02 Masthead, Theme, and Responsive Alignment

> **Status: Answers approved and NFR artifacts complete; awaiting explicit NFR Requirements review approval. This plan creates NFR documentation only and does not authorize application-code or dependency changes.**

## Unit Context

- **Unit**: U-02 Masthead, Theme, and Responsive Alignment.
- **Approved Functional Design**: responsive scientific masthead, top-right theme action and reserved resume slot, hidden semantic summaries, six bounded alignment contracts, ten functional properties, and fail-closed candidate activation.
- **Primary NFRs**: NFR-001, NFR-003 through NFR-007, and NFR-019.
- **Inherited boundaries**: U-01 privacy, source integrity, recovery, browser/tool isolation, locked dependency graph, and local-only asset handling.
- **Excluded**: backend availability, database scaling, authenticated access, media-dialog behavior, archive loading, and hosting response-header delivery.

## NFR Category Assessment

- **Scalability**: Applicable to ten active sections, current semantic-row volumes, longer labels, and future reviewed content growth within the static architecture.
- **Performance**: Applicable to initial JS/CSS growth, layout shift, theme response, and rendering cost; network throughput is not applicable because U-02 adds no runtime service.
- **Availability**: Applicable as graceful browser/CSS/storage degradation and safe retention of the current presentation; server uptime/failover is not owned by this unit.
- **Security**: Applicable to safe capabilities, no private-data leakage, no unsafe rendering, and fail-closed activation; authentication/API/IAM controls are not applicable.
- **Tech stack**: Applicable to React/TypeScript/CSS/Vitest/Testing Library and rendered-review tooling; framework migration is out of scope.
- **Reliability**: Applicable to deterministic semantic projection, theme behavior, browser fallbacks, and regression gates.
- **Maintainability**: Applicable to shared tokens/components, one-way imports, focused ownership, tests, and documentation.
- **Usability**: Highly applicable to WCAG 2.2 AA behavior, responsive layouts, zoom, text spacing, keyboard focus, forced colors, and reduced motion.

## NFR Decision Questions

Complete every `[Answer]:` tag with one option letter. Option A is recommended.

## Question 1 - Accessibility Conformance Gate

What evidence should be required for WCAG 2.2 AA behavior?

A) Combine semantic/component tests, automated accessibility checks where supported, keyboard review, contrast/focus inspection, and rendered review for zoom, text spacing, reduced motion, and forced colors; no single automated score is sufficient
B) Treat passing an automated accessibility scanner as complete evidence
C) Use manual visual inspection only
X) Other (describe after the answer tag)

[Answer]: A

## Question 2 - Contrast and Focus Thresholds

Which measurable visual thresholds should block activation?

A) Require at least 4.5:1 for normal text, 3:1 for large text and meaningful UI graphics, and a clearly visible focus indicator with at least 3:1 adjacent-color contrast where WCAG requires it; decorative grid marks may be lower only because they convey no meaning
B) Preserve the current palette without numeric checks
C) Check text contrast only and exempt controls/focus
X) Other (describe after the answer tag)

[Answer]: A

## Question 3 - Target Size and Keyboard Usability

What control-size and keyboard requirement should apply to the masthead actions?

A) Meet WCAG 2.2 AA Target Size Minimum through at least a 24-by-24 CSS-pixel target or sufficient spacing, retain larger existing action sizing where practical, and require complete keyboard operation with no focus trap or obscured focus
B) Accept any target size if the label is readable
C) Apply target-size checks only on mobile
X) Other (describe after the answer tag)

[Answer]: A

## Question 4 - Responsive and Accessibility Matrix

How broad should the blocking layout matrix be?

A) Test all ten sections at 320, 768, 1280, and 1440 CSS pixels in both themes, plus representative 200-percent zoom and WCAG increased-text-spacing states; every case must have no overlap, clipping, or document-level horizontal overflow
B) Test the masthead and six defect components only at 320 and 1440 pixels
C) Test one desktop and one mobile screenshot in light theme
X) Other (describe after the answer tag)

[Answer]: A

## Question 5 - Browser Compatibility

Which browser baseline should U-02 support?

A) Support current stable Chromium, Firefox, and Safari engines, including representative iOS Safari behavior; progressive CSS enhancements must fall back to readable structure without a browser-specific component tree
B) Support only the browser used for local development
C) Support Chromium only and defer Safari/Firefox
X) Other (describe after the answer tag)

[Answer]: A

## Question 6 - Initial Bundle and Rendering Budget

How should performance changes be constrained?

A) Add no runtime dependency, eagerly loaded media, or runtime network request; measure against the current production baseline and require any initial JS or CSS increase to remain small, attributable, and explicitly approved, with layout fixes preferring CSS and pure shared projections
B) Allow any bundle increase below one megabyte
C) Skip measurement because the unit is primarily visual
X) Other (describe after the answer tag)

[Answer]: A

## Question 7 - Layout Stability and Interaction Response

What responsiveness targets should apply?

A) Theme activation must update the root state within the same user interaction without a loading state, masthead actions must not shift after hydration, and U-02 must introduce no avoidable layout shift from unsized media, late action insertion, or font-dependent fixed heights
B) Permit visible reflow after load if the final layout is correct
C) Measure only network response time
X) Other (describe after the answer tag)

[Answer]: A

## Question 8 - Graceful Degradation

How should unsupported CSS features and storage failures behave?

A) Preserve readable source order, actions, borders, and base surfaces when decorative grid, color mixing, backdrop blur, balanced wrapping, or storage is unavailable; theme toggling still works for the session and internal failure details remain hidden
B) Display an unsupported-browser message when any enhancement is unavailable
C) Assume all target browsers support every enhancement and storage operation
X) Other (describe after the answer tag)

[Answer]: A

## Question 9 - Security and Privacy Boundary

Which security controls should U-02 inherit and add?

A) Render only typed reviewed labels/capabilities, prohibit unsafe HTML and new runtime network surfaces, preserve the no-phone public boundary, keep diagnostics generic, and block activation on semantic/source/privacy findings; add no authentication, API, or telemetry
B) Allow direct strings and raw paths in presentation components for convenience
C) Add client analytics to measure theme and layout use
X) Other (describe after the answer tag)

[Answer]: A

## Question 10 - Semantic Summary Capacity

What capacity should the shared hidden-summary projection support?

A) Support at least 200 reviewed entries in one deterministic linear pass without changing architecture, duplicating identifiers, or creating visible layout work; larger inputs trigger measurement/review rather than a backend
B) Support only the current exact entry counts
C) Render at most ten entries and truncate the rest
X) Other (describe after the answer tag)

[Answer]: A

## Question 11 - Testing and Rendered Review Tooling

Which verification stack should be selected?

A) Retain strict TypeScript, ESLint, Vitest, Testing Library, existing CSS contract checks, and `fast-check`; use capability-detected browser automation or equivalent deterministic local rendered review for screenshots/overflow, and require separate approval before adding any new dev dependency
B) Replace the current test stack with a visual-regression service
C) Use image snapshots as the only regression gate
X) Other (describe after the answer tag)

[Answer]: A

## Question 12 - Maintainability and Ownership

How should cross-domain layout logic be organized?

A) Keep one `SemanticSummary`, one masthead/action contract, and shared semantic layout tokens; domain components retain their own visual CSS and consume shared contracts without duplicating theme state, relationship projection, or breakpoint logic
B) Copy a separate hidden table and breakpoint implementation into every domain
C) Move all domain styles into one global stylesheet
X) Other (describe after the answer tag)

[Answer]: A

## Question 13 - Reliability and Recovery

What failure/recovery objective should visible activation use?

A) Capture a U-02 recovery baseline before mutation, keep the current active presentation until candidate approval, fail closed on any blocking gate, and make the activation change reversible within 30 minutes using repository-local evidence
B) Replace the active presentation incrementally without a separate candidate
C) Depend only on editor undo for recovery
X) Other (describe after the answer tag)

[Answer]: A

## Question 14 - Property-Test Quality Gate

How should the ten approved functional properties be executed?

A) Use constrained domain generators, at least 100 runs per property by default, shrinking and visible seed/path replay, no silent retry, reference-oracle checks where applicable, and permanent examples for business-critical counterexamples
B) Generate arbitrary strings and retry failures automatically
C) Replace example/component tests with property tests
X) Other (describe after the answer tag)

[Answer]: A

## Question 15 - Availability and Operations Scope

Which availability requirements belong to U-02?

A) Require client-side graceful degradation, safe retained activation, and static-build compatibility; mark server uptime, failover, disaster recovery, centralized monitoring, and response-header delivery N/A or deferred because U-06 owns hosting/infrastructure
B) Define a 99.99-percent backend SLA for this static UI unit
C) Add a server solely to improve masthead availability
X) Other (describe after the answer tag)

[Answer]: A

## Execution Checklist

### Planning and Approval

- [x] Read the approved U-02 Functional Design, unit/story map, primary NFRs, U-01 inherited contracts, active stack, Security Baseline, and full PBT rules.
- [x] Evaluate scalability, performance, availability, security, tech stack, reliability, maintainability, and usability categories.
- [x] Create measurable context-specific questions for accessibility, contrast, target size, viewport/browser support, budgets, stability, fallbacks, privacy, capacity, tooling, ownership, recovery, PBT, and operations scope.
- [x] Receive answers to all fifteen questions.
- [x] Analyze every answer for ambiguity, contradictions, combined choices, and missing thresholds.
- [x] Add and resolve clarification questions if required; none were required because all Option A decisions are complete and mutually compatible.
- [x] Obtain explicit approval of the completed U-02 NFR Requirements plan.

### Requirements Generation

- [x] Generate `nfr-requirements.md` with prioritized measurable scalability, performance, accessibility/usability, compatibility, availability/recovery, security/privacy, reliability, and maintainability requirements.
- [x] Generate `tech-stack-decisions.md` with retained stack, rendered-review approach, PBT configuration, dependency boundary, browser/CSS policy, and rejected alternatives.
- [x] Map each requirement to U-02 stories, Functional Design rules/properties, and applicable Security/PBT rules.
- [x] Validate all Markdown, numeric thresholds, signatures, and extension compliance before writing.
- [x] Present the standardized NFR Requirements completion gate and wait for explicit approval.

## Required Artifacts

- `aidlc-docs/construction/masthead-theme-responsive-alignment/nfr-requirements/nfr-requirements.md`
- `aidlc-docs/construction/masthead-theme-responsive-alignment/nfr-requirements/tech-stack-decisions.md`

## Boundary

Approval authorizes NFR documentation only. It does not authorize React/CSS mutation, candidate activation, browser/dependency installation, deployment, archive UI, resume-content integration, or media-viewer work.
