import * as THREE from "three";
import { useRef } from "react";

export default function OpenEndedCylinder({
  radiusTop,
  radiusBottom,
  bottomLocation,
  topLocation,
  radialSegments = 32,
  color = 0xff0000,
}) {
  const ref = useRef(null);

  // Calculate height and cylinder direction
  const height = new THREE.Vector3()
    .subVectors(topLocation, bottomLocation)
    .length(); // Distance between top and bottom

  const cylinderGeometry = new THREE.CylinderGeometry(
    radiusTop,
    radiusBottom,
    height,
    radialSegments,
    1, // One height segment
    true // Open-ended cylinder (no caps)
  );

  // Create material
  const cylinderMaterial = new THREE.MeshBasicMaterial({
    color: color,
    wireframe: true,
    side: THREE.DoubleSide, // Ensure both sides of the surface are visible
    opacity: 0.5, // Set the opacity to 50%
    transparent: true, // Allow the material to be transparent
  });

  //   const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

  // Position the cylinder's midpoint
  const midpoint = new THREE.Vector3()
    .addVectors(topLocation, bottomLocation)
    .multiplyScalar(0.5);
  //   cylinder.position.set(midpoint.x, midpoint.y, midpoint.z);

  // Align the cylinder with the vector between bottomLocation and topLocation
  const direction = new THREE.Vector3()
    .subVectors(topLocation, bottomLocation)
    .normalize();
  const axis = new THREE.Vector3(0, 1, 0); // Default cylinder points along y-axis
  const quaternion = new THREE.Quaternion().setFromUnitVectors(axis, direction);
  //   cylinder.setRotationFromQuaternion(quaternion);

  return (
    <mesh
      position={[midpoint.x, midpoint.y, midpoint.z]}
      quaternion={quaternion}
    >
      <cylinderGeometry
        attach="geometry"
        args={[
          radiusTop,
          radiusBottom,
          height,
          radialSegments,
          1, // One height segment
          true, // Open-ended cylinder (no caps)
        ]}
      />

      <meshBasicMaterial
        attach="material"
        color={color}
        wireframe={true}
        side={THREE.DoubleSide} // Ensure both sides of the surface are visible
        opacity={0.5} // Set the opacity to 50%
        transparent={true} // Allow the material to be transparent
      />
    </mesh>
  );
}
