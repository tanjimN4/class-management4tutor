"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import signup_Animation from "../../../public/assets/Animation.json";
import axios from "axios";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    console.log("Form Data:", { name, email, password });
    // handle your form submission logic here
    try {
      const response = await axios.post("signup/api", {
        name,
        email,
        password,
      });
      if (response.status === 201) {
        console.log("User created successfully:", response.data);
        window.location.href = "/login";
        // Handle success (e.g., redirect to login page)
      } else {
        console.error("Error:", response.data.error);
        alert(response.data.error || "An error occurred");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert(error.response.data.error);
    }
  };

  const handleGoogleSignUp = () => {
    // Define your Google sign-up logic here
    console.log("Google sign-up");
  };

  return (
    <div className="flex items-center justify-center py-6 md:py-10 lg:py-16">
      <div className="lg:w-full lg:max-w-6xl flex flex-col-reverse lg:flex-row-reverse bg-white rounded-lg overflow-hidden shadow-lg">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 bg-blue-500 bg-opacity-5">
          <h2 className="text-3xl font-bold lg:mt-8 mb-2">
            Signup <span className="text-blue-500 text-4xl"></span>
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your Name"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Enter your Email"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                    message:
                      "Password must contain at least 6 characters, one letter, and one number",
                  },
                })}
                placeholder="Enter your Password"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full text-black font-bold py-2 px-4 rounded-lg border border-blue-500 shadow-md hover:bg-blue-500 hover:text-white"
            >
              Sign Up
            </button>

            <button
              type="button"
              onClick={handleGoogleSignUp}
              className="w-full mt-4 flex items-center justify-center border-blue-500 shadow-md hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded-lg "
            >
              <FaGoogle className="mr-2" />
              Sign Up with Google
            </button>

            <p className="mt-6 text-center font-bold">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-blue-500">
                Sign In
              </Link>
            </p>
          </form>
        </div>

        {/* Lottie Animation Section */}
        <div className="w-full lg:w-1/2 flex justify-center items-center p-6 lg:p-10 bg-blue-500 bg-opacity-5">
          <Lottie
            animationData={signup_Animation}
            className="w-full h-full max-h-[400px] md:max-h-[500px] lg:max-h-[600px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
