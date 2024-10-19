"use client";

import { NAV_LINKS } from "@/constants"; 
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation"; 
import Button from "./Button";
import { useState, useEffect } from "react"; 

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname() ?? '';  // Provide an empty string as fallback
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Hide navbar on dashboard or dashboard-related pages
  useEffect(() => {
    if (pathname.startsWith("/pages/dashboard")) {
      setIsLoggedIn(false);
    } else {
      const token = document.cookie.includes("token"); // Check if token exists in cookies
      setIsLoggedIn(token);
    }
  }, [pathname]);

  const handleLoginClick = () => {
    router.push("/pages/login"); 
    setMenuOpen(false); 
  };

  const handleLogoutClick = () => {
    document.cookie = "token=; Max-Age=0; path=/"; // Clear the token cookie
    setIsLoggedIn(false);
    router.push("/pages/login"); // Redirect to login page
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle menu open/close
  };

  // Hide navbar on the dashboard or its subpages
  if (pathname.startsWith("/pages/dashboard")) {
    return null; // Don't render the navbar
  }

  return (
    <nav className="bg-white text-black shadow-md flexBetween max-container padding-container relative z-30 py-5">
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
              className="regular-16 text-black hover:text-green-600 transition-colors pb-1.5"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Login/Logout Button - Desktop */}
      <div className="lg:flexCenter hidden">
        {isLoggedIn ? (
          <Button
            type="button"
            title="Logout"
            icon="/logout.svg"
            variant="btn_dark_green"
            onClick={handleLogoutClick}
          />
        ) : (
          <Button
            type="button"
            title="Login"
            icon="/user.svg"
            variant="btn_dark_green"
            onClick={handleLoginClick}
          />
        )}
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
              className="regular-16 text-black hover:text-green-600 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Login/Logout Button - Mobile */}
          {isLoggedIn ? (
            <Button
              type="button"
              title="Logout"
              icon="/logout.svg"
              variant="btn_dark_green"
              onClick={handleLogoutClick}
            />
          ) : (
            <Button
              type="button"
              title="Login"
              icon="/user.svg"
              variant="btn_dark_green"
              onClick={handleLoginClick}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
