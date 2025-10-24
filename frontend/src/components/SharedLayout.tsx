"use client";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className={`w-full px-8 py-4 flex items-center justify-between fixed top-0 z-50 bg-black/40 backdrop-blur-md shadow-lg transition-all duration-500`}>
      <div className="flex items-center gap-4">
  <img src="/logo.png" alt="Logo" width={80} height={80} className="rounded-md shadow-md" />
        <span className="text-white text-2xl font-extrabold tracking-wide">
          Signage & Printing Workshop
        </span>
      </div>
      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      <div className={`flex-col md:flex md:flex-row gap-8 absolute md:static bg-black/90 md:bg-transparent w-full md:w-auto left-0 top-16 md:top-0 transition-all duration-300 ${isOpen ? "flex p-4" : "hidden md:flex"}`}>
        {/* Use Next.js Link for navigation */}
        <Link href="/" className="text-gray-200 hover:text-white relative font-medium group transition">
          Home
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-teal-400 transition-all group-hover:w-full"></span>
        </Link>
        <Link href="/services" className="text-gray-200 hover:text-white relative font-medium group transition">
          Services
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-teal-400 transition-all group-hover:w-full"></span>
        </Link>
        <Link href="/about" className="text-gray-200 hover:text-white relative font-medium group transition">
          About Us
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-teal-400 transition-all group-hover:w-full"></span>
        </Link>
        <Link href="/contact" className="text-gray-200 hover:text-white relative font-medium group transition">
          Contact
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-teal-400 transition-all group-hover:w-full"></span>
        </Link>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="w-full bg-black py-14 px-0 sm:px-4 md:px-8 text-gray-300 border-t border-teal-500/40">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-4 break-words max-w-full overflow-x-auto">
          <span className="text-2xl font-bold tracking-wide text-white">Signage & Printing <span className="text-teal-400">Solutions</span></span>
          <p className="text-gray-400 max-w-md">Delivering premium signage, printing, and branding solutions for businesses and events.</p>
          <div className="space-y-1 text-gray-200 break-words max-w-full overflow-x-auto">
            <p className="break-words max-w-full overflow-x-auto">
                  Contact: 
                  <Link href="tel:9772801733" className="underline text-teal-400 hover:text-teal-300 ml-2 break-words max-w-full">9772801733</Link>, 
                  <Link href="tel:9772801777" className="underline text-teal-400 hover:text-teal-300 ml-1 break-words max-w-full">9772801777</Link>
            </p>
            <p className="break-words max-w-full overflow-x-auto">
                  Email: 
                  <Link href="mailto:signageworks483@gmail.com" className="underline text-teal-400 hover:text-teal-300 ml-2 break-words max-w-full">signageworks483@gmail.com</Link>, 
                  <Link href="mailto:narendraart.720@gmail.com" className="underline text-teal-400 hover:text-teal-300 ml-1 break-words max-w-full">narendraart.720@gmail.com</Link>
            </p>
            <p className="break-words max-w-full overflow-x-auto mt-2">
                  Location: Narendra Art & Signage, Near Main Market, City Center, YourTown, PIN 123456
                  <Link
                    href="https://www.google.com/maps/dir/?api=1&destination=Narendra+Art+%26+Signage+YourTown"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-teal-400 hover:text-teal-300 ml-2 break-words max-w-full"
                  >
                    Get Directions
                  </Link>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start md:items-end gap-4">
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <div className="flex flex-col gap-2">
            <Link href="/about" className="hover:text-teal-400">About Us</Link>
            <Link href="/services" className="hover:text-teal-400">Services</Link>
            {/* <Link href="/portfolio" className="hover:text-teal-400">Portfolio</Link> */}
            <Link href="/contact" className="hover:text-teal-400">Contact</Link>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center text-sm text-gray-500 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} Signage & Printing Solutions. All rights reserved.
      </div>
    </footer>
  );
}
