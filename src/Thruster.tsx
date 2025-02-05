import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Thruster = ({ position }: { position: [number, number, number] }) => {
  const thrusterRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (thrusterRef.current) {
      const flicker = Math.sin(clock.getElapsedTime() * 15) * 0.3 + 0.8;
      thrusterRef.current.scale.set(1, flicker, 1);

      const material = thrusterRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = flicker;
      material.color.setHSL(0.1, 1, flicker); // Adjust color intensity
    }
  });

  return (
    <mesh ref={thrusterRef} position={position}>
      <coneGeometry args={[0.15, 0.4, 8]} />
      <meshBasicMaterial color="orange" transparent opacity={0.8} />
    </mesh>
  );
};

export default Thruster;
