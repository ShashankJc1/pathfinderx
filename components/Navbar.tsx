"use client";

import { NAV_LINKS } from "@/constants"; // Import the navigation links
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // For client-side navigation
import Button from "./Button";

const Navbar = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-5">
      {/* Logo */}
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={100} height={50} />
      </Link>

      {/* Navigation Links */}
      <ul className="hidden h-full gap-12 lg:flex">
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

      {/* Login Button */}
      <div className="lg:flexCenter hidden">
        <Button
          type="button"
          title="Login"
          icon="/user.svg"
          variant="btn_dark_green"
          onClick={handleLoginClick}
        />
      </div>

      {/* Hamburger Menu Icon */}
      <Image
        src="/menu.svg"
        alt="menu"
        width={32}
        height={32}
        className="inline-block cursor-pointer lg:hidden"
      />
    </nav>
  );
};

export default Navbar;
