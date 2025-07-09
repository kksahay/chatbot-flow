// FlowCanvas.tsx
import {
  ReactFlow,
  useReactFlow,
  type Node,
  addEdge,
  type Connection,
  useNodesState,
  useEdgesState,
  Background,
  type ReactFlowInstance,
} from "@xyflow/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { MessageNode } from "./nodes/message-node";
import { SaveButton } from "./save-button";
import { SettingsPanel } from "./settings-panel";
import { ErrorNotification } from "./error-notification";
import { NodesPanel } from "./nodes-panel";
import "../index.css";
import "@xyflow/react/dist/style.css";

const nodeTypes = {
  messageNode: MessageNode,
};

const STORAGE_KEY = "chatbot-flow-builder-data";

const loadInitialData = () => {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          nodes: parsed.nodes || [],
          edges: parsed.edges || [],
        };
      }
    } catch (error) {
      console.error("Failed to load saved flow:", error);
    }
  }

  return {
    nodes: [
      {
        id: "1",
        type: "messageNode",
        position: { x: 100, y: 200 },
        data: { message: "test message 1" },
      },
      {
        id: "2",
        type: "messageNode",
        position: { x: 400, y: 100 },
        data: { message: "test message 2" },
      },
      {
        id: "3",
        type: "messageNode",
        position: { x: 600, y: 300 },
        data: { message: "textNode" },
      },
    ],
    edges: [
      {
        id: "e1-2",
        source: "1",
        target: "2",
        type: "smoothstep",
      },
    ],
  };
};

let id = 3;
const getId = () => `${id++}`;

export function FlowCanvas() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const initialData = loadInitialData();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialData.nodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialData.edges)
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  const [showError, setShowError] = useState(false);
  const { screenToFlowPosition } = useReactFlow();

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const saveToLocalStorage = useCallback(() => {
    try {
      const flowData = {
        nodes,
        edges,
        timestamp: Date.now(),
        version: "1.0.0",
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(flowData));
      setHasUnsavedChanges(false);
      console.log("Flow auto-saved to localStorage");
    } catch (error) {
      console.error("Failed to save flow:", error);
    }
  }, [nodes, edges]);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) => addEdge({ ...params, type: "smoothstep" }, eds)),
    [setEdges]
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: getId(),
        type: "messageNode",
        position,
        data: { message: "text message" },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setShowSettingsPanel(true);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setShowSettingsPanel(false);
  }, []);

  const saveChanges = useCallback(() => {
    const hasUnconnectedNodes = nodes.some((node) => {
      const hasIncoming = edges.some((edge) => edge.target === node.id);
      return node.id !== "1" && !hasIncoming;
    });

    if (hasUnconnectedNodes) {
      setShowError(true);
      return;
    }

    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem("chatbot-flow", JSON.stringify(flow));
      setShowError(false);
      alert("Changes saved successfully!");
    }
  }, [reactFlowInstance, nodes, edges]);

  const updateNodeData = useCallback(
    (nodeId: string, newData: any) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, ...newData } }
            : node
        )
      );
    },
    [setNodes]
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (nodes.length > 0) {
        saveToLocalStorage();
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [nodes, edges, saveToLocalStorage]);

  
  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [nodes, edges]);

  return (
    <div className="app-container">
      {showError && (
        <ErrorNotification
          message="Cannot save Flow"
          onClose={() => setShowError(false)}
        />
      )}

      <div className="save-button-container">
        <SaveButton onClick={saveChanges} hasUnsavedChanges={hasUnsavedChanges} />
      </div>

      <div className="flow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          fitView
          className="react-flow"
          defaultEdgeOptions={{ type: "smoothstep" }}
        >
          <Background color="#e5e7eb" gap={20} />
        </ReactFlow>
      </div>

      <div className="right-panel">
        {showSettingsPanel && selectedNode ? (
          <SettingsPanel
            node={selectedNode}
            onClose={() => setShowSettingsPanel(false)}
            onUpdateNode={updateNodeData}
          />
        ) : (
          <NodesPanel />
        )}
      </div>
    </div>
  );
}
