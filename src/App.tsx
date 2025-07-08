import { ReactFlowProvider } from "@xyflow/react";
import { FlowCanvas } from "./components/flow-canvas";

export default function App() {
  return (
    <ReactFlowProvider>
      <FlowCanvas />
    </ReactFlowProvider>
  );
}
