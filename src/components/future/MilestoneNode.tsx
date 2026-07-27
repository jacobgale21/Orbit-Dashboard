import { motion } from "framer-motion";
import {
  Rocket,
  Moon,
  Globe,
  Factory,
  Orbit,
  Building2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { Milestone } from "@/data/roadmap";

const icons: Record<string, LucideIcon> = {
  Rocket,
  Moon,
  Globe,
  Factory,
  Orbit,
  Building2,
  Sparkles,
};

type Props = {
  milestone: Milestone;
  active: boolean;
  onSelect: () => void;
  index: number;
  offsetY?: number;
};

export function MilestoneNode({
  milestone,
  active,
  onSelect,
  index,
  offsetY = 0,
}: Props) {
  const Icon = icons[milestone.icon] ?? Rocket;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: "easeOut" }}
      style={{ marginTop: offsetY }}
      className="relative flex w-full min-w-0 max-w-[9.5rem] flex-1 flex-col items-center px-1 text-center"
    >
      <button
        type="button"
        onClick={onSelect}
        onMouseEnter={onSelect}
        aria-pressed={active}
        aria-label={`Stage ${milestone.stage}: ${milestone.title}`}
        className={`group relative grid size-[4.5rem] place-items-center rounded-full border transition-all duration-500 ${
          active
            ? "animate-pulse-node glow-ring scale-110 border-primary bg-primary/20"
            : "border-border bg-card/50 hover:scale-105 hover:border-primary/60"
        }`}
      >
        <span className="absolute inset-0 rounded-full bg-primary/10 blur-md transition-opacity duration-500 group-hover:opacity-100" />
        <Icon
          className={`relative size-7 transition-colors ${active ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`}
          strokeWidth={1.5}
        />
        <span className="absolute -top-2 -right-1 rounded-full border border-border bg-background px-1.5 text-[10px] font-medium text-muted-foreground">
          {milestone.stage}
        </span>
      </button>

      <p
        className={`mt-4 font-display text-sm font-semibold leading-snug transition-colors ${active ? "text-foreground" : "text-foreground/75"}`}
      >
        {milestone.title}
      </p>
      <p className="mt-1 text-xs text-primary/80">{milestone.timeframe}</p>
    </motion.div>
  );
}
