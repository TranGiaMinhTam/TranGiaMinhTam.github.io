# Functional Design Plan - U-05 PDF and Image Detail Viewers

> **Status: Complete and approved on 2026-09-24.** This document is the single source of truth for U-05 Functional Design.

## Approved Content Amendment - Single Computational Project Image

- [x] Amendment Step 1 - Trace the five canonical Protein Docking photographs to their project and archive placements. `IMG_4208.JPG` maps to canonical archive item `asset-02ed8286ffa69acd6cd0` and evidence capability `evidence-docking-conference-poster`; the four remaining photographs map to separate governed archive items.
- [x] Amendment Step 2 - Limit the first computational project to `IMG_4208.JPG`, captioned "The research team with the molecular docking poster at the 2026 pharmacy conference." The project record now exposes only this image plus its conference publication.
- [x] Amendment Step 3 - Preserve the other four governed photographs once in the Scientific Research evidence group without duplicating them in the computational project. Regeneration yields 46 Scientific Research cards and 105 public archive cards.
- [x] Amendment Step 4 - Update U-04/U-05 design, integrity, and test expectations for the revised ownership boundary. Active project and resume claim inputs now expose the conference image only; integrity rejects a duplicate conference card and requires the other four archive cards.
- [x] Amendment Step 5 - Run focused and full validation, record results, and re-present the Functional Design completion gate. Passed 263 tests across 74 files, research/archive/resume boundaries, ESLint, TypeScript production build, integrity, privacy, recovery, performance budgets, and the 16-case Chrome responsive/theme matrix with zero findings; approved by the user on 2026-09-24.

## Unit Context

- **Stories**: US-014, US-015, US-016, and US-019.
- **Requirements**: FR-026 through FR-035; NFR-001 through NFR-003, NFR-005 through NFR-012, and NFR-018 through NFR-020; PBT-R07; SEC-R02, SEC-R06, SEC-R07, and SEC-R08.
- **Consumes**: U-01 validated media-source policy and derivatives, U-02 layout tokens, U-03 resume capability, and U-04 archive groups, cards, order, and typed detail triggers.
- **Provides**: One shared accessible media-review system for PDFs, resume evidence, curated images, narrative galleries, and the complete archive.
- **User amendment**: Every component must use consistent margins, bounded responsive dimensions, and stable alignment. Thumbnail cropping is allowed when necessary to prevent abnormal card sizes; detail views must preserve the complete media.
- **Boundaries**: No backend, analytics, uploads, remote conversion, deployment change, unapproved dependency, or unsafe runtime source parsing.

## Stage Plan

- [x] Step 1 - Read the U-05 unit definition, assigned stories, requirements, application design, media contracts, active U-04 archive integration, and enabled extension rules.
- [x] Step 2 - Inspect current PDF/image cards, evidence actions, resume capability, safe media policy, archive triggers, layout tokens, and lazy-loading seams.
- [x] Step 3 - Create this Functional Design plan with explicit viewer, spacing, sizing, cropping, accessibility, failure, security, and PBT decisions.
- [x] Step 4 - Collect and validate answers to all eleven questions; create clarification questions if any answer is missing, invalid, ambiguous, or contradictory. All eleven answers are Option A and form one consistent design direction.
- [x] Step 5 - Generate the business logic model for capability resolution, dialog transitions, bounded navigation, failure downgrade, and trigger restoration.
- [x] Step 6 - Generate business rules for source eligibility, preview/full-media loading, margins, sizing, cropping, actions, focus, inertness, dismissal, cleanup, and safe failures.
- [x] Step 7 - Generate domain entities for PDF/image capabilities, layout policy, crop policy, dialog state/events, navigation results, findings, and controller contracts.
- [x] Step 8 - Generate the frontend component design for the shared host, PDF/image bodies, preview cards, responsive geometry, and archive/narrative/resume integrations.
- [x] Step 9 - Validate traceability, content syntax, Security Baseline compliance, and PBT-01 property identification; then present the standardized Functional Design completion gate. All four artifacts have balanced code fences, valid Markdown structure, no tabs, complete requirement mapping, explicit SECURITY-01 through SECURITY-15 applicability, and invariant/oracle/stateful property definitions. No blocking Security or PBT finding remains.

## Question 1 - Shared Viewer Host

How should PDF and image detail experiences share modal behavior?

A) Mount one shared dialog host near the portfolio shell, use a pure typed reducer for PDF/image/failure states, and centralize focus, inertness, dismissal, scroll locking, cleanup, and trigger restoration (recommended)
B) Mount a separate dialog inside every section that owns media
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 2 - Preview Cropping and Aspect Ratios

