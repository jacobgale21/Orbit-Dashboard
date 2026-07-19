import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

function Planet({ textureUrl }: { textureUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, textureUrl);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.15;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function PlanetLocal({ texturePath }: { texturePath: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texureLoader = new THREE.TextureLoader();
  const texture = texureLoader.load(texturePath);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.15;
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export function PlanetViewer({
  textureUrl,
  className,
  isUrl = true,
}: {
  textureUrl: string;
  className?: string;
  isUrl?: boolean;
}) {
  return isUrl ? (
    <div className={cn("h-full w-full bg-transparent", className)}>
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 3, 5]} intensity={1.2} />
        <Planet textureUrl={textureUrl} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  ) : (
    <div className={cn("h-full w-full bg-transparent", className)}>
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 3, 5]} intensity={1.2} />
        <PlanetLocal texturePath={textureUrl} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
