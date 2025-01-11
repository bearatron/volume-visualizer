import "./Scene.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stats, OrbitControls } from "@react-three/drei";
import { useState, useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { ParametricGeometry } from "three/examples/jsm/geometries/ParametricGeometry";
import ParametricCurves from "./ParametricCurves";
import { f, g, XAXIS, YAXIS } from "./utils";
import BoundingCylinders from "./BoundingCylinders";
import BoundingRings from "./BoundingRings";
import Area from "./Area";

// extend({ ParametricGeometry }); // Extend to make ParametricGeometry available in JSX

export default function Scene() {
  return (
    <div className="scene-container">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <OrbitControls />
        <axesHelper args={[10]} />
        <Stats />

        <ParametricCurves
          f={f}
          g={g}
          cutoffMin={0.1}
          cutoffMax={1}
          globalRotationAxis={XAXIS}
        />

        <BoundingCylinders
          f={f}
          g={g}
          cutoffMin={0.1}
          cutoffMax={1}
          globalRotationAxis={XAXIS}
        />

        <BoundingRings
          f={f}
          g={g}
          cutoffMin={0.1}
          cutoffMax={1}
          globalRotationAxis={XAXIS}
        />

        <Area
          f={f}
          g={g}
          cutoffMin={0.1}
          cutoffMax={1}
          globalRotationAxis={XAXIS}
        />
      </Canvas>
    </div>
  );
}
