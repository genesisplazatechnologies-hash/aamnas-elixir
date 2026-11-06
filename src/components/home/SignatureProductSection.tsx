import type { Product } from "@/lib/types";
import { Product3D } from "@/components/products/Product3D";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";

const themeBg: Record<Product["signature"]["theme"], string> = {
  burgundy: "section-bg-burgundy",
  champagne: "section-bg-champagne",
  crimson: "section-bg-crimson",
};

export function SignatureProductSection({
  product,
  flip = false,
}: {
  product: Product;
  flip?: boolean;
}) {
  const { signature } = product;

  return (
    <section className={`relative overflow-hidden ${themeBg[signature.theme]}`}>
      {signature.theme === "champagne" && (
        <div className="glow-gold absolute left-1/2 top-1/2 h-[70vh] w-[70vw] -translate-x-1/2 -translate-y-1/2" aria-hidden />
      )}

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-10 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:gap-16">
        {/* Media */}
        <div
          className={`relative mx-auto h-80 w-56 sm:h-[26rem] sm:w-72 lg:h-[34rem] lg:w-80 ${
            flip ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <Product3D visual={product.visual} spin ariaLabel={product.name} className="h-full w-full" />
        </div>

        {/* Text */}
        <div className={`text-center lg:text-left ${flip ? "lg:order-2" : "lg:order-1"}`}>
          <Reveal>
            <p className="mb-6 inline-flex items-center gap-4">
              <span className="gold-rule w-10" aria-hidden />
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.42em] text-gold">
                {signature.eyebrow}
              </span>
            </p>

            <h2 className="font-serif text-4xl font-medium leading-[1.08] text-ivory sm:text-5xl md:text-6xl">
              {signature.heading}
            </h2>

            <p className="mt-6 max-w-md font-sans text-base font-light leading-relaxed text-ivory/60 lg:mx-0 mx-auto">
              {signature.description}
            </p>

            <div className="mt-10">
              <Button href={`/products/${product.slug}`} variant="outline" size="lg">
                {signature.cta}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
