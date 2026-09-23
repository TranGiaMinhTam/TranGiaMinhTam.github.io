# Code Generation Plan - U-07 Contact and Journal

> **Status: Complete plan approved and executed; U-07 Code Generation received final approval on 2026-09-18. This document is the single source of truth for U-07 Code Generation.**

## Unit Context

- **Workspace root**: `/Users/nhamhhung/student_ports/TranGiaMinhTam.github.io`
- **Project type**: Brownfield single-package React, TypeScript, and Vite static application.
- **Review boundary**: VU-06.
- **Primary stories**: ST-008 and ST-015.
- **Requirements**: FR-008, FR-014, FR-018, NFR-001, NFR-005, NFR-007, and U07-NFR-PER-001 through U07-NFR-MAI-002.
- **Approved experiences**: one local-only Contact body and one separately owned lazy Journal route.
- **Application ownership**: `src/portfolio/contact/`, `src/portfolio/journal/`, one neutral research-note descriptor under `src/portfolio/model/`, the Data Stories discovery seam, the top-level route/registry composition seam, U-07 verification scripts, and focused package scripts.
- **Documentation ownership**: `aidlc-docs/construction/contact-journal/code/` only.
- **Activation rule**: Generate and verify an isolated combined candidate first. Do not change live `src/App.tsx` until the candidate passes every P0 gate and receives separate explicit rendered approval.

## Stories and Outcomes

| Story  | Planned outcome                                                                | Acceptance focus                                                                                                                                                                                 |
| ------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ST-008 | A canonical Data Stories discovery action and a lazy local Research Note route | Verified fact-only note, direct `#/journal/sim-lse-data-analytics` navigation, distinct article design, safe loading/failure/not-found states, and reliable return to `#data-stories`            |
| ST-015 | A local-only Contact signal composer                                           | Verified recipient, labeled fields, deterministic validation, safely encoded mailto draft, direct-email fallback, retained draft, and no storage, network submission, or false sent confirmation |

## Dependencies and Stable Contracts

- U-01 supplies verified source records, branded identifiers, the evidence manifest, semantic tokens, shared accessible actions, boundary safeguards, and recovery tooling.
- U-02 supplies immutable ten-section order, shell slots, constrained hash resolution, focus conventions, themes, responsive shell, browser adapters, and the final temporary body.
- U-03 through U-06 supply the nine approved active body factories and the duplicate-rejecting registry composer.
- U-04 supplies `project-sim-lse-data-analytics`, Data Stories, research model contracts, and its currently empty research-note destination seam.
- U-06 supplies the active 281,183-byte JavaScript and 46,045-byte CSS baseline.
- U-07 consumes those contracts but does not change section order, completed body ownership, dependencies, GitHub Pages infrastructure, evidence publication, or deployment configuration.

## Approved Facts and Fixed Contracts

- The only production note slug is `sim-lse-data-analytics`, with route `#/journal/sim-lse-data-analytics` and title `SIM-LSE Data Analytics: A Verified Project Note`.
- The note is assembled only from the verified SIM-LSE project record and uses the fixed order Question, Context, Contribution, Methods, Tools, Timeline, and Evidence.
- Former-owner writing and unsupported claims from `src/data/journalPosts.ts` and `src/content/journal/first-local-journal.md` are prohibited from the U-07 graph and rendered output.
- The verified recipient is `minhtamtrangia@gmail.com`; direct and composed destinations remain `mailto:` only.
- Trimmed limits are name 1-100 characters, email 3-254 characters with the approved conservative shape, and message 1-5000 characters.
- The mail subject is `Portfolio opportunity enquiry`; the encoded body labels are `Name:`, `Reply-to:`, a blank line, `Message:`, and the message text.
- The site stores, transmits, logs, or analyzes no visitor draft value and never claims a message was sent.
- Valid unknown journal slugs show a local not-found state; malformed hashes remain owned by the existing shell normalization contract.
- Production cardinality is exactly one note; the capacity fixture is sixteen descriptors and 112 ordered sections.

## Interfaces and Boundaries

### Browser interfaces

