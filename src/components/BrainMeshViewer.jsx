import React, { useEffect, useState, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import {
  ChevronDown,
  Eye,
  EyeOff,
  Info,
  Settings,
  Maximize2,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react'

// Brain region data
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

// Custom Dropdown Component for regions
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
        className={`w-full p-2 border border-gray-300 rounded-lg bg-white cursor-pointer flex items-center justify-between hover:border-blue-400 transition-all duration-200 hover:shadow-md ${
          isCompact ? 'text-xs' : 'text-sm'
        }`}
      >
        <span className="font-medium text-gray-700 truncate">
          {selectedRegions.length === 0
            ? 'No regions'
            : `${selectedRegions.length} region${
                selectedRegions.length !== 1 ? 's' : ''
              }`}
        </span>
        <ChevronDown
          size={14}
          className={`transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-30 w-64 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl max-h-72 overflow-y-auto right-0">
          {/* Action buttons */}
          <div className="p-3 border-b border-gray-100 flex gap-2 bg-gray-50 rounded-t-xl">
            <button
              onClick={selectAll}
              className="px-3 py-1 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
            >
              Select All
            </button>
            <button
              onClick={deselectAll}
              className="px-3 py-1 text-xs bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium"
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
                  onClick={() => toggleRegion(region.id)}
                  className={`p-2 cursor-pointer flex items-center justify-between hover:bg-blue-50 transition-all duration-200 ${
                    isSelected ? 'bg-blue-100 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center">
                    {isSelected ? (
                      <Eye size={14} className="text-blue-500 mr-2" />
                    ) : (
                      <EyeOff size={14} className="text-gray-400 mr-2" />
                    )}
                    <span
                      className={`text-xs ${
                        isSelected
                          ? 'font-semibold text-blue-700'
                          : 'text-gray-700'
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

// Control Panel Overlay Component
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
  selectedPrediction,
  isCollapsed,
  setIsCollapsed,
}) {
  return (
    <div
      className={`absolute top-4 left-4 bg-black bg-opacity-90 text-white rounded-xl backdrop-blur-md border border-white border-opacity-20 shadow-2xl transition-all duration-300 z-20 ${
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
          {/* Age Control */}
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

          {/* Prediction Type */}
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
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold">Current Age:</span>
              <span className="font-mono text-yellow-400">{age} years</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Individual Mesh Component with hover detection
function MeshComponent({
  region,
  side,
  age,
  predictionType,
  onMeshLoaded,
  colorMin,
  colorMax,
  meshData,
  predData,
  onHover,
  onHoverEnd,
  unit,
}) {
  const [geometry, setGeometry] = useState(null)
  const [currentValue, setCurrentValue] = useState(null)
  const meshRef = useRef()

  // Update geometry when data or color scale changes
  useEffect(() => {
    if (!meshData || !predData || colorMin === null || colorMax === null) {
      setGeometry(null)
      return
    }

    try {
      const { vertices, faces } = meshData
      const geometry = new THREE.BufferGeometry()

      const positions = new Float32Array(vertices.flat())
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

      const indices = new Uint32Array(faces.flat())
      geometry.setIndex(new THREE.BufferAttribute(indices, 1))

      const colors = new Float32Array(vertices.length * 3)
      const predictionValues =
        predData[age] || predData[Object.keys(predData)[0]] || []

      // Calculate average value for this mesh
      const avgValue = Array.isArray(predictionValues)
        ? predictionValues.reduce((sum, val) => sum + (val || 0), 0) /
          predictionValues.length
        : predictionValues || 0

      setCurrentValue(avgValue)

      const range = colorMax - colorMin

      vertices.forEach((v, i) => {
        const val = Array.isArray(predictionValues)
          ? predictionValues[i] || 0
          : predictionValues || 0

        const normalizedVal = range > 0 ? (val - colorMin) / range : 0

        const color = new THREE.Color()
        color.setHSL((1 - normalizedVal) * 0.6, 0.8, 0.5)

        colors[i * 3] = color.r
        colors[i * 3 + 1] = color.g
        colors[i * 3 + 2] = color.b
      })

      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
      geometry.computeVertexNormals()
      setGeometry(geometry)

      // Notify parent that mesh is loaded
      if (onMeshLoaded) {
        onMeshLoaded(geometry)
      }
    } catch (err) {
      console.error('Error creating geometry:', err)
      setGeometry(null)
    }
  }, [meshData, predData, age, onMeshLoaded, colorMin, colorMax])

  if (!geometry) {
    return null
  }

  const displayName = `${region.name}${region.hasLR ? ` (${side})` : ''}`

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      onPointerEnter={() => onHover && onHover(displayName, currentValue, unit)}
      onPointerLeave={() => onHoverEnd && onHoverEnd()}
    >
      <meshStandardMaterial
        vertexColors
        side={THREE.DoubleSide}
        transparent
        opacity={0.8}
        wireframe={false}
      />
    </mesh>
  )
}

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
        <div className="w-32 h-4 bg-gradient-to-r from-blue-500 via-green-500 to-red-500 rounded-full shadow-inner"></div>
        <span className="text-xs ml-3 font-medium">High</span>
      </div>
    </div>
  )
}

// Center of Rotation Indicator
function CenterOfRotation() {
  return (
    <group>
      {/* Center point marker */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.1, 32, 16]} />
        <meshBasicMaterial color="#ff4444" />
      </mesh>

      {/* Simple axes indicators */}
      <mesh position={[3, 0, 0]}>
        <boxGeometry args={[6, 0.1, 0.1]} />
        <meshBasicMaterial color="#ff4444" />
      </mesh>
      <mesh position={[0, 3, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[6, 0.1, 0.1]} />
        <meshBasicMaterial color="#44ff44" />
      </mesh>
      <mesh position={[0, 0, 3]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[6, 0.1, 0.1]} />
        <meshBasicMaterial color="#4444ff" />
      </mesh>
    </group>
  )
}

// Brain Container to center all meshes
function BrainContainer({ children, onHover, onHoverEnd }) {
  const pivotRef = useRef()
  const groupRef = useRef()
  const [loadedGeometries, setLoadedGeometries] = useState([])

  const handleMeshLoaded = (geometry) => {
    setLoadedGeometries((prev) => [...prev, geometry])
  }

  // Center the entire brain once all meshes are loaded
  useEffect(() => {
    if (
      loadedGeometries.length > 0 &&
      loadedGeometries.length === React.Children.count(children) &&
      groupRef.current
    ) {
      const overallBox = new THREE.Box3()

      loadedGeometries.forEach((geometry) => {
        geometry.computeBoundingBox()
        overallBox.union(geometry.boundingBox)
      })

      const center = overallBox.getCenter(new THREE.Vector3())

      groupRef.current.position.x = -center.x
      groupRef.current.position.y = -center.y
      groupRef.current.position.z = -center.z

      if (pivotRef.current) {
        pivotRef.current.rotation.set(-Math.PI / 2, 0, 0)
      }
    }
  }, [loadedGeometries, children])

  return (
    <group ref={pivotRef}>
      <group ref={groupRef}>
        {React.Children.map(children, (child) =>
          React.cloneElement(child, {
            onMeshLoaded: handleMeshLoaded,
            onHover,
            onHoverEnd,
          })
        )}
      </group>
    </group>
  )
}

function BrainMeshViewer() {
  const [age, setAge] = useState('30')
  const [predictionType, setPredictionType] = useState('iron_median')
  const [selectedRegions, setSelectedRegions] = useState(
    BRAIN_REGIONS.map((r) => r.id)
  )
  const [showBilateral, setShowBilateral] = useState(true)
  const [showCenter, setShowCenter] = useState(true)
  const [colorScale, setColorScale] = useState({ min: null, max: null })
  const [hoveredMesh, setHoveredMesh] = useState(null)
  const [hoveredValue, setHoveredValue] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isControlsCollapsed, setIsControlsCollapsed] = useState(false)

  // State to hold all the data for the currently selected regions
  const [loadedData, setLoadedData] = useState([])

  // Track mouse position for hover tooltip
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Effect to load all data for the selected regions and prediction type
  useEffect(() => {
    const fetchData = async () => {
      if (selectedRegions.length === 0) {
        setLoadedData([])
        return
      }

      const dataPromises = BRAIN_REGIONS.filter((region) =>
        selectedRegions.includes(region.id)
      ).flatMap((region) => {
        const regionsToFetch =
          region.hasLR && showBilateral ? ['L', 'R'] : ['L']
        return regionsToFetch.map((side) => {
          const meshFileName = region.hasLR
            ? `${region.id}-${side}_mesh.json`
            : region.meshFile
          const predFileName = `${region.id}_${predictionType}_predictions.json`

          return Promise.all([
            fetch(`data/exported_meshes/${meshFileName}`).then((res) =>
              res.json()
            ),
            fetch(`data/exported_predictions/${predFileName}`).then((res) =>
              res.json()
            ),
          ]).then(([meshData, predData]) => ({
            id: `${region.id}-${side}`,
            region,
            side,
            meshData,
            predData,
          }))
        })
      })

      const allData = await Promise.all(dataPromises)
      setLoadedData(allData)
    }

    fetchData()
  }, [selectedRegions, predictionType, showBilateral])

  // Effect to calculate color scale from the loaded data
  useEffect(() => {
    if (loadedData.length === 0) {
      setColorScale({ min: null, max: null })
      return
    }

    let allValues = []
    loadedData.forEach((item) => {
      const predictionValues =
        item.predData[age] || item.predData[Object.keys(item.predData)[0]] || []
      allValues = allValues.concat(predictionValues)
    })

    if (allValues.length > 0) {
      const minVal = Math.min(...allValues)
      const maxVal = Math.max(...allValues)
      setColorScale({ min: minVal, max: maxVal })
    } else {
      setColorScale({ min: null, max: null })
    }
  }, [loadedData, age])

  const selectedPrediction = PREDICTION_TYPES.find(
    (p) => p.id === predictionType
  )

  const handleHover = (meshName, value, unit) => {
    setHoveredMesh(meshName)
    setHoveredValue(value)
  }

  const handleHoverEnd = () => {
    setHoveredMesh(null)
    setHoveredValue(null)
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black relative overflow-hidden">
      {/* Control Panel Overlay */}
      <ControlOverlay
        age={age}
        setAge={setAge}
        predictionType={predictionType}
        setPredictionType={setPredictionType}
        selectedRegions={selectedRegions}
        setSelectedRegions={setSelectedRegions}
        showBilateral={showBilateral}
        setShowBilateral={setShowBilateral}
        showCenter={showCenter}
        setShowCenter={setShowCenter}
        selectedPrediction={selectedPrediction}
        isCollapsed={isControlsCollapsed}
        setIsCollapsed={setIsControlsCollapsed}
      />
  
      {!isControlsCollapsed && (
        <div className="absolute bottom-4 right-4 text-white bg-black bg-opacity-90 p-4 rounded-xl backdrop-blur-md border border-white border-opacity-10 shadow-2xl">
          <div className="flex items-center mb-2">
            <Maximize2 size={16} className="mr-2 text-blue-400" />
            <span className="font-bold">Age: {age} years</span>
          </div>
          <div className="text-sm mb-3 text-blue-200 font-medium">
            {selectedPrediction?.name}
          </div>
          <div className="text-xs text-gray-300 space-y-1">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              Mouse: orbit, zoom, pan
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
              Hover: show values
            </div>
            {/* {showCenter && (
              <div className="flex items-center text-red-300">
                <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                Red dot: rotation center
              </div>
            )} */}
          </div>
        </div>
      )}

      <Canvas
        camera={{ position: [0, 0, 150], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <directionalLight position={[-10, -10, -5]} intensity={0.6} />
        <pointLight position={[0, 20, 10]} intensity={0.8} />

        {/* Show center of rotation if enabled */}
        {showCenter && <CenterOfRotation />}

        {/* Brain container to center all meshes */}
        <BrainContainer onHover={handleHover} onHoverEnd={handleHoverEnd}>
          {/* Render selected regions with their pre-loaded data */}
          {loadedData.map((item) => (
            <MeshComponent
              key={item.id}
              region={item.region}
              side={item.side}
              age={age}
              predictionType={predictionType}
              meshData={item.meshData}
              predData={item.predData}
              colorMin={colorScale.min}
              colorMax={colorScale.max}
              unit={selectedPrediction?.unit}
            />
          ))}
        </BrainContainer>

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxDistance={15}
          minDistance={5}
        />
      </Canvas>

      <ColorLegend
        predictionType={selectedPrediction?.name}
        unit={selectedPrediction?.unit}
        colorMin={colorScale.min}
        colorMax={colorScale.max}
      />
    </div>
  )
}

export default BrainMeshViewer