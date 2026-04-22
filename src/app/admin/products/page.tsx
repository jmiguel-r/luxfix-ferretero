import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Edit, Trash2, Plus, Image as ImageIcon } from "lucide-react";

// Revalidate on every request since it's an admin dashboard
export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
          <p className="text-gray-500 mt-1">Gestiona el inventario de tu tienda.</p>
        </div>
        <Link href="/admin/products/new" className="bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-brand-secondary transition-colors font-medium flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Añadir Producto
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {products.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            Aún no tienes productos en la base de datos.
            <div className="mt-4">
              <Link href="/admin/products/new" className="text-brand-primary font-medium hover:underline">
                Comenzar a añadir productos &rarr;
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="bg-gray-50 text-gray-700 uppercase font-semibold text-xs border-b border-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-4">Producto</th>
                  <th scope="col" className="px-6 py-4">Categoría</th>
                  <th scope="col" className="px-6 py-4">Precio</th>
                  <th scope="col" className="px-6 py-4">Stock</th>
                  <th scope="col" className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-4">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="w-10 h-10 rounded object-cover border border-gray-200" />
                      ) : (
                        <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center border border-gray-200">
                          <ImageIcon className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                      <span className="line-clamp-1">{product.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {product.category.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-brand-primary">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${product.stock > 10 ? 'bg-green-100 text-green-800' : product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {product.stock} ud.
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50" title="Editar">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50" title="Eliminar">
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
