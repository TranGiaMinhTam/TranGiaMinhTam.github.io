# U-06 Frontend Components

## Composition Overview

U-06 supplies two custom bodies to the existing section-body registry. Methods and Tools uses a relationship-based capability map grouped by verified category with demonstrated/interest classification. Fieldwork and Leadership uses two labeled kind-based groups. Core facts remain visible without custom disclosure state, and no evidence action renders while none exists in the manifest.

## Component Hierarchy

- `ToolsFieldworkBodies`
  - `MethodsAndTools`
    - `ToolCategoryGroup`
    - `ClassifiedToolEntry`
    - `ToolContextLink`
    - `ToolClassificationSummary`
  - `FieldworkAndLeadership`
    - `ActivityGroup`
    - `ActivityRecordCard`
    - `ActivitySummary`

These names define responsibility boundaries rather than mandatory one-component-per-file generation.

## ToolsFieldworkBodies

- **Purpose**: Register exactly `tools` and `fieldwork-leadership` with the duplicate-rejecting registry composer.
- **Inputs**: Accepted U-06 assembly and existing shell navigation context.
- **Behavior**: Supply immutable view models to the matching shell section identifiers.
- **Failure**: Tools failure and Fieldwork/Leadership failure remain section-local; neither body substitutes unrelated legacy content.
- **Boundary**: U-06 does not own the seven completed U-01 through U-05 bodies or the final temporary Contact/Journal body.

## MethodsAndTools

- **Structure**: Four ordered category clusters (Academic, Research & Data, Laboratory, Languages & Interests), each listing its verified tools with a visible demonstrated/interest marker and, for demonstrated tools, a native link to the linked U-04/U-05 section anchor.
- **Inputs**: `ToolsViewModel`.
- **State**: No filter, expansion, carousel, or hidden detail state.
- **Actions**: Native in-page links to existing U-04/U-05 section anchors for demonstrated tools only; no external navigation.
- **Classification behavior**: `Interest` is always textual and adjacent to the tool, using shape/border/label distinction, never color alone.
- **Responsive behavior**: Categories become a continuous sequence: category label, tool, classification, linked context (if any).
- **Distinctness**: No proficiency matrix, star or bar rating, repeated skill-row grid, or reuse of U-04/U-05 presentation components.

## FieldworkAndLeadership

- **Structure**: Two ordered groups, Fieldwork then Leadership, each rendering role/title, organization, exact period, and every verified description point for its records.
- **Inputs**: `FieldworkLeadershipViewModel`.
- **State**: No filter, expansion, carousel, or hidden detail state.
- **Actions**: None currently; an evidence action renders only if a future plan-approved manifest entry supplies a matching id.
- **Responsive behavior**: Role, organization, period, and description stack in one continuous order per record without reordering across groups.
- **Distinctness**: No activity log, reverse-chronological timeline, ledger table, or generic card grid.

## Shared Components

### ToolContextLink

- Receives one demonstrated tool's linked section id and label.
- Renders a native in-page link with the tool name and linked context in its accessible name.
- Moves focus to the existing target section anchor; does not duplicate or re-render that section's content.
- Absent entirely for interest-classified tools.

### ActivityRecordCard

- Receives one `ActivityRecord`.
- Renders title, organization, period, and description points as visible text.
- Renders no image, icon, or evidence action unless a resolved evidence item is supplied.
- Uses stable `{group-kind}-{record-id}` test identifiers.

### ToolClassificationSummary / ActivitySummary

- Receive the same classified-tool or activity-group entries used by their visual body.
- Render an adjacent semantic list preserving exact category/group identifiers, labels, counts, and order.
- Expose no hover-only detail or animation-dependent meaning.

## Interaction Flow

1. A visitor enters Methods and Tools through shell hash navigation.
2. The four verified categories appear in order, each tool marked demonstrated or interest in text.
3. Activating a demonstrated tool's context link moves focus to the existing U-04/U-05 section anchor without leaving the page or duplicating content.
4. A visitor enters Fieldwork and Leadership and encounters the Fieldwork group followed by the Leadership group, each with full role, organization, period, and description text.
5. No action is available on any record while no evidence id resolves; this is the expected, honest current state.

## Accessibility Contract

- The shell supplies the section heading; body headings begin at the next valid level.
- Classification, group kind, role, organization, period, and linked context are always textual.
- Capability/activity visuals and semantic summaries are generated from identical entries.
- Native context links have visible focus and purpose-based accessible names.
- No content requires hover, dragging, autoplay, color perception, or SVG interpretation.
- Increased text spacing, 200-percent zoom, reduced motion, and 320-pixel reflow preserve reading order.

## Data and Integration Boundaries

- Components consume view models and never import `src/data/skills.ts` or `src/data/experience.ts` directly; they consume `verifiedPortfolioSource.ts` through pure selectors, matching the U-04/U-05 pattern.
- U-06 may link to U-04/U-05 existing section anchors but does not import their presentation components.
- `src/data/awards.ts`, `src/data/gallery.ts`, `src/data/videos.ts`, and `src/components/Awards.tsx` remain outside the U-06 boundary; they are unreferenced legacy files and are not adopted, modified, or removed by this unit.
- No API, analytics request, form, database, runtime document parser, or server behavior is introduced.

## Testable Outcomes

- Sixteen tools appear once, correctly categorized, each with its exact Tool Linking Table classification and, where demonstrated, its correct linked context.
- No numeric rating, proficiency level, or endorsement appears anywhere in either body.
- One Fieldwork record and three Leadership records appear once each, in verified order, with exact role, organization, period, and description text.
- No evidence action renders anywhere in U-06 while the manifest contains no matching id.
- Visual grouping and semantic summary entries match exactly for both bodies.
- Wide and narrow compositions remain readable without document-level overflow.
