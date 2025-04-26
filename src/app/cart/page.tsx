"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="py-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center tracking-tight">
        Your Cart
      </h1>
      {cart.length === 0 ? (
        <div className="text-center text-gray-500 bg-white rounded-lg shadow p-8">
          <span className="block mb-2 text-lg">Your cart is empty.</span>
          <Link
            href="/products"
            className="inline-block mt-2 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <ul className="space-y-6 mb-10">
            {cart.map((item) => (
              <li
                key={`${item.id}-${item.size}-${item.color}`}
                className="flex items-center bg-white rounded-lg shadow p-4"
              >
                <div className="w-24 h-24 relative mr-6 flex-shrink-0 rounded overflow-hidden border border-gray-100 bg-gray-50">
                  <Image
                    src={item.images?.[0] || "/placeholder.png"}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-lg text-gray-900 truncate">
                    {item.title}
                  </div>
                  <div className="flex gap-4 mt-1 text-sm text-gray-500">
                    <span>
                      Size:{" "}
                      <span className="font-medium text-gray-700">
                        {item.size}
                      </span>
                    </span>
                    <span>
                      Color:{" "}
                      <span className="font-medium text-gray-700">
                        {item.color}
                      </span>
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-4">
                    <span className="text-gray-500 text-sm">
                      Quantity:{" "}
                      <span className="font-medium text-gray-700">
                        {item.quantity}
                      </span>
                    </span>
                    <span className="text-xl font-bold text-blue-700">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  <Link
                    href={`/products/${item.id}`}
                    className="inline-block mt-3 px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition font-semibold text-sm"
                  >
                    View Product
                  </Link>
                </div>
                <button
                  className="ml-6 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition font-semibold cursor-pointer"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mb-10 bg-white rounded-lg shadow px-6 py-4">
            <span className="text-2xl font-bold text-gray-900">Total:</span>
            <span className="text-3xl font-extrabold text-blue-700">
              ${total.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <button
              className="bg-gray-100 px-8 py-3 rounded-lg font-bold text-gray-700 border border-gray-300 shadow hover:bg-gray-200 hover:shadow-md transition cursor-pointer"
              onClick={clearCart}
            >
              🗑️ Clear Cart
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-10 py-3 rounded-lg font-bold shadow hover:from-blue-700 hover:to-blue-600 hover:shadow-lg transition cursor-pointer">
              🛒 Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
