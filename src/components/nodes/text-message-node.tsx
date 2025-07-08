import { Handle, Position, type NodeProps } from "@xyflow/react"
import { MessageCircle } from "lucide-react"

export function MessageNode({ data, selected }: NodeProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border-2 min-w-[200px] overflow-hidden ${
        selected ? "border-blue-400" : "border-gray-200"
      }`}
    >
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-gray-400 border-2 border-white" />

      <div className="bg-teal-100 px-4 py-2 flex items-center gap-2 border-b">
        <MessageCircle className="w-4 h-4 text-teal-600" />
        <span className="text-sm font-medium text-teal-800">Send Message</span>
      </div>

      <div className="px-4 py-3">
        <div className="text-sm text-gray-700">{typeof data.message === "string" ? data.message : "text message"}</div>
      </div>

      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-gray-400 border-2 border-white" />
    </div>
  )
}
