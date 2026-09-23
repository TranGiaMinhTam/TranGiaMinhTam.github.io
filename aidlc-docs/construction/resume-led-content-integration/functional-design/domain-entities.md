# U-03 Domain Entities - Resume-Led Content Integration

## Core Value Objects

- **ResumeClaimId**: Stable identifier for one independently publishable claim.
- **ResumeCategory**: Closed category used by the canonical section map.
- **ResumePage**: Integer 1 through 4 used only for internal source traceability.
- **FactKey / FactValue**: Reviewed factual dimensions such as organization, period, result, quantity, role, subject, language, or interest.
- **PublicationClass**: `public` or `document-only`.
- **ReviewState**: `reviewed`, `unreviewed`, `excluded`, or `conflicted`.
- **Authority**: `evidence-backed`, `resume-sourced`, or `conflicted`.
- **SectionId**: Existing closed set of ten section identifiers.

## Aggregate Entities

### ResumeClaim

Immutable record containing ID, category, statement, fact map, optional period, source page, evidence IDs, publication class, and review state. A public claim cannot contain a document-only fact.

### ReconciledClaim

Extends an admitted ResumeClaim with field-level authority, provenance IDs, resolved fact values, and zero or more typed findings. A conflicted claim is never eligible for public projection.

### ClaimConflict

Contains safe claim ID, optional evidence ID, fact key, and conflict code. Source values remain confined to protected review context and are not emitted into public diagnostics.

### SectionClaimMapping

Contains claim ID, exactly one primary SectionId, explicit group/order, and optional related section/evidence IDs. Related memberships cannot own a second visible statement.

### ResumeSectionViewModel

Contains SectionId, semantic groups, immutable ordered records, authority label, fact fields, and safe evidence actions. It cannot contain raw resume text, private contact fields, full archive modules, or viewer state.

### DownloadableResume

Existing U-01 validated local PDF capability with fixed title and filename. The same object is consumed by both masthead and Identity actions.

### ResumeCompositionResult

Discriminated result: either `ready` with reconciled claims, mappings, section models, and download capability, or `blocked` with typed safe findings. Partial ready output is prohibited.

## Relationships and Cardinality

| Source | Relationship | Target | Cardinality |
| --- | --- | --- | --- |
| ResumeClaim | reconciles with | verified record | zero or one reviewed match |
| ResumeClaim | supported by | evidence record | zero to many explicit IDs |
| ResumeClaim | becomes | ReconciledClaim | exactly one for every admitted claim |
| ReconciledClaim | owns primary mapping | SectionClaimMapping | exactly one when publishable |
| SectionClaimMapping | projects into | ResumeSectionViewModel | exactly one primary section |
| DownloadableResume | is consumed by | resume action | exactly two presentation locations |
| ResumeCompositionResult | contains | blocking finding | zero when ready; one or more when blocked |

## State Transitions

1. Extracted content is transient and outside the runtime domain.
2. A normalized claim begins `unreviewed`.
3. Human review moves it to `reviewed` or `excluded`.
4. Reconciliation yields evidence-backed/resume-sourced facts or `conflicted`.
5. Only reviewed, non-conflicted, public claims enter mapping.
6. Complete validated mapping yields `ready`; any blocking condition yields `blocked`.

No transition silently converts conflicted to reviewed, document-only to public, or resume-sourced to evidence-backed.

## Invariants

- Claim IDs, mapping memberships, and visible primary statements are unique.
- Every public output fact is traceable to an admitted claim or supporting reviewed evidence.
- Every eligible claim has exactly one primary section.
- Every evidence/provenance ID resolves.
- All categories required by FR-013 occur in the validated input and output coverage set.
- No phone/private marker occurs outside approved PDF bytes.
- The section registry remains exactly ten entries in its current order.
- Input and output collections are immutable.
- Reconciliation and mapping are deterministic and idempotent over valid normalized input.

## Typed Finding Families

- Claim admission: duplicate ID, unreviewed, malformed, unsupported category.
- Reconciliation: missing match, broken reference, field conflict, unsupported authority.
- Mapping: unmapped, multiple-primary, missing category, duplicate visible statement.
- Privacy: document-only projection, phone marker, public-contact violation.
- Download: unsafe source, non-PDF source, filename mismatch, integrity mismatch.
- Boundary: archive/viewer activation, section-registry change, protected-source mutation.

Each finding has a stable code, severity `blocking`, safe target ID, and generic message. It contains no private value or absolute path.

