# NFR Requirements Plan - U-07 Contact and Journal

> **Status: NFR Requirements and technology decisions complete, awaiting explicit approval. No U-07 application source has been generated.**

## Baseline and Scope

- Active U-06 production baseline: 281,183 bytes initial JavaScript, 46,045 bytes initial CSS, and 24,195,314 bytes of inherited evidence assets.
- U-07 adds one Contact body, a constrained hash-route orchestrator, one canonical note descriptor, a lazy Journal presentation boundary, and no new evidence file.
- U-07 adds no hosted form, API, authentication, database, analytics, CMS, server route, remote content fetch, runtime Markdown parser, or infrastructure service.
- The package-lock SHA-256 remains `db382652e91d7bd4ab3c154cf79d53b6b26ecb4430efe5961273572ce25b9bb1`.
- Security Baseline and Property-Based Testing extensions remain disabled in workflow state; product-specific privacy, static security, validation, routing, and deterministic test requirements still apply.

## Assessment Steps

- [x] Read the approved U-07 Functional Design artifacts and all fourteen decisions.
- [x] Inspect the active U-06 production measurement, shell hash contract, shared evidence behavior, candidate/activation pattern, and legacy cleanup boundary.
- [x] Evaluate scalability, performance, availability, privacy, security, technology, reliability, maintainability, usability, accessibility, route loading, and cleanup risks.
- [x] Create twelve mutually exclusive A/B/X questions with measurable recommended options.
- [x] Receive complete answers to Questions 1 through 12.
- [x] Resolve every ambiguous response or add focused clarification questions. The instruction selected A for every question; no ambiguity remained.
- [x] Generate `nfr-requirements.md`.
- [x] Generate `tech-stack-decisions.md`.
- [x] Validate thresholds, identifiers, traceability, tables, parsing compatibility, and whitespace.
- [x] Update plan checkboxes, state, README, and append-only audit.
- [x] Present the standardized U-07 NFR Requirements completion message and wait for explicit approval.

## Question 1 - Initial and Lazy Code Budgets

Which cumulative production limits should U-07 enforce over the active U-06 baseline?

A) Limit initial JavaScript to 296,000 bytes and no more than 6 percent above 281,183 bytes; initial CSS to 51,200 bytes; the lazy Journal route to at most 18,432 JavaScript bytes and 6,144 CSS bytes before gzip
B) Use only the broad project limits of 460,800 JavaScript bytes and 76,800 CSS bytes, with no lazy-route budget
X) Other (please specify exact byte and percentage limits after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It leaves bounded room for form state, routing, and a distinct reader while preventing the final unit from absorbing the unused broad budget.

## Question 2 - Lazy Route Enforcement

How should Journal loading be verified?

A) Require a separate manifest-visible Journal chunk that is absent from the continuous portfolio's initial request set and loads only after entering the journal namespace; keep the Contact body in the initial shell
B) Bundle Contact and the complete Journal reader into the initial application entry
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It preserves the approved split and keeps long-form presentation out of the first view.

## Question 3 - Rendered Performance Targets

Which browser performance targets should guide the final candidate?

A) On a representative mobile profile, target LCP at or below 2.5 seconds, CLS at or below 0.10, and interaction latency at or below 200 milliseconds for Contact and journal route entry; record an honest P1 limitation if no supported browser runner is available
B) Record bundle sizes only and define no rendered performance targets
X) Other (please specify metrics and thresholds after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It retains the performance bar used by earlier units and adds the lazy route transition explicitly.

## Question 4 - Catalog Growth and Complexity

What deterministic growth case should the note catalog and route selector support?

A) Verify sixteen note descriptors, 112 ordered note sections, and their evidence references through indexed linear assembly and lookup with stable repeated-run output; keep current publication cardinality at exactly one
B) Optimize only for one note and permit nested catalog rescans and render-time discovery
X) Other (please specify a capacity fixture after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It proves maintainable growth without implying that sixteen notes are currently approved.

## Question 5 - Contact Privacy and Security

Which controls should block acceptance of the Contact workflow?

A) Prohibit storage, fetch/XHR, form actions, analytics, hidden submission, unsafe HTML, non-mailto recipient schemes, recipient mutation, control characters in name/email, and raw query concatenation; require exact verified recipient and standards encoding
B) Permit draft storage and a future network submit hook if it is disabled visually
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It turns the local-only privacy promise into enforceable source and behavior checks.

