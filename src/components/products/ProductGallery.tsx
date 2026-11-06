import type { Product } from "@/lib/types";
import { Product3D } from "@/components/products/Product3D";

export function ProductGallery({ product }: { product: Product }) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden border border-white/5 bg-charcoal/40">
      <Product3D visual={product.visual} idle ariaLabel={product.name} className="h-full w-full" />
    </div>
  );
}
