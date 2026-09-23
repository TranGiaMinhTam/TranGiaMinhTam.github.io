# U-04 Frontend Components

## Composition Overview

U-04 supplies three custom bodies to the existing section-body registry. Every body receives an immutable view model, keeps core information visible without interaction, uses native evidence actions, and owns a distinct visual grammar.

## Component Hierarchy

- `ResearchDataBodies`
  - `ComputationalProjects`
    - `ComputationalContext`
    - `MethodPipeline`
    - `ToolAnnotations`
    - `ResearchEvidenceTerminals`
    - `ResearchRelationshipSummary`
  - `LaboratoryResearch`
    - `SpecimenIntent`
    - `AssayBenchSequence`
    - `PrototypeBoundary`
    - `ResearchEvidenceStrip`
    - `ResearchRelationshipSummary`
  - `DataStories`
    - `AnalyticalSignalSheet`
    - `AnalysisStages`
    - `PublicationStatus`
    - `ResearchEvidenceStrip`
    - `ResearchRelationshipSummary`

These names define responsibilities, not mandatory file boundaries. Exact files are determined during Code Generation planning.

## ResearchDataBodies

- **Purpose**: Register exactly three accepted U-04 bodies with the U-02 resolver.
- **Inputs**: Accepted research/data selection and the shell navigation context.
- **Behavior**: Map computational, laboratory, and data view models to their matching registered section identifiers.
- **Failure**: A rejected required selection renders a concise section-local unavailable state with stable finding codes; it does not substitute another project.
- **Boundary**: Does not own Identity, Questions, or any later section.

## ComputationalProjects

- **Structure**: Full-width horizontal method pipeline with a compact context header, explicit contribution row, ordered stages, tool annotations, time band, and evidence terminals.
- **Inputs**: `ComputationalProjectViewModel`.
- **State**: Optional local emphasis identifier only; no hidden content.
- **Actions**: Native evidence anchors with project/evidence purpose in their accessible names.
- **Responsive behavior**: The pipeline becomes an ordered vertical rail below its approved breakpoint.
- **Distinctness**: No repeated card, conventional media tile, or constellation reuse.

## LaboratoryResearch

- **Structure**: Specimen-to-assay bench sequence with research intent, material context, ordered laboratory stages, explicit prototype boundary, time band, and evidence strip.
- **Inputs**: `LaboratoryResearchViewModel`.
- **State**: Optional local emphasis; figure failure state when applicable.
- **Actions**: Native poster and project-figure actions.
- **Responsive behavior**: Bench stations become one numbered vertical sequence while preserving method order.
- **Distinctness**: Uses specimen labels and bench stations, not computational connectors or relabeled pipeline geometry.

## DataStories

- **Structure**: Analytical signal sheet separating retail context, exploration, dashboard design, interpretation, recommendation framing, tools, evidence, and publication status.
- **Inputs**: `DataStoryViewModel`.
- **State**: No carousel, pagination, filter, or disclosure state.
- **Actions**: Evidence actions only. No journal or external-writing link exists in U-04 because no student-authored destination is verified.
- **Publication status**: Render `Research notes are being prepared` as non-focusable status text.
- **Responsive behavior**: Columns become one continuous reading sequence.
- **Distinctness**: No invented dashboard chart, metric, article card, or current journal-list DOM.

## Shared Research Components

### ResearchEvidenceAction

- Receives resolved published evidence.
- Renders a native link with evidence type, purpose, and destination context.
- Uses `target="_blank"` only with safe same-origin behavior and an accessible new-context announcement when opening rather than downloading.
- Never embeds, preloads, prefetches, or fetches the asset.
- Is absent when optional evidence does not resolve.

### ResearchFigure

- Receives published image evidence with intrinsic dimensions and accurate alternative text.
- Uses lazy loading and asynchronous decoding outside the initial identity viewport.
- Replaces only itself with a local accessible status when image loading fails.

### ResearchRelationshipSummary

- Receives normalized relationships.
- Renders a captioned ordered list or table with relationship labels and targets.
- Uses the same relationship identifiers and order as the visible pipeline, bench sequence, or signal sheet.

## Interaction Flow

1. The visitor enters one of the three shell sections through native hash navigation.
2. The complete project context, contribution disclosure, methods, tools, and time appear in DOM order.
3. Pointer or keyboard focus may emphasize a related stage and its semantic row without revealing hidden facts.
4. Activating an evidence link opens only the selected published asset.
5. If an image fails, the local figure status replaces it and reading continues.
6. Data Stories ends with a non-interactive publication status until verified student writing is supplied.

## Accessibility Contract

- One section heading is provided by the shell; component headings begin below it in a valid hierarchy.
- Visual sequence is duplicated semantically only when the visual alone conveys relationships; redundant decorative marks are hidden.
- Evidence actions have stable purpose-based test identifiers and visible focus.
- Contribution disclosures and publication status use text, not color or icon alone.
- No information depends on hover, animation, dragging, or SVG interpretation.
- Increased text spacing, 200-percent zoom, reduced motion, and 320-pixel reflow preserve content and action order.

## Data and Integration Boundaries

- Components receive view models and never import legacy data modules.
- Selectors consume U-01 verified records and evidence contracts.
- The existing section-body seam is the only shell integration.
- U-04 exposes an empty typed destination collection for future U-07 use; it does not import journal content or routing code.
- No API endpoint, form, database, analytics call, or runtime request client is involved.

## Testable Outcomes

- Exactly three finished research bodies and five unchanged temporary bodies resolve.
- Every verified project appears once and in the approved domain.
- Unknown contribution is explicit for docking and cashew; SIM-LSE alone uses `Team-led project`.
- Method/tool sequences, time bands, evidence types, and identifiers match canonical data.
- Former-owner writing, fabricated charts, invented metrics, raw-source paths, and broken destinations are absent.
- Visual and semantic relationship identifiers match exactly.
- Optional evidence and figure failure preserve complete text.
- Wide and narrow layouts remain distinct, readable, and free of document-level overflow.
