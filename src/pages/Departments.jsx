import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Departments = ({ departments = [], doctors = [], onBookInDepartment }) => {
  const navigate = useNavigate();
  const [selectedDeptForDoctors, setSelectedDeptForDoctors] = useState(null);

  // Doctors in the currently selected department modal
  const departmentDoctors = selectedDeptForDoctors
    ? doctors.filter(d => d.department === selectedDeptForDoctors.name)
    : [];

  return (
    <div className="page-container">
      {/* Top Header */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1">Clinical Departments & Centers of Excellence</h2>
          <p className="text-muted small mb-0">
            Specialized healthcare divisions equipped with modern surgical facilities and expert clinical faculty.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-outline-primary rounded-pill px-4 shadow-none d-flex align-items-center gap-2"
          onClick={() => navigate('/doctors')}
        >
          <i className="bi bi-person-lines-fill"></i>
          <span>View All Doctors ({doctors.length})</span>
        </button>
      </div>

      {/* Department Cards Grid */}
      <div className="row g-4">
        {departments.map((dept) => {
          const deptDoctors = doctors.filter(d => d.department === dept.name);
          const doctorCount = deptDoctors.length;

          return (
            <div className="col-md-6 col-xl-4" key={dept.id}>
              <div className="dept-card">
                {/* Department Icon Box & Code */}
                <div className="d-flex align-items-start justify-content-between mb-2">
                  <div 
                    className="dept-icon-box"
                    style={{ backgroundColor: dept.bgColor, color: dept.color }}
                  >
                    <i className={`bi ${dept.icon}`}></i>
                  </div>
                  <span className="badge bg-light text-secondary border px-2.5 py-1.5 fw-bold" style={{ fontSize: "0.75rem" }}>
                    {dept.code}
                  </span>
                </div>

                {/* Department Name & Description */}
                <h4 className="fw-bold text-dark mb-2">{dept.name}</h4>
                <p className="text-muted small mb-4" style={{ minHeight: "48px", lineHeight: 1.5 }}>
                  {dept.description}
                </p>

                {/* Department Details List */}
                <div className="bg-light rounded-3 p-3 mb-4 border">
                  {/* Department Head */}
                  <div className="mb-2">
                    <small className="text-muted text-uppercase fw-bold d-block" style={{ fontSize: "0.7rem" }}>
                      HEAD OF DEPARTMENT
                    </small>
                    <div className="fw-bold text-dark small d-flex align-items-center gap-1.5 mt-0.5">
                      <i className="bi bi-person-badge-fill text-primary"></i>
                      <span>{dept.head}</span>
                    </div>
                    {dept.headTitle && (
                      <small className="text-muted d-block" style={{ fontSize: "0.72rem" }}>
                        {dept.headTitle}
                      </small>
                    )}
                  </div>

                  {/* Location & Contact */}
                  <div className="row g-2 pt-2 border-top">
                    <div className="col-6">
                      <small className="text-muted d-block" style={{ fontSize: "0.7rem" }}>LOCATION</small>
                      <span className="small fw-semibold text-secondary d-flex align-items-center gap-1">
                        <i className="bi bi-geo-alt text-danger"></i>
                        {dept.room}
                      </span>
                    </div>
                    <div className="col-6">
                      <small className="text-muted d-block" style={{ fontSize: "0.7rem" }}>DIRECT LINE</small>
                      <span className="small fw-semibold text-secondary d-flex align-items-center gap-1">
                        <i className="bi bi-telephone text-success"></i>
                        {dept.phone}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="mt-auto pt-3 border-top d-flex align-items-center justify-content-between gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm rounded-pill px-3 shadow-none flex-grow-1"
                    onClick={() => setSelectedDeptForDoctors(dept)}
                  >
                    <i className="bi bi-people me-1.5"></i>
                    {doctorCount} Specialist{doctorCount === 1 ? '' : 's'}
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary btn-sm rounded-pill px-3 shadow-none"
                    onClick={() => onBookInDepartment && onBookInDepartment(dept.name)}
                    title="Schedule consultation in this department"
                  >
                    <i className="bi bi-calendar-plus me-1"></i>
                    Book
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: View Department Doctors */}
      {selectedDeptForDoctors && (
        <div className="custom-modal-backdrop" onClick={() => setSelectedDeptForDoctors(null)}>
          <div 
            className="custom-modal-dialog" 
            style={{ maxWidth: '640px' }} 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="custom-modal-header">
              <div className="d-flex align-items-center gap-2">
                <div 
                  className="rounded-3 d-flex align-items-center justify-content-center"
                  style={{ 
                    width: "40px", 
                    height: "40px", 
                    backgroundColor: selectedDeptForDoctors.bgColor, 
                    color: selectedDeptForDoctors.color,
                    fontSize: "1.3rem"
                  }}
                >
                  <i className={`bi ${selectedDeptForDoctors.icon}`}></i>
                </div>
                <div>
                  <h5 className="modal-title fw-bold mb-0 text-dark">
                    {selectedDeptForDoctors.name} Specialists
                  </h5>
                  <small className="text-muted">
                    {departmentDoctors.length} doctors currently affiliated
                  </small>
                </div>
              </div>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setSelectedDeptForDoctors(null)}
              ></button>
            </div>

            <div className="custom-modal-body">
              {departmentDoctors.length === 0 ? (
                <div className="text-center py-4 text-muted">
                  <i className="bi bi-person-x display-6 mb-2"></i>
                  <p className="mb-0">No doctors currently assigned to this department.</p>
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {departmentDoctors.map((doc) => (
                    <div key={doc.id} className="p-3 rounded-3 border bg-light d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-3">
                        <div 
                          className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                          style={{ width: "45px", height: "45px", minWidth: "45px" }}
                        >
                          <i className="bi bi-person-fill fs-5"></i>
                        </div>
                        <div>
                          <h6 className="fw-bold mb-0 text-dark">{doc.name}</h6>
                          <div className="small text-secondary">{doc.specialization}</div>
                          <small className="text-muted">
                            Exp: {doc.experience} | Room: {doc.room}
                          </small>
                        </div>
                      </div>

                      <span className="badge bg-white text-success border px-2.5 py-1">
                        {doc.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="custom-modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary rounded-pill px-4"
                onClick={() => setSelectedDeptForDoctors(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Departments;
