import type {
  ContentId,
  EvidenceId,
  PublishedEvidence,
} from "../model/portfolio.types";
import type {
  ResearchNoteDescriptor,
  ResearchNoteSlug,
} from "../model/researchNoteCatalog";

export type ResearchNoteSectionKind =
  | "question"
  | "context"
  | "contribution"
  | "methods"
  | "tools"
  | "timeline"
  | "evidence";

export type ResearchNoteEvidence = Readonly<{
  id: EvidenceId;
  title: string;
  caption: string;
  evidence: PublishedEvidence;
}>;

export type ResearchNoteSection = Readonly<{
  id: string;
  kind: ResearchNoteSectionKind;
  label: string;
  order: number;
  values: readonly string[];
}>;

export type ResearchNote = Readonly<{
  id: ContentId;
  descriptor: ResearchNoteDescriptor;
  sections: readonly ResearchNoteSection[];
  evidence: readonly ResearchNoteEvidence[];
}>;

export type JournalFindingCode =
  | "U07-JOURNAL-PROJECT"
  | "U07-JOURNAL-FIELD"
  | "U07-JOURNAL-EVIDENCE-OPTIONAL"
  | "U07-JOURNAL-EVIDENCE-INVALID"
  | "U07-JOURNAL-DESCRIPTOR";

export type JournalFinding = Readonly<{
  code: JournalFindingCode;
  severity: "blocking" | "optional";
  target: string;
  message: string;
}>;

export type ResearchNoteSelection =
  | Readonly<{
      ok: true;
      notes: readonly ResearchNote[];
      bySlug: ReadonlyMap<ResearchNoteSlug, ResearchNote>;
      findings: readonly JournalFinding[];
    }>
  | Readonly<{ ok: false; findings: readonly JournalFinding[] }>;

export type JournalRouteLocation =
  | Readonly<{ kind: "continuous" }>
  | Readonly<{ kind: "article"; descriptor: ResearchNoteDescriptor }>
  | Readonly<{ kind: "not-found"; slug: string }>;
