# Functional Design Plan - U-07 Contact and Journal

> **Status: Functional Design artifacts complete and awaiting explicit approval. No U-07 application source has been generated.**

## Unit Context

- **Unit**: U-07 Contact and Journal
- **Review boundary**: VU-06
- **Primary stories**: ST-008 and ST-015
- **Primary requirements**: FR-008, FR-014, and FR-018
- **Inherited obligations**: ST-013 and ST-016 through ST-021
- **Prerequisites**: U-01 through U-06 are approved
- **Owned domains**: Contact, local research-note detail, unknown-note fallback, and return navigation
- **Owned source boundary**: future `src/portfolio/contact/`, `src/portfolio/journal/`, local styles, route/contact tests, and only an exactly named, recoverable cleanup set approved later in Code Generation
- **Excluded systems**: hosted forms, APIs, databases, analytics, CMS integration, server routes, persistence of contact drafts, and GitHub Pages infrastructure changes

## Verified Source Assessment

- The verified model contains the approved contact address `minhtamtrangia@gmail.com` and no other contact channel is required.
- The U-04 Data Stories model deliberately publishes no journal destination yet and states that research notes are being prepared.
- Legacy `src/data/journalPosts.ts` and `src/content/journal/first-local-journal.md` contain former-owner claims, including professional data-engineering and mentoring claims that do not belong to Minh Tam. They are not approved U-07 content and cannot be reused.
- The verified SIM-LSE analytical project already supplies a research question, abstract, methods, tools, timeline, `Team-led project` disclosure, and approved evidence relationships. A local research note may only be created from those exact facts if the user explicitly authorizes that transformation; no reflective experience, result, participant count, professional role, or outcome may be invented.
- The shell already preserves the constrained `#/journal/{slug}` namespace while rejecting malformed hashes. U-07 must integrate with that existing contract rather than add a second router or server route.
- The continuous shell has exactly one remaining temporary body, `contact`; a valid journal detail is a separate lazy route state rather than an eleventh shell section.

## Design Steps

- [x] Read the U-07 unit definition, story map, ST-008, ST-015, FR-008, FR-014, FR-018, and inherited cross-cutting obligations.
- [x] Inspect the verified contact record, U-04 Data Stories contract, shell hash behavior, application-design methods, legacy journal content, and excluded-source boundaries.
- [x] Identify note-authority, discovery, routing, contact validation, mailto, privacy, failure, visual, responsive, and cleanup decisions requiring confirmation.
- [x] Create mutually exclusive A/B/X questions with recommended decisions and explicit integrity constraints.
- [x] Receive complete answers to Questions 1 through 12.
- [x] Resolve every ambiguity or add focused clarification questions. Questions 13 and 14 fixed the canonical note identity and exact contact contract; both were answered A.
- [x] Generate `business-logic-model.md`.
- [x] Generate `business-rules.md`.
- [x] Generate `domain-entities.md`.
- [x] Generate `frontend-components.md`.
- [x] Validate artifact structure, tables, identifiers, parsing compatibility, and whitespace.
- [x] Update state, README, plan checkboxes, and append-only audit.
- [x] Present the standardized U-07 Functional Design completion message and wait for explicit approval.

## Question 1 - First Approved Research Note

What should U-07 publish as the first valid local research-note route when no approved authored journal text exists?

A) Derive one factual SIM-LSE analytical research note only from the verified project record: question, abstract, methods, tools, timeline, Team-led project disclosure, and approved evidence; exclude every legacy first-person, professional-role, participant-count, result, and reflective claim
B) Publish no valid note and implement only the unknown-note fallback, leaving ST-008 incomplete until authored text is supplied
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It completes the approved deep-link story without inventing facts or reusing former-owner writing.

## Question 2 - Data Stories Discovery

How should the approved note become discoverable from the existing Data Stories section?

A) Replace the preparation-only state with one explicit local-note action whose label, slug, and source type are derived from the same canonical note catalog consumed by U-07
B) Keep Data Stories unchanged and require visitors to know the deep-link URL
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It creates one canonical discovery-to-detail relationship and avoids duplicated route strings.

## Question 3 - Journal Route State

What should a valid `#/journal/{slug}` route display?

A) Replace the continuous portfolio view with a focused, lazy-loaded research-note page that retains theme control, a clear identity label, and a return action to `#data-stories`
B) Expand the full note inline inside Data Stories while keeping the entire continuous shell visible
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It matches the approved application boundary, keeps long-form reading focused, and preserves GitHub Pages hash routing.

## Question 4 - Unknown and Malformed Routes

How should unsupported journal locations behave?

A) Render an accessible not-found state for a syntactically valid unknown slug; normalize malformed journal hashes through the existing shell invalid-hash behavior; both paths provide a direct return to Data Stories
B) Render a blank page for unknown slugs and leave malformed hashes untouched
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It provides deterministic recovery without introducing a second route grammar.

## Question 5 - Contact Composition

