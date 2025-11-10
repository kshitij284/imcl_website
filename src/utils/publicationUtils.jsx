/**
 * Format date string for display
 * @param {string} dateString - Date string to format
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'Date not available'

  // If it's a 4-digit year, return as-is (valid)
  if (/^\d{4}$/.test(dateString)) {
    return dateString
  }

  // Try to parse as full date
  try {
    const date = new Date(dateString)
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }
  } catch {
    // Fall through to return original string
  }

  // If all else fails, return original with indicator
  return `${dateString} (unverified)`
}

/**
 * Format authors list for display
 * @param {string} authors - Comma or semicolon separated authors
 * @param {number} maxAuthors - Maximum number of authors to show before "et al."
 * @returns {Array} Array of author names
 */
export const parseAuthors = (authors, maxAuthors = null) => {
  if (!authors) return []

  const authorList = authors
    .split(/,|;/)
    .map((author) => author.trim())
    .filter(Boolean)

  if (maxAuthors && authorList.length > maxAuthors) {
    return authorList.slice(0, maxAuthors)
  }

  return authorList
}

/**
 * Format authors as a string
 * @param {string} authors - Comma or semicolon separated authors
 * @param {number} maxAuthors - Maximum number of authors to show
 * @returns {string} Formatted author string
 */
export const formatAuthors = (authors, maxAuthors = 3) => {
  if (!authors) return 'Authors not listed'

  const authorList = parseAuthors(authors)

  if (authorList.length > maxAuthors) {
    return `${authorList.slice(0, maxAuthors).join(', ')} et al.`
  }
  return authorList.join(', ')
}

/**
 * Get PubMed URL from ID
 * @param {string} pubmedId - PubMed ID
 * @returns {string|null} PubMed URL or null
 */
export const getPubMedUrl = (pubmedId) => {
  if (!pubmedId) return null
  return `https://pubmed.ncbi.nlm.nih.gov/${pubmedId}/`
}

/**
 * Get DOI URL from DOI string
 * @param {string} doi - DOI string (e.g., "10.1038/nn.2886")
 * @returns {string|null} DOI URL or null
 */
export const getDoiUrl = (doi) => {
  if (!doi) return null
  // Remove https://doi.org/ if already present in the DOI string
  const cleanDoi = doi.replace(/^https?:\/\/doi\.org\//, '')
  return `https://doi.org/${cleanDoi}`
}

/**
 * Capitalize journal name
 * @param {string} journal - Journal name
 * @returns {string} Capitalized journal name
 */
export const capitalizeJournal = (journal) => {
  if (!journal) return ''
  return journal
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Sort publications by specified criteria
 * @param {Array} publications - Array of publications
 * @param {string} sortBy - Field to sort by
 * @param {string} sortOrder - 'asc' or 'desc'
 * @returns {Array} Sorted publications
 */
export const sortPublications = (
  publications,
  sortBy = 'date',
  sortOrder = 'desc'
) => {
  return [...publications].sort((a, b) => {
    let aValue, bValue

    switch (sortBy) {
      case 'date':
        // Check if dates are valid (4-digit year)
        const aHasValidDate = a.date && /^\d{4}$/.test(a.date)
        const bHasValidDate = b.date && /^\d{4}$/.test(b.date)

        // If one has valid date and other doesn't, valid date comes first
        if (aHasValidDate && !bHasValidDate) return -1
        if (!aHasValidDate && bHasValidDate) return 1

        // If both invalid, keep original order (stable sort)
        if (!aHasValidDate && !bHasValidDate) return 0

        // Both have valid dates, sort normally
        aValue = new Date(`${a.date}-01-01`)
        bValue = new Date(`${b.date}-01-01`)
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
}

/**
 * Get most recent publications
 * @param {Array} publications - Array of publications
 * @param {number} count - Number of publications to return
 * @returns {Array} Recent publications
 */
export const getRecentPublications = (publications, count = 3) => {
  return sortPublications(publications, 'date', 'desc').slice(0, count)
}
