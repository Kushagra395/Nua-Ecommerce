import { useState, useEffect } from 'react'

interface PromoSlide {
  id: number
  title: string
  discount: string
  coupon: string
  description: string
  bgColor: string
}

export function PromoCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides: PromoSlide[] = [
    {
      id: 1,
      title: 'Get 25% Off',
      discount: 'Up To ₹200 Off*',
      coupon: 'MYNTRASAVE',
      description: 'On Your First Order | T&C Apply',
      bgColor: 'from-orange-100 to-pink-100'
    },
    {
      id: 2,
      title: 'Flat 40% Off',
      discount: 'Up To ₹500 Off*',
      coupon: 'MYNTRA40',
      description: 'On All Categories | Limited Time',
      bgColor: 'from-blue-100 to-cyan-100'
    },
    {
      id: 3,
      title: 'Buy More Save More',
      discount: 'Up To ₹1000 Off*',
      coupon: 'SAVEBIG',
      description: 'On Orders Above ₹5000',
      bgColor: 'from-green-100 to-emerald-100'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative h-32 md:h-40 bg-gradient-to-r from-orange-100 to-pink-100 flex items-center justify-center px-6 rounded-2xl mx-4 md:mx-8 my-4 md:my-6">
        {/* Promo Content */}
        <div className="w-full">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`transition-opacity duration-1000 ${
                idx === currentSlide ? 'opacity-100' : 'opacity-0 absolute'
              }`}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Left Content */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl md:text-4xl font-bold text-orange-600">
                    {slide.title}
                  </h3>
                  <p className="text-lg md:text-2xl text-gray-700 font-semibold">
                    {slide.discount}
                  </p>
                </div>

                {/* Center Coupon */}
                <div className="bg-white rounded-lg px-6 py-3 text-center">
                  <p className="text-xs text-gray-500 font-semibold">COUPON CODE</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900">{slide.coupon}</p>
                </div>

                {/* Right Decoration */}
                <div className="hidden md:flex items-center justify-center">
                  <div className="text-6xl font-bold text-purple-300 opacity-50">%</div>
                </div>
              </div>

              <p className="text-sm text-gray-600 text-center md:text-left mt-2">
                {slide.description}
              </p>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentSlide ? 'bg-gray-400 w-6' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
