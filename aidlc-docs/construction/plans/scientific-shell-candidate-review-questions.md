# U-02 Scientific Shell Candidate Review

> **Status: Option A explicitly approved on 2026-09-14T17:09:13Z.**

## Candidate

- Local preview: `http://127.0.0.1:4174/`
- Automated result: 99 complete-suite tests passed; strict TypeScript, lint, boundaries, recovery, and candidate build passed.
- Candidate size: 206,635 bytes JavaScript and 9,200 bytes CSS.
- Candidate composition: full-width specimen masthead, horizontal locus navigation, coordinate progress, continuous scan field, ten stable domain targets, light/dark control, and terminal footer.

## Review Checklist

Please inspect the candidate at phone and desktop widths and toggle both themes. Confirm that:

- The layout is visibly and structurally different from the original portfolio.
- There is no sidebar, drawer, hamburger menu, layout selector, or repeated generic card frame.
- All ten navigation loci remain directly reachable.
- Section name and “section N of 10” remain visible without relying on color.
- The page does not create document-level horizontal scrolling; the navigation strip may scroll locally on narrow screens.
- Keyboard focus remains visible, the skip link reaches the main field, and sticky bands do not obscure focused content.
- Light and dark modes use the same content structure and remain readable.
- At 200-percent zoom, controls wrap without collision and the reading flow remains usable.

## Question 1 - Candidate Activation Decision

How should the rendered candidate proceed?

A) Approve the candidate and authorize the guarded active-entry switch, followed by the complete post-switch acceptance gate
B) Request candidate changes and keep the current application entry unchanged
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Boundary

- Option A authorizes only Steps 12 through 16 of the already approved U-02 plan.
- Option B returns to the inactive candidate implementation; it does not alter the current application entry.
- No rejected-file deletion, dependency change, raw-evidence mutation, later-domain implementation, backend work, or deployment change is authorized.

## Post-Switch Finding

The approved activation was attempted. Build, lint, recovery, and the active boundary inspector passed, but the full suite failed because `src/portfolio/boundaries.test.ts` still enforces the U-01-only rule that the approved portfolio foundation must never be imported by the active entry. The three entry files were restored to their exact pre-switch hashes as required.

## Question 2 - Boundary-Test Scope Amendment

How should the migration proceed?

A) Add only `src/portfolio/boundaries.test.ts` to the approved U-02 file scope, update its inactive-only assertion to recognize the U-02 active phase, and retry the guarded entry switch plus complete acceptance gate
B) Keep the original entry restored and stop U-02 activation
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

**Decision**: Approved on 2026-09-15T00:42:52Z.

This amendment does not authorize weakening raw-evidence, prohibited-dependency, unsafe-pattern, recovery, or measurement checks. It changes only the stale U-01 entry-import expectation so it can enforce the approved U-02 active-shell boundary.
