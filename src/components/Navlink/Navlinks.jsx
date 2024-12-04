"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLinks = () => {
  const presentLink = usePathname();

  const links = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Attendance",
      href: "/dashboard/attendance",
    },
    {
      name: "Class",
      href: "/dashboard/classes",
    },
    {
      name: "Feedback",
      href: "/dashboard/feedback",
    },
    {
      name: "Tutor",
      href: "/dashboard/tutor",
    },
  ];

  return (
    <>
      {links.map((link) => (
        <Link href={`${link.href}`} key={link.name}>
          <div
            className={`flex items-center text-lg p-4 rounded-md hover:bg-gray-600 hover:text-white ${
              link.href === presentLink
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            <span className="w-6 text-white">{link.icon}</span>
            <p className="text-white">{link.name}</p>
          </div>
        </Link>
      ))}
    </>
  );
};

export default NavLinks;