- `ResearchNoteCatalogResult` is an accepted immutable descriptor/index collection or a rejected collection with stable ordered findings.
- `ContactSelection` and `ContactDraftValidation` are discriminated results; only a branded valid draft can reach the mailto encoder.
- `MailtoHandoff` accepts only an approved `mailto:` URL and is injectable for tests.
- `JournalRouteLocation` is continuous, article, or valid-slug not-found; malformed hashes remain outside this new route state.
- Data Stories discovery and Journal routing consume the same accepted descriptor collection and must match exactly by slug, href, title, project id, source type, membership, and order.
- `U07SectionBodyRegistry` owns exactly the `contact` factory; Journal is a separate lazy top-level route and never occupies a second section slot.

### Non-browser interfaces

- Boundary inspection, manifest classification, budget measurement, cleanup inventory, candidate guarding, recovery capture, review collection, and evidence reporting remain development-only.
- No API, repository, database entity, migration, backend service, hosted form, CMS, queue, cache, monitoring agent, analytics system, or deployment artifact is introduced.

## Approved File Scope

### Create neutral model source

- `src/portfolio/model/researchNoteCatalog.ts`
- `src/portfolio/model/researchNoteCatalog.test.ts`

### Create Contact source

- `src/portfolio/contact/contact.types.ts`
- `src/portfolio/contact/contactModel.ts`
- `src/portfolio/contact/ContactSignal.tsx`
- `src/portfolio/contact/Contact.module.css`
- `src/portfolio/contact/sectionBodies.tsx`
- `src/portfolio/contact/index.ts`
- `src/portfolio/contact/contactModel.test.ts`
- `src/portfolio/contact/ContactSignal.test.tsx`
- `src/portfolio/contact/contactStyles.test.ts`
- `src/portfolio/contact/sectionBodies.test.tsx`

### Create Journal source

- `src/portfolio/journal/journal.types.ts`
- `src/portfolio/journal/journalModel.ts`
- `src/portfolio/journal/usePortfolioRoute.ts`
- `src/portfolio/journal/JournalRoute.tsx`
- `src/portfolio/journal/JournalRouteBoundary.tsx`
- `src/portfolio/journal/ResearchNotePage.tsx`
- `src/portfolio/journal/JournalNotFound.tsx`
- `src/portfolio/journal/JournalRoute.module.css`
- `src/portfolio/journal/JournalRouteEntry.tsx`
- `src/portfolio/journal/index.ts`
- `src/portfolio/journal/journalModel.test.ts`
- `src/portfolio/journal/usePortfolioRoute.test.tsx`
- `src/portfolio/journal/JournalRoute.test.tsx`
- `src/portfolio/journal/JournalRouteBoundary.test.tsx`
- `src/portfolio/journal/journalStyles.test.ts`

`JournalRouteEntry.tsx` is the default-exported dynamic-import boundary. Public static exports must not re-export the lazy presentation in a way that pulls it into the initial bundle.

### Create candidate and verification tooling

- `scripts/portfolio/contact-journal-candidate/index.html`
- `scripts/portfolio/contact-journal-candidate/main.tsx`
- `scripts/portfolio/contact-journal-candidate/vite.config.mjs`
- `scripts/portfolio/verify-contact-journal.mjs`

### Modify only where required

- `src/portfolio/research/projectCatalog.ts` to obtain canonical local-note discovery from the neutral descriptor.
- `src/portfolio/research/research.types.ts` and `src/portfolio/research/researchDataModel.ts` only for the typed, canonical local-note discovery projection.
- `src/portfolio/research/DataStories.tsx`, `src/portfolio/research/PublicationStatus.tsx`, `src/portfolio/research/ResearchData.module.css`, and their existing focused tests only to replace the temporary publication message with the approved discovery action while preserving U-04 ownership and layout.
- `src/portfolio/index.ts` only for safe non-lazy U-07 public contracts if required.
- `scripts/portfolio/check-boundaries.mjs` for U-07 source, candidate, active, ownership, lazy-boundary, prohibited-content, network/storage, and legacy isolation checks.
- `scripts/portfolio/measure-build.mjs` only if its manifest traversal requires a general dynamic-entry classification capability; otherwise it remains unchanged.
- `package.json` for focused U-07 test, candidate build/preview, measurement, boundary, and verification commands without dependency changes.
- `src/App.tsx` only after rendered candidate approval, to activate the ten-body registry and the combined continuous-versus-Journal route seam.

