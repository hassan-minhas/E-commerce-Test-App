"use client";

import { useState } from "react";
import Image from "next/image";
import Loader from "@/components/Loader";
import { Product } from "@/types";
import { useParams } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { useCart } from "@/context/CartContext";

export default function ProductPage() {
  const params = useParams();
  const {
    data: product,
    loading,
    error,
  } = useFetch<Product>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${params.id}`
  );

  const { cart, addToCart, removeFromCart } = useCart();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [isZoomed, setIsZoomed] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "description"
  );

  const sizes = ["S", "M", "L", "XL"];
  const colors = ["Black", "White", "Blue", "Red"];

  if (loading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;
  if (!product) return <div>Product not found</div>;

  const addedToCart = cart.some(
    (item) =>
      item.id === product.id &&
      item.size === selectedSize &&
      item.color === selectedColor
  );

  const handleAddToCart = () => {
    addToCart(
      {
        ...product,
        size: selectedSize,
        color: selectedColor,
        quantity,
      },
      quantity
    );
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="py-10 px-2 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto bg-white/90 rounded-2xl shadow-xl p-6 md:p-10">
        <div className="relative space-y-4">
          <div
            className="relative aspect-square w-full bg-gray-100 rounded-xl overflow-hidden cursor-zoom-in border-2 border-gray-200 hover:border-blue-200 transition"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          >
            <Image
              src={product?.images[selectedImageIndex] || ""}
              alt={product.title}
              fill
              className={`object-contain transition-transform duration-300 ${
                isZoomed ? "scale-150" : "scale-100"
              }`}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {product?.images?.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`relative w-20 h-20 flex-shrink-0 border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-150 ${
                  selectedImageIndex === index
                    ? "border-blue-600 ring-2 ring-blue-200"
                    : "border-gray-200 hover:border-blue-300"
                }`}
                aria-label={`Show image ${index + 1}`}
              >
                <Image
                  src={img}
                  alt={`${product.title} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              {product.title}
            </h1>
            <p className="mt-1 text-2xl font-bold text-blue-700">
              ${product?.price.toFixed(2)}
            </p>
          </div>

          {!addedToCart && (
            <>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Size</h3>
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg cursor-pointer font-medium transition ${
                        selectedSize === size
                          ? "border-blue-600 bg-blue-50 text-blue-600 shadow"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Color
                </h3>
                <div className="flex gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-lg cursor-pointer font-medium transition ${
                        selectedColor === color
                          ? "border-blue-600 bg-blue-50 text-blue-600 shadow"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Quantity
                </h3>
                <div className="flex items-center border border-gray-200 rounded-lg w-fit bg-gray-50">
                  <button
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-l-lg transition"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-200 bg-white font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-r-lg transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </>
          )}

          {addedToCart ? (
            <button
              onClick={handleRemoveFromCart}
              className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow"
            >
              Remove from Cart
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow"
            >
              Add to Cart
            </button>
          )}

          <div className="border-t pt-6 mt-6">
            <div className="space-y-4">
              {["description", "shipping", "returns"].map((section) => (
                <div key={section} className="border-b pb-4">
                  <button
                    onClick={() =>
                      setExpandedSection(
                        expandedSection === section ? null : section
                      )
                    }
                    className="flex justify-between items-center w-full text-left cursor-pointer group"
                  >
                    <span className="text-lg font-semibold capitalize">
                      {section}
                    </span>
                    <span
                      className={`ml-2 transform transition-transform group-hover:text-blue-600 ${
                        expandedSection === section ? "rotate-180 text-blue-600" : "text-gray-400"
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {expandedSection === section && (
                    <div className="mt-4 text-gray-600">
                      {section === "description"
                        ? product.description
                        : section === "shipping"
                        ? "Shipping is free."
                        : `You can return this product within 14 days`}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
