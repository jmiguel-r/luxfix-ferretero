"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(searchParams.get("q") ?? "");

  // Sync when URL changes (e.g. clicking a category clears q)
  useEffect(() => {
    setValue(searchParams.get("q") ?? "");
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const category = searchParams.get("category");
    const params = new URLSearchParams();
    if (value.trim()) params.set("q", value.trim());
    if (category) params.set("category", category);
    router.push(`/shop${params.size ? `?${params}` : ""}`);
  };

  const handleClear = () => {
    setValue("");
    const category = searchParams.get("category");
    router.push(category ? `/shop?category=${category}` : "/shop");
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-muted-foreground" />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Buscar herramientas, maquinaria..."
        className="block w-full pl-10 pr-16 py-2 border border-input rounded-full leading-5 bg-background focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent sm:text-sm transition-colors"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 gap-0.5">
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 text-muted-foreground hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
            title="Limpiar búsqueda"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <button
          type="submit"
          className="p-1 text-muted-foreground hover:text-brand-primary transition-colors rounded-full hover:bg-gray-100"
          title="Buscar"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
