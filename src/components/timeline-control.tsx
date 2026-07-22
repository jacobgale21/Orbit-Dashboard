// src/components/timeline-controls.tsx
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const EPOCH = new Date("2000-01-01T00:00:00Z"); // starts at 2000-01-01
const MAX_DAYS = 9855; // 26 years of scrub range (exit criteria)

const SPEEDS = [
  { label: "1x", daysPerSec: 1 },
  { label: "30x", daysPerSec: 30 },
  { label: "365x", daysPerSec: 365 },
];

function formatSimDate(simTimeDays: number) {
  const d = new Date(EPOCH.getTime() + simTimeDays * 86_400_000);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

type Props = {
  simTimeDays: number;
  setSimTimeDays: (n: number) => void;
  playing: boolean;
  setPlaying: (v: boolean) => void;
  speed: number;
  setSpeed: (n: number) => void;
};

export function TimelineControls({
  simTimeDays,
  setSimTimeDays,
  playing,
  setPlaying,
  speed,
  setSpeed,
}: Props) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-[#05060d]/90 px-4 py-3 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-xs text-slate-300">
            {formatSimDate(simTimeDays)}
            <span className="ml-2 text-slate-500">
              (+{simTimeDays.toFixed(1)} d)
            </span>
          </p>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="text-slate-200"
              onClick={() => setPlaying(!playing)}
            >
              {playing ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>

            {SPEEDS.map((s) => (
              <Button
                key={s.label}
                type="button"
                size="sm"
                variant="ghost"
                className={
                  speed === s.daysPerSec
                    ? "bg-white/10 text-white"
                    : "text-slate-400"
                }
                onClick={() => setSpeed(s.daysPerSec)}
              >
                {s.label}
              </Button>
            ))}
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={MAX_DAYS}
          step={0.1}
          value={simTimeDays}
          onChange={(e) => {
            setPlaying(false); // scrubbing pauses
            setSimTimeDays(Number(e.target.value));
          }}
          className="w-full accent-sky-400"
        />
      </div>
    </div>
  );
}

export { MAX_DAYS };
