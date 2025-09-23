import React from 'react'

import HeroSection from '../components/HeroSection'
import ContactSection from '../components/ContactSection'
import Introduction from '../components/Introduction'

function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Introduction />
      <HeroSection />
      <ContactSection />
    </div>
  )
}

export default Home
