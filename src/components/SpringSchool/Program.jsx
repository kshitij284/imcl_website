import React from 'react'
import { Calendar, Clock } from 'lucide-react'

function Program() {
  const days = [
    {
      day: 'Day 1',
      title: 'Workshop day',
      sessions: [
        { time: '10:00', title: 'Introduction' },
        { time: '10:15', title: 'Udo Böhm – Basic Bayes' },
        {
          time: '11:00',
          title:
            'Andrew Heathcote – EMC basics with the Wiener Diffusion Model (WDM)',
        },
        { time: '12:00', title: 'Lunch', isBreak: true },
        { time: '13:00', title: 'Andrew Heathcote – Model Parsimony' },
        {
          time: '13:30',
          title:
            'Andrew Heathcote – EMC basics with the Diffusion Decision Model (DDM) and Race Models',
        },
        { time: '15:00', title: 'Coffee/Tea', isBreak: true },
        { time: '15:15', title: 'Niek/Andrew – Revision, Q&A and exercises' },
        {
          time: '16:00',
          title: 'Russell Boag – Evidence-accumulation models in the wild',
        },
        { time: '17:00', title: 'Drinks at CREA', isBreak: true },
      ],
    },
    {
      day: 'Day 2',
      title: 'Workshop Day',
      sessions: [
        {
          time: '10:00',
          title: 'Niek Stevenson – What are Hierarchical Models',
        },
        { time: '10:30', title: 'Niek Stevenson – Hierarchical EAM in EMC2' },
        { time: '12:00', title: 'Lunch', isBreak: true },
        {
          time: '13:00',
          title: 'Niek Stevenson – Covariates and group-level inference',
        },
        { time: '15:00', title: 'Coffee/Tea', isBreak: true },
        {
          time: '15:15',
          title: 'Andrew Heathcote – Revision, Q&A and exercises',
        },
        {
          time: '16:00',
          title:
            'Michelle Donzallaz – Using hierarchical models to guard against spurious conclusions',
        },
      ],
    },
    {
      day: 'Day 3',
      title: 'Workshop Day',
      sessions: [
        {
          time: '10:00',
          title: 'Niek/Andrew – Parameter and model recovery including SBC',
        },
        { time: '12:00', title: 'Lunch', isBreak: true },
        { time: '13:00', title: 'Andrew Heathcote – Building new models' },
        { time: '14:00', title: 'Niek Stevenson – Joint models' },
        { time: '15:00', title: 'Coffee/Tea', isBreak: true },
        { time: '15:15', title: 'Niek/Andrew – Revision, Q&A and exercises' },
      ],
    },
  ]

  const trackDays = [
    {
      day: 'Day 4',
      tracks: [
        {
          name: 'Neuroscience Track',
          sessions: [
            {
              time: '10:00',
              title: 'Udo Böhm – Plausible values and noisy covariates',
            },
            { time: '12:00', title: 'Lunch', isBreak: true },
            {
              time: '13:00',
              title: 'Steven Miletic – Introduction to model-based fMRI',
            },
            {
              time: '14:00',
              title:
                'Steven/Niek – Joint modelling of fMRI and behavior in EMC2',
            },
            { time: '15:00', title: 'Coffee/Tea', isBreak: true },
            {
              time: '15:15',
              title:
                'Steven/Niek – Joint modelling of fMRI and behavior in EMC2',
            },
            {
              time: '16:00',
              title: 'Steven/Niek – Q&A, your data, and exercise',
            },
          ],
        },
        {
          name: 'Advanced Cognition Track',
          sessions: [
            {
              time: '10:00',
              title: 'Udo Böhm – Plausible values and noisy covariates',
            },
            { time: '12:00', title: 'Lunch', isBreak: true },
            {
              time: '13:00',
              title: 'Dora Matzke – Stop-signal models in the wild',
            },
            {
              time: '14:00',
              title: 'Michelle Donzallaz – Stop-signal modelling',
            },
            { time: '15:00', title: 'Coffee/Tea', isBreak: true },
            {
              time: '15:15',
              title: 'Michelle Donzallaz – Stop-signal modelling',
            },
            {
              time: '16:00',
              title: 'Michelle/Andrew – Q&A, your data, and exercise',
            },
          ],
        },
      ],
    },
    {
      day: 'Day 5',
      tracks: [
        {
          name: 'Neuroscience Track',
          sessions: [
            { time: '10:00', title: 'Michael Nunez – Introduction to M/EEG' },
            {
              time: '11:00',
              title:
                'Michael Nunez – Alternative strategies for joint modelling',
            },
            { time: '12:00', title: 'Lunch', isBreak: true },
            {
              time: '13:00',
              title: 'Michael Nunez – Joint modelling exercises in JAGS/Stan',
            },
            { time: '14:10', title: 'Coffee/Tea', isBreak: true },
            {
              time: '14:25',
              title: 'Michael Nunez – Joint modelling exercises in BayesFlow',
            },
            { time: '15:35', title: 'Coffee/Tea', isBreak: true },
            { time: '15:50', title: 'Closing discussion', isBreak: true },
          ],
        },
        {
          name: 'Advanced Cognition Track',
          sessions: [
            {
              time: '10:00',
              title: 'Russell Boag – Specifying feed-forward evidence theories',
            },
            { time: '11:30', title: 'Russell Boag – Learning curves' },
            { time: '12:00', title: 'Lunch', isBreak: true },
            {
              time: '13:00',
              title:
                'Steven Miletic – Introduction to Reinforcement Learning and Adaptive EAMS',
            },
            {
              time: '13:30',
              title:
                'Steven Miletic – Reinforcement learning and Adaptive models',
            },
            { time: '15:35', title: 'Coffee/Tea', isBreak: true },
            { time: '15:50', title: 'Closing discussion', isBreak: true },
          ],
        },
      ],
    },
  ]

  return (
    <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Provisional Program
            </span>
          </h2>
        </div>

        {/* Workshop Days (1-3) */}
        <div className="space-y-6 mb-12">
          {days.map((day, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-300"
            >
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {day.day}: {day.title}
                </h3>
              </div>
              <div className="space-y-2">
                {day.sessions.map((session, sIdx) => (
                  <div key={sIdx} className="flex items-start">
                    <Clock className="h-4 w-4 mr-3 mt-1 text-gray-400 flex-shrink-0" />
                    <span className="font-medium text-gray-900 dark:text-white w-16 flex-shrink-0">
                      {session.time}
                    </span>
                    <span
                      className={`${
                        session.isBreak
                          ? 'italic text-gray-500 dark:text-gray-400'
                          : 'text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {session.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Track Days (4-5) */}
        {trackDays.map((trackDay, idx) => (
          <div key={idx} className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              {trackDay.day}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {trackDay.tracks.map((track, tIdx) => (
                <div
                  key={tIdx}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-300"
                >
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    {track.name}
                  </h4>
                  <div className="space-y-2">
                    {track.sessions.map((session, sIdx) => (
                      <div key={sIdx} className="flex items-start">
                        <Clock className="h-4 w-4 mr-3 mt-1 text-gray-400 flex-shrink-0" />
                        <span className="font-medium text-gray-900 dark:text-white w-16 flex-shrink-0">
                          {session.time}
                        </span>
                        <span
                          className={`${
                            session.isBreak
                              ? 'italic text-gray-500 dark:text-gray-400'
                              : 'text-gray-600 dark:text-gray-300'
                          }`}
                        >
                          {session.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Program
