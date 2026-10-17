import React from 'react';
import { useNavigate } from 'react-router-dom';

const PatientTable = ({ patients, onEdit, onDelete }) => {
  const navigate = useNavigate();

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

  if (!patients || patients.length === 0) {
    return (
      <div className="text-center py-5">
        <div 
          className="mx-auto mb-3 text-muted d-flex align-items-center justify-content-center rounded-circle bg-light"
          style={{ width: "70px", height: "70px", fontSize: "2rem" }}
        >
          <i className="bi bi-people"></i>
        </div>
        <h6 className="fw-bold text-dark">No Patients Found</h6>
        <p className="text-muted small">
          No patient records matched your filter criteria or search query.
        </p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table custom-table align-middle">
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Patient Name</th>
            <th>Age / Gender</th>
            <th>Blood Group</th>
            <th>Phone</th>
            <th>Address</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              {/* Patient ID */}
              <td>
                <span className="badge bg-light text-primary border border-primary-subtle fw-bold px-2.5 py-1">
                  {patient.id}
                </span>
              </td>

              {/* Name + Avatar */}
              <td>
                <div className="d-flex align-items-center gap-2.5">
                  <div className="patient-avatar-sm">
                    {getInitials(patient.name)}
                  </div>
                  <div>
                    <div 
                      className="fw-bold text-dark text-decoration-none cursor-pointer hover-primary"
                      onClick={() => navigate(`/patients/${patient.id}`)}
                      role="button"
                    >
                      {patient.name}
                    </div>
                    <small className="text-muted d-block" style={{ fontSize: "0.75rem" }}>
                      Reg: {patient.registeredDate || 'Recent'}
                    </small>
                  </div>
                </div>
              </td>

              {/* Age / Gender */}
              <td>
                <div className="fw-semibold text-dark">{patient.age} Yrs</div>
                <small className="text-muted">{patient.gender}</small>
              </td>

              {/* Blood Group */}
              <td>
                <span className="blood-badge">
                  {patient.bloodGroup}
                </span>
              </td>

              {/* Phone */}
              <td>
                <div className="d-flex align-items-center gap-1.5 text-secondary">
                  <i className="bi bi-telephone text-primary small"></i>
                  <span className="small">{patient.phone}</span>
                </div>
              </td>

              {/* Address */}
              <td style={{ maxWidth: "220px" }}>
                <span 
                  className="text-truncate d-inline-block small text-muted w-100" 
                  title={patient.address}
                >
                  {patient.address}
                </span>
              </td>

              {/* Action Buttons */}
              <td className="text-end">
                <div className="d-flex align-items-center justify-content-end gap-1.5">
                  {/* View Details */}
                  <button
                    type="button"
                    className="btn btn-sm btn-light border text-primary"
                    onClick={() => navigate(`/patients/${patient.id}`)}
                    title="View Patient Full Profile & Appointments"
                  >
                    <i className="bi bi-eye-fill"></i>
                  </button>

                  {/* Edit */}
                  <button
                    type="button"
                    className="btn btn-sm btn-light border text-secondary"
                    onClick={() => onEdit(patient)}
                    title="Edit Patient Information"
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    className="btn btn-sm btn-light border text-danger"
                    onClick={() => onDelete(patient)}
                    title="Delete Patient Record"
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

export default PatientTable;
