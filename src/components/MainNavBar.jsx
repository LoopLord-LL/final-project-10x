import { useState } from "react";
// import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import Cart from "./Cart";
import CartSidebar from "./CartSidebar";
import AuthButton from "./AuthButton";
import UserProfile from "./UserProfile";
// import { AuthProvider } from "../hooks/useAuth"; // If needed at app root

export default function Navbar({ onLogin, onRegister }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <nav className="px-6 py-4 shadow-md bg-white sticky top-0 z-50">
        <div className="flex justify-between items-center">
          <Logo />

          <div className="hidden md:flex items-center gap-8">
            <NavLinks />
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Cart onClick={() => setCartOpen(true)} />
            <AuthButton onLogin={onLogin} onRegister={onRegister} />
            <UserProfile />
          </div>
          {/* Always show Cart and UserProfile on all screens, centered with more gap */}
          <div className="flex md:hidden items-center justify-center gap-8 mt-2 mb-2 w-full">
            <Cart onClick={() => setCartOpen(true)} />
            <UserProfile />
          </div>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <img
                src="/path/to/close-icon.png"
                alt="Close menu"
                className="w-6 h-6"
              />
            ) : (
              <img
                src="/path/to/menu-icon.png"
                alt="Open menu"
                className="w-6 h-6"
              />
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="flex flex-col gap-6 mt-4 md:hidden">
            <NavLinks mobile={true} />
            <AuthButton
              mobile={true}
              onLogin={onLogin}
              onRegister={onRegister}
            />
          </div>
        )}
      </nav>
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
