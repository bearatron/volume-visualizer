import * as THREE from "three";
import Ring from "./Ring";
import { XAXIS, intersection1 } from "./utils";

export default function BoundingRings({
  f,
  g,
  cutoffMin,
  cutoffMax,
  globalRotationAxis,
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
        />
      ); // Outer radius: 2, Inner radius: 1
      toReturn.push(ringMesh);
    }
  }

  return toReturn;
}
