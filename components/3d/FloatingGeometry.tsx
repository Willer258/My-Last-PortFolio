import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface FloatingGeometryProps {
  position: [number, number, number]
  geometry: 'box' | 'sphere' | 'torus' | 'octahedron'
  color: string
  speed?: number
}

export const FloatingGeometry: React.FC<FloatingGeometryProps> = ({
  position,
  geometry,
  color,
  speed = 1,
}) => {
  const meshRef = useRef<THREE.Mesh>(null)

  const geometryComponent = useMemo(() => {
    switch (geometry) {
      case 'box':
        return <boxGeometry args={[1, 1, 1]} />
      case 'sphere':
        return <sphereGeometry args={[0.5, 32, 32]} />
      case 'torus':
        return <torusGeometry args={[0.5, 0.2, 16, 100]} />
      case 'octahedron':
        return <octahedronGeometry args={[0.6]} />
      default:
        return <boxGeometry args={[1, 1, 1]} />
    }
  }, [geometry])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed
      meshRef.current.rotation.y += 0.01 * speed
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      {geometryComponent}
      <meshStandardMaterial
        color={color}
        wireframe
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}
