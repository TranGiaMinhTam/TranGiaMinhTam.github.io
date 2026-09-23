# U-07 Contact and Journal NFR Requirements

## Scope and Baseline

These requirements govern the final Contact body, the shared local-note descriptor, Data Stories discovery, hash-route orchestration, lazy Journal presentation, and any exact cleanup later authorized by the Code Generation plan.

The active U-06 baseline is 281,183 bytes of initial JavaScript, 46,045 bytes of initial CSS, and 24,195,314 bytes of inherited evidence. U-07 introduces no new evidence file, remote service, or runtime dependency.

## Performance and Loading

### U07-NFR-PER-001 - Initial Code Budget

- Initial JavaScript must not exceed 296,000 bytes before gzip.
- Initial JavaScript must not exceed 6 percent growth from 281,183 bytes, which yields a percentage ceiling of 298,054 bytes; the tighter 296,000-byte absolute ceiling governs.
- Initial CSS must not exceed 51,200 bytes before gzip.
- Measurement must traverse the Vite manifest from the active entry rather than total every emitted chunk as initial code.

### U07-NFR-PER-002 - Lazy Journal Budget and Split

- Journal presentation must be a separate manifest-visible lazy chunk.
- The Journal chunk must not belong to the continuous portfolio's initial request set.
- Journal JavaScript must not exceed 18,432 bytes before gzip.
- Journal-owned lazy CSS must not exceed 6,144 bytes before gzip.
- Entering the journal namespace is the only normal trigger for loading the Journal presentation chunk.

### U07-NFR-PER-003 - Evidence and Network Loading

- U-07 adds zero evidence bytes.
- The note may reference existing published evidence but must preserve its current on-demand document and lazy-image behavior.
- No journal content, form submission, route lookup, analytics, or telemetry request may be added.
- No large evidence file may load as part of the initial portfolio or initial Journal route request set without explicit user activation.

### U07-NFR-PER-004 - Rendered Performance

On a representative mobile profile, the candidate targets:

| Metric | Target |
| --- | ---: |
| Largest Contentful Paint | At or below 2.5 seconds |
| Cumulative Layout Shift | At or below 0.10 |
| Contact interaction latency | At or below 200 milliseconds |
| Journal route-entry interaction latency | At or below 200 milliseconds, excluding external evidence loading |

When no supported browser runner is available, the gate records browser timing as unavailable P1 evidence. It must not fabricate a passing result or treat the absence as a P0 code failure when all measurable code and layout gates pass.

## Capacity and Complexity

### U07-NFR-SCL-001 - Catalog Capacity

- Production publication cardinality remains exactly one approved note for this release.
- Deterministic fixtures must exercise sixteen descriptors, 112 ordered sections, and their evidence references.
- Catalog assembly and descriptor validation must use linear indexed passes.
- Route lookup must be constant-time after index construction or a single bounded linear lookup over the immutable catalog.
- Repeated assembly from identical input must produce byte-equivalent serializable output.

### U07-NFR-SCL-002 - Contact Validation Complexity

- Validation is linear in the combined name, email, and message length.
- It must not use catastrophic-backtracking regular expressions.
- The approved maximum draft must complete synchronously without visible blocking on supported devices.

## Privacy and Security

### U07-NFR-SEC-001 - Local-Only Contact Boundary

Contact source and behavior checks must reject:

- Browser storage use for drafts.
- `fetch`, XHR, beacon, WebSocket, form action, hidden submission, analytics, or telemetry.
- Recipient values not equal to the verified student address.
- Recipient schemes other than `mailto:`.
- Unsafe HTML injection or string-to-markup conversion.
- Control characters in name or visitor email.
- Raw subject or body query concatenation.

Subject and body must use standards-based encoding. Message line breaks remain content inside the encoded body, not mail header input.

### U07-NFR-SEC-002 - Route and Content Boundary

- Only the existing constrained lowercase kebab-case journal namespace is valid.
- Unknown slugs render as text and never enter markup injection APIs.
- Runtime Markdown discovery, dynamic arbitrary paths, remote content, and unbounded module imports are prohibited.
- The fact-only note must contain no reachable former-owner claim, professional-role claim, participant count, unverified result, or reflective legacy prose.

### U07-NFR-SEC-003 - Evidence Safety

- Evidence actions must reuse the existing manifest-resolved, same-origin publication contract.
- No unsafe URL scheme, external SVG reference, document embedding, or eager PDF load is permitted.
- Missing optional evidence removes only the action and records a localized finding.

## Compatibility and External Handoff

### U07-NFR-COM-001 - Mailto Compatibility

- Encoding must be deterministic for drafts through the full approved 5,000-character message limit.
- The site must not truncate, rewrite, or discard visitor content to accommodate one browser or email client.
- The site must not claim that opening a mailto URL succeeded or that a message was sent.
- The draft remains intact after the handoff attempt.
- The verified direct-email action remains visible at all times.
- Browser and email-client URL handling is recorded as an external compatibility limitation.

### U07-NFR-COM-002 - GitHub Pages Routing

- Deep links use hash routing only and require no server rewrite.
- A direct valid note URL, a valid unknown slug, a malformed hash, and a return to Data Stories must work under the existing static entry document.
- U-07 must not introduce a routing dependency or deployment configuration change.

## Reliability and Availability

### U07-NFR-REL-001 - Complete Route State Coverage

Deterministic tests and candidate review must cover:

