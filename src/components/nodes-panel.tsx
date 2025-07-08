import type React from "react"
import { MessageCircle } from "lucide-react"

export function NodesPanel() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    console.log(event)
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <div className="nodes-panel">
      <div className="nodes-panel-header">
        <h3 className="nodes-panel-title">Nodes Panel</h3>
      </div>

      <div className="nodes-panel-items">
        <div className="draggable-node" draggable onDragStart={(event) => onDragStart(event, "messageNode")}>
          <div className="draggable-node-icon-container">
            <MessageCircle className="draggable-node-icon" />
          </div>
          <span className="draggable-node-label">Message</span>
        </div>
      </div>
    </div>
  )
}
