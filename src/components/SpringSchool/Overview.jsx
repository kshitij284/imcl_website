import React from 'react'

function Overview() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-2">
        {/* Welcome Section - Full Width */}
        <div className="py-8 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Welcome
            </span>
          </h2>
        </div>

        {/* Welcome Content + Event Details Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="w-full flex justify-center items-center py-8 lg:py-0">
            <div className="w-full lg:w-[512px]">
              <div className="flex flex-col items-center text-center space-y-6">
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  The 11th Model-Based Neuroscience and Cognition Summer School,
                  hosted by the University of Amsterdam, will be held in summer
                  2025!
                </p>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  The University of Amsterdam will host the 11th annual
                  Model-Based Neuroscience and Cognition Summer School. There is
                  no fixed application deadline; applications will remain open
                  until all spots are filled, provided the applicant's profile
                  aligns with the theme of the summer school.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center items-center py-8 lg:py-0">
            <div className="w-full lg:w-[512px]">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-300">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Event Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Dates:
                    </span>
                    <p className="text-gray-600 dark:text-gray-300">
                      August 4 – August 8, 2025
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Location:
                    </span>
                    <p className="text-gray-600 dark:text-gray-300">
                      University of Amsterdam
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Costs:
                    </span>
                    <p className="text-gray-600 dark:text-gray-300">
                      €550 (Includes registration, snacks and coffee/tea. Lunch
                      is not included.)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Program Overview Section - Full Width Container */}
        <div className="w-full bg-white dark:bg-gray-800/50 shadow-lg rounded-xl py-8 my-8">
          <div className="max-w-7xl mx-auto px-4">
            {/* Program Overview - Complete Row */}
            <div className="py-4">
              <div className="text-center mb-6">
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Program Overview
                  </span>
                </h3>
                <div className="max-w-4xl mx-auto">
                  <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    The Summer School will provide participants with hands-on
                    experience in both cognitive modeling using
                    evidence-accumulation models and cognitive neuroscience
                    methods. This year includes a three-day introduction to
                    evidence-accumulation modeling using Bayesian inference.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-8">
              {/* Neuroscience Track */}
              <div className="w-full flex justify-center">
                <div className="w-full max-w-lg h-full">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:scale-105 border-t-4 border-purple-500 h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                          />
                        </svg>
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Neuroscience Track
                      </h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 flex-grow">
                      Learn how to create joint models of behavior and EEG/fMRI
                      data.
                    </p>
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        Focus: Neural Data Integration
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Cognition Track */}
              <div className="w-full flex justify-center">
                <div className="w-full max-w-lg h-full">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:scale-105 border-t-4 border-purple-500 h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                          />
                        </svg>
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Advanced Cognition Track
                      </h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 flex-grow">
                      Learn to use the evidence-accumulation framework for
                      complex experimental paradigms and combine
                      evidence-accumulation with reinforcement-learning models.
                    </p>
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        Focus: Advanced Modeling Techniques
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Third Row: Expert Instructors & Who Should Attend */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch">
          <div className="w-full flex justify-center items-stretch py-8 lg:py-0">
            <div className="w-full lg:w-[512px] h-full">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-300 h-full">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Expert Instructors
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  Lectures from leading experts including:
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Andrew Heathcote, Dora Matzke, Michael Nunez, Steven Miletić,
                  and Birte Forstmann.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center items-stretch py-8 lg:py-0">
            <div className="w-full lg:w-[512px] h-full">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-300 h-full">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Who Should Attend?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  The Summer School is aimed at PhD-students and early postdocs
                  who wish to acquire the basics of Bayesian
                  evidence-accumulation modeling, and combine that knowledge
                  with experimental and theoretical neuroscience research or
                  advanced modeling techniques.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Organization */}
        <div className="py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Organization
              </span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600 dark:text-gray-300">
                <p>Birte Forstmann (University of Amsterdam, NL)</p>
                <p>Dora Matzke (University of Amsterdam, NL)</p>
                <p>Andrew Heathcote (University of Amsterdam, NL)</p>
                <p>Steven Miletić (Leiden University, NL)</p>
                <p>Michael Nunez (University of Amsterdam, NL)</p>
                <p>Michelle Donzallaz (University of Amsterdam, NL)</p>
                <p>Niek Stevenson (University of Amsterdam, NL)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Overview
