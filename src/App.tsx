import { ReactFlowProvider } from "@xyflow/react";
import { FlowCanvas } from "./components/flow-canvas";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <>
      <ReactFlowProvider>
        <FlowCanvas />
      </ReactFlowProvider>
      <Analytics />
    </>
  );
}
