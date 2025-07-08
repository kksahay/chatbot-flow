interface SaveButtonProps {
  onClick: () => void
  hasUnsavedChanges?: boolean
}

export function SaveButton({ onClick, hasUnsavedChanges = false }: SaveButtonProps) {
  return (
    <button
      className={`save-button ${hasUnsavedChanges ? "unsaved" : ""}`}
      onClick={onClick}
      title="Save flow (Ctrl+S)"
    >
      Save Changes
    </button>
  )
}