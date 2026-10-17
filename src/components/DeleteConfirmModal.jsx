import React from 'react';

const DeleteConfirmModal = ({ isOpen, title, message, itemName, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-backdrop" onClick={onCancel}>
      <div 
        className="custom-modal-dialog" 
        style={{ maxWidth: '460px' }} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="custom-modal-header bg-light">
          <h5 className="modal-title fw-bold text-danger d-flex align-items-center gap-2 mb-0">
            <i className="bi bi-exclamation-triangle-fill"></i>
            {title || "Confirm Deletion"}
          </h5>
          <button 
            type="button" 
            className="btn-close" 
            onClick={onCancel}
            aria-label="Close"
          ></button>
        </div>
        <div className="custom-modal-body py-4 text-center">
          <div 
            className="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center text-danger"
            style={{ width: "64px", height: "64px", backgroundColor: "#fee2e2", fontSize: "1.8rem" }}
          >
            <i className="bi bi-trash3-fill"></i>
          </div>
          <h6 className="fw-bold text-dark mb-2">
            Are you sure you want to delete {itemName ? <span className="text-danger">"{itemName}"</span> : "this item"}?
          </h6>
          <p className="text-muted small mb-0 px-2">
            {message || "This action cannot be undone. All associated records will be permanently removed."}
          </p>
        </div>
        <div className="custom-modal-footer">
          <button 
            type="button" 
            className="btn btn-outline-secondary rounded-pill px-4" 
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            type="button" 
            className="btn btn-danger rounded-pill px-4 d-flex align-items-center gap-2" 
            onClick={onConfirm}
          >
            <i className="bi bi-trash3"></i>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
