import { Canvas } from "@react-three/fiber";
import {
  PresentationControls,
  Center,
  Environment,
  ContactShadows,
  Loader,
} from "@react-three/drei";
import { useState, useRef, useLayoutEffect, Suspense, useMemo } from "react";
import TextModel from "./TextModel";

// TODO:
// 1.Load texture to text (optional) - DROPPED
// 2.Drag reset position - DONE
// 3.Center mesh on changes - DONE
// 4.Put on Github Page - DONE
// 5.Fix dragging on mobile - DONE
// 6.Reside for mobile devices - DONE

function App() {
  const meshRef = useRef();

  const textScale = useMemo(() => {
    return window.innerWidth <= 500 ? [0.5, 0.5, 0.5] : [1, 1, 1];
  }, []);

  const [count, setCount] = useState(0);
  const IncrementCount = () => {
    setCount((c) => c + 1);
    // console.log("Position: " + JSON.stringify(meshRef.current.position))
  };
  const DecrementCount = () => {
    setCount((c) => c - 1);
  };
  const ResetCount = () => {
    setCount(0);
  };

  // Center on changes
  useLayoutEffect(() => {
    if (meshRef.current) {
      let countLength = count.toString().length;
      let textLength = textScale[0] === 1 ? -0.375 : -0.23;
      let minusLength = textScale[0] === 1 ? -0.3 : -0.2;

      if (count > 0) {
        meshRef.current.position.x = (countLength - 1) * textLength;
      } else if (count < 0) {
        meshRef.current.position.x =
          (countLength - 2) * textLength + minusLength;
      } else {
        meshRef.current.position.x = 0;
      }
    }
  }, [count, textScale]);

  return (
    <>
      <div id="canvas">
        <Canvas
          shadows
          camera={{ position: [0, 0, 4], fov: 25 }}
          style={{ background: "#282828", touchAction: "none" }}
        >
          <ambientLight intensity={0.1} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            shadow-mapSize={2048}
            castShadow
          />
          <PresentationControls
            global
            cursor={false}
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0.2, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            <group ref={meshRef}>
              <Center>
                <Suspense fallback={null}>
                  <TextModel count={count} textScale={textScale} />
                </Suspense>
              </Center>
            </group>
          </PresentationControls>

          <ContactShadows
            position={[0, -0.6, 0]}
            opacity={1.3}
            scale={10}
            blur={3}
            far={4}
          />
          <Environment preset="sunset" />
        </Canvas>
        <Loader />
        <div className="btn-container">
          <button
            className="btn"
            role="button"
            onClick={() => {
              IncrementCount();
            }}
          >
            Increment
          </button>
          <button
            className="btn reset"
            role="button"
            onClick={() => {
              ResetCount();
            }}
          >
            Reset
          </button>
          <button
            className="btn"
            role="button"
            onClick={() => {
              DecrementCount();
            }}
          >
            Decrement
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
