import React from 'react'
import { Globe } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-2">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">IMCN</span>
          </div>
          <p className="text-gray-400">© 2025 IMCN. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
