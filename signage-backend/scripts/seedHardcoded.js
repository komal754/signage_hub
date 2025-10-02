// Script to seed hardcoded categories and items into MongoDB
require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Category = require('../models/Category');
const Item = require('../models/Item');

const hardcodedServices = [
  {
    category: "Signage",
    items: [
      { name: "Indoor Signage", description: "Acrylic boards, LED letters, wall decals, directional signs, menu boards, reception signs", bestseller: true },
      { name: "Outdoor Signage", description: "Billboards, flex banners, shopfront boards, pylon signs, vehicle wraps, outdoor LED displays" },
      { name: "Vehicle Signage", description: "Car/bus wraps, window graphics, fleet branding" },
      { name: "Digital Signage", description: "LED video walls, digital menu boards, kiosks" },
      { name: "Event & Promotional Signage", description: "Roll-up banners, pop-up stands, flags, exhibition booths, standees", bestseller: true },
      { name: "Specialty & Custom Signage", description: "Glow signs, neon letters, 3D cutouts, metallic/wooden signs, safety/informational signs" }
    ]
  },
  {
    category: "Painting & Artwork",
    items: [
      { name: "Custom Wall Murals & Portraits", description: "Artistic murals and portraits for interiors and events" },
      { name: "Interior/Exterior Painting", description: "Shops, offices, homes" },
      { name: "Artistic Canvas Painting", description: "Custom canvas artworks" },
      { name: "Decorative Painting for Events", description: "Event-specific decorative painting" },
      { name: "Graffiti or Street Art Projects", description: "Creative outdoor or indoor murals" }
    ]
  },
  {
    category: "Printing & Stationery",
    items: [
      { name: "T-shirt Printing", description: "Digital printing, screen printing, custom designs" },
      { name: "Calendars", description: "Custom-designed office or family calendars" },
      { name: "Visiting / Business Cards", description: "Personalized professional cards" },
      { name: "ID Cards", description: "Employee, student, or event IDs with lamination and QR/barcode options" },
      { name: "Flyers, Brochures, Posters", description: "Promotional and marketing prints" },
      { name: "Corporate Stationery", description: "Letterheads, envelopes, notepads" },
      { name: "Gift Cards & Vouchers", description: "Custom gift solutions" }
    ]
  },
  {
    category: "Awards & Trophies",
    items: [
      { name: "Customized Trophies", description: "Personalized trophies for events and recognition" },
      { name: "Plaques & Shields", description: "Engraved plaques and award shields" },
      { name: "Medals", description: "Custom medals for sports and events" },
      { name: "Acrylic / Glass Awards", description: "Elegant glass or acrylic awards" },
      { name: "Engraved Awards & Corporate Gifts", description: "Premium corporate gifting solutions" }
    ]
  },
  {
    category: "Other Custom Work",
    items: [
      { name: "Personalized Gifts & Merchandise", description: "Custom gifts and branded merchandise" },
      { name: "Event Branding Materials", description: "Complete event branding solutions" },
      { name: "Promotional Products for Marketing", description: "Unique promotional items" },
      { name: "Fabric Printing", description: "Printed bags, caps, uniforms" }
    ]
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Category.deleteMany({});
  await Item.deleteMany({});

  for (const svc of hardcodedServices) {
    const cat = await Category.create({ name: svc.category });
    for (const item of svc.items) {
      await Item.create({ ...item, category: cat._id });
    }
  }
  console.log('Seeded categories and items!');
  mongoose.disconnect();
}

seed();
