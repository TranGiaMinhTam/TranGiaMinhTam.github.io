# Technology Stack Decisions - U-02 Scientific Shell

## Decision Summary

U-02 uses the existing React and TypeScript toolchain with native browser and HTML capabilities behind testable adapters. It adds no dependency and removes Chakra, Tailwind utility composition, rejected template selection, and legacy layout-mode code from the new active shell import graph. CSS Modules and U-01 semantic tokens own presentation.

## Selected Stack

| Concern | Selection | Rationale and constraint |
| --- | --- | --- |
| Component runtime | React 19 | Already installed; supports the existing entry model and Strict Mode lifecycle verification. |
| Language | TypeScript 5.9 strict mode | Provides read-only discriminated state, adapter contracts, stable section IDs, and unused-code checks. |
| Build | Vite 7 with generated manifest | Already installed; exact entry graph and asset categories are required evidence. |
| Markup | Native `header`, `nav`, `main`, `section`, `footer`, anchors, buttons, and status semantics | Lowest runtime cost and strongest progressive/keyboard baseline. |
| Styling | CSS Modules plus U-01 `tokens.css` and `foundations.css` | Keeps shell geometry local, modes semantic, and rejected global override layers out of the new boundary. |
| Navigation | Native hashes and History API behind an injected adapter | Preserves GitHub Pages deep links and real-anchor fallback without a router dependency. |
| Visibility | One native `IntersectionObserver` with one animation-frame geometry fallback | Meets deterministic progress and capability availability without a library. |
| Theme | Root `data-theme`, native `matchMedia`, optional `localStorage` adapter | One DOM tree and semantic token contract; failures degrade to in-memory state. |
| Unit/component tests | Vitest 4 and Testing Library 16 | Already installed; supports fake timers, semantic queries, adapter spies, and jsdom. |
| Static checks | ESLint 9, TypeScript project build, U-01 boundary/recovery/measurement tools | Reuses approved local gates and avoids hidden services. |
| Manual/rendered checks | Local browser responsive and accessibility matrix | Required for focus, zoom, reflow, sticky offsets, and visual uniqueness that jsdom cannot prove. |

## Version Baseline and Policy

The approved workspace baseline currently resolves:

- React and React DOM 19.2.x.
- TypeScript 5.9.3.
- Vite 7.3.0.
- Vitest 4.1.9.
- Testing Library React 16.3.2.
- ESLint 9.39.2.

U-02 does not update these versions or regenerate the lockfile. Exact installed versions are recorded again during Code Generation verification. Dependency remediation requires an explicit plan amendment because U-01 recorded existing registry advisories and U-02 must not mix visual migration with silent package updates.

## Browser Adapter Boundary

```ts
type ShellBrowserAdapters = Readonly<{
  location: Pick<Location, 'hash'>
  history?: Pick<History, 'pushState' | 'replaceState'>
  storage?: Pick<Storage, 'getItem' | 'setItem'>
  media?: (query: string) => MediaQueryListLike | undefined
  createObserver?: ObserverFactory
  requestFrame?: (callback: FrameRequestCallback) => number
  cancelFrame?: (handle: number) => void
  scrollToTarget?: (target: HTMLElement, behavior: ScrollBehavior) => void
}>
```

Production defaults delegate to browser globals only at the adapter edge. Pure hash resolution, theme resolution, visibility winner selection, and progress derivation do not access globals. Tests inject deterministic adapters for absence, errors, timing, and call-order assertions.

## Presentation Boundary

The new shell may import:

- React.
- U-01 model, section registry, semantic primitives, and styles.
- Its own `src/portfolio/shell/` modules and CSS Modules.
- Explicit browser adapter types and pure shell functions.

The new shell may not import:

- `@chakra-ui/react` or `@chakra-ui/icons`.
- Tailwind utility composition or `@tailwindcss` presentation code.
- `src/templates/`, `usePortfolioLayout`, template options, sidebars, drawers, or layout selectors.
- `App.css`, rejected business styles, raw evidence, final documents, journal detail, or later domain presentation modules.
- A routing, animation, state-management, observer, theme, or progress library.

