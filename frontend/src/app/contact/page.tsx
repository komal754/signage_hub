"use client";

import { useState } from "react";
import { CheckCircle2, Phone, Mail, MessageCircle } from "lucide-react";
import { Navbar, Footer } from "@/components/SharedLayout";
import FloatingContactButton from "@/components/FloatingContactButton";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const validatePhone = (phone: string) => /^\+?[0-9]{10,15}$/.test(phone);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      alert("Name, phone, and message are required.");
      return;
    }
    if (!validateEmail(form.email)) {
      alert("Please enter a valid email.");
      return;
    }
    if (!validatePhone(form.phone)) {
      alert("Please enter a valid phone number.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setForm({ name: "", email: "", phone: "", message: "" });
        setShowModal(true);
      } else alert("Failed to send inquiry.");
    } catch {
      alert("Error sending inquiry. Check your connection.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen font-sans w-full px-0 sm:px-4 md:px-8">
        {/* Floating Contact Button */}
        <FloatingContactButton />

  {/* Hero / Contact Section */}
  <section className="pt-32 pb-24 px-0 sm:px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
              Contact <span className="text-teal-500">Us</span>
            </h1>
            <p className="text-gray-700 md:text-lg leading-relaxed">
              Fill out the form below or reach out directly. Our team will respond promptly.
            </p>

            {/* Direct Contact Buttons */}
            <div className="mt-6 flex justify-center gap-6">
              <a
                href="tel:+9772801733"
                className="flex items-center gap-2 bg-teal-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-teal-600 transition"
              >
                <Phone className="w-5 h-5" /> Call
              </a>
              <a
                href="https://wa.me/9772801733"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-teal-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-teal-600 transition"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp
              </a>
              <a
                href="mailto:signageworks483@gmail.com"
                className="flex items-center gap-2 bg-teal-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-teal-600 transition"
              >
                <Mail className="w-5 h-5" /> Email
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="mt-12 max-w-3xl mx-auto">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6 border border-gray-200"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <textarea
                name="message"
                placeholder="Your Message / Inquiry"
                value={form.message}
                onChange={handleChange}
                required
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 min-h-[140px]"
              />

              <Button className="bg-teal-500 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:bg-teal-600 hover:scale-105 transition">
                Send Inquiry
              </Button>
            </form>
          </div>
        </section>


        {/* Location & Directions Section */}
        <section className="py-16 px-0 sm:px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Shop Location</h2>
            <p className="text-gray-700 md:text-lg">Narendra Add Agency,near marble market, opposite to apna bazaar, Bhiwadi, Rajasthan 301019</p>
            <div className="w-full h-64 rounded-xl overflow-hidden shadow-lg mx-auto">
              <iframe
                title="Shop Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.123456789!2d73.123456!3d19.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b123456789ab%3A0x123456789abcdef!2sNarendra%20Art%20%26%20Signage!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Narendra+Art+%26+Signage+YourTown"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-teal-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-teal-600 transition"
              >
                Get Directions (Google Maps)
              </a>
            </div>
          </div>
        </section>

        {/* Modal Confirmation */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-xs animate-fadeIn border border-teal-400">
              <CheckCircle2 className="mx-auto text-teal-500 w-12 h-12 mb-4" />
              <h2 className="text-xl font-bold mb-2 text-gray-900">Thank You!</h2>
              <p className="text-gray-700">Your inquiry has been submitted successfully.</p>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 bg-teal-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-teal-600 hover:scale-105 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        `}</style>
      </main>
      <Footer />
    </>
  );
}
