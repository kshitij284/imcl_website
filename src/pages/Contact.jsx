import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import emailjs from 'emailjs-com'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [showResearch, setShowResearch] = useState(true)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    emailjs
      .send(
        'service_9yusmir',
        'template_ibqblft',
        formData,
        'Gq6x10nYLt4AwLmdG'
      )
      .then(
        () => alert('Message sent successfully!'),
        () => alert('Failed to send message. Please try again.')
      )

    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-black dark:from-gray-900 dark:via-blue-900 dark:to-black bg-gray-50 overflow-hidden p-6 pt-12">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 max-w-5xl w-full text-gray-900 dark:text-white">
        {/* Research Opportunities - Collapsible Banner */}
        <div className="mb-8 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-800 rounded-xl p-6 border border-blue-200 dark:border-blue-600/30">
          <button
            onClick={() => setShowResearch(!showResearch)}
            className="w-full flex items-center justify-between text-left hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-3">
              <GraduationCap
                className="text-blue-600 dark:text-blue-300"
                size={32}
              />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Research Opportunities for Students
              </h2>
            </div>
            {showResearch ? (
              <ChevronUp
                size={28}
                className="text-gray-700 dark:text-gray-200"
              />
            ) : (
              <ChevronDown
                size={28}
                className="text-gray-700 dark:text-gray-200"
              />
            )}
          </button>

          {showResearch && (
            <div className="mt-6 pt-6 border-t border-blue-200 dark:border-blue-600/30 space-y-6">
              <p className="text-gray-700 dark:text-gray-100 leading-relaxed text-xl font-bold">
                We are always looking for motivated Master's students interested
                in contributing to our scientific projects or writing a
                literature thesis. Check our recent publications to learn about
                our current work.
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <Link to="/team" className="block h-full">
                  <div className="bg-white dark:bg-blue-800/50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-blue-200 dark:border-blue-600/30 text-center cursor-pointer group h-full flex flex-col justify-between min-h-[160px]">
                    <div>
                      <BookOpen
                        className="text-blue-600 dark:text-blue-300 mx-auto mb-3 group-hover:scale-110 transition-transform"
                        size={32}
                      />
                      <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                        Anatomy
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      with Anneke Alkemade
                    </p>
                  </div>
                </Link>

                <Link to="/team" className="block h-full">
                  <div className="bg-white dark:bg-blue-800/50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-blue-200 dark:border-blue-600/30 text-center cursor-pointer group h-full flex flex-col justify-between min-h-[160px]">
                    <div>
                      <BookOpen
                        className="text-blue-600 dark:text-blue-300 mx-auto mb-3 group-hover:scale-110 transition-transform"
                        size={32}
                      />
                      <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                        MRI Research
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Low-field or ultra-high field with Birte Forstmann
                    </p>
                  </div>
                </Link>

                <Link to="/team" className="block h-full">
                  <div className="bg-white dark:bg-blue-800/50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-blue-200 dark:border-blue-600/30 text-center cursor-pointer group h-full flex flex-col justify-between min-h-[160px]">
                    <div>
                      <BookOpen
                        className="text-blue-600 dark:text-blue-300 mx-auto mb-3 group-hover:scale-110 transition-transform"
                        size={32}
                      />
                      <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                        Cognitive Modelling
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      with Steven Miletić
                    </p>
                  </div>
                </Link>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/50 rounded-lg p-5 border-l-4 border-blue-500">
                <p className="text-gray-700 dark:text-gray-200 mb-2 text-sm">
                  <strong className="text-blue-700 dark:text-blue-300">
                    To Apply:
                  </strong>{' '}
                  Send us an email with your experience and project interests.
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300 italic">
                  Note: Positions are limited. Students from our teaching
                  programs receive preference.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left side - Contact Info */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Get in Touch
            </h2>
            <div className="space-y-5 text-gray-700 dark:text-gray-200">
              <div className="flex items-start gap-3">
                <MapPin
                  className="text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0"
                  size={22}
                />
                <p>
                  University of Amsterdam, Nieuwe Achtergracht 129B | Room G0.13
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail
                  className="text-blue-600 dark:text-blue-400 flex-shrink-0"
                  size={22}
                />
                <p>buforstmann@gmail.com</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone
                  className="text-blue-600 dark:text-blue-400 flex-shrink-0"
                  size={22}
                />
                <p>+31 615324988</p>
              </div>
            </div>
          </div>

          {/* Right side - Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
