import React from 'react'
import { useNavigate } from 'react-router-dom'

const ContactSection = () => {
  const navigate = useNavigate()
  const handleContactClick = () => {
    navigate('/contact')
  }

  return (
    <section
      id="contact"
      className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 
                 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h3 className="text-4xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Get in Touch
          </span>
        </h3>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Let's discuss your ideas and inputs.
        </p>
        <button
          onClick={handleContactClick}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-shadow"
        >
          Contact Us Today
        </button>
      </div>
    </section>
  )
}

export default ContactSection
