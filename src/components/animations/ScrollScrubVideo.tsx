"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Props = {
  /** Turntable video path. When absent, the fallback (children) animates instead. */
  videoSrc?: string;
  className?: string;
  children: ReactNode;
};

/**
 * The signature "product rotates as you scroll" element.
 *
 * - With `videoSrc`: the section is pinned and the video's `currentTime` is
 *   scrubbed 1:1 against scroll progress — the product turns exactly with the
 *   scroll, no independent timer.
 * - Without `videoSrc` (current state): renders `children` (crafted SVG art)
 *   with a scroll-driven parallax + gentle rotation so the moment still feels
 *   cinematic. A real turntable video drops in later with zero component change.
 *
 * Honors prefers-reduced-motion (no pinning/scrubbing; media shown statically).
 */
export function ScrollScrubVideo({ videoSrc, className = "", children }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      if (videoSrc && videoRef.current) {
        const video = videoRef.current;
        video.pause();
        ScrollTrigger.create({
          trigger: wrap,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (video.duration) video.currentTime = self.progress * video.duration;
          },
        });
      } else if (fallbackRef.current) {
        gsap.fromTo(
          fallbackRef.current,
          { autoAlpha: 0.25, yPercent: 10, rotate: -6, scale: 0.92 },
          {
            autoAlpha: 1,
            yPercent: -6,
            rotate: 6,
            scale: 1.04,
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
      }
    }, wrap);

    return () => ctx.revert();
  }, [videoSrc]);

  return (
    <div ref={wrapRef} className={className}>
      {videoSrc ? (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
          aria-hidden
        />
      ) : (
        <div ref={fallbackRef} className="relative h-full w-full">
          {children}
        </div>
      )}
    </div>
  );
}
