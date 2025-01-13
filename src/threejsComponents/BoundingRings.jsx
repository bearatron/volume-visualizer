import * as THREE from "three";
import Ring from "./Ring";
import { XAXIS, YAXIS, isZeroFunction } from "./utils";

export default function BoundingRings({
  f,
  g,
  cutoffMin,
  cutoffMax,
  globalRotationAxis,
  intersection1,
}) {
  let toReturn = [];
  if (globalRotationAxis === XAXIS && intersection1.length < 2) {
    if (Math.abs(f(cutoffMin)) > Math.abs(g(cutoffMin))) {
      const ringMesh = (
        <Ring
          key={1}
          outerRadius={f(cutoffMin)}
          innerRadius={g(cutoffMin)}
          color={0x00ff00}
          opacity={0.7}
          location={cutoffMin}
          globalRotationAxis={globalRotationAxis}
        />
      ); // Outer radius: 2, Inner radius: 1
      toReturn.push(ringMesh);
    } else {
      const ringMesh = (
        <Ring
          key={1}
          outerRadius={g(cutoffMin)}
          innerRadius={f(cutoffMin)}
          color={0x00ff00}
          opacity={0.7}
          location={cutoffMin}
          globalRotationAxis={globalRotationAxis}
        />
      ); // Outer radius: 2, Inner radius: 1
      toReturn.push(ringMesh);
    }
    if (Math.abs(f(cutoffMax)) > Math.abs(g(cutoffMax))) {
      const ringMesh = (
        <Ring
          key={2}
          outerRadius={f(cutoffMax)}
          innerRadius={g(cutoffMax)}
          color={0x00ff00}
          opacity={0.7}
          location={cutoffMax}
          globalRotationAxis={globalRotationAxis}
        />
      ); // Outer radius: 2, Inner radius: 1
      toReturn.push(ringMesh);
    } else {
      const ringMesh = (
        <Ring
          key={2}
          outerRadius={g(cutoffMax)}
          innerRadius={f(cutoffMax)}
          color={0x00ff00}
          opacity={0.7}
          location={cutoffMax}
          globalRotationAxis={globalRotationAxis}
        />
      ); // Outer radius: 2, Inner radius: 1
      toReturn.push(ringMesh);
    }
  }

  if (
    globalRotationAxis === YAXIS &&
    intersection1.length < 2 &&
    isZeroFunction(g, cutoffMin, cutoffMax)
  ) {
    if (f(cutoffMax) - f(cutoffMin) === 0) {
      const ringMesh = (
        <Ring
          key={3}
          outerRadius={cutoffMax}
          innerRadius={0}
          color={0x00ff00}
          opacity={0.7}
          location={f(cutoffMax)}
          globalRotationAxis={globalRotationAxis}
        />
      ); // Outer radius: 2, Inner radius: 1
      toReturn.push(ringMesh);
    } else {
      const ringMesh = (
        <Ring
          key={3}
          outerRadius={cutoffMax}
          innerRadius={0}
          color={0x00ff00}
          opacity={0.7}
          location={f(cutoffMax)}
          globalRotationAxis={globalRotationAxis}
        />
      ); // Outer radius: 2, Inner radius: 1
      toReturn.push(ringMesh);
      const ringMesh2 = (
        <Ring
          key={4}
          outerRadius={cutoffMin}
          innerRadius={0}
          color={0x00ff00}
          opacity={0.7}
          location={f(cutoffMin)}
          globalRotationAxis={globalRotationAxis}
        />
      ); // Outer radius: 2, Inner radius: 1
      toReturn.push(ringMesh2);
    }
  }

  return toReturn;
}
