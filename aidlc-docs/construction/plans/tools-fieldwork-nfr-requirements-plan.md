# NFR Requirements Plan - U-06 Tools and Fieldwork

> **Status: NFR Requirements and technology decisions complete, awaiting explicit approval. No U-06 application source has been generated.**

## Baseline and Scope

- Active U-05 production baseline: 268,491 bytes initial JavaScript and 42,005 bytes initial CSS.
- U-06 has zero eligible evidence assets today (no PDF or image); `evidenceManifest.ts` contains no tool, fieldwork, or leadership entry.
- U-06 adds two body registrations but no API, database, authentication, analytics, runtime document processor, external content fetch, or deployment service.
- The package-lock SHA-256 remains `db382652e91d7bd4ab3c154cf79d53b6b26ecb4430efe5961273572ce25b9bb1`.
- Security Baseline and Property-Based Testing extensions remain disabled in the approved workflow state.

## Assessment Steps

- [x] Read the approved U-06 Functional Design artifacts and decisions.
- [x] Inspect the active production baseline, the empty U-06 evidence surface, the shell registry seam, and inherited U-01 through U-05 safeguards.
- [x] Evaluate scalability, performance, availability, security, technology, reliability, maintainability, usability, accessibility, responsive behavior, and visual-review ambiguity.
- [x] Create twelve mutually exclusive A/B/X questions with measurable recommended options.
- [x] Receive complete answers to Questions 1 through 12.
- [x] Resolve every ambiguous response or add focused clarification questions. The instruction to proceed with all recommended options made every answer explicit and consistent.
- [x] Generate `nfr-requirements.md`.
- [x] Generate `tech-stack-decisions.md`.
- [x] Validate thresholds, requirement identifiers, traceability, tables, parsing compatibility, and whitespace.
- [x] Update plan checkboxes, state, README, and append-only audit.
- [x] Present the standardized U-06 NFR Requirements completion message and wait for explicit approval.

## Question 1 - Cumulative Code Budgets

What cumulative production budgets should U-06 enforce, given it adds only text- and link-based presentation with no new media?

A) Limit initial JavaScript to 285,000 bytes and no more than 8 percent above the 268,491-byte U-05 baseline; limit initial CSS to 46,080 bytes
B) Use only the broad project budgets of 460,800-byte JavaScript and 76,800-byte CSS
X) Other (please specify exact byte or percentage limits after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. Two text/link-only bodies need little room; a tight cumulative regression signal keeps growth honest.

## Question 2 - Evidence Asset Behavior

U-06 has no eligible evidence asset today. How should the unit be specified for this state and for any future addition?

A) Require zero evidence requests, zero embedded/preloaded assets, and zero evidence actions in the current build; if a future plan-approved manifest entry adds one, it must use the existing on-demand PDF or lazy-image behavior with no new loading strategy
B) Add placeholder evidence assets now so the section "looks complete"
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. Honest absence is correct; inventing placeholder evidence would violate ST-013's trust obligation.

## Question 3 - Rendered Performance

Which browser performance targets should guide the U-06 candidate?

A) At a representative mobile profile, target LCP at or below 2.5 seconds, CLS at or below 0.10, and interaction latency at or below 200 milliseconds; record an honest P1 limitation if no supported browser runner is available
B) Record bundle size only and define no rendered performance targets
X) Other (please specify metrics and thresholds after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. Consistent with U-02 through U-05; text-only bodies should comfortably meet these targets.

## Question 4 - Growth Capacity and Complexity

What deterministic growth case should the tools and activity selectors support?

A) Verify thirty-two tool records across eight categories and eight fieldwork/leadership records across the two kinds using indexed linear passes and stable repeated-run output, doubling the current sixteen-tool and four-activity volume
B) Optimize only for the current sixteen tools and four activity records and permit nested rescans
X) Other (please specify a capacity fixture after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. Consistent with the doubled-volume pattern used in U-04 and U-05; keeps selectors provably linear without over-engineering for infrastructure scale.

## Question 5 - Availability and Local Failure

How should the unit behave when a tool has no Tool Linking Table entry, or when a linked context target no longer exists?

A) Reject assembly with a stable finding for an unmapped tool; for a linked context that no longer resolves, omit only that context link with a finding while keeping the tool's verified facts and classification visible
B) Silently default an unmapped tool to "interest" and drop a broken link with no finding
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. Silent defaults would hide a functional-design gap; a finding keeps the closed-table invariant enforceable.

