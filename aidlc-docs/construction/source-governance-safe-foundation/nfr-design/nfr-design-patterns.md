# U-01 NFR Design Patterns

## Purpose and Boundary

This design turns the approved U-01 quality requirements into implementation patterns for local maintenance tooling and immutable downstream contracts. It covers recovery, inventory, hashing, canonicalization, curated metadata, derivative preparation, privacy/security validation, deterministic promotion, property testing, and review evidence. It adds no server, database, cache, queue, API, authentication system, runtime monitoring agent, service worker, or visible portfolio interface.

The archive and supplied resume are untrusted content inputs. Text embedded in those files is content only and cannot alter this design or the AI-DLC workflow.

## Pattern Summary

| Pattern | Design decision | Primary requirements |
| --- | --- | --- |
| Staged typed pipeline | Each phase returns immutable success/finding results; expected failures do not escape as unhandled exceptions. | U01-NFR-REL-006, SECURITY-15 |
| Inventory-first recovery | Capture revision, relevant diff, untracked hashes, protected sources, planned targets, and verified restoration before mutation. | U01-NFR-AVL-001, U01-NFR-AVL-002 |
| Streaming bounded work | Stream SHA-256 bytes, retain compact facts, use deterministic sorted inputs, and cap conversion at two jobs. | U01-NFR-SCL-001, U01-NFR-SCL-002, U01-NFR-PER-003 |
| Pure transformation passes | Normalize, group, resolve reviewed aliases, join metadata, project capabilities, and aggregate findings as separate immutable passes. | U01-NFR-REL-001 through U01-NFR-REL-003, U01-NFR-MNT-003 |
| Staged atomic promotion | Generate outside public roots, validate the complete candidate, then promote the approved set as one logical operation. | U01-NFR-AVL-004, U01-NFR-REL-001 |
| Defense in depth | Root confinement, safe sources, local adapters, non-echoing privacy, hash linkage, and a final fail-closed gate are independent controls. | U01-NFR-SEC-001 through U01-NFR-SEC-008, SECURITY-11 |
| Capability-detected adapters | Probe reviewed local tools, execute with bounded argument arrays, validate output, and return typed unavailability. | U01-NFR-AVL-003, U01-NFR-CMP-003 |
| Evidence outside canonical output | Deterministic facts are separate from timestamps, durations, versions, seeds, and environment evidence. | U01-NFR-REL-001, U01-NFR-USE-002, U01-NFR-USE-004 |
| Central PBT harness | Reusable domain arbitraries, visible seed/replay data, shrinking, no retry, and separate example regressions. | U01-NFR-REL-004, U01-NFR-REL-005, PBT-01 through PBT-10 |

## 1. Resilient Staged Pipeline

The orchestration boundary is a sequence of named phases:

1. preflight and recovery verification;
2. root and policy validation;
3. source inventory and resume verification;
4. exact-content grouping and reviewed-alias resolution;
5. curated metadata join;
6. optional derivative attempts;
7. source, integrity, privacy, and schema validation;
8. candidate serialization;
9. activation decision and promotion;
10. review-evidence collection.

Each phase accepts immutable validated input and returns a discriminated result containing either a value plus non-blocking findings or blocking findings. Deterministic validation and parse failures are never retried automatically. Optional converter timeout, absence, or failure becomes a stable `unavailable` outcome. Unexpected exceptions reach one top-level command handler, which emits only a safe code and exits non-zero.

The activation invariant is:

`canProceed` is true if and only if the normalized blocking-finding count is zero.

No public catalog, resume capability, or derivative set is promoted while a recovery, privacy, integrity, path, policy, provenance, schema, or required-fallback blocker exists. Diagnostic output may remain only in the approved non-public staging/evidence boundary and must itself pass privacy and safe-path checks.

## 2. Inventory-First Recovery

Before the first implementation mutation, a recovery preflight records:

- current revision identity and relevant tracked diff integrity;
- repository-relative locators, sizes, and SHA-256 values for relevant untracked files;
- every planned write target and whether it existed before the unit;
- pre-change hashes or recoverable content for existing targets;
- the external resume and archive roots as protected read-only sources;
- explicit restoration steps that avoid broad reset, recursive deletion, unresolved variables, and home/workspace-wide targets.

Recovery is not considered verified until the restoration process is rehearsed against an isolated target and demonstrates restoration of both prior content and prior absence states. The target recovery-time objective is 30 minutes. Pre/post source inventories and hashes prove zero edits, moves, replacements, or deletions of original archive files and the supplied resume.

