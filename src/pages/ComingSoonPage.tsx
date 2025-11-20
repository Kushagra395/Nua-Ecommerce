"use client"

import { Link } from "react-router-dom"
import { ArrowLeft, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ComingSoonPageProps {
  feature?: string
}

export function ComingSoonPage({ feature = "This feature" }: ComingSoonPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>

        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 dark:bg-blue-600 rounded-full opacity-20 animate-pulse"></div>
            <div className="relative bg-blue-500 dark:bg-blue-600 rounded-full p-6">
              <Clock className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Coming Soon
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
          {feature} is under development
        </p>
        <p className="text-base text-gray-500 dark:text-gray-500 mb-8 max-w-md mx-auto">
          We're working hard to bring you something amazing. Stay tuned for updates!
        </p>

        {/* Notify Me Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-blue-500 dark:text-blue-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Get Notified When We Launch
            </h2>
          </div>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
            />
            <Button
              type="submit"
              className="bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Notify Me
            </Button>
          </form>
        </div>

        {/* Additional Links */}
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <Link
            to="/"
            className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
          >
            Continue Shopping
          </Link>
          <span className="text-gray-400 dark:text-gray-600">•</span>
          <Link
            to="/wishlist"
            className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
          >
            View Wishlist
          </Link>
          <span className="text-gray-400 dark:text-gray-600">•</span>
          <Link
            to="/cart"
            className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
          >
            Shopping Bag
          </Link>
        </div>
      </div>
    </div>
  )
}
