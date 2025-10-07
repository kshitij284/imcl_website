import React from 'react'
import { FileText } from 'lucide-react'

/**
 * Error display component for publication loading errors
 * @param {Object} props
 * @param {string} props.error - Error message to display
 * @param {Function} props.onRetry - Callback function to retry loading
 */
const ErrorDisplay = ({ error, onRetry }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 transition-colors duration-300">
    <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-none w-full">
      <div className="text-red-500 mb-4">
        <FileText className="h-16 w-16 mx-auto" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
        Error Loading Publications
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Please ensure the publications.csv file exists and has the correct
        format.
      </p>
      <button
        onClick={onRetry}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Try Again
      </button>
    </div>
  </div>
)

export default ErrorDisplay
