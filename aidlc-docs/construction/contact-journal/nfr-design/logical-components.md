# U-07 Contact and Journal Logical Components

## Logical Topology

```text
VerifiedPortfolioSource       ResearchNoteCatalog       EvidenceManifest
          |                           |                        |
          v                           v                        v
 ContactSelector          ResearchNoteAssembler <--- EvidenceResolver
          |                           |
          v                           v
  ContactViewModel          ResearchNoteIndex
          |                           |
          v                           v
 ContactSignal             JournalLocationResolver
          |                           |
   ContactValidator                  v
          |                 PortfolioRouteController
  MailtoUrlBuilder                    |
          |                    LazyJournalBoundary
  MailtoHandoffAdapter          /             \
                         ResearchNotePage   JournalNotFound

Build/Test boundary:
CandidateComposer -> ManifestClassifier -> BudgetGate
CleanupInventory -> RecoveryVerifier -> ApprovedCleanupExecutor
```

The diagram is a text-only component topology. Verified data feeds separate Contact and note pipelines. Route intent controls a lazy Journal boundary. Build/test components classify the candidate and gate cleanup and activation.

## Shared Model Components

### `ResearchNoteCatalog`

- Owns immutable note descriptors only.
- Validates slug grammar, href derivation, title, project id, source type, order, and uniqueness.
- Exposes descriptor arrays and indexes without presentation imports.

### `ResearchNoteProjectionVerifier`

- Compares Data Stories and Journal projections from the accepted descriptors.
- Requires exact membership, order, slug, href, title, project id, and source type.
- Produces a blocking finding on any drift.

## Contact Domain Components

### `ContactSelector`

- Selects exactly one verified Contact record.
- Confirms summary/email fact equivalence and recipient shape.
- Produces `ContactViewModel` or blocking findings.

### `ContactDraftNormalizer`

- Trims name and email.
- Normalizes message line endings and outer whitespace.
- Rejects forbidden control characters from name and email before validation success.

### `ContactValidator`

- Enforces the exact 100, 254, and 5,000 limits and conservative email shape.
- Emits stable findings in name, email, message order.
- Produces a branded `ValidContactDraft` only on success.

### `MailtoUrlBuilder`

- Accepts `VerifiedRecipient` and `ValidContactDraft` only.
- Applies the fixed subject and labeled body format.
- Encodes query parameters through the native encoder.
- Has no browser side effect.

### `MailtoHandoffAdapter`

- Has one method that hands an approved mailto URL to the current browser context.
- Returns no delivery success signal.
- Is replaced by a spy in tests.

### `ContactSignal`

- Owns raw draft and current validation findings only.
- Renders protocol, privacy, form, summary, field errors, submit, and direct fallback.
- Focuses the first invalid control through stable refs.
- Never invokes storage or network adapters.

## Journal Domain Components

### `ResearchNoteAssembler`

- Indexes verified projects, allocations, evidence, and descriptors.
- Requires the exact SIM-LSE project and Team-led contribution.
- Produces seven ordered fact-only sections.
- Emits localized findings for missing optional evidence and blocking findings for required source failure.

### `ResearchNoteIndex`

- Stores accepted notes by slug after assembly.
- Supports stable route lookup and capacity fixtures.
- Exposes an immutable initial one-note collection.

### `JournalLocationResolver`

- Accepts only journal-namespace hashes already validated by the shell contract.
- Returns article or not-found.
- Returns no continuous state; the top-level controller owns that decision.

### `PortfolioRouteController`

- Subscribes through existing browser adapters.
- Maps the existing resolver output to continuous, article, or not-found intent.
- Keeps malformed normalization in the existing shell path.
- Introduces no server or third-party router.

### `LazyJournalBoundary`

- Instantiates the lazy Journal module only for journal intent.
- Owns `Suspense`, route-local error capture, bounded manual retry token, and route-entry focus coordination.
- Keeps a Data Stories return outside the lazy subtree.

### `JournalRoute`

- Selects `ResearchNotePage` or `JournalNotFound` from the resolved location.
- Does not parse legacy Markdown or fetch content.

### `ResearchNotePage`

- Renders the canonical title, provenance, contribution, seven semantic sections, on-demand evidence actions, and return path.
- Owns no content transformation.

