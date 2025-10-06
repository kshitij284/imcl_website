import React, { useEffect, useState, useMemo, useCallback, memo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Maximize2 } from 'lucide-react'

import MeshComponent from './MeshVisualization/MeshComponent'
import BrainContainer from './MeshVisualization/BrainContainer'
import ColorLegend from './MeshVisualization/ColorLegend'
import ControlOverlay from './MeshVisualization/ControlOverlay'
import CenterOfRotation from './MeshVisualization/CenterOfRotation'

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

// Memoized MeshComponent wrapper
const MemoizedMeshComponent = memo(MeshComponent)

// Batch size for progressive loading
const BATCH_SIZE = 10

function BrainMeshViewer() {
  const [age, setAge] = useState(30)
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

  // Combined data storage
  const [dataMap, setDataMap] = useState({})
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [error, setError] = useState(null)

  // Track mouse position for tooltip
  useEffect(() => {
    const handleMouseMove = (e) =>
      setMousePosition({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Memoize the list of meshes to fetch
  const meshesToFetch = useMemo(() => {
    return BRAIN_REGIONS.filter((r) => selectedRegions.includes(r.id)).flatMap(
      (region) => {
        const sides = region.hasLR && showBilateral ? ['L', 'R'] : ['L']
        return sides.map((side) => {
          const meshFileName = region.hasLR
            ? `${region.id}-${side}_mesh.json`
            : region.meshFile
          const meshId = `${region.id}-${side}`
          return { meshId, meshFileName, region, side }
        })
      }
    )
  }, [selectedRegions, showBilateral])

  // Progressive loading with batching
  useEffect(() => {
    let isCancelled = false
    setError(null)
    setLoadingProgress(0)

    const loadDataProgressively = async () => {
      const newDataMap = {}
      const totalItems = meshesToFetch.length
      let loadedCount = 0

      // Process in batches
      for (let i = 0; i < meshesToFetch.length; i += BATCH_SIZE) {
        if (isCancelled) break

        const batch = meshesToFetch.slice(i, i + BATCH_SIZE)

        // Load meshes and predictions in parallel for this batch
        const batchPromises = batch.map(
          async ({ meshId, meshFileName, region, side }) => {
            try {
              // Check if already loaded
              if (
                dataMap[meshId]?.meshData &&
                dataMap[meshId]?.predData?.[predictionType]
              ) {
                return { meshId, data: dataMap[meshId] }
              }

              const predFileName = `${region.id}_${predictionType}_predictions.json`

              // Fetch mesh and prediction in parallel
              const [meshRes, predRes] = await Promise.all([
                dataMap[meshId]?.meshData
                  ? Promise.resolve({
                      ok: true,
                      json: () => Promise.resolve(dataMap[meshId].meshData),
                    })
                  : fetch(`data/exported_meshes/${meshFileName}`),
                fetch(`data/exported_predictions/${predFileName}`),
              ])

              if (!meshRes.ok) throw new Error(`Failed mesh: ${meshFileName}`)
              if (!predRes.ok)
                throw new Error(`Failed prediction: ${predFileName}`)

              const [meshData, predData] = await Promise.all([
                meshRes.json(),
                predRes.json(),
              ])

              return {
                meshId,
                data: {
                  region,
                  side,
                  meshData,
                  predData: { [predictionType]: predData },
                },
              }
            } catch (err) {
              console.error(`Error loading ${meshId}:`, err)
              return null
            }
          }
        )

        const batchResults = await Promise.allSettled(batchPromises)

        batchResults.forEach((result) => {
          if (result.status === 'fulfilled' && result.value) {
            const { meshId, data } = result.value
            newDataMap[meshId] = {
              ...dataMap[meshId],
              ...data,
              predData: {
                ...dataMap[meshId]?.predData,
                ...data.predData,
              },
            }
            loadedCount++
          }
        })

        // Update progress
        setLoadingProgress(Math.round((loadedCount / totalItems) * 100))

        // Update data map incrementally for progressive rendering
        if (!isCancelled) {
          setDataMap((prev) => ({ ...prev, ...newDataMap }))
        }
      }
    }

    loadDataProgressively()

    return () => {
      isCancelled = true
    }
  }, [meshesToFetch, predictionType])

  // Compute loaded data array - memoized
  const loadedData = useMemo(() => {
    return Object.keys(dataMap)
      .filter(
        (id) => dataMap[id]?.meshData && dataMap[id]?.predData?.[predictionType]
      )
      .map((id) => ({
        id,
        region: dataMap[id].region,
        side: dataMap[id].side,
        meshData: dataMap[id].meshData,
        predData: dataMap[id].predData[predictionType],
      }))
  }, [dataMap, predictionType])

  // Recalculate color scale - memoized
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
      setColorScale({
        min: Math.min(...allValues),
        max: Math.max(...allValues),
      })
    } else {
      setColorScale({ min: null, max: null })
    }
  }, [loadedData, age])

  const selectedPrediction = useMemo(
    () => PREDICTION_TYPES.find((p) => p.id === predictionType),
    [predictionType]
  )

  const handleHover = useCallback((meshName, value) => {
    setHoveredMesh(meshName)
    setHoveredValue(value)
  }, [])

  const handleHoverEnd = useCallback(() => {
    setHoveredMesh(null)
    setHoveredValue(null)
  }, [])

  const isLoading = loadingProgress < 100 && loadingProgress > 0

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black relative overflow-hidden">
      {/* Overlay controls */}
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

      {/* Loading progress bar */}
      {isLoading && (
        <div className="absolute top-0 left-0 right-0 z-50">
          <div className="h-1 bg-blue-900 bg-opacity-30">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-90 text-white px-4 py-2 rounded shadow-lg">
            Loading brain models... {loadingProgress}%
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-700 text-white px-4 py-2 rounded shadow-lg z-50">
          {error}
        </div>
      )}

      {/* Info box */}
      {!isControlsCollapsed && (
        <div className="absolute bottom-4 right-4 text-white bg-black bg-opacity-90 p-4 rounded-xl backdrop-blur-md border border-white border-opacity-10 shadow-2xl">
          <div className="flex items-center mb-2">
            <Maximize2 size={16} className="mr-2 text-blue-400" />
            <span className="font-bold">Age: {age} years</span>
          </div>
          <div className="text-sm mb-3 text-blue-200 font-medium">
            {selectedPrediction?.name}
          </div>
          {loadedData.length > 0 && (
            <div className="text-xs text-gray-400">
              {loadedData.length} regions loaded
            </div>
          )}
        </div>
      )}

      {/* Tooltip */}
      {hoveredMesh && hoveredValue !== null && (
        <div
          className="absolute pointer-events-none z-50 bg-black bg-opacity-90 text-white p-3 rounded-lg text-sm shadow-2xl border border-white border-opacity-20"
          style={{
            left: mousePosition.x + 10,
            top: mousePosition.y - 10,
            transform: 'translateY(-100%)',
          }}
        >
          <div className="font-bold text-blue-300">{hoveredMesh}</div>
          <div className="text-xs text-gray-300">
            Value: {hoveredValue?.toFixed(3)} {selectedPrediction?.unit}
          </div>
        </div>
      )}

      {/* 3D Scene */}
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
        dpr={[1, 2]} // Limit pixel ratio for performance
        performance={{ min: 0.5 }} // Allow frame rate to drop if needed
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <directionalLight position={[-10, -10, -5]} intensity={0.6} />
        <pointLight position={[0, 20, 10]} intensity={0.8} />

        {showCenter && <CenterOfRotation />}
        <BrainContainer onHover={handleHover} onHoverEnd={handleHoverEnd}>
          {loadedData.map((item) => (
            <MemoizedMeshComponent
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
          enablePan
          enableZoom
          enableRotate
          maxDistance={15}
          minDistance={2}
          enableDamping
          dampingFactor={0.05}
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
