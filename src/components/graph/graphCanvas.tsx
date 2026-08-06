import { useEffect, useRef, useState } from "react";
import {
  COMPANIES,
  RELATIONSHIPS,
  SPEC_COLORS,
  SPECS,
  REL_COLORS,
  type Company,
  type Relationship,
} from "@/data/graphdata";

import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
} from "d3-force";

type SimNode = Company & { x: number; y: number; vx?: number; vy?: number };
type SimLink = Relationship & {
  source: string | SimNode;
  target: string | SimNode;
};

const nodes: SimNode[] = COMPANIES.map((c) => ({
  ...c,
  x: 0,
  y: 0,
}));

const nodeById = new Map(nodes.map((n) => [n.id, n]));

const links: SimLink[] = RELATIONSHIPS.filter(
  (r) => nodeById.has(r.source) && nodeById.has(r.target),
);

const radius = (c: Company) => (c.major ? 22 : 12);

export function GraphCanvas() {
  const svgRef = useRef<SVGSVGElement>(null);
  // Initialize state with your raw data arrays
  const [animatedNodes, setAnimatedNodes] = useState([...nodes]);
  const [animatedLinks, setAnimatedLinks] = useState([...links]);

  useEffect(() => {
    const sim = forceSimulation(animatedNodes)
      .force(
        "link",
        forceLink(animatedLinks)
          .id((d: any) => d.id)
          .distance(120),
      )
      .force("charge", forceManyBody().strength(-180))
      .force(
        "center",
        forceCenter(window.innerWidth / 2, window.innerHeight / 2),
      )
      .force(
        "collide",
        forceCollide().radius((d: any) => radius(d) + 6),
      )
      .on("tick", () => {
        // Trigger React re-render with the freshly calculated coordinates
        setAnimatedNodes([...animatedNodes]);
        setAnimatedLinks([...animatedLinks]);
      });

    return () => {
      sim.stop(); // Clean up simulation on unmount
    };
  }, []);

  return (
    <svg ref={svgRef} className="h-full w-full">
      <g className="edges">
        {animatedLinks.map((l, i) => (
          <line
            key={i}
            x1={(l.source as any).x}
            y1={(l.source as any).y}
            x2={(l.target as any).x}
            y2={(l.target as any).y}
            stroke={REL_COLORS[l.type] ?? "#64748b"}
            strokeOpacity={0.45}
            strokeWidth={1}
          />
        ))}
      </g>
      <g className="nodes">
        {animatedNodes.map((n) => (
          // The translate update moves the circle AND the text tag together
          <g key={n.id} transform={`translate(${n.x ?? 0},${n.y ?? 0})`}>
            <circle
              r={radius(n)}
              fill={SPEC_COLORS[n.spec]}
              stroke="rgba(255,255,255,0.25)"
              strokeWidth={1}
            />
            <text
              y={radius(n) + 12}
              textAnchor="middle"
              className="fill-slate-200 text-[10px]"
            >
              {n.short}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