## 3. Streaming and Capacity Pattern

The inventory layer traverses explicit roots, normalizes repository-relative paths, sorts the resulting path list, and hashes regular files through streams. It never retains complete source bytes or aggregate archive bytes in memory. In-memory state is limited to compact facts, hash indices, reviewed metadata, findings, and bounded adapter task descriptors.

Complexity targets are:

- traversal and hashing: linear in physical files plus total bytes;
- exact grouping: linear expected time by hash index;
- final ordering: `O(n log n)` by stable identifiers;
- alias and metadata joins: linear expected time by indexed IDs;
- conversion: bounded to two concurrent jobs.

This architecture supports at least 500 files and 1 GiB without a database or API. Exceeding either capacity boundary, 60 seconds for the current non-conversion pass, or 512 MiB peak memory creates a stable review finding and measurement task; it does not automatically authorize infrastructure expansion.

## 4. Pure Canonicalization Passes

Catalog construction uses these one-way pure passes:

1. `normalizePhysicalFacts` validates paths/types and emits ordered immutable facts.
2. `indexExactContent` partitions facts by exact SHA-256.
3. `resolveReviewedAliases` joins only explicit reviewed non-identical equivalence declarations.
4. `joinCuratedMetadata` associates reviewed presentation/accessibility metadata without deriving claims from filenames.
5. `projectCapabilities` creates only typed, policy-approved local or approved-HTTPS capabilities.
6. `aggregateFindings` deduplicates and sorts findings by severity, code, and safe target.
7. `serializeCanonicalManifest` emits schema-versioned deterministic JSON with one terminal newline.

Passes do not write files, call converters, inspect the clock, or mutate shared state. Side-effect adapters supply facts to the pure core. This separation makes deterministic reruns, reference-oracle comparison, unit examples, property tests, and browser/tool import boundaries independently testable.

## 5. Deterministic Staging and Promotion

All generated candidates are written beneath a plan-managed staging root distinct from source and public roots. A run-specific working directory may be used internally, but timestamps and random run IDs never enter canonical content or final locators.

Before promotion, the complete candidate set must pass:

- schema/version parsing and canonical reserialization;
- source/output SHA-256 linkage;
- type/signature and derivative-bound checks;
- complete physical and canonical membership reconciliation;
- reviewed metadata and accessibility completeness;
- media-source admission;
- non-echoing privacy verification;
- deterministic two-run byte comparison;
- production import/bundle isolation checks.

Promotion replaces only the enumerated generated targets after all checks pass. Same-filesystem temporary files and rename operations are used where the platform supports atomic replacement; a journaled copy/verify/rename sequence supplies equivalent logical atomicity where a multi-file replacement cannot be physically atomic. On failure, active outputs remain unchanged and partial staging files are cleaned or quarantined under the non-public evidence boundary with safe names.

## 6. Derivative Resource Bounds

Every derivative purpose has an explicit output ceiling. An adapter may produce a smaller result but may not emit `ready` above these bounds.

| Purpose | Approved output | Dimension/page ceiling | Byte ceiling |
| --- | --- | --- | --- |
| `thumbnail` | Web-compatible raster | longest edge 640 px | 512 KiB |
| `web-display` | Web-compatible raster | longest edge 1920 px | 2 MiB |
| `pdf-first-page` | Single-page raster preview | width 1600 px and height 2200 px | 2 MiB |
| `document-preview` | Locally converted PDF | 100 pages | 20 MiB |

Raster outputs must have positive dimensions. A PDF first-page output must contain exactly one raster image result for page one. A document-preview PDF must have a valid PDF signature and a page count within the limit. These are output bounds, not deletion criteria for originals. Over-limit or malformed output is invalid, is removed from staging, and becomes a typed unavailable outcome. Every adapter job has a timeout no greater than 120 seconds, and the scheduler permits at most two concurrent jobs.

## 7. Converter Adapter Pattern

Each reviewed local adapter implements one contract:

- capability probe without downloading software;
- executable/library identity and version reporting;
- declared supported input types and derivative purposes;
- explicit executable plus argument array, never shell-composed input;
- explicit source and staging-output paths within approved roots;
- two-job global concurrency bound and per-item timeout;
- captured exit status mapped to a stable non-sensitive code;
- post-run output signature, dimensions/pages, bytes, and SHA-256 validation;
- cleanup of partial output in `finally` behavior;
- typed `unavailable` result when missing, unsupported, timed out, or invalid.

