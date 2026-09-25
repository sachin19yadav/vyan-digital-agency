# Google Sheets Integration Guide for Vyan Digital Agency

The contact form on `/contact` (in `components/ContactForm.js`) sends `name`, `mobile`, and `service` directly to a Google Apps Script Web App attached to your Google Sheet **`Vyan Digital - Enq`**.

---

## Why Data May Not Have Appeared (Root Cause & Fix)

When testing your current Web App URL, Google responded with:
> `302 Redirect to accounts.google.com (Google Sign-In)`  
> *"Sorry, unable to open the file at present."*

This happens because in Google Apps Script, the deployment permission **"Who has access"** is currently set to **"Only myself"** (or requires a Google login). Because website visitors don't have your Google login session, Google blocks the submission.

Follow the 3-minute fix below to resolve this:

---

## Step 1: Open Your Sheet & Apps Script
1. Open your Google Spreadsheet: **`Vyan Digital - Enq`** (sheets.google.com).
2. In the top menu, click **Extensions → Apps Script**.

---

## Step 2: Paste the Robust Script
Delete everything in the script editor and paste this improved, production-ready script:

```javascript
// Test if the script is reachable from any browser:
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "success",
      message: "Vyan Digital Agency Form Web App is live and ready!"
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Handles incoming contact form enquiries:
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Prevents simultaneous submission conflicts

    var SPREADSHEET_ID = "1Un3cTHkAWHaEP-DNHbhIEsIUT1sGpizwI0TPGDmObRY";
    var sheet;
    try {
      sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    } catch (err) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    }
    
    // Automatically create header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Mobile", "Service"]);
    }

    var name = "";
    var mobile = "";
    var service = "";

    // Parse incoming data safely (supports JSON and form parameters)
    if (e && e.postData && e.postData.contents) {
      try {
        var data = JSON.parse(e.postData.contents);
        name = data.name || "";
        mobile = data.mobile || "";
        service = data.service || "";
      } catch (err) {
        name = (e.parameter && e.parameter.name) || "";
        mobile = (e.parameter && e.parameter.mobile) || "";
        service = (e.parameter && e.parameter.service) || "";
      }
    } else if (e && e.parameter) {
      name = e.parameter.name || "";
      mobile = e.parameter.mobile || "";
      service = e.parameter.service || "";
    }

    // Append new lead row
    sheet.appendRow([
      new Date(),
      name,
      mobile,
      service
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", name: name }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

3. Click **Save** (disk icon).

---

## Step 3: Deploy with "Who has access: Anyone" (CRITICAL)

1. In the top-right of Apps Script, click **Deploy → Manage deployments**.
2. Click the **Pencil (Edit)** icon next to your active Web App deployment.
3. Set the following settings:
   - **Version:** Select **New version** (Always select New version whenever code is saved).
   - **Execute as:** `Me (your Google account email)`
   - **Who has access:** Select **`Anyone`**  
     *(⚠️ Do NOT choose "Only myself" and do NOT choose "Anyone with a Google account" — it MUST be "Anyone").*
4. Click **Deploy**.
5. If Google asks to authorize:
   - Click **Authorize access** → select your Google account.
   - Click **Advanced** (bottom left).
   - Click **Go to Vyan Contact Form (unsafe)**.
   - Click **Allow**.
6. Copy the **Web app URL** (`https://script.google.com/macros/s/.../exec`).

---

## Step 4: Quick 5-Second Test
Paste the Web app URL directly into a **Private / Incognito window** in your browser:
- If it displays:
  `{"status":"success","message":"Vyan Digital Agency Form Web App is live and ready!"}`
  👉 **It is 100% working and ready to receive leads!**
- If it asks you to sign in to Google:
  👉 Go back to Step 3 and make sure **Who has access** is set to **Anyone**.

---

## Step 5: Update URL in Website (if changed)
If the URL is new:
1. Open `components/ContactForm.js`.
2. Update line 7 with your Web App URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = "YOUR_NEW_URL_HERE";
   ```
3. Test submitting the form on `/contact` — the lead will appear immediately in **`Vyan Digital - Enq`**!
