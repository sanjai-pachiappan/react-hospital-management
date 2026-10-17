import React from 'react';

const ToastNotification = ({ toasts, onClose }) => {
  if (!toasts || toasts.length === 0) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success': return 'bi-check-circle-fill text-success';
      case 'danger': return 'bi-exclamation-circle-fill text-danger';
      case 'warning': return 'bi-exclamation-triangle-fill text-warning';
      default: return 'bi-info-circle-fill text-primary';
    }
  };

  return (
    <div className="toast-container-custom">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast-alert" role="alert">
          <i className={`bi ${getIcon(toast.type)} fs-5`}></i>
          <div className="flex-grow-1 text-dark" style={{ fontSize: "0.88rem" }}>
            {toast.message}
          </div>
          <button
            type="button"
            className="btn-close btn-sm shadow-none ms-2"
            onClick={() => onClose(toast.id)}
            aria-label="Close notification"
          ></button>
        </div>
      ))}
    </div>
  );
};

export default ToastNotification;
