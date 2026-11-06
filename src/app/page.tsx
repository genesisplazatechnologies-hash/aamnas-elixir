import { HeroSection } from "@/components/hero/HeroSection";
import { BrandIntro } from "@/components/home/BrandIntro";
import { SignatureProductSection } from "@/components/home/SignatureProductSection";
import { CollectionSection } from "@/components/home/CollectionSection";
import { getAllProducts } from "@/lib/products";

export default function Home() {
  const products = getAllProducts();

  return (
    <>
      <HeroSection />
      <BrandIntro />
      {products.map((product, i) => (
        <SignatureProductSection
          key={product.id}
          product={product}
          flip={i % 2 === 1}
        />
      ))}
      <CollectionSection />
    </>
  );
}
