import * as THREE from "three";
import { isZeroFunction, STEP, XAXIS, YAXIS } from "./utils";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Area({
  f,
  g,
  cutoffMin,
  cutoffMax,
  globalRotationAxis,
  step = STEP, // granularity of plot
  intersection1,
}) {
  function drawFunctionsAndAreaBetween(
    func1,
    func2,
    color1,
    color2,
    fillColor
  ) {
    const curvePoints1 = [];
    const curvePoints2 = [];
    const fillPoints = [];
    let effectiveMaxX;
    let effectiveMinX;
    const minIntersection = Math.min(...intersection1);
    const maxIntersection = Math.max(...intersection1);

    if (
      (intersection1.length > 1 &&
        maxIntersection > cutoffMin &&
        maxIntersection < cutoffMax) ||
      (minIntersection > cutoffMin &&
        minIntersection < cutoffMax &&
        !isZeroFunction(g, cutoffMin, cutoffMax))
    ) {
      effectiveMinX = Math.max(minIntersection, cutoffMin);
      effectiveMaxX = Math.min(maxIntersection, cutoffMax);
    } else {
      effectiveMinX = cutoffMin;
      effectiveMaxX = cutoffMax;
    }
    // Generate points for the curves and the area between
    for (let x = effectiveMinX; x <= effectiveMaxX; x += step) {
      const y1 = func1(x); // First function
      const y2 = func2(x); // Second function

      // Determine which function is on top and which is on the bottom
      const topY = Math.max(y1, y2);
      const bottomY = Math.min(y1, y2);

      curvePoints1.push(new THREE.Vector3(x, y1, 0)); // Points for the first curve
      curvePoints2.push(new THREE.Vector3(x, y2, 0)); // Points for the second curve

      // Add the points for the fill area
      if (
        globalRotationAxis == YAXIS &&
        (isZeroFunction(g, cutoffMin, cutoffMax) ||
          isZeroFunction(f, cutoffMin, cutoffMax))
      ) {
        // If one function is zero, draw the area from the non-zero function to the y-axis
        const nonZeroFunc = isZeroFunction(g, cutoffMin, cutoffMax) ? f : g; // Determine the non-zero function
        const yValue = nonZeroFunc(x); // Get the value of the non-zero function at x

        fillPoints.push(new THREE.Vector2(0, yValue)); // Top boundary: Point on the non-zero function
        if (f(cutoffMin) < f(cutoffMax)) {
          if (x < 0) {
            fillPoints.unshift(new THREE.Vector2(x, yValue)); // Bottom boundary: Corresponding point on the y-axis
          } else {
            fillPoints.unshift(new THREE.Vector2(-x, yValue)); // Bottom boundary: Corresponding point on the y-axis
          }
        } else {
          fillPoints.unshift(new THREE.Vector2(x, yValue)); // Bottom boundary: Corresponding point on the y-axis
        }
      } else {
        fillPoints.push(new THREE.Vector2(x, topY)); // Top boundary
        fillPoints.unshift(new THREE.Vector2(x, bottomY)); // Bottom boundary
      }
    }

    // Draw the first curve
    const curveLine1 = (
      <line key={1}>
        <bufferGeometry attach="geometry" setFromPoints={curvePoints1} />
        <lineBasicMaterial attach="material" color={color1} />
      </line>
    );

    // Draw the second curve
    const curveLine2 = (
      <line key={2}>
        <bufferGeometry attach="geometry" setFromPoints={curvePoints2} />
        <lineBasicMaterial attach="material" color={color2} />
      </line>
    );

    // Create the shape and geometry for the filled area
    const shape = new THREE.Shape(fillPoints);

    const filledArea = (
      <mesh key={3}>
        <shapeGeometry attach="geometry" args={[shape]} />
        <meshBasicMaterial
          attach="material"
          color={fillColor}
          side={THREE.DoubleSide}
          transparent={true}
          opacity={0.5}
        />
      </mesh>
    );

    return [filledArea, curveLine1, curveLine2];
  }

  const areaRef = useRef(null);

  useFrame(() => {
    if (areaRef.current) {
      if (globalRotationAxis === XAXIS) {
        areaRef.current.rotation.x += 0.02;
        areaRef.current.rotation.y = 0;
      }
      if (globalRotationAxis === YAXIS) {
        areaRef.current.rotation.x = 0;
        areaRef.current.rotation.y += 0.02;
      }
    }
  });

  return (
    <mesh ref={areaRef}>
      {drawFunctionsAndAreaBetween(
        f,
        g,
        0xff0000, // Red line for the first function
        0x0000ff, // Blue line for the second function
        0x00ff00 // Green fill for the area between curves
      )}
    </mesh>
  );
}
