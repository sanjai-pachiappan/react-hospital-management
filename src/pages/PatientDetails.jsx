import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PatientDetails = ({
  patients = [],
  appointments = [],
  onOpenEditPatient,
  onBookForPatient,
  onEditAppointment,
  onDeleteAppointment
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const patient = patients.find(p => p.id === id);

  // Filter appointments for this patient
  const patientAppointments = appointments.filter(a => a.patientId === id || (patient && a.patientName === patient.name));

  // Helper to extract initials
  const getInitials = (name) => {
    if (!name) return 'PT';
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="status-badge status-pending"><i className="bi bi-hourglass-split"></i> Pending</span>;
      case 'Confirmed':
        return <span className="status-badge status-confirmed"><i className="bi bi-calendar-check-fill"></i> Confirmed</span>;
      case 'Completed':
        return <span className="status-badge status-completed"><i className="bi bi-check-circle-fill"></i> Completed</span>;
      case 'Cancelled':
        return <span className="status-badge status-cancelled"><i className="bi bi-x-circle-fill"></i> Cancelled</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  if (!patient) {
    return (
      <div className="page-container">
        <div className="card border-0 shadow-sm p-5 text-center my-4" style={{ borderRadius: "var(--radius-lg)" }}>
          <div 
            className="mx-auto mb-3 text-danger d-flex align-items-center justify-content-center rounded-circle"
            style={{ width: "70px", height: "70px", backgroundColor: "#fee2e2", fontSize: "2rem" }}
          >
            <i className="bi bi-person-x"></i>
          </div>
          <h4 className="fw-bold text-dark">Patient Record Not Found</h4>
          <p className="text-muted small mb-4">
            No patient with identification code "{id}" exists in the hospital registry.
          </p>
          <div>
            <button
              type="button"
              className="btn btn-primary rounded-pill px-4 shadow-sm"
              onClick={() => navigate('/patients')}
            >
              <i className="bi bi-arrow-left me-1.5"></i>
              Return to Patients Directory
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Navigation Breadcrumb / Back button */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm rounded-pill px-3.5 d-flex align-items-center gap-2 shadow-none"
          onClick={() => navigate('/patients')}
        >
          <i className="bi bi-arrow-left"></i>
          <span>Back to Patients List</span>
        </button>

        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className="btn btn-outline-primary btn-sm rounded-pill px-3 shadow-none d-flex align-items-center gap-1.5"
            onClick={() => onOpenEditPatient(patient)}
          >
            <i className="bi bi-pencil"></i>
            <span>Edit Profile</span>
          </button>

          <button
            type="button"
            className="btn btn-primary btn-sm rounded-pill px-3.5 shadow-sm d-flex align-items-center gap-1.5"
            onClick={() => onBookForPatient(patient)}
          >
            <i className="bi bi-calendar2-plus"></i>
            <span>Book Appointment</span>
          </button>
        </div>
      </div>

      {/* Patient Profile Card */}
      <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: "var(--radius-lg)" }}>
        <div className="card-body p-4">
          <div className="row g-4 align-items-center">
            {/* Avatar & Key Demographics */}
            <div className="col-lg-7">
              <div className="d-flex align-items-start gap-3.5">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm"
                  style={{
                    width: "78px",
                    height: "78px",
                    minWidth: "78px",
                    backgroundColor: "#e0f2fe",
                    color: "#0284c7",
                    fontSize: "2rem"
                  }}
                >
                  {getInitials(patient.name)}
                </div>

                <div>
                  <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
                    <h3 className="fw-bold text-dark mb-0">{patient.name}</h3>
                    <span className="badge bg-light text-primary border border-primary-subtle fw-bold px-2.5 py-1">
                      {patient.id}
                    </span>
                    <span className="blood-badge">{patient.bloodGroup}</span>
                  </div>

                  <p className="text-secondary small mb-2">
                    <span className="fw-semibold text-dark">{patient.age} years old</span> &bull; {patient.gender} &bull; Registered on {patient.registeredDate || 'N/A'}
                  </p>

                  <div className="d-flex flex-wrap gap-3 small text-muted">
                    <div className="d-flex align-items-center gap-1">
                      <i className="bi bi-telephone text-primary"></i>
                      <span>{patient.phone}</span>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <i className="bi bi-geo-alt text-danger"></i>
                      <span>{patient.address}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Clinical Badges */}
            <div className="col-lg-5">
              <div className="bg-light rounded-3 p-3 border">
                <div className="row g-3">
                  <div className="col-6">
                    <small className="text-muted d-block" style={{ fontSize: "0.72rem" }}>EMERGENCY CONTACT</small>
                    <span className="small fw-semibold text-dark d-block text-truncate" title={patient.emergencyContact}>
                      {patient.emergencyContact || 'Not Specified'}
                    </span>
                  </div>
                  <div className="col-6">
                    <small className="text-muted d-block" style={{ fontSize: "0.72rem" }}>PRIMARY DOCTOR</small>
                    <span className="small fw-semibold text-primary d-block text-truncate" title={patient.assignedDoctor}>
                      {patient.assignedDoctor || 'General OPD'}
                    </span>
                  </div>
                  <div className="col-12 pt-2 border-top">
                    <small className="text-muted d-block" style={{ fontSize: "0.72rem" }}>MEDICAL NOTES / ALLERGIES</small>
                    <span className="small text-danger fw-medium d-block">
                      <i className="bi bi-heart-pulse me-1"></i>
                      {patient.medicalHistory || 'No recorded chronic allergies or conditions.'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment History Section */}
      <div className="table-card">
        <div className="table-card-header">
          <div>
            <h5 className="fw-bold text-dark mb-1">
              <i className="bi bi-clock-history text-primary me-2"></i>
              Clinical Appointment History
            </h5>
            <small className="text-muted">
              Past consultations, scheduled follow-ups, and diagnostic review visits ({patientAppointments.length} total)
            </small>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-sm rounded-pill px-3 shadow-sm d-flex align-items-center gap-1.5"
            onClick={() => onBookForPatient(patient)}
          >
            <i className="bi bi-plus-circle"></i>
            <span>Schedule New Visit</span>
          </button>
        </div>

        {patientAppointments.length === 0 ? (
          <div className="text-center py-5">
            <div 
              className="mx-auto mb-3 text-muted d-flex align-items-center justify-content-center rounded-circle bg-light"
              style={{ width: "64px", height: "64px", fontSize: "1.75rem" }}
            >
              <i className="bi bi-calendar-check"></i>
            </div>
            <h6 className="fw-bold text-dark">No Consultations Recorded</h6>
            <p className="text-muted small mb-3">
              This patient currently has no scheduled or previous clinical appointments.
            </p>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm rounded-pill px-3.5 shadow-none"
              onClick={() => onBookForPatient(patient)}
            >
              Book First Appointment
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table custom-table align-middle">
              <thead>
                <tr>
                  <th>Appt ID</th>
                  <th>Consulting Specialist</th>
                  <th>Department</th>
                  <th>Date & Time</th>
                  <th>Chief Reason / Symptoms</th>
                  <th>Status</th>
                  {onEditAppointment && <th className="text-end">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {patientAppointments.map((apt) => (
                  <tr key={apt.id}>
                    <td>
                      <span className="badge bg-light text-primary border border-primary-subtle fw-bold px-2.5 py-1">
                        {apt.id}
                      </span>
                    </td>
                    <td>
                      <div className="fw-bold text-dark">{apt.doctorName}</div>
                    </td>
                    <td>
                      <span className="badge bg-light text-secondary border px-2 py-0.5">
                        {apt.department}
                      </span>
                    </td>
                    <td>
                      <div className="fw-semibold text-dark small">{apt.date}</div>
                      <small className="text-muted">{apt.time}</small>
                    </td>
                    <td style={{ maxWidth: "260px" }}>
                      <span className="text-secondary small d-inline-block text-truncate w-100" title={apt.reason}>
                        {apt.reason}
                      </span>
                      {apt.notes && (
                        <small className="text-muted d-block text-truncate" title={apt.notes} style={{ fontSize: "0.72rem" }}>
                          Note: {apt.notes}
                        </small>
                      )}
                    </td>
                    <td>{getStatusBadge(apt.status)}</td>
                    {onEditAppointment && (
                      <td className="text-end">
                        <div className="d-flex align-items-center justify-content-end gap-1.5">
                          <button
                            type="button"
                            className="btn btn-sm btn-light border text-secondary"
                            onClick={() => onEditAppointment(apt)}
                            title="Edit Appointment"
                          >
                            <i className="bi bi-pencil-fill"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-light border text-danger"
                            onClick={() => onDeleteAppointment(apt)}
                            title="Delete Appointment"
                          >
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDetails;