## Question 6 - Mailto Compatibility and External Failure

How should the approved 5,000-character message limit be handled given email-client and browser URL limits vary?

A) Test deterministic encoding through the full approved limit, never claim email-client support or delivery, keep the draft intact, and keep the direct-email fallback visible; record client handoff as an external limitation rather than silently reducing the approved limit
B) Truncate the message without warning until the URL works in one tested browser
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It preserves user text and reports the boundary honestly.

## Question 7 - Route Availability and Recovery

What failure behavior should be mandatory for Journal routing and lazy loading?

A) Require deterministic known, unknown, malformed, non-journal, loading, and lazy-load-failure states; every journal-owned failure exposes a Data Stories return, preserves theme, and avoids blank output or history loops
B) Allow route or chunk failures to fall through to an empty page
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It makes a static deep link recoverable even when content or code loading fails.

## Question 8 - Accessibility Acceptance

What accessibility evidence should block U-07 acceptance?

A) Require WCAG 2.2 AA-oriented evidence for labels, descriptions, error summary, first-invalid focus, native actions, visible focus, route-entry heading focus, heading hierarchy, article landmarks, status announcements, non-color errors, 200-percent zoom, text spacing, reduced motion, and 320-pixel reflow
B) Require only visible labels and a page heading
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. Contact validation and route transitions introduce focus and announcement requirements beyond static content.

## Question 9 - Responsive and Theme Matrix

Which rendered review matrix should precede activation?

A) Review Contact, valid note, unknown note, validation errors, and lazy failure at 320, 768, 1280, and 1440 CSS pixels in light and dark modes, including long inputs, long evidence labels, zoom, text spacing, keyboard order, and no document-level overflow
B) Review the valid note at one desktop width in light mode only
X) Other (please specify widths, themes, and states after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It covers every new visual and failure state at the established project matrix.

## Question 10 - Technology Stack

Which implementation stack should U-07 use?

A) Continue strict TypeScript, React 19 controlled form state, native HTML validation semantics supplemented by pure validators, `React.lazy` and `Suspense`, CSS Modules, existing hash/browser adapters, Vitest, Testing Library, and Vite with no new dependency
B) Add a form framework, schema-validation package, router, Markdown runtime, and email SDK
X) Other (please name technologies after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. The approved behavior is small, local, and fully supportable by the existing stack.

## Question 11 - Maintainability and Verification

How should U-07 preserve change safety?

A) Keep pure contact/note selectors and validators, immutable canonical descriptors, view-model-only components, one Contact body key, stable purpose-based test IDs, deterministic fixtures, active/candidate boundary modes, a lazy-chunk manifest check, and candidate-before-activation gating
B) Parse legacy data and validate fields directly inside rendering components
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It separates source authority, validation, routing, presentation, and activation so each can fail safely.

## Question 12 - Cleanup Acceptance Gate

What proof should be required before any legacy presentation file or asset is removed?

A) Require exact paths, incoming-import analysis from active and test entry points, content hashes, recovery payload, duplicate/alias inspection, post-removal type/test/build verification, and explicit inclusion in the approved Code Generation plan; ambiguous or referenced targets remain untouched
B) Delete every legacy-looking contact, journal, blog, template, award, gallery, video, style, and asset file with a pattern match
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It permits final cleanup without broadening authorization into unsafe deletion.

## Recommendation Summary

Option A is recommended for all twelve questions. It applies tight initial and lazy-route budgets, enforces real code splitting, retains measurable rendered performance, proves linear catalog growth, makes the local-only privacy boundary testable, handles variable email-client support honestly, requires complete route recovery and accessibility evidence, uses the existing dependency-free stack, and permits cleanup only with exact recoverable proof.

## Extension Compliance

- **Security Baseline**: Disabled; its full extension rule is not loaded. Product-specific contact privacy and static security controls remain included above.
- **Property-Based Testing**: Disabled; its full extension rule is not loaded. Deterministic boundary, capacity, repeated-run, routing, and encoding fixtures remain included above.
