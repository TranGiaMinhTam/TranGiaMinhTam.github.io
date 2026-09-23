# Component Methods and Interfaces

## Scope

These signatures define high-level contracts. They intentionally omit implementation detail and exact business rules, which are resolved during per-unit Functional Design. Proposed names may be refined during Code Generation without weakening the contracts.

## Core Archive Types

```ts
type PhysicalAssetId = Brand<string, 'PhysicalAssetId'>
type CanonicalAssetId = Brand<string, 'CanonicalAssetId'>
type ArchiveGroupId = Brand<string, 'ArchiveGroupId'>
type Sha256 = Brand<string, 'Sha256'>

type ArchiveMediaType = 'pdf' | 'jpeg' | 'png' | 'heic' | 'svg' | 'docx'
type PublicationDisposition =
  | 'narrative'
  | 'gallery'
  | 'document-collection'
  | 'download-original'
  | 'fallback'

type PhysicalAssetFact = Readonly<{
  id: PhysicalAssetId
  repositoryPath: string
  mediaType: ArchiveMediaType
  bytes: number
  sha256: Sha256
}>

type CuratedArchiveMetadata = Readonly<{
  canonicalId: CanonicalAssetId
  contentHash: Sha256
  title: string
  caption: string
  accessibleText?: string
  decorative: boolean
  groupId: ArchiveGroupId
  order: number
  disposition: PublicationDisposition
  authority: 'evidence' | 'resume' | 'owner-reviewed'
}>

type DerivativeOutcome =
  | Readonly<{ status: 'ready'; purpose: 'thumbnail' | 'preview'; source: LocalMediaSource; width?: number; height?: number }>
  | Readonly<{ status: 'unavailable'; reason: 'unsupported' | 'conversion-failed' | 'not-required' }>

type CanonicalArchiveItem = Readonly<{
  id: CanonicalAssetId
  mediaType: ArchiveMediaType
  title: string
  caption: string
  accessibleText?: string
  decorative: boolean
  groupId: ArchiveGroupId
  order: number
  disposition: PublicationDisposition
  physicalSources: readonly PhysicalAssetFact[]
  original: LocalMediaSource
  derivatives: readonly DerivativeOutcome[]
}>
```

## Archive Inventory and Catalog Methods

```ts
function inventoryArchive(root: RepositoryAssetRoot): Promise<InventoryResult>
```

- Enumerates every physical file inside the approved archive root.
- Returns repository-relative locators, sizes, types, and hashes.
- Rejects path escape and unsupported filesystem state; never mutates source files.

```ts
function canonicalizeAssets(facts: readonly PhysicalAssetFact[]): CanonicalizationResult
```

- Groups identical hashes into one canonical identity while preserving every physical source member.
- Output order is deterministic and independent of input order.
- Functional Design must specify idempotence, membership, and ordering properties.

```ts
function joinArchiveMetadata(
  canonical: readonly CanonicalAssetSeed[],
  metadata: readonly CuratedArchiveMetadata[],
  derivatives: readonly DerivativeManifestEntry[],
): ArchiveCatalogResult
```

- Requires exactly one eligible metadata record per published canonical item.
- Produces typed blocking findings for orphan metadata, missing reviewed dispositions, invalid derivatives, unsafe public paths, or duplicate IDs.

```ts
function serializeArchiveManifest(catalog: ArchiveCatalog): string
function parseArchiveManifest(value: string): ArchiveCatalogResult
```

- Provides a deterministic manifest representation when a generated manifest is used.
- Functional Design must specify round-trip behavior and canonical serialization.

```ts
function buildArchiveGroupSummaries(catalog: ArchiveCatalog): readonly ArchiveGroupSummary[]
function selectArchiveGroup(catalog: ArchiveCatalog, id: ArchiveGroupId): ArchiveGroupSelection
```

- Group summaries contain no full-media imports.
- Group selection is stable by explicit order, then canonical ID as a documented tie-breaker.

```ts
type ArchiveGroupLoader = (id: ArchiveGroupId) => Promise<ArchiveGroupLoadResult>
```

- Resolves only an approved group module.
- Unknown IDs fail closed to a visitor-safe not-found state.

## Resume and Content Methods

```ts
type ResumeClaim = Readonly<{
  id: ContentId
  category: ResumeCategory
  statement: string
  facts: Readonly<Record<string, string | readonly string[]>>
  period?: string
  sourcePage: 1 | 2 | 3 | 4
  evidenceIds: readonly EvidenceId[]
  publication: 'public' | 'document-only'
}>

type ReconciledClaim = ResumeClaim & Readonly<{
  authority: 'evidence-backed' | 'resume-only' | 'conflicted'
  provenanceIds: readonly ProvenanceId[]
}>
```

