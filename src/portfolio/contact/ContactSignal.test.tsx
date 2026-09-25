import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactSignal } from "./ContactSignal";
import { portfolioContactPresentation } from './contactPresentation'

afterEach(() => cleanup());

describe("U-07 Contact signal", () => {
  it("renders labeled local fields, privacy copy, and direct fallback", () => {
    render(<ContactSignal />);
    expect(
      screen.getByRole("heading", { name: /clear research question/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Reply-to email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(screen.getByTestId("contact-email-draft-button")).toBeInTheDocument();
    expect(screen.getByTestId("contact-direct-email")).toHaveAttribute(
      "href",
      "mailto:minhtamtrangia@gmail.com",
    );
    expect(screen.getByText(/stay in this page/i)).toBeInTheDocument();
    expect(screen.queryByText(/sent|delivered/i)).not.toBeInTheDocument();
  });

  it("focuses the first invalid field and never invokes handoff", () => {
    const handoff = vi.fn();
    render(<ContactSignal handoff={handoff} />);
    fireEvent.click(
      screen.getByRole("button", { name: /prepare email draft/i }),
    );
    expect(screen.getByLabelText("Name")).toHaveFocus();
    expect(screen.getByText(/Name must contain/i)).toHaveAttribute(
      "id",
      "contact-name-error",
    );
    expect(handoff).not.toHaveBeenCalled();
  });

  it("hands off one encoded mailto URL and keeps the draft visible", () => {
    const handoff = vi.fn();
    render(<ContactSignal handoff={handoff} />);
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Research Mentor" },
    });
    fireEvent.change(screen.getByLabelText("Reply-to email"), {
      target: { value: "mentor@example.org" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "Could we discuss the data project?" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: /prepare email draft/i }),
    );
    expect(handoff).toHaveBeenCalledTimes(1);
    expect(handoff.mock.calls[0][0]).toMatch(
      /^mailto:minhtamtrangia@gmail\.com\?subject=/,
    );
    expect(screen.getByLabelText("Message")).toHaveValue(
      "Could we discuss the data project?",
    );
    expect(screen.queryByText(/sent|delivered/i)).not.toBeInTheDocument();
  });

  it("uses inclusive personal-portfolio copy and an accurate email-app action in the candidate", () => {
    render(<ContactSignal presentation={portfolioContactPresentation} />);
    expect(screen.getByRole("heading", { name: "Let us connect." })).toBeInTheDocument();
    expect(screen.getByText(/project, collaboration, opportunity, or question/i)).toBeInTheDocument();
    expect(screen.getByText(/nothing is submitted or stored/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /open email draft/i })).toBeInTheDocument();
    expect(screen.queryByText(/research mentorship/i)).not.toBeInTheDocument();
  });
});