## Question 6 - Static Security and Privacy Boundary

Which controls should protect the U-06 surface, given it currently emits no evidence asset at all?

A) Allow no external network request, unsafe URL scheme, unsafe HTML, or external SVG reference; require every in-page context link to target only an existing same-origin section anchor; require any future evidence action to reuse the existing manifest-resolved same-origin rule from U-04/U-05
B) Allow arbitrary external links if they improve context descriptions
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. Keeps U-06 within the same static-only, same-origin boundary as every prior unit.

## Question 7 - Accessibility Acceptance

What accessibility evidence should block U-06 acceptance?

A) Require WCAG 2.2 AA-oriented evidence for headings, landmarks, classification and group labeling, native context links, visible focus, keyboard order, non-color demonstrated/interest and Fieldwork/Leadership cues, semantic summary equivalence, text spacing, 200-percent zoom, reduced motion, and 320-pixel reflow
B) Require headings only
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. Matches the accessibility bar already required and met by U-02 through U-05.

## Question 8 - Responsive and Theme Matrix

Which visual matrix should be reviewed before activation?

A) Review 320, 768, 1280, and 1440 CSS-pixel widths in light and dark modes, including category/group stacking, long description text, classification markers, context-link wrapping, text spacing, zoom, and no document-level overflow
B) Review one desktop width in light mode only
X) Other (please specify widths and themes after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. Matches the established project breakpoint and theme matrix.

## Question 9 - Structural Uniqueness

How should candidate review enforce the approved redesign?

A) Require a recognizable relationship-based capability map and a two-group kind-based activity layout; reject proficiency matrices, star/bar ratings, activity logs, chronological timelines, ledgers, and relabeled copies of completed-unit layouts
B) Allow existing skill-matrix or activity-log components to be restyled for speed
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. Preserves the complete-redesign requirement and the approved Functional Design.

## Question 10 - Technology Stack

Which implementation stack should U-06 use?

A) Continue strict TypeScript, React 19, native semantic HTML, CSS Modules, passive inline SVG only when useful, Vitest, Testing Library, and existing Vite tooling with no new runtime dependency
B) Add a rating/gauge component library or a timeline framework
X) Other (please name technologies after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. Text, native links, and CSS layout need no additional runtime package.

## Question 11 - Ownership and Maintainability

How should U-06 preserve change safety?

A) Keep immutable selectors, the closed Tool Linking Table, normalized relationships and groups, view-model-only components, exactly two body keys, stable purpose-based test IDs, explicit boundary checks, and a candidate-before-activation gate
B) Let components import `src/data/skills.ts` and `src/data/experience.ts` directly and classify records during rendering
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. Keeps source truth, classification policy, presentation, and activation independently testable, consistent with U-04/U-05.

## Question 12 - Legacy File Boundary

`src/data/awards.ts`, `src/data/gallery.ts`, `src/data/videos.ts`, and `src/components/Awards.tsx` are unreferenced legacy files outside the active shell. How should U-06 treat them?

A) Leave them untouched; U-06 does not read, import, adopt, or delete them, and boundary checks confirm no U-06 source references them
B) Delete them now as part of U-06 since they are unused
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. Removing unrelated legacy files is outside U-06's approved scope and stories; a separate, explicitly approved cleanup unit or step would be needed first.

## Recommendation Summary

Option A is recommended for all twelve questions. It keeps U-06 under a tight cumulative code budget, keeps the currently empty evidence surface honest rather than inventing placeholders, defines measurable rendered performance, proves doubled-volume linear behavior, turns silent defaults into visible findings, enforces the same static/same-origin security boundary as prior units, requires WCAG 2.2 AA-oriented evidence, preserves structural uniqueness, adds no dependency, and leaves unrelated legacy files untouched.

## Extension Compliance

- **Security Baseline**: Disabled; its full extension rule is not loaded. Product-specific static security requirements remain included above.
- **Property-Based Testing**: Disabled; its full extension rule is not loaded. Deterministic table-driven, doubled-volume, and repeated-run tests remain included above.
