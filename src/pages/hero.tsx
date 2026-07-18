// src/components/landing/HeroSection.tsx
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden px-6 pt-16">
      <div className="relative mx-auto max-w-6xl">
        <p className="mb-4 text-sm uppercase tracking-[0.25em] text-accent-soft">
          Deep space exploration
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl md:leading-[1.05]">
          Explore Humanity&apos;s Journey Beyond Earth
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/60">
          An interactive platform for missions, spacecraft, destinations, and
          discoveries across the Solar System — and into interstellar space.
        </p>
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
