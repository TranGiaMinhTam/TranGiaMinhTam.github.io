import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ComputationalProjects } from "./ComputationalProjects";
import { DataStories } from "./DataStories";
import { LaboratoryResearch } from "./LaboratoryResearch";
import { researchDataSelection } from "./sectionBodies";

afterEach(() => cleanup());

const selection = researchDataSelection.ok
  ? researchDataSelection.value
  : undefined;

const expectEquivalentRelationships = (
  container: HTMLElement,
  domain: string,
) => {
  const visual = [...container.querySelectorAll("[data-visual-relationship]")]
    .map((node) => node.getAttribute("data-visual-relationship"))
    .filter(Boolean)
    .sort();
  const semantic = [
    ...within(screen.getByTestId(`${domain}-relationship-summary`))
      .getAllByRole("listitem"),
  ]
    .map((node) => node.getAttribute("data-semantic-row-id"))
    .filter(Boolean)
    .sort();
  expect(visual).toEqual(semantic);
  expect(container.querySelector('table')).toBeNull();
};

describe("U-04 research bodies", () => {
  it("renders a computational pipeline with complete verified context and equivalent semantics", () => {
    if (!selection) throw new Error("Expected accepted U-04 selection.");
    const { container } = render(
      <ComputationalProjects model={selection.computational} />,
    );
    expect(
      screen.getByRole("heading", {
        name: /computational docking help compare/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Research assistant"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Computational method pipeline"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("computational-projects-publication-protein-docking-publication-evidence-link"),
    ).toHaveAttribute("target", "_blank");
    expect(
      screen.getAllByLabelText(/2026 protein docking project visuals/i)[0],
    ).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(1);
    expect(screen.getByRole("img")).toHaveAttribute(
      "alt",
      expect.stringMatching(/research team with the molecular docking poster at the 2026 pharmacy conference/i),
    );
    expectEquivalentRelationships(container, "computational-projects");
  });

  it("renders a specimen-to-assay bench and keeps facts after figure failure", () => {
    if (!selection) throw new Error("Expected accepted U-04 selection.");
    const { container } = render(
      <LaboratoryResearch model={selection.laboratory} />,
    );
    expect(
      screen.getByLabelText("Specimen-to-assay laboratory sequence"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Prototype boundary · no outcome inferred"),
    ).toBeInTheDocument();
    const image = screen.getByTestId(
      "laboratory-research-figure-cashew-polyphenol-figure-evidence-image",
    );
    fireEvent.error(image);
    expect(
      screen.getByTestId("laboratory-research-figure-cashew-polyphenol-figure-evidence-link-fallback"),
    ).toHaveTextContent("Project figure unavailable");
    expect(
      screen.getByRole("heading", { name: /agricultural by-product/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Ultrasound-assisted extraction")).toHaveLength(
      2,
    );
    expectEquivalentRelationships(container, "laboratory-research");
  });

  it("renders an analytical signal sheet without unsupported visual or note claims", () => {
    if (!selection) throw new Error("Expected accepted U-04 selection.");
    const { container } = render(<DataStories model={selection.dataStory} />);
    expect(
      screen.getByLabelText("Analytical workflow signal sheet"),
    ).toBeInTheDocument();
    expect(screen.getByText("Team-led project")).toBeInTheDocument();
    expect(screen.queryByTestId("data-stories-note-discovery")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Top 10 Finalist — SIM-LSE Data Analytics Challenge" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "1st Place — Future Innovator Camp" })).toBeInTheDocument();
    expect(screen.getByTestId("future-innovator-first-place-preview-image")).toHaveAttribute("loading", "lazy");
    expect(screen.getByText(/received first prize and VND 5 million/i)).toBeInTheDocument();
    const signalSheet = screen.getByLabelText("Analytical workflow signal sheet");
    expect(within(signalSheet).getByText("Step")).toBeInTheDocument();
    expect(within(signalSheet).getByText("Method")).toBeInTheDocument();
    expect(container.querySelector('[aria-label="Analytical workflow signal sheet"] i')).not.toBeInTheDocument();
    expect(
      screen.getByTestId("data-stories-certificate-sim-lse-certificate-evidence-link"),
    ).toHaveAccessibleName(/certificate.*PDF.*new tab/i);
    expect(screen.getByLabelText("SIM-LSE project evidence")).toBeInTheDocument();
    expect(container.textContent).not.toMatch(
      /wordpress|dashboard metric|repository/i,
    );
    expectEquivalentRelationships(container, "data-stories");
  });
});
