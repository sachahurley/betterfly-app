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

  hasCompletedOnboarding: () => {
    const data = JSON.parse(localStorage.getItem('userData') || '{}');
    return data.onboardingComplete === true;
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