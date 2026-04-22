import Link from "next/link";
import { LayoutDashboard, Package, Tag, Settings, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-secondary text-white flex-shrink-0 flex flex-col hidden md:flex">
        <div className="p-6">
          <span className="font-bold text-2xl tracking-tight text-white flex items-center gap-2">
            LuxFix <span className="text-brand-accent text-sm uppercase tracking-widest">Admin</span>
          </span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 text-brand-accent font-medium transition-colors">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-colors">
            <Package className="h-5 w-5" />
            Productos
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-colors">
            <Tag className="h-5 w-5" />
            Categorías
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-colors">
            <Settings className="h-5 w-5" />
            Configuración
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10 mt-auto">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-colors">
            <LogOut className="h-5 w-5" />
            Volver a Tienda
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
