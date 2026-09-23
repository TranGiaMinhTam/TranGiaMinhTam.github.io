import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { JournalNotFound } from "./JournalNotFound";
import { JournalRoute, type JournalEntryProps } from "./JournalRoute";
import JournalRouteEntry from "./JournalRouteEntry";

afterEach(() => {
  cleanup();
  window.history.replaceState(null, "", "#identity");
});

describe("U-07 Journal presentation", () => {
  it("renders an accessible unknown-slug state with a Data Stories return", () => {
    render(<JournalNotFound slug="not-indexed" />);
    expect(
      screen.getByRole("heading", { name: /note is not available/i }),
    ).toHaveFocus();
    expect(
      screen.getByRole("link", { name: /Browse the Data Stories project/i }),
    ).toHaveAttribute("href", "#data-stories");
  });

  it("keeps a return action outside the lazy route and rejects the removed article", async () => {
    window.history.replaceState(null, "", "#/journal/sim-lse-data-analytics");
    const Entry = ({ location }: JournalEntryProps) => (
      <JournalRouteEntry location={location} />
    );
    render(
      <JournalRoute entryComponent={Entry}>
        <p>Continuous portfolio</p>
      </JournalRoute>,
    );
    expect(
      screen.getByRole("link", { name: /Return to Data Stories/i }),
    ).toHaveAttribute("href", "#data-stories");
    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: /note is not available/i }),
      ).toBeInTheDocument(),
    );
    expect(screen.queryByText("Continuous portfolio")).not.toBeInTheDocument();
  });
});
