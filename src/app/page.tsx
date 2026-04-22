import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Wrench, Zap, Home, Shield, ChevronRight, ShoppingCart } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#172554] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#172554] to-transparent z-10" />
          {/* Subtle grid pattern background */}
          <div className="w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-20 lg:py-32 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 md:pr-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Transformamos Ideas en Espacios <span className="text-brand-accent">Excepcionales</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-lg">
              Encuentra la mejor selección de herramientas, maquinaria y equipo para tus proyectos de construcción y hogar, con la calidad y confianza que los profesionales exigen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop" className="inline-flex justify-center items-center px-8 py-4 bg-brand-accent text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors">
                Ver Catálogo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/ofertas" className="inline-flex justify-center items-center px-8 py-4 bg-transparent border-2 border-gray-600 text-white font-bold rounded-lg hover:border-gray-400 hover:text-white transition-colors">
                Ofertas del Mes
              </Link>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 mt-16 md:mt-0 relative flex justify-center">
            {/* Mascot / Beaver Assistant Area */}
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-brand-accent opacity-20 rounded-full blur-3xl animate-pulse" />
              {/* Fallback image if mascot isn't in public dir yet */}
              <img 
                src="/mascot.png" 
                alt="LuxFix Beaver Mascot" 
                className="relative z-10 object-contain w-full h-full drop-shadow-2xl"
              />
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl z-20 flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Garantía LuxFix</p>
                  <p className="text-sm font-bold text-brand-primary">100% Profesionales</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-brand-primary mb-2">Categorías Principales</h2>
              <p className="text-muted-foreground">Explora nuestro inventario por área de trabajo</p>
            </div>
            <Link href="/shop" className="hidden sm:flex items-center text-brand-accent font-semibold hover:text-yellow-600">
              Ver todas <ChevronRight className="h-5 w-5 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Cat 1 */}
            <Link href="/shop?category=herramientas" className="group bg-white rounded-2xl p-8 border border-border shadow-sm hover:shadow-md hover:border-brand-accent transition-all">
              <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-accent transition-colors">
                <Wrench className="h-8 w-8 text-blue-600 group-hover:text-black transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-brand-primary mb-2">Herramientas</h3>
              <p className="text-sm text-muted-foreground">Manuales y accesorios para todo tipo de trabajo.</p>
            </Link>

            {/* Cat 2 */}
            <Link href="/shop?category=electricas" className="group bg-white rounded-2xl p-8 border border-border shadow-sm hover:shadow-md hover:border-brand-accent transition-all">
              <div className="bg-yellow-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-accent transition-colors">
                <Zap className="h-8 w-8 text-yellow-600 group-hover:text-black transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-brand-primary mb-2">Eléctricas</h3>
              <p className="text-sm text-muted-foreground">Taladros, sierras, esmeriladoras y más de alta potencia.</p>
            </Link>

            {/* Cat 3 */}
            <Link href="/shop?category=hogar" className="group bg-white rounded-2xl p-8 border border-border shadow-sm hover:shadow-md hover:border-brand-accent transition-all">
              <div className="bg-green-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-accent transition-colors">
                <Home className="h-8 w-8 text-green-600 group-hover:text-black transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-brand-primary mb-2">Hogar y Jardín</h3>
              <p className="text-sm text-muted-foreground">Mantenimiento, plomería, pintura y espacios verdes.</p>
            </Link>

            {/* Cat 4 */}
            <Link href="/shop?category=maquinaria" className="group bg-white rounded-2xl p-8 border border-border shadow-sm hover:shadow-md hover:border-brand-accent transition-all">
              <div className="bg-orange-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-accent transition-colors">
                <Shield className="h-8 w-8 text-orange-600 group-hover:text-black transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-brand-primary mb-2">Construcción</h3>
              <p className="text-sm text-muted-foreground">Maquinaria ligera y equipo pesado para obras.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products (Placeholders) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-primary mb-4">Productos Destacados</h2>
            <div className="w-24 h-1 bg-brand-accent mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Placeholder Product Card */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group relative bg-white border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded">En Stock</span>
                </div>
                <div className="h-64 bg-gray-50 p-6 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-accent/0 group-hover:bg-brand-accent/5 transition-colors z-0" />
                  <img src={`https://placehold.co/300x300/e4e4e7/71717a?text=Producto+${i}`} alt="Product" className="object-contain h-full relative z-10 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs text-muted-foreground mb-2 font-medium tracking-wide uppercase">Herramientas</span>
                  <Link href={`/product/${i}`} className="text-lg font-bold text-brand-primary mb-2 line-clamp-2 group-hover:text-brand-accent transition-colors">
                    Taladro Percutor Industrial {i}000W
                  </Link>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="text-xl font-black text-brand-primary">$2,499.00</span>
                    <button className="bg-brand-secondary text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-brand-accent hover:text-black transition-colors">
                      <ShoppingCart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
