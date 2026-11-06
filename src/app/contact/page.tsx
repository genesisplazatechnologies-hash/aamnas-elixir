import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Aamna's Elixir.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in Touch"
        description="We would love to hear from you."
      />

      <section className="bg-midnight py-16 sm:py-24">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
              Contact Details
            </h2>
            <p className="mt-5 font-sans text-base font-light leading-relaxed text-ivory/60">
              Contact details will be published here before launch.
            </p>
            <dl className="mt-8 space-y-4 font-sans text-sm text-ivory/60">
              <div>
                <dt className="text-ivory/40">Email</dt>
                <dd className="text-ivory/70">[to be supplied]</dd>
              </div>
              <div>
                <dt className="text-ivory/40">Hours</dt>
                <dd className="text-ivory/70">[to be supplied]</dd>
              </div>
            </dl>
            <p className="mt-8 font-sans text-xs text-ivory/35">
              Placeholder — real contact details will replace the fields above.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
