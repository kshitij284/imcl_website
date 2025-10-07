import {
  ChevronDown,
  Eye,
  EyeOff,
  Info,
  Settings,
  Maximize2,
  ChevronRight,
  ChevronLeft,
  Activity,
} from 'lucide-react'
import RegionDropdown from './RegionDropdown'

const PREDICTION_TYPES = [
  { id: 'iron_median', name: 'Iron (Median)', unit: 'μg/g' },
  { id: 'iron_iqr', name: 'Iron (IQR)', unit: 'μg/g' },
  { id: 'myelin_median', name: 'Myelin (Median)', unit: 'ratio' },
  { id: 'myelin_iqr', name: 'Myelin (IQR)', unit: 'ratio' },
  { id: 'qpd_median', name: 'QPD (Median)', unit: 'ratio' },
  { id: 'qpd_iqr', name: 'QPD (IQR)', unit: 'ratio' },
  { id: 'qsm_median', name: 'QSM (Median)', unit: 'ppm' },
  { id: 'qsm_iqr', name: 'QSM (IQR)', unit: 'ppm' },
  { id: 'r1hz_median', name: 'R1 (Median)', unit: 'Hz' },
  { id: 'r1hz_iqr', name: 'R1 (IQR)', unit: 'Hz' },
  { id: 'r2hz_median', name: 'R2 (Median)', unit: 'Hz' },
  { id: 'r2hz_iqr', name: 'R2 (IQR)', unit: 'Hz' },
  { id: 'thickness_median', name: 'Thickness (Median)', unit: 'mm' },
  { id: 'thickness_iqr', name: 'Thickness (IQR)', unit: 'mm' },
  { id: 'volume_volume', name: 'Volume', unit: 'mm³' },
  { id: 'volume_voxels', name: 'Volume (Voxels)', unit: 'voxels' },
]

function ControlOverlay({
  age,
  setAge,
  predictionType,
  setPredictionType,
  selectedRegions,
  setSelectedRegions,
  showBilateral,
  setShowBilateral,
  showCenter,
  setShowCenter,
  showPredictionColors,
  setShowPredictionColors,
  selectedPrediction,
  isCollapsed,
  setIsCollapsed,
}) {
  return (
    <div
      className={`absolute top-4 left-4 bg-black bg-opacity-90 text-white rounded-xl backdrop-blur-md border border-white border-opacity-20 shadow-2xl transition-all duration-300 z-30 ${
        isCollapsed ? 'w-12' : 'w-80'
      }`}
    >
      {/* Header with collapse toggle */}
      <div className="flex items-center justify-between p-4 border-b border-white border-opacity-20">
        {!isCollapsed && (
          <div className="flex items-center">
            <Settings size={18} className="mr-2 text-blue-400" />
            <span className="font-bold text-lg">Controls</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all duration-200"
        >
          {isCollapsed ? (
            <ChevronRight size={18} className="text-blue-400" />
          ) : (
            <ChevronLeft size={18} className="text-blue-400" />
          )}
        </button>
      </div>

      {!isCollapsed && (
        <div className="p-4 space-y-6">
          {/* Prediction Mode Toggle */}
          <div className="bg-gradient-to-r from-purple-900 to-indigo-900 p-4 rounded-lg border border-purple-700 border-opacity-50">
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center">
                <Activity size={18} className="mr-2 text-purple-400" />
                <span className="text-sm font-bold">Prediction Mode</span>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={showPredictionColors}
                  onChange={(e) => setShowPredictionColors(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </div>
            </label>
            <p className="text-xs text-gray-300 mt-2">
              {showPredictionColors
                ? 'Showing prediction-based heatmap'
                : 'Showing anatomical colors'}
            </p>
          </div>

          {/* Age Control - Only visible in prediction mode */}
          {showPredictionColors && (
            <div>
              <label className="block text-sm font-bold mb-3">
                Age: <span className="text-blue-400 text-lg">{age} years</span>
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="19"
                  max="80"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full h-2 bg-gray-600 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                      ((age - 19) / (80 - 19)) * 100
                    }%, #4b5563 ${
                      ((age - 19) / (80 - 19)) * 100
                    }%, #4b5563 100%)`,
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>19</span>
                <span>80</span>
              </div>
            </div>
          )}

          {/* Prediction Type - Only visible in prediction mode */}
          {showPredictionColors && (
            <div>
              <label className="block text-sm font-bold mb-3">
                Measurement Type
              </label>
              <select
                value={predictionType}
                onChange={(e) => setPredictionType(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded-lg bg-gray-800 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                {PREDICTION_TYPES.map((pred) => (
                  <option key={pred.id} value={pred.id} className="bg-gray-800">
                    {pred.name}
                  </option>
                ))}
              </select>
              <div className="text-xs text-gray-400 mt-2">
                Unit:{' '}
                <span className="text-blue-400 font-mono">
                  {selectedPrediction?.unit}
                </span>
              </div>
            </div>
          )}

          {/* Brain Regions */}
          <div>
            <label className="block text-sm font-bold mb-3">
              Brain Regions
            </label>
            <RegionDropdown
              selectedRegions={selectedRegions}
              setSelectedRegions={setSelectedRegions}
              isCompact={true}
            />
          </div>

          {/* Settings */}
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={showBilateral}
                onChange={(e) => setShowBilateral(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-600 bg-gray-800 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium">Both Hemispheres</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={showCenter}
                onChange={(e) => setShowCenter(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-600 bg-gray-800 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium">Rotation Center</span>
            </label>
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-3 rounded-lg border border-blue-700 border-opacity-50">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold">Active Regions:</span>
              <span className="font-mono text-green-400">
                {selectedRegions.length}
              </span>
            </div>
            {showPredictionColors && (
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold">Current Age:</span>
                <span className="font-mono text-yellow-400">{age} years</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ControlOverlay
