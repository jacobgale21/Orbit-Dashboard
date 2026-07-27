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
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(node.id)}
                onBlur={() => setHovered(null)}
                className={`w-full rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${
                  on
                    ? "glow-ring border-primary bg-primary/15"
                    : "border-border bg-card/40 hover:border-primary/50"
                }`}
              >
                <p
                  className={`font-display text-base font-semibold ${on ? "text-primary" : "text-foreground"}`}
                >
                  {node.label}
                </p>
                <p className="text-sm text-muted-foreground">{node.detail}</p>
              </motion.button>

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
                    className={`relative size-4 transition-colors ${
                      lit.includes(dependencyChain[i + 1].id) && on
                        ? "text-primary"
                        : "text-muted-foreground/60"
                    }`}
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
