// Google Apps Script Code - WITH DEBUG LOGGING
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
    
    // ENHANCED LOGGING - Log all received data
    console.log('=== RECEIVED FEEDBACK DATA ===');
    console.log('Session ID:', data.sessionId);
    console.log('Feedback Rating:', data.feedbackRating);
    console.log('Restart Likelihood:', data.restartLikelihood);
    console.log('Challenge Interest:', data.challengeInterest);
    console.log('Uniqueness Rating:', data.uniquenessRating);
    console.log('Trust Rating:', data.trustRating);
    console.log('Expected Recommendations:', data.expectedRecommendations);
    console.log('Pricing Expectation:', data.pricingExpectation);
    console.log('Feedback Text:', data.feedbackText);
    console.log('=== END FEEDBACK DATA ===');
    
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
      console.log('Headers added to sheet');
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
      data.expectedRecommendations || '', // Column W
      data.pricingExpectation || '',    // Column X
      data.feedbackText || '',          // Column Y
      data.browser || '',
      data.platform || '',
      data.screenWidth || '',
      data.screenHeight || '',
      data.referrer || '',
      data.coinsEarned || ''
    ];
    
    // Log what we're about to write
    console.log('About to append row:', row);
    console.log('Feedback data being written:');
    console.log('  - Column R (Feedback Rating):', data.feedbackRating);
    console.log('  - Column S (Restart Likelihood):', data.restartLikelihood);
    console.log('  - Column T (Challenge Interest):', data.challengeInterest);
    console.log('  - Column U (Uniqueness Rating):', data.uniquenessRating);
    console.log('  - Column V (Trust Rating):', data.trustRating);
    console.log('  - Column W (Expected Recommendations):', data.expectedRecommendations);
    console.log('  - Column X (Pricing Expectation):', data.pricingExpectation);
    console.log('  - Column Y (Feedback Text):', data.feedbackText);
    
    // Append the row
    sheet.appendRow(row);
    console.log('Row appended successfully. New row number:', sheet.getLastRow());
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'success',
        'row': sheet.getLastRow(),
        'feedback_received': {
          feedbackRating: data.feedbackRating,
          restartLikelihood: data.restartLikelihood,
          challengeInterest: data.challengeInterest,
          uniquenessRating: data.uniquenessRating,
          trustRating: data.trustRating
        }
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('ERROR in doPost:', error);
    console.error('Error details:', error.toString());
    
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