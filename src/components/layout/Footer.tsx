import Link from "next/link";
import { HardHat, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-secondary text-secondary-foreground pt-16 pb-8 border-t-4 border-brand-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & About */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-brand-accent p-2 rounded-lg inline-block">
                <HardHat className="h-6 w-6 text-black" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-white">
                LuxFix
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Transformamos Ideas en Espacios Excepcionales. Líderes en herramientas, maquinaria y equipo para construcción y hogar.
            </p>
          </div>
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white uppercase tracking-wider text-sm">Categorías Populares</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/shop?category=herramientas-electricas" className="text-gray-400 hover:text-brand-accent text-sm transition-colors">
                  Herramientas Eléctricas
                </Link>
              </li>
              <li>
                <Link href="/shop?category=herramientas-manuales" className="text-gray-400 hover:text-brand-accent text-sm transition-colors">
                  Herramientas Manuales
                </Link>
              </li>
              <li>
                <Link href="/shop?category=maquinaria" className="text-gray-400 hover:text-brand-accent text-sm transition-colors">
                  Maquinaria Ligera
                </Link>
              </li>
              <li>
                <Link href="/shop?category=plomeria" className="text-gray-400 hover:text-brand-accent text-sm transition-colors">
                  Plomería y Tubería
                </Link>
              </li>
              <li>
                <Link href="/shop?category=iluminacion" className="text-gray-400 hover:text-brand-accent text-sm transition-colors">
                  Iluminación
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white uppercase tracking-wider text-sm">Servicio al Cliente</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-brand-accent text-sm transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-brand-accent text-sm transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-400 hover:text-brand-accent text-sm transition-colors">
                  Políticas de Envío
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-400 hover:text-brand-accent text-sm transition-colors">
                  Devoluciones y Garantías
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white uppercase tracking-wider text-sm">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start text-sm text-gray-400">
                <MapPin className="h-5 w-5 text-brand-accent mr-3 flex-shrink-0 mt-0.5" />
                <span>
                  Av. Industrial 1234, Parque Logístico<br />
                  Ciudad de México, CDMX 00000
                </span>
              </li>
              <li className="flex items-center text-sm text-gray-400">
                <Phone className="h-5 w-5 text-brand-accent mr-3 flex-shrink-0" />
                <span>+52 (55) 1234-5678</span>
              </li>
              <li className="flex items-center text-sm text-gray-400">
                <Mail className="h-5 w-5 text-brand-accent mr-3 flex-shrink-0" />
                <span>contacto@luxfixferretero.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} LuxFix Ferretero. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Aviso de Privacidad</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Términos y Condiciones</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
