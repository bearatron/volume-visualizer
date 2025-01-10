import "./Scene.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";

export default function Scene() {
  const sceneRef = useRef(null);

  const [size, setSize] = useState({
    width: sceneRef.clientWidth,
    height: sceneRef.clientWidth,
  });

  // Update canvas size on window resize
  useEffect(() => {
    const handleResize = () => {
      setSize({ width: sceneRef.clientWidth, height: sceneRef.clientWidth });
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={sceneRef} className="scene-container">
      <Canvas>
        {/* <color attach="background" args={["black"]} /> */}

        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
