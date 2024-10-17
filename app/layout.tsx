"use client";

import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status based on session or token
  useEffect(() => {
    // Replace this with your actual login check logic
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" />
        <title>PathfinderX</title>
        <meta name="description" content="Explore the world with ease and comfort" />
      </head>
      <body>
        {/* Provide the required isLoggedIn prop */}
        <Navbar isLoggedIn={isLoggedIn} />
        <main className="relative overflow-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
