# Frontend Components - U-05 PDF and Image Detail Viewers

## Component Hierarchy

```text
PortfolioExperience
  useMediaDialog
  ObservatoryShell
    section bodies
      PdfPreviewCard
      ImagePreviewCard
      media trigger callbacks
    MediaDialogHost
      MediaDialogFrame
        PdfViewerBody (interaction-lazy)
        ImageViewerBody (interaction-lazy)
        MediaFailureBody
```

This hierarchy is descriptive text, not a second application tree. One host is mounted after the main portfolio structure and before the footer boundary chosen during implementation. Domain sections receive callbacks through `SectionBodyContext`; they never mount their own overlay or mutate dialog state directly.

## `useMediaDialog`

### Responsibility

- Own the pure dialog reducer and stable typed actions.
- Admit only already-resolved PDF and image capabilities.
- Expose current state without performing DOM focus, inertness, scroll, or portal effects.

### Interface

```ts
function useMediaDialog(): MediaDialogController
```

The hook is created once by `PortfolioExperience`. Its `openPdf` and `openImage` functions enter `SectionBodyContext` so archive, academic, research, and resume consumers share the same interaction seam.

## `MediaDialogHost`

### Responsibility

- Render the single modal surface using a native `<dialog>` where supported by the approved browser baseline.
- Provide accessible name and description references for every state.
- Own `showModal`, initial focus, focus containment, background inertness, scroll locking, Escape and backdrop dismissal, cleanup, and trigger restoration.
- Lazy-load PDF and image bodies after the corresponding open state exists.

### Props

```ts
type MediaDialogHostProps = Readonly<{
  state: MediaDialogState
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
  onMediaFailure: () => void
}>
```

### DOM and Accessibility Contract

- The visible title owns the dialog label; contextual description owns `aria-describedby`.
- Close is the first stable control and meets the minimum target size.
- Tabbing cycles through enabled controls and media fallback actions only.
- Disabled Previous/Next remain native disabled buttons.
- Backdrop dismissal occurs only when the pointer event targets the dialog backdrop rather than dialog content.
- Escape and all close paths run one cleanup routine.
- Focus returns to the exact trigger when connected; otherwise it moves to `#scan-field` or the owning section.
- Background main/navigation/masthead regions are inert while open. The host itself is never inside an inert ancestor.

### Stable Automation Identifiers

- `media-dialog`
- `media-dialog-title`
- `media-dialog-description`
- `media-dialog-close`
- `media-dialog-previous`
- `media-dialog-next`
- `media-dialog-position`
- `media-dialog-download`
- `media-dialog-open-new-tab`

## `MediaDialogFrame`

### Responsibility

- Apply shared responsive geometry and render header, context, body region, and action region in one consistent order.
- Prevent any child from defining viewport-breaking outer dimensions.

### Geometry

- Desktop inline size: a clamped value no larger than approximately 92 viewport width and the approved readable media maximum.
- Desktop block size: no larger than approximately 90 dynamic viewport height.
- Narrow layout: near-full viewport with margins derived from spacing tokens plus `env(safe-area-inset-*)`.
- Header and action bar remain visible; the body region owns overflow.
- Grid/flex children use `min-inline-size: 0` and long text wraps.
- All external spacing comes from the frame. Viewer bodies do not add competing outer margins.

## `PdfPreviewCard`

### Responsibility

- Render a dimensioned first-page derivative in a stable portrait frame.
- Retain title, description, and detail action if the preview fails.
- Dispatch a typed PDF open request rather than navigating directly when the shared host is available.
- Retain safe Download/Open fallbacks.

### Props

```ts
type PdfPreviewCardProps = Readonly<{
  capability: PdfPreviewCapability
  onOpen: (capability: PdfViewerCapability, triggerId: MediaTriggerId) => void
}>
```

The frame uses `aspect-ratio: 3 / 4` and `object-fit: contain`. It never crops document content. Preview images are lazy and dimensioned. The full PDF is not assigned to an embed until detail activation.

## `ImagePreviewCard`

### Responsibility

- Render a dimensioned lazy thumbnail in a consistent aligned card.
- Apply thumbnail-only center cropping.
- Dispatch the validated group plus selected index to the shared controller.
- Retain metadata and original access after thumbnail failure.

### Props

```ts
type ImagePreviewCardProps = Readonly<{
  group: ImageViewerGroup
  index: number
  onOpen: (group: ImageViewerGroup, index: number, triggerId: MediaTriggerId) => void
}>
```

The card frame uses `aspect-ratio: 4 / 3`, `overflow: hidden`, and `object-fit: cover`. Intrinsic width and height remain declared. Crop is visual-only; the full image capability remains unchanged.

## `PdfViewerBody`

### Responsibility

- Render a browser-native full-height PDF embed after interaction.
- Show title/description through the shared frame and expose Download, Open in new tab, and Close.
- Signal media failure without throwing or unmounting the dialog.

