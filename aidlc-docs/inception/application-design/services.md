# Application Services and Orchestration

## Service-Layer Approach

The portfolio remains a static client application. “Service” means a focused TypeScript orchestration boundary or local build-time tool, not a network service. Pure domain transformations are preferred; browser effects and filesystem effects remain at explicit edges.

## `PortfolioCompositionService`

- **Purpose**: Assemble the validated runtime inputs consumed by `PortfolioExperience`.
- **Inputs**: Existing verified portfolio source, reconciled resume selection, eager archive group summaries, section-body registries, masthead capability, and safe media capabilities.
- **Outputs**: Immutable application composition or blocking findings.
- **Interactions**: Calls Resume Content and Content Integrity services; does not enumerate files or convert assets.
- **Failure behavior**: Keeps the last verified active composition and reports a visitor-safe capability note during candidate work.

## `ArchiveInventoryService`

- **Purpose**: Produce deterministic facts for all physical files under the approved source root.
- **Inputs**: Explicit validated repository root.
- **Outputs**: Physical IDs, repository-relative paths, media types, byte sizes, SHA-256 hashes, and inventory findings.
- **Interactions**: Supplies Canonical Archive and Derivative Pipeline services.
- **Security**: Rejects root escape and symbolic-link escape; never publishes absolute paths; never deletes or overwrites sources.
- **Failure behavior**: A missing, unreadable, or unstable source produces a blocking build finding.

## `CanonicalArchiveService`

- **Purpose**: Create the canonical publication catalog from generated facts, curated metadata, and conversion outcomes.
- **Responsibilities**:
  - Deduplicate by content hash.
  - Preserve every physical source as internal provenance.
  - Join reviewed titles, captions, categories, accessibility treatment, and dispositions.
  - Enforce deterministic grouping and ordering.
  - Create eager group summaries and lazy group modules.
- **Consumers**: Archive Discovery, Resume Content, research, academic/evidence, and impact domains.
- **Failure behavior**: Duplicate IDs, dropped physical membership, unreviewed unique items, invalid paths, unsafe sources, and broken derivatives are blocking.

## `ResumeContentService`

- **Purpose**: Reconcile the four-page resume with reviewed evidence and the existing verified portfolio model.
- **Responsibilities**:
  - Preserve exact source wording and contextual facts.
  - Apply evidence-over-resume conflict authority.
  - Mark resume-only statements accurately.
  - Map every approved resume category to the ten preserved sections.
  - Exclude document-only private fields from public models.
- **Consumers**: Masthead, Identity, academics, research, tools, leadership, and archive metadata.
- **Failure behavior**: Conflicts, missing category mapping, unsupported claims, and any phone leak are blocking.

## `MediaPublicationPolicyService`

- **Purpose**: Centralize all runtime media admission decisions.
- **Responsibilities**:
  - Allow bundled local sources.
  - Allow only explicitly approved HTTPS evidence origins when a local source is unavailable.
  - Reject unsafe, malformed, or unapproved schemes.
  - Convert valid catalog records into PDF, image, and download capabilities.
- **Consumers**: Preview cards, viewer bodies, resume actions, and evidence actions.
- **Security**: Implements SEC-R02, SEC-R05, SEC-R06, SEC-R07, and SEC-R08 boundaries.
- **Failure behavior**: Returns typed safe failures; never passes a rejected URL onward.

## `ArchiveDiscoveryService`

- **Purpose**: Coordinate on-demand archive browsing.
- **Responsibilities**:
  - Supply compact eager summaries.
  - Resolve approved lazy group loaders.
  - Preserve deterministic item order.
  - Expose loading, ready, empty, not-found, and failed states.
- **Consumers**: `ArchiveExplorer` and narrative “view complete archive” actions.
- **Performance**: Group loading must not import unrelated originals or full documents.
- **Failure behavior**: A failed group retains its label/count and provides a retry or safe original-access path when eligible.

## `MediaDialogService`

- **Purpose**: Coordinate PDF and image detail state while keeping DOM effects in the host.
- **Responsibilities**:
  - Open validated PDF and image capabilities.
  - Preserve trigger identity.
  - Navigate within image bounds.
  - Transition media failures to a safe fallback.
  - Close deterministically.
- **Consumers**: Shell, archive cards, and narrative media triggers.
- **Accessibility**: `MediaDialogHost` applies naming, description, focus containment, background inertness, dismissal, and restoration.
- **Failure behavior**: Invalid open requests remain closed and produce a safe finding.

## `MastheadCompositionService`

- **Purpose**: Create the masthead identity/status/action view model without taking ownership of visitor state.
- **Inputs**: Validated identity and local resume capability.
- **Outputs**: Static masthead view model.
- **Interactions**: Existing theme controller is injected separately by `PortfolioExperience`.
- **Privacy**: The model has no phone field and cannot consume raw resume contact details.

## `SemanticSummaryService`

- **Purpose**: Convert verified domain semantic rows into hidden accessible structures.
- **Responsibilities**: Select relationship, count, or sequence shape; preserve visual ordering and labels; avoid factual inference.
- **Consumers**: Identity, research, academic/evidence, and impact visuals.
- **Accessibility**: Output stays in the accessibility tree while consuming no visual layout space.
- **Failure behavior**: Missing semantic source is a design/test failure; it does not fall back to an inaccessible visual-only state.

## `ResponsiveLayoutContract`

- **Purpose**: Coordinate common alignment rules without centralizing domain markup.
- **Responsibilities**:
  - Provide shared container, grid, gap, measure, and action-row tokens.
  - Establish desktop, tablet, and 320-pixel collapse behavior.
  - Preserve logical DOM order independent of visual placement.
  - Define zoom, text-spacing, and overflow acceptance constraints.
