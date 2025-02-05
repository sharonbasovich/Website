import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const Stars = () => {
  const starRef = useRef<THREE.Points>(null);
  const starTexture = useLoader(THREE.TextureLoader, "/star.png"); // Load star texture

  useFrame(() => {
    if (starRef.current) {
      starRef.current.rotation.y += 0.0005; // Slow rotation effect
    }
  });

  // Generate random positions for stars
  const starPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 1000; i++) {
      positions.push((Math.random() - 0.5) * 20);
      positions.push((Math.random() - 0.5) * 20);
      positions.push((Math.random() - 0.5) * 20);
    }
    return new Float32Array(positions);
  }, []);

  return (
    <points ref={starRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={starPositions}
          count={starPositions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        map={starTexture}
        size={0.2}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default Stars;
