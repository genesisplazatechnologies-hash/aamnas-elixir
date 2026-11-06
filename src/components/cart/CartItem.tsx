"use client";

import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { getProductById, formatPrice } from "@/lib/products";
import { Product3D } from "@/components/products/Product3D";

export function CartItem({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) {
  const { setQuantity, removeItem } = useCart();
  const product = getProductById(productId);
  if (!product) return null;

  return (
    <div className="flex gap-4 border-b border-white/5 py-5">
      <div className="relative h-24 w-16 shrink-0">
        <Product3D visual={product.visual} ariaLabel={product.name} className="h-full w-full" />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-serif text-lg leading-tight text-ivory">
              {product.name}
            </h3>
            <p className="mt-1 font-sans text-xs text-ivory/50">{product.size}</p>
          </div>
          <button
            type="button"
            onClick={() => removeItem(productId)}
            aria-label={`Remove ${product.name}`}
            className="text-ivory/40 transition-colors hover:text-crimson"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center border border-white/10">
            <button
              type="button"
              onClick={() => setQuantity(productId, quantity - 1)}
              aria-label="Decrease quantity"
              className="p-2 text-ivory/60 transition-colors hover:text-gold"
            >
              <Minus size={14} strokeWidth={1.5} />
            </button>
            <span className="w-8 text-center font-sans text-sm text-ivory">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(productId, quantity + 1)}
              aria-label="Increase quantity"
              className="p-2 text-ivory/60 transition-colors hover:text-gold"
            >
              <Plus size={14} strokeWidth={1.5} />
            </button>
          </div>
          <p className="font-sans text-sm text-champagne">
            {formatPrice(product.price * quantity)}
          </p>
        </div>
      </div>
    </div>
  );
}
