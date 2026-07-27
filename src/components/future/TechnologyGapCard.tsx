import { motion } from "framer-motion";
import { CircleDashed } from "lucide-react";
import type { TechnologyGap } from "@/data/roadmap";

const difficultyStyles: Record<TechnologyGap["difficulty"], string> = {
  Moderate: "border-chart-3/50 text-chart-3",
  Hard: "border-chart-4/50 text-chart-4",
  Extreme: "border-chart-5/50 text-chart-5",
};

export function TechnologyGapCard({
  gap,
  index,
}: {
  gap: TechnologyGap;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.06 }}
      className="glass-panel rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[var(--shadow-glow)]"
    >
      <div className="flex items-start justify-between gap-3">
        <CircleDashed className="size-5 text-primary" strokeWidth={1.5} />
        <span
          className={`rounded-full border px-2.5 py-0.5 text-[11px] uppercase tracking-wider ${difficultyStyles[gap.difficulty]}`}
        >
          {gap.difficulty}
        </span>
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold">{gap.name}</h3>
      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex items-center justify-between gap-3">
          <dt className="text-muted-foreground">Current status</dt>
          <dd className="text-right text-foreground/85">{gap.status}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-muted-foreground">Estimated timeline</dt>
          <dd className="text-right tabular-nums text-primary">
            {gap.timeline}
          </dd>
        </div>
      </dl>
    </motion.article>
  );
}
