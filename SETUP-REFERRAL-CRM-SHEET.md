# All-in-One Google Sheets Setup Guide (`Vyan Digital - Enq`)

Yes! You can keep your existing **`Vyan Digital - Enq`** spreadsheet and store **both** Contact Form enquiries and Referral CRM data in the same file across separate tabs:

| Tab Name in Google Sheet | What Gets Stored Here | Source |
| :--- | :--- | :--- |
| **`Sheet1`** (or `Contact_Enquiries`) | Contact form leads (`Timestamp`, `Name`, `Mobile`, `Service`) | Website `/contact` form |
| **`Referral_Partners`** | All registered referral partners & their unique codes | `/portal` registration |
| **`Referrals_Log`** | Referral conversions & tree (`Referee`, `Referrer`, `Reward`, `Payout Status`) | When someone joins via a referral code |

The script automatically creates and formats the **`Referral_Partners`** and **`Referrals_Log`** tabs without touching your existing contact leads!

---

## 3-Minute Setup in `Vyan Digital - Enq`

### Step 1: Open Apps Script in `Vyan Digital - Enq`
1. Open your spreadsheet **`Vyan Digital - Enq`** at [sheets.google.com](https://sheets.google.com).
2. In the top menu bar, click **Extensions ➔ Apps Script**.

---

### Step 2: Replace Script with this All-in-One Code
Delete whatever is in the Apps Script editor, and paste this production script:

```javascript
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    message: "Vyan Digital Agency (Contact Form + Referral CRM) Web App is active!"
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var ss;
    try {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    } catch (err) {}
    if (!ss) {
      ss = SpreadsheetApp.openById("1Un3cTHkAWHaEP-DNHbhIEsIUT1sGpizwI0TPGDmObRY");
    }

    // Parse incoming payload safely
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

    // ========================================================
    // CASE 1: REFERRAL CRM DATA (action parameter present)
    // ========================================================
    if (payload.action) {
      var action = payload.action;
      var data = payload.data || {};

      // Tab 2: Referral_Partners
      var partnersSheet = ss.getSheetByName("Referral_Partners");
      if (!partnersSheet) {
        partnersSheet = ss.insertSheet("Referral_Partners");
        partnersSheet.appendRow([
          "Timestamp",
          "Partner ID",
          "Name",
          "Mobile",
          "City",
          "UPI ID",
          "Referral Code",
          "Referred By"
        ]);
        partnersSheet.getRange(1, 1, 1, 8).setFontWeight("bold").setBackground("#D9A441");
      }

      // Tab 3: Referrals_Log
      var referralsSheet = ss.getSheetByName("Referrals_Log");
      if (!referralsSheet) {
        referralsSheet = ss.insertSheet("Referrals_Log");
        referralsSheet.appendRow([
          "Timestamp",
          "Referrer Code",
          "Referrer Name",
          "Referee Name",
          "Referee Mobile",
          "Status",
          "Reward (INR)",
          "Payout Status",
          "Transaction Ref"
        ]);
        referralsSheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#D9A441");
      }

      // Partner Registration Event
      if (action === "REGISTER_PARTNER") {
        var p = data.partner;
        partnersSheet.appendRow([
          new Date(),
          p.id,
          p.name,
          p.mobile,
          p.city,
          p.upiId || "",
          p.referralCode,
          p.referredBy
        ]);

        // If they joined using another partner's referral code:
        if (data.referral) {
          var r = data.referral;
          referralsSheet.appendRow([
            new Date(),
            r.referrerCode,
            r.referrerName,
            r.refereeName,
            r.refereeMobile,
            r.status,
            r.reward,
            r.payoutStatus,
            r.transactionRef || ""
          ]);
        }
      }

      // Payout / Status Update Event
      if (action === "UPDATE_REFERRAL_STATUS") {
        var r = data.referral;
        referralsSheet.appendRow([
          new Date(),
          r.referrerCode,
          (data.partner ? data.partner.name : ""),
          r.refereeName,
          r.refereeMobile,
          r.status + " (UPDATED)",
          r.reward,
          r.payoutStatus,
          r.transactionRef || ""
        ]);
      }

      // Bulk Sync Event
      if (action === "SYNC_ALL") {
        if (data.partners && data.partners.length > 0) {
          data.partners.forEach(function(p) {
            partnersSheet.appendRow([
              new Date(),
              p.id,
              p.name,
              p.mobile,
              p.city,
              p.upiId || "",
              p.referralCode,
              p.referredBy
            ]);
          });
        }
        if (data.referrals && data.referrals.length > 0) {
          data.referrals.forEach(function(r) {
            referralsSheet.appendRow([
              new Date(),
              r.referrerCode,
              r.referrerName,
              r.refereeName,
              r.refereeMobile,
              r.status,
              r.reward,
              r.payoutStatus,
              r.transactionRef || ""
            ]);
          });
        }
      }

      return ContentService.createTextOutput(JSON.stringify({ result: "success", type: "crm" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // ========================================================
    // CASE 2: WEBSITE CONTACT FORM LEAD (Stores into Sheet1)
    // ========================================================
    var contactSheet = ss.getSheetByName("Sheet1") || ss.getSheetByName("Contact_Enquiries") || ss.getSheets()[0];
    if (contactSheet.getLastRow() === 0) {
      contactSheet.appendRow(["Timestamp", "Name", "Mobile", "Service"]);
      contactSheet.getRange(1, 1, 1, 4).setFontWeight("bold").setBackground("#D9A441");
    }

    var name = payload.name || "";
    var mobile = payload.mobile || "";
    var service = payload.service || "";

    contactSheet.appendRow([
      new Date(),
      name,
      mobile,
      service
    ]);

    return ContentService.createTextOutput(JSON.stringify({ result: "success", type: "contact_enquiry", name: name }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

3. Click **Save** (disk icon).

---

### Step 3: Deploy as Web App with "Anyone" Access (Important)
1. In the top-right corner of Apps Script, click **Deploy ➔ Manage deployments** (or **New deployment**).
2. Click the **Pencil (Edit)** icon next to the active deployment (or create new Web app).
3. Set:
   - **Version:** `New version`
   - **Execute as:** `Me (your Google account)`
   - **Who has access:** `Anyone` *(Must be "Anyone")*
4. Click **Deploy**.
5. Copy the **Web App URL** (`https://script.google.com/macros/s/.../exec`).

---

### Step 4: Paste in Admin CRM
1. Go to your Admin Dashboard at [`/admin`](https://www.vyandigitalagency.com/admin) (PIN: `vyan@2026`).
2. Click the **Google Sheet Sync** tab.
3. Paste the URL into the field and click **Save Web App URL**.
4. Click **Push All Data to Google Sheet**.
5. Open your spreadsheet **`Vyan Digital - Enq`**:
   - `Sheet1` holds your contact enquiries.
   - `Referral_Partners` holds all referral users.
   - `Referrals_Log` holds who referred whom and commissions.
