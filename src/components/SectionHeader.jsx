const SectionHeader = ({ title, description, variant = 'default' }) => {
  const isLeadership = variant === 'leadership'

  return (
    <div className="text-center mb-12">
      <h2
        className={`text-4xl font-bold mb-4 ${
          isLeadership ? 'text-purple-900' : 'text-gray-900'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
export default SectionHeader
