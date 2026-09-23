# NFR Requirements Plan - U-04 Research and Data

> **Status: NFR Requirements and technology decisions complete, awaiting explicit approval. No U-04 application source has been generated.**

## Baseline and Scope

- Active U-03 production baseline: 223,999 bytes initial JavaScript and 19,150 bytes initial CSS.
- Published U-04 figures: molecular docking 255,505 bytes; cashew polyphenol 164,808 bytes; data analytics 831,243 bytes.
- Published U-04 documents: protein-docking publication 3,490,329 bytes; WICO poster 7,702,179 bytes; SIM-LSE certificate 51,969 bytes.
- U-04 adds three body registrations but no API, database, authentication, analytics, external content fetch, or deployment service.
- Security Baseline and Property-Based Testing extensions remain disabled in the approved workflow state.

## Assessment Steps

- [x] Read the approved U-04 Functional Design artifacts and decisions.
- [x] Inspect the active production baseline, source asset sizes, evidence-loading contracts, shell seam, and inherited U-01 through U-03 safeguards.
- [x] Evaluate scalability, performance, availability, security, technology, reliability, maintainability, usability, accessibility, responsiveness, and visual-uniqueness ambiguity.
- [x] Create twelve mutually exclusive A/B/X questions with measurable recommended options.
- [x] Receive complete answers to Questions 1 through 12.
- [x] Resolve every ambiguous response or add focused follow-up questions; all answers were explicit and no follow-up was required.
- [x] Generate `nfr-requirements.md`.
- [x] Generate `tech-stack-decisions.md`.
- [x] Validate thresholds, requirement identifiers, traceability, tables, parsing compatibility, and whitespace.
- [x] Update plan checkboxes, state, README, and append-only audit.
- [x] Present the standardized U-04 NFR Requirements completion message and wait for explicit approval.

## Question 1 - Cumulative Code Budgets

What cumulative production budgets should U-04 enforce?

A) Limit initial JavaScript to 250,000 bytes and no more than 12 percent above the 223,999-byte U-03 baseline; limit CSS to 30,720 bytes
B) Use only the existing broad project budgets of 460,800-byte JavaScript and 76,800-byte CSS
X) Other (please specify exact byte or percentage limits after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It provides practical headroom for three native React/CSS compositions while preserving a strict regression signal.

## Question 2 - Figure Delivery

How should the three existing project figures be delivered?

A) Reuse only the curated figures, preserve their recorded byte sizes, lazy-load with asynchronous decoding and intrinsic geometry, and prevent them from entering the initial viewport request set
B) Load all three figures eagerly when the portfolio opens
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. The figures total 1,251,556 bytes and are below the first viewport, so lazy delivery is appropriate.

## Question 3 - Document Delivery

How should the publication, poster, and certificate files behave?

A) Emit only the three allowlisted documents, never preload or embed them, and initiate each request only from a purpose-labeled native evidence action
B) Embed the PDFs inside their project sections for immediate reading
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. The documents total more than 11 MB and should remain explicitly user initiated.

## Question 4 - Rendered Performance

Which browser performance targets should guide the U-04 candidate?

A) At a representative mobile profile, target LCP at or below 2.5 seconds, CLS at or below 0.10, and interaction latency at or below 200 milliseconds; record an honest P1 limitation if no supported browser runner is available
B) Rely only on build size and do not define rendered performance targets
X) Other (please specify metrics and thresholds after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It keeps rendered experience measurable without misrepresenting unavailable tooling.

## Question 5 - Growth Capacity and Complexity

What deterministic growth case should selectors and relationship projections support?

A) Verify six projects with at least 36 combined method, tool, time, and evidence relationships using indexed linear passes and stable repeated-run output
B) Optimize only for the current three records and permit nested rescans
X) Other (please specify a capacity fixture after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It tests realistic doubled content without introducing infrastructure-scale requirements.

## Question 6 - Availability and Evidence Failure

How should the page behave when optional evidence is missing or a figure fails?

A) Preserve all verified project text and semantic relationships, omit only unresolved actions, replace only the failed figure with a local status, and expose deterministic findings without retry loops
B) remove the entire affected project from the page
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. Verified content remains useful independently of optional media.

## Question 7 - Static Security Boundary

Which static security controls should U-04 enforce?

A) Allow only manifest-resolved same-origin assets and approved local hash destinations; reject unsafe URL schemes, runtime request APIs, unsafe HTML, external SVG references, raw-source paths, former-owner writing, and unapproved external links
B) Permit arbitrary external links and runtime asset URLs when they simplify presentation
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It matches the portfolio's no-backend, verified-publication threat boundary.

## Question 8 - Accessibility Evidence

What accessibility acceptance level should apply?

A) Require WCAG 2.2 AA-oriented evidence for landmarks, headings, native evidence actions, visible focus, keyboard order, alternative text, non-color cues, semantic visual equivalents, reduced motion, text spacing, 200-percent zoom, and 320-pixel reflow
B) Require semantic headings and image alternative text only
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. The three information-dense structures need more than baseline semantics.

## Question 9 - Responsive and Theme Matrix

Which visual matrix should be reviewed?

A) Review 320, 768, 1280, and 1440 CSS-pixel widths in light and dark modes, including long labels, evidence wrapping, local overflow, and one-column transformations
B) Review one desktop width in light mode only
X) Other (please specify widths and themes after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It matches prior unit gates and covers the custom wide-to-linear transformations.

## Question 10 - Structural Uniqueness

How should visual uniqueness be enforced?

A) Require three recognizably different structures—computational pipeline, laboratory bench sequence, and analytical signal sheet—and reject generic project cards, repeated tiles, journal lists, invented dashboards, and relabeled copies of one layout
B) Allow one reusable project-card component for all three sections
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It fulfills the complete-redesign requirement and the approved Functional Design.

## Question 11 - Technology Stack

Which implementation stack should U-04 use?

A) Continue strict TypeScript, React 19, native semantic HTML, CSS Modules, inline passive SVG where informative, Vitest, Testing Library, and existing Vite tooling with no new runtime dependency
B) Add a charting library, carousel library, and remote content client
X) Other (please name technologies after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. Current needs are deterministic and small enough for native platform features.

## Question 12 - Ownership and Maintainability

How should U-04 preserve future change safety?

A) Keep immutable selectors, closed project-domain mappings, normalized relationship models, view-model-only components, exactly three body keys, stable purpose-based test IDs, and explicit source/boundary checks; expose only a typed empty future-note destination seam to U-07
B) Let components import canonical and journal modules directly and decide their own domain at render time
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It prevents data drift, former-owner leakage, and cross-unit coupling.

## Recommendation Summary

Option A is recommended for all twelve questions. It keeps U-04 within strict cumulative code budgets, defers 12 MB of media and documents until needed, defines measurable rendered performance, proves doubled-volume deterministic behavior, preserves text through evidence failures, enforces the static publication boundary, requires WCAG 2.2 AA-oriented evidence, and retains a dependency-free feature boundary.

## Extension Compliance

- Security Baseline: disabled; its full extension rule is not loaded. Product-specific static security requirements remain included above.
- Property-Based Testing: disabled; its full extension rule is not loaded. Deterministic table-driven, doubled-volume, and repeated-run tests remain included above.