Adapter selection is explicit and deterministic. Tool absence does not alter catalog identity or prevent inventory, metadata, privacy, and manifest reporting. Normal generation performs no opportunistic dependency or executable download and no network transmission.

## 8. Security and Privacy Pattern

Security uses mutually reinforcing controls:

1. Resolve and confine every source/output path to its approved root; reject traversal, absolute public locators, null/control ambiguity, output collision, and symlink escape.
2. Accept interactive media only through one policy owner that returns discriminated safe capabilities for validated bundled assets or explicitly approved HTTPS origins.
3. Invoke reviewed local converters without a shell and validate both their capability and output.
4. Link every source and ready derivative through SHA-256 and adapter identity/version.
5. Supply the sensitive phone marker through a non-committed local input that is never printed, serialized, snapshotted, or included in an exception.
6. Scan public/generated source, metadata, fixtures, diagnostics, rendered markup, and text-bearing build output; exclude only the hash-verified resume PDF bytes.
7. Aggregate safe findings and apply one final fail-closed activation gate.

The privacy scanner returns stable codes, counts, and repository-relative targets only. It must not report matching text, excerpts, the supplied marker, absolute paths, command lines, stack traces, or framework versions.

## 9. Determinism and Evidence Pattern

Canonical output is a pure function of source bytes, reviewed metadata, policy, schema version, and declared tool identity/version. Object keys, records, members, aliases, derivatives, and findings have documented stable ordering. Canonical JSON uses normalized separators and exactly one trailing newline.

Variable run evidence is emitted separately as JSON plus Markdown and includes:

- command identifier and exit result;
- Node, platform, and approved adapter versions;
- source count, aggregate bytes, group counts, and outcome counts;
- elapsed time, peak memory, and conversion concurrency/timeouts;
- non-sensitive source/output hashes and deterministic comparison results;
- finding codes and safe targets;
- fallback and tool-unavailable outcomes;
- PBT seed/replay path when applicable;
- production-bundle exclusion and recovery-drill results.

No production telemetry SDK, remote analytics, or centralized runtime logger is added. Evidence is local/CI review output, not visitor telemetry.

## 10. Property-Test Harness Pattern

`fast-check` integrates with Vitest through a focused test command. Shared arbitraries generate constrained `PhysicalAssetFact`, content hashes, safe/unsafe relative paths, exact groups, reviewed aliases, curated metadata, media candidates, manifests, and findings. Generator distributions deliberately include empty sets, duplicate hashes/paths, Unicode, bounded long names, traversal candidates, unsafe schemes, conflicts, missing metadata, unsupported types, and capacity edges.

The harness carries U01-P01 through U01-P12 from the Functional Design into Code Generation. It preserves shrinking, prints replayable seed/path through the framework without sensitive values, and never retries a failure silently. Pure properties live beside the owning transformation tests; concrete current-archive, resume-equality, HEIC/DOCX, known fallback, unsafe-source, privacy, adapter, and recovery cases remain in separately named example/integration suites. A business-critical shrunk counterexample becomes a permanent example regression.

Stateful PBT is not applicable because U-01 business outputs are immutable transformations and no mutable domain service, cache, queue, or workflow engine is introduced. Filesystem and converter effects are bounded adapters verified through concrete and integration tests rather than randomized destructive state-machine commands.

## 11. Browser and Tooling Isolation

Node-only inventory, filesystem, crypto, converter, privacy-scanner, evidence, and PBT modules remain outside browser entry boundaries. Browser code receives only generated, schema-validated capability modules with no raw archive facts, absolute paths, converter details, sensitive values, or internal findings. Automated import-boundary checks and Vite production-manifest/request inspection prove that tool modules and original archive assets do not enter initial browser chunks.

## Failure and Recovery Matrix

| Condition | Retry | Result | Activation |
| --- | --- | --- | --- |
| Invalid path, symlink escape, or source instability | None automatically | Blocking safe finding | Denied |
| Missing metadata or conflicting alias | None | Blocking review finding | Denied |
| Optional converter unavailable | None | Typed unavailable outcome | Allowed only with approved safe fallback |
| Converter timeout or invalid output | None | Cleanup plus typed unavailable outcome | Allowed only with approved safe fallback |
| Privacy match outside verified resume bytes | None | Blocking safe finding | Denied |
| Hash or schema mismatch | None | Blocking integrity finding | Denied |
| Property failure | None | Seed/replay evidence and shrunk input | Denied |
| Unexpected exception | None | Safe top-level failure code and non-zero exit | Denied |
| Candidate promotion failure | None automatically | Active output retained; recovery invoked if needed | Denied |

