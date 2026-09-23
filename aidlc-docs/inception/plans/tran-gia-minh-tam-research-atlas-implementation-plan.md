# Implementation Plan - Tran Gia Minh Tam Research Atlas

> **Status: Approved for implementation on 2026-09-11.**

## Intent

Evolve the portfolio into a science, bioinformatics, and data-science research atlas using the imported Minh Tam source archive while preserving existing routes, layout modes, contact workflows, responsive behavior, and accessibility contracts.

## Construction Units

### Unit 1 - Research Domain Model

- [x] Add typed research projects, methods, evidence items, and field-note metadata.
- [x] Keep existing Portfolio data contracts compatible.
- [x] Link research records to existing project IDs and imported asset files.

### Unit 2 - Research Presentation

- [x] Upgrade the project surface into research records containing abstract, methods, tools, timeline, and evidence.
- [x] Preserve existing project actions and stable test IDs.
- [x] Use the current scientific publication visual system.

### Unit 3 - Asset and Evidence Coverage

- [ ] Keep imported non-video source assets available under `src/assets/minh-tam`.
- [ ] Reuse current gallery and certificate surfaces for evidence while adding research metadata where supported.
- [ ] Keep videos empty until YouTube links are supplied.

### Unit 4 - Verification

- [ ] Add focused assertions for research records and source asset relationships.
- [ ] Run focused tests, full tests, lint, TypeScript, and production build.

## Out Of Scope

- New backend, CMS, authentication, analytics service, or runtime data fetching.
- Reintroducing deleted local videos.
- Inventing scientific findings not present in the CV or source documents.
- Removing existing navigation, journal routes, forms, layout modes, or accessibility behavior.

## Acceptance Criteria

- Each featured research project has a question/abstract, domain, methods, tools, timeline, and evidence references.
- Research records resolve to existing local project assets or imported evidence files.
- Existing project actions remain available and functional.
- The page remains responsive and accessible in both color modes.
- Focused and complete automated verification passes.
