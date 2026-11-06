import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/animations/Reveal";

export const metadata: Metadata = {
  title: "Ingredients & Philosophy",
  description:
    "Our approach to formulation — the ingredients and skincare philosophy behind Aamna's Elixir.",
};

export default function IngredientsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Philosophy"
        title="Ingredients & Skincare Philosophy"
        description="Thoughtful formulation, considered presentation."
      />

      <section className="bg-midnight py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal>
            <h2 className="font-serif text-3xl font-medium text-ivory sm:text-4xl">
              Our Approach to Formulation
            </h2>
            <p className="mt-6 font-sans text-base font-light leading-relaxed text-ivory/60">
              Every Aamna&rsquo;s Elixir product is intended to be a pleasure to
              use — a texture that feels considered, a fragrance that feels
              refined. We believe what you apply to your skin should be chosen
              with care, and presented with the same care.
            </p>
            <p className="mt-5 font-sans text-base font-light leading-relaxed text-ivory/60">
              Detailed ingredient lists for each product will be published here
              once the final formulations are confirmed. We will always be
              transparent about what is inside every bottle and jar.
            </p>
          </Reveal>

          <div className="mt-16 border border-gold/20 bg-gold/5 px-6 py-6">
            <p className="font-sans text-sm text-champagne">
              Ingredient details are pending final specifications. Please refer to
              each product page for the ingredient list as it becomes available.
            </p>
          </div>

          <div className="mt-16 flex flex-col items-start gap-4">
            <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
              The Collection
            </h3>
            <Link
              href="/shop"
              className="font-serif text-2xl text-ivory underline-offset-4 hover:text-champagne hover:underline"
            >
              Explore all products →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
