# U-03 NFR Design Patterns - Resume-Led Content Integration

## Design Boundary

U-03 uses repository-local pure modules, static assets, isolated candidate output, verification scripts, and evidence files. It introduces no database, queue, cache, API, circuit breaker, remote logger, background worker, service worker, or server process. Resume text remains reviewed content, never executable instruction.

## Pattern 1 - Isolated Candidate and Atomic Promotion

The active entry and registries remain hash-protected while a separate candidate composes U-01 source contracts, U-02 shell contracts, and proposed U-03 models. Candidate artifacts are built and reviewed without changing the active composition. Promotion is one small reversible composition/registry change after every automated gate and explicit rendered approval.

Failure behavior: any blocker retains the last verified active composition. No per-section or partial activation is permitted.

Supports U03-NFR-12, 13, 27 and SECURITY-15.

## Pattern 2 - Staged Fail-Closed Admission

The pure pipeline executes in this order: schema admission, publication-class filtering, ID/reference validation, field-level reconciliation, closed category mapping, deterministic projection, composition validation, and candidate readiness. Every stage returns a discriminated `ready` or `blocked` result with normalized stable findings.

Expected content errors do not throw, retry, or leak source values. A blocked stage exposes no partial view model to React.

Supports U03-NFR-09, 10, 12, 15, 16 and SECURITY-09/11/15.

## Pattern 3 - Indexed Linear Reconciliation

Immutable maps are built once for claim IDs, verified records, evidence IDs, and provenance IDs. Reconciliation visits each admitted claim and only its explicit references. Category selection is a constant-time closed-map lookup. Sorting occurs only after projection, per bounded group, by explicit order and stable ID.

Capacity gates exercise at least 250 claims and 500 references. Growth above the threshold produces measurement/review, not an implicit backend.

Supports U03-NFR-01 through 03 and PBT-03/04/05/07/08.

## Pattern 4 - Prevalidated Immutable Runtime Models

Reconciliation and validation complete before candidate composition. The browser receives frozen ready view models and performs ordinary React rendering only. No runtime PDF parsing, content reconciliation, fetch, worker, cache, or remote source is introduced. This keeps initial work bounded and makes content correctness independent of browser timing.

Supports U03-NFR-04 through 08, 17, 23 through 25.

## Pattern 5 - Privacy by Construction plus Independent Scan

Admission separates public claims from document-only facts. Public projection accepts only the public type, so private fields cannot be selected accidentally. Compile/source boundaries prohibit private-field imports in UI domains. A separate non-echoing marker scan covers source, build output, DOM, metadata, fixtures, snapshots, logs, and evidence; the only permitted match is inside approved PDF bytes.

The scanner reports safe codes, counts, and relative targets without echoing the marker. Any match outside the PDF blocks readiness and evidence publication.

Supports U03-NFR-14 through 17 and SECURITY-09/11/13/15.

## Pattern 6 - Single Verified Resume Capability

The bundled PDF is checked against the U-03-approved 113,775-byte size and SHA-256 `8de5fc42ca8c443a7dcad6daa2766d7cd5f3a596369a463e54a74b101ec49282` before capability creation. One frozen local capability supplies href, title, label semantics, and `Tran-Gia-Minh-Tam-Resume.pdf` to masthead and Identity consumers. Identity equality and exact field assertions prevent drift; the prior protected version remains recoverable.

Native anchors provide interaction and fallback; there is no JavaScript loading state, fetch, reconstruction, analytics, or filesystem fallback. The PDF must not appear in the initial request graph.

Supports U03-NFR-06, 07, 11, 17, 18, 21, 22 and SECURITY-13.

## Pattern 7 - CSS-First Accessible Content

One semantic DOM serves both themes and every viewport. Domain CSS Modules own visual layout while consuming U-02 tokens and logical properties. Native headings, lists/articles, links, and anchors establish semantics. Authority is conveyed through text, not color alone. Base readable styles precede optional enhancements.

The canonical matrix covers all ten sections, four widths, two themes, plus focused keyboard, zoom, text-spacing, reduced-motion, and forced-colors variants. Unavailable engines remain manual-pending rather than being reported as automated passes.

Supports U03-NFR-18 through 22.

## Pattern 8 - Exact Baseline and Candidate Measurement

Before mutation, the verifier records the U-02 production manifest: 297,057 JavaScript bytes, 50,665 CSS bytes, and three initial requests. Candidate measurement compares exact manifest members, both absolute and percentage limits, request graph, delayed PDF acquisition, and CLS. Either side of a dual limit may block promotion.

Budget gates: JavaScript no more than 320 KiB and 8 percent growth; CSS no more than 60 KiB and 12 percent growth; three initial requests; CLS no more than 0.1.

Supports U03-NFR-04 through 08 and 27.

## Pattern 9 - Schema-Versioned Evidence

Machine evidence is canonical JSON with schema version, normalized ordering, safe relative targets, hashes, counts, measurements, findings, engine status, and gate decisions. Timestamps are separated from deterministic payload where comparison requires stability. A concise Markdown summary provides human review. Blocking gates exit non-zero.

Supports U03-NFR-09 through 17, 21, 26, 27.

## Pattern 10 - Targeted Recovery Without Worktree Reset

Before mutation, recovery captures target existence, content, hash, active composition and registry facts, protected source/resume facts, and planned absence states. Restoration is rehearsed into an isolated temporary target, then verified at candidate and activation gates. Recovery touches only U-03 targets and never resets unrelated user work.

Supports U03-NFR-12, 13, 27 and SECURITY-13/15.

## Pattern 11 - Layered Test Strategy

Strict TypeScript, ESLint, source/boundary/style checks, example/component tests, full regression tests, fast-check properties, integrity/privacy verification, production build measurement, and rendered review are independent layers. U03-P01 through U03-P10 run at least 100 cases with shrinking, fixed or logged seed/replay, no silent retry, constrained domain generators, and simple reference oracles. Critical stories and failure paths retain explicit examples.

Supports U03-NFR-01 through 03, 09 through 27 and PBT-01/03/04/05/07/08/09/10. PBT-02 is N/A because there is no inverse pair; PBT-06 is N/A because the business core is immutable and stateless.

## Pattern 12 - Composite Activation Gate

Promotion requires unanimous success from source/resume integrity, recovery, claim/category/reference coverage, conflict/privacy checks, focused examples, U03-P01 through U03-P10, strict type/lint/full tests, boundaries, accessibility, rendered matrix, exact bundle/request/CLS budgets, honest browser status, `git diff --check`, and explicit candidate approval.

The gate has no warning-based bypass for blocking requirements.

## Security and PBT Compliance

- SECURITY-09, 10, 11, 13, and 15 are addressed by Patterns 1-12; SECURITY-10 remains an inherited no-dependency/supply-chain boundary with final U-06 evidence.
- SECURITY-04 remains assigned to U-06. SECURITY-01 through 03, 05 through 08, 12, and 14 are N/A to this static unit.
- PBT-01, 03 through 05, and 07 through 10 are incorporated in Patterns 3, 9, 11, and 12.
- PBT-02 and PBT-06 are N/A for the approved design.

No blocking Security Baseline or PBT design finding remains.
