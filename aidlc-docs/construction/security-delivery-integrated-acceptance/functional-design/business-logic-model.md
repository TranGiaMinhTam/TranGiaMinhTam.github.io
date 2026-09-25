# Business Logic Model - U-06 Security, Delivery, and Integrated Acceptance

## Purpose

U-06 converts the approved U-01 through U-05 outputs into one auditable release decision. It verifies the portfolio, delivery configuration, dependencies, CI workflow, response-header capability, recovery package, and test evidence without deploying or changing hosting.

## Inputs

- Approved functional requirements FR-001 through FR-038 and their owning-unit evidence.
- Approved NFR-001 through NFR-020, PBT-R01 through PBT-R10, and SEC-R01 through SEC-R08.
- Active application source, lockfile, Vite configuration, generated manifests, screenshots, and recovery packages.
- Current GitHub Pages workflow and the built candidate output.
- Header observations from an explicitly identified candidate or current public endpoint.

## Integrated Acceptance Flow

1. **Capture baseline**: Record governed file hashes, absence states, dependency metadata, workflow definitions, active composition, and existing evidence paths.
2. **Build isolated candidate**: Produce a deterministic candidate without changing the active application or deploying it.
3. **Execute check registry**: Run typed checks for behavior, accessibility, privacy, source integrity, archive coverage, viewer safety, property tests, bundle/request budgets, dependencies, SBOM, CI integrity, response headers, and recovery.
4. **Normalize results**: Convert every check result into one terminal requirement status: `pass`, `fail`, or `not-applicable`. A not-applicable status must include a boundary-based rationale.
5. **Classify findings**: Attach requirement identifiers, severity, evidence locators, remediation, and visitor/release impact without exposing secrets or absolute local paths.
6. **Aggregate decision**: Apply the fail-closed decision model. Any applicable blocking finding yields `blocked`; only a complete evidence set with no blocking finding yields `candidate-ready`.
7. **Assess host capability**: Compare observed HTTP headers with the required contract. Missing GitHub Pages headers remain failures; HTML meta tags cannot satisfy response-header requirements.
8. **Rehearse recovery**: Restore the captured baseline into an isolated location, verify hashes and absence states, and confirm canonical source originals are unchanged.
9. **Present activation gate**: If and only if the candidate is ready, present a separate two-option activation decision. Approval may authorize a reversible active-code promotion, but never deployment or hosting migration.
10. **Repeat active verification**: After any approved active promotion, repeat every applicable check and recovery verification before producing the final release report.

## Release Decision Model

The decision aggregator receives the complete expected requirement set and normalized results. It rejects duplicate requirement identifiers, missing results, invalid statuses, pass results without evidence, and not-applicable results without rationale.

- `blocked`: At least one applicable blocking finding exists, evidence is incomplete, recovery fails, or a required check cannot execute honestly.
- `candidate-ready`: Every expected requirement has exactly one terminal status, every applicable check passes, all N/A rationales are valid, and recovery succeeds.
- `active-verified`: A separately approved active promotion has passed the same integrated gate.
- `deploy-not-authorized`: The default delivery outcome for U-06. This remains true even when the candidate or active build passes.

## Header Capability Assessment

The header verifier records the endpoint, timestamp, redirect chain, final HTTPS URL, and observed values for:

- `Content-Security-Policy`
- `Strict-Transport-Security`
- `X-Content-Type-Options`
- `X-Frame-Options`
- `Referrer-Policy`

Each header receives `pass`, `fail`, or `not-observed`. Missing or insufficient values are never inferred from HTML markup. If GitHub Pages cannot meet the contract, the report records the limitation and describes a compliant hosting or edge alternative for a later explicit decision.

## Supply-Chain Assessment

The supply-chain evaluator produces evidence for lockfile integrity, exact resolved dependency sources, vulnerability results, direct and transitive inventory, unused-dependency review, machine-readable SBOM generation, runtime/tooling support status, and CI action pinning. A flagged dependency is classified before remediation; removal or replacement occurs only through an approved Code Generation plan and must preserve lockfile and regression evidence.

## CI Integrity Assessment

Third-party GitHub Actions must be pinned to immutable commit SHAs. Workflow permissions must be explicit and least privilege. Installation must use the lockfile, verification commands must be deterministic, and produced evidence must be retained or reproducible. Mutable major-version tags are blocking until replaced through the approved plan.

## Recovery Model

Recovery evidence contains the governed pre-unit files, hashes, absence states, dependency/lockfile hashes, generated-evidence paths, and restoration instructions. The rehearsal occurs outside the workspace, compares every restored state to the baseline, and never deletes or overwrites canonical source originals.

## Testable Properties

| Component | Category | Property | Later verification |
| --- | --- | --- | --- |
| Requirement result normalizer | Invariant | The complete expected requirement set is preserved and each identifier has exactly one terminal status. | Domain generators with duplicates, omissions, and valid results. |
| Decision aggregator | Oracle | The implementation matches a simple reference rule: any applicable blocker means `blocked`; otherwise a complete valid set means `candidate-ready`. | Generated evidence bundles compared with the reference model. |
| Independent check aggregation | Commutativity | Permuting independent check results does not change the release decision or sorted finding set. | Generated permutations. |
| Evidence report builder | Idempotence | Rebuilding a report from an unchanged normalized bundle produces an equivalent report. | Apply the builder twice to generated valid bundles. |
| Recovery manifest codec | Round trip | Serialize then parse preserves governed paths, hashes, and absence states. | Reusable recovery-entry generators. |
| Fail-closed evaluator | Easy verification | Any valid generated sequence containing at least one applicable blocking failure produces `blocked`. | Generated command/result sequences with an injected blocker. |
| Header evaluator | Invariant | An absent required header can never produce `pass`; HTML meta values do not alter response-header status. | Generated header maps and document metadata. |
| Finding ordering | Invariant | Sorting preserves finding membership and yields stable requirement/severity/code order. | Generated finding collections. |

No additional inverse, recursive, or mutable business component is introduced at this design stage. Stateful candidate activation will retain concrete state-machine examples; if Code Generation adds a pure activation reducer, PBT-06 becomes applicable and must compare generated event sequences with a reference state.

## Failure Handling

- Tool, network, browser, audit, or build failure produces a typed blocking result rather than a guessed pass.
- Visitor-facing application checks retain generic failure text; internal reports may name requirement IDs and repository-relative files but never secrets or absolute user paths.
- Partial evidence cannot be promoted to a positive decision.
- Cleanup uses bounded processes and `finally` behavior so local preview servers and browser profiles do not remain active after verification.

## Explicit Exclusions

- No deployment, DNS change, hosting migration, production publication, monitoring service, backend, database, authentication, analytics, or remote contact service.
- No dependency removal, CI mutation, or active application promotion before its later approved plan and activation gate.
