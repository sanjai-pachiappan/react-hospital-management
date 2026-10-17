import React, { useState, useEffect } from 'react';

const TIME_SLOTS = [
  "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM",
  "11:30 AM", "12:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM",
  "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM"
];

const STATUS_OPTIONS = ["Pending", "Confirmed", "Completed", "Cancelled"];

const AppointmentModal = ({
  isOpen,
  onClose,
  onSave,
  appointmentToEdit,
  patients = [],
  doctors = [],
  preselectedDoctor = null,
  preselectedPatient = null
}) => {
  const isEditing = Boolean(appointmentToEdit);

  // Default to today in YYYY-MM-DD
  const todayStr = new Date().toISOString().split("T")[0];

  const initialFormState = {
    patientId: '',
    patientName: '',
    doctorName: '',
    department: 'General Medicine',
    date: todayStr,
    time: '09:30 AM',
    reason: '',
    status: 'Confirmed',
    notes: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (appointmentToEdit) {
      setFormData({
        patientId: appointmentToEdit.patientId || '',
        patientName: appointmentToEdit.patientName || '',
        doctorName: appointmentToEdit.doctorName || '',
        department: appointmentToEdit.department || 'General Medicine',
        date: appointmentToEdit.date || todayStr,
        time: appointmentToEdit.time || '09:30 AM',
        reason: appointmentToEdit.reason || '',
        status: appointmentToEdit.status || 'Pending',
        notes: appointmentToEdit.notes || ''
      });
    } else {
      let defaultDoc = doctors[0] ? doctors[0].name : '';
      let defaultDept = doctors[0] ? doctors[0].department : 'General Medicine';
      let defaultPatId = patients[0] ? patients[0].id : '';
      let defaultPatName = patients[0] ? patients[0].name : '';

      if (preselectedDoctor) {
        defaultDoc = preselectedDoctor.name;
        defaultDept = preselectedDoctor.department;
      }
      if (preselectedPatient) {
        defaultPatId = preselectedPatient.id;
        defaultPatName = preselectedPatient.name;
      }

      setFormData({
        patientId: defaultPatId,
        patientName: defaultPatName,
        doctorName: defaultDoc,
        department: defaultDept,
        date: todayStr,
        time: '10:00 AM',
        reason: '',
        status: 'Confirmed',
        notes: ''
      });
    }
    setErrors({});
  }, [appointmentToEdit, isOpen, preselectedDoctor, preselectedPatient, doctors, patients, todayStr]);

  if (!isOpen) return null;

  // Handle patient selection change
  const handlePatientSelect = (e) => {
    const selectedId = e.target.value;
    const selectedPatient = patients.find(p => p.id === selectedId);
    setFormData(prev => ({
      ...prev,
      patientId: selectedId,
      patientName: selectedPatient ? selectedPatient.name : prev.patientName
    }));
    if (errors.patientId) setErrors(prev => ({ ...prev, patientId: '' }));
  };

  // Handle doctor selection change (auto syncs department)
  const handleDoctorSelect = (e) => {
    const docName = e.target.value;
    const doc = doctors.find(d => d.name === docName);
    setFormData(prev => ({
      ...prev,
      doctorName: docName,
      department: doc ? doc.department : prev.department
    }));
    if (errors.doctorName) setErrors(prev => ({ ...prev, doctorName: '' }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient is required';
    }

    if (!formData.doctorName.trim()) {
      newErrors.doctorName = 'Consulting doctor is required';
    }

    if (!formData.date) {
      newErrors.date = 'Appointment date is required';
    }

    if (!formData.time) {
      newErrors.time = 'Appointment time slot is required';
    }

    if (!formData.reason.trim()) {
      newErrors.reason = 'Reason for consultation / symptoms are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = { ...formData };
    if (isEditing) {
      payload.id = appointmentToEdit.id;
    }

    onSave(payload);
  };

  return (
    <div className="custom-modal-backdrop" onClick={onClose}>
      <div 
        className="custom-modal-dialog" 
        style={{ maxWidth: '640px' }} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="custom-modal-header">
          <div className="d-flex align-items-center gap-2">
            <div 
              className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center"
              style={{ width: "40px", height: "40px", fontSize: "1.2rem" }}
            >
              <i className={isEditing ? "bi-calendar-check" : "bi-calendar-plus"}></i>
            </div>
            <div>
              <h5 className="modal-title fw-bold mb-0 text-dark">
                {isEditing ? `Edit Appointment (${appointmentToEdit.id})` : 'Schedule Patient Appointment'}
              </h5>
              <small className="text-muted">
                {isEditing ? 'Modify appointment time or clinical status' : 'Select patient, doctor, and consultation slot'}
              </small>
            </div>
          </div>
          <button 
            type="button" 
            className="btn-close" 
            onClick={onClose}
            aria-label="Close"
          ></button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="custom-modal-body">
            <div className="row g-3">
              {/* Patient Selection Dropdown */}
              <div className="col-12">
                <label className="form-label small fw-bold text-dark">
                  Select Registered Patient <span className="text-danger">*</span>
                </label>
                <select
                  className={`form-select ${errors.patientName ? 'is-invalid' : ''}`}
                  value={formData.patientId}
                  onChange={handlePatientSelect}
                >
                  <option value="">-- Choose Patient from Directory --</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.id}) - {p.gender}, {p.age} yrs [Blood: {p.bloodGroup}]
                    </option>
                  ))}
                </select>
                {errors.patientName && <div className="invalid-feedback">{errors.patientName}</div>}
              </div>

              {/* Doctor Dropdown */}
              <div className="col-md-7">
                <label className="form-label small fw-bold text-dark">
                  Consulting Specialist Doctor <span className="text-danger">*</span>
                </label>
                <select
                  name="doctorName"
                  className={`form-select ${errors.doctorName ? 'is-invalid' : ''}`}
                  value={formData.doctorName}
                  onChange={handleDoctorSelect}
                >
                  <option value="">-- Select Doctor --</option>
                  {doctors.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name} — {d.department} ({d.specialization})
                    </option>
                  ))}
                </select>
                {errors.doctorName && <div className="invalid-feedback">{errors.doctorName}</div>}
              </div>

              {/* Department */}
              <div className="col-md-5">
                <label className="form-label small fw-bold text-dark">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  className="form-control bg-light"
                  value={formData.department}
                  readOnly
                  title="Automatically synchronized with selected doctor"
                />
              </div>

              {/* Appointment Date */}
              <div className="col-md-6">
                <label className="form-label small fw-bold text-dark">
                  Appointment Date <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                  value={formData.date}
                  onChange={handleChange}
                />
                {errors.date && <div className="invalid-feedback">{errors.date}</div>}
              </div>

              {/* Appointment Time Slot */}
              <div className="col-md-6">
                <label className="form-label small fw-bold text-dark">
                  Time Slot <span className="text-danger">*</span>
                </label>
                <select
                  name="time"
                  className={`form-select ${errors.time ? 'is-invalid' : ''}`}
                  value={formData.time}
                  onChange={handleChange}
                >
                  {TIME_SLOTS.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
                {errors.time && <div className="invalid-feedback">{errors.time}</div>}
              </div>

              {/* Status */}
              <div className="col-12">
                <label className="form-label small fw-bold text-dark">
                  Appointment Status
                </label>
                <div className="d-flex flex-wrap gap-2">
                  {STATUS_OPTIONS.map((status) => (
                    <div className="form-check form-check-inline" key={status}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="status"
                        id={`status-${status}`}
                        value={status}
                        checked={formData.status === status}
                        onChange={handleChange}
                      />
                      <label className="form-check-label small fw-semibold cursor-pointer" htmlFor={`status-${status}`}>
                        {status}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reason / Symptoms */}
              <div className="col-12">
                <label className="form-label small fw-bold text-dark">
                  Chief Complaint / Reason for Visit <span className="text-danger">*</span>
                </label>
                <textarea
                  name="reason"
                  rows="2"
                  className={`form-control ${errors.reason ? 'is-invalid' : ''}`}
                  placeholder="e.g. Chest pain with exertion, routine follow up, fever for 3 days"
                  value={formData.reason}
                  onChange={handleChange}
                />
                {errors.reason && <div className="invalid-feedback">{errors.reason}</div>}
              </div>

              {/* Clinical Notes */}
              <div className="col-12">
                <label className="form-label small fw-bold text-dark">
                  Staff / Clinical Notes (Optional)
                </label>
                <input
                  type="text"
                  name="notes"
                  className="form-control"
                  placeholder="e.g. Bring previous blood work; Fasting required"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="custom-modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary rounded-pill px-4"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary rounded-pill px-4 d-flex align-items-center gap-2 shadow-sm"
            >
              <i className="bi bi-calendar2-check"></i>
              {isEditing ? 'Update Appointment' : 'Book Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
