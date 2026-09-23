# NFR Requirements Plan: U-01 Source Governance and Safe Foundation

> **Status: NFR Requirements complete; explicit approval required. No dependency, source, asset, or build mutation is authorized.**

## Purpose

Define measurable quality requirements and technology choices for U-01 inventory, canonicalization, resume copying/privacy, local derivatives, safe media admission, recovery, validation, and property testing. The stage selects constraints and tools but does not install dependencies or execute transformations.

## Unit Context

- U-01 processes a current 122-file, approximately 293 MB archive plus the supplied resume.
- Outputs are immutable generated facts/capabilities and maintainer evidence; no new visible UI is activated.
- The project remains a single React 19, TypeScript, Vite, Vitest, and static-deployment package with a committed lockfile.
- Functional Design specifies twelve testable properties and selects `fast-check` with Vitest as the PBT direction.
- Conversion is local-only, source-preserving, adapter-based, and allowed to produce honest fallbacks.
- Security Baseline and full Property-Based Testing enforcement are enabled.

## NFR Category Assessment

| Category | Applicability | Reason |
| --- | --- | --- |
| Scalability | Applicable | Inventory and catalogs must handle archive growth without adding a backend or changing the model. |
| Performance | Applicable | Hashing approximately 293 MB, generating manifests, and bounded conversion must not make maintenance impractical or affect initial runtime loading. |
| Availability | Applicable | Optional converter/tool failure must preserve sources and safe fallbacks; recovery must restore the dirty-worktree boundary. |
| Security | Applicable | Path escape, unsafe schemes, private phone data, malicious media, local tool boundaries, and software supply-chain controls are blocking. |
| Tech stack | Applicable | PBT and local preprocessing need explicit compatible technology decisions. |
| Reliability | Applicable | Identical inputs must produce deterministic identities, ordering, findings, and manifests. |
| Maintainability | Applicable | Six units will consume these contracts, so types, import direction, documentation, and diagnostics must remain stable. |
| Usability | Applicable in maintainer/capability scope | Reports must be actionable and non-sensitive; downstream capabilities must support later accessible UI without exposing raw sources. |

## Questions

Please answer each question by placing the selected letter after its `[Answer]:` tag. The recommended choice is listed first.

## Question 1 - Archive Growth Capacity

What capacity should U-01 support without changing architecture?

A) Support at least 500 physical source files and 1 GiB of source bytes using the same local inventory, immutable catalog, and lazy-runtime boundaries; larger growth requires measurement and explicit review rather than a backend by default
B) Support only the current 122 files and redesign for any material addition
C) Introduce a database and media API now for effectively unlimited growth
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 2 - Inventory Performance

What measurable target should govern a clean inventory/hash/catalog pass for the current approximately 293 MB archive, excluding media conversion?

A) Complete within 60 seconds with peak process memory no greater than 512 MiB on the documented Node 20 reference environment, while streaming file hashes rather than buffering whole files
B) Allow any duration and memory use as long as a manifest eventually appears
C) Require completion under one second regardless of environment
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 3 - Deterministic Output

How deterministic must generated facts and manifests be?

A) Identical source bytes, reviewed metadata, policy, and tool versions must produce byte-identical canonical generated text after excluding explicitly non-canonical evidence timestamps; ordering and findings must be stable
B) Preserve semantic equivalence but allow scan-order-dependent IDs and ordering
C) Regenerate random IDs and timestamps into every output on each run
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 4 - Conversion Resource Limits

What resource policy should local derivative adapters follow?

A) Limit conversion to two concurrent jobs, apply a documented per-item timeout no greater than 120 seconds and total clean-run target no greater than 15 minutes for the current archive, bound output dimensions/bytes by purpose, and record timeouts as unavailable outcomes
B) Launch all conversions concurrently with no timeout or output bound
C) Treat every converter timeout as a reason to delete the source item from publication records
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 5 - Recovery and Continuity

What recovery objective should U-01 satisfy?

A) Preserve zero-loss originals and provide verified restoration of every U-01 mutation target to the captured pre-unit state within 30 minutes in a compatible checkout, without relying on editor history or external backup services
B) Preserve only filenames and reconstruct content manually if needed
C) Rely on a future production deployment as the recovery copy
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 6 - Tool Unavailability

How should unavailable local converters affect availability?

A) Inventory, canonicalization, and validation must still complete; each unavailable conversion receives a deterministic fallback outcome, and only items without an approved safe representation block publication readiness
B) Abort all U-01 processing whenever any optional converter is absent
C) Upload the file to an external conversion service automatically
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 7 - Security and Privacy Gate

