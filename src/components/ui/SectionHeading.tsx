import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}: Props) {
  const centered = align === "center";

  return (
    <div className={`${centered ? "mx-auto text-center" : "text-left"} ${className}`}>
      {eyebrow && (
        <div
          className={`mb-6 flex items-center gap-4 ${centered ? "justify-center" : "justify-start"}`}
        >
          <span className="gold-rule w-10" aria-hidden />
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.42em] text-gold">
            {eyebrow}
          </span>
          <span className="gold-rule w-10" aria-hidden />
        </div>
      )}

      <h2 className="font-serif text-4xl font-medium leading-[1.1] text-ivory sm:text-5xl md:text-6xl">
        {title}
      </h2>

      {description && (
        <p
          className={`mt-6 max-w-xl font-sans text-base font-light leading-relaxed text-ivory/60 ${
            centered ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
