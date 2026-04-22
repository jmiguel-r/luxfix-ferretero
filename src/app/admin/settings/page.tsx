import SettingsForm from "./SettingsForm";

export const dynamic = "force-dynamic";

async function getSettings() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3001");
    const res = await fetch(`${baseUrl}/api/settings`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
        <p className="text-gray-500 mt-1">
          Administra las opciones generales de tu tienda.
        </p>
      </div>
      <SettingsForm initialData={settings} />
    </div>
  );
}
