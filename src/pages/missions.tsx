// src/components/landing/FeaturedMissions.tsx
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { missions } from "@/data/placeholder";

export default function FeaturedMissions() {
  return (
    <Section id="missions">
      <div className="mb-10">
        <h2 className="text-3xl font-semibold tracking-tight">
          Featured Missions
        </h2>
        <p className="mt-2 text-white/55">
          Active and historic programs shaping deep space exploration.
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2">
        {missions.map((m) => (
          <Card
            key={m.name}
            className="group overflow-hidden border-white/10 bg-space-900/80 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:border-accent/40"
          >
            <div className="h-40 bg-gradient-to-br from-space-800 to-space-950" />
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-lg text-white">{m.name}</CardTitle>
                <Badge className="bg-accent/20 text-accent-soft hover:bg-accent/20">
                  {m.status}
                </Badge>
              </div>
              <p className="text-sm text-white/50">
                {m.destination} · {m.year}
              </p>
            </CardHeader>
            <CardFooter>
              <Button
                variant="ghost"
                className="px-0 text-accent hover:bg-transparent hover:text-white"
              >
                Learn More →
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Section>
  );
}
