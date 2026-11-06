import { products } from "@/data/products";
import type { Product } from "@/lib/types";

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product, limit = 2): Product[] {
  return products.filter((p) => p.id !== product.id).slice(0, limit);
}

export function formatPrice(amount: number): string {
  return (
    "$" +
    amount.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })
  );
}
