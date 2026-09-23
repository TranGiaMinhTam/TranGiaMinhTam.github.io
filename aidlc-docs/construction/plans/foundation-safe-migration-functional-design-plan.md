# Functional Design Plan - U-01 Foundation and Safe Migration

> **Status: Approved on 2026-09-13 using all option A decisions.**

## Purpose

Define the detailed, technology-agnostic business logic for U-01: verified portfolio content, publication eligibility, stable relationships, migration recovery, semantic foundations, accessible visualization contracts, validation outcomes, and safe failure behavior. This plan does not authorize source-code changes.

## Unit Context

- **Review boundary**: VU-07.
- **Primary stories**: ST-013, ST-016, ST-017, ST-018, ST-019, ST-020, ST-021.
- **Inputs**: Approved Inception artifacts, current verified Minh Tam content and evidence, the rejected recoverable worktree, and current size/build baselines.
- **Outputs**: Detailed domain entities, transformation rules, publication rules, recovery workflow, frontend foundation contracts, and validation scenarios.
- **Exclusions**: Visible shell and domain compositions, application-entry switching, unapproved deletion, infrastructure, backend services, analytics, CMS, and hosted forms.

## Question Category Assessment

| Category | Applicability | Reason |
| --- | --- | --- |
| Business logic modeling | Applicable | Content verification, publication selection, recovery, and validation form the unit's core workflows. |
| Domain model | Applicable | Stable IDs and relationships connect canonical content, sections, evidence, assets, and visual alternatives. |
| Business rules | Applicable | Blocking errors, safe optional omissions, prohibited sources, and publication eligibility need exact decisions. |
| Data flow | Applicable | Verified source records must transform into immutable view-model contracts without runtime persistence. |
| Integration points | Applicable | Static assets, the current portfolio source, Vite build evidence, and browser capabilities are boundaries even though no network API exists. |
| Error handling | Applicable | Missing required content, invalid relationships, optional evidence, storage limitations, and recovery verification need deterministic outcomes. |
| Business scenarios | Applicable | Conflicting facts, unpublished evidence, unsupported values, and partial asset availability are material edge cases. |
| Frontend components | Applicable | U-01 owns shared semantic and visualization contracts, but must not impose visible domain geometry. |

## Design Questions

## Question 1 - Validation Outcomes

How should content and publication validation classify findings?

A) Use deterministic `error` and `warning` findings: errors block publication for required facts, invalid relationships, prohibited content, or unsafe assets; warnings report optional omissions that can degrade safely
B) Treat every finding as a warning and allow publication to continue
C) Treat every missing optional field or asset as a blocking error
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 2 - Canonical Domain Model

How should source records and presentation data relate?

A) Keep immutable verified canonical records with stable typed IDs, then use pure selectors to derive read-only domain view models and relationship summaries
B) Store presentation-ready strings and layout metadata directly inside each future component
C) Duplicate source facts into every domain that uses them
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 3 - Provenance and Conflicting Facts

What rule should apply when current records or evidence disagree?

A) Preserve only facts supported by the approved canonical source or explicitly reviewed evidence, record provenance, and raise a blocking conflict instead of guessing
B) Prefer whichever value appears in the newest file automatically
C) Merge conflicting values into a broader statement without recording the conflict
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 4 - Evidence Publication Eligibility

When may an evidence asset appear in the active portfolio?

A) Only when a typed manifest record explicitly marks it published and includes provenance, kind, accessible text, a valid full source, and an approved loading strategy; previews remain optional
B) Publish every file currently present under the asset directories
C) Let domain components import any asset path they can resolve
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 5 - Optional Evidence Failure

What should happen when optional evidence or its preview is missing or invalid?

A) Preserve the verified textual record, omit only the unavailable action or preview, and emit a deterministic warning for validation and tests
B) Remove the entire related project, activity, or academic record
C) Show a broken placeholder and keep the action enabled
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 6 - Recovery Workflow

What functional guarantee should govern preservation of the rejected worktree?

A) Before replacement, create an explicit recoverable snapshot record covering tracked changes and relevant untracked files, verify its completeness and restoration instructions, and prohibit cleanup until the responsible later unit names exact unused targets
B) Rely on editor undo history and begin replacing files immediately
C) Delete rejected files after copying only their filenames into documentation
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 7 - Performance Baseline

How should U-01 establish the comparison baseline for the redesigned site?

A) Record reproducible build context and exact initial JavaScript, CSS, and deployable asset byte totals, while treating any failed baseline build as a blocking finding to diagnose before comparison
B) Record only the largest JavaScript filename from the current build
C) Use the approximate 893 kB JavaScript figure without producing a reproducible baseline
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 8 - Visualization Accessibility Contract

What must an informational scientific visualization provide?

A) Require a concise accessible title and description plus a paired semantic list or table derived from the same typed values; decorative graphics are separately marked non-informational
B) Require alternative text only when the visualization contains an image element
C) Allow visual-only scientific graphics when labels are visible on screen
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 9 - Shared Frontend Foundations

How much presentation behavior may U-01 shared primitives own?

A) Own semantic landmarks, accessible actions, visually hidden text, evidence behavior, tokens, and visualization semantics, while leaving all domain geometry and unique compositions to later units
B) Build a generic reusable card, timeline, and section-layout system for all later domains
C) Implement the complete visible shell and first content section inside U-01
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 10 - External Integration and Persistence

What integration boundary should U-01 enforce?

A) Keep all source, validation, evidence, and recovery logic local and deterministic with no runtime API, database, analytics, upload, or user-data persistence
B) Add a hosted content API so evidence status can be changed at runtime
C) Add browser persistence for portfolio content and evidence metadata
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Execution Checklist

### Planning and Approval

- [x] Read the approved U-01 definition, story map, requirements, Application Design, and dependency boundaries.
- [x] Evaluate every Functional Design question category for applicability.
- [x] Create context-specific questions covering domain logic, entities, rules, data flow, integrations, failures, scenarios, and frontend foundations.
- [x] Receive answers to all ten questions.
- [x] Analyze answers for ambiguity, contradictions, combined choices, and missing decision rules.
- [x] Add and resolve follow-up questions if required; all option A decisions are compatible and require none.
- [x] Record explicit approval of the completed Functional Design plan.

### Design Generation

- [x] Generate `business-logic-model.md` covering verification, selection, recovery, publication, transformation, and validation workflows.
- [x] Generate `business-rules.md` with deterministic policies, severities, constraints, and edge-case behavior.
- [x] Generate `domain-entities.md` with entities, value objects, relationships, invariants, and lifecycle states.
- [x] Generate `frontend-components.md` with shared component hierarchy, props and state, interaction flows, validation behavior, and explicit absence of backend endpoints.
- [x] Validate all four artifacts against U-01 stories, requirements, boundaries, and approved answers.
- [x] Validate Markdown, Mermaid if used, code signatures, tables, and text alternatives.
- [x] Present the completed Functional Design for explicit approval before NFR Requirements.

## Required Artifacts

- [x] `aidlc-docs/construction/foundation-safe-migration/functional-design/business-logic-model.md`
- [x] `aidlc-docs/construction/foundation-safe-migration/functional-design/business-rules.md`
- [x] `aidlc-docs/construction/foundation-safe-migration/functional-design/domain-entities.md`
- [x] `aidlc-docs/construction/foundation-safe-migration/functional-design/frontend-components.md`

## Boundary

- Approval of this plan authorizes Functional Design documentation only.
- It does not authorize code generation, package changes, asset transformation, application-entry changes, snapshot creation, cleanup, or deletion.
- Security Baseline and Property-Based Testing remain disabled in the active workflow state.
