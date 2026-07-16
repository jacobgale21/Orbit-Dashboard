import { Section } from "@/components/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { discoveries } from "@/data/placeholder";

export default function Discoveries() {
  return (
    <Section id="current-missions">
      <div className="mb-10">
        <h2 className="text-3xl font-semibold tracking-tight">Discoveries</h2>
        <p className="mt-2 text-white/55">
          The most important discoveries in the history of space exploration.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {discoveries.map((discovery) => (
          <Card
            key={discovery.title}
            className="border-white/10 bg-space-900/80 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:border-accent/40"
          >
            <CardHeader className="space-y-3">
              <CardTitle className="text-lg text-white">
                {discovery.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-white/80">{discovery.description}</p>
              <Button className="bg-space-900/80 shadow-xl shadow-black/20 hover:bg-space-900/90">
                Read more
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