What release posture should apply to unsafe sources, absolute paths, phone leakage, integrity mismatch, or external transmission?

A) Treat every such event as blocking with fail-closed capability emission, non-sensitive diagnostics, local-only processing, and no waiver inside U-01
B) Warn but emit the capability so maintainers can inspect it in production
C) Enforce privacy only on visible text and allow hidden/generated leakage
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 8 - Property-Testing Stack

Which PBT stack should Code Generation later install and configure?

A) Add `fast-check` as a development dependency resolved from the official npm registry at an exact lockfile-pinned version compatible with the existing Vitest/TypeScript stack; keep shrinking enabled and expose seed replay
B) Write a custom random-data framework inside the repository
C) Skip PBT and use snapshots only
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 9 - Converter Technology Strategy

How should local conversion technologies be selected?

A) Use a Node-based orchestration layer with explicit capability-detected local adapters for raster/HEIC, DOCX-to-PDF, and PDF/image previews; commit only verified derivatives/manifests, record tool versions, and preserve fallbacks when an adapter is unavailable
B) Add conversion libraries directly to the browser bundle and process files on visitor devices
C) Depend on one undocumented maintainer-specific shell command with no capability detection
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 10 - Runtime and Build Isolation

How should U-01 tooling affect the visitor application?

A) Keep filesystem, hashing, converter, privacy-scan, and PBT generator tooling out of production bundles; initial runtime receives only approved compact capabilities, and build/request budgets cannot increase without approval
B) Bundle inventory and converter libraries into the browser for convenience
C) Import the complete 293 MB archive eagerly into the application entry
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 11 - Platform Compatibility

Which maintainer environments should U-01 orchestration support?

A) Support the repository's pinned Node 20 CI baseline on macOS and Linux for inventory, hashing, validation, and PBT; converter adapters may be capability-dependent but must yield identical manifest semantics and explicit fallback outcomes
B) Support only the current maintainer's macOS installation with undocumented tools
C) Require browser execution and avoid Node tooling
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 12 - Maintainability Gate

What maintainability criteria should block U-01 approval?

A) Require strict TypeScript where applicable, lint, focused examples and PBT, documented immutable contracts, one-way imports, stable finding codes, no duplicated core generators/policies, no unsafe casts that bypass validation, and no unexplained warnings
B) Require only a successful production build
C) Permit temporary duplicated catalogs and bypasses until U-06
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 13 - Acceptance Evidence

What evidence must accompany U-01 post-generation review?

A) Record exact commands, tool/runtime versions, elapsed time and peak memory for inventory, source/derivative counts and hashes, conversion outcomes, privacy/security checks, example/PBT results with seed behavior, bundle exclusion, and verified recovery steps
B) Report only that the files were generated
C) Defer all evidence collection to final Build and Test
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Execution Checklist

### Planning and Approval

- [x] Read all approved U-01 Functional Design artifacts, unit requirements, dependencies, and enabled extension rules.
- [x] Evaluate scalability, performance, availability, security, tech stack, reliability, maintainability, and usability.
- [x] Create thirteen context-specific questions with measurable recommended choices and mandatory Other options.
- [x] Receive answers to all thirteen NFR questions.
- [x] Analyze answers for ambiguity, contradictions, combined choices, undefined terms, and infeasible thresholds.
- [x] Complete ambiguity review; all Option A decisions are compatible and require no follow-up questions.
- [x] Obtain explicit approval of the completed NFR Requirements plan through the user's `approve all A` instruction.

### Requirements Generation

- [x] Generate `nfr-requirements.md` with measurable priorities, thresholds, acceptance methods, and traceability.
- [x] Generate `tech-stack-decisions.md` with selected technologies, rationale, constraints, alternatives, version policy, and PBT framework decision.
- [x] Validate both artifacts against approved answers, U-01 Functional Design, project NFRs, Security Baseline, and PBT-09.
- [x] Validate Markdown, tables, links, paths, and any diagrams with text alternatives.
- [x] Present completed NFR Requirements using the required two-option completion message.

## Required Artifacts

- [x] `aidlc-docs/construction/source-governance-safe-foundation/nfr-requirements/nfr-requirements.md`
- [x] `aidlc-docs/construction/source-governance-safe-foundation/nfr-requirements/tech-stack-decisions.md`

## Boundary

- Approval of this plan authorizes NFR documentation only.
- It does not authorize dependency installation/removal, source or asset mutation, resume copying, inventory/conversion execution, build changes, cleanup, deployment, or infrastructure changes.
- Infrastructure Design remains N/A for U-01.
