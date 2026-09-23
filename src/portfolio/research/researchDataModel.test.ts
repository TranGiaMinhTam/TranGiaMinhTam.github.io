import { describe, expect, it } from "vitest";
import { evidenceManifest } from "../model/evidenceManifest";
import {
  contentId,
  type ContentRelationship,
  type VerifiedPortfolioSource,
} from "../model/portfolio.types";
import { verifiedPortfolioSource } from "../model/verifiedPortfolioSource";
import {
  assembleResearchData,
  projectSemanticRows,
  validateResearchRelationships,
  withoutEvidence,
} from "./researchDataModel";
import type { ResearchRelationship } from "./research.types";

const withRecords = (
  records: VerifiedPortfolioSource["records"],
): VerifiedPortfolioSource => ({
  ...verifiedPortfolioSource,
  records,
});

describe("assembleResearchData", () => {
  it("assembles three exact domains with transparent contribution and deterministic relationships", () => {
    const first = assembleResearchData(
      verifiedPortfolioSource,
      evidenceManifest,
    );
    const second = assembleResearchData(
      verifiedPortfolioSource,
      evidenceManifest,
    );
    expect(first).toEqual(second);
    expect(first.ok).toBe(true);
    if (!first.ok) throw new Error("Expected accepted U-04 source.");

    expect(Object.values(first.value).map(({ domain }) => domain)).toEqual([
      "computational-projects",
      "laboratory-research",
      "data-stories",
    ]);
    expect(first.value.computational.contribution.label).toBe(
      "Research assistant",
    );
    expect(first.value.laboratory.contribution.label).toBe(
      "Research assistant",
    );
    expect(first.value.dataStory.contribution.label).toBe("Team-led project");
    expect(first.value.dataStory.destinations).toEqual([]);

    for (const project of Object.values(first.value)) {
      expect(project.methods.length).toBeGreaterThan(0);
      expect(project.tools.length).toBeGreaterThan(0);
      expect(project.time.label).not.toBe("");
      expect(
        project.semanticRows.map(({ relationshipId }) => relationshipId),
      ).toEqual(project.relationships.map(({ id }) => id));
      expect(new Set(project.relationships.map(({ id }) => id))).toHaveLength(
        project.relationships.length,
      );
    }
  });

  it("preserves complete project text when optional figure evidence is absent", () => {
    const result = assembleResearchData(
      verifiedPortfolioSource,
      withoutEvidence(evidenceManifest, "evidence-docking-research-completion"),
    );
    expect(result.ok).toBe(true);
    if (!result.ok)
      throw new Error("Optional evidence must not reject selection.");
    expect(result.findings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "U04-EVIDENCE-OPTIONAL-MISSING",
          severity: "optional",
        }),
      ]),
    );
    expect(result.value.computational.question).toMatch(
      /computational docking/i,
    );
    expect(result.value.computational.methods).toHaveLength(4);
    expect(result.value.computational.evidence).toHaveLength(5);
  });

  it("fails closed for missing, duplicate, malformed, and misallocated required projects", () => {
    const computationalId = contentId("project-molecular-docking-model");
    const computational = verifiedPortfolioSource.records.find(
      ({ id }) => id === computationalId,
    );
    if (!computational)
      throw new Error("Expected computational source fixture.");

    const cases: readonly VerifiedPortfolioSource[] = [
      withRecords(
        verifiedPortfolioSource.records.filter(
          ({ id }) => id !== computationalId,
        ),
      ),
      withRecords([...verifiedPortfolioSource.records, computational]),
      withRecords(
        verifiedPortfolioSource.records.map((record) =>
          record.id === computationalId
            ? { ...record, facts: { ...record.facts, methods: [] } }
            : record,
        ),
      ),
      withRecords(
        verifiedPortfolioSource.records.map((record) =>
          record.id === computationalId
            ? { ...record, kind: "laboratory-project" }
            : record,
        ),
      ),
    ];
    const codes = cases.flatMap((source) => {
      const result = assembleResearchData(source, evidenceManifest);
      expect(result.ok).toBe(false);
      return result.findings.map(({ code }) => code);
    });
    expect(codes).toEqual(
      expect.arrayContaining([
        "U04-PROJECT-CARDINALITY",
        "U04-PROJECT-DUPLICATE",
        "U04-PROJECT-FIELD",
        "U04-PROJECT-ALLOCATION",
      ]),
    );
  });

  it("rejects unsafe evidence while keeping former-owner writing outside the model", () => {
    const unsafe = evidenceManifest.map((record) =>
      record.id === "evidence-sim-lse-certificate"
        ? {
            ...record,
            full: {
              ...record.full,
              source: "https://former-owner.example/post",
            },
          }
        : record,
    );
    const result = assembleResearchData(verifiedPortfolioSource, unsafe);
    expect(result.ok).toBe(false);
    expect(result.findings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "U04-EVIDENCE-INVALID" }),
      ]),
    );
    expect(
      JSON.stringify(
        assembleResearchData(verifiedPortfolioSource, evidenceManifest),
      ),
    ).not.toMatch(/wordpress|first-local-journal|former-owner/i);
  });

  it("projects a 36-relationship capacity fixture in one stable pass", () => {
    const relationships: ResearchRelationship[] = Array.from(
      { length: 36 },
      (_, index) => ({
        id: `capacity:${index + 1}`,
        projectId: contentId(`capacity-project-${Math.floor(index / 6) + 1}`),
        targetId: `capacity-target-${index + 1}`,
        targetLabel: `Capacity target ${index + 1}`,
        kind: (
          [
            "uses-method",
            "uses-tool",
            "occurred-during",
            "supported-by",
          ] as const
        )[index % 4],
        order: index + 1,
        textMarker: `M${index + 1}`,
      }),
    );
    const rows = projectSemanticRows(relationships);
    expect(rows).toHaveLength(36);
    expect(rows.map(({ relationshipId }) => relationshipId)).toEqual(
      relationships.map(({ id }) => id),
    );
    expect(projectSemanticRows(relationships)).toEqual(rows);
  });

  it("reports duplicate relationships and broken endpoints deterministically", () => {
    const relationship: ResearchRelationship = {
      id: "relationship-1",
      projectId: contentId("capacity-project-1"),
      targetId: "missing-endpoint",
      targetLabel: "Missing",
      kind: "uses-method",
      order: 1,
      textMarker: "M",
    };
    expect(
      validateResearchRelationships([relationship, relationship], new Set()),
    ).toEqual([
      expect.objectContaining({
        code: "U04-RELATIONSHIP-ENDPOINT",
        target: "relationship-1",
      }),
      expect.objectContaining({
        code: "U04-RELATIONSHIP-ENDPOINT",
        target: "relationship-1",
      }),
      expect.objectContaining({
        code: "U04-RELATIONSHIP-DUPLICATE",
        target: "relationship-1",
      }),
    ]);
  });

  it("does not alter the approved source relationship contract", () => {
    const sourceRelationships: readonly ContentRelationship[] =
      verifiedPortfolioSource.relationships;
    expect(
      sourceRelationships.every(
        ({ kind }) => kind === "motivates" || kind === "supported-by",
      ),
    ).toBe(true);
  });
});
