"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatPrice, getProductById } from "@/lib/products";
import { createMockOrder, type MockOrder } from "@/lib/mock-commerce";
import { getCheckoutUrl, isMockMode } from "@/lib/commerce";
import { Button } from "@/components/ui/Button";

const inputClass =
  "w-full border border-white/10 bg-midnight/60 px-4 py-3 font-sans text-sm text-ivory placeholder:text-ivory/35 focus:border-gold/50 focus:outline-none";
const labelClass =
  "mb-2 block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory/50";

export default function CheckoutPage() {
  const { lines, subtotal, clear } = useCart();
  const [order, setOrder] = useState<MockOrder | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const mock = isMockMode();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (mock) {
      setOrder(createMockOrder(lines));
      clear();
      return;
    }
    setSubmitting(true);
    const url = await getCheckoutUrl(lines);
    if (url) {
      window.location.assign(url);
    } else {
      setSubmitting(false);
    }
  }

  // Demo order confirmation (mock mode)
  if (order) {
    return (
      <section className="bg-midnight pb-24 pt-32 sm:pt-40">
        <div className="mx-auto max-w-xl px-5 text-center">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.4em] text-gold">
            Order {order.number}
          </p>
          <h1 className="mt-4 font-serif text-4xl font-medium text-ivory sm:text-5xl">
            Thank you
          </h1>

          <div className="mt-8 border border-gold/30 bg-gold/5 px-6 py-5">
            <p className="font-sans text-sm leading-relaxed text-champagne">
              This is a development demonstration — no payment was processed and
              no order was placed.
            </p>
          </div>

          <div className="mt-8 divide-y divide-white/5 border-t border-white/5 text-left">
            {order.items.map((item) => (
              <div key={item.name} className="flex justify-between py-4">
                <span className="font-sans text-sm text-ivory/70">
                  {item.name}{" "}
                  <span className="text-ivory/40">× {item.quantity}</span>
                </span>
                <span className="font-sans text-sm text-ivory">
                  {formatPrice(item.lineTotal)}
                </span>
              </div>
            ))}
            <div className="flex justify-between py-4">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-ivory/60">
                Total
              </span>
              <span className="font-serif text-2xl text-champagne">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>

          <Button href="/shop" className="mt-10">
            Continue Shopping
          </Button>
        </div>
      </section>
    );
  }

  // Empty cart
  if (lines.length === 0) {
    return (
      <section className="bg-midnight pb-24 pt-32 sm:pt-40">
        <div className="mx-auto max-w-xl px-5 text-center">
          <h1 className="font-serif text-4xl font-medium text-ivory sm:text-5xl">
            Checkout
          </h1>
          <p className="mt-6 font-sans text-base font-light text-ivory/60">
            Your bag is empty.
          </p>
          <Button href="/shop" className="mt-8">
            Continue Shopping
          </Button>
        </div>
      </section>
    );
  }

  // Checkout form
  return (
    <section className="bg-midnight pb-24 pt-32 sm:pt-40">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h1 className="font-serif text-4xl font-medium text-ivory sm:text-5xl">
          Checkout
        </h1>

        {mock && (
          <div className="mt-6 border border-gold/30 bg-gold/5 px-5 py-4">
            <p className="font-sans text-sm text-champagne">
              Development demonstration — this form does not process a payment or
              place an order.
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-3"
        >
          {/* Fields */}
          <div className="lg:col-span-2">
            <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
              Contact
            </h2>
            <div className="mt-4">
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={inputClass}
                placeholder="you@example.com"
              />
            </div>

            <h2 className="mt-10 font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
              Shipping Address
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="first-name" className={labelClass}>
                  First Name
                </label>
                <input
                  id="first-name"
                  name="firstName"
                  required
                  autoComplete="given-name"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="last-name" className={labelClass}>
                  Last Name
                </label>
                <input
                  id="last-name"
                  name="lastName"
                  required
                  autoComplete="family-name"
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="address" className={labelClass}>
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  required
                  autoComplete="street-address"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="city" className={labelClass}>
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  required
                  autoComplete="address-level2"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="postal" className={labelClass}>
                  Postal Code
                </label>
                <input
                  id="postal"
                  name="postalCode"
                  required
                  autoComplete="postal-code"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Summary */}
          <aside className="h-fit border border-white/10 bg-charcoal/60 p-6">
            <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
              Order Summary
            </h2>
            <div className="mt-5 divide-y divide-white/5">
              {lines.map((line) => {
                const product = getProductById(line.productId);
                return (
                  <div
                    key={line.productId}
                    className="flex justify-between py-3"
                  >
                    <span className="font-sans text-sm text-ivory/70">
                      {product?.name ?? "Item"}{" "}
                      <span className="text-ivory/40">× {line.quantity}</span>
                    </span>
                    <span className="font-sans text-sm text-ivory">
                      {formatPrice((product?.price ?? 0) * line.quantity)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-5">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-ivory/60">
                Subtotal
              </span>
              <span className="font-serif text-2xl text-champagne">
                {formatPrice(subtotal)}
              </span>
            </div>

            <Button
              type="submit"
              size="lg"
              className="mt-6 w-full"
              disabled={submitting}
            >
              {submitting ? "Redirecting…" : mock ? "Place Demo Order" : "Place Order"}
            </Button>

            <p className="mt-4 text-center font-sans text-xs text-ivory/40">
              By continuing you agree to our{" "}
              <Link
                href="/policies/terms"
                className="text-gold underline-offset-4 hover:underline"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/policies/privacy-policy"
                className="text-gold underline-offset-4 hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </aside>
        </form>
      </div>
    </section>
  );
}
