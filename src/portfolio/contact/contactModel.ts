import type { VerifiedPortfolioSource } from "../model/portfolio.types";
import type {
  ContactDraftValidation,
  ContactField,
  ContactFinding,
  ContactFindingCode,
  ContactSelection,
  MailtoHandoff,
  MailtoUrl,
  NormalizedContactDraft,
  RawContactDraft,
  ValidContactDraft,
} from "./contact.types";

export const CONTACT_LIMITS = Object.freeze({
  name: 100,
  email: 254,
  message: 5000,
} as const);
export const CONTACT_SUBJECT = "Portfolio opportunity enquiry";
export const CONTACT_PRIVACY =
  "Your details stay in this page and are passed only to your own email application.";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const hasUnsupportedControl = (value: string) =>
  [...value].some((character) => {
    const code = character.charCodeAt(0);
    return code === 127 || (code < 32 && code !== 9 && code !== 10 && code !== 13);
  });

const finding = (
  code: ContactFindingCode,
  message: string,
  field?: ContactField,
): ContactFinding =>
  Object.freeze({ code, ...(field ? { field } : {}), message });

export function selectContactRecipient(
  source: VerifiedPortfolioSource,
): ContactSelection {
  const matches = source.records.filter(
    (record) =>
      record.status === "verified" &&
      record.kind === "contact" &&
      record.id === "contact-email",
  );
  if (matches.length !== 1) {
    return {
      ok: false,
      findings: Object.freeze([
        finding(
          "U07-CONTACT-RECIPIENT",
          "Exactly one verified contact recipient is required.",
        ),
      ]),
    };
  }
  const record = matches[0];
  const email =
    typeof record.facts.email === "string" ? record.facts.email.trim() : "";
  if (
    record.title !== "Email" ||
    email !== "minhtamtrangia@gmail.com" ||
    !EMAIL.test(email) ||
    hasUnsupportedControl(email)
  ) {
    return {
      ok: false,
      findings: Object.freeze([
        finding(
          "U07-CONTACT-RECIPIENT",
          "The verified contact recipient is invalid.",
        ),
      ]),
    };
  }
  return {
    ok: true,
    value: Object.freeze({
      recordId: record.id,
      name: "Tran Gia Minh Tam",
      email,
      directHref: `mailto:${email}`,
    }),
    findings: Object.freeze([]),
  };
}

export function normalizeContactDraft(
  draft: RawContactDraft,
): NormalizedContactDraft {
  return Object.freeze({
    name: draft.name.trim(),
    email: draft.email.trim(),
    message: draft.message.replace(/\r\n?/g, "\n").trim(),
  });
}

export function validateContactDraft(
  draft: RawContactDraft,
): ContactDraftValidation {
  const value = normalizeContactDraft(draft);
  const findings: ContactFinding[] = [];

  if (!value.name || value.name.length > CONTACT_LIMITS.name) {
    findings.push(
      finding(
        "U07-CONTACT-NAME",
        `Name must contain 1 to ${CONTACT_LIMITS.name} characters.`,
        "name",
      ),
    );
  } else if (hasUnsupportedControl(value.name)) {
    findings.push(
      finding(
        "U07-CONTACT-CONTROL",
        "Name contains an unsupported control character.",
        "name",
      ),
    );
  }

  if (
    value.email.length < 3 ||
    value.email.length > CONTACT_LIMITS.email ||
    !EMAIL.test(value.email)
  ) {
    findings.push(
      finding(
        "U07-CONTACT-EMAIL",
        "Enter a valid reply-to email address.",
        "email",
      ),
    );
  } else if (hasUnsupportedControl(value.email)) {
    findings.push(
      finding(
        "U07-CONTACT-CONTROL",
        "Email contains an unsupported control character.",
        "email",
      ),
    );
  }

  if (!value.message || value.message.length > CONTACT_LIMITS.message) {
    findings.push(
      finding(
        "U07-CONTACT-MESSAGE",
        `Message must contain 1 to ${CONTACT_LIMITS.message} characters.`,
        "message",
      ),
    );
  } else if (hasUnsupportedControl(value.message)) {
    findings.push(
      finding(
        "U07-CONTACT-CONTROL",
        "Message contains an unsupported control character.",
        "message",
      ),
    );
  }

  if (findings.length)
    return { ok: false, value, findings: Object.freeze(findings) };
  return {
    ok: true,
    value: value as ValidContactDraft,
    findings: Object.freeze([]),
  };
}

export function buildMailtoUrl(
  recipient: string,
  draft: ValidContactDraft,
): MailtoUrl {
  if (
    recipient !== "minhtamtrangia@gmail.com" ||
    !EMAIL.test(recipient) ||
    hasUnsupportedControl(recipient)
  ) {
    throw new Error(
      "Mailto recipient is outside the verified contact boundary.",
    );
  }
  const body = `Name: ${draft.name}\nReply-to: ${draft.email}\n\nMessage:\n${draft.message}`;
  return `mailto:${recipient}?subject=${encodeURIComponent(CONTACT_SUBJECT)}&body=${encodeURIComponent(body)}`;
}

export const browserMailtoHandoff: MailtoHandoff = (url) => {
  window.location.href = url;
};
