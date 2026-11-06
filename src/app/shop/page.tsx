import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Explore the Aamna's Elixir collection — SPF, moisturizer, and liquid hand soap.",
};

export default function ShopPage() {
  const products = getAllProducts();

  return (
    <>
      <PageHeader
        eyebrow="The Collection"
        title="Shop All"
        description="Thoughtfully presented. Beautifully experienced."
      />
      <section className="bg-midnight py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
