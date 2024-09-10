import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || ""
  );
  const [navStatus, setNavStatus] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const url = "https://story-planet-mern-backend.vercel.app";
  // const url = "http://localhost:4000";

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.replace("/");
  };

  return (
    <AuthContext.Provider
      value={{
        logout,
        navStatus,
        setNavStatus,
        url,
        token,
        setToken,
        setUser,
        user,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
