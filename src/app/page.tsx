"use client";

import Link from "next/link";
import Image from "next/image";
import Loader from "@/components/Loader";
import ProductItem from "@/components/ProductItem";
import { Product } from "@/types";
import { useFetch } from "@/hooks/useFetch";

export default function HomePage() {
  const {
    data: products,
    loading,
    error,
  } = useFetch<Product[]>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?offset=0&limit=8`
  );

  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 py-8 md:py-16">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Discover the Best Deals at{" "}
            <span className="text-blue-600">NextCart</span>
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Shop the latest products with unbeatable prices and fast delivery.
          </p>
          <Link
            href="/products"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Shop Now
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <Image
            src="/banner.png"
            alt="Shopping"
            width={400}
            height={320}
            className="w-full max-w-xs md:max-w-md h-auto"
            priority
          />
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center md:text-left">
            Featured Products
          </h2>
          <Link
            href="/products"
            className="text-blue-600 hover:underline font-medium text-sm"
          >
            Show All
          </Link>
        </div>
        {error ? (
          <div className="text-red-600">Error: {error.message}</div>
        ) : loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products?.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
