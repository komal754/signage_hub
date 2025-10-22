"use client";
import { Navbar, Footer } from "@/components/SharedLayout";
import FloatingContactButton from "@/components/FloatingContactButton";

const projects = [
  {
    img: "/portfolio/product1.jpg",
    client: "ABC Stores",
    title: "LED Shop Signage",
    testimonial: "Excellent quality and fast installation!"
  },
  {
    img: "/portfolio/product2.jpg",
    client: "EventX",
    title: "Event Branding",
    testimonial: "Made our event look professional and vibrant."
  },
  {
    img: "/portfolio/product3.jpg",
    client: "FashionHub",
    title: "Custom T-Shirts",
    testimonial: "Loved the print quality and quick delivery."
  }
];

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-16 px-4 pt-32">
        <FloatingContactButton />
        <h1 className="text-4xl font-bold text-center mb-10">Portfolio / Projects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col items-center p-6">
              <img src={project.img} alt={project.title} className="w-full h-48 object-cover mb-4 rounded" />
              <h2 className="text-xl font-bold mb-2 text-gray-900 text-center">{project.title}</h2>
              <p className="text-gray-600 text-center mb-2">Client: {project.client}</p>
              <blockquote className="italic text-teal-600 text-center">"{project.testimonial}"</blockquote>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href="/contact">
            {/* <Button className="bg-white text-teal-500 font-bold px-10 py-4 rounded-full shadow-lg hover:scale-105 transform transition">Contact Us Today</Button> */}
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
