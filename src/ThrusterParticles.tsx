import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ThrusterParticles = ({
  position,
}: {
  position: [number, number, number];
}) => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 500; // Increased for more spread
  const spreadFactor = 0.5; // Adjust to spread the particles further

  const { positions, velocities, lifetimes } = useMemo(() => {
    const posArray = new Float32Array(particleCount * 3);
    const velArray = new Float32Array(particleCount * 3);
    const lifeArray = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2; // Spread in all directions
      const radius = Math.random() * spreadFactor; // Larger spread
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.random() * -0.5; // Move downward

      posArray.set([x, y, z], i * 3);

      // Give particles different speeds
      velArray[i * 3] = x * 0.02; // Outward spread
      velArray[i * 3 + 1] = -Math.random() * 0.05 - 0.01; // Downward speed
      velArray[i * 3 + 2] = z * 0.02;

      // Assign different lifetimes
      lifeArray[i] = Math.random() * 100;
    }

    return { positions: posArray, velocities: velArray, lifetimes: lifeArray };
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      const { attributes } = particlesRef.current.geometry;
      const positions = attributes.position.array as Float32Array;
      const velocitiesArray = velocities;
      const lifetimesArray = lifetimes;

      for (let i = 0; i < particleCount; i++) {
        lifetimesArray[i] -= 1; // Decrease lifetime

        if (lifetimesArray[i] <= 0) {
          // Reset particle in a random position within the spread range
          lifetimesArray[i] = Math.random() * 100;
          positions[i * 3] = (Math.random() - 0.5) * spreadFactor;
          positions[i * 3 + 1] = 0;
          positions[i * 3 + 2] = (Math.random() - 0.5) * spreadFactor;
        } else {
          // Apply velocity to move particles
          positions[i * 3] += velocitiesArray[i * 3];
          positions[i * 3 + 1] += velocitiesArray[i * 3 + 1];
          positions[i * 3 + 2] += velocitiesArray[i * 3 + 2];
        }
      }

      attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={particleCount}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="orange"
        size={0.15} // Increased particle size slightly
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending} // Makes particles glow
      />
    </points>
  );
};

export default ThrusterParticles;
