"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    payment: "cod",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setShowCheckoutModal(true);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (
      !form.email.trim() ||
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)
    )
      newErrors.email = "Valid email is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.phone.trim() || !/^\+?\d{7,15}$/.test(form.phone))
      newErrors.phone = "Valid phone is required";
    if (form.payment === "visa") {
      if (!/^\d{16}$/.test(form.cardNumber.replace(/\s/g, "")))
        newErrors.cardNumber = "Card number must be 16 digits";
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.cardExpiry))
        newErrors.cardExpiry = "Expiry must be MM/YY";
      if (!/^\d{3,4}$/.test(form.cardCVC))
        newErrors.cardCVC = "CVC must be 3 or 4 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      clearCart();
      setShowCheckoutModal(false);
      setCheckoutSuccess(true);
    }
  };

  return (
    <div className="py-8 max-w-3xl mx-auto" role="main">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center tracking-tight">
        Your Cart
      </h1>
      {checkoutSuccess && (
        <div className="mb-8 p-4 bg-green-100 text-green-800 rounded text-center font-semibold flex flex-col items-center" aria-live="polite">
          <span className="text-lg mb-2">
            🎉 Checkout successful! Thank you for your purchase.
          </span>
          <Link
            href="/"
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-bold"
            aria-label="Go to Homepage"
          >
            Go to Homepage
          </Link>
        </div>
      )}
      {cart.length === 0 && !checkoutSuccess ? (
        <div className="text-center text-gray-500 bg-white rounded-lg shadow p-8" aria-live="polite">
          <span className="block mb-2 text-lg">Your cart is empty.</span>
          <Link
            href="/products"
            className="inline-block mt-2 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            aria-label="Continue Shopping"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          {!checkoutSuccess && (
            <>
              <ul className="space-y-6 mb-10">
                {cart.map((item) => (
                  <li
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="flex flex-col sm:flex-row items-center bg-white rounded-2xl shadow-lg p-4 gap-6 sm:gap-4 border border-gray-100"
                  >
                    <div className="w-full sm:w-28 h-44 sm:h-28 relative flex-shrink-0 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                      <Image
                        src={item.images?.[0] || "/placeholder.png"}
                        alt={item.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0 w-full sm:w-auto mt-4 sm:mt-0 flex flex-col gap-2">
                      <div className="font-bold text-lg text-gray-900 truncate">
                        {item.title}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span>
                          Size:{" "}
                          <span className="font-semibold text-gray-700">
                            {item.size}
                          </span>
                        </span>
                        <span>
                          Color:{" "}
                          <span className="font-semibold text-gray-700">
                            {item.color}
                          </span>
                        </span>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-4">
                        <span className="text-gray-500 text-sm">
                          Quantity:{" "}
                          <span className="font-semibold text-gray-700">
                            {item.quantity}
                          </span>
                        </span>
                        <span className="text-xl font-extrabold text-blue-700">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <Link
                        href={`/products/${item.id}`}
                        className="inline-block mt-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition font-semibold text-sm shadow-sm sm:max-w-32"
                        aria-label={`View details for ${item.title}`}
                      >
                        View Product
                      </Link>
                    </div>
                    <button
                      className="mt-4 sm:mt-0 sm:ml-6 px-5 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition font-bold cursor-pointer w-full sm:w-auto shadow-sm"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.title} from cart`}
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
                  aria-label="Clear Cart"
                >
                  🗑️ Clear Cart
                </button>
                <button
                  className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-10 py-3 rounded-lg font-bold shadow hover:from-blue-700 hover:to-blue-600 hover:shadow-lg transition cursor-pointer"
                  onClick={handleCheckout}
                  aria-label="Proceed to Checkout"
                >
                  🛒 Checkout
                </button>
              </div>
            </>
          )}
          {showCheckoutModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2" role="dialog" aria-modal="true" aria-label="Checkout Modal">
              <form
                className="bg-white p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-md animate-fade-in overflow-y-auto max-h-[95vh]"
                onSubmit={handleSubmit}
                noValidate
              >
                <h2 className="text-2xl font-extrabold mb-6 text-center text-gray-800">
                  Checkout Details
                </h2>
                <div className="mb-4">
                  <label className="block font-semibold mb-1 text-gray-700" htmlFor="checkout-name">
                    Name
                  </label>
                  <input
                    id="checkout-name"
                    name="name"
                    value={form.name}
                    onChange={handleFormChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Your Name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "error-name" : undefined}
                  />
                  {errors.name && (
                    <div className="text-red-600 text-xs mt-1" id="error-name">
                      {errors.name}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-1 text-gray-700" htmlFor="checkout-email">
                    Email
                  </label>
                  <input
                    id="checkout-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleFormChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="you@email.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "error-email" : undefined}
                  />
                  {errors.email && (
                    <div className="text-red-600 text-xs mt-1" id="error-email">
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-1 text-gray-700" htmlFor="checkout-address">
                    Address
                  </label>
                  <input
                    id="checkout-address"
                    name="address"
                    value={form.address}
                    onChange={handleFormChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Shipping Address"
                    aria-invalid={!!errors.address}
                    aria-describedby={errors.address ? "error-address" : undefined}
                  />
                  {errors.address && (
                    <div className="text-red-600 text-xs mt-1" id="error-address">
                      {errors.address}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-1 text-gray-700" htmlFor="checkout-phone">
                    Phone
                  </label>
                  <input
                    id="checkout-phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleFormChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="+1234567890"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "error-phone" : undefined}
                  />
                  {errors.phone && (
                    <div className="text-red-600 text-xs mt-1" id="error-phone">
                      {errors.phone}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-1 text-gray-700" htmlFor="checkout-payment">
                    Payment Method
                  </label>
                  <select
                    id="checkout-payment"
                    name="payment"
                    value={form.payment}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  >
                    <option value="cod">Cash on Delivery (COD)</option>
                    <option value="visa">Visa Card</option>
                  </select>
                </div>
                {form.payment === "visa" && (
                  <>
                    <div className="mb-4">
                      <label className="block font-semibold mb-1 text-gray-700" htmlFor="checkout-cardNumber">
                        Card Number
                      </label>
                      <input
                        id="checkout-cardNumber"
                        name="cardNumber"
                        value={form.cardNumber}
                        onChange={handleFormChange}
                        maxLength={16}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                          errors.cardNumber
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="1234123412341234"
                        aria-invalid={!!errors.cardNumber}
                        aria-describedby={errors.cardNumber ? "error-cardNumber" : undefined}
                      />
                      {errors.cardNumber && (
                        <div className="text-red-600 text-xs mt-1" id="error-cardNumber">
                          {errors.cardNumber}
                        </div>
                      )}
                    </div>
                    <div className="mb-4 flex gap-2">
                      <div className="flex-1">
                        <label className="block font-semibold mb-1 text-gray-700" htmlFor="checkout-cardExpiry">
                          Expiry (MM/YY)
                        </label>
                        <input
                          id="checkout-cardExpiry"
                          name="cardExpiry"
                          value={form.cardExpiry}
                          onChange={handleFormChange}
                          maxLength={5}
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                            errors.cardExpiry
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="MM/YY"
                          aria-invalid={!!errors.cardExpiry}
                          aria-describedby={errors.cardExpiry ? "error-cardExpiry" : undefined}
                        />
                        {errors.cardExpiry && (
                          <div className="text-red-600 text-xs mt-1" id="error-cardExpiry">
                            {errors.cardExpiry}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <label className="block font-semibold mb-1 text-gray-700" htmlFor="checkout-cardCVC">
                          CVC
                        </label>
                        <input
                          id="checkout-cardCVC"
                          name="cardCVC"
                          value={form.cardCVC}
                          onChange={handleFormChange}
                          maxLength={4}
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                            errors.cardCVC
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="123"
                          aria-invalid={!!errors.cardCVC}
                          aria-describedby={errors.cardCVC ? "error-cardCVC" : undefined}
                        />
                        {errors.cardCVC && (
                          <div className="text-red-600 text-xs mt-1" id="error-cardCVC">
                            {errors.cardCVC}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    className="px-5 py-2 rounded-lg bg-gray-200 font-semibold hover:bg-gray-300 transition cursor-pointer"
                    onClick={() => setShowCheckoutModal(false)}
                    aria-label="Cancel checkout"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition cursor-pointer"
                    aria-label="Confirm Order"
                  >
                    Confirm Order
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}
