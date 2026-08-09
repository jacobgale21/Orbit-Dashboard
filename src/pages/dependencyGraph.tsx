import { GraphCanvas } from "../components/graph/graphCanvas";
import { Legend } from "../components/graph/legend";
export function DependencyGraph() {
  return (
    <div className="h-screen w-screen bg-[#05060d]">
      <Legend />
      <GraphCanvas />
    </div>
  );
}
