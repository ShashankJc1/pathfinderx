"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  name: string;
  email: string;
  exp: number;
}

export default function Header() {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      const { name }: DecodedToken = jwtDecode(token);
      setUserName(name);
    }
  }, []);

  return (
    <header className="bg-white shadow p-4">
      <h1 className="text-xl font-semibold">Welcome, {userName || "User"}!</h1>
    </header>
  );
}
