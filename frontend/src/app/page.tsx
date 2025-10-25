"use client";

import { useState, useEffect,useRef } from "react";
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
const placeholderItems = Array(6).fill({ title: "Loading..." });

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
const COLLAGE_IMAGES: Record<"signage" | "painting", string[]> = {
  signage: [
    "https://res.cloudinary.com/dnonho9dg/image/upload/v1761401268/download_2_wagbch.jpg",
    "https://res.cloudinary.com/dnonho9dg/image/upload/v1761401269/3d_backlit_sign_3d_led_signage_custom_outdoor_logo_light_sign_3d_custom_sign_for_office_3d_sign_fng6we.jpg",
      "https://res.cloudinary.com/dnonho9dg/image/upload/v1761401277/Acrylic_Door_Signs_v8woof.jpg",
      "https://res.cloudinary.com/dnonho9dg/image/upload/v1761400215/WhatsApp_Image_2025-10-24_at_10.16.17_PM_1_sksljf.jpg",
      "https://res.cloudinary.com/dnonho9dg/image/upload/v1760783473/WhatsApp_Image_2025-10-18_at_3.57.48_PM_lqnkoe.jpg",
    "https://res.cloudinary.com/dnonho9dg/image/upload/v1761401269/download_1_yza79k.jpg",
    // "https://res.cloudinary.com/dnonho9dg/image/upload/v1761401269/download_1_yza79k.jpg",
    "https://res.cloudinary.com/dnonho9dg/image/upload/v1761401268/Let_s_Celebrate_Neon_Sign_1_-_Large_W85cm_x_H45cm___Red_kgb9zb.jpg",

    "https://res.cloudinary.com/dnonho9dg/image/upload/v1761401268/nz-made_house_numbers_address_personalised_signs_iivk0x.jpg",
    "https://res.cloudinary.com/dnonho9dg/image/upload/v1761400216/WhatsApp_Image_2025-10-24_at_10.16.11_PM_fdbnhs.jpg",
    "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050111/20251020_193833_caxi72.jpg",
    "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050076/WhatsApp_Image_2025-10-19_at_11.00.05_PM_pbflko.jpg",
    "https://res.cloudinary.com/dnonho9dg/image/upload/v1761401269/download_ybskby.jpg",
    "https://res.cloudinary.com/dnonho9dg/image/upload/v1760783473/WhatsApp_Image_2025-10-18_at_3.49.04_PM_oj6mt2.jpg",
    // "https://res.cloudinary.com/dnonho9dg/image/upload/v1761401269/Custom_Beauty_Salon_Logo_Sign_Backlit_Personalized_Acrylic_salon_Sign_3D_Backlit_Round_Salon_Sign_cxesdk.jpg",

  ],
  painting: [
    // "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050095/WhatsApp_Image_2025-10-19_at_10.34.25_PM_1_z5cnfm.jpg",
    // "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050100/WhatsApp_Image_2025-10-19_at_10.34.21_PM_smehnq.jpg",
    // "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050100/WhatsApp_Image_2025-10-19_at_10.34.20_PM_1_tq5ici.jpg",
    // "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050090/WhatsApp_Image_2025-10-20_at_12.30.46_AM_tuagnu.jpg",
    // // "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050089/WhatsApp_Image_2025-10-20_at_12.25.38_AM_isdi7k.jpg",
    //  "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050077/WhatsApp_Image_2025-10-19_at_10.59.56_PM_zrhocp.jpg",
    //  "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050078/WhatsApp_Image_2025-10-19_at_11.00.07_PM_l98bk9.jpg",
    // //  "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050076/WhatsApp_Image_2025-10-19_at_10.59.48_PM_bmnp4a.jpg",
    "https://res.cloudinary.com/dnonho9dg/image/upload/v1761304668/WhatsApp_Image_2025-10-24_at_2.35.00_AM_kgxfpr.jpg",

 "https://res.cloudinary.com/dnonho9dg/image/upload/v1761304668/WhatsApp_Image_2025-10-24_at_2.35.01_AM_1_mkcohf.jpg",
 "https://res.cloudinary.com/dnonho9dg/image/upload/v1761304667/WhatsApp_Image_2025-10-24_at_2.34.58_AM_uaqxsf.jpg",
 "https://res.cloudinary.com/dnonho9dg/image/upload/v1761304667/WhatsApp_Image_2025-10-24_at_2.35.01_AM_xo1dig.jpg",
 "https://res.cloudinary.com/dnonho9dg/image/upload/v1761304667/WhatsApp_Image_2025-10-24_at_2.34.57_AM_1_vyac2k.jpg",
 "https://res.cloudinary.com/dnonho9dg/image/upload/v1761304667/WhatsApp_Image_2025-10-24_at_2.34.58_AM_1_nnfe6m.jpg",
 "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050084/WhatsApp_Image_2025-10-19_at_11.00.13_PM_pnts4r.jpg",
 "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050077/WhatsApp_Image_2025-10-19_at_10.59.56_PM_zrhocp.jpg",
 "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050090/WhatsApp_Image_2025-10-20_at_12.30.46_AM_tuagnu.jpg",
 "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050089/WhatsApp_Image_2025-10-20_at_12.25.38_AM_isdi7k.jpg",
 "https://res.cloudinary.com/dnonho9dg/image/upload/v1759771124/safety_sign_paint_jgyj2t.png",
 "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050100/WhatsApp_Image_2025-10-19_at_10.34.21_PM_smehnq.jpg",
 "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050077/WhatsApp_Image_2025-10-19_at_11.00.06_PM_hsbdik.jpg",
 "https://res.cloudinary.com/dnonho9dg/image/upload/v1761050078/WhatsApp_Image_2025-10-19_at_11.00.07_PM_l98bk9.jpg",

 

  ],
};


