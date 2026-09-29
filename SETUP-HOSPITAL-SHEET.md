# Google Sheet Setup Guide for Aarogya Care Hospital Web App

This guide explains how to connect your **Hospital Management Web Application** (`/hospital`) to your Google Sheet so that all **Patients, Staff Profiles, Prescriptions, Duty Shifts, and Hospital Bills** automatically save to and load from Google Sheets!

---

## 3-Minute Setup

### Step 1: Open Google Sheets
1. Go to [sheets.google.com](https://sheets.google.com) and open your spreadsheet (e.g. **`Vyan Digital - Enq`** or create a new one named **`Aarogya Hospital CRM`**).
2. In the top menu, click **Extensions ➔ Apps Script**.

---

### Step 2: Paste the Hospital Google Apps Script Code
Delete any existing code or create a new file named `HospitalApp.gs`, and paste this complete code:

```javascript
// Handles GET requests (fetch stored hospital data)
function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var action = (e && e.parameter && e.parameter.action) || "";

  if (action === "HOSPITAL_GET_DATA" || !action) {
    var patientsSheet = ss.getSheetByName("Hospital_Patients");
    var staffSheet = ss.getSheetByName("Hospital_Staff");
    var prescriptionsSheet = ss.getSheetByName("Hospital_Prescriptions");
    var billingSheet = ss.getSheetByName("Hospital_Billing");
    var appointmentsSheet = ss.getSheetByName("Hospital_Appointments");

    var patients = readSheetRows(patientsSheet);
    var staff = readSheetRows(staffSheet);
    var prescriptions = readSheetRows(prescriptionsSheet);
    var bills = readSheetRows(billingSheet);
    var appointments = readSheetRows(appointmentsSheet);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Hospital records retrieved successfully",
      patientsCount: patients.length,
      data: {
        patients: patients,
        staff: staff,
        prescriptions: prescriptions,
        bills: bills,
        appointments: appointments
      }
    })).setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    message: "Aarogya Hospital Web App API is Active"
  })).setMimeType(ContentService.MimeType.JSON);
}

// Handles POST requests (syncing hospital data from web app)
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(15000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var payload = {};

    if (e && e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (err) {
        payload = e.parameter || {};
      }
    } else if (e && e.parameter) {
      payload = e.parameter;
    }

    var action = payload.action || "HOSPITAL_SYNC_ALL";
    var hospitalData = payload.hospitalData || payload.data || {};

    // 1. Tab: Hospital_Patients
    if (hospitalData.patients && hospitalData.patients.length > 0) {
      var patSheet = getOrCreateSheet(ss, "Hospital_Patients", [
        "Patient ID", "UHID", "Name", "Age", "Gender", "Mobile", "Admission Type",
        "Admission Date", "Status", "Floor", "Room / Bed", "Primary Doctor",
        "Attending Nurse", "Diagnosis", "Blood Group", "Room Charge (₹/Day)"
      ], "#0D9488");

      patSheet.clearContents();
      patSheet.appendRow([
        "Patient ID", "UHID", "Name", "Age", "Gender", "Mobile", "Admission Type",
        "Admission Date", "Status", "Floor", "Room / Bed", "Primary Doctor",
        "Attending Nurse", "Diagnosis", "Blood Group", "Room Charge (₹/Day)"
      ]);

      hospitalData.patients.forEach(function (p) {
        patSheet.appendRow([
          p.id || "",
          p.uhid || "",
          p.name || "",
          p.age || "",
          p.gender || "",
          p.mobile || "",
          p.admissionType || "",
          p.admissionDate || "",
          p.status || "",
          p.floor || "",
          (p.roomNo || "") + " (" + (p.bedNo || "") + ")",
          p.primaryDoctorName || "",
          p.attendingNurseName || "",
          p.diagnosis || "",
          p.bloodGroup || "",
          p.roomChargePerDay || 0
        ]);
      });
    }

    // 2. Tab: Hospital_Staff
    if (hospitalData.staff && hospitalData.staff.length > 0) {
      var staffSheet = getOrCreateSheet(ss, "Hospital_Staff", [
        "Staff ID", "Name", "Role", "Designation", "Department",
        "Qualification", "Mobile", "Email", "Shift", "Status", "Room / Ward"
      ], "#0284C7");

      staffSheet.clearContents();
      staffSheet.appendRow([
        "Staff ID", "Name", "Role", "Designation", "Department",
        "Qualification", "Mobile", "Email", "Shift", "Status", "Room / Ward"
      ]);

      hospitalData.staff.forEach(function (s) {
        staffSheet.appendRow([
          s.id || "",
          s.name || "",
          s.role || "",
          s.designation || "",
          s.department || "",
          s.qualification || "",
          s.mobile || "",
          s.email || "",
          s.shift || "",
          s.status || "",
          s.room || s.assignedFloor || ""
        ]);
      });
    }

    // 3. Tab: Hospital_Prescriptions
    if (hospitalData.prescriptions && hospitalData.prescriptions.length > 0) {
      var rxSheet = getOrCreateSheet(ss, "Hospital_Prescriptions", [
        "Prescription ID", "Date", "Patient Name", "Prescribing Doctor",
        "Diagnosis", "Medicine Name", "Dosage", "Frequency", "Duration", "Status", "Given By / Time"
      ], "#4F46E5");

      rxSheet.clearContents();
      rxSheet.appendRow([
        "Prescription ID", "Date", "Patient Name", "Prescribing Doctor",
        "Diagnosis", "Medicine Name", "Dosage", "Frequency", "Duration", "Status", "Given By / Time"
      ]);

      hospitalData.prescriptions.forEach(function (rx) {
        if (rx.medicines && rx.medicines.length > 0) {
          rx.medicines.forEach(function (med) {
            rxSheet.appendRow([
              rx.id || "",
              rx.date || "",
              rx.patientName || "",
              rx.doctorName || "",
              rx.diagnosis || "",
              med.name || "",
              med.dosage || "",
              med.frequency || "",
              med.duration || "",
              med.status || "",
              (med.lastGivenBy || "") + " " + (med.lastGivenAt || "")
            ]);
          });
        }
      });
    }

    // 4. Tab: Hospital_Billing
    if (hospitalData.bills && hospitalData.bills.length > 0) {
      var billSheet = getOrCreateSheet(ss, "Hospital_Billing", [
        "Bill No", "Date", "Patient Name", "Room / Ward", "Doctor",
        "Subtotal (₹)", "Discount (₹)", "Total (₹)", "Paid (₹)", "Balance (₹)",
        "Status", "Payment Mode", "Cashier"
      ], "#16A34A");

      billSheet.clearContents();
      billSheet.appendRow([
        "Bill No", "Date", "Patient Name", "Room / Ward", "Doctor",
        "Subtotal (₹)", "Discount (₹)", "Total (₹)", "Paid (₹)", "Balance (₹)",
        "Status", "Payment Mode", "Cashier"
      ]);

      hospitalData.bills.forEach(function (b) {
        billSheet.appendRow([
          b.billNumber || b.id || "",
          b.billDate || "",
          b.patientName || "",
          b.roomDetails || "",
          b.doctorName || "",
          b.subtotal || 0,
          b.discount || 0,
          b.total || 0,
          b.paid || 0,
          b.balance || 0,
          b.status || "",
          b.paymentMode || "",
          b.cashier || ""
        ]);
      });
    }

    // 5. Tab: Hospital_Appointments (Day-wise & Date-wise OPD Tokens)
    if (hospitalData.appointments && hospitalData.appointments.length > 0) {
      var aptSheet = getOrCreateSheet(ss, "Hospital_Appointments", [
        "Appointment ID", "Token #", "Date", "Day", "Time Slot", "Patient Name",
        "Age", "Gender", "Mobile", "City", "Assigned Doctor", "Department",
        "Chief Problem", "Fee (₹)", "Payment Status", "Status", "Booked At"
      ], "#0D9488");

      aptSheet.clearContents();
      aptSheet.appendRow([
        "Appointment ID", "Token #", "Date", "Day", "Time Slot", "Patient Name",
        "Age", "Gender", "Mobile", "City", "Assigned Doctor", "Department",
        "Chief Problem", "Fee (₹)", "Payment Status", "Status", "Booked At"
      ]);

      hospitalData.appointments.forEach(function (apt) {
        aptSheet.appendRow([
          apt.id || "",
          apt.tokenNumber || "",
          apt.appointmentDate || "",
          apt.dayOfWeek || "",
          apt.timeSlot || "",
          apt.patientName || "",
          apt.age || "",
          apt.gender || "",
          apt.mobile || "",
          apt.city || "",
          apt.doctorName || "",
          apt.department || "",
          apt.chiefComplaint || "",
          apt.consultationFee || 0,
          apt.paymentStatus || "",
          apt.status || "",
          apt.bookedAt || ""
        ]);
      });
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Hospital records successfully updated across all Google Sheet tabs!",
      timestamp: new Date()
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Helper: Create sheet with header and styling if not present
function getOrCreateSheet(ss, sheetName, headers, headerBg) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground(headerBg).setFontColor("#ffffff");
  }
  return sheet;
}

// Helper: Read rows into objects
function readSheetRows(sheet) {
  if (!sheet || sheet.getLastRow() <= 1) return [];
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var rows = [];
  for (var i = 1; i < data.length; i++) {
    var row = {};
    for (var j = 0; j < headers.length; j++) {
      row[headers[j]] = data[i][j];
    }
    rows.push(row);
  }
  return rows;
}
```

3. Click **Save** (disk icon).

---

### Step 3: Deploy as Web App ("Who has access: Anyone")
1. Click **Deploy ➔ New deployment** (or **Manage deployments ➔ Edit**).
2. Type: **Web app**.
3. Set:
   - **Execute as:** `Me` (your Google Account)
   - **Who has access:** **`Anyone`** (Required)
4. Click **Deploy**.
5. Copy the **Web App URL** (`https://script.google.com/macros/s/.../exec`).

---

### Step 4: Paste into the Hospital Web App
1. Open `http://localhost:3000/hospital` in your browser.
2. Click the **☁️ Google Sheet Sync** tab in the navigation bar.
3. Paste your Web App URL into the box.
4. Click **"Push All Records to Google Sheet"**!
5. Open your spreadsheet — all 4 tabs (`Hospital_Patients`, `Hospital_Staff`, `Hospital_Prescriptions`, `Hospital_Billing`) will be filled with clean records!
