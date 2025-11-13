import React from 'react'
import { FileText, Send, Mail } from 'lucide-react'

function Application() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-2">
        {/* Application Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="w-full flex justify-center items-center py-8 lg:py-10">
            <div className="w-full lg:w-[512px]">
              <div className="flex flex-col items-center text-center space-y-6">
                <FileText className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Application
                  </span>
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  The registration fee for the Spring School is €550.
                  Participants should make their own housing arrangements. Space
                  is limited, so we ask participants to provide a statement of
                  interest.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center items-center py-8 lg:py-0">
            <div className="w-full lg:w-[512px]">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-300">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Application Details
                </h3>
                <div className="space-y-3 text-gray-600 dark:text-gray-300">
                  <p>
                    <strong className="text-gray-900 dark:text-white">
                      Registration Fee:
                    </strong>{' '}
                    €550
                  </p>
                  <p>
                    <strong className="text-gray-900 dark:text-white">
                      Deadline:
                    </strong>{' '}
                    Rolling admission until spots are filled
                  </p>
                  <p>
                    <strong className="text-gray-900 dark:text-white">
                      Selection:
                    </strong>{' '}
                    Based on relevance of Spring School to your research
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statement of Interest Requirements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="w-full flex justify-center items-center py-8 lg:py-0">
            <div className="w-full lg:w-[512px]">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-300">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Statement of Interest
                </h3>
                <div className="space-y-3 text-gray-600 dark:text-gray-300">
                  <p>
                    <strong className="text-gray-900 dark:text-white">
                      Length:
                    </strong>{' '}
                    Maximum 250 words (aim for ~100 words)
                  </p>
                  <p>
                    <strong className="text-gray-900 dark:text-white">
                      Include:
                    </strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Scientific background</li>
                    <li>Relevant skills</li>
                    <li>How you plan to use this knowledge</li>
                    <li>Programming languages and software you use</li>
                  </ul>
                  <p className="text-sm italic">
                    Familiarity with R is particularly recommended
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center items-center py-8 lg:py-0">
            <div className="w-full lg:w-[512px]">
              <div className="flex flex-col items-center text-center space-y-6">
                <Send className="h-12 w-12 text-purple-600 dark:text-purple-400" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Ready to Apply?
                </h3>
                <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  Submit your application through our online form
                </p>
                <a
                  href="https://forms.gle/X7ZCjwmMqqLVjAYr5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="py-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-300 text-center">
              <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Need Help?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                If you experience any difficulties with the application, please
                contact us:
              </p>
              <a
                href="mailto:info.modelbasedneuroscience@gmail.com"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                info.modelbasedneuroscience@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Application
