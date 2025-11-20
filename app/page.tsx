import React from 'react'

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="p-8">
        <h1 className="text-4xl font-bold text-white mb-4">nua-ecom-frontend</h1>
        <p className="text-gray-400 mb-6">Vite React project with TypeScript</p>
        
        <div className="bg-gray-800 p-6 rounded-lg max-w-2xl">
          <h2 className="text-xl font-semibold text-white mb-4">Project Installed</h2>
          <p className="text-gray-300 mb-4">This is a standalone Vite React project. To run it locally:</p>
          <pre className="bg-gray-900 p-4 rounded text-green-400 overflow-x-auto mb-4">
{`npm install
npm run dev`}
          </pre>
          <p className="text-gray-400 text-sm">The project includes:</p>
          <ul className="text-gray-400 text-sm mt-2 space-y-1">
            <li>✓ TypeScript configuration</li>
            <li>✓ Tailwind CSS + DaisyUI</li>
            <li>✓ React Router v6</li>
            <li>✓ Redux Toolkit & React-Query</li>
            <li>✓ Axios, Zod, React-Hook-Form</li>
            <li>✓ Husky pre-commit hooks</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
