// 📝 SIMPLE, RELIABLE BETTERFLY POST-ONBOARDING JAVASCRIPT
// This keeps the original design but fixes the navigation issues

/* ==========================================
   🎯 SIMPLE STATE MANAGEMENT
   ========================================== */

const AppState = {
    currentScreen: 'initial-load',
    challengeStatus: 'not-started',
    timeRemaining: 120,
    butterflyCount: 165,
    previousScreen: null
};

/* ==========================================
   🚀 INITIALIZATION
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🦋 Betterfly Post-Onboarding Flow Initialized');
    
    // Start with welcome screen
    showScreen('initial-load');
    
    // Initialize event listeners
    initializeEventListeners();
});

/* ==========================================
   📱 SIMPLE SCREEN MANAGEMENT
   ========================================== */

function showScreen(screenId) {
    console.log(`📱 Switching to: ${screenId}`);
    
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        AppState.currentScreen = screenId;
        console.log(`✅ Screen ${screenId} is now active`);
    } else {
        console.error(`❌ Screen not found: ${screenId}`);
    }
}

/* ==========================================
   🎮 EVENT LISTENERS
   ========================================== */

function initializeEventListeners() {
    // Bottom navigation
    setupBottomNavigation();
    
    // Currency counter
    setupCurrencyCounter();
    
    // Task interactions
    setupTaskInteractions();
}

function setupBottomNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            switch(index) {
                case 0: // Home
                    showScreen('home-default');
                    break;
                case 1: // Benefits
                    console.log('🌟 Benefits clicked');
                    break;
                case 2: // Journey
                    showScreen('challenge-active');
                    break;
                case 3: // Social
                    console.log('👥 Social clicked');
                    break;
                case 4: // Buddy
                    console.log('🤖 Buddy clicked');
                    break;
            }
        });
    });
}

function setupCurrencyCounter() {
    const currencyCounters = document.querySelectorAll('.currency-counter');
    
    currencyCounters.forEach(counter => {
        counter.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('💰 Currency counter clicked');
            openCurrencyScreen();
        });
    });
}

function setupTaskInteractions() {
    // Task click handlers are set up via onclick in HTML
    console.log('📝 Task interactions ready');
}

/* ==========================================
   🎯 NAVIGATION FUNCTIONS
   ========================================== */

function progressToHomepage() {
    console.log('🚀 CTA Button clicked - Progressing to homepage');
    showScreen('home-default');
}

function navigateToHome() {
    console.log('🏠 Navigating to home');
    showScreen('home-default');
}

function navigateToChallenge() {
    console.log('🎯 Navigating to challenge');
    showScreen('challenge-active');
}

function navigateToChallengesPage() {
    console.log('🎯 Navigating to challenges page');
    showScreen('challenges-page');
}

function navigateToClaimReward() {
    console.log('🎉 Navigating to claim reward');
    showScreen('claim-butterflies');
}

// Currency screen functions
function openCurrencyScreen() {
    console.log('💰 Opening currency screen');
    AppState.previousScreen = AppState.currentScreen;
    showScreen('currency-rewards');
}

function closeCurrencyScreen() {
    console.log('❌ Closing currency screen');
    if (AppState.previousScreen) {
        showScreen(AppState.previousScreen);
        AppState.previousScreen = null;
    } else {
        showScreen('home-default');
    }
}

/* ==========================================
   ⏱️ CHALLENGE TIMER SYSTEM
   ========================================== */

function handleChallengeAction() {
    console.log(`🎯 Challenge action: ${AppState.challengeStatus}`);
    
    switch(AppState.challengeStatus) {
        case 'not-started':
            startChallenge();
            break;
        case 'active':
            pauseChallenge();
            break;
        case 'paused':
            resumeChallenge();
            break;
        case 'completed':
            resetChallenge();
            break;
    }
}

function startChallenge() {
    console.log('▶️ Starting challenge');
    AppState.challengeStatus = 'active';
    
    // Start timer
    const timer = setInterval(() => {
        AppState.timeRemaining--;
        updateChallengeDisplay();
        
        if (AppState.timeRemaining <= 0) {
            completeChallenge();
            clearInterval(timer);
        }
    }, 1000);
    
    updateChallengeDisplay();
}

function pauseChallenge() {
    console.log('⏸️ Pausing challenge');
    AppState.challengeStatus = 'paused';
    updateChallengeDisplay();
}

function resumeChallenge() {
    console.log('▶️ Resuming challenge');
    AppState.challengeStatus = 'active';
    updateChallengeDisplay();
}

function completeChallenge() {
    console.log('✅ Challenge completed');
    AppState.challengeStatus = 'completed';
    updateChallengeDisplay();
    
    // Navigate to claim screen
    setTimeout(() => {
        navigateToClaimReward();
    }, 1500);
}

function resetChallenge() {
    console.log('🔄 Resetting challenge');
    AppState.challengeStatus = 'not-started';
    AppState.timeRemaining = 120;
    updateChallengeDisplay();
}

function markChallengeComplete() {
    console.log('✋ Manually marking challenge complete');
    completeChallenge();
}

function updateChallengeDisplay() {
    const challengeBtn = document.getElementById('challenge-btn');
    const challengeBtnText = document.getElementById('challenge-btn-text');
    const buttonIcon = challengeBtn?.querySelector('.button-icon');
    
    if (!challengeBtn || !challengeBtnText || !buttonIcon) return;
    
    switch(AppState.challengeStatus) {
        case 'not-started':
            challengeBtnText.textContent = 'Start Challenge';
            buttonIcon.className = 'button-icon play';
            challengeBtn.className = 'challenge-button start';
            break;
            
        case 'active':
            challengeBtnText.textContent = `Pause ${formatTime(AppState.timeRemaining)}`;
            buttonIcon.className = 'button-icon pause';
            challengeBtn.className = 'challenge-button active';
            break;
            
        case 'paused':
            challengeBtnText.textContent = `Restart ${formatTime(AppState.timeRemaining)}`;
            buttonIcon.className = 'button-icon play';
            challengeBtn.className = 'challenge-button paused';
            break;
            
        case 'completed':
            challengeBtnText.textContent = 'Completed!';
            buttonIcon.className = 'button-icon check';
            challengeBtn.className = 'challenge-button completed';
            break;
    }
}

/* ==========================================
   🎉 REWARD SYSTEM
   ========================================== */

function claimReward() {
    console.log('🎉 Claiming reward!');
    
    // Add butterflies to total
    AppState.butterflyCount += 100;
    
    // Navigate back to home
    setTimeout(() => {
        showScreen('home-default');
    }, 2000);
}

/* ==========================================
   🔧 UTILITY FUNCTIONS
   ========================================== */

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Make functions globally available
window.progressToHomepage = progressToHomepage;
window.navigateToHome = navigateToHome;
window.navigateToChallenge = navigateToChallenge;
window.navigateToChallengesPage = navigateToChallengesPage;
window.navigateToClaimReward = navigateToClaimReward;
window.openCurrencyScreen = openCurrencyScreen;
window.closeCurrencyScreen = closeCurrencyScreen;
window.handleChallengeAction = handleChallengeAction;
window.markChallengeComplete = markChallengeComplete;
window.claimReward = claimReward;

console.log('✅ Simple Betterfly JavaScript loaded successfully!');