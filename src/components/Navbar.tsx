"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Film, Compass, BarChart2 } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-[#070708]/85 backdrop-blur-md border-b border-white/5">
      {/* Brand Logo */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-neutral-200 to-neutral-600 flex items-center justify-center text-black font-bold text-sm shadow-inner group-hover:scale-105 transition-transform">
          <Film className="w-4 h-4 text-black" />
        </div>
        <span className="font-serif tracking-widest text-lg font-light uppercase text-neutral-100 group-hover:text-white transition-colors">
          CineMatch
        </span>
      </Link>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/10 rounded-full p-1 backdrop-blur-sm">
        <Link
          href="/"
          className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
            pathname === "/"
              ? "bg-white text-black font-semibold shadow-sm"
              : "text-neutral-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Home
        </Link>
        <Link
          href="/browse"
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
            pathname === "/browse"
              ? "bg-white text-black font-semibold shadow-sm"
              : "text-neutral-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Browse Studio</span>
        </Link>
        <Link
          href="/analysis"
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
            pathname === "/analysis"
              ? "bg-white text-black font-semibold shadow-sm"
              : "text-neutral-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <BarChart2 className="w-3.5 h-3.5" />
          <span>Dataset & Analysis</span>
        </Link>
      </nav>

      {/* Action CTA */}
      <div className="flex items-center gap-3">
        <Link
          href="/browse"
          className="text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 font-mono"
        >
          Start Browsing
        </Link>
      </div>
    </header>
  );
}
