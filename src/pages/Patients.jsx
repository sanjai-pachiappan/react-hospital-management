import React, { useState, useMemo } from 'react';
import PatientTable from '../components/PatientTable';

const Patients = ({
  patients = [],
  onOpenAddModal,
  onOpenEditModal,
  onOpenDeleteModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState('ALL');
  const [bloodFilter, setBloodFilter] = useState('ALL');

  // Filtered patients
  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        patient.name.toLowerCase().includes(query) ||
        patient.id.toLowerCase().includes(query) ||
        patient.phone.toLowerCase().includes(query) ||
        (patient.address && patient.address.toLowerCase().includes(query)) ||
        (patient.bloodGroup && patient.bloodGroup.toLowerCase().includes(query));

      const matchesGender =
        genderFilter === 'ALL' || patient.gender.toLowerCase() === genderFilter.toLowerCase();

      const matchesBlood =
        bloodFilter === 'ALL' || patient.bloodGroup === bloodFilter;

      return matchesSearch && matchesGender && matchesBlood;
    });
  }, [patients, searchQuery, genderFilter, bloodFilter]);

  // Statistics
  const totalCount = patients.length;
  const maleCount = patients.filter(p => p.gender === 'Male').length;
  const femaleCount = patients.filter(p => p.gender === 'Female').length;

  const handleClearFilters = () => {
    setSearchQuery('');
    setGenderFilter('ALL');
    setBloodFilter('ALL');
  };

  const hasActiveFilters = searchQuery !== '' || genderFilter !== 'ALL' || bloodFilter !== 'ALL';

  return (
    <div className="page-container">
      {/* Top Header & Metrics */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1">Patients Registry</h2>
          <p className="text-muted small mb-0">
            Comprehensive patient demographic profiles, clinical history, and records management.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className="btn btn-primary rounded-pill px-4 shadow-sm d-flex align-items-center gap-2"
            onClick={onOpenAddModal}
          >
            <i className="bi bi-person-plus-fill"></i>
            <span>Register Patient</span>
          </button>
        </div>
      </div>

      {/* Quick Summary Pill Bar */}
      <div className="row g-3 mb-4">
        <div className="col-sm-4">
          <div className="card border-0 shadow-sm p-3 bg-white" style={{ borderRadius: "var(--radius-md)" }}>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <small className="text-muted text-uppercase fw-semibold" style={{ fontSize: "0.72rem" }}>Total Enrolled</small>
                <div className="h4 fw-bold text-dark mb-0">{totalCount} Patients</div>
              </div>
              <div 
                className="rounded-3 d-flex align-items-center justify-content-center text-primary"
                style={{ width: "42px", height: "42px", backgroundColor: "#e0f2fe", fontSize: "1.25rem" }}
              >
                <i className="bi bi-people-fill"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="card border-0 shadow-sm p-3 bg-white" style={{ borderRadius: "var(--radius-md)" }}>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <small className="text-muted text-uppercase fw-semibold" style={{ fontSize: "0.72rem" }}>Male Patients</small>
                <div className="h4 fw-bold text-primary mb-0">{maleCount} Patients</div>
              </div>
              <div 
                className="rounded-3 d-flex align-items-center justify-content-center text-primary"
                style={{ width: "42px", height: "42px", backgroundColor: "#e0f2fe", fontSize: "1.25rem" }}
              >
                <i className="bi bi-gender-male"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="card border-0 shadow-sm p-3 bg-white" style={{ borderRadius: "var(--radius-md)" }}>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <small className="text-muted text-uppercase fw-semibold" style={{ fontSize: "0.72rem" }}>Female Patients</small>
                <div className="h4 fw-bold text-danger mb-0">{femaleCount} Patients</div>
              </div>
              <div 
                className="rounded-3 d-flex align-items-center justify-content-center text-danger"
                style={{ width: "42px", height: "42px", backgroundColor: "#ffe4e6", fontSize: "1.25rem" }}
              >
                <i className="bi bi-gender-female"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Table Container */}
      <div className="table-card">
        <div className="table-card-header">
          {/* Search bar */}
          <div className="flex-grow-1" style={{ minWidth: "260px", maxWidth: "420px" }}>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 text-muted">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control bg-light border-start-0"
                placeholder="Search patient by name, ID, phone..."
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

          {/* Filter Dropdowns */}
          <div className="d-flex align-items-center flex-wrap gap-2">
            {/* Gender Filter */}
            <select
              className="form-select form-select-sm"
              style={{ width: "135px" }}
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
            >
              <option value="ALL">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            {/* Blood Group Filter */}
            <select
              className="form-select form-select-sm"
              style={{ width: "135px" }}
              value={bloodFilter}
              onChange={(e) => setBloodFilter(e.target.value)}
            >
              <option value="ALL">All Blood</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>

            {/* Clear Filter button if filters active */}
            {hasActiveFilters && (
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={handleClearFilters}
                title="Reset all filters"
              >
                <i className="bi bi-arrow-counterclockwise"></i> Clear
              </button>
            )}

            <span className="badge bg-light text-secondary border py-2 px-2.5">
              Showing {filteredPatients.length} of {totalCount}
            </span>
          </div>
        </div>

        {/* Patients Table */}
        <PatientTable
          patients={filteredPatients}
          onEdit={onOpenEditModal}
          onDelete={onOpenDeleteModal}
        />
      </div>
    </div>
  );
};

export default Patients;
