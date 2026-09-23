# Running this project

```
npm install
npm run dev      # local dev server at http://localhost:3000
npm run build    # production build
npm start        # run the production build
```

Deploy it anywhere that supports Next.js — Vercel (easiest, free tier), or
any Node hosting. It's a standard Next.js 14 App Router project, no special
config needed.

---

# Connect the contact form to Google Sheets (5 minutes)

The contact form on `/contact` (in `components/ContactForm.js`) sends
`name`, `mobile` and `service` to a Google Apps Script "Web App" URL, which
writes each submission as a new row in a Google Sheet. This is free and
needs no server of your own.

## Step 1 — Create the sheet
1. Go to sheets.google.com and create a new blank spreadsheet.
2. Name it something like **Vyan Digital — Enquiries**.
3. In row 1, add headers: `Timestamp`, `Name`, `Mobile`, `Service`.

## Step 2 — Add the script
1. In the sheet, click **Extensions → Apps Script**.
2. Delete any code in the editor and paste this:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.name,
    data.mobile,
    data.service
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Click **Save** (disk icon), name the project e.g. "Vyan Contact Form".

## Step 3 — Deploy as a Web App
1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**.
5. Google will ask you to authorize — click **Authorize access**, choose your
   account, and click **Advanced → Go to project (unsafe) → Allow**
   (this warning appears only because it's your own unpublished script).
6. Copy the **Web app URL** shown — it looks like:
   `https://script.google.com/macros/s/XXXXXXXXXXXX/exec`

## Step 4 — Connect it to the website
1. Open `components/ContactForm.js`.
2. Find this line near the top:
   ```javascript
   const GOOGLE_SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
   ```
3. Replace the placeholder with the URL you copied in Step 3.
4. Save, rebuild (`npm run build`) and redeploy.

That's it — every form submission will now appear as a new row in your
Google Sheet, with a timestamp.

## Notes
- If you ever change the script's code, you must create a **new deployment**
  (Deploy → Manage deployments → Edit → New version) for changes to go live.
- To get an email alert on every new lead, add `MailApp.sendEmail(...)`
  inside the `doPost` function, or connect the sheet to a Zapier/Make
  automation.
