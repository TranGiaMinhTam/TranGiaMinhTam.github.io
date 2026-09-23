# U-04 Domain Entities

## Core Research Model

### ResearchDomain

A closed value identifying one owned presentation domain:

- `computational-projects`
- `laboratory-research`
- `data-stories`

### ResearchProject

| Field | Meaning | Constraint |
| --- | --- | --- |
| id | Stable project identity | Required and unique |
| domain | Owned U-04 domain | One closed value |
| question | Verified research question | Required, unchanged meaning |
| context | Verified abstract | Required |
| contribution | Contribution disclosure | Supported value or explicit unknown |
| methods | Ordered method labels | Nonempty, source-derived |
| tools | Ordered tool/context labels | Nonempty, source-derived |
| timeBand | Verified period | Required |
| provenanceIds | Supporting source references | Nonempty |
| evidence | Resolved published evidence | Optional collection |

The normalized project is immutable. Presentation components cannot add or reorder facts except through an explicitly documented view-model order.

### ContributionDisclosure

A closed union:

- `verified-context`: contains exact supported wording such as `Team-led project`;
- `not-specified`: contains the fixed disclosure `Role not specified in verified source`.

It never contains an inferred title or responsibility.

### ResearchMethod

| Field | Meaning |
| --- | --- |
| id | Stable project-scoped method identifier |
| label | Exact approved method label |
| sequence | Source order |
| practice | Computational, laboratory, or analytical |

### ResearchTool

| Field | Meaning |
| --- | --- |
| id | Stable project-scoped tool identifier |
| label | Exact approved tool/context label |
| sequence | Source order |

No proficiency, duration, score, or endorsement is attached unless a future verified source explicitly supplies it.

## Evidence Model

### ProjectEvidence

| Field | Meaning | Constraint |
| --- | --- | --- |
| relationshipId | Project-to-evidence relationship | Unique |
| evidenceId | Published manifest identifier | Must resolve or be omitted |
| label | Purpose label | Required |
| kind | Publication, poster, certificate, or presentation | Closed type |
| caption | Accessible evidence context | Required |
| source | Same-origin published asset | Never raw-source path |
| mediaKind | Image or PDF | Controls native action |
| loadStrategy | Lazy or on-demand | No eager document |

### EvidenceResolution

A deterministic result:

- `resolved`: published evidence is available;
- `optional-missing`: the project remains valid and the action is absent;
- `invalid-reference`: a required relationship endpoint is broken and blocks acceptance.

## Relationship Model

### ResearchRelationship

| Field | Meaning |
| --- | --- |
| id | Unique stable relationship identity |
| projectId | Existing project endpoint |
| targetId | Existing method, tool, time, or evidence endpoint |
| kind | `uses-method`, `uses-tool`, `occurred-during`, or `supported-by` |
| order | Deterministic project-local sequence |
| textMarker | Non-color relationship cue |

### ResearchSemanticRow

Contains the project label, relationship kind, target label, order, and relationship ID. Both the visual composition and semantic alternative consume the identical relationship collection.

## Domain View Models

### ComputationalProjectViewModel

Contains one normalized project, ordered computational pipeline stages, tool annotations, time band, evidence terminals, semantic relationship rows, and findings.

### LaboratoryResearchViewModel

Contains one normalized project, specimen context, ordered assay/prototype stages, time band, evidence strip, semantic relationship rows, and findings.

### DataStoryViewModel

Contains one normalized project, ordered analytical stages, tool/context labels, time context, evidence actions, publication status, optional verified destinations, semantic relationship rows, and findings.

For this unit, `destinations` is empty and publication status is `Research notes are being prepared`.

## Selection Result

U-04 selection returns either:

- an accepted immutable value containing exactly one view model per owned domain and no blocking findings; or
- a rejected value containing stable ordered blocking findings.

Optional evidence findings may accompany an accepted project only when every required text and relationship endpoint remains valid.

## Entity Relationships

- One verified project belongs to exactly one U-04 domain.
- One project has one or more methods and tools, one time band, and zero or more published evidence items.
- One relationship joins one project to one valid target.
- One normalized relationship collection produces both visual values and semantic rows.
- One Data Story has zero verified writing destinations until student-authored content is supplied.

## Persistence and Integration

No database, API, remote repository, or runtime content service exists. Entities are derived from immutable local TypeScript records and a published evidence manifest. U-04 provides a read-only future destination contract to U-07 but does not resolve journal pages.
