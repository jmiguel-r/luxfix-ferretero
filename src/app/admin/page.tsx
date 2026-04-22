import { Package, TrendingUp, DollarSign, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Panel de Control</h1>
          <p className="text-gray-500 mt-1">Bienvenido al sistema de gestión de LuxFix Ferretero.</p>
        </div>
        <Link href="/admin/products/new" className="bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-brand-secondary transition-colors font-medium">
          + Nuevo Producto
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <Package className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Productos</p>
            <p className="text-2xl font-bold text-gray-900">0</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="bg-green-100 p-4 rounded-lg">
            <DollarSign className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Ventas Mes</p>
            <p className="text-2xl font-bold text-gray-900">$0.00</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="bg-yellow-100 p-4 rounded-lg">
            <TrendingUp className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Pedidos Activos</p>
            <p className="text-2xl font-bold text-gray-900">0</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="bg-red-100 p-4 rounded-lg">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Stock Bajo</p>
            <p className="text-2xl font-bold text-gray-900">0</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="font-bold text-lg text-gray-900">Productos Añadidos Recientemente</h2>
        </div>
        <div className="p-12 text-center text-gray-500">
          Aún no tienes productos en la base de datos.
          <div className="mt-4">
            <Link href="/admin/products/new" className="text-brand-primary font-medium hover:underline">
              Comenzar a añadir productos &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
