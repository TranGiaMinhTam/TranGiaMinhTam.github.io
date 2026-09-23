# U-02 Domain Entities

## Design Principles

All U-02 entities are immutable presentation contracts. They reference validated capabilities and reviewed semantic inputs; they do not own persistence, parsing of the resume, archive transformation, or new factual content.

## Masthead Identity

```ts
type MastheadIdentity = Readonly<{
  specimenCode: string;
  name: string;
  fieldLabel: string;
  statusLabel: string;
}>;
```

Constraints:

- All fields are trimmed and non-empty.
- `name` is the primary heading content.
- `specimenCode`, field label, and status are public reviewed strings.
- No phone number, address, raw source path, or unreviewed resume text is allowed.

## Masthead Actions

```ts
type MastheadActions = Readonly<{
  theme: Readonly<{
    current: "light" | "dark";
    next: "light" | "dark";
    onToggle: () => void;
  }>;
  resume?: Readonly<{
    kind: "local-pdf-download";
    href: string;
    filename: "Tran-Gia-Minh-Tam-Resume.pdf";
    label: string;
  }>;
}>;
```

Constraints:

- `next` is always the opposite of `current`.
- The theme action exists exactly once.
- The optional resume action accepts only U-01's validated local PDF capability.
- Callbacks are supplied by the composition owner; the masthead owns no state.

## Masthead Presentation

```ts
type MastheadPresentation = Readonly<{
  identity: MastheadIdentity;
  actions: MastheadActions;
  semanticOrder: readonly ["identity", "context-status", "actions"];
  decoration: Readonly<{
    kind: "scientific-grid";
    accessibility: "decorative";
  }>;
}>;
```

The semantic order is invariant across responsive variants. Decoration has no label and no interaction.

## Semantic Summary Source

```ts
type RelationshipSummaryEntry = Readonly<{
  id: string;
  source: string;
  relationship: string;
  target: string;
}>;

type CountSummaryEntry = Readonly<{
  id: string;
  label: string;
  value: number;
}>;

type SequenceSummaryEntry = Readonly<{
  id: string;
  label: string;
  order: number;
  context?: string;
}>;

type DomainSemanticSource = Readonly<
  | {
      kind: "relationships";
      label: string;
      entries: readonly RelationshipSummaryEntry[];
    }
  | { kind: "counts"; label: string; entries: readonly CountSummaryEntry[] }
  | {
      kind: "sequence";
      label: string;
      entries: readonly SequenceSummaryEntry[];
    }
>;
```

Constraints:

- Identifiers are unique within one source.
- Labels are non-empty reviewed text.
- Relationship endpoints have already been resolved by the owning domain.
- Counts are finite non-negative integers.
- Sequence orders are positive and deterministic.
- Input order is the authoritative output order.

## Semantic Summary Result

```ts
type SemanticSummaryModel = Readonly<
  | {
      kind: "relationships";
      label: string;
      entries: readonly RelationshipSummaryEntry[];
    }
  | { kind: "counts"; label: string; entries: readonly CountSummaryEntry[] }
  | {
      kind: "sequence";
      label: string;
      entries: readonly SequenceSummaryEntry[];
    }
>;

type SemanticSummaryResult = Readonly<
  | { status: "ready"; value: SemanticSummaryModel }
  | { status: "empty" }
  | { status: "blocked"; findings: readonly SemanticSummaryFinding[] }
>;
```

`empty` is valid only for a deliberately empty reviewed source. `blocked` distinguishes malformed input from intentional absence.

## Layout Variant

```ts
type LayoutVariant = "compact" | "intermediate" | "expanded";

type LayoutConstraints = Readonly<{
  availableInlineSize: number;
  textSpacingEnhanced: boolean;
  zoomConstraint: boolean;
}>;
```

Constraints:

- Inline size is finite and non-negative.
- Accessibility constraints may force a more spacious logical flow.
- Variant selection never changes content membership or DOM order.
- CSS remains authoritative for physical layout; the entity captures the shared design decision and test oracle.

## Alignment Contract

```ts
type AlignmentContract = Readonly<{
  componentId:
    | "laboratory-stations"
    | "computational-header"
    | "question-introduction"
    | "data-signal-sheet"
    | "academic-header"
    | "evidence-spectrum";
  sourceOrder: readonly string[];
  expandedTracks: readonly string[];
  compactOrder: readonly string[];
  headingMeasureCh: number;
  allowsLocalHorizontalScroll: false;
}>;
```

Constraints:

- `sourceOrder` and `compactOrder` contain the same identifiers once.
- Expanded tracks are bounded and permit content shrinkage.
- The heading measure is positive and exists to guide wrapping, not truncate text.
- None of the six defect components permits local horizontal scrolling.

## Review Evidence

```ts
type ReviewViewport = 320 | 768 | 1280 | 1440;
type ReviewTheme = "light" | "dark";

type LayoutReviewCase = Readonly<{
  id: string;
  sectionId: string;
  viewport: ReviewViewport;
  theme: ReviewTheme;
  zoomPercent: 100 | 200;
  textSpacing: "default" | "increased";
  checks: Readonly<{
    noDocumentOverflow: boolean;
    noOverlap: boolean;
    noClipping: boolean;
    logicalOrder: boolean;
    focusVisible: boolean;
  }>;
}>;
```

The matrix contains all ten active sections at the four required viewport widths and both themes. Representative cases add 200-percent zoom and increased text spacing. Failed checks block activation.

## Findings

```ts
type U02Finding = Readonly<{
  code: string;
  severity: "blocking" | "warning";
  target: string;
  publicMessage: string;
  reviewAction: string;
}>;
```

Findings use component or reviewed-record identifiers. They never contain absolute paths, private marker values, full stack traces, or unreviewed filenames.

## Relationships

- One `MastheadPresentation` owns one `MastheadIdentity`, one theme action, and zero or one resume action.
- One visual relationship/count/sequence component may reference one `SemanticSummaryModel` generated from the same domain source.
- Each of the six defect components owns one `AlignmentContract`.
- Many `LayoutReviewCase` records verify one active section; the complete matrix gates the candidate as a whole.
- U-01 source and resume capabilities are consumed read-only and never redefined.

## Persistence and API Boundary

No entity is persisted to a database or sent through an API. Theme preference continues through the existing local preference controller. Review evidence is generated by later Code Generation tooling and remains non-sensitive.
