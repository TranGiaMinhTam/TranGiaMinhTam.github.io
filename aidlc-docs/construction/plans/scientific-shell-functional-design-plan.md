# Functional Design Plan - U-02 Scientific Shell

> **Status: Generated and awaiting explicit review approval. All option A decisions were used.**

## Purpose

Define the detailed behavior and component contracts for the entirely new visible application shell: continuous-page composition, compact non-sidebar navigation, scientific progress, safe hashes, theme control, responsive behavior, and the later plan-controlled active-entry switch. This plan creates design documentation only and does not authorize source-code changes.

## Unit Context

- **Review boundary**: VU-01.
- **Primary stories**: ST-002 and ST-003.
- **Requirements**: FR-002, FR-003, FR-015, FR-016, plus inherited NFR-001 through NFR-006.
- **Consumes**: Approved U-01 section registry, semantic tokens, validation contracts, semantic primitives, boundary tooling, and performance baseline.
- **Provides**: `PortfolioExperience`, a unique non-sidebar observatory shell, ten ordered composition slots, compact navigation, section progress, safe hash behavior, and root theme control.
- **Exclusions**: Final domain content, journal detail, evidence galleries, generic cards, sidebars, drawers, layout selectors, casebook/notebook/Quarto chrome, backend services, and dependency changes.

## Question Category Assessment

| Category | Applicability | Reason |
| --- | --- | --- |
| Business logic modeling | Applicable | Navigation, progress, hash restoration, and theme decisions form coordinated browser workflows. |
| Domain model | Applicable | Shell state connects stable section definitions, navigation state, progress, theme, and capability status. |
| Business rules | Applicable | Valid hashes, active-section precedence, storage failure, reduced motion, and entry-switch safety require deterministic policies. |
| Data flow | Applicable | Registry definitions flow into landmarks, navigation actions, progress, and history without duplicating content facts. |
| Integration points | Applicable | Browser history, IntersectionObserver, matchMedia, localStorage, and the React entry are controlled boundaries. |
| Error handling | Applicable | Unsupported observers, invalid hashes, unavailable storage, and missing section targets require fallbacks. |
| Business scenarios | Applicable | Direct links, back/forward navigation, rapid scrolling, small screens, and theme changes are central scenarios. |
| Frontend components | Applicable | U-02 owns the complete visible shell and its responsive interaction structure. |

## Design Questions

## Question 1 - Distinct Shell Composition

Which visible shell structure should replace the current template and sidebar architecture?

A) Use a full-width bioinformatics observatory: a slim specimen/status masthead, a compact horizontal locus navigator, a continuous main scan field, and a restrained terminal footer, with no persistent side column
B) Use a conventional centered portfolio header followed by repeated boxed sections
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 2 - Compact Navigation

How should the ten-domain navigation behave across viewports?

A) Present a desktop horizontal coordinate track with abbreviated domain labels and a mobile scrollable locus strip; keep every item directly reachable without a drawer or hamburger menu
B) Use a traditional desktop link row that becomes a hamburger drawer on mobile
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 3 - Section Composition Slots

How should U-02 represent domains that later units have not yet implemented?

A) Render all ten semantic section targets in registry order using restrained, explicitly temporary scientific slot markers; later units replace each slot body without changing shell geometry or hashes
B) Render only completed sections and add navigation targets incrementally
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 4 - Progress Representation

How should progress communicate the visitor's current location?

A) Use a thin genome-coordinate style track with a moving locus marker, persistent current section name, and textual “section N of 10” status so meaning never depends on color or position alone
B) Use only a percentage bar without section names or ordinal text
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 5 - Hash and History Policy

What should happen for direct links, navigation actions, and invalid hashes?

A) Restore valid section hashes after targets exist, use pushState for deliberate navigation and replaceState for passive scroll synchronization, preserve back/forward behavior, and fall back to Identity without creating an invalid-hash loop
B) Ignore incoming hashes and update the URL only after scrolling
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 6 - Active Section and Observer Fallback

