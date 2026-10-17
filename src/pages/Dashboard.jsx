import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import AppointmentTable from '../components/AppointmentTable';

const Dashboard = ({
  patients = [],
  doctors = [],
  appointments = [],
  departments = [],
  onOpenPatientModal,
  onOpenDoctorModal,
  onOpenAppointmentModal,
  onEditAppointment,
  onDeleteAppointment,
  onStatusChange
}) => {
  const navigate = useNavigate();

  // Statistics calculation
  const totalPatients = patients.length;
  const totalDoctors = doctors.length;
  const totalAppointments = appointments.length;
  const totalDepartments = departments.length;

  const pendingAppointments = appointments.filter(a => a.status === 'Pending').length;
  const confirmedAppointments = appointments.filter(a => a.status === 'Confirmed').length;
  const completedAppointments = appointments.filter(a => a.status === 'Completed').length;
  const cancelledAppointments = appointments.filter(a => a.status === 'Cancelled').length;

  // Recent 5 appointments sorted by date descending
  const recentAppointments = [...appointments]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Status breakdown percentages
  const pendingPct = totalAppointments > 0 ? Math.round((pendingAppointments / totalAppointments) * 100) : 0;
  const confirmedPct = totalAppointments > 0 ? Math.round((confirmedAppointments / totalAppointments) * 100) : 0;
  const completedPct = totalAppointments > 0 ? Math.round((completedAppointments / totalAppointments) * 100) : 0;
  const cancelledPct = totalAppointments > 0 ? Math.round((cancelledAppointments / totalAppointments) * 100) : 0;

  return (
    <div className="page-container">
      {/* Welcome Banner */}
      <div 
        className="card border-0 mb-4 text-white overflow-hidden shadow-sm"
        style={{
          background: "linear-gradient(135deg, #0284c7 0%, #0369a1 60%, #075985 100%)",
          borderRadius: "var(--radius-lg)"
        }}
      >
        <div className="card-body p-4 p-md-4.5 position-relative">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span className="badge bg-white text-primary fw-bold mb-2.5 px-3 py-1.5 rounded-pill shadow-sm">
                <i className="bi bi-hospital me-1.5"></i> Hospital Operations Live
              </span>
              <h2 className="fw-800 display-6 mb-2 text-white">
                Welcome to MediPulse Healthcare
              </h2>
              <p className="text-light opacity-90 mb-3" style={{ maxWidth: "600px" }}>
                Monitor inpatient admissions, outpatient specialist clinics, surgical queues, 
                and department schedules from a centralized clinical dashboard.
              </p>
              
              <div className="d-flex flex-wrap gap-2.5">
                <button
                  type="button"
                  className="btn btn-light text-primary fw-bold rounded-pill px-3.5 py-2 shadow-sm d-flex align-items-center gap-2"
                  onClick={onOpenAppointmentModal}
                >
                  <i className="bi bi-calendar-plus-fill"></i>
                  <span>Schedule Appointment</span>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light rounded-pill px-3.5 py-2 d-flex align-items-center gap-2"
                  onClick={onOpenPatientModal}
                >
                  <i className="bi bi-person-plus-fill"></i>
                  <span>Register Patient</span>
                </button>
              </div>
            </div>

            <div className="col-lg-4 d-none d-lg-flex justify-content-end">
              <div 
                className="bg-white bg-opacity-10 border border-white border-opacity-25 rounded-4 p-3.5 text-center"
                style={{ width: "240px" }}
              >
                <i className="bi bi-shield-check text-light display-5 mb-2 d-block"></i>
                <div className="text-light small text-uppercase fw-semibold tracking-wider">Hospital Center</div>
                <div className="h4 fw-bold text-white mb-0">Active & Ready</div>
                <small className="text-light opacity-75">Emergency 24/7</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Main Stat Cards */}
      <div className="row g-3 mb-4">
        <div className="col-sm-6 col-xl-3">
          <StatCard
            title="Total Patients"
            value={totalPatients}
            icon="bi-people-fill"
            iconBg="#e0f2fe"
            iconColor="#0284c7"
            trend="+12%"
            trendPositive={true}
            subtitle="from last month"
            onClick={() => navigate('/patients')}
          />
        </div>

        <div className="col-sm-6 col-xl-3">
          <StatCard
            title="Specialist Doctors"
            value={totalDoctors}
            icon="bi-person-badge-fill"
            iconBg="#ede9fe"
            iconColor="#7c3aed"
            trend="+2"
            trendPositive={true}
            subtitle="on active duty"
            onClick={() => navigate('/doctors')}
          />
        </div>

        <div className="col-sm-6 col-xl-3">
          <StatCard
            title="Appointments"
            value={totalAppointments}
            icon="bi-calendar-check-fill"
            iconBg="#dcfce7"
            iconColor="#15803d"
            trend="+8%"
            trendPositive={true}
            subtitle="total booked"
            onClick={() => navigate('/appointments')}
          />
        </div>

        <div className="col-sm-6 col-xl-3">
          <StatCard
            title="Departments"
            value={totalDepartments}
            icon="bi-hospital-fill"
            iconBg="#fef3c7"
            iconColor="#b45309"
            subtitle="specialty wings"
            onClick={() => navigate('/departments')}
          />
        </div>
      </div>

      {/* Appointment Status Metrics Bar & Department Summaries */}
      <div className="row g-4 mb-4">
        {/* Status Distribution */}
        <div className="col-lg-6">
          <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: "var(--radius-lg)" }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                  <h5 className="fw-bold text-dark mb-0">Appointment Status Metrics</h5>
                  <small className="text-muted">Live patient scheduling distribution</small>
                </div>
                <span className="badge bg-light text-primary border px-2.5 py-1">
                  {totalAppointments} Total
                </span>
              </div>

              {/* Progress Bar */}
              <div className="progress mb-4" style={{ height: "12px", borderRadius: "8px", overflow: "hidden" }}>
                <div 
                  className="progress-bar bg-primary" 
                  style={{ width: `${confirmedPct}%` }}
                  title={`Confirmed: ${confirmedAppointments} (${confirmedPct}%)`}
                />
                <div 
                  className="progress-bar bg-warning" 
                  style={{ width: `${pendingPct}%` }}
                  title={`Pending: ${pendingAppointments} (${pendingPct}%)`}
                />
                <div 
                  className="progress-bar bg-success" 
                  style={{ width: `${completedPct}%` }}
                  title={`Completed: ${completedAppointments} (${completedPct}%)`}
                />
                <div 
                  className="progress-bar bg-danger" 
                  style={{ width: `${cancelledPct}%` }}
                  title={`Cancelled: ${cancelledAppointments} (${cancelledPct}%)`}
                />
              </div>

              {/* Breakdown Grid */}
              <div className="row g-3">
                <div className="col-6 col-sm-3">
                  <div className="p-3 rounded-3 text-center border" style={{ backgroundColor: "#e0f2fe" }}>
                    <div className="small fw-semibold text-primary mb-1">Confirmed</div>
                    <div className="h4 fw-bold text-primary mb-0">{confirmedAppointments}</div>
                    <small className="text-muted" style={{ fontSize: "0.72rem" }}>{confirmedPct}%</small>
                  </div>
                </div>

                <div className="col-6 col-sm-3">
                  <div className="p-3 rounded-3 text-center border" style={{ backgroundColor: "#fef3c7" }}>
                    <div className="small fw-semibold text-warning-emphasis mb-1">Pending</div>
                    <div className="h4 fw-bold text-warning-emphasis mb-0">{pendingAppointments}</div>
                    <small className="text-muted" style={{ fontSize: "0.72rem" }}>{pendingPct}%</small>
                  </div>
                </div>

                <div className="col-6 col-sm-3">
                  <div className="p-3 rounded-3 text-center border" style={{ backgroundColor: "#d1fae5" }}>
                    <div className="small fw-semibold text-success mb-1">Completed</div>
                    <div className="h4 fw-bold text-success mb-0">{completedAppointments}</div>
                    <small className="text-muted" style={{ fontSize: "0.72rem" }}>{completedPct}%</small>
                  </div>
                </div>

                <div className="col-6 col-sm-3">
                  <div className="p-3 rounded-3 text-center border" style={{ backgroundColor: "#fee2e2" }}>
                    <div className="small fw-semibold text-danger mb-1">Cancelled</div>
                    <div className="h4 fw-bold text-danger mb-0">{cancelledAppointments}</div>
                    <small className="text-muted" style={{ fontSize: "0.72rem" }}>{cancelledPct}%</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Department Quick Summaries */}
        <div className="col-lg-6">
          <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: "var(--radius-lg)" }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                  <h5 className="fw-bold text-dark mb-0">Department Wings</h5>
                  <small className="text-muted">Specialty units and clinical leadership</small>
                </div>
                <button 
                  className="btn btn-sm btn-link text-decoration-none text-primary p-0 fw-semibold"
                  onClick={() => navigate('/departments')}
                >
                  View All <i className="bi bi-arrow-right"></i>
                </button>
              </div>

              <div className="row g-2.5">
                {departments.slice(0, 4).map((dept) => {
                  const deptDocCount = doctors.filter(d => d.department === dept.name).length;
                  return (
                    <div className="col-sm-6" key={dept.id}>
                      <div 
                        className="p-3 rounded-3 border h-100 cursor-pointer d-flex align-items-center justify-content-between"
                        style={{ backgroundColor: "#f8fafc" }}
                        onClick={() => navigate('/departments')}
                      >
                        <div className="d-flex align-items-center gap-2.5">
                          <div 
                            className="rounded-3 d-flex align-items-center justify-content-center"
                            style={{ 
                              width: "38px", 
                              height: "38px", 
                              backgroundColor: dept.bgColor, 
                              color: dept.color, 
                              fontSize: "1.2rem" 
                            }}
                          >
                            <i className={`bi ${dept.icon}`}></i>
                          </div>
                          <div>
                            <div className="fw-bold text-dark small">{dept.name}</div>
                            <small className="text-muted" style={{ fontSize: "0.72rem" }}>
                              {dept.head}
                            </small>
                          </div>
                        </div>

                        <span className="badge bg-white text-secondary border px-2 py-1 small">
                          {deptDocCount} Doc{deptDocCount === 1 ? '' : 's'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Appointments Section */}
      <div className="table-card mb-4">
        <div className="table-card-header">
          <div>
            <h5 className="fw-bold text-dark mb-1">Recent Scheduled Consultations</h5>
            <small className="text-muted">Latest patient appointments across departments</small>
          </div>
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm rounded-pill px-3 shadow-none"
              onClick={() => navigate('/appointments')}
            >
              All Appointments ({appointments.length})
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm rounded-pill px-3 shadow-sm d-flex align-items-center gap-1.5"
              onClick={onOpenAppointmentModal}
            >
              <i className="bi bi-plus-circle"></i>
              <span>Book Appointment</span>
            </button>
          </div>
        </div>

        <AppointmentTable
          appointments={recentAppointments}
          onEdit={onEditAppointment}
          onDelete={onDeleteAppointment}
          onStatusChange={onStatusChange}
          onViewPatient={(id) => navigate(`/patients/${id}`)}
        />
      </div>

      {/* Quick Action Cards Grid */}
      <div className="row g-3">
        <div className="col-md-4">
          <div 
            className="p-3.5 bg-white rounded-3 border d-flex align-items-center gap-3 cursor-pointer hover-lift shadow-sm"
            onClick={onOpenPatientModal}
          >
            <div 
              className="rounded-3 d-flex align-items-center justify-content-center text-primary"
              style={{ width: "48px", height: "48px", backgroundColor: "#e0f2fe", fontSize: "1.5rem" }}
            >
              <i className="bi bi-person-plus-fill"></i>
            </div>
            <div>
              <h6 className="fw-bold text-dark mb-1">New Patient Registration</h6>
              <small className="text-muted">Enroll patient with full medical background</small>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div 
            className="p-3.5 bg-white rounded-3 border d-flex align-items-center gap-3 cursor-pointer hover-lift shadow-sm"
            onClick={onOpenAppointmentModal}
          >
            <div 
              className="rounded-3 d-flex align-items-center justify-content-center text-success"
              style={{ width: "48px", height: "48px", backgroundColor: "#d1fae5", fontSize: "1.5rem" }}
            >
              <i className="bi bi-calendar2-plus-fill"></i>
            </div>
            <div>
              <h6 className="fw-bold text-dark mb-1">Book New Appointment</h6>
              <small className="text-muted">Schedule clinical consultation slot</small>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div 
            className="p-3.5 bg-white rounded-3 border d-flex align-items-center gap-3 cursor-pointer hover-lift shadow-sm"
            onClick={onOpenDoctorModal}
          >
            <div 
              className="rounded-3 d-flex align-items-center justify-content-center text-purple"
              style={{ width: "48px", height: "48px", backgroundColor: "#ede9fe", color: "#7c3aed", fontSize: "1.5rem" }}
            >
              <i className="bi bi-person-badge-fill"></i>
            </div>
            <div>
              <h6 className="fw-bold text-dark mb-1">Add Medical Specialist</h6>
              <small className="text-muted">Onboard specialist to doctor roster</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
