const PageHeader = ({ heading, desciption }) => (
  <div className="bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg">
    <div className="max-w-screen mx-auto px-4 py-6 text-center">
      <h1 className="text-4xl font-bold text-white mb-3">{heading}</h1>
      <p className="text-blue-100 text-lg max-w-2xl mx-auto">{desciption}</p>
    </div>
  </div>
)
export default PageHeader
