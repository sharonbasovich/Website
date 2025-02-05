import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ThrusterGlow = ({ position }: { position: [number, number, number] }) => {
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (glowRef.current) {
      const intensity = Math.sin(clock.getElapsedTime() * 10) * 0.2 + 0.8;
      glowRef.current.scale.set(intensity, intensity, intensity);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = intensity;
    }
  });

  return (
    <mesh ref={glowRef} position={position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial
        color="yellow"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

export default ThrusterGlow;
