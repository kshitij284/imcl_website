import { useState, useEffect } from 'react'

/**
 * Parse a CSV line properly handling quoted fields with commas
 * @param {string} line - CSV line to parse
 * @returns {Array<string>} Array of parsed values
 */
const parseCSVLine = (line) => {
  const result = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const nextChar = line[i + 1]

    if (char === '"') {
      // Handle escaped quotes ("")
      if (inQuotes && nextChar === '"') {
        current += '"'
        i++ // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      // End of field - only split on commas outside quotes
      // Trim the value to remove any extra whitespace
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }

  // Add last field and trim
  result.push(current.trim())
  return result
}

/**
 * Custom hook for loading and parsing publications from CSV
 * @returns {Object} { publications, loading, error, retry }
 */
export const usePublications = () => {
  const [publications, setPublications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const parseCSV = (text) => {
    const lines = text.split('\n').filter((line) => line.trim())
    if (lines.length === 0) return []

    // Parse header line
    const headers = parseCSVLine(lines[0]).map((h) => h.toLowerCase().trim())

    console.log('CSV Headers found:', headers)

    const data = []

    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i])

      if (values.length === 0) continue

      const row = {}
      headers.forEach((header, index) => {
        row[header] = values[index] || ''
      })

      // Debug first few rows
      if (i <= 3) {
        console.log(`Row ${i}:`, {
          title: row['title']?.substring(0, 50),
          authors: row['authors']?.substring(0, 50),
          year: row['year'],
        })
      }

      data.push(row)
    }

    return data
  }

  const loadPublications = async () => {
    try {
      setLoading(true)
      setError(null)

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

      const processedData = parsedData
        .map((row, index) => {
          // Trim and clean all fields
          const pmid = (
            row['pmid'] ||
            row['pubmed_id'] ||
            row['pubmed id'] ||
            row['pubmedid'] ||
            ''
          ).trim()
          const doi = (row['doi'] || '').trim()
          const title = (
            row['title'] ||
            row['publication title'] ||
            row['name'] ||
            ''
          ).trim()
          const authors = (
            row['authors'] ||
            row['author'] ||
            row['author list'] ||
            ''
          ).trim()
          const year = (
            row['year'] ||
            row['date'] ||
            row['publication date'] ||
            row['publication_year'] ||
            ''
          ).trim()
          const journal = (
            row['journal'] ||
            row['journal name'] ||
            row['source'] ||
            ''
          ).trim()
          const url = (row['url'] || row['link'] || row['doi url'] || '').trim()
          const abstract = (row['abstract'] || row['summary'] || '').trim()

          // CRITICAL FIX: Always include index to guarantee unique IDs
          // The CSV has duplicate PMIDs and DOIs, so we must use index
          let id
          if (pmid) {
            id = `${pmid}-${index}`
          } else if (doi) {
            // Shorten DOI-based ID and add index
            const shortDoi = doi.substring(0, 30).replace(/[^\w]/g, '-')
            id = `doi-${shortDoi}-${index}`
          } else {
            // Use title-based ID with index
            const shortTitle = title.substring(0, 20).replace(/[^\w]/g, '-')
            id = `pub-${index}-${shortTitle}`
          }

          return {
            id,
            pubmedId: pmid,
            title,
            authors,
            date: year,
            journal,
            link: url,
            doi,
            abstract,
          }
        })
        .filter((pub) => {
          // Only filter out completely invalid entries

          // Must have a title
          if (!pub.title || pub.title.toLowerCase() === 'nan') {
            console.warn('Skipping publication with no title')
            return false
          }

          // Basic sanity check: if title has excessive commas (>5), might be misparsed
          // But don't filter - just warn
          const commaCount = (pub.title.match(/,/g) || []).length
          if (commaCount > 5) {
            console.warn(
              '⚠️ Title may be misparsed (many commas):',
              pub.title.substring(0, 50)
            )
            // Still include it - don't return false
          }

          // Warn about invalid year but still include
          if (pub.date && !/^\d{4}$/.test(pub.date)) {
            console.warn(
              '⚠️ Invalid year format:',
              pub.date,
              'for:',
              pub.title.substring(0, 40)
            )
            // Still include it - don't return false
          }

          return true
        })

      console.log(`Successfully loaded ${processedData.length} publications`)
      setPublications(processedData)
      setLoading(false)
    } catch (err) {
      console.error('Error loading publications:', err)
      setError(err.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPublications()
  }, [])

  return { publications, loading, error, retry: loadPublications }
}
