# NFR Requirements Plan - U-05 Academic and Evidence

> **Status: NFR Requirements and technology decisions complete, awaiting explicit approval. No U-05 application source has been generated.**

## Baseline and Scope

- Active U-04 production baseline: 249,238 bytes initial JavaScript and 30,359 bytes initial CSS.
- U-05-eligible published PDFs: 22,866,108 bytes across seven documents.
- U-05-eligible published images: 1,251,556 bytes across three project figures.
- Total U-05 evidence inventory: 24,117,664 bytes across ten records; none should enter the initial request set.
- U-05 adds two body registrations but no API, database, authentication, analytics, runtime document processor, external content fetch, or deployment service.
- The package-lock SHA-256 remains `db382652e91d7bd4ab3c154cf79d53b6b26ecb4430efe5961273572ce25b9bb1`.
- Security Baseline and Property-Based Testing extensions remain disabled in the approved workflow state.

## Assessment Steps

- [x] Read the approved U-05 Functional Design artifacts and decisions.
- [x] Inspect the active production baseline, exact evidence inventory, publication boundary, shell registry seam, and inherited U-01 through U-04 safeguards.
- [x] Evaluate scalability, performance, availability, security, technology, reliability, maintainability, usability, accessibility, responsive behavior, and visual-review ambiguity.
- [x] Create twelve mutually exclusive A/B/X questions with measurable recommended options.
- [x] Receive complete answers to Questions 1 through 12.
- [x] Resolve every ambiguous response or add focused clarification questions. The instruction to use every recommended option made all current answers explicit and consistent.
- [x] Generate `nfr-requirements.md`.
- [x] Generate `tech-stack-decisions.md`.
- [x] Validate thresholds, requirement identifiers, traceability, tables, parsing compatibility, and whitespace.
- [x] Update plan checkboxes, state, README, and append-only audit.
- [x] Present the standardized U-05 NFR Requirements completion message and wait for explicit approval.

## Question 1 - Cumulative Code Budgets

What cumulative production budgets should U-05 enforce?

A) Limit initial JavaScript to 274,000 bytes and no more than 10 percent above the 249,238-byte U-04 baseline; limit initial CSS to 43,008 bytes
B) Use only the broad project budgets of 460,800-byte JavaScript and 76,800-byte CSS
X) Other (please specify exact byte or percentage limits after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It provides measured room for two custom bodies while retaining a strict cumulative regression signal.

## Question 2 - PDF Delivery

How should the seven allowlisted PDFs be delivered?

A) Emit only the allowlisted files, keep all 22,866,108 bytes outside the initial request set, never embed or preload them, and request each file only after a purpose-labeled native action
B) Load PDF previews or embedded viewers automatically when Evidence Library renders
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. The full document inventory is large and the approved design already provides useful text-first previews.

## Question 3 - Image Delivery and Stability

How should the three 1,251,556-byte project images behave in U-05?

A) Reuse the canonical image assets, keep them outside the initial request set, lazy-load with asynchronous decoding and intrinsic geometry, and provide local failure states
B) Load full-resolution images eagerly and allow the archive rows to resize after loading
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It prevents avoidable first-view transfer and layout shift while retaining accessible recovery.

## Question 4 - Rendered Performance

Which browser performance targets should guide the U-05 candidate?

A) At a representative mobile profile, target LCP at or below 2.5 seconds, CLS at or below 0.10, and interaction latency at or below 200 milliseconds; record an honest P1 limitation if no supported browser runner is available
B) Record bundle size only and define no rendered performance targets
X) Other (please specify metrics and thresholds after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It keeps the image-rich archive measurable without claiming unavailable browser evidence.

## Question 5 - Growth Capacity and Complexity

What deterministic growth case should the academic and evidence selectors support?

A) Verify four academic programs, twenty evidence items, and at least eighty academic/evidence/group relationships using indexed linear passes and stable repeated-run output
B) Optimize only for the current two programs and ten evidence items and permit nested rescans
X) Other (please specify a capacity fixture after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It tests doubled content volume and richer relationships without introducing infrastructure-scale requirements.

## Question 6 - Availability and Local Failure

How should the unit behave when optional evidence or previews fail?

A) Preserve verified academic text, recompute groups and counts from accepted evidence, omit only unresolved actions, replace only failed image previews with local statuses, and avoid automatic retry loops
B) Remove the entire Academic Trajectory or Evidence Library when one record fails
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It isolates failure and keeps independently verified content useful.

