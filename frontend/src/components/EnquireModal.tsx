"use client";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EnquireModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-md bg-gradient-to-br from-white via-teal-50 to-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 border border-teal-100"
        >
          {/* ✖️ Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-5 text-gray-400 hover:text-teal-600 text-3xl font-bold transition-transform hover:scale-110"
            aria-label="Close"
          >
            &times;
          </button>

          {/* 🏷️ Title */}
          <div className="text-center mb-6">
            <h2 className="text-4xl font-extrabold text-teal-600 mb-2">
              Enquire Now
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              Let’s create something extraordinary together!  
              Reach out for signage, printing, or branding solutions.
            </p>
          </div>

          {/* 📞 Contact Options */}
          <div className="flex flex-col gap-4">
            <a
              href="tel:9772801733"
              className="flex items-center gap-3 bg-gradient-to-r from-teal-100 to-teal-50 hover:from-teal-200 hover:to-teal-100 rounded-xl px-5 py-4 font-semibold text-teal-800 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Phone className="w-6 h-6 text-teal-600" /> Call Us
            </a>

            <a
              href="https://wa.me/919772801733"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-gradient-to-r from-green-100 to-green-50 hover:from-green-200 hover:to-green-100 rounded-xl px-5 py-4 font-semibold text-green-800 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <MessageCircle className="w-6 h-6 text-green-600" /> WhatsApp
            </a>

            <a
              href="mailto:signageworks483@gmail.com"
              className="flex items-center gap-3 bg-gradient-to-r from-blue-100 to-blue-50 hover:from-blue-200 hover:to-blue-100 rounded-xl px-5 py-4 font-semibold text-blue-800 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Mail className="w-6 h-6 text-blue-600" /> Email
            </a>
          </div>

          {/* 📝 Footer */}
          <div className="mt-6 text-center text-gray-500 text-sm">
            Prefer writing?{" "}
            <a
              href="/contact"
              className="text-teal-600 font-semibold hover:underline hover:text-teal-700 transition-colors"
            >
              Fill out our contact form
            </a>
          </div>

          {/* ✨ Subtle decorative glow */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-teal-200/30 via-transparent to-amber-100/30 blur-2xl -z-10"></div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
