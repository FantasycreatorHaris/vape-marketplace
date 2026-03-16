"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/catalog";

type FeaturedProductSliderProps = {
  products: Product[];
};

function FeaturedPanel({ product }: { product: Product }) {
  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[#fffdf9] p-3">
        <Image
          src={product.image}
          alt={product.imageAlt}
          width={800}
          height={500}
          className="h-44 w-full object-contain"
        />
      </div>
      <div className="flex items-center justify-between">
        <p className="chip">Featured drop</p>
        <p className="text-sm text-[color:var(--ink-soft)]">New arrivals weekly</p>
      </div>
      <h2 className="font-display text-3xl">{product.name}</h2>
      <p className="text-[color:var(--ink-soft)]">{product.description}</p>
      <div className="flex items-center justify-between">
        <p className="text-xl font-semibold">{product.price}</p>
        <Link className="btn" href={`/product/${product.slug}`}>
          View release
        </Link>
      </div>
    </div>
  );
}

export default function FeaturedProductSlider({ products }: FeaturedProductSliderProps) {
  const featured = useMemo(() => products.slice(0, 6), [products]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (featured.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % featured.length);
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [featured.length]);

  if (featured.length === 0) {
    return null;
  }

  return (
    <div className="card relative overflow-hidden fade-up">
      <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[color:var(--glow)] blur-3xl" />
      <div className="relative h-[390px] overflow-hidden">
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {featured.map((product) => (
            <div key={product.slug} className="h-full min-w-full">
              <FeaturedPanel product={product} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        {featured.map((item, dotIndex) => (
          <button
            key={item.slug}
            type="button"
            aria-label={`Show ${item.name}`}
            onClick={() => {
              setIndex(dotIndex);
            }}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              dotIndex === index ? "bg-[color:var(--ink)]" : "bg-[color:var(--line)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
