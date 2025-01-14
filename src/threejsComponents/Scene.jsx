import "./Scene.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
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
  intersection1,
}) {
  const { rotateCamera, resolution } = useControls({
    rotateCamera: true,
    resolution: 20,
  });

  let centerOfRotation;

  if (globalRotationAxis === XAXIS) {
    centerOfRotation = [(cutoffMin + cutoffMax) / 2, 0, 0];
  } else {
    centerOfRotation = [
      0,
      (Math.min(f(cutoffMin), g(cutoffMin)) +
        Math.max(f(cutoffMax), g(cutoffMax))) /
        2,
      0,
    ];
  }

  console.log(`min: ${Math.min(f(cutoffMin), g(cutoffMin))}`);
  console.log(`max: ${Math.max(f(cutoffMax), g(cutoffMax))}`);
  console.log(`center of rotation: (${centerOfRotation})`);

  return (
    <div className="scene-container">
      <Canvas>
        <OrbitControls
          autoRotate={rotateCamera}
          autoRotateSpeed={4}
          target={
            globalRotationAxis === XAXIS
              ? new THREE.Vector3(
                  centerOfRotation[0],
                  centerOfRotation[1],
                  centerOfRotation[2]
                )
              : new THREE.Vector3(
                  centerOfRotation[0],
                  centerOfRotation[1],
                  centerOfRotation[2]
                )
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
          intersection1={intersection1}
        />

        <BoundingCylinders
          f={f}
          g={g}
          cutoffMin={cutoffMin}
          cutoffMax={cutoffMax}
          globalRotationAxis={globalRotationAxis}
          segments={resolution}
          intersection1={intersection1}
        />

        <BoundingRings
          f={f}
          g={g}
          cutoffMin={cutoffMin}
          cutoffMax={cutoffMax}
          globalRotationAxis={globalRotationAxis}
          intersection1={intersection1}
        />

        <Area
          f={f}
          g={g}
          cutoffMin={cutoffMin}
          cutoffMax={cutoffMax}
          globalRotationAxis={globalRotationAxis}
          step={STEP}
          intersection1={intersection1}
        />
      </Canvas>
    </div>
  );
}
