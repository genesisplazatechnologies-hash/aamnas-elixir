"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { CartItem } from "@/components/cart/CartItem";
import { Button } from "@/components/ui/Button";

export default function CartPage() {
  const { lines, subtotal } = useCart();

  return (
    <section className="bg-midnight pb-24 pt-32 sm:pt-40">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <h1 className="font-serif text-4xl font-medium text-ivory sm:text-5xl">
          Your Bag
        </h1>

        {lines.length === 0 ? (
          <div className="mt-16 flex flex-col items-center gap-6 text-center">
            <ShoppingBag size={44} strokeWidth={1} className="text-gold/50" />
            <p className="font-serif text-2xl text-ivory/70">
              Your bag is empty.
            </p>
            <Button href="/shop">Continue Shopping</Button>
          </div>
        ) : (
          <>
            <div className="mt-8 border-t border-white/5">
              {lines.map((line) => (
                <CartItem
                  key={line.productId}
                  productId={line.productId}
                  quantity={line.quantity}
                />
              ))}
            </div>

            <div className="mt-10 flex flex-col items-end gap-4">
              <div className="flex w-full items-center justify-between border-b border-white/5 pb-4 sm:w-80">
                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-ivory/60">
                  Subtotal
                </span>
                <span className="font-serif text-2xl text-champagne">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <Button href="/checkout" size="lg" className="w-full sm:w-80">
                Checkout
              </Button>
              <Link
                href="/shop"
                className="font-sans text-[11px] uppercase tracking-[0.2em] text-ivory/50 transition-colors hover:text-gold"
              >
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
