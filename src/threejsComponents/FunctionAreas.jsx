import * as THREE from "three";

export default function FunctionAreas(
  f,
  g,
  cutoffMin,
  cutoffMax,
  globalRotationAxis
) {
  function drawFunctionsAndAreaBetween(
    func1,
    func2,
    color1,
    color2,
    fillColor
  ) {
    const step = 0.001; // Granularity of the plot
    const curvePoints1 = [];
    const curvePoints2 = [];
    const fillPoints = [];
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
      if (globalRotationAxis == 1 && (g(1000) == 0 || f(1000) == 0)) {
        // If one function is zero, draw the area from the non-zero function to the y-axis
        const nonZeroFunc = g(1000) == 0 ? f : g; // Determine the non-zero function
        const yValue = nonZeroFunc(x); // Get the value of the non-zero function at x

        fillPoints.push(new THREE.Vector2(x, yValue)); // Top boundary: Point on the non-zero function
        fillPoints.unshift(new THREE.Vector2(0, yValue)); // Bottom boundary: Corresponding point on the y-axis
      } else {
        fillPoints.push(new THREE.Vector2(x, topY)); // Top boundary
        fillPoints.unshift(new THREE.Vector2(x, bottomY)); // Bottom boundary
      }
    }

    // Draw the first curve
    const curveGeometry1 = new THREE.BufferGeometry().setFromPoints(
      curvePoints1
    );
    const curveMaterial1 = new THREE.LineBasicMaterial({ color: color1 });
    const curveLine1 = new THREE.Line(curveGeometry1, curveMaterial1);

    // Draw the second curve
    const curveGeometry2 = new THREE.BufferGeometry().setFromPoints(
      curvePoints2
    );
    const curveMaterial2 = new THREE.LineBasicMaterial({ color: color2 });
    const curveLine2 = new THREE.Line(curveGeometry2, curveMaterial2);

    // Create the shape and geometry for the filled area
    const shape = new THREE.Shape(fillPoints);
    const geometry = new THREE.ShapeGeometry(shape);
    const material = new THREE.MeshBasicMaterial({
      color: fillColor,
      side: THREE.DoubleSide,
      opacity: 0.5,
      transparent: true,
    });
    const filledArea = new THREE.Mesh(geometry, material);
    scene.add(filledArea);

    return { filledArea, curveLine1, curveLine2 };
  }

  // TODO: break up into three components and animate in scene

  const { filledArea, curveLine1, curveLine2 } = drawFunctionsAndAreaBetween(
    f,
    g,
    0xff0000, // Red line for the first function
    0x0000ff, // Blue line for the second function
    0x00ff00 // Green fill for the area between curves
  );
}
