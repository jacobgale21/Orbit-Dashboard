import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Coins,
  MoveVertical,
  Building,
  Sprout,
  Cpu,
  Sun,
  Telescope,
  Plus,
  Minus,
  type LucideIcon,
} from "lucide-react";
import type { FutureTheory } from "@/data/roadmap";

const icons: Record<string, LucideIcon> = {
  Coins,
  MoveVertical,
  Building,
  Sprout,
  Cpu,
  Sun,
  Telescope,
};

export function FutureTheoryCard({
  theory,
  index,
}: {
  theory: FutureTheory;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const Icon = icons[theory.icon] ?? Telescope;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="glass-panel group relative overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[var(--shadow-glow)]"
    >
      {/* illustration placeholder */}
      <div className="relative mb-5 h-32 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-nebula/25 via-background to-nebula-2/25">
        <span className="absolute -right-6 -top-6 size-24 rounded-full bg-primary/20 blur-2xl" />
        <span className="absolute bottom-3 left-4 size-10 rounded-full bg-gradient-to-tr from-accent/50 to-transparent" />
        <span className="animate-spin-slow absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/60" />
        <Icon
          className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 text-primary"
          strokeWidth={1.25}
        />
      </div>

      <h3 className="font-display text-lg font-semibold">{theory.title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{theory.summary}</p>

      <AnimatePresence initial={false}>
        {open && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden text-sm text-foreground/80"
          >
            <span className="block pt-3">{theory.detail}</span>
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-1.5 text-xs uppercase tracking-wider text-foreground/80 transition-colors hover:border-primary/60 hover:text-primary"
      >
        {open ? <Minus className="size-3.5" /> : <Plus className="size-3.5" />}
        {open ? "Collapse" : "Expand"}
      </button>
    </motion.article>
  );
}
