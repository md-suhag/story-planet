import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineRead } from "react-icons/ai";
import { MdPublish } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FiMonitor } from "react-icons/fi";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { navStatus, setNavStatus, user, isOpen, setIsOpen } = useAuth();

  const handleClose = () => {
    setIsOpen(false);
    setNavStatus(false);
  };

  return (
    <>
      <div
        className={`  transition-all duration-300 absolute top-0 -left-full bottom-0 z-40 ${
          navStatus ? "left-0 w-1/2" : ""
        } md:relative md:left-0 flex flex-col gap-3 bg-sky-500 dark:bg-slate-700 p-3 pt-10  md:w-1/5 min-h-screen shadow sidebar`}
      >
        <NavLink
          className="inline-flex items-center gap-2 bg-sky-400 dark:bg-slate-500 px-2 py-4  text-black  rounded shadow"
          to="/"
        >
          <AiOutlineHome />
          Home
        </NavLink>
        <NavLink
          className="inline-flex items-center gap-2 bg-sky-400 dark:bg-slate-500 px-2 py-4  text-black  rounded shadow"
          to="/admin/dashboard/home"
        >
          <FiMonitor />
          Dashboard
        </NavLink>
        <NavLink
          className=" inline-flex items-center gap-2 bg-sky-400 dark:bg-slate-500 px-2 py-4 text-black  rounded shadow "
          to="/admin/dashboard/publish-story"
        >
          <MdPublish />
          Publish story
        </NavLink>
        <NavLink
          className=" inline-flex items-center gap-2 bg-sky-400 dark:bg-slate-500 px-2 py-4 text-black  rounded shadow "
          to="/admin/dashboard/my-story"
        >
          <AiOutlineRead />
          My Stories
        </NavLink>

        {user.role == "admin" ? (
          <NavLink
            className=" inline-flex items-center gap-2 bg-sky-400 dark:bg-slate-500 px-2 py-4 text-black  rounded shadow "
            to="/admin/dashboard/all-stories"
          >
            <FaUsers />
            View All Stories
          </NavLink>
        ) : null}
        {user.role == "admin" ? (
          <NavLink
            className=" inline-flex items-center gap-2 bg-sky-400 dark:bg-slate-500 px-2 py-4 text-black  rounded shadow "
            to="/admin/dashboard/view-users"
          >
            <FaUsers />
            View All Users
          </NavLink>
        ) : null}
      </div>
      <div
        className={`fixed inset-0 bg-black bg-opacity-10 transition-all duration-1000 z-10 md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={handleClose}
      ></div>
    </>
  );
};

export default Sidebar;
