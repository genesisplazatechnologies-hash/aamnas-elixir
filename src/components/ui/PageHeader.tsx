import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-charcoal pb-20 pt-36 sm:pb-24 sm:pt-44">
      <div
        className="glow-burgundy absolute left-1/2 top-0 h-[40vh] w-[70vw] -translate-x-1/2 opacity-50"
        aria-hidden
      />
      <div className="relative mx-auto max-w-3xl px-5 text-center">
        {eyebrow && (
          <p className="mb-5 font-sans text-[11px] font-semibold uppercase tracking-[0.42em] text-gold">
            {eyebrow}
          </p>
        )}
        <h1 className="font-serif text-4xl font-medium text-ivory sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-6 max-w-xl font-sans text-base font-light leading-relaxed text-ivory/60">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
