import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import ThrusterParticles from "./ThrusterParticles";

interface SpaceshipProps {
  initialRotation?: [number, number, number]; // Allow user to set initial orientation
}

const Spaceship = ({ initialRotation = [0, 0, 0] }: SpaceshipProps) => {
  const { scene } = useGLTF("/spaceship.glb");
  const shipRef = useRef<THREE.Group>(null);
  let angle = Math.random() * Math.PI * 2; // Start at a random position in orbit
  let speed = 0.005; // Base orbit speed

  // 🟢 Apply initial rotation ONCE when the spaceship is first loaded
  useEffect(() => {
    if (shipRef.current) {
      shipRef.current.rotation.set(...initialRotation);
    }
  }, [initialRotation]);

  useFrame(() => {
    if (shipRef.current) {
      angle += speed; // Move along the orbit path

      // Define an elliptical orbit (realistic variation)
      const radiusX = 4.5; // Wider on X-axis
      const radiusZ = 3.5; // Shorter on Z-axis
      const waveHeight = Math.sin(angle * 2) * 0.5; // Adds subtle vertical motion

      // Compute new orbital position
      const x = Math.cos(angle) * radiusX;
      const z = Math.sin(angle) * radiusZ;
      const y = waveHeight;

      shipRef.current.position.set(x, y, z);

      // Compute velocity direction (tangent to orbit)
      const velocity = new THREE.Vector3(
        -Math.sin(angle) * radiusX, // X-component of velocity
        waveHeight * 0.2, // Small vertical adjustment
        Math.cos(angle) * radiusZ // Z-component of velocity
      );
      velocity.normalize(); // Ensure velocity has a consistent magnitude

      // Set rotation so the spaceship follows its direction of motion
      const forward = new THREE.Vector3(0, 1, 0); // Define "forward" for the model
      const rotationQuaternion = new THREE.Quaternion();
      rotationQuaternion.setFromUnitVectors(forward, velocity);
      shipRef.current.setRotationFromQuaternion(rotationQuaternion);
    }
  });

  return (
    <group ref={shipRef} scale={0.1}>
      <primitive object={scene} />
      <ThrusterParticles position={[-0.2, 0, -0.5]} />
      <ThrusterParticles position={[0.2, 0, -0.5]} />
    </group>
  );
};

export default Spaceship;
