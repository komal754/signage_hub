"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FloatingContactButton from "@/components/FloatingContactButton";

// Fetch carousel images from backend
type CarouselImage = {
  _id?: string;
  url: string;
  title?: string;
};

function useCarouselImages(): CarouselImage[] {
  const [images, setImages] = useState<CarouselImage[]>([]);
  useEffect(() => {
    // fetch("http://localhost:5000/api/carousel")
    fetch("https://signage-hub.onrender.com/api/carousel")

      .then(res => res.json())
      .then(data => setImages(data))
      .catch(() => setImages([]));
  }, []);
  return images;
}

const portfolio = [
  { img: "/portfolio/product1.jpg", title: "LED Signage", desc: "Bright, energy-efficient LED boards for shopfronts and interiors." },
  { img: "/portfolio/product2.jpg", title: "Digital Signage Solutions", desc: "Interactive screens and digital displays for modern businesses." },
  { img: "/portfolio/product3.jpg", title: "Event Branding", desc: "Banners, stands, and promotional materials for events." },
  { img: "/portfolio/product4.jpg", title: "Banners & Posters", desc: "Large-format banners and posters for advertising and events." },
  { img: "/portfolio/product5.jpg", title: "Painting Works", desc: "Indoor and outdoor painting services for shops and offices." },
  { img: "/portfolio/product6.jpg", title: "Vinyl Stickers & Decals", desc: "Custom vinyl graphics for vehicles, walls, and windows." },
  { img: "/portfolio/product7.jpg", title: "Shop Signboards", desc: "Durable and stylish outdoor signage for shops and businesses." },
  { img: "/portfolio/product9.jpg", title: "Business Cards & Flyers", desc: "Professional printed materials to promote your brand." },
  { img: "/portfolio/product10.jpg", title: "Directional & Wayfinding Signs", desc: "Indoor and outdoor signs for guiding visitors effectively." },
];

