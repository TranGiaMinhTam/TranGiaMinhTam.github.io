import { describe, expect, it } from "vitest";
import { verifiedPortfolioSource } from "../model/verifiedPortfolioSource";
import {
  buildMailtoUrl,
  CONTACT_LIMITS,
  CONTACT_SUBJECT,
  normalizeContactDraft,
  selectContactRecipient,
  validateContactDraft,
} from "./contactModel";

describe("U-07 contact model", () => {
  it("selects only the verified recipient", () => {
    const result = selectContactRecipient(verifiedPortfolioSource);
    expect(result).toEqual({
      ok: true,
      value: {
        recordId: "contact-email",
        name: "Tran Gia Minh Tam",
        email: "minhtamtrangia@gmail.com",
        directHref: "mailto:minhtamtrangia@gmail.com",
      },
      findings: [],
    });
  });

  it("normalizes, validates, and safely encodes a branded draft", () => {
    const raw = {
      name: "  Mentor & Team  ",
      email: " mentor+lab@example.org ",
      message: "Line one\r\nLine two? & yes",
    };
    expect(normalizeContactDraft(raw)).toEqual({
      name: "Mentor & Team",
      email: "mentor+lab@example.org",
      message: "Line one\nLine two? & yes",
    });
    const result = validateContactDraft(raw);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const url = buildMailtoUrl("minhtamtrangia@gmail.com", result.value);
    expect(url).toContain(`subject=${encodeURIComponent(CONTACT_SUBJECT)}`);
    expect(decodeURIComponent(url.split("&body=")[1])).toBe(
      "Name: Mentor & Team\nReply-to: mentor+lab@example.org\n\nMessage:\nLine one\nLine two? & yes",
    );
  });

  it("returns ordered field findings and rejects control characters and boundaries", () => {
    const result = validateContactDraft({
      name: "\u0007",
      email: "invalid\n@example.org",
      message: "x".repeat(CONTACT_LIMITS.message + 1),
    });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.findings.map(({ field, code }) => [field, code])).toEqual([
      ["name", "U07-CONTACT-CONTROL"],
      ["email", "U07-CONTACT-EMAIL"],
      ["message", "U07-CONTACT-MESSAGE"],
    ]);
  });

  it("rejects an unverified recipient at the encoding boundary", () => {
    const result = validateContactDraft({
      name: "Mentor",
      email: "mentor@example.org",
      message: "Hello",
    });
    if (!result.ok) throw new Error("Expected valid fixture.");
    expect(() => buildMailtoUrl("other@example.org", result.value)).toThrow(
      /verified contact boundary/,
    );
  });
});
