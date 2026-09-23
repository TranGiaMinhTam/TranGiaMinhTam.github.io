# U-07 Contact and Journal Business Logic Model

## Scope

U-07 completes the visitor journey with two local-only capabilities:

1. A Contact body that validates a visitor-authored draft and hands a safely encoded message to the visitor's email client.
2. A constrained journal-detail route that resolves one approved fact-only SIM-LSE project note, an accessible unknown-note state, or the existing continuous portfolio.

No workflow stores or transmits visitor input through the website. No legacy authored journal prose is accepted as source material.

## Canonical Source Flow

```text
verified contact record
  -> select one approved recipient
  -> ContactViewModel
  -> validate local draft
  -> normalized draft
  -> encoded mailto handoff

verified SIM-LSE project + allocation + evidence manifest
  -> assemble fact-only research note
  -> shared route descriptor
  -> Data Stories discovery action
  -> #/journal/sim-lse-data-analytics
  -> route resolution
  -> lazy research-note page or accessible not-found state
```

The diagram is a text-only flow. Its first branch describes contact selection and mailto composition. Its second branch describes verified project selection, canonical discovery, route resolution, and detail presentation.

## Contact Selection

`selectContact(source)` applies these steps:

1. Select records with kind `contact`, status `verified`, and the Contact section mapping.
2. Require exactly one record.
3. Require a nonempty email fact equal to the record summary after trimming.
4. Apply the conservative email-shape check used by the contact contract.
5. Return a `ContactViewModel` containing the recipient, direct mailto destination, privacy statement, and field limits.
6. Fail closed with deterministic findings when cardinality or recipient validity fails.

## Draft Normalization and Validation

`validateContactDraft(rawDraft, limits)` normalizes before validation:

- Trim leading and trailing whitespace from name and email.
- Normalize message line endings to line feed and trim only leading and trailing whitespace; preserve internal paragraphs.
- Require name length from 1 through 100 Unicode code points.
- Require email length from 3 through 254 characters and a conservative single-`@`, non-whitespace, dotted-domain shape.
- Require message length from 1 through 5,000 Unicode code points.
- Return all field findings in stable name, email, message order.
- Return the identifier of the first invalid field for focus movement.

No input is written to storage, sent through `fetch`, submitted to a server, or added to application telemetry.

## Mailto Composition

`buildMailtoUrl(recipient, normalizedDraft)`:

1. Revalidates the trusted recipient and accepts only a previously valid normalized draft.
2. Uses the fixed subject `Portfolio opportunity enquiry`.
3. Builds the body in this exact order:

```text
Name: {name}
Reply-to: {email}

Message:
{message}
```

4. Encodes subject and body with `URLSearchParams` or an equivalent standards-based encoder.
5. Returns a `mailto:` URL and never claims delivery.

On valid submission, the browser navigates to the mailto URL in the current context. The form state remains mounted so cancellation or email-client failure does not erase the draft. A direct mailto action is always present independently of the form.

## Research Note Assembly

`assembleResearchNote(source, allocations, evidenceManifest, descriptor)`:

1. Resolve exactly one verified project record with identifier `project-sim-lse-data-analytics`.
2. Require the analytical allocation and the exact `Team-led project` contribution disclosure.
3. Require the canonical descriptor:
   - slug: `sim-lse-data-analytics`
   - route: `#/journal/sim-lse-data-analytics`
   - title: `SIM-LSE Data Analytics: A Verified Project Note`
4. Project only verified values into Question, Context, Contribution, Methods, Tools, Timeline, and Evidence sections in that order.
5. Resolve only published evidence already referenced by the project.
6. Reject authorial reflection, participant counts, professional roles, findings, results, impact, or outcomes absent from the verified record.
7. Produce the same descriptor for U-04 discovery and U-07 route resolution from a neutral shared model catalog.

Missing optional evidence removes only the evidence action. A missing project, canonical descriptor, required project field, or contribution disclosure blocks the note and leaves the Contact body available.

## Journal Location Resolution

`resolveJournalLocation(hash, notes)` returns one of three states:

| Input | Result |
| --- | --- |
| Non-journal hash | `undefined`, so the continuous portfolio remains active |
| Exact approved route | `article` with the matching assembled note |
| Syntactically valid journal route with unknown slug | `not-found` with the attempted slug |

Malformed hashes never enter U-07 note resolution; the existing shell hash contract normalizes them. Route parsing does not perform network access, dynamic Markdown discovery, or open-ended module lookup.

## Route Transition and Return

- Journal presentation code is loaded only after a valid journal-namespace state is observed.
- The article or not-found heading receives programmatic focus after the route view mounts.
- The return action points to `#data-stories` and restores the continuous portfolio without a history loop.
- The existing shell locates Data Stories through its registered section target.

## Failure Partition

| Failure class | Visible result | Preserved behavior |
| --- | --- | --- |
| Contact source invalid | Local contact-unavailable status | Portfolio and journal remain available |
| Draft invalid | Error summary plus field errors | Draft remains local and editable |
| Email-client handoff unavailable | No false success; direct email remains visible | Draft remains intact |
| Required note source invalid | Note route unavailable or not-found | Contact and continuous portfolio remain available |
| Optional note evidence missing | Text note without that action | Verified note text remains available |
| Unknown valid slug | Accessible not-found page | Return to Data Stories |
| Malformed hash | Existing shell invalid-hash recovery | Continuous portfolio |

## Determinism

The same verified source, route descriptor, evidence manifest, and draft values always produce the same view models, findings, mailto URL, note order, and route decision. No current time, randomness, browser storage, remote response, or DOM measurement affects business logic.
