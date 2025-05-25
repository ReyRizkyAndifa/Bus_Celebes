import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Buat Context
const AuthContext = createContext();

// 2. Buat Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Cek localStorage saat pertama kali aplikasi dijalankan
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        setUser(null);
        localStorage.removeItem("user"); // Bersihkan data rusak supaya tidak error terus
      }
    }
  }, []);

  // Fungsi login: menyimpan user ke state dan localStorage
  const login = (userData) => {
    if (!userData) return;
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Fungsi logout: hapus user dari state dan localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
