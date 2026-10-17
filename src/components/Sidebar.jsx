import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isCollapsed, isMobileOpen, closeMobileSidebar }) => {
  const navItems = [
    { to: "/", label: "Dashboard", icon: "bi-grid-1x2-fill" },
    { to: "/patients", label: "Patients", icon: "bi-people-fill" },
    { to: "/doctors", label: "Doctors", icon: "bi-person-badge-fill" },
    { to: "/appointments", label: "Appointments", icon: "bi-calendar2-check-fill" },
    { to: "/departments", label: "Departments", icon: "bi-hospital-fill" }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      <div 
        className={`mobile-sidebar-backdrop ${isMobileOpen ? 'active' : ''}`}
        onClick={closeMobileSidebar}
      />

      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="brand-icon-box">
            <i className="bi bi-heart-pulse-fill"></i>
          </div>
          {!isCollapsed && (
            <div className="brand-text">
              <h2 className="brand-title">Medi<span>Pulse</span></h2>
              <span className="brand-subtitle">Hospital Center</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {!isCollapsed && <div className="nav-section-title">Main Menu</div>}
          
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
              onClick={closeMobileSidebar}
              title={isCollapsed ? item.label : undefined}
            >
              <span className="nav-icon">
                <i className={`bi ${item.icon}`}></i>
              </span>
              {!isCollapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Footer / Emergency Contact */}
        {!isCollapsed && (
          <div className="sidebar-footer">
            <div className="emergency-card">
              <div className="d-flex align-items-center justify-content-center gap-2 mb-1 text-danger fw-bold">
                <i className="bi bi-telephone-inbound-fill"></i>
                <span style={{ fontSize: "0.82rem" }}>24/7 Helpline</span>
              </div>
              <p className="mb-0 fw-bold text-dark" style={{ fontSize: "0.95rem" }}>
                +1 (800) 432-MED
              </p>
              <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                Emergency & Ambulance
              </small>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
