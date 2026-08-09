import { SPEC_COLORS, REL_COLORS } from "@/data/graphdata";
import { useState } from "react";

export function Legend() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <aside className="absolute bottom-8 left-4 z-10 max-w-xs rounded-xl border border-white/10 bg-[#070b18]/90 p-4 text-slate-200 shadow-xl backdrop-blur-md">
      <header className="flex items-center justify-between">
        <h2 className="text-pretty text-lg font-semibold">Legend</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{ cursor: "pointer", padding: "8px", fontSize: "20px" }}
          aria-label="Toggle map legend"
        >
          {isOpen ? "▲" : "▼"}
        </button>
      </header>
      {isOpen && (
        <>
          <section>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Specialization
            </h3>
            <ul className="space-y-1.5">
              {Object.entries(SPEC_COLORS).map(([spec, color]) => (
                <li key={spec} className="flex items-center gap-2 text-sm">
                  <span
                    className="h-3 w-3 shrink-0 rounded-sm"
                    style={{ backgroundColor: color }}
                    aria-hidden
                  />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-4 border-t border-white/10 pt-4">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Relationship
            </h3>
            <ul className="space-y-1.5">
              {Object.entries(REL_COLORS).map(([type, color]) => (
                <li key={type} className="flex items-center gap-2 text-sm">
                  <span
                    className="h-0.5 w-6 shrink-0 rounded-full"
                    style={{ backgroundColor: color }}
                    aria-hidden
                  />
                  <span>{type}</span>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </aside>
  );
}
