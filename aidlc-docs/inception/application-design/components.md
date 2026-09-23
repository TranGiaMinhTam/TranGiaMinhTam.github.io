# Application Components: Header, Content, Evidence, and Resume Refinement

## Scope

This design extends the active feature-first `src/portfolio/` application. It preserves the existing application orchestrator, ten section identifiers, domain body registries, Journal route, contact workflow, and shell controllers. New responsibilities are isolated behind typed archive, resume, media-viewer, and build-tooling boundaries.

Application Design defines ownership and interfaces only. Detailed transformation rules and implementations belong to per-unit Functional Design and Code Generation.

## Architecture Principles

1. Generated physical facts and curated public metadata remain separate and are joined through stable identifiers.
2. Resume and evidence claims retain source authority, provenance, and conflict state before presentation.
3. Pure functions own catalog transformations; React components consume validated view models.
4. One shared dialog host owns accessibility and focus behavior; PDF and image bodies own format-specific presentation.
5. Archive groups and full media are interaction-loaded, not initial-page dependencies.
6. Media sources pass through one allowlist policy before reaching an interactive element.
7. Conversion is deterministic local preprocessing; the browser never converts HEIC or DOCX.
8. Existing domain features do not read raw filesystem paths or conversion outputs directly.
9. Visitor-safe failures preserve useful metadata and safe actions without exposing internal details.
10. All mutable UI state has a small typed state machine and all data transformations expose pure test seams.

## Proposed Feature Structure

```text
src/portfolio/
├── archive/
│   ├── archive.types.ts
│   ├── generatedArchiveFacts.ts
│   ├── curatedArchiveMetadata.ts
│   ├── archiveCatalog.ts
│   ├── archiveSelectors.ts
│   ├── ArchiveExplorer.tsx
│   ├── ArchiveGroup.tsx
│   └── archive-loaders/
├── media-viewer/
│   ├── media.types.ts
│   ├── mediaSourcePolicy.ts
│   ├── mediaDialogReducer.ts
│   ├── MediaDialogHost.tsx
│   ├── PdfPreviewCard.tsx
│   ├── PdfViewerBody.tsx
│   ├── ImageThumbnailCard.tsx
│   └── ImageViewerBody.tsx
├── resume/
│   ├── resume.types.ts
│   ├── resumeSource.ts
│   ├── resumeSelectors.ts
│   └── ResumeAction.tsx
├── shared/
│   └── SemanticSummary.tsx
├── shell/
│   ├── PortfolioExperience.tsx
│   ├── ObservatoryShell.tsx
│   ├── SpecimenMasthead.tsx
│   └── ThemeControl.tsx
└── existing domain folders remain

scripts/portfolio/
├── inventory-archive.mjs
├── generate-derivatives.mjs
├── verify-archive.mjs
├── verify-security-headers.mjs
└── generate-sbom.mjs
```

The names are proposed contracts, not an authorization to create these source files yet.

## Application and Shell Components

### `PortfolioApp`

- **Purpose**: Preserve the root composition and Journal routing boundary.
- **Responsibilities**: Compose domain registries, supply the validated portfolio experience, and keep Journal lazy-loading behavior unchanged.
- **Interface**: No required public prop change.
- **Dependencies**: Existing domain registries, `JournalRoute`, and `PortfolioExperience`.

### `PortfolioExperience`

- **Purpose**: Coordinate shell-level visitor state.
- **Responsibilities**: Retain theme and section-progress controllers; add one media-dialog controller; pass masthead configuration and dialog commands into the shell; combine safe findings.
- **Interface**: Accepts the existing optional section-body registry plus validated masthead and media capabilities from composition.
- **Constraint**: It does not own archive transformation or resume reconciliation.

### `ObservatoryShell`

- **Purpose**: Render the continuous-page application frame.
- **Responsibilities**: Render the enhanced masthead before sticky navigation, registered sections, progress, one global dialog host, visitor-safe status, and footer.
- **Interface change**: Adds typed masthead data and media-dialog state/actions; preserves navigation, registration, theme, and body-registry inputs.
- **Constraint**: Theme control moves into the masthead but theme state remains controlled by `PortfolioExperience`.

### `SpecimenMasthead`

