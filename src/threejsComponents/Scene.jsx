import "./Scene.css";
import { Canvas } from "@react-three/fiber";
import { Stats, OrbitControls } from "@react-three/drei";
import ParametricCurves from "./ParametricCurves";
import { XAXIS, YAXIS } from "./utils";
import BoundingCylinders from "./BoundingCylinders";
import BoundingRings from "./BoundingRings";
import Area from "./Area";

// extend({ ParametricGeometry }); // Extend to make ParametricGeometry available in JSX

export default function Scene(
  {
    // f,
    // g,
    // cutoffMin,
    // cutoffMax,
    // globalRotationAxis,
  }
) {
  const f = (x) => x ** 2;
  const g = (x) => x ** 3;
  const cutoffMin = 0.1;
  const cutoffMax = 3;
  const globalRotationAxis = XAXIS;

  return (
    <div className="scene-container">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <OrbitControls />
        <axesHelper args={[10]} />
        <Stats />

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
