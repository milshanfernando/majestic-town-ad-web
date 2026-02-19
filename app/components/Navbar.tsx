"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20 relative">
          {/* Left Links (Desktop) */}
          <nav className="hidden md:flex gap-8 text-sm tracking-widest text-gray-700">
            <a href="#" className="hover:text-black transition">
              ABOUT
            </a>
            <a href="#" className="hover:text-black transition">
              ROOMS
            </a>
          </nav>

          {/* Center Luxury Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <h1
              className="text-2xl md:text-3xl tracking-[0.3em] font-semibold text-gray-900"
              style={{ fontFamily: "var(--font-luxury)" }}
            >
              MAJESTIC TOWN
            </h1>
            <div className="w-12 h-[1px] bg-gray-400 mx-auto mt-2"></div>
          </div>

          {/* Right Links (Desktop) */}
          <nav className="hidden md:flex gap-8 text-sm tracking-widest text-gray-700">
            <a href="#" className="hover:text-black transition">
              GALLERY
            </a>
            <a href="#" className="hover:text-black transition">
              CONTACT
            </a>
          </nav>

          {/* Mobile Button */}
          <button
            className="md:hidden z-50"
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Always in DOM, hide/show with CSS) */}
      <div
        className={`md:hidden bg-white border-t border-gray-200 overflow-hidden transition-all duration-300 ${
          open ? "max-h-screen py-8" : "max-h-0 py-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6 tracking-widest text-gray-700">
          <a href="#" onClick={() => setOpen(false)}>
            ABOUT
          </a>
          <a href="#" onClick={() => setOpen(false)}>
            ROOMS
          </a>
          <a href="#" onClick={() => setOpen(false)}>
            GALLERY
          </a>
          <a href="#" onClick={() => setOpen(false)}>
            CONTACT
          </a>
        </div>
      </div>
    </header>
  );
}
