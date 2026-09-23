# NFR Requirements: U-01 Source Governance and Safe Foundation

## Scope and Acceptance Semantics

These requirements govern U-01 maintenance tooling, generated facts/capabilities, recovery evidence, and downstream contracts. They do not set visible layout behavior or authorize implementation. `P0` requirements are blocking; `P1` requirements are blocking unless an explicit later approval accepts measured deviation.

## NFR Summary

| Category | IDs | Priority |
| --- | --- | --- |
| Scalability | U01-NFR-SCL-001 through U01-NFR-SCL-003 | P1 |
| Performance | U01-NFR-PER-001 through U01-NFR-PER-006 | P0/P1 |
| Availability and recovery | U01-NFR-AVL-001 through U01-NFR-AVL-004 | P0 |
| Security and privacy | U01-NFR-SEC-001 through U01-NFR-SEC-008 | P0 |
| Reliability and determinism | U01-NFR-REL-001 through U01-NFR-REL-006 | P0 |
| Maintainability | U01-NFR-MNT-001 through U01-NFR-MNT-006 | P0/P1 |
| Compatibility | U01-NFR-CMP-001 through U01-NFR-CMP-003 | P0/P1 |
| Usability and evidence | U01-NFR-USE-001 through U01-NFR-USE-004 | P0/P1 |

## Scalability Requirements

### U01-NFR-SCL-001 - Static archive capacity

- **Priority**: P1.
- **Requirement**: The inventory, hash grouping, metadata join, validation, and manifest model must support at least 500 physical source files and 1 GiB total source bytes without changing architecture or introducing a database/API.
- **Acceptance**: Generated or fixture-backed capacity test completes with correct membership, deterministic order, and no model/schema change.
- **Traceability**: US-010, US-011, NFR-017.

### U01-NFR-SCL-002 - Linear memory behavior

- **Priority**: P0.
- **Requirement**: File hashing must stream bytes and must not retain complete source-file contents in memory. Catalog memory may grow with record count, not aggregate source byte size.
- **Acceptance**: Implementation inspection plus peak-memory evidence during the current archive scan.
- **Traceability**: FR-018, SECURITY-11.

### U01-NFR-SCL-003 - Growth review trigger

- **Priority**: P1.
- **Requirement**: Exceeding 500 files, 1 GiB, or the approved time/memory budget triggers measurement and an explicit architecture review; it does not automatically authorize a backend.
- **Acceptance**: Boundary fixture emits a stable capacity finding and documentation names the review path.

## Performance Requirements

### U01-NFR-PER-001 - Current inventory duration

- **Priority**: P1.
- **Requirement**: A clean inventory, SHA-256, exact grouping, metadata validation, and manifest pass over the current approximately 293 MB archive, excluding conversion, must complete within 60 seconds on the documented Node 20 reference environment.
- **Acceptance**: Timed clean execution with source count, byte count, command, platform, CPU/runtime context, and elapsed time recorded.

### U01-NFR-PER-002 - Inventory peak memory

- **Priority**: P1.
- **Requirement**: The same clean pass must use no more than 512 MiB peak process memory.
- **Acceptance**: Recorded peak RSS or equivalent reproducible measurement on the reference environment.

### U01-NFR-PER-003 - Conversion concurrency and timeout

- **Priority**: P0.
- **Requirement**: Local derivative generation runs at no more than two concurrent jobs and enforces a documented per-item timeout of at most 120 seconds. Timeout becomes an `unavailable` outcome and preserves the original.
- **Acceptance**: Configuration inspection plus timeout example test proving cleanup and fallback.

### U01-NFR-PER-004 - Current conversion target

- **Priority**: P1.
- **Requirement**: A clean derivative attempt for the current reviewed archive should complete within 15 minutes on the documented reference setup when the approved adapters are available.
- **Acceptance**: Timed report by adapter/purpose. Exceeding the target requires measured explanation and approval; it must not cause source mutation.

### U01-NFR-PER-005 - Bounded derivative outputs

- **Priority**: P0.
- **Requirement**: Every derivative purpose defines maximum dimensions and/or bytes before implementation. An output exceeding its purpose bound is invalid and cannot be emitted as `ready`.
- **Acceptance**: Manifest validation examples for within-limit and over-limit outputs; exact bounds finalized in NFR Design.

### U01-NFR-PER-006 - Production-bundle isolation

- **Priority**: P0.
- **Requirement**: Filesystem, hashing, converter, privacy-scan, and PBT generator code must be absent from production browser chunks. U-01 must not increase existing initial JavaScript/CSS ceilings or cause original archive assets to enter the initial request graph.
- **Acceptance**: Import-boundary checks and production manifest/request inspection.
- **Traceability**: NFR-008 through NFR-011 inherited, SEC-R05.

## Availability and Recovery Requirements

