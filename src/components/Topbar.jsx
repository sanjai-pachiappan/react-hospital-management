import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Topbar = ({ toggleSidebar, onResetDemoData, onQuickBook }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format page title from location
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard Overview';
    if (path.startsWith('/patients/')) return 'Patient Medical Profile';
    if (path.startsWith('/patients')) return 'Patients Directory';
    if (path.startsWith('/doctors')) return 'Specialist Doctors';
    if (path.startsWith('/appointments')) return 'Appointment Schedule';
    if (path.startsWith('/departments')) return 'Hospital Departments';
    return 'Hospital Management System';
  };

  const formattedDate = currentDateTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="sidebar-toggle-btn"
          onClick={toggleSidebar}
          aria-label="Toggle Navigation Sidebar"
          title="Toggle Navigation"
        >
          <i className="bi bi-list"></i>
        </button>

        <div>
          <h1 className="h5 fw-bold mb-0 text-dark d-none d-sm-block">
            {getPageTitle()}
          </h1>
          <span className="text-muted small d-none d-md-inline-block">
            CareWell Memorial Hospital Admin System
          </span>
        </div>
      </div>

      <div className="topbar-right">
        {/* Live Date / Time Badge */}
        <div className="live-badge d-none d-md-flex">
          <span className="live-dot" />
          <span>{formattedDate}</span>
          <span className="text-muted">|</span>
          <span className="text-primary">{formattedTime}</span>
        </div>

        {/* Quick Action: Reset Demo Data */}
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1 rounded-pill px-3 shadow-none"
          onClick={onResetDemoData}
          title="Reset to initial fictional sample dataset"
        >
          <i className="bi bi-arrow-counterclockwise text-primary"></i>
          <span className="d-none d-sm-inline">Reset Demo</span>
        </button>

        {/* Quick Book Appointment Button */}
        {onQuickBook && (
          <button
            type="button"
            className="btn btn-primary btn-sm d-flex align-items-center gap-1 rounded-pill px-3 shadow-sm"
            onClick={onQuickBook}
          >
            <i className="bi bi-plus-circle-fill"></i>
            <span className="d-none d-sm-inline">New Appointment</span>
          </button>
        )}

        {/* Admin Profile */}
        <div className="admin-profile-pill">
          <div className="admin-avatar">
            <span>SJ</span>
          </div>
          <div className="d-none d-lg-block text-start" style={{ lineHeight: 1.2 }}>
            <div className="fw-bold small text-dark">Dr. Sarah Jenkins</div>
            <div className="text-muted" style={{ fontSize: "0.72rem" }}>Hospital Director</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
