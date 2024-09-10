import { FaTelegram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { BsFacebook } from "react-icons/bs";
import React from "react";

const Footer = () => {
  return (
    <footer className="text-center">
      <p className="mb-2">---- Connect with us ----</p>
      <div className="flex items-center gap-2 cursor-pointer flex-wrap justify-center text-4xl text-slate-700 dark:text-white">
        <BsFacebook />
        <RiInstagramFill />
        <FaLinkedin />
        <FaTelegram />
      </div>
      <p className="flex flex-wrap items-center justify-center gap-2 underline">
        <a href="#">About Us</a>
        <a href="#">Contact Us</a>
        <a href="#">support</a>
        <a href="#">Terms and Conditions</a>
        <a href="#">privacy policy</a>
      </p>
      <p className="text-center py-4 mb-10 dark:text-white">
        All right reserved by Md Abdus Salam Suhag. &copy; 2024
      </p>
    </footer>
  );
};

export default Footer;
