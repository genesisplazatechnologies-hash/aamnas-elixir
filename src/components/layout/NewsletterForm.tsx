"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [subscribed, setSubscribed] = useState(false);

  if (subscribed) {
    return (
      <p className="mt-3 font-sans text-sm text-ivory/60">
        Thank you — newsletter signup is not yet connected (development
        placeholder).
      </p>
    );
  }

  return (
    <>
      <form
        className="mt-3 flex"
        onSubmit={(e) => {
          e.preventDefault();
          setSubscribed(true);
        }}
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder="Email address"
          className="w-full border border-white/10 bg-midnight/60 px-4 py-3 font-sans text-sm text-ivory placeholder:text-ivory/35 focus:border-gold/50 focus:outline-none"
        />
        <button
          type="submit"
          className="shrink-0 bg-gold px-5 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-midnight transition-colors hover:bg-champagne"
        >
          Join
        </button>
      </form>
      <p className="mt-2 font-sans text-[11px] text-ivory/35">
        Development placeholder — connect to your email provider before launch.
      </p>
    </>
  );
}
