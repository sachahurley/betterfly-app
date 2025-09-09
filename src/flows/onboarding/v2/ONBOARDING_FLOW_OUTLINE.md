# 📋 Betterfly V2 Onboarding Flow - Complete Outline

**Last Updated**: August 13, 2025  
**Version**: 2.0  
**Live URL**: https://sachahurley.github.io/betterfly-app/src/flows/onboarding/v2/welcome.html

## 🌟 **Flow Overview**
- **Total Steps**: 23 screens  
- **Estimated Time**: 8-12 minutes  
- **Total Coins Earned**: 130 coins
- **Data Collection**: Health profile, preferences, contact info, comprehensive feedback

---

## 📱 **Complete Step-by-Step Breakdown**

### **SECTION 1: INTRO (3 screens)**

#### **1. Welcome Screen** (`welcome.html`)
- **Content**: 
  - Betterfly mascot icon
  - Betterfly logo
  - Tagline: "Your personalized wellness journey starts here"
- **CTA**: "Get Started"
- **Coins**: None
- **Data Collected**: Session initialized

#### **2. Get Started** (`get-started.html`) 
- **Content**: 
  - Welcome message
  - Value proposition
  - Benefits preview
- **CTA**: "Continue" 
- **Coins**: None
- **Data Collected**: None

#### **3. Expectations** (`expectations.html`)
- **Content**: 
  - Sets expectations for questionnaire
  - Time estimate
  - Privacy assurance
- **CTA**: "Start Questionnaire"
- **Coins**: None
- **Data Collected**: Questionnaire start time

---

### **SECTION 2: HEALTH QUESTIONNAIRE (11 screens)**

#### **4. Q1: Health Feeling** (`q1-health-feeling.html`)
- **Question**: "How are you feeling about your health right now?"
- **Options**: 
  - Struggling
  - Okay
  - Well
  - Thriving
  - Unsure
- **Coins**: 10 coins
- **Data Field**: `q1_healthFeeling`

#### **5. Loading Screen** (`loading.html`)
- **Content**: 
  - 10-second personalization animation
  - "Analyzing your response..."
  - Progress indicator
- **Purpose**: Processing & anticipation
- **Coins**: None
- **Data Collected**: None

#### **6. Q2: Main Concern** (`q2-main-concern.html`) 
- **Question**: "What's your main health concern right now?"
- **Options**: 
  - Low energy
  - Weight management
  - Stress & anxiety
  - Sleep quality
  - Nutrition
  - Fitness level
- **Coins**: 10 coins
- **Data Field**: `q2_mainConcern`

#### **7. Q3: Biggest Challenge** (`q3-biggest-challenge.html`)
- **Question**: "What's your biggest challenge in staying healthy?"
- **Options**: 
  - Not enough time
  - Lack of motivation
  - Don't know what to do
  - Hard to stay consistent
  - Need more support
  - Limited resources
- **Coins**: 10 coins
- **Data Field**: `q3_biggestChallenge`

#### **8. Q4: Past Experience** (`q4-past-experience.html`)
- **Question**: "How successful have you been with wellness apps in the past?"
- **Options**: 
  - Never tried before
  - Tried but failed
  - Some success
  - Very successful
- **Coins**: 10 coins
- **Data Field**: `q4_pastExperience`

#### **9. Q5: Wearable** (`q5-wearable.html`)
- **Question**: "Do you use a fitness tracker or smartwatch?"
- **Options**: 
  - Yes, daily
  - Sometimes
  - Rarely
  - Never
  - Don't own one
- **Coins**: 10 coins
- **Data Field**: `q5_wearable`

#### **10. Q6: Motivation** (`q6-motivation.html`)
- **Question**: "What motivates you most to improve your health?"
- **Options**: 
  - More energy
  - Look better
  - Perform better
  - Live longer
  - Family/loved ones
  - Medical reasons
- **Coins**: 10 coins
- **Data Field**: `q6_motivation`

#### **11. Q7: Support Preference** (`q7-support-preference.html`)
- **Question**: "What type of support do you prefer?"
- **Options**: 
  - Self-guided
  - Community support
  - Personal coach
  - AI assistant
  - Healthcare professional
  - Mix of everything
