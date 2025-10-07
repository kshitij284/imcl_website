import React from 'react'

/**
 * Loading spinner component
 * @param {Object} props
 * @param {string} props.message - Loading message
 * @param {string} props.size - Size of spinner ('sm', 'md', 'lg')
 */
export const LoadingSpinner = ({ message = 'Loading...', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  return (
    <div className="text-center py-6">
      <div
        className={`animate-spin rounded-full border-b-2 border-purple-600 mx-auto ${sizeClasses[size]}`}
      ></div>
      <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">{message}</p>
    </div>
  )
}
