# Security and Privacy Test Instructions

## Applicable Static Gate

Run the active boundary and U-07 semantic checks:

```bash
npm run check:portfolio
npm run check:contact-journal:active
npm run verify:contact-journal:active
```

These checks enforce the approved active graph and reject prohibited Contact/Journal behavior, unsafe routes or actions, unverified content, and legacy leakage.

## Contact Privacy Review

Confirm in source, tests, and a production preview that:

- the only recipient is the approved portfolio email;
- the form makes no `fetch`, XHR, storage, analytics, or logging call;
- validation rejects control characters and malformed addresses;
- subject and body values are encoded through the approved native URL path;
- the user sees a direct email fallback and no claim that a message was delivered;
- an interrupted or unavailable mail-client handoff does not erase the draft.

## Dependency Audit

When registry network access is available, run:

```bash
npm audit --audit-level=high
```

Record the timestamp, advisory IDs, affected dependency path, exploitability in this static application, and remediation decision. This command was not run during the current verified gate because registry-backed vulnerability data was outside the offline implementation evidence; no clean audit result is claimed.

## Manual Browser Checks

Use browser developer tools to confirm that Contact interaction and Journal navigation make no unexpected network request, set no new storage value or cookie, and create no unsafe inline HTML. Review the final static response headers in the deployed environment separately because GitHub Pages header control is outside the application bundle.

## Not Applicable

Authentication, authorization, session, API penetration, database injection, and server-side secret tests are not applicable because the site has no accounts, backend, API, or database.
