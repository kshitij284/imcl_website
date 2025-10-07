import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { usePublications } from '../hooks/usePublication'
import { usePublicationsFilter } from '../hooks/usePublicationsFilter'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { EmptyState } from '../components/EmptyState'
import ErrorDisplay from '../components/ErrorDisplay'
import SearchAndControls from '../components/SearchAndControls'
import PublicationCard from '../components/PublicationCard'

const PublicationsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const authorFilter = searchParams.get('author')

  const { publications, loading, error, retry } = usePublications()
  const {
    filteredPublications,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  } = usePublicationsFilter(publications, authorFilter)

  const activeFilters = []
  if (searchTerm) activeFilters.push(`Search: "${searchTerm}"`)

  const clearFilters = () => {
    setSearchTerm('')
  }

  const clearAuthorFilter = () => {
    setSearchParams({})
  }

  // Scroll to top when author filter is applied
  useEffect(() => {
    if (authorFilter) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [authorFilter])

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
          authorFilter={authorFilter}
          clearAuthorFilter={clearAuthorFilter}
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
