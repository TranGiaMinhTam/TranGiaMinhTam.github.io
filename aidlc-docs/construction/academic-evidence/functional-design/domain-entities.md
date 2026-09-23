# U-05 Domain Entities

## Academic Model

### AcademicProgram

| Field | Meaning | Constraint |
| --- | --- | --- |
| id | Canonical academic record identity | Required and unique |
| program | Verified qualification or program label | Required |
| institution | Verified institution | Required |
| period | Published study period | Required |
| status | `completed` or `in-progress` | Explicit closed value |
| subjectFocus | Ordered verified subjects or specialization | Nonempty |
| facts | Ordered academic facts | Source-reviewed mapping only |
| provenanceIds | Supporting source references | Nonempty |
| evidenceIds | Canonical academic evidence relationships | Optional |
| order | Deterministic source order | Unique within trajectory |

The entity is immutable. Its `status` distinguishes ongoing study from completed results and cannot be inferred from visual position alone.

### AcademicFact

A closed discriminated value with these kinds:

- `completed-result`: a verified GPA or completed qualification result;
- `language-qualification`: a verified language result and date;
- `current-study`: an explicitly incomplete or in-progress statement;
- `subject-focus`: a verified subject cluster;
- `development`: a source-supported academic-development statement.

Each fact contains a stable program-scoped identifier, label, kind, sequence, and source text. Parsing arbitrary prose at runtime is prohibited; Code Generation uses an explicit reviewed mapping.

### AcademicStratum

A presentation-ready grouping containing one `AcademicProgram`, its institution anchor, ordered subject and result clusters, completion label, recognition markers, and academic-evidence actions. Strata are ordered for reviewer comprehension while retaining the source period text.

### RecognitionMarker

| Field | Meaning | Constraint |
| --- | --- | --- |
| id | Stable marker identity | Unique |
| label | Canonical scholarship-offer title | Required |
| relationship | `recognized-by` | Fixed for U-05 |
| evidenceId | Canonical scholarship evidence | Must resolve or marker is omitted |
| provenance | Published evidence provenance | Required |

A marker conveys an offer only. It has no accepted, enrolled, attended, or used state.

## Evidence Library Model

### AcademicEvidenceDomain

A closed group value:

- `academic-record`
- `scholarships`
- `research-outputs`
- `project-visuals`

### EvidenceLibraryItem

| Field | Meaning | Constraint |
| --- | --- | --- |
| id | Canonical evidence identity | Unique across the library |
| group | Owned U-05 evidence group | Closed value |
| kind | Published evidence kind | Canonical manifest value |
| title | Published title | Required |
| caption | Reviewer-facing context | Required |
| provenance | Traceable source description | Required |
| accessibleText | Complete nonvisual description | Required |
| mediaKind | `pdf` or `image` | Controls preview and action behavior |
| full | Same-origin full asset | Safe and user initiated |
| preview | Optional approved image derivative | Never synthesized at runtime |
| loadStrategy | `on-demand` or `lazy` | Must match media behavior |
| order | Deterministic group-local order | Stable |

### EvidencePreview

A discriminated value:

- `text-document`: type, title, caption, provenance, PDF label, and action metadata;
- `lazy-image`: source, intrinsic dimensions, alternative text, decoding policy, and local failure label.

There is no embedded-document preview variant.

### EvidenceArchiveGroup

| Field | Meaning |
| --- | --- |
| id | Closed evidence-group identifier |
| label | Visible group label |
| description | Concise group purpose |
| items | Accepted immutable item collection |
| count | Exact `items.length` value |
| order | Academic Record, Scholarships, Research Outputs, Project Visuals |

Empty groups may be omitted from archive presentation, but the semantic summary must use the same accepted grouping and cannot report a stale expected count.

### EvidenceSpectrumEntry

Contains a group identifier, label, accepted count, order, and non-color marker. Both the compact visual spectrum and semantic count list consume the same immutable entries.

## Relationship Model

### AcademicEvidenceRelationship

| Field | Meaning |
| --- | --- |
| id | Stable unique relationship identity |
| sourceId | Existing academic program or recognition marker |
| targetId | Existing published evidence identifier |
| kind | `documented-in` or `recognized-by` |
| order | Deterministic source-local sequence |

Relationship endpoints must exist in the accepted academic and evidence collections. Missing optional evidence removes only its relationship and dependent marker or action.

## View Models

### AcademicTrajectoryViewModel

Contains two ordered academic strata, exact normalized facts, in-progress status, recognition markers, transcript action, semantic relationship rows, and stable findings.

### EvidenceLibraryViewModel

Contains ordered archive groups, archive rows, text or image previews, spectrum entries, an identical semantic count list, category anchors, and stable findings.

## Assembly Result

U-05 assembly returns either:

- an accepted immutable value containing both view models and any non-blocking optional-evidence findings; or
- a rejected value containing stable ordered blocking findings for invalid academic structure, duplicate evidence identity, unsafe publication state, or broken required endpoints.

## Persistence and Integration

No database, API, remote repository, document processor, or runtime content service exists. Entities are deterministically projected from immutable local verified records and the publication manifest. The body registry is the only shell integration, and full evidence remains a same-origin static asset opened through native links.
