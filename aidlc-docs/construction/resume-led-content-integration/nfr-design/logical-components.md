# U-03 Logical Components - Resume-Led Content Integration

## Component Catalog

### ReviewedClaimSource

- **Responsibility**: Expose immutable, human-reviewed public claims and separate document-only review facts.
- **Inputs**: Approved normalized claim records.
- **Outputs**: Public claim set or schema findings.
- **Failure owner**: Claim admission gate.
- **Boundary**: Contains no raw extraction and supplies no private field to UI imports.

### ClaimAdmissionValidator

- **Responsibility**: Validate IDs, categories, pages, publication class, review state, required facts, and duplicate conditions.
- **Outputs**: Admitted claims or normalized blocking findings.
- **Performance**: One pass plus ID-set construction.

### ReconciliationEngine

- **Responsibility**: Build verified/evidence/provenance indexes and reconcile supported fact keys without whole-record replacement.
- **Outputs**: Reconciled claims with field authority or conflicts.
- **Failure owner**: Conflict/reference findings.
- **State**: Pure and immutable; deterministic under input permutation.

### CanonicalSectionMapper

- **Responsibility**: Apply the closed category map, require exactly one primary section, attach reference-only relationships, and order final groups.
- **Outputs**: Section mappings or completeness/duplicate findings.
- **Oracle**: Simple direct category lookup used by PBT.

### SectionViewModelProjector

- **Responsibility**: Produce frozen, render-ready groups with safe authority labels and evidence actions.
- **Boundary**: Cannot accept conflicted/document-only claims or create archive/viewer capabilities.

### ResumeIntegrityVerifier

- **Responsibility**: Verify local PDF kind, byte size, SHA-256, filename, and protected-source consistency.
- **Outputs**: Verified fact or safe integrity finding.
- **Failure owner**: Candidate readiness; no unsafe fallback.

### ResumeCapabilityFactory

- **Responsibility**: Create one immutable local download capability after integrity success.
- **Consumers**: Masthead adapter and Identity `ResumeAction`.
- **Invariant**: Both consumers receive the same object and exact semantics.

### PublicPrivacyVerifier

- **Responsibility**: Combine type/import boundaries with non-echoing scans of source, build output, DOM, metadata, fixtures, snapshots, logs, and evidence.
- **Inputs**: Ephemeral approved marker plus explicit scan roots.
- **Outputs**: Safe counts/codes/relative targets only.
- **Failure owner**: Composite activation gate.

### ResumeCompositionValidator

- **Responsibility**: Aggregate category, mapping, invention, conflict, authority, duplicate, reference, section-registry, and U-04/U-05 boundary invariants.
- **Outputs**: `ready` composition or sorted blocking findings; never partial models.

### IsolatedU03Candidate

- **Responsibility**: Compose ready U-03 models with approved U-01/U-02 contracts outside the active entry.
- **Boundary**: Cannot mutate active registries or load later-unit components.

### RenderCaseGenerator

- **Responsibility**: Generate canonical section/width/theme cases and focused accessibility variants with stable IDs/order.
- **Outputs**: Deterministic case manifest.

### LocalRenderedReviewAdapter

- **Responsibility**: Drive available local engines, collect DOM/action/overflow/CLS/request/keyboard observations, and capture only required screenshots.
- **Failure behavior**: Missing engine is `manual-pending`, never an automated pass.

### PerformanceEvidenceCollector

- **Responsibility**: Compare baseline/candidate manifest bytes, request graphs, delayed PDF loading, and CLS against dual budgets.
- **Outputs**: Canonical measurement JSON and blocking findings.

### PropertyTestHarness

- **Responsibility**: Run U03-P01 through U03-P10 using existing fast-check/Vitest, constrained generators, oracle comparisons, seeds, shrinking, and replay metadata.
- **Boundary**: Does not replace example/component tests.

### U03RecoveryController

- **Responsibility**: Capture targeted payload/absence states/hashes, rehearse isolated restoration, and verify recoverability without touching unrelated changes.
- **Objective**: Restore U-03 within 30 minutes.

### U03EvidenceWriter

- **Responsibility**: Normalize schema-versioned JSON and concise Markdown review output.
- **Boundary**: Safe repository-relative targets only; no private values or absolute paths.

### U03ActivationGate

- **Responsibility**: Require every automated/manual-review obligation and explicit candidate approval before the one-step promotion.
- **Failure behavior**: Retain active composition and return a non-zero result.

## Data and Control Flow

1. ReviewedClaimSource passes records to ClaimAdmissionValidator.
2. ReconciliationEngine joins admitted claims to indexed verified/evidence inputs.
3. CanonicalSectionMapper and SectionViewModelProjector create candidate models.
4. ResumeIntegrityVerifier and ResumeCapabilityFactory create the shared action.
5. ResumeCompositionValidator and PublicPrivacyVerifier determine candidate readiness.
6. IsolatedU03Candidate renders only ready models.
7. Rendered, performance, PBT, boundary, integrity, and recovery components write normalized evidence.
8. U03ActivationGate permits promotion only after all evidence and explicit approval agree.

## Ownership and Dependency Rules

- Resume-domain pure components may depend on shared model/archive types but not React domain presentation.
- Domain presentation may consume ready resume models but cannot import raw claims, document-only facts, privacy markers, or reconciliation internals.
- Shell components receive only the validated `MastheadResumeAction`; theme ownership remains unchanged.
- Evidence actions continue using existing safe capabilities. Archive loaders and media viewer modules are prohibited in U-03 composition.
- Verification and recovery scripts never enter the runtime bundle.

## Concurrency and State

No mutable business state or concurrent workflow is introduced. Build-time transformations are deterministic pure calls. Browser state remains the existing theme/navigation state; downloads are native. Candidate review may execute independent read-only checks in parallel, but the activation gate consumes completed immutable reports.

## Component-to-NFR Coverage

| NFRs | Primary logical components |
| --- | --- |
| U03-NFR-01 through 03 | ClaimAdmissionValidator, ReconciliationEngine, CanonicalSectionMapper, PropertyTestHarness |
| U03-NFR-04 through 08 | IsolatedU03Candidate, PerformanceEvidenceCollector, ResumeCapabilityFactory, LocalRenderedReviewAdapter |
| U03-NFR-09 through 13 | ResumeCompositionValidator, ResumeIntegrityVerifier, U03RecoveryController, U03ActivationGate |
| U03-NFR-14 through 17 | ReviewedClaimSource, PublicPrivacyVerifier, U03EvidenceWriter, boundary scans |
| U03-NFR-18 through 22 | SectionViewModelProjector, RenderCaseGenerator, LocalRenderedReviewAdapter, domain presentation |
| U03-NFR-23 through 27 | Resume-domain boundaries, PropertyTestHarness, U03EvidenceWriter, U03ActivationGate |

## Infrastructure N/A Record

Queues, caches, databases, circuit breakers, API gateways, load balancers, centralized logs, remote monitoring, and server failover do not address a U-03 requirement and would add unapproved cost, privacy, network, and failure surfaces. Static files, repository-local tools, and browser-native behavior are sufficient. Response-header and final supply-chain delivery components remain U-06-owned.

