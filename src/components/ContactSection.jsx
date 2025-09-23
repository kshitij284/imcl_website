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
      className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Get In Touch
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Let's discuss your ideas and inputs.d
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
