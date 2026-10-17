import React, { useState, useEffect } from 'react';

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const GENDERS = ["Male", "Female", "Other"];

const PatientModal = ({ isOpen, onClose, onSave, patientToEdit, doctors = [] }) => {
  const isEditing = Boolean(patientToEdit);

  const initialFormState = {
    name: '',
    age: '',
    gender: 'Male',
    bloodGroup: 'O+',
    phone: '',
    address: '',
    emergencyContact: '',
    medicalHistory: '',
    assignedDoctor: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (patientToEdit) {
      setFormData({
        name: patientToEdit.name || '',
        age: patientToEdit.age || '',
        gender: patientToEdit.gender || 'Male',
        bloodGroup: patientToEdit.bloodGroup || 'O+',
        phone: patientToEdit.phone || '',
        address: patientToEdit.address || '',
        emergencyContact: patientToEdit.emergencyContact || '',
        medicalHistory: patientToEdit.medicalHistory || '',
        assignedDoctor: patientToEdit.assignedDoctor || ''
      });
    } else {
      setFormData(initialFormState);
    }
    setErrors({});
  }, [patientToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Patient full name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    const ageNum = parseInt(formData.age, 10);
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      newErrors.age = 'Age must be between 1 and 120';
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select a gender';
    }

    if (!formData.bloodGroup) {
      newErrors.bloodGroup = 'Please select a blood group';
    }

    // Phone validation
    const cleanedPhone = formData.phone.replace(/[\s\-\(\)\+]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (cleanedPhone.length < 7 || cleanedPhone.length > 15) {
      newErrors.phone = 'Please enter a valid phone number (7-15 digits)';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Residential address is required';
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
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...formData,
      age: parseInt(formData.age, 10)
    };

    if (isEditing) {
      payload.id = patientToEdit.id;
      payload.registeredDate = patientToEdit.registeredDate;
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
              <i className={isEditing ? "bi-pencil-square" : "bi-person-plus-fill"}></i>
            </div>
            <div>
              <h5 className="modal-title fw-bold mb-0 text-dark">
                {isEditing ? `Edit Patient (${patientToEdit.id})` : 'Register New Patient'}
              </h5>
              <small className="text-muted">
                {isEditing ? 'Update clinical and demographic record' : 'Fill all mandatory details to enroll patient'}
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
              {/* Patient Full Name */}
              <div className="col-md-8">
                <label className="form-label small fw-bold text-dark">
                  Full Name <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="bi bi-person text-muted"></i>
                  </span>
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    placeholder="e.g. Eleanor Vance"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
              </div>

              {/* Age */}
              <div className="col-md-4">
                <label className="form-label small fw-bold text-dark">
                  Age (Years) <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  min="1"
                  max="120"
                  className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                  placeholder="e.g. 35"
                  value={formData.age}
                  onChange={handleChange}
                />
                {errors.age && <div className="invalid-feedback">{errors.age}</div>}
              </div>

              {/* Gender */}
              <div className="col-md-6">
                <label className="form-label small fw-bold text-dark">
                  Gender <span className="text-danger">*</span>
                </label>
                <select
                  name="gender"
                  className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
                  value={formData.gender}
                  onChange={handleChange}
                >
                  {GENDERS.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
                {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
              </div>

              {/* Blood Group */}
              <div className="col-md-6">
                <label className="form-label small fw-bold text-dark">
                  Blood Group <span className="text-danger">*</span>
                </label>
                <select
                  name="bloodGroup"
                  className={`form-select ${errors.bloodGroup ? 'is-invalid' : ''}`}
                  value={formData.bloodGroup}
                  onChange={handleChange}
                >
                  {BLOOD_GROUPS.map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
                {errors.bloodGroup && <div className="invalid-feedback">{errors.bloodGroup}</div>}
              </div>

              {/* Phone */}
              <div className="col-md-6">
                <label className="form-label small fw-bold text-dark">
                  Primary Phone <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="bi bi-telephone text-muted"></i>
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                    placeholder="e.g. +1 (555) 019-2831"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="col-md-6">
                <label className="form-label small fw-bold text-dark">
                  Emergency Contact (Name & Phone)
                </label>
                <input
                  type="text"
                  name="emergencyContact"
                  className="form-control"
                  placeholder="e.g. John Doe (Spouse) +1 555-987"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                />
              </div>

              {/* Address */}
              <div className="col-12">
                <label className="form-label small fw-bold text-dark">
                  Residential Address <span className="text-danger">*</span>
                </label>
                <textarea
                  name="address"
                  rows="2"
                  className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                  placeholder="Street, Suite / Apartment, City, State, ZIP"
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && <div className="invalid-feedback">{errors.address}</div>}
              </div>

              {/* Medical History */}
              <div className="col-md-6">
                <label className="form-label small fw-bold text-dark">
                  Medical History / Known Allergies
                </label>
                <textarea
                  name="medicalHistory"
                  rows="2"
                  className="form-control"
                  placeholder="e.g. Hypertension, Penicillin allergy"
                  value={formData.medicalHistory}
                  onChange={handleChange}
                />
              </div>

              {/* Assigned Doctor */}
              <div className="col-md-6">
                <label className="form-label small fw-bold text-dark">
                  Primary Consulting Doctor (Optional)
                </label>
                <select
                  name="assignedDoctor"
                  className="form-select"
                  value={formData.assignedDoctor}
                  onChange={handleChange}
                >
                  <option value="">-- None / Select Doctor --</option>
                  {doctors.map(d => (
                    <option key={d.id} value={d.name}>
                      {d.name} ({d.department})
                    </option>
                  ))}
                </select>
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
              {isEditing ? 'Save Changes' : 'Register Patient'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientModal;
