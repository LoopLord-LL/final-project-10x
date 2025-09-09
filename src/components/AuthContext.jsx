import { createContext, useContext, useState } from "react";
// Duplicate block removed

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // For demo: use localStorage for persistence
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
