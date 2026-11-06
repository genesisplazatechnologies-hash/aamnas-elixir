import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function BrandIntro() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-28 sm:py-40">
      <div className="glow-burgundy absolute left-1/2 top-0 h-[40vh] w-[80vw] -translate-x-1/2 opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <Reveal>
          <SectionHeading
            eyebrow="The House"
            title={
              <>
                Beauty, <em className="text-gold not-italic">Refined.</em>
              </>
            }
            description="Discover a skincare ritual designed to elevate everyday moments into something extraordinary."
          />
        </Reveal>
      </div>
    </section>
  );
}
