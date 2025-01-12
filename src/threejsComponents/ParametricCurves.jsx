import { ParametricGeometry } from "three/examples/jsm/geometries/ParametricGeometry";
import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { intersection1, XAXIS, YAXIS } from "./utils";

extend({ ParametricGeometry }); // Extend to make ParametricGeometry available in JSX

export default function ParametricCurves({
  f,
  g,
  cutoffMin,
  cutoffMax,
  globalRotationAxis,
  resolution = 20,
}) {
  let min = Math.min(...intersection1);
  let max = Math.max(...intersection1);

  function generateParametricCurve(func, min, max, axisOfRotation) {
    let effectiveMaxX;
    let effectiveMinX;
    if (intersection1.length > 1) {
      const minIntersection = Math.min(...intersection1);
      const maxIntersection = Math.max(...intersection1);
      effectiveMinX = Math.max(minIntersection, cutoffMin);
      effectiveMaxX = Math.min(maxIntersection, cutoffMax);
    } else {
      effectiveMinX = cutoffMin;
      effectiveMaxX = cutoffMax;
    }
    const parametricCurve = (u, v, target) => {
      u = u * 2 * Math.PI;
      v = v * (effectiveMaxX - effectiveMinX) + effectiveMinX;

      const x = axisOfRotation === XAXIS ? v : v * Math.cos(u);
      const y = axisOfRotation === XAXIS ? func(v) * Math.cos(u) : func(v);
      const z =
        axisOfRotation === XAXIS ? func(v) * Math.sin(u) : v * Math.sin(u);

      target.set(x, y, z);
    };

    return parametricCurve;
  }

  return (
    <>
      {!(f(0) === 0 && f(1000) === 0) ? (
        <line>
          <lineBasicMaterial attach="material" color={0xff0000} />
          <parametricGeometry
            attach="geometry"
            args={[
              generateParametricCurve(f, min, max, globalRotationAxis),
              resolution,
              resolution,
            ]}
          />
        </line>
      ) : (
        <></>
      )}

      {!(g(0) === 0 && g(1000) === 0) ? (
        <line>
          <lineBasicMaterial attach="material" color={0x0000ff} />
          <parametricGeometry
            attach="geometry"
            args={[
              generateParametricCurve(g, min, max, globalRotationAxis),
              resolution,
              resolution,
            ]}
          />
        </line>
      ) : (
        <></>
      )}
    </>
  );
}
