"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Props = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before the reveal begins. */
  delay?: number;
  /** Vertical travel distance in pixels. */
  y?: number;
};

/**
 * Fades + slides its children into view when they enter the viewport.
 * Honors prefers-reduced-motion (content stays visible, no animation).
 */
export function Reveal({ children, className = "", delay = 0, y = 28 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return; // leave content visible
    }

    const ctx = gsap.context(() => {
      gsap.set(el, { autoAlpha: 0, y });
      gsap.to(el, {
        autoAlpha: 1,
        y: 0,
        duration: 1.1,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
