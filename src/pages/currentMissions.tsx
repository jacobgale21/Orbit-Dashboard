import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { statuses } from "@/data/placeholder";

export default function CurrentMissions() {
  return (
    <Section id="current-missions">
      <div className="mb-10">
        <h2 className="text-3xl font-semibold tracking-tight">
          Current Missions
        </h2>
        <p className="mt-2 text-white/55">
          Live status snapshots from active deep-space programs.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {statuses.map((status) => (
          <Card
            key={status.name}
            className="border-white/10 bg-space-900/80 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:border-accent/40"
          >
            <CardHeader className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="text-lg text-white">
                  {status.name}
                </CardTitle>
                <Badge className="bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/15">
                  {status.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                  Distance
                </p>
                <p className="mt-1 text-sm text-white/80">{status.distance}</p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                  Mission phase
                </p>
                <p className="mt-1 text-sm text-white/80">{status.phase}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
