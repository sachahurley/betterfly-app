# 📋 Betterfly V1 Onboarding Flow - Complete Outline

**Version**: 1.0  
**Status**: Legacy (replaced by V2)  
**Location**: `/src/flows/onboarding/v1/`

## 🌟 **Flow Overview**
- **Total Steps**: 8 screens
- **Estimated Time**: 3-5 minutes  
- **Data Collection**: Basic preferences, time commitment, interests
- **Visual Style**: Gradient green background, card-based selections

---

## 📱 **Complete Step-by-Step Breakdown**

### **1. Welcome Screen** (`welcome.html`)
- **Content**: 
  - Betterfly butterfly character icon
  - "Welcome to Betterfly" title
  - Subtitle: "Your personalized path to better health starts here"
- **CTA**: "Get Started"
- **Design**: Full-screen gradient background (light to bright green)
- **Navigation**: → questionnaire.html

---

### **2. Question 1: Health Improvement Goal** (`questionnaire.html`)
- **Question**: "What's one thing you want to improve about your health right now?"
- **Subtitle**: "Select all that apply to personalize your experience. You can change these at a later time."
- **Input Type**: Text input field with placeholder
- **Options**: Free text entry
- **CTA**: "Continue"
- **Navigation**: 
  - Back: → welcome.html
  - Forward: → questionnaire-2.html

---

### **3. Question 2: Blockers/Challenges** (`questionnaire-2.html`)
- **Question**: "What's getting in the way of your goals?"
- **Subtitle**: "Select all that apply to personalize your experience. You can change these at a later time."
- **Options** (multi-select):
  - 🕐 **Time** - Clock icon
  - ⚡ **Energy** - Zap icon
  - 🎯 **Motivation** - Target icon
  - 📖 **Knowledge** - Book icon
  - ⋯ **Other** - More dots icon
- **CTA**: "Continue"
- **Progress**: 1/5 indicator
- **Navigation**: 
  - Back: → questionnaire.html
  - Forward: → questionnaire-3.html

---

### **4. Question 3: Time Commitment** (`questionnaire-3.html`)
- **Question**: "How much time per day do you feel you can consistently give to your health?"
- **Subtitle**: "Select the one that closest fits you. You can change these at a later time."
- **Options** (single-select radio):
  - 🕐 **2 min** - Clock icon
  - 🕔 **5 min** - Clock icon
  - 🕙 **10+ min** - Clock icon
- **CTA**: "Continue"
- **Progress**: 2/5 indicator
- **Navigation**: 
  - Back: → questionnaire-2.html
  - Forward: → questionnaire-4.html

---

### **5. Question 4: Interest Areas** (`questionnaire-4.html`)
- **Question**: "What matters to you the most?"
- **Subtitle**: "We'll customize your content based on your interests."
- **Options** (multi-select cards):
  - 📈 **Fitness & Health** - Activity icon
  - 🧠 **Mental Wellness** - Brain icon
  - 📊 **Career Growth** - Trending up icon
  - 🍎 **Nutrition** - Apple icon
  - 🌙 **Sleep Recovery** - Moon icon
  - ✨ **Mindfulness** - Sparkles icon
- **Layout**: 2x3 grid of cards with checkmarks
- **CTA**: "Continue"
- **Progress**: 3/5 indicator
- **Navigation**: 
  - Back: → questionnaire-3.html
  - Forward: → questionnaire-5.html

---

### **6. Question 5: Support Type** (`questionnaire-5.html`)
- **Question**: "How would you like Betterfly to help"
- **Subtitle**: "Select all that apply to personalize your experience. You can change these at a later time."
- **Options** (multi-select):
  - 🔔 **Reminders** - Bell icon
  - 📈 **Progress Tracking** - Trending up icon
  - 🎓 **Education** - Graduation cap icon
  - ❤️ **Motivation** - Heart icon
  - 👥 **Accountability** - Users icon
- **CTA**: "Continue"
- **Progress**: 4/5 indicator
- **Navigation**: 
  - Back: → questionnaire-4.html
  - Forward: → questionnaire-6.html

---

