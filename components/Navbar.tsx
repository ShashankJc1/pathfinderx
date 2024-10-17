"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { useState, useEffect } from "react";

// Public Navigation Links
const NAV_LINKS_PUBLIC = [
  { key: "home", label: "Home", href: "/pages/" },
  { key: "how", label: "How do we work?", href: "/pages/how-do-we-work" },
  { key: "services", label: "Services", href: "/pages/services" },
  { key: "discover", label: "Discover", href: "/pages/discover" },
  { key: "contact", label: "Contact Us", href: "/pages/contact-us" },
];

// Private (Logged-in) Navigation Links
const NAV_LINKS_PRIVATE = [
  { key: "home", label: "Home", href: "/dashboard" },
  { key: "profile", label: "Profile", href: "/pages/dashboard/profile" },
  { key: "search", label: "Search Flights/Hotels", href: "/pages/dashboard/search-flights-hotels" },
];

interface NavbarProps {
  isLoggedIn: boolean;
}

const Navbar = ({ isLoggedIn }: NavbarProps) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLoginClick = () => {
    router.push("/pages/login");
    setMenuOpen(false);
  };

  const handleLogoutClick = () => {
    document.cookie = "token=; Max-Age=0"; // Clear the token
    setMenuOpen(false);
    router.push("/pages/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-5">
      {/* Logo */}
      <Link href={isLoggedIn ? "/dashboard" : "/pages/"}>
        <Image src="/logo.svg" alt="logo" width={100} height={50} />
      </Link>

      {/* Navigation Links - Desktop */}
      <ul className="hidden lg:flex h-full gap-12">
        {(isLoggedIn ? NAV_LINKS_PRIVATE : NAV_LINKS_PUBLIC).map((link) => (
          <li key={link.key}>
            <Link href={link.href} className="regular-16 text-gray-50 hover:font-bold">
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
            icon="/user.svg"
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
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-2xl font-bold"
        >
          ✕
        </button>

        <div className="flex flex-col items-center justify-center h-full gap-6">
          {(isLoggedIn ? NAV_LINKS_PRIVATE : NAV_LINKS_PUBLIC).map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="regular-16 text-black transition-all hover:font-bold"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {isLoggedIn ? (
            <Button
              type="button"
              title="Logout"
              icon="/user.svg"
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
