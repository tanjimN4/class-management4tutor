"use client";
import Link from "next/link";
import React from "react";

import { signOut, useSession } from "next-auth/react";
import NavLinks from "@/components/Navlink/Navlinks";


export default function Layout({ children }) {
  const { data: session } = useSession({ required: true });
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
      <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-gray-800">
      {/* Logo Section */}
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-gray-700 p-4 md:h-40"
        href="/"
      >
        <div className="text-2xl text-white md:w-40 flex items-center">
          <p>Management4Tutor</p>
        </div>
      </Link>

      {/* Navigation Links */}
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <div className="hidden h-auto w-full grow rounded-md bg-[#1f2937] md:block">
          <NavLinks />
        </div>
      </div>

      {/* User Card Footer */}
      <div className="mt-4 rounded-md bg-gray-700 p-4 shadow-lg">
        <div className=" items-center space-x-4">
          {/* User Avatar */}
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="h-12 w-12 rounded-full border-2 border-gray-500"
          />

          {/* User Info */}
          <div className="flex flex-col justify-end items-end">
            <p className="text-white text-lg font-semibold">
              {session?.user.name}
            </p>
            <p className="text-gray-400 text-sm">{session?.user.email}</p>
            {/* Logout Button */}
            {session?.user.email ? (
              <button
                onClick={() => signOut()}
                className="ml-auto rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
