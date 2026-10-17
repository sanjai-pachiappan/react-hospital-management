import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AppointmentTable from '../components/AppointmentTable';

const Appointments = ({
  appointments = [],
  departments = [],
  onOpenBookModal,
  onOpenEditModal,
  onOpenDeleteModal,
  onStatusChange
}) => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [dateFilter, setDateFilter] = useState('ALL'); // ALL, TODAY, UPCOMING, PAST

  const todayStr = new Date().toISOString().split('T')[0];

  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        apt.id.toLowerCase().includes(query) ||
        apt.patientName.toLowerCase().includes(query) ||
        apt.doctorName.toLowerCase().includes(query) ||
        (apt.reason && apt.reason.toLowerCase().includes(query)) ||
        (apt.department && apt.department.toLowerCase().includes(query));

      const matchesStatus = statusFilter === 'ALL' || apt.status === statusFilter;
      const matchesDept = deptFilter === 'ALL' || apt.department === deptFilter;

      let matchesDate = true;
      if (dateFilter === 'TODAY') {
        matchesDate = apt.date === todayStr;
      } else if (dateFilter === 'UPCOMING') {
        matchesDate = apt.date >= todayStr;
      } else if (dateFilter === 'PAST') {
        matchesDate = apt.date < todayStr;
      }

      return matchesSearch && matchesStatus && matchesDept && matchesDate;
    });
  }, [appointments, searchQuery, statusFilter, deptFilter, dateFilter, todayStr]);

  // Statistics
  const totalCount = appointments.length;
  const pendingCount = appointments.filter(a => a.status === 'Pending').length;
  const confirmedCount = appointments.filter(a => a.status === 'Confirmed').length;
  const completedCount = appointments.filter(a => a.status === 'Completed').length;

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('ALL');
    setDeptFilter('ALL');
    setDateFilter('ALL');
  };

  const hasActiveFilters = searchQuery !== '' || statusFilter !== 'ALL' || deptFilter !== 'ALL' || dateFilter !== 'ALL';

  return (
    <div className="page-container">
      {/* Top Header */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1">Appointment Schedule & Queue</h2>
          <p className="text-muted small mb-0">
            Real-time outpatient consultation slots, clinical triage, and status tracking.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary rounded-pill px-4 shadow-sm d-flex align-items-center gap-2"
          onClick={onOpenBookModal}
        >
          <i className="bi bi-calendar2-plus-fill"></i>
          <span>Schedule Appointment</span>
        </button>
      </div>

      {/* Metric Cards Row */}
      <div className="row g-3 mb-4">
        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm p-3 bg-white" style={{ borderRadius: "var(--radius-md)" }}>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <small className="text-muted text-uppercase fw-semibold" style={{ fontSize: "0.72rem" }}>All Consultations</small>
                <div className="h4 fw-bold text-dark mb-0">{totalCount}</div>
              </div>
              <div 
                className="rounded-3 d-flex align-items-center justify-content-center text-primary"
                style={{ width: "42px", height: "42px", backgroundColor: "#e0f2fe", fontSize: "1.25rem" }}
              >
                <i className="bi bi-calendar2-week"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm p-3 bg-white" style={{ borderRadius: "var(--radius-md)" }}>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <small className="text-muted text-uppercase fw-semibold" style={{ fontSize: "0.72rem" }}>Confirmed</small>
                <div className="h4 fw-bold text-primary mb-0">{confirmedCount}</div>
              </div>
              <div 
                className="rounded-3 d-flex align-items-center justify-content-center text-primary"
                style={{ width: "42px", height: "42px", backgroundColor: "#e0f2fe", fontSize: "1.25rem" }}
              >
                <i className="bi bi-check-circle"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm p-3 bg-white" style={{ borderRadius: "var(--radius-md)" }}>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <small className="text-muted text-uppercase fw-semibold" style={{ fontSize: "0.72rem" }}>Pending Approval</small>
                <div className="h4 fw-bold text-warning-emphasis mb-0">{pendingCount}</div>
              </div>
              <div 
                className="rounded-3 d-flex align-items-center justify-content-center text-warning"
                style={{ width: "42px", height: "42px", backgroundColor: "#fef3c7", fontSize: "1.25rem" }}
              >
                <i className="bi bi-hourglass-split"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm p-3 bg-white" style={{ borderRadius: "var(--radius-md)" }}>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <small className="text-muted text-uppercase fw-semibold" style={{ fontSize: "0.72rem" }}>Completed</small>
                <div className="h4 fw-bold text-success mb-0">{completedCount}</div>
              </div>
              <div 
                className="rounded-3 d-flex align-items-center justify-content-center text-success"
                style={{ width: "42px", height: "42px", backgroundColor: "#d1fae5", fontSize: "1.25rem" }}
              >
                <i className="bi bi-check2-all"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Date Filter Tabs */}
      <div className="mb-3 d-flex flex-wrap gap-2">
        <button
          type="button"
          className={`btn btn-sm rounded-pill px-3 ${dateFilter === 'ALL' ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => setDateFilter('ALL')}
        >
          All Dates
        </button>
        <button
          type="button"
          className={`btn btn-sm rounded-pill px-3 ${dateFilter === 'TODAY' ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => setDateFilter('TODAY')}
        >
          <i className="bi bi-calendar-event me-1"></i> Today
        </button>
        <button
          type="button"
          className={`btn btn-sm rounded-pill px-3 ${dateFilter === 'UPCOMING' ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => setDateFilter('UPCOMING')}
        >
          <i className="bi bi-calendar-check me-1"></i> Upcoming
        </button>
        <button
          type="button"
          className={`btn btn-sm rounded-pill px-3 ${dateFilter === 'PAST' ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => setDateFilter('PAST')}
        >
          <i className="bi bi-clock-history me-1"></i> Past
        </button>
      </div>

      {/* Table Card */}
      <div className="table-card">
        <div className="table-card-header">
          {/* Search */}
          <div className="flex-grow-1" style={{ minWidth: "260px", maxWidth: "420px" }}>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 text-muted">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control bg-light border-start-0"
                placeholder="Search patient, doctor, reason, ID..."
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

          {/* Status & Department Filters */}
          <div className="d-flex align-items-center flex-wrap gap-2">
            <select
              className="form-select form-select-sm"
              style={{ width: "150px" }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <select
              className="form-select form-select-sm"
              style={{ width: "170px" }}
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
            >
              <option value="ALL">All Departments</option>
              {departments.map((d) => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
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
              Showing {filteredAppointments.length} of {totalCount}
            </span>
          </div>
        </div>

        <AppointmentTable
          appointments={filteredAppointments}
          onEdit={onOpenEditModal}
          onDelete={onOpenDeleteModal}
          onStatusChange={onStatusChange}
          onViewPatient={(id) => navigate(`/patients/${id}`)}
        />
      </div>
    </div>
  );
};

export default Appointments;
