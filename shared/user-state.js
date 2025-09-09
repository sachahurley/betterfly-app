const UserState = {
  saveOnboarding: (data) => {
    const userData = {
      ...JSON.parse(localStorage.getItem('userData') || '{}'),
      onboardingComplete: true,
      preferences: {
        primaryGoal: data.primaryGoal || 'Improve Wellness',
        biggestBlocker: data.biggestBlocker || 'Lack of Time',
        topInterests: data.topInterests || 'Mindfulness & Fitness',
        dailyTime: data.dailyTime || '15-30 minutes',
        supportType: data.supportType || 'Daily Reminders'
      },
      onboardingDate: new Date().toISOString()
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
  },

  // 🔴 NEW FUNCTION: Initialize challenge state when onboarding completes
  initializeChallengeState: () => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    // Create initial challenge state
    const challengeState = {
      currentDay: 1,
      totalPoints: 0,
      daysCompleted: {},
      habitsCompleted: {},
      expandedDays: { 1: true },
      todayProgress: 0,
      challengeStartDate: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };
    
    // Save to the key that dashboard expects
    localStorage.setItem('betterflyMinimal', JSON.stringify(challengeState));
    
    // Also save to userData for consistency
    userData.challengeState = challengeState;
    localStorage.setItem('userData', JSON.stringify(userData));
    
    console.log('Challenge state initialized:', challengeState);
    return challengeState;
  },

  // 🔴 NEW FUNCTION: Get current challenge progress
  getChallengeProgress: () => {
    const savedState = localStorage.getItem('betterflyMinimal');
    if (savedState) {
      try {
        return JSON.parse(savedState);
      } catch (e) {
        console.error('Error loading challenge state:', e);
        return null;
      }
    }
    return null;
  },

  // 🔴 NEW FUNCTION: Update challenge progress
  updateChallengeProgress: (updates) => {
    const currentState = UserState.getChallengeProgress();
    if (currentState) {
      const updatedState = {
        ...currentState,
        ...updates,
        lastModified: new Date().toISOString()
      };
      
      localStorage.setItem('betterflyMinimal', JSON.stringify(updatedState));
      
      // Also update userData for consistency
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      userData.challengeState = updatedState;
      localStorage.setItem('userData', JSON.stringify(userData));
      
      return updatedState;
    }
    return null;
  },

  // 🔴 NEW FUNCTION: Complete a specific challenge
  completeChallenge: (challengeId, reward = 100) => {
    const userData = UserState.getUserData();
    
    // Initialize challenges if not exists
    if (!userData.challenges) {
      userData.challenges = {};
    }
    
    // Mark challenge as completed
    userData.challenges[challengeId] = {
      completed: true,
      completedAt: new Date().toISOString(),
      reward: reward
    };
    
    // Update currency
    userData.currency = (userData.currency || 165) + reward;
    
    // Update last modified
    userData.lastModified = new Date().toISOString();
    
    // Save to localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    
    console.log(`✅ Challenge ${challengeId} completed! Earned ${reward} butterflies. Total: ${userData.currency}`);
    return userData;
  },

  // 🔴 NEW FUNCTION: Check if challenge is completed
  isChallengeCompleted: (challengeId) => {
    const userData = UserState.getUserData();
    return userData.challenges && userData.challenges[challengeId] && userData.challenges[challengeId].completed;
  },

  // 🔴 NEW FUNCTION: Get current currency
  getCurrency: () => {
    const userData = UserState.getUserData();
    return userData.currency || 165;
  },

  // 🔴 NEW FUNCTION: Update currency across all pages
  updateCurrency: (amount) => {
    const userData = UserState.getUserData();
    userData.currency = amount;
    userData.lastModified = new Date().toISOString();
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Update currency display on current page
    UserState.updateCurrencyDisplay();
  },

  // 🔴 NEW FUNCTION: Update currency display on current page
  updateCurrencyDisplay: () => {
    const currency = UserState.getCurrency();
    const currencyElements = document.querySelectorAll('.currency-amount');
    currencyElements.forEach(element => {
      element.textContent = currency.toString();
    });
    console.log(`💰 Updated currency display: ${currency}`);
  },

  // 🔴 NEW FUNCTION: Get next pending challenge
  getNextPendingChallenge: () => {
    const userData = UserState.getUserData();
    const challenges = userData.challenges || {};
    
    // Define challenge order
    const challengeOrder = [
      'stand-and-stretch',
      'discover-rewards-store',
      'connect-wearable',
      'create-profile'
    ];
    
    // Find first incomplete challenge
    for (const challengeId of challengeOrder) {
      if (!challenges[challengeId] || !challenges[challengeId].completed) {
        return challengeId;
      }
    }
    
    return null; // All challenges completed
  },

  // 🔴 NEW FUNCTION: Save user preferences during onboarding
  saveUserPreferences: (preferences) => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    userData.preferences = {
      ...userData.preferences,
      ...preferences
    };
    userData.lastModified = new Date().toISOString();
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Also save to userPreferences for backward compatibility
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    
    console.log('User preferences saved:', preferences);
  },

  // 🔴 NEW FUNCTION: Check if user has completed onboarding
  hasCompletedOnboarding: () => {
    const data = JSON.parse(localStorage.getItem('userData') || '{}');
    return data.onboardingComplete === true;
  },

  // 🔴 NEW FUNCTION: Get onboarding completion status
  getOnboardingStatus: () => {
    const data = JSON.parse(localStorage.getItem('userData') || '{}');
    return {
      isComplete: data.onboardingComplete === true,
      completionDate: data.onboardingDate,
      preferences: data.preferences || {}
    };
  },

  updatePreference: (key, value) => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData.preferences) {
      userData.preferences = {};
    }
    userData.preferences[key] = value;
    userData.lastModified = new Date().toISOString();
    localStorage.setItem('userData', JSON.stringify(userData));
  },

  logActivity: (activity) => {
    const activities = JSON.parse(localStorage.getItem('activities') || '[]');
    activities.push({
      type: activity,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('activities', JSON.stringify(activities));
  },

  getUserData: () => {
    return JSON.parse(localStorage.getItem('userData') || '{}');
  },

  getPreferences: () => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    return userData.preferences || {};
  },

  isLoggedIn: () => {
    return localStorage.getItem('isLoggedIn') === 'true';
  },

  logout: () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/index.html';
  },

  clearAllData: () => {
    localStorage.clear();
  },

  toggleDevMode: () => {
    if (UserState.isLoggedIn()) {
      localStorage.removeItem('isLoggedIn');
      console.log('Dev Mode: Logged out');
    } else {
      localStorage.setItem('isLoggedIn', 'true');
      if (!UserState.hasCompletedOnboarding()) {
        UserState.saveOnboarding({
          primaryGoal: 'Test Goal',
          biggestBlocker: 'Test Blocker',
          topInterests: 'Test Interests',
          dailyTime: 'Test Time',
          supportType: 'Test Support'
        });
      }
      console.log('Dev Mode: Logged in');
    }
    window.location.reload();
  }
};

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && e.key === 'L') {
    UserState.toggleDevMode();
  }
});