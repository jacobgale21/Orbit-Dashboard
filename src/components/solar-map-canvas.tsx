import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { getOrbitData, type OrbitData } from "../api";
import { useState, useEffect } from "react";
import type { MapView } from "../pages/simulator";
import { PARENT_META, PLACEHOLDER_MOONS } from "../data/placeholder";
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
  name,
  a,
  color,
  periodDays,
  tDays,
  phase = 0,
  onSelect,
}: {
  name: string;
  a: number;
  color: string;
  periodDays: number;
  tDays: number;
  phase?: number;
  onSelect?: (name: string) => void;
}) {
  const { x, z } = positionOnOrbit(a, periodDays, tDays, phase);
  const canEnter = name === "Earth" || name === "Jupiter" || name === "Saturn";
  return (
    <group position={[x, 0, z]}>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          if (canEnter) onSelect?.(name);
        }}
        onPointerOver={() => {
          if (canEnter) document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* invisible larger hit sphere */}
      {canEnter && (
        <mesh visible={false}>
          <sphereGeometry args={[1.2, 8, 8]} />
          <meshBasicMaterial />
        </mesh>
      )}
    </group>
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
  onSelectParent,
}: {
  tDays: number;
  orbitData: OrbitData[];
  onSelectParent?: (name: "Earth" | "Jupiter" | "Saturn") => void;
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
            name={o.name}
            onSelect={(name) =>
              onSelectParent?.(name as "Earth" | "Jupiter" | "Saturn")
            }
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

export function SolarMapCanvas({
  view,
  tDays,
  onSelectParent,
}: {
  view: MapView;
  tDays: number;
  onSelectParent?: (name: "Earth" | "Jupiter" | "Saturn") => void;
}) {
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
        {view.mode === "system" ? (
          <Scene
            tDays={tDays}
            orbitData={orbitData}
            onSelectParent={(name) =>
              onSelectParent?.(name as "Earth" | "Jupiter" | "Saturn")
            }
          />
        ) : (
          <SubsystemScene parent={view.parent} tDays={tDays} />
        )}
      </Canvas>
    </div>
  );
}

function SubsystemScene({
  parent,
  tDays,
}: {
  parent: "Earth" | "Jupiter" | "Saturn";
  tDays: number;
}) {
  const meta = PARENT_META[parent];
  const moons = PLACEHOLDER_MOONS.filter((m) => m.parent === parent);

  return (
    <>
      <color attach="background" args={["#05060d"]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[8, 10, 8]} intensity={1.2} />
      <Stars radius={60} depth={20} count={800} factor={2} fade />

      {/* Parent planet fixed at origin */}
      <mesh>
        <sphereGeometry args={[meta.radius, 32, 32]} />
        <meshStandardMaterial color={meta.color} />
      </mesh>

      {moons.map((m) => (
        <group key={m.name}>
          <OrbitRing radius={m.a} />
          <mesh
            position={[
              positionOnOrbit(m.a, m.periodDays, tDays, m.phase).x,
              0,
              positionOnOrbit(m.a, m.periodDays, tDays, m.phase).z,
            ]}
          >
            <sphereGeometry args={[0.35, 16, 16]} />
            <meshStandardMaterial color={m.color} />
          </mesh>
        </group>
      ))}

      <OrbitControls
        makeDefault
        enableDamping
        minDistance={4}
        maxDistance={25}
        target={[0, 0, 0]}
      />
    </>
  );
}
