import React from 'react';

const AppointmentTable = ({
  appointments,
  onEdit,
  onDelete,
  onStatusChange,
  onViewPatient
}) => {
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

  if (!appointments || appointments.length === 0) {
    return (
      <div className="text-center py-5">
        <div 
          className="mx-auto mb-3 text-muted d-flex align-items-center justify-content-center rounded-circle bg-light"
          style={{ width: "70px", height: "70px", fontSize: "2rem" }}
        >
          <i className="bi bi-calendar-x"></i>
        </div>
        <h6 className="fw-bold text-dark">No Appointments Found</h6>
        <p className="text-muted small">
          No appointment records match the current filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table custom-table align-middle">
        <thead>
          <tr>
            <th>Appt ID</th>
            <th>Patient</th>
            <th>Doctor & Department</th>
            <th>Schedule</th>
            <th>Reason / Symptoms</th>
            <th>Status</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((apt) => (
            <tr key={apt.id}>
              {/* ID */}
              <td>
                <span className="badge bg-light text-primary border border-primary-subtle fw-bold px-2.5 py-1">
                  {apt.id}
                </span>
              </td>

              {/* Patient */}
              <td>
                <div 
                  className="fw-bold text-dark cursor-pointer"
                  onClick={() => onViewPatient && apt.patientId && onViewPatient(apt.patientId)}
                  role="button"
                  title="Click to view patient profile"
                >
                  {apt.patientName}
                </div>
                {apt.patientId && (
                  <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                    ID: {apt.patientId}
                  </small>
                )}
              </td>

              {/* Doctor & Dept */}
              <td>
                <div className="fw-semibold text-dark">{apt.doctorName}</div>
                <span className="badge bg-light text-secondary border px-2 py-0.5" style={{ fontSize: "0.72rem" }}>
                  {apt.department}
                </span>
              </td>

              {/* Schedule */}
              <td>
                <div className="d-flex align-items-center gap-1.5 text-dark fw-semibold small">
                  <i className="bi bi-calendar3 text-primary"></i>
                  <span>{apt.date}</span>
                </div>
                <small className="text-muted d-flex align-items-center gap-1 mt-0.5" style={{ fontSize: "0.75rem" }}>
                  <i className="bi bi-clock"></i>
                  {apt.time}
                </small>
              </td>

              {/* Reason */}
              <td style={{ maxWidth: "220px" }}>
                <span className="text-truncate d-inline-block small text-secondary w-100" title={apt.reason}>
                  {apt.reason}
                </span>
                {apt.notes && (
                  <small className="text-muted d-block text-truncate" style={{ fontSize: "0.72rem" }} title={apt.notes}>
                    Note: {apt.notes}
                  </small>
                )}
              </td>

              {/* Status & Quick Status Switch */}
              <td>
                <div className="d-flex align-items-center gap-2">
                  {getStatusBadge(apt.status)}

                  {/* Status Dropdown selector */}
                  {onStatusChange && (
                    <div className="dropdown">
                      <button
                        className="btn btn-sm btn-link text-muted p-0 shadow-none"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        title="Update Status"
                      >
                        <i className="bi bi-chevron-down small"></i>
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0 py-1" style={{ fontSize: "0.82rem" }}>
                        <li><h6 className="dropdown-header py-1 text-uppercase" style={{ fontSize: "0.68rem" }}>Change Status</h6></li>
                        <li><button className="dropdown-item py-1 text-warning" onClick={() => onStatusChange(apt, 'Pending')}>Pending</button></li>
                        <li><button className="dropdown-item py-1 text-primary" onClick={() => onStatusChange(apt, 'Confirmed')}>Confirmed</button></li>
                        <li><button className="dropdown-item py-1 text-success" onClick={() => onStatusChange(apt, 'Completed')}>Completed</button></li>
                        <li><button className="dropdown-item py-1 text-danger" onClick={() => onStatusChange(apt, 'Cancelled')}>Cancelled</button></li>
                      </ul>
                    </div>
                  )}
                </div>
              </td>

              {/* Action Buttons */}
              <td className="text-end">
                <div className="d-flex align-items-center justify-content-end gap-1.5">
                  <button
                    type="button"
                    className="btn btn-sm btn-light border text-secondary"
                    onClick={() => onEdit(apt)}
                    title="Edit Appointment"
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-light border text-danger"
                    onClick={() => onDelete(apt)}
                    title="Delete Appointment"
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
