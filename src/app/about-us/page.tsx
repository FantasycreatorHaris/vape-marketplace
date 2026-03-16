import SiteShell from "@/components/SiteShell";

export default function AboutUsPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-3xl space-y-6">
        <div>
          <p className="chip">Behind the cloud</p>
          <h1 className="section-title font-display">About Us</h1>
          <p className="mt-3 text-[color:var(--ink-soft)]">
            Once upon a late-night snack break, three friends were debating the
            meaning of life, flavor notes, and why checkout pages are always so
            boring. Somewhere between &quot;just one more puff&quot; and &quot;what if we made
            this premium,&quot; GREYED was born.
          </p>
          <p className="mt-3 text-[color:var(--ink-soft)]">
            They started with one laptop, too many tabs open, and a whiteboard
            full of dramatic arrows. After several design pivots, 47 coffee
            refills, and one keyboard that mysteriously stopped working after a
            mint cloud incident, the platform finally launched.
          </p>
        </div>

        <div className="card space-y-2">
          <p>
            <span className="font-semibold">CEO:</span> Ch. Haris
          </p>
          <p>
            <span className="font-semibold">CMO:</span> Moaaz
          </p>
          <p>
            <span className="font-semibold">CFO:</span> Umer
          </p>
          <p className="pt-2 text-[color:var(--ink-soft)]">
            <span className="font-semibold">CEO Email:</span>{" "}
            <a
              href="mailto:haris96786@gmail.com"
              className="hover:text-[color:var(--ink)]"
            >
              haris96786@gmail.com
            </a>
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
