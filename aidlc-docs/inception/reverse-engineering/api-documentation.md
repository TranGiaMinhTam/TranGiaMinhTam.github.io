# API Documentation

## External APIs

No REST, GraphQL, RPC, database, or authenticated service API exists.

## Primary Internal APIs

### `PortfolioApp()`

- Composes identity, research, academic, impact, and contact registries.
- Wraps `PortfolioExperience` in `JournalRoute`.

### `PortfolioExperience({ sectionBodies })`

- Reads theme and section-progress state.
- Supplies navigation, registration, theme, findings, and bodies to `ObservatoryShell`.

### `ObservatoryShell(props)`

- Inputs: active section, progress, theme, findings, navigation callbacks, registration callback, theme callback, and optional section-body registry.
- Output: masthead, sticky navigation band, progress, ten registered sections, status note, and footer.

### `SpecimenMasthead()`

- Output: specimen code, Minh Tam brand name, research-field label, and active-profile signal.
- Current limitation: accepts no theme-control slot or action props.

### `ThemeControl({ theme, onToggle })`

- Inputs: current `ThemeState` and toggle callback.
- Behavior: exposes an accessible button naming the next theme and displays the current field label.

### `ResearchRelationshipSummary({ domain, rows })`

- Inputs: domain identifier and verified semantic rows.
- Output: a visible captioned HTML table with marker, relationship, and verified-target columns.

### `RelationshipSummary({ rows, emphasizedQuestionId })`

- Inputs: identity relationship rows and optional emphasized question.
- Output: a visible captioned semantic table synchronized with the visual question constellation.

### `TextDocumentPreview({ capability })`

- Current output: document glyph, kind, title, caption, provenance, and an external link.
- Current constraint: it does not embed a PDF preview and exposes no modal state.

### Legacy certificate preview contract

- `Skills.tsx` uses a non-interactive first-page `<object>` preview inside a keyboard-activatable card.
- Selecting a certificate opens a viewport-sized overlay with an `<iframe>`, close action, and new-tab action.
- This is retained source evidence for the requested active-portfolio PDF experience, not an instruction to reactivate the legacy component.

### Proposed shared media-viewer boundary

- Input: published evidence record, title, caption, media kind, and source URL.
- Behavior: render a lightweight preview; open a focus-managed dialog; support close, Escape, backdrop, and new-tab/download actions; restore focus to the trigger.
- Fallback: present metadata and a direct action when embedded PDF or image rendering is unavailable.

### `composePortfolioBodyRegistries(...registries)`

- Inputs: distinct partial section-body registries.
- Output: one immutable body registry.
- Validation: duplicate section ownership is rejected.

## Core Data Models

- `SectionDefinition` and `SectionId` define the ten canonical sections.
- `ThemeState` defines the selected theme, source, and explicit-choice state.
- Domain catalog and selection types define verified identity, research, academic, tool, fieldwork, contact, and journal content.
- Validation findings distinguish blocking source failures from recoverable presentation states.

## Browser Contracts

- Section routes use canonical hash identifiers such as `#identity` and `#laboratory-research`.
- Journal uses a constrained lazy hash route.
- Theme preference is stored locally when available.
- Contact submission opens an encoded `mailto:` URL and stores no form data.
- Resume download requires a local bundled PDF and an explicit download filename.
- Document detail viewing must not navigate away by default and must remain usable by keyboard and screen reader.
