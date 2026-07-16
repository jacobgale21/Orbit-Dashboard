import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Section } from "@/components/section";
import { timeline } from "@/data/placeholder";

export default function MissionTimelinePreview() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.5;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <Section id="timeline" className="bg-space-900/40">
      <h2 className="mb-10 text-3xl font-semibold">Mission Timeline</h2>

      <div className="relative mx-12">
        <button
          type="button"
          aria-label="Scroll timeline left"
          onClick={() => scrollByAmount("left")}
          className="absolute -left-14 top-1/2 z-10 -translate-y-1/2"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
        <button
          type="button"
          aria-label="Scroll timeline right"
          onClick={() => scrollByAmount("right")}
          className="absolute -right-12 top-1/2 z-10 -translate-y-1/2"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
        <div
          ref={scrollerRef}
          className="overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <ol className="flex min-w-max items-center gap-0">
            {timeline.map((item, i) => (
              <li key={item} className="flex items-center">
                <div className="flex w-36 flex-col items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-accent shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                  <span className="text-center text-sm text-white/80">
                    {item}
                  </span>
                </div>
                {i < timeline.length - 1 && (
                  <div className="mb-8 h-px w-16 bg-white/20" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
