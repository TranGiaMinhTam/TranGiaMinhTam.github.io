# Functional Design Plan - U-03 Identity and Questions

> **Status: Generated; awaiting explicit Functional Design artifact approval. All twelve recommended option A decisions were approved.**

## Purpose

Define the detailed content-selection, relationship-model, presentation, action, fallback, and shell-integration behavior for the first two finished portfolio domains: Research Identity and Questions I Explore. This stage produces design documentation only and does not authorize U-03 source generation.

## Unit Context

- **Review boundary**: VU-02.
- **Primary stories**: ST-001, ST-004, and ST-014.
- **Requirements**: FR-004, FR-005, FR-013, FR-017 resume publication, plus inherited accessibility, performance, responsive, integrity, resilience, and maintainability safeguards.
- **Consumes**: U-01 verified content, evidence manifest, relationship/visualization contracts, semantic actions, and U-02 registered slots, navigation, progress, and theme system.
- **Provides**: Review-ready Research Identity and Questions I Explore sections, a verified portrait relationship, a truthful document action, and an accessible discipline-question relationship visual.
- **Exclusions**: Research-project detail, laboratory research, data stories, academic trajectory, evidence library, tools, fieldwork, contact, journal detail, fabricated findings, new dependencies, backend services, and shell restructuring.

## Question Category Assessment

| Category | Applicability | Reason |
| --- | --- | --- |
| Business logic modeling | Applicable | Verified identity, question classification, relationship mapping, actions, and fallback decisions require deterministic selection logic. |
| Domain model | Applicable | Identity, portrait, publication action, research question, discipline, and relationship view models require precise ownership. |
| Business rules | Applicable | Interest-versus-outcome language, evidence labels, publication status, and no-fabrication constraints are blocking rules. |
| Data flow | Applicable | U-01 records and evidence must flow through selectors into U-03 view models and shell slots without direct legacy-data coupling. |
| Integration points | Applicable | U-03 integrates with the U-02 slot/navigation seam and browser-native document download only; no external runtime API applies. |
| Error handling | Applicable | Missing optional portrait rendering, missing required published document, broken relationship references, and absent questions need explicit outcomes. |
| Business scenarios | Applicable | First arrival, direct question navigation, keyboard actions, image failure, reduced motion, and narrow viewport behavior affect review quality. |
| Frontend components | Applicable | U-03 owns two distinct, custom, content-rich section compositions and an accessible relationship visualization. |

## Design Questions

## Question 1 - First-Viewport Identity Composition

Which structure should replace the temporary Research Identity slot?

A) Use an asymmetric scientific specimen field with oversized identity typography, an integrated portrait aperture, a horizontal metadata sequence, and two direct actions; avoid a boxed hero or profile card
B) Use a conventional centered hero with a circular portrait above the name and buttons
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 2 - Scientific Direction Copy

How should the identity section communicate scientific focus?

A) Preserve the verified role and summary, then derive a clearly labelled “currently exploring” line from supported molecular science, data-driven research, public health, and sustainability interests without presenting them as findings
B) Display only the existing role and summary and omit a distinct scientific-direction line
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 3 - Portrait Treatment and Fallback

How should the approved portrait behave?

A) Present it as a meaningful editorial figure inside a microscopy-inspired aperture with accurate alternative text and a text-first fallback that preserves the complete identity if the image cannot render
B) Present it as an ordinary rectangular photograph with no integrated scientific treatment
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 4 - Published Document Action

The approved local document is an academic transcript rather than a separate résumé file. How should the action remain truthful?

A) Label the action “Download academic record,” use the approved manifest document and filename, and describe it accurately; do not call the transcript a résumé in visible copy
B) Label the transcript “Download résumé” to match the story shorthand even though no distinct résumé file is supplied
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 5 - Primary Navigation Action

What should accompany the document action in the first viewport?

A) Provide a native “Explore research questions” action targeting `#questions`, using the existing U-02 navigation contract and reduced-motion behavior
B) Provide only the document action and rely on the global locus navigator for questions
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 6 - Interest Classification

How should the identity section distinguish interests from demonstrated work?

A) Render a typographic discipline spectrum labelled “Fields in exploration,” with every term sourced from approved content and explicitly separate from completed-project or methods language
B) Present the interests as generic skill badges without a status label
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 7 - Research Question Content

