import React from 'react'
import PageHeader from '../components/PageHeader'

// Section Header Component
const SectionHeader = ({ title, variant = 'default' }) => {
  const baseClasses = 'text-center mb-12'
  const titleClasses =
    variant === 'leadership'
      ? 'text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4'
      : 'text-4xl font-bold text-gray-900 dark:text-white mb-4'

  return (
    <div className={baseClasses}>
      <h2 className={titleClasses}>{title}</h2>
    </div>
  )
}

// Card Component for Tools/Sites
const Card = ({ site }) => {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:-translate-y-2 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative w-full h-56 bg-gradient-to-br from-purple-600 to-blue-600 overflow-hidden flex-shrink-0">
        {site.image ? (
          <img
            src={site.image}
            alt={site.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold bg-white/20 backdrop-blur-sm">
            {site.name.charAt(0)}
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent to-black/20"></div>

        {/* Badge */}
        <div className="absolute top-4 right-4 bg-green-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
          TOOL
        </div>
      </div>

      {/* Content Section - Flexible to fill space */}
      <div className="p-8 flex-grow flex flex-col">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 transition-colors duration-300">
          {site.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-grow">
          {site.introduction}
        </p>

        {/* Centered Link Button - Always at bottom */}
        {site.link && (
          <div className="flex justify-center mt-auto">
            <a
              href={site.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Visit Site
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        )}
      </div>

      {/* Decorative Bottom Border */}
      <div className="h-2 bg-gradient-to-r from-purple-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left flex-shrink-0"></div>
    </div>
  )
}

// Grid Component for Tools/Sites
const ToolsGrid = ({ sites }) => {
  const validSites = sites.filter((site) => site && site.name)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {validSites.map((site, index) => (
        <Card key={index} site={site} />
      ))}
    </div>
  )
}

const CnDPage = () => {
  const sites = [
    {
      name: 'GitHub',
      introduction:
        'On our shared Github account you can find the codes for different projects.',
      image: 'images/github.png',
      link: 'https://github.com',
    },
    {
      name: 'Nighres',
      introduction:
        'Nighres is a Python package for processing of high-resolution neuroimaging data. It developed out of CBS High-Res Brain Processing Tools and aims to make those tools easier to install, use and extend. Nighres now includes new functions from the IMCN imaging toolkit.',
      image: 'images/nighres.png',
      link: 'https://nighres.readthedocs.io/en/latest/',
    },
    {
      name: 'MIST',
      introduction:
        'MIST (Multimodal Image Segmentation Tool) is a flexible tool for subcortical segmentation. It differs from FIRST in that it can use complementary information in different MRI modalities and is less reliant on manual segmentations.',
      image: 'images/mist.png',
      link: 'https://fsl.fmrib.ox.ac.uk/fsl/docs/#/structural/mist',
    },
    {
      name: 'CBS Tools',
      introduction:
        'The CBS High-Res Brain Processing Tools provide a fully automated processing pipeline for cortical analysis of structural MR images at a resolution of up to 400µm, including skull stripping, whole brain segmentation, cortical extraction, surface inflation and mapping, as well as dedicated tools for profile estimation across the cortical thickness.',
      image: 'images/cbs.png',
      link: 'https://www.nitrc.org/projects/cbs-tools/',
    },
    {
      name: 'IMCN Imaging Toolkit',
      introduction:
        'IMCN toolbox, scripts and pipelines for MR imaging and image processing',
      link: 'https://github.com/IMCN-UvA/imcn-imaging',
    },
    {
      name: 'Atlasing of the basal ganglia',
      introduction:
        'This atlas takes advantage of ultra-high resolution 7T MRI to provide unprecedented levels of detail on structures of the basal ganglia in-vivo. The ATAG atlas includes probability maps of the striatum, GPe, GPi, red nucleus, substantia nigra, subthalamic Nucleus(STh) and the PAG.',
      link: 'https://www.nitrc.org/projects/atag/',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto px-6 lg:px-12">
        <PageHeader heading="Code and Data" />

        <div className="mt-12 mb-12">
          <ToolsGrid sites={sites} />
        </div>

        <div className="text-center py-12">
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Explore our collection of neuroimaging tools and resources designed
            to advance high-resolution brain analysis and research. Each tool
            represents years of development and collaboration within the
            neuroimaging community.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CnDPage
