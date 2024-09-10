import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardNav from "./DashboardNav";
import { ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";

const DashboardLayout = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const checkTokenExpiration = () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          localStorage.removeItem("token");
          setToken("");
          window.location.href = "/login";
        }
      }
    } catch (error) {
      setToken("");
      localStorage.removeItem("token");
      navigate("/login");
    }
  };
  useEffect(() => {
    checkTokenExpiration();
  }, []);
  return (
    <div className="">
      <DashboardNav />
      <div className="flex max-w-screen-2xl mx-auto relative">
        <Sidebar />
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  );
};

export default DashboardLayout;
