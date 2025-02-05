import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import ThrusterParticles from "./ThrusterParticles";

const Spaceship = () => {
  const { scene } = useGLTF("/spaceship.glb");
  const shipRef = useRef<THREE.Group>(null);
  let angle = 0;

  useFrame(() => {
    if (shipRef.current) {
      angle += 0.005; // Adjust for faster or slower orbit
      const radius = 3.5 // Distance from Earth
      shipRef.current.position.x = Math.cos(angle) * radius;
      shipRef.current.position.z = Math.sin(angle) * radius;
      shipRef.current.position.y = Math.sin(angle) * radius;
      shipRef.current.lookAt(0, 0, 0); // Always face the Earth
    }
  });

  return (
    <group ref={shipRef} scale={0.1} position={[5, 0, 0]}>
      <primitive object={scene} />
      <ThrusterParticles position={[-0.2, 0, -0.5]} />
      <ThrusterParticles position={[0.2, 0, -0.5]} />
    </group>
  );
};

export default Spaceship;
