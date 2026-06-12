/**
 * Ghoul Site Configuration
 */

export interface CrossLink {
  id: string;
  name: string;
  domain: string;
  icon: string;
  color: string;
  realm: string;
  live: boolean;
}

export interface Product {
  name: string;
  tagline: string;
  description: string;
  category: 'core' | 'pro' | 'tool' | 'refill' | 'limited';
  volume: string;
  price: string;
  features: string[];
  heroIngredient?: string;
}

export interface GhoulConfig {
  id: string;
  name: string;
  tagline: string;
  description: string;
  domain: string;
  icon: string;
  isLeader: boolean;
  products: Product[];
  crossLinks: CrossLink[];
  cta: {
    headline: string;
    subheadline: string;
    buttonText: string;
    placeholderText: string;
  };
  gameUrl: string;
  social: {
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  science: {
    title: string;
    subtitle: string;
    description: string;
    adaptation: string;
    stats: { label: string; value: string }[];
  };
  marketSize: string;
  traction: { label: string; value: string; status: 'complete' | 'in-progress' | 'upcoming' }[];
  ipStatus: string;
  ipClasses: string[];
  roadmap: { phase: string; title: string; items: string[]; status: 'complete' | 'in-progress' | 'upcoming' }[];
  fundingAsk: string;
  valuation: string;
  equityOffered: string;
  projectedRevenue: { year: string; amount: string; sources: string }[];
  roiTarget: string;
  partnerships: { type: string; description: string }[];
  revenueStreams: { stream: string; description: string; timeline: string }[];
}

export const config: GhoulConfig = {
  id: "googoo",
  name: "GOO GOO",
  tagline: "Tiny Humans, Trusted Care",
  description: "The infant and early-childhood vertical. GOO GOO handles the chaos of new parenthood with gentle, scientifically-backed recommendations.",
  domain: "https://www.googooghoul.com",
  icon: "🍼",
  isLeader: false,

  products: [
    {
      name: "Bottle Sterilizer",
      tagline: "Milk's enemy. Baby's friend.",
      description: "Plant-derived sterilising solution for baby bottles, teats, and pump parts. Kills 99.9% of bacteria without heat or harsh chemicals.",
      category: "core",
      volume: "500ml",
      price: "$19.99 AUD",
      features: ["No heat required", "Plant-derived", "Rinse-free"],
      heroIngredient: "Gentle-Bond Disruptors™",
    },
    {
      name: "Nappy Bin Refresher",
      tagline: "Odour? What odour?",
      description: "Powder sachets that neutralise ammonia and bacteria in nappy bins. Locks odours at the molecular level for 7 days.",
      category: "core",
      volume: "30 Sachets",
      price: "$16.99 AUD",
      features: ["7-day lock", "Ammonia neutraliser", "Biodegradable sachets"],
      heroIngredient: "Gentle-Bond Disruptors™",
    },
    {
      name: "Puree Stain Lifter",
      tagline: "Carrot is no match.",
      description: "Pre-treatment spray for fruit and vegetable puree stains on cotton, bamboo, and synthetic fabrics. Works in cold water.",
      category: "core",
      volume: "250ml",
      price: "$15.99 AUD",
      features: ["Cold water active", "Fruit enzyme blend", "Fabric safe"],
      heroIngredient: "Gentle-Bond Disruptors™",
    },
    {
      name: "Toy Sanitizer",
      tagline: "Everything goes in the mouth.",
      description: "Wipe-free sanitising mist for plastic, wood, and fabric toys. Safe to use while baby is playing nearby.",
      category: "pro",
      volume: "300ml",
      price: "$17.99 AUD",
      features: ["Wipe-free", "Play-area safe", "Food-contact safe"],
      heroIngredient: "Gentle-Bond Disruptors™",
    },
    {
      name: "Crib Sheet Rescue",
      tagline: "Midnight accidents, morning solutions.",
      description: "On-the-spot treatment for crib sheet stains from milk, spit-up, and nappy leaks. Spray, wait, machine wash.",
      category: "pro",
      volume: "200ml",
      price: "$14.99 AUD",
      features: ["Machine wash compatible", "Spit-up specialist", "Fabric softening"],
      heroIngredient: "Gentle-Bond Disruptors™",
    },
    {
      name: "Bamboo Wipes",
      tagline: "Soft as a cloud.",
      description: "Extra-thick bamboo fibre wipes infused with aloe and chamomile. Compostable and biodegradable.",
      category: "tool",
      volume: "64 Pack",
      price: "$9.99 AUD",
      features: ["Bamboo fibre", "Aloe infused", "Compostable"],
    },
    {
      name: "The Nursery Caddy",
      tagline: "Organised gentleness.",
      description: "Soft-touch organiser caddy with compartments for bottles, wipes, creams, and sprays. BPA-free plastic.",
      category: "tool",
      volume: "Caddy",
      price: "$29.99 AUD",
      features: ["BPA-free", "Soft-touch", "Compartmentalised"],
    },
    {
      name: "Bottle Sterilizer Refill",
      tagline: "Gentle never runs out.",
      description: "Concentrated refill for the Bottle Sterilizer. Same plant-derived power in an eco-friendly pouch.",
      category: "refill",
      volume: "1L Pouch",
      price: "$22.99 AUD",
      features: ["Eco pouch", "2x refills", "Less plastic"],
      heroIngredient: "Gentle-Bond Disruptors™",
    },
    {
      name: "Newborn Welcome Set",
      tagline: "The perfect first gift.",
      description: "Curated set of all GOO GOO core products in travel sizes, plus the bamboo wipes. Gift-boxed and ready.",
      category: "limited",
      volume: "Gift Set",
      price: "$49.99 AUD",
      features: ["Travel sizes", "Gift boxed", "Pediatrician approved"],
      heroIngredient: "Gentle-Bond Disruptors™",
    },
  ],

  crossLinks: [
    {
      id: "ghoulverse",
      name: "GHOULVERSE",
      domain: "https://www.ghoulverse.com",
      icon: "🌌",
      color: "#00f0ff",
      realm: "The Universe",
      live: true,
    },
    {
      id: "goo",
      name: "GOO GHOUL",
      domain: "https://www.ghoulverse.com/ghouls/goo/",
      icon: "👻",
      color: "#00f0ff",
      realm: "The Origin",
      live: true,
    },
    {
      id: "party",
      name: "PARTY GHOUL",
      domain: "https://www.partyghoul.com",
      icon: "🎉",
      color: "#ff00ff",
      realm: "The Neon District",
      live: true,
    },
    {
      id: "beauty",
      name: "BEAUTY GHOUL",
      domain: "https://www.beautyghoul.com",
      icon: "💄",
      color: "#ec4899",
      realm: "The Glamour Dimension",
      live: true,
    },
    {
      id: "garden",
      name: "GARDEN GHOUL",
      domain: "https://www.gardenghoul.com",
      icon: "🌿",
      color: "#22c55e",
      realm: "The Verdant Wilds",
      live: true,
    },
    {
      id: "zen",
      name: "ZEN GHOUL",
      domain: "https://www.zenghoul.com",
      icon: "🧘",
      color: "#a855f7",
      realm: "The Tranquil Gardens",
      live: true,
    },
    {
      id: "tradie",
      name: "TRADIE GHOUL",
      domain: "https://www.tradieghoul.com",
      icon: "🔧",
      color: "#eab308",
      realm: "The Industrial Wastes",
      live: true,
    },
    {
      id: "geek",
      name: "GEEK GHOUL",
      domain: "https://www.geekghoul.com",
      icon: "💻",
      color: "#00d4ff",
      realm: "The Mainframe",
      live: true,
    },
    {
      id: "sport",
      name: "SPORT GHOUL",
      domain: "https://www.ghoulverse.com/ghouls/sport/",
      icon: "🏆",
      color: "#f97316",
      realm: "The Arena",
      live: false,
    },
    {
      id: "googoo",
      name: "GOO GOO",
      domain: "https://www.googooghoul.com",
      icon: "🍼",
      color: "#3b82f6",
      realm: "The Nursery",
      live: true,
    },
    {
      id: "kid",
      name: "KID GHOUL",
      domain: "https://www.kidghoul.com",
      icon: "🧒",
      color: "#ef4444",
      realm: "The Playground",
      live: true,
    },
    {
      id: "teen",
      name: "TEEN GHOUL",
      domain: "https://www.teenghoul.com",
      icon: "🎧",
      color: "#8b5cf6",
      realm: "The Hangout",
      live: true,
    },
    {
      id: "scholar",
      name: "BOOK GHOUL",
      domain: "https://www.ghoulverse.com/ghouls/scholar/",
      icon: "📚",
      color: "#f97316",
      realm: "The Infinite Library",
      live: false,
    },
  ],

  cta: {
    headline: "Investor Inquiries",
    subheadline: "Join the GHOULVERSE portfolio. Request the full investor deck and financial projections.",
    buttonText: "Request Deck",
    placeholderText: "Enter your email...",
  },

  gameUrl: "https://www.ghoulverse.com/play/",

  social: {
    // Social accounts launching Q2 2026 — follow @ghoulverse
  },

  science: {
    title: "The Science",
    subtitle: "Gentle-Bond Disruptors™",
    description: "Every GOO GOO product is powered by Gentle-Bond Disruptors™ — a patented enzyme system that targets organic proteins and carbohydrates at the molecular level. Puree on a onesie? Nappy bin odor? These enzymes dismantle the molecular bonds holding messes together — without harsh chemicals, synthetic fragrances, or residues unsafe for infant skin.",
    adaptation: "For the Nursery, every formulation is paediatrician-advised, fragrance-conscious, and designed for the gentlest care routines from bottles to bedding.",
    stats: [
      { label: "Bond Breakdown", value: "<45s" },
      { label: "pH Balance", value: "5.5" },
      { label: "Skin Safety", value: "Pediatrician Approved" },
      { label: "Residue", value: "Zero" },
    ],
  },

  marketSize: "$300B global baby care market",
  traction: [
    { label: "Character Websites", value: "10 Live", status: "complete" },
    { label: "GOO GHOUL™ Trademark", value: "IP Australia — Accepted", status: "complete" },
    { label: "GHOULVERSE Game", value: "Live", status: "complete" },
    { label: "Brand Partnerships", value: "Seeking First Deals", status: "upcoming" },
  ],
  ipStatus: "Trademark classes identified — Class 3 (baby care & cleaning preparations), Class 5 (pharmaceutical & sanitary preparations) and Class 35 (retail store services). Filing planned post-funding.",
  ipClasses: [
    "Class 3 — Baby care, cleaning preparations & stain removers",
    "Class 5 — Pharmaceutical, sanitary & infant care preparations",
    "Class 35 — Retail store services featuring baby care products",
    "Class 21 — Household utensils, wipes & cleaning accessories",
  ],
  roadmap: [
    { phase: "Phase 1", title: "Foundation", items: ["12 character websites live", "GOO GHOUL™ Class 3 (AU) filed", "GHOULVERSE game launched"], status: "complete" },
    { phase: "Phase 1.5", title: "International IP", items: ["US trademark via Madrid Protocol", "EU trademark filing", "Defensive name registrations"], status: "in-progress" },
    { phase: "Phase 2", title: "Mascot Creation", items: ["24 professional mascots (2 per ghoul)", "$120K investment across 12 characters"], status: "upcoming" },
    { phase: "Phase 3", title: "Partnerships & Revenue", items: ["Sector sponsorships", "Affiliate deals", "Event appearances", "Influencer recruitment"], status: "upcoming" },
    { phase: "Phase 4", title: "Entertainment Scale", items: ["Animated series pilot", "Convention circuit", "Merchandise licensing"], status: "upcoming" },
    { phase: "Phase 5", title: "Product Launch", items: ["GOO GHOUL flagship household line", "Vertical-specific owned product lines"], status: "upcoming" },
  ],

  fundingAsk: "$250,000 AUD",
  valuation: "$1,250,000 pre-money",
  equityOffered: "20%",
  projectedRevenue: [
    { year: "Year 1", amount: "$200,000", sources: "Brand sponsorships, event appearances, affiliate commissions" },
    { year: "Year 2", amount: "$560,000", sources: "Licensing, events, merch royalties, content" },
    { year: "Year 3", amount: "$1,200,000", sources: "Full licensing engine + product sales" },
  ],
  roiTarget: "5–8x over 3–5 years (40–70% IRR)",
  partnerships: [
    { type: "Brand Sponsorships", description: "Existing companies in each vertical pay to associate with our character IP at events and online." },
    { type: "Affiliate Marketing", description: "Partner products featured on ghoul websites — we earn commission on referred sales." },
    { type: "Event Appearances", description: "Mascots appear at sports events, conventions, retail launches — appearance fees + brand exposure." },
    { type: "Licensing", description: "Brands license ghoul characters for their own marketing, packaging, and promotions." },
  ],
  revenueStreams: [
    { stream: "Sponsorships", description: "Sector-specific brand deals per ghoul", timeline: "Year 1" },
    { stream: "Events", description: "Mascot appearances and activations", timeline: "Year 1" },
    { stream: "Affiliate", description: "Commission on partner product sales", timeline: "Year 1" },
    { stream: "Licensing", description: "Character IP licensing to brands", timeline: "Year 2" },
    { stream: "Merchandise", description: "Royalties on plush, apparel, accessories", timeline: "Year 2" },
    { stream: "Animation", description: "YouTube/streaming ad revenue, distribution deals", timeline: "Year 2" },
    { stream: "Products", description: "Owned product lines launched per vertical, starting with GOO GHOUL", timeline: "Year 3" },
  ],
};
