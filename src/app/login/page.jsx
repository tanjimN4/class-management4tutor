'use client';

import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Dynamically import Lottie component (only on the client)
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import loginAnimation from "../../../public/assets/login.json";
import signup_Animation from "../../../public/assets/Animation.json";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams?.get("redirect") || "/";

  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate a 2-second load
    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  const onSubmit = async (data) => {
    const { email, password } = data;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      toast.error("Invalid email or password.");
    } else {
      toast.success("Welcome Back!");
      router.push(redirectPath);
    }
  };

  const handleGoogleSignIn = async () => {
    const result = await signIn("google", {
      callbackUrl: redirectPath,
    });

    if (!result?.error) {
      toast.success("Signed in with Google!");
    } else {
      toast.error("Google sign-in failed.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Lottie
          animationData={loginAnimation}
          className="w-full h-full max-h-[400px] md:max-h-[500px] lg:max-h-[600px]"
        />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <div className="flex items-center justify-center py-6 md:py-10 lg:py-16">
          <div className="lg:w-full lg:max-w-6xl flex flex-col-reverse lg:flex-row-reverse bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="w-full lg:w-1/2 flex justify-center items-center p-6 lg:p-10 bg-blue-500 bg-opacity-5">
              <Lottie
                animationData={signup_Animation}
                className="w-full h-full max-h-[400px] md:max-h-[500px] lg:max-h-[600px]"
              />
            </div>
            <div className="w-full lg:w-1/2 p-8 bg-blue-500 bg-opacity-5">
              <h2 className="text-3xl font-bold lg:mt-8 mb-2">Login</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email", { required: "Email is required" })}
                    placeholder="Enter your Email"
                    className={`w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    {...register("password", { required: "Password is required" })}
                    placeholder="Enter your Password"
                    className={`w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500 ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>
                <div className="mt-8 flex flex-col gap-y-4">
                  <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-600"
                  >
                    Sign In
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full mt-4 flex items-center justify-center border-blue-500 shadow-md hover:bg-blue-500 text-blue-700 font-bold py-2 px-4 rounded-lg"
                >
                  <FaGoogle className="mr-2" />
                  Sign Up with Google
                </button>
              </form>
              <div className="mt-6 flex justify-center items-center mb-3">
                <span className="font-bold pb-4 text-center mt-3">
                  Don&apos;t have an account?
                  <Link href="/signup" className="text-blue-700 cursor-pointer hover:underline ml-2">
                    Sign Up
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrap the Login component in Suspense
const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login />
    </Suspense>
  );
};

export default LoginPage;
