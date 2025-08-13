# Betterfly Onboarding - Data Collection Setup

This guide will help you set up the data collection system for tracking user responses in the Betterfly onboarding flow.

## Quick Start

### Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "Betterfly Onboarding Responses" (or any name you prefer)

### Step 2: Set up Google Apps Script
1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete any default code in the editor
3. Copy all the code from `google-apps-script.js` and paste it into the Apps Script editor
4. Click the **Save** button (disk icon)
5. Name the project "Betterfly Data Collector"

### Step 3: Deploy the Web App
1. In Apps Script, click **Deploy → New Deployment**
2. Click the gear icon and select **Web app**
3. Configure the deployment:
   - Description: "Betterfly Data Collection API"
   - Execute as: **Me** (your email)
   - Who has access: **Anyone**
4. Click **Deploy**
5. **IMPORTANT**: Copy the Web App URL (it will look like: `https://script.google.com/macros/s/AKfycb.../exec`)

### Step 4: Configure the Data Collector
1. Open `data-collector.js` in your code editor
2. Find the line that says:
   ```javascript
   GOOGLE_SCRIPT_URL: 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE',
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` with the Web App URL you copied in Step 3
4. Save the file

### Step 5: Test the Integration
1. Open your local server (the one running on port 57977)
2. Navigate to: `http://localhost:57977/src/flows/onboarding/v2/get-started.html`
3. Complete the onboarding flow
4. Check your Google Sheet - you should see the data appear!

## Viewing Collected Data

### Option 1: Direct Google Sheets Access
Simply open your Google Sheet to see all responses in real-time.

### Option 2: Data Export Page
1. Navigate to: `http://localhost:57977/src/flows/onboarding/v2/data-export.html`
2. To embed your sheet:
   - Make your Google Sheet publicly viewable (Share → Anyone with link → Viewer)
   - Copy the Sheet ID from the URL (the part between `/d/` and `/edit`)
   - Paste it in the Data Export page

## Data Collected

The system collects:
- **Session Information**: Unique ID, timestamps, duration
- **User Responses**: All 10 questionnaire answers
- **Profile Data**: Name and phone number (if provided)
- **Feedback**: Ratings and text feedback
- **Metadata**: Browser, platform, screen size, referrer
- **Engagement**: Coins earned, completion status

## Sharing the Prototype

To share with test users:
1. Deploy your site to GitHub Pages or any static hosting service
2. Make sure to update the `GOOGLE_SCRIPT_URL` in `data-collector.js`
3. Share the link to `get-started.html`
4. All responses will automatically appear in your Google Sheet

## Troubleshooting

### Data not appearing in Google Sheet?
1. Check the browser console for errors
2. Verify the Web App URL is correct in `data-collector.js`
3. Make sure the Google Apps Script is deployed (not just saved)
4. Try redeploying the Apps Script with a new version

### "No CORS" warning in console?
This is normal - Google Apps Script doesn't support CORS. The data is still being sent successfully.

### Want to clear test data?
Simply delete the rows in your Google Sheet (keep the header row).

## Privacy Note

Remember to:
- Inform test users that their responses are being collected
- Only collect necessary data
- Secure your Google Sheet appropriately
- Delete test data when no longer needed