## Question 7 - Static Security and Privacy Boundary

Which controls should protect the U-05 evidence surface?

A) Allow only manifest-resolved same-origin published assets; reject unsafe URL schemes, runtime request APIs, unsafe HTML, external SVG references, raw/private paths, portrait leakage, pending-CV substitution, former-owner content, and unapproved external links
B) Allow arbitrary local files and runtime URLs if they produce richer previews
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It enforces the approved static publication and privacy boundary before rendering.

## Question 8 - Accessibility Acceptance

What accessibility evidence should block U-05 acceptance?

A) Require WCAG 2.2 AA-oriented evidence for headings, landmarks, in-progress status, native actions, visible focus, keyboard order, alternatives, non-color group cues, semantic count equivalence, image failure status, text spacing, 200-percent zoom, reduced motion, and 320-pixel reflow
B) Require headings and image alternative text only
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. Dense academic and provenance information requires a complete interaction and reflow contract.

## Question 9 - Responsive and Theme Matrix

Which visual matrix should be reviewed before activation?

A) Review 320, 768, 1280, and 1440 CSS-pixel widths in light and dark modes, including long provenance, multi-line grades, archive-row stacking, group navigation, action wrapping, text spacing, zoom, and no document-level overflow
B) Review one desktop width in light mode only
X) Other (please specify widths and themes after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It covers the custom cross-section and archive transformations at the established project breakpoints.

## Question 10 - Structural Uniqueness

How should candidate review enforce the approved redesign?

A) Require a recognizable curriculum cross-section and grouped archival index; reject ledgers, conventional timelines, repeated education cards, uniform evidence grids, carousels, embedded PDF viewers, and relabeled copies of completed-unit layouts
B) Allow existing timeline and card components to be restyled for speed
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It preserves the complete-redesign requirement and the approved Functional Design.

## Question 11 - Technology Stack

Which implementation stack should U-05 use?

A) Continue strict TypeScript, React 19, native semantic HTML, CSS Modules, passive inline SVG only when useful, Vitest, Testing Library, and existing Vite tooling with no new runtime dependency or PDF library
B) Add a PDF viewer, gallery framework, charting package, and remote asset client
X) Other (please name technologies after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. Text-first documents, native links, CSS layout, and simple count graphics need no additional runtime package.

## Question 12 - Ownership and Maintainability

How should U-05 preserve change safety?

A) Keep immutable selectors, closed academic/evidence mappings, normalized relationships and groups, view-model-only components, exactly two body keys, stable purpose-based test IDs, explicit boundary checks, and a candidate-before-activation gate
B) Let components import legacy data and asset directories directly and classify records during rendering
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It keeps source truth, publication policy, presentation, and activation independently testable.

## Recommendation Summary

Option A is recommended for all twelve questions. It keeps U-05 under strict cumulative code budgets, defers 24,117,664 evidence bytes until needed, defines measurable rendered performance, proves doubled-volume linear behavior, isolates media failures, enforces static publication safety, requires WCAG 2.2 AA-oriented evidence, preserves structural uniqueness, and adds no dependency or infrastructure.

## Extension Compliance

- **Security Baseline**: Disabled; its full extension rule is not loaded. Product-specific static security requirements remain included above.
- **Property-Based Testing**: Disabled; its full extension rule is not loaded. Deterministic table-driven, doubled-volume, and repeated-run tests remain included above.
