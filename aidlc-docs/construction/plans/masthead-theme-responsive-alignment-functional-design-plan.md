# Functional Design Plan - U-02 Masthead, Theme, and Responsive Alignment

> **Status: Answers approved and design artifacts complete; awaiting explicit Functional Design review approval. This plan creates design documentation only and does not authorize application-code changes.**

## Unit Context

- **Unit**: U-02 Masthead, Theme, and Responsive Alignment.
- **Primary stories**: US-001, US-002, US-008, and US-009.
- **Primary requirements**: FR-001 through FR-003, FR-007 through FR-012; NFR-001, NFR-003 through NFR-007, and NFR-019.
- **Consumes**: Approved U-01 archive/resume capabilities and privacy boundary; the active ten-section shell, existing theme controller, current semantic relationship models, and the six supplied alignment examples.
- **Provides**: A polished responsive masthead, top action region, hidden semantic-summary contract, shared alignment rules, six corrected layouts, and a full section/viewport/theme review matrix.
- **Excludes**: Resume-led prose reconciliation, complete archive discovery, PDF/image dialogs, source conversion, and hosting changes.

## Current Brownfield Findings

- `SpecimenMasthead` and `ThemeControl` already exist, but the masthead is visually plain and the theme action currently competes with the navigation geometry.
- Relationship meaning is duplicated in visible table-like components in Identity, Research, and Academics; some of their CSS introduces horizontal scrolling.
- The six supplied defects map to active components: laboratory station flow, computational-project signal header, research-question introduction, data-story signal sheet, academic trajectory header, and evidence spectrum.
- Existing domain models already expose semantic relationship rows and counts, so U-02 can change presentation without discarding meaning or inventing content.
- Theme ownership remains in `PortfolioExperience`; U-02 changes placement and presentation, not the preference model.
- U-01 intentionally did not activate its resume action. U-02 may define and reserve the top action geometry, while U-03 owns final resume-led content integration and dual download placement.

## Question Category Assessment

- **Business logic**: Applicable to theme action semantics, semantic-summary projection, responsive variants, and candidate activation.
- **Domain model**: Applicable to masthead presentation state, action slots, hidden summaries, and layout constraints.
- **Business rules**: Applicable to action ordering, table removal, equivalent meaning, wrapping, overflow, and responsive alignment.
- **Data flow**: Applicable to existing theme state, U-01 resume capability, domain semantic rows, and layout review evidence.
- **Integration points**: Browser storage and theme state are preserved; no API or backend integration is introduced.
- **Error handling**: Missing optional action capabilities, empty summaries, storage failures, and unsupported layout features require safe behavior.
- **Business scenarios**: Desktop, tablet, 320-pixel mobile, 200-percent zoom, increased text spacing, keyboard use, and both themes are applicable.
- **Frontend components**: Applicable across the shell and six affected domain layouts.

## Design Questions

Complete every `[Answer]:` tag with one option letter. Option A is recommended.

## Question 1 - Masthead Composition

How should the redesigned masthead organize identity, scientific context, status, and actions?

A) Use a responsive scientific identity panel with identity anchored first, a concise discipline/context line, restrained specimen-grid marks, status near the identity block, and a dedicated upper-right action cluster that remains visually subordinate to the name
B) Keep the current three widely separated text columns and only add a background tint
C) Replace the masthead with a centered hero banner and large decorative illustration
X) Other (describe after the answer tag)

[Answer]: A

## Question 2 - Top Action Placement

How should the theme and resume actions occupy the top of the page?

A) Put the theme control at the masthead's upper-right edge and define an adjacent wrap-safe resume-action slot; the theme control is active in U-02, while U-03 supplies the final verified resume action without changing the geometry
B) Put both controls inside the sticky section navigation
C) Keep the theme control below the masthead and place the resume action only in Identity
X) Other (describe after the answer tag)

[Answer]: A

## Question 3 - Theme Control Presentation

What should the relocated theme control communicate?

