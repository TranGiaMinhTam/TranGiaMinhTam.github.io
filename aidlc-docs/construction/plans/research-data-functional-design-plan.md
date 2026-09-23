# Functional Design Plan - U-04 Research and Data

> **Status: Functional Design artifacts complete and awaiting explicit approval. No U-04 application source has been generated.**

## Unit Context

- **Unit**: U-04 Research and Data
- **Review boundary**: VU-03
- **Primary stories**: ST-005, ST-006, and ST-007
- **Primary requirements**: FR-006, FR-007, FR-008, FR-010 research evidence, and FR-013
- **Prerequisites**: U-01 through U-03 are approved
- **Owned domains**: Computational Projects, Laboratory Research, and Data Stories
- **Owned source boundary**: future `src/portfolio/research/`, pure research/data selectors, unit visual transforms, local styles, focused tests, evidence relationships, and typed discovery links for U-07
- **Excluded domains**: journal-detail rendering, Academic Trajectory, Evidence Library, Tools, Fieldwork and Leadership, Contact, infrastructure, and deployment

## Verified Source Assessment

- The molecular-docking project has a verified question, abstract, computational methods, tools, August 2025–June 2026 timeline, publication evidence, and project figure.
- The cashew-testa project has a verified question, abstract, wet-lab methods, tools, January–September 2025 timeline, poster evidence, and project figure.
- The SIM-LSE project has a verified question, abstract, data-analysis methods, tools, 2026 time context, certificate evidence, and project figure.
- The existing local journal article and WordPress posts contain former-owner biography and writing. They are excluded by the approved integrity boundary and cannot be published for this student.
- No repository URL, named docking target, experimental result, quantitative outcome, authorship role, or external student writing source is verified.

## Design Steps

- [x] Read the U-04 unit definition, story map, ST-005 through ST-007, FR-006 through FR-008, FR-010, FR-013, and inherited cross-cutting obligations.
- [x] Inspect the current verified project records, evidence relationships, publication manifest, local journal source, excluded legacy sources, and U-03 shell/body seam.
- [x] Identify the content-integrity, visual-distinction, evidence-loading, routing, failure, semantic-alternative, and responsive decisions that require confirmation.
- [x] Create mutually exclusive A/B/X questions with recommended decisions and explicit constraints.
- [x] Receive complete answers to Questions 1 through 10.
- [x] Resolve every ambiguity or add focused follow-up questions; all answers were explicit and no follow-up was required.
- [x] Generate `business-logic-model.md`.
- [x] Generate `business-rules.md`.
- [x] Generate `domain-entities.md`.
- [x] Generate `frontend-components.md`.
- [x] Validate artifact structure, tables, identifiers, text alternatives, parsing compatibility, and whitespace.
- [x] Update state, README, plan checkboxes, and append-only audit.
- [x] Present the standardized U-04 Functional Design completion message and wait for explicit approval.

## Question 1 - Domain Allocation

How should the three verified projects be allocated across the three U-04 sections?

A) Place molecular docking in Computational Projects, cashew testa in Laboratory Research, and SIM-LSE analytics in Data Stories so each project appears once in its strongest verified practice
B) Place both molecular docking and SIM-LSE analytics in Computational Projects, repeat SIM-LSE in Data Stories, and place cashew testa in Laboratory Research
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It creates three distinct domains, prevents duplication, and matches the verified method families.

## Question 2 - Unverified Student Role

The docking and cashew records describe work but do not explicitly state the student's authorship or role. How should the design handle that field?

A) Show a consistent contribution row and explicitly state `Role not specified in verified source` where absent; show `Team-led project` only for SIM-LSE because its approved abstract supports that wording
B) Infer likely roles such as researcher, laboratory lead, or analyst from the listed methods
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It satisfies reviewer transparency without inventing contribution claims.

## Question 3 - Computational Composition

Which custom structure should present the molecular-docking project?

A) Use a full-width computational pipeline: research question and context lead into an ordered method rail, tool annotations, verified time band, and evidence terminals, with no project card
B) Use a conventional project card with image, title, tags, and buttons
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It reads like a computational workflow and remains structurally distinct from both the original portfolio and U-03.

## Question 4 - Laboratory Composition

Which custom structure should present the cashew-testa research?

A) Use a specimen-to-assay bench sequence: verified intent, material context, ordered laboratory methods, prototype boundary, time band, and evidence strip, without implying results
B) Reuse the computational pipeline and change only its labels and colors
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It makes wet-lab practice immediately distinguishable without overstating findings.

## Question 5 - Data Stories Composition

How should the SIM-LSE analytics project appear in Data Stories?

A) Use an analytical signal sheet that separates source context, exploration, dashboard design, interpretation, recommendations, tools, and evidence without displaying fabricated charts or metrics
B) Render a decorative dashboard with invented charts to make the section look more data-driven
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It communicates data practice through verified workflow metadata rather than fake results.

## Question 6 - Former-Owner Writing

How should U-04 handle the existing local journal item and WordPress entries?

A) Exclude all of them from the student-facing Data Stories index, render no local/external writing link, and show a concise `Research notes are being prepared` publication status after the verified SIM-LSE story
B) Rewrite or relabel the existing former-owner posts for this student
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It enforces the approved integrity boundary and gives U-07 no false route to resolve.

## Question 7 - Evidence Actions and Loading

How should project evidence behave?

A) Show purpose- and type-labeled native actions; load project figures lazily, open full images/PDFs only after activation, and never embed or preload the documents
B) Embed every document and full-resolution image directly inside each section
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It preserves context, accessibility, and the approved on-demand evidence boundary.

## Question 8 - Missing Evidence Behavior

What should remain when optional project evidence is absent or fails?

A) Keep the complete verified text, methods, tools, contribution status, and timeline; omit only the unavailable evidence action or show a local media-unavailable note
B) hide the entire project until every evidence asset succeeds
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. Optional media must not erase verified research content.

## Question 9 - Scientific Visual Alternatives

How should the method and evidence visual structures remain understandable without sight or color?

A) Derive visuals and semantic ordered lists/tables from one normalized relationship collection, using text labels, sequence, line styles, and markers in addition to color
B) Treat the visual structures as decoration and provide only surrounding prose
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It preserves exact equivalence and satisfies FR-013.

## Question 10 - Interaction and Responsive Behavior

How much information should remain visible without interaction?

A) Keep question, context, contribution status, methods, tools, timeline, and evidence labels visible in the reading flow; use interaction only for native evidence opening and safe local emphasis, then collapse every custom structure to one ordered column on narrow screens
B) Hide most project facts in accordions, carousels, or hover-only overlays to reduce page length
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It supports scanning, keyboard use, touch, printing, and graceful degradation.

## Recommendation Summary

The recommended path is option A for Questions 1 through 10. Together these choices produce three non-repeated scientific compositions, preserve every verified fact, disclose unknown roles, omit former-owner writing, keep evidence on demand, provide exact semantic alternatives, and maintain one clear responsive reading flow.

## Extension Compliance

- Security Baseline: disabled in `aidlc-state.md`; skipped.
- Property-Based Testing: disabled in `aidlc-state.md`; skipped.
