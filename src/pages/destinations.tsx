import { Section } from "@/components/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStructures } from "@/api";
import { useEffect, useState } from "react";
import type { Structure } from "@/api";
export default function Destinations() {
  const [structures, setStructures] = useState<Structure[]>([]);
  useEffect(() => {
    getStructures().then((data) => {
      setStructures(data);
    });
  }, []);
  return (
    <Section id="destinations">
      <div className="mb-10">
        <h2 className="text-3xl font-semibold tracking-tight">Destinations</h2>
        <p className="mt-2 text-white/55">
          Destinations needed to expand our knowledge of the universe.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {structures.map((structure) => (
          <Card
            key={structure.id}
            className="border-white/10 bg-space-900/80 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:border-accent/40"
          >
            <CardHeader className="space-y-1">
              <CardTitle className="text-lg text-white">
                {structure.name}
              </CardTitle>
              <p className="text-sm text-white/45">Planetary body</p>
            </CardHeader>

            <CardContent>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-4">
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-white/40">
                    Mass
                  </dt>
                  <dd className="mt-1 text-sm text-white/80">
                    {structure.mass
                      ? `${(structure.mass.massValue * 10 ** structure.mass.massExponent).toExponential(2)} kg`
                      : "—"}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-white/40">
                    Volume
                  </dt>
                  <dd className="mt-1 text-sm text-white/80">
                    {structure.volume
                      ? `${(structure.volume.volValue * 10 ** structure.volume.volExponent).toExponential(2)} km³`
                      : "—"}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-white/40">
                    Gravity
                  </dt>
                  <dd className="mt-1 text-sm text-white/80">
                    {structure.gravity != null
                      ? `${structure.gravity} m/s²`
                      : "—"}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-white/40">
                    Escape
                  </dt>
                  <dd className="mt-1 text-sm text-white/80">
                    {structure.escape != null
                      ? `${structure.escape} km/s`
                      : "—"}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-white/40">
                    Temp
                  </dt>
                  <dd className="mt-1 text-sm text-white/80">
                    {structure.temperature != null
                      ? `${structure.temperature} K`
                      : "—"}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-white/40">
                    Period
                  </dt>
                  <dd className="mt-1 text-sm text-white/80">
                    {structure.period != null
                      ? `${structure.period} days`
                      : "—"}
                  </dd>
                </div>

                <div className="col-span-2 border-t border-white/10 pt-4">
                  <dt className="text-xs uppercase tracking-[0.18em] text-white/40">
                    Distance
                  </dt>
                  <dd className="mt-1 text-sm text-accent-soft">
                    {structure.distance != null
                      ? `${structure.distance} ly`
                      : "—"}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
