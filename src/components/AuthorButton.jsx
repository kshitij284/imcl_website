// File: src/components/AuthorButton.jsx
import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Author button component for filtering publications by author
 * @param {Object} props
 * @param {string} props.authorName - Name of the author
 */
export const AuthorButton = ({ authorName }) => {
  const getDisplayName = (name) => {
    if (name.includes(',')) {
      const parts = name.split(',')
      if (parts.length >= 2) {
        return `${parts[1].trim()} ${parts[0].trim()}`
      }
    }
    return name
  }

  // Create URL with author as query parameter
  const authorFilterUrl = `/publications?author=${encodeURIComponent(
    authorName
  )}`

  return (
    <Link
      to={authorFilterUrl}
      className="inline-flex items-center px-3 py-1 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-700 hover:text-blue-800 transition-colors m-1"
      onClick={(e) => e.stopPropagation()}
    >
      {getDisplayName(authorName)}
    </Link>
  )
}

export default AuthorButton
