import React from 'react'
import PageHeader from '../components/PageHeader'
import SectionHeader from '../components/SectionHeader'

const LeadershipCard = ({ member }) => {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:-translate-y-2">
      {/* Image Section */}
      <div className="relative w-full h-56 bg-gradient-to-br from-purple-600 to-blue-600 overflow-hidden">
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold bg-white/20 backdrop-blur-sm">
            {member.avatar}
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent to-black/20"></div>

        {/* Badge */}
        <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
          FACULTY
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
          {member.name}
        </h3>
        <p className="text-purple-600 dark:text-purple-400 font-bold mb-6 text-base uppercase tracking-wider">
          {member.designation}
        </p>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {member.introduction}
        </p>
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r from-purple-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  )
}

// Regular Team Member Card
const TeamMemberCard = ({ member }) => {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
      {/* Avatar Section */}
      <div className="relative bg-gradient-to-br from-blue-500 to-teal-500 p-6 text-center">
        <div className="w-16 h-16 mx-auto rounded-full mb-3 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
          {member.photo ? (
            <img
              src={member.photo}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xl font-bold">
              {member.avatar}
            </div>
          )}
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent to-black/10"></div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {member.name}
        </h3>
        <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4 text-sm uppercase tracking-wider">
          {member.designation}
        </p>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
          {member.introduction}
        </p>
      </div>

      {/* Decorative Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-blue-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  )
}

// Leadership Grid Component
const LeadershipGrid = ({ leaders }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
      {leaders.map((leader) => (
        <LeadershipCard key={leader.id} member={leader} />
      ))}
    </div>
  )
}

// Team Grid Component
const TeamGrid = ({ teamMembers }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {teamMembers.map((member) => (
        <TeamMemberCard key={member.id} member={member} />
      ))}
    </div>
  )
}

const TeamPage = () => {
  // Faculty team members
  const leadership = [
    {
      id: 1,
      name: 'Birte Forstmann',
      introduction:
        'I am a Full Professor of cognitive neuroscience at the University of Amsterdam (UvA), Professor for Neuroscientific Testing of Psychological Models at Leiden University, and honorary group leader of the integrative model-based cognitive neuroscience (IMCN) group at the Netherlands Institute for Neuroscience, The Netherlands. I received my Ph.D. in 2006 at the Max Planck Institute for Human Cognitive and Brain Sciences, Leipzig, Germany. My main research interest is in model-based cognitive neuroscience.',
      avatar: 'BF',
      photo: '/images/team/birte-fortsmann.jpg',
    },
    {
      id: 2,
      name: 'Anneke Alkemade',
      introduction:
        'I am an assistant professor and have a background in human neuroanatomy, specialising in the subcortex. My work is focused on providing neuroanatomical information that will help improve our understanding of the role of deep brain structures in behaviour. To this end, I study both living and post mortem brains using ultra-high field qMRI and various microscopic techniques.',
      avatar: 'AA',
      photo: '/images/team/anneke-alkemade.jpg',
    },
    {
      id: 3,
      name: 'Steven Miletić',
      introduction:
        'I am an assistant professor at Leiden University and senior scientist at the University of Amsterdam.  I am interested in model-based cognitive neuroscience with a strong focus on the human subcortex.',
      avatar: 'SM',
      photo: '/images/team/steven-miletic.png',
    },
  ]

  // Rest of the team (kept multiple entries exactly as in your version)
  const teamMembers = [
    {
      id: 4,
      name: 'Pilou Bazin',
      designation: 'Senior Scientist',
      introduction:
        'I am a senior scientist focussing on neuroimaging of the subcortex. My work combines ultra-high field magnetic resonance imaging with computational neuroanatomy in order to better understand the interplay of structure, connectivity and physiology of the subcortex in shaping human behavior.',
      avatar: 'PB',
      photo: null,
    },
    {
      id: 5,
      name: 'Pilou Bazin',
      designation: 'Senior Scientist',
      introduction:
        'I am a senior scientist focussing on neuroimaging of the subcortex. My work combines ultra-high field magnetic resonance imaging with computational neuroanatomy in order to better understand the interplay of structure, connectivity and physiology of the subcortex in shaping human behavior.',
      avatar: 'PB',
      photo: null,
    },
    {
      id: 6,
      name: 'Pilou Bazin',
      designation: 'Senior Scientist',
      introduction:
        'I am a senior scientist focussing on neuroimaging of the subcortex. My work combines ultra-high field magnetic resonance imaging with computational neuroanatomy in order to better understand the interplay of structure, connectivity and physiology of the subcortex in shaping human behavior.',
      avatar: 'PB',
      photo: null,
    },
    {
      id: 7,
      name: 'Pilou Bazin',
      designation: 'Senior Scientist',
      introduction:
        'I am a senior scientist focussing on neuroimaging of the subcortex. My work combines ultra-high field magnetic resonance imaging with computational neuroanatomy in order to better understand the interplay of structure, connectivity and physiology of the subcortex in shaping human behavior.',
      avatar: 'PB',
      photo: null,
    },
    {
      id: 8,
      name: 'Pilou Bazin',
      designation: 'Senior Scientist',
      introduction:
        'I am a senior scientist focussing on neuroimaging of the subcortex. My work combines ultra-high field magnetic resonance imaging with computational neuroanatomy in order to better understand the interplay of structure, connectivity and physiology of the subcortex in shaping human behavior.',
      avatar: 'PB',
      photo: null,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto">
        <PageHeader heading="Meet Our Team" />

        {/* Faculty Section */}
        <div className="mt-10 mb-10">
          <SectionHeader title="Faculty" variant="leadership" />
          <LeadershipGrid leaders={leadership} />
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
          <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
        </div>

        {/* Team Members Section */}
        <div className="mb-16">
          <SectionHeader title="Senior scientists, Postdocs & PhD students" />
          <TeamGrid teamMembers={teamMembers} />
        </div>
      </div>
    </div>
  )
}

export default TeamPage