- **Purpose**: Present a polished scientific identity panel and top-level actions.
- **Responsibilities**: Name, specimen identity, field label, status, subtle scientific marks, theme control, and native resume download.
- **Inputs**: `MastheadViewModel`, `ThemeState`, and action callbacks.
- **Accessibility**: One clear header landmark, meaningful action names, no decorative marks in the accessibility tree, and logical focus order.

### `ThemeControl`

- **Purpose**: Preserve the existing theme operation in its new visual location.
- **Responsibilities**: Expose the next action, retain keyboard semantics, and invoke the existing controller.
- **Constraint**: No independent theme state or mode-specific domain branching.

## Resume Components

### `ResumeSource`

- **Purpose**: Typed, reviewed representation of claims extracted from the supplied four-page resume.
- **Responsibilities**: Preserve wording, dates, organizations, award level, quantitative context, source locator, and publication privacy.
- **Constraint**: Phone data is permitted only in the bundled PDF asset, never in page models or generated metadata.

### `ResumeContentSelector`

- **Purpose**: Reconcile resume claims with existing verified records and evidence.
- **Responsibilities**: Apply authority order, identify conflicts, mark resume-only claims, and produce section-specific immutable view models.
- **Output**: Either validated content or blocking findings; it never silently resolves conflicts.

### `ResumeAction`

- **Purpose**: Render the same stable native download capability in the masthead and Identity section.
- **Inputs**: A validated local PDF source, accessible label, and stable filename.
- **Constraint**: Uses an anchor download contract; no fetch, tracking, or external service.

## Archive Model Components

### `GeneratedArchiveFacts`

- **Purpose**: Machine-generated inventory of every physical file.
- **Fields**: Stable physical ID, repository-relative source locator, media type, byte size, SHA-256 content hash, and derivative linkage.
- **Constraint**: Not rendered directly and never contains absolute local paths.

### `CuratedArchiveMetadata`

- **Purpose**: Human-reviewed public descriptions and publication decisions.
- **Fields**: Canonical ID, readable title, caption, accessible text or decorative designation, category, order, source authority, publication disposition, and optional narrative placement.
- **Constraint**: Filename inference alone cannot establish factual claims.

### `CanonicalArchiveCatalog`

- **Purpose**: Validated join of generated facts, curated metadata, and derivative outcomes.
- **Responsibilities**: One canonical entry per content hash, complete internal provenance membership, deterministic ordering, safe public paths, capability flags, and group summaries.
- **Failure policy**: Missing metadata, unsafe paths, duplicate IDs, broken provenance, or invalid derivative references produce typed blocking findings.

### `ArchiveExplorer`

- **Purpose**: Make every canonical reviewed item discoverable without rendering all full assets.
- **Responsibilities**: Category navigation, compact counts, lazy group activation, loading/error/empty states, and preservation of section reading order.
- **Inputs**: Eager group summaries and a typed group loader.
- **Constraint**: It cannot import all originals in its initial module.

### `ArchiveGroup`

- **Purpose**: Render one loaded category with normalized document and image cards.
- **Responsibilities**: Stable ordering, headings, counts, provenance labels safe for publication, and triggers for the shared viewer.
- **Constraint**: Thumbnails are lazy and full assets remain on demand.

## Media Viewer Components

### `MediaSourcePolicy`

- **Purpose**: Security boundary for all preview, original, download, and new-tab URLs.
- **Responsibilities**: Accept bundled application assets and explicitly approved HTTPS evidence; reject unsafe schemes and malformed sources; return a typed safe capability or visitor-safe finding.
- **Constraint**: React components never render unvalidated media strings.

### `PdfPreviewCard`

- **Purpose**: Provide a responsive inline first-page PDF review.
- **Responsibilities**: Browser-native embed, title and description, useful unsupported fallback, direct safe action, and dialog trigger.
- **Loading**: The embedded source is attached only when the card is near view or its archive group is activated.

### `ImageThumbnailCard`

- **Purpose**: Present a dimensioned lazy image preview.
- **Responsibilities**: Alternative text or decorative designation, caption, failure fallback, and dialog trigger.
- **Loading**: Thumbnail only; the original is not requested until explicit action.

### `MediaDialogController`

