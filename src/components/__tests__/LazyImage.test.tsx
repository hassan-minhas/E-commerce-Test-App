/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LazyImage from "../LazyImage";

// Mock IntersectionObserver
beforeAll(() => {
  class IntersectionObserverMock {
    constructor(cb: any) {
      this.cb = cb;
    }
    cb: any;
    observe = jest.fn(() => {
      // Simulate intersection immediately
      this.cb([{ isIntersecting: true }]);
    });
    unobserve = jest.fn();
    disconnect = jest.fn();
  }
  // @ts-ignore
  global.IntersectionObserver = IntersectionObserverMock;
});

afterAll(() => {
  // @ts-ignore
  delete global.IntersectionObserver;
});

describe("LazyImage", () => {
  it("renders placeholder image initially", () => {
    render(
      <LazyImage
        src="/test.jpg"
        alt="Test image"
        placeholderSrc="/placeholder.jpg"
      />
    );
    // Placeholder image should be in the document
    const placeholder = screen.getAllByRole("img")[0];
    expect(placeholder).toHaveAttribute("src", "/placeholder.jpg");
  });

  it("renders main image when in view", () => {
    render(
      <LazyImage
        src="/test.jpg"
        alt="Test image"
        placeholderSrc="/placeholder.jpg"
      />
    );
    // Main image should be in the document (after intersection)
    const images = screen.getAllByRole("img");
    expect(images[1]).toHaveAttribute("src", "/test.jpg");
    expect(images[1]).toHaveAttribute("alt", "Test image");
  });

  it("shows main image after load", () => {
    render(
      <LazyImage
        src="/test.jpg"
        alt="Test image"
        placeholderSrc="/placeholder.jpg"
      />
    );
    const images = screen.getAllByRole("img");
    const mainImage = images[1];
    // Simulate image load
    fireEvent.load(mainImage);
    // The main image should now have opacity-100 class
    expect(mainImage.className).toMatch(/opacity-100/);
  });
});
