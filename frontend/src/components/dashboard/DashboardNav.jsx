import { TbIndentIncrease } from "react-icons/tb";
import { TbIndentDecrease } from "react-icons/tb";
import { BsWindowSidebar } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import React from "react";
import ThemeToggle from "../ThemeToggle";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DashboardNav = () => {
  const { navStatus, setNavStatus, logout, user, setIsOpen } = useAuth();

  return (
    <nav className="sticky top-0 left-0 right-0 z-50  p-2 bg-sky-600 dark:bg-sky-900 shadow">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        <div className="inline-flex items-center gap-2">
          {navStatus ? (
            <TbIndentDecrease
              className="md:hidden text-white cursor-pointer text-4xl"
              onClick={() => {
                setNavStatus(!navStatus);
                setIsOpen(false);
              }}
            />
          ) : (
            <TbIndentIncrease
              className="md:hidden text-white cursor-pointer text-4xl"
              onClick={() => {
                setNavStatus(!navStatus);
                setIsOpen(true);
              }}
            />
          )}
          {/* <BsWindowSidebar
            className="md:hidden text-white cursor-pointer"
            onClick={() => setNavStatus(!navStatus)}
          /> */}

          <h3 className=" text-sm md:text-2xl text-white dark:text-slate-300">
            {user.role == "admin" ? "Admin Dashboard" : "Author Dashboard"}
            <Link
              to="/"
              className="hidden md:inline-block text-[10px] md:text-xl pl-2"
            >
              Story Planet
            </Link>
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => logout()}
            className="flex items-center  gap-1 bg-sky-500 shadow dark:bg-sky-800 px-4 py-2 text-white rounded-md"
          >
            Logout <BiLogOut />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;
