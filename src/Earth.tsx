import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Earth = () => {
  const { scene } = useGLTF("/earth.glb");
  const earthRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Rotate Earth continuously
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
      earthRef.current.rotation.z += 0.001;
    }
  });

  return (
    <>
      {/* Rotating Earth Model */}
      <group ref={earthRef}>
        <primitive object={scene} scale={3} position={[0, 0, 0]} />
      </group>

      {/* Atmospheric Glow */}
      <mesh ref={glowRef} position={[0, 0, 0]}>
        <sphereGeometry args={[3.5, 64, 64]} />{" "}
        {/* Slightly larger than Earth */}
        <shaderMaterial
          attach="material"
          uniforms={{
            glowColor: { value: new THREE.Color("deepskyblue") },
          }}
          vertexShader={
            /* glsl */ `
            varying vec3 vPosition;
            void main() {
              vPosition = normalize(position); // Normalize for distance calculations
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `
          }
          fragmentShader={
            /* glsl */ `
            varying vec3 vPosition;
            uniform vec3 glowColor;

            void main() {
              float intensity = smoothstep(0.2, 0.9, 1.0 - length(vPosition)); // Adjusted for visibility
              gl_FragColor = vec4(glowColor, intensity * 2.0); // Increased brightness
            }
          `
          }
          transparent
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide} // Render outside only
        />
      </mesh>
    </>
  );
};

export default Earth;
