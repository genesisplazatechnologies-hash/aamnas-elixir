"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/Button";
import { Product3D } from "@/components/products/Product3D";
import type { ProductVisual } from "@/lib/types";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Signature hero flacon — dark "elixir" glass with a gold cap.
const heroVisual: ProductVisual = {
  variant: "bottle",
  liquidFrom: "#4a3623",
  liquidTo: "#0c0a08",
  labelEyebrow: "Aamna's Elixir",
  labelName: "Elixir",
  labelSubtitle: "Signature Ritual",
};

// Deterministic particle placement (no runtime randomness → no hydration drift).
const particles = [
  { left: "8%", top: "70%", size: 3, delay: 0, duration: 9 },
  { left: "16%", top: "30%", size: 2, delay: 1.2, duration: 11 },
  { left: "24%", top: "80%", size: 2, delay: 2.4, duration: 8 },
  { left: "33%", top: "22%", size: 3, delay: 0.6, duration: 10 },
  { left: "42%", top: "74%", size: 2, delay: 3, duration: 12 },
  { left: "55%", top: "20%", size: 2, delay: 1.8, duration: 9 },
  { left: "63%", top: "82%", size: 3, delay: 0.3, duration: 10 },
  { left: "72%", top: "28%", size: 2, delay: 2.1, duration: 11 },
  { left: "81%", top: "72%", size: 2, delay: 1.5, duration: 8 },
  { left: "90%", top: "36%", size: 3, delay: 0.9, duration: 12 },
];

export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-fade]",
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.14,
          ease: "power3.out",
          delay: 0.15,
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Atmosphere */}
      <div className="absolute inset-0 bg-midnight" aria-hidden />
      <div className="glow-burgundy absolute -left-40 -top-20 h-[70vh] w-[70vw] opacity-70" aria-hidden />
      <div className="glow-burgundy absolute -bottom-24 -right-40 h-[70vh] w-[70vw] opacity-60" aria-hidden />

      {/* Particles */}
      {particles.map((p, i) => (
        <span
          key={i}
          aria-hidden
          className="float-dot"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-5 text-center">
        <div className="relative mb-8 h-44 w-32 sm:mb-10 sm:h-64 sm:w-44">
          <div className="glow-gold absolute inset-0 scale-[1.6]" aria-hidden />
          <Product3D
            visual={heroVisual}
            idle
            ariaLabel="Aamna's Elixir signature bottle"
            className="hero-float h-full w-full"
          />
        </div>

        <h1 data-hero-fade className="font-script text-6xl leading-none text-gold sm:text-7xl md:text-8xl">
          Aamna&rsquo;s Elixir
        </h1>

        <p
          data-hero-fade
          className="mt-6 font-sans text-[11px] font-semibold uppercase tracking-[0.5em] text-champagne sm:text-xs"
        >
          The Art of Skincare
        </p>

        <p
          data-hero-fade
          className="mt-5 max-w-md font-sans text-base font-light leading-relaxed text-ivory/60 sm:text-lg"
        >
          Where timeless elegance meets the science of beautiful skin.
        </p>

        <div
          data-hero-fade
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-5"
        >
          <Button href="/shop" size="lg">
            Explore the Collection
          </Button>
          <Button href="/our-story" variant="outline" size="lg">
            Discover Our Story
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        data-hero-fade
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-hidden
      >
        <div className="flex h-12 w-7 items-start justify-center rounded-full border border-gold/30 p-1.5">
          <span className="h-2.5 w-1 rounded-full bg-gold/70" />
        </div>
      </div>
    </section>
  );
}
