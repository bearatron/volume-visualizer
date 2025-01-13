import * as THREE from "three";
import { YAXIS, isZeroFunction } from "./utils";
import OpenEndedCylinder from "./OpenEndedCylinder";

export default function BoundingCylinders({
  f,
  g,
  cutoffMin,
  cutoffMax,
  globalRotationAxis,
  segments,
  intersection1,
}) {
  let bottomLocation;
  let topLocation;
  let bottomLocationFinal;
  let topLocationFinal;

  if (
    intersection1.length < 2 &&
    globalRotationAxis == YAXIS &&
    !isZeroFunction(g, cutoffMin, cutoffMax)
  ) {
    if (f(cutoffMin) > g(cutoffMin)) {
      bottomLocation = new THREE.Vector3(0, g(cutoffMin), 0);
      topLocation = new THREE.Vector3(0, f(cutoffMin), 0);
    } else {
      bottomLocation = new THREE.Vector3(0, f(cutoffMin), 0);
      topLocation = new THREE.Vector3(0, g(cutoffMin), 0);
    }
    if (f(cutoffMax) > g(cutoffMax)) {
      bottomLocationFinal = new THREE.Vector3(0, g(cutoffMax), 0);
      topLocationFinal = new THREE.Vector3(0, f(cutoffMax), 0);
    } else {
      bottomLocationFinal = new THREE.Vector3(0, f(cutoffMax), 0);
      topLocationFinal = new THREE.Vector3(0, g(cutoffMax), 0);
    }

    return (
      <>
        <OpenEndedCylinder
          radiusTop={cutoffMin}
          radiusBottom={cutoffMin}
          bottomLocation={bottomLocation}
          topLocation={topLocation}
          radialSegments={segments}
          color={0x42f5cb}
        />
        <OpenEndedCylinder
          radiusTop={cutoffMax}
          radiusBottom={cutoffMax}
          bottomLocation={bottomLocationFinal}
          topLocation={topLocationFinal}
          radialSegments={segments}
          color={0x42f5cb}
        />
      </>
    );
  } else {
    return <></>;
  }
}
