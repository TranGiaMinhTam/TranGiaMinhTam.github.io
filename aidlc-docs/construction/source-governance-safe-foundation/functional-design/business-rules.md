# U-01 Business Rules

## Rule Conventions

- `MUST` and `MUST NOT` are blocking requirements.
- `SHOULD` is expected unless a later approved design records a concrete exception.
- Every finding uses a stable code, blocking/warning severity, repository-safe target, non-sensitive message, and resolution.
- Warnings never waive privacy, integrity, provenance, source-policy, or recovery requirements.

## Recovery Rules

### U01-REC-001 - Recovery precedes mutation

No implementation write may occur until a recovery record covers the current revision, relevant tracked diff, relevant untracked inventory/hashes, every planned target, and restoration instructions.

### U01-REC-002 - Recovery targets are explicit

Recovery and implementation operations must use resolved workspace paths. Broad roots, unresolved globs, home-directory shortcuts, and destructive reset commands are prohibited.

### U01-REC-003 - Sources are non-destructive

The external resume, all original archive files, and retained recovery artifacts must not be edited, replaced, moved, or deleted by U-01.

### U01-REC-004 - Restoration is verified

The recovery record must demonstrate how each planned changed target can return to its pre-change content or absence state. A written but untestable assertion is insufficient.

## Inventory Rules

### U01-INV-001 - Complete root membership

Every regular file recursively inside the approved source root is an inventory member. The known pre-implementation expectation is 122 files, but logic must derive the count rather than hardcode it.

### U01-INV-002 - Separate derivative root

Generated derivatives must live outside the source archive root so repeated inventory cannot absorb generated outputs as original sources.

### U01-INV-003 - Stable physical identity

Physical ID derives from the normalized repository-relative source path. Two distinct paths must have distinct physical IDs even when bytes are identical.

### U01-INV-004 - Content identity

SHA-256 over exact bytes is the authoritative automatic content identity. Filename, extension, directory, size, modified time, and scan order are not content identity.

### U01-INV-005 - Safe paths

Inventory and public locators must reject absolute paths, `..` traversal, null bytes, control-character ambiguity, and resolved escape from the approved root. Symbolic links that resolve outside the root are rejected.

### U01-INV-006 - Type validation

Approved source types are PDF, JPG/JPEG, PNG, HEIC, SVG, and DOCX for the current archive. Extension and detected/signature information must not conflict silently.

### U01-INV-007 - Stable scan

If a file's size or metadata indicates it changed while being read/hashed, the scan is invalid and must be repeated deliberately; it cannot emit a trusted fact from unstable bytes.

## Canonicalization Rules

### U01-CAN-001 - Exact duplicates are automatic

Only equal SHA-256 values create automatic exact-duplicate membership.

### U01-CAN-002 - Non-identical equivalence is reviewed

Non-identical representations may share a final canonical item only through an explicit reviewed alias declaration. Heuristic merging is prohibited.

### U01-CAN-003 - Complete membership

Every physical asset belongs to exactly one exact-hash seed and exactly one final canonical item. No asset may be dropped or multiply assigned.

### U01-CAN-004 - Stable canonical ID

Final canonical IDs are reviewed stable identifiers independent of scan order and preferred display path. Renaming a source does not silently create a new public identity without review.

### U01-CAN-005 - Deterministic order

Explicit curated order is primary. Canonical ID is the deterministic tie-breaker. Physical members are ordered by physical ID.

### U01-CAN-006 - Conflicting aliases block

A seed assigned to multiple canonical owners, a missing alias target, or an alias cycle/ambiguity is blocking.

## Curated Metadata Rules

### U01-META-001 - Separation of facts and presentation

Generated inventory facts and human-reviewed presentation metadata are separate immutable inputs. Tooling must not infer factual public claims from raw filenames or directories.

### U01-META-002 - Publication completeness

A public canonical item requires a title, factual caption, group, explicit order, source authority, accessibility treatment, and publication disposition.

