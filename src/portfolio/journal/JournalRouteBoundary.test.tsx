import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { JournalRouteBoundary } from "./JournalRouteBoundary";

afterEach(() => cleanup());

const Broken = () => {
  throw new Error("route failed");
};

describe("U-07 Journal route boundary", () => {
  it("contains route failure and exposes one manual retry", () => {
    const retry = vi.fn();
    const { rerender } = render(
      <JournalRouteBoundary resetKey={0} canRetry onRetry={retry}>
        <Broken />
      </JournalRouteBoundary>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("could not be loaded");
    fireEvent.click(screen.getByRole("button", { name: /Try once more/i }));
    expect(retry).toHaveBeenCalledTimes(1);
    rerender(
      <JournalRouteBoundary resetKey={0} canRetry={false} onRetry={retry}>
        <Broken />
      </JournalRouteBoundary>,
    );
    expect(
      screen.queryByRole("button", { name: /Try once more/i }),
    ).not.toBeInTheDocument();
  });
});
