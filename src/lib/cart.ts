import { catalog } from "@/lib/catalog";

export const CART_STORAGE_KEY = "greyed_cart";

export type CartLine = {
  slug: string;
  quantity: number;
};

export function parsePrice(price: string): number {
  return Number(price.replace(/[^\d.]/g, ""));
}

export function readCart(): CartLine[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as CartLine[];
    return parsed.filter((line) => line.quantity > 0);
  } catch {
    return [];
  }
}

export function writeCart(lines: CartLine[]): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
}

export function addToCart(slug: string, quantity = 1): CartLine[] {
  const existing = readCart();
  const index = existing.findIndex((line) => line.slug === slug);

  if (index >= 0) {
    existing[index] = {
      ...existing[index],
      quantity: existing[index].quantity + quantity,
    };
  } else {
    existing.push({ slug, quantity });
  }

  writeCart(existing);
  return existing;
}

export function getCartProducts(lines: CartLine[]) {
  return lines
    .map((line) => {
      const product = catalog.find((item) => item.slug === line.slug);
      if (!product) {
        return null;
      }

      const unitPrice = parsePrice(product.price);
      return {
        ...product,
        quantity: line.quantity,
        unitPrice,
        lineTotal: unitPrice * line.quantity,
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
}
