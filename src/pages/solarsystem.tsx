import { Section } from "@/components/section";
export default function SolarSystemPlaceholder() {
  return (
    <Section>
      <h2 className="text-center text-3xl font-semibold">
        Solar System Explorer
      </h2>
      <div className="mx-auto mt-12 flex h-72 w-72 items-center justify-center rounded-full border border-white/10 bg-[radial-gradient(circle,_#1e3a8a_0%,_#030712_70%)] shadow-[0_0_80px_rgba(59,130,246,0.25)] md:h-96 md:w-96">
        <span className="text-sm text-white/40">Visualization</span>
      </div>
      <p className="mt-8 text-center text-white/50">
        Interactive mission explorer coming in a future sprint.
      </p>
    </Section>
  );
}
