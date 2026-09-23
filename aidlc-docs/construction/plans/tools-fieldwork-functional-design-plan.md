# Functional Design Plan - U-06 Tools and Fieldwork

> **Status: Functional Design artifacts complete and awaiting explicit approval. No U-06 application source has been generated.**

## Unit Context

- **Unit**: U-06 Tools and Fieldwork
- **Review boundary**: VU-05
- **Primary stories**: ST-011 and ST-012
- **Primary requirements**: FR-011 and FR-012
- **Inherited obligations**: ST-013 and ST-016 through ST-021
- **Prerequisites**: U-01 through U-05 are approved
- **Owned domains**: Tools and Fieldwork and Leadership
- **Owned source boundary**: future `src/portfolio/impact/`, tools/fieldwork selectors and visual transforms, impact-specific styles, focused tests, and plan-approved supporting evidence relationships
- **Excluded domains**: contact, journal detail, infrastructure, deployment, and runtime raw-document processing

## Verified Source Assessment

> **Correction**: The initial draft of this section wrongly named `src/data/awards.ts`, `src/data/gallery.ts`, and `src/data/videos.ts` as U-06 sources. Those files, and `src/components/Awards.tsx`, are unreferenced legacy artifacts outside the active `PortfolioExperience` shell and are **not** part of U-06's consumed or owned boundary. The corrected assessment below reflects the actual U-01 model.

- The already-approved `src/portfolio/model/verifiedPortfolioSource.ts` already parses `src/data/skills.ts` into 16 `tool`-kind `ContentRecord`s (4 categories x 4 skills: Academic, Research & Data, Laboratory, Languages & Interests) and `src/data/experience.ts` into 4 `ContentRecord`s classified as 1 `fieldwork` (Volunteer & Conservation Participant, Nui Chua and Nam Cat Tien National Parks, Jun 2024-Jun 2025) and 3 `leadership` (Deputy Head at The Institute of Viéce, Kyoto SDGs Youth Summit Student Delegate, Free IGCSE Mathematics Mentor). `SectionId` already reserves `tools` and `fieldwork-leadership`, and `ContentKind` already reserves `tool`, `fieldwork`, `leadership`. U-06 consumes this existing model rather than parsing new legacy files.
- No numeric skill ratings, endorsements, or invented proficiency levels exist in the verified source; ST-011 explicitly forbids inventing them.
- None of the 16 tool records or 4 fieldwork/leadership records currently carry an `evidenceIds` entry in `verifiedPortfolioSource.ts`, and `evidenceManifest.ts` contains only the ten U-05-eligible items. U-06 therefore has no approved evidence assets today; every tool and fieldwork/leadership record renders without an evidence action unless a future plan-approved manifest addition changes this.
- A tool's link to a demonstrated context (a specific U-04 research body or U-05 academic record) must come from a closed, source-reviewed mapping table decided in this functional design, not from runtime label matching or inference.
- No LinkedIn, resume, or CV asset is in scope here; this remains excluded per U-06 unit definition.

## Design Steps

- [x] Read the U-06 unit definition, story map, ST-011, ST-012, FR-011, FR-012, and inherited cross-cutting obligations.
- [x] Inspect verified skills, awards, gallery, and video source data; U-04 and U-05 evidence/composition to avoid duplication; and excluded-source boundaries.
- [x] Identify categorization, relationship, evidence-reuse, layout, interaction, failure, semantic, and responsive decisions requiring confirmation.
- [x] Create mutually exclusive A/B/X questions with recommended decisions and explicit constraints.
- [x] Receive complete answers to all questions.
- [x] Resolve every ambiguity or add focused clarification questions. Question 3 was withdrawn as based on an incorrect premise (no award/gallery overlap exists in the verified model); Question 2 was corrected to a two-group-by-kind structure matching the real 1-fieldwork/3-leadership record count; all other answers were explicit and consistent.
- [x] Generate `business-logic-model.md`.
- [x] Generate `business-rules.md`.
- [x] Generate `domain-entities.md`.
- [x] Generate `frontend-components.md`.
- [x] Validate artifact structure, tables, identifiers, parsing compatibility, and whitespace.
- [x] Update state, README, plan checkboxes, and append-only audit.
- [x] Present the standardized U-06 Functional Design completion message and wait for explicit approval.

## Question 1 - Tools Composition

Which custom structure should present demonstrated tools and capabilities, given the current matrix/grid is rejected by ST-011?

A) A relationship-based capability map: category clusters (Academic, Research & Data, Laboratory, Languages & Interests) where each tool links to the specific U-04/U-05 body or evidence item that demonstrates it, with unlinked entries labeled as an interest rather than a demonstrated skill
B) A flat tag cloud of all skill labels with no per-tool linkage
X) Other (please describe after the [Answer]: tag)

[Answer]: A

## Question 2 - Fieldwork and Leadership Composition (corrected)

The verified source is 1 `fieldwork` record (conservation volunteering) and 3 `leadership` records (editorial deputy-head role, summit delegate, mathematics mentor) — not a themed set large enough for per-theme grouping. Which structure should present them, given the current activity log/timeline/ledger is rejected by ST-012?

A) Two labeled groups by verified kind (Fieldwork; Leadership), each rendering role, organization, exact period, and the verified description points in full, with no chronological rail and no evidence action where none exists
B) A single reverse-chronological list identical in shape to the rejected activity log, restyled
X) Other (please describe after the [Answer]: tag)

[Answer]: A

## Question 3 - Evidence De-duplication (withdrawn)

This question assumed award/gallery evidence overlap with U-05 that does not exist in the verified model; `evidenceManifest.ts` has no fieldwork- or leadership-linked entries at all today. No decision is required here. Superseded by the corrected Question 2 and by Question 6.

[Answer]: N/A - question withdrawn as based on an incorrect premise

## Question 4 - Tool-to-Context Linking Rule

When a skill label has no direct, verifiable link to a specific U-04/U-05 body (for example, "Sustainability" or "Debate" under Languages & Interests), how should it be labeled?

A) Render it as an "interest" with a distinct, non-color-only visual marker and no evidence action, never presented alongside demonstrated tools without differentiation
B) Omit it entirely from the section
X) Other (please describe after the [Answer]: tag)

[Answer]: A

## Question 5 - Semantic Equivalent for Relationship Visuals

ST-017 (inherited) requires a semantic equivalent for any informational visual. What should the capability-relationship and fieldwork-context visuals use as their semantic alternative?

A) An adjacent visually-hidden but screen-reader-accessible summary list (skill/activity, demonstrated-or-interest status, and linked context in plain text), matching the pattern used for U-04/U-05 semantic rows
B) Rely on `aria-label` alone on the visual container with no separate list
X) Other (please describe after the [Answer]: tag)

[Answer]: A

## Question 6 - Missing or Empty Evidence Handling

`src/data/videos.ts` is intentionally empty. If a fieldwork or leadership record has no image or document evidence, how should the record render?

A) Render the full factual record (role, organization, period, learning note) without an evidence action; never hide or placeholder-fill the missing evidence
B) Hide the record entirely until evidence exists
X) Other (please describe after the [Answer]: tag)

[Answer]: A
