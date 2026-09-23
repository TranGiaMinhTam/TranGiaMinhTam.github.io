# Application Design Plan: Header, Content, Evidence, and Resume Refinement

> **Status: Part 2 complete; explicit Application Design approval required. No application code is authorized.**

## Purpose

Define the high-level components, interfaces, orchestration services, and dependency boundaries for the approved masthead, resume-led content, complete archive, PDF/image review, responsive alignment, accessibility, privacy, performance, security, and property-testing requirements. Detailed business rules remain deferred to per-unit Functional Design.

## Approved Design Context

- The active application remains a single-package React 19, TypeScript, and Vite static portfolio.
- The ten canonical section identifiers, continuous-page navigation, theme persistence, progress tracking, lazy Journal route, local-only contact flow, and base-path behavior remain.
- The supplied resume is the primary structural authority for personal content; evidence-backed facts take precedence when a conflict exists.
- All 122 physical files under `src/assets/minh-tam/` require an inventory and every unique reviewed item requires a publication or honest fallback disposition.
- The public page must not expose the resume phone number.
- Browser-native PDF previews, focus-managed media dialogs, lazy archive discovery, deterministic canonicalization, and safe failures are required.
- Security Baseline and full Property-Based Testing enforcement are enabled.
- The current uncommitted worktree and source archive must remain recoverable.

## Design Questions

Please answer every question by placing the chosen letter after its `[Answer]:` tag. The recommended choice is listed first.

## Question 1

How should the complete archive catalog be divided between generated facts and curated presentation metadata?

A) Generate immutable physical-file facts and canonical identities from deterministic tooling, then join them to a typed human-reviewed metadata overlay for titles, captions, categories, accessibility text, and publication dispositions
B) Maintain one fully handwritten catalog containing both physical-file facts and presentation metadata
C) Generate every catalog field from filenames and file metadata without a human-reviewed overlay
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 2

How should resume content and evidence-backed content be represented across the ten existing sections?

A) Keep typed source records with source authority and provenance, then derive section-specific view models through pure selectors that surface discrepancies for review
B) Copy final prose directly into each React section and keep provenance only in documentation
C) Replace the ten-section model with a resume-shaped page hierarchy
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 3

How should component ownership be organized for this expansion?

A) Preserve feature-first domain folders and add focused shared `archive`, `media-viewer`, and `resume` boundaries consumed through typed interfaces
B) Place all new archive, resume, and viewer components inside the Evidence Library feature
C) Centralize all new presentation components in one general shared-components folder
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 4

How should interactive media URLs be admitted and resolved?

A) Use a central typed media-source policy that accepts bundled local assets and explicitly approved HTTPS links, rejects unsafe schemes, and returns visitor-safe failure states
B) Let each preview component validate its own string URL independently
C) Trust all URLs present in the generated catalog because the catalog is local
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 5

How should PDF and image detail experiences share dialog behavior?

A) Use one accessible modal host and focus controller with a discriminated PDF/image state, while specialized viewer bodies own format-specific controls
B) Build independent PDF and image modal systems with duplicated focus and dismissal logic
C) Use native links only and rely on new browser tabs for all detailed viewing
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 6

How should the full archive remain discoverable without adding all media to initial loading?

A) Load compact group summaries initially, lazy-import group catalogs and thumbnails on demand, and load full originals only after an explicit action
B) Bundle the complete metadata catalog initially but lazy-load only the binary files
C) Render all catalog cards and browser previews immediately while relying on native lazy-loading hints
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 7

Where should HEIC, DOCX, PDF-thumbnail, and image-thumbnail derivation occur?

A) Use deterministic local preprocessing scripts that write reviewed derivatives and a conversion manifest before the Vite build, preserve originals, and emit explicit failure dispositions
B) Convert unsupported files dynamically in the visitor's browser
C) Publish unsupported originals without preview derivatives
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 8

How should the richer masthead and relocated actions integrate with the existing shell?

A) Extend the shell with typed masthead identity, status, theme, and resume-action slots arranged by a responsive CSS grid while keeping theme/progress orchestration in the existing experience layer
B) Move masthead state and theme persistence into the Identity section
C) Replace the continuous shell with a separate landing route and keep the current page below it
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 9

