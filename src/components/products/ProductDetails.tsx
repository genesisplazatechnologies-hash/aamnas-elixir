"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/products";
import { AddToCartButton } from "@/components/products/AddToCartButton";

export function ProductDetails({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div>
      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-gold/80">
        {product.category}
      </p>
      <h1 className="mt-3 font-serif text-4xl font-medium text-ivory sm:text-5xl">
        {product.name}
      </h1>
      <p className="mt-4 font-sans text-2xl tracking-wide text-champagne">
        {formatPrice(product.price)}
      </p>

      <p className="mt-6 font-sans text-base font-light leading-relaxed text-ivory/65">
        {product.description}
      </p>

      <div className="mt-6 flex items-center gap-3">
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory/50">
          Size
        </span>
        <span className="border border-white/10 px-3 py-1 font-sans text-sm text-ivory">
          {product.size}
        </span>
      </div>

      {/* Quantity + add to cart */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-stretch">
        <div className="flex items-center justify-between border border-white/15 sm:w-32">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="p-3 text-ivory/60 transition-colors hover:text-gold"
          >
            <Minus size={16} strokeWidth={1.5} />
          </button>
          <span className="font-sans text-base text-ivory">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
            className="p-3 text-ivory/60 transition-colors hover:text-gold"
          >
            <Plus size={16} strokeWidth={1.5} />
          </button>
        </div>

        <AddToCartButton
          productId={product.id}
          quantity={quantity}
          size="lg"
          className="flex-1"
        >
          Add to Cart
        </AddToCartButton>
      </div>

      {/* Product information */}
      <div className="mt-10 divide-y divide-white/5 border-t border-white/5">
        <section className="py-5">
          <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
            Product Information
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-1 font-sans text-sm font-light text-ivory/60">
            {product.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </section>

        <section className="py-5">
          <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
            Ingredients
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-1 font-sans text-sm font-light text-ivory/60">
            {product.ingredients.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </section>

        <section className="py-5">
          <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
            Directions
          </h2>
          <p className="mt-3 font-sans text-sm font-light text-ivory/60">
            {product.directions}
          </p>
        </section>

        <section className="py-5">
          <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
            Shipping
          </h2>
          <p className="mt-3 font-sans text-sm font-light text-ivory/60">
            See our{" "}
            <Link
              href="/policies/shipping-returns"
              className="text-gold underline-offset-4 hover:underline"
            >
              Shipping &amp; Returns
            </Link>{" "}
            policy for details.
          </p>
        </section>
      </div>
    </div>
  );
}
