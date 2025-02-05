import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Earth from "./Earth";
import Spaceship from "./Spaceship";
import Stars from "./Stars";
import "./App.css";
import { motion } from "motion/react";

const App = () => {
  const icon = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };
  return (
    <div className="container">
      <Canvas className="canvas" camera={{ position: [0, 5, 10], fov: 50 }}>
        <Suspense fallback={null}>
          {/* Starry sky */}
          <Stars />

          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={1} />

          {/* Rotating Earth & Spaceship */}
          <Earth />
          <Spaceship />

          {/* Controls */}
        </Suspense>
      </Canvas>

      <motion.div
        variants={icon}
        initial="hidden"
        animate="visible"
        transition={{ opacity: { duration: 0.5, delay: 1 } }}
        className="overlay"
      >
        <h1>Sharon</h1>
        <h1>Basovich</h1>
        <div className="links">
          <a href="https://github.com" target="_blank">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank">
            LinkedIn
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default App;
