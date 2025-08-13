// Google Apps Script Code
// Deploy this as a Web App in Google Apps Script
// 1. Create a new Google Sheet
// 2. Go to Extensions > Apps Script
// 3. Replace the default code with this
// 4. Deploy > New Deployment > Web App
// 5. Set "Execute as" to yourself and "Who has access" to "Anyone"

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Log the request for debugging
    console.log('Received data submission:', {
      sessionId: data.sessionId,
      type: data.submissionType || 'unknown',
      timestamp: new Date().toISOString()
    });
    
    // If this is the first entry, add headers
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Session ID',
        'Submission Type',
        'Timestamp',
        'Start Time',
        'End Time',
        'Duration (seconds)',
        'Health Feeling',
        'Main Concern',
        'Biggest Challenge',
        'Past Experience',
        'Wearable',
        'Motivation',
        'Support Preference',
        'Lifestyle',
        'Success Definition',
        'Commitment',
        'User Name',
        'Phone Number',
        'Feedback Rating',
        'Restart Likelihood',
        'Challenge Interest',
        'Uniqueness Rating',
        'Trust Rating',
        'Expected Recommendations',
        'Pricing Expectation',
        'Feedback Text',
        'Browser',
        'Platform',
        'Screen Width',
        'Screen Height',
        'Referrer',
        'Coins Earned'
      ];
      sheet.appendRow(headers);
    }
    
    // Prepare row data
    const row = [
      data.sessionId || '',
      data.submissionType || 'unknown',
      new Date().toISOString(),
      data.startTime || '',
      data.endTime || '',
      data.duration || '',
      data.q1_healthFeeling || '',
      data.q2_mainConcern || '',
      data.q3_biggestChallenge || '',
      data.q4_pastExperience || '',
      data.q5_wearable || '',
      data.q6_motivation || '',
      data.q7_supportPref || '',
      data.q8_lifestyle || '',
      data.q9_success || '',
      data.q10_commitment || '',
      data.userName || '',
      data.phoneNumber || '',
      data.feedbackRating || '',
      data.restartLikelihood || '',
      data.challengeInterest || '',
      data.uniquenessRating || '',
      data.trustRating || '',
      data.expectedRecommendations || '',
      data.pricingExpectation || '',
      data.feedbackText || '',
      data.browser || '',
      data.platform || '',
      data.screenWidth || '',
      data.screenHeight || '',
      data.referrer || '',
      data.coinsEarned || ''
    ];
    
    // Append the row
    sheet.appendRow(row);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'success',
        'row': sheet.getLastRow()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'error',
        'error': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      'result': 'error',
      'error': 'GET method not supported. Use POST.'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}