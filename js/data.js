/* ==========================================================
   CLIPPER – data.js
   All the "facts" of the website live here: prices, branches,
   icons and quiz answers. Change them here and every page updates.
   ========================================================== */

const SITE = {
  name: 'Clipper',
  phone: '0300 0000000',
  phoneLink: '+923000000000',   // used for call buttons
  whatsapp: '923000000000',     // WhatsApp number: country code + number, no + or spaces
  code: 'WEB10',
  discount: 0.10,
  fallbackUrl: 'https://www.clipper-demo.example' // shown when the site is opened from a file
};

/* ---------- Services (prices in PKR) ---------- */
const CATEGORIES = [
  { id: 'hair', label: 'Hair' },
  { id: 'beard', label: 'Beard' },
  { id: 'skin', label: 'Skin' },
  { id: 'packages', label: 'Grooming Packages' }
];

const SERVICES = [
  // Hair
  { id: 'h-classic', cat: 'hair', name: 'Classic Haircut', price: 1200, desc: 'Scissor & clipper cut with wash and style' },
  { id: 'h-fade', cat: 'hair', name: 'Skin Fade', price: 1500, desc: 'Sharp, clean fade with line-up' },
  { id: 'h-crop', cat: 'hair', name: 'Textured Crop', price: 1300, desc: 'Short, messy top with a tidy neckline' },
  { id: 'h-pomp', cat: 'hair', name: 'Pompadour & Styling', price: 1600, desc: 'Volume on top, styled with premium wax' },
  { id: 'h-curly', cat: 'hair', name: 'Curly Cut & Define', price: 1500, desc: 'Shape and definition for curls' },
  { id: 'h-buzz', cat: 'hair', name: 'Buzz Cut', price: 700, desc: 'One-length machine cut, zero fuss' },
  { id: 'h-wash', cat: 'hair', name: 'Hair Wash & Blow-dry', price: 500, desc: 'Shampoo, conditioner and styling' },
  { id: 'h-colour', cat: 'hair', name: 'Hair Colour', price: 3000, desc: 'Ammonia-free colour, full head' },
  { id: 'h-spa', cat: 'hair', name: 'Hair Spa', price: 2500, desc: 'Deep conditioning and scalp massage' },
  { id: 'h-keratin', cat: 'hair', name: 'Keratin Smoothing', price: 6000, desc: 'Frizz-free, smooth hair for months' },
  { id: 'h-fall', cat: 'hair', name: 'Hair Fall Treatment', price: 3500, desc: 'Scalp therapy to reduce hair fall' },
  // Beard
  { id: 'b-trim', cat: 'beard', name: 'Beard Trim', price: 600, desc: 'Tidy trim to your length' },
  { id: 'b-shape', cat: 'beard', name: 'Beard Shaping & Design', price: 900, desc: 'Sharp lines and a clean shape' },
  { id: 'b-shave', cat: 'beard', name: 'Hot Towel Shave', price: 800, desc: 'Classic razor shave with hot towel' },
  { id: 'b-colour', cat: 'beard', name: 'Beard Colour', price: 1500, desc: 'Natural-looking colour' },
  { id: 'b-mous', cat: 'beard', name: 'Moustache Trim', price: 300, desc: 'Quick tidy-up' },
  // Skin
  { id: 's-clean', cat: 'skin', name: 'Face Cleanup', price: 1800, desc: 'Deep cleansing for fresh skin' },
  { id: 's-facial', cat: 'skin', name: 'Classic Facial', price: 2500, desc: 'Cleanse, scrub, massage and mask' },
  { id: 's-gold', cat: 'skin', name: 'Gold Facial', price: 4000, desc: 'Our premium glow facial' },
  { id: 's-detan', cat: 'skin', name: 'De-Tan Treatment', price: 2200, desc: 'Removes tan and evens skin tone' },
  { id: 's-black', cat: 'skin', name: 'Blackhead Removal', price: 1200, desc: 'Gentle and hygienic' },
  { id: 's-acne', cat: 'skin', name: 'Acne Care Treatment', price: 3500, desc: 'Calms breakouts, controls oil' },
  { id: 's-mask', cat: 'skin', name: 'Charcoal Face Mask', price: 1000, desc: 'Detox mask for tired skin' },
  { id: 's-mani', cat: 'skin', name: 'Manicure', price: 1500, desc: 'Clean, shaped hands' },
  { id: 's-pedi', cat: 'skin', name: 'Pedicure', price: 2000, desc: 'Relaxing foot care' },
  { id: 's-massage', cat: 'skin', name: 'Head & Shoulder Massage', price: 800, desc: '15 minutes of pure relaxation' },
  // Packages
  { id: 'p-gent', cat: 'packages', name: 'The Gentleman', price: 2800, desc: 'Haircut + beard trim + wash', tag: 'Popular' },
  { id: 'p-fresh', cat: 'packages', name: 'Fresh Face', price: 3900, desc: 'Haircut + face cleanup + massage' },
  { id: 'p-royal', cat: 'packages', name: 'The Royal', price: 6500, desc: 'Haircut + beard + classic facial + massage', tag: 'Best value' },
  { id: 'p-student', cat: 'packages', name: 'Student Saver', price: 1800, desc: 'Haircut + wash (valid with student card)' },
  { id: 'p-groom', cat: 'packages', name: 'Groom Package', price: 15000, desc: 'Hair, beard, gold facial, mani, pedi, styling' }
];

