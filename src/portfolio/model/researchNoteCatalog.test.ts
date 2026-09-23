import { describe, expect, it } from "vitest";
import { contentId } from "./portfolio.types";
import {
  createResearchNoteCatalog,
  researchNoteCatalog,
  researchNoteDescriptors,
  researchNoteDiscovery,
  researchNoteSlug,
} from "./researchNoteCatalog";

describe("U-07 research-note catalog", () => {
  const descriptor = {
    slug: researchNoteSlug("example-note"),
    href: "#/journal/example-note" as const,
    title: "Example project note",
    projectId: contentId("project-example"),
    sourceType: "local" as const,
    order: 1,
  };

  it("publishes no project-note destination", () => {
    expect(researchNoteDiscovery).toEqual(researchNoteDescriptors);
    expect(researchNoteDescriptors).toEqual([]);
    expect(researchNoteCatalog.bySlug.size).toBe(0);
    expect(researchNoteCatalog.byProjectId.size).toBe(0);
  });

  it("rejects invalid routes and duplicate identities in stable order", () => {
    const result = createResearchNoteCatalog([
      descriptor,
      { ...descriptor, href: "#/journal/wrong", order: 2 },
    ]);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.findings.map(({ code }) => code)).toEqual([
      "U07-NOTE-DESCRIPTOR-ROUTE",
      "U07-NOTE-DESCRIPTOR-DUPLICATE-SLUG",
      "U07-NOTE-DESCRIPTOR-DUPLICATE-PROJECT",
    ]);
  });

  it("keeps deterministic order for a sixteen-note capacity fixture", () => {
    const descriptors = Array.from({ length: 16 }, (_, index) => ({
      ...descriptor,
      slug: researchNoteSlug(`note-${String(index + 1).padStart(2, "0")}`),
      href: `#/journal/note-${String(index + 1).padStart(2, "0")}` as const,
      projectId: contentId(`project-capacity-${index + 1}`),
      order: 16 - index,
    }));
    const first = createResearchNoteCatalog(descriptors);
    const second = createResearchNoteCatalog(descriptors);
    expect(first).toEqual(second);
    expect(first.ok && first.value.descriptors).toHaveLength(16);
  });
});
