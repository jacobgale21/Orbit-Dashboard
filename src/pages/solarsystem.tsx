import { Section } from "@/components/section";
export default function SolarSystemPlaceholder() {
  return (
    <Section>
      <header className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
        <h2 className="mt-5 text-balance bg-gradient-to-b from-white via-white to-slate-400 bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl">
          Solar System Explorer
        </h2>
      </header>
      <div className="mx-auto mt-12 flex h-72 w-72 items-center justify-center rounded-full border border-white/10 bg-[radial-gradient(circle,_#1e3a8a_0%,_#030712_70%)] shadow-[0_0_80px_rgba(59,130,246,0.25)] md:h-96 md:w-96">
        <span className="text-sm text-white/40">Visualization</span>
      </div>
      <p className="mt-8 text-center text-white/50">
        Interactive mission explorer coming in a future sprint.
      </p>
    </Section>
  );
}
