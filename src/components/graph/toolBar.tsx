import { useMemo, useState, useRef } from "react";
import { Search, Grip } from "lucide-react";
import {
  SPECS,
  REL_TYPES,
  SPEC_COLORS,
  REL_COLORS,
  type Specialization,
  type RelationType,
  type MissionFocus,
} from "@/data/graphdata";

const MIN_W = 320;
const MAX_W = 720;
const MIN_H = 120;
const MAX_H = 420;

const MISSION_FOCUSES: MissionFocus[] = ["LEO", "Lunar", "Mars", "Deep Space"];

function toggleInSet<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

type ChipProps = {
  label: string;
  active: boolean;
  color?: string;
  onClick: () => void;
};

function FilterChip({ label, active, color, onClick }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition ${
        active
          ? "border-sky-400/40 bg-sky-500/20 text-sky-100"
          : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200"
      }`}
    >
      {color && (
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: color }}
          aria-hidden
        />
      )}
      {label}
    </button>
  );
}

export function ToolBar() {
  const [query, setQuery] = useState("");
  const [specs, setSpecs] = useState<Set<Specialization>>(() => new Set());
  const [rels, setRels] = useState<Set<RelationType>>(() => new Set());
  const [focuses, setFocuses] = useState<Set<MissionFocus>>(() => new Set());
  const [size, setSize] = useState({ w: 560, h: 220 });
  const dragRef = useRef<{
    x: number;
    y: number;
    w: number;
    h: number;
  } | null>(null);

  function onResizePointerDown(e: React.PointerEvent) {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      x: e.clientX,
      y: e.clientY,
      w: size.w,
      h: size.h,
    };
  }

  function onResizePointerMove(e: React.PointerEvent) {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    setSize({
      w: Math.min(MAX_W, Math.max(MIN_W, dragRef.current.w + dx)),
      h: Math.min(MAX_H, Math.max(MIN_H, dragRef.current.h + dy)),
    });
  }
  function onResizePointerUp(e: React.PointerEvent) {
    dragRef.current = null;
    e.currentTarget.releasePointerCapture(e.pointerId);
  }

  const filters = useMemo(
    () => ({ query, specs, rels, focuses }),
    [query, specs, rels, focuses],
  );
  void filters;

  return (
    <div className="pointer-events-none absolute inset-x-0 top-4 z-10 flex justify-center px-4">
      <div
        className="pointer-events-auto relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#070b18]/90 p-3 text-slate-200 shadow-xl backdrop-blur-md"
        style={{ width: size.w, height: size.h }}
      >
        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          {/* Search */}
          <label className="relative mb-3 block">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search companies…"
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pr-3 pl-9 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-sky-400/30 focus:ring-2 focus:ring-sky-400/15"
            />
          </label>

          {/* Specs */}
          <div className="mb-2">
            <p className="mb-1.5 text-[10px] font-semibold tracking-[0.2em] text-slate-500 uppercase">
              Specialization
            </p>
            <div className="flex gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {SPECS.map((spec) => (
                <FilterChip
                  key={spec}
                  label={spec}
                  color={SPEC_COLORS[spec]}
                  active={specs.has(spec)}
                  onClick={() => setSpecs((s) => toggleInSet(s, spec))}
                />
              ))}
            </div>
          </div>

          {/* Relationships */}
          <div className="mb-2">
            <p className="mb-1.5 text-[10px] font-semibold tracking-[0.2em] text-slate-500 uppercase">
              Relationships
            </p>
            <div className="flex gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {REL_TYPES.map((rel) => (
                <FilterChip
                  key={rel}
                  label={rel}
                  color={REL_COLORS[rel]}
                  active={rels.has(rel)}
                  onClick={() => setRels((s) => toggleInSet(s, rel))}
                />
              ))}
            </div>
          </div>

          {/* Mission focus */}
          <div>
            <p className="mb-1.5 text-[10px] font-semibold tracking-[0.2em] text-slate-500 uppercase">
              Mission focus
            </p>
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {MISSION_FOCUSES.map((focus) => (
                <FilterChip
                  key={focus}
                  label={focus}
                  active={focuses.has(focus)}
                  onClick={() => setFocuses((s) => toggleInSet(s, focus))}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Resize toolbar"
              onPointerDown={onResizePointerDown}
              onPointerMove={onResizePointerMove}
              onPointerUp={onResizePointerUp}
              className="absolute right-1 bottom-1 flex size-6 cursor-se-resize items-center justify-center rounded-md text-slate-500 hover:bg-white/5 hover:text-slate-300"
            >
              <Grip className="size-3.5 rotate-45" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
