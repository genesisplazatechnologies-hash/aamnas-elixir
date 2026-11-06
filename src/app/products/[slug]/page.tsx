import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductDetails } from "@/components/products/ProductDetails";
import { ProductCard } from "@/components/products/ProductCard";

const availabilityMap = {
  in_stock: "https://schema.org/InStock",
  out_of_stock: "https://schema.org/OutOfStock",
  preorder: "https://schema.org/PreOrder",
} as const;

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Not Found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images[0],
    brand: { "@type": "Brand", name: "Aamna's Elixir" },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: availabilityMap[product.availability],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-midnight pb-20 pt-32 sm:pt-40">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <ProductGallery product={product} />
            <ProductDetails product={product} />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-white/5 bg-charcoal py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 className="text-center font-serif text-3xl font-medium text-ivory sm:text-4xl">
              You may also love
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
