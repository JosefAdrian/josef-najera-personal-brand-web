"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Cross,
  CheckCircle,
  Mail,
  Calendar,
  Shield,
  Heart,
  ArrowRight,
  Users,
  MessageCircleWarning,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function ThankYouPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMenuHovered, setIsMenuHovered] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleBookCall = () => {
    // Replace with actual Calendly link
    window.open("https://www.instagram.com/direct/t/116638503065633/", "_blank")
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Close menu on scroll if not hovering
  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen && !isMenuHovered) {
        closeMobileMenu()
      }
    }

    if (isMobileMenuOpen) {
      window.addEventListener("scroll", handleScroll, { passive: true })
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isMobileMenuOpen, isMenuHovered])

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && isMobileMenuOpen) {
        closeMobileMenu()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMobileMenuOpen])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo with hover animation */}
            <div className="flex items-center space-x-2 group cursor-pointer">
              <Cross className="h-8 w-8 text-purple-900 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
              <span className="text-xl font-bold text-gray-900 transition-all duration-300 group-hover:text-purple-900">
                Libertad en Cristo
              </span>
            </div>

            <nav className="flex items-center">
              {/* Desktop Navigation with Enhanced Animations */}
              <div className="hidden md:flex items-center space-x-8">
                <a
                  href="/"
                  className="relative text-gray-700 hover:text-purple-900 font-medium transition-all duration-300 group py-2"
                >
                  <span className="relative z-10">Inicio</span>
                  <div className="absolute inset-0 bg-purple-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></div>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-900 group-hover:w-full transition-all duration-300 ease-out"></div>
                </a>

                <a
                  href="/about"
                  className="relative text-gray-700 hover:text-purple-900 font-medium transition-all duration-300 group py-2"
                >
                  <span className="relative z-10">Acerca de Mí</span>
                  <div className="absolute inset-0 bg-purple-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></div>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-900 group-hover:w-full transition-all duration-300 ease-out"></div>
                </a>

                <a
                  href="/#guia"
                  className="relative bg-gradient-to-r from-purple-900 to-purple-800 hover:from-purple-800 hover:to-purple-700 text-white font-bold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg group overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    <Mail className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                    Guía Gratuita
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </div>

              {/* Mobile Hamburger Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="relative p-3 text-gray-700 hover:text-purple-900 transition-all duration-300 hover:bg-gray-100 rounded-lg group"
                  aria-label="Toggle mobile menu"
                >
                  <div className="w-6 h-6 relative">
                    {/* Hamburger Icon Animation */}
                    <span
                      className={`absolute left-0 top-1 w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                        isMobileMenuOpen
                          ? "rotate-45 translate-y-2 bg-purple-900"
                          : "rotate-0 translate-y-0 group-hover:bg-purple-900"
                      }`}
                    />
                    <span
                      className={`absolute left-0 top-3 w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                        isMobileMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100 group-hover:bg-purple-900"
                      }`}
                    />
                    <span
                      className={`absolute left-0 top-5 w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                        isMobileMenuOpen
                          ? "-rotate-45 -translate-y-2 bg-purple-900"
                          : "rotate-0 translate-y-0 group-hover:bg-purple-900"
                      }`}
                    />
                  </div>
                </button>
              </div>
            </nav>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          ref={menuRef}
          className={`md:hidden fixed inset-0 top-[73px] z-40 transition-all duration-500 ease-out ${
            isMobileMenuOpen ? "opacity-100 visible backdrop-blur-sm" : "opacity-0 invisible backdrop-blur-none"
          }`}
        >
          {/* Background Overlay */}
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-500 ease-out ${
              isMobileMenuOpen ? "bg-opacity-50" : "bg-opacity-0"
            }`}
            onClick={closeMobileMenu}
          />

          {/* Menu Content */}
          <div
            className={`relative bg-white shadow-2xl transition-all duration-500 ease-out transform ${
              isMobileMenuOpen ? "translate-y-0 opacity-100 scale-100" : "-translate-y-8 opacity-0 scale-95"
            }`}
            onMouseEnter={() => setIsMenuHovered(true)}
            onMouseLeave={() => setIsMenuHovered(false)}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="container mx-auto px-4 py-8">
              <nav className="flex flex-col space-y-2">
                {/* Menu Items with Staggered Animation */}
                <a
                  href="/"
                  className={`text-lg font-medium text-gray-700 hover:text-purple-900 hover:bg-purple-50 transition-all duration-300 py-4 px-4 rounded-lg border-b border-gray-100 transform group ${
                    isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isMobileMenuOpen ? "100ms" : "0ms",
                  }}
                  onClick={closeMobileMenu}
                >
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-purple-900 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    Inicio
                  </span>
                </a>

                <a
                  href="/about"
                  className={`text-lg font-medium text-gray-700 hover:text-purple-900 hover:bg-purple-50 transition-all duration-300 py-4 px-4 rounded-lg border-b border-gray-100 transform group ${
                    isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isMobileMenuOpen ? "200ms" : "0ms",
                  }}
                  onClick={closeMobileMenu}
                >
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-purple-900 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    Acerca de Mí
                  </span>
                </a>

                {/* CTA Button with Special Animation */}
                <div
                  className={`mt-6 transform transition-all duration-500 ${
                    isMobileMenuOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95"
                  }`}
                  style={{
                    transitionDelay: isMobileMenuOpen ? "300ms" : "0ms",
                  }}
                >
                  <a
                    href="/#guia"
                    className="block bg-gradient-to-r from-purple-900 to-purple-800 hover:from-purple-800 hover:to-purple-700 text-white font-bold px-8 py-5 rounded-xl transition-all duration-300 text-center text-lg shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 group overflow-hidden relative"
                    onClick={closeMobileMenu}
                  >
                    <span className="flex items-center justify-center relative z-10">
                      <Mail className="mr-3 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                      Obtener Guía Gratuita
                      <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                </div>

                {/* Decorative Element */}
                <div
                  className={`mt-8 flex items-center justify-center transform transition-all duration-500 ${
                    isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isMobileMenuOpen ? "400ms" : "0ms",
                  }}
                >
                  <div className="flex items-center space-x-3 text-gray-400">
                    <div className="h-px bg-gray-300 w-12 transition-all duration-500"></div>
                    <Cross className="h-4 w-4 text-purple-900 transition-transform duration-500 hover:rotate-90" />
                    <div className="h-px bg-gray-300 w-12 transition-all duration-500"></div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Thank You Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">¡Tu Guía Está en Camino!</h1>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Gracias por dar el primer paso hacia tu libertad. Acabas de tomar la decisión más importante para tu
                futuro espiritual.
              </p>
            </div>

            <Card className="bg-white border-2 border-green-500 shadow-lg max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <Mail className="h-8 w-8 text-green-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Próximos Pasos</h2>
                </div>
                <div className="space-y-4 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                      1
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Revisa tu correo electrónico</p>
                      <p className="text-gray-600">
                        La "Guía para dejar la lujuria" llegará en los próximos 5-10 minutos.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                      2
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Verifica tu carpeta de spam</p>
                      <p className="text-gray-600">Si no ves el correo, revisa tu carpeta de spam o promociones.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                      3
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Lee la guía completa</p>
                      <p className="text-gray-600">
                        Dedica tiempo a estudiar cada paso. Tu libertad depende de aplicar lo que aprendas.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Motivational Section */}
      <section className="py-20 bg-purple-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="h-16 w-16 text-purple-300 mx-auto mb-8" />
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Este Es Solo el Comienzo</h2>
            <p className="text-xl text-purple-100 mb-8 leading-relaxed max-w-3xl mx-auto">
              Hermano, acabas de dar el paso más difícil: reconocer que necesitas ayuda y decidir cambiar. Dios ya está
              obrando en tu vida, y esta guía será tu primera herramienta en el camino hacia la libertad completa.
            </p>
            <div className="bg-purple-800/50 p-8 rounded-xl border border-purple-700 max-w-2xl mx-auto">
              <p className="text-lg italic mb-4">
                "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de
                mal, para daros el fin que esperáis."
              </p>
              <p className="text-purple-200 font-bold">- Jeremías 29:11</p>
            </div>
          </div>
        </div>
      </section>

      {/* Immediate Action Steps */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Mientras Esperas Tu Guía...</h2>
              <p className="text-xl text-gray-700">Puedes empezar a preparar tu corazón con estos pasos:</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gray-50 border-none shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Heart className="h-8 w-8 text-purple-900 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">Ora por Tu Libertad</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Dedica unos minutos ahora mismo a orar. Pídele a Dios que prepare tu corazón para recibir Su verdad
                    y que te dé la valentía para aplicar lo que vas a aprender.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 border-none shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Shield className="h-8 w-8 text-purple-900 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">Elimina las Tentaciones</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Identifica qué aplicaciones, cuentas o situaciones te llevan a caer. Prepárate mentalmente para
                    tomar decisiones radicales cuando leas la guía.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <div className="bg-purple-50 p-8 rounded-xl border-l-4 border-purple-900 max-w-2xl mx-auto">
                <p className="text-lg text-gray-800 italic mb-2">
                  "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de
                  mal, para daros el fin que esperáis."
                </p>
                <p className="text-purple-900 font-bold">- Jeremías 29:11</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mentorship Offer Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">¿Quieres dejar la lujuria YA?</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                La guía te dará las bases, pero si realmente quieres libertad completa y permanente,
                <span className="font-semibold text-purple-900"> necesitas un plan personalizado</span>.
              </p>
            </div>

            <Card className="bg-gradient-to-br from-gray-50 to-white border-2 border-purple-900 shadow-2xl">
              <CardContent className="p-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Left Side - Offer Details */}
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center mb-4">
                        <Calendar className="h-8 w-8 text-purple-900 mr-3" />
                        <h3 className="text-3xl font-bold text-gray-900">Llamada de Mentoría 1:1</h3>
                      </div>
                      <p className="text-xl text-gray-700 leading-relaxed">
                        Una sesión personalizada donde analizaremos tu situación específica y crearemos un plan de
                        acción diseñado para tu libertad completa en Cristo.
                      </p>
                    </div>

                    <div className="flex items-start space-x-4">
                      <MessageCircleWarning className="h-6 w-6 text-purple-900 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-lg mb-1">Garantía de satisfacción</h4>
                        <p className="text-gray-700">
                          Si no te gusta la llamada, te devuelvo TODO tu dinero sin ninguna pregunta.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Shield className="h-6 w-6 text-purple-900 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-lg mb-1">Plan de Acción Bíblico</h4>
                        <p className="text-gray-700">
                          Estrategias prácticas basadas en la Palabra para tu situación específica
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Heart className="h-6 w-6 text-purple-900 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-lg mb-1">Sanidad del Corazón</h4>
                        <p className="text-gray-700">Abordaremos las heridas y mentiras que alimentan la adicción</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Users className="h-6 w-6 text-purple-900 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-lg mb-1">Rendición de Cuentas</h4>
                        <p className="text-gray-700">Sistema de seguimiento para mantenerte en el camino correcto</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - CTA */}
                  <div className="space-y-8">
                    <div className="text-center">
                      <div className="bg-purple-900 text-white p-8 rounded-2xl mb-8">
                        <h4 className="text-2xl font-bold mb-4">Oferta Especial</h4>
                        <div className="space-y-2">
                          <p className="text-purple-200 line-through text-lg">Precio regular: $1,997MN</p>
                          <p className="text-3xl font-bold">Solo $997MN</p>
                          <p className="text-purple-200 text-sm">Para nuevos miembros de la comunidad</p>
                        </div>
                      </div>

                      <Button
                        onClick={handleBookCall}
                        className="w-full bg-purple-900 hover:bg-purple-800 text-white font-bold py-4 text-xl mb-6"
                        size="lg"
                      >
                        Reservar Mi Llamada Ahora
                        <ArrowRight className="ml-2 h-6 w-6" />
                      </Button>

                      <p className="text-sm text-gray-500 mb-6">
                        Pago seguro • Garantía de satisfacción • Disponibilidad limitada
                      </p>
                    </div>

                    <Card className="bg-gray-900 text-white border-none">
                      <CardContent className="p-6">
                        <h5 className="font-bold mb-3 text-center">⚡ Bonus Exclusivo ⚡</h5>
                        <p className="text-gray-300 text-center text-sm">
                          Incluye acceso a mi grupo privado de WhatsApp para hombres en proceso de libertad (valor
                          $997MN)
                        </p>
                      </CardContent>
                    </Card>

                    <div className="text-center">
                      <p className="text-gray-600 text-sm">
                        <span className="font-semibold">Solo quedan 3 espacios</span> disponibles esta semana
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">No Esperes Más</h3>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Cada día que pasa sin un plan claro es un día más viviendo en esclavitud. Tu libertad no puede esperar.
              <span className="font-semibold text-white"> Cristo ya pagó el precio por tu libertad</span> - ahora es
              tiempo de caminar en ella.
            </p>
            <Button
              onClick={handleBookCall}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 text-lg"
              size="lg"
            >
              Sí, Quiero Mi Libertad Ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Cross className="h-8 w-8 text-purple-400 mr-2" />
              <span className="text-xl font-bold">Libertad en Cristo</span>
            </div>
            <p className="text-gray-400 mb-6">
              Ayudando a hombres jóvenes a encontrar libertad de la lujuria y la pornografía a través de la fe en
              Jesucristo.
            </p>
            <div className="border-t border-gray-700 pt-6">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Libertad en Cristo. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
