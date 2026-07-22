// src/components/landing/FeaturedMissions.tsx

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Mission } from "@/api";
import { getMissions } from "@/api";
import { useState, useEffect } from "react";

export default function FeaturedMissions() {
  const [missions, setMissions] = useState<Mission[]>([]);
  useEffect(() => {
    getMissions().then((missions) => {
      setMissions(missions);
    });
  }, []);
  return (
    <section
      id="missions"
      className="relative overflow-hidden bg-transparent py-16 text-slate-100 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60"></div>

      <div className="relative mx-auto max-w-7xl px-6">
        <header className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <h2 className="mt-5 text-balance bg-gradient-to-b from-white via-white to-slate-400 bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl">
            Featured Missions
          </h2>
          <p className="mt-4 text-pretty text-sm text-slate-400 sm:text-base">
            Active and historic programs shaping deep space exploration.
          </p>
        </header>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {missions.map((mission: Mission) => (
            <MissionCard key={mission.name} mission={mission} />
          ))}
        </div>
      </div>
    </section>
  );
}
function formatLaunchDate(iso: string | null) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function MissionCard({ mission }: { mission: Mission }) {
  const imageSrc = mission.image_url ?? mission.thumbnail_url;
  const blurb =
    mission.description && mission.description.length > 140
      ? `${mission.description.slice(0, 140).trimEnd()}…`
      : (mission.description ?? "No description available.");

  const stats = [
    { label: "Agency", value: mission.agency },
    { label: "Rocket", value: mission.rocket },
    { label: "Site", value: mission.launch_site },
    { label: "Destination", value: mission.destination },
    { label: "Launch", value: formatLaunchDate(mission.launch_date) },
    { label: "Status", value: mission.status },
  ];

  return (
    <Card className="group relative overflow-hidden border-white/10 bg-white/[0.03] p-0 text-slate-100 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:bg-white/[0.05]">
      <div className="pointer-events-none absolute inset-0 opacity-50 transition-opacity duration-500 group-hover:opacity-80" />

      {imageSrc && (
        <div className="relative h-40 w-full overflow-hidden border-b border-white/10">
          <img
            src={imageSrc}
            alt={mission.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05060d]/90 via-transparent to-transparent" />
        </div>
      )}

      <CardContent className="relative flex flex-col gap-4 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
              {mission.name}
            </h3>
            <p className="mt-1 text-xs text-slate-400 sm:text-sm">
              {mission.destination ?? "Unknown destination"}
            </p>
          </div>
          <Badge
            variant="outline"
            className="shrink-0 border-white/15 bg-white/5 text-[10px] uppercase tracking-wider text-slate-300"
          >
            {mission.status ?? "Unknown"}
          </Badge>
        </div>

        <p className="text-sm leading-relaxed text-slate-300">{blurb}</p>

        <dl className="grid grid-cols-2 gap-2 text-[11px] sm:grid-cols-3 sm:text-xs">
          {stats.map(({ label, value }) => (
            <div
              key={label}
              className="rounded-lg border border-white/5 bg-white/[0.02] px-2 py-2"
            >
              <dt className="uppercase tracking-wider text-slate-500">
                {label}
              </dt>
              <dd className="mt-1 font-medium text-slate-200">
                {value ?? "—"}
              </dd>
            </div>
          ))}
        </dl>

        <p className="border-l-2 border-white/20 pl-3 text-xs italic text-slate-400">
          Launched {formatLaunchDate(mission.launch_date)}
          {mission.agency ? ` · ${mission.agency}` : ""}
        </p>
      </CardContent>
    </Card>
  );
}
