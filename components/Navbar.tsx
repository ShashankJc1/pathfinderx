"use client";

import { NAV_LINKS } from "@/constants"; 
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import Button from "./Button";
import { useState } from "react"; 

const Navbar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLoginClick = () => {
    router.push("/login"); 
    setMenuOpen(false); 
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle menu open/close
  };

  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-5">
      {/* Logo */}
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={100} height={50} />
      </Link>

      {/* Navigation Links - Desktop */}
      <ul className="hidden lg:flex h-full gap-12">
        {NAV_LINKS.map((link) => (
          <li key={link.key}>
            <Link
              href={link.href}
              className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Login Button - Desktop */}
      <div className="lg:flexCenter hidden">
        <Button
          type="button"
          title="Login"
          icon="/user.svg"
          variant="btn_dark_green"
          onClick={handleLoginClick}
        />
      </div>

      {/* Hamburger Icon - Mobile */}
      <Image
        src="/menu.svg"
        alt="menu"
        width={32}
        height={32}
        className="inline-block cursor-pointer lg:hidden"
        onClick={toggleMenu} 
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-3/4 max-w-sm h-full bg-white shadow-lg transition-transform duration-500 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        {/* Close Button */}
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-2xl font-bold"
        >
          ✕
        </button>

        <div className="flex flex-col items-center justify-center h-full gap-6">
          {/* Navigation Links - Mobile */}
          {NAV_LINKS.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="regular-16 text-black transition-all hover:font-bold"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Login Button - Mobile */}
          <Button
            type="button"
            title="Login"
            icon="/user.svg"
            variant="btn_dark_green"
            onClick={handleLoginClick}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
