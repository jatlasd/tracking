"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle('no-scroll', !isOpen);
  };
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/add", label: "Add Entry" },
    { href: "/add/quick", label: "Quick Add" },
    { href: "/filter", label: "Filter" },
    { href: "/trends", label: "Trends" },
    { href: "/archive", label: "Archive" }
  ];

  return (
    <>
      <nav className="flex justify-end w-full pt-3 mb-10">
        <div className="hidden gap-3 md:flex">
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
        <div className="z-50 md:hidden">
          <button onClick={toggleNavbar}>{isOpen ? <X className="mt-5 mr-10"/> : <Menu className="mt-5 mr-10"/>}</button>
        </div>
      </nav>
      {isOpen && (
        <div className="absolute top-0 z-20 flex flex-col items-center justify-center w-full h-screen pt-10 glass" onClick={toggleNavbar}>
          <div className="flex flex-col items-center justify-between h-2/3">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="w-full text-3xl font-bold text-center text-dark-blue-2"
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
