import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { dependencyChain } from "../../data/roadmap";

function downstreamOf(id: string): string[] {
  const idx = dependencyChain.findIndex((n) => n.id === id);
  if (idx === -1) return [];
  return dependencyChain.slice(idx).map((n) => n.id);
}

export function DependencyGraph() {
  const [hovered, setHovered] = useState<string | null>(null);
  const lit = hovered ? downstreamOf(hovered) : [];

  return (
    <div className="glass-panel rounded-3xl p-6 md:p-10">
      <div className="max-w-xl">
        <h3 className="text-2xl font-semibold">Technology Dependencies</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Nothing happens in isolation. Hover a capability to light up
          everything it unlocks downstream.
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center gap-0">
        {dependencyChain.map((node, i) => {
          const on = lit.includes(node.id);
          return (
            <div
              key={node.id}
              className="flex w-full max-w-lg flex-col items-center"
            >
              <motion.article
                layout
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
                className={`glass-panel group w-full max-w-sm rounded-2xl border p-5 text-left transition-shadow duration-300
    ${on ? "glow-ring border-primary/60 bg-primary/10" : "border-border/60 hover:border-primary/40 hover:shadow-[var(--shadow-glow)]"}
  `}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-primary/80">
                    {node.timeframe ?? `Step ${i + 1}`}
                  </span>
                  <span className="rounded-md bg-secondary/50 px-2 py-0.5 text-[10px] uppercase text-muted-foreground">
                    {node.status}
                  </span>
                </div>
                <h4 className="font-display mt-2 text-lg font-semibold">
                  {node.label}
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {node.detail}
                </p>
                {/* Extra info: always visible on md+, or reveal on hover */}
                <div className="mt-3 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100">
                  <p className="text-sm text-foreground/90">{node.summary}</p>
                  <p className="mt-2 text-xs text-primary/90">
                    Unlocks: {node.unlocks}
                  </p>
                </div>
              </motion.article>

              {i < dependencyChain.length - 1 && (
                <div className="relative flex h-12 items-center justify-center">
                  <span
                    className={`absolute inset-y-0 w-px transition-all duration-300 ${
                      lit.includes(dependencyChain[i + 1].id) && on
                        ? "bg-primary shadow-[0_0_12px_var(--glow)]"
                        : "bg-border"
                    }`}
                  />

                  <ArrowDown
                    className={`relative size-5 stroke-[2.5] transition-all hover:animate-bounce ${lit.includes(dependencyChain[i + 1].id) && on ? "text-primary" : "text-muted-foreground/80"}`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
