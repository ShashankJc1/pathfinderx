"use client";

import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" />
        <title>PathfinderX</title>
        <meta name="description" content="Explore the world with ease and comfort" />
      </head>
      <body>
        <Navbar />
        <main className="relative overflow-hidden" >{children}</main>
        <Footer />
      </body>
    </html>
  );
}
