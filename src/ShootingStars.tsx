import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ShootingStars = () => {
  const starRefs = useRef<THREE.Mesh[]>([]);

  useFrame(() => {
    starRefs.current.forEach((star, i) => {
      if (!star) return;

      // Cast material to MeshBasicMaterial to access opacity
      const material = star.material as THREE.MeshBasicMaterial;

      star.position.x += 0.02;
      star.position.y -= 0.02;
      material.opacity -= 0.005;

      if (material.opacity <= 0) {
        // Reset position & opacity when fully faded
        star.position.set(
          Math.random() * 10 - 5,
          Math.random() * 10,
          Math.random() * -10
        );
        material.opacity = 1;
      }
    });
  });

  return (
    <>
      {[...Array(5)].map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (starRefs.current[i] = el!)}
          position={[
            Math.random() * 10 - 5,
            Math.random() * 10,
            Math.random() * -10,
          ]}
        >
          <planeGeometry args={[0.1, 0.5]} />
          <meshBasicMaterial color="white" transparent opacity={1} />
        </mesh>
      ))}
    </>
  );
};

export default ShootingStars;
