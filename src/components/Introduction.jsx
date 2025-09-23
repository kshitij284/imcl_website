import React from 'react'

const Introduction = () => {
  return (
    <section
      id="Introduction"
      className="mx-auto px-4 text-center 
                 bg-gradient-to-r from-blue-50 to-purple-50 
                 dark:from-gray-800 dark:to-gray-900 
                 transition-colors duration-300"
    >
      {/* Announcement Bar */}
      <div className="mb-8">
        <div className="bg-blue-600 dark:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-sm mx-auto">
          <div className="flex items-center justify-center space-x-2">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            <p className="text-sm font-medium">
              Registration is now open for Summer School 2026!
            </p>
            <a
              href="#SummerSchool"
              className="text-blue-200 hover:text-white underline text-sm font-semibold transition-colors duration-200"
            >
              Register →
            </a>
          </div>
        </div>
      </div>


      <div className="mt-2 px-4">
        <h2 className="text-5xl text-center font-bold text-gray-900 dark:text-white mb-6 mt-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Welcome
          </span>
        </h2>
        <p className="text-2xl text-center text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          In our research unit, we use an integrative model-based cognitive
          neuroscience approach to gain a mechanistic understanding of cognitive
          processes such as decision-making and how they are implemented in the
          healthy and diseased brain.
        </p>
      </div>
    </section>
  )
}

export default Introduction
