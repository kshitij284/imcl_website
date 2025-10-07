// File: src/components/PublicationCard.jsx
import React from 'react'
import { Calendar, Users } from 'lucide-react'
import {
  formatDate,
  parseAuthors,
  getPubMedUrl,
} from '../utils/publicationUtils'
import { AuthorButton } from './AuthorButton'

/**
 * Publication card component displaying a single publication
 * @param {Object} props
 * @param {Object} props.publication - Publication object
 */
const PublicationCard = ({ publication }) => {
  const authorList = parseAuthors(publication.authors)
  const showEtAl = authorList.length > 5
  const displayedAuthors = showEtAl ? authorList.slice(0, 3) : authorList
  const remainingAuthors = showEtAl ? authorList.slice(3).join(', ') : ''

  return (
    <article className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="p-6 w-full">
        {/* Title and Date */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3 w-full">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-relaxed hover:text-blue-700 dark:hover:text-blue-400 transition-colors flex-1 min-w-0">
            <a
              href={publication.link || getPubMedUrl(publication.pubmedId)}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline break-words"
            >
              {publication.title || 'Untitled Publication'}
            </a>
          </h2>
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 flex-shrink-0 mt-2 sm:mt-0">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(publication.date)}</span>
          </div>
        </div>

        {/* Authors */}
        <div className="mb-4 w-full">
          {authorList.length > 0 ? (
            <div className="flex flex-wrap items-center">
              <Users className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
              {displayedAuthors.map((author, index) => (
                <AuthorButton key={index} authorName={author} />
              ))}
              {showEtAl && (
                <span
                  className="text-gray-600 dark:text-gray-300 ml-1 cursor-pointer"
                  title={remainingAuthors}
                >
                  et al.
                </span>
              )}
            </div>
          ) : (
            <span className="text-gray-500 dark:text-gray-400">
              Authors not listed
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

export default PublicationCard