### **7. Review Screen** (`questionnaire-6.html`)
- **Title**: "Let's Review Your Progress"
- **Subtitle**: "Here's what you've shared with us and what you can look forward to."
- **Content**: 
  - Summary cards showing:
    - Health Goal (from Q1)
    - Biggest Blocker (from Q2)
    - Daily Commitment (from Q3)
    - Interests (from Q4)
    - Support Preferences (from Q5)
- **Features**: 
  - "Start Over" link to reset
  - Edit capability (implied)
- **CTA**: "Continue"
- **Progress**: 5/5 indicator
- **Navigation**: 
  - Back: → questionnaire-5.html
  - Forward: → completion.html
  - Reset: → questionnaire.html

---

### **8. Completion Screen** (`completion.html`)
- **Content**: 
  - Butterfly celebration icon
  - "You're in!" title
  - Subtitle: "You're all set to start your personalized wellness journey"
- **CTA**: "Continue"
- **Navigation**: 
  - → Dashboard (`../../dashboard/v1/index.html`)
  - Alternative: → Home (`../../../../home/index.html`)

---

## 🎨 **Design System**

### **Visual Style**
- **Background**: Gradient green (light to bright)
- **Typography**: System fonts (-apple-system, BlinkMacSystemFont)
- **Icons**: Lucide icons library
- **Colors**: 
  - Primary: Green gradients
  - Text: Dark gray/black
  - Accents: White cards with shadows

### **Component Types**
1. **Text Input**: Free-form text entry with placeholder
2. **Multi-Select Items**: List with icons and checkboxes
3. **Radio Select**: Single choice with radio buttons
4. **Card Grid**: Visual cards with icons and labels
5. **Review Cards**: Summary display of selections

### **Progress Indicators**
- Step counter (e.g., "1/5")
- Visual progress bar with steps

---

## 📊 **Data Collection Summary**

### **User Preferences**
- **Health Goal**: Free text entry
- **Blockers**: Time, Energy, Motivation, Knowledge, Other
- **Time Commitment**: 2 min, 5 min, 10+ min daily
- **Interest Areas**: Fitness, Mental Wellness, Career, Nutrition, Sleep, Mindfulness
- **Support Type**: Reminders, Progress Tracking, Education, Motivation, Accountability

### **Flow Characteristics**
- **Branching**: None (linear flow)
- **Required Fields**: All questions appear to be required
- **Multi-select**: Questions 2, 4, and 5
- **Single-select**: Question 3
- **Free text**: Question 1

---

## 🔄 **Navigation Flow**

```
Welcome 
    ↓
Q1: Health Goal (text)
    ↓
Q2: Blockers (multi)
    ↓
Q3: Time (single)
    ↓
Q4: Interests (multi)
    ↓
Q5: Support (multi)
    ↓
Review
    ↓
Completion → Dashboard/Home
```

---

## ⚡ **Key Differences from V2**

### **V1 Characteristics**
- **Shorter**: 8 screens vs 23 screens
- **Simpler**: Basic preferences vs comprehensive health assessment
- **No gamification**: No coin system or rewards
- **No profile creation**: No name/phone/verification
- **No feedback collection**: No post-completion feedback
- **Basic data**: Limited to preferences and interests
- **Quick completion**: 3-5 minutes vs 8-12 minutes

### **V2 Improvements**
- Added 10 health assessment questions
- Added gamification (130 coins)
- Added profile creation flow
- Added 8-question feedback system
- Added loading/celebration screens
- Added work performance question
- Enhanced data collection for Google Sheets
- Better progression tracking

---

## 🚀 **Migration Path**

### **From V1 to V2**
Users moving from V1 to V2 will experience:
1. More comprehensive health assessment
2. Gamified experience with rewards
3. Profile creation requirement
4. Detailed feedback collection
5. Better personalization potential
6. Enhanced visual design
7. Persistent state management

### **Data Compatibility**
- V1 data fields don't directly map to V2
- V2 collects significantly more information
- Consider data migration strategy if needed

---

## 📁 **File Structure**
```
/src/flows/onboarding/v1/
├── welcome.html (intro)
├── questionnaire.html (Q1)
├── questionnaire-2.html (Q2)
├── questionnaire-3.html (Q3)
├── questionnaire-4.html (Q4)
├── questionnaire-5.html (Q5)
├── questionnaire-6.html (review)
└── completion.html (end)
```

---

*This document represents the V1 onboarding flow structure for historical reference and comparison purposes.*