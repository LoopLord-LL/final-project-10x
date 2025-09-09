import React, { useState } from "react";
import Loader from "./Loader";

function NavLinks({ mobile = false }) {
  const [loading, setLoading] = useState(false);
  const handleHomeClick = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
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
          <a href="#about" className="cursor-pointer hover:text-blue-600">
            About Us
          </a>
        </li>
        <li>
          <a href="#contact" className="cursor-pointer hover:text-blue-600">
            Contact
          </a>
        </li>
        <li>
          <a href="#products" className="cursor-pointer hover:text-blue-600">
            Products
          </a>
        </li>
      </ul>
    </>
  );
}
export default NavLinks;
