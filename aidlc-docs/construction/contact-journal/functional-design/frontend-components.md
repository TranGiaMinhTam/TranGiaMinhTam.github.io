# U-07 Contact and Journal Frontend Components

## Component Boundary

```text
Portfolio route orchestrator
  +-- continuous portfolio
  |   +-- ContactSignal
  |       +-- ContactProtocol
  |       +-- ContactComposer
  |       +-- ContactErrorSummary
  |       +-- DirectEmailAction
  +-- lazy JournalRoute
      +-- ResearchNotePage
      |   +-- NoteProvenanceHeader
      |   +-- NoteSectionSequence
      |   +-- EvidenceAction
      |   +-- ReturnToDataStories
      +-- JournalNotFound
          +-- ReturnToDataStories
```

The tree is a text-only hierarchy. The route orchestrator selects either the continuous portfolio with Contact or the lazy Journal route. Journal renders either the approved research note or the not-found state.

## `ContactSignal`

- **Purpose**: Own the complete final shell body for `contact`.
- **Input**: `ContactViewModel` and the pure mailto builder.
- **State**: Raw draft, validation findings, and attempted-submission flag only.
- **Structure**: Correspondence protocol and recipient context precede the labeled composer in DOM order.
- **Boundary**: No storage, request, telemetry, or false delivery state.
- **Automation identifier**: `contact-signal-body`.

## `ContactProtocol`

- Presents the verified recipient, direct email action, and explicit privacy boundary.
- Uses semantic text rather than decorative status lights as the only explanation.
- Remains before the composer when stacked on narrow screens.

## `ContactComposer`

- Uses a native form with labeled name, email, and message controls.
- Applies `maxLength` consistent with the domain contract without relying on browser validation alone.
- Associates field findings with controls using stable identifiers and `aria-describedby`.
- On invalid submit, renders the full error summary and focuses the first invalid control.
- On valid submit, builds the approved mailto URL and performs the external-protocol handoff without clearing state.
- Stable identifiers follow `contact-composer-{name|email|message|submit}`.

## `ContactErrorSummary`

- Appears only after an invalid submission.
- Uses an alert or equivalent announced status without repeated announcements on every keystroke.
- Lists every current field error in name, email, message order.
- Does not replace field-level messages.

## `DirectEmailAction`

- Uses the verified direct `mailto:` destination with an accessible name identifying Minh Tam.
- Remains visible whether validation succeeds, fails, or JavaScript handoff is unavailable.
- Does not include the visitor draft.

## Portfolio Route Orchestrator

- Reads the already constrained hash adapter rather than introducing a routing library.
- Preserves the continuous portfolio for non-journal locations.
- Loads Journal presentation code only for the journal namespace.
- Converts an approved resolved note into the lazy route input; a valid unknown slug becomes not-found.
- Exposes deterministic loading and local failure states.

## `JournalRoute`

- **Input**: Current validated journal hash and the assembled note tuple.
- **Output**: `ResearchNotePage` or `JournalNotFound`.
- **Focus**: Moves focus to the stable page heading after the route presentation mounts.
- **Boundary**: Does not discover Markdown modules or fetch content.

## `ResearchNotePage`

- Renders one semantic `article` with one page heading.
- Uses a field-note sheet rather than the rejected publication article or generic blog card.
- Presents the exact canonical title, provenance label, and seven sections in fixed order.
- Constrains long-form measure while allowing lists and actions to wrap naturally.
- Keeps evidence user initiated and preserves meaningful accessible names.
- Provides `ReturnToDataStories` before and after the note when useful without duplicating landmark names.
- Automation identifier: `research-note-page-sim-lse-data-analytics`.

## `NoteProvenanceHeader`

- States that the page is a verified project note derived from approved portfolio records.
- Shows the `Team-led project` contribution disclosure and timeline without implying authorship or results.
- Does not expose source filesystem paths.

## `NoteSectionSequence`

- Renders Question, Context, Contribution, Methods, Tools, Timeline, and Evidence in exact order.
- Uses semantic headings and lists; no informational relationship depends on graphics or color.
- Omits only optional evidence actions when unavailable.

## `JournalNotFound`

- Provides a page heading, concise explanation, and attempted slug in safe text form.
- Never injects slug content as markup.
- Provides a direct `#data-stories` return action.
- Uses the same restrained route shell and theme tokens as the valid note.
- Automation identifier: `journal-not-found`.

## `ReturnToDataStories`

- Uses an ordinary hash link to `#data-stories` so direct navigation remains GitHub Pages compatible.
- Has a stable accessible name such as `Return to Data Stories`.
- Relies on the existing shell target registration after the continuous view remounts.

## Responsive Geometry

- At wide widths, Contact uses two asymmetric columns with aligned top edges; the protocol column is narrower than the composer.
- At 768 CSS pixels and below, Contact becomes one column in DOM order.
- At 320 CSS pixels, controls fill the available inline size and actions wrap without overflow.
- The note remains a single reading column with a maximum measure; evidence actions stack when required.
- Increased text spacing and 200-percent zoom preserve labels, findings, content, and return actions without clipping.

## Theme, Focus, and Motion

- All foregrounds and surfaces use approved semantic tokens in both themes.
- Focus indicators use `--color-focus` and remain visible against every owned surface.
- Route-entry focus occurs without smooth scrolling when reduced motion is requested.
- No hover-only disclosure, animated data visual, or color-only validation state is introduced.

## Failure Components

- Invalid Contact source: local unavailable status inside the Contact body.
- Invalid draft: error summary plus field-level messages; all input retained.
- Journal lazy-load failure: route-local unavailable state with Data Stories return.
- Unknown slug: `JournalNotFound`.
- Missing optional note evidence: text note remains, with no dead action.

## Testable Frontend Contracts

- All labels resolve to their controls and error descriptions.
- Invalid submit focuses the first invalid field and never invokes mailto navigation.
- Valid submit produces the exact encoded subject and body without clearing the draft.
- Direct email exists independently of form state.
- Contact values never reach storage or network adapters.
- Known, unknown, malformed, and non-journal hashes follow their distinct contracts.
- Route entry and return behavior preserve headings and focus.
- Data Stories and Journal expose the same canonical destination.
- Former-owner text never appears in the active Contact, discovery, or Journal output.
