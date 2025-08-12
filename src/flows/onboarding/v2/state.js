// Onboarding State Management
const OnboardingState = {
  // State data
  data: {
    q1_healthFeeling: null,
    q2_mainConcern: null,
    q3_biggestChallenge: null,
    q4_pastExperience: null,
    q5_wearable: null,
    q6_motivation: null,
    q7_supportPref: null,
    q8_lifestyle: null,
    q9_success: null,
    q10_commitment: null,
    profile: {
      firstName: '',
      lastName: '',
      phone: '',
      code: ''
    },
    coins: {
      count: 0,
      completedQuestions: new Set()
    }
  },

  // Constants
  TOTAL_QUESTION_STEPS: 10,
  COINS_PER_QUESTION: 10,

  // Save state to both sessionStorage and localStorage for persistence
  save() {
    // Convert Set to Array for serialization
    const dataToSave = {
      ...this.data,
      coins: {
        ...this.data.coins,
        completedQuestions: Array.from(this.data.coins.completedQuestions)
      }
    };
    
    const serializedData = JSON.stringify(dataToSave);
    const currentPath = window.location.pathname;
    
    // Save to sessionStorage (for current session)
    sessionStorage.setItem('onboardingState', serializedData);
    sessionStorage.setItem('onboardingStep', currentPath);
    
    // Save to localStorage (for persistence across sessions)
    localStorage.setItem('betterfly_onboardingState', serializedData);
    localStorage.setItem('betterfly_onboardingStep', currentPath);
    localStorage.setItem('betterfly_onboardingTimestamp', Date.now().toString());
  },

  // Load state from sessionStorage first, then localStorage as fallback
  load() {
    // Try sessionStorage first (current session)
    let saved = sessionStorage.getItem('onboardingState');
    let source = 'session';
    
    // If no sessionStorage data, try localStorage (previous session)
    if (!saved) {
      saved = localStorage.getItem('betterfly_onboardingState');
      source = 'local';
      
      // Check if localStorage data is not too old (7 days max)
      if (saved) {
        const timestamp = localStorage.getItem('betterfly_onboardingTimestamp');
        const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
        
        if (!timestamp || (Date.now() - parseInt(timestamp)) > maxAge) {
          // Data is too old, clear it
          this.clearPersistent();
          saved = null;
        }
      }
    }
    
    if (saved) {
      try {
        const loadedData = JSON.parse(saved);
        
        // Convert Array back to Set and handle missing coin data
        this.data = {
          ...loadedData,
          coins: {
            count: loadedData.coins?.count || 0,
            completedQuestions: new Set(loadedData.coins?.completedQuestions || [])
          }
        };
        
        console.log(`Onboarding state loaded from ${source}Storage`);
        
        // If loaded from localStorage, also save to sessionStorage
        if (source === 'local') {
          sessionStorage.setItem('onboardingState', saved);
          const step = localStorage.getItem('betterfly_onboardingStep');
          if (step) {
            sessionStorage.setItem('onboardingStep', step);
          }
        }
      } catch (e) {
        console.error('Failed to load onboarding state:', e);
        this.clearPersistent();
      }
    }
    return this.data;
  },

  // Get last visited step
  getLastStep() {
    return sessionStorage.getItem('onboardingStep') || localStorage.getItem('betterfly_onboardingStep');
  },

  // Clear only session storage (for temporary clears)
  clear() {
    this.data = {
      q1_healthFeeling: null,
      q2_mainConcern: null,
        q3_biggestChallenge: null,
      q4_pastExperience: null,
      q5_wearable: null,
      q6_motivation: null,
      q7_supportPref: null,
      q8_lifestyle: null,
      q9_success: null,
      q10_commitment: null,
      profile: {
        firstName: '',
        lastName: '',
        phone: '',
        code: ''
      },
      coins: {
        count: 0,
        completedQuestions: new Set()
      }
    };
    sessionStorage.removeItem('onboardingState');
    sessionStorage.removeItem('onboardingStep');
  },

  // Clear all persistent storage (complete reset)
  clearPersistent() {
    this.clear();
    localStorage.removeItem('betterfly_onboardingState');
    localStorage.removeItem('betterfly_onboardingStep');
    localStorage.removeItem('betterfly_onboardingTimestamp');
  },

  // Complete onboarding and clear all stored data
  complete() {
    this.clearPersistent();
  },

  // Update a specific field
  update(field, value) {
    if (field.includes('.')) {
      // Handle nested fields like profile.firstName
      const parts = field.split('.');
      let current = this.data;
      for (let i = 0; i < parts.length - 1; i++) {
        current = current[parts[i]];
      }
      current[parts[parts.length - 1]] = value;
    } else {
      this.data[field] = value;
    }
    this.save();
  },

  // Get a specific field value
  get(field) {
    if (field.includes('.')) {
      const parts = field.split('.');
      let current = this.data;
      for (const part of parts) {
        current = current[part];
      }
      return current;
    }
    return this.data[field];
  },

  // Check if can continue from a specific step
  canContinue(stepId) {
    switch(stepId) {
      case 'q1-health-feeling':
        return this.data.q1_healthFeeling !== null;
      case 'q2-main-concern':
        return this.data.q2_mainConcern !== null;
      case 'q3-biggest-challenge':
        return this.data.q3_biggestChallenge !== null;
      case 'q4-past-experience':
        return this.data.q4_pastExperience !== null;
      case 'q5-wearable':
        return this.data.q5_wearable !== null;
      case 'q6-motivation':
        return this.data.q6_motivation !== null;
      case 'q7-support-preference':
        return this.data.q7_supportPref !== null;
      case 'q8-lifestyle':
        return this.data.q8_lifestyle !== null;
      case 'q9-success':
        return this.data.q9_success !== null;
      case 'q10-commitment':
        return this.data.q10_commitment !== null;
      case 'profile-name':
        return this.data.profile.firstName && this.data.profile.lastName;
      case 'profile-phone':
        return this.data.profile.phone && this.data.profile.phone.length >= 10;
      case 'profile-code':
        return this.data.profile.code && this.data.profile.code.length === 6;
      default:
        return true;
    }
  },

  // Get current question number (for progress bar)
  getCurrentQuestionNumber() {
    const path = window.location.pathname;
    const questionMap = {
      'q1-health-feeling': 1,
      'q2-main-concern': 2,
      'q3-biggest-challenge': 3,
      'q4-past-experience': 4,
      'q5-wearable': 5,
      'q6-motivation': 6,
      'q7-support-preference': 7,
      'q8-lifestyle': 8,
      'q9-success': 9,
      'q10-commitment': 10
    };
    
    for (const [key, num] of Object.entries(questionMap)) {
      if (path.includes(key)) {
        return num;
      }
    }
    return 0;
  },

  // Get question page URL from question key
  getQuestionUrl(questionKey) {
    const questionUrlMap = {
      'q1_healthFeeling': 'q1-health-feeling.html',
      'q2_mainConcern': 'q2-main-concern.html',
      'q3_biggestChallenge': 'q3-biggest-challenge.html',
      'q4_pastExperience': 'q4-past-experience.html',
      'q5_wearable': 'q5-wearable.html',
      'q6_motivation': 'q6-motivation.html',
      'q7_supportPref': 'q7-support-preference.html',
      'q8_lifestyle': 'q8-lifestyle.html',
      'q9_success': 'q9-success.html',
      'q10_commitment': 'q10-commitment.html'
    };
    return questionUrlMap[questionKey] || null;
  },

  // Get all answered questions for review/edit functionality
  getAnsweredQuestions() {
    const answered = [];
    const questionKeys = [
      'q1_healthFeeling', 'q2_mainConcern', 
      'q3_biggestChallenge', 'q4_pastExperience', 'q5_wearable',
      'q6_motivation', 'q7_supportPref', 'q8_lifestyle', 
      'q9_success', 'q10_commitment'
    ];

    questionKeys.forEach(key => {
      if (this.data[key] !== null && this.data[key] !== undefined) {
        answered.push({
          key: key,
          value: this.data[key],
          url: this.getQuestionUrl(key)
        });
      }
    });

    return answered;
  },

  // Get completion percentage
  getCompletionPercentage() {
    const answered = this.getAnsweredQuestions();
    return Math.round((answered.length / this.TOTAL_QUESTION_STEPS) * 100);
  },

  // Check if questionnaire is complete
  isComplete() {
    return this.getCompletionPercentage() === 100;
  },

  // Coin Management Methods
  getCoinCount() {
    return this.data.coins.count;
  },

  awardCoinsForQuestion(questionKey) {
    // Check if coins have already been awarded for this question
    if (!this.data.coins.completedQuestions.has(questionKey)) {
      this.data.coins.completedQuestions.add(questionKey);
      this.data.coins.count += this.COINS_PER_QUESTION;
      this.save();
      return this.COINS_PER_QUESTION; // Return coins awarded
    }
    return 0; // No coins awarded (already completed)
  },

  // Get question key from current page for coin awarding
  getCurrentQuestionKey() {
    const path = window.location.pathname;
    const questionKeyMap = {
      'q1-health-feeling': 'q1_healthFeeling',
      'q2-main-concern': 'q2_mainConcern',
      'q3-biggest-challenge': 'q3_biggestChallenge',
      'q4-past-experience': 'q4_pastExperience',
      'q5-wearable': 'q5_wearable',
      'q6-motivation': 'q6_motivation',
      'q7-support-preference': 'q7_supportPref',
      'q8-lifestyle': 'q8_lifestyle',
      'q9-success': 'q9_success',
      'q10-commitment': 'q10_commitment'
    };
    
    for (const [pathKey, questionKey] of Object.entries(questionKeyMap)) {
      if (path.includes(pathKey)) {
        return questionKey;
      }
    }
    return null;
  },

  // Award coins when progressing from current question
  progressAndAwardCoins() {
    const currentQuestionKey = this.getCurrentQuestionKey();
    if (currentQuestionKey && this.data[currentQuestionKey] !== null) {
      return this.awardCoinsForQuestion(currentQuestionKey);
    }
    return 0;
  },

  // Award bonus coins for completing review
  awardReviewCompletionBonus() {
    const bonusKey = 'review_completion';
    if (!this.data.coins.completedQuestions.has(bonusKey)) {
      this.data.coins.completedQuestions.add(bonusKey);
      this.data.coins.count += 100; // 100 coin bonus for completing review
      this.save();
      return 100;
    }
    return 0; // Already awarded
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = OnboardingState;
}