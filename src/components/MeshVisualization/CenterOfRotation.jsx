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

export default CenterOfRotation
