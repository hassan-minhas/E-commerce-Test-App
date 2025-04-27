import React from "react";
import { render, screen } from "@testing-library/react";
import { CartProvider, useCart } from "../CartContext";
import "@testing-library/jest-dom";

const TestComponent = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  return (
    <div>
      <button
        onClick={() =>
          addToCart({
            id: 1,
            title: "Test",
            price: 10,
            images: [],
            description: "desc",
            quantity: 1,
            size: "M",
            color: "Red",
          })
        }
      >
        Add
      </button>
      <button onClick={() => removeFromCart(1)}>Remove</button>
      <button onClick={clearCart}>Clear</button>
      <div data-testid="cart">{JSON.stringify(cart)}</div>
    </div>
  );
};

describe("CartContext", () => {
  it("adds item to cart", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    screen.getByText("Add").click();
    expect(screen.getByTestId("cart")).toHaveTextContent('"id":1');
  });

  it("removes item from cart", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    screen.getByText("Add").click();
    screen.getByText("Remove").click();
    expect(screen.getByTestId("cart")).not.toHaveTextContent('"id":1');
  });

  it("clears the cart", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    screen.getByText("Add").click();
    screen.getByText("Clear").click();
    expect(screen.getByTestId("cart")).toHaveTextContent("[]");
  });

  it("throws error if useCart is used outside provider", () => {
    // Suppress error boundary output
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    const Broken = () => {
      useCart(); // This will throw immediately if not inside provider
      return null;
    };
    expect(() => render(<Broken />)).toThrow(
      "useCart must be used within a CartProvider"
    );
    spy.mockRestore();
  });
});