- **Coins**: 10 coins
- **Data Field**: `q7_supportPref`

#### **12. Q8: Lifestyle** (`q8-lifestyle.html`)
- **Question**: "How would you describe your current lifestyle?"
- **Options**: 
  - Sedentary
  - Lightly active
  - Moderately active
  - Very active
  - Athlete
- **Coins**: 10 coins
- **Data Field**: `q8_lifestyle`

#### **13. Q9: Success Definition** (`q9-success.html`)
- **Question**: "What does success look like for you?"
- **Options**: 
  - More energy
  - Weight loss
  - Less stress
  - Better sleep
  - Stronger body
  - Overall wellness
- **Coins**: 10 coins
- **Data Field**: `q9_success`

#### **14. Q10: Commitment** (`q10-commitment.html`)
- **Question**: "How much time can you realistically commit daily?"
- **Options**: 
  - 5-10 minutes
  - 15-20 minutes
  - 30 minutes
  - 45 minutes
  - 1+ hour
- **Coins**: 10 coins
- **Data Field**: `q10_commitment`

---

### **SECTION 3: REVIEW & TRANSITION (3 screens)**

#### **15. Review** (`review.html`)
- **Content**: 
  - Summary of all 10 responses
  - Edit functionality for each answer
  - Total coins earned: 100
- **CTA**: "Looks Good"
- **Coins**: None (displays total: 100)
- **Data Collected**: Confirmation of responses

#### **16. Challenges Intro** (`challenges-intro.html`)
- **Content**: 
  - Introduction to 5-day challenge system
  - Benefits of challenges
  - Preview of personalized approach
- **CTA**: "Continue"
- **Coins**: None
- **Data Collected**: None

#### **17. Profile Prompt** (`profile-prompt.html`)
- **Content**: 
  - Request to save preferences
  - Benefits of creating account
  - Privacy assurance
- **CTA**: "Save My Profile"
- **Coins**: None
- **Data Collected**: Profile creation intent

---

### **SECTION 4: PROFILE CREATION (3 screens)**

#### **18. Signup Name** (`signup-name.html`)
- **Fields**: 
  - First name (required)
  - Last name (required)
- **Validation**: Both fields required
- **CTA**: "Continue"
- **Coins**: 10 coins
- **Data Fields**: `firstName`, `lastName`

#### **19. Signup Phone** (`signup-phone.html`)
- **Field**: Phone number
- **Format**: (XXX) XXX-XXXX
- **Validation**: Valid phone format
- **CTA**: "Send Code"
- **Coins**: 10 coins
- **Data Field**: `phone`

#### **20. Signup Verification** (`signup-verification.html`)
- **Field**: 6-digit verification code
- **Format**: XXX XXX
- **Validation**: 6 digits required
- **CTA**: "Verify"
- **Coins**: 10 coins
- **Data Field**: `code`

---

### **SECTION 5: COMPLETION & FEEDBACK (3 screens)**

#### **21. Profile Celebration** (`profile-celebration.html`)
- **Content**: 
  - Celebration animation
  - Total coins earned: 130
  - Success message
- **CTA**: "Continue to Feedback"
- **Coins**: Displays total (130)
- **Data Collected**: Profile completion timestamp

#### **22. Feedback Form** (`feedback.html`)
- **Questions (8 total)**:
  
  1. **Overall Experience** (1-5 rating)
     - Poor → Fair → Good → Great → Excellent
     - Data Field: `feedbackRating`
  
  2. **Restart Likelihood** (1-5 rating)
     - "How likely would you be to restart or come back to this app?"
     - Very Unlikely → Unlikely → Maybe → Likely → Very Likely
     - Data Field: `restartLikelihood`
  
  3. **5-Day Challenge Interest** (1-5 rating)
     - "How likely would you be interested in continuing the 5-day challenge?"
     - Not at all → Unlikely → Maybe → Likely → Definitely
     - Data Field: `challengeInterest`
  
  4. **App Uniqueness** (1-5 rating)
     - "How interesting or different do you feel Betterfly is from other well-being apps?"
     - Not Different → Slightly → Somewhat → Very → Extremely Different
     - Data Field: `uniquenessRating`
  
  5. **Trust in Recommendations** (1-5 rating)
     - "How likely are you to trust these recommendations?"
     - Not at all → Unlikely → Maybe → Likely → Completely
     - Data Field: `trustRating`
  
  6. **Work Performance Impact** (1-5 rating) ⭐ NEW
     - "If your employer provided this app to you, how likely is it to improve your work performance?"
     - Very Unlikely → Unlikely → Maybe → Likely → Very Likely
     - Data Field: `workPerformanceRating`
  
  7. **Expected Recommendations** (text, 500 char)
     - "What type of recommendations were you expecting to see?"
     - Data Field: `expectedRecommendations`
  
  8. **Pricing Expectations** (selection)
     - "What would you consider a fair monthly price for an app that meets your expectations?"
     - Options: Free, $1-5, $6-10, $11-20, $21-30, $30+
     - Data Field: `pricingExpectation`
  
  9. **Additional Feedback** (optional text, 1000 char)
     - "Any additional feedback?"
     - Data Field: `feedbackText`

