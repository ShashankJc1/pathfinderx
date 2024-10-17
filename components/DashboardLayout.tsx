"use client";

import Navbar from "./Navbar";
import Header from "./Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const isLoggedIn = true; // Assume the user is logged in when on the dashboard

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar isLoggedIn={isLoggedIn} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
