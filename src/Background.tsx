import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Cloud, Stars } from "@react-three/drei";
import * as THREE from "three";

const Background = () => {
  const starRef = useRef<THREE.Points>(null);

  // Randomly generate distant planets
  const planets = useMemo(() => {
    return [...Array(5)].map(() => ({
      position: [
        (Math.random() - 0.5) * 10, // Random X
        (Math.random() - 0.5) * 10, // Random Y
        (Math.random() - 0.5) * -20, // Random deep space Z
      ] as [number, number, number], // ✅ Explicitly cast as [x, y, z] tuple
      size: Math.random() * 0.5 + 0.3, // Random size
      color: `hsl(${Math.random() * 360}, 70%, 50%)`, // Random color
    }));
  }, []);

  useFrame(() => {
    if (starRef.current) {
      starRef.current.rotation.y += 0.0005; // Slow rotation of stars
    }
  });

  return (
    <>
      {/* Twinkling stars */}
      <Stars
        ref={starRef}
        radius={30}
        depth={50}
        count={3000}
        factor={5}
        fade
        speed={1}
      />
      {/* Cloudy Nebula effect */}
      <Cloud opacity={0.3} speed={0.2} bounds={[10, 5, 5]} segments={20} />{" "}
      {/* ✅ Fixed Cloud props */}
      {/* Random planets */}
      {planets.map((planet, index) => (
        <mesh key={index} position={planet.position}>
          {" "}
          {/* ✅ Fixed position issue */}
          <sphereGeometry args={[planet.size, 32, 32]} />
          <meshStandardMaterial color={planet.color} />
        </mesh>
      ))}
    </>
  );
};

export default Background;
