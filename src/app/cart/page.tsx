import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { catalog } from "@/lib/catalog";

const cartItems = catalog.slice(0, 2);

export default function CartPage() {
  return (
    <SiteShell>
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div>
            <p className="chip">Your cart</p>
            <h1 className="section-title font-display">Private selection</h1>
          </div>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.slug} className="card">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-[color:var(--ink-soft)]">
                      {item.category}
                    </p>
                    <p className="mt-2 font-display text-xl">{item.name}</p>
                    <p className="mt-2 text-sm text-[color:var(--ink-soft)]">
                      {item.size} · {item.strength}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">{item.price}</p>
                    <button
                      className="mt-3 text-xs uppercase tracking-[0.2em] text-[color:var(--ink-soft)]"
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link className="btn btn-outline" href="/catalog">
            Continue browsing
          </Link>
        </div>
        <aside className="space-y-6">
          <div className="card">
            <h2 className="font-display text-2xl">Summary</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>$110</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Concierge delivery</span>
                <span>$12</span>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <span>Total</span>
                <span>$122</span>
              </div>
            </div>
            <button className="btn mt-6 w-full" type="button">
              Proceed to checkout
            </button>
          </div>
          <div className="card text-sm">
            <p className="font-semibold">Member note</p>
            <p className="mt-2 text-[color:var(--ink-soft)]">
              Checkout is reserved for verified members. Sign in to unlock
              shipping times and preferred payment options.
            </p>
          </div>
        </aside>
      </section>
    </SiteShell>
  );
}