A) Use a compact labelled action that announces the next theme, retains the existing explicit-preference behavior, exposes visible focus, and uses iconography only as a supplement to text
B) Use an icon-only control whose meaning depends on the current fill color
C) Replace the two-state action with a new multi-theme selector
X) Other (describe after the answer tag)

[Answer]: A

## Question 4 - Scientific Header Treatment

How decorative should the less-plain masthead become?

A) Use a restrained accent-tinted surface, fine grid/specimen marks, one stronger rule, and deliberate typography; decorations remain non-semantic, low-contrast enough not to distract, and removable under forced-colors or reduced-motion constraints
B) Use animated molecular particles and parallax effects behind the name
C) Use a flat solid rectangle with no scientific detail
X) Other (describe after the answer tag)

[Answer]: A

## Question 5 - Visible Relationship Tables

How should the visible tables identified by the user be removed while preserving their meaning?

A) Remove them from sighted layout entirely and project their existing reviewed rows/counts into one reusable `SemanticSummary` rendered with a robust visually-hidden pattern; visual diagrams keep concise captions without duplicating the full row set
B) Collapse each table behind a visible disclosure button
C) Delete both the tables and their semantic relationship content
X) Other (describe after the answer tag)

[Answer]: A

## Question 6 - Empty or Invalid Semantic Summaries

How should the hidden-summary contract handle missing or invalid relationships?

A) Render nothing for an intentionally empty reviewed summary, but treat broken endpoints, duplicate identifiers, or missing required labels as upstream blocking findings rather than silently emitting misleading text
B) Generate generic relationship prose when source rows are incomplete
C) Render an empty hidden table in every section regardless of available meaning
X) Other (describe after the answer tag)

[Answer]: A

## Question 7 - Six Alignment Defects

What common layout strategy should govern the six supplied problem areas?

A) Give each component an explicit bounded grid with `minmax(0, ...)`, shared alignment tokens, predictable label/content columns, and a single logical source order that collapses below its component-specific breakpoint without absolute positioning
B) Fix each screenshot independently using hard-coded pixel offsets
C) Force all six components into the same equal-column grid at every width
X) Other (describe after the answer tag)

[Answer]: A

## Question 8 - Heading and Label Wrapping

How should awkward single-word fragments and oversized gaps be prevented?

A) Use content-aware maximum measures, balanced heading wrapping where supported, controlled label widths, and natural wrapping fallbacks; never alter factual wording merely to fit a layout
B) Insert manual line breaks at the current desktop screenshot positions
C) Reduce all heading text until it remains on one line
X) Other (describe after the answer tag)

[Answer]: A

## Question 9 - Responsive Masthead Order

How should masthead content reflow at tablet/mobile width and high zoom?

A) Preserve DOM order as identity, context/status, then actions; collapse to one column when space is constrained, keep actions near the top without overlay, and allow labels to wrap without horizontal document overflow
B) Keep the desktop grid and allow horizontal scrolling on mobile
C) hide status and context below 768 pixels
X) Other (describe after the answer tag)

[Answer]: A

## Question 10 - Full Alignment Audit

What must be included in U-02's rendered review matrix?

A) Review all ten active sections at 320, 768, 1280, and 1440 CSS pixels in both themes, plus representative 200-percent zoom and increased-text-spacing checks; record named evidence for the six supplied defects and document-level overflow
B) Review only the six supplied crops at desktop width
C) Review the masthead at mobile and desktop and defer all section checks
X) Other (describe after the answer tag)

[Answer]: A

## Question 11 - Motion, Focus, and Forced Colors

How should interaction styling adapt to accessibility preferences?

A) Keep theme and navigation focus clearly visible; limit decoration transitions to non-essential properties, remove them under reduced motion, and preserve structure/controls under forced colors without depending on background imagery
B) Retain all transitions and decorative backgrounds because they do not change content
C) Remove every hover, focus, and transition treatment
X) Other (describe after the answer tag)

[Answer]: A

## Question 12 - Functional Property Tests

