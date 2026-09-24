# Business Logic Model - U-05 PDF and Image Detail Viewers

## Purpose

U-05 turns validated document and image capabilities into one consistent inspection workflow. The model separates source admission, presentation geometry, dialog state, browser effects, and failure handling so that no section owns a partial or conflicting viewer implementation.

## Inputs and Outputs

| Input | Required facts | Output |
| --- | --- | --- |
| Archive document card | Canonical ID, title, caption, validated local PDF URL, first-page derivative geometry | PDF preview and viewer capability |
| Published evidence PDF | Evidence ID, title, description, validated PDF URL | PDF preview and viewer capability |
| Resume download | Stable filename, title, validated bundled PDF URL | Resume PDF preview and viewer capability |
| Archive or narrative image group | Stable group ID, deterministic image order, title, caption, validated thumbnail/full URL, dimensions | Ordered image viewer capabilities |
| Invalid or unavailable media | Safe title/context plus stable finding code | Operable failure state with only eligible actions |

## Capability Resolution

1. Accept only a typed document, image, or resume candidate from an approved catalog boundary.
2. Resolve every interactive URL through the existing media-source policy.
3. Reject unsafe, malformed, unowned, or unapproved sources before dialog state changes.
4. Preserve reviewed title, description, activity/project context, dimensions, and explicit original actions.
5. Never publish raw filenames, repository paths, local filesystem paths, source/resume labels, stack traces, or parser details.
6. Return a discriminated success or visitor-safe failure result. Expected invalid data does not throw.

## Preview Projection

Document cards use an existing first-page derivative when available. The preview frame has a stable portrait ratio and contains the full derivative without cropping. Image cards use a stable landscape frame and may crop the thumbnail with centered `object-fit: cover`; their intrinsic dimensions remain declared to prevent layout shift. A full image opened in detail always uses `object-fit: contain` and therefore never loses content.

If a preview derivative fails, the card retains its title, description, format label, and validated detail/direct action. Full PDFs and full-resolution images are not requested by summary or card rendering; they load only after explicit visitor action.

## Dialog State Model

```ts
type MediaDialogState =
  | Readonly<{ kind: 'closed' }>
  | Readonly<{ kind: 'pdf'; item: PdfViewerCapability; triggerId: string }>
  | Readonly<{
      kind: 'image'
      groupId: MediaGroupId
      items: readonly ImageViewerCapability[]
      index: number
      triggerId: string
    }>
  | Readonly<{
      kind: 'failure'
      title: string
      publicMessage: string
      eligibleActions: readonly SafeMediaAction[]
      triggerId: string
    }>
```

```ts
type MediaDialogEvent =
  | Readonly<{ type: 'OPEN_PDF'; item: PdfViewerCapability; triggerId: string }>
  | Readonly<{ type: 'OPEN_IMAGE'; groupId: MediaGroupId; items: readonly ImageViewerCapability[]; index: number; triggerId: string }>
  | Readonly<{ type: 'PREVIOUS' }>
  | Readonly<{ type: 'NEXT' }>
  | Readonly<{ type: 'MEDIA_FAILED'; publicMessage?: string }>
  | Readonly<{ type: 'CLOSE' }>
```

## Pure Transition Rules

| Current state | Event | Result |
| --- | --- | --- |
| Any | `CLOSE` | `closed` |
| `closed` or any open state | valid `OPEN_PDF` | `pdf` with the supplied trigger identity |
| `closed` or any open state | valid `OPEN_IMAGE` | `image` with a normalized in-range index |
| `image` | `PREVIOUS` | Index minus one, clamped at zero |
| `image` | `NEXT` | Index plus one, clamped at the last item |
| `pdf` or `image` | `MEDIA_FAILED` | Operable `failure` retaining safe title/actions and trigger identity |
| `closed`, `pdf`, or `failure` | `PREVIOUS` or `NEXT` | Unchanged state |
| Any | malformed open event | Safe failure result; never an out-of-range or partially open state |

The reducer has no DOM access. It preserves immutable group arrays and deterministic order. It never wraps image navigation and never creates URL or browser-history entries.

## Dialog Effect Workflow

1. The trigger supplies a stable DOM identifier and dispatches an open event.
2. The shared host mounts one accessible dialog with an accessible name and description.
3. The host records the trigger element, makes the portfolio background inert, locks background scrolling, and focuses Close or the dialog heading according to the final accessibility implementation.
4. Tab and Shift+Tab remain within the dialog's current focusable controls.
5. Close, Escape, or an unambiguous backdrop action dispatches `CLOSE`.
6. Cleanup removes inertness and scroll locking even if media fails or the host unmounts.
7. Focus returns to the exact connected trigger. If it no longer exists, focus moves to the nearest safe section or main landmark.

## Layout Policy Projection

The layout policy is data rather than ad hoc component sizing:

- Image thumbnail frame: landscape `4 / 3`, bounded height, `cover`, centered crop.
- Document preview frame: portrait `3 / 4`, bounded height, `contain`.
- Detail image: maximum available inline/block size, `contain`, centered, no crop.
- Desktop dialog: centered, width and height clamped to the viewport with shared gutters.
- Narrow dialog: safe-area-aware near-full-viewport sheet with one-column controls.
- Controls: minimum 44 by 44 CSS pixels.
- Text/action regions: wrap without increasing document width; no fixed content width can exceed its container.

## Failure and Recovery

- Capability rejection never opens an unsafe media body.
- Preview failure affects only the preview surface; metadata and safe actions remain.
- Embedded PDF or image failure transitions to a named failure body that remains dismissible.
- No retry automatically bypasses source validation or requests an unapproved fallback.
- A replacement open event may replace an existing viewer state without leaving stale focus or scroll locks.
- Expected failures use stable non-sensitive codes for tests and internal evidence; visitors receive generic text only.

## Testable Properties

| Property | Category | Required assertion |
| --- | --- | --- |
| Navigation bounds | Invariant | For every non-empty generated group and index, Previous/Next always returns an index in `[0, length - 1]` |
| Deterministic navigation | Oracle | Reducer navigation equals a simple clamped-index reference model |
| Item preservation | Invariant | Navigation never mutates, drops, duplicates, or reorders the supplied group |
| Dialog sequences | Stateful/model | Random valid open/navigate/fail/close sequences match a simplified reference state after every event |
| Close behavior | Invariant | `CLOSE` from every state always yields exactly `closed` |
| Failure downgrade | Invariant | `MEDIA_FAILED` never retains an unsafe source and always keeps the dialog dismissible |
| Layout ranges | Invariant | Generated supported viewport/media dimensions always resolve to positive bounded frames and never exceed the viewport contract |

Round-trip properties are N/A because U-05 defines no encode/decode or serialize/parse pair. Idempotence is N/A because repeated dialog events intentionally depend on current state. Generators must create constrained media groups, indices, viewport sizes, aspect ratios, capabilities, and event sequences; shrinking and fixed/logged seeds remain enabled.
