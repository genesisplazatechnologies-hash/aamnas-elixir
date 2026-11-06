import type { Product } from "@/lib/types";

/**
 * Single source of truth for the catalog.
 *
 * NOTE ON PLACEHOLDERS: product imagery is crafted SVG art (swap in real
 * photography under public/images/products/). Ingredient lists, directions
 * and any efficacy claims are intentionally left as clearly-marked
 * placeholders until the brand supplies verified specifications — do not
 * invent SPF ratings, clinical results or ingredient lists.
 */
export const products: Product[] = [
  {
    id: "spf",
    slug: "spf",
    name: "Aamna's Elixir SPF",
    shortName: "SPF",
    category: "Sun Protection",
    price: 68,
    size: "50 ml",
    images: ["/images/products/spf.svg"],
    video: undefined,
    description:
      "An elevated daily skincare essential designed to complement your everyday ritual.",
    details: [
      "Lightweight, everyday formula",
      "Designed to layer seamlessly under makeup",
      "Presented in signature Aamna's Elixir packaging",
    ],
    ingredients: ["[Ingredient list pending — to be supplied by the brand]"],
    directions: "[Directions for use pending — to be supplied by the brand]",
    availability: "in_stock",
    shopifyHandle: "aamnas-elixir-spf",
    visual: {
      variant: "bottle",
      liquidFrom: "#8e1a24",
      liquidTo: "#410811",
      labelEyebrow: "Aamna's Elixir",
      labelName: "SPF",
      labelSubtitle: "50 ml",
    },
    signature: {
      eyebrow: "Signature Collection",
      heading: "PROTECTION, REDEFINED.",
      description:
        "An elevated daily skincare essential designed to complement your everyday ritual.",
      cta: "DISCOVER SPF",
      theme: "burgundy",
    },
  },
  {
    id: "moisturizer",
    slug: "moisturizer",
    name: "Aamna's Elixir Moisturizer",
    shortName: "Moisturizer",
    category: "Moisturizer",
    price: 84,
    size: "50 ml",
    images: ["/images/products/moisturizer.svg"],
    video: undefined,
    description:
      "An indulgent moisturizing ritual created to leave skin feeling nourished and cared for.",
    details: [
      "Rich, indulgent texture",
      "Designed for daily morning and evening use",
      "Presented in a weighty, refillable-style jar",
    ],
    ingredients: ["[Ingredient list pending — to be supplied by the brand]"],
    directions: "[Directions for use pending — to be supplied by the brand]",
    availability: "in_stock",
    shopifyHandle: "aamnas-elixir-moisturizer",
    visual: {
      variant: "jar",
      liquidFrom: "#e4c88b",
      liquidTo: "#6b4f1f",
      labelEyebrow: "Aamna's Elixir",
      labelName: "Moisturizer",
      labelSubtitle: "50 ml",
    },
    signature: {
      eyebrow: "Signature Collection",
      heading: "THE ART OF HYDRATION.",
      description:
        "An indulgent moisturizing ritual created to leave skin feeling nourished and cared for.",
      cta: "DISCOVER MOISTURIZER",
      theme: "champagne",
    },
  },
  {
    id: "hand-soap",
    slug: "hand-soap",
    name: "Aamna's Elixir Liquid Hand Soap",
    shortName: "Hand Soap",
    category: "Hand Care",
    price: 42,
    size: "300 ml",
    images: ["/images/products/hand-soap.svg"],
    video: undefined,
    description:
      "Transform an everyday cleansing ritual into a moment of understated luxury.",
    details: [
      "Gentle everyday cleanser",
      "Refills available to reduce waste",
      "Elegant pump dispenser for the vanity or basin",
    ],
    ingredients: ["[Ingredient list pending — to be supplied by the brand]"],
    directions: "[Directions for use pending — to be supplied by the brand]",
    availability: "in_stock",
    shopifyHandle: "aamnas-elixir-liquid-hand-soap",
    visual: {
      variant: "pump",
      liquidFrom: "#a51a28",
      liquidTo: "#2a070a",
      labelEyebrow: "Aamna's Elixir",
      labelName: "Hand Soap",
      labelSubtitle: "300 ml",
    },
    signature: {
      eyebrow: "Signature Collection",
      heading: "ELEVATE THE EVERYDAY.",
      description:
        "Transform an everyday cleansing ritual into a moment of understated luxury.",
      cta: "DISCOVER HAND SOAP",
      theme: "crimson",
    },
  },
];
