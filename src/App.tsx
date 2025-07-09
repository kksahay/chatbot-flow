import { ReactFlowProvider } from "@xyflow/react";
import { FlowCanvas } from "./components/flow-canvas";
import { Analytics } from "@vercel/analytics/next";

export default function App() {
  return (
    <ReactFlowProvider>
      <FlowCanvas />
      <Analytics />
    </ReactFlowProvider>
  );
}
