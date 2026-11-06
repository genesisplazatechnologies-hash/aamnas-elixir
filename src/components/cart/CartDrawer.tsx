"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { CartItem } from "@/components/cart/CartItem";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const { isOpen, closeCart, lines, subtotal, itemCount } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeCart]);

  const goToCheckout = () => {
    closeCart();
    router.push("/checkout");
  };
  const goToShop = () => {
    closeCart();
    router.push("/shop");
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className={`fixed inset-x-0 bottom-0 z-[70] flex max-h-[88vh] flex-col border-t border-gold/15 bg-charcoal transition-transform duration-500 ease-out md:inset-x-auto md:right-0 md:top-0 md:h-full md:max-h-none md:w-[420px] md:border-l md:border-t-0 ${
          isOpen
            ? "translate-x-0 translate-y-0"
            : "translate-y-full md:translate-x-full md:translate-y-0"
        }`}
      >
        <header className="flex items-center justify-between border-b border-white/5 px-6 py-5">
          <h2 className="font-serif text-2xl text-ivory">
            Your Bag{" "}
            {itemCount > 0 && (
              <span className="text-ivory/40">({itemCount})</span>
            )}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close bag"
            className="text-ivory/60 transition-colors hover:text-gold"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
            <ShoppingBag size={40} strokeWidth={1} className="text-gold/50" />
            <p className="font-serif text-xl text-ivory/70">Your bag is empty.</p>
            <Button variant="outline" onClick={goToShop}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              {lines.map((line) => (
                <CartItem
                  key={line.productId}
                  productId={line.productId}
                  quantity={line.quantity}
                />
              ))}
            </div>

            <footer className="border-t border-white/5 px-6 py-6">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-ivory/60">
                  Subtotal
                </span>
                <span className="font-serif text-2xl text-champagne">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-1 font-sans text-xs text-ivory/40">
                Shipping calculated at checkout.
              </p>
              <Button className="mt-5 w-full" size="lg" onClick={goToCheckout}>
                Checkout
              </Button>
              <button
                type="button"
                onClick={goToShop}
                className="mt-3 w-full text-center font-sans text-[11px] uppercase tracking-[0.2em] text-ivory/50 transition-colors hover:text-gold"
              >
                Continue Shopping
              </button>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
