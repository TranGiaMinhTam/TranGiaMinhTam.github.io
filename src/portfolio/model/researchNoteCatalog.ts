import type { ContentId } from "./portfolio.types";

export type ResearchNoteSourceType = "local";
export type ResearchNoteSlug = string & {
  readonly __brand: "ResearchNoteSlug";
};
export type ResearchNoteHref = `#/journal/${string}`;

export type ResearchNoteDescriptor = Readonly<{
  slug: ResearchNoteSlug;
  href: ResearchNoteHref;
  title: string;
  projectId: ContentId;
  sourceType: ResearchNoteSourceType;
  order: number;
}>;

export type ResearchNoteCatalogFindingCode =
  | "U07-NOTE-DESCRIPTOR-FIELD"
  | "U07-NOTE-DESCRIPTOR-ROUTE"
  | "U07-NOTE-DESCRIPTOR-DUPLICATE-SLUG"
  | "U07-NOTE-DESCRIPTOR-DUPLICATE-PROJECT";

export type ResearchNoteCatalogFinding = Readonly<{
  code: ResearchNoteCatalogFindingCode;
  target: string;
  message: string;
}>;

export type ResearchNoteCatalog = Readonly<{
  descriptors: readonly ResearchNoteDescriptor[];
  bySlug: ReadonlyMap<ResearchNoteSlug, ResearchNoteDescriptor>;
  byProjectId: ReadonlyMap<ContentId, ResearchNoteDescriptor>;
}>;

export type ResearchNoteCatalogResult =
  | Readonly<{ ok: true; value: ResearchNoteCatalog; findings: readonly [] }>
  | Readonly<{ ok: false; findings: readonly ResearchNoteCatalogFinding[] }>;

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const researchNoteSlug = (value: string) => value as ResearchNoteSlug;

const finding = (
  code: ResearchNoteCatalogFindingCode,
  target: string,
  message: string,
): ResearchNoteCatalogFinding => Object.freeze({ code, target, message });

export function createResearchNoteCatalog(
  input: readonly ResearchNoteDescriptor[],
): ResearchNoteCatalogResult {
  const findings: ResearchNoteCatalogFinding[] = [];
  const bySlug = new Map<ResearchNoteSlug, ResearchNoteDescriptor>();
  const byProjectId = new Map<ContentId, ResearchNoteDescriptor>();
  const ordered = [...input].sort(
    (left, right) =>
      left.order - right.order || left.slug.localeCompare(right.slug),
  );

  for (const descriptor of ordered) {
    if (
      !SLUG.test(descriptor.slug) ||
      !descriptor.title.trim() ||
      descriptor.order < 1 ||
      descriptor.sourceType !== "local"
    ) {
      findings.push(
        finding(
          "U07-NOTE-DESCRIPTOR-FIELD",
          descriptor.slug,
          "Research-note descriptor fields are invalid.",
        ),
      );
    }
    if (descriptor.href !== `#/journal/${descriptor.slug}`) {
      findings.push(
        finding(
          "U07-NOTE-DESCRIPTOR-ROUTE",
          descriptor.slug,
          "Research-note href must match its canonical slug.",
        ),
      );
    }
    if (bySlug.has(descriptor.slug)) {
      findings.push(
        finding(
          "U07-NOTE-DESCRIPTOR-DUPLICATE-SLUG",
          descriptor.slug,
          "Research-note slug is duplicated.",
        ),
      );
    }
    if (byProjectId.has(descriptor.projectId)) {
      findings.push(
        finding(
          "U07-NOTE-DESCRIPTOR-DUPLICATE-PROJECT",
          descriptor.projectId,
          "Research project has more than one local note.",
        ),
      );
    }
    bySlug.set(descriptor.slug, descriptor);
    byProjectId.set(descriptor.projectId, descriptor);
  }

  if (findings.length) return { ok: false, findings: Object.freeze(findings) };
  return {
    ok: true,
    value: Object.freeze({
      descriptors: Object.freeze(ordered),
      bySlug,
      byProjectId,
    }),
    findings: Object.freeze([]),
  };
}

export const researchNoteDescriptors = Object.freeze(
  [] as const satisfies readonly ResearchNoteDescriptor[],
);

export const researchNoteCatalogResult = createResearchNoteCatalog(
  researchNoteDescriptors,
);

if (!researchNoteCatalogResult.ok) {
  throw new Error(
    `Invalid research-note catalog: ${researchNoteCatalogResult.findings.map(({ code }) => code).join(", ")}`,
  );
}

export const researchNoteCatalog = researchNoteCatalogResult.value;

export const researchNoteDiscovery = Object.freeze(
  researchNoteCatalog.descriptors.map(
    ({ slug, href, title, projectId, sourceType, order }) =>
      Object.freeze({ slug, href, title, projectId, sourceType, order }),
  ),
);
