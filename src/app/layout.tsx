"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { CartProvider } from "@/context/CartContext";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <CartProvider>
      <html lang="en">
        <body
          className={
            inter.className +
            " bg-gradient-to-br from-blue-50 via-white to-orange-50 text-gray-900 min-h-screen"
          }
        >
          {drawerOpen && (
            <div className="fixed inset-0 z-40 flex md:hidden">
              <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={() => setDrawerOpen(false)}
              ></div>
              <div className="relative bg-white/90 backdrop-blur-lg w-72 h-full shadow-2xl z-50 flex flex-col p-8 rounded-r-2xl animate-slide-in-left border-r border-gray-100">
                <div className="flex items-center gap-3 mb-10">
                  <Image
                    src="/logo.png"
                    alt="NextCart Logo"
                    width={36}
                    height={36}
                    className="h-9 w-auto"
                    priority
                  />
                  <span className="text-2xl font-extrabold text-gray-900">
                    NextCart
                  </span>
                </div>
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                >
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <nav className="flex flex-col gap-8 mt-2">
                  <Link
                    href="/"
                    className="text-gray-700 hover:text-blue-600 font-semibold text-lg rounded transition-colors duration-150"
                    onClick={() => setDrawerOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/products"
                    className="text-gray-700 hover:text-blue-600 font-semibold text-lg rounded transition-colors duration-150"
                    onClick={() => setDrawerOpen(false)}
                  >
                    Products
                  </Link>
                  <Link
                    href="/cart"
                    className="text-gray-700 hover:text-blue-600 font-semibold text-lg rounded transition-colors duration-150"
                    onClick={() => setDrawerOpen(false)}
                  >
                    Cart
                  </Link>
                </nav>
              </div>
            </div>
          )}
          <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-30 border-b border-gray-100">
            <nav className="px-4 md:px-6 mx-auto max-w-7xl h-20 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  className="text-2xl font-extrabold text-gray-900 flex items-center tracking-tight"
                >
                  <Image
                    src="/logo.png"
                    alt="NextCart Logo"
                    width={40}
                    height={40}
                    className="h-10 w-auto mr-2 drop-shadow"
                    priority
                  />
                  <span>NextCart</span>
                </Link>
              </div>
              <div className="hidden md:flex items-center gap-8">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-150"
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-150"
                >
                  Products
                </Link>
                <Link
                  href="/cart"
                  className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-150"
                >
                  Cart
                </Link>
              </div>
              <button
                className="md:hidden flex items-center justify-center p-2 rounded-lg hover:bg-blue-50 transition"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
              >
                <svg
                  className="h-8 w-8 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </nav>
          </header>

          <main className="min-h-[calc(100vh-112px)] bg-transparent px-4 md:px-6 lg:mx-auto max-w-7xl">
            {children}
          </main>

          <footer className="bg-white/80 backdrop-blur-md border-t border-gray-100 mt-8 shadow-inner">
            <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-auto max-w-7xl py-8">
              <p className="text-center text-gray-500 font-medium tracking-wide">
                © 2025 NextCart. All rights reserved.
              </p>
            </div>
          </footer>
          <style jsx global>{`
            @keyframes slide-in-left {
              from {
                transform: translateX(-100%);
              }
              to {
                transform: translateX(0);
              }
            }
            .animate-slide-in-left {
              animation: slide-in-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
          `}</style>
        </body>
      </html>
    </CartProvider>
  );
}
