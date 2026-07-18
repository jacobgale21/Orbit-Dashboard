import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { getStructures } from "@/api";
import { useEffect, useState } from "react";
import type { Structure } from "@/api";
import { PlanetViewer } from "@/components/globe";

function formatMass(structure: Structure) {
  if (!structure.mass) return "—";
  return `${(structure.mass.massValue * 10 ** structure.mass.massExponent).toExponential(2)} kg`;
}

function formatVolume(structure: Structure) {
  if (!structure.volume) return "—";
  return `${(structure.volume.volValue * 10 ** structure.volume.volExponent).toExponential(2)} km³`;
}

export default function Destinations() {
  const [structures, setStructures] = useState<Structure[]>([]);

  useEffect(() => {
    getStructures().then(setStructures);
  }, []);

  return (
    <section
      id="destinations"
      className="relative overflow-hidden text-slate-100"
    >
      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="mt-6 text-balance bg-gradient-to-b from-white via-white to-slate-400 bg-clip-text text-5xl font-semibold tracking-tight text-transparent sm:text-6xl">
            The Solar System
          </h1>
          <p className="mt-5 text-pretty text-base text-slate-400 sm:text-lg">
            Eight worlds, one star. Explore rotating models and the key numbers
            that define each planet — from Mercury&apos;s scorched crust to
            Neptune&apos;s sonic winds.
          </p>
        </header>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {structures.map((structure, idx) => (
            <PlanetCard key={structure.id} structure={structure} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlanetCard({
  structure,
  index,
}: {
  structure: Structure;
  index: number;
}) {
  const stats = [
    { label: "Mass", value: formatMass(structure) },
    { label: "Volume", value: formatVolume(structure) },
    {
      label: "Gravity",
      value: structure.gravity != null ? `${structure.gravity} m/s²` : "—",
    },
    {
      label: "Escape",
      value: structure.escape != null ? `${structure.escape} km/s` : "—",
    },
    {
      label: "Temp",
      value: structure.temperature != null ? `${structure.temperature} K` : "—",
    },
    {
      label: "Period",
      value: structure.period != null ? `${structure.period} days` : "—",
    },
    {
      label: "Distance",
      value: structure.distance != null ? `${structure.distance} ly` : "—",
    },
  ];
  const glow = structure.glow ?? "#94a3b8";
  const type_planet = structure.type_planet ?? "—";
  const tagline = structure.tagline ?? "Planetary body";
  const fact = structure.fact ?? "—";

  return (
    <Card className="group relative overflow-hidden border-white/10 bg-white/[0.03] p-0 text-slate-100 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:bg-white/[0.05]">
      <div
        className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-90"
        style={{
          background: `radial-gradient(circle at 25% 30%, ${glow}22, transparent 55%)`,
        }}
      />
      <CardContent className="relative grid gap-6 p-6 sm:p-8 md:grid-cols-[220px_1fr] md:items-center">
        <div className="relative mx-auto h-56 w-56 md:h-60 md:w-60">
          <div
            className="absolute inset-0 rounded-full blur-2xl"
            style={{ background: `${glow}33` }}
          />
          <div className="relative h-full w-full">
            {structure.image_url ? (
              <PlanetViewer textureUrl={structure.image_url} />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs text-slate-500">
                No texture
              </div>
            )}
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-slate-500">
                  0{index + 1}
                </span>
                <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {structure.name}
                </h2>
              </div>
              <p className="mt-1 text-sm text-slate-400">
                {tagline ?? "Planetary body"}
              </p>
            </div>
            {type_planet && (
              <Badge
                variant="outline"
                className="border-white/15 bg-white/5 text-[10px] uppercase tracking-wider text-slate-300"
              >
                {type_planet}
              </Badge>
            )}
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            {stats.map(({ label, value }) => (
              <div key={label} className="border-b border-white/5 pb-2">
                <dt className="text-[11px] uppercase tracking-wider text-slate-500">
                  {label}
                </dt>
                <dd className="mt-0.5 font-medium text-slate-100">{value}</dd>
              </div>
            ))}
          </dl>

          {fact && (
            <p className="mt-5 border-l-2 border-white/20 pl-3 text-xs italic text-slate-400">
              {fact}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
