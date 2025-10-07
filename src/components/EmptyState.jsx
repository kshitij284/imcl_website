import React from 'react'
import { FileText } from 'lucide-react'

/**
 * Empty state component for no publications
 * @param {Object} props
 * @param {string} props.message - Message to display
 */
export const EmptyState = ({ message = 'No publications available' }) => {
  return (
    <div className="text-center py-8">
      <FileText className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
      <p className="text-gray-500 dark:text-gray-400 text-sm">{message}</p>
    </div>
  )
}
