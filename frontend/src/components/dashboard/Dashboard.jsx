import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="p-2 flex items-center justify-center min-h-screen w-full md:w-4/5">
      <div className="text-center dark:text-white">
        <h1 className="text-4xl font-bold uppercase">Hi! {user.name}</h1>
        <h1 className="text-2xl">Welcome to the dashboard.</h1>
        <Link to="/" className="primary-btn mt-10">
          Go to home
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
