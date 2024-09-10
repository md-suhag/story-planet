import { HiMenuAlt3 } from "react-icons/hi";

import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
// import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { token, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const userRoles = ["author", "admin"];
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 left-0 right-0 bg-sky-500 dark:bg-sky-900  p-2  shadow-lg z-50 ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold dark:text-slate-300">
          <Link to="/" className="flex items-center gap-1 md:gap-3">
            <h3 id="logo-text" className="text-xl lg:text-2xl ">
              Story Planet
            </h3>
          </Link>
        </div>
        <div className="hidden md:flex md:space-x-3 lg:space-x-6">
          <NavLink
            to="/"
            className="text-white hover:text-cyan-400 transition duration-300"
          >
            Home
          </NavLink>
          <NavLink
            to="/all-story"
            className="text-white hover:text-cyan-400 transition duration-300"
          >
            All stories
          </NavLink>

          {token && user && userRoles.includes(user.role) ? (
            <NavLink
              to="/admin/dashboard"
              className="ring-0 ring-offset-1 px-1 block text-white hover:text-cyan-400 transition duration-300 "
            >
              Dashboard
            </NavLink>
          ) : !token && !user ? (
            <NavLink
              to="/login"
              className="ring ring-offset-1 px-2 text-white hover:text-cyan-400 transition duration-300 "
            >
              Login
            </NavLink>
          ) : null}
        </div>
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          {token && user ? (
            <button
              className="bg-white rounded px-4 py-1"
              onClick={() => logout()}
            >
              logout
            </button>
          ) : null}
        </div>
        <div className="flex items-center gap-x-4 md:hidden">
          <div className=" grid place-content-center md:hidden">
            <ThemeToggle />
          </div>
          {token && user ? (
            <button
              className="bg-white rounded px-2 py-1"
              onClick={() => logout()}
            >
              logout
            </button>
          ) : null}
          <button
            onClick={() => setIsOpen(true)}
            className="text-gray-300  focus:outline-none"
          >
            <HiMenuAlt3 className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-10 transition-all duration-1000 z-10 md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={handleClose}
      ></div>
      <div
        className={`fixed top-0 bottom-0 h-screen w-full max-w-64 bg-gradient-to-b from-sky-600 to-sky-400 dark:from-slate-700 dark:to-slate-700 z-50 transition-all duration-500 ease-in-out md:hidden ${
          isOpen ? "left-0" : "-left-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center ">
          <div className="text-white text-xl font-bold">
            <Link to="/">
              {" "}
              <p>story planet</p>
            </Link>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:text-cyan-400 focus:outline-none"
          >
            <AiOutlineClose className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4">
          <NavLink
            to="/"
            className="block mb-4 text-white hover:text-cyan-400 transition duration-300"
          >
            Home
          </NavLink>
          <NavLink
            to="/courses"
            className="block mb-4 text-white hover:text-cyan-400 transition duration-300"
          >
            All stories
          </NavLink>

          {token && user && userRoles.includes(user.role) ? (
            <NavLink
              to="/admin/dashboard"
              className="ring-0 ring-offset-1 pl-1 block mb-4 text-white hover:text-cyan-400 transition duration-300 "
            >
              Dashboard
            </NavLink>
          ) : !token && !user ? (
            <NavLink
              to="/login"
              className="ring-0 ring-offset-1 pl-1 block mb-4 text-white hover:text-cyan-400 transition duration-300 "
            >
              Login
            </NavLink>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
