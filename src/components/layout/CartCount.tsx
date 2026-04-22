"use client";

import { useCartStore } from "@/store/cartStore";

export default function CartCount() {
  const totalItems = useCartStore((s) => s.totalItems());

  if (totalItems === 0) return null;

  return (
    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-black transform translate-x-1/4 -translate-y-1/4 bg-brand-accent rounded-full min-w-[1.25rem] text-center">
      {totalItems > 99 ? "99+" : totalItems}
    </span>
  );
}