### Rendering Contract

- The embedded surface has an explicit descriptive title.
- The body receives only a validated PDF URL.
- Unsupported or failed embedding switches to an honest fallback panel while preserving safe actions.
- The embedded region fills available dialog body height and does not set page-level dimensions.

## `ImageViewerBody`

### Responsibility

- Render the selected image uncropped with title, caption, activity/project context, and position.
- Expose bounded Previous/Next, original-file access, and Close.
- Signal load failure while retaining metadata and safe actions.

### Rendering Contract

- Full media uses `max-inline-size: 100%`, `max-block-size: 100%`, and `object-fit: contain`.
- The media region centers the image without stretching.
- Previous/Next controls are disabled at boundaries and position is announced through a polite status region.
- Changing index moves focus only when required for accessibility; it does not eject focus from the dialog.

## `MediaFailureBody`

### Responsibility

- Keep the modal operable after capability or load failure.
- Render reviewed title/context, generic `Media unavailable.` text, Close, and only prevalidated direct actions.
- Never display diagnostic codes, URLs, paths, stack traces, browser internals, or source-document text.

## Integration Points

| Consumer | Integration |
| --- | --- |
| `ArchiveCards` | Replace direct detail navigation with group-aware PDF/image callbacks; preserve native fallback links when controller capability is absent |
| `CompleteEvidenceLibrary` | Pass shared media callbacks through `ArchiveExplorer`; loaded groups remain on demand |
| Academic evidence | Adapt document and image actions to the same capabilities without reintroducing removed Protein Docking cards |
| First computational project | Treat `IMG_4208.JPG` as the sole narrative image and its publication as one PDF capability; the single-image group has no enabled Previous/Next direction |
| Scientific Research archive | Keep the other four governed Protein Docking photographs in deterministic archive order, outside the first computational project |
| Other research/data galleries | Use their existing reviewed image order as independent groups |
| Resume actions | Preserve direct download while adding a first-page/detail inspection trigger where the design placement permits |
| Portfolio shell | Extend `SectionBodyContext`, mount one host, and keep section hashes/progress/theme/Journal/contact behavior unchanged |

## Responsive Alignment and Cropping Matrix

| Surface | Wide behavior | Narrow behavior | Fit/crop |
| --- | --- | --- | --- |
| Image cards | Equal-height shared grid rows | One-column cards | `4 / 3`, cover, center crop |
| PDF cards | Equal-height shared grid rows | One-column cards | `3 / 4`, contain, no crop |
| Image detail | Centered bounded media plus side/under controls | Near-full-width stacked sheet | Intrinsic, contain, no crop |
| PDF detail | Full-height body with stable header/footer | Near-full-viewport sheet | Viewer fills body; no document crop |
| Failure body | Same frame and action alignment | One-column actions | No media surface |

No media child supplies its own outer page margin. Card/grid and dialog frame components own external spacing, preventing doubled margins and abnormal sizes.

## Interaction Flows

### Open and Close PDF

1. Visitor activates a real button on a PDF preview.
2. Capability resolution has already admitted the URL and actions.
3. Controller dispatches `OPEN_PDF` with the stable trigger identity.
4. Host opens, applies inertness/scroll lock, and moves focus inside.
5. PDF body loads lazily and then requests the full PDF.
6. Close, Escape, or backdrop dispatches `CLOSE`; cleanup runs and focus returns.

### Open and Navigate Images

1. Visitor activates a thumbnail button.
2. Controller receives the validated current group and selected index.
3. Host opens the image body with the full uncropped source.
4. Previous/Next dispatch bounded reducer events in deterministic order.
5. Boundary state disables the unavailable direction and updates the position status.
6. Close restores the original thumbnail trigger.

### Failure

1. Admission failure prevents unsafe viewer state; a safe failure request may open when reviewed context exists.
2. Runtime embed/image failure dispatches `MEDIA_FAILED`.
3. The host stays open, cleans the failed media region, and presents generic status plus validated actions.
4. Close remains available and restores focus.

## Testing Responsibilities

- Reducer and capability modules: examples plus property tests for bounds, deterministic order, item preservation, state sequences, close, and failure downgrade.
- Host: concrete DOM tests for name/description, initial focus, Tab/Shift+Tab containment, inert background, Escape/backdrop, cleanup, and trigger restoration.
- Preview cards: crop/contain classes, intrinsic dimensions, lazy loading, failure metadata, and no eager original request.
- Viewer bodies: PDF actions/fallback, image containment, position/boundaries, long-copy wrapping, and load failure.
- Render review: 320, 768, 1280, and 1440 pixels in both themes; 200-percent zoom; increased text spacing; reduced motion; keyboard; touch target sizes; safe-area simulation; and zero overflow.

## No API Integration

U-05 uses bundled assets and existing approved URLs only. It adds no backend endpoint, upload, database, analytics, remote conversion, or network-fetch service.