Installed legacy packages may remain temporarily in the lockfile while they are unreachable from the new active entry. Their cleanup is a separately approved and recoverable change.

## CSS Strategy

- U-01 tokens supply semantic color, type, spacing, border, motion, and elevation roles.
- One shell module owns the masthead, locus navigator, scan field, footer, sticky offsets, and responsive state.
- Small child modules are allowed only where a component has independent interactive states; selectors remain purpose-specific.
- Light/dark differences use token values, not duplicate component markup or mode-specific render branches.
- Media queries cover content-driven breakpoints and reduced motion; 320/768/1280/1440 are review widths, not four hard-coded layouts.
- No routine `!important`, generated utility strings, generic card classes, or inherited rejected selectors.

## Navigation and State Strategy

- React local state and refs are sufficient; no external state store is selected.
- `useSectionProgress` owns one observer/fallback lifecycle and delegates pure decisions to tested functions.
- Real anchors preserve native behavior; enhancement controls motion and history after validating targets.
- `pushState` is used for deliberate destination changes and `replaceState` for stable passive synchronization.
- Theme state uses one hook and one optional preference key.
- Journal hashes are recognized only as a reserved route classification in U-02; detail code remains lazy and U-07-owned.

## Test Strategy

| Layer | Required evidence |
| --- | --- |
| Pure functions | Hash matrices, winner tie-breaking, progress math, theme precedence, invalid input, and repeat-run equality. |
| Hooks/controllers | Observer/fallback count, event ordering, fake-timer timing, history calls, storage failures, Strict Mode cleanup, and no-op suppression. |
| Components | Landmarks, skip link, ten real links, current state, progress text, theme name/state, temporary slot semantics, and footer. |
| Boundary | Prohibited imports, selectors, raw assets, duplicate controllers, lockfile integrity, and active-entry reachability. |
| Build | Exact Vite manifest graph, 307,200-byte JavaScript and 51,200-byte CSS budgets, gzip supplements, and no eager evidence/journal detail. |
| Rendered/manual | Four widths in two themes, keyboard/focus, 200-percent zoom, reduced motion, contrast, local strip overflow, and uniqueness review. |

## Alternatives Not Selected

| Alternative | Reason not selected |
| --- | --- |
| Chakra shell components | They retain the rejected active runtime/style dependency and reduce bundle headroom and visual ownership. |
| Tailwind utility-based shell | It conflicts with local semantic style ownership and risks carrying rejected composition patterns. |
| React Router | Hash sections and one future lazy journal boundary do not justify a new runtime dependency. |
| External intersection/progress library | Native observation plus a small fallback satisfies the behavior with lower size and clearer failure control. |
| Theme library | One root attribute and optional preference do not require a runtime abstraction. |
| Hamburger drawer | It violates the approved directly reachable compact-navigation design. |
| Separate mobile component tree | It risks semantic divergence; one responsive DOM is required. |
| Canvas/WebGL progress | It adds cost and accessibility complexity without supporting the simple locus relationship. |

## Migration Implications

1. U-02 source is first generated and tested behind the inactive boundary.
2. The Code Generation plan names exact active-entry files and pre-switch checks.
3. Only after those checks pass does the entry import `PortfolioExperience` and the U-01 token/foundation styles.
4. The old provider, template registry, layout-mode hook, and rejected styles become unreachable from the active graph but are not deleted in U-02.
5. The production manifest is measured immediately; a failed P0 requirement triggers restoration or keeps the previous entry.
6. Later domain units replace temporary slot bodies without changing shell ownership.

## Infrastructure, API, and Data Decisions

- Hosting remains the existing GitHub Pages deployment.
- No server, API, database, CMS, authentication, analytics, monitoring agent, or runtime secret is introduced.
- No infrastructure design stage is required for U-02 because deployment architecture is unchanged.
- Theme preference is the only optional persisted shell value.

## Extension Compliance

- Security Baseline: disabled and not loaded; the product-specific static security boundary remains enforced.
- Property-Based Testing: disabled and not loaded; deterministic tables, doubled-volume fixtures, and repeat-run tests remain required.
