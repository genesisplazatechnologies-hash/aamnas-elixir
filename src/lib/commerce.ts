import type { CartLine } from "@/lib/types";
import { createCheckoutUrl, isShopifyConfigured } from "@/lib/shopify";
import { getProductById } from "@/lib/products";

/**
 * Commerce dispatcher. Everything downstream (cart UI, checkout page) calls
 * into here rather than Shopify directly, so mock vs. live is a single flag.
 */
export function isMockMode(): boolean {
  return process.env.NEXT_PUBLIC_COMMERCE_MODE !== "shopify";
}

/**
 * Resolve the checkout destination for a cart.
 *  - mock mode (default): returns null → checkout page shows a demo notice.
 *  - shopify mode: builds a hosted checkout URL from variant IDs.
 *
 * In mock mode no payment is ever processed. In shopify mode this site never
 * sees or stores card details — Shopify hosts the checkout.
 */
export async function getCheckoutUrl(lines: CartLine[]): Promise<string | null> {
  if (isMockMode()) return null;
  if (!isShopifyConfigured()) return null;

  // NOTE: local data carries `shopifyHandle`, not variant Global IDs. A live
  // integration would look up variant IDs server-side before this step.
  const variantIds = lines
    .map((l) => getProductById(l.productId)?.shopifyHandle)
    .filter((h): h is string => Boolean(h));
  if (!variantIds.length) return null;

  return createCheckoutUrl(variantIds);
}
