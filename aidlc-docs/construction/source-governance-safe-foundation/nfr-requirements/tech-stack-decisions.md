# Technology Stack Decisions: U-01 Source Governance and Safe Foundation

## Decision Summary

U-01 retains the existing React/TypeScript/Vite application and uses Node ESM maintenance tooling built from standard-library primitives plus explicit local converter adapters. Vitest remains the test runner and `fast-check` is selected as the single new development dependency for property-based testing. No converter, filesystem, hash, privacy-scan, or generator code may enter the browser bundle.

## Current Verified Baseline

| Technology | Current evidence | Decision role |
| --- | --- | --- |
| Node.js | CI declares Node 20; current local runtime is 24.0.0 | Node 20 is the minimum reference baseline; newer supported local versions may be used. |
| npm | Current local 11.3.0 | Package operations use `npm ci`/lockfile workflow. |
| React | Package range `^19.2.0` | Retained; U-01 adds no visible React feature. |
| TypeScript | Installed 5.9.3 | Retained for browser-safe contracts and strict checking. |
| Vite | Installed/locked 7.3.0 in current environment | Retained static build and asset resolver. |
| Vitest | Installed 4.1.9 | Retained example/PBT runner. |
| Testing Library | Existing dev dependency | Retained; minimal U-01 use because no visible UI. |
| Lockfile | `package-lock.json` present | Authoritative exact dependency resolution. |
| `fast-check` | Not installed | Selected dev dependency; installation requires approved Code Generation. |

Observed local versions are evidence, not permission to mutate the lockfile during NFR Requirements.

## TS-001 - Runtime Application Stack

### Decision

Retain React 19, TypeScript, and Vite. U-01 emits typed browser-safe capabilities and generated static data only.

### Rationale

- Matches the active application and approved architecture.
- Avoids framework migration risk in a high-risk dirty worktree.
- Preserves Vite asset hashing and GitHub Pages base-path behavior.
- Adds no runtime network or persistence surface.

### Constraints

- U-01 creates no new visible React UI.
- Raw filesystem facts and Node types cannot cross into presentation.
- Generated browser modules contain only approved compact capabilities.
- Existing initial JS/CSS ceilings cannot rise without explicit approval.

### Rejected Alternatives

- Framework migration: unrelated and high risk.
- Browser-side file/conversion logic: violates privacy, performance, and bundle isolation.
- Backend catalog/media service: explicitly out of scope.

## TS-002 - Node ESM Orchestration

### Decision

Use Node ESM maintenance scripts under the existing `scripts/portfolio/` boundary for inventory, streaming SHA-256, canonical manifest generation, adapter orchestration, privacy scanning, measurements, and verification.

### Rationale

- Node 20 is already the CI baseline.
- Standard-library filesystem, stream, path, URL, and crypto APIs meet core needs.
- `.mjs` matches existing repository tooling and avoids adding a script transpiler solely for U-01.
- Vitest can exercise exported pure modules and scripts.

### Constraints

- Pure business transformations must be isolated from effect adapters and exported for testing.
- Shell commands are invoked through explicit executable plus argument arrays, never concatenated untrusted command strings.
- Scripts validate source/output roots before reads/writes.
- Blocking findings return non-zero process status.
- No tooling module is imported by `src/` browser entry paths.

### Rejected Alternatives

- `tsx`/runtime TypeScript loader: unnecessary new tooling unless Code Generation proves a material benefit and requests approval.
- Bash-only orchestration: weaker cross-platform data modeling and test integration.
- Python conversion/orchestration: adds a second project runtime without current need.

## TS-003 - Browser Contract Types

### Decision

Use strict TypeScript immutable branded/discriminated types under focused `src/portfolio/archive/`, `src/portfolio/resume/`, and shared media-policy boundaries. Generated data must satisfy these contracts at build/type-check time.

### Rationale

- Aligns with current branded IDs and discriminated validation results.
- Prevents raw URL/path strings from reaching presentation.
- Supports one-way imports and exhaustiveness.

### Constraints

- No broad `any`, unsafe assertion, or non-null assertion may bypass eligibility/source validation.
- Manifest schema carries an explicit version.
- Breaking schema changes require migration/compatibility review.
- Document-only fields such as phone data have no public runtime type.

## TS-004 - Hashing and File Processing

### Decision

Use Node standard-library streaming I/O and cryptographic SHA-256 for source/output identity.

### Rationale

