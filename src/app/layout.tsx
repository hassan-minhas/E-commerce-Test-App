"use client";

// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "E-commerce Store",
//   description: "A modern e-commerce store built with Next.js",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-white text-gray-900"}>
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <nav className="px-4 md:px-6 mx-auto max-w-7xl h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-xl font-bold text-gray-900 flex items-center"
              >
                <Image
                  src="/logo.png"
                  alt="NextCart Logo"
                  width={32}
                  height={32}
                  className="h-8 w-auto mr-2"
                  priority
                />
                <span>NextCart</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Products
              </Link>
              <Link
                href="/cart"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Cart (0)
              </Link>
            </div>
          </nav>
        </header>

        <main className="min-h-[calc(100vh-112px)] bg-white px-4 md:px-6 lg:mx-auto max-w-7xl">
          {children}
        </main>

        <footer className="bg-white border-t border-gray-200">
          <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-auto max-w-7xl py-8">
            <p className="text-center text-gray-500">
              © 2025 NextCart. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