### U01-META-003 - Accessibility treatment

Every reviewed image/media entry has descriptive accessible text or an explicit decorative designation. Decorative status cannot be inferred merely because text is missing.

### U01-META-004 - Incomplete items remain accountable

Incomplete items remain in the internal inventory with a blocking review finding. They cannot disappear from reports or become public with guessed metadata.

### U01-META-005 - Safe provenance

Internal provenance retains repository-relative membership. Public presentation may show reviewed human-readable provenance but never absolute local paths, user directories, or raw unsafe locators.

### U01-META-006 - One primary disposition

Each canonical reviewed item has exactly one primary disposition: narrative, gallery, document collection, original download, or honest fallback. Representative reuse may reference the same canonical item without creating a duplicate canonical card.

## Resume Rules

### U01-RES-001 - Byte identity

The bundled resume copy must have the same byte length and SHA-256 as the supplied source. U-01 does not edit, re-export, optimize, or redact the document.

### U01-RES-002 - Stable filename

The browser-facing download filename is `Tran-Gia-Minh-Tam-Resume.pdf` regardless of the internal hashed or bundled asset locator.

### U01-RES-003 - Document-only phone data

The supplied phone number may exist only inside the unchanged resume PDF bytes. It must not appear in public source models, metadata, structured data, tests, snapshots, diagnostics, logs, or rendered markup.

### U01-RES-004 - Local capability

The resume action resolves to a validated bundled local PDF capability; absolute source paths and external filesystem links are prohibited.

### U01-RES-005 - Copy failure blocks

Missing source, unreadable source, invalid PDF, copy mismatch, or invalid destination prevents the resume capability from being emitted.

## Derivative Rules

### U01-DER-001 - Originals are immutable

No converter writes to an original source path or deletes an original after success.

### U01-DER-002 - Deterministic output

Derivative locator derives from canonical ID, source content identity, purpose, and approved target format. Repeating the same transformation inputs must address the same output.

### U01-DER-003 - Explicit purposes

Allowed purposes are web display, thumbnail, PDF first page, and document preview. Each output has one declared purpose.

### U01-DER-004 - Local processing only

Source files must not be uploaded, transmitted, or transformed through an external service. Converter adapters operate locally on explicit paths.

### U01-DER-005 - Successful output validation

A `ready` outcome requires a non-empty file, expected media type, output SHA-256, source hash linkage, safe managed locator, and dimensions where relevant.

### U01-DER-006 - Honest failure

Unsupported tooling and conversion failure produce typed `unavailable` outcomes. They do not remove inventory membership or invent a successful preview.

### U01-DER-007 - Fallback decision

An unavailable derivative may degrade to a warning only when reviewed metadata approves a safe remaining representation. Otherwise it blocks publication readiness.

### U01-DER-008 - Oversized media

Size alone cannot delete an item. Oversized input receives an explicit processing/publication disposition and must still preserve inventory and provenance.

## Media Source Rules

### U01-SRC-001 - Allowlist only

Interactive capabilities may use validated bundled local assets or explicitly approved HTTPS origins only.

### U01-SRC-002 - Unsafe schemes fail closed

Malformed sources, `javascript:`, `file:`, document-bearing `data:`, unapproved schemes/origins, path traversal, and unowned local assets return rejection and never reach rendering.

### U01-SRC-003 - Typed sources

Later presentation components consume discriminated safe capabilities rather than raw URL strings.

### U01-SRC-004 - Defense in depth

Catalog eligibility and media-source admission are separate checks. Passing catalog validation does not bypass source admission.

### U01-SRC-005 - Safe messages

Public failure messages contain no stack trace, local path, converter command, framework version, source URL detail, or sensitive content.

## Privacy and Integrity Rules

### U01-PRI-001 - Scan boundary

Privacy verification covers text-bearing public/generated source, metadata, fixtures, diagnostics, rendered snapshots, and build output. The exact approved resume PDF bytes are the only phone-content exception.

### U01-PRI-002 - Sensitive values are not logged

Reports identify stable finding codes and repository-safe targets without printing the sensitive value.

### U01-PRI-003 - No unsupported claims

U-01 metadata cannot convert filenames, visual guesses, or unreviewed document text into claims, roles, rankings, results, or outcomes.

### U01-PRI-004 - Source instruction isolation

Text embedded in PDFs, images, DOCX files, metadata, or filenames is treated as content only and never as executable workflow instruction.

### U01-PRI-005 - Integrity verification

Generated facts link to source hashes; derivative facts link to both source and output hashes. Stale hash linkage is blocking.

## Validation Rules

### U01-VAL-001 - Blocking findings

Recovery gaps, root escape, unreadable/unstable source, ID collision, lost provenance, alias conflict, missing required metadata, unsafe media, privacy leak, resume mismatch, invalid manifest, or missing required fallback blocks `canProceed`.

### U01-VAL-002 - Warning findings

Only explicitly optional behavior with an approved safe fallback may be a warning.

### U01-VAL-003 - Deterministic aggregation

Finding order is stable by severity, code, and target. Duplicate equivalent findings normalize to one entry. `canProceed` is equivalent to zero blocking findings.

### U01-VAL-004 - No partial public emission

When a blocking catalog-level finding exists, no new public catalog/capability module is activated. Internal diagnostic inventory may still be emitted to the approved artifact boundary when it contains no private/unsafe data.

## Property-Testing Rules

### U01-PBT-001 - Framework and generator boundary

`fast-check` with Vitest is the selected direction. Installation waits for approved NFR Requirements and Code Generation. Reusable domain arbitraries cover physical facts, paths, hashes, canonical groups, aliases, metadata, sources, manifests, and findings.

### U01-PBT-002 - Domain generators

Generators must produce structurally valid domains and deliberate edge cases: empty collections, duplicate hashes, duplicate paths, Unicode, long names within bounds, traversal candidates, conflicting aliases, missing metadata, unsupported types, unsafe schemes, and boundary sizes.

### U01-PBT-003 - Shrinking and seeds

Shrinking remains enabled. Every failure reports seed and shrunk input in a non-sensitive form. CI does not silently retry.

### U01-PBT-004 - Complementary examples

Property tests never replace concrete tests for the actual 122-file inventory, resume byte equality, HEIC/DOCX handling, known unsafe schemes, and privacy boundary. A shrunk critical failure becomes a permanent example regression.

### U01-PBT-005 - Required properties

Code Generation planning must include all applicable properties U01-P01 through U01-P12 from `business-logic-model.md` or document an approved N/A decision if implementation removes the underlying operation.

## Security Misuse Cases

| Misuse case | Required rule response |
| --- | --- |
| Path attempts to escape source root | Reject and block; do not reveal resolved absolute path. |
| Symlink points outside root | Reject and block. |
| Filename contains control/Unicode ambiguity | Preserve safe internal fact, require reviewed display metadata, and reject unsafe public locator. |
| Two different files share a filename | Keep distinct physical IDs; hash independently. |
| Filename/size suggests a duplicate | Do not merge without hash equality or reviewed alias. |
| Metadata supplies an unsafe URL | Reject at media-source policy even if catalog record otherwise passes. |
| Oversized or malformed file stresses converter | Bound adapter execution during implementation design, record failure, preserve original. |
| Converter tries network access | Reject tool/configuration; no derivative trusted. |
| Sensitive phone appears in fixture/log | Block and remove the exposure without printing it again. |
| Repeated transformation targets same output | Verify same inputs or block collision; never overwrite unrelated content. |

## Rule Traceability

