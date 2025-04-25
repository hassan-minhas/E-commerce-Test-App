"use client";

import { useRef, useState } from "react";
import Loader from "@/components/Loader";
import ProductItem from "@/components/ProductItem";
import { Product } from "@/types";

export default function ProductsPage() {
  const productsPerPage = 8;
  const firstLoading = useRef(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

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

  useState(() => {
    if (products.length === 0 && !firstLoading.current) {
      firstLoading.current = true;
      loadMore();
    }
  }, []);

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">
        All Products
      </h1>
      {error && <div className="text-red-600 mb-4">Error: {error.message}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-8 flex flex-col gap-8 justify-center">
        {loading && <Loader />}
        {!allLoaded && products.length > 0 && (
          <button
            onClick={loadMore}
            disabled={loading}
            className="mx-auto px-6 py-3 w-40 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
        {allLoaded && (
          <span className="text-gray-500">No more products to load.</span>
        )}
      </div>
    </div>
  );
}
