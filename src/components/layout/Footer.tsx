import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { CopyrightYear } from "@/components/layout/CopyrightYear";

export function Footer() {
  const products = getAllProducts();

  return (
    <footer className="border-t border-gold/10 bg-charcoal">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="md:col-span-5">
            <Link href="/" className="font-script text-3xl leading-none text-gold">
              Aamna&rsquo;s Elixir
            </Link>
            <p className="mt-5 max-w-sm font-sans text-sm font-light leading-relaxed text-ivory/55">
              Where timeless elegance meets the science of beautiful skin. A
              skincare ritual designed to elevate everyday moments into something
              extraordinary.
            </p>

            <div className="mt-8 max-w-sm">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
                Newsletter
              </p>
              <NewsletterForm />
            </div>
          </div>

          {/* Shop */}
          <div className="md:col-span-2">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
              Shop
            </p>
            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/shop"
                  className="font-sans text-sm text-ivory/60 transition-colors hover:text-champagne"
                >
                  All Products
                </Link>
              </li>
              {products.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="font-sans text-sm text-ivory/60 transition-colors hover:text-champagne"
                  >
                    {p.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer service */}
          <div className="md:col-span-2">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
              Customer Service
            </p>
            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/contact"
                  className="font-sans text-sm text-ivory/60 transition-colors hover:text-champagne"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/policies/shipping-returns"
                  className="font-sans text-sm text-ivory/60 transition-colors hover:text-champagne"
                >
                  Shipping &amp; Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/policies/privacy-policy"
                  className="font-sans text-sm text-ivory/60 transition-colors hover:text-champagne"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/policies/terms"
                  className="font-sans text-sm text-ivory/60 transition-colors hover:text-champagne"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Story */}
          <div className="md:col-span-3">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
              The House
            </p>
            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/our-story"
                  className="font-sans text-sm text-ivory/60 transition-colors hover:text-champagne"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/ingredients"
                  className="font-sans text-sm text-ivory/60 transition-colors hover:text-champagne"
                >
                  Ingredients &amp; Philosophy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="font-sans text-xs text-ivory/40">
            &copy; <CopyrightYear /> Aamna&rsquo;s Elixir. All rights reserved.
          </p>
          <p className="font-sans text-xs text-ivory/40">
            Crafted with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}
