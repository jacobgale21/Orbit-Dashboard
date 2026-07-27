import { useMemo, useState } from "react";
import {
  X,
  ChevronRight,
  Gauge,
  Lightbulb,
  Building2,
  Wrench,
  TriangleAlert,
} from "lucide-react";
import { roadblocks, readinessLabel, type Roadblock } from "../data/roadblocks";

const W = 1680;
const H = 560;

const nodePos = (r: Roadblock) => ({
  x: 110 + r.t * (W - 230),
  y: H / 2 + r.offset * 185,
});

function buildPath(points: { x: number; y: number }[]) {
  return points.reduce((d, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const dx = (p.x - prev.x) / 2;
    return `${d} C ${prev.x + dx} ${prev.y}, ${p.x - dx} ${p.y}, ${p.x} ${p.y}`;
  }, "");
}

export function MissionMap() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);

  const points = useMemo(() => roadblocks.map(nodePos), []);
  const path = useMemo(
    () => buildPath([{ x: 24, y: H / 2 }, ...points, { x: W - 40, y: H / 2 }]),
    [points],
  );
  const active = roadblocks.find((r) => r.id === activeId) ?? null;

  return (
    <section
      id="roadblocks"
      className="relative overflow-hidden bg-space-void py-20"
    >
      <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-70" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 70% at 8% 50%, oklch(0.45 0.12 235 / 22%), transparent 55%), radial-gradient(90% 70% at 96% 50%, oklch(0.6 0.17 42 / 20%), transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.42em] text-signal">
          Mission Architecture / Sheet 01
        </p>
        <h1 className="mt-5 text-balance bg-gradient-to-b from-white via-white to-slate-400 bg-clip-text text-5xl font-semibold tracking-tight text-transparent sm:text-5xl">
          Roadblocks to Human Mars Exploration
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-hull-muted">
          Ten coupled engineering problems stand between low Earth orbit and a
          crew standing on Mars. Trace the mission path and select any node to
          open its systems dossier.
        </p>
      </div>

      <div className="relative mt-14 overflow-x-auto pb-6">
        <div className="relative mx-auto" style={{ width: W, height: H }}>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            width={W}
            height={H}
            className="absolute inset-0"
            aria-hidden
          >
            <defs>
              <linearGradient id="mm-path" x1="0" x2="1">
                <stop offset="0%" stopColor="oklch(0.72 0.13 215)" />
                <stop offset="55%" stopColor="oklch(0.82 0.15 195)" />
                <stop offset="100%" stopColor="oklch(0.72 0.16 45)" />
              </linearGradient>
              <filter id="mm-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              d={path}
              fill="none"
              stroke="url(#mm-path)"
              strokeWidth={9}
              strokeOpacity={0.16}
              filter="url(#mm-glow)"
            />
            <path
              d={path}
              fill="none"
              stroke="url(#mm-path)"
              strokeWidth={2}
              strokeOpacity={0.7}
            />
            <path
              d={path}
              fill="none"
              stroke="url(#mm-path)"
              strokeWidth={2.5}
              className="mission-dash"
            />

            {/* Earth */}
            <circle
              cx={24}
              cy={H / 2}
              r={34}
              fill="oklch(0.42 0.13 235)"
              opacity={0.9}
            />
            <circle
              cx={24}
              cy={H / 2}
              r={52}
              fill="none"
              stroke="oklch(0.72 0.13 215)"
              strokeOpacity={0.35}
              strokeDasharray="3 6"
            />
            <text
              x={30}
              y={H / 2 + 84}
              className="font-mono"
              fill="oklch(0.72 0.13 215)"
              fontSize={13}
              letterSpacing={4}
            >
              EARTH
            </text>

            {/* Mars */}
            <circle cx={W - 40} cy={H / 2} r={44} fill="oklch(0.52 0.16 42)" />
            <circle
              cx={W - 40}
              cy={H / 2}
              r={66}
              fill="none"
              stroke="oklch(0.72 0.16 45)"
              strokeOpacity={0.4}
              strokeDasharray="3 6"
            />
            <text
              x={W - 110}
              y={H / 2 + 100}
              className="font-mono"
              fill="oklch(0.78 0.16 55)"
              fontSize={13}
              letterSpacing={4}
            >
              MARS
            </text>

            {/* connector stems */}
            {roadblocks.map((r, i) => {
              const p = points[i];
              const anchorY = H / 2;
              return (
                <line
                  key={r.id}
                  x1={p.x}
                  y1={p.y}
                  x2={p.x}
                  y2={anchorY}
                  stroke={
                    activeId === r.id || hoverId === r.id
                      ? "oklch(0.82 0.15 195)"
                      : "oklch(0.62 0.09 220 / 45%)"
                  }
                  strokeWidth={1}
                  strokeDasharray="4 5"
                />
              );
            })}
          </svg>

          {roadblocks.map((r, i) => {
            const p = points[i];
            const Icon = r.icon;
            const on = activeId === r.id || hoverId === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setActiveId(r.id)}
                onMouseEnter={() => setHoverId(r.id)}
                onMouseLeave={() => setHoverId(null)}
                aria-pressed={activeId === r.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                style={{ left: p.x, top: p.y }}
              >
                <span className="relative flex flex-col items-center">
                  <span className="relative grid h-16 w-16 place-items-center">
                    <span
                      className="absolute inset-0 rounded-full border node-pulse"
                      style={{
                        borderColor: on
                          ? "oklch(0.82 0.15 195)"
                          : "oklch(0.62 0.11 210 / 60%)",
                      }}
                    />
                    <span
                      className="relative grid h-14 w-14 place-items-center rounded-full border transition-all duration-300"
                      style={{
                        borderColor: on
                          ? "oklch(0.82 0.15 195)"
                          : "oklch(0.62 0.11 210 / 55%)",
                        background: on
                          ? "oklch(0.26 0.06 225)"
                          : "oklch(0.18 0.035 262)",
                        boxShadow: on
                          ? "0 0 0 6px oklch(0.82 0.15 195 / 10%), 0 0 34px oklch(0.82 0.15 195 / 45%)"
                          : "0 0 18px oklch(0.5 0.09 230 / 22%)",
                        transform: on ? "scale(1.12)" : "scale(1)",
                      }}
                    >
                      <Icon
                        className="h-6 w-6 transition-colors"
                        color={
                          on ? "oklch(0.9 0.13 195)" : "oklch(0.78 0.05 230)"
                        }
                        strokeWidth={1.6}
                      />
                    </span>
                  </span>
                  <span className="mt-3 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.28em] text-signal-dim">
                    {r.code}
                  </span>
                  <span
                    className="mt-1 max-w-[9rem] text-center text-[13px] font-medium leading-tight transition-colors"
                    style={{
                      color: on
                        ? "oklch(0.95 0.02 200)"
                        : "oklch(0.72 0.02 240)",
                    }}
                  >
                    {r.title}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 font-mono text-[11px] uppercase tracking-[0.3em] text-signal-dim">
        Scroll the map horizontally · select a node for its dossier
      </div>

      {active && <Dossier node={active} onClose={() => setActiveId(null)} />}
    </section>
  );
}

function Dossier({ node, onClose }: { node: Roadblock; onClose: () => void }) {
  const Icon = node.icon;
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-space-void/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <aside
        role="dialog"
        aria-label={`${node.title} dossier`}
        className="panel-in fixed right-0 top-16 z-50 flex h-[calc(100%-4rem)] w-full max-w-xl flex-col border-l border-signal-dim/30 bg-[#0b1224] shadow-2xl"
      >
        <header className="relative border-b border-signal-dim/25 px-7 py-6">
          <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-50" />
          <div className="relative flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-signal/50 bg-space-deep">
              <Icon
                className="h-5 w-5"
                color="oklch(0.9 0.13 195)"
                strokeWidth={1.6}
              />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-signal text-[#40E0D0]">
                {node.code} · {node.phase}
              </p>
              <h2 className="mt-1 font-mono text-2xl font-semibold text-hull">
                {node.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dossier"
              className="rounded-full border border-signal-dim/40 p-2 text-hull-muted transition-colors hover:border-signal hover:text-signal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="relative mt-6 grid gap-4 sm:grid-cols-2">
            <Meter
              label="Technology readiness"
              value={node.readiness / 9}
              caption={`TRL ${node.readiness} · ${readinessLabel(node.readiness)}`}
              tone="signal"
            />
            <Meter
              label="Innovation headroom"
              value={node.opportunity / 100}
              caption={`${node.opportunity}% open problem space`}
              tone="rust"
            />
          </div>
        </header>

        <div className="flex-1 space-y-8 overflow-y-auto px-7 py-7">
          <Block icon={TriangleAlert} title="The Problem">
            <p className="text-sm leading-relaxed text-hull-muted">
              {node.problem}
            </p>
          </Block>
          <Block icon={Wrench} title="Current Solutions">
            <List items={node.solutions} />
          </Block>
          <Block icon={Building2} title="Organizations & Companies">
            <div className="flex flex-wrap gap-2">
              {node.organizations.map((o) => (
                <span
                  key={o}
                  className="rounded-full border border-signal-dim/35 bg-space-deep px-3 py-1.5 font-mono text-[11px] text-hull-muted"
                >
                  {o}
                </span>
              ))}
            </div>
          </Block>
          <Block icon={Lightbulb} title="Future Concepts">
            <List items={node.future} accent />
          </Block>
        </div>
      </aside>
    </>
  );
}

function Meter({
  label,
  value,
  caption,
  tone,
}: {
  label: string;
  value: number;
  caption: string;
  tone: "signal" | "rust";
}) {
  const color = tone === "signal" ? "#40E0D0" : "#FF4500";
  return (
    <div>
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-hull-muted">
        <Gauge className="h-3 w-3" />
        {label}
      </div>
      <div className="mt-2 flex gap-[3px]">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="h-2.5 flex-1 rounded-[1px] transition-colors "
            style={{
              background: i / 18 < value ? color : "oklch(0.3 0.02 195)",
              opacity: i / 18 < value ? 0.95 : 0.5,
            }}
          />
        ))}
      </div>
      <p className="mt-2 font-mono text-[11px]" style={{ color }}>
        {caption}
      </p>
    </div>
  );
}

function Block({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Gauge;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-signal text-[#40E0D0]">
        <Icon className="h-3.5 w-3.5" />
        {title}
      </h3>
      <div className="mt-3 border-l border-signal-dim/25 pl-4">{children}</div>
    </section>
  );
}

function List({ items, accent }: { items: string[]; accent?: boolean }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-2 text-sm leading-relaxed text-hull-muted"
        >
          <ChevronRight
            className="mt-0.5 h-4 w-4 shrink-0"
            color={accent ? "oklch(0.78 0.16 55)" : "oklch(0.82 0.15 195)"}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
