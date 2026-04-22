"use client";

import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft, Image as ImageIcon } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function CartView() {
  const { items, removeItem, updateQty, clearCart, totalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-gray-100 rounded-full p-6">
            <ShoppingCart className="h-12 w-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-brand-primary">Tu carrito está vacío</h1>
          <p className="text-muted-foreground text-sm">
            Agrega productos desde la tienda para comenzar.
          </p>
          <Link
            href="/shop"
            className="mt-4 inline-flex items-center gap-2 bg-brand-accent text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Ir a la tienda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-bold text-brand-primary">Carrito de Compras</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {items.reduce((s, i) => s + i.quantity, 0)} artículo
            {items.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
          Vaciar carrito
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Items list */}
        <div className="flex-1 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-border rounded-xl p-4 flex gap-4 shadow-sm"
            >
              {/* Image */}
              <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="object-contain w-full h-full p-1"
                  />
                ) : (
                  <ImageIcon className="h-8 w-8 text-gray-300" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <Link
                  href={`/shop/${item.slug}`}
                  className="font-semibold text-brand-primary hover:text-brand-accent transition-colors line-clamp-2 text-sm"
                >
                  {item.name}
                </Link>
                <p className="text-brand-primary font-bold mt-1">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              {/* Quantity controls */}
              <div className="flex flex-col items-end justify-between gap-2">
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Eliminar"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2 py-1">
                  <button
                    onClick={() => updateQty(item.id, item.quantity - 1)}
                    className="text-gray-500 hover:text-brand-primary transition-colors"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-6 text-center text-sm font-semibold text-brand-primary">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQty(item.id, item.quantity + 1)}
                    className="text-gray-500 hover:text-brand-primary transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <span className="text-sm font-bold text-brand-primary">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-primary transition-colors mt-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Seguir comprando
          </Link>
        </div>

        {/* Order summary */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-white border border-border rounded-xl p-6 shadow-sm sticky top-24">
            <h2 className="font-bold text-brand-primary text-lg mb-4 pb-4 border-b border-border">
              Resumen del Pedido
            </h2>
            <div className="space-y-3 text-sm mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-muted-foreground">
                  <span className="line-clamp-1 flex-1 pr-2">{item.name} × {item.quantity}</span>
                  <span className="font-medium text-brand-primary flex-shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 flex justify-between font-bold text-brand-primary text-base mb-6">
              <span>Total</span>
              <span>${totalPrice().toFixed(2)}</span>
            </div>
            <button className="w-full bg-brand-accent text-black font-bold py-3 rounded-lg hover:bg-yellow-400 transition-colors">
              Proceder al Pago
            </button>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Pagos seguros · Envío a todo México
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
