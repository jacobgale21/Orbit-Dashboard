import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SolarMapCanvas } from "@/components/solar-map-canvas";
import { TimelineControls, MAX_DAYS } from "@/components/timeline-control";
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
          <SolarMapCanvas tDays={simTimeDays} />
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
          <h2 className="text-sm font-semibold text-white">Destination</h2>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            Select a body on the map in a later step. For now, drag to orbit and
            scroll to zoom.
          </p>
          <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.03] p-3 text-[11px] text-slate-500">
            <p>Controls</p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>Left drag — rotate</li>
              <li>Scroll — zoom</li>
              <li>Right drag — pan</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
