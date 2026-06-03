import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  MeshDistortMaterial,
  Float,
  Sparkles,
  GradientTexture,
} from "@react-three/drei";

/**
 * The distorted saffron orb — a premium replacement for the CSS bouncing ball.
 * Slowly rotates and leans toward the pointer.
 */
function DistortOrb() {
  const mesh = useRef();
  const group = useRef();

  useFrame((state, delta) => {
    if (mesh.current) mesh.current.rotation.y += delta * 0.15;
    if (group.current) {
      // Ease the orb toward the pointer for a subtle parallax/tilt.
      const tx = state.pointer.x * 0.4;
      const ty = state.pointer.y * 0.3;
      group.current.rotation.y += (tx - group.current.rotation.y) * 0.05;
      group.current.rotation.x += (-ty - group.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh ref={mesh} scale={1.75}>
          <sphereGeometry args={[1, 128, 128]} />
          <MeshDistortMaterial
            distort={0.32}
            speed={1.6}
            roughness={0.25}
            metalness={0.35}
            emissive="#FF5E0E"
            emissiveIntensity={0.35}
          >
            <GradientTexture
              attach="map"
              stops={[0, 0.45, 1]}
              colors={["#FFD9B0", "#FF7A35", "#FF5E0E"]}
            />
          </MeshDistortMaterial>
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 8], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.4} color="#FFAA70" />
      <pointLight position={[-5, -3, 2]} intensity={0.8} color="#4A2F9A" />
      <DistortOrb />
      <Sparkles
        count={40}
        scale={9}
        size={2}
        speed={0.3}
        opacity={0.5}
        color="#FFAA70"
      />
    </Canvas>
  );
}
