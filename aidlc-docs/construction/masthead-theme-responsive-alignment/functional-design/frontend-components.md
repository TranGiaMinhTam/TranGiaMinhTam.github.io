# U-02 Frontend Component Design

## Component Hierarchy

The active shell hierarchy remains a single continuous document:

- `PortfolioExperience`
  - `ObservatoryShell`
    - skip link
    - `SpecimenMasthead`
      - identity lockup
      - scientific context and status
      - top action cluster
        - `ThemeControl`
        - optional `ResumeAction`
    - existing sticky section navigation
    - existing progress band
    - main landmark with ten sections
      - domain visual component
      - `SemanticSummary` where reviewed relationship/count/sequence meaning exists
    - footer

U-02 does not introduce a second shell, sidebar, drawer, hero route, or duplicate theme controller.

## `SpecimenMasthead`

### Responsibility

Render the polished scientific identity panel, preserve one header landmark, and place top-level actions above sticky navigation.

### Proposed Contract

```ts
type SpecimenMastheadProps = Readonly<{
  model: MastheadPresentation;
  onToggleTheme: () => void;
}>;
```

### Visual Structure

- An accent-tinted panel uses fine grid/specimen marks and one deliberate rule.
- The name remains the strongest element.
- The specimen code, field label, and active status form a compact supporting system.
- The action cluster occupies the upper-right area in expanded layouts.
- At constrained widths, the component becomes one column in unchanged semantic order.
- Decorative marks use pseudo-elements or hidden elements and never enter the accessibility tree.

### Automation Contract

- Retain `data-testid="observatory-masthead"`.
- Add stable identifiers for the action cluster and optional resume action during Code Generation.
- Do not generate IDs from layout variant or viewport width.

## `ThemeControl`

### Responsibility

Invoke the existing controller and communicate the next theme action.

### Proposed Contract

```ts
type ThemeControlProps = Readonly<{
  currentTheme: "light" | "dark";
  onToggle: () => void;
}>;
```

### Interaction

- Visible and accessible text says `Switch to dark` or `Switch to light`.
- An optional icon is `aria-hidden`.
- Button activation invokes `onToggle` once.
- The existing test identifier remains stable.
- Focus styling is visible in light, dark, and forced-colors modes.
- No component-local theme state is introduced.

## Optional `ResumeAction`

### Responsibility

Render the U-01 local PDF capability in the reserved masthead slot once U-03 supplies the approved composition model.

### Proposed Contract

```ts
type ResumeActionProps = Readonly<{
  capability: DownloadableResume;
  placement: "masthead";
}>;
```

The action is a native anchor with `download="Tran-Gia-Minh-Tam-Resume.pdf"`. It performs no fetch, analytics call, or external navigation. U-02 defines its geometry; U-03 owns final activation and the corresponding Identity placement.

## `SemanticSummary`

### Responsibility

Replace visible relationship tables with equivalent assistive-technology meaning while consuming no visible layout space.

### Proposed Contract

```ts
type SemanticSummaryProps = Readonly<{
  model: SemanticSummaryModel;
  testId?: string;
}>;
```

### Rendering Rules

- Relationships render a labelled list whose items read source, relationship, and target in that order.
- Counts render a labelled description list.
- Sequences render a labelled ordered list.
- The heading is contained inside the shared visually-hidden wrapper.
- The wrapper remains in the accessibility tree and occupies one CSS pixel before clipping/insetting.
- The component never uses a visual `<table>` and never introduces horizontal scrolling.
- An `empty` result produces no component; a `blocked` result cannot reach rendering.

### Migration Targets

- `identity/RelationshipSummary.tsx`
- `research/ResearchRelationshipSummary.tsx`
- `academics/AcademicRelationshipSummary.tsx`
- any currently visible tool/fieldwork semantic duplication identified during the source audit

Domain models remain authoritative. Migration adapts their existing semantic rows into the shared contract rather than recreating relationships in JSX.

## Six Layout Owners

### `LaboratoryResearch`

