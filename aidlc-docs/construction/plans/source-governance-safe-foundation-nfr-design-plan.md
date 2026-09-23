# NFR Design Plan: U-01 Source Governance and Safe Foundation

> **Status: Questions awaiting answers. No implementation or environment mutation is authorized.**

## Purpose

Translate the approved U-01 quality thresholds and technology choices into concrete logical patterns and components for bounded local processing, deterministic catalogs, safe recovery, derivative isolation, privacy/security enforcement, property testing, and review evidence.

## Design Context

- U-01 must support at least 500 files and 1 GiB without architecture change.
- Current approximately 293 MB inventory/catalog work targets 60 seconds and 512 MiB peak memory on the Node 20 reference environment.
- Conversion is limited to two concurrent jobs, no more than 120 seconds per item, and a 15-minute current-archive target.
- Originals are immutable and mutation targets must be restorable within 30 minutes.
- Generated canonical text is byte-deterministic; run timestamps belong in separate evidence.
- Unsafe sources, privacy leakage, integrity mismatch, and path escape fail closed.
- `fast-check` with Vitest is selected but not yet installed.
- U-01 adds no runtime infrastructure or visible UI.

## Category Assessment

| Category | Applicability | Reason |
| --- | --- | --- |
| Resilience patterns | Applicable | File/tool failures need safe outcomes, partial-output cleanup, and no unsafe partial activation. |
| Scalability patterns | Applicable | Streaming, bounded queues, immutable indexing, and deterministic linear passes support 500 files/1 GiB. |
| Performance patterns | Applicable | Hashing, conversion concurrency/timeouts, manifest generation, and bundle isolation require concrete controls. |
| Security patterns | Applicable | Root scoping, URL allowlists, safe subprocess execution, non-echoing privacy, and integrity gates are blocking. |
| Logical components | Applicable | Adapters, pure transformations, validators, gates, reporters, and PBT harnesses need explicit ownership/dependencies. |

## Questions

Please answer each question by placing the selected letter after its `[Answer]:` tag. The recommended choice is listed first.

## Question 1 - Resilient Pipeline

How should the U-01 processing pipeline isolate failures?

A) Use typed results through staged phases; deterministic local validation has no retry, converter timeouts/failures become explicit unavailable outcomes, unexpected exceptions reach one safe top-level handler, and no public output is promoted while blocking findings exist
B) Retry every filesystem, validation, and converter operation three times automatically
C) Write partial public outputs as each file completes and repair them later
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 2 - Recovery Pattern

How should recoverability be designed before implementation writes?

A) Use an inventory-first preflight containing revision/diff integrity, untracked hashes, planned targets, protected sources, and explicit restoration steps; rehearse restoration in an isolated target before marking the boundary verified
B) Create one compressed workspace archive without reconciling its contents
C) Depend on the current Git branch and editor undo
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 3 - Streaming and Bounded Work

How should the design meet archive growth and memory requirements?

A) Stream file hashes, process deterministic sorted inputs through bounded work queues, cap conversion at two jobs, keep only compact facts in memory, and avoid caching raw file bytes
B) Read the complete archive into memory before hashing
C) Add a database/cache server to hold intermediate file contents
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 4 - Deterministic Promotion

How should generated manifests and derivatives become approved outputs?

A) Write to a plan-managed staging area, validate hashes/types/schema/privacy and deterministic content, then atomically promote only complete approved outputs; clean or quarantine partial staging artifacts on failure
B) Write directly over active generated outputs as each step runs
C) Keep every partial output and let later units choose which files are valid
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 5 - Canonicalization Architecture

How should catalog transformations be decomposed for performance and testability?

A) Use pure normalize → exact-hash index → reviewed-alias resolution → metadata join → capability projection passes, each returning immutable values/findings and feeding one deterministic aggregator
B) Use one stateful class that scans files, mutates records, converts assets, and writes UI modules in a single pass
C) Let each later UI component perform its own grouping and validation
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 6 - Security Boundary Pattern

How should path, URL, subprocess, and privacy controls combine?

