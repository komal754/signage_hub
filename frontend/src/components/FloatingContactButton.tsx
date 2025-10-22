"use client";
import { useState } from "react";
import { Phone, Mail, MessageCircle, X } from "lucide-react";

export default function FloatingContactButton() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[9999] w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 shadow-lg shadow-cyan-400/30 flex items-center justify-center text-white text-3xl transition-transform duration-300 hover:scale-110 focus:outline-none"
        aria-label="Contact"
      >
        💬
      </button>

      {/* Contact Panel */}
      <div
        className={`fixed bottom-24 right-6 z-[9999] w-72 bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <span className="text-teal-600 font-semibold text-lg">Get in Touch</span>
          <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-teal-500 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-2 p-4">
          <a
            href="tel:9772801733"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-teal-50 transition text-teal-700 font-medium"
          >
            <Phone className="w-5 h-5 text-teal-500" /> Call Us
          </a>

          <a
            href="https://wa.me/919772801733"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-50 transition text-green-700 font-medium"
          >
            <MessageCircle className="w-5 h-5 text-green-500" /> WhatsApp
          </a>

          <a
            href="mailto:signageworks483@gmail.com"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-50 transition text-blue-700 font-medium"
          >
            <Mail className="w-5 h-5 text-blue-500" /> Email
          </a>
        </div>
      </div>

      <style jsx>{`
        /* Smooth slide animation */
        .transition-all {
          transition: all 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}
