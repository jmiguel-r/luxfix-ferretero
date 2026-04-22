import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Edit, Trash2, Plus, Tag } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categorías</h1>
          <p className="text-gray-500 mt-1">Organiza los productos de tu tienda.</p>
        </div>
        <Link
          href="/admin/categories/new"
          className="bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-brand-secondary transition-colors font-medium flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Nueva Categoría
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {categories.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Tag className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <p className="font-medium text-gray-700 mb-1">Sin categorías todavía</p>
            <p className="text-sm mb-4">Crea tu primera categoría para organizar el catálogo.</p>
            <Link
              href="/admin/categories/new"
              className="text-brand-primary font-medium hover:underline"
            >
              Crear primera categoría &rarr;
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="bg-gray-50 text-gray-700 uppercase font-semibold text-xs border-b border-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-4">Nombre</th>
                  <th scope="col" className="px-6 py-4">Slug</th>
                  <th scope="col" className="px-6 py-4">Productos</th>
                  <th scope="col" className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-accent/20 flex items-center justify-center flex-shrink-0">
                        <Tag className="h-4 w-4 text-brand-primary" />
                      </div>
                      {category.name}
                    </td>
                    <td className="px-6 py-4">
                      <code className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-mono">
                        {category.slug}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {category._count.products} producto{category._count.products !== 1 ? "s" : ""}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
