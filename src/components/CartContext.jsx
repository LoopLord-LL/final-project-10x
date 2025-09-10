import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  // Load cart from localStorage on first render
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  // Save cart to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add or increment product
  const addToCart = (product) => {
    setCartItems((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Decrement or remove product
  const removeFromCart = (productId) => {
    setCartItems((prev) => {
      const found = prev.find((item) => item.id === productId);
      if (!found) return prev;
      if (found.quantity === 1) {
        return prev.filter((item) => item.id !== productId);
      } else {
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  };

  // Get quantity for a product
  const getProductQuantity = (productId) => {
    const found = cartItems.find((item) => item.id === productId);
    return found ? found.quantity : 0;
  };

  // Total count of all products in cart
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        getProductQuantity,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
