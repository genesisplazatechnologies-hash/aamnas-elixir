import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Aamna's Elixir.",
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

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader eyebrow="Policies" title="Privacy Policy" />
      <section className="bg-midnight py-16 sm:py-24">
        <div className="mx-auto max-w-3xl space-y-12 px-5">
          <Block title="Overview">
            <p>
              This privacy policy describes how Aamna&rsquo;s Elixir collects,
              uses, and protects your information when you use this website.
            </p>
            <p>
              Placeholder — this policy should be reviewed and finalised by legal
              counsel before launch.
            </p>
          </Block>

          <Block title="Information We Collect">
            <p>
              We may collect information you provide directly — such as your name,
              email address, shipping address, and order details — as well as
              technical information collected automatically when you browse.
            </p>
          </Block>

          <Block title="How We Use Your Information">
            <p>
              Information is used to fulfil orders, respond to enquiries, improve
              the site, and, where you have consented, to send you news and
              offers.
            </p>
          </Block>

          <Block title="Third-Party Services">
            <p>
              Checkout and payment processing are handled by Shopify, which has
              its own privacy practices. We never store your payment card
              details on this website.
            </p>
          </Block>

          <Block title="Your Rights">
            <p>
              Depending on your jurisdiction, you may have the right to access,
              correct, or delete the personal information we hold about you. To
              exercise these rights, please contact us.
            </p>
          </Block>
        </div>
      </section>
    </>
  );
}
