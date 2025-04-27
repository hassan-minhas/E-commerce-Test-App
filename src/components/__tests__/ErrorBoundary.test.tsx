import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorBoundary from "../ErrorBoundary";
import "@testing-library/jest-dom";

// Helper component to throw error
function ProblemChild() {
  throw new Error("Test error");
  return null;
}

describe("ErrorBoundary", () => {
  it("renders children when no error", () => {
    render(
      <ErrorBoundary>
        <div>Safe Child</div>
      </ErrorBoundary>
    );
    expect(screen.getByText("Safe Child")).toBeInTheDocument();
  });

  it("displays error UI when error is thrown", () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
    expect(screen.getByText("Test error")).toBeInTheDocument();
    consoleError.mockRestore();
  });

  it("resets error state when Retry is clicked", () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /retry/i }));
    expect(screen.getByRole("alert")).toBeInTheDocument();
    consoleError.mockRestore();
  });

  it("renders Go Home link", () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(screen.getByRole("link", { name: /go home/i })).toBeInTheDocument();
    consoleError.mockRestore();
  });
});
