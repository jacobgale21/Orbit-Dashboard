import { useEffect, useRef, useState } from "react";
import {
  COMPANIES,
  RELATIONSHIPS,
  SPEC_COLORS,
  SPECS,
  REL_COLORS,
  type Company,
  type Relationship,
  type Specialization,
} from "@/data/graphdata";

import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  forceX,
  forceY,
} from "d3-force";
import { drag } from "d3-drag";
import { select } from "d3-selection";

type SimNode = Company & { x: number; y: number; fx?: number; fy?: number };
type SimLink = Relationship & {
  source: string | SimNode;
  target: string | SimNode;
};
const cx = window.innerWidth / 2;
const cy = window.innerHeight / 2;
const centers = specCenters(SPECS, cx, cy, 100);

const nodes: SimNode[] = COMPANIES.map((c, i) => {
  const center = centers.get(c.spec)!;
  // small jitter so majors/minors in the same spec aren't stacked
  const jitter = 40;
  const angle = Math.random() * Math.PI * 2;
  const r = Math.random() * jitter;
  return {
    ...c,
    x: center.x + Math.cos(angle) * r,
    y: center.y + Math.sin(angle) * r,
  };
});

const nodeById = new Map(nodes.map((n) => [n.id, n]));

const links: SimLink[] = RELATIONSHIPS.filter(
  (r) => nodeById.has(r.source) && nodeById.has(r.target),
);

function specCenters(
  specs: Specialization[],
  cx: number,
  cy: number,
  ringRadius: number,
) {
  const centers = new Map<Specialization, { x: number; y: number }>();
  specs.forEach((spec, i) => {
    const a = (i / specs.length) * Math.PI * 2 - Math.PI / 2;
    centers.set(spec, {
      x: cx + Math.cos(a) * ringRadius,
      y: cy + Math.sin(a) * ringRadius,
    });
  });
  return centers;
}

const radius = (c: Company) => (c.major ? 22 : 12);

export function GraphCanvas() {
  const svgRef = useRef<SVGSVGElement>(null);
  // Initialize state with your raw data arrays
  const [animatedNodes, setAnimatedNodes] = useState([...nodes]);
  const [animatedLinks, setAnimatedLinks] = useState([...links]);
  const simRef = useRef<ReturnType<typeof forceSimulation<SimNode>> | null>(
    null,
  );

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || animatedNodes.length === 0) return;

    // 1. Initialize the simulation
    const sim = forceSimulation(animatedNodes)
      .force(
        "link",
        forceLink(animatedLinks)
          .id((d: any) => d.id)
          .distance(75),
      )
      .force("charge", forceManyBody().strength(-800))
      .force("center", forceCenter(cx, cy))
      .force(
        "collide",
        forceCollide()
          .radius((d: any) => radius(d) + 2)
          .iterations(4),
      )
      .force("x", forceX<SimNode>((d) => centers.get(d.spec)!.x).strength(1.0))
      .force("y", forceY<SimNode>((d) => centers.get(d.spec)!.y).strength(1.0))
      .on("tick", () => {
        setAnimatedNodes([...sim.nodes()]);
        const linkForce = sim.force<any>("link");
        if (linkForce) {
          setAnimatedLinks([...linkForce.links()]);
        }
      });

    simRef.current = sim;

    // 2. Setup Drag Behavior
    const dragBehavior = drag<SVGGElement, SimNode>()
      .on("start", (event, d) => {
        if (!event.active) sim.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on("end", (event, d) => {
        if (!event.active) sim.alphaTarget(0);
        d.fx = undefined;
        d.fy = undefined;
      });

    // 3. Bind to elements
    select(svg)
      .selectAll<SVGGElement, SimNode>("g.nodes g")
      .data(animatedNodes) // no key fn
      .call(dragBehavior);
    // 4. CRITICAL CLEANUP: Stop the background timer loops on unmount
    return () => {
      sim.stop();
    };
  }, [animatedNodes.length]);

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
          <g
            key={n.id}
            className="cursor-grab active:cursor-grabbing"
            transform={`translate(${n.x ?? 0},${n.y ?? 0})`}
          >
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
