import { motion } from "framer-motion";
// import { Progress } from "@/components/ui/progress";
import type { Technology } from "@/data/roadmap";

export function TechnologyCard({
  tech,
  index,
}: {
  tech: Technology;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      className="glass-panel group rounded-2xl p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-[var(--shadow-glow)]"
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-display text-base font-semibold text-foreground">
          {tech.name}
        </h4>
        <span className="shrink-0 rounded-full border border-border bg-secondary/40 px-2.5 py-1 text-[11px] uppercase tracking-wider text-muted-foreground">
          {tech.category}
        </span>
      </div>

      <p className="mt-3 text-xs uppercase tracking-wider text-primary/80">
        {tech.readiness}
      </p>

      <div className="mt-3">
        <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
          <span>Current progress</span>
          <span className="tabular-nums text-foreground">{tech.progress}%</span>
        </div>
        {/* <Progress value={tech.progress} className="h-1.5 bg-secondary/60" /> */}
      </div>

      <dl className="mt-4 space-y-2 text-sm">
        <div>
          <dt className="text-xs uppercase tracking-wider text-muted-foreground">
            Challenges
          </dt>
          <dd className="text-foreground/85">{tech.challenge}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wider text-muted-foreground">
            Potential impact
          </dt>
          <dd className="text-foreground/85">{tech.impact}</dd>
        </div>
      </dl>
    </motion.article>
  );
}
