"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const token = localStorage.getItem("accessToken");
      const userData = localStorage.getItem("user");
      const expiresIn = localStorage.getItem("expiresIn");

      if (token && userData && expiresIn) {
        const currentTime = Math.floor(Date.now() / 1000);

        if (currentTime >= parseInt(expiresIn)) {
          logout();
          return;
        }

        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = (userData, token, expiresIn) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("expiresIn", expiresIn);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expiresIn");
    localStorage.removeItem("user");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);