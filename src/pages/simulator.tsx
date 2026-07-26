import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SolarMapCanvas } from "@/components/solar-map-canvas";
import { TimelineControls, MAX_DAYS } from "@/components/timeline-control";
import { PLACEHOLDER_MOONS } from "@/data/placeholder";

type SystemView = { mode: "system" };
type SubsystemView = {
  mode: "subsystem";
  parent: "Earth" | "Jupiter" | "Saturn";
};
export type MapView = SystemView | SubsystemView;

export default function Simulator() {
  const [simTimeDays, setSimTimeDays] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(30); // days per real second
  // keep latest values in refs so rAF loop stays stable
  const playingRef = useRef(playing);
  const speedRef = useRef(speed);
  const timeRef = useRef(simTimeDays);
  playingRef.current = playing;
  speedRef.current = speed;
  timeRef.current = simTimeDays;

  const [view, setView] = useState<MapView>({ mode: "system" });

  useEffect(() => {
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000; // seconds
      last = now;
      if (playingRef.current) {
        let next = timeRef.current + speedRef.current * dt;
        if (next >= MAX_DAYS) {
          next = MAX_DAYS;
          setPlaying(false); // stop after one year
        }
        timeRef.current = next;
        setSimTimeDays(next);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <div className="relative min-h-screen bg-[#05060d] text-slate-100">
      {/* header ... */}
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#05060d]/80 px-6 py-3 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-xs font-semibold tracking-[0.2em] text-white/70 hover:text-white"
          >
            ORBIT
          </Link>
          <span className="text-sm text-white/40">/</span>
          <h1 className="text-sm font-medium text-white">Voyage Simulator</h1>
        </div>
        <p className="hidden text-xs text-slate-500 sm:block">
          Step 1 — solar map shell (pan / zoom)
        </p>
      </header>

      <div className="grid h-screen grid-cols-1 pt-12 lg:grid-cols-[1fr_320px]">
        <div className="relative min-h-0 pb-24">
          <SolarMapCanvas
            view={view}
            tDays={simTimeDays}
            onSelectParent={(name) =>
              setView({ mode: "subsystem", parent: name })
            }
          />
          <TimelineControls
            simTimeDays={simTimeDays}
            setSimTimeDays={setSimTimeDays}
            playing={playing}
            setPlaying={setPlaying}
            speed={speed}
            setSpeed={setSpeed}
          />
        </div>

        {/* Side panel placeholder — fill in later */}
        <aside className="hidden border-l border-white/10 bg-white/[0.02] p-5 lg:block">
          {view.mode === "system" ? (
            <>
              <h2 className="text-sm font-semibold text-white">Solar system</h2>
              <p className="mt-2 text-xs text-slate-400">
                Click Earth, Jupiter, or Saturn to enter a moon system.
              </p>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setView({ mode: "system" })}
                className="mb-4 text-xs text-slate-400 hover:text-white"
              >
                ← Back to solar system
              </button>
              <h2 className="text-sm font-semibold text-white">
                {view.parent} system
              </h2>
              <ul className="mt-4 space-y-2">
                {PLACEHOLDER_MOONS.filter((m) => m.parent === view.parent).map(
                  (m) => (
                    <li
                      key={m.name}
                      className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs"
                    >
                      <p className="font-medium text-slate-100">{m.name}</p>
                      <p className="text-slate-500">Period {m.periodDays} d</p>
                    </li>
                  ),
                )}
              </ul>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
