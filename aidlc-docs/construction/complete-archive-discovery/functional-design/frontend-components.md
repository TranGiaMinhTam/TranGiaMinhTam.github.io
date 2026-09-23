# U-04 Frontend Components - Complete Archive Discovery

## Component Hierarchy

`EvidenceLibrary` retains the canonical section identity and concise section heading. Its body becomes:

- `ArchiveExplorer`
  - `ArchiveGroupSummaryGrid`
    - `ArchiveGroupSummaryButton`
  - `ArchiveGroupRegion`
    - `ArchiveGroupLoading`
    - `ArchiveGroupFailure`
    - `ArchiveGroup`
      - `ArchiveSubcollectionHeading`
      - `ArchiveImageCard`
      - `ArchiveDocumentCard`
      - `ArchiveNarrativeReference`

The existing `ContactSignal` receives a presentational copy/action-row correction without changing its data model or mail handoff.

## `ArchiveExplorer`

Responsibilities:

- Render eager natural group summaries and derived counts.
- Keep all groups closed initially.
- Manage one active group ID and per-group load status.
- Resolve loaders through a closed registry and cache successful immutable results for the page session.
- Preserve summary navigation when loading or an item fails.
- Announce loading/failure changes without moving focus unexpectedly.

Inputs:

- Ordered readonly group summaries.
- Typed approved loader registry.
- Optional U-05 trigger adapter; U-04 uses safe native actions when no viewer is present.

Accessibility:

- Summary controls are buttons with accessible names, `aria-expanded`, and `aria-controls`.
- The loaded group is a named region associated with its summary.
- Loading uses a polite status; failures use a concise status with a Retry button.
- Keyboard order matches visual order.

## `ArchiveGroupSummaryGrid`

- Shows label, concise description, total count, and image/document mix.
- Uses a responsive grid: multiple compact columns at wide widths and one column on narrow screens.
- Does not render images, documents, or hidden original links.
- Omits groups with zero eligible public items.

## `ArchiveGroup`

- Renders one approved group at a time in deterministic order.
- Uses reviewed subcollection headings so galleries correspond to real activities such as Protein Docking, GYS, WICO, Kyoto Youth Summit, WSC, Nam Cat Tien, and Nui Chua.
- Uses responsive card grids that preserve source order and declared media ratios.
- Does not repeat identity/project narrative cards as new primary evidence cards.
- Provides natural copy only; technical provenance stays internal.

## `ArchiveImageCard`

- Renders only the generated thumbnail with `loading="lazy"`, declared dimensions/aspect ratio, and reviewed alternative text or decorative status.
- Shows a natural title and caption tied to its project/activity.
- Exposes a typed detail trigger for U-05 and a safe original action where approved.
- On thumbnail failure, removes the broken visual while retaining text and the safe action.

## `ArchiveDocumentCard`

- Presents certificate/document type, natural title, description, and safe open/download action.
- May render the existing admitted first-page derivative as a dimensioned lazy image when the group is active.
- Does not embed the full PDF or implement a dialog in U-04.
- Uses the approved two-page scholarship PDF capabilities.
- Never includes academic transcript capabilities.

## Contact Presentation

### Copy

- Eyebrow remains a concise portfolio contact label.
- Heading: `Let us connect.`
- Introduction: `Have a project, collaboration, opportunity, or question in mind? Write a message here, then continue in your email app.`
- Composer label: `Email draft`
- Privacy note: `Nothing is submitted or stored by this site. Your message opens in your email app for review.`
- Primary action: `Open email draft`
- Recipient note: `Prefer email directly? Use this address anytime.`

### Layout

- The Contact header and recipient block remain a balanced two-column introduction at wide widths and stack at narrow widths.
- Name and reply-to fields share two columns when space allows; Message spans both.
- The handoff note and action button form one full-width action row below Message.
- On wide screens the note uses the flexible left column and the bounded action aligns right.
- At 48rem and below the row stacks; at 30rem and below the action spans the available width.
- Validation messages stay directly below their fields and do not overlap the action row.

### Preserved Behavior

- No server submission, storage, tracking, or success claim.
- Direct recipient email remains available.
- Invalid submission focuses the first invalid field.
- Valid submission creates one encoded `mailto:` URL and leaves draft content visible.

## Loading, Empty, and Failure Presentation

- **Initial**: summary grid only; no placeholder gallery skeleton that reserves excessive page height.
- **Loading**: compact group-region status with no original-media request.
- **Empty**: safe `No public items are available in this group.` state used only when a known group resolves empty unexpectedly.
- **Not found**: safe `This archive group is unavailable.` state; no import attempt.
- **Load failure**: safe message plus Retry.
- **Item failure**: metadata and safe action remain; no raw error or path.

## Responsive and Review Contract

- Review widths: 320, 768, 1280, and 1440 pixels in light and dark themes.
- Verify 200-percent zoom, increased text spacing, keyboard-only activation/retry, focus visibility, forced colors, and no horizontal overflow.
- Measure initial requests, first group activation, repeat activation, and representative image/document groups.
- Candidate review includes Scientific Research, Academic Competitions, Community and Conservation, Scholarships, Contact, image failure, loader failure, and empty/unknown group states.
- Active promotion requires explicit candidate approval after all blocking findings are cleared.
