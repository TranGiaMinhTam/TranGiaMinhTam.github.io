# U-04 Domain Entities - Complete Archive Discovery

## Core Value Objects

### `ArchivePublicationEligibility`

An immutable decision attached to each canonical item before public projection.

- `public`: contains one primary disposition: narrative, gallery, document collection, or original action.
- `excluded`: contains a closed safe reason such as `private-record`, `explicit-user-exclusion`, or `system-metadata`.
- Exclusion reasons are diagnostic data and are not rendered as visitor provenance.

### `ArchiveSubcollection`

A reviewed project/activity grouping within a visitor group.

- Stable subcollection ID.
- Natural label and concise description.
- Explicit order.
- Parent group ID.
- No raw filesystem path.

### `ArchiveGroupSummary`

The eager archive representation used before a group is loaded.

- Stable approved group ID.
- Natural label and description.
- Explicit order and eligible member count.
- Image, document, and narrative-reference counts.
- Loading module key from a closed registry, not an arbitrary import string.

### `PublicArchiveItem`

The safe item view model produced after group loading.

- Canonical item ID, natural title, caption, order, and subcollection ID.
- Accessibility description or explicit decorative state.
- Exactly one primary disposition.
- One admitted capability: dimensioned image thumbnail, document card, safe original action, or narrative reference.
- No hash, absolute path, raw source path, private field, or visitor-facing source-authority label.

### `ArchiveImageCapability`

- Admitted thumbnail URL and media type.
- Width, height, or aspect ratio.
- Alternative text or decorative designation.
- Optional admitted original trigger for U-05.
- The original URL is not attached to the image element during U-04 rendering.

### `ArchiveDocumentCapability`

- Natural document title and description.
- Document type label.
- Admitted first-page derivative when available.
- Safe native open/download capability.
- Optional typed detail trigger for U-05.

### `ArchiveGroupSelection`

A discriminated immutable result:

- `ready`: approved group ID, validated ordered items, and count.
- `empty`: approved group ID with no eligible items.
- `not-found`: safe public message and no loader/media capability.
- `invalid`: blocking internal findings and no public data.

### `ArchiveGroupLoadResult`

A discriminated asynchronous result:

- `ready`: validated selection and cache key.
- `failure`: generic public message, retryability flag, and safe internal finding codes.
- It never contains an exception stack or machine-local path.

### `ArchiveExplorerState`

Small UI state owned by the explorer:

- `activeGroupId`: one approved group ID or null.
- `statusByGroup`: idle, loading, ready, or failure.
- `loadedByGroup`: immutable successfully loaded selections retained for the page session.
- Catalog records remain outside mutable state.

### `ArchiveFinding`

- Closed code.
- Safe canonical/group IDs when useful.
- Severity: blocking or recoverable.
- Internal diagnostic description without raw private values or absolute paths.
- Visitor-safe message selected separately.

## Contact Presentation Entities

### `ContactPresentation`

Immutable copy and layout configuration separate from recipient and draft validation:

- Eyebrow, heading, introduction, composer label, privacy note, action label, and handoff note.
- Layout variant `balanced-action-row`.
- No recipient mutation and no network capability.

### Existing Contact Entities Retained

`ContactRecipient`, `RawContactDraft`, `ValidContactDraft`, `ContactDraftValidation`, and `MailtoUrl` retain their current semantics. U-04 changes presentation only.

## Relationships and Ownership

- One validated manifest owns 110 canonical items and all 128 physical memberships.
- One canonical item has one eligibility decision and exactly one primary public disposition when eligible.
- One public archive item belongs to one display group and one reviewed subcollection.
- One group summary references one closed loader key.
- One loaded group contains only items whose IDs were counted in its summary.
- One Archive Explorer owns expansion/loading state but not catalog data.
- The Evidence Library owns Archive Explorer placement.
- U-05 consumes typed media triggers but owns dialog state and full-detail behavior.

## Validation Invariants

- Physical membership totals and byte totals match the manifest.
- All 104 non-system source-folder files remain represented internally.
- Academic transcripts never appear in public groups or capabilities.
- Group IDs, subcollection IDs, canonical IDs, orders, and counts are stable and unique in their scopes.
- Every public capability has passed central media-source admission.
- Summary-only imports contain no thumbnail, PDF, or original asset dependency.
- Empty public groups are omitted from the default summary list.
- All exported collections are readonly and frozen at their public boundary.
