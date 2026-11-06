import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Shipping and returns policy for Aamna's Elixir.",
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

export default function ShippingReturnsPage() {
  return (
    <>
      <PageHeader eyebrow="Policies" title="Shipping & Returns" />
      <section className="bg-midnight py-16 sm:py-24">
        <div className="mx-auto max-w-3xl space-y-12 px-5">
          <Block title="Shipping">
            <p>
              Shipping options and delivery times will be confirmed at checkout
              once the store is live.
            </p>
            <p>
              Placeholder — final shipping rates, carriers, and delivery
              timelines to be supplied before launch.
            </p>
          </Block>

          <Block title="Processing Times">
            <p>
              Orders are processed promptly after they are placed. Processing and
              delivery estimates will be published here before launch.
            </p>
          </Block>

          <Block title="Returns & Exchanges">
            <p>
              Our returns and exchange policy will be published here before
              launch. If you have a question about an order, please contact us.
            </p>
          </Block>

          <Block title="Damaged Items">
            <p>
              If an item arrives damaged, please contact us with your order
              details and we will help resolve it.
            </p>
          </Block>
        </div>
      </section>
    </>
  );
}
