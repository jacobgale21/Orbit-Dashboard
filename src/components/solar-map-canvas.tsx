import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { getOrbitData, type OrbitData } from "../api";
import { useState, useEffect } from "react";
/** Visual layout only — not true scale */

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

const KM_PER_AU = 149597870.7;
const SCENE_UNITS_PER_AU = 4;
function orbitRadius(semiMajorAxisKm: number | null | undefined) {
  if (semiMajorAxisKm == null || semiMajorAxisKm <= 0) return 0;
  const au = semiMajorAxisKm / KM_PER_AU;
  return au * SCENE_UNITS_PER_AU;
}

function Scene({
  tDays,
  orbitData,
}: {
  tDays: number;
  orbitData: OrbitData[];
}) {
  return (
    <>
      <color attach="background" args={["#05060d"]} />
      <ambientLight intensity={0.25} />
      <Stars radius={100} depth={40} count={2000} factor={3} fade speed={0.5} />
      <Sun />
      {orbitData.map((o) => (
        <group key={o.name}>
          <OrbitRing radius={orbitRadius(o.semimajoraxis)} />
          <PlanetMarker
            a={orbitRadius(o.semimajoraxis)}
            color={o.glow || "#ffffff"}
            periodDays={o.period || 0}
            tDays={tDays}
            phase={(o.long || 0) % 360 || 0}
          />
        </group>
      ))}
      <OrbitControls
        makeDefault
        enableDamping
        maxDistance={200}
        minDistance={5}
        target={[0, 0, 0]}
      />
    </>
  );
}

export function SolarMapCanvas({ tDays }: { tDays: number }) {
  const [orbitData, setOrbitData] = useState<OrbitData[]>([]);
  useEffect(() => {
    getOrbitData().then((data) => {
      setOrbitData(data);
    });
  }, []);
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [18, 22, 18], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Scene tDays={tDays} orbitData={orbitData} />
      </Canvas>
    </div>
  );
}