/* ---------- Branches (all details are made up) ---------- */
const BRANCHES = [
  { id: 'gulberg', name: 'Gulberg', address: 'Shop 12, Main Boulevard Plaza, Gulberg III, Lahore', hours: 'Every day, 10:00 AM – 10:00 PM', phone: SITE.phone, phoneLink: SITE.phoneLink, map: 'Main Boulevard Gulberg III Lahore' },
  { id: 'dha', name: 'DHA', address: 'Plot 45, Phase 5 Commercial Area, DHA, Lahore', hours: 'Every day, 10:00 AM – 11:00 PM', phone: SITE.phone, phoneLink: SITE.phoneLink, map: 'Phase 5 DHA Lahore' },
  { id: 'johar', name: 'Johar Town', address: 'Shop 7, Block R1 Market, Johar Town, Lahore', hours: 'Every day, 10:00 AM – 10:00 PM', phone: SITE.phone, phoneLink: SITE.phoneLink, map: 'Johar Town Lahore' },
  { id: 'model', name: 'Model Town', address: 'Shop 3, Link Road Market, Model Town, Lahore', hours: 'Every day, 11:00 AM – 10:00 PM', phone: SITE.phone, phoneLink: SITE.phoneLink, map: 'Link Road Model Town Lahore' }
];

/* ---------- Quiz: styles and how answers add points ---------- */
const STYLES = {
  classic: { name: 'Classic Taper', service: 'h-classic', text: 'Clean, timeless and always sharp. Works everywhere, from the office to a family dinner.' },
  fade:    { name: 'Skin Fade', service: 'h-fade', text: 'Short sides, crisp lines and a modern edge. Looks fresh every time.' },
  crop:    { name: 'Textured Crop', service: 'h-crop', text: 'Short, natural and stylish. Easy to manage and full of character.' },
  pomp:    { name: 'Pompadour', service: 'h-pomp', text: 'Volume and shine on top. Made for people who like to stand out.' },
  buzz:    { name: 'Buzz Cut', service: 'h-buzz', text: 'Super low maintenance and very cool. Just wake up and go.' },
  curly:   { name: 'Curly Top Cut', service: 'h-curly', text: 'Short sides with defined, healthy curls on top.' }
};

const QUIZ = [
  { q: 'What is your hair like?', options: [
    { t: 'Straight', pts: { classic: 2, pomp: 2, crop: 1, fade: 1 } },
    { t: 'Wavy', pts: { crop: 2, pomp: 1, classic: 1, fade: 1 } },
    { t: 'Curly', pts: { curly: 3, fade: 2, buzz: 1 } },
    { t: 'Thin or thinning', pts: { buzz: 3, classic: 1, fade: 1 } }
  ] },
  { q: 'How much time will you spend styling each day?', options: [
    { t: 'Almost none', pts: { buzz: 2, classic: 1, fade: 1 } },
    { t: 'A few minutes', pts: { classic: 2, crop: 2, fade: 1 } },
    { t: 'I love styling!', pts: { pomp: 3, crop: 1, curly: 1 } }
  ] },
  { q: 'What is your everyday vibe?', options: [
    { t: 'Office / professional', pts: { classic: 3, pomp: 1 } },
    { t: 'Casual & relaxed', pts: { crop: 2, curly: 1, fade: 1 } },
    { t: 'Sporty & active', pts: { buzz: 2, fade: 2 } },
    { t: 'Wedding / party ready', pts: { pomp: 3, fade: 1, classic: 1 } }
  ] }
];

