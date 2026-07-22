// src/components/landing/HeroSection.tsx
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden px-6 pt-16">
      <div className="relative mx-auto max-w-6xl">
        <p className="mb-4 text-sm uppercase tracking-[0.25em] text-accent-soft">
          Deep space exploration
        </p>
        <header className="mx-auto max-w-3xl">
          <h1 className="mt-6 text-balance bg-gradient-to-b from-white via-white to-slate-400 bg-clip-text text-5xl font-semibold tracking-tight text-transparent sm:text-6xl">
            Explore Humanity&apos;s Journey Beyond Earth
          </h1>
          <p className="mt-5 text-pretty text-base text-slate-400 sm:text-lg">
            An interactive platform for missions, spacecraft, destinations, and
            discoveries across the Solar System — and into interstellar space.
          </p>
        </header>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button size="lg" className="bg-accent-soft hover:bg-accent-soft/20">
            <a href="#missions">Explore Missions</a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 bg-transparent text-white hover:bg-white/20"
          >
            <a href="#timeline">View Mission Timeline</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
