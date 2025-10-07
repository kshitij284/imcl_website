function SponsorBar() {
  const sponsors = [
    {
      name: 'European Research Council',
      url: 'https://erc.europa.eu/',
      logo: '/images/logos/ERC.png',
    },
    {
      name: 'Netherlands Organisation for Scientific Research',
      url: 'https://www.nwo.nl/',
      logo: '/images/logos/NWO.png',
    },
    {
      name: 'Hersenstichting',
      url: 'https://www.hersenstichting.nl/',
      logo: '/images/logos/HSN.png',
    },
    {
      name: 'ParkinsonFonds',
      url: 'https://www.parkinsonfonds.nl/',
      logo: '/images/logos/parkinson.svg',
    },
  ]

  return (
    <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Supported By
        </h3>

        <div className="flex items-center justify-between gap-8 flex-wrap">
          {sponsors.map((sponsor, index) => (
            <a
              key={index}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[180px] transition-all duration-300 hover:scale-110 hover:opacity-90 flex items-center justify-center"
              title={sponsor.name}
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="h-36 w-auto object-contain max-w-full"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SponsorBar