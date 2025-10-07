import { Info } from 'lucide-react'

// Color Legend Component
function ColorLegend({ predictionType, unit, colorMin, colorMax }) {
  return (
    <div className="absolute top-6 right-6 bg-black bg-opacity-90 p-5 rounded-xl text-white text-sm backdrop-blur-md border border-white border-opacity-10 shadow-2xl">
      <div className="font-bold mb-3 flex items-center">
        <Info size={18} className="mr-2 text-blue-400" />
        {predictionType}
      </div>
      <div className="text-xs mb-4 text-gray-300">Unit: {unit}</div>
      <div className="flex justify-between text-xs mb-3 font-medium">
        <span>{colorMin?.toFixed(3)}</span>
        <span>{colorMax?.toFixed(3)}</span>
      </div>
      <div className="flex items-center">
        <span className="text-xs mr-3 font-medium">Low</span>
        <div className="w-32 h-4 bg-gradient-to-r from-white to-red-600 rounded-full shadow-inner"></div>
        <span className="text-xs ml-3 font-medium">High</span>
      </div>
    </div>
  )
}

export default ColorLegend
