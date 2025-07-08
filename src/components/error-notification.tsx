import { X } from "lucide-react"

interface ErrorNotificationProps {
  message: string
  onClose: () => void
}

export function ErrorNotification({ message, onClose }: ErrorNotificationProps) {
  return (
    <div className="error-notification">
      <div className="error-content">
        <span className="error-text">{message}</span>
        <button className="error-close-btn" onClick={onClose}>
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}
