import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { Suspense } from 'react'

// GLBモデルローダーコンポーネント
function AstroRoomModel() {
  const { scene } = useGLTF('/AstroRoom.glb')

  // 全てのメッシュを両面表示にする
  scene.traverse((child) => {
    if (child.isMesh && child.material) {
      if (Array.isArray(child.material)) {
        child.material.forEach(material => {
          material.side = 2 // THREE.DoubleSide
        })
      } else {
        child.material.side = 2 // THREE.DoubleSide
      }
    }
  })

  return <primitive object={scene} />
}

// メインのコンポーネント
function ArtMuseum() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        camera={{
          position: [0, 2, 5],
          fov: 75,
          near: 0.1,
          far: 1000
        }}
      >
        <color attach="background" args={['#0a0a0a']} />

        <Suspense fallback={
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
          </mesh>
        }>
          <AstroRoomModel />
        </Suspense>

        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={1}
          maxDistance={20}
        />

        <Environment preset="night" />
      </Canvas>

      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        color: 'white',
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '10px',
        borderRadius: '5px'
      }}>
        <h3>AstroRoom</h3>
        <p>マウスで視点を変更できます</p>
      </div>
    </div>
  )
}

export default ArtMuseum