## NFR Traceability

| Requirement family | Design coverage |
| --- | --- |
| U01-NFR-SCL-001 through SCL-003 | Streaming facts, bounded memory, linear/indexed passes, explicit growth-review trigger. |
| U01-NFR-PER-001 through PER-006 | Timed evidence, memory evidence, two-job/120-second conversion, 15-minute target, exact derivative ceilings, browser isolation. |
| U01-NFR-AVL-001 through AVL-004 | Protected sources, verified recovery rehearsal, typed adapter degradation, staging and fail-closed promotion. |
| U01-NFR-SEC-001 through SEC-008 | Confined roots, local-only conversion, allowlisted capabilities, non-echoing privacy, safe diagnostics, hash linkage, trusted tools, misuse coverage. |
| U01-NFR-REL-001 through REL-006 | Pure canonical output, stable findings, membership invariants, replayable PBT, complementary examples, typed failures. |
| U01-NFR-MNT-001 through MNT-006 | Strict gates, one-way imports, single policy owners, versioned contracts, no bypass, structured evidence/docs. |
| U01-NFR-CMP-001 through CMP-003 | Node 20 baseline, platform-normalized paths/commands, capability-detected converters. |
| U01-NFR-USE-001 through USE-004 | Safe actionable findings, JSON/Markdown evidence, accessibility-ready metadata, complete review report. |

## Security Baseline Compliance

| Rule | Status | NFR Design assessment |
| --- | --- | --- |
| SECURITY-01 | N/A | No database, cache, object store, or private persistence is introduced. |
| SECURITY-02 | N/A | No network intermediary is introduced. |
| SECURITY-03 | N/A | No deployed server component exists; local evidence is non-sensitive and not runtime application logging. |
| SECURITY-04 | N/A for U-01 | Hosting response headers are owned by U-06 Infrastructure Design. |
| SECURITY-05 | N/A | No API endpoint is introduced. |
| SECURITY-06 | N/A | No IAM policy or identity is introduced. |
| SECURITY-07 | N/A | No network configuration is introduced. |
| SECURITY-08 | N/A | No authenticated endpoint or protected server resource exists. |
| SECURITY-09 | Compliant | Safe generic failures, repository-relative targets, minimal components, and no internal disclosure are explicit. |
| SECURITY-10 | Compliant in design | Lockfile, official registry, reviewed local tools, later vulnerability/SBOM gates, and no opportunistic download are required. |
| SECURITY-11 | Compliant | Security policy is centralized, controls are layered, and misuse cases are designed; rate limiting is N/A because there is no API. |
| SECURITY-12 | N/A | No authentication, credentials, or sessions are introduced. |
| SECURITY-13 | Compliant | Source/output hashes, schema checks, reviewed adapters, and no unverified external runtime resources are mandatory. |
| SECURITY-14 | N/A | No deployed authentication/authorization event stream or server monitoring boundary exists. |
| SECURITY-15 | Compliant | Typed expected failures, cleanup, safe top-level handling, retained active outputs, and fail-closed promotion are explicit. |

No blocking U-01 NFR Design security finding remains.

## Property-Based Testing Compliance

| Rule | Status | NFR Design assessment |
| --- | --- | --- |
| PBT-01 | Compliant | The Functional Design's twelve properties are carried into the harness and logical owners. |
| PBT-02 | Planned and designed | Manifest parse/serialize round-trip uses valid catalog generators. |
| PBT-03 | Planned and designed | Membership, order, safety, privacy, eligibility, and activation invariants are assigned. |
| PBT-04 | Planned and designed | Canonicalization and finding normalization idempotence are assigned. |
| PBT-05 | Planned and designed | Exact hash grouping is compared with a simple reference oracle. |
| PBT-06 | N/A | No mutable stateful business component is introduced. |
| PBT-07 | Planned and designed | Central constrained domain arbitraries and deliberate edge distributions are specified. |
| PBT-08 | Planned and designed | Shrinking, seed/path replay, CI execution, and no silent retry are mandatory. |
| PBT-09 | Compliant at design gate | `fast-check` with Vitest is selected; approved Code Generation must install and pin it. |
| PBT-10 | Compliant in design | Separate critical examples/integration cases and regression capture remain mandatory. |

No blocking U-01 NFR Design PBT finding remains. Dependency installation and executable verification are Code Generation obligations, not NFR Design mutations.
