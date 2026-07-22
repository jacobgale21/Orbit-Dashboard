import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

/** Visual layout only — not true scale */
const PLANETS = [
  { name: "Mercury", a: 4, periodDays: 88, color: "#a8a29e", phase: 0.2 },
  { name: "Venus", a: 6, periodDays: 225, color: "#f59e0b", phase: 1.1 },
  { name: "Earth", a: 8, periodDays: 365, color: "#38bdf8", phase: 0.0 },
  { name: "Mars", a: 10, periodDays: 687, color: "#ef4444", phase: 2.0 },
  { name: "Jupiter", a: 14, periodDays: 4333, color: "#fbbf24", phase: 0.5 },
  { name: "Saturn", a: 18, periodDays: 10759, color: "#fcd34d", phase: 3.0 },
  { name: "Uranus", a: 22, periodDays: 30687, color: "#67e8f9", phase: 1.5 },
  { name: "Neptune", a: 26, periodDays: 60190, color: "#6366f1", phase: 4.0 },
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

function positionOnOrbit(
  a: number,
  periodDays: number,
  tDays: number,
  phase = 0,
) {
  const theta = phase + (2 * Math.PI * tDays) / periodDays;
  return { x: a * Math.cos(theta), z: a * Math.sin(theta) };
}

function PlanetMarker({
  a,
  color,
  periodDays,
  tDays,
  phase = 0,
}: {
  a: number;
  color: string;
  periodDays: number;
  tDays: number;
  phase?: number;
}) {
  const { x, z } = positionOnOrbit(a, periodDays, tDays, phase);

  return (
    <mesh position={[x, 0, z]}>
      <sphereGeometry args={[0.35, 16, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Scene({ tDays }: { tDays: number }) {
  return (
    <>
      <color attach="background" args={["#05060d"]} />
      <ambientLight intensity={0.25} />
      <Stars radius={100} depth={40} count={2000} factor={3} fade speed={0.5} />
      <Sun />
      {PLANETS.map((p) => (
        <group key={p.name}>
          <OrbitRing radius={p.a} />
          <PlanetMarker
            a={p.a}
            color={p.color}
            periodDays={p.periodDays}
            tDays={tDays}
            phase={p.phase}
          />
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

export function SolarMapCanvas({ tDays }: { tDays: number }) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [18, 22, 18], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Scene tDays={tDays} />
      </Canvas>
    </div>
  );
}