How should the shell determine the active section?

A) Use one IntersectionObserver with deterministic tie-breaking and a throttled geometry fallback when the observer is unavailable; deliberate keyboard/click navigation temporarily takes precedence to avoid marker oscillation
B) Attach independent scroll listeners to every section and accept whichever event runs last
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 7 - Theme Control

How should light and dark mode be initialized and persisted?

A) Use one root `data-theme` attribute, prefer a valid stored choice, otherwise use system preference, and fall back deterministically to light when storage or matchMedia is unavailable; storage failures never block toggling
B) Maintain separate light and dark component trees and require storage before changing mode
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 8 - Keyboard and Landmark Flow

Which accessibility structure should the shell enforce?

A) Provide a focus-revealed skip link, named primary navigation, one main landmark, ordered labelled section regions, a non-live visual progress track with a concise polite textual status, visible focus, and a semantic footer
B) Depend on visual section labels and browser tab order without a skip link or named landmarks
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 9 - Active Entry Migration

What must be true before switching the live application to the new shell?

A) Require passing focused shell tests, U-01 boundary/recovery checks, both theme states, phone/desktop review, valid ten-section hashes, and post-build measurement; then replace the active entry composition without importing rejected template modules
B) Switch the entry first and repair shell regressions afterward
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 10 - Responsive Geometry

How should the shell preserve uniqueness and usability from 320 CSS pixels through wide desktop?

A) Use fluid full-width bands, bounded reading measures only inside domain slots, a scrollable navigation coordinate strip, wrap-safe controls, and progressive whitespace changes without introducing a sidebar, drawer, or repeated container-card frame
B) Recreate the current desktop sidebar above the content on small screens
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Execution Checklist

### Planning and Approval

- [x] Read the approved U-02 definition, story map, requirements, Application Design components, service boundaries, and dependency sequence.
- [x] Evaluate every Functional Design question category for applicability.
- [x] Create context-specific questions covering shell logic, state, data flow, browser integrations, failures, scenarios, migration, and visible structure.
- [x] Receive answers to all ten questions.
- [x] Analyze every answer for ambiguity, contradictions, combined choices, and missing decision rules.
- [x] Add and resolve follow-up questions if required; the ten option A decisions are complete and compatible.
- [x] Record explicit approval of the completed U-02 Functional Design plan.

### Design Generation

- [x] Generate `business-logic-model.md` for navigation, progress, hashes, theme, fallbacks, and safe entry migration.
- [x] Generate `business-rules.md` with deterministic shell policies, constraints, validation, and edge cases.
- [x] Generate `domain-entities.md` for shell state, navigation intent, progress, theme preference, capability status, and section slots.
- [x] Generate `frontend-components.md` with the unique visible hierarchy, props, state, interaction flows, responsive contracts, and no backend endpoints.
- [x] Validate all four artifacts against ST-002, ST-003, FR-002, FR-003, FR-015, FR-016, and inherited U-01 safeguards.
- [x] Validate Markdown, Mermaid diagrams, code signatures, tables, and text alternatives before writing.
- [x] Present the completed U-02 Functional Design for explicit approval before NFR Requirements.

## Required Artifacts

- [x] `aidlc-docs/construction/scientific-shell/functional-design/business-logic-model.md`
- [x] `aidlc-docs/construction/scientific-shell/functional-design/business-rules.md`
- [x] `aidlc-docs/construction/scientific-shell/functional-design/domain-entities.md`
- [x] `aidlc-docs/construction/scientific-shell/functional-design/frontend-components.md`

## Boundary

- Approval of this plan authorizes Functional Design documentation only.
- It does not authorize shell source generation, active-entry changes, deletion, dependency changes, or changes to later domain units.
- Security Baseline and Property-Based Testing remain disabled in the active workflow state.
