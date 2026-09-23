# U-05 Academic and Evidence Implementation Summary

## Outcome

U-05 activates two further bodies inside the existing scientific portfolio shell: an Academic Trajectory curriculum cross-section and an Evidence Library archive. Together with the approved Identity, Questions, and Research bodies, the live shell now resolves seven finished sections and retains three temporary later-unit sections.

The rendered-candidate review produced two correction cycles before activation. The first replaced undefined U-05 design-token references and unified header, navigation, spectrum, archive, preview, action, and responsive alignment rules. The second removed the IGCSE-only horizontal offset so its verified record occupies the unused evidence column across responsive layouts. The user then approved activation.

Post-activation acceptance found one defect and fixed it: each trajectory stratum was rendered as a named `section`, which exposed two extra unnamed landmark regions inside the Academic Trajectory section and broke the ordered-shell region assertion in `src/App.test.tsx`. The strata are now `article` elements, which keeps the accessible name from the program heading without adding shell-level landmarks.

## Story and Requirement Traceability

| Story | Implemented outcome | Primary requirements |
| --- | --- | --- |
| ST-009 | Academic Trajectory with exact programs, institutions, periods, subject fields, verified results, explicit status, recognitions, and evidence connections in a non-timeline cross-section | FR-009, FR-010, FR-013 |
| ST-010 | Evidence Library with canonical grouping, category navigation, semantic counts, provenance, and safe user-initiated document and image previews | FR-010, FR-011, FR-013 |

All 18 approved U-05 NFR controls are implemented or represented by reproducible verification evidence. Browser-version and mobile-timing measurement remain honestly recorded P1 environment limitations and are not P0 acceptance blockers.

## Created Application Files

- Typed academic and evidence contracts, catalog, selection, relationship, and projection logic under `src/portfolio/academics/`.
- Academic Trajectory and Evidence Library bodies, status, action, relationship, and count primitives, and their locally owned CSS Module under `src/portfolio/academics/`.
- Focused model, failure, capacity, component, accessibility, style, and integration tests under `src/portfolio/academics/`.
- Isolated candidate entry and configuration under `scripts/portfolio/academic-candidate/`.
- Academic verification tooling at `scripts/portfolio/verify-academic-evidence.mjs`.

## Modified Application Files

- `src/App.tsx`: composed the approved Identity, Research, and Academic body registries after candidate approval. This is the only activation seam change.
- `src/portfolio/index.ts`: exported the academics public boundary.
- `scripts/portfolio/check-boundaries.mjs`: added U-05 source, candidate, and active checks.
- `package.json`: added focused U-05 build, test, boundary, measurement, preview, and verification commands without changing dependencies.
- `src/portfolio/academics/AcademicTrajectory.tsx`: post-activation landmark correction described above.

## Boundaries

- No API, database, repository, backend service, infrastructure, deployment, or dependency change was introduced.
- No raw, private, portrait, false-CV, former-owner, or later-domain content was imported.
- The package lock retains SHA-256 `db382652e91d7bd4ab3c154cf79d53b6b26ecb4430efe5961273572ce25b9bb1`.
- Security Baseline and Property-Based Testing extensions remain disabled in workflow state. The approved U-05 security and deterministic malformed-input controls pass.
