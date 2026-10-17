import React, { useState, useMemo } from 'react';
import DoctorCard from '../components/DoctorCard';

const DEPARTMENTS_LIST = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Dermatology",
  "General Medicine"
];

const Doctors = ({
  doctors = [],
  onOpenAddModal,
  onOpenEditModal,
  onOpenDeleteModal,
  onBookWithDoctor
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        doc.name.toLowerCase().includes(query) ||
        doc.specialization.toLowerCase().includes(query) ||
        doc.department.toLowerCase().includes(query) ||
        (doc.room && doc.room.toLowerCase().includes(query));

      const matchesDept = deptFilter === 'ALL' || doc.department === deptFilter;
      const matchesStatus = statusFilter === 'ALL' || doc.status === statusFilter;

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [doctors, searchQuery, deptFilter, statusFilter]);

  const totalDoctors = doctors.length;
  const availableDoctors = doctors.filter(d => d.status === 'Available').length;
  const inSurgeryDoctors = doctors.filter(d => d.status === 'In Surgery').length;

  const handleClearFilters = () => {
    setSearchQuery('');
    setDeptFilter('ALL');
    setStatusFilter('ALL');
  };

  const hasActiveFilters = searchQuery !== '' || deptFilter !== 'ALL' || statusFilter !== 'ALL';

  return (
    <div className="page-container">
      {/* Top Header & Add Doctor Button */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1">Medical Specialist Roster</h2>
          <p className="text-muted small mb-0">
            Consultants, surgeons, and physicians across specialized clinical departments.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary rounded-pill px-4 shadow-sm d-flex align-items-center gap-2"
          onClick={onOpenAddModal}
        >
          <i className="bi bi-person-plus-fill"></i>
          <span>Add Specialist</span>
        </button>
      </div>

      {/* Roster Quick Metrics */}
      <div className="row g-3 mb-4">
        <div className="col-sm-4">
          <div className="card border-0 shadow-sm p-3 bg-white" style={{ borderRadius: "var(--radius-md)" }}>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <small className="text-muted text-uppercase fw-semibold" style={{ fontSize: "0.72rem" }}>Hospital Specialists</small>
                <div className="h4 fw-bold text-dark mb-0">{totalDoctors} Doctors</div>
              </div>
              <div 
                className="rounded-3 d-flex align-items-center justify-content-center text-primary"
                style={{ width: "42px", height: "42px", backgroundColor: "#e0f2fe", fontSize: "1.25rem" }}
              >
                <i className="bi bi-person-badge"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="card border-0 shadow-sm p-3 bg-white" style={{ borderRadius: "var(--radius-md)" }}>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <small className="text-muted text-uppercase fw-semibold" style={{ fontSize: "0.72rem" }}>Available for OPD</small>
                <div className="h4 fw-bold text-success mb-0">{availableDoctors} On Duty</div>
              </div>
              <div 
                className="rounded-3 d-flex align-items-center justify-content-center text-success"
                style={{ width: "42px", height: "42px", backgroundColor: "#d1fae5", fontSize: "1.25rem" }}
              >
                <i className="bi bi-check-circle-fill"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="card border-0 shadow-sm p-3 bg-white" style={{ borderRadius: "var(--radius-md)" }}>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <small className="text-muted text-uppercase fw-semibold" style={{ fontSize: "0.72rem" }}>Operating Theater</small>
                <div className="h4 fw-bold text-warning-emphasis mb-0">{inSurgeryDoctors} In Surgery</div>
              </div>
              <div 
                className="rounded-3 d-flex align-items-center justify-content-center text-warning"
                style={{ width: "42px", height: "42px", backgroundColor: "#fef3c7", fontSize: "1.25rem" }}
              >
                <i className="bi bi-heart-pulse"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: "var(--radius-lg)" }}>
        <div className="card-body p-3.5 d-flex flex-wrap align-items-center justify-content-between gap-3">
          {/* Search */}
          <div className="flex-grow-1" style={{ minWidth: "260px", maxWidth: "420px" }}>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 text-muted">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control bg-light border-start-0"
                placeholder="Search doctor by name or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  className="btn btn-light border border-start-0 text-muted"
                  type="button" 
                  onClick={() => setSearchQuery('')}
                >
                  <i className="bi bi-x"></i>
                </button>
              )}
            </div>
          </div>

          {/* Department & Status Filters */}
          <div className="d-flex align-items-center flex-wrap gap-2">
            <select
              className="form-select form-select-sm"
              style={{ width: "170px" }}
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
            >
              <option value="ALL">All Departments</option>
              {DEPARTMENTS_LIST.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <select
              className="form-select form-select-sm"
              style={{ width: "150px" }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Availability</option>
              <option value="Available">Available</option>
              <option value="In Surgery">In Surgery</option>
              <option value="On Leave">On Leave</option>
            </select>

            {hasActiveFilters && (
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={handleClearFilters}
              >
                <i className="bi bi-arrow-counterclockwise"></i> Clear
              </button>
            )}

            <span className="badge bg-light text-secondary border py-2 px-2.5">
              Showing {filteredDoctors.length} of {totalDoctors}
            </span>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      {filteredDoctors.length === 0 ? (
        <div className="card border-0 shadow-sm p-5 text-center" style={{ borderRadius: "var(--radius-lg)" }}>
          <div 
            className="mx-auto mb-3 text-muted d-flex align-items-center justify-content-center rounded-circle bg-light"
            style={{ width: "70px", height: "70px", fontSize: "2rem" }}
          >
            <i className="bi bi-person-x"></i>
          </div>
          <h5 className="fw-bold text-dark">No Doctors Found</h5>
          <p className="text-muted small">
            No doctors match your search or filter settings. Try adjusting filters or add a new doctor.
          </p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredDoctors.map((doctor) => (
            <div className="col-md-6 col-xl-4" key={doctor.id}>
              <DoctorCard
                doctor={doctor}
                onEdit={onOpenEditModal}
                onDelete={onOpenDeleteModal}
                onBookAppointment={onBookWithDoctor}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Doctors;
