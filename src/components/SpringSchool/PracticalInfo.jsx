import React from 'react'
import { MapPin, Home, ExternalLink } from 'lucide-react'

function PracticalInfo() {
  const hotels = [
    {
      name: 'Hotel Le Coin',
      distance: 'a 15 minute walk',
      address: 'Nieuwe Doelenstraat 5, 1012 CP AMSTERDAM',
      phone: '+31 20 524 6800',
      email: 'hotel@lecoin.nl',
    },
    {
      name: 'Eden Hotel Amsterdam',
      distance: 'a 10 minute walk',
      address: 'Amstel 144, 1017 AE Amsterdam',
      phone: '+31 20 530 78 78',
      email: 'info.edenhotel@edenhotels.nl',
    },
    {
      name: 'Hotel Arena',
      distance: 'a 5 minute walk',
      address: "'s-Gravesandestraat 51, 1092 AA Amsterdam",
      phone: '+31 20 850 24 00',
      email: 'reservations@hotelarena.nl',
      note: 'Hotel Arena is a hip place that organises loud parties until about 4 am. So unless you want to party along, this might not be the best choice.',
    },
    {
      name: 'Hotel Park Plantage',
      distance: 'a 5 minute walk',
      address: 'Plantage Middenlaan 26, 1018 DE Amsterdam',
      phone: '+31 20 623 57 83',
      email: 'info@hotelparkplantage.com',
    },
  ]

  const hostels = [
    {
      name: 'Generator Amsterdam',
      address: 'Mauritskade 57, 1092 AD Amsterdam',
      phone: '+31 20 708 56 00',
      website: 'https://staygenerator.com/hostels/amsterdam',
    },
    {
      name: 'Stayokay Hostel',
      address: 'At various locations in Amsterdam',
      phone:
        '+31 20 624 68 32 (Amsterdam Statsdoelen), +31 20 589 89 96 (Amsterdam Vondelpark), or +31 20 551 31 90 (Amsterdam Oost)',
      email:
        'stadsdoelen@stayokay.com, vondelpark@stayokay.com, or amsterdamoost@stayokay.com',
      website: 'http://www.stayokay.com',
    },
  ]

  return (
    <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-2">
        {/* Getting There Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="w-full flex justify-center items-center py-8 lg:py-0">
            <div className="w-full lg:w-[512px]">
              <div className="flex flex-col items-center text-center space-y-6">
                <MapPin className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Getting There
                  </span>
                </h2>
                <div className="space-y-4 text-left w-full">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Schiphol airport → Amsterdam Central Station
                    </h3>
                    <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                      Take a train from platforms 1/2. Trains depart every 10-15
                      minutes. Trip takes 19 minutes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center items-center py-8 lg:py-0">
            <div className="w-full lg:w-[512px]">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-300">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Amsterdam Central Station → Venue
                </h3>
                <div className="space-y-3 text-gray-600 dark:text-gray-300">
                  <p>
                    <strong>First 3 days:</strong> Room M1.01, Building M,
                    Roeterseilandcampus (REC)
                  </p>
                  <p>
                    <strong>Last 2 days:</strong> Rooms A2.06 and A2.10
                    (different tracks)
                  </p>
                  <p>
                    Take metro line 51, 53, or 54. Get off at Weesperplein and
                    walk to Nieuwe Achtergracht 166.
                  </p>
                  <a
                    href="https://www.uva.nl/locaties/roeterseiland/rec-e.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    View location details
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accommodation Header */}
        <div className="py-8 text-center">
          <Home className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Places to Stay
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Below are some hotel and student hostel recommendations. Additional
            options available through Airbnb or couch surfing.
          </p>
        </div>

        {/* Hotels */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Hotels
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hotels.map((hotel, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-300"
              >
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {hotel.name}
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                    ({hotel.distance})
                  </span>
                </h4>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <p>{hotel.address}</p>
                  <p>Phone: {hotel.phone}</p>
                  <p>Email: {hotel.email}</p>
                  {hotel.note && (
                    <p className="text-amber-600 dark:text-amber-400 italic mt-2 text-xs">
                      Note: {hotel.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Hostels */}
        <div className="pb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Student Hostels
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hostels.map((hostel, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-300"
              >
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {hostel.name}
                </h4>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <p>{hostel.address}</p>
                  <p>Phone: {hostel.phone}</p>
                  {hostel.email && <p>Email: {hostel.email}</p>}
                  {hostel.website && (
                    <a
                      href={hostel.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mt-2"
                    >
                      Visit website
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PracticalInfo
