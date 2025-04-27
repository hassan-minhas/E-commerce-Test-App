import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductItem from "../ProductItem";
import "@testing-library/jest-dom";

const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 99.99,
  images: ["/test-image.jpg"],
  description: "A test product", // <-- Add this line
};

describe("ProductItem", () => {
  it("renders product details", () => {
    render(<ProductItem product={mockProduct} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(screen.getByText("Free Shipping")).toBeInTheDocument();
  });

  it("renders Add to Cart button and calls handler", () => {
    const onAddToCart = jest.fn();
    render(<ProductItem product={mockProduct} onAddToCart={onAddToCart} />);
    const addButton = screen.getByRole("button", { name: /add .* to cart/i });
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);
    expect(onAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it("renders Remove from Cart button and calls handler", () => {
    const onRemoveFromCart = jest.fn();
    render(
      <ProductItem
        product={mockProduct}
        isAddedToCart={true}
        onRemoveFromCart={onRemoveFromCart}
      />
    );
    const removeButton = screen.getByRole("button", { name: /remove .* from cart/i });
    expect(removeButton).toBeInTheDocument();
    fireEvent.click(removeButton);
    expect(onRemoveFromCart).toHaveBeenCalledWith(mockProduct);
  });

  it("renders as a link to the product page", () => {
    render(<ProductItem product={mockProduct} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/products/1");
  });
});