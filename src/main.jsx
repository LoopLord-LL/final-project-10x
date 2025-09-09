import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import CheckoutPage from "./components/CheckoutPage";
import { CartProvider } from "./components/CartContext";
import { AuthProvider } from "./components/AuthContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
