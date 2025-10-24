"use client";
// SubItem Slider Component
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Navbar, Footer } from "@/components/SharedLayout";
import FloatingContactButton from "@/components/FloatingContactButton";

interface SubItem {
  name: string;
  desc: string;
  image?: string; // optional image for subitems only
}

interface Service {
  title: string;
  desc: string;
  bestseller?: boolean; // optional now
  subItems?: SubItem[];
}

interface Category {
  category: string;
  items: Service[];
}

const hardcodedServices: Category[] = [
  {
    category: "Signage",
    items: [
      { 
        title: "Indoor Signage", 
        desc: "Acrylic boards, LED letters, wall decals, directional signs, menu boards, reception signs",
        bestseller: true,
        subItems: [
          { name: "Acrylic Boards", desc: "High-quality acrylic panels",image: "/portfolio/product1.jpg" },
          { name: "LED Letters", desc: "Bright LED letters for shopfronts" ,image: "/portfolio/product8.jpg"},
          { name: "Wall Decals", desc: "Custom decorative decals" ,image: "/portfolio/product10.jpg"},
          { name: "Directional Signs", desc: "Wayfinding and directional signage" ,image: "/portfolio/product5.jpg"},
          { name: "Menu Boards", desc: "Restaurant and café menus" },
          { name: "Reception/Desk Signs", desc: "Custom reception signage" }
        ]
      },
      { 
        title: "Outdoor Signage", 
        desc: "Billboards, flex banners, shopfront boards, pylon signs, vehicle wraps, outdoor LED displays",
        subItems: [
          { name: "Billboards", desc: "Large-format outdoor advertising" },
          { name: "Flex & Vinyl Banners", desc: "Durable banners for promotions",image: "/portfolio/product6.jpg" },
          { name: "Shop Front Signboards", desc: "Attractive storefront signage",image: "/portfolio/product7.jpg" },
          { name: "Pylon/Monument Signs", desc: "High-impact standalone signs" },
          { name: "Outdoor LED Displays", desc: "Bright, eye-catching LED screens" }
        ]
      },
      { 
        title: "Vehicle Signage", 
        desc: "Car/bus wraps, window graphics, fleet branding",
        subItems: [
          { name: "Car & Bus Wraps", desc: "Full or partial vehicle branding" },
          { name: "Fleet Branding", desc: "Uniform branding across company vehicles" },
          { name: "Window Graphics & Stickers", desc: "Custom graphics for windows" },
          { name: "Magnetic Signs", desc: "Temporary branding for vehicles" }
        ]
      },
      { 
        title: "Digital Signage", 
        desc: "LED video walls, digital menu boards, kiosks",
        subItems: [
          { name: "LED Video Walls", desc: "Large-scale digital displays" },
          { name: "Interactive Kiosks", desc: "Engaging user experiences" },
          { name: "Digital Menu Boards", desc: "Restaurant and café digital menus" },
          { name: "Display Screens for Events", desc: "Custom event displays" }
        ]
      },
      { 
        title: "Event & Promotional Signage", 
        desc: "Roll-up banners, pop-up stands, flags, exhibition booths, standees",
        bestseller: true,
        subItems: [
          { name: "Pop-up Banners & Stands", desc: "Portable display solutions" },
          { name: "Roll-up Banners", desc: "Easy-to-set-up banners" },
          { name: "Flags & Teardrop Banners", desc: "Outdoor promotional flags" },
          { name: "Exhibition Booth Graphics", desc: "Custom trade show booths" },
          { name: "Standees & Posters", desc: "Event signage and visuals" }
        ]
      },
      { 
        title: "Specialty & Custom Signage", 
        desc: "Glow signs, neon letters, 3D cutouts, metallic/wooden signs, safety/informational signs",
        subItems: [
          { name: "Glow Signs & Neon Letters", desc: "High-impact illuminated signage" },
          { name: "3D Lettering & Cutouts", desc: "Dimensional lettering for branding" },
          { name: "Metallic & Wooden Signage", desc: "Premium material signage" },
          { name: "Safety & Informational Signs", desc: "Compliance and wayfinding signs" },
          { name: "Custom Branding Solutions", desc: "Tailored signage for unique needs" }
        ]
      }
    ]
  },
  {
    category: "Painting & Artwork",
    items: [
      { 
        title: "Custom Wall Murals & Portraits", 
        desc: "Artistic murals and portraits for interiors and events",
        subItems: [
          { name: "Wall Murals", desc: "Custom-designed murals for offices and homes" },
          { name: "Portraits", desc: "Personalized artwork and paintings" }
        ]
      },
      { 
        title: "Interior/Exterior Painting", 
        desc: "Shops, offices, homes",
        subItems: [
          { name: "Interior Painting", desc: "Vibrant indoor finishes" },
          { name: "Exterior Painting", desc: "Durable outdoor coatings" }
        ]
      },
      { title: "Artistic Canvas Painting", desc: "Custom canvas artworks" },
      { title: "Decorative Painting for Events", desc: "Event-specific decorative painting" },
      { title: "Graffiti or Street Art Projects", desc: "Creative outdoor or indoor murals" }
    ]
  },
  {
    category: "Printing & Stationery",
    items: [
      { 
        title: "T-shirt Printing", 
        desc: "Digital printing, screen printing, custom designs",
        subItems: [
          { name: "Digital Printing", desc: "High-quality digital prints" },
          { name: "Screen Printing", desc: "Traditional screen printing" },
          { name: "Custom Designs", desc: "Tailored artwork for apparel" }
        ]
      },
      { title: "Calendars", desc: "Custom-designed office or family calendars" },
      { title: "Visiting / Business Cards", desc: "Personalized professional cards" },
      { title: "ID Cards", desc: "Employee, student, or event IDs with lamination and QR/barcode options" },
      { title: "Flyers, Brochures, Posters", desc: "Promotional and marketing prints" },
      { title: "Corporate Stationery", desc: "Letterheads, envelopes, notepads" },
      { title: "Gift Cards & Vouchers", desc: "Custom gift solutions" }
    ]
  },
  {
    category: "Awards & Trophies",
    items: [
      { title: "Customized Trophies", desc: "Personalized trophies for events and recognition" },
      { title: "Plaques & Shields", desc: "Engraved plaques and award shields" },
      { title: "Medals", desc: "Custom medals for sports and events" },
      { title: "Acrylic / Glass Awards", desc: "Elegant glass or acrylic awards" },
      { title: "Engraved Awards & Corporate Gifts", desc: "Premium corporate gifting solutions" }
    ]
  },
  {
    category: "Other Custom Work",
    items: [
      { title: "Personalized Gifts & Merchandise", desc: "Custom gifts and branded merchandise" },
      { title: "Event Branding Materials", desc: "Complete event branding solutions" },
      { title: "Promotional Products for Marketing", desc: "Unique promotional items" },
      { title: "Fabric Printing", desc: "Printed bags, caps, uniforms" }
    ]
  }
]
export default function ServicesPage() {
  const [services, setServices] = useState<Category[]>(hardcodedServices);
  useEffect(() => {
    async function fetchServices() {
      try {
        const [categoriesRes, itemsRes, subitemsRes] = await Promise.all([
          // fetch("http://localhost:5000/api/categories"),
          // fetch("http://localhost:5000/api/items"),
          // fetch("http://localhost:5000/api/subitems")
          fetch("https://signage-hub.onrender.com/api/categories"),
          fetch("https://signage-hub.onrender.com/api/items"),
          fetch("http://signage-hub.onrender.com/api/subitems")
        ]);
        const categories = await categoriesRes.json();
        const items = await itemsRes.json();
        const subitems = await subitemsRes.json();
        const itemsWithSubitems = items.map((item: Service & { _id: string; category?: string | { _id: string } }) => {
          const subItemsForItem = subitems.filter((sub: SubItem & { item?: string | { _id: string }; description?: string }) => {
            if (sub.item && typeof sub.item === 'object' && '_id' in sub.item) {
              return (sub.item as { _id: string })._id === item._id;
            }
            return sub.item === item._id;
          }).map((sub: SubItem & { description?: string }) => ({
            name: sub.name,
            desc: sub.description ?? sub.desc,
            image: sub.image
          }));
          return {
            ...item,
            subItems: subItemsForItem
          };
        });
        const grouped: Category[] = categories.map((cat: { name: string; _id: string }) => ({
          category: cat.name,
          items: itemsWithSubitems.filter((item: Service & { _id: string; category?: string | { _id: string } }) => {
            if (item.category && typeof item.category === 'object' && '_id' in item.category) {
              return (item.category as { _id: string })._id === cat._id;
            }
            return item.category === cat._id;
          }).map((item: Service & { name: string; description?: string; _id: string; bestseller?: boolean; subItems?: SubItem[] }) => ({
            title: item.name,
            desc: item.description ?? item.desc,
            bestseller: item.bestseller,
            subItems: item.subItems || []
          }))
        }));
        if (grouped.some(cat => cat.items.length > 0)) {
          setServices(grouped);
        }
      } catch {
        setServices([]);
      }
    }
    fetchServices();
  }, []);
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 font-sans w-full px-0 sm:px-4 md:px-8 pt-32">
        <FloatingContactButton />
        <section className="max-w-7xl mx-auto px-4 space-y-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-center text-gray-900 drop-shadow-lg mb-12 tracking-tight">
            Our Premium <span className="text-teal-500">Services</span>
          </h1>
          {services.map((category, idx) => (
            <motion.section
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-teal-600 border-l-4 border-teal-400 pl-4 tracking-wide">
                {category.category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {category.items.map((service, sIdx) => (
                  <motion.div
                    key={sIdx}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center relative transition-all duration-300"
                  >
                    {service.bestseller && (
                      <span className="absolute top-3 right-3 bg-amber-400 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                        <Star className="w-3 h-3" /> Bestseller
                      </span>
                    )}
                    <h3 className="text-2xl font-semibold mb-2 text-gray-900 group-hover:text-teal-500 transition-colors tracking-tight">{service.title}</h3>
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-4">{service.desc}</p>
                    {service.subItems && service.subItems.length > 0 && <SubItemSlider subItems={service.subItems} />}
                    <Button className="mt-4 bg-gradient-to-r from-teal-400 to-cyan-400 text-white px-8 py-3 font-bold shadow-lg rounded-full transition-all hover:scale-105">
                      Contact / Inquiry
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </section>
        <section className="text-center py-20 bg-gradient-to-r from-teal-400 to-cyan-400 text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg tracking-tight">Ready to Elevate Your Brand?</h2>
          <a href="/contact">
            <Button className="bg-white text-teal-500 font-bold px-10 py-4 rounded-full shadow-lg hover:scale-105 transform transition">Contact Us Today</Button>
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}



// SubItem Slider Component
// Modern SubItem Slider
function SubItemSlider({ subItems }: { subItems: SubItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % subItems.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + subItems.length) % subItems.length);
  const goTo = (index: number) => setCurrentIndex(index);

  return (
    <div className="w-full mt-4 relative rounded-2xl shadow-lg overflow-hidden pb-8">
      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="bg-gray-50 rounded p-3 shadow-inner flex flex-col items-center text-center"
        >
          {subItems[currentIndex].image && (
            <div className="w-full h-40 relative mb-2">
              <Image
                src={subItems[currentIndex].image}
                alt={subItems[currentIndex].name}
                fill
                style={{ objectFit: "contain" }}
                className="rounded-md"
              />
            </div>
          )}
          <p className="text-gray-500 text-sm md:text-base mb-2">
            {subItems[currentIndex].desc}
          </p>
          <span className="text-gray-700 font-semibold">
            {subItems[currentIndex].name}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white/40 hover:bg-teal-400/70 text-white p-2 rounded-full shadow-md transition"
      >
        ◀
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white/40 hover:bg-teal-400/70 text-white p-2 rounded-full shadow-md transition"
      >
        ▶
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {subItems.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`w-3 h-3 rounded-full transition ${
              currentIndex === idx
                ? "bg-teal-500"
                : "bg-transparent border border-gray-300 hover:bg-teal-400/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