### U01-NFR-AVL-001 - Zero-loss original objective

- **Priority**: P0.
- **Requirement**: U-01 must produce zero edits, replacements, moves, or deletions of the external resume and original archive files.
- **Acceptance**: Pre/post source inventory and hash comparison.

### U01-NFR-AVL-002 - Recovery time objective

- **Priority**: P0.
- **Requirement**: Every U-01 mutation target must be restorable to its captured pre-unit content or absence state within 30 minutes in a compatible checkout without editor history or an external backup service.
- **Acceptance**: Documented and tested restoration drill against the candidate boundary.

### U01-NFR-AVL-003 - Optional tool degradation

- **Priority**: P0.
- **Requirement**: Missing optional converter adapters must not prevent inventory, canonicalization, metadata validation, privacy checks, or manifest reporting. Each affected derivative receives a deterministic unavailable/fallback outcome.
- **Acceptance**: Tool-absent test run completes core pipeline and produces expected outcomes.

### U01-NFR-AVL-004 - No unsafe partial activation

- **Priority**: P0.
- **Requirement**: A blocking recovery, catalog, privacy, integrity, or source-policy finding prevents activation of all new public U-01 capabilities. Diagnostic artifacts may remain only in approved non-public boundaries.
- **Acceptance**: Failure-path integration examples and activation-gate report.

## Security and Privacy Requirements

### U01-NFR-SEC-001 - Explicit filesystem boundary

- **Priority**: P0.
- **Requirement**: Source and output roots are explicit, resolved, non-overlapping by role, and checked against path/symlink escape. No broad home/workspace root may be a recursive write/delete target.
- **Acceptance**: Path traversal, absolute path, symlink escape, and output collision tests.
- **Security mapping**: SECURITY-09, SECURITY-11, SECURITY-15.

### U01-NFR-SEC-002 - Local-only transformation

- **Priority**: P0.
- **Requirement**: Archive/resume bytes must not be uploaded or transmitted to an external converter, API, telemetry, or analytics service.
- **Acceptance**: Dependency/code inspection and network-isolation test or equivalent command evidence.
- **Traceability**: NFR-014, SEC-R05.

### U01-NFR-SEC-003 - Fail-closed media admission

- **Priority**: P0.
- **Requirement**: Only validated bundled local assets and explicitly approved HTTPS origins may become interactive capabilities. Malformed, `javascript:`, `file:`, document-bearing `data:`, traversal, and unapproved sources are rejected.
- **Acceptance**: Examples and PBT across safe/unsafe candidates.
- **Traceability**: SEC-R04, SEC-R07, SECURITY-11.

### U01-NFR-SEC-004 - Phone privacy

- **Priority**: P0.
- **Requirement**: The resume phone number may exist only inside the byte-identical bundled resume PDF. It must not appear in source models, public metadata, fixtures, diagnostics, logs, rendered markup, or text-bearing production build output.
- **Acceptance**: Non-echoing privacy scan across approved boundaries; exact PDF bytes are the sole exception.
- **Traceability**: NFR-013.

### U01-NFR-SEC-005 - Safe diagnostics

- **Priority**: P0.
- **Requirement**: Findings and public failure descriptors must not disclose absolute paths, source URL values, stack traces, converter commands, framework versions, or sensitive content.
- **Acceptance**: Snapshot/content checks for every finding family and failure result.
- **Security mapping**: SECURITY-09, SECURITY-15.

### U01-NFR-SEC-006 - Data/software integrity

- **Priority**: P0.
- **Requirement**: Every source fact has SHA-256; every ready derivative links source/output hashes and adapter identity/version; stale or mismatched linkage blocks emission.
- **Acceptance**: Tampered-source/output tests and manifest verification.
- **Security mapping**: SECURITY-13.

### U01-NFR-SEC-007 - Trusted tool and dependency sources

- **Priority**: P0.
- **Requirement**: Node dependencies originate from the official npm registry under the committed lockfile. Converter adapters must be explicitly reviewed local executables/libraries with captured versions; no opportunistic download during normal generation.
- **Acceptance**: Lockfile/source inspection and tool-version evidence.
- **Security mapping**: SECURITY-10, SECURITY-13.

### U01-NFR-SEC-008 - Misuse-case coverage

- **Priority**: P0.
- **Requirement**: Tests cover path/symlink escape, Unicode/control filenames, duplicate names, misleading duplicate heuristics, oversized/malformed files, unsafe URLs, converter timeout/network attempt, sensitive-value leakage, and output collisions.
- **Acceptance**: Traceable example/PBT inventory with no applicable case omitted.
- **Security mapping**: SECURITY-11.

## Reliability and Determinism Requirements

### U01-NFR-REL-001 - Canonical byte determinism

