"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

const inputClass =
  "w-full border border-white/10 bg-midnight/60 px-4 py-3 font-sans text-sm text-ivory placeholder:text-ivory/35 focus:border-gold/50 focus:outline-none";
const labelClass =
  "mb-2 block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory/50";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="border border-gold/30 bg-gold/5 px-6 py-8 text-center">
        <p className="font-serif text-2xl text-ivory">Thank you</p>
        <p className="mt-3 font-sans text-sm text-ivory/60">
          This form is a development placeholder — your message was not sent.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="grid grid-cols-1 gap-5 sm:grid-cols-2"
    >
      <div>
        <label htmlFor="contact-name" className={labelClass}>
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          required
          autoComplete="name"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="contact-email" className={labelClass}>
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="contact-subject" className={labelClass}>
          Subject
        </label>
        <input id="contact-subject" name="subject" className={inputClass} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          className={`${inputClass} resize-none`}
        />
      </div>
      <div className="sm:col-span-2">
        <Button type="submit">Send Message</Button>
      </div>
      <p className="sm:col-span-2 font-sans text-xs text-ivory/35">
        Development placeholder — connect this form to your email or messaging
        service before launch.
      </p>
    </form>
  );
}
