"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Each slide now has image, brand logo, offer text, and CTA - clean side-by-side composition
  const slides = [
    {
      id: 1,
      image: "/fwd-fashion-brand-yellow-casual.jpg",
      brandLogo: "fwd",
      brandName: "FWD",
      mainText: "Gen-Z Fashion For All",
      offer: "UNDER ₹999",
      cta: "Shop Now",
      bgColor: "from-yellow-50 to-amber-50",
    },
    {
      id: 2,
      image: "/us-polo-association-men-beach.jpg",
      brandLogo: "polo",
      brandName: "U.S. POLO ASSN.",
      mainText: "Premium Casual Wear",
      offer: "Up To 50% Off",
      cta: "Explore",
      bgColor: "from-blue-50 to-cyan-50",
    },
    {
      id: 3,
      image: "/luxury-handbags-leather-brown.jpg",
      brandLogo: "haute",
      brandName: "Haute Sauce",
      mainText: "Handbags",
      offer: "50–70% Off",
      cta: "Explore",
      bgColor: "from-emerald-50 to-teal-50",
    },
    {
      id: 4,
      image: "/premium-watches-lifestyle-product.jpg",
      brandLogo: "watch",
      brandName: "Premium Timepieces",
      mainText: "Elegance on Your Wrist",
      offer: "UP TO 80% OFF",
      cta: "Shop Now",
      bgColor: "from-slate-50 to-gray-50",
    },
  ]

  const startAutoplay = () => {
    autoplayIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3500)
  }

  useEffect(() => {
    startAutoplay()
    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current)
      }
    }
  }, [])

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    startAutoplay()
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current)
    }
    startAutoplay()
  }

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length)
  }

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative w-full overflow-hidden" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="relative w-full h-48 sm:h-56 md:h-96 lg:h-[450px] overflow-hidden">
        {slides.map((slide, idx) => {
          const isActive = idx === currentSlide
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor}`} />

              <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center">
                {/* Image section - left on desktop, top on mobile */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center overflow-hidden">
                  <img
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.brandName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content section - right on desktop, bottom on mobile */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col items-start justify-center px-6 sm:px-8 md:px-10 lg:px-16 py-4 md:py-0">
                  <span className="text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2 md:mb-3">
                    {slide.brandLogo}
                  </span>

                  {/* Brand name - bold and premium */}
                  <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 md:mb-2 leading-tight">
                    {slide.brandName}
                  </h2>

                  {/* Main promotional text */}
                  <p className="text-sm md:text-base lg:text-lg text-gray-700 mb-3 md:mb-4">{slide.mainText}</p>

                  <div className="mb-4 md:mb-6">
                    <p className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900">{slide.offer}</p>
                  </div>

                  <button className="px-6 md:px-8 py-2.5 md:py-3 bg-white text-gray-900 font-bold text-sm md:text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                    {slide.cta} →
                  </button>
                </div>
              </div>
            </div>
          )
        })}

        <button
          onClick={prevSlide}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-gray-900/20 hover:bg-gray-900/40 transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-gray-900/20 hover:bg-gray-900/40 transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        <div className="absolute bottom-3 md:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`transition-all duration-500 rounded-full ${
                idx === currentSlide ? "bg-gray-900 w-8 h-2.5" : "bg-gray-300 hover:bg-gray-400 w-2 h-2"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={idx === currentSlide ? "true" : "false"}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