### Generate verification evidence

- `artifacts/portfolio/u07/` for preflight, hashes, recovery, baseline, candidate, manifest topology, cleanup inventory, review, decision, validation, and post-activation evidence.
- `aidlc-docs/construction/contact-journal/code/implementation-summary.md`
- `aidlc-docs/construction/contact-journal/code/verification-summary.md`
- `aidlc-docs/construction/contact-journal/code/recovery-summary.md`

No duplicate `_new`, `_modified`, alternate component, parallel active entry, or dependency is permitted.

## Legacy Cleanup Decision for This Plan

The following exact paths are cleanup **inventory candidates only**:

- `src/components/Contact.tsx`
- `src/components/Journal.tsx`
- `src/components/JournalPostPage.tsx`
- `src/templates/business/BusinessContact.tsx`
- `src/templates/business/BusinessJournal.tsx`
- `src/templates/business/BusinessJournalPostPage.tsx`
- `src/templates/journalPostPages.test.tsx`
- `src/data/blog.ts`
- `src/data/journalPosts.ts`
- `src/content/journal/first-local-journal.md`
- `src/utils/contact.ts`
- `src/utils/journal.ts`

The approved disposition for Part 2 is **retain and quarantine all twelve paths**. They have incoming references in the broader legacy or test graph, and the brownfield workspace contains user-owned changes. U-07 may hash them, record sizes/references/content risks, create a recovery payload, and prove they are absent from the active graph. It may not delete, relocate, rename, or modify them. Any later deletion requires a separate exact plan and approval.

## Part 1 - Planning and Approval

- [x] Step 1 - Read the approved U-07 Functional Design, NFR Requirements, NFR Design, primary stories, unit contracts, dependency map, workflow state, reverse-engineered structure, and active U-01 through U-06 interfaces.
- [x] Step 2 - Confirm U-07 readiness, brownfield workspace root, exact ownership, story coverage, stable dependencies, and absence of API, repository, database, infrastructure, or deployment work.
- [x] Step 3 - Audit the current Contact, Journal, Data Stories, routing, active registry, candidate-tooling, and legacy cleanup graph before defining scope.
- [x] Step 4 - Define the exact create, modify, evidence, documentation, retained-legacy, and prohibited scope; prohibit duplicate brownfield files and unapproved deletion.
- [x] Step 5 - Define the sequential model, component, route, test, candidate, manifest, rendered-review, activation, recovery, and evidence steps below.
- [x] Step 6 - Validate this plan's Markdown, tables, paths, checkboxes, story traceability, parsing compatibility, special characters, and extension status.
- [x] Step 7 - Summarize the complete plan and log the approval prompt.
- [x] Step 8 - Receive and record explicit approval for this complete Code Generation plan, then mark Code Generation Part 1 complete in workflow state. Approved on 2026-09-18.

## Part 2 - Generation

### Step 9 - Capture U-07 Preflight and Recovery Boundary

- [x] Record source revision, working-tree scope, dependency/lockfile hashes, active entry and nine-body registry hashes, focused/full tests, production build, and exact baseline bytes.
- [x] Run active U-01 through U-06 type, lint, focused/full test, boundary, recovery, verification, build, and measurement commands before U-07 source mutation.
- [x] Save exact recoverable `src/App.tsx`, touched U-04 seams, package scripts, boundary tooling, and candidate configuration content under `artifacts/portfolio/u07/recovery/`.
- [x] Stop without source generation if an unexplained prerequisite failure, protected-file mismatch, or baseline mismatch exists. No unexplained failure or mismatch exists.

### Step 10 - Generate the Neutral Research Note Catalog

- [x] Generate immutable descriptor, source-type, finding, accepted-result, slug-index, project-index, discovery-projection, and route-projection contracts.
- [x] Encode exactly the approved SIM-LSE slug, href, title, project id, source type, and order without importing Contact, Journal, or Research presentation code.
- [x] Validate route grammar, unique slug/project mappings, exact production cardinality, stable order, and repeated-run equality.
- [x] Reject invalid, missing, duplicate, unsafe, or mismatched descriptors with stable ordered findings.

