"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

export default function NewCategoryPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const slug = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.detail || data.error || "Error al guardar la categoría");
      }

      alert("¡Categoría creada con éxito!");
      window.location.href = "/admin/categories";
    } catch (error) {
      console.error(error);
      alert(`Hubo un error al guardar la categoría.\n\n${error instanceof Error ? error.message : ""}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/categories"
          className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nueva Categoría</h1>
          <p className="text-gray-500 mt-1">Crea una categoría para organizar tu catálogo.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
              Nombre de la Categoría
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Herramientas Eléctricas"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Slug <span className="text-gray-400 font-normal">(generado automáticamente)</span>
            </label>
            <div className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 font-mono text-sm text-gray-600">
              {slug || <span className="text-gray-400">se generará al escribir el nombre</span>}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Se usa en URLs y como identificador único.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Link
            href="/admin/categories"
            className="px-6 py-3 font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={isLoading || !name.trim()}
            className="px-8 py-3 font-bold text-black bg-brand-accent rounded-lg hover:bg-yellow-400 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Save className="h-5 w-5" />
            )}
            {isLoading ? "Guardando..." : "Guardar Categoría"}
          </button>
        </div>
      </form>
    </div>
  );
}
