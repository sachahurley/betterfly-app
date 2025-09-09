// Home page functionality
document.addEventListener('DOMContentLoaded', function() {
    // 🔴 ADDED: Check onboarding status first
    checkOnboardingStatus();
    
    // Initialize the page
    loadUserData();
    updateProgress();
    updateStats();
    
    // Set up event listeners
    setupEventListeners();
});

// 🔴 NEW FUNCTION: Check if user has completed onboarding
function checkOnboardingStatus() {
    // Import UserState if not already available
    if (typeof UserState === 'undefined') {
        const script = document.createElement('script');
        script.src = '../shared/user-state.js';
        script.onload = () => {
            checkOnboardingStatusAfterLoad();
        };
        document.head.appendChild(script);
    } else {
        checkOnboardingStatusAfterLoad();
    }
}

function checkOnboardingStatusAfterLoad() {
    const onboardingStatus = UserState.getOnboardingStatus();
    console.log('Onboarding status:', onboardingStatus);
    
    if (!onboardingStatus.isComplete) {
        console.log('User has not completed onboarding, redirecting...');
        // Redirect to onboarding welcome page
        window.location.href = '../src/flows/onboarding/v1/welcome.html';
        return;
    }
    
    console.log('User has completed onboarding, proceeding with home page...');
}

// Load user data from localStorage
function loadUserData() {
    // 🔴 UPDATED: Now loads from the correct location (betterflyMinimal)
    const gameState = JSON.parse(localStorage.getItem('betterflyMinimal')) || {
        totalPoints: 0,
        currentStreak: 0,
        habitsCompleted: 0,
        todayProgress: 0
    };
    
    // Update display with loaded data
    document.getElementById('totalPoints').textContent = gameState.totalPoints || 0;
    document.getElementById('currentStreak').textContent = gameState.currentStreak || 0;
    document.getElementById('habitsCompleted').textContent = gameState.habitsCompleted || 0;
    
    // Update progress bar (assuming todayProgress is number of completed tasks)
    updateProgressBar(gameState.todayProgress || 0);
}

// Update progress bar with X/Y completed format
function updateProgressBar(completed, total = 8) {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressCompleted');
    
    // Calculate percentage for the visual bar
    const percentage = (completed / total) * 100;
    progressFill.style.width = percentage + '%';
    
    // Update the text to show "X/Y completed"
    progressText.textContent = `${completed}/${total} completed`;
}

// Update stats display
function updateStats() {
    // This would typically fetch from an API or localStorage
    // For now, we'll use the data loaded in loadUserData()
}

// Update progress section
function updateProgress() {
    // 🔴 UPDATED: Now loads from the correct location
    const gameState = JSON.parse(localStorage.getItem('betterflyMinimal')) || {};
    const todayProgress = gameState.todayProgress || 0;
    
    updateProgressBar(todayProgress);
}

// Setup event listeners
function setupEventListeners() {
    // Action cards
    const actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Navigation functions
// 🔴 UPDATED: Now properly handles the onboarding flow
function startChallenge() {
    // Check if user has completed onboarding
    if (typeof UserState !== 'undefined' && UserState.hasCompletedOnboarding()) {
        // User has completed onboarding, go to v2 dashboard
        window.location.href = 'src/flows/dashboard/v2/index.html';
    } else {
        // User hasn't completed onboarding, start v2 onboarding flow
        window.location.href = 'src/flows/onboarding/v2/welcome.html';
    }
}

function viewProgress() {
    // Navigate to progress page (placeholder)
    console.log('Navigate to progress page');
    // window.location.href = '../progress/index.html';
}

function viewBenefits() {
    // Navigate to benefits page (placeholder)
    console.log('Navigate to benefits page');
    // window.location.href = '../benefits/index.html';
}

function viewProfile() {
    // Navigate to profile page (placeholder)
    console.log('Navigate to profile page');
    // window.location.href = '../profile/index.html';
}

// 🔴 NEW FUNCTION: Open currency rewards page
function openCurrencyRewards() {
    console.log('Opening currency rewards page');
    // Navigate to the integrated post-onboarding currency screen
    window.location.href = '../src/flows/post-onboarding/v2/index.html#currency-rewards';
}

// Utility functions
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
}

// Update time in status bar
function updateStatusBarTime() {
    const timeElement = document.querySelector('.status-time');
    if (timeElement) {
        timeElement.textContent = getCurrentTime();
    }
}

// Initialize time and update every minute
updateStatusBarTime();
setInterval(updateStatusBarTime, 60000);

// 🔴 REMOVED: No more sample data - we now use real user data
// function addSampleData() {
//     const sampleData = {
//         totalPoints: 1250,
//         currentStreak: 7,
//         habitsCompleted: 23,
//         todayProgress: 65
//     };
//     
//     localStorage.setItem('gameState', JSON.stringify(sampleData));
//     loadUserData();
// }

// Uncomment the line below to add sample data for testing
// addSampleData();
