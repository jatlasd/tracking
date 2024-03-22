"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => setIsOpen(!isOpen);
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/add", label: "Add Symptom" },
    { href: "/add/quick", label: "Quick Add" },
    { href: "/filter", label: "Filter" },
    { href: "/trends", label: "Trends" },
  ];

  return (
    <>
      <nav className="flex justify-end w-full  pt-3 mb-10">
        <div className="hidden md:flex gap-3">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={
                pathname === href
                  ? "rounded-full border py-1.5 px-5 transition-all text-center text-sm font-inter flex justify-center items-center border-dark-blue-2 bg-dark-blue-2 text-platinum hover:bg-platinum hover:text-dark-blue-3"
                  : "rounded-full border py-1.5 px-5 transition-all text-center text-sm font-inter flex justify-center items-center border-dark-blue-2 bg-transparent hover:bg-dark-blue-2 text-dark-blue-3 hover:text-platinum"
              }
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="md:hidden">
          <button onClick={toggleNavbar}>{isOpen ? <X className="mr-10 mt-5"/> : <Menu className="mr-10 mt-5"/>}</button>
        </div>
      </nav>
      {isOpen && (
        <div className="absolute z-20 top-0 glass p-10 h-screen w-2/3 flex flex-col items-center justify-center">
          <div className="h-2/3 flex flex-col items-center justify-between">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-3xl font-bold w-full text-center text-dark-blue-2"
                onClick={toggleNavbar}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
