import React, { useState, useEffect, useMemo } from 'react'
import PageHeader from '../components/PageHeader'
import { Link } from 'react-router-dom'
import {
  ExternalLink,
  Calendar,
  Users,
  FileText,
  Search,
  ChevronUp,
  ChevronDown,
  Filter,
  X,
} from 'lucide-react'

// LoadingSpinner Component
const LoadingSpinner = ({ message = 'Loading publications...' }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center transition-colors duration-300">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-300 font-medium">{message}</p>
    </div>
  </div>
)

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
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8 transition-colors duration-300">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 min-w-0 max-w-full">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search publications, authors, journals, or PubMed ID..."
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
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 flex items-center justify-center transition-colors duration-300"
            aria-label="Show filters"
          >
            <Filter className="h-5 w-5" />
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

// AuthorButton Component - Creates small button links for authors
const AuthorButton = ({ authorName }) => {
  // Function to generate profile URL from author name
  const getAuthorProfileUrl = (name) => {
    // Convert to lowercase and replace spaces with hyphens
    const formattedName = name.toLowerCase().replace(/\s+/g, '-')
    // In a real application, you might have a different URL structure
    return `/authors/${formattedName}`
  }

  // Function to extract display name (handles "Last, First" format)
  const getDisplayName = (name) => {
    // Handle cases where name might be in "Last, First" format
    if (name.includes(',')) {
      const parts = name.split(',')
      if (parts.length >= 2) {
        return `${parts[1].trim()} ${parts[0].trim()}`
      }
    }
    return name
  }

  return (
    <Link
      to={getAuthorProfileUrl(authorName)}
      className="inline-flex items-center px-3 py-1 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-700 hover:text-blue-800 transition-colors m-1"
      onClick={(e) => {
        e.stopPropagation() // Prevent event bubbling
      }}
    >
      {getDisplayName(authorName)}
    </Link>
  )
}

// PublicationCard Component
const PublicationCard = ({ publication }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available'

    // If it's just a year (like "2021"), format it nicely
    if (/^\d{4}$/.test(dateString)) {
      return dateString
    }

    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    } catch {
      return dateString
    }
  }

  const formatAuthors = (authors) => {
    if (!authors)
      return (
        <span className="text-gray-500 dark:text-gray-400">
          Authors not listed
        </span>
      )

    const authorList = authors
      .split(/,|;/)
      .map((author) => author.trim())
      .filter(Boolean)

    if (authorList.length > 5) {
      const firstThree = authorList.slice(0, 3)
      const remainingAuthors = authorList.slice(3).join(', ')

      return (
        <div className="flex flex-wrap items-center">
          <Users className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
          {firstThree.map((author, index) => (
            <AuthorButton key={index} authorName={author} />
          ))}
          <span
            className="text-gray-600 dark:text-gray-300 ml-1 cursor-pointer"
            title={remainingAuthors} // shows all remaining authors on hover
          >
            et al.
          </span>
        </div>
      )
    }

    return (
      <div className="flex flex-wrap items-center">
        <Users className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
        {authorList.map((author, index) => (
          <AuthorButton key={index} authorName={author} />
        ))}
      </div>
    )
  }

  const getPubMedUrl = (pubmedId) => {
    if (!pubmedId) return null
    return `https://pubmed.ncbi.nlm.nih.gov/${pubmedId}/`
  }

  const capitalizeJournal = (journal) => {
    if (!journal) return ''
    return journal
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

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
        <div className="mb-4 w-full">{formatAuthors(publication.authors)}</div>
      </div>
    </article>
  )
}

// PublicationsList Component
const PublicationsList = ({ publications }) => {
  if (publications.length === 0) {
    return (
      <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-colors duration-300">
        <FileText className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No publications found
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-none mx-auto">
          Try adjusting your search terms or filters to find what you're looking
          for.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:gap-8">
      {publications.map((pub) => (
        <PublicationCard key={pub.id} publication={pub} />
      ))}
    </div>
  )
}

// Custom hook for CSV parsing
const useCSVData = () => {
  const [publications, setPublications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Improved CSV parsing function
  const parseCSV = (text) => {
    const lines = text.split('\n').filter((line) => line.trim())
    if (lines.length === 0) return []

    // Handle quoted fields with commas
    const regex = /(".*?"|[^",]+)(?=\s*,|\s*$)/g
    const headers = (lines[0].match(regex) || []).map((h) =>
      h.trim().replace(/^"|"$/g, '').toLowerCase()
    )

    const data = []

    for (let i = 1; i < lines.length; i++) {
      const values = (lines[i].match(regex) || []).map((v) =>
        v.trim().replace(/^"|"$/g, '')
      )

      if (values.length === 0) continue

      const row = {}
      headers.forEach((header, index) => {
        row[header] = values[index] || ''
      })
      data.push(row)
    }

    return data
  }

  const loadPublications = async () => {
    try {
      setLoading(true)
      setError(null)

      // Try to load the publications.csv file
      const response = await fetch(
        '/publications.csv?t=' + new Date().getTime()
      )
      if (!response.ok) {
        throw new Error(
          'Publications file not found. Please ensure publications.csv exists in the public folder.'
        )
      }

      const csvData = await response.text()
      const parsedData = parseCSV(csvData)

      const processedData = parsedData.map((row, index) => ({
        id: index,
        pubmedId:
          row['pmid'] ||
          row['pubmed_id'] ||
          row['pubmed id'] ||
          row['pubmedid'] ||
          '',
        title: row['title'] || row['publication title'] || row['name'] || '',
        authors: row['authors'] || row['author'] || row['author list'] || '',
        date:
          row['year'] ||
          row['date'] ||
          row['publication date'] ||
          row['publication_year'] ||
          '',
        journal: row['journal'] || row['journal name'] || row['source'] || '',
        link: row['url'] || row['link'] || row['doi url'] || '',
        doi: row['doi'] || '',
        abstract: row['abstract'] || row['summary'] || '',
      }))

      setPublications(processedData)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPublications()
  }, [])

  return { publications, loading, error, retry: loadPublications }
}

// Custom hook for search and filtering
const usePublicationsFilter = (publications) => {
  const [filteredPublications, setFilteredPublications] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')

  // Memoized filtered and sorted publications
  const processedPublications = useMemo(() => {
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
    return [...filtered].sort((a, b) => {
      let aValue, bValue

      switch (sortBy) {
        case 'date':
          // Handle year-only dates for proper sorting
          aValue = /^\d{4}$/.test(a.date)
            ? new Date(`${a.date}-01-01`)
            : new Date(a.date || '1900-01-01')
          bValue = /^\d{4}$/.test(b.date)
            ? new Date(`${b.date}-01-01`)
            : new Date(b.date || '1900-01-01')
          break
        case 'title':
          aValue = (a.title || '').toLowerCase()
          bValue = (b.title || '').toLowerCase()
          break
        case 'authors':
          aValue = (a.authors || '').toLowerCase()
          bValue = (b.authors || '').toLowerCase()
          break
        case 'journal':
          aValue = (a.journal || '').toLowerCase()
          bValue = (b.journal || '').toLowerCase()
          break
        default:
          return 0
      }

      if (aValue === bValue) return 0

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
  }, [publications, searchTerm, sortBy, sortOrder])

  useEffect(() => {
    setFilteredPublications(processedPublications)
  }, [processedPublications])

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
  const { publications, loading, error, retry } = useCSVData()
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
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={retry} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      <PageHeader
        heading="Research Publications"
      />

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
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <FileText className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No publications found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-none mx-auto">
                Try adjusting your search terms or filters to find what you're
                looking for.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default PublicationsPage
