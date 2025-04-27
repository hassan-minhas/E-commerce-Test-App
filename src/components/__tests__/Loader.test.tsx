import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "../Loader";
import "@testing-library/jest-dom";

describe("Loader", () => {
  it("renders the spinner SVG", () => {
    render(<Loader />);
    // The SVG should be present and have the animate-spin class
    const svg = screen.getByRole("img", { hidden: true });
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("animate-spin");
  });

  it("has appropriate accessibility attributes", () => {
    render(<Loader />);
    const container = screen.getByRole("status");
    expect(container).toHaveAttribute("aria-live", "polite");
    expect(container).toHaveAttribute("aria-busy", "true");
  });

  it("renders visually hidden loading text", () => {
    render(<Loader />);
    const loadingText = screen.getByText("Loading...");
    expect(loadingText).toHaveClass("sr-only");
  });
});