# End-to-End Review Instructions

## Current Coverage Boundary

The repository has no Playwright, Cypress, or other browser automation dependency. The approved browser-level gate is therefore a structured manual production-preview review backed by Vitest integration tests and active structural verifiers.

## Start the Production Preview

```bash
npm run build
npm run preview
```

Use the URL printed by Vite. Test a clean session in light and dark themes at 320, 768, 1280, and 1440 CSS pixels.

## Critical Journeys

1. Load the portfolio and traverse all ten sections using keyboard, navigation controls, and direct section hashes.
2. Confirm the hero identity, centered image subject, smaller section lettering, readable content width, and consistent spacing.
3. Inspect Research, Academic/Evidence, and Tools/Fieldwork for aligned columns, readable surfaces, and no clipped text or overflow.
4. Open the SIM-LSE Research Note from Data Stories; confirm loading, article, return, unknown-note, failure, and retry behavior.
5. Exercise Contact with empty, malformed, valid, Unicode, reserved-character, and maximum-length values; confirm first-invalid focus and exact local `mailto:` handoff.
6. Confirm the CV control is labeled as the future CV download and does not pretend a missing document exists.
7. Repeat navigation at 200-percent zoom, increased text spacing, reduced motion, and keyboard-only input.

## Pass Criteria

- No content is clipped, overlapped, or hidden horizontally.
- Reading order and focus order match the visible structure.
- Every interactive element has a visible focus state and an accurate label.
- Both themes preserve readable contrast and the same information hierarchy.
- Research facts, evidence labels, routes, and Contact behavior match the approved contracts.
- Returning from the Research Note restores a usable portfolio context.

The user approved all twelve U-07 rendered-review questions. This records manual acceptance, not automated cross-browser coverage.

## Future Automation

If browser automation is added later, cover the critical journeys above in Chromium, Firefox, and WebKit without weakening the existing unit, boundary, verifier, or byte-budget gates.
