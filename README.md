# MediPulse - Hospital Management System Dashboard

A complete, modern, and professional **Hospital Management Dashboard** built as a frontend-only React JS single-page web application. 

This project was developed strictly with **HTML5, CSS3, Bootstrap 5, JavaScript, React JS, React Router DOM, Bootstrap Icons, and LocalStorage** for full client-side data persistence. No backend, APIs, external databases, or Tailwind CSS are used.

---

## 🌟 Key Features

### 1. 📊 Dashboard Page (`/`)
- **Real-Time Statistical Metric Cards**:
  - Total Enrolled Patients (with trend indicator)
  - Specialist Doctors on Duty
  - Scheduled Appointments
  - Active Clinical Departments
- **Appointment Status Distribution**:
  - Visual color-coded progress metric bar displaying proportions of Confirmed, Pending, Completed, and Cancelled appointments.
- **Department Summaries**:
  - Department wing cards displaying head of department, specialist doctor count, and quick links.
- **Recent Appointments Table**:
  - Real-time scheduled outpatient and inpatient consultation queue with status badges and quick action links.
- **Quick Action Cards**:
  - Direct shortcuts to register new patients, book appointments, and add medical specialists.

### 2. 👥 Patients Registry (`/patients`)
- **Responsive Patients Table**:
  - Columns: Patient ID (`PAT-1001`...), Name & Avatar initials, Age & Gender, Blood Group badge (`A+`, `O-`, etc.), Phone number, Residential address, and Action buttons.
- **Full CRUD Operations**:
  - **Register Patient**: Controlled modal form with validation (Name, Age 1–120, Gender, Blood Group, Phone, Address, Emergency Contact, Medical History, Assigned Doctor).
  - **Edit Patient**: Modify existing patient information with real-time updates across the system.
  - **Delete Patient**: Reusable confirmation modal with automatic cleanup of associated appointments.
  - **View Details**: Direct link to the dedicated Patient Details profile page.
- **Interactive Search & Multi-Filters**:
  - Search by Name, ID, Phone, Blood Group, or Address.
  - Filter by Gender (All, Male, Female, Other).
  - Filter by Blood Group (`A+`, `A-`, `B+`, `B-`, `AB+`, `AB-`, `O+`, `O-`).

### 3. 🩺 Specialist Doctors Roster (`/doctors`)
- **Professional Doctor Profile Cards**:
  - Displays: Doctor Name, Department badge, Specialization, Experience (years), Availability schedule, Consultation room, Phone, Email, Status badge (*Available*, *In Surgery*, *On Leave*), and Bio.
- **Interactive Filtering & Search**:
  - Search by doctor name, specialization, or room.
  - Filter by Department (Cardiology, Neurology, Orthopedics, Pediatrics, Dermatology, General Medicine).
  - Filter by Availability status.
- **Doctor Actions**:
  - **Add Specialist**: Controlled modal form with complete validation.
  - **Edit Doctor**: Modify doctor credentials, room, and schedule.
  - **Delete Doctor**: Remove with confirmation dialog.
  - **Book Visit**: Instantly opens the appointment scheduling modal with that specific doctor and department preselected.

### 4. 📅 Appointments Queue (`/appointments`)
- **Comprehensive Appointments Table**:
  - Columns: Appointment ID (`APT-2001`...), Patient Name (clickable link to patient profile), Doctor & Department, Date & Time, Reason / Symptoms, Status badge, and Actions.
- **Schedule Appointment Modal**:
  - Dropdown populated dynamically from registered patients.
  - Dropdown populated dynamically from registered doctors (automatically syncs department).
  - Date picker, Time slot selector, Reason for consultation, Status radio buttons, and Clinical notes.
- **Flexible Management**:
  - Quick inline status switcher: Update status to *Pending*, *Confirmed*, *Completed*, or *Cancelled*.
  - Edit and Delete appointments with confirmation dialogs.
  - Filter by Status, Department, and Date tabs (*All*, *Today*, *Upcoming*, *Past*).

### 5. 🏥 Clinical Departments (`/departments`)
- **Cards for 6 Major Hospital Departments**:
  1. **Cardiology** (Heart & Cardiovascular Care)
  2. **Neurology** (Brain & Nervous System)
  3. **Orthopedics** (Bones, Joints & Spine)
  4. **Pediatrics** (Child & Adolescent Healthcare)
  5. **Dermatology** (Skin, Hair & Cosmetic Health)
  6. **General Medicine** (Comprehensive Primary Care)
- **Department Card Details**:
  - Department code, custom icon, color accent, comprehensive description, Head of Department & qualifications, clinic wing/room, direct phone line, and doctor count.
  - Interactive **"Specialists" modal** showing all doctors currently affiliated with that department.
  - "Book" action directly linked to department appointments.

### 6. 👤 Patient Details Profile Page (`/patients/:id`)
- **Complete Patient Information Card**:
  - Patient ID, Blood group badge, Age, Gender, Phone, Address, Emergency Contact, Registration Date, Assigned Consulting Doctor, and Medical Notes / Allergies.
- **Dedicated Consultation History**:
  - Full table showing all appointments recorded for that specific patient.
- **Quick Patient Actions**:
  - "Book Appointment for this Patient" button.
  - "Edit Profile" button.
  - "Back to Patients List" button.

