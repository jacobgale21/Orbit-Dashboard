import { GraphCanvas } from "../components/graph/graphCanvas";
import { Legend } from "../components/graph/legend";
import { ToolBar } from "../components/graph/toolBar";
export function DependencyGraph() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#05060d]">
      <ToolBar />
      <Legend />
      <GraphCanvas />
    </div>
  );
}
