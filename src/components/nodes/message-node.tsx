import { Handle, Position, type NodeProps } from "@xyflow/react"
import { MessageCircle } from "lucide-react"

export function MessageNode({ data, selected }: NodeProps) {
  return (
    <div className={`message-node ${selected ? "selected" : ""}`}>
      <Handle type="target" position={Position.Left} />

      <div className="message-node-header">
        <MessageCircle className="message-node-icon" />
        <span className="message-node-title">Send Message</span>
      </div>

      <div className="message-node-content">
        <div className="message-node-text">{typeof data.message === "string" ? data.message : "text message"}</div>
      </div>

      <Handle type="source" position={Position.Right} />
    </div>
  )
}