export default function Home() {
    const [category, setCategory] = useState<"signage" | "painting">("signage");

  // Removed unused sticky state
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const carouselImages = useCarouselImages();
const collageImages: Record<"signage" | "painting", string[]> = {
  signage: [
  
    // "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050078/WhatsApp_Image_2025-10-19_at_11.00.05_PM_1_yevten.jpg",
    // // "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050078/WhatsApp_Image_2025-10-19_at_11.00.08_PM_1_kdh90p.jpg",
    // "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050077/WhatsApp_Image_2025-10-19_at_10.59.57_PM_cgvyzc.jpg",
    // "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050076/WhatsApp_Image_2025-10-19_at_11.00.10_PM_1_wjh4uh.jpg",
    // "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050092/WhatsApp_Image_2025-10-19_at_10.34.29_PM_klvx2x.jpg",
    // "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050078/WhatsApp_Image_2025-10-19_at_11.00.00_PM_pcvxtn.jpg",
    // "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050079/WhatsApp_Image_2025-10-19_at_10.59.47_PM_sk4jdx.jpg",
    // "https://res.cloudinary.com/dnonho9dg/image/upload/v1761229039/WhatsApp_Image_2025-10-18_at_3.49.04_PM_ajkdpr.jpg",
    // "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050094/WhatsApp_Image_2025-10-19_at_10.34.27_PM_1_cfmlrb.jpg",
    "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050111/20251020_193833_caxi72.jpg",
    "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050100/WhatsApp_Image_2025-10-19_at_10.34.20_PM_m7xxug.jpg",
    "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050094/WhatsApp_Image_2025-10-19_at_10.34.27_PM_1_cfmlrb.jpg",
    "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050092/WhatsApp_Image_2025-10-19_at_10.34.29_PM_klvx2x.jpg",
    "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050090/WhatsApp_Image_2025-10-19_at_10.34.28_PM_1_ovaisq.jpg",
    "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050078/WhatsApp_Image_2025-10-19_at_11.00.05_PM_1_yevten.jpg",
    "https://res.cloudinary.com/dnonho9dg/image/upload/v1760783474/WhatsApp_Image_2025-10-18_at_3.57.52_PM_l9b7h7.jpg",
    "https://res.cloudinary.com/dnonho9dg/image/upload/v1760783473/WhatsApp_Image_2025-10-18_at_3.57.48_PM_lqnkoe.jpg",
  ],
  painting: [
    // "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050095/WhatsApp_Image_2025-10-19_at_10.34.25_PM_1_z5cnfm.jpg",
    // "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050100/WhatsApp_Image_2025-10-19_at_10.34.21_PM_smehnq.jpg",
    // "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050100/WhatsApp_Image_2025-10-19_at_10.34.20_PM_1_tq5ici.jpg",
    // "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050090/WhatsApp_Image_2025-10-20_at_12.30.46_AM_tuagnu.jpg",
    // "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050089/WhatsApp_Image_2025-10-20_at_12.25.38_AM_isdi7k.jpg",
    //  "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050077/WhatsApp_Image_2025-10-19_at_10.59.56_PM_zrhocp.jpg",
    //  "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050078/WhatsApp_Image_2025-10-19_at_11.00.07_PM_l98bk9.jpg",
    // //  "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050076/WhatsApp_Image_2025-10-19_at_10.59.48_PM_bmnp4a.jpg",
    "https://res.cloudinary.com/dnonho9dg/image/upload/v1761304667/WhatsApp_Image_2025-10-24_at_2.35.01_AM_2_o18mhk.jpg",
    "https://res.cloudinary.com/dnonho9dg/image/upload/v1761304667/WhatsApp_Image_2025-10-24_at_2.34.57_AM_1_vyac2k.jpg",
    "https://res.cloudinary.com/dnonho9dg/image/upload/v1761304667/WhatsApp_Image_2025-10-24_at_2.34.57_AM_hslohr.jpg",
    "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050100/WhatsApp_Image_2025-10-19_at_10.34.21_PM_smehnq.jpg",
    "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050090/WhatsApp_Image_2025-10-20_at_12.30.46_AM_tuagnu.jpg",
    "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050089/WhatsApp_Image_2025-10-20_at_12.25.38_AM_isdi7k.jpg",
    "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050084/WhatsApp_Image_2025-10-19_at_11.00.13_PM_pnts4r.jpg",
    "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050077/WhatsApp_Image_2025-10-19_at_10.59.56_PM_zrhocp.jpg",
  ],
};


  // Navbar sticky effect
  useEffect(() => {
  // Removed sticky scroll effect since sticky state is unused
  }, []);

  // Auto-scroll carousel effect


  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-0 sm:px-4">
        <div className="absolute inset-0 bg-gradient-radial from-teal-500/20 via-transparent to-transparent blur-3xl" />
  <div className="flex flex-col lg:flex-row items-center justify-center gap-8 relative w-full max-w-xs sm:max-w-md lg:max-w-3xl mx-auto">
          <Image
            src="/logo.png"
            alt="Signage Logo"
            width={128}
            height={128}
            className="animate-[pulse_2s_infinite] drop-shadow-[0_0_40px_#14b8a6] mx-auto"
          />
          <span className="mt-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300 text-3xl font-extrabold tracking-[0.3em] animate-fade-in text-center">
            The Ultimate Advertising Solution
          </span>
          <div className="mt-8 w-12 h-12 border-4 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 w-16 h-16 flex items-center justify-center" style={{maxWidth: '100vw', overflow: 'hidden'}}>
        <FloatingContactButton />
      </div>
  <main className="min-h-screen bg-gray-50 font-sans w-full px-0">

  {/* Navbar */}
      <nav className="w-full px-0 sm:px-4 md:px-8 py-4 flex items-center justify-between fixed top-0 z-50 bg-black/40 backdrop-blur-md shadow-lg transition-all duration-500">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="Logo" width={80} height={80} className="rounded-md shadow-md" />
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

    {/* Hero Section */}
  <section id="about" className="relative w-full h-[90vh] flex items-center justify-center text-center overflow-hidden pt-24 px-0">
        <Image src="/hero-bg.jpg" alt="Workshop" fill style={{ objectFit: "cover" }} priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="relative z-10 px-6 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-lg leading-tight mb-6"
          >
            One-Stop <span className="text-teal-400">Signage</span> & <span className="text-amber-400">Printing</span> Solutions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg md:text-2xl text-gray-200 leading-relaxed mb-8"
          >
            <span className="font-semibold text-teal-300">The Ultimate Advertising Solution</span><br />
            Modern, high-quality signage, printing & painting for every business.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex gap-4 flex-wrap justify-center">
            <Link href="/services">
              <Button className="bg-teal-400 text-black hover:bg-teal-500 px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-teal-500/40 transition">View Services</Button>
            </Link>
            <Link href="/about">
              <Button className="bg-amber-400 text-white hover:bg-amber-500 px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-amber-400/40 transition">About Us</Button>
            </Link>
            <Link href="/contact">
              <Button className="bg-teal-500 text-white hover:bg-teal-600 px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-teal-500/40 transition">Contact</Button>
            </Link>
          </motion.div>
        </div>
      </section>

    {/* Portfolio Section */}
  <section id="services" className="relative w-full py-20 px-0 bg-gradient-to-b from-gray-50 via-white to-gray-100">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Explore Our Solutions</h2>
          <div className="mt-2 h-1 w-16 bg-teal-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover our range of services and premium projects designed to elevate your brand.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolio.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-xl shadow-xl hover:shadow-2xl hover:shadow-teal-200/40 transform hover:-translate-y-3 transition-all duration-500 group"
            >
              <div className="relative h-60 w-full overflow-hidden rounded-t-xl">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500 rounded-t-xl"></div>
              </div>
              <div className="p-6 flex flex-col items-center">
                <h3 className="text-xl font-bold mb-2 text-gray-900 text-center">{item.title}</h3>
                <p className="text-gray-600 text-center">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

{/* 🌟 Recent Works Section - Modern Auto Scroll Carousel */}
{/* 🌟 Recent Works Section - Modern Auto Scroll Carousel */}
<section className="relative w-full py-24 px-0 sm:px-6 bg-gradient-to-b from-gray-50 via-white to-gray-100 overflow-hidden">
  <div className="mb-14 text-center">
    <h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-500 drop-shadow-md">
      Recent Works
    </h2>
    <div className="mt-3 h-1 w-20 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto rounded-full"></div>
    <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
      Explore our latest creative signage and printing projects, crafted with precision and passion.
    </p>
  </div>

  {/* Auto-scroll carousel rows */}
  <div className="relative flex overflow-x-hidden mb-24">
    {/* Row 1 */}
    <div className="flex animate-scroll-x gap-8">
      {carouselImages.map((img, idx) => (
        <motion.div
          key={img._id || idx}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
          viewport={{ once: true }}
          className="relative min-w-[300px] bg-white/30 backdrop-blur-lg border border-gray-200/40 rounded-2xl overflow-hidden shadow-lg hover:shadow-teal-300/30 transition-all duration-500 hover:-translate-y-2"
        >
          <div className="relative h-60 w-full overflow-hidden">
            <Image
              src={img.url}
              alt={img.title || "Recent Work"}
              fill
              className="object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-4">
              <h3 className="text-white text-lg font-semibold text-center">
                {img.title || "Untitled Project"}
              </h3>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Duplicate for infinite loop */}
    <div className="flex animate-scroll-x gap-8">
      {carouselImages.map((img, idx) => (
        <motion.div
          key={`dup-${img._id || idx}`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
          viewport={{ once: true }}
          className="relative min-w-[300px] bg-white/30 backdrop-blur-lg border border-gray-200/40 rounded-2xl overflow-hidden shadow-lg hover:shadow-teal-300/30 transition-all duration-500 hover:-translate-y-2"
        >
          <div className="relative h-60 w-full overflow-hidden">
            <Image
              src={img.url}
              alt={img.title || "Recent Work"}
              fill
              className="object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-4">
              <h3 className="text-white text-lg font-semibold text-center">
                {img.title || "Untitled Project"}
              </h3>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
{/* collage gallery */}
{/* 🌈 Collage Gallery Section */}
<section className="py-24 relative bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden px-0 w-full">
  <div className="text-center mb-12">
    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
      Our Work Gallery
    </h2>
    <p className="text-gray-600 mt-3 text-lg">
      Discover our creative excellence in{" "}
      <span className="font-semibold text-gray-800">{category}</span> works.
    </p>

    {/* Toggle Buttons */}
    <div className="mt-6 flex justify-center gap-4">
      {["signage", "painting"].map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat as "signage" | "painting")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            category === cat
              ? "bg-black text-white shadow-lg scale-105"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {cat === "signage" ? "Signage Works" : "Painting Works"}
        </button>
      ))}
    </div>
  </div>

  {/* Collage Container */}
  <motion.div
    className="relative max-w-6xl mx-auto flex items-center justify-center h-[600px] sm:h-[500px] md:h-[600px] group sm:overflow-visible overflow-x-auto scrollbar-hide"
    initial="stacked"
    whileHover="spread"
    variants={{
      stacked: {},
      spread: {},
    }}
    style={{ WebkitOverflowScrolling: 'touch' }}
  >
    {collageImages[category].map((src, i) => {
      const total = collageImages[category].length;
      const angle = (i / total) * 2 * Math.PI;
      const radius = 220; // circle radius (adjust for spacing)
      const xTarget = radius * Math.cos(angle);
      const yTarget = radius * Math.sin(angle);
      return (
        <motion.div
          key={i}
          className={
            `w-64 h-80 rounded-2xl overflow-hidden shadow-xl cursor-pointer border border-gray-200/40 bg-white group/box flex-shrink-0 mr-4 sm:absolute sm:w-48 sm:h-64 sm:rounded-2xl sm:overflow-hidden sm:shadow-xl sm:cursor-pointer sm:border sm:border-gray-200/40 sm:bg-white sm:group/box`
          }
          variants={{
            stacked: {
              x: 0,
              y: 0,
              rotate: Math.random() * 25 - 12,
              zIndex: i,
              scale: 1,
            },
            spread: {
              x: xTarget,
              y: yTarget,
              rotate: 0,
              zIndex: 10,
              scale: 1.05,
            },
          }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 18,
            mass: 1.2,
          }}
        >
          {/* Image */}
          <Image
            src={src}
            alt={`Gallery ${i + 1}`}
            width={256}
            height={320}
            className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover/box:scale-110"
          />
          {/* Overlay with Smooth Fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/box:opacity-100 transition-all duration-700 ease-in-out flex items-center justify-center text-white text-lg font-semibold tracking-wide">
            {category === "signage" ? "Signage Design" : "Painting Work"}
          </div>
        </motion.div>
      );
    })}
  </motion.div>

  <p className="text-center text-gray-500 mt-16 max-w-xl mx-auto">
    Hover to reveal our full gallery in motion.
  </p>
</section>


</section>


  {/* CTA Section */}
  <section id="contact" className="relative bg-gradient-to-r from-teal-400 to-cyan-400 text-white py-24 text-center px-0 sm:px-10">
  <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">Your Brand Deserves the Best Signage</h2>
  <a href="/contact" className="bg-white text-teal-500 font-bold px-10 py-4 rounded-full shadow-lg hover:scale-105 transform transition inline-block">Get Started Today</a>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black py-14 px-0 sm:px-8 text-gray-300 border-t border-teal-500/40">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-4">
            <span className="text-2xl font-bold tracking-wide text-white">Signage & Printing <span className="text-teal-400">Solutions</span></span>
            <p className="text-gray-400 max-w-md">Delivering premium signage, printing, and branding solutions for businesses and events.</p>
            <div className="space-y-1 text-gray-200 break-words overflow-x-auto max-w-full">
              <p>
                Contact: 
                <a href="tel:9772801733" className="underline text-teal-400 hover:text-teal-300 ml-2">
                  9772801733
                </a>, 
                <a href="tel:9772801777" className="underline text-teal-400 hover:text-teal-300 ml-1">
                  9772801726
                </a>
              </p>
              <p>
                Email: 
                <a href="mailto:signageworks483@gmail.com" className="underline text-teal-400 hover:text-teal-300 ml-2">
                  signageworks483@gmail.com
                </a>, 
                {/* <br /> */}
                <a href="mailto:info@signworkshop.com" className="underline text-teal-400 hover:text-teal-300 ml-1">
                  narendraart.720@gmail.com
                </a>
              </p>
              <p className="mt-2">
                Location: Narendra Add Agency, near marble market, opposite to apna bazaar, Bhiwadi, Rajasthan 301019
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Narendra+Add+Agency+Bhiwadi+Rajasthan+301019"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-teal-400 hover:text-teal-300 ml-2"
                >
                  Get Directions
                </a>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end gap-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <a href="#about" className="hover:text-teal-400">About Us</a>
              <a href="#services" className="hover:text-teal-400">Services</a>
              {/* <a href="#portfolio" className="hover:text-teal-400">Portfolio</a> */}
              <a href="#contact" className="hover:text-teal-400">Contact</a>
            </div>
          </div>
        </div>
        <div className="mt-10 text-center text-sm text-gray-500 border-t border-gray-700 pt-6">
          © {new Date().getFullYear()} Signage & Printing Solutions. All rights reserved.
        </div>
      </footer>
  </main>
  </>
  );
}