- Preserve station order and prototype-boundary meaning.
- Use a repeatable bounded station grid without fixed height.
- Align labels and body starts in expanded mode; use one-column station flow in compact mode.
- Keep method, tools, period, and evidence in logical reading order.

### Computational project body/header

- Group eyebrow, primary question, summary, and contribution note in one semantic header.
- Use a bounded question measure and eliminate independent horizontal offsets.
- Allow the discipline label to wrap without narrowing the main heading to single-word fragments.

### `ResearchQuestions`

- Align the introduction label, statement, and context note before the interactive/passive question visualization.
- Preserve the question ledger before or alongside visual enhancement according to DOM order.
- Keep emphasis interactions supplemental; hidden summary meaning is always present.

### `DataStories`

- Align index, title, and signal indicator through named grid tracks at expanded widths.
- Move the signal indicator beneath its title in compact mode without reordering data.
- Prevent long labels from defining an unbounded minimum width.

### Academic section header/trajectory

- Use shared shell alignment tracks and bounded supporting copy.
- Remove the large empty center created by widely separated columns.
- Collapse heading, status, and description in logical order at constrained widths.

### `EvidenceCountSummary`

- Preserve spectrum item identifiers, order, labels, and counts.
- Align bars, labels, and counts without fixed widths.
- Render visual tracks as supplemental and expose the same reviewed counts through `SemanticSummary`.

## Shared Layout Tokens

U-02 may add semantic tokens for:

- masthead inline/block padding;
- compact/intermediate/expanded column gaps;
- label track bounds;
- readable heading and body measures;
- action target height;
- rule and decorative-grid opacity.

Tokens describe purpose rather than a single component. Domain-specific colors remain owned by their existing token families.

## Responsive Behavior

- **Expanded**: identity/context/actions form a deliberate asymmetric panel; repeated visual elements share grid lines.
- **Intermediate**: identity spans available space and actions remain top-aligned without squeezing the context.
- **Compact**: one semantic column; labels and actions wrap; all primary content fits within the viewport.
- Sticky navigation may retain its intentional local horizontal strip. Main content and hidden summaries may not scroll horizontally.
- The design supports 320, 768, 1280, and 1440 CSS pixels, 200-percent zoom, and increased text spacing.

## Accessibility Behavior

- One header, one named primary navigation, one main landmark, ordered labelled sections, and a semantic footer remain intact.
- Skip-link behavior and logical focus order are preserved.
- The theme action announces the next state.
- Resume uses a descriptive native download label.
- Decorative masthead details are hidden from assistive technology.
- Hidden summaries remain available without duplicate sighted content.
- Reduced motion removes non-essential transitions.
- Forced colors preserves text, borders, focus, and action affordances without relying on decorative backgrounds.

## Error and Empty States

- Missing optional resume capability: omit only the resume action.
- Invalid masthead model: block candidate composition and retain the active shell.
- Intentionally empty semantic source: render no hidden component.
- Invalid semantic source: fail before render with a non-sensitive blocking finding.
- Theme storage failure: preserve current-session toggle behavior.
- Unsupported CSS enhancement: use readable base layout and surface tokens.

## Test and Review Responsibilities

- **Pure tests**: masthead presentation validation, semantic projection, layout-variant oracle, and U02-P01 through U02-P10.
- **Component tests**: theme next-action label/callback, conditional resume action, semantic list/description output, landmark order, no visible relationship table, and stable test identifiers.
- **Style-contract tests**: bounded tracks, shrink paths, no relationship-summary overflow, reduced motion, forced colors, and shared alignment tokens.
- **Accessibility checks**: heading/landmark order, keyboard actions, visible focus, hidden-summary discoverability, target size, and no duplicate accessible names.
- **Rendered review**: the ten-section viewport/theme matrix plus representative zoom/text-spacing states and named six-defect captures.
- **Activation checks**: strict TypeScript, lint, full tests, production build, bundle/overflow measurement, U-01 privacy/source/recovery gates, and explicit candidate approval.

## Integration and API Boundary

There are no backend endpoints. Integration is through typed props, the existing theme callback, U-01's local resume capability, and existing immutable semantic domain models. The unit introduces no runtime network request, new persistence surface, or dependency.
