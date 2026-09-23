# U-05 Business Logic Model

## Purpose and Boundary

U-05 converts verified academic records and the U-01 publication manifest into two review-ready section bodies: Academic Trajectory and Evidence Library. The unit preserves exact source facts, makes current study status explicit, connects scholarship offers without duplicating assets, and exposes only published evidence through user-initiated actions. It does not publish a CV, infer enrollment or scholarship acceptance, process raw documents, or implement later-unit domains.

## Deterministic Content Flow

1. Select verified `academic-item` records from the canonical source.
2. Validate identifiers, institution, program, period, specialization, ordered detail text, provenance, evidence identifiers, and source order.
3. Normalize the two programs into chronological learning strata without parsing dates at runtime or inventing missing qualifications.
4. Classify details through a closed, source-reviewed mapping as completed result, language qualification, current study status, subject focus, or academic-development statement.
5. Resolve the transcript relationship and the two scholarship-offer markers through canonical published evidence identifiers.
6. Select the ten U-05-eligible evidence records from the publication manifest. The Identity portrait remains owned by U-03 and is excluded from the library.
7. Reject duplicate identifiers and unsafe destinations before grouping accepted records.
8. Group accepted records into Academic Record, Scholarships, Research Outputs, and Project Visuals using a closed evidence-kind and identifier mapping.
9. Build a text-first preview for PDFs and a lazy intrinsic preview for approved images.
10. Derive archive rows, evidence-spectrum counts, and the semantic count list from the same accepted collection.
11. Register exactly the `academic-trajectory` and `evidence-library` bodies through the existing duplicate-rejecting body-registry composer.

## Workflow 1 - Academic Trajectory

Academic Trajectory uses a curriculum cross-section rather than a ledger or conventional timeline.

1. Present the current AS & A-Level stratum first in reading order, labeled `In progress`.
2. Present its verified institution, August 2024–Present period, Biology, Chemistry, and Mathematics focus, Grade 10 GPA 9.0/10, Grade 11 AS-level AAA, current Grade 12 Semester 1 status, and IELTS 7.0 from September 2025.
3. Present the completed IGCSE stratum with its 2022–2024 period, verified subject focus, and A* Mathematics, A* Science, and A Computer Science results.
4. Use institution anchors and subject/result clusters to show relationships without a dated timeline rail.
5. Resolve the academic transcript as an academic-evidence action. It remains a transcript and is never labeled as the pending CV.
6. Show Borsworth and Worthgate as scholarship-offer recognition markers using canonical manifest titles and provenance.
7. Do not infer application outcome, acceptance, attendance, enrollment, or use of either scholarship.

## Workflow 2 - Evidence Library

Evidence Library uses a full-width archival index with asymmetric rows and persistent metadata rather than a uniform card grid.

1. Index the ten U-05-eligible published records exactly once by evidence identifier.
2. Group the transcript under Academic Record and the two scholarship offers under Scholarships.
3. Group the publication, brochure, poster, and challenge certificate under Research Outputs.
4. Group the three approved project images under Project Visuals.
5. For PDF records, render type, title, caption, provenance, PDF format, and an explicit native open action without embedding, fetching, rasterizing, preloading, or prefetching.
6. For image records, render a lazy asynchronously decoded preview with intrinsic geometry, accurate alternative text, and a separate full-image action.
7. Keep every group and accepted item in document reading order. Category jump links may point to native group anchors but cannot filter or hide records.
8. Derive evidence-spectrum counts from the same accepted grouped collection and expose the identical values in a semantic list.

## Evidence Eligibility and Grouping

| Group | Eligible records | Presentation |
| --- | --- | --- |
| Academic Record | Academic transcript | Text-first PDF row and on-demand action |
| Scholarships | Borsworth scholarship offer; Worthgate scholarship offer | Text-first PDF rows and on-demand actions |
| Research Outputs | Global Youth Summit brochure; molecular docking publication; SIM-LSE certificate; WICO poster | Text-first PDF rows and on-demand actions |
| Project Visuals | Molecular docking, cashew polyphenol, and data analytics figures | Lazy image previews and full-image actions |

The U-03 portrait, unpublished files, malformed destinations, former-owner writing, raw source archives, and later-unit field evidence are not U-05 library records.

## Failure and Validation Outcomes

| Condition | Outcome |
| --- | --- |
| Missing or duplicate academic program | Reject Academic Trajectory with stable ordered findings |
| Empty required academic fact | Reject the affected trajectory assembly; do not invent a replacement |
| Current program without status | Reject until it is explicitly classified as in progress |
| Missing transcript relationship | Keep verified academic content and omit only the action with a finding |
| Missing scholarship evidence | Omit only the affected recognition marker with a finding |
| Unpublished, private, raw, or unsafe evidence | Exclude before presentation and record a finding |
| Duplicate evidence identifier | Reject library assembly to prevent ambiguous actions |
| Missing PDF preview derivative | Use the approved text-first preview; do not generate one at runtime |
| Image load failure | Replace only the preview with an accessible local unavailable state |
| Some eligible evidence missing | Render remaining accepted records and accurate recomputed counts |
| No eligible evidence | Render a concise library-unavailable state; academic content remains available |

## Responsive and Semantic Projection

- Wide Academic Trajectory uses two learning strata, institution anchors, and subject/result clusters.
- Narrow Academic Trajectory becomes one continuous order: program, status, institution, period, subjects, results, recognition, and evidence.
- Wide Evidence Library uses grouped full-width archive rows with aligned metadata columns.
- Narrow rows stack type, title, caption, provenance, preview, and action without horizontal scrolling.
- Evidence-spectrum marks and the semantic count list share group identifiers, labels, counts, and order.
- Text labels, counts, borders, and markers carry meaning independently of color.

## Traceability

This model covers ST-009 and ST-010; FR-009, FR-010, FR-017; and inherited integrity, accessibility, visual-alternative, performance, responsive, resilience, and maintainability obligations from ST-013 and ST-016 through ST-021.
