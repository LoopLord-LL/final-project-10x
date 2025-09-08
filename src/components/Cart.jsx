import { useState } from "react";
import cartIcon from "../assets/cart.png";
function Cart() {
  const [items, setItems] = useState(0);
  return (
    <div className="relative cursor-pointer">
      <img src={cartIcon} alt="Cart" className="w-8 h-8" />
      {items > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {items}
        </span>
      )}
    </div>
  );
}
export default Cart;