- No dependency is needed.
- SHA-256 satisfies exact-content and integrity requirements.
- Streaming supports bounded memory independent of aggregate source bytes.

### Constraints

- Hash bytes exactly; do not normalize file contents.
- Recheck file stability around the hash operation.
- Normalize only repository-relative locator semantics, not source bytes.
- Do not print absolute paths in reports.

### Rejected Alternatives

- MD5/SHA-1: inadequate integrity choice.
- Filename/size identity: cannot prove exact duplicates.
- Whole-file buffers: violate scalable memory requirement.

## TS-005 - Deterministic Manifest Format

### Decision

Use schema-versioned canonical JSON for machine evidence and a generated TypeScript/browser module only where runtime capability consumption requires it. Canonical output uses stable key/record ordering and a single terminal newline; evidence timestamps live in a separate run report.

### Rationale

- JSON is inspectable, portable across Node/macOS/Linux, and easy to validate/round-trip.
- Separating timestamps preserves byte determinism.
- Generated TypeScript can use Vite's static asset graph without exposing raw inventory paths.

### Constraints

- Serializer and parser are paired and property-tested.
- Unknown schema versions fail closed.
- Canonical manifest contains repository-safe paths only.
- Generated public modules contain no internal-only source provenance or phone data.

## TS-006 - Property-Based Testing Framework

### Decision

Select `fast-check` integrated with existing Vitest as a development dependency.

### Rationale

- Native TypeScript/JavaScript domain generators.
- Automatic shrinking.
- Seed/path replay support.
- Direct integration with the existing test runner.
- Appropriate for invariants, idempotence, oracle comparison, and round trips defined in Functional Design.

### Installation Policy

- Do not install during NFR Requirements or NFR Design.
- An approved Code Generation plan must add it from the official npm registry.
- `package-lock.json` pins the exact transitive resolution.
- The plan must inspect the resolved package/version, license, vulnerabilities, and Vitest/Node compatibility before accepting the lockfile change.
- No guessed version is documented as approved before resolution.

### Required Configuration

- Shared domain arbitraries live in focused test utilities.
- Shrinking remains enabled.
- Seed and replay path are visible on failure.
- CI/local scripts do not silently retry.
- Concrete example tests remain separate and mandatory.

### PBT-09 Decision

Framework selection is complete. Dependency installation is intentionally deferred to the mutation-authorized Code Generation stage.

### Rejected Alternatives

- Custom random-data framework: reinvents shrinking and reproducibility.
- Snapshot-only tests: cannot prove transformation invariants.
- Random primitive-only tests: violate generator-quality requirements.

## TS-007 - Local Converter Adapter Strategy

### Decision

Use a Node orchestration interface with capability-detected local adapters for:

- Raster/HEIC to web-compatible image.
- DOCX to previewable PDF.
- PDF first-page raster preview.
- Image thumbnail/resizing.

Exact executables/libraries are selected during Code Generation planning after a read-only environment capability probe and licensing/security review.

### Rationale

- Keeps source bytes local.
- Allows platform/tool absence to become an explicit fallback.
- Avoids putting conversion code into browser bundles.
- Allows committed, verified derivatives to be reproduced by documented maintainers.

### Adapter Contract

- Explicit executable/library identity and version.
- Explicit source and output paths inside approved roots.
- No shell interpolation of filenames.
- Maximum two concurrent jobs.
- Per-item timeout no greater than 120 seconds.
- Captured exit status and non-sensitive failure code.
- Output media/signature, bytes, hash, and dimensions verified.
- No network transmission.
- Cleanup of partial output on failure.

### Candidate Tools

Tool categories may include a reviewed raster/HEIC processor, a headless office converter for DOCX, and a PDF rasterizer. Naming a category does not approve installation or a specific binary. The Code Generation plan must choose only tools available from trusted sources and document platform behavior.

### Rejected Alternatives

- External SaaS conversion: violates NFR-014.
- Browser conversion: violates bundle/performance/privacy boundaries.
- One undocumented maintainer command: not portable or auditable.

## TS-008 - Privacy Verification

### Decision

Use a local non-echoing scanner orchestrated by Node. The sensitive verification marker is supplied through an approved non-public input and is never committed or printed.

### Scope

- Generated/public source and data.
- Curated metadata.
- Test fixtures and snapshots.
- Diagnostics and run reports.
- Rendered markup evidence.
- Text-bearing production build files.

The byte-identical approved resume PDF is the sole content exception.

### Constraints

