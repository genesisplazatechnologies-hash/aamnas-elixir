/**
 * Shopify Storefront API client.
 *
 * This is intentionally dormant while NEXT_PUBLIC_COMMERCE_MODE !== "shopify"
 * (the default, mock, mode). It is a correct, minimal scaffold so a real
 * store can be wired in by setting the env vars below and completing the
 * product mapping (local data uses `shopifyHandle`; a live integration would
 * fetch variant IDs from the Storefront `Product` nodes).
 *
 * Secrets are read from server-side env vars only and never exposed to the
 * browser.
 */

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const API_VERSION = process.env.SHOPIFY_API_VERSION ?? "2024-10";

export function isShopifyConfigured(): boolean {
  return Boolean(DOMAIN && TOKEN);
}

type StorefrontError = { message: string };

async function storefront<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  if (!isShopifyConfigured()) {
    throw new Error("Shopify Storefront API is not configured");
  }
  const res = await fetch(`https://${DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN as string,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });
  const json = (await res.json()) as {
    data?: T;
    errors?: StorefrontError[];
  };
  if (json.errors?.length) throw new Error(json.errors[0].message);
  return json.data as T;
}

/**
 * Create a hosted checkout from Shopify variant Global IDs and return its
 * `checkoutUrl`. Callers (see lib/commerce.ts) redirect the buyer here so
 * payment, shipping collection, order confirmation and inventory are handled
 * entirely by Shopify — never by this site.
 */
export async function createCheckoutUrl(variantIds: string[]): Promise<string> {
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const variables = {
    input: {
      lines: variantIds.map((merchandiseId) => ({ merchandiseId, quantity: 1 })),
    },
  };

  const data = await storefront<{
    cartCreate: {
      cart?: { checkoutUrl: string };
      userErrors: { field: string; message: string }[];
    };
  }>(query, variables);

  const { cart, userErrors } = data.cartCreate;
  if (userErrors.length) throw new Error(userErrors[0].message);
  if (!cart?.checkoutUrl) throw new Error("Unable to create a checkout");
  return cart.checkoutUrl;
}
