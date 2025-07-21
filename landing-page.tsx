"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Cross, Shield, Heart, ArrowRight, Mail, Quote } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function Component() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [validationErrors, setValidationErrors] = useState<{
    fullName?: string
    email?: string
  }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMenuHovered, setIsMenuHovered] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Form validation
  const validateForm = () => {
    const errors: { fullName?: string; email?: string } = {}

    if (!fullName.trim()) {
      errors.fullName = "El nombre completo es requerido"
    }

    if (!email.trim()) {
      errors.email = "El correo electrónico es requerido"
    } else if (!validateEmail(email)) {
      errors.email = "Por favor ingresa un correo electrónico válido"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError("")

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Envía los datos a tu webhook de n8n
      await fetch("https://n8n-railway-josef-production.up.railway.app/webhook/enviar-guia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
        }),
      })

      // Redirect to thank you page instead of showing inline success
      window.location.href = "/thank-you"
    } catch (error) {
      setSubmitError("Hubo un error. Por favor, inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
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

  // Loading Spinner Component
  const LoadingSpinner = () => (
    <div className="inline-flex items-center">
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      Enviando...
    </div>
  )

  // Add this style to the component
  const fadeInStyle = `
    @keyframes fade-in {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-fade-in {
      animation: fade-in 0.5s ease-out;
    }
  `

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

      {/* Hero Section - Split Layout */}
      <section id="inicio" className="py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Content */}
            <div className="space-y-8 z-10">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Dejar la lujuria es mucho más fácil
                  <span className="block text-purple-900">de lo que crees con ayuda de Cristo...</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                  Si sigues cayendo, no es porque seas débil. Es porque no te has dado cuenta de que
                  <span className="font-semibold text-purple-900"> no necesitas</span>. seguir ahí. Cristo puede
                  liberarte completamente.
                </p>
              </div>

              <Card className="bg-white border-2 border-purple-900 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Mail className="h-6 w-6 text-purple-900 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">Recibe la guía gratis</h3>
                  </div>
                  <p className="text-gray-700 mb-6 text-lg">
                    <span className="font-semibold">Una guía paso a paso para dejar la lujuria desde la raíz.</span> -
                    Sin fuerza de voluntad. Solo verdad, convicción... y Jesús.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name Field */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre Completo *
                      </label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Tu nombre completo"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        disabled={isLoading}
                        className={`w-full text-lg py-4 transition-all duration-300 ${
                          isLoading ? "opacity-50 cursor-not-allowed" : ""
                        } ${validationErrors.fullName ? "border-red-500 focus:border-red-500" : ""}`}
                      />
                      {validationErrors.fullName && (
                        <p className="text-red-600 text-sm mt-1">{validationErrors.fullName}</p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Correo Electrónico *
                      </label>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          placeholder="tu@correo.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={isLoading}
                          className={`w-full text-lg py-4 transition-all duration-300 ${
                            isLoading ? "opacity-50 cursor-not-allowed" : ""
                          } ${validationErrors.email ? "border-red-500 focus:border-red-500" : ""}`}
                        />
                        {isLoading && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div className="animate-spin h-5 w-5 border-2 border-purple-900 border-t-transparent rounded-full"></div>
                          </div>
                        )}
                      </div>
                      {validationErrors.email && <p className="text-red-600 text-sm mt-1">{validationErrors.email}</p>}
                    </div>

                    <Button
                      type="submit"
                      className={`w-full font-bold py-4 text-lg transition-all duration-300 ${
                        isLoading ? "bg-purple-700 cursor-not-allowed" : "bg-purple-900 hover:bg-purple-800"
                      } text-white`}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <LoadingSpinner />
                      ) : (
                        <>
                          Obtener Guía Gratuita
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>

                    {submitError && (
                      <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200">
                        {submitError}
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="relative aspect-[4/5] bg-gradient-to-br from-purple-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl">
              {/* Imagen de fondo */}
              <img
                src="http://media.josefnajera.com/fotos-web/discipline-praying.jpg"
                alt="Hombre joven orando"
                className="w-full h-full object-cover opacity-80"
                draggable={false}
              />
              {/* Overlay degradado */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent"></div>
              {/* Texto en la parte inferior */}
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-white text-lg font-medium">"Donde está el Espíritu del Señor, allí hay libertad"</p>
                <p className="text-purple-200 text-sm mt-1">- 2 Corintios 3:17</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="py-16"></div>

      {/* Pain Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side – Image */}
            <div className="order-2 lg:order-1">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://media.josefnajera.com/fotos-web/discipline-sad.jpg"
                  alt="Hombre joven luchando con adicción, sintiendo vergüenza y soledad"
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-gray-900/80" />
              </div>
            </div>

            {/* Right Side – Content */}
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Sabes que no puedes seguir así. Pero tampoco sabes cómo salir.
              </h2>

              <div className="space-y-8">
                <div className="border-l-4 border-purple-400 pl-8">
                  <h3 className="text-2xl font-bold mb-4 text-purple-300">Yo también fui ese tipo atrapado.</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Que pedía perdón, lloraba, prometía, y al día siguiente estaba otra vez cayendo. Un ciclo que no se
                    detiene.
                  </p>
                </div>

                <div className="border-l-4 border-purple-400 pl-8">
                  <h3 className="text-2xl font-bold mb-4 text-purple-300">Te sientes miserable.</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Una mezcla de culpa, vergüenza y sin poder controlarte a ti mismo. Pero lo más duro en el fondo es
                    que...
                  </p>
                </div>

                <div className="border-l-4 border-purple-400 pl-8">
                  <h3 className="text-2xl font-bold mb-4 text-purple-300">No quieres dejar la lujuria.</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Piensas que al dejarla vas a perder algo. Una sensación. Una válvula de escape. Una parte de ti. Y
                    mientras sigas creyendo eso, vas a seguir atrapado.
                  </p>
                </div>
              </div>

              <div className="bg-purple-900/30 p-8 rounded-xl border border-purple-700">
                <p className="text-xl text-purple-200 font-medium text-center">
                  “Huye también de las pasiones juveniles, y sigue la justicia, la fe, el amor y la paz...” — 2 Timoteo
                  2:22
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="py-16"></div>

      {/* Promise Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Content */}
            <div className="space-y-8">
              <div className="flex items-center space-x-4 mb-8">
                <Shield className="h-12 w-12 text-purple-900" />
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  No estás dejando nada, estás ganando todo.
                </h2>
              </div>

              <p className="text-xl text-gray-700 leading-relaxed">
                La lujuria no te da nada. Solo te esclaviza. Solo te corrompe. No te relaja. No te libera. No te ayuda a
                amar más. Al contrario.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl">
                  <Cross className="h-8 w-8 text-purple-900 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">La lujuria NO te da nada</h3>
                    <p className="text-gray-700">
                      La lujuria no te da nada. Solo te esclaviza. Solo te corrompe. No te relaja. No te libera. No te
                      ayuda a amar más. Al contrario. “Huyan de la inmoralidad sexual. Todos los demás pecados que una
                      persona comete quedan fuera de su cuerpo; pero el que comete inmoralidades sexuales, peca contra
                      su propio cuerpo.” — 1 Corintios 6:18
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl">
                  <Shield className="h-8 w-8 text-purple-900 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Córtalo de raíz y aléjate de la lujuria</h3>
                    <p className="text-gray-700">
                      Cristo no te pide que luches con fuerza de voluntad. Te pide que cortes de raíz. Y te alejes de la
                      lujuria. “Si tu ojo derecho te hace caer en pecado, sácatelo y tíralo. Más te vale perder una
                      parte de tu cuerpo que ser arrojado con todo tu cuerpo al infierno.” — Mateo 5:29
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl">
                  <Heart className="h-8 w-8 text-purple-900 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Date cuenta con que caes y evítalo</h3>
                    <p className="text-gray-700">
                      ¿Tu teléfono? ¿Una cuenta de Instagram? ¿Una conversación que alimenta tu carne? Córtala. “Si tu
                      ojo derecho te hace caer en pecado, sácatelo y tíralo. Más te vale perder una parte de tu cuerpo
                      que ser arrojado con todo tu cuerpo al infierno.” — Mateo 5:29
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-8 rounded-xl border-l-4 border-purple-900">
                <p className="text-lg text-gray-800 italic mb-2">
                  "Por tanto, si alguno está en Cristo, es una nueva creación; lo viejo pasó, he aquí todo es hecho
                  nuevo."
                </p>
                <p className="text-purple-900 font-bold">- 2 Corintios 5:17</p>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-purple-100 to-white rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://media.josefnajera.com/fotos-web/discipline-sad2.jpg"
                  alt="Hombre libre, caminando en la luz de Cristo, con esperanza y propósito"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="py-16"></div>

      {/* Testimony Section */}
      <section id="testimonio" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Image */}
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-gray-200 to-gray-100 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://media.josefnajera.com/fotos-web/yofeli-edited.jpg"
                  alt="Josef Nájera, creador de contenido Cristiano"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg border-2 border-purple-900">
                <p className="text-purple-900 font-bold text-lg">Libre</p>
                <p className="text-gray-700 text-sm">con pecado limpio en Cristo</p>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Mi Historia de Libertad</h2>
                <div className="flex items-center mb-8">
                  <div
                    className="w-16 h-16 bg-purple-900 rounded-full flex items-center justify-
center mr-4"
                  >
                    <span className="text-white font-bold text-xl">JN</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Josef Nájera</h3>
                    <p className="text-gray-600">Creador de contenido Cristiano</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  <span className="font-semibold text-purple-900">
                    Durante más de 3 años, fui esclavo de la pornografía.
                  </span>{" "}
                  Por años me repetí que estaba luchando. Pero en realidad, solo estaba justificando mis recaídas. Veía
                  a mujeres con lujuria. Me masturbaba y luego lloraba. Y lo llamaba “una batalla”. Hasta que Cristo me
                  mostró que no estaba batallando.
                </p>

                <b>Estaba obedeciendo a mi carne.</b>

                <p>
                  Hoy entiendo que no necesitaba fuerza de voluntad. Solo necesitaba ver la verdad. Darme cuenta de que
                  no gano nada en el pecado y gano todo con Él.
                </p>

                <div className="bg-white p-6 rounded-xl border-l-4 border-purple-900">
                  <p className="font-semibold text-purple-900 text-xl mb-2">Dios me limpió.</p>
                  <p>
                    “Pero fornicación y toda inmundicia… ni aun se nombre entre vosotros, como conviene a santos.” —
                    Efesios 5:3
                  </p>
                </div>

                <p className="font-semibold text-gray-900">
                  Hoy, después de mucho tiempo sin siquiera quererlo, puedo decirte que la victoria es posible. No
                  porque yo sea especial, sino porque Cristo lo es.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="py-16"></div>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Lo Que Dicen Otros Hombres</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Miles de hombres han encontrado libertad. Estas son algunas de sus historias.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="bg-gray-50 border-none shadow-lg">
              <CardContent className="p-8">
                <Quote className="h-8 w-8 text-purple-900 mb-4" />
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  "Después de 10 años luchando solo, encontré en Juan Carlos no solo un coach, sino un hermano que
                  entendía mi dolor. Hoy llevo 2 años libre y mi matrimonio se ha restaurado completamente."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-900 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">M</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Miguel R.</p>
                    <p className="text-gray-600 text-sm">Casado, 32 años</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 border-none shadow-lg">
              <CardContent className="p-8">
                <Quote className="h-8 w-8 text-purple-900 mb-4" />
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  "Pensé que nunca podría ser libre. La guía me ayudó a entender que mi identidad no estaba en mi
                  pecado. Cristo me ha dado una nueva vida y ahora ayudo a otros jóvenes en mi iglesia."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-900 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">D</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">David L.</p>
                    <p className="text-gray-600 text-sm">Estudiante, 24 años</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="py-16"></div>

      {/* Final CTA Section */}
      <section id="guia" className="py-24 bg-purple-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              ¿Vas a seguir "sobreviviendo" o vas a empezar a obedecer?
            </h2>
            <p className="text-xl mb-16 max-w-3xl mx-auto text-purple-100 leading-relaxed">
              No necesitas seguir con culpa. No necesitas seguir “intentando”. Necesitas decidir. Ver la verdad. Y dejar
              que Cristo te libere por completo.{" "}
              <span className="font-semibold text-white">Descarga la guía ahora</span> y da el primer paso hacia tu
              libertad.
            </p>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Benefits */}
              <div className="text-left space-y-6">
                <h3 className="text-2xl font-bold mb-6">"Guía para dejar la lujuria"</h3>
                <p className="text-purple-100 mb-8 text-lg">Un plan práctico y bíblico que te ayudará a:</p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <ArrowRight className="h-5 w-5 text-purple-300 mr-4 flex-shrink-0" />
                    <span className="text-lg">Entender la raíz espiritual de la adicción</span>
                  </div>
                  <div className="flex items-center">
                    <ArrowRight className="h-5 w-5 text-purple-300 mr-4 flex-shrink-0" />
                    <span className="text-lg">Desarrollar estrategias bíblicas para escapar</span>
                  </div>
                  <div className="flex items-center">
                    <ArrowRight className="h-5 w-5 text-purple-300 mr-4 flex-shrink-0" />
                    <span className="text-lg">Construir una identidad sólida en Cristo</span>
                  </div>
                  <div className="flex items-center">
                    <ArrowRight className="h-5 w-5 text-purple-300 mr-4 flex-shrink-0" />
                    <span className="text-lg">Crear un plan de acción personalizado</span>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <Card className="bg-white text-gray-900 border-none shadow-2xl">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <Mail className="h-8 w-8 text-purple-900 mx-auto mb-4" />
                    <h4 className="text-xl font-bold">Obtenla Inmediatamente</h4>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name Field */}
                    <div>
                      <label htmlFor="ctaFullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre Completo *
                      </label>
                      <Input
                        id="ctaFullName"
                        type="text"
                        placeholder="Tu nombre completo"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        disabled={isLoading}
                        className={`w-full text-lg py-4 transition-all duration-300 ${
                          isLoading ? "opacity-50 cursor-not-allowed" : ""
                        } ${validationErrors.fullName ? "border-red-500 focus:border-red-500" : ""}`}
                      />
                      {validationErrors.fullName && (
                        <p className="text-red-600 text-xs mt-1">{validationErrors.fullName}</p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="ctaEmail" className="block text-sm font-medium text-gray-700 mb-1">
                        Correo Electrónico *
                      </label>
                      <div className="relative">
                        <Input
                          id="ctaEmail"
                          type="email"
                          placeholder="tu@correo.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={isLoading}
                          className={`w-full text-lg py-4 transition-all duration-300 ${
                            isLoading ? "opacity-50 cursor-not-allowed" : ""
                          } ${validationErrors.email ? "border-red-500 focus:border-red-500" : ""}`}
                        />
                        {isLoading && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div className="animate-spin h-5 w-5 border-2 border-purple-900 border-t-transparent rounded-full"></div>
                          </div>
                        )}
                      </div>
                      {validationErrors.email && <p className="text-red-600 text-xs mt-1">{validationErrors.email}</p>}
                    </div>

                    <Button
                      type="submit"
                      className={`w-full font-bold py-4 text-lg transition-all duration-300 ${
                        isLoading ? "bg-purple-700 cursor-not-allowed" : "bg-purple-900 hover:bg-purple-800"
                      } text-white`}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <LoadingSpinner />
                      ) : (
                        <>
                          Obtén la Guía Gratuita Ahora
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>

                    {submitError && (
                      <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200">
                        {submitError}
                      </div>
                    )}
                  </form>

                  <p className="text-xs text-gray-500 mt-4 text-center">
                    Respetamos tu privacidad. No compartimos tu información con terceros.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-16 text-center">
              <p className="text-purple-200 text-xl font-medium">
                Cientos de hombres ya han encontrado libertad. Tú puedes ser el siguiente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-8">
              <Cross className="h-10 w-10 text-purple-400 mr-3" />
              <span className="text-2xl font-bold">Libertad en Cristo</span>
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