How should cards stay aligned when source media have very different dimensions?

A) Use shared bounded frames: image thumbnails use a consistent landscape ratio with `object-fit: cover`, document previews use a consistent portrait ratio with `object-fit: contain`, and every detail viewer uses `object-fit: contain` so the complete original remains visible (recommended)
B) Preserve every natural aspect ratio in both cards and detail views, accepting uneven card heights
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 3 - Margins and Component Sizing

Which layout rule should govern viewer and preview geometry?

A) Use shared spacing tokens, minimum 44-pixel controls, clamped gutters, bounded card/media dimensions, aligned grid tracks, and one-column narrow layouts with zero document overflow (recommended)
B) Let each component define independent margins and fixed dimensions
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 4 - PDF Preview and Loading Boundary

How should published PDFs and the resume be previewed without overloading the page?

A) Keep dimensioned first-page derivative previews in cards, load the browser-native full PDF viewer only after explicit detail activation, and retain Download/Open actions when embedding is unsupported (recommended)
B) Embed every full PDF directly in its inline card as soon as the group renders
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 5 - Responsive Dialog Geometry

How should the detail viewer adapt across supported widths?

A) Use a centered bounded desktop dialog with a full-height media region and switch to a safe-area-aware near-full-viewport sheet on narrow screens; keep header/actions stable and only the media/content region scrollable (recommended)
B) Use the same fixed-size centered dialog at every width
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 6 - Image Navigation Scope

Which images should Previous and Next traverse?

A) Traverse the current validated gallery/activity group in deterministic catalog order, including narrative project galleries as their own groups (recommended)
B) Traverse every portfolio image as one global gallery regardless of project or activity
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 7 - Navigation Boundaries

What should happen at the first and last image?

A) Keep navigation bounded, disable the unavailable direction, and announce the current position without wrapping (recommended)
B) Wrap from the last image to the first and from the first image to the last
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 8 - Dismissal and History

How should closing and browser history behave?

A) Close through the visible Close action, Escape, or backdrop; restore the exact trigger; do not change the section hash or create browser-history entries (recommended)
B) Give every opened media item its own URL/history entry and rely on browser Back to close
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 9 - Public Context and Provenance

What context should appear in image/PDF detail views?

A) Show the reviewed title, concise caption or description, activity/project context, and safe original actions without raw filenames, local paths, or source/resume labels (recommended)
B) Show raw filenames and source-folder paths as provenance
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 10 - Media Failure Behavior

How should rejected, missing, unsupported, or failed media behave?

A) Fail closed to an operable named dialog with generic visitor-safe status, retained reviewed metadata, Close, and only validated Download/Open actions; never expose paths, stacks, or framework details (recommended)
B) Close the dialog immediately and show no explanation or fallback action
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 11 - Property-Based Verification

Which properties should Code Generation carry forward?

A) Require domain generators and reproducible shrinking for bounded deterministic navigation, valid state-machine sequences, Close-to-closed behavior, safe failure downgrade, and layout-policy range invariants, alongside concrete keyboard/focus examples (recommended)
B) Use example-based tests only for the viewer reducer and navigation logic
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Planned Functional Design Artifacts

- `aidlc-docs/construction/pdf-image-detail-viewers/functional-design/business-logic-model.md`
- `aidlc-docs/construction/pdf-image-detail-viewers/functional-design/business-rules.md`
- `aidlc-docs/construction/pdf-image-detail-viewers/functional-design/domain-entities.md`
- `aidlc-docs/construction/pdf-image-detail-viewers/functional-design/frontend-components.md`

## Applicable Extension Gates

- **Security Baseline**: SECURITY-09, SECURITY-11, SECURITY-13, and SECURITY-15 are applicable to safe errors, misuse cases, local/integrity-verified media, and fail-safe behavior. SECURITY-04 and SECURITY-10 remain U-06 delivery gates. SECURITY-01 through SECURITY-03, SECURITY-05 through SECURITY-08, SECURITY-12, and SECURITY-14 are N/A because this unit adds no persistence, network intermediary, API, IAM, authentication, or monitoring surface.
- **Property-Based Testing**: PBT-01 is applicable in Functional Design. The design must identify invariant, oracle/model, and stateful-sequence properties for navigation and the dialog reducer. Round-trip and idempotence properties are N/A unless the final design introduces an inverse or idempotent transformation.
