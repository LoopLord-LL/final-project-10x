import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import { useCart } from "./CartContext";
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import MainNavBar from "./MainNavBar";
export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart, removeFromCart, getProductQuantity } = useCart();
  const quantity = getProductQuantity(product.id);
  // Carousel state for product images
  const images = [product.image, product.image, product.image];
  // Related products: same category, then same manufacturer (no duplicates, not this product)
  let related = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );
  if (related.length < 4 && product.manufacturer) {
    const more = products.filter(
      (p) =>
        p.manufacturer === product.manufacturer &&
        p.category !== product.category &&
        p.id !== product.id &&
        !related.some((r) => r.id === p.id)
    );
    related = [...related, ...more].slice(0, 4);
  }
  const [current, setCurrent] = useState(0);
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <>
      <MainNavBar />
      <div className="relative max-w-3xl mx-auto my-8 p-4 sm:p-6 bg-white rounded-2xl shadow-lg flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">
        {/* Close Button */}
        <button
          aria-label="Close"
          className="absolute top-4 right-4 text-2xl font-bold text-gray-400 hover:text-gray-800 transition-colors z-20 bg-transparent border-none"
          onClick={() => navigate("/")}
        >
          ×
        </button>
        {/* Left: Product Image Carousel */}
        <div className="relative w-full h-56 sm:w-[340px] sm:h-60 flex-shrink-0 mb-4 lg:mb-0">
          {/* Carousel slides */}
          {images.map((src, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img
                src={src}
                alt={`Product ${index + 1}`}
                className="w-full h-full object-cover rounded-xl shadow-md"
              />
            </div>
          ))}
          {/* Slide indicators */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-2 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2.5 h-2.5 rounded-full border-none outline-none shadow ${
                  current === index ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
          {/* Prev button */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/30 border-none rounded-full w-8 h-8 flex items-center justify-center cursor-pointer z-20"
            aria-label="Previous image"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 6 10">
              <path
                d="M5 1 1 5l4 4"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {/* Next button */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/30 border-none rounded-full w-8 h-8 flex items-center justify-center cursor-pointer z-20"
            aria-label="Next image"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 6 10">
              <path
                d="m1 9 4-4-4-4"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        {/* Right: Product Info */}
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 break-words">
            {product.title}
          </h2>
          <div className="text-gray-600 mb-4 text-base sm:text-lg">
            {product.description}
          </div>
          <div className="mb-4">
            <strong>Brand:</strong>{" "}
            {product.brand || product.manufacturer || "-"}
          </div>
          <div className="mb-4">
            <strong>Manufacturer:</strong> {product.manufacturer || "-"}
          </div>
          <div className="mb-4">
            <strong>Category:</strong> {product.category || "-"}
          </div>
          <div className="mb-4">
            <strong>Rating:</strong>{" "}
            {product.rating ? `${product.rating}/5` : "-"}
          </div>
          <div className="text-lg font-semibold mb-4">
            Price: ${product.price}
          </div>
          {/* Cart Controls */}
          {quantity === 0 ? (
            <button
              className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition text-base"
              onClick={() =>
                addToCart({
                  id: product.id,
                  image: product.image,
                  title: product.title,
                  description: product.description,
                  price: product.price,
                  discount: product.discount,
                  rating: product.rating,
                })
              }
            >
              Add to Cart
            </button>
          ) : (
            <div className="mt-5 w-full flex items-center justify-between bg-blue-600 rounded-lg overflow-hidden shadow">
              <button
                className="w-1/4 py-2 text-white text-xl font-bold hover:bg-blue-700 transition"
                onClick={() => removeFromCart(product.id)}
              >
                -
              </button>
              <span className="w-1/2 text-center text-white font-semibold text-base select-none">
                {quantity}
              </span>
              <button
                className="w-1/4 py-2 text-white text-xl font-bold hover:bg-blue-700 transition"
                onClick={() =>
                  addToCart({
                    id: product.id,
                    image: product.image,
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    discount: product.discount,
                    rating: product.rating,
                  })
                }
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Related Products Section */}
      {related.length > 0 && (
        <div className="max-w-3xl mx-auto my-8 px-2 sm:px-6">
          <h3 className="text-xl sm:text-2xl font-bold my-8">
            Related Products
          </h3>
          <div className="flex flex-wrap gap-6">
            {related.map((p) => (
              <div key={p.id} className="flex-1 min-w-[180px] max-w-xs">
                <ProductCard {...p} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
