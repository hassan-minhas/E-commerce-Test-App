"use client";

import { useEffect, useRef, useState } from "react";
import Loader from "@/components/Loader";
import ProductItem from "@/components/ProductItem";
import { CartItem, Product } from "@/types";
import { Waypoint } from "react-waypoint";
import { useCart } from "@/context/CartContext";

interface ProductAddToCartModalProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onConfirm: (item: CartItem) => void;
}

function ProductAddToCartModal({
  open,
  product,
  onClose,
  onConfirm,
}: ProductAddToCartModalProps) {
  const [size, setSize] = useState("S");
  const [color, setColor] = useState("Black");
  const [quantity, setQuantity] = useState(1);

  if (!open || !product) return null;

  const sizes = ["S", "M", "L", "XL"];
  const colors = ["Black", "White", "Blue", "Red"];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-10 px-2"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-to-cart-title"
      aria-describedby="add-to-cart-desc"
      tabIndex={-1}
    >
      <div className="bg-white p-4 sm:p-8 rounded-lg w-full max-w-sm sm:max-w-md shadow-lg" role="document">
        <h2 id="add-to-cart-title" className="text-xl font-bold mb-4 text-center">Add to Cart</h2>
        <div id="add-to-cart-desc" className="mb-4">
          <div className="font-semibold text-center">{product.title}</div>
          <div className="text-gray-500 text-center">${product.price.toFixed(2)}</div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Size</label>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-3 py-1 rounded border w-1/4 sm:w-auto ${
                  size === s
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300"
                }`}
                aria-pressed={size === s}
                aria-label={`Select size ${s}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Color</label>
          <div className="flex flex-wrap gap-2">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`px-3 py-1 rounded border w-1/4 sm:w-auto ${
                  color === c
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300"
                }`}
                aria-pressed={color === c}
                aria-label={`Select color ${c}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Quantity</label>
          <div className="flex items-center border border-gray-200 rounded-md w-full max-w-xs mx-auto">
            <button
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              className="cursor-pointer px-3 py-1 w-1/3"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-4 w-1/3 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="cursor-pointer px-3 py-1 w-1/3"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 w-full sm:w-auto" aria-label="Cancel add to cart">
            Cancel
          </button>
          <button
            onClick={() => {
              if (!size || !color) return;
              onConfirm({ ...product, size, color, quantity });
              onClose();
            }}
            className="cursor-pointer px-4 py-2 rounded bg-blue-600 text-white w-full sm:w-auto"
            disabled={!size || !color}
            aria-label="Confirm add to cart"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const productsPerPage = 8;
  const firstLoading = useRef(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { cart, addToCart, removeFromCart } = useCart();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  const loadMore = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?offset=${offset}&limit=${productsPerPage}`
      );
      if (!res.ok) throw new Error("Failed to fetch products");
      const data: Product[] = await res.json();
      if (data.length === 0) {
        setAllLoaded(true);
      } else {
        setProducts((prev) => [...prev, ...data]);
        setOffset((prev) => prev + productsPerPage);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (products.length === 0 && !firstLoading.current) {
      firstLoading.current = true;
      loadMore();
    }
  }, []);

  const handleAddToCartClick = (product: Product) => {
    setModalProduct(product);
    setModalOpen(true);
  };

  const handleConfirmAddToCart = (productWithOptions: CartItem) => {
    addToCart(productWithOptions);
  };

  const handleRemoveFromCart = (product: Product) => {
    removeFromCart(product.id);
  };

  return (
    <div className="py-8" role="main">
      <ProductAddToCartModal
        open={modalOpen}
        product={modalProduct}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmAddToCart}
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">
        All Products
      </h1>
      {error && <div className="text-red-600 mb-4" aria-live="polite">Error: {error.message}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onAddToCart={handleAddToCartClick}
            onRemoveFromCart={handleRemoveFromCart}
            isAddedToCart={Boolean(cart.find((item) => item.id === product.id))}
          />
        ))}
      </div>
      <div className="mt-8 flex flex-col gap-8 justify-center">
        {loading && <div aria-live="polite"><Loader /></div>}
        {!allLoaded && !loading && products.length > 0 && (
          <Waypoint onEnter={loadMore} />
        )}
        {allLoaded && (
          <span className="text-gray-500 mx-auto mt-12">
            No more products to load.
          </span>
        )}
      </div>
    </div>
  );
}
