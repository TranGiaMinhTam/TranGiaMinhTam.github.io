import { useEffect, useRef } from "react";
import type { ResearchNote } from "./journal.types";
import styles from "./JournalRoute.module.css";

export function ResearchNotePage({ note }: Readonly<{ note: ResearchNote }>) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => heading.current?.focus(), []);

  return (
    <article
      className={styles.note}
      data-testid={`research-note-page-${note.descriptor.slug}`}
    >
      <header className={styles.noteHeader}>
        <div className={styles.indexBlock} aria-hidden="true">
          <span>RN</span>
          <strong>{String(note.descriptor.order).padStart(2, "0")}</strong>
        </div>
        <div>
          <p>Local research note / project record</p>
          <h1 ref={heading} tabIndex={-1}>
            {note.descriptor.title}
          </h1>
          <p>
            This note arranges project facts for review. It does not
            infer outcomes beyond the supplied record.
          </p>
        </div>
      </header>

      <div className={styles.noteBody}>
        {note.sections.map((item) => (
          <section
            className={styles.noteSection}
            key={item.id}
            data-section-kind={item.kind}
          >
            <div className={styles.sectionIndex}>
              <span>{String(item.order).padStart(2, "0")}</span>
              <h2>{item.label}</h2>
            </div>
            {item.kind === "evidence" ? (
              note.evidence.length ? (
                <ul className={styles.evidenceList}>
                  {note.evidence.map((capability) => (
                    <li key={capability.id}>
                      <div>
                        <strong>{capability.title}</strong>
                        <p>{capability.caption}</p>
                      </div>
                      <a
                        href={capability.evidence.full.source}
                        target="_blank"
                        rel="noreferrer"
                        data-testid={`journal-evidence-${capability.id}`}
                      >
                        Open evidence <span aria-hidden="true">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.omission}>
                  No optional published evidence is available for this note.
                </p>
              )
            ) : item.values.length > 1 ? (
              <ul className={styles.valueList}>
                {item.values.map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            ) : (
              <p className={styles.prose}>{item.values[0]}</p>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}