- **Priority**: P0.
- **Requirement**: Identical source bytes, metadata, policy, and tool versions produce byte-identical canonical generated text. Evidence timestamps must be stored outside canonical generated content or normalized away.
- **Acceptance**: Two clean runs compared byte-for-byte.

### U01-NFR-REL-002 - Stable finding behavior

- **Priority**: P0.
- **Requirement**: Equivalent validation inputs produce the same deduplicated findings ordered by severity, code, and safe target; `canProceed` is true exactly when blocking count is zero.
- **Acceptance**: Example and property tests.

### U01-NFR-REL-003 - Complete provenance invariant

- **Priority**: P0.
- **Requirement**: Every physical source occurs in exactly one exact group and one final canonical owner, including reviewed non-identical aliases.
- **Acceptance**: Membership property and concrete inventory reconciliation.

### U01-NFR-REL-004 - Property-test reproducibility

- **Priority**: P0.
- **Requirement**: PBT shrinking remains enabled; every failure reports replayable seed/path and non-sensitive shrunk input; no CI or local script silently retries.
- **Acceptance**: Deliberate failing-property demonstration in test configuration or documented framework evidence.

### U01-NFR-REL-005 - Complementary regression coverage

- **Priority**: P0.
- **Requirement**: Concrete tests remain for the current archive composition, resume equality, known conversions/fallbacks, unsafe sources, and privacy. A newly discovered business-critical shrunk counterexample becomes a permanent concrete regression.
- **Acceptance**: Test inventory distinguishes example and property suites.

### U01-NFR-REL-006 - No uncaught expected failure

- **Priority**: P0.
- **Requirement**: Expected filesystem, validation, converter, parse, and policy failures resolve to typed outcomes/findings without unhandled promise rejection or partial unsafe emission.
- **Acceptance**: Failure-path tests and process exit-code checks.

## Maintainability Requirements

### U01-NFR-MNT-001 - Strict quality gate

- **Priority**: P0.
- **Requirement**: New TypeScript passes strict compilation, ESLint, focused examples, and PBT with no unexplained warning. Node scripts use clear module boundaries and non-zero exit codes for blocking outcomes.
- **Acceptance**: Exact command evidence.

### U01-NFR-MNT-002 - One-way imports

- **Priority**: P0.
- **Requirement**: Browser code cannot import Node filesystem/hash/converter tooling. Domain presentation cannot import raw archive facts. Test generators cannot enter production chunks.
- **Acceptance**: Automated boundary checks and production manifest inspection.

### U01-NFR-MNT-003 - Single core policy ownership

- **Priority**: P0.
- **Requirement**: Physical identity, canonicalization, media admission, validation severity, and shared domain generators each have one owning module; downstream units may extend but not duplicate them.
- **Acceptance**: Source boundary review and duplicate-policy tests/searches.

### U01-NFR-MNT-004 - Stable machine contracts

- **Priority**: P0.
- **Requirement**: IDs, finding codes, manifest schema version, and public capability discriminants are documented and versioned when backward-incompatible changes occur.
- **Acceptance**: Contract documentation plus schema/version tests.

### U01-NFR-MNT-005 - No validation bypass

- **Priority**: P0.
- **Requirement**: No unchecked cast, raw URL, or direct path construction may bypass domain validation to create a public capability.
- **Acceptance**: Type/API review, lint/custom boundary check, and negative tests.

### U01-NFR-MNT-006 - Actionable documentation

- **Priority**: P1.
- **Requirement**: Commands, prerequisites, adapter capability checks, fallback meanings, replay syntax, and recovery steps are documented in repository-relative terms.
- **Acceptance**: A maintainer can execute the documented checks without unstated knowledge or sensitive data.

## Compatibility Requirements

### U01-NFR-CMP-001 - Node baseline

- **Priority**: P0.
- **Requirement**: Inventory, hashing, validation, manifest, and PBT orchestration support the repository CI baseline Node 20 on Linux and a supported Node runtime on macOS. Current local Node 24 may be used for development but cannot become an undocumented minimum.
- **Acceptance**: CI/node-version matrix evidence or equivalent local/container evidence during Code Generation.

### U01-NFR-CMP-002 - Cross-platform semantics

- **Priority**: P0.
- **Requirement**: Repository-relative paths, canonical IDs, ordering, findings, and manifest semantics are identical across macOS and Linux independent of native path separator or filesystem enumeration order.
- **Acceptance**: Unit/PBT coverage plus comparison evidence where feasible.

### U01-NFR-CMP-003 - Capability-dependent converters

- **Priority**: P1.
- **Requirement**: Converter adapters may differ by available local tool, but absence must produce the same stable unavailable/fallback semantics. A ready derivative records the exact adapter/version and is verified before commit.
- **Acceptance**: Adapter-available and adapter-absent evidence.

