// Onboarding Routes Configuration
const OnboardingRoutes = {
  // Route definitions
  routes: {
    'welcome': 'welcome.html',
    'get-started': 'get-started.html',
    'expectations': 'expectations.html',
    'q1-health-feeling': 'q1-health-feeling.html',
    'loading': 'loading.html',
    'q2-main-concern': 'q2-main-concern.html',
    'q3-biggest-challenge': 'q3-biggest-challenge.html',
    'q4-past-experience': 'q4-past-experience.html',
    'q5-wearable': 'q5-wearable.html',
    'q6-motivation': 'q6-motivation.html',
    'q7-support-preference': 'q7-support-preference.html',
    'q8-lifestyle': 'q8-lifestyle.html',
    'q9-success': 'q9-success.html',
    'q10-commitment': 'q10-commitment.html',
    'review': 'review.html',
    'challenges-intro': 'challenges-intro.html',
    'profile-prompt': 'profile-prompt.html',
    'signup-name': 'signup-name.html',
    'signup-phone': 'signup-phone.html',
    'signup-verification': 'signup-verification.html',
    'profile-celebration': 'profile-celebration.html',
    'feedback': 'feedback.html',
    'completion': 'completion.html',
    'signup-email': 'signup-email.html',
    'save-preferences': 'save-preferences.html',
    'profile-name': 'profile-name.html',
    'profile-phone': 'profile-phone.html',
    'profile-code': 'profile-code.html',
    'profile-celebrate': 'profile-celebrate.html'
  },

  // Navigation flow
  flow: {
    'welcome': 'get-started',
    'get-started': 'expectations',
    'expectations': 'q1-health-feeling',
    'q1-health-feeling': 'loading',
    'loading': 'q2-main-concern',
    'q2-main-concern': 'q3-biggest-challenge',
    'q3-biggest-challenge': 'q4-past-experience',
    'q4-past-experience': 'q5-wearable',
    'q5-wearable': 'q6-motivation',
    'q6-motivation': 'q7-support-preference',
    'q7-support-preference': 'q8-lifestyle',
    'q8-lifestyle': 'q9-success',
    'q9-success': 'q10-commitment',
    'q10-commitment': 'review',
    'review': 'challenges-intro',
    'challenges-intro': 'profile-prompt',
    'profile-prompt': 'signup-name',
    'signup-name': 'signup-phone',
    'signup-phone': 'signup-verification',
    'signup-verification': 'profile-celebration',
    'profile-celebration': 'feedback',
    'feedback': 'completion',
    'completion': 'home',
    'signup-email': 'save-preferences',
    'save-preferences': 'profile-name',
    'profile-name': 'profile-phone',
    'profile-phone': 'profile-code',
    'profile-code': 'profile-celebrate',
    'profile-celebrate': 'home' // Exit to main app
  },

  // Navigate to a specific route
  navigate(routeKey) {
    const file = this.routes[routeKey];
    if (file) {
      window.location.href = file;
    } else if (routeKey === 'home') {
      // Navigate to app home
      window.location.href = '../../../../../home/index.html';
    } else if (routeKey === 'dashboard') {
      // Navigate to v2 dashboard
      window.location.href = '../../dashboard/v2/index.html';
    } else {
      console.error('Unknown route:', routeKey);
    }
  },

  // Get next route in flow
  getNextRoute(currentRoute) {
    return this.flow[currentRoute];
  },

  // Navigate to next step in flow
  navigateNext(currentRoute) {
    const next = this.getNextRoute(currentRoute);
    if (next) {
      this.navigate(next);
    }
  },

  // Navigate back
  navigateBack() {
    window.history.back();
  },

  // Get current route from URL
  getCurrentRoute() {
    const path = window.location.pathname;
    const filename = path.split('/').pop().replace('.html', '');
    return filename || 'welcome';
  }
};