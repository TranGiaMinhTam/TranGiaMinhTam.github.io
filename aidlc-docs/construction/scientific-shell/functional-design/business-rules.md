# Business Rules - U-02 Scientific Shell

## Rule Semantics

An error blocks the U-02 active-entry switch. A warning permits the semantic shell to operate through a documented fallback. For the same normalized inputs, rules produce the same code, severity, target, and resolution.

## Shell and Registry Rules

| Rule | Severity | Policy |
| --- | --- | --- |
| SHL-001 | Error | The shell consumes exactly the ten approved U-01 sections in registry order. |
| SHL-002 | Error | Every registered section has one mounted, labelled target and one compact-navigation link. |
| SHL-003 | Error | The visible frame is a full-width masthead, locus navigator, scan field, and footer; sidebar, drawer, layout selector, casebook, notebook, Quarto, and generic repeated container-card structures are prohibited. |
| SHL-004 | Error | One main landmark contains ordered section regions; navigation and footer have distinct accessible names or semantics. |
| SHL-005 | Error | U-02 temporary slot markers are explicitly non-final and contain no fabricated student claims. |

## Navigation and Hash Rules

| Rule | Severity | Policy |
| --- | --- | --- |
| NAV-001 | Error | Navigation accepts only IDs present in the immutable section registry. |
| NAV-002 | Error | Each action retains a real registered hash `href` and remains keyboard operable without JavaScript-enhanced scrolling. |
| NAV-003 | Error | Deliberate navigation uses one `pushState` only when the valid destination differs; passive synchronization uses `replaceState`. |
| NAV-004 | Error | A valid direct hash restores only after section targets exist and does not add a history entry. |
| NAV-005 | Warning | An invalid non-journal hash falls back to Identity and is normalized once without a feedback loop. |
| NAV-006 | Error | `#/journal/{slug}` remains reserved and cannot be reinterpreted as a section hash. |
| NAV-007 | Error | Back and forward events override pending deliberate navigation and resolve through the same hash validator. |
| NAV-008 | Error | A missing registered target prevents history mutation and blocks entry acceptance. |

## Active-Section and Progress Rules

| Rule | Severity | Policy |
| --- | --- | --- |
| PRG-001 | Error | One observer or one fallback controller owns all section visibility facts. |
| PRG-002 | Error | Candidate selection uses deliberate intent, reading-anchor distance, intersection ratio, then registry order. |
| PRG-003 | Error | Active index, section count, ordinal text, completion ratio, and locus ratio derive only from the registry and active ID. |
| PRG-004 | Error | Progress meaning includes the current label and “section N of 10”; color and position are redundant. |
| PRG-005 | Error | Passive observation cannot add repeated history entries or excessive screen-reader announcements. |
| PRG-006 | Warning | With no observation or geometry capability, retain the last valid state and native hash links. |

## Theme Rules

| Rule | Severity | Policy |
| --- | --- | --- |
| THM-001 | Error | Only `light` and `dark` are valid theme values. |
| THM-002 | Error | Resolution precedence is stored choice, system preference, then light fallback. |
| THM-003 | Error | One document-root `data-theme` attribute controls mode; domain JSX cannot branch by theme. |
| THM-004 | Warning | Storage read or write failure preserves immediate in-memory toggling and returns a typed persistence result. |
| THM-005 | Error | Both modes expose identical content, navigation, targets, and actions. |

## Accessibility and Responsive Rules

| Rule | Severity | Policy |
| --- | --- | --- |
| A11Y-001 | Error | A focus-revealed skip link moves directly to the main scan field. |
| A11Y-002 | Error | Current navigation state uses `aria-current`; focus visibility cannot depend on color alone. |
| A11Y-003 | Error | The progress track is non-live where visual; its concise text status is available without repeated announcements. |
| A11Y-004 | Error | Reduced motion removes smooth navigation and nonessential marker transitions without changing state or meaning. |
| A11Y-005 | Error | Every interactive target is at least 24 by 24 CSS pixels or has equivalent spacing. |
| RSP-001 | Error | At 320 CSS pixels, shell controls wrap or scroll in their own labelled strip without document-level horizontal overflow. |
| RSP-002 | Error | Navigation remains directly reachable on phones; it cannot move into a drawer or hamburger menu. |
| RSP-003 | Error | Wide layouts gain whitespace and track density, not a persistent side column. |
| RSP-004 | Error | Sticky bands cannot obscure focused targets or section headings. |

## Migration and Ownership Rules

| Rule | Severity | Policy |
| --- | --- | --- |
| MIG-001 | Error | The active entry changes only in the approved U-02 Code Generation step after all named preconditions pass. |
| MIG-002 | Error | The active graph cannot import rejected template selection, sidebar, drawer, or layout-mode modules. |
| MIG-003 | Error | U-02 cannot delete rejected files; later cleanup requires explicit targets and proof of non-use. |
| MIG-004 | Error | Post-switch JavaScript and CSS are measured against U-01; any greater-than-10-percent regression requires review. |
| MIG-005 | Error | U-02 owns shell internals; later domains supply registered slot bodies and cannot create parallel navigation, theme, or progress controllers. |

## Transition Matrix

| Current condition | Event | Required result |
| --- | --- | --- |
| Empty hash, no stored theme | Bootstrap | Identity active; system theme or light fallback; URL unchanged |
| Valid section hash | Bootstrap | Target restored after mount; no history addition |
| Invalid hash | Bootstrap | Identity active; invalid value replaced once |
| Active section A | Select section B | B becomes deliberate target; one pushed hash; motion honors preference |
| Deliberate target B pending | Observer reports adjacent section | B remains authoritative until completion or interruption |
| Passive scroll settles on C | Observer update | C active; current history entry replaced |
| Any section | Browser back/forward | Hash event interrupts pending intent and restores the resolved target |
| Stored theme invalid | Bootstrap | Ignore value; use system preference or light |
| Storage write throws | Toggle | Theme still changes in memory and on root; warning fact returned |
| Observer missing | Bootstrap | One throttled geometry fallback starts |

## Validation Coverage

Focused tests must exercise every rule family above, both successful and failing transitions, repeated-event determinism, cleanup on unmount, reduced-motion behavior, storage exceptions, missing capabilities, and exact registry growth assumptions. Rendered review must cover phone and desktop in both modes.

## Extension Compliance

Security Baseline and Property-Based Testing are disabled in the active workflow and are not enforced. Applicable product requirements are fully represented by NAV, THM, A11Y, RSP, and MIG rules.
