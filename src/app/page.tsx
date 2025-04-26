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
      <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 py-12 md:py-20 bg-gradient-to-r from-blue-50 via-white to-orange-50 rounded-xl shadow-md">
        <div className="flex-1 text-center md:text-left px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Discover the Best Deals at{" "}
            <span className="text-blue-600 drop-shadow-lg">NextCart</span>
          </h1>
          <p className="text-gray-700 text-lg md:text-xl mb-8">
            Shop the latest products with{" "}
            <span className="font-semibold text-blue-600">
              unbeatable prices
            </span>{" "}
            and{" "}
            <span className="font-semibold text-orange-500">fast delivery</span>
            .
          </p>
          <Link
            href="/products"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-blue-700 transition"
          >
            Shop Now
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <Image
            src="/banner.webp"
            alt="Welcome to Our Store"
            width={440}
            height={340}
            className="w-full max-w-xs md:max-w-md h-auto rounded-lg shadow-lg"
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
              <ProductItem
                key={product.id}
                product={product}
                showAddToCartCta={false}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
