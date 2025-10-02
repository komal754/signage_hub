// Script to reset items collection to match hardcodedServices (for category fix)
const mongoose = require('mongoose');
const Item = require('../models/Item');

const hardcodedItems = [
  // Signage
  {
    name: 'Indoor Signage',
    description: 'Acrylic boards, LED letters, wall decals, directional signs, menu boards, reception signs',
    category: 'Signage',
    bestseller: true,
    subItems: [
      { name: 'Acrylic Boards', desc: 'High-quality acrylic panels', image: '/portfolio/product1.jpg' },
      { name: 'LED Letters', desc: 'Bright LED letters for shopfronts', image: '/portfolio/product8.jpg' },
      { name: 'Wall Decals', desc: 'Custom decorative decals', image: '/portfolio/product10.jpg' },
      { name: 'Directional Signs', desc: 'Wayfinding and directional signage', image: '/portfolio/product5.jpg' },
      { name: 'Menu Boards', desc: 'Restaurant and café menus' },
      { name: 'Reception/Desk Signs', desc: 'Custom reception signage' }
    ]
  },
  {
    name: 'Outdoor Signage',
    description: 'Billboards, flex banners, shopfront boards, pylon signs, vehicle wraps, outdoor LED displays',
    category: 'Signage',
    subItems: [
      { name: 'Billboards', desc: 'Large-format outdoor advertising' },
      { name: 'Flex & Vinyl Banners', desc: 'Durable banners for promotions', image: '/portfolio/product6.jpg' },
      { name: 'Shop Front Signboards', desc: 'Attractive storefront signage', image: '/portfolio/product7.jpg' },
      { name: 'Pylon/Monument Signs', desc: 'High-impact standalone signs' },
      { name: 'Outdoor LED Displays', desc: 'Bright, eye-catching LED screens' }
    ]
  },
  {
    name: 'Vehicle Signage',
    description: 'Car/bus wraps, window graphics, fleet branding',
    category: 'Signage',
    subItems: [
      { name: 'Car & Bus Wraps', desc: 'Full or partial vehicle branding' },
      { name: 'Fleet Branding', desc: 'Uniform branding across company vehicles' },
      { name: 'Window Graphics & Stickers', desc: 'Custom graphics for windows' },
      { name: 'Magnetic Signs', desc: 'Temporary branding for vehicles' }
    ]
  },
  {
    name: 'Digital Signage',
    description: 'LED video walls, digital menu boards, kiosks',
    category: 'Signage',
    subItems: [
      { name: 'LED Video Walls', desc: 'Large-scale digital displays' },
      { name: 'Interactive Kiosks', desc: 'Engaging user experiences' },
      { name: 'Digital Menu Boards', desc: 'Restaurant and café digital menus' },
      { name: 'Display Screens for Events', desc: 'Custom event displays' }
    ]
  },
  {
    name: 'Event & Promotional Signage',
    description: 'Roll-up banners, pop-up stands, flags, exhibition booths, standees',
    category: 'Signage',
    bestseller: true,
    subItems: [
      { name: 'Pop-up Banners & Stands', desc: 'Portable display solutions' },
      { name: 'Roll-up Banners', desc: 'Easy-to-set-up banners' },
      { name: 'Flags & Teardrop Banners', desc: 'Outdoor promotional flags' },
      { name: 'Exhibition Booth Graphics', desc: 'Custom trade show booths' },
      { name: 'Standees & Posters', desc: 'Event signage and visuals' }
    ]
  },
  {
    name: 'Specialty & Custom Signage',
    description: 'Glow signs, neon letters, 3D cutouts, metallic/wooden signs, safety/informational signs',
    category: 'Signage',
    subItems: [
      { name: 'Glow Signs & Neon Letters', desc: 'High-impact illuminated signage' },
      { name: '3D Lettering & Cutouts', desc: 'Dimensional lettering for branding' },
      { name: 'Metallic & Wooden Signage', desc: 'Premium material signage' },
      { name: 'Safety & Informational Signs', desc: 'Compliance and wayfinding signs' },
      { name: 'Custom Branding Solutions', desc: 'Tailored signage for unique needs' }
    ]
  },
  // Painting & Artwork
  {
    name: 'Custom Wall Murals & Portraits',
    description: 'Artistic murals and portraits for interiors and events',
    category: 'Painting & Artwork',
    subItems: [
      { name: 'Wall Murals', desc: 'Custom-designed murals for offices and homes' },
      { name: 'Portraits', desc: 'Personalized artwork and paintings' }
    ]
  },
  {
    name: 'Interior/Exterior Painting',
    description: 'Shops, offices, homes',
    category: 'Painting & Artwork',
    subItems: [
      { name: 'Interior Painting', desc: 'Vibrant indoor finishes' },
      { name: 'Exterior Painting', desc: 'Durable outdoor coatings' }
    ]
  },
  {
    name: 'Artistic Canvas Painting',
    description: 'Custom canvas artworks',
    category: 'Painting & Artwork',
  },
  {
    name: 'Decorative Painting for Events',
    description: 'Event-specific decorative painting',
    category: 'Painting & Artwork',
  },
  {
    name: 'Graffiti or Street Art Projects',
    description: 'Creative outdoor or indoor murals',
    category: 'Painting & Artwork',
  },
  // Printing & Stationery
  {
    name: 'T-shirt Printing',
    description: 'Digital printing, screen printing, custom designs',
    category: 'Printing & Stationery',
    subItems: [
      { name: 'Digital Printing', desc: 'High-quality digital prints' },
      { name: 'Screen Printing', desc: 'Traditional screen printing' },
      { name: 'Custom Designs', desc: 'Tailored artwork for apparel' }
    ]
  },
  { name: 'Calendars', description: 'Custom-designed office or family calendars', category: 'Printing & Stationery' },
  { name: 'Visiting / Business Cards', description: 'Personalized professional cards', category: 'Printing & Stationery' },
  { name: 'ID Cards', description: 'Employee, student, or event IDs with lamination and QR/barcode options', category: 'Printing & Stationery' },
  { name: 'Flyers, Brochures, Posters', description: 'Promotional and marketing prints', category: 'Printing & Stationery' },
  { name: 'Corporate Stationery', description: 'Letterheads, envelopes, notepads', category: 'Printing & Stationery' },
  { name: 'Gift Cards & Vouchers', description: 'Custom gift solutions', category: 'Printing & Stationery' },
  // Awards & Trophies
  { name: 'Customized Trophies', description: 'Personalized trophies for events and recognition', category: 'Awards & Trophies' },
  { name: 'Plaques & Shields', description: 'Engraved plaques and award shields', category: 'Awards & Trophies' },
  { name: 'Medals', description: 'Custom medals for sports and events', category: 'Awards & Trophies' },
  { name: 'Acrylic / Glass Awards', description: 'Elegant glass or acrylic awards', category: 'Awards & Trophies' },
  { name: 'Engraved Awards & Corporate Gifts', description: 'Premium corporate gifting solutions', category: 'Awards & Trophies' },
  // Other Custom Work
  { name: 'Personalized Gifts & Merchandise', description: 'Custom gifts and branded merchandise', category: 'Other Custom Work' },
  { name: 'Event Branding Materials', description: 'Complete event branding solutions', category: 'Other Custom Work' },
  { name: 'Promotional Products for Marketing', description: 'Unique promotional items', category: 'Other Custom Work' },
  { name: 'Fabric Printing', description: 'Printed bags, caps, uniforms', category: 'Other Custom Work' },
];

async function resetItems() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/signage', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await Item.deleteMany({});
  await Item.insertMany(hardcodedItems);
  console.log('Items collection reset to hardcoded data.');
  process.exit();
}

resetItems();