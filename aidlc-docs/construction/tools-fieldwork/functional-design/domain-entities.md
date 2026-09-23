# U-06 Domain Entities

## Tools Model

### ToolClassification

A closed value:

- `demonstrated`: linked to a specific existing U-04 or U-05 section through the reviewed Tool Linking Table;
- `interest`: no such link exists in the table.

### ToolLink

| Field | Meaning | Constraint |
| --- | --- | --- |
| toolId | Existing `tool`-kind `ContentId` | Must exist in `verifiedPortfolioSource.ts` |
| classification | `ToolClassification` | From the closed reviewed table only |
| linkedSectionId | Existing `SectionId` | Present only when `classification` is `demonstrated` |
| linkedLabel | Human-readable context label | Present only when `classification` is `demonstrated` |

The closed table (sixteen entries, one per verified tool) is immutable and reviewed at functional-design time; Code Generation consumes it without modification.

### ToolCategoryGroup

| Field | Meaning |
| --- | --- |
| id | Closed category identifier: `academic`, `research-data`, `laboratory`, `languages-interests` |
| label | Verified category label |
| tools | Ordered `ClassifiedTool` collection in verified source order |
| count | Exact `tools.length` |

### ClassifiedTool

A presentation-ready value combining one `tool` `ContentRecord`, its `ToolLink`, and its category membership. Immutable.

## Fieldwork and Leadership Model

### ActivityKind

A closed value fixed by the already-approved U-01 model: `fieldwork` or `leadership`. U-06 does not reclassify by theme.

### ActivityRecord

| Field | Meaning | Constraint |
| --- | --- | --- |
| id | Existing `fieldwork`/`leadership`-kind `ContentId` | Required and unique |
| kind | `ActivityKind` | Fixed from verified source |
| title | Verified role/title | Required |
| organization | Verified organization | Required |
| period | Verified period | Required |
| descriptionPoints | Ordered verified description statements | Nonempty |
| evidenceId | Matching published evidence, if any | Optional; absent today for every record |
| order | Deterministic verified source order | Unique within its kind group |

The entity is immutable and never infers an outcome, impact scale, or title the verified record does not state.

### ActivityGroup

| Field | Meaning |
| --- | --- |
| kind | `ActivityKind` |
| label | `Fieldwork` or `Leadership` |
| records | Accepted immutable `ActivityRecord` collection in verified order |
| count | Exact `records.length` |
| order | Fieldwork before Leadership |

## Relationship Model

### ToolContextRelationship

| Field | Meaning |
| --- | --- |
| id | Stable unique relationship identity |
| sourceId | Existing demonstrated-tool `ContentId` |
| targetSectionId | Existing linked `SectionId` from the Tool Linking Table |
| kind | `uses-tool` (already defined in `portfolio.types.ts`) |
| order | Deterministic source-local sequence |

### ActivityEvidenceRelationship

| Field | Meaning |
| --- | --- |
| id | Stable unique relationship identity |
| sourceId | Existing `ActivityRecord` id |
| targetId | Existing published evidence identifier |
| kind | `documented-in` |
| order | Deterministic source-local sequence |

This relationship is not instantiated for any current record because no matching evidence id exists; it is defined for forward compatibility only.

## View Models

### ToolsViewModel

Contains four ordered category groups, each with classified tools, an adjacent semantic summary list of all sixteen classifications and linked contexts, and stable findings.

### FieldworkLeadershipViewModel

Contains two ordered activity groups (Fieldwork, Leadership), an adjacent semantic summary list of all four records, and stable findings.

## Assembly Result

U-06 assembly returns either:

- an accepted immutable value containing both view models and any non-blocking findings; or
- a rejected value containing stable ordered blocking findings for invalid tool/activity structure, an unmapped tool, duplicate identity, or a broken required linked-context target.

## Persistence and Integration

No database, API, remote repository, or runtime content service exists. Entities are deterministically projected from the immutable, already-approved `verifiedPortfolioSource.ts` records and the closed Tool Linking Table. The body registry is the only shell integration. Any future evidence action opens only a same-origin static asset through a native link, consistent with U-04 and U-05.