/* ---------- Icons (hand-drawn SVG paths, 24x24) ---------- */
const ICONS = {
  scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.1 8.1 20 20M8.1 15.9 20 4"/>',
  razor: '<path d="M3 16 15 6l6 4-12 9z"/><path d="M13 8l3.5 4.5"/>',
  comb: '<rect x="3" y="6" width="18" height="6" rx="1.5"/><path d="M6 12v6M9.5 12v6M13 12v6M16.5 12v6"/>',
  beard: '<path d="M5 8c0 7 2 12 7 12s7-5 7-12"/><path d="M8 13c1.2 1 2.4 1.4 4 1.4s2.8-.4 4-1.4"/><path d="M5 8c0-3 3-5 7-5s7 2 7 5"/>',
  sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 17v4M17 19h4"/>',
  gift: '<rect x="3" y="9" width="18" height="12" rx="1.5"/><path d="M12 9v12M3 13h18M12 9C9 9 7 7.5 7.5 6 8.3 4 11 5.5 12 9zM12 9c3 0 5-1.5 4.5-3C15.7 4 13 5.5 12 9z"/>',
  pin: '<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  whatsapp: '<path d="M3 21l1.6-4.7A9 9 0 1 1 8 19.6z"/><path d="M9 9c0 3 3 6 6 6l1.2-1.4-2-1-1 .7c-.8-.4-1.6-1.2-2-2l.7-1-1-2z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8 6.6 19.7l1.1-6.1L3.2 9.4l6.1-.8z"/>',
  check: '<path d="M4 12.5l5 5L20 6.5"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><path d="M16 4.7a3.5 3.5 0 0 1 0 6.6M18 14.3c2.2.6 3.5 2.4 3.5 5.7"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.7 10.6l6.6-4M8.7 13.4l6.6 4"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  award: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/>',
  camera: '<path d="M3 8h4l2-3h6l2 3h4v12H3z"/><circle cx="12" cy="13" r="4"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5L16 9.5"/>',
  tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5"/>',
  heart: '<path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z"/>'
};

/* ---------- Small helper functions used on many pages ---------- */
function icon(name) {
  return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || '') + '</svg>';
}
function rupees(n) {
  return 'Rs ' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function findService(id) { return SERVICES.find(function (s) { return s.id === id; }); }
function findBranch(id) { return BRANCHES.find(function (b) { return b.id === id; }); }
function waLink(message) {
  return 'https://wa.me/' + SITE.whatsapp + '?text=' + encodeURIComponent(message);
}
/* Small SVG face with a hairstyle – used in the quiz result */
function haircutSVG(style) {
  var hair = {
    classic: '<path d="M62 84C58 44 82 28 102 28s44 16 38 56c-4-18-14-26-38-26S66 66 62 84z"/><path d="M96 38c6 6 16 10 26 12" fill="none"/>',
    fade: '<path d="M64 84C62 52 80 36 102 36s40 16 38 48c-2-16-10-30-38-30S66 68 64 84z"/><path d="M62 90c-1-8 0-14 2-18M140 90c1-8 0-14-2-18" fill="none"/>',
    crop: '<path d="M60 86C54 46 78 26 102 26s48 20 42 60c-4-14-8-22-14-26l-8 8-8-10-10 10-8-10-10 10-8-8c-6 6-10 14-12 20z"/>',
    pomp: '<path d="M60 86C48 40 70 14 108 16c32 2 44 26 36 54-1 6-3 12-4 16-4-20-12-30-38-30S66 68 60 86z"/><path d="M82 30c10-8 26-8 36 0" fill="none"/>',
    buzz: '<path d="M64 80C64 50 82 38 102 38s38 12 38 42c-4-14-14-22-38-22S68 66 64 80z" opacity=".75"/>',
    curly: '<circle cx="72" cy="62" r="13"/><circle cx="88" cy="46" r="14"/><circle cx="108" cy="42" r="15"/><circle cx="127" cy="52" r="14"/><circle cx="134" cy="70" r="11"/><circle cx="80" cy="76" r="9"/>'
  };
  return '<svg viewBox="0 0 204 220" role="img" aria-label="' + (STYLES[style] ? STYLES[style].name : '') + ' illustration">' +
    '<path d="M20 220c0-34 30-50 82-50s82 16 82 50z" fill="#252528" stroke="#c9a24b" stroke-width="2"/>' +
    '<rect x="88" y="140" width="28" height="34" rx="8" fill="#c99a76"/>' +
    '<ellipse cx="102" cy="100" rx="42" ry="52" fill="#d8ab86"/>' +
    '<ellipse cx="60" cy="102" rx="6" ry="10" fill="#c99a76"/><ellipse cx="144" cy="102" rx="6" ry="10" fill="#c99a76"/>' +
    '<circle cx="86" cy="100" r="3.5" fill="#222"/><circle cx="118" cy="100" r="3.5" fill="#222"/>' +
    '<path d="M94 126q8 6 16 0" stroke="#7a4b33" stroke-width="3" fill="none" stroke-linecap="round"/>' +
    '<g fill="#2b2420" stroke="#c9a24b" stroke-width="2" stroke-linejoin="round">' + (hair[style] || '') + '</g></svg>';
}
