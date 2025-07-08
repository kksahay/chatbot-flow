import { useState, useEffect } from "react";
import type { Node } from "@xyflow/react";
import { ArrowLeft } from "lucide-react";

interface SettingsPanelProps {
  node: Node;
  onClose: () => void;
  onUpdateNode: (nodeId: string, newData: any) => void;
}

export function SettingsPanel({
  node,
  onClose,
  onUpdateNode,
}: SettingsPanelProps) {
  const [message, setMessage] = useState(
    typeof node.data.message === "string" ? node.data.message : ""
  );

  useEffect(() => {
    setMessage(typeof node.data.message === "string" ? node.data.message : "");
  }, [node]);

  const handleMessageChange = (value: string) => {
    setMessage(value);
    onUpdateNode(node.id, { message: value });
  };

  return (
    <div className="settings-panel">
      <div className="settings-header">
        <div className="settings-header-content">
          <button className="settings-back-btn" onClick={onClose}>
            <ArrowLeft className="settings-back-icon" />
          </button>
          <h3 className="settings-title">Message</h3>
        </div>
      </div>

      <div className="settings-content">
        <div className="settings-form">
          <div className="form-group">
            <label htmlFor="message-text" className="form-label">
              Text
            </label>
            <textarea
              id="message-text"
              value={message}
              onChange={(e) => handleMessageChange(e.target.value)}
              placeholder="Enter your message here..."
              className="form-textarea"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
