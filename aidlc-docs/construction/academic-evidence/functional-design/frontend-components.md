# U-05 Frontend Components

## Composition Overview

U-05 supplies two custom bodies to the existing section-body registry. Academic Trajectory uses a curriculum cross-section with learning strata and institution anchors. Evidence Library uses a grouped full-width archival index with text-first document previews and lazy image previews. Core facts and evidence metadata remain visible without custom disclosure state.

## Component Hierarchy

- `AcademicEvidenceBodies`
  - `AcademicTrajectory`
    - `CurriculumCrossSection`
    - `AcademicStratum`
    - `AcademicFactCluster`
    - `ScholarshipRecognition`
    - `AcademicEvidenceAction`
    - `AcademicRelationshipSummary`
  - `EvidenceLibrary`
    - `EvidenceCategoryNavigation`
    - `EvidenceSpectrumSummary`
    - `EvidenceArchiveGroup`
    - `EvidenceArchiveRow`
    - `TextDocumentPreview`
    - `LazyEvidenceImage`
    - `EvidenceCountSummary`

These names define responsibility boundaries rather than mandatory one-component-per-file generation.

## AcademicEvidenceBodies

- **Purpose**: Register exactly `academic-trajectory` and `evidence-library` with the duplicate-rejecting registry composer.
- **Inputs**: Accepted U-05 assembly and existing shell navigation context.
- **Behavior**: Supply immutable view models to the matching shell section identifiers.
- **Failure**: Required academic failure and library failure remain section-local; neither body substitutes unrelated legacy content.
- **Boundary**: U-05 does not own the first five completed bodies or the final three temporary bodies.

## AcademicTrajectory

- **Structure**: A curriculum cross-section with an in-progress AS & A-Level stratum and a completed IGCSE stratum, institution anchors, subject clusters, result clusters, recognition markers, and transcript evidence.
- **Inputs**: `AcademicTrajectoryViewModel`.
- **State**: No filter, expansion, carousel, or hidden detail state.
- **Actions**: Native transcript and scholarship evidence links with explicit type and new-context information.
- **Status behavior**: `In progress` is always textual and adjacent to the current program.
- **Responsive behavior**: Strata become a continuous program-first sequence with status, institution, period, subjects, facts, recognition, and evidence.
- **Distinctness**: No ledger rows, date rail, education cards, or reuse of the U-04 method pipeline.

## EvidenceLibrary

- **Structure**: Four ordered archive groups using asymmetric full-width rows with persistent kind, title, caption, provenance, preview, and action information.
- **Inputs**: `EvidenceLibraryViewModel`.
- **State**: Local image-failure state only. Accepted evidence is not filtered or hidden.
- **Actions**: Optional native category jump links and native full-evidence actions.
- **Responsive behavior**: Metadata columns stack within each row while preserving group and item order.
- **Distinctness**: No uniform card grid, masonry gallery, carousel, modal-only metadata, or embedded PDF viewer.

## Shared Components

### AcademicEvidenceAction

- Receives one resolved published evidence item and a purpose label.
- Renders a native link with evidence kind, purpose, media format, and new-context information in its accessible name.
- Opens only the selected same-origin asset after activation.
- Never embeds, preloads, prefetches, or fetches the asset.
- Uses stable `{section}-{purpose}-evidence-link` test identifiers.

### TextDocumentPreview

- Receives one PDF library item.
- Renders document type, title, caption, provenance, and PDF format as visible text.
- Contains no iframe, object, embed, canvas rasterization, or generated thumbnail.
- Delegates opening to `AcademicEvidenceAction`.

### LazyEvidenceImage

- Receives one approved image item with intrinsic geometry and meaningful alternative text.
- Uses lazy loading and asynchronous decoding.
- Reserves layout space before load.
- Replaces only its preview with an accessible local status when loading fails.
- Keeps title, caption, provenance, and full-image action available after preview failure.

### EvidenceSpectrumSummary

- Receives normalized spectrum entries.
- Renders compact count marks using group labels, numeric counts, borders, and non-color markers.
- Exposes no hover-only details or animation-dependent meaning.

### EvidenceCountSummary

- Receives the same spectrum entries and renders an adjacent semantic list.
- Preserves exact group identifiers, labels, counts, and order used by the visual spectrum.

## Interaction Flow

1. A visitor enters Academic Trajectory through shell hash navigation.
2. The current program, in-progress status, exact verified facts, earlier IGCSE foundation, scholarship-offer markers, and transcript connection appear in DOM order.
3. Activating academic evidence opens only that canonical published file.
4. A visitor enters Evidence Library and encounters the evidence-spectrum summary followed by the complete grouped archive.
5. Optional category links move focus to native group anchors without filtering content.
6. PDF rows remain text-first until a visitor activates their open action.
7. Image previews load lazily; local failure does not affect adjacent rows or actions.

## Accessibility Contract

- The shell supplies the section heading; body headings begin at the next valid level.
- Academic completion state, results, evidence type, provenance, and counts are always textual.
- Spectrum graphics and semantic counts are generated from identical entries.
- Native links have visible focus and purpose-based accessible names.
- Group anchors receive appropriate focus treatment when navigated.
- No content requires hover, dragging, autoplay, color perception, or SVG interpretation.
- Increased text spacing, 200-percent zoom, reduced motion, and 320-pixel reflow preserve reading and action order.

## Data and Integration Boundaries

- Components consume view models and never import legacy `src/data/` modules directly.
- Pure selectors consume U-01 verified records and the publication manifest.
- U-05 may reuse contracts and styling tokens but does not import U-04 presentation components.
- The U-03 portrait stays outside Evidence Library, and the transcript stays distinct from the pending CV.
- No API, analytics request, form, database, runtime document parser, or server behavior is introduced.

## Testable Outcomes

- Two academic programs appear once with exact institution, period, subject, result, language, and status facts.
- Current and completed academic states remain distinguishable without color.
- Two scholarship markers and the transcript resolve to canonical evidence identifiers without duplicated files.
- The intact manifest produces archive counts of one Academic Record, two Scholarships, four Research Outputs, and three Project Visuals.
- Every PDF is text-first and user initiated; every image is lazy, intrinsically sized, and locally recoverable.
- Visual spectrum entries and semantic count entries match exactly.
- Invalid, unpublished, raw, private, portrait, former-owner, and later-unit-only records remain absent.
- Wide and narrow compositions remain readable without document-level overflow.