- **CTA**: "Submit Feedback"
- **Coins**: None
- **Submission**: Saves all data to Google Sheets

#### **23. Completion** (`completion.html`)
- **Content**: 
  - Thank you message
  - "You can safely close this session"
  - No further navigation
- **CTA**: None (endpoint)
- **Coins**: None
- **Data Collected**: Session end timestamp

---

## 🎮 **Gamification Elements**

### **Coin System**
- **Total Coins Available**: 130
- **Distribution**:
  - Each question (Q1-Q10): 10 coins
  - Profile creation (3 steps): 30 coins total
- **Animations**: 
  - Coin toast (auto-close 600ms)
  - Celebration toast (tap to dismiss)
  - Coin counter (tappable for explanation)

### **Progress Tracking**
- **Visual Progress Bar**: Shows current step out of total
- **Question Counter**: X of 10 questions
- **Persistent State**: Saves progress if user leaves

---

## 📊 **Data Collection Summary**

### **Health Profile Data**
- Current health feeling
- Main health concern
- Biggest challenge
- Past app experience
- Wearable device usage
- Primary motivation
- Support preference
- Lifestyle activity level
- Success definition
- Time commitment

### **User Information**
- First name
- Last name
- Phone number
- Verification status

### **Business Intelligence**
- Overall experience rating
- User retention likelihood
- Feature interest (5-day challenge)
- Product differentiation perception
- Trust level
- **Work performance impact** (B2B insight)
- Price sensitivity
- Feature expectations
- Open feedback

### **Session Metrics**
- Session ID
- Start time
- End time
- Total duration
- Completion rate
- Coins earned
- Browser/platform info
- Screen dimensions

---

## 🔗 **Technical Details**

### **File Structure**
```
/src/flows/onboarding/v2/
├── *.html (23 screen files)
├── state.js (state management)
├── routes.js (navigation)
├── data-collector.js (Google Sheets integration)
├── components/
│   └── components.js (reusable UI components)
├── styles/
│   └── shared.css (global styles)
└── assets/ (images, icons)
```

### **Data Flow**
1. **Local Storage**: Temporary session data
2. **Session Storage**: Navigation state
3. **Google Apps Script**: Data processing
4. **Google Sheets**: Final data storage

### **Key URLs**
- **Local Test**: http://localhost:9999/src/flows/onboarding/v2/welcome.html
- **Live Version**: https://sachahurley.github.io/betterfly-app/src/flows/onboarding/v2/welcome.html
- **Direct Feedback**: https://sachahurley.github.io/betterfly-app/src/flows/onboarding/v2/feedback.html

---

## 📈 **Analytics & Testing**

### **Key Metrics to Track**
- Completion rate per step
- Drop-off points
- Average time per question
- Total session duration
- Feedback scores distribution
- Work performance correlation
- Price point preferences

### **A/B Testing Opportunities**
- Question order
- Coin reward amounts
- Loading screen duration
- CTA button text
- Feedback question wording

---

## 🚀 **Future Enhancements**
- Skip option for returning users
- Social sharing of achievements
- Email capture option
- Integration with main app
- Multi-language support
- Accessibility improvements
- Backend API integration

---

*This document represents the current state of the V2 onboarding flow as of August 13, 2025.*