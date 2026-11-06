import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Pinyon_Script } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

const pinyon = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pinyon",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Aamna's Elixir — Luxury Skincare",
    template: "%s · Aamna's Elixir",
  },
  description:
    "Where timeless elegance meets the science of beautiful skin. Luxury skincare, thoughtfully presented.",
  openGraph: {
    title: "Aamna's Elixir — Luxury Skincare",
    description:
      "Where timeless elegance meets the science of beautiful skin.",
    type: "website",
    siteName: "Aamna's Elixir",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${pinyon.variable} ${cormorant.variable} ${manrope.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-midnight font-sans text-ivory">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
