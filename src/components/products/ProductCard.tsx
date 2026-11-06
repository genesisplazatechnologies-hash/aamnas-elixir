import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/products";
import { Product3D } from "@/components/products/Product3D";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { Button } from "@/components/ui/Button";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative flex flex-col overflow-hidden border border-white/5 bg-charcoal/50 transition-all duration-500 hover:border-gold/40">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden bg-midnight/40"
      >
        <div className="absolute inset-0 p-6 transition-transform duration-700 ease-out group-hover:scale-110">
          <Product3D visual={product.visual} ariaLabel={product.name} className="h-full w-full" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </Link>

      <div className="flex flex-1 flex-col items-center gap-2 px-6 pb-7 pt-6 text-center">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-gold/80">
          {product.category}
        </p>
        <h3 className="font-serif text-2xl font-medium text-ivory">
          {product.name}
        </h3>
        <p className="mt-1 font-sans text-sm font-light leading-relaxed text-ivory/55">
          {product.description}
        </p>
        <p className="mt-3 font-sans text-lg tracking-wide text-champagne">
          {formatPrice(product.price)}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href={`/products/${product.slug}`} variant="outline" className="w-full sm:w-auto">
            View Details
          </Button>
          <AddToCartButton productId={product.id} className="w-full sm:w-auto">
            Add to Cart
          </AddToCartButton>
        </div>
      </div>
    </article>
  );
}
