import { useState } from "react";
import Loader from "./Loader";
import { useAuth } from "./AuthContext";

function AuthButton({ mobile = false, onLogin, onRegister }) {
  const { isLoggedIn, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      logout();
      setLoading(false);
    }, 1000);
  };

  if (loading) return <Loader />;

  if (isLoggedIn) {
    return (
      <button
        className="px-4 py-2 border rounded-lg bg-red-500 text-white hover:bg-red-600 cursor-pointer"
        onClick={handleLogout}
      >
        Sign Out
      </button>
    );
  }
  return (
    <div className={`flex ${mobile ? "flex-col gap-3" : "gap-4"}`}>
      <button
        className="px-4 py-2 border rounded-lg hover:bg-gray-100 cursor-pointer"
        onClick={onLogin}
      >
        Login
      </button>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
        onClick={onRegister}
      >
        Sign Up
      </button>
    </div>
  );
}
export default AuthButton;