## Usability and Evidence Requirements

### U01-NFR-USE-001 - Actionable non-sensitive findings

- **Priority**: P0.
- **Requirement**: Every finding explains the stable target, issue class, and resolution without leaking an absolute path, unsafe source, or sensitive value.
- **Acceptance**: Review all finding families and representative snapshots.

### U01-NFR-USE-002 - Machine and human evidence

- **Priority**: P1.
- **Requirement**: Validation and conversion evidence is available in a deterministic machine-readable form plus a concise human-readable summary.
- **Acceptance**: Both representations agree on counts, outcomes, and blocking status.

### U01-NFR-USE-003 - Downstream accessibility readiness

- **Priority**: P0.
- **Requirement**: Every emitted media capability includes reviewed title/description and either accessible image text or explicit decorative state. U-01 must not force later UI to infer accessibility semantics.
- **Acceptance**: Capability validation and negative examples.

### U01-NFR-USE-004 - Complete review evidence

- **Priority**: P0.
- **Requirement**: Post-generation review records exact commands; Node/npm, package, and adapter versions; elapsed time/peak memory; source/canonical/derivative counts and hashes; conversion dispositions; privacy/security results; example/PBT results and seed behavior; production-bundle exclusion; and recovery verification.
- **Acceptance**: No required field absent from the U-01 verification summary.

## Required Acceptance Commands and Evidence Classes

Exact script names are finalized in Code Generation planning. The evidence package must include:

- Strict TypeScript and ESLint results.
- Focused example-test result.
- Focused PBT result with framework/version and seed behavior.
- Inventory/catalog validation result and deterministic rerun comparison.
- Conversion capability/outcome report.
- Privacy and unsafe-source scan.
- Source pre/post integrity comparison.
- Production build/import-boundary/request-manifest inspection.
- Recovery drill result.

## Traceability

| Approved area | U-01 NFR coverage |
| --- | --- |
| FR-006 | AVL-001, SEC-004, SEC-006, REL-001 |
| FR-018 and FR-019 | SCL-001/002, PER-001/002, REL-001/003, CMP-002 |
| FR-022 through FR-025 | PER-003 through PER-005, AVL-003, SEC-002/006/007, CMP-003 |
| NFR-013 and NFR-014 | SEC-002, SEC-004, SEC-005 |
| NFR-016 through NFR-018 | REL-003, MNT-002 through MNT-005, USE-003 |
| NFR-020 and PBT-R01 through PBT-R06 | REL-002 through REL-005, MNT-001/003, CMP-001 |
| US-010 through US-012 | SCL, PER, AVL, SEC, and REL groups |
| US-021 | REL-001 through REL-005, MNT-001, USE-004 |

## Security Baseline Compliance

| Rule | Status at NFR Requirements | Rationale |
| --- | --- | --- |
| SECURITY-01 through SECURITY-03 | N/A | No persistence, network intermediary, or server application is introduced. |
| SECURITY-04 | N/A for U-01 | Assigned to U-06 Infrastructure Design. |
| SECURITY-05 through SECURITY-08 | N/A | No API, IAM, network, authentication, or protected endpoint exists. |
| SECURITY-09 | Compliant | SEC-001, SEC-004, SEC-005, and failure requirements prohibit disclosure/misconfiguration. |
| SECURITY-10 | Compliant in requirements | SEC-007 and acceptance evidence require lockfile/trusted sources; broader audit/SBOM is U-06-owned. |
| SECURITY-11 | Compliant | SEC-003 and SEC-008 define separation, defense in depth, and misuse coverage. |
| SECURITY-12 | N/A | No authentication or credentials. |
| SECURITY-13 | Compliant | SEC-006/007 require hash/tool/dependency integrity. |
| SECURITY-14 | N/A | No security event stream or server monitoring boundary. |
| SECURITY-15 | Compliant | AVL-003/004 and REL-006 enforce safe defaults and explicit error handling. |

No blocking U-01 NFR Requirements security finding remains.

## PBT Compliance

| Rule | Status at NFR Requirements | Rationale |
| --- | --- | --- |
| PBT-01 | Compliant upstream | Twelve properties and N/A categories are approved in Functional Design. |
| PBT-02 through PBT-07 | Required downstream | REL and maintainability requirements preserve round-trip, invariants, idempotence, oracle, and generator obligations. |
| PBT-08 | Compliant in requirements | REL-004 requires shrinking, seed replay, and no silent retry. |
| PBT-09 | Compliant in selection | `fast-check` with Vitest is selected and must be added as a lockfile-pinned dev dependency during approved Code Generation. |
| PBT-10 | Compliant in requirements | REL-005 preserves concrete examples and regression capture. |

No blocking U-01 NFR Requirements PBT finding remains. `fast-check` is intentionally not installed during this documentation-only stage.
