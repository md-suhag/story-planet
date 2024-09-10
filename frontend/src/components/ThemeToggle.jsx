import React, { useState, useEffect } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
  );
  const [rotating, setRotating] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setRotating(true);
    setTimeout(() => {
      setRotating(false);
      setTheme(theme === "light" ? "dark" : "light");
    }, 500);
  };

  return (
    <button
      className={` icon-button ${rotating ? "rotate" : ""}`}
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <BiSun className="text-white size-6" />
      ) : (
        <BiMoon className="text-white size-6" />
      )}
    </button>
  );
};

export default ThemeToggle;
