# Tech Stack Decisions - U-05 PDF and Image Detail Viewers

## Decision Summary

U-05 remains inside the existing static React/Vite application and adds no viewer, modal, PDF-rendering, network, persistence, analytics, or conversion dependency. Every decision preserves interaction-level loading, the central media-source boundary, and the established verification toolchain.

## Runtime Decisions

| Concern | Decision | Rationale |
| --- | --- | --- |
| Application framework | React 19 through the existing application shell | Preserves current composition and typed callback seams without a parallel UI runtime. |
| Language | TypeScript 5.9 with strict project checks | Typed capabilities, events, reducer states, and discriminated failures make invalid viewer states harder to represent. |
| Build and code splitting | Vite 7 dynamic imports | Viewer bodies and archive groups can remain independently interaction-loaded with build-manifest evidence. |
| Styling | Existing CSS modules and shared portfolio tokens | Enforces common margins, clamped geometry, safe-area insets, themes, target sizes, and reduced-motion behavior without a new styling layer. |
| Modal primitive | Native `<dialog>` controlled by one React host | Supplies browser modal semantics while retaining explicit focus, inertness, scroll-lock, cleanup, and fallback verification. |
| PDF rendering | Browser-native same-origin PDF viewer after explicit activation | Avoids a heavy canvas renderer; Download and Open-in-new-tab remain available when embedding is unsupported or over the 64 MiB embed limit. |
| Image rendering | Native `<img>` with declared dimensions | Supports lazy previews, centered card cropping, and uncropped `contain` detail without runtime transformation. |
| Source admission | Existing central media-source policy | Allows bundled and explicitly approved HTTPS media while rejecting unsafe schemes and unowned sources before dialog state changes. |
| State management | Pure typed reducer plus one effect controller | Separates deterministic state transitions from DOM focus, inertness, scroll-lock, listeners, and cleanup. No global state library is required. |
| Availability | Existing static host | No proxy or viewer service is added; failures remain local to the current media body. |

## Loading and Budget Decisions

- The shared host shell may be part of the application shell only when it remains minimal.
- PDF and image bodies use separate dynamic imports and load only after explicit visitor activation.
- Full PDFs and original images are never prefetched by cards, summaries, or section entry.
- Existing approved ceilings remain unchanged: 327,680 raw JavaScript bytes, 61,440 raw CSS bytes, and three initial requests.
- Each viewer JavaScript chunk is limited to 65,536 raw bytes.
- PDFs at or below 64 MiB and images at or below 16 MiB may be embedded after interaction; larger approved media uses metadata plus safe Download/Open actions.
- Every preview declares intrinsic dimensions or an aspect ratio to limit layout shift.

## Accessibility Decisions

- The host uses `showModal()` when native dialog behavior is available.
- Every state has an accessible title and description; Close is always visible.
- Focus containment and exact trigger restoration are explicit controller responsibilities and are not assumed solely from browser defaults.
- Background inertness and scroll locking are set and removed through one cleanup path.
- All controls meet the 44-by-44 CSS-pixel minimum.
- Reduced-motion, 200-percent zoom, increased text spacing, and safe-area behavior are first-class verification modes.
- The single-image computational project opens at `Image 1 of 1`, with Previous and Next disabled.

## Test and Review Decisions

| Layer | Selected tool | Required coverage |
| --- | --- | --- |
| Unit and component tests | Vitest 4 and Testing Library 16 | Reducer examples, keyboard/focus behavior, accessible naming, PDF fallback, image crop/detail distinction, one-image and multi-image behavior, failure isolation, and cleanup. |
| Property-based tests | fast-check 4.10.2 integrated with Vitest | Navigation invariants, clamped-index oracle, immutable item preservation, dialog command sequences, Close behavior, safe failure downgrade, and layout ranges. |
| Static/type quality | TypeScript build and ESLint | Strict type correctness, hooks/effect safety, and project lint rules. |
| Boundary/integrity checks | Existing portfolio scripts | No unsafe source, dependency drift, privacy leak, eager full-media request, or invalid public placement. |
| Build evidence | Vite manifest and existing measurement scripts | Initial budget, three-request limit, separate viewer chunks, per-chunk ceiling, and deferred originals. |
| Browser review | Headless Google Chrome | 320/768/1280/1440, both themes, zoom, text spacing, reduced motion, keyboard, forced colors where supported, overflow, and focus restoration. |
| Manual compatibility | Current Firefox, desktop Safari, and iOS Safari | Record pass/failure when available and `unavailable-not-run` otherwise. |

fast-check is already a locked dependency, supports custom generators, automatic shrinking, replayable seeds, and Vitest integration, and therefore satisfies PBT-09 without a dependency change.

## Rejected Alternatives

| Alternative | Reason rejected |
| --- | --- |
| Custom ARIA-only modal surface | Reimplements a supported platform primitive and increases focus/inertness risk without adding required capability. |
| Third-party modal/gallery library | Adds supply-chain and bundle cost while the required state and behavior are bounded. |
| Client-side PDF canvas renderer | Adds substantial initial or interaction cost and complexity; native PDF plus explicit actions satisfies the requirement. |
| Runtime media proxy or conversion service | Expands security, privacy, availability, and infrastructure scope beyond the approved static portfolio. |
| Eager viewer/full-media loading | Violates current initial-request and on-demand media requirements. |
| Arbitrary external URLs | Bypasses central admission and conflicts with fail-closed security rules. |
| Global image carousel | Breaks activity/project context and deterministic group boundaries. |

## Security Baseline Effect

- SECURITY-09: generic failures and no default/sample viewer content.
- SECURITY-11: explicit misuse cases and separation of source admission, reducer logic, and effects.
- SECURITY-13: bundled/approved media and immutable catalogs; no external viewer scripts.
- SECURITY-15: fail-closed admission and mandatory cleanup.
- SECURITY-04 and SECURITY-10 are not implemented by this unit; restrictive response headers, dependency scanning, and SBOM remain U-06 gates.
- SECURITY-01 through SECURITY-03, SECURITY-05 through SECURITY-08, SECURITY-12, and SECURITY-14 are N/A because no persistence, intermediary, service API, IAM, authentication, or operational monitoring surface is introduced.

## Property-Based Testing Effect

- PBT-09 is satisfied by existing fast-check 4.10.2 and Vitest integration.
- PBT-03, PBT-05, PBT-06, PBT-07, PBT-08, and PBT-10 become mandatory Code Generation/Build requirements.
- PBT-02 and PBT-04 are N/A because U-05 defines no inverse pair or claimed idempotent operation.

## Decision Constraints for the Next Stage

NFR Design must specify the concrete lazy-boundary topology, reducer/effect separation, media-size admission path, focus/inertness cleanup sequence, budget evidence, browser matrix, PBT generator/model structure, and U-06 handoff for CSP and supply-chain controls. It must not add a dependency or a runtime service without returning to NFR Requirements for explicit approval.
