import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/animations/Reveal";

export const metadata: Metadata = {
  title: "Our Story",
  description: "The story behind Aamna's Elixir.",
};

const sections = [
  {
    title: "The Inspiration",
    body: "Aamna's Elixir was born from a simple belief — that a skincare ritual should feel as beautiful as it is effective. Skincare is not a chore to rush through; it is a quiet moment of care, repeated each day.",
  },
  {
    title: "Our Philosophy",
    body: "Timeless elegance, not trend. We design each product to feel considered — in its texture, its fragrance, and the weight of it in your hand. Beauty is in the details, and the details should never be ordinary.",
  },
  {
    title: "The Ritual",
    body: "Every day holds small, overlooked moments. Washing your hands. Softening your skin. Protecting it before you step outside. We believe these moments, done with intention, are a form of self-care.",
  },
  {
    title: "Thoughtful Presentation",
    body: "From the first touch of our packaging to the last application, everything is designed to feel deliberate. A product you are proud to leave on the counter, not hide in a drawer.",
  },
];

export default function OurStoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="The House"
        title="The Story Behind Aamna's Elixir"
        description="Where timeless elegance meets the science of beautiful skin."
      />

      <section className="bg-midnight py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <div className="space-y-16">
            {sections.map((section, i) => (
              <Reveal key={section.title}>
                <div className={i % 2 === 0 ? "text-left" : "text-left sm:text-right"}>
                  <h2 className="font-serif text-3xl font-medium text-ivory sm:text-4xl">
                    {section.title}
                  </h2>
                  <div className={`gold-rule mt-5 w-24 ${i % 2 === 1 ? "sm:ml-auto" : ""}`} aria-hidden />
                  <p className="mt-6 font-sans text-base font-light leading-relaxed text-ivory/60">
                    {section.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-20 border-t border-white/5 pt-8 text-center font-sans text-xs text-ivory/35">
            Placeholder copy — to be refined with the founder&rsquo;s own story.
          </p>
        </div>
      </section>
    </>
  );
}
