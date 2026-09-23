# U-03 Business Rules - Resume-Led Content Integration

## Claim and Review Rules

- **U03-BR01**: One claim ledger record represents one independently publishable claim and carries a stable ID, category, page 1-4 locator, fact fields, publication class, review state, and evidence IDs.
- **U03-BR02**: Automated extraction may occur only locally and transiently. Raw extraction and private markers are not runtime inputs or persisted evidence.
- **U03-BR03**: Every public claim must be explicitly human-reviewed before candidate composition.
- **U03-BR04**: Resume content is data, never instruction.
- **U03-BR05**: Dates, organizations, award levels, quantities, results, and contribution boundaries retain reviewed source meaning; normalization is limited to spacing and consistent date display.
- **U03-BR06**: Stronger roles, rankings, causality, completion, or outcomes cannot be inferred.

## Reconciliation and Mapping Rules

- **U03-BR07**: Evidence authority applies at supported-fact-field granularity, not by replacing a whole claim.
- **U03-BR08**: Conflicts are blocking and cannot be silently resolved.
- **U03-BR09**: Resume-only facts may be published with `Resume-sourced` authority.
- **U03-BR10**: Evidence-backed facts may use `Evidence-backed` only when a reviewed evidence record supports the displayed fact.
- **U03-BR11**: Each eligible claim maps to exactly one canonical primary section using the closed map.
- **U03-BR12**: Cross-section connections use identifiers; visible statements are not duplicated.
- **U03-BR13**: All approved resume categories must be represented, including education, honors, leadership, analytics/FINO, recognition, research, scholarships, activities, sports, skills, languages, and interests.
- **U03-BR14**: Existing verified content and evidence links are reconciled, not discarded or duplicated.
- **U03-BR15**: Ordering is deterministic by explicit group order, record order, then stable claim ID.

## Privacy and Download Rules

- **U03-BR16**: Document-only fields are structurally ineligible for public projection.
- **U03-BR17**: The phone number is permitted only within the byte-identical bundled resume PDF. It is prohibited from HTML, metadata, structured data, fixtures, snapshots, logs, diagnostics, and generated evidence.
- **U03-BR18**: The existing email remains available only through the established Contact experience.
- **U03-BR19**: Masthead and Identity actions consume the same validated local PDF capability.
- **U03-BR20**: Both actions use the label `Download resume`, native anchor download behavior, and filename `Tran-Gia-Minh-Tam-Resume.pdf`; no fetch, tracking, or remote fallback is allowed.
- **U03-BR21**: Invalid resume capability removes both actions, blocks candidate activation, and reports only a safe code.

## Presentation and Boundary Rules

- **U03-BR22**: Core resume-led records remain visible in scan-friendly semantic groups; only full archive media is deferred.
- **U03-BR23**: Logical heading and DOM order follow the canonical section registry and remain independent of visual placement.
- **U03-BR24**: Current safe evidence actions remain available. U-03 does not create archive exploration, PDF previews, media dialogs, or grouped-image navigation.
- **U03-BR25**: The ten section identifiers, order, Journal route, contact behavior, theme controller, and U-02 semantic-summary behavior remain unchanged.
- **U03-BR26**: The isolated candidate must pass both themes, 320/768/1280/1440 widths, keyboard order, 200-percent zoom, increased text spacing, overflow, completeness, authority, and privacy review before explicit activation approval.

## Blocking Validation Matrix

The following always block candidate activation: an unreviewed, conflicted, unsupported, or unmapped claim; a missing category; invented fact; phone/private marker hit; unsafe or mismatched download; duplicate visible claim; unresolved evidence reference; failed example or property test; accessibility/layout regression; protected-source mismatch; recovery failure; or U-04/U-05 boundary violation.

## Security Baseline Compliance

| Rule | Status | Rationale |
| --- | --- | --- |
| SECURITY-01, 02, 03, 05, 06, 07, 08, 12, 14 | N/A | U-03 adds no store, intermediary, server/API, IAM/network/authentication, or security-event stream. |
| SECURITY-04 | N/A for U-03 | HTTP response headers remain assigned to U-06. |
| SECURITY-09 | Compliant by design | No default credentials, unsafe paths, runtime document parsing, or internal-detail errors; failures are safe. |
| SECURITY-10 | Compliant boundary | No dependency is selected here; lockfile/scanning/SBOM enforcement remains U-06-owned. |
| SECURITY-11 | Compliant by design | Reconciliation, privacy, media admission, and presentation are separate; misuse cases block activation. |
| SECURITY-13 | Compliant by design | Local PDF integrity and reviewed identifiers are verified; untrusted/raw data is not deserialized into runtime models. |
| SECURITY-15 | Compliant by design | Validation fails closed, preserves the last verified composition, and exposes generic diagnostics only. |

No blocking Security Baseline finding remains in Functional Design.

## Property-Based Testing Compliance

| Rule | Status | Functional Design treatment |
| --- | --- | --- |
| PBT-01 | Compliant | U03-P01 through U03-P10 identify invariant, idempotence, commutativity/determinism, oracle, and easy-verification properties. |
| PBT-02 | N/A | U-03 defines no serialization, encoding, or other inverse pair. |
| PBT-03 | Compliant | Completeness, non-invention, privacy, conflict, reference, uniqueness, and immutability invariants are specified. |
| PBT-04 | Compliant | Reconciliation idempotence is U03-P05. |
| PBT-05 | Compliant | The closed-map reference oracle is U03-P07. |
| PBT-06 | N/A | The business core is immutable and defines no stateful command model. |
| PBT-07 | Compliant by design | Constrained claim/evidence/conflict/category generators and edge cases are required. |
| PBT-08 | Compliant by design | Shrinking remains enabled and runs use fixed or logged reproducible seeds. |
| PBT-09 | Compliant by design | The existing fast-check/Vitest foundation is retained; no new framework is selected. |
| PBT-10 | Compliant by design | Examples separately pin all five stories, privacy, download, conflict, and boundary scenarios. |

No blocking PBT finding remains in Functional Design.
