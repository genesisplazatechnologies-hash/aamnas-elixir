export type Availability = "in_stock" | "out_of_stock" | "preorder";

export type SignatureTheme = "burgundy" | "champagne" | "crimson";

/** Product silhouette rendered by the CSS-3D `Product3D` component. */
export type ProductVariant = "bottle" | "jar" | "pump";

/** Everything `Product3D` needs to draw a product with no image assets. */
export type ProductVisual = {
  variant: ProductVariant;
  /** Liquid gradient — top of the fill. */
  liquidFrom: string;
  /** Liquid gradient — bottom of the fill. */
  liquidTo: string;
  /** Small-caps brand line on the front label. */
  labelEyebrow: string;
  /** Product name in the script wordmark on the front label. */
  labelName: string;
  /** Small line under the name (e.g. size). */
  labelSubtitle: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  category: string;
  price: number;
  size: string;
  images: string[];
  /** Turntable video path (e.g. "/videos/products/spf.mp4"). Optional — absent until assets exist. */
  video?: string;
  description: string;
  /** Short bullet points shown on the product detail page. */
  details: string[];
  /** Placeholder until real, verified ingredient lists are supplied. */
  ingredients: string[];
  directions: string;
  availability: Availability;
  /** Maps to the Shopify product handle once the storefront is connected. */
  shopifyHandle: string;
  /** 3D render config — used in place of photography until real assets exist. */
  visual: ProductVisual;
  /** Copy + theme for the signature homepage scroll section. */
  signature: {
    eyebrow: string;
    heading: string;
    description: string;
    cta: string;
    theme: SignatureTheme;
  };
};

export type CartLine = {
  productId: string;
  quantity: number;
};
