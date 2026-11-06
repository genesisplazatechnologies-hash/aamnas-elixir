import { getAllProducts } from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CollectionSection() {
  const products = getAllProducts();

  return (
    <section className="relative bg-midnight py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="The Collection"
            title="Thoughtfully Presented."
            description="Beautifully experienced. Three signature rituals, crafted to elevate the everyday."
          />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.12}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
