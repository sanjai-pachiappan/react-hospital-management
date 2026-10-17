import React from 'react';

const DoctorCard = ({ doctor, onEdit, onDelete, onBookAppointment }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'Available': return 'status-available';
      case 'In Surgery': return 'status-surgery';
      case 'On Leave': return 'status-onleave';
      default: return 'status-available';
    }
  };

  const getDepartmentColor = (dept) => {
    switch (dept) {
      case 'Cardiology': return { bg: '#ffe4e6', text: '#e11d48' };
      case 'Neurology': return { bg: '#ede9fe', text: '#7c3aed' };
      case 'Orthopedics': return { bg: '#e0f2fe', text: '#0284c7' };
      case 'Pediatrics': return { bg: '#fef3c7', text: '#d97706' };
      case 'Dermatology': return { bg: '#d1fae5', text: '#059669' };
      case 'General Medicine': return { bg: '#dbeafe', text: '#2563eb' };
      default: return { bg: '#f1f5f9', text: '#475569' };
    }
  };

  const deptStyle = getDepartmentColor(doctor.department);

  return (
    <div className="doctor-card">
      {/* Top Header */}
      <div className="d-flex align-items-start justify-content-between mb-3">
        <div className="d-flex align-items-center gap-3">
          <div className="doctor-avatar-box">
            <i className="bi bi-person-fill"></i>
          </div>
          <div>
            <h5 className="fw-bold mb-1 text-dark" style={{ fontSize: "1.1rem" }}>
              {doctor.name}
            </h5>
            <span 
              className="badge px-2.5 py-1 rounded-pill fw-semibold"
              style={{ backgroundColor: deptStyle.bg, color: deptStyle.text, fontSize: "0.75rem" }}
            >
              {doctor.department}
            </span>
          </div>
        </div>

        {/* Status */}
        <span className={`status-badge ${getStatusClass(doctor.status)}`}>
          <span 
            className="rounded-circle d-inline-block"
            style={{ 
              width: "6px", 
              height: "6px", 
              backgroundColor: doctor.status === 'Available' ? '#16a34a' : doctor.status === 'In Surgery' ? '#ca8a04' : '#64748b' 
            }}
          />
          {doctor.status || 'Available'}
        </span>
      </div>

      {/* Specialization & Bio */}
      <div className="mb-3">
        <div className="text-secondary fw-semibold small mb-1">
          {doctor.specialization}
        </div>
        <p className="text-muted small mb-0" style={{ lineHeight: 1.4, minHeight: "38px" }}>
          {doctor.bio || `Specialist in ${doctor.department} with clinical care excellence.`}
        </p>
      </div>

      {/* Key Info Badges */}
      <div className="row g-2 mb-3 bg-light rounded-3 p-2.5">
        <div className="col-6">
          <small className="text-muted d-block" style={{ fontSize: "0.72rem" }}>EXPERIENCE</small>
          <span className="fw-bold text-dark small d-flex align-items-center gap-1">
            <i className="bi bi-award text-primary"></i>
            {doctor.experience}
          </span>
        </div>
        <div className="col-6">
          <small className="text-muted d-block" style={{ fontSize: "0.72rem" }}>CLINIC ROOM</small>
          <span className="fw-bold text-dark small d-flex align-items-center gap-1">
            <i className="bi bi-geo-alt text-danger"></i>
            {doctor.room || 'Room 101'}
          </span>
        </div>
      </div>

      {/* Availability Schedule */}
      <div className="d-flex align-items-center gap-2 mb-3 small text-secondary">
        <i className="bi bi-clock-history text-primary"></i>
        <span className="text-truncate" title={doctor.availability}>
          {doctor.availability || 'Mon - Fri (09:00 AM - 02:00 PM)'}
        </span>
      </div>

      {/* Contacts */}
      <div className="mb-4 small text-muted">
        <div className="d-flex align-items-center gap-2 mb-1">
          <i className="bi bi-telephone text-muted"></i>
          <span>{doctor.phone}</span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-envelope text-muted"></i>
          <span className="text-truncate">{doctor.email}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-auto pt-3 border-top d-flex align-items-center justify-content-between gap-2">
        <button
          type="button"
          className="btn btn-primary btn-sm flex-grow-1 rounded-pill d-flex align-items-center justify-content-center gap-1.5 shadow-none"
          onClick={() => onBookAppointment(doctor)}
        >
          <i className="bi bi-calendar-plus"></i>
          <span>Book Visit</span>
        </button>

        <div className="d-flex gap-1">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm rounded-circle p-2"
            style={{ width: "34px", height: "34px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
            onClick={() => onEdit(doctor)}
            title="Edit Doctor Details"
          >
            <i className="bi bi-pencil"></i>
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm rounded-circle p-2"
            style={{ width: "34px", height: "34px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
            onClick={() => onDelete(doctor)}
            title="Delete Doctor"
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
