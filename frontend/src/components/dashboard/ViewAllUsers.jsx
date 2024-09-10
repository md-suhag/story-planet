import { AiOutlineDelete } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const ViewAllUsers = () => {
  const [usersList, setUsersList] = useState([]);
  const { url, token } = useAuth();

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${url}/api/user/all-users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setUsersList(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to fetch users.");
      }
    } catch (error) {
      if (error.response) {
        toast.error(
          `${error.response.data.message || error.response.statusText}`
        );
      } else if (error.request) {
        toast.error("Network error: No response from the server.");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  // Handle role change
  const handleRole = async (id, newRole) => {
    try {
      const response = await axios.put(
        `${url}/api/user/${id}/role`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(`User role updated to ${newRole}`);
        // Optionally update the usersList state to reflect the change in the UI immediately
        setUsersList((prevUsers) =>
          prevUsers.map((user) =>
            user._id === id ? { ...user, role: newRole } : user
          )
        );
      } else {
        toast.error(response.data.message || "Failed to update user role.");
      }
    } catch (error) {
      if (error.response) {
        toast.error(
          `${error.response.data.message || error.response.statusText}`
        );
      } else if (error.request) {
        toast.error("Network error: No response from the server.");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  return (
    <div className="w-full md:w-4/5 pl-2 dark:text-slate-100 overflow-auto max-h-screen">
      <div className="grid grid-cols-12 font-medium text-[12px] md:text-base pt-3 mb-3 border-b-2">
        <h4 className="pl-1 col-span-1">No</h4>
        <h4 className="col-span-4">Name</h4>
        <h4 className="col-span-6">Email</h4>
        <h4 className="col-span-1">Change role</h4>
      </div>

      <div className="w-full  text-[12px] md:text-base">
        {usersList.map((user, index) => (
          <div
            key={user._id}
            className="grid grid-cols-12 items-center border-b "
          >
            <p className="pl-1 col-span-1">{index + 1}</p>
            <p className="col-span-4">{user.name}</p>
            <p className="col-span-6 overflow-auto">{user.email}</p>
            <p className="col-span-1">
              <select
                onChange={(e) => handleRole(user._id, e.target.value)}
                value={user.role}
                className="bg-transparent"
              >
                <option value="reader">Reader</option>
                <option value="author">Author</option>
                <option value="admin">Admin</option>
              </select>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllUsers;
