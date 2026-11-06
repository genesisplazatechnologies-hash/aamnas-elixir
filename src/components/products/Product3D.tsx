"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ProductVisual } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* ------------------------------------------------------------------ */
/*  Color helpers                                                     */
/* ------------------------------------------------------------------ */

function hexToRgb(hex: string) {
  const s = hex.replace("#", "");
  const v = s.length === 3 ? s.split("").map((c) => c + c).join("") : s;
  const n = parseInt(v, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

/** Blend a hex color toward black (f<1) or white (f>1). */
function shade(hex: string, f: number) {
  const { r, g, b } = hexToRgb(hex);
  const t = Math.max(0.08, Math.min(1.18, f));
  const mix = (v: number) =>
    t <= 1 ? Math.round(v * t) : Math.round(v + (255 - v) * ((t - 1) / 0.18));
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

/**
 * Symmetric cylindrical gloss. Peaks at the front AND back (so a round bottle
 * looks lit the same way from every angle) and falls off at the flanks.
 */
function gloss(angle: number) {
  const c = Math.cos(angle);
  const base = 0.42 + 0.30 * Math.cos(2 * angle);
  const spec =
    0.36 * Math.exp(-Math.pow((c - 1) / 0.24, 2)) +
    0.36 * Math.exp(-Math.pow((c + 1) / 0.24, 2));
  return Math.max(0, Math.min(1.18, base + spec));
}

const GOLD_TOP = "#eccf8a";
const GOLD_BOTTOM = "#7a5e33";
const GOLD_RADIAL =
  "radial-gradient(ellipse at 36% 30%, #fff4d6 0%, #c9a45c 46%, #7a5e33 100%)";

/* ------------------------------------------------------------------ */
/*  3D primitives                                                     */
/* ------------------------------------------------------------------ */

type CylinderProps = {
  r: number;
  h: number;
  y?: number;
  z?: number;
  segments?: number;
  /** Return the inline style for a side face, or null to skip that face. */
  faceStyle?: (angle: number) => CSSProperties | null;
  topColor?: string;
  bottomColor?: string;
};

function Cylinder({
  r,
  h,
  y = 0,
  z = 0,
  segments = 44,
  faceStyle,
  topColor = "#0a0506",
  bottomColor = "#0a0506",
}: CylinderProps) {
  const faceWidth = 2 * r * Math.tan(Math.PI / segments) * 1.04; // slight overlap → no seams
  const faces: ReactNode[] = [];

  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const style = faceStyle ? faceStyle(angle) : null;
    if (!style) continue;
    faces.push(
      <div
        key={i}
        style={{
          position: "absolute",
          width: faceWidth,
          height: h,
          left: -faceWidth / 2,
          top: -h / 2,
          transform: `rotateY(${(i / segments) * 360}deg) translateZ(${r}px)`,
          backfaceVisibility: "hidden",
          ...style,
        }}
      />,
    );
  }

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        transformStyle: "preserve-3d",
        transform: `translateY(${y}px) translateZ(${z}px)`,
      }}
    >
      {faces}
      <div
        style={{
          position: "absolute",
          width: 2 * r,
          height: 2 * r,
          left: -r,
          top: -r,
          transform: `rotateX(90deg) translateZ(${h / 2}px)`,
          borderRadius: "50%",
          background: topColor,
          backfaceVisibility: "hidden",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 2 * r,
          height: 2 * r,
          left: -r,
          top: -r,
          transform: `rotateX(-90deg) translateZ(${h / 2}px)`,
          borderRadius: "50%",
          background: bottomColor,
          backfaceVisibility: "hidden",
        }}
      />
    </div>
  );
}

