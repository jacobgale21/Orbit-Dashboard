import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
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

function PlanetViewer({
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
      <Canvas camera={{ position: [0, 0, 4] }} dpr={[1, 1.5]}>
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

export function LazyPlanetViewer({
  textureUrl,
  isUrl = true,
  className,
}: {
  textureUrl: string;
  isUrl?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        // mount when near/in view; unmount when far away to free WebGL
        setVisible(entry.isIntersecting);
      },
      { rootMargin: "200px", threshold: 0.1 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className ?? "h-full w-full"}>
      {visible ? (
        <PlanetViewer textureUrl={textureUrl} isUrl={isUrl} />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs text-slate-500">
          Loading…
        </div>
      )}
    </div>
  );
}
