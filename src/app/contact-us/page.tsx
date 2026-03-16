"use client";

import { useState } from "react";
import SiteShell from "@/components/SiteShell";

export default function ContactUsPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <SiteShell>
      <section className="mx-auto max-w-2xl space-y-6">
        <div>
          <p className="chip">Get in touch</p>
          <h1 className="section-title font-display">Contact Us</h1>
          <p className="mt-3 text-[color:var(--ink-soft)]">
            This is a dummy contact form for demo purposes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-semibold">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              className="mt-2 w-full rounded-xl border border-[color:var(--line)] bg-transparent px-4 py-3 outline-none focus:border-[color:var(--ink)]"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-2 w-full rounded-xl border border-[color:var(--line)] bg-transparent px-4 py-3 outline-none focus:border-[color:var(--ink)]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="text-sm font-semibold">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="mt-2 w-full rounded-xl border border-[color:var(--line)] bg-transparent px-4 py-3 outline-none focus:border-[color:var(--ink)]"
              placeholder="Write your message"
            />
          </div>

          <button type="submit" className="btn">
            Send Message
          </button>

          {submitted ? (
            <p className="text-sm text-[color:var(--ink-soft)]">
              Dummy form submitted successfully.
            </p>
          ) : null}
        </form>
      </section>
    </SiteShell>
  );
}
