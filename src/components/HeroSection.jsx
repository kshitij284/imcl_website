import React, { useState, useEffect, useRef } from 'react'
import VennDiagram from './VennDiagram'

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
    <section
      id="home"
      ref={heroSectionRef}
      className={`max-auto text-center bg-gradient-to-br ${backgroundColors[selectedCircle]} transition-colors duration-500`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <HeroSectionVenn
            isDiagramExpanded={isDiagramExpanded}
            onCircleClick={handleCircleClick}
          />
          <HeroContent selectedCircle={selectedCircle} />
        </div>
      </div>
    </section>
  )
}

const HeroSectionVenn = ({ isDiagramExpanded, onCircleClick }) => {
  return (
    <div className="relative venn-diagram-container">
      <div className="aspect-square rounded-2xl flex items-center justify-center transition-colors duration-300 bg-transparent">
        <VennDiagram
          isExpanded={isDiagramExpanded}
          onCircleClick={onCircleClick}
        />
      </div>
    </div>
  )
}

const HeroContent = ({ selectedCircle }) => {
  const contentMap = {
    A: {
      title: 'Behavioral Neuroscience',
      description: 'Exploring the neural mechanisms underlying behavior.',
    },
    B: {
      title: 'Computational Neuroscience',
      description: 'Modeling brain functions through computational approaches.',
    },
    C: {
      title: 'Anatomy and Physiology',
      description:
        'Understanding the structure and function of the nervous system.',
    },
    Center: {
      title: 'Formal Model',
      description: 'Something I dont know yet. Will fill in later.',
    },
    null: {
      title: 'IMCN Research Unit',
      description:
        'We combine knowledge from functional neuroanatomy, mathematical/computational modeling, and the cognitive/clinical neurosciences.',
    },
  }
  const content = contentMap[selectedCircle] || contentMap.null
  return (
    <div className="mt-8">
      <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 mt-8">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          {content.title}
        </span>
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-left">
        {content.description}
      </p>
    </div>
  )
}

export default HeroSection
