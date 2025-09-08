import { useCart } from "./CartContext";
import cartIcon from "../assets/cart.png";
import { useEffect, useRef, useState } from "react";

function Cart({ onClick }) {
  const { cartCount } = useCart();
  const [animate, setAnimate] = useState(false);
  const prevCount = useRef(cartCount);

  useEffect(() => {
    if (cartCount > prevCount.current) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 400);
    }
    prevCount.current = cartCount;
  }, [cartCount]);

  return (
    <div className="relative cursor-pointer" onClick={onClick}>
      <img src={cartIcon} alt="Cart" className="w-8 h-8" />
      {cartCount > 0 && (
        <span
          className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full transition-transform duration-300 ${
            animate ? "scale-125" : "scale-100"
          }`}
        >
          {cartCount}
        </span>
      )}
    </div>
  );
}
export default Cart;
