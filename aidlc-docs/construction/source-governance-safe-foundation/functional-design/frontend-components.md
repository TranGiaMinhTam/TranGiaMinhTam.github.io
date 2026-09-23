# U-01 Frontend Capability Contracts

## Scope

U-01 creates no new visible component, route, section, dialog, table, or layout. It defines typed capabilities and safe failure contracts that U-02 through U-05 may consume after their own approved designs. This prevents presentation code from reading raw inventory facts, absolute paths, unreviewed metadata, or unvalidated URLs.

## Component Boundary

```text
U-01 generated facts and pure policies
    ├── validated resume download capability → U-02 masthead and U-03 Identity
    ├── canonical archive summaries/capabilities → U-04 Archive Explorer
    ├── safe PDF/image/download sources → U-04 cards and U-05 viewers
    ├── visitor-safe failure descriptors → U-04/U-05 presentation
    └── semantic validation findings → maintainer verification only
```

This is a dependency description, not a runtime component tree.

## Public Capability Types

### `DownloadCapability`

```ts
type DownloadCapability = Readonly<{
  kind: 'download'
  source: SafeMediaSource
  filename: string
  label: string
  mediaType: 'application/pdf' | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' | 'image'
}>
```

#### Contract

- `source` already passed U-01 media policy.
- `filename` is a safe browser-facing filename, not a repository path.
- `label` contains no private data.
- Presentation may render a native anchor but must not reinterpret or concatenate the URL.

### `PdfCapability`

```ts
type PdfCapability = Readonly<{
  kind: 'pdf'
  canonicalId: CanonicalAssetId
  title: string
  description: string
  source: SafeMediaSource
  preview?: SafeMediaSource
  download: DownloadCapability
  loadStrategy: 'lazy' | 'on-demand'
}>
```

#### Contract

- U-01 supplies only validated data and source admission.
- U-05 owns iframe/object behavior, modal state, fallback rendering, and focus.
- An absent preview is not a broken source; it signals a later UI fallback.

### `ImageCapability`

```ts
type ImageCapability = Readonly<{
  kind: 'image'
  canonicalId: CanonicalAssetId
  title: string
  caption: string
  source: SafeMediaSource
  thumbnail?: SafeMediaSource
  accessibleText?: string
  decorative: boolean
  width?: number
  height?: number
  original: DownloadCapability
  loadStrategy: 'lazy' | 'on-demand'
}>
```

#### Contract

- `decorative: false` requires accessible text before capability emission.
- Width/height belong to validated source/derivative facts where available.
- U-04/U-05 cannot derive public captions from filenames.

### `UnavailableMediaCapability`

```ts
type UnavailableMediaCapability = Readonly<{
  kind: 'unavailable'
  canonicalId: CanonicalAssetId
  title: string
  description: string
  publicMessage: string
  safeActions: readonly DownloadCapability[]
  reasonCode: SafeMediaFailureCode
}>
```

#### Contract

- `publicMessage` contains no internal paths, stack traces, commands, framework versions, or sensitive values.
- `reasonCode` is stable and non-sensitive.
- Safe actions have independently passed source admission.
- Later UI must remain operable even when no action exists.

### `ArchiveGroupSummary`

```ts
type ArchiveGroupSummary = Readonly<{
  id: ArchiveGroupId
  label: string
  description: string
  count: number
  order: number
}>
```

#### Contract

- Contains no full original imports.
- `count` equals eligible canonical membership after validation.
- U-04 owns loading and presentation state.

### `ArchiveGroupCapability`

```ts
type ArchiveGroupCapability = Readonly<{
  summary: ArchiveGroupSummary
  items: readonly (PdfCapability | ImageCapability | DownloadCapability | UnavailableMediaCapability)[]
}>
```

#### Contract

- Items are deterministic by curated order then canonical ID.
- Each item maps to one canonical entry.
- Group capability is eligible for lazy loading by U-04; U-01 does not decide UI loading state.

## Resume Capability

```ts
type ResumeDownloadCapability = DownloadCapability & Readonly<{
  filename: 'Tran-Gia-Minh-Tam-Resume.pdf'
  label: 'Download resume'
  mediaType: 'application/pdf'
}>
```

### Invariants

- Source is bundled local PDF.
- Copied bytes match the approved source.
- No phone field exists.
- Same immutable capability is safe for masthead and Identity consumers.

## Safe Failure Contracts

### Failure Classes

