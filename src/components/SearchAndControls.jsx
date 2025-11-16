// File: src/components/SearchAndControls.jsx
import React from 'react'
import { Search, ChevronUp, ChevronDown, X, User } from 'lucide-react'

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
  authorFilter,
  clearAuthorFilter,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8 transition-colors duration-300">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 min-w-0 max-w-full">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search by title, authors, DOI, or ID..."
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

      {/* Active filters - including author filter */}
      {(activeFilters.length > 0 || authorFilter) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {/* Author Filter Chip */}
          {authorFilter && (
            <span className="inline-flex items-center py-1 pl-3 pr-2 rounded-full text-sm bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 transition-colors duration-300">
              <User className="h-3 w-3 mr-1.5" />
              Author: {authorFilter}
              <button
                onClick={clearAuthorFilter}
                className="ml-1.5 rounded-full hover:bg-purple-200 dark:hover:bg-purple-700 p-1"
                aria-label="Clear author filter"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {/* Other Active Filters */}
          {activeFilters.map((filter, index) => (
            <span
              key={index}
              className="inline-flex items-center py-1 pl-3 pr-2 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 transition-colors duration-300"
            >
              {filter}
              <button
                onClick={clearFilters}
                className="ml-1.5 rounded-full hover:bg-blue-200 dark:hover:bg-blue-700 p-1"
                aria-label="Clear search filter"
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
            onClick={() => {
              clearFilters()
              clearAuthorFilter()
            }}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium ml-2"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchAndControls
