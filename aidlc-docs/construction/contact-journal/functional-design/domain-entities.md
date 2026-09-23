# U-07 Contact and Journal Domain Entities

## Contact Entities

### `ContactViewModel`

| Field | Type | Constraint |
| --- | --- | --- |
| `recipient` | verified email string | Exactly one approved student address |
| `directHref` | `mailto:` string | Recipient only; no visitor draft |
| `privacyNotice` | string | States local browser and email-client boundary |
| `limits` | `ContactLimits` | Immutable approved field limits |

### `ContactLimits`

| Field | Value |
| --- | ---: |
| `nameMax` | 100 |
| `emailMin` | 3 |
| `emailMax` | 254 |
| `messageMax` | 5,000 |

### `ContactDraft`

```ts
type ContactDraft = Readonly<{
  name: string
  email: string
  message: string
}>
```

`RawContactDraft` and `NormalizedContactDraft` use the same shape but remain separate conceptual states. Only a successful validation result exposes a normalized draft to the mailto builder.

### `ContactFieldFinding`

| Field | Type | Values |
| --- | --- | --- |
| `field` | `ContactField` | `name`, `email`, or `message` |
| `code` | `ContactFindingCode` | required, length, or format failure |
| `message` | string | Stable user-facing correction |

### `ContactValidationResult`

```ts
type ContactValidationResult =
  | Readonly<{ ok: true; draft: NormalizedContactDraft }>
  | Readonly<{
      ok: false
      findings: readonly ContactFieldFinding[]
      firstInvalidField: ContactField
    }>
```

## Research Note Entities

### `ResearchNoteDescriptor`

| Field | Approved value |
| --- | --- |
| `slug` | `sim-lse-data-analytics` |
| `href` | `#/journal/sim-lse-data-analytics` |
| `title` | `SIM-LSE Data Analytics: A Verified Project Note` |
| `projectId` | `project-sim-lse-data-analytics` |
| `sourceType` | `local-research-note` |

The descriptor lives in a neutral shared model boundary. Data Stories exposes its `href`; Journal uses its slug and project identifier. Neither domain imports the other's visual components.

### `ResearchNoteSection`

```ts
type ResearchNoteSectionKind =
  | 'question'
  | 'context'
  | 'contribution'
  | 'methods'
  | 'tools'
  | 'timeline'
  | 'evidence'

type ResearchNoteSection = Readonly<{
  id: string
  kind: ResearchNoteSectionKind
  heading: string
  content: string | readonly string[] | readonly EvidenceCapability[]
  order: number
}>
```

### `ResearchNoteViewModel`

| Field | Type | Constraint |
| --- | --- | --- |
| `descriptor` | `ResearchNoteDescriptor` | Exact canonical descriptor |
| `provenanceLabel` | string | Identifies the verified project source without exposing raw paths |
| `sections` | seven ordered sections | Exact approved order |
| `returnHref` | `#data-stories` | Stable continuous-page return |

### `ResearchNoteSelection`

```ts
type ResearchNoteSelection =
  | Readonly<{ ok: true; notes: readonly [ResearchNoteViewModel] }>
  | Readonly<{ ok: false; findings: readonly U07Finding[] }>
```

The initial approved catalog contains exactly one note. The tuple expresses that cardinality without creating an open-ended runtime content scan.

## Routing Entities

### `JournalLocation`

```ts
type JournalLocation =
  | Readonly<{ kind: 'article'; slug: string; article: ResearchNoteViewModel }>
  | Readonly<{ kind: 'not-found'; slug: string }>
```

`undefined` from `resolveJournalLocation` means the location does not belong to the journal namespace and the continuous portfolio remains active.

### `JournalRouteState`

| Field | Type | Purpose |
| --- | --- | --- |
| `location` | `JournalLocation` | Resolved local route state |
| `status` | `loading`, `ready`, or `failed` | Lazy presentation state |
| `focusTargetId` | string | Stable heading focus target |

## Findings

`U07Finding` has a stable code, severity (`blocking` or `localized`), target, and message. Required finding families cover contact cardinality, recipient validity, note cardinality, route-descriptor mismatch, missing project fields, contribution mismatch, evidence resolution, legacy-source reachability, and unexpected runtime integrations.

## Relationships

| Source | Relationship | Target |
| --- | --- | --- |
| Verified contact record | selects | `ContactViewModel` |
| `ContactDraft` | validates into | `NormalizedContactDraft` |
| Normalized draft | encodes into | mailto URL |
| Shared note descriptor | exposes discovery in | Data Stories |
| Shared note descriptor | resolves route in | Journal |
| Verified SIM-LSE project | projects into | `ResearchNoteViewModel` |
| Research note | references on demand | approved evidence capabilities |
| Article or not-found state | returns to | `#data-stories` |
