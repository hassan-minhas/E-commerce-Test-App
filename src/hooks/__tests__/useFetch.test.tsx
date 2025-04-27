/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook } from "@testing-library/react";
import { useFetch } from "../useFetch";

// Helper to flush promises
const flushPromises = () => new Promise(setImmediate);

describe("useFetch", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should set loading true initially", async () => {
    global.fetch = jest.fn(
      () => new Promise(() => {}) // never resolves
    ) as any;
    const { result } = renderHook(() => useFetch("https://example.com"));
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("should fetch data successfully", async () => {
    const mockData = { foo: "bar" };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    ) as any;

    const { result } = renderHook(() => useFetch("https://example.com"));
    await flushPromises();
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it("should handle fetch error", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      })
    ) as any;

    const { result } = renderHook(() => useFetch("https://example.com"));
    await flushPromises();
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toMatch(/HTTP error/);
  });

  it("should handle network error", async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error("Network error"))
    ) as any;

    const { result } = renderHook(() => useFetch("https://example.com"));
    await flushPromises();
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe("Network error");
  });
});
