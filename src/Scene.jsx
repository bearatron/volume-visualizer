import "./Scene.css";
import { Canvas } from "@react-three/fiber";
import { Stats, OrbitControls } from "@react-three/drei";
import { useState, useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import { extend, useThree } from "@react-three/fiber";
import { ParametricGeometry } from "three/examples/jsm/geometries/ParametricGeometry";
import ParametricCurves from "./ParametricCurves";
import { f, g, XAXIS, YAXIS } from "./utils";
import Cylinders from "./Cylinders";

// extend({ ParametricGeometry }); // Extend to make ParametricGeometry available in JSX

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
      <Canvas camera={{ position: [0, 0, 5] }}>
        {/* <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        <Polyhedron position={[-0.75, -0.75, 0]} polyhedron={polyhedron} />

        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </mesh> */}

        <OrbitControls />
        <axesHelper args={[10]} />
        <Stats />

        <ParametricCurves
          f={f}
          g={g}
          cutoffMin={0.1}
          cutoffMax={1}
          globalRotationAxis={YAXIS}
        />

        <Cylinders
          f={f}
          g={g}
          cutoffMin={0.1}
          cutoffMax={1}
          globalRotationAxis={YAXIS}
        />
      </Canvas>
    </div>
  );
}