Which custom composition should replace the rejected contact card?

A) Use a correspondence protocol layout: verified recipient and privacy boundary on one side, with a labeled three-field message composer and direct-email fallback on the other
B) Use a centered generic contact card containing only an email button
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It is distinct from the old template while making the local-only workflow and fallback visible.

## Question 6 - Contact Validation

Which validation rule should apply before composing the local email draft?

A) Require trimmed name, syntactically valid email, and trimmed message; enforce explicit safe length limits; show an error summary and field-level messages; focus the first invalid field
B) Require only a nonempty message and rely on the visitor's email client for every other error
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It satisfies labeled, recoverable client validation without transmitting values.

## Question 7 - Mailto Draft Format

How should the mailto URL encode a valid draft?

A) Address the verified student email, use a stable opportunity-enquiry subject, and encode the visitor name, reply-to email, and message as labeled body lines with `URLSearchParams`
B) Concatenate raw field values into a mailto string without structured labels or encoding
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It is deterministic, testable, and safe for spaces and reserved characters.

## Question 8 - Submission and Fallback Behavior

What should happen after a valid form submission?

A) Open the generated mailto draft in the current browser context, retain the local draft if the handoff is cancelled, and keep a separate direct `mailto:` link always visible; never claim that a message was sent
B) Clear the form immediately and show a success confirmation saying the message was delivered
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. The site cannot verify delivery and should not erase a visitor's draft on an uncertain external handoff.

## Question 9 - Privacy Boundary

How should privacy be communicated and enforced?

A) State beside the form that values stay in the browser and are passed only to the visitor's email client; add no storage, analytics, network request, hidden submission, or telemetry
B) Persist drafts in local storage for convenience
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It preserves the approved local-only contact boundary.

## Question 10 - Research Note Composition

Which visual structure should the factual research note use?

A) Use a field-note sheet with a compact provenance header, restrained reading column, semantic sections for question, context, methods, tools, timeline, and contribution, followed by on-demand evidence actions
B) Reuse the former publication article layout or a generic blog card expanded to full width
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It creates a unique scientific reading experience while keeping every statement traceable.

## Question 11 - Responsive and Focus Behavior

How should Contact and the journal route adapt across supported widths and navigation states?

A) Keep one DOM order; stack the contact protocol before the composer on narrow screens; constrain article measure; move focus to the journal heading or not-found heading after route changes; and keep all controls reachable at 200-percent zoom without document-level horizontal scrolling
B) Preserve desktop columns with horizontal scrolling and leave focus wherever it was before the route change
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It satisfies the inherited responsive, keyboard, and recovery obligations.

## Question 12 - Final Cleanup Boundary

How should U-07 handle rejected legacy contact/journal code and unused presentation assets?

A) During Code Generation planning, produce an exact import-proven inventory with hashes and recovery paths; delete only targets proven unreachable from active code and explicitly named in the approved plan; retain anything ambiguous
B) Delete all legacy components, data, styles, and assets matching broad contact, journal, blog, template, award, gallery, or video patterns
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It makes cleanup bounded, recoverable, and resistant to accidental loss.

## Recommendation Summary

The recommended path is option A for Questions 1 through 12. It authorizes one fact-only SIM-LSE research note from verified source fields, connects it canonically to Data Stories, uses the existing constrained hash namespace and a lazy focused reader, provides accessible route recovery, implements a local-only validated mailto composer with an honest direct fallback, and permits only exact proof-backed cleanup during the later approved Code Generation plan.

## Focused Clarifications

The twelve answers are explicit and consistent. Two exact value sets remain material to stable route identifiers, validation, and repeatable tests.

### Question 13 - Canonical Note Identity

Which exact identity should the one approved fact-only note use?

A) Slug `sim-lse-data-analytics`; title `SIM-LSE Data Analytics: A Verified Project Note`; route `#/journal/sim-lse-data-analytics`; section order Question, Context, Contribution, Methods, Tools, Timeline, Evidence
B) Slug `data-story-01`; title `Research Note`; route `#/journal/data-story-01`; allow section order to vary by render
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. It is descriptive, stable, route-safe, and derived from the verified project rather than the rejected legacy post.

### Question 14 - Exact Contact Contract

Which exact limits and mailto format should the local composer use?

A) Trim all fields; name 1-100 characters, email 3-254 characters with a conservative email-shape check, message 1-5,000 characters; subject `Portfolio opportunity enquiry`; body lines `Name:`, `Reply-to:`, a blank line, then `Message:` and the visitor text
B) Name 1-40 characters, email 3-120 characters, message 1-500 characters; subject and body labels vary with each render
X) Other (please describe after the [Answer]: tag)

[Answer]: A

**Recommendation**: A. These stable limits accommodate genuine enquiries, respect the practical email-address maximum, and make encoding and error behavior deterministic.

## Extension Compliance

- **Security Baseline**: Disabled in workflow state; skipped.
- **Property-Based Testing**: Disabled in workflow state; skipped.
