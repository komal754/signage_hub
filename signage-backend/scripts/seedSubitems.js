// scripts/seedSubitems.js
require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Category = require('../models/Category');
const Item = require('../models/Item');
const SubItem = require('../models/SubItem');

/**
 * IMPORTANT:
 * - Adjust require('../models/...') paths if your script isn't in project root/scripts.
 * - This script will create missing categories/items automatically.
 * - It will NOT delete existing subitems; it only creates missing ones.
 */

/* ---------- Utility helpers ---------- */
const normalize = (s = '') =>
  String(s).toLowerCase().replace(/[^a-z0-9]/g, '').trim();

async function findItemByNameFlexible(itemName, categoryId) {
  // 1) exact match
  let it = await Item.findOne({ name: itemName, category: categoryId });
  if (it) return it;

  // 2) match by normalized name within the same category
  const candidates = await Item.find({ category: categoryId });
  const target = normalize(itemName);
  for (const c of candidates) {
    if (normalize(c.name) === target) return c;
  }

  // 3) try global normalized match (fallback)
  const globalCandidates = await Item.find({});
  for (const c of globalCandidates) {
    if (normalize(c.name) === target) return c;
  }

  return null;
}

/* ---------- Hardcoded services (copied from your page.tsx) ---------- */
const services = [
  {
    category: "Signage",
    items: [
      { 
        title: "Indoor Signage", 
        desc: "Acrylic boards, LED letters, wall decals, directional signs, menu boards, reception signs",
        bestseller: true,
        subItems: [
          { name: "Acrylic Boards", desc: "High-quality acrylic panels",image: "/portfolio/product1.jpg" },
          { name: "LED Letters", desc: "Bright LED letters for shopfronts",image: "/portfolio/product8.jpg"},
          { name: "Wall Decals", desc: "Custom decorative decals",image: "/portfolio/product10.jpg"},
          { name: "Directional Signs", desc: "Wayfinding and directional signage",image: "/portfolio/product5.jpg"},
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
];

/* ---------- Main seeding logic ---------- */
async function seed() {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI not found in environment. Exiting.');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  let createdSubitems = 0;
  let createdItems = 0;
  let createdCategories = 0;

  for (const catBlock of services) {
    // Ensure category exists (create if missing)
    let categoryDoc = await Category.findOne({ name: catBlock.category });
    if (!categoryDoc) {
      categoryDoc = await Category.create({ name: catBlock.category, description: catBlock.category });
      createdCategories++;
      console.log(`Created category: ${catBlock.category}`);
    }

    for (const svc of catBlock.items) {
      // Ensure item exists; try flexible matching first
      let itemDoc = await findItemByNameFlexible(svc.title, categoryDoc._id);
      if (!itemDoc) {
        // create item
        itemDoc = await Item.create({
          name: svc.title,
          description: svc.desc || '',
          category: categoryDoc._id,
          bestseller: !!svc.bestseller
        });
        createdItems++;
        console.log(`Created item: ${svc.title} (category: ${categoryDoc.name})`);
      } else {
        // If found, patch fields like bestseller/description if missing
        let needsUpdate = false;
        if (svc.desc && (!itemDoc.description || itemDoc.description.length < 5)) {
          itemDoc.description = svc.desc;
          needsUpdate = true;
        }
        if (svc.bestseller && !itemDoc.bestseller) {
          itemDoc.bestseller = true;
          needsUpdate = true;
        }
        if (needsUpdate) await itemDoc.save();
      }

      // Create subitems
      if (Array.isArray(svc.subItems) && svc.subItems.length > 0) {
        for (const sub of svc.subItems) {
          // Check existence by normalized name + item
          const existing = await SubItem.findOne({
            name: sub.name,
            item: itemDoc._id
          });
          if (existing) {
            // ensure item.subItems contains it
            try {
              await Item.findByIdAndUpdate(itemDoc._id, { $addToSet: { subItems: existing._id } });
            } catch (e) {/* ignore if schema doesn't support it */}
            continue;
          }

          // Create subitem
          const created = await SubItem.create({
            name: sub.name,
            desc: sub.desc || '',
            image: sub.image || undefined,
            category: categoryDoc._id,
            item: itemDoc._id
          });
          createdSubitems++;
          console.log(`Created subitem: "${created.name}" for item "${itemDoc.name}"`);

          // add to item's subItems array if present (safe $addToSet)
          try {
            await Item.findByIdAndUpdate(itemDoc._id, { $addToSet: { subItems: created._id } });
          } catch (e) {
            // If the Item schema doesn't have subItems, this will silently fail — not critical
          }
        }
      }
    }
  }

  console.log('Seeding complete:', {
    createdCategories,
    createdItems,
    createdSubitems
  });

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seeder error:', err);
  mongoose.disconnect().then(() => process.exit(1));
});
