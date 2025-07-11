"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Cross, Heart, Shield, ArrowRight, Calendar, Users, Target, CheckCircle, Mail } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function AboutPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMenuHovered, setIsMenuHovered] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleBookCall = () => {
    // Replace with actual Calendly link
    window.open("https://calendly.com/your-calendly-link", "_blank")
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
      {/* Header - Consistent with other pages */}
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

                <a href="/about" className="relative text-purple-900 font-medium py-2 group">
                  <span className="relative z-10">Acerca de Mí</span>
                  <div className="absolute inset-0 bg-purple-50 rounded-lg scale-100 transition-transform duration-300 ease-out"></div>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-900 transition-all duration-300 ease-out"></div>
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
                  className={`text-lg font-medium text-purple-900 py-4 px-4 rounded-lg border-b border-gray-100 transform ${
                    isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isMobileMenuOpen ? "200ms" : "0ms",
                  }}
                  onClick={closeMobileMenu}
                >
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-purple-900 rounded-full mr-3 opacity-100"></span>
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

      {/* Hero Section - Split Layout */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Soy Josef Nájera</h1>
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                  Durante años fui esclavo de la pornografía. Probé de todo: fuerza de voluntad, motivación, hábitos… nada funcionaba.
                  <span className="font-semibold text-purple-900"> No fue hasta que conocí a Cristo que todo cambió.</span> Él no solo me perdonó, me transformó. Ahora dedico mi vida a ayudar a otros hombres a encontrar la libertad que solo Jesús puede dar.</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-1 flex-grow bg-purple-900"></div>
                <span className="text-purple-900 font-bold">MI HISTORIA</span>
                <div className="h-1 flex-grow bg-purple-900"></div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-purple-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/placeholder.svg?height=600&width=480"
                  alt="Juan Carlos, coach cristiano para hombres"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <span className="text-purple-900 font-bold">JN</span>
                    </div>
                    <div>
                      <p className="text-white font-bold">Josef Nájera</p>
                      <p className="text-purple-200 text-sm">Creador de contenido Cristiano para Hombres</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="py-12"></div>

      {/* Personal Story Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center">Mi Historia</h2>

            <div className="space-y-24">
              {/* The Beginning - Split Layout */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <Card className="bg-gray-50 border-none shadow-lg h-full">
                    <CardContent className="p-8 md:p-12">
                      <h3 className="text-2xl font-bold text-purple-900 mb-6">El Pecado Me Prometía Placer, pero Me Quitaba Todo</h3>
                      <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                        <p>
                          Me sentía vacío. Sabía que estaba mal, pero no podía parar. Lo hacía en secreto. Y cada vez, con más culpa. La pornografía no solo afectó mi mente.
                        </p>
                        <p>
                          <span className="font-semibold text-gray-900">
                            Me robó mi enfoque, mi energía, mi relación con Dios.
                          </span>{" "}
                          Me quitó la alegría. Me dejó con vergüenza. Empecé a tener miedo. Miedo de que me descubrieran. Miedo de nunca poder salir.
                        </p>
                        <p>
                          Y lo peor: aunque decía que quería cambiar, en el fondo no quería soltarlo. Era mi refugio, mi consuelo falso, mi ídolo disfrazado. Me estaba destruyendo… y yo lo sabía.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src="/placeholder.svg?height=450&width=600"
                      alt="Joven adolescente luchando con tentaciones"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* The Struggle - Split Layout */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src="/placeholder.svg?height=450&width=600"
                      alt="Hombre joven en lucha espiritual"
                      className="w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                  </div>
                </div>
                <div>
                  <Card className="bg-gray-900 text-white border-none shadow-lg h-full">
                    <CardContent className="p-8 md:p-12">
                      <h3 className="text-2xl font-bold text-purple-300 mb-6">La Libertad que Solo Cristo Da</h3>
                      <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                        <p>
                          Después de años de esclavitud, de sentir que nunca iba a cambiar, llegó el momento que cambió mi vida para siempre. Fue una noche como cualquier otra. Caí otra vez. Y entre lágrimas, desesperado, oré como nunca antes. No pedí más fuerza de voluntad. No pedí más motivación. Solo dije: “Dios, ya no puedo solo. Si tú no me liberas, no salgo de esta”.
                        </p>
                        <p className="text-white font-semibold">Y fue ahí donde empezó mi verdadera libertad.</p>
                        <p>
                          Leí un libro que me recomendó un amigo, y algo hizo clic. Me di cuenta de que el problema no era solo el pecado… era que todavía pensaba que lo necesitaba. Pero en Cristo, vi la verdad: ya no soy esclavo. Ya no tengo que ceder. Porque su Espíritu vive en mí.
                        </p>
                        <p>
                          <span className="text-purple-200 font-semibold">Cristo me liberó.</span> Y no solo eso… también me dio propósito: ahora uso mi historia para ayudar a otros hombres a salir de lo mismo. Porque si Él me salvó a mí, también puede hacerlo contigo.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* The Breaking Point - Split Layout */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <Card className="bg-purple-50 border-2 border-purple-900 shadow-lg h-full">
                    <CardContent className="p-8 md:p-12">
                      <h3 className="text-2xl font-bold text-purple-900 mb-6">El Punto de Quiebre</h3>
                      <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                        <p>
                         A los 20 años, después de otra caída más, me quedé en la cama sin fuerzas.
Sentía asco. Culpa. Desesperación.
No podía seguir prometiéndole a Dios que iba a cambiar.

Ya no quería más promesas.
Ya no quería sentirme cristiano a medias.
                        </p>
                        <p className="font-semibold text-purple-900 text-xl">
                          Esa noche, entre lágrimas, no le pedí a Dios fuerza…
le pedí liberación.
                        </p>
                        <p>
                          Le dije: “Dios, si tú no me liberas, me hundo. Ya no puedo más. Ya no quiero esto en mi vida. Si de verdad eres real, quítame esta cadena”.

Y Él respondió.
No fue inmediato, pero fue real.
Desde ese momento, empecé a ver con otros ojos.
Ya no quería luchar para cambiar. Quería estar con Él.
Y eso lo cambió todo.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="aspect-[4/3] bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src="/placeholder.svg?height=450&width=600"
                      alt="Hombre orando en rendición total"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* The Transformation - Split Layout */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="aspect-[4/3] bg-gradient-to-br from-green-50 to-green-100 rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src="/placeholder.svg?height=450&width=600"
                      alt="Hombre libre caminando en victoria"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <Card className="bg-white border-2 border-green-500 shadow-lg h-full">
                    <CardContent className="p-8 md:p-12">
                      <h3 className="text-2xl font-bold text-green-700 mb-6">La Transformación</h3>
                      <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                        <p>
                          Los primeros días fueron intensos.
Pero no difíciles.
Porque por primera vez… la tentación desapareció por completo.
                        </p>
                        <p>Después de leer ese libro, ya no tenía ni ganas de volver a ver pornografía.
No fue un esfuerzo. Fue libertad.
Una libertad tan clara, que casi no lo podía creer.Poco a poco, empecé a entender verdades que siempre estuvieron ahí,
pero que yo nunca había creído de verdad:</p>
                        <ul className="space-y-3 ml-6">
                          <li className="flex items-start">
                            <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                            <span>Mi identidad no estaba en mi pecado, sino en Cristo</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                            <span>La libertad no era ausencia de tentación, sino poder sobre ella</span>
                          </li>
                        </ul>
                        <p className="font-semibold text-green-700 text-xl">
                          Hoy, después de mucho tiempo, puedo decir con total honestidad: soy completamente libre.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="py-16"></div>

      {/* Connection Section - Visual Background */}
      <section className="py-32 bg-gray-900 text-white relative">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/placeholder.svg?height=800&width=1600"
            alt="Hombre en oración"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Heart className="h-16 w-16 text-purple-300 mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-bold mb-12">Lo Sé Porque Estuve Ahí</h2>
            <div className="space-y-8 text-xl text-gray-300 leading-relaxed">
              <p>
               Una noche, después de caer otra vez, me quedé acostado en la cama…
inmóvil. Llorando. Orando sin palabras.
Pensando: “Dios, ya no puedo más. ¿Dónde estás?”
              </p>
              <p className="text-white font-semibold text-2xl">No era la primera vez que prometía cambiar.
Pero esa vez no prometí nada. Solo le dije:</p>
              <p>
                <span className="text-purple-300 font-semibold">“Hazlo tú… porque yo ya no puedo.”</span>Durante años llevé una doble vida:
por fuera parecía tener todo bajo control,
pero por dentro me sentía podrido, esclavo, sin poder decirle a nadie.

Y esa noche, por fin, me rendí.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="py-16"></div>

      {/* Calling Section - Split Layout */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Shield className="h-16 w-16 text-purple-900 mx-auto mb-8" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Mi Propósito</h2>
              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Dios me liberó después de 5 años de esclavitud.
Y cuando por fin respiré libertad, supe que no podía quedarme callado.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="aspect-[4/3] bg-gradient-to-br from-purple-50 to-white rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="/placeholder.svg?height=450&width=600"
                    alt="Juan Carlos mentorando a hombres jóvenes"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="bg-gray-50 border-none shadow-lg">
                    <CardContent className="p-8">
                      <Users className="h-12 w-12 text-purple-900 mb-6" />
                      <h3 className="text-2xl font-bold mb-4">Hombres que han salido</h3>
                      <p className="text-gray-700 leading-relaxed">
                       No soy un influencer ni un coach con frases bonitas.
Soy un hombre libre, ayudando a otros a serlo también.
He visto a decenas romper cadenas,
no por mis consejos…
sino porque Cristo sigue liberando.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-50 border-none shadow-lg">
                    <CardContent className="p-8">
                      <Target className="h-12 w-12 text-purple-900 mb-6" />
                      <h3 className="text-2xl font-bold mb-4">Solo la Verdad transforma</h3>
                      <p className="text-gray-700 leading-relaxed">
                        No uso psicología moderna ni trucos motivacionales.
Lo que enseño viene de la Palabra de Dios
y de mi propia guerra contra el pecado. No te doy teoría, te doy lo que viví.

                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-purple-50 border-2 border-purple-900 shadow-lg">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-purple-900 mb-4">Mi Promesa Para Ti</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Si estás harto de caer, si ya probaste de todo
y no aguantas ni un día más atado,
yo te voy a mostrar el camino.
No porque yo tenga el poder,
sino porque Cristo me liberó a mí…
y puede liberarte a ti también.

Solo necesitas estar listo para rendirte
y dejar que Él haga lo que tú no pudiste.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="py-16"></div>

      {/* CTA Section - Visual Background */}
      <section className="py-32 bg-purple-900 text-white relative">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/placeholder.svg?height=800&width=1600"
            alt="Hombre libre caminando hacia la luz"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/95 to-purple-900"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">¿¿Estás Listo para Salir del Pozo?</h2>
            <p className="text-xl text-purple-100 mb-16 leading-relaxed max-w-3xl mx-auto">
             Si llegaste hasta aquí, no es casualidad.
Dios te está llamando.
Yo estuve donde tú estás: atrapado, frustrado, sintiendo que ya nada funcionaba.
Pero cuando obedecí, todo cambió.
Si tú también estás harto de caer,
si estás listo para tomar en serio tu libertad,
entonces este es tu siguiente paso:
            </p>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="flex items-center justify-center">
                <div className="aspect-square w-full max-w-md bg-white/10 backdrop-blur-sm rounded-full p-8 flex items-center justify-center">
                  <div className="text-center">
                    <Calendar className="h-16 w-16 text-white mx-auto mb-6" />
                    <h3 className="text-2xl font-bold mb-2">Llamada de Mentoría</h3>
                    <p className="text-purple-200">60 minutos que cambiarán tu vida</p>
                  </div>
                </div>
              </div>

              <Card className="bg-white text-gray-900 border-none shadow-2xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-center">Reserva Tu Llamada</h3>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-center">
                      <span className="text-gray-500 line-through text-lg mr-3">$97</span>
                      <span className="text-3xl font-bold text-purple-900">$47</span>
                    </div>
                    <p className="text-sm text-gray-600 text-center">Oferta especial para nuevos clientes</p>
                  </div>

                  <Button
                    onClick={handleBookCall}
                    className="w-full bg-purple-900 hover:bg-purple-800 text-white font-bold py-4 text-lg mb-4"
                    size="lg"
                  >
                    Reservar Mi Llamada Ahora
                    <ArrowRight className="ml-2 h-6 w-6" />
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Pago seguro • Garantía de satisfacción • Disponibilidad limitada
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-16">
              <p className="text-purple-200 text-lg">
                Tu libertad no puede esperar. Cristo ya pagó el precio - ahora es tiempo de caminar en ella.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-8">
              <Cross className="h-8 w-8 text-purple-400 mr-3" />
              <span className="text-xl font-bold">Libertad en Cristo</span>
            </div>
            <p className="text-gray-400 mb-8 text-lg max-w-2xl mx-auto">
              Ayudando a hombres jóvenes a encontrar libertad de la lujuria y la pornografía a través de la fe en
              Jesucristo.
            </p>
            <div className="border-t border-gray-700 pt-8">
              <p className="text-gray-500">
                © {new Date().getFullYear()} Libertad en Cristo. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
