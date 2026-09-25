# Domain Entities - U-06 Security, Delivery, and Integrated Acceptance

## Closed Value Sets

- **RequirementStatus**: `pass`, `fail`, `not-applicable`.
- **FindingSeverity**: `blocking`, `advisory`.
- **ReleaseState**: `blocked`, `candidate-ready`, `active-verified`.
- **AuthorizationState**: `deploy-not-authorized` only within U-06.
- **EvidenceKind**: `test`, `property-test`, `typecheck`, `lint`, `boundary`, `privacy`, `accessibility`, `browser-review`, `build`, `request-manifest`, `performance`, `dependency-audit`, `unused-dependency-review`, `sbom`, `ci-integrity`, `header-observation`, `recovery`.
- **HeaderStatus**: `pass`, `fail`, `not-observed`.

## `RequirementKey`

A branded identifier from the closed approved sets: FR-001 through FR-038, NFR-001 through NFR-020, PBT-R01 through PBT-R10, SEC-R01 through SEC-R08, SECURITY-01 through SECURITY-15, and US-001 through US-021.

Rules:

- Values outside the closed sets are rejected.
- Every expected key occurs exactly once in the normalized report.
- Extension identifiers remain distinct from project security requirement identifiers.

## `EvidenceLocator`

- `kind`: `EvidenceKind`.
- `relativePath`: repository-relative artifact or report path.
- `summary`: concise public-safe description.
- `generatedAt`: ISO 8601 timestamp.
- `tool`: optional reviewed tool and version.

Rules:

- Absolute local paths, secrets, tokens, and private visitor data are forbidden.
- A pass result requires at least one locator.
- Evidence must be reproducible or retained under a plan-governed artifact path.

## `RequirementResult`

- `requirement`: `RequirementKey`.
- `status`: `RequirementStatus`.
- `evidence`: immutable `EvidenceLocator` list.
- `rationale`: required for `not-applicable`, optional otherwise.
- `findings`: immutable `GateFinding` list.

Invariants:

- `pass` requires evidence and no blocking finding.
- `fail` requires at least one finding.
- `not-applicable` requires a non-empty boundary-based rationale and no fabricated evidence.

## `GateFinding`

- `code`: stable U-06 finding identifier.
- `requirement`: affected `RequirementKey`.
- `severity`: `FindingSeverity`.
- `message`: visitor-safe or maintainer-safe description.
- `remediation`: bounded next action.
- `evidence`: optional `EvidenceLocator` list.

Findings sort deterministically by requirement, blocking before advisory, then code.

## `CheckDescriptor`

- `id`: stable check identifier.
- `name`: readable check name.
- `ownedRequirements`: non-empty immutable requirement-key list.
- `evidenceKind`: expected output kind.
- `required`: boolean derived from approved applicability.
- `execute`: later implementation seam returning a typed check result.

The registry rejects duplicate check identifiers and requirements with no responsible check unless they have an approved N/A rationale.

## `IntegratedEvidenceBundle`

- `schemaVersion`: closed supported integer.
- `candidateId`: deterministic identifier derived from governed inputs.
- `baselineHash`: hash of the recovery manifest.
- `results`: immutable `RequirementResult` list.
- `environment`: bounded tool/runtime metadata.
- `createdAt`: ISO timestamp excluded from decision equivalence.

Decision equivalence compares normalized substantive fields, not generation timestamps.

## `ReleaseDecision`

- `state`: `ReleaseState`.
- `authorization`: `deploy-not-authorized`.
- `blockingFindings`: immutable sorted list.
- `advisories`: immutable sorted list.
- `evidenceBundle`: bundle locator.
- `hostAssessment`: `HostHeaderAssessment`.
- `recoveryAssessment`: `RecoveryAssessment`.

The decision is positive only when coverage is complete, all applicable checks pass, and recovery succeeds. It never implies deployment authorization.

## `HostHeaderAssessment`

- `endpoint`: normalized HTTPS URL.
- `observedAt`: ISO timestamp.
- `redirectChain`: immutable HTTPS URL list.
- `headers`: one `HeaderResult` per required header.
- `provider`: observed or configured hosting provider label.
- `compliant`: derived boolean.
- `alternativeRequired`: derived boolean.

Each `HeaderResult` contains the required name/value rule, observed value, `HeaderStatus`, and evidence locator. HTML meta elements are not inputs to header status.

## `DependencyAssessment`

- `lockfileHash`: SHA-256 digest.
- `directDependencies`: immutable package/version/source list.
- `transitiveDependencies`: immutable package/version/source list.
- `vulnerabilitySummary`: severity counts plus audit evidence.
- `unusedCandidates`: classified list with confidence and references.
- `trustedSourceFindings`: immutable findings.
- `sbom`: machine-readable artifact locator.

No dependency is removed by constructing this entity.

## `CiIntegrityAssessment`

- `workflowPaths`: repository-relative definitions.
- `actions`: action name, immutable SHA reference, publisher, and review status.
- `permissions`: workflow/job permission records.
- `commands`: deterministic install and verification commands.
- `findings`: immutable list.

A mutable third-party action reference yields a blocking finding.

## `RecoveryManifest`

- `schemaVersion`: closed supported integer.
- `capturedAt`: ISO timestamp.
- `files`: immutable `RecoveryEntry` list.
- `absenceStates`: immutable repository-relative path list.
- `dependencyHashes`: package and lockfile hashes.
- `sourceOriginalHashes`: canonical source-file hashes.

Each `RecoveryEntry` contains a repository-relative path, SHA-256 digest, byte size, and restoration payload reference. Serialization is deterministic; parsing rejects duplicates, traversal, absolute paths, unsupported schema versions, and malformed hashes.

## `RecoveryAssessment`

- `isolatedRestorationPassed`: boolean.
- `checkedFileCount`: non-negative integer.
- `checkedAbsenceCount`: non-negative integer.
- `sourceOriginalsIntact`: boolean.
- `findings`: immutable list.

Any false verification field or blocking finding blocks candidate activation.

## Entity Relationships

- The check registry produces requirement results and evidence locators.
- Results aggregate into one integrated evidence bundle.
- Header, dependency, CI, and recovery assessments contribute specialized results to the bundle.
- The decision aggregator consumes the bundle and emits one release decision.
- Candidate activation consumes a `candidate-ready` decision plus explicit approval; it cannot consume `blocked` and cannot produce deployment authorization.

## Validation Boundaries

- All paths are repository-relative, normalized, and traversal-free.
- URLs are HTTPS or approved local build URLs according to the existing source policy.
- Hashes use lower-case SHA-256 hexadecimal form.
- Collections are immutable and deterministically ordered.
- Duplicate identifiers, missing evidence, missing N/A rationale, unsupported schemas, mutable CI references, or incomplete expected sets fail closed.
