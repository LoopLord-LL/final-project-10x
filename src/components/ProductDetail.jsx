import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import { useCart } from "./CartContext";
import React, { useState } from "react";
import ProductCard from "./ProductCard";
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
      <div
        className="product-detail-container"
        style={{
          maxWidth: 900,
          margin: "2rem auto",
          padding: 24,
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
          position: "relative",
          display: "flex",
          gap: 32,
          alignItems: "flex-start",
        }}
      >
        {/* Close Button */}
        <button
          aria-label="Close"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "transparent",
            border: "none",
            fontSize: 28,
            fontWeight: 700,
            color: "#888",
            cursor: "pointer",
            zIndex: 2,
            transition: "color 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#222")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#888")}
          onClick={() => navigate("/")}
        >
          ×
        </button>
        {/* Left: Product Image Carousel */}
        <div
          style={{
            width: 340,
            height: 240,
            position: "relative",
            flexShrink: 0,
          }}
        >
          {/* Carousel slides */}
          {images.map((src, index) => (
            <div
              key={index}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                opacity: index === current ? 1 : 0,
                transition: "opacity 0.7s",
                zIndex: index === current ? 1 : 0,
              }}
            >
              <img
                src={src}
                alt={`Product ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 12,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              />
            </div>
          ))}
          {/* Slide indicators */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: 12,
              transform: "translateX(-50%)",
              display: "flex",
              gap: 8,
              zIndex: 2,
            }}
          >
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background:
                    current === index ? "#fff" : "rgba(255,255,255,0.5)",
                  border: "none",
                  cursor: "pointer",
                  outline: "none",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
                  padding: 0,
                }}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
          {/* Prev button */}
          <button
            onClick={prevSlide}
            style={{
              position: "absolute",
              top: "50%",
              left: 8,
              transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.3)",
              border: "none",
              borderRadius: "50%",
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 2,
            }}
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
            style={{
              position: "absolute",
              top: "50%",
              right: 8,
              transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.3)",
              border: "none",
              borderRadius: "50%",
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 2,
            }}
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
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
            {product.title}
          </h2>
          <div style={{ color: "#555", marginBottom: 16, fontSize: 16 }}>
            {product.description}
          </div>
          <div style={{ marginBottom: 16 }}>
            <strong>Brand:</strong>{" "}
            {product.brand || product.manufacturer || "-"}
          </div>
          <div style={{ marginBottom: 16 }}>
            <strong>Manufacturer:</strong> {product.manufacturer || "-"}
          </div>
          <div style={{ marginBottom: 16 }}>
            <strong>Category:</strong> {product.category || "-"}
          </div>
          <div style={{ marginBottom: 16 }}>
            <strong>Rating:</strong>{" "}
            {product.rating ? `${product.rating}/5` : "-"}
          </div>
          <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>
            Price: ${product.price}
          </div>
          {/* Cart Controls */}
          {quantity === 0 ? (
            <button
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition text-base"
              style={{ marginTop: 20 }}
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
            <div className="mt-4 w-full flex items-center justify-between bg-blue-600 rounded-lg overflow-hidden shadow">
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
        <div style={{ maxWidth: 900, margin: "2rem auto", padding: "0 24px" }}>
          <h3
            style={{
              fontSize: 24,
              fontWeight: 700,
              margin: "2.5rem 0 1.5rem 0",
            }}
          >
            Related Products
          </h3>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {related.map((p) => (
              <div
                key={p.id}
                style={{ flex: "1 1 200px", minWidth: 220, maxWidth: 260 }}
              >
                <ProductCard {...p} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
