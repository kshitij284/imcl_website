import React, { useState, useEffect, useRef } from 'react'
import VennDiagram from './VennDiagram'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  const heroSectionRef = useRef(null)
  const [selectedCircle, setSelectedCircle] = useState(null)
  const [isDiagramExpanded, setIsDiagramExpanded] = useState(false)

  const backgroundColors = {
    A: 'from-green-50 to-lime-50 dark:from-green-900 dark:to-lime-950',
    B: 'from-blue-50 to-cyan-50 dark:from-blue-900 dark:to-cyan-950',
    C: 'from-red-50 to-pink-50 dark:from-red-900 dark:to-pink-950',
    Center:
      'from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-950',
    null: 'from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900',
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        heroSectionRef.current &&
        !heroSectionRef.current.contains(event.target)
      ) {
        setSelectedCircle(null)
        setIsDiagramExpanded(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [heroSectionRef])

  const handleCircleClick = (circleId) => {
    setSelectedCircle(circleId)
    setIsDiagramExpanded(true)
  }

  return (
    <>
    <div className="w-full bg-blue-600 dark:bg-blue-700 text-white py-2 px-4 shadow-sm">
        <div className="flex items-center justify-center space-x-2">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          <p className="text-sm font-medium">
            Registration is now open for Spring School 2026!
          </p>
          <Link
            to= "spring-school#Application"
            className="text-blue-200 hover:text-white underline text-sm font-semibold transition-colors duration-200"
          >
            Register →
          </Link>
        </div>
    </div>
    <section
      id="home"
      ref={heroSectionRef}
      className={`bg-gradient-to-br ${backgroundColors[selectedCircle]} transition-colors duration-500`}
    >
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <HeroSectionVenn
            isDiagramExpanded={isDiagramExpanded}
            onCircleClick={handleCircleClick}
          />
          <HeroContent selectedCircle={selectedCircle} />
        </div>
      </div>
    </section>
    </> 
  )
}

const HeroSectionVenn = ({ isDiagramExpanded, onCircleClick }) => {
  return (
    <div className="w-full flex justify-center items-center py-8 lg:py-0">
      <div className="w-full lg:w-[512px]">
        <div className="w-full rounded-2xl flex items-center justify-center transition-all duration-300 bg-transparent">
          <VennDiagram
            isExpanded={isDiagramExpanded}
            onCircleClick={onCircleClick}
          />
        </div>
      </div>
    </div>
  )
}

const HeroContent = ({ selectedCircle }) => {
  const contentMap = {
    A: {
      title: 'Behavioral Data',
      description:
        'We collect behavioral data—measurements of observable actions such as response times or accuracy—during cognitive tasks. These data allow us to characterize how people perform and adapt under different experimental conditions.',
    },
    B: {
      title: 'Cognitive Process',
      description:
        'We use formal models to infer latent cognitive processes, such as error-driven learning or response caution, that drive observed behavior. By estimating these hidden processes, we can better understand the mental operations underlying task performance.',
    },
    C: {
      title: 'Brain Data',
      description:
        'We acquire brain data, ranging from immunohistochemistry to fMRI, to observe neural activity associated with cognitive functions. These measurements help us link specific cognitive processes to their neural substrates, deepening our understanding of how the brain supports cognition.',
    },
    Center: {
      title: 'Formal Model',
      description:
        'Joint models allow us to simultaneously model and understand all modalities of data, acquired from behavior and the brain.',
    },
    null: {
      title: 'Welcome',
      description:
        'We take a rigorous interdisciplinary approach to understanding the deep brain, integrating insights from functional neuroanatomy, mathematical psychology, and cognitive and clinical neuroscience. Our work combines state-of-the-art methodologies—including whole-brain post-mortem processing, ultra-high-field (7T) MRI, and Bayesian hierarchical modeling—to advance both theoretical understanding and clinical relevance',
    },
  }
  const content = contentMap[selectedCircle] || contentMap.null

  return (
    <div className="w-full flex justify-center items-center py-8 lg:py-0">
      <div className="w-full lg:w-[512px]">
        <div className="flex flex-col items-center text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {content.title}
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            {content.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
