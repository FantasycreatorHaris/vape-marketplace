import Image from "next/image";
import Link from "next/link";

type SiteShellProps = {
  children: React.ReactNode;
};

export default function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="min-h-screen">
      <header className="page-shell pt-8">
        <nav className="flex flex-wrap items-center justify-between gap-4">
            <Image src="/logo.svg" alt="GREYED logo" width={150} height={40} />
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Link className="nav-pill" href="/catalog">
              Catalog
            </Link>
            <Link className="nav-pill" href="/cart">
              Cart
            </Link>
            <Link className="nav-pill" href="/account">
              Account
            </Link>
            <Link className="nav-pill" href="/admin">
              Admin
            </Link>
            <Link className="nav-pill" href="/auth/sign-in">
              Sign in
            </Link>
          </div>
        </nav>
      </header>

      <main className="page-shell mt-10">{children}</main>

      <footer className="page-shell border-t border-[color:var(--line)] py-10 text-sm">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-2">
            <p className="font-display text-lg">GREYED</p>
            <p className="text-[color:var(--ink-soft)]">
              A premium marketplace for refined vape and cigarette selections.
            </p>
          </div>
          <div className="space-y-2">
            <p className="uppercase tracking-[0.2em] text-xs text-[color:var(--ink-soft)]">
              Concierge
            </p>
            <p>Private releases</p>
            <p>Membership care</p>
            <p>Priority fulfillment</p>
          </div>
          <div className="space-y-2">
            <p className="uppercase tracking-[0.2em] text-xs text-[color:var(--ink-soft)]">
              Studio
            </p>
            <p>Design philosophy</p>
            <p>Press room</p>
            <p>Careers</p>
          </div>
        </div>
        <p className="mt-8 text-xs text-[color:var(--ink-soft)]">
          2026 GREYED. Curated for premium audiences.
        </p>
      </footer>
    </div>
  );
}
