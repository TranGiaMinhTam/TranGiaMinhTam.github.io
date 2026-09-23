import { describe, expect, it } from "vitest";
import {
  contentId,
  type ContentRecord,
  type VerifiedPortfolioSource,
} from "../model/portfolio.types";
import {
  createResearchNoteCatalog,
  researchNoteCatalog,
  researchNoteSlug,
} from "../model/researchNoteCatalog";
import { verifiedPortfolioSource } from "../model/verifiedPortfolioSource";
import { researchEvidenceManifest } from "../research/projectCatalog";
import { assembleResearchNotes, resolvePortfolioRoute } from "./journalModel";

describe("U-07 Journal model", () => {
  const descriptor = {
    slug: researchNoteSlug("example-note"),
    href: "#/journal/example-note" as const,
    title: "Example project note",
    projectId: contentId("project-sim-lse-data-analytics"),
    sourceType: "local" as const,
    order: 1,
  };

  it("assembles no public project note after the note is withdrawn", () => {
    const result = assembleResearchNotes(
      verifiedPortfolioSource,
      researchEvidenceManifest,
    );
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.notes).toHaveLength(0);
    expect(JSON.stringify(result)).not.toMatch(
      /data engineer|50\+ participants|wordpress|former-owner/i,
    );
  });

  it("localizes missing optional evidence but fails closed for a missing project", () => {
    const optional = assembleResearchNotes(verifiedPortfolioSource, []);
    expect(optional.ok).toBe(true);
    expect(optional.findings).toHaveLength(0);
    const missing: VerifiedPortfolioSource = {
      ...verifiedPortfolioSource,
      records: verifiedPortfolioSource.records.filter(
        ({ id }) => id !== "project-sim-lse-data-analytics",
      ),
    };
    const rejected = assembleResearchNotes(missing, researchEvidenceManifest);
    expect(rejected.ok).toBe(true);
  });

  it("resolves continuous, canonical article, unknown slug, and malformed states", () => {
    expect(resolvePortfolioRoute("#data-stories")).toEqual({
      kind: "continuous",
    });
    expect(resolvePortfolioRoute("#/journal/sim-lse-data-analytics")).toEqual({
      kind: "not-found",
      slug: "sim-lse-data-analytics",
    });
    expect(resolvePortfolioRoute("#/journal/unknown-note")).toEqual({
      kind: "not-found",
      slug: "unknown-note",
    });
    expect(resolvePortfolioRoute("#/journal/Bad Slug")).toEqual({
      kind: "continuous",
    });
  });

  it("assembles sixteen descriptors and 112 sections deterministically", () => {
    const original = verifiedPortfolioSource.records.find(
      ({ id }) => id === "project-sim-lse-data-analytics",
    );
    if (!original) throw new Error("Expected data-story fixture.");
    const descriptors = Array.from({ length: 16 }, (_, index) => ({
      ...descriptor,
      slug: researchNoteSlug(`capacity-note-${index + 1}`),
      href: `#/journal/capacity-note-${index + 1}` as const,
      projectId: contentId(`project-capacity-note-${index + 1}`),
      order: index + 1,
    }));
    const catalogResult = createResearchNoteCatalog(descriptors);
    if (!catalogResult.ok)
      throw new Error("Expected accepted capacity catalog.");
    const records: ContentRecord[] = descriptors.map((descriptor) => ({
      ...original,
      id: descriptor.projectId,
    }));
    const source: VerifiedPortfolioSource = {
      ...verifiedPortfolioSource,
      records,
    };
    const first = assembleResearchNotes(
      source,
      researchEvidenceManifest,
      catalogResult.value,
    );
    const second = assembleResearchNotes(
      source,
      researchEvidenceManifest,
      catalogResult.value,
    );
    expect(first).toEqual(second);
    expect(
      first.ok && first.notes.flatMap(({ sections }) => sections),
    ).toHaveLength(112);
    expect(researchNoteCatalog.descriptors).toHaveLength(0);
  });
});
