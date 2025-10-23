"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navbar, Footer } from "@/components/SharedLayout";
import Image from "next/image";
import FloatingContactButton from "@/components/FloatingContactButton";

export default function AboutUsPage() {
  const uniqueApproachImages = [
    {
      src: "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050078/WhatsApp_Image_2025-10-19_at_11.00.06_PM_1_nwocxo.jpg",
      alt: "Traditional Advertisement",
    },
    {
      src: "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050111/20251020_193833_caxi72.jpg",
      alt: "Modern Digital Signage",
    },
    {
      src: "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050095/WhatsApp_Image_2025-10-19_at_10.34.25_PM_1_z5cnfm.jpg",
      alt: "Traditional Advertisement",
    },
    {
      src: "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050095/WhatsApp_Image_2025-10-19_at_10.34.26_PM_1_bka4tc.jpg",
      alt: "Modern Digital Signage",
    }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 font-sans w-full px-0 sm:px-4 md:px-8 pt-32">
        <FloatingContactButton />

        {/* ---------- Hero Section ---------- */}
        <section className="max-w-7xl mx-auto px-0 sm:px-4 text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 drop-shadow-lg tracking-tight">
            About <span className="text-teal-500">Us</span>
          </h1>
          <p className="text-gray-600 md:text-lg max-w-3xl mx-auto leading-relaxed">
            Proudly serving businesses for over{" "}
            <span className="font-semibold text-teal-600">27 years</span>, we blend tradition with innovation to deliver standout advertising solutions.
          </p>
        </section>

        {/* ---------- Our Story ---------- */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center"
        >
          <Image
            src="https://res.cloudinary.com/dnonho9dg/image/upload/v1761059393/name_csv3cv.jpg"
            alt="Our Story"
            width={800}
            height={400}
            className="w-full rounded-2xl shadow-lg object-cover h-80 md:h-[400px]"
          />
          <div>
            <h2 className="text-4xl font-bold text-teal-600 mb-4 tracking-wide">Our Story</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              For over <span className="font-semibold text-teal-600">27 years</span>, we’ve transformed spaces with impactful signage — from hand-painted murals to digital displays — combining creativity, precision, and passion.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our team bridges the gap between classical methods and modern technologies, ensuring every project reflects both authenticity and innovation.
            </p>

            {/* ---------- Stats Block ---------- */}
            <div className="mt-8 flex gap-8 justify-center md:justify-start">
              <div className="text-center">
                <h3 className="text-5xl font-extrabold text-teal-500">27+</h3>
                <p className="text-gray-700 font-medium">Years of Excellence</p>
              </div>
              <div className="text-center">
                <h3 className="text-5xl font-extrabold text-teal-500">1200+</h3>
                <p className="text-gray-700 font-medium">Projects Completed</p>
              </div>
              <div className="text-center">
                <h3 className="text-5xl font-extrabold text-teal-500">900+</h3>
                <p className="text-gray-700 font-medium">Happy Clients</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ---------- Unique Approach ---------- */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.1, delay: 0.1 }}
          className="mt-32 max-w-7xl mx-auto px-4 space-y-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-teal-600 border-l-4 border-teal-400 pl-4 tracking-wide">
            Our Unique Approach
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Traditional Advertising</h3>
                <p className="text-gray-700">
                  Hand-painted murals, artistic signage, and custom-crafted pieces make each advertisement unique and memorable. These methods evoke a sense of craftsmanship that modern digital signage sometimes lacks.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Modern Digital Signage</h3>
                <p className="text-gray-700">
                  In the fast-paced digital age, LED displays, interactive kiosks, and dynamic content allow us to engage audiences in real-time. We integrate these with traditional approaches for a comprehensive advertising strategy.
                </p>
              </div>
            </div>
            <ImageSlider images={uniqueApproachImages} />
          </div>
        </motion.section>

        {/* ---------- Contact CTA ---------- */}
        <section className="text-center py-20 bg-gradient-to-r from-teal-400 to-cyan-400 text-white mt-32">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg tracking-tight">Want to Work With Us?</h2>
          <a href="/contact">
            <Button className="bg-white text-teal-500 font-bold px-10 py-4 rounded-full shadow-lg hover:scale-105 transform transition">
              Contact Us Today
            </Button>
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}

// Modern Image Slider with Arrows + Dots
function ImageSlider({ images }: { images: { src: string; alt: string }[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const goTo = (index: number) => setCurrentIndex(index);

  return (
    <div className="relative w-full rounded-2xl shadow-lg overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="w-full object-cover h-80 md:h-[400px]"
        >
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            width={800}
            height={400}
            className="w-full object-cover h-80 md:h-[400px]"
          />
        </motion.div>
      </AnimatePresence>

      {/* Left Arrow */}
      <button
        onClick={prev}
        className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white/40 hover:bg-teal-500/70 text-white p-2 rounded-full shadow-md transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={next}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white/40 hover:bg-teal-500/70 text-white p-2 rounded-full shadow-md transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`w-3 h-3 rounded-full transition ${
              currentIndex === index ? "bg-teal-500" : "bg-white/50 hover:bg-teal-400/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