///for gallery collage
const [orbitSpread, setOrbitSpread] = useState(false);
const [lightboxOpen, setLightboxOpen] = useState(false);
const [lightboxIndex, setLightboxIndex] = useState(0);
const [pointer, setPointer] = useState({ x: 0, y: 0 });

// stable positions state (deterministic initialization)
const [positions, setPositions] = useState<
  { x: number; y: number; rot: number; scale: number }[]
>(() =>
  // initialize with deterministic values so TS is happy and there is no unstable randomness
  COLLAGE_IMAGES["signage"].map((_: string, i: number) => ({
    x: 0,
    y: 0,
    rot: ((i * 37) % 40) - 20,
    scale: 1
  }))
);

const [isMobile, setIsMobile] = useState<boolean>(() =>
  typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)").matches : false
);

// touch swipe tracking
const [touchStartX, setTouchStartX] = useState<number | null>(null);

// track mobile state safely with matchMedia (typed)
useEffect(() => {
  const mql: MediaQueryList | null =
    typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)") : null;

  const onChange = () => setIsMobile(mql?.matches ?? false);

  // initial
  onChange();

  if (mql) {
    // modern browsers support addEventListener
    if ("addEventListener" in mql) {
      mql.addEventListener("change", onChange);
    } else {
      // Safari fallback (older API) — use `any` cast to avoid TS errors
      (mql as any).addListener(onChange);
    }
  }

  return () => {
    if (mql) {
      if ("removeEventListener" in mql) {
        mql.removeEventListener("change", onChange);
      } else {
        (mql as any).removeListener(onChange);
      }
    }
  };
}, []);

// compute positions (deterministic, depends only on category & isMobile)
useEffect(() => {
  const compute = () => {
    const imgs = COLLAGE_IMAGES[category] || [];
    const total = Math.max(1, imgs.length);
    const w = typeof window !== "undefined" ? Math.min(window.innerWidth, 1400) : 1024;

    if (isMobile) {
      const gap = 20;
      const itemWidth = Math.min(320, Math.floor(w * 0.78));
      const centerIndex = Math.floor(total / 2);
      const newPos = imgs.map((_: string, i: number) => {
        const x = (i - centerIndex) * (itemWidth + gap);
        const y = 0;
        const rot = ((i * 17) % 8) - 4;
        return { x, y, rot, scale: 1 };
      });
      setPositions(newPos);
      return;
    }

    const radius = Math.max(120, Math.min(300, Math.floor(w / 5)));
    const newPos = imgs.map((_: string, i: number) => {
      const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
      const x = Math.round(Math.cos(angle) * radius);
      const y = Math.round(Math.sin(angle) * radius * 0.62);
      const rot = Math.round((angle * 180) / Math.PI) + (i % 2 === 0 ? 6 : -6);
      return { x, y, rot, scale: 1 };
    });
    setPositions(newPos);
  };

  compute();
  const onResize = () => compute();
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
}, [category, isMobile]);

// pointer spotlight (desktop)
const onPointerMove = (e: React.PointerEvent) => {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  setPointer({ x: e.clientX - rect.left, y: e.clientY - rect.top });
};

