import React, { useState, useMemo } from 'react'
import PageHeader from '../components/PageHeader'
import {
  ExternalLink,
  Calendar,
  Users,
  FileText,
  Search,
  ChevronUp,
  ChevronDown,
  X,
} from 'lucide-react'
import { usePublications } from '../hooks/usePublication'
import {
  formatDate,
  parseAuthors,
  getPubMedUrl,
  sortPublications,
} from '../utils/publicationUtils'
import { AuthorButton } from '../components/AuthorButton'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { EmptyState } from '../components/EmptyState'

// ErrorDisplay Component
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

// SearchAndControls Component
const SearchAndControls = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  publicationsCount,
  filteredCount,
  activeFilters,
  clearFilters,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8 transition-colors duration-300">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 min-w-0 max-w-full">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search publications, authors or PubMed ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-300"
            style={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
            title={searchTerm}
          />
        </div>

        {/* Sort Controls */}
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:flex-initial">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 transition-colors duration-300"
            >
              <option value="date">Year</option>
              <option value="title">Title</option>
              <option value="authors">Authors</option>
              <option value="journal">Journal</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 flex items-center justify-center transition-colors duration-300"
            aria-label={`Sort ${
              sortOrder === 'asc' ? 'descending' : 'ascending'
            }`}
          >
            {sortOrder === 'asc' ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Active filters */}
      {activeFilters.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {activeFilters.map((filter, index) => (
            <span
              key={index}
              className="inline-flex items-center py-1 pl-3 pr-2 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 transition-colors duration-300"
            >
              {filter}
              <button
                onClick={clearFilters}
                className="ml-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-700 p-1"
                aria-label="Clear filters"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Results count */}
      <div className="mt-4 flex justify-center items-center">
        <p className="text-sm text-gray-800 dark:text-gray-200">
          Showing <span className="font-semibold">{filteredCount}</span> of{' '}
          <span className="font-semibold">{publicationsCount}</span> available
          publications
        </p>
        {filteredCount < publicationsCount && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium ml-2"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  )
}

// PublicationCard Component
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

// Custom hook for search and filtering
const usePublicationsFilter = (publications) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')

  const filteredPublications = useMemo(() => {
    if (!publications.length) return []

    // Filter publications based on search term
    let filtered = publications
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = publications.filter(
        (pub) =>
          (pub.title && pub.title.toLowerCase().includes(term)) ||
          (pub.authors && pub.authors.toLowerCase().includes(term)) ||
          (pub.journal && pub.journal.toLowerCase().includes(term)) ||
          (pub.pubmedId && pub.pubmedId.toString().includes(term)) ||
          (pub.doi && pub.doi.toLowerCase().includes(term))
      )
    }

    // Sort publications
    return sortPublications(filtered, sortBy, sortOrder)
  }, [publications, searchTerm, sortBy, sortOrder])

  return {
    filteredPublications,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  }
}

// Main Publications Component
const PublicationsPage = () => {
  const { publications, loading, error, retry } = usePublications()
  const {
    filteredPublications,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  } = usePublicationsFilter(publications)

  const activeFilters = []
  if (searchTerm) activeFilters.push(`Search: "${searchTerm}"`)

  const clearFilters = () => {
    setSearchTerm('')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center transition-colors duration-300">
        <LoadingSpinner message="Loading publications..." size="lg" />
      </div>
    )
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={retry} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      <PageHeader heading="Research Publications" />

      <main className="w-full">
        <SearchAndControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          publicationsCount={publications.length}
          filteredCount={filteredPublications.length}
          activeFilters={activeFilters}
          clearFilters={clearFilters}
        />

        <div className="px-4 sm:px-6 lg:px-8">
          {filteredPublications.length > 0 ? (
            <div className="grid gap-6 md:gap-8">
              {filteredPublications.map((pub) => (
                <PublicationCard key={pub.id} publication={pub} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-16">
              <EmptyState message="Try adjusting your search terms or filters to find what you're looking for." />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default PublicationsPage
