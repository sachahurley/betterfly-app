// Data Collection Module for Betterfly Onboarding
// Handles session management and data submission to Google Sheets

const DataCollector = {
    // IMPORTANT: Replace this with your Google Apps Script Web App URL
    // Note: In JavaScript, string values must be wrapped in quotes.
    GOOGLE_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbxTE-zfrFqwcu4JxJDd44aZtFDf94jqF43btLT7SvwcrrbbGeYSYeUxl-5fDzD8IpXBbA/exec",
    
    // Generate a unique session ID
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },
    
    // Initialize session
    initSession() {
        if (!localStorage.getItem('betterfly_session_id')) {
            const sessionId = this.generateSessionId();
            const sessionData = {
                sessionId: sessionId,
                startTime: new Date().toISOString(),
                browser: navigator.userAgent,
                platform: navigator.platform,
                screenWidth: window.screen.width,
                screenHeight: window.screen.height,
                referrer: document.referrer || 'direct'
            };
            localStorage.setItem('betterfly_session_id', sessionId);
            localStorage.setItem('betterfly_session_data', JSON.stringify(sessionData));
        }
        return localStorage.getItem('betterfly_session_id');
    },
    
    // Get session data
    getSessionData() {
        const sessionData = localStorage.getItem('betterfly_session_data');
        return sessionData ? JSON.parse(sessionData) : {};
    },
    
    // Calculate duration in seconds
    calculateDuration(startTime) {
        const start = new Date(startTime);
        const end = new Date();
        return Math.floor((end - start) / 1000);
    },
    
    // Prepare full data payload
    prepareDataPayload() {
        const sessionData = this.getSessionData();
        const onboardingData = OnboardingState.data;
        const endTime = new Date().toISOString();
        const duration = this.calculateDuration(sessionData.startTime);
        
        return {
            ...sessionData,
            ...onboardingData,
            endTime: endTime,
            duration: duration,
            coinsEarned: onboardingData.totalCoins || 0
        };
    },
    
    // Submit data to Google Sheets
    async submitToGoogleSheets(additionalData = {}, isIntermediate = false) {
        try {
            const payload = {
                ...this.prepareDataPayload(),
                ...additionalData,
                submissionType: isIntermediate ? 'intermediate' : 'final'
            };
            
            console.log('📊 Submitting data to Google Sheets:', {
                sessionId: payload.sessionId,
                type: payload.submissionType,
                questionsAnswered: Object.keys(payload).filter(k => k.startsWith('q')).length,
                url: this.GOOGLE_SCRIPT_URL.substring(0, 50) + '...'
            });
            
            // Log the full payload for debugging feedback issues
            console.log('📋 Full payload being sent:', JSON.stringify(payload, null, 2));
            
            // Show loading state if available
            if (window.showLoadingState && !isIntermediate) {
                window.showLoadingState(true);
            }
            
            const response = await fetch(this.GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Google Apps Script doesn't support CORS
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
            
            // Since we're using no-cors, we won't get a readable response
            // We'll assume success if no error was thrown
            console.log('✅ Data submission completed', {
                sessionId: payload.sessionId,
                timestamp: new Date().toISOString()
            });
            
            // Hide loading state if available
            if (window.showLoadingState && !isIntermediate) {
                window.showLoadingState(false);
            }
            
            return { success: true };
            
        } catch (error) {
            console.error('❌ Error submitting data:', error);
            console.error('Failed payload:', additionalData);
            
            // Hide loading state if available
            if (window.showLoadingState && !isIntermediate) {
                window.showLoadingState(false);
            }
            
            // Store failed submission locally for retry
            if (!isIntermediate) {
                this.storeFailedSubmission(payload);
            }
            
            return { success: false, error: error.message };
        }
    },
    
    // Submit intermediate progress (silent, non-blocking)
    submitIntermediateProgress() {
        console.log('📝 Saving intermediate progress...');
        this.submitToGoogleSheets({}, true);
    },
    
    // Store failed submissions for potential retry
    storeFailedSubmission(data) {
        const failedSubmissions = JSON.parse(localStorage.getItem('betterfly_failed_submissions') || '[]');
        failedSubmissions.push({
            timestamp: new Date().toISOString(),
            data: data
        });
        localStorage.setItem('betterfly_failed_submissions', JSON.stringify(failedSubmissions));
    },
    
    // Retry failed submissions
    async retryFailedSubmissions() {
        const failedSubmissions = JSON.parse(localStorage.getItem('betterfly_failed_submissions') || '[]');
        
        if (failedSubmissions.length === 0) {
            return;
        }
        
        const retryPromises = failedSubmissions.map(submission => 
            this.submitToGoogleSheets(submission.data)
        );
        
        try {
            await Promise.all(retryPromises);
            // Clear failed submissions if successful
            localStorage.removeItem('betterfly_failed_submissions');
        } catch (error) {
            console.error('Error retrying submissions:', error);
        }
    },
    
    // Clear session data (for testing)
    clearSession() {
        localStorage.removeItem('betterfly_session_id');
        localStorage.removeItem('betterfly_session_data');
        localStorage.removeItem('betterfly_failed_submissions');
    }
};

// Initialize session when script loads
document.addEventListener('DOMContentLoaded', () => {
    const sessionId = DataCollector.initSession();
    console.log('🚀 Betterfly Data Collection Initialized', {
        sessionId: sessionId,
        timestamp: new Date().toISOString(),
        url: window.location.pathname
    });
});