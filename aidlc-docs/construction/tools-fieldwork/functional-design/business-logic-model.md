# U-06 Business Logic Model

## Purpose and Boundary

U-06 converts the already-approved U-01 `tool`, `fieldwork`, and `leadership` content records into two review-ready section bodies: Methods and Tools, and Fieldwork and Leadership. The unit distinguishes demonstrated capability from interest without inventing proficiency ratings, connects tools to the specific U-04/U-05 context that demonstrates them through a closed reviewed table, and presents fieldwork and leadership activity by verified kind with exact role, organization, and period. It does not publish a CV, invent an evidence asset that does not exist, process raw documents, or implement later-unit domains.

## Deterministic Content Flow

1. Select verified `tool` records (16, from `src/data/skills.ts` via `verifiedPortfolioSource.ts`) and verified `fieldwork`/`leadership` records (4, from `src/data/experience.ts`).
2. Validate identifiers, category, title, period (where present), facts, provenance, and source order.
3. Classify each tool as `demonstrated` (has a closed-table link to a specific U-04 research body or U-05 academic record) or `interest` (no such link) through the reviewed Tool Linking Table below. No label is inferred at runtime.
4. Classify each fieldwork/leadership record by its already-approved `kind` (`fieldwork` or `leadership`); do not reclassify by theme or content.
5. Resolve tool-to-context relationships using existing `documented-in`/`uses-tool` relationship kinds already defined in `portfolio.types.ts`, targeting the linked project or academic `ContentId`.
6. Resolve any evidence relationship for a tool or fieldwork/leadership record only if a matching id exists in `evidenceManifest.ts`; today none exists, so no evidence action renders for any U-06 record.
7. Group tools into their four verified categories (Academic, Research & Data, Laboratory, Languages & Interests) and mark demonstrated vs. interest within each group.
8. Group fieldwork/leadership records into exactly two groups, Fieldwork and Leadership, preserving verified source order within each group.
9. Derive the semantic-equivalent summary list for both bodies from the same accepted, grouped collections used by their visual presentation.
10. Register exactly the `tools` and `fieldwork-leadership` bodies through the existing duplicate-rejecting body-registry composer.

## Tool Linking Table (closed, reviewed)

| Category | Tool | Classification | Linked context |
| --- | --- | --- | --- |
| Academic | Biology | Demonstrated | Academic Trajectory - AS & A-Level subject focus |
| Academic | Chemistry | Demonstrated | Academic Trajectory - AS & A-Level subject focus |
| Academic | Mathematics | Demonstrated | Academic Trajectory - AS & A-Level and IGCSE subject focus |
| Academic | IELTS 7.0 | Demonstrated | Academic Trajectory - verified IELTS language qualification fact |
| Research & Data | Molecular Docking | Demonstrated | Computational Projects - Type II diabetes docking project |
| Research & Data | AutoDock Vina | Demonstrated | Computational Projects - Type II diabetes docking project |
| Research & Data | Tableau | Demonstrated | Data Stories - SIM-LSE analytical signal sheet |
| Research & Data | Data Analysis | Demonstrated | Data Stories - SIM-LSE analytical signal sheet |
| Laboratory | Ultrasound-Assisted Extraction | Demonstrated | Laboratory Research - cashew-testa extraction station |
| Laboratory | DPPH Assays | Demonstrated | Laboratory Research - cashew-testa assay station |
| Laboratory | ABTS Assays | Demonstrated | Laboratory Research - cashew-testa assay station |
| Laboratory | Disk Diffusion & MIC | Demonstrated | Laboratory Research - cashew-testa assay station |
| Languages & Interests | Vietnamese | Interest | No verified proficiency-record link exists |
| Languages & Interests | English | Demonstrated | Academic Trajectory - verified IELTS language qualification fact |
| Languages & Interests | Sustainability | Interest | No verified project or academic record link exists |
| Languages & Interests | Debate | Interest | No verified project or academic record link exists |

This table is the single source of truth for classification; Code Generation may not add, remove, or reassign an entry without a new approved functional design change.

## Workflow 1 - Methods and Tools

Methods and Tools uses a relationship-based capability map rather than a proficiency matrix or repeated-row grid.

1. Present the four verified categories in source order: Academic, Research & Data, Laboratory, Languages & Interests.
2. Within each category, present demonstrated tools first, each carrying its linked context label from the Tool Linking Table and a link to that context's existing section anchor.
3. Present interest-classified tools with a distinct, non-color-only marker and no context link or evidence action.
4. Never invent a numeric rating, proficiency level, or endorsement for any tool.
5. Provide the adjacent semantic summary list from the same sixteen classified tools.

## Workflow 2 - Fieldwork and Leadership

Fieldwork and Leadership uses two labeled groups by verified kind rather than a chronological activity log, timeline, or ledger.

1. Present the Fieldwork group first, containing the one verified conservation-volunteering record (Nui Chua National Park and Nam Cat Tien National Park, June 2024-June 2025).
2. Present the Leadership group second, containing the three verified records in source order: Deputy Head at The Institute of Viéce (Mar 2026-Sep 2026), Kyoto SDGs Youth Summit Student Delegate (Mar 2026-Present), and Free IGCSE Mathematics Mentor (Feb 2025-Jun 2025).
3. Render role/title, organization, exact period, and every verified description point in full for each record.
4. Render no evidence action for any record while no matching id exists in `evidenceManifest.ts`; do not hide or placeholder-fill the absence.
5. Provide the adjacent semantic summary list from the same two grouped collections.

## Failure and Validation Outcomes

| Condition | Outcome |
| --- | --- |
| Missing or duplicate tool, fieldwork, or leadership record identifier | Reject the affected body assembly with stable ordered findings |
| Empty required fact (category, title, or period where applicable) | Reject the affected record; do not invent a replacement |
| A tool absent from the Tool Linking Table | Reject assembly with a finding naming the unmapped tool; Code Generation may not guess a classification |
| A linked context that no longer exists in U-04/U-05 output | Omit only the context link with a finding; keep the tool's verified facts |
| A future evidence id present in `evidenceManifest.ts` for a tool or fieldwork/leadership record | Render its evidence action; absence of any such id is the current, valid state and is not itself a finding |
| Some records missing from an otherwise valid source | Render remaining accepted records and accurate recomputed group/category counts |
| No eligible tool or fieldwork/leadership record | Render a concise section-unavailable state; other bodies remain unaffected |

## Responsive and Semantic Projection

- Wide Methods and Tools uses four category clusters with demonstrated/interest sub-grouping and inline context links.
- Narrow Methods and Tools becomes one continuous order: category, tool, classification, and context link.
- Wide Fieldwork and Leadership uses two side-by-side or stacked group panels with role, organization, and period columns.
- Narrow panels stack role, organization, period, and description without horizontal scrolling.
- The category-capability and group-activity visuals and their semantic summary lists share identical identifiers, labels, counts, and order.
- Text labels and markers carry demonstrated-versus-interest and Fieldwork-versus-Leadership meaning independently of color.

## Traceability

This model covers ST-011 and ST-012; FR-011 and FR-012; and inherited integrity, accessibility, visual-alternative, performance, responsive, resilience, and maintainability obligations from ST-013 and ST-016 through ST-021.
