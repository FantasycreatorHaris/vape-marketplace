export type Product = {
  slug: string;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
  imageAlt: string;
  strength: string;
  size: string;
  finish: string;
  notes: string[];
  badge?: string;
};

export const catalog: Product[] = [
  {
    slug: "obsidian-reserve",
    name: "Obsidian Reserve",
    category: "Limited Vape Collection",
    price: "$68",
    description:
      "A deep, layered blend designed for slow evenings and clean finishes.",
    image: "/products/obsidian-reserve.png",
    imageAlt: "Obsidian Reserve presentation kit",
    strength: "Medium",
    size: "20ml",
    finish: "Matte graphite",
    notes: ["dark cacao", "smoked vanilla", "warm cedar"],
    badge: "Collector",
  },
  {
    slug: "cinder-classic",
    name: "Cinder Classic",
    category: "Luxury Cigarettes",
    price: "$42",
    description:
      "A crisp, refined profile with a balanced draw and velvet aftertone.",
    image: "/products/cinder-classic.png",
    imageAlt: "Cinder Classic luxury pack",
    strength: "Smooth",
    size: "Pack of 10",
    finish: "Soft-touch",
    notes: ["toasted almond", "amber spice", "creme"],
    badge: "Signature",
  },
  {
    slug: "sable-noir",
    name: "Sable Noir",
    category: "Artisan Vape",
    price: "$74",
    description:
      "Polished and modern, with an aromatic profile that lingers cleanly.",
    image: "/products/sable-noir.png",
    imageAlt: "Sable Noir artisan bottle",
    strength: "Rich",
    size: "25ml",
    finish: "Onyx satin",
    notes: ["black tea", "cured tobacco", "copper sugar"],
  },
  {
    slug: "emberline",
    name: "Emberline",
    category: "Luxury Cigarettes",
    price: "$49",
    description:
      "Warm and elegant, tailored for slow rituals and understated moments.",
    image: "/products/emberline.png",
    imageAlt: "Emberline cigarette pack",
    strength: "Balanced",
    size: "Pack of 12",
    finish: "Embossed foil",
    notes: ["golden caramel", "dry oak", "spiced cocoa"],
  },
  {
    slug: "golden-haze",
    name: "Golden Haze",
    category: "Limited Vape Collection",
    price: "$62",
    description:
      "Soft citrus notes with a refined finish that stays smooth.",
    image: "/products/golden-haze.png",
    imageAlt: "Golden Haze limited bottle",
    strength: "Light",
    size: "18ml",
    finish: "Brushed brass",
    notes: ["blood orange", "tobacco flower", "honeyed amber"],
  },
  {
    slug: "nightfall-velvet",
    name: "Nightfall Velvet",
    category: "Artisan Vape",
    price: "$70",
    description:
      "Velvety texture with a subtle glow, crafted for evening lounges.",
    image: "/products/nightfall-velvet.png",
    imageAlt: "Nightfall Velvet presentation kit",
    strength: "Medium",
    size: "22ml",
    finish: "Black velvet",
    notes: ["fig", "dark rum", "sweet smoke"],
    badge: "New",
  },
];

export const getProduct = (slug: string) =>
  catalog.find((item) => item.slug === slug);
