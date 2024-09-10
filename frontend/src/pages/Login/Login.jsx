import React from "react";
import img1 from "../../assets/login.svg";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { getUserFromToken } from "../../utils/auth";

const Login = () => {
  const navigate = useNavigate();
  const { url, setToken, user, setUser } = useAuth();
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${url}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.ok) {
        setToken(responseData.token);
        const user = getUserFromToken(responseData.token);
        setUser(user);
        localStorage.setItem("token", JSON.stringify(responseData.token));
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("An error occurred during login.");
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-center text-2xl font-bold my-4 text-sky-500 ">
        Login to read or create your story
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center min-h-[80vh]">
        <div>
          <img data-aos="fade-right" src={img1} alt="" />
        </div>
        <div className="p-5">
          <form
            data-aos="fade-right"
            onSubmit={handleSubmit(onSubmit)}
            className=" w-ful m-1 bg-slate-200  dark:bg-slate-600 p-3 py-6 md:p-10 rounded-md shadow-md flex flex-col gap-4"
          >
            <div className="flex flex-wrap gap-x-2">
              <label
                htmlFor="email"
                className="flex-none w-full md:w-auto md:basis-1/5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="email"
                className="outline-none p-2 grow  dark:bg-slate-500 h-8"
                {...register("email", { required: "email is required" })}
              />
              {errors.email && (
                <p className="block w-full text-center text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-x-2">
              <label
                htmlFor=""
                className="flex-none w-full md:w-auto md:basis-1/5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="password"
                className="outline-none p-2 grow  dark:bg-slate-500 h-8"
                {...register("password", { required: "password is required" })}
              />
              {errors.password && (
                <p className="block w-full text-center text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <p>
                Didn't have an account?{" "}
                <Link to="/register" className="underline text-sky-600">
                  Create Account
                </Link>
              </p>
            </div>
            <button
              type="submit"
              className="primary-btn ml-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? "logging..." : " log in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
