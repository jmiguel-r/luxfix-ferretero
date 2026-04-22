import Link from "next/link";
import { Filter, ChevronDown, SearchX, Image as ImageIcon, X } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import AddToCartButton from "@/components/shop/AddToCartButton";

export const dynamic = "force-dynamic";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string; sort?: string }>;
}) {
  const { category, q, sort } = await searchParams;

  // Build Prisma where clause
  const where: Prisma.ProductWhereInput = {
    ...(category && { category: { slug: category } }),
    ...(q && {
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ],
    }),
  };

  // Build orderBy
  const orderBy: Prisma.ProductOrderByWithRelationInput =
    sort === "price_asc"
      ? { price: "asc" }
      : sort === "price_desc"
      ? { price: "desc" }
      : { createdAt: "desc" };

  const products = await prisma.product.findMany({
    where,
    orderBy,
    include: { category: true },
  });

  const categoryLabels: Record<string, string> = {
    herramientas: "Herramientas Manuales",
    electricas: "Herramientas Eléctricas",
    maquinaria: "Maquinaria y Equipo",
    hogar: "Hogar y Plomería",
  };

  const pageTitle = q
    ? `Resultados para "${q}"`
    : category
    ? categoryLabels[category] ?? category
    : "Todos Los Productos";

  const sortHref = (value: string) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (q) params.set("q", q);
    params.set("sort", value);
    return `/shop?${params.toString()}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-8 border-b border-border pb-6">
        <h1 className="text-3xl font-bold text-brand-primary">{pageTitle}</h1>
        <p className="text-muted-foreground mt-2">
          Encuentra la mejor calidad para tus proyectos.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm sticky top-24">
            <div className="flex items-center gap-2 font-bold text-brand-primary mb-6 text-lg border-b border-border pb-4">
              <Filter className="h-5 w-5 text-brand-accent" />
              Filtros
            </div>

            {/* Category Filter */}
            <div className="mb-8">
              <h3 className="font-semibold text-brand-primary mb-4 flex items-center justify-between">
                Categorías <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  { slug: null, label: "Todos" },
                  { slug: "herramientas", label: "Herramientas Manuales" },
                  { slug: "electricas", label: "Herramientas Eléctricas" },
                  { slug: "maquinaria", label: "Maquinaria y Equipo" },
                  { slug: "hogar", label: "Hogar y Plomería" },
                ].map(({ slug, label }) => {
                  const isActive = slug === null ? !category : category === slug;
                  const href = slug
                    ? `/shop?category=${slug}${q ? `&q=${q}` : ""}`
                    : `/shop${q ? `?q=${q}` : ""}`;
                  return (
                    <li key={label}>
                      <Link
                        href={href}
                        className={`block hover:text-brand-accent transition-colors ${
                          isActive
                            ? "text-brand-accent font-semibold"
                            : "text-muted-foreground"
                        }`}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="font-semibold text-brand-primary mb-4 flex items-center justify-between">
                Precio <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </h3>
              <div className="space-y-2">
                {["Menos de $500", "$500 - $1,500", "Más de $1,500"].map((label) => (
                  <label
                    key={label}
                    className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-brand-primary"
                  >
                    <input
                      type="checkbox"
                      className="rounded text-brand-accent focus:ring-brand-accent"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-xl border border-border shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm text-muted-foreground">
                Mostrando{" "}
                <span className="font-semibold text-brand-primary">
                  {products.length}
                </span>{" "}
                producto{products.length !== 1 ? "s" : ""}
              </span>
              {q && (
                <Link
                  href={category ? `/shop?category=${category}` : "/shop"}
                  className="inline-flex items-center gap-1.5 bg-brand-accent/20 text-brand-primary text-sm font-medium px-3 py-1 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors group"
                  title="Quitar búsqueda"
                >
                  <span>&ldquo;{q}&rdquo;</span>
                  <X className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                </Link>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Ordenar por:</span>
              <div className="flex gap-1">
                {[
                  { value: "destacados", label: "Destacados" },
                  { value: "price_asc", label: "Menor precio" },
                  { value: "price_desc", label: "Mayor precio" },
                ].map(({ value, label }) => (
                  <Link
                    key={value}
                    href={sortHref(value)}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      sort === value || (!sort && value === "destacados")
                        ? "bg-brand-accent text-black font-semibold"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Empty state */}
          {products.length === 0 ? (
            <div className="bg-white rounded-xl border border-border shadow-sm p-16 text-center">
              <SearchX className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="font-semibold text-gray-700 text-lg mb-1">
                Sin resultados
              </p>
              <p className="text-muted-foreground text-sm mb-6">
                {q
                  ? `No encontramos productos que coincidan con "${q}".`
                  : "No hay productos en esta categoría todavía."}
              </p>
              <Link
                href="/shop"
                className="text-brand-primary font-medium hover:underline text-sm"
              >
                Ver todos los productos &rarr;
              </Link>
            </div>
          ) : (
            <>
              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                  >
                    <div className="h-48 bg-gray-50 p-6 flex items-center justify-center relative overflow-hidden">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="object-contain h-full relative z-10 group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-gray-300">
                          <ImageIcon className="h-12 w-12" />
                          <span className="text-xs">Sin imagen</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <span className="text-xs text-muted-foreground mb-1 font-medium tracking-wide uppercase">
                        {product.category.name}
                      </span>
                      <Link
                        href={`/shop/${product.slug}`}
                        className="text-base font-bold text-brand-primary mb-2 line-clamp-2 group-hover:text-brand-accent transition-colors"
                      >
                        {product.name}
                      </Link>
                      {product.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                          {product.description}
                        </p>
                      )}
                      <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
                        <span className="text-lg font-black text-brand-primary">
                          ${product.price.toFixed(2)}
                        </span>
                        <AddToCartButton
                          id={product.id}
                          name={product.name}
                          price={product.price}
                          imageUrl={product.imageUrl}
                          slug={product.slug}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
