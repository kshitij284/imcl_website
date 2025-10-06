import React, { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

function BrainContainer({ children, onHover, onHoverEnd }) {
  const rotationGroupRef = useRef() // Handles rotation only
  const positionGroupRef = useRef() // Handles centering only
  const [meshCount, setMeshCount] = useState(0)
  const isCenteredRef = useRef(false)
  const meshRefs = useRef([])
  const lastChildCountRef = useRef(0)
  const centeringAttemptedRef = useRef(false)

  const handleMeshLoaded = (meshRef) => {
    if (meshRef && !meshRefs.current.includes(meshRef)) {
      meshRefs.current.push(meshRef)
      setMeshCount((prev) => prev + 1)
    }
  }

  // Reset when child count actually changes
  useEffect(() => {
    const childCount = React.Children.count(children)

    if (childCount !== lastChildCountRef.current) {
      console.log(
        'Child count changed from',
        lastChildCountRef.current,
        'to',
        childCount
      )
      meshRefs.current = []
      setMeshCount(0)
      isCenteredRef.current = false
      centeringAttemptedRef.current = false
      lastChildCountRef.current = childCount

      if (positionGroupRef.current) {
        positionGroupRef.current.position.set(0, 0, 0)
      }
    }
  }, [children])

  // Center after all meshes are loaded - runs every frame until centered
  useFrame(() => {
    const childCount = React.Children.count(children)

    if (!isCenteredRef.current && childCount > 0 && positionGroupRef.current) {
      // Only attempt centering once per load
      if (centeringAttemptedRef.current) return
      centeringAttemptedRef.current = true

      // Reduced timeout for faster centering
      setTimeout(() => {
        if (!positionGroupRef.current) return

        // Calculate bounding box in LOCAL space (before rotation)
        const box = new THREE.Box3()
        let meshesFound = 0

        positionGroupRef.current.traverse((object) => {
          if (object.isMesh && object.geometry) {
            if (object.geometry.attributes.position) {
              if (!object.geometry.boundingBox) {
                object.geometry.computeBoundingBox()
              }
              box.union(object.geometry.boundingBox)
              meshesFound++
            }
          }
        })

        // Only center if we found all expected meshes
        if (!box.isEmpty() && meshesFound === childCount) {
          const center = box.getCenter(new THREE.Vector3())
          positionGroupRef.current.position.set(-center.x, -center.y, -center.z)
          isCenteredRef.current = true
        } else {
          // If centering failed, allow retry on next frame
          centeringAttemptedRef.current = false
        }
      }, 50)
    }
  })

  return (
    <group ref={rotationGroupRef} rotation={[-Math.PI / 2, 0, 0]}>
      <group ref={positionGroupRef}>
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

export default BrainContainer
