import React, { useRef } from "react";
import { Canvas, extend, useThree } from '@react-three/fiber';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { TextureLoader } from "three";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: any;
    }
  }
}

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls });

const Controls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  return <orbitControls args={[camera, domElement]} />;
};

const Earth = () => {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Load Earth texture
  const texture = new TextureLoader().load("/public/eastHemi.jpg");

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[3, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const ThreeDEarth: React.FC = () => {
  return (
    <div data-component="3d-earth-container">
       <Canvas
        style={{
          position: "relative",
          borderRadius: "100%",
          height: "50vh",
          width: "50vh",
          // Removed marginLeft to allow centering by parent
        }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Earth />
        <Controls />
      </Canvas>
    </div>
  );
};

export default ThreeDEarth;