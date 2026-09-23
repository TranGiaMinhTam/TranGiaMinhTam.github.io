import { describe, expect, it } from "vitest";
import { contentId } from "../model/portfolio.types";
import {
  isApprovedResearchNoteDestination,
  projectAllocations,
  researchEvidenceManifest,
  researchNoteDestinations,
} from "./projectCatalog";

describe("U-04 closed project catalogs", () => {
  it("allocates each approved project to exactly one distinct research domain", () => {
    expect(
      projectAllocations.map(({ projectId, domain }) => [projectId, domain]),
    ).toEqual([
      [contentId("project-molecular-docking-model"), "computational-projects"],
      [contentId("project-cashew-testa-research"), "laboratory-research"],
      [contentId("project-sim-lse-data-analytics"), "data-stories"],
    ]);
    expect(
      new Set(projectAllocations.map(({ projectId }) => projectId)).size,
    ).toBe(3);
    expect(new Set(projectAllocations.map(({ domain }) => domain)).size).toBe(
      3,
    );
  });

  it("publishes clear contribution labels without a project-note destination", () => {
    expect(
      projectAllocations.map(({ contribution }) => contribution.label),
    ).toEqual([
      "Research assistant",
      "Research assistant",
      "Team-led project",
    ]);
    expect(researchNoteDestinations).toEqual([]);
    expect(
      isApprovedResearchNoteDestination("#/journal/sim-lse-data-analytics"),
    ).toBe(false);
    expect(isApprovedResearchNoteDestination("#/journal/former-owner")).toBe(
      false,
    );
    expect(isApprovedResearchNoteDestination("https://example.com")).toBe(
      false,
    );
  });

  it("publishes the 2026 docking collection and supported project evidence", () => {
    expect(researchEvidenceManifest).toHaveLength(9);
    expect(
      researchEvidenceManifest.filter(({ full }) => full.mediaKind === "image"),
    ).toHaveLength(6);
    expect(
      researchEvidenceManifest.filter(({ full }) => full.mediaKind === "pdf"),
    ).toHaveLength(3);
    expect(
      researchEvidenceManifest.every(
        ({ full }) =>
          !/(?:borsworth|worthgate|gys-brochure|academic-transcript)/i.test(
            full.path,
          ),
      ),
    ).toBe(true);
  });
});