- **Consumers**: Masthead and all ten domain sections.
- **Failure behavior**: Visual regression or horizontal-overflow checks block activation.

## `DerivativePipelineService`

- **Purpose**: Produce local web-compatible assets before the application build.
- **Responsibilities**:
  - Convert HEIC and DOCX where supported.
  - Produce PDF first-page and image thumbnail derivatives where approved.
  - Declare dimensions/aspect ratios.
  - Write a deterministic conversion manifest.
  - Preserve originals and record failures honestly.
- **Interactions**: Reads Archive Inventory; supplies Canonical Archive.
- **Security**: No external upload or remote conversion; explicit tools and paths only.
- **Failure behavior**: Failure becomes a fallback disposition unless the item lacks any safe publication path, in which case it blocks.

## `ContentIntegrityService`

- **Purpose**: Validate application and publication invariants before composition.
- **Responsibilities**:
  - Ten section identifiers and orders remain unchanged.
  - Every physical file has inventory membership.
  - Every canonical reviewed item has a disposition.
  - Provenance membership is complete.
  - Resume categories are mapped and unsupported claims absent.
  - Phone and absolute-path scans return no public hits.
  - Every published PDF and reviewed image has required capability or honest fallback.
- **Output**: Structured blocking and optional findings.

## `DeploymentSecurityService`

- **Purpose**: Define and verify the hosting-neutral HTTP security contract.
- **Responsibilities**:
  - Specify required CSP, HSTS, `nosniff`, frame, and referrer headers.
  - Verify actual deployed HTML responses.
  - Record platform limitations without claiming equivalence from meta elements.
  - Provide evidence to Infrastructure Design and final release gating.
- **Boundary**: It does not choose or mutate a hosting provider during Application Design.
- **Failure behavior**: Missing required response headers are blocking before deployment approval.

## `SupplyChainService`

- **Purpose**: Coordinate dependency and build-integrity evidence.
- **Responsibilities**: Lockfile verification, vulnerability audit, unused-dependency review, trusted registry verification, SBOM generation, and CI action/tooling pin review.
- **Interactions**: Final Build Integrity orchestration.
- **Failure behavior**: High-risk unresolved vulnerabilities, missing SBOM, unlocked dependency changes, or unreviewed build sources block activation.

## `PropertyTestingService`

- **Purpose**: Provide reusable domain arbitraries and reproducible property-test configuration.
- **Framework**: `fast-check` with Vitest, pending dependency approval during NFR Requirements and installation during Code Generation.
- **Responsibilities**:
  - Central generators for physical assets, hashes, metadata, groups, resume claims, sources, and dialog commands.
  - Shrinking enabled.
  - Seed reporting and replay command available.
  - Clear separation from example-based tests.
- **Boundary**: Actual properties are finalized per unit during Functional Design as required by PBT-01.

## `BuildIntegrityOrchestrator`

- **Purpose**: Aggregate all release evidence after unit completion.
- **Inputs**: Type/lint results, example tests, PBT results and seeds, boundary checks, catalog validation, conversion report, privacy scan, accessibility checks, browser review, dependency audit, SBOM, bundle/request manifest, header verification, and recovery verification.
- **Output**: One release-gate report with no silent retry.
- **Failure behavior**: Any applicable blocking requirement prevents candidate activation.

## Runtime Orchestration Flow

1. Build-time validated models supply static composition inputs.
2. `PortfolioApp` retains Journal routing and provides the composed registries.
3. `PortfolioExperience` creates navigation, theme, and media-dialog controllers.
4. `ObservatoryShell` renders the masthead, navigation, progress, ten sections, and one dialog host.
5. Evidence Library initially receives only archive group summaries.
6. A visitor activates a group; Archive Discovery loads only that group module and its lazy thumbnails.
7. A visitor activates a validated media card; Media Dialog opens the appropriate body and loads the full source on demand.
8. Close restores focus to the original trigger.

## Build-Time Orchestration Flow

1. Capture recovery facts and verify the approved source root.
2. Inventory and SHA-256 hash every physical file.
3. Generate allowed derivatives locally and record outcomes.
4. Join generated facts, curated metadata, and derivative outcomes.
5. Reconcile resume claims and verified evidence.
6. Validate completeness, privacy, source policy, ordering, and manifest integrity.
7. Emit static typed catalogs and lazy group modules.
8. Run the build integrity gates before any activation.

## Failure Contract

| Boundary | Public behavior | Maintainer evidence | Activation effect |
| --- | --- | --- | --- |
| Unsafe media source | Media unavailable; safe metadata remains | Typed source-policy code only, no absolute path | Block if published capability depends on it |
| Preview unsupported | Description plus Download/Open action | Capability/fallback disposition | Allowed when safe fallback exists |
| Lazy group failure | Group remains named with retry/fallback | Group load finding | Block unresolved deterministic build failure |
| Conversion failure | Original metadata and eligible download remain | Conversion manifest reason | Allowed only with approved honest fallback |
| Resume conflict | Conflicted claim not silently published | Source locators and finding | Block until reviewed |
| Phone leakage | Nothing is activated | Privacy scan finding | Always block |
| Dialog media failure | Modal shows generic fallback and remains closable | Safe error code | Block if focus/dismissal breaks |
| Missing response headers | No false compliance claim | Header verification report | Block deployment approval |

## Explicitly Excluded Services

- Remote asset ingestion or conversion.
- Runtime archive filesystem enumeration.
- Authentication or authorization service.
- Analytics or telemetry service.
- Backend contact or document API.
- External content-management system.
