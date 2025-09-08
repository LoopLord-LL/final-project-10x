import { useState } from "react";
// import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import Cart from "./Cart";
import AuthButton from "./AuthButton";
import UserProfile from "./UserProfile";

export default function Navbar({ onLogin, onRegister }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="px-6 py-4 shadow-md bg-white">
      <div className="flex justify-between items-center">
        <Logo />

        <div className="hidden md:flex items-center gap-8">
          <NavLinks />
          <SearchBar />
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Cart />
          <AuthButton onLogin={onLogin} onRegister={onRegister} />
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
          <SearchBar />
          <Cart />
          <AuthButton mobile={true} onLogin={onLogin} onRegister={onRegister} />
          <UserProfile />
        </div>
      )}
    </nav>
  );
}
