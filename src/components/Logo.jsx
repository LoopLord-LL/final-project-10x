import React, { useState } from "react";
import Loader from "./Loader";

function Logo() {
  const [loading, setLoading] = useState(false);
  const handleLogoClick = () => {
    setLoading(true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  return (
    <>
      {loading && <Loader />}
      <div
        className="text-2xl font-bold text-blue-600 cursor-pointer"
        onClick={handleLogoClick}
      >
        LOGO
      </div>
    </>
  );
}
export default Logo;
