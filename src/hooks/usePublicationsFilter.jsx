import { useState, useMemo } from 'react'
import { sortPublications } from '../utils/publicationUtils'

export const usePublicationsFilter = (publications, authorFilter = null) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')

  const filteredPublications = useMemo(() => {
    if (!publications.length) return []

    // Filter by author first if authorFilter is provided
    let filtered = publications
    if (authorFilter) {
      filtered = publications.filter((pub) => {
        if (!pub.authors) return false
        // Check if the author name appears in the authors list
        return pub.authors.toLowerCase().includes(authorFilter.toLowerCase())
      })
    }

    // Then filter publications based on search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
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
  }, [publications, searchTerm, sortBy, sortOrder, authorFilter])

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

export default usePublicationsFilter