- Reports show stable codes and safe repository-relative targets only.
- The scanner must not extract or publish arbitrary PDF contents.
- Failure is blocking and cannot be downgraded to warning.

## TS-009 - Measurement and Evidence

### Decision

Use monotonic Node timing, normalized peak-memory reporting, deterministic counts/hashes, and machine-readable JSON plus Markdown summaries.

### Constraints

- Record Node/npm and applicable adapter versions.
- Identify reference environment and command.
- Separate canonical output from timestamped run evidence.
- Compare two clean manifests byte-for-byte.
- Retain PBT seed/replay information without sensitive input.

## TS-010 - Validation and Error Model

### Decision

Use discriminated result objects and stable finding codes for expected validation/tool failures. Use process exit status for CLI success/blocking outcome and a top-level safe catch for unexpected exceptions.

### Rationale

- Prevents partial unsafe emission.
- Keeps diagnostics deterministic/testable.
- Maps directly to existing validation conventions.

### Constraints

- Expected invalid inputs do not depend on thrown exceptions for control flow.
- Unexpected exceptions produce a generic message and non-zero status.
- Partial derivative files are removed or quarantined inside the managed output boundary.
- Source resources/streams/processes are closed in all paths.

## TS-011 - Dependency and Supply-Chain Policy

### Decision

Add no runtime dependency for U-01. The only selected npm addition is `fast-check` as a dev dependency, pending Code Generation approval. Converter tools are separately reviewed local adapters rather than browser dependencies.

### Constraints

- Preserve `package-lock.json` and use official/verified sources.
- Review `npm audit` impact after mutation.
- Check unused dependencies and production bundling.
- U-06 remains responsible for the final SBOM and full supply-chain gate.
- CI action pinning remains U-06 scope, though U-01 may not weaken it.

## Version and Upgrade Policy

1. The committed lockfile is the exact npm resolution authority.
2. Node 20 remains the minimum CI baseline unless separately approved.
3. Local Node 24 usage must not introduce Node-20-incompatible code.
4. `fast-check` exact version is chosen only during approved installation after compatibility/security/license inspection.
5. Converter version changes invalidate cached trust evidence and require derivative re-verification.
6. Major upgrades are isolated from feature implementation unless required and approved.

## Platform Policy

| Capability | macOS | Linux/CI | Required behavior |
| --- | --- | --- | --- |
| Inventory/hash/canonicalization | Required | Required on Node 20 | Same semantic and canonical output. |
| Validation/privacy/PBT | Required | Required | Same rules; no sensitive echo. |
| Converter adapter | Capability-dependent | Capability-dependent | Ready when verified; otherwise stable unavailable/fallback. |
| Browser bundle exclusion | Required | Required in build | No Node/tool/generator module in production chunks. |

Windows is not a required maintainer target for U-01, but repository-relative canonical data must not encode POSIX absolute assumptions that prevent future support.

## Decision Traceability

| Decision | Requirements |
| --- | --- |
| Node ESM orchestration | PER-001/002, CMP-001/002, MNT-001/006 |
| Streaming SHA-256 | SCL-002, SEC-006, REL-003 |
| Canonical JSON and generated TS | REL-001, MNT-004, CMP-002 |
| `fast-check` with Vitest | NFR-020, PBT-R01 through PBT-R10, REL-004/005 |
| Local converter adapters | FR-022 through FR-024, NFR-014, PER-003/004, AVL-003, SEC-002/007 |
| Non-echoing privacy scanner | NFR-013, SEC-004/005 |
| No new runtime dependency | PER-006, MNT-002, SECURITY-10 |

## Security Compliance

- **Compliant**: Trusted dependency sources/lockfile, local-only transformation, explicit adapter identity, argument-array execution, integrity hashes, non-sensitive diagnostics, fail-closed results, and resource cleanup are specified.
- **N/A**: Database/storage encryption, network intermediaries, server logging, APIs, IAM, networks, authentication, and security-event alerting are not introduced by U-01.
- **Deferred**: HTTP response headers and final SBOM/CI release evidence remain assigned to U-06.
- **Blocking findings**: None at U-01 NFR Requirements.

## PBT Compliance

- `fast-check` is selected for TypeScript/Vitest and satisfies the required custom generator, shrinking, seed, and runner capabilities.
- Installation is a future approved Code Generation mutation and must update the lockfile.
- Domain generators, examples, shrinking, replay, and no-retry requirements are binding.
- No PBT rule is dropped; PBT-06 remains N/A for U-01's immutable business transformations as documented in Functional Design.