// lightbox handlers
const openLightbox = (index: number) => {
  setLightboxIndex(index);
  setLightboxOpen(true);
  document.body.style.overflow = "hidden";
};
const closeLightbox = () => {
  setLightboxOpen(false);
  document.body.style.overflow = "";
};
const showPrev = () =>
  setLightboxIndex((i) => (i - 1 + COLLAGE_IMAGES[category].length) % COLLAGE_IMAGES[category].length);
const showNext = () => setLightboxIndex((i) => (i + 1) % COLLAGE_IMAGES[category].length);

// keyboard nav for lightbox
useEffect(() => {
  if (!lightboxOpen) return;
  const handler = (e: KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
  };
  window.addEventListener("keydown", handler);
  return () => window.removeEventListener("keydown", handler);
}, [lightboxOpen, category]);
  // Navbar sticky effect
  useEffect(() => {
  // Removed sticky scroll effect since sticky state is unused
  }, []);

  // Auto-scroll carousel effect
//FOR TESTIMONIALS


{/* ---------- CountCard component (place in same file) ---------- */}
const CountCard: React.FC<{ label: string; value: number; suffix?: string }> = ({ label, value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 900;
    const steps = Math.max(12, Math.floor(duration / 30));
    const increment = Math.ceil(value / steps);
    const timer = window.setInterval(() => {
      start += increment;
      if (start >= value) {
        start = value;
        clearInterval(timer);
      }
      setCount(start);
    }, Math.max(20, Math.floor(duration / steps)));
    return () => clearInterval(timer);
  }, [value]);
  return (
    <div className="bg-white rounded-lg p-3 flex flex-col items-center">
      <div className="text-2xl font-extrabold text-gray-900">{count}{suffix}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
  );
};

{/* ---------- TestimonialCarousel component (place in same file) ---------- */}
const TestimonialCarousel: React.FC<{ items: { quote: string; name: string; role: string }[] }> = ({ items }) => {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    timerRef.current = window.setInterval(() => setIndex(i => (i + 1) % items.length), 5000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [items.length]);

  const prev = () => setIndex(i => (i - 1 + items.length) % items.length);
  const next = () => setIndex(i => (i + 1) % items.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [items.length]);

  return (
    <div className="mt-6">
      <div className="relative">
        <motion.blockquote
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="text-gray-700 italic leading-relaxed p-6"
        >
          “{items[index].quote}”
          <div className="mt-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center font-bold text-white">
              {items[index].name.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{items[index].name}</div>
              <div className="text-xs text-gray-500">{items[index].role}</div>
            </div>
          </div>
        </motion.blockquote>

        <div className="absolute right-3 top-3 flex gap-2">
          <button aria-label="Previous testimonial" onClick={prev} className="bg-white/80 hover:bg-white p-2 rounded-full shadow">‹</button>
          <button aria-label="Next testimonial" onClick={next} className="bg-white/80 hover:bg-white p-2 rounded-full shadow">›</button>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 justify-center">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Show testimonial ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full ${i === index ? "bg-teal-500" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
};

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
<div className="mb-14 text-center relative">
  {/* Heading */}
  <motion.h2
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="text-5xl font-extrabold text-gray-900 relative"
  >
    Get Your Custom Signage & Prints Today!
  </motion.h2>

  {/* Decorative gradient underline */}
  <motion.div
    initial={{ width: 0, opacity: 0 }}
    whileInView={{ width: "5rem", opacity: 1 }}
    transition={{ delay: 0.4, duration: 0.8 }}
    className="mt-4 h-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 mx-auto rounded-full"
  ></motion.div>

  {/* Subheading */}
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6, duration: 0.8 }}
    className="text-gray-600 max-w-2xl mx-auto mt-6 text-lg"
  >
    Explore our exclusive signage, printing, and branding services — designed to make your business stand out with style.
  </motion.p>
</div>




  {/* Auto-scroll carousel rows */}
  {/* <div className="relative flex overflow-x-hidden mb-24"> */}
    {/* Row 1 */}
    {/* <div className="flex animate-scroll-x gap-8">
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
              loading="lazy"
              placeholder="blur"
              blurDataURL="/placeholder.png"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-4">
              <h3 className="text-white text-lg font-semibold text-center">
                {img.title || "Untitled Project"}
              </h3>
            </div>
          </div>
        </motion.div>
      ))}
    </div>  */}

