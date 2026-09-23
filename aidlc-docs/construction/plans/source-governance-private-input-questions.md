# U-01 Private Verification Input Resolution

> **Status: Blocking privacy input decision required. Do not place the phone value in this file, chat, audit, source control, or command output.**

## Context

- The non-echoing privacy scanner is implemented and its three synthetic example tests pass.
- The real scan stopped with `U01-PRI-MARKER-REQUIRED` because neither `PORTFOLIO_PRIVATE_PHONE_MARKER` nor an approved ignored marker file exists.
- No candidate manifest/public capability promotion has occurred.
- The byte-identical resume remains the sole intended document exception.

## Question 1 - Safe Marker Supply

How should the real document-only phone verification receive its private comparison marker?

A) Authorize a one-time local-only extraction from the supplied resume solely into process memory; never print, log, persist, snapshot, or include the value in evidence, and immediately run the non-echoing scan using only safe codes/counts/targets
B) I will create `.private/portfolio-phone-marker` locally with mode `0600`, place only the marker there, confirm the path is ignored, and then reply `resume` without including the value
X) Other (describe only the safe handling method after the [Answer]: tag; do not include the value)

[Answer]: A

## Execution Boundary

- [x] Implement the non-echoing privacy scanner and synthetic absent/leak/clean tests.
- [x] Run the real gate and record the safe blocking code without attempting to derive or print the missing value.
- [x] Receive and validate the safe marker-supply decision.
- [x] Execute the approved non-echoing real scan.
- [x] Remove any ephemeral marker material and verify no tracked/untracked public artifact contains it.
- [x] Mark Code Generation Step 18 complete only after the real scan passes.
