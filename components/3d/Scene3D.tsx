import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { FloatingGeometry } from './FloatingGeometry'

export const Scene3D: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#d946ef" />

          {/* Floating geometries */}
          <FloatingGeometry position={[-3, 2, 0]} geometry="box" color="#0ea5e9" speed={0.8} />
          <FloatingGeometry position={[3, -1, -2]} geometry="sphere" color="#d946ef" speed={1.2} />
          <FloatingGeometry position={[0, 1, -3]} geometry="torus" color="#f97316" speed={0.6} />
          <FloatingGeometry position={[-2, -2, 1]} geometry="octahedron" color="#0ea5e9" speed={1} />
          <FloatingGeometry position={[2, 2, -1]} geometry="sphere" color="#f97316" speed={0.9} />
        </Suspense>
      </Canvas>
    </div>
  )
}
