"use client";

import Link from "next/link";
import { ShoppingCart, Menu, HardHat, Search } from "lucide-react";
import { useState, Suspense } from "react";
import SearchInput from "@/components/layout/SearchInput";
import CartCount from "@/components/layout/CartCount";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-brand-accent p-2 rounded-lg">
                <HardHat className="h-6 w-6 text-black" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-brand-primary leading-none">
                  LuxFix
                </span>
                <span className="text-[0.65rem] text-brand-secondary font-medium tracking-widest uppercase mt-0.5">
                  Ferretero
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation & Search */}
          <div className="hidden md:flex flex-1 items-center justify-center px-8">
            <Suspense fallback={
              <div className="w-full max-w-xl relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar herramientas, maquinaria..."
                  className="block w-full pl-10 pr-3 py-2 border border-input rounded-full leading-5 bg-background sm:text-sm"
                  disabled
                />
              </div>
            }>
              <SearchInput />
            </Suspense>

            <div className="ml-8 flex space-x-6">
              <Link href="/shop?category=herramientas" className="text-sm font-medium text-brand-secondary hover:text-brand-accent transition-colors">
                Herramientas
              </Link>
              <Link href="/shop?category=maquinaria" className="text-sm font-medium text-brand-secondary hover:text-brand-accent transition-colors">
                Maquinaria
              </Link>
              <Link href="/shop?category=hogar" className="text-sm font-medium text-brand-secondary hover:text-brand-accent transition-colors">
                Hogar
              </Link>
            </div>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/admin" className="text-sm font-medium text-muted-foreground hover:text-brand-primary">
              Admin
            </Link>
            <Link href="/cart" className="p-2 text-brand-secondary hover:text-brand-accent transition-colors relative">
              <ShoppingCart className="h-6 w-6" />
              <CartCount />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-4">
            <Link href="/cart" className="p-2 text-brand-secondary relative">
              <ShoppingCart className="h-6 w-6" />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-brand-secondary hover:text-brand-primary hover:bg-muted focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="p-2">
              <Suspense fallback={null}>
                <SearchInput />
              </Suspense>
            </div>
            <Link href="/shop?category=herramientas" className="block px-3 py-2 rounded-md text-base font-medium text-brand-secondary hover:text-brand-primary hover:bg-muted">
              Herramientas
            </Link>
            <Link href="/shop?category=maquinaria" className="block px-3 py-2 rounded-md text-base font-medium text-brand-secondary hover:text-brand-primary hover:bg-muted">
              Maquinaria
            </Link>
            <Link href="/shop?category=hogar" className="block px-3 py-2 rounded-md text-base font-medium text-brand-secondary hover:text-brand-primary hover:bg-muted">
              Hogar
            </Link>
            <Link href="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-brand-primary hover:bg-muted">
              Panel de Administración
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
