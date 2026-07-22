import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDiscoveries, type Discovery } from "@/api";
import { useEffect, useState } from "react";
import {
  Shield,
  Wind,
  Atom,
  Droplets,
  HeartPulse,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Shield,
  Wind,
  Atom,
  Droplets,
  HeartPulse,
};

export default function Discoveries() {
  const [discoveries, setDiscoveries] = useState<Discovery[]>([]);
  useEffect(() => {
    getDiscoveries().then((data) => {
      setDiscoveries(data);
    });
  }, []);
  return (
    <section
      id="discoveries"
      className="relative overflow-hidden bg-[#05060d] py-16 text-slate-100 sm:py-24"
    >
      {/* subtle backdrop matching the solar system section */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 70% 20%, rgba(139,92,246,0.18), transparent 50%), radial-gradient(ellipse at 30% 80%, rgba(6,182,212,0.12), transparent 55%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <header className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <h2 className="mt-5 text-balance bg-gradient-to-b from-white via-white to-slate-400 bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl">
            Major Space Discoveries
          </h2>
          <p className="mt-4 text-pretty text-sm text-slate-400 sm:text-base">
            Six breakthroughs that reshaped how we see the universe — from the
            scale of the solar system to the ripples of spacetime itself.
          </p>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {discoveries.map((discovery) => (
            <DiscoveryCard key={discovery.name} discovery={discovery} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DiscoveryCard({ discovery }: { discovery: Discovery }) {
  const Icon = (discovery.icon && ICONS[discovery.icon]) || Shield;

  return (
    <Card className="group relative overflow-hidden border-white/10 bg-white/[0.03] p-0 text-slate-100 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:bg-white/[0.05]">
      <div
        className="pointer-events-none absolute inset-0 opacity-50 transition-opacity duration-500 group-hover:opacity-80"
        style={{
          background: `radial-gradient(circle at 20% 20%, ${discovery.glow}1a, transparent 60%)`,
        }}
      />

      <CardContent className="relative flex flex-col gap-4 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
            <div
              className="absolute inset-0 rounded-xl opacity-40 blur-md"
              style={{ backgroundColor: discovery.glow || undefined }}
            />
            <Icon
              className="relative h-6 w-6"
              style={{ color: discovery.color || undefined }}
            />
          </div>
          <Badge
            variant="outline"
            className="border-white/15 bg-white/5 text-[10px] uppercase tracking-wider text-slate-300"
          >
            {discovery.year}
          </Badge>
        </div>

        <div>
          <h3 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            {discovery.name}
          </h3>
          <p className="text-xs text-slate-400 sm:text-sm">
            {discovery.subtitle}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-slate-300">
          {discovery.description}
        </p>

        <dl className="grid grid-cols-3 gap-2 text-center text-[11px] sm:text-xs">
          {Object.entries(discovery.details).map(([label, value]) => (
            <div
              key={label}
              className="rounded-lg border border-white/5 bg-white/[0.02] px-2 py-2"
            >
              <dt className="uppercase tracking-wider text-slate-500">
                {label}
              </dt>
              <dd className="mt-1 font-medium text-slate-200">{value}</dd>
            </div>
          ))}
        </dl>

        <p className="border-l-2 border-white/20 pl-3 text-xs italic text-slate-400">
          {discovery.impact}
        </p>
      </CardContent>
    </Card>
  );
}
