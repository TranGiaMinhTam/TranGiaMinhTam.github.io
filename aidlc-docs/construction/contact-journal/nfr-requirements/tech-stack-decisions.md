# U-07 Contact and Journal Technology Stack Decisions

## Decision Summary

U-07 remains inside the existing React, TypeScript, CSS Modules, Vite, Vitest, Testing Library, and native browser platform. No runtime or development dependency is added.

| Area | Decision | Rationale |
| --- | --- | --- |
| Language | Strict TypeScript | Encodes verified-source, normalized-draft, route, and failure partitions. |
| UI | React 19 | Existing shell and body registry already use React. |
| Form state | Controlled local React state | Draft remains in memory and is never persisted or submitted to the site. |
| Validation | Pure TypeScript functions plus native control semantics | Keeps exact behavior deterministic without a schema dependency. |
| Mailto encoding | `URLSearchParams` or equivalent native standards encoder | Avoids raw concatenation and encodes reserved characters. |
| Routing | Existing hash resolver and browser adapters | Preserves GitHub Pages delivery without a router package. |
| Lazy loading | `React.lazy` and `Suspense` with Vite dynamic import splitting | Produces a manifest-visible Journal chunk outside the initial request set. |
| Styling | Locally owned CSS Modules and semantic design tokens | Preserves theme, responsive, focus, and ownership boundaries. |
| Evidence | Existing manifest and shared EvidenceAction behavior | Reuses same-origin, on-demand publication controls. |
| Tests | Vitest and Testing Library | Existing deterministic unit, component, accessibility, and integration stack. |
| Build | Existing TypeScript project build and Vite production build | Supports manifest inspection, code splitting, and byte measurement. |
| Cleanup evidence | Existing shell commands and Node verification scripts | Supports exact imports, hashes, inventories, and recovery without new tooling. |

## Rejected Additions

| Technology | Decision | Reason |
| --- | --- | --- |
| Form framework | Rejected | Three fields and pure validation do not justify dependency or state complexity. |
| Schema validation package | Rejected | Exact rules are small, local, and testable in TypeScript. |
| Client router | Rejected | Existing constrained hash routing already satisfies static delivery. |
| Runtime Markdown renderer for U-07 | Rejected | The note is a verified typed projection; open-ended Markdown discovery is outside the security and integrity boundary. |
| Email API or SDK | Rejected | Would violate local-only privacy and require backend or secret management. |
| Hosted form service | Rejected | Would transmit visitor values to an unapproved service. |
| Analytics or telemetry | Rejected | Not required and prohibited for contact drafts and route behavior. |
| CMS or remote journal feed | Rejected | U-07 content is static, verified, and bounded. |
| Animation library | Rejected | No interaction needs it; native reduced-motion behavior is sufficient. |

## Typed Boundaries

The implementation must keep distinct types for:

- Raw and normalized contact drafts.
- Successful and failed draft validation.
- Verified contact selection and unavailable contact state.
- Canonical research-note descriptor and assembled view model.
- Article and not-found journal locations.
- Blocking and localized U-07 findings.

No component reads legacy contact or journal data directly. Presentation receives completed view models and explicit callbacks.

## Browser Platform Decisions

- Use ordinary `mailto:` navigation for the external email-client handoff.
- Use ordinary hash links for note discovery and Data Stories return.
- Use the existing location/hash adapter for subscriptions and normalization.
- Use programmatic focus only after an explicit route-state transition or invalid submission.
- Use native `label`, `input`, `textarea`, `button`, `a`, `article`, headings, lists, and status semantics.
- Use no storage adapter for Contact.

## Code-Splitting Decision

Contact remains part of the continuous portfolio entry because it is the final registered section body. Journal presentation is dynamically imported. Shared route descriptors and pure resolution logic may remain in the initial graph only when needed for discovery and route selection; heavy Journal presentation and its owned styles remain in the lazy graph.

The candidate measurement must distinguish:

1. Initial JavaScript and CSS reachable from the portfolio entry.
2. Journal-owned async JavaScript and CSS.
3. Existing evidence assets, which are emitted but not automatically initial requests.

## Security and Privacy Enforcement

Static verification scans Contact and Journal source for prohibited network, storage, unsafe markup, arbitrary import, and legacy-source patterns. Behavioral tests spy on location handoff while asserting that fetch, storage, and form submission adapters are never called.

The mailto builder accepts only a verified recipient and a successful normalized draft. Control characters are rejected from name and visitor email before encoding. The message may contain normalized line breaks only inside the encoded body.

## Cleanup Tooling Decision

Cleanup remains deferred to an explicitly approved Code Generation step. Before deletion, a generated inventory records exact paths, incoming references, SHA-256 hashes, file sizes, duplicate or alias findings, and recovery payload locations. Removal uses explicit targets only. No dependency, shell, broad glob, or recursive deletion is authorized by this technology decision.

## Verification Commands to Provide Later

The Code Generation plan must provide focused commands for:

- Contact selection, validation, encoding, component, privacy, and focus tests.
- Research-note assembly, exclusion, capacity, repeated-run, evidence, and route tests.
- Known, unknown, malformed, non-journal, loading, failure, and return states.
- Initial and lazy manifest measurement.
- Boundary, network/storage, former-owner, descriptor-equivalence, active registry, lockfile, and cleanup checks.
- Strict TypeScript, lint, complete repository tests, production build, and recovery verification.

## Extension Compliance

- Security Baseline: disabled; no extension rule loaded. Product-specific controls in the approved NFR requirements remain binding.
- Property-Based Testing: disabled; no extension rule loaded. Deterministic boundary and capacity fixtures remain binding.
