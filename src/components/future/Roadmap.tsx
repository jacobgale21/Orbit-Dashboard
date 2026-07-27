import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { MilestoneNode } from "./MilestoneNode";
import { TechnologyCard } from "./TechnologyCard";
import { milestones } from "@/data/roadmap";

const offsets = [0, -46, 26, -30, 34, -18, 8];

export function Roadmap() {
  const [activeId, setActiveId] = useState(milestones[0].id);
  const active = milestones.find((m) => m.id === activeId) ?? milestones[0];

  return (
    <div className="relative">
      {/* Desktop / tablet: curved glowing path */}
      <div className="relative hidden md:block">
        <svg
          aria-hidden
          viewBox="0 0 1400 260"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 top-[2.2rem] h-[260px] w-full"
        >
          <defs>
            <linearGradient id="roadGrad" x1="0" x2="1">
              <stop offset="0%" stopColor="var(--glow)" stopOpacity="0" />
              <stop offset="25%" stopColor="var(--glow)" stopOpacity="0.9" />
              <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--glow)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,120 C160,10 260,220 420,150 C560,90 640,-10 800,80 C930,155 1000,225 1140,140 C1250,74 1320,110 1400,90"
            fill="none"
            stroke="url(#roadGrad)"
            strokeWidth="2"
            className="drop-shadow-[0_0_10px_var(--glow)]"
          />
          <path
            d="M0,120 C160,10 260,220 420,150 C560,90 640,-10 800,80 C930,155 1000,225 1140,140 C1250,74 1320,110 1400,90"
            fill="none"
            stroke="var(--glow)"
            strokeWidth="1.5"
            strokeDasharray="6 18"
            strokeOpacity="0.7"
            className="animate-dash-flow"
          />
        </svg>

        <div className="relative flex w-full items-start justify-between gap-1 pb-4">
          {milestones.map((m, i) => (
            <MilestoneNode
              key={m.id}
              milestone={m}
              index={i}
              active={m.id === activeId}
              onSelect={() => setActiveId(m.id)}
              offsetY={offsets[i]}
            />
          ))}
        </div>
      </div>

      {/* Mobile: vertical journey */}
      <div className="relative space-y-4 md:hidden">
        <span className="absolute left-[1.6rem] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-primary/60 to-transparent" />
        {milestones.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className="relative pl-16"
          >
            <span
              className={`absolute left-0 top-3 grid size-[3.2rem] place-items-center rounded-full border text-sm ${
                m.id === activeId
                  ? "animate-pulse-node border-primary bg-primary/20 text-primary"
                  : "border-border bg-card/60 text-muted-foreground"
              }`}
            >
              {m.stage}
            </span>
            <button
              type="button"
              onClick={() => setActiveId(m.id === activeId ? "" : m.id)}
              className="glass-panel w-full rounded-2xl p-4 text-left"
            >
              <p className="font-display text-base font-semibold">{m.title}</p>
              <p className="mt-0.5 text-xs text-primary/80">{m.timeframe}</p>
              <AnimatePresence initial={false}>
                {m.id === activeId && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden"
                  >
                    <p className="pt-3 text-sm text-muted-foreground">
                      {m.description}
                    </p>
                    <div className="mt-4 grid gap-3">
                      {m.technologies.map((t, ti) => (
                        <TechnologyCard key={t.name} tech={t} index={ti} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Floating info panel (desktop / tablet) */}
      <div className="mt-14 hidden md:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 18, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.99 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="glass-panel rounded-3xl p-8"
          >
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.2em] text-primary/80">
                  Stage {active.stage} · {active.timeframe}
                </p>
                <h3 className="mt-2 text-3xl font-semibold">{active.title}</h3>
                <p className="mt-3 text-muted-foreground">
                  {active.description}
                </p>
              </div>
              <ul className="flex flex-wrap gap-2">
                {active.focus.map((f) => (
                  <li
                    key={f}
                    className="rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-foreground/80"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {active.technologies.map((t, i) => (
                <TechnologyCard key={t.name} tech={t} index={i} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
