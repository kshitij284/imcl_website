import { useState, useEffect } from 'react'

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