### Step 11 - Generate the Contact Domain Model

- [x] Select exactly the verified recipient and produce the direct `mailto:` destination, privacy statement, and fixed limits.
- [x] Implement pure normalization, conservative email validation, control-character rejection, ordered field findings, first-invalid-field identity, and branded valid-draft construction.
- [x] Implement the recipient-locked subject/body encoder so invalid input cannot reach the public mailto builder.
- [x] Guarantee no current time, randomness, storage, fetch, logging, analytics, hidden transport, or success claim affects the model.

### Step 12 - Generate the Contact Signal Body

- [x] Render a distinct Contact signal surface with one visible heading, verified direct-email fallback, privacy explanation, and programmatically labeled name, email, and message fields.
- [x] Keep controlled draft state mounted after attempted handoff; show field-level errors, associate them programmatically, and focus the first invalid field.
- [x] Invoke only the injected handoff adapter on valid submit and never display sent, delivered, or stored confirmation.
- [x] Register exactly the `contact` body and preserve the approved nine existing factories without cross-domain presentation imports.

### Step 13 - Generate the Journal Model and Route Intent

- [x] Assemble the one fact-only note from the verified SIM-LSE project and approved evidence relationships using the seven fixed sections.
- [x] Build project/evidence indexes once, preserve exact verified wording, and localize missing optional evidence without inventing outcome, authorship, scale, or publication claims.
- [x] Resolve continuous, valid article, and valid unknown-slug intent through the existing hash resolver/browser adapter; leave malformed-hash normalization to the shell.
- [x] Prove exact discovery/route descriptor equivalence and sixteen-descriptor/112-section linear capacity behavior.

### Step 14 - Generate the Lazy Journal Experience

- [x] Keep `JournalRouteEntry.tsx` behind `React.lazy` and journal intent; render route-local themed loading, article, and not-found states.
- [x] Render a distinct long-form Research Note with stable heading hierarchy, bounded reading width, seven ordered sections, source/evidence labeling, and a persistent `#data-stories` return.
- [x] Add a route-local error boundary with one manual bounded retry while keeping the return action outside the failed lazy subtree.
- [x] Move focus to stable route-state headings after mount without animation and without creating history loops.

### Step 15 - Generate Responsive and Accessible U-07 Styles

- [x] Create locally owned Contact and Journal CSS Modules using established tokens, Grid/Flexbox, logical properties, explicit contrast, visible focus, and non-color error/status cues.
- [x] Give Contact and Research Note clearly different compositions from each other, the rejected legacy designs, and earlier portfolio sections.
- [x] Support 320, 768, 1280, and 1440 CSS-pixel widths, both themes, increased text spacing, 200-percent zoom, reduced motion, long email/message/note content, and no document-level overflow.
- [x] Add no global override, routine `!important`, rejected selector family, duplicate theme/mobile tree, background pattern behind dense reading text, or dependency-driven styling.

### Step 16 - Integrate Canonical Discovery with Data Stories

- [x] Replace the temporary research-note status with one canonical local-note discovery action derived from the neutral descriptor.
- [x] Preserve U-04 project/story facts, Data Stories ownership, visual hierarchy, semantic relationships, and the distinction between local and external destinations.
- [x] Add no duplicated slug/title, generic article card grid, decorative result chart, former-owner prose, or unverified publication claim.
- [x] Verify the discovery href opens the same note resolved by the Journal route and returns to the existing Data Stories section.

### Step 17 - Generate Pure Model, Failure, Security, and Capacity Tests

- [x] Cover exact recipient, limits, normalization, boundaries, conservative email cases, control characters, finding order, branded validation, subject/body encoding, Unicode, reserved characters, and repeatability.
- [x] Cover exact descriptor, note sections, verified facts, optional evidence omission, duplicate/missing/mismatched sources, prohibited legacy claims, route grammar, article/not-found/malformed decisions, and equivalence.
- [x] Cover sixteen descriptors, 112 sections, indexed linear assembly, unique keys, stable order, repeated-run equality, and exact production cardinality one.
- [x] Prove no storage, network submission, analytics, unsafe scheme, raw draft logging, dynamic HTML injection, or false delivery path exists.

