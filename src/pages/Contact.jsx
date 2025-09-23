import { useState } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react' // optional icons
import emailjs from 'emailjs-com' // For sending emails

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // EmailJS integration (replace with your IDs)
    emailjs
      .send(
        'service_9yusmir', // Service ID
        'template_ibqblft', // Template ID
        formData,
        'Gq6x10nYLt4AwLmdG' // Public Key
      )
      .then(
        () => alert('Message sent successfully!'),
        () => alert('Failed to send message. Please try again.')
      )

    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-black overflow-hidden p-6 pt-12">
      <div className="bg-gray-800 shadow-xl rounded-2xl p-8 max-w-5xl w-full grid md:grid-cols-2 gap-6 text-white">
        {/* Left side - Contact Info */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-white">Get in Touch</h2>
          <div className="space-y-4 text-gray-200">
            <div className="flex items-center gap-3">
              <MapPin className="text-blue-400" />
              <p>
                University of Amsterdam,Nieuwe Achtergracht 129B | Room G0.13
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-blue-400" />
              <p>buforstmann@gmail.com</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-blue-400" />
              <p>+31 615324988</p>
            </div>
          </div>
        </div>

        {/* Right side - Contact Form */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-white">
            Send us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 text-gray-200">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
