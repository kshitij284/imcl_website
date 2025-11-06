import React from 'react'
import PageHeader from '../components/PageHeader'

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

        {/* Badge - Optional */}
        {site.showBadge && (
          <div
            className={`absolute top-4 right-4 ${
              site.badgeColor || 'bg-green-400'
            } text-gray-900 px-3 py-1 rounded-full text-xs font-bold`}
          >
            {site.badgeText || 'TOOL'}
          </div>
        )}
      </div>

      {/* Content Section - Flexible to fill space */}
      <div className="p-8 flex-grow flex flex-col">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 transition-colors duration-300">
          {site.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-grow">
          {site.introduction}
        </p>

        {/* First Delineation Section - Primary Links */}
        {site.primaryLinks && site.primaryLinks.length > 0 && (
          <>
            {/* Delineation Line */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mb-4"></div>

            <div className="mb-4">
              <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3 text-center">
                {site.primaryLinksTitle || 'Resources'}
              </h4>
              <div className="flex flex-col gap-2">
                {site.primaryLinks.map((linkItem, index) => (
                  <a
                    key={index}
                    href={linkItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 text-sm"
                  >
                    <span className="truncate">{linkItem.label}</span>
                    <svg
                      className="ml-2 w-4 h-4 flex-shrink-0"
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
                ))}
              </div>
            </div>
          </>
        )}

        {/* Second Delineation Section - Secondary Links (Equal width, max 4 per row) */}
        {site.secondaryLinks && site.secondaryLinks.length > 0 && (
          <>
            {/* Delineation Line */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mb-4"></div>

            <div className="w-full">
              <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3 text-center">
                {site.secondaryLinksTitle || 'Related Links'}
              </h4>
              <div
                className="grid gap-2 w-full"
                style={{
                  gridTemplateColumns: `repeat(${Math.min(
                    site.secondaryLinks.length,
                    4
                  )}, 1fr)`,
                }}
              >
                {site.secondaryLinks.map((linkItem, index) => (
                  <a
                    key={index}
                    href={linkItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-2 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 text-xs min-w-0"
                  >
                    <span className="truncate block max-w-full">
                      {linkItem.label}
                    </span>
                    <svg
                      className="ml-1 w-3 h-3 flex-shrink-0"
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
                ))}
              </div>
            </div>
          </>
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      showBadge: true,
      badgeText: 'CODE',
      badgeColor: 'bg-blue-400',
      primaryLinksTitle: 'Repository',
      primaryLinks: [
        { label: 'View Repositories', url: 'https://github.com/IMCN-UvA' },
      ],
      secondaryLinksTitle: 'Members',
      secondaryLinks: [
        { label: 'Steven M.', url: 'https://github.com/stevenm1' },
        { label: 'Pierre B.', url: 'https://github.com/piloubazin' },
      ],
    },
    {
      name: 'Nighres',
      introduction:
        'Nighres is a Python package for processing of high-resolution neuroimaging data. It developed out of CBS High-Res Brain Processing Tools and aims to make those tools easier to install, use and extend. Nighres now includes new functions from the IMCN imaging toolkit.',
      image: 'images/nighres.png',
      showBadge: true,
      badgeText: 'PYTHON',
      badgeColor: 'bg-yellow-400',
      primaryLinksTitle: 'Resources',
      primaryLinks: [
        {
          label: 'Documentation',
          url: 'https://nighres.readthedocs.io/en/latest/',
        },
        { label: 'GitHub', url: 'https://github.com/nighres/nighres' },
      ],
    },
    {
      name: 'MASSP 2.0',
      introduction:
        'MASSP is a multi-contrast anatomical subcortical structure parcellation method that uses a large set of manually labeled structures as priors to automatically label 17 subcortical structures in new subjects. The method uses a Bayesian multi-object approach combining shape priors, intensity distribution models, spatial relationships and global constraints to provide robust and accurate parcellations.',
      image: 'images/massp.png',
      showBadge: true,
      badgeText: 'ATLAS',
      badgeColor: 'bg-purple-400',
      primaryLinksTitle: 'Main Publication',
      primaryLinks: [
        {
          label: 'MIT Direct Press',
          url: 'https://direct.mit.edu/imag/article/doi/10.1162/imag_a_00560/128816/Automated-parcellation-and-atlasing-of-the-human',
        },
      ],
      secondaryLinksTitle: 'Probabilistic atlas Adult',
      secondaryLinks: [
        {
          label: 'Lifespan',
          url: 'https://doi.org/10.21942/uva.27291579.v1',
        },
        {
          label: 'Young',
          url: 'https://doi.org/10.21942/uva.27291963.v1',
        },
        {
          label: 'Middle-aged',
          url: 'https://doi.org/10.21942/uva.27292233.v1',
        },
        {
          label: 'Older',
          url: 'https://doi.org/10.21942/uva.27292209.v1',
        },
      ],
    },
    {
      name: 'AHEAD',
      introduction:
        'The Amsterdam Ultra-high field adult lifespan database (AHEAD) is a collection of multi-contrast 7T MRI data from 105 healthy adults across the lifespan (18-80 years). The dataset includes high-resolution anatomical scans (MP2RAGE, T2*-weighted, and FLAIR) along with demographic and cognitive data, making it a valuable resource for studying brain structure and function across aging.',
      image: 'images/ahead.png',
      showBadge: true,
      badgeText: 'DATASET',
      badgeColor: 'bg-red-400',
      primaryLinksTitle: 'Resources',
      primaryLinks: [
        {
          label: 'AHEAD Dataset',
          url: 'https://doi.org/10.21942/uva.12152375.v2',
        },
        {
          label: 'AHEAD Cognitive Data',
          url: 'https://doi.org/10.21942/uva.12152378.v2',
        },
      ],
    },
    {
      name: 'MASSP',
      introduction:
        'MASSP is a multi-contrast anatomical subcortical structure parcellation method that uses a large set of manually labeled structures as priors to automatically label 17 subcortical structures in new subjects. The method uses a Bayesian multi-object approach combining shape priors, intensity distribution models, spatial relationships and global constraints to provide robust and accurate parcellations.',
      image: 'images/massp.png',
      showBadge: true,
      badgeText: 'ATLAS',
      badgeColor: 'bg-purple-400',
      primaryLinksTitle: 'Main Publication',
      primaryLinks: [
        {
          label: 'Main Publication',
          url: 'https://doi.org/10.7554/eLife.59430',
        },
      ],
      secondaryLinksTitle: 'Resources',
      secondaryLinks: [
        {
          label: 'Structures priors',
          url: 'https://doi.org/10.21942/uva.12074175.v1',
        },
        {
          label: 'AHEAD template',
          url: 'https://doi.org/10.21942/uva.12301106.v2',
        },
      ],
    },
    {
      name: 'CBS Tools',
      introduction:
        'The CBS High-Res Brain Processing Tools provide a fully automated processing pipeline for cortical analysis of structural MR images at a resolution of up to 400 micrometers, including skull stripping, whole brain segmentation, cortical extraction, surface inflation and mapping, as well as dedicated tools for profile estimation across the cortical thickness.',
      image: 'images/cbs.png',
      showBadge: true,
      badgeText: 'PIPELINE',
      badgeColor: 'bg-green-400',
      primaryLinks: [
        {
          label: 'NITRC Project',
          url: 'https://www.nitrc.org/projects/cbs-tools/',
        },
      ],
    },
    {
      name: 'IMCN Imaging Toolkit',
      introduction:
        'IMCN toolbox, scripts and pipelines for MR imaging and image processing',
      showBadge: true,
      badgeText: 'TOOLKIT',
      badgeColor: 'bg-teal-400',
      primaryLinks: [
        {
          label: 'GitHub Repository',
          url: 'https://github.com/IMCN-UvA/imcn-imaging',
        },
      ],
    },
    {
      name: 'Atlasing of the basal ganglia',
      introduction:
        'This atlas takes advantage of ultra-high resolution 7T MRI to provide unprecedented levels of detail on structures of the basal ganglia in-vivo. The ATAG atlas includes probability maps of the striatum, GPe, GPi, red nucleus, substantia nigra, subthalamic Nucleus(STh) and the PAG.',
      showBadge: true,
      badgeText: 'ATLAS',
      badgeColor: 'bg-purple-400',
      primaryLinks: [
        { label: 'NITRC Project', url: 'https://www.nitrc.org/projects/atag/' },
      ],
    },
    {
      name: 'MIST',
      introduction:
        'MIST (Multimodal Image Segmentation Tool) is a flexible tool for subcortical segmentation. It differs from FIRST in that it can use complementary information in different MRI modalities and is less reliant on manual segmentations.',
      image: 'images/mist.png',
      showBadge: true,
      badgeText: 'Superseded by AHEAD',
      badgeColor: 'bg-red-500',
      primaryLinks: [
        {
          label: 'FSL Documentation',
          url: 'https://fsl.fmrib.ox.ac.uk/fsl/docs/#/structural/mist',
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto">
        <PageHeader heading="Code and Data" />

        {/* Tools Section */}
        <div className="max-w-7xl mx-auto px-4 mt-10 mb-10">
          <ToolsGrid sites={sites} />
        </div>

        {/* Bottom Description */}
        <div className="max-w-7xl mx-auto px-4 text-center py-12">
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
