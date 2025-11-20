"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null)

  
  const slides = [
    {
      id: 1,
      image: "/Bannerpg/womenbanner.jpg",
      brandLogo: "nua",
      brandName: "Women's Collection",
      mainText: "Discover the latest trends in women's fashion",
      offer: "UP TO 40% OFF",
      cta: "Shop Now",
      bgColor: "from-pink-50 to-rose-50",
      objectPosition: "center",
      link: "/category/womens-wear",
    },
    {
      id: 2,
      image: "/Bannerpg/menbanner.jpg",
      brandLogo: "nua",
      brandName: "Men's Collection",
      mainText: "Premium casual wear for the modern man",
      offer: "UP TO 50% OFF",
      cta: "Explore",
      bgColor: "from-blue-50 to-cyan-50",
      objectPosition: "center",
      link: "/category/mens-wear",
    },
    {
      id: 3,
      image: "/Bannerpg/bagbanner.jpg",
      brandLogo: "nua",
      brandName: "Bags & Backpacks",
      mainText: "Travel in style with our premium collection",
      offer: "50–70% OFF",
      cta: "Explore",
      bgColor: "from-emerald-50 to-teal-50",
      objectPosition: "center right",
      link: "/category/backpacks-bags",
    },
    {
      id: 4,
      image: "/Bannerpg/jewerllybanner.jpg",
      brandLogo: "nua",
      brandName: "Jewellery Collection",
      mainText: "Elegant pieces to complete your look",
      offer: "UP TO 30% OFF",
      cta: "Shop Now",
      bgColor: "from-amber-50 to-yellow-50",
      objectPosition: "center",
      link: "/category/jewellery",
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
    <div className="relative w-full overflow-hidden bg-gray-50 dark:bg-gray-900" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} dark:opacity-80`} />

              <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center">
                {/* Image section - left on desktop, top on mobile */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.brandName}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: slide.objectPosition || "center" }}
                    loading={idx === 0 ? "eager" : "lazy"}
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

                  <Link 
                    to={slide.link}
                    className="inline-block px-6 md:px-8 py-2.5 md:py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm md:text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    {slide.cta} →
                  </Link>
                </div>
              </div>
            </div>
          )
        })}

        <button
          onClick={prevSlide}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-gray-900/20 dark:bg-white/20 hover:bg-gray-900/40 dark:hover:bg-white/40 transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white dark:text-gray-900" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-gray-900/20 dark:bg-white/20 hover:bg-gray-900/40 dark:hover:bg-white/40 transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white dark:text-gray-900" />
        </button>

        <div className="absolute bottom-3 md:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`transition-all duration-500 rounded-full ${
                idx === currentSlide 
                  ? "bg-gray-900 dark:bg-white w-8 h-2.5" 
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 w-2 h-2"
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