- **Purpose**: Typed state machine for closed, PDF, and grouped-image dialog states.
- **Responsibilities**: Open, close, previous, next, source-trigger tracking, group bounds, and safe fallback transition.
- **Constraint**: Pure reducer logic is separate from DOM focus effects.

### `MediaDialogHost`

- **Purpose**: Own dialog semantics, portal placement, focus management, background inertness, dismissal, and focus restoration.
- **Responsibilities**: Accessible name/description, initial focus, focus trap, Escape/backdrop close, scroll containment, and format-body selection.
- **Constraint**: Exactly one host is mounted in the shell.

### `PdfViewerBody`

- **Purpose**: Full-height PDF detail content.
- **Responsibilities**: Embedded PDF, title, description, Download, Open in new tab, and failure fallback.
- **Constraint**: No unsafe HTML and no source path in user-facing errors.

### `ImageViewerBody`

- **Purpose**: Group-aware image detail content.
- **Responsibilities**: Original or display derivative, caption, safe provenance, previous/next controls, boundary state, original-file action, and failure fallback.
- **Constraint**: Navigation order comes only from the validated group model.

## Accessibility Components

### `SemanticSummary`

- **Purpose**: Preserve relationship and count meaning after visible tables are removed.
- **Responsibilities**: Render visually hidden list or description structures selected by semantic relationship type.
- **Inputs**: Already-projected semantic rows; it does not infer relationships.
- **Constraint**: Uses a robust visually-hidden style, remains available to assistive technology, occupies no visual layout space, and never uses `display: none`.

### Existing Visual Components

`QuestionConstellation`, research relationship visuals, laboratory station cards, data-story signal sheet, academic progression, evidence spectrum, and tool/fieldwork visuals remain domain-owned. Their CSS/layout contracts change, while their semantic source order and new hidden summaries remain stable.

## Build and Verification Components

### `ArchiveInventoryPipeline`

- **Purpose**: Enumerate and hash all source files deterministically.
- **Output**: Generated facts plus a report proving physical count and provenance coverage.
- **Safety**: Read-only toward source assets.

### `DerivativePipeline`

- **Purpose**: Produce web-compatible HEIC, DOCX, PDF-preview, and image-thumbnail derivatives locally.
- **Output**: Deterministic derivative files and a conversion manifest containing success or honest fallback dispositions.
- **Safety**: Never overwrites or deletes originals; failures do not erase catalog membership.

### `DeploymentSecurityVerifier`

- **Purpose**: Verify required HTTP response headers against a deployed candidate endpoint.
- **Output**: Pass/fail evidence for CSP, HSTS, `nosniff`, frame policy, and strict-origin referrer policy.
- **Constraint**: GitHub Pages capability is not assumed; provider decisions belong to Infrastructure Design.

### `BuildIntegrityPipeline`

- **Purpose**: Coordinate strict type checking, lint, example tests, PBT, boundary checks, vulnerability audit, SBOM, bundle/request budgets, archive verification, and recovery verification.
- **Constraint**: A failed blocking gate prevents activation.

## Ownership Matrix

| Capability | Owner | Consumers |
| --- | --- | --- |
| Theme and section progress | `PortfolioExperience` | `ObservatoryShell`, masthead, navigation |
| Masthead composition | `SpecimenMasthead` | Visitor shell |
| Resume source authority | Resume model/selectors | Identity and all domain selectors |
| Physical inventory | Archive tooling | Canonical catalog builder |
| Curated archive metadata | Archive model | Catalog builder and maintainers |
| Canonical groups | Archive selectors | Evidence Library and narrative sections |
| Media URL admission | `MediaSourcePolicy` | All preview, viewer, download, and new-tab actions |
| Dialog state and focus | Controller plus `MediaDialogHost` | PDF and image viewer bodies |
| Hidden relationships | `SemanticSummary` | Identity, research, academics, and impact visuals |
| Derivatives | Local preprocessing pipeline | Canonical catalog |
| Header compliance | Deployment verifier | Infrastructure and release gate |

## Explicit Non-Components

- No backend, database, authentication, analytics, upload API, server-side contact handler, or remote conversion service.
- No second router for archive groups.
- No modal implementation duplicated inside individual sections.
- No raw-filename-driven factual content generator.
- No browser-side HEIC or DOCX converter.
- No component may expose the phone number, absolute filesystem paths, stack traces, or unsafe URLs.
