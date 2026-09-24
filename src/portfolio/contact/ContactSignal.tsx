import { useMemo, useRef, useState, type FormEvent } from "react";
import { verifiedPortfolioSource } from "../model/verifiedPortfolioSource";
import {
  browserMailtoHandoff,
  buildMailtoUrl,
  CONTACT_LIMITS,
  selectContactRecipient,
  validateContactDraft,
} from "./contactModel";
import type {
  ContactField,
  MailtoHandoff,
  RawContactDraft,
} from "./contact.types";
import { legacyContactPresentation, type ContactPresentation } from './contactPresentation'
import styles from "./Contact.module.css";

const emptyDraft: RawContactDraft = Object.freeze({
  name: "",
  email: "",
  message: "",
});

export function ContactSignal({
  handoff = browserMailtoHandoff,
  presentation = legacyContactPresentation,
}: Readonly<{ handoff?: MailtoHandoff; presentation?: ContactPresentation }>) {
  const recipient = useMemo(
    () => selectContactRecipient(verifiedPortfolioSource),
    [],
  );
  const [draft, setDraft] = useState<RawContactDraft>(emptyDraft);
  const [attempted, setAttempted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const validation = attempted ? validateContactDraft(draft) : undefined;
  const findings = validation && !validation.ok ? validation.findings : [];
  const errorFor = (field: ContactField) =>
    findings.find((item) => item.field === field);

  if (!recipient.ok) {
    return (
      <div
        className={styles.failure}
        role="status"
        data-testid="contact-source-failure"
      >
        <h3>Contact channel unavailable</h3>
        <p>The contact email could not be resolved.</p>
      </div>
    );
  }

  const update = (field: ContactField, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);
    const result = validateContactDraft(draft);
    if (!result.ok) {
      const first = result.findings.find(({ field }) => field)?.field;
      if (first === "name") nameRef.current?.focus();
      if (first === "email") emailRef.current?.focus();
      if (first === "message") messageRef.current?.focus();
      return;
    }
    handoff(buildMailtoUrl(recipient.value.email, result.value));
  };

  return (
    <div className={`${styles.contactSignal} ${presentation.layout === "portfolio" ? styles.portfolio : ""}`} data-testid="contact-body">
      <header className={styles.header}>
        <p>{presentation.eyebrow}</p>
        <h3>{presentation.heading}</h3>
        <p>{presentation.introduction}</p>
      </header>

      <aside
        className={styles.recipient}
        aria-label="Contact recipient"
      >
        <span>Recipient</span>
        <strong>{recipient.value.name}</strong>
        <a href={recipient.value.directHref} data-testid="contact-direct-email">
          {recipient.value.email}
        </a>
        <p>{presentation.recipientNote}</p>
      </aside>

      <form
        className={styles.composer}
        onSubmit={submit}
        noValidate
          aria-label={presentation.action}
      >
        <div className={styles.formIntro}>
          <span>{presentation.composerLabel}</span>
          <p>{presentation.privacy}</p>
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            ref={nameRef}
            name="name"
            autoComplete="name"
            value={draft.name}
            maxLength={CONTACT_LIMITS.name + 1}
            aria-invalid={Boolean(errorFor("name"))}
            aria-describedby={
              errorFor("name") ? "contact-name-error" : undefined
            }
            onChange={(event) => update("name", event.currentTarget.value)}
          />
          {errorFor("name") ? (
            <small id="contact-name-error">{errorFor("name")?.message}</small>
          ) : null}
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-email">Reply-to email</label>
          <input
            id="contact-email"
            ref={emailRef}
            name="email"
            type="email"
            autoComplete="email"
            value={draft.email}
            maxLength={CONTACT_LIMITS.email + 1}
            aria-invalid={Boolean(errorFor("email"))}
            aria-describedby={
              errorFor("email") ? "contact-email-error" : undefined
            }
            onChange={(event) => update("email", event.currentTarget.value)}
          />
          {errorFor("email") ? (
            <small id="contact-email-error">{errorFor("email")?.message}</small>
          ) : null}
        </div>

        <div className={`${styles.field} ${styles.message}`}>
          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            ref={messageRef}
            name="message"
            rows={8}
            value={draft.message}
            maxLength={CONTACT_LIMITS.message + 1}
            aria-invalid={Boolean(errorFor("message"))}
            aria-describedby="contact-message-guidance contact-message-error"
            onChange={(event) => update("message", event.currentTarget.value)}
          />
          <span className={styles.counter} id="contact-message-guidance">
            {draft.message.length} / {CONTACT_LIMITS.message}
          </span>
          {errorFor("message") ? (
            <small id="contact-message-error">
              {errorFor("message")?.message}
            </small>
          ) : (
            <span id="contact-message-error" />
          )}
        </div>

        {presentation.layout === "portfolio" ? <div className={styles.actionRow}>
          <p className={styles.handoffNote}>{presentation.handoffNote}</p>
          <button className={styles.submit} type="submit">
            {presentation.action} <span aria-hidden="true">↗</span>
          </button>
        </div> : <>
          <button className={styles.submit} type="submit">
            {presentation.action} <span aria-hidden="true">↗</span>
          </button>
          <p className={styles.handoffNote}>{presentation.handoffNote}</p>
        </>}
      </form>
    </div>
  );
}