```ts
function reconcileResumeClaims(
  resume: readonly ResumeClaim[],
  source: VerifiedPortfolioSource,
  evidence: readonly PublishedEvidence[],
): ResumeReconciliationResult
```

- Evidence-backed facts prevail over conflicting resume wording.
- Conflicts become explicit findings, never silent substitutions.
- Claims marked `document-only`, including the phone number, cannot enter page view models.

```ts
function mapClaimsToSections(
  claims: readonly ReconciledClaim[],
  sections: readonly SectionDefinition[],
): ResumeSectionSelectionResult
```

- Maps every valid resume category into one or more of the preserved ten sections.
- Does not create claims absent from a source record.
- Functional Design must define completeness and non-invention properties.

```ts
function buildMastheadViewModel(
  identity: ResearchIdentityViewModel,
  resume: DownloadableResume,
): MastheadViewModel
```

- Produces identity, field label, active status, and a validated local resume action.
- Contains no theme state and no phone field.

```ts
function createResumeDownload(
  source: SafeLocalPdfSource,
  filename: 'Tran-Gia-Minh-Tam-Resume.pdf',
): DownloadableResume
```

- Requires a bundled local PDF.
- Returns the same capability to both masthead and Identity consumers.

## Media Source Policy

```ts
type LocalMediaSource = Readonly<{
  kind: 'local'
  href: string
  mediaType: 'pdf' | 'image' | 'download'
}>

type ApprovedHttpsSource = Readonly<{
  kind: 'approved-https'
  href: `https://${string}`
  mediaType: 'pdf' | 'image' | 'download'
}>

type MediaSource = LocalMediaSource | ApprovedHttpsSource

type SafeMediaResolution =
  | Readonly<{ ok: true; value: MediaSource }>
  | Readonly<{ ok: false; code: 'unsafe-scheme' | 'malformed-source' | 'unapproved-origin'; publicMessage: string }>
```

```ts
function resolveMediaSource(candidate: MediaSourceCandidate, policy: MediaSourcePolicy): SafeMediaResolution
```

- Allows Vite-bundled sources and explicitly allowlisted HTTPS origins only.
- Rejects `javascript:`, document-bearing `data:`, `file:`, malformed, or unapproved sources.
- Does not return internal paths or parser details in `publicMessage`.

```ts
function toPdfPreviewCapability(item: CanonicalArchiveItem): PdfPreviewResult
function toImagePreviewCapability(item: CanonicalArchiveItem): ImagePreviewResult
```

- Converts catalog records into presentation-safe capabilities only after source validation.
- Preserves metadata and safe direct action when preview support is unavailable.

## Dialog State and Navigation

```ts
type MediaDialogState =
  | Readonly<{ kind: 'closed' }>
  | Readonly<{ kind: 'pdf'; item: PdfViewerCapability; triggerId: string }>
  | Readonly<{
      kind: 'image'
      groupId: ArchiveGroupId
      items: readonly ImageViewerCapability[]
      index: number
      triggerId: string
    }>
  | Readonly<{ kind: 'failure'; title: string; publicMessage: string; triggerId: string }>

type MediaDialogEvent =
  | Readonly<{ type: 'OPEN_PDF'; item: PdfViewerCapability; triggerId: string }>
  | Readonly<{ type: 'OPEN_IMAGE'; groupId: ArchiveGroupId; items: readonly ImageViewerCapability[]; index: number; triggerId: string }>
  | Readonly<{ type: 'PREVIOUS' }>
  | Readonly<{ type: 'NEXT' }>
  | Readonly<{ type: 'MEDIA_FAILED' }>
  | Readonly<{ type: 'CLOSE' }>
```

```ts
function transitionMediaDialog(state: MediaDialogState, event: MediaDialogEvent): MediaDialogState
```

- Pure reducer; never produces an out-of-bounds image index.
- Previous at the first item and next at the last item remain at their valid boundary unless Functional Design explicitly approves wrapping.
- Close always returns `closed`.
- Functional Design must define invariant and stateful-model properties.

```ts
function useMediaDialog(): MediaDialogController
```

- Owns reducer state and stable action callbacks.
- DOM focus behavior stays in `MediaDialogHost`.

```ts
type MediaDialogHostProps = Readonly<{
  state: MediaDialogState
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
  onMediaFailure: () => void
}>
```

- Host effects set initial focus, contain focus, make background content inert, close on Escape/backdrop, restore trigger focus, and clean up on every exit path.

## Semantic Summary Methods

```ts
type SemanticSummaryModel =
  | Readonly<{ kind: 'relationships'; label: string; entries: readonly RelationshipSummaryEntry[] }>
  | Readonly<{ kind: 'counts'; label: string; entries: readonly CountSummaryEntry[] }>
  | Readonly<{ kind: 'sequence'; label: string; entries: readonly SequenceSummaryEntry[] }>