| Failure class | U-01 output | Later presentation obligation |
| --- | --- | --- |
| Unsafe source | No media capability; typed rejection | Do not render interactive media URL. |
| Optional preview unavailable | Primary capability plus no preview or safe unavailable descriptor | Show title/description and safe direct action. |
| Original unavailable/invalid | Blocking finding; no public capability | Do not render broken action. |
| Missing accessible text | Blocking for non-decorative item | Do not publish image card. |
| Metadata pending/conflicted | Internal inventory only | Do not present item. |
| Resume mismatch | No resume capability | Do not render download action. |

## Downstream Props and State Ownership

| Consumer | U-01 supplies | Consumer owns |
| --- | --- | --- |
| U-02 `SpecimenMasthead` | `ResumeDownloadCapability` | Placement, theme props, focus order, responsive layout. |
| U-03 Identity | Same resume capability and validated source authority types | Section prose, actions, content mapping. |
| U-04 Archive Explorer | Group summaries, group capabilities/load contract | Selected group, loading/error state, filtering/navigation, thumbnails. |
| U-05 PDF viewer | `PdfCapability` or unavailable capability | Inline embed behavior, dialog state, focus, actions. |
| U-05 Image viewer | `ImageCapability`, group order | Current index, previous/next, dialog focus, failure UI. |

U-01 owns no React state and exposes no callback tied to presentation.

## Interaction Flow Contracts

### Resume Download

1. U-01 emits a validated immutable resume capability.
2. U-02/U-03 render a native download link using capability values directly.
3. Browser requests the bundled asset only after the visitor activates the action.
4. If U-01 did not emit a capability, downstream UI renders no broken link and surfaces only approved status text.

### Archive Group Activation

1. U-04 receives eager group summaries without full item imports.
2. U-04 activates an approved group loader.
3. Loader returns an `ArchiveGroupCapability` already containing safe media capabilities.
4. U-04 renders cards or visitor-safe unavailable records.
5. U-05 opens detail only from a safe capability.

### Media Failure

1. Source admission occurs before presentation.
2. Browser-level load failure is reported by U-04/U-05 using the canonical ID and stable failure class, never raw URL/path.
3. The consumer transitions to a generic fallback and retains independently safe actions.
4. U-01's immutable catalog is not mutated at runtime.

## Validation Interfaces

```ts
type CapabilityResult<Value> =
  | Readonly<{ ok: true; value: Value; warnings: readonly U01Finding[] }>
  | Readonly<{ ok: false; findings: readonly U01Finding[] }>
```

- Presentation receives `value` only from `ok: true`.
- Warnings cannot represent unsafe URLs, privacy leaks, invalid originals, or missing required metadata.
- `ok: false` findings are for maintainer/test evidence, not direct visitor display.

## Accessibility Boundary

U-01 guarantees:

- Reviewed accessible text or explicit decorative designation.
- Human-readable title/description independent of filename.
- Safe download labels and stable filenames.
- Generic public failure messages.
- No visual-only meaning is encoded in capability models.

U-01 does not implement:

- Dialog name/description wiring.
- Focus trap, Escape/backdrop dismissal, or focus restoration.
- Hidden semantic relationship summaries.
- Card grid, responsive styling, or theme behavior.

Those responsibilities remain with U-02, U-04, and U-05.

## Security Boundary

- Components never receive absolute filesystem paths.
- Components never receive unvalidated raw URL strings.
- Components never render document text as HTML.
- The phone number cannot appear as a prop or catalog field.
- Safe capabilities do not imply that browser embedding succeeded; later UI still handles load failure safely.
- U-01 policy and later browser fallback provide defense in depth.

## Example Test Seams

- Resume capability uses stable filename and contains no phone field.
- Non-decorative image without accessible text yields no capability.
- Unsafe URL produces `ok: false` and a generic public message.
- Optional missing preview retains safe Download action.
- Archive summary contains count/label but no full original import.
- Capability ordering matches curated order and canonical-ID tie-breaker.

## Property-Test Seams

- Every successful media capability satisfies the local/approved-HTTPS allowlist invariant.
- No successful public capability contains an absolute/traversal locator.
- Every group item maps to exactly one canonical ID.
- Group capability order remains deterministic under source input permutation.
- Public capability transformation never adds a document-only field.

## Explicit Absence of Backend Integration

There are no endpoints, requests, storage APIs, analytics calls, upload handlers, databases, or remote converters. All capabilities refer to static bundled assets or explicitly approved HTTPS evidence sources. No form validation applies to U-01.

## No-Visible-UI Acceptance Boundary

U-01 Functional Design is satisfied when later units can consume typed safe capabilities without needing raw inventory facts or duplicating validation. It is not satisfied by adding temporary public inventory tables, debug screens, placeholder cards, or dialogs.
