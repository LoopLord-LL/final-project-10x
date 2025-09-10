import React from "react";
import { useCart } from "./CartContext";
export default function ProductCard({
  id,
  image,
  title,
  description,
  price,
  discount,
  rating,
}) {
  const { addToCart, removeFromCart, getProductQuantity } = useCart();
  const quantity = getProductQuantity(id);
  // Calculate price after discount (if any)
  const finalPrice = discount
    ? (price - price * (discount / 100)).toFixed(2)
    : price.toFixed(2);

  return (
    <div className="max-w-xs w-full bg-white shadow-lg rounded-2xl overflow-hidden border hover:shadow-xl transition flex flex-col mx-auto sm:max-w-sm md:max-w-xs cursor-pointer">
      {/* Image */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-40 sm:h-48 object-cover"
        />
        {discount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
            -{discount}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-semibold truncate">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
          {description}
        </p>

        {/* Rating */}
        <div className="flex items-center mt-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <svg
              key={index}
              className={`w-4 h-4 ${
                index < rating ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-2 text-xs sm:text-sm text-gray-600">
            {rating}/5
          </span>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-center space-x-2">
          <span className="text-lg sm:text-xl font-bold text-green-600">
            ${finalPrice}
          </span>
          {discount && (
            <span className="text-xs sm:text-sm line-through text-gray-400">
              ${price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to cart or quantity controls */}
        {quantity === 0 ? (
          <button
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition text-sm sm:text-base"
            onClick={(e) => {
              e.stopPropagation();
              addToCart({
                id,
                image,
                title,
                description,
                price,
                discount,
                rating,
              });
            }}
          >
            Add to Cart
          </button>
        ) : (
          <div className="mt-4 w-full flex items-center justify-between bg-blue-600 rounded-lg overflow-hidden shadow">
            <button
              className="w-1/4 py-2 text-white text-xl font-bold hover:bg-blue-700 transition"
              onClick={(e) => {
                e.stopPropagation();
                removeFromCart(id);
              }}
            >
              -
            </button>
            <span className="w-1/2 text-center text-white font-semibold text-base select-none">
              {quantity}
            </span>
            <button
              className="w-1/4 py-2 text-white text-xl font-bold hover:bg-blue-700 transition"
              onClick={(e) => {
                e.stopPropagation();
                addToCart({
                  id,
                  image,
                  title,
                  description,
                  price,
                  discount,
                  rating,
                });
              }}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
