import { useState } from 'react'
import { ChevronDown, Eye, EyeOff } from 'lucide-react'

const BRAIN_REGIONS = [
  { id: '3V', name: '3rd Ventricle', meshFile: '3V-3_mesh.json' },
  { id: '4V', name: '4th Ventricle', meshFile: '4V-4_mesh.json' },
  { id: 'AMG', name: 'Amygdala', meshFile: 'AMG-L_mesh.json', hasLR: true },
  { id: 'CL', name: 'Claustrum', meshFile: 'CL-L_mesh.json', hasLR: true },
  { id: 'fx', name: 'Fornix', meshFile: 'fx-lr_mesh.json' },
  {
    id: 'GPe',
    name: 'Globus Pallidus External',
    meshFile: 'GPe-L_mesh.json',
    hasLR: true,
  },
  {
    id: 'GPi',
    name: 'Globus Pallidus Internal',
    meshFile: 'GPi-L_mesh.json',
    hasLR: true,
  },
  {
    id: 'ic',
    name: 'Internal Capsule',
    meshFile: 'ic-L_mesh.json',
    hasLR: true,
  },
  {
    id: 'LV',
    name: 'Lateral Ventricle',
    meshFile: 'LV-L_mesh.json',
    hasLR: true,
  },
  {
    id: 'PAG',
    name: 'Periaqueductal Gray',
    meshFile: 'PAG-L_mesh.json',
    hasLR: true,
  },
  {
    id: 'PPN',
    name: 'Pedunculopontine Nucleus',
    meshFile: 'PPN-L_mesh.json',
    hasLR: true,
  },
  { id: 'RN', name: 'Red Nucleus', meshFile: 'RN-L_mesh.json', hasLR: true },
  {
    id: 'SN',
    name: 'Substantia Nigra',
    meshFile: 'SN-L_mesh.json',
    hasLR: true,
  },
  {
    id: 'STN',
    name: 'Subthalamic Nucleus',
    meshFile: 'STN-L_mesh.json',
    hasLR: true,
  },
  { id: 'STR', name: 'Striatum', meshFile: 'STR-L_mesh.json', hasLR: true },
  { id: 'THA', name: 'Thalamus', meshFile: 'THA-L_mesh.json', hasLR: true },
  {
    id: 'VTA',
    name: 'Ventral Tegmental Area',
    meshFile: 'VTA-L_mesh.json',
    hasLR: true,
  },
]

function RegionDropdown({
  selectedRegions,
  setSelectedRegions,
  isCompact = false,
}) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleRegion = (regionId) => {
    setSelectedRegions((prev) =>
      prev.includes(regionId)
        ? prev.filter((id) => id !== regionId)
        : [...prev, regionId]
    )
  }

  const selectAll = () => {
    setSelectedRegions(BRAIN_REGIONS.map((r) => r.id))
  }

  const deselectAll = () => {
    setSelectedRegions([])
  }

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-2 border border-gray-600 rounded-lg bg-gray-800 cursor-pointer flex items-center justify-between hover:border-blue-400 transition-all duration-200 hover:bg-gray-700 ${
          isCompact ? 'text-xs' : 'text-sm'
        }`}
      >
        <span className="font-medium text-white truncate">
          {selectedRegions.length === 0
            ? 'No regions'
            : `${selectedRegions.length} region${
                selectedRegions.length !== 1 ? 's' : ''
              }`}
        </span>
        <ChevronDown
          size={14}
          className={`transform transition-transform duration-200 text-blue-400 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-gray-800 border border-gray-600 rounded-xl shadow-2xl max-h-72 overflow-hidden left-0">
          {/* Action buttons */}
          <div className="p-3 border-b border-gray-700 flex gap-2 bg-gray-900 rounded-t-xl">
            <button
              onClick={(e) => {
                e.stopPropagation()
                selectAll()
              }}
              className="px-3 py-1 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
            >
              Select All
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                deselectAll()
              }}
              className="px-3 py-1 text-xs bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
            >
              Deselect All
            </button>
          </div>

          {/* Region list */}
          <div className="max-h-48 overflow-y-auto">
            {BRAIN_REGIONS.map((region) => {
              const isSelected = selectedRegions.includes(region.id)
              return (
                <div
                  key={region.id}
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleRegion(region.id)
                  }}
                  className={`p-2 cursor-pointer flex items-center justify-between hover:bg-gray-700 transition-all duration-200 ${
                    isSelected ? 'bg-blue-900 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center">
                    {isSelected ? (
                      <Eye size={14} className="text-blue-400 mr-2" />
                    ) : (
                      <EyeOff size={14} className="text-gray-500 mr-2" />
                    )}
                    <span
                      className={`text-xs ${
                        isSelected
                          ? 'font-semibold text-blue-300'
                          : 'text-gray-300'
                      }`}
                    >
                      {region.name}
                      {region.hasLR && (
                        <span className="text-xs text-gray-500 ml-1 font-normal">
                          (L/R)
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default RegionDropdown
