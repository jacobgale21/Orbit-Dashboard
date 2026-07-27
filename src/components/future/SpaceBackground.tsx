import { useMemo } from "react";

type Star = { x: number; y: number; s: number; d: number; o: number };

function makeStars(count: number, seed: number): Star[] {
  let v = seed;
  const rnd = () => {
    v = (v * 9301 + 49297) % 233280;
    return v / 233280;
  };
  return Array.from({ length: count }, () => ({
    x: rnd() * 100,
    y: rnd() * 100,
    s: rnd() * 1.8 + 0.4,
    d: rnd() * 6,
    o: rnd() * 0.6 + 0.2,
  }));
}

function StarLayer({
  count,
  seed,
  blur,
}: {
  count: number;
  seed: number;
  blur?: boolean;
}) {
  const stars = useMemo(() => makeStars(count, seed), [count, seed]);
  return (
    <div className={`absolute inset-0 ${blur ? "blur-[1px]" : ""}`}>
      {stars.map((s, i) => (
        <span
          key={i}
          className="animate-twinkle absolute rounded-full bg-foreground"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.s,
            height: s.s,
            opacity: s.o,
            animationDelay: `${s.d}s`,
          }}
        />
      ))}
    </div>
  );
}

export function SpaceBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* nebula gradients */}
      <div className="nebula-bg absolute inset-0" />
      <div className="absolute -left-40 top-1/3 size-[38rem] rounded-full bg-nebula/20 blur-[120px]" />
      <div className="absolute -right-32 top-10 size-[32rem] rounded-full bg-nebula-2/20 blur-[130px]" />
      <div className="absolute bottom-0 left-1/3 size-[40rem] rounded-full bg-accent/10 blur-[150px]" />

      {/* stars */}
      <StarLayer count={120} seed={7} />
      <StarLayer count={70} seed={91} blur />

      {/* faint orbital rings */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="animate-spin-slow size-[52rem] rounded-full border border-border/40" />
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="animate-spin-slow size-[76rem] rounded-full border border-border/25 [animation-direction:reverse]" />
      </div>

      {/* distant planets */}
      <div className="absolute right-[6%] top-[4%] size-24 rounded-full bg-gradient-to-br from-primary/40 to-transparent blur-[2px] md:size-36" />
      <div className="absolute left-[6%] bottom-[14%] size-16 rounded-full bg-gradient-to-tr from-accent/40 to-transparent blur-[2px] md:size-24" />

      {/* drifting particles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="absolute size-[2px] rounded-full bg-primary/70"
          style={{
            left: `${(i * 7.3) % 100}%`,
            top: `${(i * 13.7) % 100}%`,
            animation: `drift ${18 + (i % 7) * 4}s linear ${i * 1.4}s infinite`,
          }}
        />
      ))}

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