---

## 🎨 Design & Aesthetic Highlights
- **Color Palette**: Clean clinical blue (`#0284c7`, `#0369a1`), crisp white, and light gray background (`#f8fafc`) with soft borders (`#e2e8f0`).
- **Typography**: Google Fonts **Plus Jakarta Sans** for modern, crisp readability.
- **Sidebar**: Collapsible sidebar with active link highlights, hospital branding with pulse icon, and 24/7 emergency helpline card. Supports both desktop toggle and mobile overlay backdrop.
- **Topbar**: Live real-time clock and calendar date badge, hospital section title, quick "New Appointment" button, admin user chip, and a **"Reset Demo"** button.
- **Toast Notifications**: Automatic non-intrusive alerts for create, edit, delete, and reset operations.
- **Responsive Layout**: Designed for seamless demonstration on Desktop, Tablet, and Mobile displays.

---

## 💾 LocalStorage & Demo Data Persistence
- Pre-populated with realistic fictional sample records:
  - 8+ Patients with diverse demographics and medical conditions.
  - 6+ Doctors across all 6 departments with schedules and rooms.
  - 10+ Appointments with varying statuses and dates.
  - 6 Clinical Departments with complete leadership metadata.
- All Add, Edit, Delete, and Status Change operations update LocalStorage immediately and persist across page refreshes.
- **Reset to Demo Data**: Click the **"Reset Demo"** button in the top navigation bar at any time to instantly restore the original sample dataset.

---

## 🛠️ Project Structure

```
react/
├── index.html                     # Entry HTML with Google Fonts & Title
├── package.json                   # Dependencies & Scripts
├── vite.config.js                 # Vite configuration
└── src/
    ├── main.jsx                   # Application bootstrap with BrowserRouter & Bootstrap CSS
    ├── App.jsx                    # Root state, route definitions, modals & toasts
    ├── components/
    │   ├── Sidebar.jsx            # Collapsible navigation sidebar
    │   ├── Topbar.jsx             # Top bar with live time, reset demo & admin chip
    │   ├── StatCard.jsx           # Reusable metric card with trend indicators
    │   ├── PatientTable.jsx       # Responsive patients table with actions
    │   ├── PatientModal.jsx       # Controlled modal for patient Add & Edit
    │   ├── DoctorCard.jsx         # Doctor profile card with badges & contact
    │   ├── DoctorModal.jsx        # Controlled modal for doctor Add & Edit
    │   ├── AppointmentTable.jsx   # Appointments table with status changer
    │   ├── AppointmentModal.jsx   # Controlled modal for booking & editing appointments
    │   ├── DeleteConfirmModal.jsx # Reusable deletion confirmation modal
    │   └── ToastNotification.jsx  # Notification alert banner component
    ├── pages/
    │   ├── Dashboard.jsx          # Statistics, metrics progress bar & recent list
    │   ├── Patients.jsx           # Patient directory with search & filters
    │   ├── PatientDetails.jsx     # Patient profile view & consultation history
    │   ├── Doctors.jsx            # Specialist roster with department filters
    │   ├── Appointments.jsx       # Appointments schedule with status & date filters
    │   ├── Departments.jsx        # Department cards & specialist viewer modal
    │   └── NotFound.jsx           # 404 page with return to dashboard
    ├── data/
    │   ├── mockData.js            # Fictional initial patients, doctors, appointments, depts
    │   └── localStorageService.js # LocalStorage CRUD & initialization service
    └── styles/
        └── custom.css             # Hospital dashboard custom styles & variables
```

---

## 🚀 Terminal Commands to Run the Project

### 1. Install Dependencies
Open your terminal in the project directory:
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

The application will be running locally at:
👉 **`http://localhost:5173/`**

### 3. Build for Production (Optional)
```bash
npm run build
```
Builds the optimized production assets into the `dist/` directory.

---

## 📋 Evaluation Checklist for Presentation

| Feature Requirement | Status | Description |
|---|---|---|
| Frontend-only React JS | ✅ Complete | Zero backend/database; runs entirely in browser |
| Bootstrap 5 & Bootstrap Icons | ✅ Complete | Uses Bootstrap classes and icon library |
| React Router DOM Navigation | ✅ Complete | Dynamic routing (`/`, `/patients`, `/patients/:id`, `/doctors`, `/appointments`, `/departments`) |
| LocalStorage Persistence | ✅ Complete | Full CRUD operations persist across browser refreshes |
| Reset Demo Data Option | ✅ Complete | Button in topbar with confirmation modal |
| Dashboard Statistics & Charts | ✅ Complete | Live counts, status breakdown bar, department summaries |
| Patients Search & Multi-Filters | ✅ Complete | Filter by search query, gender, and blood group |
| Doctors Profile Cards | ✅ Complete | Cards with status, department, experience, and contact |
| Appointment Booking & Status | ✅ Complete | Form dropdowns, status changer (Pending, Confirmed, Completed, Cancelled) |
| Patient Details & History | ✅ Complete | Route `/patients/:id` with consultation history |
| Form Validation | ✅ Complete | Validates all inputs before submission with visual alerts |
| Responsive Design | ✅ Complete | Desktop, tablet, and mobile optimized |
#   r e a c t - h o s p i t a l - m a n a g e m e n t  
 