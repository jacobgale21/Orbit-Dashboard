import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

/** Visual layout only — not true scale */
const PLANETS = [
  { name: "Mercury", a: 4, color: "#a8a29e" },
  { name: "Venus", a: 6, color: "#f59e0b" },
  { name: "Earth", a: 8, color: "#38bdf8" },
  { name: "Mars", a: 10, color: "#ef4444" },
  { name: "Jupiter", a: 14, color: "#fbbf24" },
  { name: "Saturn", a: 18, color: "#fcd34d" },
  { name: "Uranus", a: 22, color: "#67e8f9" },
  { name: "Neptune", a: 26, color: "#6366f1" },
];

function OrbitRing({ radius }: { radius: number }) {
  const points = [];
  for (let i = 0; i <= 64; i++) {
    const t = (i / 64) * Math.PI * 2;
    points.push(
      new THREE.Vector3(Math.cos(t) * radius, 0, Math.sin(t) * radius),
    );
  }
  const curve = new THREE.CatmullRomCurve3(points, true);
  return (
    <mesh>
      <tubeGeometry args={[curve, 64, 0.02, 8, true]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
    </mesh>
  );
}

function Sun() {
  return (
    <mesh>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshBasicMaterial color="#fbbf24" />
      <pointLight intensity={2} distance={80} />
    </mesh>
  );
}

function PlanetMarker({
  a,
  color,
  angle = 0.4,
}: {
  a: number;
  color: string;
  angle?: number;
}) {
  const x = Math.cos(angle) * a;
  const z = Math.sin(angle) * a;
  return (
    <mesh position={[x, 0, z]}>
      <sphereGeometry args={[0.35, 16, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#05060d"]} />
      <ambientLight intensity={0.25} />
      <Stars radius={100} depth={40} count={2000} factor={3} fade speed={0.5} />
      <Sun />
      {PLANETS.map((p) => (
        <group key={p.name}>
          <OrbitRing radius={p.a} />
          <PlanetMarker a={p.a} color={p.color} />
        </group>
      ))}
      <OrbitControls
        makeDefault
        enableDamping
        maxDistance={60}
        minDistance={5}
        target={[0, 0, 0]}
      />
    </>
  );
}

export function SolarMapCanvas() {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [18, 22, 18], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
