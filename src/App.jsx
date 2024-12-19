import { Canvas } from "@react-three/fiber";
import { Loader, PresentationControls, Center, Environment, ContactShadows } from '@react-three/drei'
import { useState, useRef, Suspense } from "react";
import { Text3D } from "@react-three/drei";
import Kanit from "./assets/fonts/Kanit_Regular.json"


// TODO:
// 1.Load texture to text (optional) - DROPPED
// 2.Drag reset position - DONE
// 3.Center mesh on changes
// 4.Put on Github Page - DONE
// 5.Fix dragging on mobile - DONE
// 6.Reside for mobile devices - DONE

function App() {

  const meshRef = useRef()

  const [count, setCount] = useState(0);
  const IncrementCount = () => {
    setCount(c => c + 1)
    // console.log("Position: " + JSON.stringify(meshRef.current.position))
  }
  const DecrementCount = () => {
    setCount(c => c - 1)
  }
  const ResetCount = () => {
    setCount(0)
  }

  // Move object a bit
  window.addEventListener("mousemove", (e) => {
    let x = e.clientX;
    let y = e.clientY;
    // let coor = "Coordinates: (" + x + "," + y + ")";
    if (meshRef.current) {
      meshRef.current.position.x = (0 - (x / (window.innerWidth * 10)))
      meshRef.current.position.y = -(0 - (y / (window.innerHeight * 10)))
    }
    // console.log(coor)
  })

  // Scale on mobile
  const textScale = window.innerWidth <= 500 ? [0.5, 0.5, 0.5] : [1, 1, 1]

  return (
    <>
      <div id="canvas" >
        <Canvas shadows camera={{ position: [0, 0, 4], fov: 25 }} style={{ background: '#282828', touchAction: "none" }} >
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            shadow-mapSize={2048}
            castShadow />
          <PresentationControls
            global
            cursor={false}
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >

            <group ref={meshRef}>
              <Center>
                <Suspense fallback={null}>
                  <Text3D font={Kanit} {...""} castShadow scale={textScale}>
                    {count}
                    <meshStandardMaterial color="#98971a" />
                  </Text3D>
                </Suspense>
              </Center>
            </group>
          </PresentationControls>

          <ContactShadows position={[0, -0.5, 0]} opacity={1} scale={10} blur={3} far={4} />
          <Environment preset="city" />

        </Canvas>
        <div className="btn-container">
          <button className="btn" role="button" onClick={() => { IncrementCount() }}>Increment</button>
          <button className="btn reset" role="button" onClick={() => { ResetCount() }}>Reset</button>
          <button className="btn" role="button" onClick={() => { DecrementCount() }}>Decrement</button>
        </div>
      </div >
      <Loader />
    </>
  )
}

export default App