### Step 18 - Generate Component, Accessibility, Lazy, and Integration Tests

- [x] Cover Contact labels, instructions, validation, error associations, first-invalid focus, direct fallback, valid handoff injection, retained draft, keyboard order, and no success claim.
- [x] Cover Journal loading, article, not-found, render failure, one manual retry, return action, route focus, heading hierarchy, evidence omission, and long-form semantics.
- [x] Cover canonical Data Stories discovery, descriptor equivalence, ten finished bodies, zero temporary bodies, duplicate rejection, and unchanged U-01 through U-06 behavior.
- [x] Inspect styles for tokens, distinct geometry, contrast surfaces, narrow reflow, focus, target size, text spacing, reduced motion, reading width, wrapping, and forbidden patterns.

### Step 19 - Generate Candidate, Manifest, Cleanup, and Verification Tooling

- [x] Create an isolated combined candidate that composes all ten section bodies and selects continuous or lazy Journal presentation without touching live `src/App.tsx`.
- [x] Extend boundary checks with U-07 source, candidate, and active modes; exact ownership; lazy separation; allowed browser interfaces; prohibited content; legacy isolation; and unchanged dependencies.
- [x] Generate `verify-contact-journal.mjs` for contracts, stories, routes, facts, privacy/security, discovery equivalence, capacity, budgets, manifest topology, cleanup disposition, activation, and recovery.
- [x] Add focused package scripts only; generate a machine-readable inventory for the twelve exact retained legacy paths with hashes, sizes, incoming references, content disposition, and recovery metadata.

### Step 20 - Run the Inactive Candidate Automated Gate

- [x] Run strict TypeScript, focused U-01 through U-07 tests, complete tests, lint, candidate boundaries, recovery, all applicable active prior-unit verifiers, and protected-source checks.
- [x] Run invalid-draft, encoding, no-transport, source-integrity, optional-evidence, article/not-found/malformed, lazy-failure, capacity, repeatability, equivalence, prohibited-content, and ten-slot ownership cases.
- [x] Record exact commands, versions, durations, results, warnings, limitations, and dispositions.
- [x] Keep live `src/App.tsx` unchanged if any P0 result fails. No P0 result failed, and the protected live-entry hash remains unchanged.

### Step 21 - Build, Classify, and Measure the Isolated Candidate

- [x] Build the isolated candidate to a temporary directory with a Vite manifest and traverse the complete static/dynamic graph.
- [x] Enforce initial JavaScript at no more than 296,000 bytes and no more than 6 percent over 281,183 bytes, with the tighter absolute ceiling governing; enforce initial CSS at no more than 51,200 bytes.
- [x] Enforce Journal lazy JavaScript at no more than 18,432 bytes, Journal-owned lazy CSS at no more than 6,144 bytes, absence of Journal presentation code from the initial closure, and zero incremental U-07 evidence bytes.
- [x] Record emitted versus requested assets, chunk ownership, dependency hashes, request topology, and unavailable P1 browser-performance evidence honestly. Browser timing remains unavailable; deterministic manifest evidence passed.

### Step 22 - Conduct the Rendered Candidate Review

- [x] Start the isolated candidate and create `contact-journal-candidate-review-questions.md` with the required A/B/X decision. The verified preview is running at `http://127.0.0.1:4179/`.
- [x] Review Contact and Journal at 320, 768, 1280, and 1440 CSS-pixel widths and in both themes. Approved by the user with Option A.
- [x] Review field/error/focus/handoff states; article/loading/not-found/failure/retry states; Data Stories discovery/return; reading width; exact content; contrast; keyboard flow; zoom; text spacing; wrapping; and overflow. Approved by the user with Option A.
- [x] Record screenshots or user observations, limitations, requested corrections, rerun results, and the exact approval response; do not activate before explicit approval. No new screenshot was supplied; the exact all-A approval and automated/rendered-review limitations are recorded.

### Step 23 - Activate the Approved Combined Candidate

