import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Services
import { localStorageService } from './data/localStorageService';

// Layout Components
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import ToastNotification from './components/ToastNotification';

// Modals
import PatientModal from './components/PatientModal';
import DoctorModal from './components/DoctorModal';
import AppointmentModal from './components/AppointmentModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';

// Pages
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import PatientDetails from './pages/PatientDetails';
import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';
import Departments from './pages/Departments';
import NotFound from './pages/NotFound';

function App() {
  const navigate = useNavigate();

  // Initialize LocalStorage on first load
  useEffect(() => {
    localStorageService.init();
  }, []);

  // Primary Data State
  const [patients, setPatients] = useState(() => localStorageService.getPatients());
  const [doctors, setDoctors] = useState(() => localStorageService.getDoctors());
  const [appointments, setAppointments] = useState(() => localStorageService.getAppointments());
  const [departments] = useState(() => localStorageService.getDepartments());

  // Layout UI State
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Notification Toasts State
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto dismiss after 3.5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Modal States
  const [patientModal, setPatientModal] = useState({ isOpen: false, data: null });
  const [doctorModal, setDoctorModal] = useState({ isOpen: false, data: null });
  const [appointmentModal, setAppointmentModal] = useState({
    isOpen: false,
    data: null,
    preselectedDoctor: null,
    preselectedPatient: null
  });

  // Reusable Delete / Reset Confirmation Modal
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    itemName: '',
    onConfirm: null
  });

  // Toggle Sidebar
  const toggleSidebar = () => {
    if (window.innerWidth < 992) {
      setIsMobileOpen((prev) => !prev);
    } else {
      setIsSidebarCollapsed((prev) => !prev);
    }
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  // --- PATIENTS HANDLERS ---
  const handleOpenAddPatient = () => {
    setPatientModal({ isOpen: true, data: null });
  };

  const handleOpenEditPatient = (patient) => {
    setPatientModal({ isOpen: true, data: patient });
  };

  const handleSavePatient = (patientData) => {
    if (patientData.id) {
      // Update
      const updated = localStorageService.updatePatient(patientData);
      if (updated) {
        setPatients(localStorageService.getPatients());
        // Also update patientName in appointments if changed
        const currentApts = localStorageService.getAppointments();
        const updatedApts = currentApts.map((a) =>
          a.patientId === updated.id ? { ...a, patientName: updated.name } : a
        );
        localStorageService.saveAppointments(updatedApts);
        setAppointments(updatedApts);
        addToast(`Patient "${updated.name}" updated successfully.`, 'success');
      }
    } else {
      // Create
      const newPatient = localStorageService.addPatient(patientData);
      setPatients(localStorageService.getPatients());
      addToast(`Patient "${newPatient.name}" registered successfully with ID ${newPatient.id}.`, 'success');
    }
    setPatientModal({ isOpen: false, data: null });
  };

  const handleOpenDeletePatient = (patient) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Patient Record',
      itemName: patient.name,
      message: `Permanently delete patient ${patient.name} (${patient.id}) and remove all associated appointment records?`,
      onConfirm: () => {
        const remaining = localStorageService.deletePatient(patient.id);
        setPatients(remaining);
        setAppointments(localStorageService.getAppointments());
        setConfirmModal({ isOpen: false, title: '', message: '', itemName: '', onConfirm: null });
        addToast(`Patient "${patient.name}" has been deleted.`, 'danger');
      }
    });
  };

  // --- DOCTORS HANDLERS ---
  const handleOpenAddDoctor = () => {
    setDoctorModal({ isOpen: true, data: null });
  };

  const handleOpenEditDoctor = (doctor) => {
    setDoctorModal({ isOpen: true, data: doctor });
  };

  const handleSaveDoctor = (doctorData) => {
    if (doctorData.id) {
      const updated = localStorageService.updateDoctor(doctorData);
      if (updated) {
        setDoctors(localStorageService.getDoctors());
        addToast(`Doctor "${updated.name}" profile updated.`, 'success');
      }
    } else {
      const newDoctor = localStorageService.addDoctor(doctorData);
      setDoctors(localStorageService.getDoctors());
      addToast(`Doctor "${newDoctor.name}" added to ${newDoctor.department} roster.`, 'success');
    }
    setDoctorModal({ isOpen: false, data: null });
  };

  const handleOpenDeleteDoctor = (doctor) => {
    setConfirmModal({
      isOpen: true,
      title: 'Remove Specialist Doctor',
      itemName: doctor.name,
      message: `Remove ${doctor.name} from the active specialist registry?`,
      onConfirm: () => {
        const remaining = localStorageService.deleteDoctor(doctor.id);
        setDoctors(remaining);
        setConfirmModal({ isOpen: false, title: '', message: '', itemName: '', onConfirm: null });
        addToast(`Doctor "${doctor.name}" removed from roster.`, 'warning');
      }
    });
  };

  // --- APPOINTMENTS HANDLERS ---
  const handleOpenBookAppointment = (preselectedDoc = null, preselectedPat = null) => {
    setAppointmentModal({
      isOpen: true,
      data: null,
      preselectedDoctor: preselectedDoc,
      preselectedPatient: preselectedPat
    });
  };

  const handleOpenEditAppointment = (appointment) => {
    setAppointmentModal({
      isOpen: true,
      data: appointment,
      preselectedDoctor: null,
      preselectedPatient: null
    });
  };

  const handleSaveAppointment = (appointmentData) => {
    if (appointmentData.id) {
      const updated = localStorageService.updateAppointment(appointmentData);
      if (updated) {
        setAppointments(localStorageService.getAppointments());
        addToast(`Appointment ${updated.id} updated.`, 'success');
      }
    } else {
      const newApt = localStorageService.addAppointment(appointmentData);
      setAppointments(localStorageService.getAppointments());
      addToast(`Appointment scheduled for ${newApt.patientName} on ${newApt.date} at ${newApt.time}.`, 'success');
    }
    setAppointmentModal({
      isOpen: false,
      data: null,
      preselectedDoctor: null,
      preselectedPatient: null
    });
  };

  const handleDeleteAppointment = (appointment) => {
    setConfirmModal({
      isOpen: true,
      title: 'Cancel & Delete Appointment',
      itemName: `Appointment ${appointment.id}`,
      message: `Delete appointment record for patient ${appointment.patientName} scheduled with ${appointment.doctorName}?`,
      onConfirm: () => {
        const remaining = localStorageService.deleteAppointment(appointment.id);
        setAppointments(remaining);
        setConfirmModal({ isOpen: false, title: '', message: '', itemName: '', onConfirm: null });
        addToast(`Appointment ${appointment.id} deleted.`, 'danger');
      }
    });
  };

  const handleStatusChange = (appointment, newStatus) => {
    const updated = localStorageService.updateAppointment({
      ...appointment,
      status: newStatus
    });
    if (updated) {
      setAppointments(localStorageService.getAppointments());
      addToast(`Appointment ${appointment.id} status changed to "${newStatus}".`, 'success');
    }
  };

  // --- RESET DEMO DATA ---
  const handleResetDemoData = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Reset to Sample Data',
      itemName: 'All Records',
      message: 'Restore all patients, doctors, departments, and appointments back to original fictional demo datasets? Any newly added records will be replaced.',
      onConfirm: () => {
        const resetData = localStorageService.resetToDemoData();
        setPatients(resetData.patients);
        setDoctors(resetData.doctors);
        setAppointments(resetData.appointments);
        setConfirmModal({ isOpen: false, title: '', message: '', itemName: '', onConfirm: null });
        addToast('All demo records have been successfully restored!', 'success');
      }
    });
  };

  return (
    <div className="app-layout">
      {/* Collapsible Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isMobileOpen={isMobileOpen}
        closeMobileSidebar={closeMobileSidebar}
      />

      {/* Main Content Area */}
      <div className={`main-wrapper ${isSidebarCollapsed ? 'expanded' : ''}`}>
        {/* Top Navbar */}
        <Topbar
          toggleSidebar={toggleSidebar}
          onResetDemoData={handleResetDemoData}
          onQuickBook={() => handleOpenBookAppointment()}
        />

        {/* Page Routes */}
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  patients={patients}
                  doctors={doctors}
                  appointments={appointments}
                  departments={departments}
                  onOpenPatientModal={handleOpenAddPatient}
                  onOpenDoctorModal={handleOpenAddDoctor}
                  onOpenAppointmentModal={() => handleOpenBookAppointment()}
                  onEditAppointment={handleOpenEditAppointment}
                  onDeleteAppointment={handleDeleteAppointment}
                  onStatusChange={handleStatusChange}
                />
              }
            />

            <Route
              path="/patients"
              element={
                <Patients
                  patients={patients}
                  onOpenAddModal={handleOpenAddPatient}
                  onOpenEditModal={handleOpenEditPatient}
                  onOpenDeleteModal={handleOpenDeletePatient}
                />
              }
            />

            <Route
              path="/patients/:id"
              element={
                <PatientDetails
                  patients={patients}
                  appointments={appointments}
                  onOpenEditPatient={handleOpenEditPatient}
                  onBookForPatient={(pat) => handleOpenBookAppointment(null, pat)}
                  onEditAppointment={handleOpenEditAppointment}
                  onDeleteAppointment={handleDeleteAppointment}
                />
              }
            />

            <Route
              path="/doctors"
              element={
                <Doctors
                  doctors={doctors}
                  onOpenAddModal={handleOpenAddDoctor}
                  onOpenEditModal={handleOpenEditDoctor}
                  onOpenDeleteModal={handleOpenDeleteDoctor}
                  onBookWithDoctor={(doc) => handleOpenBookAppointment(doc, null)}
                />
              }
            />

            <Route
              path="/appointments"
              element={
                <Appointments
                  appointments={appointments}
                  departments={departments}
                  onOpenBookModal={() => handleOpenBookAppointment()}
                  onOpenEditModal={handleOpenEditAppointment}
                  onOpenDeleteModal={handleDeleteAppointment}
                  onStatusChange={handleStatusChange}
                />
              }
            />

            <Route
              path="/departments"
              element={
                <Departments
                  departments={departments}
                  doctors={doctors}
                  onBookInDepartment={(deptName) => {
                    const doc = doctors.find((d) => d.department === deptName);
                    handleOpenBookAppointment(doc || null, null);
                  }}
                />
              }
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>

      {/* MODALS */}
      {/* 1. Patient Add/Edit Modal */}
      <PatientModal
        isOpen={patientModal.isOpen}
        onClose={() => setPatientModal({ isOpen: false, data: null })}
        onSave={handleSavePatient}
        patientToEdit={patientModal.data}
        doctors={doctors}
      />

      {/* 2. Doctor Add/Edit Modal */}
      <DoctorModal
        isOpen={doctorModal.isOpen}
        onClose={() => setDoctorModal({ isOpen: false, data: null })}
        onSave={handleSaveDoctor}
        doctorToEdit={doctorModal.data}
      />

      {/* 3. Appointment Add/Edit Modal */}
      <AppointmentModal
        isOpen={appointmentModal.isOpen}
        onClose={() =>
          setAppointmentModal({
            isOpen: false,
            data: null,
            preselectedDoctor: null,
            preselectedPatient: null
          })
        }
        onSave={handleSaveAppointment}
        appointmentToEdit={appointmentModal.data}
        patients={patients}
        doctors={doctors}
        preselectedDoctor={appointmentModal.preselectedDoctor}
        preselectedPatient={appointmentModal.preselectedPatient}
      />

      {/* 4. Delete / Reset Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        itemName={confirmModal.itemName}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal({ isOpen: false, title: '', message: '', itemName: '', onConfirm: null })}
      />

      {/* Toast Notification Container */}
      <ToastNotification toasts={toasts} onClose={removeToast} />
    </div>
  );
}

export default App;
