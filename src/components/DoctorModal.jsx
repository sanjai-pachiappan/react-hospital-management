import React, { useState, useEffect } from 'react';

const DEPARTMENTS = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Dermatology",
  "General Medicine"
];

const STATUSES = ["Available", "In Surgery", "On Leave"];

const DoctorModal = ({ isOpen, onClose, onSave, doctorToEdit }) => {
  const isEditing = Boolean(doctorToEdit);

  const initialFormState = {
    name: '',
    department: 'Cardiology',
    specialization: '',
    experience: '',
    availability: 'Mon - Fri (09:00 AM - 02:00 PM)',
    phone: '',
    email: '',
    room: '',
    status: 'Available',
    bio: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (doctorToEdit) {
      setFormData({
        name: doctorToEdit.name || '',
        department: doctorToEdit.department || 'Cardiology',
        specialization: doctorToEdit.specialization || '',
        experience: doctorToEdit.experience || '',
        availability: doctorToEdit.availability || 'Mon - Fri (09:00 AM - 02:00 PM)',
        phone: doctorToEdit.phone || '',
        email: doctorToEdit.email || '',
        room: doctorToEdit.room || '',
        status: doctorToEdit.status || 'Available',
        bio: doctorToEdit.bio || ''
      });
    } else {
      setFormData(initialFormState);
    }
    setErrors({});
  }, [doctorToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Doctor name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Doctor name must be at least 3 characters';
    }

    if (!formData.department) {
      newErrors.department = 'Please select a department';
    }

    if (!formData.specialization.trim()) {
      newErrors.specialization = 'Specialization area is required';
    }

    if (!formData.experience.trim()) {
      newErrors.experience = 'Experience is required (e.g. 8 Years)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please provide a valid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Contact phone number is required';
    }

    if (!formData.availability.trim()) {
      newErrors.availability = 'Working schedule / hours are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = { ...formData };
    if (isEditing) {
      payload.id = doctorToEdit.id;
      payload.rating = doctorToEdit.rating;
    }

    onSave(payload);
  };

  return (
    <div className="custom-modal-backdrop" onClick={onClose}>
      <div 
        className="custom-modal-dialog" 
        style={{ maxWidth: '680px' }} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="custom-modal-header">
          <div className="d-flex align-items-center gap-2">
            <div 
              className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center"
              style={{ width: "40px", height: "40px", fontSize: "1.2rem" }}
            >
              <i className={isEditing ? "bi-pencil-square" : "bi-person-plus"}></i>
            </div>
            <div>
              <h5 className="modal-title fw-bold mb-0 text-dark">
                {isEditing ? `Edit Doctor Profile (${doctorToEdit.id})` : 'Add New Medical Specialist'}
              </h5>
              <small className="text-muted">
                {isEditing ? 'Modify doctor credentials & availability' : 'Register a new doctor to the hospital roster'}
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
              {/* Name */}
              <div className="col-md-7">
                <label className="form-label small fw-bold text-dark">
                  Doctor Full Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  placeholder="e.g. Dr. Julian Croft"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              {/* Department */}
              <div className="col-md-5">
                <label className="form-label small fw-bold text-dark">
                  Department <span className="text-danger">*</span>
                </label>
                <select
                  name="department"
                  className={`form-select ${errors.department ? 'is-invalid' : ''}`}
                  value={formData.department}
                  onChange={handleChange}
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                {errors.department && <div className="invalid-feedback">{errors.department}</div>}
              </div>

              {/* Specialization */}
              <div className="col-md-7">
                <label className="form-label small fw-bold text-dark">
                  Specialization <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="specialization"
                  className={`form-control ${errors.specialization ? 'is-invalid' : ''}`}
                  placeholder="e.g. Interventional Cardiologist"
                  value={formData.specialization}
                  onChange={handleChange}
                />
                {errors.specialization && <div className="invalid-feedback">{errors.specialization}</div>}
              </div>

              {/* Experience */}
              <div className="col-md-5">
                <label className="form-label small fw-bold text-dark">
                  Experience <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="experience"
                  className={`form-control ${errors.experience ? 'is-invalid' : ''}`}
                  placeholder="e.g. 12 Years"
                  value={formData.experience}
                  onChange={handleChange}
                />
                {errors.experience && <div className="invalid-feedback">{errors.experience}</div>}
              </div>

              {/* Availability */}
              <div className="col-md-8">
                <label className="form-label small fw-bold text-dark">
                  Availability Schedule <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="availability"
                  className={`form-control ${errors.availability ? 'is-invalid' : ''}`}
                  placeholder="e.g. Mon, Wed, Fri (09:00 AM - 02:00 PM)"
                  value={formData.availability}
                  onChange={handleChange}
                />
                {errors.availability && <div className="invalid-feedback">{errors.availability}</div>}
              </div>

              {/* Clinic Room */}
              <div className="col-md-4">
                <label className="form-label small fw-bold text-dark">
                  Room / Chamber
                </label>
                <input
                  type="text"
                  name="room"
                  className="form-control"
                  placeholder="e.g. Block A - 302"
                  value={formData.room}
                  onChange={handleChange}
                />
              </div>

              {/* Phone */}
              <div className="col-md-6">
                <label className="form-label small fw-bold text-dark">
                  Phone Number <span className="text-danger">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  placeholder="e.g. +1 (555) 234-5678"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>

              {/* Email */}
              <div className="col-md-6">
                <label className="form-label small fw-bold text-dark">
                  Email Address <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="e.g. j.croft@medipulse.org"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              {/* Status */}
              <div className="col-md-12">
                <label className="form-label small fw-bold text-dark">
                  Current Status
                </label>
                <select
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                >
                  {STATUSES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Bio */}
              <div className="col-12">
                <label className="form-label small fw-bold text-dark">
                  Professional Bio / Notes
                </label>
                <textarea
                  name="bio"
                  rows="2"
                  className="form-control"
                  placeholder="Key certifications, clinical fellowship, or areas of special clinical interest..."
                  value={formData.bio}
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
              <i className="bi bi-check2-circle"></i>
              {isEditing ? 'Update Doctor' : 'Add Doctor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorModal;
