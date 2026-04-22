"use client";

import { useState } from "react";
import { Save, Store, Loader2, Bell, Shield, Palette, CheckCircle } from "lucide-react";

type Settings = {
  storeName: string;
  email: string;
  phone: string;
  currency: string;
  description: string;
  theme: string;
  notifyLowStock: boolean;
  notifyNewOrders: boolean;
  notifyWeeklyReport: boolean;
};

const defaults: Settings = {
  storeName: "LuxFix Ferretero",
  email: "contacto@luxfix.mx",
  phone: "",
  currency: "MXN",
  description: "",
  theme: "dark-gold",
  notifyLowStock: true,
  notifyNewOrders: true,
  notifyWeeklyReport: false,
};

export default function SettingsForm({
  initialData,
}: {
  initialData: Settings | null;
}) {
  const [form, setForm] = useState<Settings>({ ...defaults, ...initialData });
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof Settings, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaved(false);
    setError(null);

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || data.error || "Error desconocido");
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Información de la tienda */}
      <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
          <Store className="h-5 w-5 text-brand-primary" />
          <h2 className="font-semibold text-gray-900">Información de la Tienda</h2>
        </div>
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre de la Tienda
              </label>
              <input
                type="text"
                value={form.storeName}
                onChange={(e) => set("storeName", e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Correo de Contacto
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="+52 55 0000 0000"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Moneda
              </label>
              <select
                value={form.currency}
                onChange={(e) => set("currency", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all text-sm bg-white"
              >
                <option value="MXN">MXN — Peso Mexicano</option>
                <option value="USD">USD — Dólar Americano</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Descripción de la Tienda
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Tu ferretería de confianza..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all text-sm resize-none"
            />
          </div>
        </div>
      </section>

      {/* Notificaciones */}
      <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
          <Bell className="h-5 w-5 text-brand-primary" />
          <h2 className="font-semibold text-gray-900">Notificaciones</h2>
        </div>
        <div className="p-6 divide-y divide-gray-100">
          {(
            [
              {
                key: "notifyLowStock" as const,
                label: "Alertas de stock bajo",
                description: "Avísame cuando un producto baje de 5 unidades",
              },
              {
                key: "notifyNewOrders" as const,
                label: "Nuevos pedidos",
                description: "Recibir notificación por cada pedido entrante",
              },
              {
                key: "notifyWeeklyReport" as const,
                label: "Resumen semanal",
                description: "Reporte de ventas cada lunes por correo",
              },
            ] as const
          ).map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{item.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form[item.key]}
                  onChange={(e) => set(item.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary" />
              </label>
            </div>
          ))}
        </div>
      </section>

      {/* Apariencia */}
      <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
          <Palette className="h-5 w-5 text-brand-primary" />
          <h2 className="font-semibold text-gray-900">Apariencia</h2>
        </div>
        <div className="p-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Tema de la Tienda
          </label>
          <div className="flex gap-3">
            {(
              [
                { id: "dark-gold", label: "Oscuro / Dorado", bg: "bg-gray-900", accent: "bg-yellow-400" },
                { id: "light-blue", label: "Claro / Azul", bg: "bg-white border", accent: "bg-blue-600" },
                { id: "green", label: "Verde Industrial", bg: "bg-gray-800", accent: "bg-green-500" },
              ] as const
            ).map((theme) => (
              <label key={theme.id} className="cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value={theme.id}
                  checked={form.theme === theme.id}
                  onChange={() => set("theme", theme.id)}
                  className="sr-only peer"
                />
                <div className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 border-transparent peer-checked:border-brand-accent hover:border-gray-200 transition-all">
                  <div className={`w-12 h-8 rounded-lg ${theme.bg} flex items-center justify-end pr-1.5 shadow-sm`}>
                    <div className={`w-3 h-3 rounded-full ${theme.accent}`} />
                  </div>
                  <span className="text-xs font-medium text-gray-600">{theme.label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* Seguridad */}
      <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
          <Shield className="h-5 w-5 text-brand-primary" />
          <h2 className="font-semibold text-gray-900">Seguridad</h2>
        </div>
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nueva Contraseña
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feedback + Botón */}
      <div className="flex items-center justify-between">
        <div className="h-8">
          {saved && (
            <span className="flex items-center gap-2 text-green-600 text-sm font-medium">
              <CheckCircle className="h-4 w-4" />
              Cambios guardados correctamente
            </span>
          )}
          {error && (
            <span className="text-red-600 text-sm font-medium">{error}</span>
          )}
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="px-8 py-3 font-bold text-black bg-brand-accent rounded-lg hover:bg-yellow-400 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Save className="h-5 w-5" />
          )}
          {isSaving ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>
    </form>
  );
}
