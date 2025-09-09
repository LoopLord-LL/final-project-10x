import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "./AuthContext";

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
  // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}

export default function RegisterForm({ onSuccess, onSwitch }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (username.length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }
    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters, include uppercase, lowercase, and a number."
      );
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    login();
    onSuccess("Registration successful! You are now logged in.");
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Register
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 pr-10"
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 pr-10"
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={() => setShowConfirm((v) => !v)}
            tabIndex={-1}
            aria-label={showConfirm ? "Hide password" : "Show password"}
          >
            {showConfirm ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Register
        </button>
      </form>
      <div className="mt-4 text-sm text-center">
        <button
          onClick={() => onSwitch("login")}
          className="text-blue-500 hover:underline"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}
