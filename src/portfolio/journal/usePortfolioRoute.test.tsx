import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { usePortfolioRoute } from "./usePortfolioRoute";

function Probe() {
  const route = usePortfolioRoute();
  return (
    <output>
      {route.kind === "article"
        ? route.descriptor.slug
        : route.kind === "not-found"
          ? route.slug
          : route.kind}
    </output>
  );
}

afterEach(() => {
  cleanup();
  window.history.replaceState(null, "", "#identity");
});

describe("U-07 portfolio route hook", () => {
  it("tracks hash and popstate changes without a second router", () => {
    window.history.replaceState(null, "", "#data-stories");
    render(<Probe />);
    expect(screen.getByText("continuous")).toBeInTheDocument();
    window.history.replaceState(null, "", "#/journal/sim-lse-data-analytics");
    fireEvent(window, new HashChangeEvent("hashchange"));
    expect(screen.getByText("sim-lse-data-analytics")).toBeInTheDocument();
    window.history.replaceState(null, "", "#/journal/not-indexed");
    fireEvent(window, new PopStateEvent("popstate"));
    expect(screen.getByText("not-indexed")).toBeInTheDocument();
  });
});