### `JournalNotFound`

- Renders the attempted slug as safe text.
- Exposes a stable heading and Data Stories return.

## Candidate and Verification Components

### `U07CandidateComposer`

- Composes the approved nine active bodies with Contact for ten total bodies.
- Includes the shared descriptor and lazy Journal route without changing the live entry.
- Supplies production-equivalent theme and hash adapters.

### `ManifestClassifier`

- Traverses static imports from the candidate entry.
- Records initial JavaScript/CSS and initial request paths.
- Locates the Journal dynamic import and owned CSS.
- Rejects initial/lazy overlap and ambiguous route ownership.

### `BudgetGate`

- Enforces initial JavaScript, initial CSS, Journal JavaScript, Journal CSS, JavaScript growth, and zero evidence growth.
- Records exact and gzip bytes without substituting gzip values for approved raw ceilings.

### `StaticPrivacySecurityVerifier`

- Rejects network, storage, analytics, form-action, unsafe markup, unsafe scheme, arbitrary import, runtime Markdown, and legacy-claim reachability patterns.
- Verifies recipient locking and descriptor grammar.

### `CleanupInventory`

- Produces machine-readable exact target metadata and dispositions.
- Performs incoming-reference, duplicate/alias, and unique-content checks.
- Does not delete.

### `RecoveryVerifier`

- Confirms cleanup and activation recovery payload hashes, members, and restoration instructions before any mutation.
- Verifies the active App, body registry, hash seams, dependency declarations, and lockfile against preflight.

### `ApprovedCleanupExecutor`

- Accepts only targets explicitly named by the approved Code Generation plan and marked eligible by the inventory.
- Uses explicit paths and recoverable operations.
- Stops on reference drift, hash drift, or missing recovery evidence.

### `ActivationGuard`

- Requires passing model, component, route, privacy, security, capacity, equivalence, manifest, budget, cleanup, recovery, full regression, and rendered-review gates.
- Applies the Contact registry and route seam together only after explicit approval.
- Restores exact pre-switch seams on a current-state P0 acceptance failure.

## State Ownership

| State | Owner | Persistence |
| --- | --- | --- |
| Raw Contact draft | `ContactSignal` | Memory only |
| Contact findings | `ContactSignal` | Memory only |
| Current hash intent | `PortfolioRouteController` | Browser hash only |
| Lazy retry token | `LazyJournalBoundary` | Memory only, bounded user action |
| Theme | Existing shell theme controller | Existing approved mechanism |
| Note descriptors and content | Immutable build-time modules | Static bundle |

## Interfaces

```ts
type MailtoHandoff = (url: `mailto:${string}`) => void

type PortfolioRouteIntent =
  | Readonly<{ kind: 'continuous' }>
  | Readonly<{ kind: 'journal'; location: JournalLocation }>

type ManifestBudgetResult = Readonly<{
  initialJavaScriptBytes: number
  initialCssBytes: number
  journalJavaScriptBytes: number
  journalCssBytes: number
  evidenceDeltaBytes: number
  findings: readonly U07GateFinding[]
}>
```

These interfaces remain browser- and build-tool-adjacent without exposing those details to content components.

## Infrastructure Applicability

Queues, caches, circuit breakers, databases, hosted forms, email providers, CMS services, remote logging, monitoring agents, analytics, and deployment changes are not applicable. The logical components are compile-time, build-time, or browser-local within the existing static deployment.

## Traceability

| Logical components | Primary NFRs |
| --- | --- |
| Contact selector, normalizer, validator, builder, adapter | SCL-002, SEC-001, COM-001, ACC-001 |
| Catalog, assembler, note index, projection verifier | SCL-001, SEC-002 through SEC-003, MAI-001 |
| Route controller, location resolver, lazy boundary | PER-002, COM-002, REL-001 through REL-002, ACC-002 |
| Candidate, classifier, budget gate | PER-001 through PER-004, RSP-001 |
| Cleanup inventory, recovery verifier, executor | MAI-002, REL-003 |
| Activation guard | All P0 acceptance requirements |

## Extension Compliance

- Security Baseline: disabled; the approved static privacy and security components remain mandatory.
- Property-Based Testing: disabled; deterministic boundary and capacity fixtures remain mandatory.
