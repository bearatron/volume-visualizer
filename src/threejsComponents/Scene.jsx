import "./Scene.css";
import { Canvas } from "@react-three/fiber";
import { Stats, OrbitControls, FlyControls } from "@react-three/drei";
import ParametricCurves from "./ParametricCurves";
import { XAXIS, YAXIS } from "./utils";
import BoundingCylinders from "./BoundingCylinders";
import BoundingRings from "./BoundingRings";
import Area from "./Area";
import * as THREE from "three";

// extend({ ParametricGeometry }); // Extend to make ParametricGeometry available in JSX

export default function Scene({
  f,
  g,
  cutoffMin,
  cutoffMax,
  globalRotationAxis,
}) {
  return (
    <div className="scene-container">
      <Canvas
        camera={{
          position:
            globalRotationAxis === XAXIS
              ? [(cutoffMin + cutoffMax) / 2, 0, 5]
              : [0, (f(cutoffMin) + f(cutoffMax)) / 2, 5],
        }}
      >
        <OrbitControls
          autoRotate={true}
          autoRotateSpeed={4}
          target={
            globalRotationAxis === XAXIS
              ? new THREE.Vector3((cutoffMin + cutoffMax) / 2, 0, 0)
              : new THREE.Vector3(0, (f(cutoffMin) + f(cutoffMax)) / 2, 0)
          }
        />
        <axesHelper args={[10]} />

        <ParametricCurves
          f={f}
          g={g}
          cutoffMin={cutoffMin}
          cutoffMax={cutoffMax}
          globalRotationAxis={globalRotationAxis}
        />

        <BoundingCylinders
          f={f}
          g={g}
          cutoffMin={cutoffMin}
          cutoffMax={cutoffMax}
          globalRotationAxis={globalRotationAxis}
        />

        <BoundingRings
          f={f}
          g={g}
          cutoffMin={cutoffMin}
          cutoffMax={cutoffMax}
          globalRotationAxis={globalRotationAxis}
        />

        <Area
          f={f}
          g={g}
          cutoffMin={cutoffMin}
          cutoffMax={cutoffMax}
          globalRotationAxis={globalRotationAxis}
        />
      </Canvas>
    </div>
  );
}
