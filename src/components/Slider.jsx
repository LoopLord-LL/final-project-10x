import React, { useState } from "react";

import slide1 from "../assets/slide3.png";
import slide3 from "../assets/slide1.png";
import slide2 from "../assets/slide2.png";

const slides = [slide1, slide2, slide3];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full">
      {/* Carousel image slides */}
      <div className="overflow-hidden rounded-lg md:h-[32rem] relative">
        {slides.map((src, index) => (
          <div
            key={index}
            className={`w-full h-full transition-opacity duration-700 ease-in-out absolute top-0 left-0 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{ pointerEvents: index === current ? "auto" : "none" }}
          >
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="block w-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Slide indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Previous slide button */}
      <button
        onClick={prevSlide}
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 group-hover:bg-black/50">
          <svg
            className="w-4 h-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
        </span>
      </button>

      {/* Next slide button */}
      <button
        onClick={nextSlide}
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 group-hover:bg-black/50">
          <svg
            className="w-4 h-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
        </span>
      </button>
    </div>
  );
}
