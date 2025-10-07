import React from 'react'
import { FileText, ExternalLink, Calendar, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { usePublications } from '../hooks/usePublication'
import {
  formatDate,
  formatAuthors,
  getPubMedUrl,
  getRecentPublications,
} from '../utils/publicationUtils'
import { LoadingSpinner } from './LoadingSpinner'
import { EmptyState } from './EmptyState'

const Introduction = () => {
  const { publications, loading } = usePublications()
  const recentPublications = getRecentPublications(publications, 3)

  return (
    <section
      id="Introduction"
      className="bg-gradient-to-r from-blue-50 to-purple-50 
                 dark:from-gray-800 dark:to-gray-900 
                 transition-colors duration-300"
    >
      {/* Announcement Bar - Full Width */}
      <div className="w-full bg-blue-600 dark:bg-blue-700 text-white py-2 px-4 shadow-sm">
        <div className="flex items-center justify-center space-x-2">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          <p className="text-sm font-medium">
            Registration is now open for Summer School 2026!
          </p>
          <a
            href="#SummerSchool"
            className="text-blue-200 hover:text-white underline text-sm font-semibold transition-colors duration-200"
          >
            Register →
          </a>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Left Column - Welcome Message */}
          <div className="flex flex-col justify-center text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Welcome
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              In our research unit, we use an integrative model-based cognitive
              neuroscience approach to gain a mechanistic understanding of
              cognitive processes such as decision-making and how they are
              implemented in the healthy and diseased brain.
            </p>
          </div>

          {/* Right Column - Recent Publications */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-colors duration-300">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
                Recent Publications
              </h3>

              {loading ? (
                <LoadingSpinner size="md" />
              ) : recentPublications.length > 0 ? (
                <div className="space-y-4">
                  {recentPublications.map((pub) => (
                    <article
                      key={pub.id}
                      className="pb-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 last:pb-0"
                    >
                      <a
                        href={pub.link || getPubMedUrl(pub.pubmedId)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-2 line-clamp-2">
                          {pub.title || 'Untitled Publication'}
                        </h4>

                        <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mb-1.5">
                          <Users className="h-3 w-3 mr-1.5 flex-shrink-0" />
                          <span className="line-clamp-1">
                            {formatAuthors(pub.authors)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <Calendar className="h-3 w-3 mr-1.5" />
                            <span>{formatDate(pub.date)}</span>
                          </div>
                          <ExternalLink className="h-3.5 w-3.5 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                        </div>
                      </a>
                    </article>
                  ))}
                </div>
              ) : (
                <EmptyState message="No publications available" />
              )}

              <Link
                to="/publications"
                className="mt-4 inline-block text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors"
              >
                View all publications →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Introduction