1. Non-journal continuous portfolio.
2. Known journal article.
3. Valid unknown slug.
4. Malformed journal hash.
5. Lazy loading state.
6. Lazy chunk failure.
7. Return to Data Stories.

No state may produce blank output, an unbounded retry, or a history loop. Journal-owned failure states preserve theme and expose a Data Stories return.

### U07-NFR-REL-002 - Failure Isolation

- Invalid Contact source affects only the Contact body.
- Contact validation failure preserves the draft and all unrelated portfolio sections.
- Invalid required note source blocks only the note route and discovery action.
- Missing optional evidence preserves verified note text.
- Journal chunk failure preserves an accessible route-local recovery view.

### U07-NFR-REL-003 - Recovery

- Candidate work remains inactive until explicit rendered approval.
- Activation changes only the approved Contact body and route-composition seams.
- Exact pre-activation entry and registry content, hashes, and dependency state must be recorded.
- A P0 post-activation failure restores the recorded active seams through a recoverable patch.

## Accessibility and Usability

### U07-NFR-ACC-001 - Contact Accessibility

Acceptance requires evidence for:

- Persistent programmatic labels and descriptions.
- Native controls and submission behavior.
- Error summary plus field-level errors.
- First-invalid-field focus.
- Stable `aria-describedby` relationships.
- Visible focus and keyboard order.
- Textual, non-color validation meaning.
- Honest local-only privacy explanation and direct fallback.

### U07-NFR-ACC-002 - Journal Accessibility

Acceptance requires evidence for:

- One page heading and coherent article hierarchy.
- Route-entry focus on the article or not-found heading.
- Semantic sections and lists in approved order.
- Safe textual rendering of unknown slugs.
- Clear return actions before users become trapped in route states.
- Meaningful evidence-action names and no informational color-only visual.

### U07-NFR-ACC-003 - Zoom, Text Spacing, and Motion

- Contact, article, not-found, loading, failure, and validation states must reflow at 320 CSS pixels.
- All states must remain usable at 200-percent zoom and with increased text spacing.
- Document-level horizontal overflow, clipped controls, overlapping labels, and unreachable actions are P0 findings.
- Reduced-motion preference must disable nonessential scroll or transition effects.

## Responsive and Theme Acceptance

### U07-NFR-RSP-001 - Review Matrix

Rendered review covers Contact, valid note, unknown note, validation errors, and lazy failure at 320, 768, 1280, and 1440 CSS pixels in light and dark modes. It also covers long allowed inputs, long evidence labels, keyboard order, text spacing, 200-percent zoom, focus visibility, and document overflow.

### U07-NFR-RSP-002 - Structural Uniqueness

- Contact must read as a correspondence protocol, not a generic contact card.
- Journal must read as a scientific field-note sheet, not the rejected publication article, a generic blog card, or a copy of an earlier section composition.
- The same semantic order and actions remain available in both themes and at every supported width.

## Maintainability and Cleanup

### U07-NFR-MAI-001 - Owned Architecture

- Contact and Journal use strict typed contracts, pure selectors and validators, immutable descriptors, and view-model-only presentation.
- Exactly one Contact body key is registered.
- Data Stories and Journal consume the same neutral descriptor without cross-importing visual components.
- Stable purpose-based test identifiers cover controls, route states, and the canonical note.
- Candidate, active, boundary, lazy-manifest, recovery, and content-integrity checks are reproducible commands.

### U07-NFR-MAI-002 - Cleanup Proof

No removal is permitted unless the approved Code Generation plan names the exact target and records:

1. Incoming-import analysis from active and test entry points.
2. Content hash and file type.
3. Duplicate and alias inspection.
4. A recovery payload and restoration instruction.
5. Confirmation that the target contains no uniquely required approved content.
6. Post-removal strict types, focused and complete tests, lint, boundary checks, production build, and recovery verification.

Ambiguous, referenced, or unlisted targets remain untouched. Broad pattern or recursive deletion is prohibited.

## Acceptance Severity

- **P0**: Required source integrity, privacy/security, route state, accessibility, active registry, bundle ceiling, lazy split, no-network, lockfile, or approved cleanup proof failure. P0 blocks activation or triggers recovery.
- **P1**: Browser-version timing unavailable in the environment or external email-client handling not verifiable. P1 is recorded honestly and does not override a passing P0 gate.

## Traceability

| Requirement family | Functional rules | Stories |
| --- | --- | --- |
| Performance and loading | U07-NOT-009, U07-ROU-003 | ST-008, ST-018 |
| Capacity | U07-NOT-010, U07-ROU-003 | ST-008, ST-021 |
| Privacy and security | U07-CON-002, U07-CON-007 through U07-CON-012, U07-NOT-005 through U07-NOT-006 | ST-013, ST-015, ST-020 |
| Compatibility and reliability | U07-ROU-001 through U07-ROU-008 | ST-008, ST-020 |
| Accessibility and responsive | U07-UX-002 through U07-UX-009 | ST-015 through ST-019 |
| Maintainability and cleanup | U07-BND-001 through U07-BND-006 | ST-021 |

## Extension Compliance

- Security Baseline: disabled in workflow state; not enforced as an extension. U-07 product-specific privacy and security requirements above remain mandatory.
- Property-Based Testing: disabled in workflow state; not enforced as an extension. Deterministic boundary, capacity, repeated-run, routing, and encoding fixtures remain mandatory.