<div className="relative flex overflow-x-hidden mb-24">
  {/* Row 1 */}
  <div className="flex animate-scroll-x gap-8">
    {(carouselImages.length > 0 ? carouselImages : placeholderItems).map(
      (img, idx) => (
        <motion.div
          key={img._id || idx}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
          viewport={{ once: true }}
          className="relative min-w-[300px] bg-white/30 backdrop-blur-lg border border-gray-200/40 rounded-2xl overflow-hidden shadow-lg hover:shadow-teal-300/30 transition-all duration-500 hover:-translate-y-2"
        >
          <div className="relative h-60 w-full overflow-hidden flex items-center justify-center">
            {img.url ? (
              <Image
                src={img.url}
                alt={img.title || "Recent Work"}
                fill
                className="object-cover transition-transform duration-700 hover:scale-110"
                loading="lazy"
                placeholder="blur"
                blurDataURL="/placeholder.png"
              />
            ) : (
              <div className="animate-pulse w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 flex items-center justify-center text-gray-700 font-semibold text-lg rounded-2xl">
                {img.title}
              </div>
            )}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-4">
            <h3 className="text-white text-lg font-semibold text-center">
              {img.title || "Untitled Project"}
            </h3>
          </div>
        </motion.div>
      )
    )}
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
{/* 🌈 Modern Collage Gallery — REPLACE EXISTING COLLAGE SECTION WITH THIS */}
<section className="py-24 relative w-full px-4 sm:px-0 overflow-visible">
  <div className="pointer-events-none absolute inset-0 -z-10">
    <div className="absolute -left-40 -top-28 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-teal-400/18 to-cyan-400/6 blur-3xl animate-[spin_80s_linear_infinite]" />
    <div className="absolute -right-36 -bottom-20 w-[360px] h-[360px] rounded-full bg-gradient-to-tr from-amber-300/8 to-pink-300/4 blur-3xl" />
  </div>

  <div className="max-w-6xl mx-auto text-center mb-8">
    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Our Work Gallery</h2>
    <p className="text-gray-600 mt-3 text-lg">
      Discover our creative excellence in <span className="font-semibold text-gray-800">{category}</span> works.
    </p>

    <div className="mt-6 flex justify-center gap-4">
      {["signage", "painting"].map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat as "signage" | "painting")}
          aria-pressed={category === cat}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-300 ${
            category === cat ? "bg-black text-white shadow-2xl transform scale-105" : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          {cat === "signage" ? "Signage Works" : "Painting Works"}
        </button>
      ))}
    </div>
  </div>

  {isMobile ? (
    <div className="max-w-6xl mx-auto">
      <div className="relative">
        <div className="overflow-x-auto scroll-smooth snap-x snap-mandatory flex gap-4 py-6 px-4 -mx-4">
          {COLLAGE_IMAGES[category].map((src: string, i: number) => (
            <motion.button
              key={i}
              onClick={() => openLightbox(i)}
              whileTap={{ scale: 0.98 }}
              className="snap-center flex-none w-[78vw] rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-white cursor-pointer"
              aria-label={`Open image ${i + 1}`}
            >
              <div className="relative w-full h-[56vw]">
                <Image src={src} alt={`Gallery ${i + 1}`} fill className="object-cover" loading="lazy" />
              </div>
              <div className="p-3">
                {/* <div className="text-sm font-semibold text-gray-900">{category === "signage" ? "Signage Design" : "Painting Work"}</div> */}
                {/* <div className="text-xs text-gray-500 mt-1">{`${i + 1} of ${COLLAGE_IMAGES[category].length}`}</div> */}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      <p className="text-center text-gray-500 mt-6">Swipe horizontally to explore — tap any image to expand.</p>
    </div>
  ) : (
    <div
      onPointerMove={onPointerMove}
      onMouseEnter={() => setOrbitSpread(true)}
      onMouseLeave={() => setOrbitSpread(false)}
      className="relative max-w-6xl mx-auto h-[600px] sm:h-[520px] md:h-[580px] flex items-center justify-center select-none"
      style={{ perspective: 1200 }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute z-10 w-[260px] h-[260px] rounded-full mix-blend-screen"
        style={{
          left: pointer.x - 130,
          top: pointer.y - 130,
          background: "radial-gradient(closest-side, rgba(255,255,255,0.18), rgba(255,255,255,0.04) 40%, rgba(0,0,0,0) 60%)",
          transition: "left 0.06s linear, top 0.06s linear"
        }}
      />

      {COLLAGE_IMAGES[category].map((src: string, i: number) => {
        const base = positions[i] ?? { x: 0, y: 0, rot: 0, scale: 1 };
        const stacked = { x: ((i % 3) - 1) * 22, y: ((i % 4) - 2) * 8, rot: ((i * 23) % 40) - 20, scale: 1 };
        const sizeClass = "w-64 h-80 sm:w-56 sm:h-72 md:w-60 md:h-80";

        return (
          <motion.div
            key={i}
            role="button"
            tabIndex={0}
            onClick={() => openLightbox(i)}
            onKeyDown={(e: React.KeyboardEvent) => { if (e.key === "Enter") openLightbox(i); }}
            drag
            dragElastic={0.12}
            dragMomentum
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.04, zIndex: 40 }}
            initial={false}
            animate={{
              x: orbitSpread ? base.x : stacked.x,
              y: orbitSpread ? base.y : stacked.y,
              rotate: orbitSpread ? base.rot : stacked.rot,
              scale: orbitSpread ? 1.03 : 1,
              zIndex: orbitSpread ? 30 : i,
              transition: { type: "spring", stiffness: 140, damping: 18 }
            }}
            className={`absolute ${sizeClass} rounded-2xl overflow-hidden shadow-2xl cursor-pointer border border-gray-200/40 bg-white`}
            style={{ transformStyle: "preserve-3d", willChange: "transform", left: `calc(50% - 10rem)`, top: `calc(50% - 12rem)` }}
          >
            <div className="relative w-full h-full">
              <Image src={src} alt={`Gallery ${i + 1}`} fill sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 33vw" className="object-cover w-full h-full" loading="lazy" />
              <div className="absolute left-3 top-3 px-3 py-1 rounded-full bg-black/60 text-white text-xs font-semibold tracking-wide">
                {category === "signage" ? "Signage" : "Painting"}
              </div>

              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-400 flex items-end">
                <div className="w-full p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="text-sm text-white font-semibold">{`${category === "signage" ? "Signage Design" : "Painting Work"} • ${i + 1}`}</div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  )}

  <p className="text-center text-gray-500 mt-8 max-w-xl mx-auto">{isMobile ? "Swipe to explore — tap to open." : "Hover to expand the orbit — drag any card, or click to view larger."}</p>

  {/* Lightbox */}
  {lightboxOpen && (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
      role="dialog"
      aria-modal="true"
      onTouchStart={(e) => setTouchStartX(e.touches?.[0]?.clientX ?? null)}
      onTouchEnd={(e) => {
        if (touchStartX == null) return;
        const endX = e.changedTouches?.[0]?.clientX ?? null;
        if (endX == null) return;
        const diff = endX - touchStartX;
        const threshold = 50;
        if (diff > threshold) showPrev();
        else if (diff < -threshold) showNext();
        setTouchStartX(null);
      }}
    >
      <div onClick={closeLightbox} className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
      <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative z-20 max-w-[1100px] w-full rounded-xl overflow-hidden shadow-2xl bg-black">
        <div className="relative w-full h-[70vh] sm:h-[78vh] bg-black">
          <Image src={COLLAGE_IMAGES[category][lightboxIndex]} alt={`Expanded ${lightboxIndex + 1}`} fill sizes="(max-width: 768px) 90vw, 1000px" className="object-contain" priority />
        </div>

        <button onClick={closeLightbox} aria-label="Close" className="absolute top-4 right-4 z-30 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 transition">✕</button>
        <button onClick={(e) => { e.stopPropagation(); showPrev(); }} aria-label="Previous" className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 text-white rounded-full p-3 hover:bg-black/60 transition">←</button>
        <button onClick={(e) => { e.stopPropagation(); showNext(); }} aria-label="Next" className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 text-white rounded-full p-3 hover:bg-black/60 transition">→</button>
        <div className="absolute left-6 bottom-6 z-30 bg-black/40 text-white rounded-md px-3 py-1 text-sm">{`${lightboxIndex + 1} / ${COLLAGE_IMAGES[category].length}`}</div>
      </motion.div>
    </div>
  )}
</section>

</section>
{/* 🌟 Why People Trust Us Section */}
{/* ---------- Upgraded "Why People Trust Us" Section (replace existing section only) ---------- */}
<section className="relative py-24 px-4 sm:px-10 bg-gradient-to-b from-gray-100 via-white to-gray-50 overflow-hidden">
  <div className="text-center mb-8">
    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
      Why People <span className="text-teal-500">Trust Us</span>
    </h2>
     <p className="text-gray-700 mb-4 leading-relaxed text-base sm:text-lg max-w-3xl mx-auto">
      For over <span className="font-semibold text-teal-600">27 years</span>, we’ve transformed spaces with impactful signage — from hand-painted murals to digital displays — combining creativity, precision, and passion.
    </p>
    <p className="text-gray-700 leading-relaxed text-base sm:text-lg max-w-3xl mx-auto">
      Our team bridges the gap between classical methods and modern technologies, ensuring every project reflects both authenticity and innovation.
    </p>
    <div className="mt-4 h-1 w-16 bg-teal-500 mx-auto rounded-full"></div>
  </div>

  {/* Stats + Features */}
  <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
    {/* Stats column (uses your provided numbers) */}
    <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-start gap-6 border border-gray-100">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center text-white text-xl font-bold shadow">
          ✓
        </div>
        <div>
          <p className="text-gray-500 text-sm">Experience</p>
          <h3 className="text-2xl font-extrabold text-gray-900">27+ Years</h3>
        </div>
      </div>

      <div className="w-full grid grid-cols-3 gap-4 mt-2">
        <CountCard label="Years of Excellence" value={27} suffix="+" />
        <CountCard label="Projects Completed" value={1200} suffix="+" />
        <CountCard label="Happy Clients" value={900} suffix="+" />
      </div>

      <p className="text-gray-600 mt-4 text-sm">
        Fast production, premium materials, and on-time delivery — the three pillars our clients love.
      </p>
    </div>

    {/* Feature grid */}
    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
      {[
        {
          title: "Custom Designs",
          description: "Tailor-made signage and prints that fit your brand identity perfectly.",
          icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M3 17v4h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 3l7 7-7 7-7-7 7-7z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
        },
        {
          title: "Fast Turnaround",
          description: "Timely project completion with professional-grade quality.",
          icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
            </svg>
          ),
        },
        {
          title: "Premium Materials",
          description: "Durable, long-lasting materials with superior finishes.",
          icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 2l8 4-8 4-8-4 8-4z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 10v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
        },
        {
          title: "Trusted by Clients",
          description: "500+ satisfied businesses and shop owners across Rajasthan.",
          icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M21 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.6"/>
            </svg>
          ),
        },
      ].map((f, idx) => (
        <div
          key={idx}
          className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transition-transform duration-300 hover:-translate-y-3"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-emerald-300 to-cyan-400 flex items-center justify-center text-white shadow">
              {f.icon}
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">{f.title}</h4>
              <p className="text-gray-600 text-sm mt-1">{f.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Testimonials + logos */}
  <div className="max-w-6xl mx-auto mt-12">
    <div className="flex flex-col md:flex-row gap-8 items-start">
      {/* Testimonials panel */}
      <div className="md:w-2/3 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900">What Our Clients Say</h3>
          <div className="text-sm text-gray-500">Real reviews from local businesses</div>
        </div>

        <TestimonialCarousel
          items={[
            {
              quote:
                "They designed and installed our LED board in just 2 days — it looks absolutely stunning! Highly recommended.",
              name: "Rahul Sharma",
              role: "Shop Owner",
            },
            {
              quote:
                "Best signage and painting work in Bhiwadi. Professional service, creative designs, and great value for money.",
              name: "Priya Mehta",
              role: "Café Bloom",
            },
            {
              quote:
                "Fast, spotless installation and superb design. The neon sign is the highlight of our store.",
              name: "Amit Verma",
              role: "Retail Owner",
            },
          ]}
        />
      </div>

      {/* Logos / trust strip */}
      {/* <div className="md:w-1/3 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Trusted by</h4>

        <div className="overflow-hidden">
          <div className="flex gap-6 items-center animate-marquee">
            {["Client A","Client B","Client C","Client D","Client E"].map((c, i) => (
              <div key={i} className="flex items-center justify-center min-w-[120px] h-16 bg-gray-50 rounded-lg border border-gray-100 text-sm text-gray-600">
                {c}
              </div>
            ))}
            {["Client A","Client B","Client C","Client D","Client E"].map((c, i) => (
              <div key={`dup-${i}`} className="flex items-center justify-center min-w-[120px] h-16 bg-gray-50 rounded-lg border border-gray-100 text-sm text-gray-600">
                {c}
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  </div>


  {/* marquee CSS */}
  <style jsx>{`
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      display: flex;
      gap: 1.5rem;
      align-items: center;
      animation: marquee 20s linear infinite;
    }
  `}</style>
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
