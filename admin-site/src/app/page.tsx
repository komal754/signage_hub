"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, Users2, Images } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 px-6 text-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-gray-900/70 backdrop-blur-2xl border border-gray-800 rounded-3xl shadow-2xl p-10 sm:p-14 max-w-2xl w-full text-center overflow-hidden"
      >
        {/* Ambient gradient decor */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl"></div>

        {/* Heading */}
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-teal-400 bg-clip-text text-transparent mb-4"
        >
          Admin Panel
        </motion.h1>

        {/* Subtext */}
        <p className="text-gray-400 mt-2 text-lg leading-relaxed">
          Welcome back! Effortlessly manage your{" "}
          <span className="font-semibold text-indigo-400">dashboard</span>, oversee{" "}
          <span className="font-semibold text-indigo-400">contacts</span>, and
          keep your <span className="font-semibold text-indigo-400">insights</span> up to date.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-5 mt-10">
          <motion.a
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            href="/dashboard"
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-7 py-3 rounded-xl shadow-md hover:shadow-indigo-500/30 transition"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            href="/contacts"
            className="flex items-center gap-2 border border-gray-700 px-7 py-3 rounded-xl text-indigo-300 bg-gray-900/80 hover:bg-gray-800 shadow-md hover:shadow-indigo-400/20 transition"
          >
            <Users2 className="w-5 h-5 text-indigo-400" />
            Contacts
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            href="/carousel"
            className="flex items-center gap-2 border border-gray-700 px-7 py-3 rounded-xl text-teal-300 bg-gray-900/80 hover:bg-gray-800 shadow-md hover:shadow-teal-400/20 transition"
          >
            <Images className="w-5 h-5 text-teal-400" />
            Carousel
          </motion.a>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-10">
          Designed for clarity • Built with Next.js ⚡
        </p>
      </motion.div>
    </div>
  );
}
