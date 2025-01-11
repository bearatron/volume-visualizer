import * as THREE from "three";

export default function Ring({
  outerRadius,
  innerRadius,
  color = 0xff0000,
  opacity = 0.5,
  location,
}) {
  // Create a shape for the outer circle
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);

  // Add a hole for the inner circle
  const hole = new THREE.Path();
  hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  return (
    <mesh
      rotation={[0, Math.PI / 2, 0]}
      position={[location, 0, 0]}
      wireframe={true}
    >
      <shapeGeometry attach="geometry" args={[shape, 256]} />
      <meshBasicMaterial
        attach="material"
        color={color}
        side={THREE.DoubleSide}
        transparent={true}
        opacity={opacity}
      />
    </mesh>
  );
}
