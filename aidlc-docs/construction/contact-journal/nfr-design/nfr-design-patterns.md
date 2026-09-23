# U-07 Contact and Journal NFR Design Patterns

## Pattern 1 - Typed Failure Partition

U-07 separates failures by capability and recoverability:

| Failure | Typed result | Scope |
| --- | --- | --- |
| Invalid required contact source | Blocking contact selection | Contact body only |
| Invalid draft field | Ordered editable findings | Contact form only |
| Invalid required note source | Blocking note assembly | Discovery and valid note only |
| Missing optional evidence | Localized omission finding | One evidence action |
| Unknown valid slug | `not-found` location | Journal route |
| Lazy import failure | Route-local failure state | Journal presentation |
| Email-client handoff uncertainty | External limitation | No false success; draft retained |

Components do not catch and reinterpret source-integrity failures. Pure boundary functions return explicit discriminated unions before rendering.

## Pattern 2 - Retry Only a Plausibly Transient Failure

Immutable source, validation, descriptor, and route findings receive no timer, polling, or automatic retry. A lazy chunk failure exposes one user-operated retry control. The retry increments a bounded route-local attempt token so React receives a fresh lazy boundary. It never loops automatically, and the Data Stories return remains outside the failing subtree.

## Pattern 3 - Neutral Canonical Descriptor

An immutable `researchNoteCatalog` in the neutral portfolio model contains approved note identity only: slug, href, title, project id, source type, and order. It does not import Contact, Journal, or Research presentation code.

During assembly:

1. Validate descriptor uniqueness and route grammar.
2. Build one slug index and one project-id index.
3. Give Data Stories a discovery projection.
4. Give Journal a route and content projection.
5. Verify exact descriptor equivalence across both projections.

This supports linear catalog growth and prevents route-string drift.

## Pattern 4 - Indexed Linear Note Assembly

Project records, allocations, published evidence, and descriptors are indexed once. Each accepted descriptor is visited once to assemble its fixed ordered sections. Capacity evidence uses sixteen descriptors and 112 sections without changing production cardinality. Stable ordering uses approved order followed by identifier only where a tie is possible.

## Pattern 5 - Branded Contact Pipeline

The Contact pipeline has four explicit stages:

```text
RawContactDraft
  -> normalizeContactDraft
  -> validateContactDraft
  -> ValidContactDraft
  -> buildMailtoUrl(VerifiedRecipient, ValidContactDraft)
```

The diagram is a text-only sequence. Raw values are normalized, validated into a branded successful state, then passed with the locked verified recipient to the encoder. Invalid drafts cannot reach the mailto builder through the typed public interface.

The component receives a narrow `handoffMailto(url)` adapter. Tests replace only this adapter; they do not mutate real location or open an email client.

## Pattern 6 - Existing Hash Contract with Small Route Intent

A top-level route hook subscribes through the existing browser adapter and consumes the existing constrained hash resolver. It emits:

- `continuous` for non-journal locations.
- `journal-article` for an approved slug.
- `journal-not-found` for a valid unknown slug.

Malformed hashes remain owned by the established shell normalization path. U-07 adds no routing library, server path, or duplicate section route table.

## Pattern 7 - Route-Local Lazy Boundary

Journal presentation is loaded through `React.lazy` only after journal intent. `Suspense` provides a themed loading state. A route-local error boundary provides the failed state, manual retry, and Data Stories return. The return action is rendered outside the lazy child so it survives an import or render failure.

The loading, error, article, and not-found headings use stable focus targets. Route-entry focus occurs after mount and honors reduced-motion behavior.

## Pattern 8 - Shared Discovery and Route Projection

Data Stories discovery and Journal routing are two projections of one validated descriptor collection. A deterministic equivalence verifier compares slug, href, title, project id, source type, membership, and order. Any mismatch is P0 and prevents candidate eligibility.

## Pattern 9 - Manifest-Aware Budget Gate

The isolated candidate build uses the Vite manifest as a directed graph:

1. Start at the candidate entry.
2. Traverse static imports and their CSS to classify initial requests.
3. Identify the Journal dynamic import and its owned CSS.
4. Confirm the dynamic Journal files are absent from the initial closure.
5. Measure initial JavaScript, initial CSS, Journal JavaScript, Journal CSS, and evidence bytes separately.
6. Enforce 296,000, 51,200, 18,432, 6,144, and zero incremental evidence bytes respectively.

Any missing manifest edge, ambiguous ownership, initial/lazy overlap, or exceeded ceiling blocks activation.

## Pattern 10 - Separate Domain Ownership

`contact/` owns recipient selection, draft normalization, validation, mailto encoding, Contact presentation, and its local state. `journal/` owns note assembly, route location selection, lazy presentation, focus, and retry state. They share only the neutral descriptor, existing evidence capability, theme tokens, and browser-adapter contracts.

No generic mode-driven component combines Contact, article, not-found, and failure layouts.

## Pattern 11 - Machine-Readable Cleanup Gate

Cleanup begins with an inventory, not deletion. Each candidate target records:

- Exact path, file type, byte size, and SHA-256.
- Incoming references from active and test entry graphs.
- Duplicate or alias relationships.
- Whether it contains uniquely approved content.
- Proposed disposition and rationale.
- Recovery payload path and restoration command.

Only explicitly approved targets with zero required references and no unique approved content can be removed. Recovery is verified before any deletion. Ambiguous targets remain.

## Pattern 12 - Layered Candidate and Guarded Activation

The candidate composes all ten section bodies plus the lazy Journal path without changing live `src/App.tsx`. Gates run in layers:

1. Pure selectors, validators, encoders, assemblers, and route resolution.
2. Contact components, focus, privacy, and handoff adapter.
3. Journal loading, failure, article, not-found, focus, and return.
4. Descriptor equivalence, capacity, repeated-run, content exclusion, and security scans.
5. Candidate boundaries, manifest topology, byte budgets, evidence inventory, and full regression.
6. Rendered width, theme, error, zoom, text-spacing, keyboard, and overflow review.

After explicit approval, one guarded activation updates the Contact body registration and top-level route seam together. Exact pre-switch content supports restoration if a current P0 check fails.

## Pattern 13 - Static Observability

There is no queue, cache, circuit breaker, database, mail service, remote log, analytics, or monitoring agent. Observability consists of typed local findings, test output, static scans, build manifests, byte reports, cleanup inventories, content hashes, rendered observations, candidate decisions, and recovery artifacts.

## NFR Coverage

| Pattern | NFR coverage |
| --- | --- |
| Typed failure partition and retry policy | U07-NFR-REL-001 through REL-003, COM-001 |
| Neutral descriptor and indexed assembly | U07-NFR-SCL-001, MAI-001 |
| Branded Contact pipeline | U07-NFR-SEC-001, SCL-002, ACC-001 |
| Hash intent and lazy boundary | U07-NFR-COM-002, REL-001, ACC-002 |
| Projection equivalence | U07-NFR-MAI-001, SEC-002 |
| Manifest budget gate | U07-NFR-PER-001 through PER-004 |
| Separate ownership | U07-NFR-MAI-001, RSP-002 |
| Cleanup inventory | U07-NFR-MAI-002, REL-003 |
| Candidate activation and static observability | All P0/P1 acceptance families |

## Extension Compliance

- Security Baseline: disabled; the approved U-07 privacy, encoding, route, content, and cleanup patterns remain mandatory product design.
- Property-Based Testing: disabled; deterministic boundary, capacity, repeatability, routing, and encoding fixtures remain mandatory.