How should visual relationship tables be removed while preserving equivalent assistive meaning?

A) Pair each affected visual with a reusable visually-hidden semantic summary component whose list or description structure is selected by the relationship type
B) Keep the current tables in the DOM and hide them using `display: none`
C) Remove the tables and rely only on image or SVG alternative text
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 10

How should viewer, conversion, and lazy-loading failures be coordinated?

A) Define typed result and failure states at service boundaries, render generic visitor-safe fallbacks, retain metadata and original actions when safe, and keep technical detail only in development diagnostics
B) Throw all failures to one application-level error boundary
C) Let each browser element display its native failure behavior without application handling
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 11

How should the application design handle response-header requirements that GitHub Pages may not satisfy?

A) Keep application code hosting-neutral, define a deployment-security contract and verification interface, and defer the provider or edge decision to Infrastructure Design with a blocking no-false-compliance gate
B) Assume HTML meta elements are equivalent to all required HTTP response headers
C) Remove response-header verification because the application is static
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 12

How should test and property-testing seams be exposed by the design?

A) Keep catalog, provenance, grouping, ordering, resume mapping, safe-source resolution, and viewer navigation as pure typed functions with shared `fast-check` generators; test rendered behavior through roles and user actions
B) Test only rendered components and infer transformation correctness from snapshots
C) Expose internal component state and CSS selectors specifically for tests
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Execution Checklist

### Part 1 - Planning and Approval

- [x] Load the approved requirements, stories, personas, workflow plan, and refreshed reverse-engineering artifacts.
- [x] Identify component-boundary, method-contract, orchestration, dependency, media, accessibility, security, performance, and testing decisions.
- [x] Evaluate all required question categories: component identification, component methods, service layer, dependencies, and design patterns.
- [x] Create twelve context-specific multiple-choice questions with recommended choices and mandatory Other options.
- [x] Receive answers to all twelve Application Design questions.
- [x] Validate every answer for completeness, mutual consistency, contradictions, combined choices, and ambiguity.
- [x] Complete ambiguity review; all Option A answers are compatible and require no follow-up questions.
- [x] Obtain explicit approval of the answered Application Design plan through the user's `approve all A` instruction.

### Part 2 - Design Generation

- [x] Generate `aidlc-docs/inception/application-design/components.md` with component definitions, responsibilities, and interfaces.
- [x] Generate `aidlc-docs/inception/application-design/component-methods.md` with high-level method signatures and typed inputs and outputs.
- [x] Generate `aidlc-docs/inception/application-design/services.md` with service definitions, responsibilities, and orchestration patterns.
- [x] Generate `aidlc-docs/inception/application-design/component-dependency.md` with dependency matrices, communication patterns, validated diagrams, and text alternatives.
- [x] Generate `aidlc-docs/inception/application-design/application-design.md` as the consolidated design.
- [x] Trace all components and services to the 38 functional, 20 non-functional, 10 property-testing, and 8 security requirements.
- [x] Trace all components and services to the 21 approved user stories.
- [x] Evaluate enabled Security Baseline rules and resolve all applicable blocking findings.
- [x] Evaluate enabled Property-Based Testing rules and define the later Functional Design and Code Generation seams.
- [x] Validate Markdown, Mermaid syntax, code signatures, tables, links, paths, and text alternatives.
- [x] Present the completed Application Design for explicit approval before Units Generation.

## Mandatory Artifacts

- [x] `aidlc-docs/inception/application-design/components.md`
- [x] `aidlc-docs/inception/application-design/component-methods.md`
- [x] `aidlc-docs/inception/application-design/services.md`
- [x] `aidlc-docs/inception/application-design/component-dependency.md`
- [x] `aidlc-docs/inception/application-design/application-design.md`

## Design Boundary

- Application Design defines component responsibilities, interfaces, and orchestration, not detailed per-unit business logic.
- No answer or design artifact authorizes source-code mutation, dependency installation, conversion output, deployment changes, asset deletion, or cleanup.
- Every application change remains subject to Units Generation and an explicitly approved per-unit Code Generation plan.
