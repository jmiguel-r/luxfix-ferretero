"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, Save, Loader2 } from "lucide-react";

export default function NewProductPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      
      const fileInput = e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput && fileInput.files && fileInput.files[0]) {
        formData.append("image", fileInput.files[0]);
      }

      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.detail || data.error || "Error al guardar el producto");
      }

      alert("¡Producto creado con éxito!");
      // Opcional: Redirigir al listado de productos
      window.location.href = "/admin/products";
    } catch (error) {
      console.error(error);
      alert(`Hubo un error al guardar el producto.\n\n${error instanceof Error ? error.message : ""}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Añadir Nuevo Producto</h1>
          <p className="text-gray-500 mt-1">Completa los datos para agregar un producto al catálogo.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Column: Form Details */}
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">Nombre del Producto</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  placeholder="Ej. Taladro Percutor 800W" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-gray-900 mb-2">Categoría</label>
                <select 
                  id="category" 
                  name="category" 
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all bg-white"
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="herramientas">Herramientas Manuales</option>
                  <option value="electricas">Herramientas Eléctricas</option>
                  <option value="maquinaria">Maquinaria y Equipo</option>
                  <option value="hogar">Hogar y Plomería</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-semibold text-gray-900 mb-2">Precio (MXN)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                    <input 
                      type="number" 
                      id="price" 
                      name="price" 
                      min="0"
                      step="0.01"
                      required
                      placeholder="0.00" 
                      className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="stock" className="block text-sm font-semibold text-gray-900 mb-2">Stock Disponible</label>
                  <input 
                    type="number" 
                    id="stock" 
                    name="stock" 
                    min="0"
                    required
                    placeholder="Ej. 100" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">Descripción Detallada</label>
                <textarea 
                  id="description" 
                  name="description" 
                  rows={5}
                  required
                  placeholder="Describe las características, especificaciones y usos del producto..." 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all resize-y"
                />
              </div>
            </div>

            {/* Right Column: Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Imagen del Producto</label>
              <div className="relative h-64 sm:h-96 w-full rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center hover:bg-gray-100 hover:border-brand-accent transition-colors overflow-hidden group">
                {previewImage ? (
                  <>
                    <img src={previewImage} alt="Preview" className="w-full h-full object-contain p-4 relative z-10" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center">
                      <p className="text-white font-medium bg-black/50 px-4 py-2 rounded-full">Cambiar imagen</p>
                    </div>
                  </>
                ) : (
                  <div className="text-center px-4">
                    <div className="bg-white p-4 rounded-full shadow-sm inline-block mb-4">
                      <Upload className="h-8 w-8 text-brand-primary" />
                    </div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Haz clic para subir o arrastra un archivo</p>
                    <p className="text-xs text-gray-500">PNG, JPG, WEBP hasta 5MB</p>
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30" 
                />
              </div>
            </div>

          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Link href="/admin/products" className="px-6 py-3 font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Cancelar
          </Link>
          <button 
            type="submit" 
            disabled={isLoading}
            className="px-8 py-3 font-bold text-black bg-brand-accent rounded-lg hover:bg-yellow-400 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Save className="h-5 w-5" />
            )}
            {isLoading ? "Guardando..." : "Guardar Producto"}
          </button>
        </div>
      </form>
    </div>
  );
}
