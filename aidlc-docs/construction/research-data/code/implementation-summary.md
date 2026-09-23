# U-04 Research and Data Implementation Summary

## Outcome

U-04 activates three distinct research presentations inside the existing scientific portfolio shell: a computational method pipeline, a laboratory specimen-to-assay bench, and an analytical signal sheet. Together with the approved Identity and Questions bodies, the live shell now resolves five finished sections and retains five temporary later-unit sections.

The rendered-candidate review produced two amendments before activation. Laboratory Research received a full-width editorial composition with clearer spacing, margins, padding, and text measure. The Identity portrait uses `object-position: 88% 50%` so the photograph shifts left within its unchanged aperture and centers the person in the white shirt. The source image was not edited.

## Story and Requirement Traceability

| Story | Implemented outcome | Primary requirements |
| --- | --- | --- |
| ST-005 | Molecular-docking computational pipeline with ordered methods, tools, time, contribution disclosure, evidence, and a semantic equivalent | FR-006, FR-010, FR-013 |
| ST-006 | Cashew-testa laboratory bench with extraction and assay stations, prototype boundary, evidence, and local figure recovery | FR-007, FR-010, FR-013 |
| ST-007 | SIM-LSE analytical signal sheet with team-led disclosure, workflow, evidence, semantic rows, and future-note status | FR-008, FR-010, FR-013 |

All U04-NFR-SCL-001 through U04-NFR-EVD-001 controls are implemented or represented by reproducible verification evidence. Browser-automation timing remains an honestly recorded P1 environment limitation and is not a P0 acceptance blocker.

## Created Application Files

- Typed research contracts, catalog, selection, relationship, and projection logic under `src/portfolio/research/`.
- Shared evidence, figure, relationship, contribution, and publication primitives under `src/portfolio/research/`.
- Three domain-specific bodies and their locally owned CSS Module under `src/portfolio/research/`.
- Focused model, body, registry, style, and integration tests under `src/portfolio/research/`.
- Isolated candidate entry and configuration under `scripts/portfolio/research-candidate/`.
- Research verification tooling at `scripts/portfolio/verify-research-data.mjs`.

## Modified Application Files

- `src/portfolio/model/portfolio.types.ts`: added the approved time relationship contract.
- `src/portfolio/index.ts`: exported the research public boundary.
- `src/App.tsx`: composed the approved Identity and Research body registries after candidate approval.
- `src/portfolio/identity/IdentityQuestions.module.css`: applied the user-approved portrait crop position.
- `src/portfolio/identity/identityStyles.test.ts`: added the portrait crop regression assertion.
- `scripts/portfolio/check-boundaries.mjs`: added U-04 source, candidate, and active checks.
- `scripts/portfolio/measure-build.mjs`: added configurable JavaScript and CSS regression budgets.
- `scripts/portfolio/verify-identity-questions.mjs`: allowed the approved Identity registry to remain active through a composed later-unit registry.
- `package.json`: added focused U-04 build, test, boundary, measurement, preview, and verification commands without changing dependencies.

## Boundaries

- No API, database, repository, backend service, infrastructure, deployment, or dependency change was introduced.
- No former-owner journal content, unsupported result, unsafe URL, embedded document, or runtime data request was introduced.
- The package lock retains SHA-256 `db382652e91d7bd4ab3c154cf79d53b6b26ecb4430efe5961273572ce25b9bb1`.
- Security Baseline and Property-Based Testing extensions remain disabled in workflow state. The approved U-04 security and deterministic malformed-input controls pass.