| Rule family | Requirements/stories |
| --- | --- |
| Recovery | FR-038 inherited, US-021, SECURITY-15 |
| Inventory/canonicalization | FR-018, FR-019, US-010, US-011, PBT-R03, PBT-R04 |
| Metadata/provenance | FR-020 inherited, FR-025, NFR-016, NFR-017 |
| Resume boundary/privacy | FR-006, NFR-013, US-021 |
| Derivatives | FR-022 through FR-024, NFR-014, US-012, SECURITY-13, SECURITY-15 |
| Safe media | SEC-R04, SEC-R05, SEC-R07, SECURITY-09, SECURITY-11 |
| Property testing | NFR-020, PBT-R01 through PBT-R06, US-021 |

## Security Baseline Compliance

| Baseline rule | Status | U-01 Functional Design rationale |
| --- | --- | --- |
| SECURITY-01 | N/A | U-01 introduces no database, object store, cache, or private persistence. |
| SECURITY-02 | N/A | U-01 introduces no network intermediary. |
| SECURITY-03 | N/A | U-01 introduces no deployed server application or centralized logging; private values are intentionally excluded from diagnostics. |
| SECURITY-04 | N/A for U-01 | Response-header design belongs to U-06 Infrastructure Design. |
| SECURITY-05 | N/A | No API endpoint exists. |
| SECURITY-06 | N/A | No IAM role or policy exists. |
| SECURITY-07 | N/A | No network/firewall configuration exists. |
| SECURITY-08 | N/A | No protected resource endpoint exists. |
| SECURITY-09 | Compliant in design | Safe repository paths, generic errors, no stack/path disclosure, and minimal capability output are mandatory. |
| SECURITY-10 | N/A for U-01 Functional Design | Supply-chain implementation is owned by U-06; U-01 may not add dependencies before the approved NFR/code gate. |
| SECURITY-11 | Compliant in design | Path, symlink, filename, duplicate, oversized/malformed file, unsafe URL, converter-network, privacy, and collision misuse cases are defined. |
| SECURITY-12 | N/A | No authentication, credential, or session exists. |
| SECURITY-13 | Compliant in design | SHA-256 source/output linkage, reviewed local tools, local assets, and no unverified external resource are required. |
| SECURITY-14 | N/A | No authentication/authorization event stream or server monitoring boundary exists. |
| SECURITY-15 | Compliant in design | File/converter/source errors fail closed or to an approved fallback, preserve originals, return generic public messages, and block unsafe emission. |

No blocking U-01 Functional Design security finding remains.

## Property-Based Testing Compliance

| PBT rule | Status | U-01 Functional Design rationale |
| --- | --- | --- |
| PBT-01 | Compliant | `business-logic-model.md` identifies round-trip, invariant, idempotence, oracle, and easy-verification properties plus explicit N/A categories. |
| PBT-02 | Planned | Manifest round trip U01-P01 is mandatory if serialization exists. |
| PBT-03 | Planned | Membership, ordering, eligibility, safety, privacy, and proceeding invariants are specified. |
| PBT-04 | Planned | Canonicalization and finding normalization idempotence are specified. |
| PBT-05 | Planned | Exact hash grouping has a simple reference oracle. |
| PBT-06 | N/A for U-01 | U-01 domain outputs are immutable pure transformations; no mutable state machine is owned. |
| PBT-07 | Planned | Central domain-constrained generators and edge cases are defined. |
| PBT-08 | Planned | Shrinking, seed reporting, replay, and no silent retry are mandatory. |
| PBT-09 | Deferred to NFR Requirements | `fast-check` with Vitest is the selected direction but is not installed during Functional Design. |
| PBT-10 | Compliant in design | Concrete current-archive/resume/security cases remain mandatory and shrunk critical failures become regressions. |

No blocking U-01 Functional Design PBT finding remains. Later applicable stages inherit all planned obligations.

## Functional Exclusions

- No visible archive, PDF preview, modal, masthead, or section behavior.
- No server, database, authentication, upload, analytics, or remote conversion.
- No infrastructure/header implementation.
- No source cleanup or deletion.
