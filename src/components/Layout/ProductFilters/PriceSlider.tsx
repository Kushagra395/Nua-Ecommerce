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

  // Calculate percentage for visual track fill
  const minPercent = ((localMin - minBound) / (maxBound - minBound)) * 100
  const maxPercent = ((localMax - minBound) / (maxBound - minBound)) * 100

  return (
    <div className="space-y-3">
      {/* Labels showing current values */}
      <div className="flex justify-between text-sm font-medium text-gray-700">
        <span>${localMin}</span>
        <span>${localMax}</span>
      </div>

      {/* Slider Container */}
      <div className="relative h-8 flex items-center">
        {/* Background track */}
        <div className="absolute w-full h-1 bg-gray-200 rounded-full"></div>

        {/* Filled track between handles */}
        <div
          className="absolute h-1 bg-blue-600 rounded-full"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
        ></div>

        {/* Min handle */}
        <input
          type="range"
          min={minBound}
          max={maxBound}
          value={localMin}
          onChange={handleMinChange}
          className="absolute w-full h-1 appearance-none bg-transparent cursor-pointer pointer-events-none z-10"
          style={{
            WebkitAppearance: "slider-horizontal",
          }}
          aria-label="Minimum price"
          aria-valuemin={minBound}
          aria-valuemax={maxBound}
          aria-valuenow={localMin}
          aria-valuetext={`$${localMin}`}
        />

        {/* Max handle */}
        <input
          type="range"
          min={minBound}
          max={maxBound}
          value={localMax}
          onChange={handleMaxChange}
          className="absolute w-full h-1 appearance-none bg-transparent cursor-pointer pointer-events-none z-10"
          style={{
            WebkitAppearance: "slider-horizontal",
          }}
          aria-label="Maximum price"
          aria-valuemin={minBound}
          aria-valuemax={maxBound}
          aria-valuenow={localMax}
          aria-valuetext={`$${localMax}`}
        />
      </div>

      {/* Apply button */}
      <button
        onClick={handleApply}
        className="w-full px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
        aria-label="Apply price filter"
      >
        Apply Price
      </button>
    </div>
  )
}
