import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for Aamna's Elixir.",
};

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-serif text-2xl font-medium text-ivory">{title}</h2>
      <div className="mt-4 space-y-4 font-sans text-sm font-light leading-relaxed text-ivory/60">
        {children}
      </div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Policies" title="Terms & Conditions" />
      <section className="bg-midnight py-16 sm:py-24">
        <div className="mx-auto max-w-3xl space-y-12 px-5">
          <Block title="Overview">
            <p>
              These terms govern your use of the Aamna&rsquo;s Elixir website and
              any purchase you make through it. By using the site, you agree to
              these terms.
            </p>
            <p>
              Placeholder — these terms should be reviewed and finalised by legal
              counsel before launch.
            </p>
          </Block>

          <Block title="Use of the Site">
            <p>
              You agree to use this site only for lawful purposes and in a manner
              that does not infringe the rights of others or restrict their use
              of the site.
            </p>
          </Block>

          <Block title="Products & Orders">
            <p>
              Product descriptions and pricing are provided for your information
              and may change without notice. We reserve the right to refuse or
              cancel an order for any reason.
            </p>
          </Block>

          <Block title="Intellectual Property">
            <p>
              All content on this site, including text, graphics, and branding, is
              the property of Aamna&rsquo;s Elixir and may not be reproduced
              without permission.
            </p>
          </Block>

          <Block title="Limitation of Liability">
            <p>
              To the fullest extent permitted by law, Aamna&rsquo;s Elixir shall
              not be liable for any indirect or consequential loss arising from
              your use of the site or its products.
            </p>
          </Block>
        </div>
      </section>
    </>
  );
}
