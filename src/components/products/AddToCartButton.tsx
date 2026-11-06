"use client";

import type { ReactNode } from "react";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/Button";

export function AddToCartButton({
  productId,
  quantity = 1,
  variant = "primary",
  size = "md",
  className = "",
  children = "Add to Cart",
}: {
  productId: string;
  quantity?: number;
  variant?: "primary" | "outline" | "ghost";
  size?: "md" | "lg";
  className?: string;
  children?: ReactNode;
}) {
  const { addItem } = useCart();
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={() => addItem(productId, quantity)}
    >
      {children}
    </Button>
  );
}
