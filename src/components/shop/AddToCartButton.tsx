"use client";

import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { useCartStore, CartItem } from "@/store/cartStore";

type Props = Omit<CartItem, "quantity">;

export default function AddToCartButton(props: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem(props);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
        added
          ? "bg-green-500 text-white"
          : "bg-brand-secondary text-white hover:bg-brand-accent hover:text-black"
      }`}
      title="Añadir al carrito"
    >
      {added ? (
        <Check className="h-4 w-4" />
      ) : (
        <ShoppingCart className="h-4 w-4" />
      )}
    </button>
  );
}
