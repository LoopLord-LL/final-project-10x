import React, { useState } from "react";
import Loader from "./Loader";
import { ultraSmoothScrollTo } from "../ultraSmoothScroll";

function NavLinks({ mobile = false }) {
  const [loading, setLoading] = useState(false);
  const handleHomeClick = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };
  // Smooth scroll to anchor element by id
  const handleAnchorClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY;
      ultraSmoothScrollTo(y, 1200);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <ul
        className={
          (mobile ? "flex flex-col gap-4" : "flex gap-6 justify-center") +
          " text-gray-700 font-medium"
        }
      >
        <li>
          <a
            href="/"
            className="cursor-pointer hover:text-blue-600"
            onClick={handleHomeClick}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#about"
            className="cursor-pointer hover:text-blue-600"
            onClick={(e) => handleAnchorClick(e, "about")}
          >
            About Us
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="cursor-pointer hover:text-blue-600"
            onClick={(e) => handleAnchorClick(e, "contact")}
          >
            Contact
          </a>
        </li>
        <li>
          <a
            href="#products"
            className="cursor-pointer hover:text-blue-600"
            onClick={(e) => handleAnchorClick(e, "products")}
          >
            Products
          </a>
        </li>
      </ul>
    </>
  );
}
export default NavLinks;