/** A flat, centred panel that rotates with the rotor (label text / monogram). */
function Panel({
  w,
  h,
  transform,
  children,
}: {
  w: number;
  h: number;
  transform: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        position: "absolute",
        width: w,
        height: h,
        left: -w / 2,
        top: -h / 2,
        transform,
        backfaceVisibility: "hidden",
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Label artwork (transparent — sits over the ivory band)            */
/* ------------------------------------------------------------------ */

function FrontLabel({ v }: { v: ProductVisual }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-center">
      <span
        className="font-sans"
        style={{ fontSize: 8, letterSpacing: "0.28em", textTransform: "uppercase", color: "#8a6d3b" }}
      >
        {v.labelEyebrow}
      </span>
      <span
        className="font-script"
        style={{ fontSize: 26, lineHeight: 1.05, color: "#7d101c", marginTop: 5 }}
      >
        {v.labelName}
      </span>
      <span
        className="font-sans"
        style={{ fontSize: 7, letterSpacing: "0.24em", textTransform: "uppercase", color: "#6b4f1f", marginTop: 5 }}
      >
        {v.labelSubtitle}
      </span>
    </div>
  );
}

function BackLabel({ v }: { v: ProductVisual }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-center">
      <span className="font-script" style={{ fontSize: 24, lineHeight: 1, color: "rgba(230,210,163,0.5)" }}>
        A
      </span>
      <span
        className="font-sans"
        style={{ fontSize: 6, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(230,210,163,0.45)", marginTop: 4 }}
      >
        {v.labelEyebrow}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Geometry presets                                                  */
/* ------------------------------------------------------------------ */

type Geo = {
  sceneW: number;
  sceneH: number;
  body: { r: number; h: number };
  cap?: { r: number; h: number };
  collar?: { r: number; h: number };
  lid?: { r: number; h: number };
  pump?: { r: number; h: number };
  spout?: { r: number; len: number; y: number; z: number };
};

const GEO: Record<ProductVisual["variant"], Geo> = {
  bottle: {
    sceneW: 150,
    sceneH: 340,
    body: { r: 62, h: 240 },
    cap: { r: 32, h: 42 },
  },
  jar: {
    sceneW: 240,
    sceneH: 260,
    body: { r: 96, h: 150 },
    lid: { r: 106, h: 48 },
  },
  pump: {
    sceneW: 160,
    sceneH: 320,
    body: { r: 62, h: 210 },
    collar: { r: 64, h: 12 },
    pump: { r: 26, h: 34 },
    spout: { r: 5, len: 44, y: -128, z: 48 },
  },
};

// Label band: how far around the bottle it wraps (radians, from the front).
const LABEL_HALF_SPAN = (100 * Math.PI) / 180;

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function Product3D({
  visual,
  spin = false,
  idle = false,
  className = "",
  ariaLabel,
}: {
  visual: ProductVisual;
  /** Scrub the rotation directly against scroll (signature sections). */
  spin?: boolean;
  /** Slow continuous rotation (gallery / hero). */
  idle?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  const geo = GEO[visual.variant];
  const rootRef = useRef<HTMLDivElement>(null);
  const rotorRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Fit the fixed-size scene to its container, without shifting layout.
  useIsomorphicLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      setScale(Math.min(width / geo.sceneW, height / geo.sceneH));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [geo]);

  // Motion: scroll-scrub spin (viewport-scoped, no pin), or gentle idle rotation.
  useIsomorphicLayoutEffect(() => {
    if (!spin && !idle) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = rootRef.current;
    const rotor = rotorRef.current;
    if (!root || !rotor) return;

    const ctx = gsap.context(() => {
      if (spin) {
        gsap.fromTo(
          rotor,
          { rotationY: -24 },
          {
            rotationY: 696, // two full turns across the scroll
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        );
      } else if (idle) {
        gsap.fromTo(
          rotor,
          { rotationY: -24 },
          { rotationY: 336, duration: 16, ease: "none", repeat: -1 },
        );
      }
    }, root);

    return () => ctx.revert();
  }, [spin, idle]);

  const { body } = geo;
  const bodyY = 0;
  const capY = geo.cap ? -(body.h / 2) - geo.cap.h / 2 : undefined;
  const collarY = geo.collar ? -(body.h / 2) - geo.collar.h / 2 : undefined;
  const pumpY = geo.pump && geo.collar ? collarY! - geo.collar.h / 2 - geo.pump.h / 2 : undefined;
  const lidY = geo.lid ? -(body.h / 2) - geo.lid.h / 2 : undefined;

  const labelH = Math.round(body.h * 0.52);
  const labelR = body.r + 0.5;

  const liquidFace = (angle: number): CSSProperties => {
    const f = gloss(angle);
    return {
      background: `linear-gradient(180deg, ${shade(visual.liquidFrom, f)} 0%, ${shade(visual.liquidTo, f)} 100%)`,
    };
  };

  const goldFace = (angle: number): CSSProperties => {
    const f = gloss(angle);
    return {
      background: `linear-gradient(180deg, ${shade(GOLD_TOP, f)} 0%, ${shade(GOLD_BOTTOM, f)} 100%)`,
    };
  };

  const bandFace = (angle: number): CSSProperties | null => {
    if (Math.cos(angle) < Math.cos(LABEL_HALF_SPAN)) return null; // only the front ~200°
    const f = gloss(angle);
    return {
      background: `linear-gradient(180deg, ${shade("#f5efe5", f)} 0%, ${shade("#e6d2a3", f)} 100%)`,
      borderTop: "3px solid #c9a45c",
      borderBottom: "3px solid #c9a45c",
    };
  };

  const liquidTop = `radial-gradient(ellipse at 40% 38%, ${shade(visual.liquidFrom, 1.06)} 0%, ${shade(visual.liquidTo, 0.72)} 100%)`;

  return (
    <div
      ref={rootRef}
      className={`relative ${className}`}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
    >
      {/* Ambient glow behind the product */}
      <div className="glow-burgundy absolute inset-0 scale-[1.4]" aria-hidden />

      {/* Ground shadow */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 rounded-[50%]"
        style={{
          bottom: "7%",
          width: body.r * 2.4 * scale,
          height: body.r * 0.7 * scale,
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0.62) 0%, transparent 68%)",
          filter: "blur(2px)",
        }}
      />

      {/* Scaled 3D scene */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          style={{
            width: geo.sceneW,
            height: geo.sceneH,
            transform: `perspective(1400px) scale(${scale})`,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              transformStyle: "preserve-3d",
              transform: "rotateX(-13deg)",
            }}
          >
            <div
              ref={rotorRef}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 0,
                height: 0,
                transformStyle: "preserve-3d",
                transform: "rotateY(-24deg)",
              }}
            >
              {/* Body */}
              <Cylinder
                r={body.r}
                h={body.h}
                y={bodyY}
                faceStyle={liquidFace}
                topColor={liquidTop}
                bottomColor={shade(visual.liquidTo, 0.4)}
              />

              {/* Label band */}
              <Cylinder r={labelR} h={labelH} y={bodyY} faceStyle={bandFace} topColor="transparent" bottomColor="transparent" />

              {/* Front label text (sits flush over the band) */}
              <Panel w={body.r * 1.05} h={labelH - 8} transform={`translateZ(${labelR + 0.6}px)`}>
                <FrontLabel v={visual} />
              </Panel>

              {/* Back monogram */}
              <Panel w={body.r * 0.9} h={labelH * 0.6} transform={`rotateY(180deg) translateZ(${labelR + 0.6}px)`}>
                <BackLabel v={visual} />
              </Panel>

              {/* Collar (pump) */}
              {geo.collar && (
                <Cylinder
                  r={geo.collar.r}
                  h={geo.collar.h}
                  y={collarY}
                  segments={28}
                  faceStyle={goldFace}
                  topColor={GOLD_RADIAL}
                  bottomColor={shade(GOLD_BOTTOM, 0.6)}
                />
              )}

              {/* Cap (bottle) */}
              {geo.cap && (
                <Cylinder
                  r={geo.cap.r}
                  h={geo.cap.h}
                  y={capY}
                  segments={28}
                  faceStyle={goldFace}
                  topColor={GOLD_RADIAL}
                  bottomColor={shade(GOLD_BOTTOM, 0.6)}
                />
              )}

              {/* Lid (jar) */}
              {geo.lid && (
                <Cylinder
                  r={geo.lid.r}
                  h={geo.lid.h}
                  y={lidY}
                  segments={36}
                  faceStyle={goldFace}
                  topColor={GOLD_RADIAL}
                  bottomColor={shade(GOLD_BOTTOM, 0.6)}
                />
              )}

              {/* Pump head + spout */}
              {geo.pump && (
                <Cylinder
                  r={geo.pump.r}
                  h={geo.pump.h}
                  y={pumpY}
                  segments={28}
                  faceStyle={goldFace}
                  topColor={GOLD_RADIAL}
                  bottomColor={shade(GOLD_BOTTOM, 0.6)}
                />
              )}
              {geo.spout && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    transformStyle: "preserve-3d",
                    transform: `translateY(${geo.spout.y}px) translateZ(${geo.spout.z}px)`,
                  }}
                >
                  <div style={{ transformStyle: "preserve-3d", transform: "rotateX(90deg)" }}>
                    <Cylinder
                      r={geo.spout.r}
                      h={geo.spout.len}
                      segments={20}
                      faceStyle={goldFace}
                      topColor={GOLD_RADIAL}
                      bottomColor={shade(GOLD_BOTTOM, 0.6)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
