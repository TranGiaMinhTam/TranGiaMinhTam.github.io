import type {
  ContentRecord,
  EvidenceRecord,
  PublishedEvidence,
  VerifiedPortfolioSource,
} from "../model/portfolio.types";
import {
  researchNoteCatalog,
  type ResearchNoteCatalog,
  type ResearchNoteDescriptor,
  type ResearchNoteSlug,
} from "../model/researchNoteCatalog";
import { resolveSectionHash } from "../shell/sectionHash";
import type {
  JournalFinding,
  JournalFindingCode,
  JournalRouteLocation,
  ResearchNote,
  ResearchNoteEvidence,
  ResearchNoteSection,
  ResearchNoteSelection,
  ResearchNoteSectionKind,
} from "./journal.types";

const nonEmpty = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;
const stringList = (value: unknown): readonly string[] | undefined =>
  Array.isArray(value) && value.length > 0 && value.every(nonEmpty)
    ? value
    : undefined;

const finding = (
  code: JournalFindingCode,
  severity: JournalFinding["severity"],
  target: string,
  message: string,
): JournalFinding => Object.freeze({ code, severity, target, message });

const section = (
  descriptor: ResearchNoteDescriptor,
  kind: ResearchNoteSectionKind,
  label: string,
  order: number,
  values: readonly string[],
): ResearchNoteSection =>
  Object.freeze({
    id: `${descriptor.slug}:${kind}`,
    kind,
    label,
    order,
    values: Object.freeze([...values]),
  });

function resolvePublishedEvidence(
  record: ContentRecord,
  byId: ReadonlyMap<string, EvidenceRecord>,
  findings: JournalFinding[],
): readonly ResearchNoteEvidence[] {
  return Object.freeze(
    record.evidenceIds.flatMap((id) => {
      const evidence = byId.get(id);
      if (!evidence) {
        findings.push(
          finding(
            "U07-JOURNAL-EVIDENCE-OPTIONAL",
            "optional",
            id,
            "Optional research-note evidence is unavailable.",
          ),
        );
        return [];
      }
      const hasScheme = /^[a-z][a-z\d+.-]*:/i.test(evidence.full.source);
      if (
        evidence.status !== "published" ||
        !nonEmpty(evidence.title) ||
        !nonEmpty(evidence.full.source) ||
        hasScheme
      ) {
        findings.push(
          finding(
            "U07-JOURNAL-EVIDENCE-INVALID",
            "blocking",
            id,
            "Research-note evidence is outside the approved publication boundary.",
          ),
        );
        return [];
      }
      return [
        Object.freeze({
          id,
          title: evidence.title,
          caption: evidence.caption,
          evidence: evidence as PublishedEvidence,
        }),
      ];
    }),
  );
}

function assembleNote(
  source: VerifiedPortfolioSource,
  evidenceById: ReadonlyMap<string, EvidenceRecord>,
  descriptor: ResearchNoteDescriptor,
  findings: JournalFinding[],
): ResearchNote | undefined {
  const matches = source.records.filter(
    (record) =>
      record.status === "verified" && record.id === descriptor.projectId,
  );
  if (matches.length !== 1 || matches[0]?.kind !== "data-story") {
    findings.push(
      finding(
        "U07-JOURNAL-PROJECT",
        "blocking",
        descriptor.projectId,
        "Exactly one verified data-story project must resolve for the note.",
      ),
    );
    return undefined;
  }
  const record = matches[0];
  const methods = stringList(record.facts.methods);
  const tools = stringList(record.facts.tools);
  if (
    !nonEmpty(record.title) ||
    !nonEmpty(record.summary) ||
    !nonEmpty(record.period) ||
    !methods ||
    !tools
  ) {
    findings.push(
      finding(
        "U07-JOURNAL-FIELD",
        "blocking",
        record.id,
        "Question, context, methods, tools, and timeline are required.",
      ),
    );
    return undefined;
  }
  const evidence = resolvePublishedEvidence(record, evidenceById, findings);
  const sections = Object.freeze([
    section(descriptor, "question", "Question", 1, [record.title]),
    section(descriptor, "context", "Context", 2, [record.summary]),
    section(descriptor, "contribution", "Contribution", 3, [
      "Team-led project",
    ]),
    section(descriptor, "methods", "Methods", 4, methods),
    section(descriptor, "tools", "Tools", 5, tools),
    section(descriptor, "timeline", "Timeline", 6, [record.period]),
    section(
      descriptor,
      "evidence",
      "Evidence",
      7,
      evidence.map(({ title }) => title),
    ),
  ]);
  return Object.freeze({ id: record.id, descriptor, sections, evidence });
}

export function assembleResearchNotes(
  source: VerifiedPortfolioSource,
  evidence: readonly EvidenceRecord[],
  catalog: ResearchNoteCatalog = researchNoteCatalog,
): ResearchNoteSelection {
  const findings: JournalFinding[] = [];
  const evidenceById = new Map(evidence.map((item) => [item.id, item]));
  const notes: ResearchNote[] = [];
  const bySlug = new Map<ResearchNoteSlug, ResearchNote>();

  for (const descriptor of catalog.descriptors) {
    if (
      catalog.bySlug.get(descriptor.slug) !== descriptor ||
      catalog.byProjectId.get(descriptor.projectId) !== descriptor
    ) {
      findings.push(
        finding(
          "U07-JOURNAL-DESCRIPTOR",
          "blocking",
          descriptor.slug,
          "Catalog indexes do not resolve the canonical descriptor.",
        ),
      );
      continue;
    }
    const note = assembleNote(source, evidenceById, descriptor, findings);
    if (note) {
      notes.push(note);
      bySlug.set(descriptor.slug, note);
    }
  }

  if (findings.some(({ severity }) => severity === "blocking")) {
    return { ok: false, findings: Object.freeze(findings) };
  }
  return {
    ok: true,
    notes: Object.freeze(notes),
    bySlug,
    findings: Object.freeze(findings),
  };
}

export function resolvePortfolioRoute(
  rawHash: string,
  catalog: ResearchNoteCatalog = researchNoteCatalog,
): JournalRouteLocation {
  const resolution = resolveSectionHash(rawHash);
  if (resolution.kind !== "journal") return { kind: "continuous" };
  const slug = resolution.hash.slice("#/journal/".length) as ResearchNoteSlug;
  const descriptor = catalog.bySlug.get(slug);
  return descriptor
    ? { kind: "article", descriptor }
    : { kind: "not-found", slug };
}
