import type { ContentId } from "../model/portfolio.types";

export type MailtoUrl = `mailto:${string}`;

export type ContactRecipient = Readonly<{
  recordId: ContentId;
  name: string;
  email: string;
  directHref: MailtoUrl;
}>;

export type ContactField = "name" | "email" | "message";

export type RawContactDraft = Readonly<Record<ContactField, string>>;
export type NormalizedContactDraft = Readonly<Record<ContactField, string>>;
export type ValidContactDraft = NormalizedContactDraft & {
  readonly __brand: "ValidContactDraft";
};

export type ContactFindingCode =
  | "U07-CONTACT-RECIPIENT"
  | "U07-CONTACT-NAME"
  | "U07-CONTACT-EMAIL"
  | "U07-CONTACT-MESSAGE"
  | "U07-CONTACT-CONTROL";

export type ContactFinding = Readonly<{
  code: ContactFindingCode;
  field?: ContactField;
  message: string;
}>;

export type ContactSelection =
  | Readonly<{ ok: true; value: ContactRecipient; findings: readonly [] }>
  | Readonly<{ ok: false; findings: readonly ContactFinding[] }>;

export type ContactDraftValidation =
  | Readonly<{ ok: true; value: ValidContactDraft; findings: readonly [] }>
  | Readonly<{
      ok: false;
      value: NormalizedContactDraft;
      findings: readonly ContactFinding[];
    }>;

export type MailtoHandoff = (url: MailtoUrl) => void;
