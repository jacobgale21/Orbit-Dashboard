import { motion } from "framer-motion";
import { SpaceBackground } from "../components/future/SpaceBackground";
import { Roadmap } from "../components/future/Roadmap";
import { DependencyGraph } from "../components/future/DependencyGraph";
import { FutureTheoryCard } from "../components/future/FutureTheoryCard";
import { TechnologyGapCard } from "../components/future/TechnologyGapCard";
import { futureTheories, technologyGaps } from "@/data/roadmap";
import SiteNavbar from "../components/navBar";

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-3xl text-center"
    >
      <p className="text-xs uppercase tracking-[0.3em] text-primary/80">
        {eyebrow}
      </p>
      <h2 className="text-gradient mt-4 text-3xl font-semibold sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base text-muted-foreground">{subtitle}</p>
      )}
    </motion.div>
  );
}

export default function Future() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <SiteNavbar />
      <SpaceBackground />

      <section
        id="the-road-ahead"
        className="relative mx-auto max-w-7xl px-5 pb-24 pt-28 sm:px-8 md:pt-36"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-primary/90">
            The Road Ahead
          </span>
          <h1 className="text-gradient mt-7 text-4xl font-semibold leading-[1.05] sm:text-6xl md:text-7xl">
            The Future of Space Exploration
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            A roadmap of the technologies, discoveries, and breakthroughs
            required for humanity to become a multi-planetary civilization.
          </p>
        </motion.div>

        <div className="mt-20 md:mt-28">
          <Roadmap />
        </div>

        <div className="mt-24 md:mt-32">
          <DependencyGraph />
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <SectionHeading
          eyebrow="Theories of the future"
          title="What Could Humanity Become?"
          subtitle="Concepts that sit just beyond engineering — the shapes a spacefaring civilization might take."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {futureTheories.map((t, i) => (
            <FutureTheoryCard key={t.id} theory={t} index={i} />
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <SectionHeading
          eyebrow="Technology gaps"
          title="What Must We Invent?"
          subtitle="The unsolved problems standing between us and everything above."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {technologyGaps.map((g, i) => (
            <TechnologyGapCard key={g.name} gap={g} index={i} />
          ))}
        </div>
      </section>

      <footer className="relative border-t border-border/60 py-10 text-center text-xs text-muted-foreground">
        Built for the next two hundred years.
      </footer>
    </main>
  );
}
