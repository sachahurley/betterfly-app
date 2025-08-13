// Google Apps Script - Header Fix Version
// This version will update headers even if sheet has existing data

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Log the request for debugging
    console.log('Received data submission:', {
      sessionId: data.sessionId,
      type: data.submissionType || 'unknown',
      timestamp: new Date().toISOString(),
      feedbackData: {
        feedbackRating: data.feedbackRating,
        restartLikelihood: data.restartLikelihood,
        challengeInterest: data.challengeInterest,
        uniquenessRating: data.uniquenessRating,
        trustRating: data.trustRating
      }
    });
    
    // FORCE UPDATE HEADERS - Check if headers need updating
    const currentHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const correctHeaders = [
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
      'Feedback Rating',       // Column R
      'Restart Likelihood',    // Column S  
      'Challenge Interest',    // Column T
      'Uniqueness Rating',     // Column U
      'Trust Rating',          // Column V
      'Work Performance Rating', // Column W
      'Expected Recommendations', // Column X
      'Pricing Expectation',   // Column Y
      'Feedback Text',         // Column Z
      'Browser',
      'Platform',
      'Screen Width',
      'Screen Height',
      'Referrer',
      'Coins Earned'
    ];
    
    // Update headers if they don't match or if sheet is empty
    if (sheet.getLastRow() === 0 || JSON.stringify(currentHeaders) !== JSON.stringify(correctHeaders)) {
      console.log('Updating headers...');
      sheet.getRange(1, 1, 1, correctHeaders.length).setValues([correctHeaders]);
      console.log('Headers updated successfully');
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
      data.feedbackRating || '',        // Column R
      data.restartLikelihood || '',     // Column S
      data.challengeInterest || '',     // Column T
      data.uniquenessRating || '',      // Column U
      data.trustRating || '',           // Column V
      data.workPerformanceRating || '', // Column W
      data.expectedRecommendations || '', // Column X
      data.pricingExpectation || '',    // Column Y
      data.feedbackText || '',          // Column Z
      data.browser || '',
      data.platform || '',
      data.screenWidth || '',
      data.screenHeight || '',
      data.referrer || '',
      data.coinsEarned || ''
    ];
    
    // Log what we're writing to feedback columns
    console.log('Writing feedback data to columns R-Z:', {
      R_feedbackRating: data.feedbackRating,
      S_restartLikelihood: data.restartLikelihood,
      T_challengeInterest: data.challengeInterest,
      U_uniquenessRating: data.uniquenessRating,
      V_trustRating: data.trustRating,
      W_workPerformanceRating: data.workPerformanceRating,
      X_expectedRecommendations: data.expectedRecommendations,
      Y_pricingExpectation: data.pricingExpectation,
      Z_feedbackText: data.feedbackText
    });
    
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

// Helper function to manually update headers if needed
function updateHeaders() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const correctHeaders = [
    'Session ID', 'Submission Type', 'Timestamp', 'Start Time', 'End Time', 'Duration (seconds)',
    'Health Feeling', 'Main Concern', 'Biggest Challenge', 'Past Experience', 'Wearable', 
    'Motivation', 'Support Preference', 'Lifestyle', 'Success Definition', 'Commitment',
    'User Name', 'Phone Number', 'Feedback Rating', 'Restart Likelihood', 'Challenge Interest',
    'Uniqueness Rating', 'Trust Rating', 'Work Performance Rating', 'Expected Recommendations', 
    'Pricing Expectation', 'Feedback Text', 'Browser', 'Platform', 'Screen Width', 'Screen Height', 
    'Referrer', 'Coins Earned'
  ];
  sheet.getRange(1, 1, 1, correctHeaders.length).setValues([correctHeaders]);
  console.log('Headers updated manually');
}