import { Section } from "@/components/section";
import { destinations } from "@/data/placeholder";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
export default function Destinations() {
  return (
    <Section id="destinations">
      <div className="mb-10">
        <h2 className="text-3xl font-semibold tracking-tight">Destinations</h2>
        <p className="mt-2 text-white/55">
          Destinations needed to expand our knowledge of the universe.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {destinations.map((destination) => (
          <Card
            key={destination}
            className="border-white/10 bg-space-900/80 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:border-accent/40"
          >
            <CardHeader className="space-y-3">
              <CardTitle className="text-lg text-white">
                {destination}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </Section>
  );
}
