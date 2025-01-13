import "./Scene.css";
import { Canvas } from "@react-three/fiber";
import { Stats, OrbitControls, FlyControls } from "@react-three/drei";
import ParametricCurves from "./ParametricCurves";
import { STEP, XAXIS, YAXIS } from "./utils";
import BoundingCylinders from "./BoundingCylinders";
import BoundingRings from "./BoundingRings";
import Area from "./Area";
import * as THREE from "three";
import { useControls } from "leva";

export default function Scene({
  f,
  g,
  cutoffMin,
  cutoffMax,
  globalRotationAxis,
}) {
  const { autoRotate, resolution } = useControls({
    autoRotate: true,
    resolution: 20,
  });

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
          autoRotate={autoRotate}
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
          resolution={resolution}
        />

        <BoundingCylinders
          f={f}
          g={g}
          cutoffMin={cutoffMin}
          cutoffMax={cutoffMax}
          globalRotationAxis={globalRotationAxis}
          segments={resolution}
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
          step={STEP}
        />
      </Canvas>
    </div>
  );
}
