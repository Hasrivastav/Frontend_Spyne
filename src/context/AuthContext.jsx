import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedToken = sessionStorage.getItem("accessToken");
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedToken);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);

    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
