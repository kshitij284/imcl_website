import React from 'react'

import HeroSection from '../components/HeroSection'
import ContactSection from '../components/ContactSection'
import Introduction from '../components/Introduction'
import SponsorBar from '../components/SponsorBar'

function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Introduction />
      <HeroSection />
      <SponsorBar />
      <ContactSection />
    </div>
  )
}

export default Home
