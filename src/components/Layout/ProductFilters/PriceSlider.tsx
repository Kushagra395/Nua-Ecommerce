"use client"

import type React from "react"
import { useState, useCallback } from "react"

interface PriceSliderProps {
  minPrice: number
  maxPrice: number
  minBound: number
  maxBound: number
  onChange: (min: number, max: number) => void
}

export function PriceSlider({ minPrice, maxPrice, minBound, maxBound, onChange }: PriceSliderProps) {
  const [localMin, setLocalMin] = useState(minPrice)
  const [localMax, setLocalMax] = useState(maxPrice)

  const handleMinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.min(Number(e.target.value), localMax - 1)
      setLocalMin(value)
    },
    [localMax],
  )

  const handleMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(Number(e.target.value), localMin + 1)
      setLocalMax(value)
    },
    [localMin],
  )

  const handleApply = () => {
    onChange(localMin, localMax)
  }

  const minPercent = ((localMin - minBound) / (maxBound - minBound)) * 100
  const maxPercent = ((localMax - minBound) / (maxBound - minBound)) * 100

  return (
    <div className="space-y-3">
      {/* Display values */}
      <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
        <span>${localMin}</span>
        <span>${localMax}</span>
      </div>

      {/* Slider */}
      <div className="relative h-8 flex items-center">
        {/* Background track */}
        <div className="absolute w-full h-1 bg-gray-200 rounded-full"></div>

        {/* Highlight track */}
        <div
          className="absolute h-1 bg-blue-600 rounded-full"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
        ></div>

        {/* Min range */}
        <input
          type="range"
          min={minBound}
          max={maxBound}
          value={localMin}
          onChange={handleMinChange}
          className="absolute w-full appearance-none bg-transparent cursor-pointer z-10"
          aria-label="Minimum price"
        />

        {/* Max range */}
        <input
          type="range"
          min={minBound}
          max={maxBound}
          value={localMax}
          onChange={handleMaxChange}
          className="absolute w-full appearance-none bg-transparent cursor-pointer z-10"
          aria-label="Maximum price"
        />
      </div>

      {/* Apply button */}
      <button
        onClick={handleApply}
        className="w-full px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
      >
        Apply Price
      </button>

      {/* Slider Thumb Styles */}
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 18px;
          width: 18px;
          background: #2563eb;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
        }
        input[type="range"]::-moz-range-thumb {
          height: 18px;
          width: 18px;
          background: #2563eb;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
        }
      `}</style>
    </div>
  )
}