- [x] Reconfirm active entry, approved nine-body registry, touched U-04 seams, protected legacy files, package/lockfile, and tooling match the preflight recovery snapshot.
- [x] Modify only the approved `src/App.tsx` seams so the continuous portfolio receives the tenth Contact body and Journal intent receives the lazy route.
- [x] Preserve shell controllers, section order, all prior bodies, dependencies, legacy inventory paths, and deployment configuration.
- [x] Mark ST-008 and ST-015 implemented only after live registration succeeds.

### Step 24 - Run Post-Activation Acceptance and Recovery Checks

- [x] Run strict TypeScript, focused/full tests, lint, active boundaries, applicable active verifiers, production build, manifest classification, measurements, security scans, cleanup-retention checks, and protected-source checks.
- [x] Confirm active-to-candidate equivalence, ten finished bodies, no temporary body, exact facts, descriptor equivalence, local-only Contact behavior, Journal split, safe routes/actions, and all byte ceilings.
- [x] Confirm every retained legacy candidate remains byte-for-byte unchanged and unreachable from the active graph.
- [x] If any current P0 check fails, restore exact pre-switch files through the recovery payload and record failed acceptance. No current P0 check failed, so recovery was not invoked.

### Step 25 - Generate Completion Evidence and Present the U-07 Gate

- [x] Write implementation, verification, and recovery summaries under `aidlc-docs/construction/contact-journal/code/`.
- [x] Record created/modified/retained files, story/NFR traceability, commands, versions, tests, budgets, rendered review, limitations, candidate decision, activation, and recovery.
- [x] Validate Markdown, tables, paths, special characters, whitespace, evidence topology, no duplicate files, no dependency/infrastructure changes, and no non-Markdown file under `aidlc-docs/`.
- [x] Update every plan checkbox and workflow state in the same interaction, present the standardized Code Generation completion message, and wait for explicit approval before final Build and Test. Approved on 2026-09-18; advanced to Build and Test.

## Planned Verification Commands

- `npx tsc -b`
- `npm run test:contact-journal`
- `npm run test:tools-fieldwork`
- `npm run test:academic`
- `npm run test:research`
- `npm run test:identity`
- `npm run test:shell`
- `npm run test:portfolio`
- `npm test`
- `npm run lint`
- `npm run check:contact-journal:source`
- `npm run check:contact-journal:candidate`
- `npm run check:contact-journal:active`
- `npm run verify:contact-journal:source`
- `npm run verify:contact-journal:candidate`
- `npm run verify:contact-journal:active`
- `npm run verify:tools-fieldwork:active`
- `npm run verify:academic:active`
- `npm run verify:research:active`
- `npm run verify:identity:active`
- `npm run verify:shell -- --phase active`
- `npm run verify:recovery`
- `npm run build:contact-journal-candidate`
- `npm run measure:contact-journal-candidate`
- `npm run build`
- `npm run measure:portfolio`

Exact commands may add plan-defined output arguments but cannot expand application scope, dependencies, or cleanup authority.

## Completion Criteria

- ST-008 and ST-015 satisfy every approved acceptance criterion.
- All approved U-07 NFRs have reproducible evidence or an honestly recorded P1 environment limitation.
- Contact is the tenth finished body; the canonical Research Note is a separately lazy route; no temporary section remains.
- Candidate approval precedes activation, and post-activation P0 checks pass or exact recovery is applied.
- Initial/lazy JavaScript and CSS ceilings pass, Journal code is absent from the initial closure, and U-07 adds zero evidence bytes.
- Contact validation, safe encoding, direct fallback, local-only privacy, draft retention, and no false success pass.
- Valid article, unknown slug, malformed hash, loading, render failure, manual retry, route focus, and return behavior pass.
- Data Stories discovery and Journal route projections are exactly equivalent; former-owner and unsupported content is absent.
- Dependencies, lockfile, GitHub Pages deployment, shell controllers, prior bodies, and all twelve retained legacy paths remain unchanged except for explicitly approved seams.
- Every execution checkbox is marked immediately when its work completes.

## Extension Compliance

- **Security Baseline**: Disabled in workflow state; full extension rules remain unloaded. Approved local-only privacy, safe encoding, route, publication, content-integrity, and cleanup controls remain mandatory.
- **Property-Based Testing**: Disabled in workflow state; full extension rules remain unloaded. Deterministic boundary, capacity, repeatability, route-state, and encoding fixtures remain mandatory.
