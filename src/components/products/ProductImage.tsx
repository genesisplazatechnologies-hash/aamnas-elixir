import Image from "next/image";

/**
 * Responsive product image. Expects a `relative` parent with a defined size;
 * renders the asset `fill` + `object-contain`. SVGs (the current placeholder
 * art) are served unoptimized since the Next image optimizer does not process
 * vector files.
 */
export function ProductImage({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const isSvg = src.toLowerCase().endsWith(".svg");
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 60vw, 40vw"
      className={`object-contain ${className}`}
      unoptimized={isSvg}
      priority={priority}
    />
  );
}
