# Functional Design Plan - U-05 Academic and Evidence

> **Status: Functional Design artifacts complete and awaiting explicit approval. No U-05 application source has been generated.**

## Unit Context

- **Unit**: U-05 Academic and Evidence
- **Review boundary**: VU-04
- **Primary stories**: ST-009 and ST-010
- **Primary requirements**: FR-009, FR-010, and FR-017
- **Inherited obligations**: ST-013 and ST-016 through ST-021
- **Prerequisites**: U-01 through U-04 are approved
- **Owned domains**: Academic Trajectory and Evidence Library
- **Owned source boundary**: future `src/portfolio/academics/`, pure academic/evidence selectors, local styles, focused tests, and plan-approved optimized derivatives
- **Excluded domains**: resume/CV publication, tools, fieldwork, leadership, contact, journal detail, infrastructure, deployment, and runtime raw-document processing

## Verified Source Assessment

- Two verified academic records describe IGCSE study from 2022 to 2024 and the AS & A-Level program from August 2024 to the present, both at Vinschool Central Park.
- Verified details include IGCSE grades, Grade 10 GPA, Grade 11 AS-level grades, current Grade 12 status, IELTS 7.0, subject focus, institutions, and periods.
- The publication manifest contains one transcript, two scholarship documents, three research documents, one competition certificate, three project images, and no approved CV.
- The transcript is academic evidence and must not be presented as the pending CV requested for the Identity section.
- PDF evidence has descriptive text and on-demand full files but no approved image-preview derivatives. The three project images are approved lazy previews.
- Existing former-owner writing, private files, malformed destinations, and raw archives remain outside the publication boundary.

## Design Steps

- [x] Read the U-05 unit definition, story map, ST-009, ST-010, FR-009, FR-010, FR-017, and inherited cross-cutting obligations.
- [x] Inspect verified academic records, the publication manifest, provenance contracts, shell/body seams, active U-04 composition, and excluded-source boundaries.
- [x] Identify chronology, grade disclosure, scholarship placement, evidence inventory, preview, provenance, interaction, failure, semantic, and responsive decisions requiring confirmation.
- [x] Create mutually exclusive A/B/X questions with recommended decisions and explicit constraints.
- [x] Receive complete answers to Questions 1 through 12.
- [x] Resolve every ambiguity or add focused clarification questions. All answers were explicit and consistent; no clarification was required.
- [x] Generate `business-logic-model.md`.
- [x] Generate `business-rules.md`.
- [x] Generate `domain-entities.md`.
- [x] Generate `frontend-components.md`.
- [x] Validate artifact structure, tables, identifiers, parsing compatibility, and whitespace.
- [x] Update state, README, plan checkboxes, and append-only audit.
- [x] Present the standardized U-05 Functional Design completion message and wait for explicit approval.

## Question 1 - Academic Composition

Which custom structure should replace the existing ledger and conventional timeline?

A) Use a curriculum cross-section: two chronological learning strata with institution anchors, subject clusters, qualification markers, and evidence connections, without a timeline rail
B) Use a conventional vertical timeline with dated education cards
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It preserves chronology while giving the section an academic structure distinct from the original site and every completed unit.

## Question 2 - Verified Academic Detail

How much verified academic detail should appear in the trajectory?

A) Show the exact published GPA, IGCSE grades, AS-level grades, IELTS result and date, current Grade 12 status, subject focus, institution, and period
B) Show only program names, institutions, and periods and omit all grades and language qualification details
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. These details are verified and directly support admissions review without inference.

## Question 3 - Current Study Status

How should ongoing Grade 12 study be represented?

A) Label it explicitly as `In progress` and keep completed Grade 10 and Grade 11 results visually separate from current study
B) Present Grade 12 alongside completed results without a status distinction
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It prevents current study from being mistaken for a completed qualification.

## Question 4 - Scholarship Placement

How should the two verified scholarship offers relate to the academic trajectory?

A) Add concise recognition markers in Academic Trajectory that resolve to the same two manifest records also indexed in Evidence Library, without duplicating assets or adding acceptance claims
B) Keep scholarship records only in Evidence Library with no academic relationship
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It connects academic promise to evidence while preserving one canonical record and avoiding invented enrollment or acceptance claims.

## Question 5 - Evidence Library Scope

Which approved items should the central Evidence Library index?

A) Index every published manifest record: transcript, scholarship documents, research publication, brochure, poster, certificate, and three approved project images, while preserving one canonical item per evidence identifier
B) Index only academic transcript and scholarship documents because research evidence already appears in U-04
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. A complete curated library gives reviewers one authoritative verification surface without duplicating files.

## Question 6 - PDF Preview Strategy

How should PDF records appear when no approved optimized image preview exists?

A) Use a compact text-first document preview with type, title, caption, provenance, file format, and an explicit on-demand open action; do not rasterize, embed, or preload the PDF
B) Embed the first PDF page or load the full PDF inside the library automatically
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It satisfies the preview requirement using verified metadata while keeping large files user initiated.

## Question 7 - Image Preview Strategy

How should the three approved project images behave in the library?

A) Render intrinsically sized, lazy, asynchronously decoded previews with meaningful alternatives and local failure text, then provide a separate full-image action
B) Load full-resolution images eagerly as background decoration
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It preserves performance, layout stability, accessibility, and local failure recovery.

## Question 8 - Library Organization

Which structure should organize the evidence without becoming a generic card grid?

A) Use a full-width archival index grouped into Academic Record, Scholarships, Research Outputs, and Project Visuals, with asymmetric rows and persistent metadata columns
B) Use a uniform responsive grid of identical evidence cards
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It resembles a curated scientific archive and makes type and provenance easier to compare.

## Question 9 - Evidence Interaction

How much filtering or disclosure interaction should the library require?

A) Keep all approved records in the reading flow, add native category jump links only when useful, and reserve activation for opening full evidence
B) Hide evidence behind filters, accordions, or a carousel by default
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. Reviewers can scan the complete allowlist without operating a custom control system.

## Question 10 - Provenance and Safety

What should happen when evidence is unpublished, malformed, private, or missing?

A) Exclude unpublished, private, and unsafe records; keep the verified academic content when optional evidence is absent; and show a local unavailable state only where an approved preview fails
B) Render every discovered file and disable broken actions after the page loads
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It enforces the publication boundary before presentation and prevents evidence failure from erasing verified facts.

## Question 11 - Semantic Evidence Summary

How should reviewers understand the evidence distribution without relying on color or graphics?

A) Derive a compact evidence-spectrum summary and a semantic count list from the same normalized collection, using text labels, counts, markers, and line styles in addition to color
B) Use color-only decorative bars without a text equivalent
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It provides exact visual and nonvisual equivalence without inventing metrics beyond manifest counts.

## Question 12 - Responsive Reading Order

How should both sections adapt at narrow widths and increased text spacing?

A) Preserve one continuous order—program, verified results, recognition, evidence connection, then the grouped archive—while stacking metadata columns and keeping every action reachable without horizontal scrolling
B) Preserve the desktop geometry with horizontal scrolling for strata and archive rows
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It keeps chronology, provenance, and evidence actions understandable at phone widths and 200-percent zoom.

## Recommendation Summary

The recommended path is option A for Questions 1 through 12. It creates a curriculum cross-section and archival evidence index, publishes all verified academic details, distinguishes ongoing study, connects canonical scholarship evidence without duplication, keeps PDFs on demand, makes image failure local, enforces publication safety, and preserves semantic and responsive equivalence.

## Extension Compliance

- **Security Baseline**: Disabled in workflow state; skipped.
- **Property-Based Testing**: Disabled in workflow state; skipped.