Which question text should appear in Questions I Explore?

A) Use the three verified questions already associated with molecular docking, cashew testa sustainability, and retail data analytics, preserving their exploratory wording and never adding results
B) Rewrite the questions into broader aspirational topics even when the new wording is not present in the verified source
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 8 - Relationship Visualization

How should questions connect to their disciplines without becoming a repeated-card grid?

A) Use a lightweight SVG/CSS constellation with questions as labelled loci and disciplines as shared coordinates, paired with an adjacent semantic relationship list or table containing identical information
B) Use a plain repeated tile for every question and list its discipline inside the tile
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 9 - Visualization Interaction

How interactive should the discipline-question relationship be?

A) Keep all information present; use only focus/hover emphasis to trace one question’s connections, honor reduced motion, and require no filtering state
B) Hide relationships until the visitor selects filters or opens individual items
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 10 - Shell Integration

How should U-03 replace the two temporary slot bodies?

A) Add a typed slot-body resolver owned by the shell seam, supply U-03 components for `identity` and `questions`, and leave the other eight temporary bodies and all U-02 navigation geometry unchanged
B) Hard-code the new identity and question markup directly inside `ObservatoryShell`
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 11 - Missing Content and Evidence

What should block U-03 acceptance?

A) Let an unavailable portrait degrade to complete text identity, but treat a missing published academic record, identity record, verified question, or relationship target as a blocking validation error with no fabricated replacement
B) Silently omit any missing identity, question, relationship, or document data and publish the remaining layout
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 12 - Responsive Composition

How should the two sections adapt without resembling the former layout?

A) Preserve desktop asymmetry and relationship geometry, then transform to a single editorial reading sequence on phones with locally wrapping actions and a vertically readable relationship alternative; never introduce a sidebar, drawer, or stack of generic cards
B) Collapse both sections into conventional centered mobile cards
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Execution Checklist

### Planning and Approval

- [x] Read the approved U-03 definition, story map, requirements, Application Design components, selectors, service boundaries, and U-01/U-02 contracts.
- [x] Inspect the verified identity record, three verified question records, portrait evidence, and available academic document.
- [x] Evaluate all Functional Design question categories for applicability.
- [x] Create context-specific questions covering composition, copy, classification, portrait, actions, relationship visualization, interaction, shell integration, failure behavior, and responsiveness.
- [x] Receive answers to all twelve questions.
- [x] Analyze every answer for ambiguity, contradiction, combined choices, unsupported claims, or missing decision rules.
- [x] Add and resolve follow-up questions if required; none were required because all recommended A choices are mutually consistent.
- [x] Record explicit approval of the completed U-03 Functional Design plan.

### Design Generation

- [x] Generate `business-logic-model.md` for verified selection, identity assembly, question/discipline mapping, actions, fallbacks, and slot replacement.
- [x] Generate `business-rules.md` with content-integrity, evidence, classification, accessibility, relationship, responsive, and failure policies.
- [x] Generate `domain-entities.md` for identity, portrait, document action, scientific direction, discipline, question, relationship, and section view models.
- [x] Generate `frontend-components.md` with the unique two-section hierarchy, props, state, interactions, semantic alternative, responsive behavior, and no backend endpoints.
- [x] Validate all four artifacts against ST-001, ST-004, ST-014, FR-004, FR-005, FR-013, FR-017, and inherited safeguards.
- [x] Validate Markdown, diagrams, tables, code signatures, text alternatives, and nonempty content before writing.
- [x] Present the completed U-03 Functional Design for explicit approval before NFR Requirements.

## Required Artifacts

- [x] `aidlc-docs/construction/identity-questions/functional-design/business-logic-model.md`
- [x] `aidlc-docs/construction/identity-questions/functional-design/business-rules.md`
- [x] `aidlc-docs/construction/identity-questions/functional-design/domain-entities.md`
- [x] `aidlc-docs/construction/identity-questions/functional-design/frontend-components.md`

## Boundary

- Approval of this answered plan authorizes Functional Design documentation only.
- It does not authorize U-03 source generation, content rewriting beyond verified meaning, raw-asset publication, dependency mutation, shell restructuring, or later-domain work.
- Security Baseline and Property-Based Testing remain disabled in the active workflow state.
