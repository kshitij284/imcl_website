import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import * as THREE from 'three'

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
  const geometryRef = useRef(null)
  const onMeshLoadedRef = useRef(onMeshLoaded)

  // Keep the ref updated
  useEffect(() => {
    onMeshLoadedRef.current = onMeshLoaded
  }, [onMeshLoaded])

  // Cleanup function
  const disposeGeometry = useCallback((geom) => {
    if (geom) {
      Object.keys(geom.attributes).forEach((key) => {
        const attribute = geom.attributes[key]
        if (attribute && typeof attribute.dispose === 'function') {
          attribute.dispose()
        }
      })
      if (geom.index) geom.index.dispose?.()
      if (typeof geom.dispose === 'function') geom.dispose()
    }
  }, [])

  // Memoize display name
  const displayName = useMemo(
    () => `${region.name}${region.hasLR ? ` (${side})` : ''}`,
    [region.name, region.hasLR, side]
  )

  // Update geometry
  useEffect(() => {
    if (!meshData || !predData || colorMin === null || colorMax === null) {
      setGeometry(null)
      return
    }

    try {
      const { vertices, faces } = meshData
      const newGeometry = new THREE.BufferGeometry()

      // Positions - keep original positions to maintain relationships
      const positions = new Float32Array(vertices.flat())
      newGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
      )

      // Faces
      const indices = new Uint32Array(faces.flat())
      newGeometry.setIndex(new THREE.BufferAttribute(indices, 1))

      // Colors
      const colors = new Float32Array(vertices.length * 3)
      const predictionValues =
        predData[age] || predData[Object.keys(predData)[0]] || []

      const avgValue = Array.isArray(predictionValues)
        ? predictionValues.reduce((sum, val) => sum + (val || 0), 0) /
          predictionValues.length
        : predictionValues || 0

      setCurrentValue(avgValue)

      const range = colorMax - colorMin
      const color = new THREE.Color()

      for (let i = 0; i < vertices.length; i++) {
        const val = Array.isArray(predictionValues)
          ? predictionValues[i] || 0
          : predictionValues || 0
        const normalizedVal = range > 0 ? (val - colorMin) / range : 0
        color.setHSL((1 - normalizedVal) * 0.6, 0.8, 0.5)
        colors[i * 3] = color.r
        colors[i * 3 + 1] = color.g
        colors[i * 3 + 2] = color.b
      }

      newGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

      // Normals
      newGeometry.computeVertexNormals()

      // Compute bounding box WITHOUT translating geometry
      newGeometry.computeBoundingBox()
      newGeometry.computeBoundingSphere()

      // Dispose old geometry
      if (geometryRef.current) {
        disposeGeometry(geometryRef.current)
      }

      geometryRef.current = newGeometry
      setGeometry(newGeometry)

      if (onMeshLoadedRef.current) {
        onMeshLoadedRef.current(meshRef.current)
      }
    } catch (err) {
      console.error('Error creating geometry:', err)
      setGeometry(null)
    }
  }, [meshData, predData, age, colorMin, colorMax, disposeGeometry])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (geometryRef.current) {
        disposeGeometry(geometryRef.current)
        geometryRef.current = null
      }
    }
  }, [disposeGeometry])

  // Memoize hover handlers
  const handlePointerEnter = useCallback(() => {
    if (onHover) onHover(displayName, currentValue, unit)
  }, [onHover, displayName, currentValue, unit])

  const handlePointerLeave = useCallback(() => {
    if (onHoverEnd) onHoverEnd()
  }, [onHoverEnd])

  if (!geometry) return null

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
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

// Memoize with custom comparison
export default React.memo(MeshComponent, (prevProps, nextProps) => {
  return (
    prevProps.age === nextProps.age &&
    prevProps.colorMin === nextProps.colorMin &&
    prevProps.colorMax === nextProps.colorMax &&
    prevProps.meshData === nextProps.meshData &&
    prevProps.predData === nextProps.predData &&
    prevProps.region === nextProps.region &&
    prevProps.side === nextProps.side
  )
})
