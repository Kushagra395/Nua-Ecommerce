import { Github, Linkedin, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Brand */}
          <div className="flex flex-col">
            <Link to="/" className="inline-block mb-1">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 bg-clip-text text-transparent tracking-tight">
              Nua Store
              </span>
            </Link>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Modern e-commerce platform built with React and TypeScript.
            </p>
          </div>

          {/* Links and Social */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Contact Us */}
            <a
              href="mailto:contact@nua.com"
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Us</span>
            </a>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="GitHub"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 dark:border-gray-700 pt-6 mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2025 nua. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
