# U-04 Business Logic Model

## Purpose and Boundary

U-04 converts the three verified research project records and their published evidence relationships into three distinct section bodies: Computational Projects, Laboratory Research, and Data Stories. Each project appears once. The unit does not infer findings, roles, repositories, quantitative results, external writing, or publication claims, and it does not implement journal detail routing.

## Deterministic Content Flow

1. Select verified project records from the U-01 source.
2. Require exactly one computational project, one laboratory project, and one data story.
3. Preserve each record's question, summary, domain, methods, tools, period, provenance, order, and evidence identifiers.
4. Resolve only published evidence identifiers through the evidence manifest.
5. Treat unresolved evidence as an optional evidence finding while retaining the verified textual project.
6. Create a normalized ordered relationship collection for methods, tools, time context, and published evidence.
7. Project the same relationship collection into the visible scientific structure and its semantic ordered-list or table equivalent.
8. Register exactly the `computational-projects`, `laboratory-research`, and `data-stories` bodies through the existing shell registry seam.

## Workflow 1 - Computational Project

The molecular-docking project becomes a full-width computational pipeline.

1. Lead with the exact verified research question and computational context.
2. Show the contribution row as `Role not specified in verified source`.
3. Present methods in source order: protein preparation, active-site grid design, virtual screening, and interaction visualization.
4. Present AutoDock Vina, molecular visualization, and the interactive web platform as tools, not proficiency ratings.
5. Show the verified August 2025–June 2026 time band.
6. Terminate the pipeline in two published evidence actions: research publication and project figure.
7. Do not name the five therapeutic targets because their identities are not present in the approved canonical record.

## Workflow 2 - Laboratory Research

The cashew-testa project becomes a specimen-to-assay bench sequence.

1. Lead with the exact verified research question and intent.
2. Identify cashew testa as the investigated agricultural by-product without asserting experimental significance.
3. Show the contribution row as `Role not specified in verified source`.
4. Preserve method order: ultrasound-assisted extraction, DPPH and ABTS assays, disk diffusion, MIC testing, and formulation prototyping.
5. Treat the skincare cream as a prototype boundary, not a validated product or outcome claim.
6. Show the verified January–September 2025 time band.
7. Resolve the international research poster and project figure as on-demand evidence.

## Workflow 3 - Data Story

The SIM-LSE analytics project becomes an analytical signal sheet rather than a journal list or decorative dashboard.

1. Lead with the exact verified research question and retail-data context.
2. Show `Team-led project` because the approved abstract explicitly supports that wording.
3. Separate the workflow into data exploration, dashboard design, pattern interpretation, and recommendation framing.
4. Name Tableau, interactive dashboards, and retail analytics as tools or context, without inventing measures, chart values, or business outcomes.
5. Show the verified 2026 time context.
6. Resolve the participation certificate and project figure as evidence.
7. Follow the verified project with the publication status `Research notes are being prepared`.
8. Expose no local or external writing destination because every existing writing item belongs to a former owner.

## Evidence Resolution

For each project evidence identifier:

- accept only a published manifest record;
- retain its explicit type, title, caption, provenance, and accessible text;
- lazy-load project figures with intrinsic reserved geometry;
- expose documents through native purpose-labeled links only after visitor activation;
- never preload, embed, or fetch PDFs in application code;
- omit an unavailable action without removing the project narrative.

Evidence actions use stable identifiers based on project and evidence purpose. A figure-loading failure produces a local media-unavailable message and leaves the adjacent research content intact.

## Normalized Relationship Projection

Each project produces ordered relationships with these categories:

| Relationship | Source | Target | Meaning |
| --- | --- | --- | --- |
| uses-method | Project | Method | A method listed in the approved project record |
| uses-tool | Project | Tool | A tool or working context listed in the approved record |
| occurred-during | Project | Time band | The approved time context |
| supported-by | Project | Evidence | A published manifest relationship |

Visual tracks and semantic alternatives receive this same immutable collection. Sequence, labels, markers, and line styles carry meaning independently of color. No relationship is computed from prose similarity or runtime inference.

## Validation and Failure Outcomes

| Condition | Outcome |
| --- | --- |
| Missing or duplicate required project kind | Blocking finding; do not substitute another domain |
| Empty question, summary, methods, tools, or time context | Blocking finding for that required project |
| Unknown relationship endpoint | Blocking finding |
| Duplicate relationship identifier | Blocking finding |
| Missing optional evidence | Keep verified project text and omit only that action |
| Figure load failure | Replace the figure locally with an accessible media-unavailable note |
| Invalid local or external writing item | Exclude it from Data Stories |
| No verified writing remains | Show `Research notes are being prepared` without a link |
| Enhanced interaction unavailable | Preserve all facts and native evidence links in source order |

## Scenario Outcomes

- A mentor can distinguish computational and laboratory practice from headings, terminology, method order, geometry, and semantic structure without depending on color.
- A reviewer can understand the SIM-LSE analytical workflow without seeing invented charts or metrics.
- Keyboard and touch visitors encounter all core facts before optional evidence actions.
- At narrow widths, each domain becomes one ordered column without hiding content in hover, accordion, carousel, or disclosure state.
- Later U-07 journal routing receives no false student-authored link.

## Traceability

This model covers ST-005, ST-006, and ST-007; FR-006, FR-007, FR-008 discovery scope, FR-010 research evidence, FR-013; and inherited integrity, accessibility, performance, responsiveness, resilience, and maintainability obligations.
