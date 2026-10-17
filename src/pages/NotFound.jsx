import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container d-flex align-items-center justify-content-center" style={{ minHeight: "70vh" }}>
      <div className="card border-0 shadow-sm p-5 text-center" style={{ maxWidth: "520px", borderRadius: "var(--radius-xl)" }}>
        <div 
          className="mx-auto mb-3 text-primary d-flex align-items-center justify-content-center rounded-circle"
          style={{ width: "80px", height: "80px", backgroundColor: "#e0f2fe", fontSize: "2.5rem" }}
        >
          <i className="bi bi-compass"></i>
        </div>
        <h1 className="fw-800 display-5 text-dark mb-2">404</h1>
        <h4 className="fw-bold text-dark mb-2">Page Not Found</h4>
        <p className="text-muted small mb-4">
          The requested hospital dashboard section or patient record does not exist or may have been relocated.
        </p>
        <div>
          <button
            type="button"
            className="btn btn-primary rounded-pill px-4 shadow-sm"
            onClick={() => navigate('/')}
          >
            <i className="bi bi-house-door-fill me-1.5"></i>
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
