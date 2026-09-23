import { useEffect, useRef } from "react";
import styles from "./JournalRoute.module.css";

export function JournalNotFound({ slug }: Readonly<{ slug: string }>) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => heading.current?.focus(), []);
  return (
    <section
      className={styles.notFound}
      aria-labelledby="journal-not-found-heading"
      data-testid="journal-not-found"
    >
      <p>Research note / not indexed</p>
      <h1 ref={heading} id="journal-not-found-heading" tabIndex={-1}>
        This note is not available.
      </h1>
      <p>
        The requested identifier <code>{slug}</code> does not match a published
        local research note.
      </p>
      <a href="#data-stories">Browse the Data Stories project</a>
    </section>
  );
}
