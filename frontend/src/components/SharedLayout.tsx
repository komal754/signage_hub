// src/components/SiteShell.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Polished Navbar + Footer for a Signage business
 * - Removes glass box behind logo (uses compact circular logo with subtle ring)
 * - Replaces "Printing Workshop" with a more modern brand line: "Signage & Branding Studio"
 * - Smooth JS-measured mobile menu height (no clipping / no arbitrary max-h)
 * - Improved accessibility and focus styles
 *
 * Assumes Tailwind is present. Optional utilities: font-heading (if configured)
 */

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [menuHeight, setMenuHeight] = useState(0);

  const desktopLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  // measure mobile menu height to animate smoothly
  useEffect(() => {
    const measure = () => {
      if (!contentRef.current) return setMenuHeight(0);
      // scrollHeight gives required height to fully show content
      setMenuHeight(contentRef.current.scrollHeight);
    };
    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [desktopLinks.length]);

  // change navbar opacity/shadow after small scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/85 backdrop-blur-md shadow-md" : "bg-black/40 backdrop-blur-sm"
      }`}
      role="navigation"
      aria-label="Primary navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* left: logo + brand */}
          <div className="flex items-center gap-3">
            {/* Circular logo — no glass box */}
            <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center ring-2 ring-teal-400/20">
              <Image src="/logo.png" alt="Logo" width={48} height={48} className="object-contain" />
            </div>

            <div className="hidden sm:block">
              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-tight text-white font-heading">Signage & Branding Solutions</div>
                <div className="text-xs text-gray-300/80">Custom signs • Print • Install</div>
              </div>
            </div>
          </div>

          {/* hamburger */}
          <button
            onClick={() => setIsOpen((s) => !s)}
            aria-controls="primary-navigation"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            className="p-2 rounded-md text-white md:hidden focus:outline-none focus:ring-2 focus:ring-teal-300/40"
          >
            {isOpen ? (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* desktop links */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {desktopLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group relative inline-block text-gray-200 hover:text-white font-medium tracking-wide uppercase text-xs transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal-300/30 rounded"
              >
                <span className="px-1">{l.label}</span>
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-teal-400 transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* mobile menu: JS-measured height for smooth open/close */}
      <div
        id="primary-navigation"
        aria-hidden={!isOpen}
        style={{
          maxHeight: isOpen ? `${menuHeight}px` : 0,
          opacity: isOpen ? 1 : 0,
        }}
        className="md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out bg-black/95 border-t border-white/6"
      >
        <div ref={contentRef} className="flex flex-col gap-1 p-3">
          {desktopLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 rounded-md text-gray-200 hover:bg-white/4 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-teal-300/40"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="w-full bg-black py-14 px-4 sm:px-6 md:px-8 text-gray-300 border-t border-teal-500/40">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center ring-2 ring-teal-400/20">
              <Image src="/logo.png" alt="logo" width={48} height={48} className="object-contain" />
            </div>
            <div>
              <div className="text-xl font-semibold text-white font-heading">Signage & Branding Studio</div>
              <div className="text-sm text-gray-400">Design • Print • Install</div>
            </div>
          </div>

          <p className="text-gray-400 max-w-lg">
            Delivering premium signage, vehicle graphics, vinyl, and large-format printing — built to last and installed with care.
          </p>

          <div className="space-y-1 text-gray-200">
            <p>
              Contact:
              <Link href="tel:9772801733" className="underline text-teal-400 hover:text-teal-300 ml-2">
                9772801733
              </Link>
              ,
              <Link href="tel:9772801726" className="underline text-teal-400 hover:text-teal-300 ml-2">
                9772801726
              </Link>
            </p>

            <p>
              Email:
              <Link href="mailto:signageworks483@gmail.com" className="underline text-teal-400 hover:text-teal-300 ml-2">
                signageworks483@gmail.com
              </Link>
            </p>

            <p className="mt-2">
              Location: Narendra Add Agency, near marble market, opposite to Apna Bazaar, Bhiwadi, Rajasthan 301019
              <Link
                href="https://www.google.com/maps/dir/?api=1&destination=Narendra+Art+%26+Signage+YourTown"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-teal-400 hover:text-teal-300 ml-2"
              >
                Get Directions
              </Link>
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-4">
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <div className="flex flex-col gap-2">
            <Link href="/about" className="hover:text-teal-400">About</Link>
            <Link href="/services" className="hover:text-teal-400">Services</Link>
            <Link href="/contact" className="hover:text-teal-400">Contact</Link>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} Signage & Branding Studio. All rights reserved.
      </div>
    </footer>
  );
}