function projectSemanticSummary(source: DomainSemanticSource): SemanticSummaryResult
```

- Projects already-verified relationships, counts, or sequence meaning.
- Produces no visible table and no new factual inference.
- Output order follows the same verified order as the corresponding visual.

```ts
type SemanticSummaryProps = Readonly<{ model: SemanticSummaryModel }>
```

- Renders a visually hidden heading plus list or description structure.
- The hidden container remains in the accessibility tree and consumes no visual layout space.

## Shell Interfaces

```ts
type MastheadViewModel = Readonly<{
  specimenCode: string
  name: string
  fieldLabel: string
  statusLabel: string
  resume: DownloadableResume
}>

type SpecimenMastheadProps = Readonly<{
  model: MastheadViewModel
  theme: ThemeState
  onToggleTheme: () => void
}>
```

```ts
type ObservatoryShellProps = Readonly<{
  activeSectionId: SectionId
  progress: ProgressState
  theme: ThemeState
  masthead: MastheadViewModel
  mediaDialog: MediaDialogController
  findings: readonly ShellFinding[]
  onNavigate: (sectionId: SectionId) => boolean
  onRegister: (sectionId: SectionId, element: HTMLElement | null) => void
  onToggleTheme: () => void
  sectionBodies?: SectionBodyRegistry
}>
```

- Existing navigation and progress contracts remain.
- The theme button is rendered by the masthead, not the sticky navigation band.
- The shell mounts one `MediaDialogHost` after the main document structure.

## Local Derivative Pipeline Methods

```ts
async function generateDerivatives(
  inventory: InventoryResult,
  policy: DerivativePolicy,
): Promise<DerivativeGenerationResult>
```

- Reads only approved source roots and writes only plan-approved derivative roots.
- Uses explicit output paths, deterministic names, and atomic replacement where supported.
- Records failures as dispositions and preserves originals.

```ts
function validateDerivativeManifest(
  inventory: InventoryResult,
  manifest: DerivativeManifest,
): DerivativeValidationReport
```

- Detects missing source membership, stale hashes, path escape, duplicate outputs, unsupported types, and invalid dimensions.

## Security and Delivery Verification

```ts
type RequiredSecurityHeaders = Readonly<{
  contentSecurityPolicy: string
  strictTransportSecurity: 'max-age=31536000; includeSubDomains'
  contentTypeOptions: 'nosniff'
  frameOptions: 'DENY' | 'SAMEORIGIN'
  referrerPolicy: 'strict-origin-when-cross-origin'
}>

async function verifyDeploymentHeaders(
  htmlEndpoint: URL,
  expected: RequiredSecurityHeaders,
): Promise<HeaderVerificationReport>
```

- Verifies actual response headers, not HTML meta approximations.
- Returns a blocking report when hosting cannot meet the contract.

```ts
async function verifyReleaseCandidate(input: ReleaseCandidateInput): Promise<ReleaseGateReport>
```

- Aggregates type, lint, example tests, PBT, boundaries, archive integrity, privacy scan, dependency audit, SBOM, bundle/request budgets, response headers, and recovery checks.
- Any blocking failure prevents activation.

## Property-Test Generator Interfaces

```ts
type PortfolioArbitraries = Readonly<{
  physicalAssetFact: Arbitrary<PhysicalAssetFact>
  physicalAssetSet: Arbitrary<readonly PhysicalAssetFact[]>
  curatedMetadata: Arbitrary<CuratedArchiveMetadata>
  archiveCatalog: Arbitrary<ArchiveCatalog>
  resumeClaim: Arbitrary<ResumeClaim>
  mediaSourceCandidate: Arbitrary<MediaSourceCandidate>
  imageDialogScenario: Arbitrary<ImageDialogScenario>
}>
```

- `fast-check` is the selected framework, subject to dependency approval during NFR Requirements and installation only during an approved Code Generation plan.
- Generators constrain hashes, paths, categories, indices, and group membership to realistic domains while including empty sets, duplicates, Unicode labels, boundary indices, malformed schemes, and maximum permitted lengths.
- Shrinking remains enabled and seeds must be reproducible in CI.
