import { useApp } from '../context/AppContext'

function Toast({ toast }) {
  const { showToast } = useApp()
  
  if (!toast) return null

  const handleClose = () => {
    showToast(null) // Clear the toast immediately
  }

  return (
    <div className={`toast toast-${toast.type}`}>
      <span>{toast.message}</span>
      <button onClick={handleClose} className="toast-close">×</button>
    </div>
  )
}

export default Toast
