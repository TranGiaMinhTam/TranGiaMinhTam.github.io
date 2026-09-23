import { verifiedPortfolioSource } from "../model/verifiedPortfolioSource";
import { researchEvidenceManifest } from "../research/projectCatalog";
import type { JournalEntryProps } from "./JournalRoute";
import { JournalNotFound } from "./JournalNotFound";
import { assembleResearchNotes } from "./journalModel";
import { ResearchNotePage } from "./ResearchNotePage";
import styles from "./JournalRoute.module.css";

const researchNoteSelection = assembleResearchNotes(
  verifiedPortfolioSource,
  researchEvidenceManifest,
);

export default function JournalRouteEntry({ location }: JournalEntryProps) {
  if (location.kind === "not-found")
    return <JournalNotFound slug={location.slug} />;
  if (!researchNoteSelection.ok) {
    return (
      <section className={styles.failure} role="status">
        <h1>Research note unavailable</h1>
        <p>
          {researchNoteSelection.findings.map(({ code }) => code).join(" · ")}
        </p>
      </section>
    );
  }
  const note = researchNoteSelection.bySlug.get(location.descriptor.slug);
  return note ? (
    <ResearchNotePage note={note} />
  ) : (
    <JournalNotFound slug={location.descriptor.slug} />
  );
}
