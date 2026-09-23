import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { academicEvidenceBodyRegistry } from "../academics/sectionBodies";
import { identityQuestionBodyRegistry } from "../identity/sectionBodies";
import { toolsFieldworkBodyRegistry } from "../impact/sectionBodies";
import { sectionRegistry } from "../model/sectionRegistry";
import {
  composePortfolioBodyRegistries,
  researchDataBodyRegistry,
} from "../research/sectionBodies";
import { SectionBodyResolver } from "../shell/SectionBodyResolver";
import { contactBodyRegistry } from "./sectionBodies";

afterEach(() => cleanup());

describe("U-07 Contact body registry", () => {
  it("owns only Contact and composes ten finished section bodies", () => {
    expect(Object.keys(contactBodyRegistry)).toEqual(["contact"]);
    const bodies = composePortfolioBodyRegistries(
      identityQuestionBodyRegistry,
      researchDataBodyRegistry,
      academicEvidenceBodyRegistry,
      toolsFieldworkBodyRegistry,
      contactBodyRegistry,
    );
    const { container } = render(
      <>
        {sectionRegistry.map((section) => (
          <div key={section.id}>
            <SectionBodyResolver
              section={section}
              bodies={bodies}
              onNavigate={() => false}
            />
          </div>
        ))}
      </>,
    );
    expect(Object.keys(bodies)).toHaveLength(10);
    expect(screen.getByTestId("contact-body")).toBeInTheDocument();
    expect(
      container.querySelectorAll('[data-testid^="temporary-section-body-"]'),
    ).toHaveLength(0);
    expect(() =>
      composePortfolioBodyRegistries(contactBodyRegistry, contactBodyRegistry),
    ).toThrow(/Duplicate section body/);
  });
});
