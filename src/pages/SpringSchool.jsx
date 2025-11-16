import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Overview from '../components/springSchool/Overview'
import Program from '../components/springSchool/Program'
import PracticalInfo from '../components/springSchool/PracticalInfo'
import Application from '../components/springSchool/Application'

function SpringSchool() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'program', label: 'Program' },
    { id: 'practical', label: 'Practical Information' },
    { id: 'application', label: 'Application' },
  ]

  // Read hash from URL and set active tab
  useEffect(() => {
    const hash = location.hash.replace('#', '').toLowerCase()
    if (hash && tabs.some((tab) => tab.id === hash)) {
      setActiveTab(hash)
    }
  }, [location.hash])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Model-Based Neuroscience and Cognition
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-900 dark:text-gray-300 font-bold leading-relaxed max-w-3xl mx-auto">
              Spring School 2026
            </p>
          </div>

          {/* Tab Navigation */}
          <nav className="mt-12 flex flex-wrap justify-center gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Content Section */}
      {activeTab === 'overview' && <Overview />}
      {activeTab === 'program' && <Program />}
      {activeTab === 'practical' && <PracticalInfo />}
      {activeTab === 'application' && <Application />}
    </div>
  )
}

export default SpringSchool
