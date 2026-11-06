import { getProductById } from "@/lib/products";
import type { CartLine } from "@/lib/types";

/**
 * Mock storefront. Used while NEXT_PUBLIC_COMMERCE_MODE !== "shopify".
 * Mirrors the *shape* of what a Shopify integration returns so the checkout
 * page can stay commerce-agnostic — but never processes a real payment.
 */
export type MockOrder = {
  number: string;
  total: number;
  items: { name: string; quantity: number; lineTotal: number }[];
};

export function createMockOrder(lines: CartLine[]): MockOrder {
  const items = lines.map((l) => {
    const product = getProductById(l.productId);
    return {
      name: product?.name ?? "Unknown item",
      quantity: l.quantity,
      lineTotal: (product?.price ?? 0) * l.quantity,
    };
  });
  const total = items.reduce((sum, i) => sum + i.lineTotal, 0);
  const number = "AE-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  return { number, total, items };
}
