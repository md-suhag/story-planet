import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getUserFromToken } from "../utils/auth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, setToken, url, setUser, user } = useAuth();
  const [validUser, setValidUser] = useState(false);
  const navigate = useNavigate();
  const testUser = async () => {
    try {
      const response = await axios.post(
        `${url}/test-user`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setValidUser(true);
        const user = getUserFromToken(token);
        setUser(user);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.message == "Not authorized") {
          setToken("");
          setUser(null);
          navigate("/login");
        }
      } else if (error.request) {
        toast.error("Network error: No response from the server.");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };
  useEffect(() => {
    testUser();
  }, []);

  if (!token && !validUser) {
    return <Navigate to="/login" />;
  }
  if (token && validUser && allowedRoles.includes(user.role)) {
    return children;
  }
  if (user && !allowedRoles.includes(user.role)) {
    window.location.replace("/");
  }
};

export default ProtectedRoute;
