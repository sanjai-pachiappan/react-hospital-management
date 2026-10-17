import {
  initialDepartments,
  initialDoctors,
  initialPatients,
  initialAppointments
} from "./mockData";

const PATIENTS_KEY = "medipulse_patients";
const DOCTORS_KEY = "medipulse_doctors";
const APPOINTMENTS_KEY = "medipulse_appointments";
const DEPARTMENTS_KEY = "medipulse_departments";

// Safe read from LocalStorage
const loadFromStorage = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
  }
  // Store default fallback
  try {
    localStorage.setItem(key, JSON.stringify(fallback));
  } catch (e) {
    console.error("Storage write error:", e);
  }
  return fallback;
};

// Safe write to LocalStorage
const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
  }
};

export const localStorageService = {
  // Initialize storage if empty
  init() {
    if (!localStorage.getItem(PATIENTS_KEY)) {
      saveToStorage(PATIENTS_KEY, initialPatients);
    }
    if (!localStorage.getItem(DOCTORS_KEY)) {
      saveToStorage(DOCTORS_KEY, initialDoctors);
    }
    if (!localStorage.getItem(APPOINTMENTS_KEY)) {
      saveToStorage(APPOINTMENTS_KEY, initialAppointments);
    }
    if (!localStorage.getItem(DEPARTMENTS_KEY)) {
      saveToStorage(DEPARTMENTS_KEY, initialDepartments);
    }
  },

  // Reset to original mock data
  resetToDemoData() {
    saveToStorage(PATIENTS_KEY, initialPatients);
    saveToStorage(DOCTORS_KEY, initialDoctors);
    saveToStorage(APPOINTMENTS_KEY, initialAppointments);
    saveToStorage(DEPARTMENTS_KEY, initialDepartments);
    return {
      patients: initialPatients,
      doctors: initialDoctors,
      appointments: initialAppointments,
      departments: initialDepartments
    };
  },

  // PATIENTS
  getPatients() {
    return loadFromStorage(PATIENTS_KEY, initialPatients);
  },
  savePatients(patients) {
    saveToStorage(PATIENTS_KEY, patients);
  },
  addPatient(patientData) {
    const patients = this.getPatients();
    // Generate next ID
    const nextNum = patients.length > 0 
      ? Math.max(...patients.map(p => parseInt(p.id.replace(/\D/g, "") || "1000", 10))) + 1 
      : 1001;
    const newPatient = {
      ...patientData,
      id: `PAT-${nextNum}`,
      registeredDate: patientData.registeredDate || new Date().toISOString().split("T")[0]
    };
    const updated = [newPatient, ...patients];
    this.savePatients(updated);
    return newPatient;
  },
  updatePatient(updatedPatient) {
    const patients = this.getPatients();
    const index = patients.findIndex(p => p.id === updatedPatient.id);
    if (index !== -1) {
      patients[index] = { ...patients[index], ...updatedPatient };
      this.savePatients(patients);
      return patients[index];
    }
    return null;
  },
  deletePatient(patientId) {
    const patients = this.getPatients();
    const updated = patients.filter(p => p.id !== patientId);
    this.savePatients(updated);
    // Also remove or clean up their appointments
    const appointments = this.getAppointments().filter(a => a.patientId !== patientId);
    this.saveAppointments(appointments);
    return updated;
  },
  getPatientById(patientId) {
    const patients = this.getPatients();
    return patients.find(p => p.id === patientId) || null;
  },

  // DOCTORS
  getDoctors() {
    return loadFromStorage(DOCTORS_KEY, initialDoctors);
  },
  saveDoctors(doctors) {
    saveToStorage(DOCTORS_KEY, doctors);
  },
  addDoctor(doctorData) {
    const doctors = this.getDoctors();
    const nextNum = doctors.length > 0
      ? Math.max(...doctors.map(d => parseInt(d.id.replace(/\D/g, "") || "100", 10))) + 1
      : 101;
    const newDoctor = {
      ...doctorData,
      id: `DOC-${nextNum}`,
      rating: doctorData.rating || 4.8,
      status: doctorData.status || "Available"
    };
    const updated = [newDoctor, ...doctors];
    this.saveDoctors(updated);
    return newDoctor;
  },
  updateDoctor(updatedDoctor) {
    const doctors = this.getDoctors();
    const index = doctors.findIndex(d => d.id === updatedDoctor.id);
    if (index !== -1) {
      doctors[index] = { ...doctors[index], ...updatedDoctor };
      this.saveDoctors(doctors);
      return doctors[index];
    }
    return null;
  },
  deleteDoctor(doctorId) {
    const doctors = this.getDoctors();
    const updated = doctors.filter(d => d.id !== doctorId);
    this.saveDoctors(updated);
    return updated;
  },

  // APPOINTMENTS
  getAppointments() {
    return loadFromStorage(APPOINTMENTS_KEY, initialAppointments);
  },
  saveAppointments(appointments) {
    saveToStorage(APPOINTMENTS_KEY, appointments);
  },
  addAppointment(appointmentData) {
    const appointments = this.getAppointments();
    const nextNum = appointments.length > 0
      ? Math.max(...appointments.map(a => parseInt(a.id.replace(/\D/g, "") || "2000", 10))) + 1
      : 2001;
    const newAppointment = {
      ...appointmentData,
      id: `APT-${nextNum}`,
      status: appointmentData.status || "Pending"
    };
    const updated = [newAppointment, ...appointments];
    this.saveAppointments(updated);
    return newAppointment;
  },
  updateAppointment(updatedAppointment) {
    const appointments = this.getAppointments();
    const index = appointments.findIndex(a => a.id === updatedAppointment.id);
    if (index !== -1) {
      appointments[index] = { ...appointments[index], ...updatedAppointment };
      this.saveAppointments(appointments);
      return appointments[index];
    }
    return null;
  },
  deleteAppointment(appointmentId) {
    const appointments = this.getAppointments();
    const updated = appointments.filter(a => a.id !== appointmentId);
    this.saveAppointments(updated);
    return updated;
  },
  getAppointmentsByPatientId(patientId) {
    const appointments = this.getAppointments();
    return appointments.filter(a => a.patientId === patientId);
  },

  // DEPARTMENTS
  getDepartments() {
    return loadFromStorage(DEPARTMENTS_KEY, initialDepartments);
  }
};
