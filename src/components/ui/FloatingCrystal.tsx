"use client";

/**
 * FloatingCrystal — Interactive 3D wireframe crystal/orb hero element.
 * Uses React Three Fiber + Drei for a floating, mouse-reactive geometry
 * with a glowing purple-to-blue aesthetic matching the site palette.
 */

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function Crystal() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  // Track mouse for subtle tilt
  useMemo(() => {
    if (typeof window === "undefined") return;
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current || !wireRef.current) return;

    // Slow auto-rotation
    meshRef.current.rotation.y += delta * 0.15;
    meshRef.current.rotation.x += delta * 0.08;
    wireRef.current.rotation.y += delta * 0.15;
    wireRef.current.rotation.x += delta * 0.08;

    // Subtle mouse tilt
    const targetRotX = mouse.current.y * 0.3;
    const targetRotY = mouse.current.x * 0.3;
    meshRef.current.rotation.x += (targetRotX - meshRef.current.rotation.x) * 0.02;
    meshRef.current.rotation.y += (targetRotY - meshRef.current.rotation.y) * 0.02;
    wireRef.current.rotation.x = meshRef.current.rotation.x;
    wireRef.current.rotation.y = meshRef.current.rotation.y;

    // Glow pulse
    if (glowRef.current) {
      const scale = 1.8 + Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
      <group>
        {/* Inner solid crystal with distortion */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1, 1]} />
          <MeshDistortMaterial
            color="#8B5CF6"
            emissive="#4C1D95"
            emissiveIntensity={0.4}
            roughness={0.3}
            metalness={0.8}
            distort={0.25}
            speed={2}
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Wireframe overlay */}
        <mesh ref={wireRef}>
          <icosahedronGeometry args={[1.02, 1]} />
          <meshBasicMaterial
            color="#A78BFA"
            wireframe
            transparent
            opacity={0.5}
          />
        </mesh>

        {/* Outer glow sphere */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[1.8, 32, 32]} />
          <meshBasicMaterial
            color="#7C3AED"
            transparent
            opacity={0.03}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Point light inside */}
        <pointLight color="#8B5CF6" intensity={2} distance={5} />
        <pointLight color="#3B82F6" intensity={1} distance={4} position={[1, 1, 1]} />
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#E9D5FF" />
      <Crystal />
    </>
  );
}

export default function FloatingCrystal() {
  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
