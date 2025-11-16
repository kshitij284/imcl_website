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
      const term = searchTerm.toLowerCase().trim()

      filtered = filtered.filter((pub) => {
        // Normalize and check each field
        const titleMatch =
          pub.title && pub.title.trim().toLowerCase().includes(term)
        const authorsMatch =
          pub.authors && pub.authors.trim().toLowerCase().includes(term)
        const journalMatch =
          pub.journal && pub.journal.trim().toLowerCase().includes(term)
        const yearMatch = pub.date && pub.date.toString().trim().includes(term)
        const idMatch =
          pub.pubmedId &&
          pub.pubmedId.toString().trim().toLowerCase().includes(term)
        const doiMatch = pub.doi && pub.doi.trim().toLowerCase().includes(term)

        // Only search in URL if no other field matches (to avoid false positives)
        const urlMatch =
          !titleMatch &&
          !authorsMatch &&
          !journalMatch &&
          !yearMatch &&
          !idMatch &&
          !doiMatch &&
          pub.link &&
          pub.link.trim().toLowerCase().includes(term)

        return (
          titleMatch ||
          authorsMatch ||
          journalMatch ||
          yearMatch ||
          idMatch ||
          doiMatch ||
          urlMatch
        )
      })
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
