import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import products from "../data/products";
import CheckoutModal from "./CheckoutModal";

export default function CartSidebar({ open, onClose }) {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  // Helper to get product data (for discount info)
  const getProductData = (id) => products.find((p) => p.id === id);

  // Calculate totals
  let total = 0;
  let totalSaved = 0;
  cartItems.forEach((item) => {
    const product = getProductData(item.id);
    const price = product ? product.price : item.price;
    const discount = product && product.discount ? product.discount : 0;
    const discountedPrice = price - (discount || 0);
    total += discountedPrice * item.quantity;
    if (discount) {
      totalSaved += discount * item.quantity;
    }
  });

  if (!open) return null;

  const handleCheckoutClick = () => {
    setShowCheckout(true);
  };

  const handleCheckoutClose = () => {
    setShowCheckout(false);
  };

  const handleCheckoutSubmit = (form) => {
    // Here you can handle the form data, e.g., send to backend or show a success message
    alert("Payment submitted!\n" + JSON.stringify(form, null, 2));
    setShowCheckout(false);
    onClose();
  };

  return (
    <>
      {/* Blurred overlay */}
      <div
        className="fixed inset-0 z-40 backdrop-blur-sm bg-black/10"
        onClick={onClose}
        aria-label="Close cart sidebar overlay"
      />
      {/* Sidebar */}
      <div
        className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 translate-x-0 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl"
          >
            &times;
          </button>
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              Your cart is empty.
            </div>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item) => {
                const product = getProductData(item.id) || item;
                const hasDiscount = product.discount && product.discount > 0;
                const originalPrice = product.price;
                const discountedPrice = hasDiscount
                  ? product.price - product.discount
                  : product.price;
                return (
                  <li
                    key={item.id}
                    className="flex items-center gap-3 border-b pb-3"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-14 h-14 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-sm">
                        {product.title}
                      </div>
                      <div className="text-xs text-gray-500 flex gap-2 items-center">
                        {hasDiscount ? (
                          <>
                            <span className="line-through text-red-400">
                              ${originalPrice.toFixed(2)}
                            </span>
                            <span className="text-green-600 font-bold">
                              ${discountedPrice.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span>${originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                      {hasDiscount && (
                        <div className="text-xs text-green-700">
                          You save ${product.discount * item.quantity}
                        </div>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          className="bg-blue-100 hover:bg-blue-300 text-blue-700 rounded-full w-7 h-7 flex items-center justify-center text-lg font-bold"
                          onClick={() => removeFromCart(item.id)}
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-semibold text-base select-none">
                          {item.quantity}
                        </span>
                        <button
                          className="bg-blue-100 hover:bg-blue-300 text-blue-700 rounded-full w-7 h-7 flex items-center justify-center text-lg font-bold"
                          onClick={() => addToCart(item)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        {/* Cart totals */}
        <div className="p-4 border-t">
          <div className="flex flex-col gap-1 mb-2">
            <div className="flex justify-between text-base font-semibold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            {totalSaved > 0 && (
              <div className="flex justify-between text-xs text-green-700">
                <span>You saved:</span>
                <span>${totalSaved.toFixed(2)}</span>
              </div>
            )}
          </div>
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            onClick={handleCheckoutClick}
          >
            Checkout
          </button>
        </div>
      </div>
      {/* Checkout Modal */}
      <CheckoutModal
        open={showCheckout}
        onClose={handleCheckoutClose}
        onSubmit={handleCheckoutSubmit}
      />
    </>
  );
}