Which U-02 business invariants should receive property-based coverage under the enabled full PBT extension?

A) Test semantic-summary membership/order preservation and deterministic responsive-variant selection across constrained domain inputs; keep concrete DOM/accessibility and supplied-defect checks as example/rendered tests, with PBT-06 N/A because no stateful business model is introduced
B) Use randomized CSS strings and screenshot dimensions without domain generators
C) Mark all PBT rules N/A because the unit is primarily visual
X) Other (describe after the answer tag)

[Answer]: A

## Question 13 - Candidate Activation Gate

What must pass before these visible changes replace the active presentation?

A) Require focused logic/component/style tests, full regression tests, strict TypeScript, lint, both-theme rendered review, the complete viewport/zoom/text-spacing matrix, bundle and overflow checks, privacy/source-boundary verification, and explicit candidate approval before activation
B) Activate after unit tests and collect screenshots afterward
C) Activate the masthead immediately and review the six layout fixes later
X) Other (describe after the answer tag)

[Answer]: A

## Execution Checklist

### Planning and Approval

- [x] Read the approved U-02 unit definition, story map, requirements, Application Design, dependency sequence, active shell/domain code, enabled Security Baseline, and full PBT rules.
- [x] Evaluate every Functional Design question category for applicability.
- [x] Create context-specific questions covering masthead composition, top actions, theme semantics, hidden summaries, six alignment defects, responsive behavior, accessibility, properties, failures, and activation.
- [x] Receive answers to all thirteen questions.
- [x] Analyze every answer for ambiguity, contradictions, combined choices, and missing decision rules.
- [x] Add and resolve clarification questions if required; none were required because all Option A decisions are complete and mutually compatible.
- [x] Obtain explicit approval of the completed U-02 Functional Design plan.

### Design Generation

- [x] Generate `business-logic-model.md` for masthead composition, action placement, theme flow, semantic-summary projection, responsive variant selection, and candidate activation.
- [x] Generate `business-rules.md` for accessibility, semantic equivalence, grid/reflow, heading wrapping, overflow prevention, empty/error behavior, and review gates.
- [x] Generate `domain-entities.md` for masthead presentation, action slots, semantic summaries, alignment contracts, responsive variants, and review evidence.
- [x] Generate `frontend-components.md` for the masthead, theme action, semantic summary, and six affected layout component contracts.
- [x] Define U-02 property candidates and Security/PBT applicability with explicit N/A rationale where appropriate.
- [x] Validate all Markdown, signatures, diagrams if any, and text alternatives before writing.
- [x] Present the standardized Functional Design completion gate and wait for explicit approval.

## Required Artifacts

- `aidlc-docs/construction/masthead-theme-responsive-alignment/functional-design/business-logic-model.md`
- `aidlc-docs/construction/masthead-theme-responsive-alignment/functional-design/business-rules.md`
- `aidlc-docs/construction/masthead-theme-responsive-alignment/functional-design/domain-entities.md`
- `aidlc-docs/construction/masthead-theme-responsive-alignment/functional-design/frontend-components.md`

## Extension Applicability

- The Security Baseline remains enabled. SECURITY-09, SECURITY-11, and SECURITY-15 are applicable to safe visitor-facing failures, misuse-resistant action/source boundaries, and fail-closed activation. Hosting, API, IAM, authentication, persistence, and server-monitoring rules are N/A for this unit; dependency controls remain unchanged because Functional Design adds no package.
- Full Property-Based Testing remains enabled. PBT-01 is enforced during this stage. PBT-02 through PBT-05, PBT-07, PBT-08, and PBT-10 are applicable to the identified pure projections and selection rules. PBT-06 is expected to be N/A because U-02 introduces no mutable stateful business component. PBT-09 remains satisfied by U-01's approved `fast-check` selection.

## Boundary

Approval authorizes generation of Functional Design documentation only. It does not authorize React/CSS changes, action activation, dependency changes, source deletion, archive UI, media dialogs, or deployment.