A) Use defense in depth: root-scoped path capabilities, a central media-source allowlist, explicit executable/argument arrays without shell interpolation, local-only adapters, non-echoing privacy scans, hash integrity, and a final fail-closed emission gate
B) Rely only on TypeScript types and trust generated strings at runtime
C) Add authentication around the static portfolio instead of validating sources
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 7 - Converter Adapter Pattern

How should platform-dependent converters integrate?

A) Define one adapter interface with capability probe, version report, supported purposes, bounded execution, validated output, cleanup, and typed unavailable outcomes; select adapters explicitly without changing catalog semantics
B) Hardcode one maintainer-specific command directly into catalog logic
C) Load converter code dynamically in the visitor browser
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 8 - Privacy Scanner Input

How should the sensitive phone marker enter privacy verification?

A) Supply it through a non-committed, non-echoing local verification input; scan approved text-bearing boundaries, exclude only the verified resume PDF bytes, and report safe codes/targets without printing the value
B) Commit the phone number into a test fixture so CI can scan it
C) Derive the marker from rendered page text after deployment
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 9 - Property-Test Harness

How should PBT be structured in the logical design?

A) Centralize domain arbitraries and seed/replay configuration, keep pure properties beside the owning transformations, keep example regressions separate, and expose a focused command that CI can run without silent retry
B) Put random input generation inside each individual test with no shared constraints
C) Run PBT only manually and omit it from CI evidence
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 10 - Evidence and Observability

How should local/CI evidence be collected without adding runtime monitoring?

A) Use event-free deterministic result objects and a review-evidence collector that records commands, versions, timing, peak memory, counts, hashes, findings, fallbacks, seeds, bundle exclusion, and recovery results into machine-readable JSON plus Markdown
B) Add a production telemetry SDK and send converter/inventory events to an external service
C) Keep only terminal screenshots with no structured data
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 11 - Runtime Logical Infrastructure

Which infrastructure-like components should U-01 add?

A) None at runtime; use local adapters, pure modules, bounded workers, validators, and build/test gates only—no queue server, cache, database, API, circuit breaker, monitoring agent, or browser service worker
B) Add a local database and persistent job queue
C) Add a serverless conversion API and CDN cache
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Execution Checklist

### Planning and Approval

- [x] Read the approved U-01 NFR requirements, technology decisions, Functional Design, and enabled extension rules.
- [x] Evaluate resilience, scalability, performance, security, and logical-component categories.
- [x] Create eleven context-specific pattern/component questions with recommended choices and mandatory Other options.
- [x] Receive answers to all eleven NFR Design questions.
- [x] Analyze answers for ambiguity, contradictions, combined choices, and undefined implementation rules.
- [x] Add and resolve follow-up questions if any ambiguity remains; none were required because all recommended choices are mutually consistent.
- [x] Obtain explicit approval of the completed NFR Design plan.

### Design Generation

- [x] Generate `nfr-design-patterns.md` with resilience, scalability, performance, security/privacy, reliability, maintainability, compatibility, PBT, and evidence patterns.
- [x] Generate `logical-components.md` with responsibilities, inputs, outputs, dependencies, failure behavior, execution boundaries, and validated diagrams/text alternatives.
- [x] Validate both artifacts against all forty U-01 NFRs, technology decisions, Functional Design rules, Security Baseline, PBT obligations, and unit boundaries.
- [x] Validate Markdown, Mermaid syntax, tables, links, paths, and text alternatives.
- [x] Present completed NFR Design using the required two-option completion message.

## Required Artifacts

- [x] `aidlc-docs/construction/source-governance-safe-foundation/nfr-design/nfr-design-patterns.md`
- [x] `aidlc-docs/construction/source-governance-safe-foundation/nfr-design/logical-components.md`

## Boundary

- Approval authorizes NFR Design documentation only.
- It does not authorize dependency changes, preflight capture, source/asset writes, hashing/conversion execution, generated output promotion, build mutation, cleanup, deployment, or infrastructure changes.
- Infrastructure Design is N/A for U-01; after NFR Design approval, the next stage is Code Generation Part 1 planning.
