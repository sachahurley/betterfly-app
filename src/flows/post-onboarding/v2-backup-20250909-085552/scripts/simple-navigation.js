// ��️ SIMPLIFIED BULLETPROOF NAVIGATION SYSTEM
// This fixes all navigation issues while keeping the exact same design

/* ==========================================
   🎯 SIMPLE STATE MANAGEMENT
   ========================================== */

const SimpleApp = {
    currentScreen: 'initial-load',
    challengeActive: false,
    timeRemaining: 120,
    butterflyCount: 165,
    debug: true // Enable debug for troubleshooting
};

/* ==========================================
   ��️ BULLETPROOF NAVIGATION
   ========================================== */

function showScreen(screenId) {
    console.log(`��️ Navigating to: ${screenId}`);
    
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
        screen.style.display = 'none';
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.style.display = 'block';
        targetScreen.classList.add('active');
        SimpleApp.currentScreen = screenId;
        
        console.log(`✅ Successfully showing: ${screenId}`);
        
        // Initialize screen-specific functionality
        initializeScreen(screenId);
    } else {
        console.error(`❌ Screen not found: ${screenId}`);
        // Fallback to home
        showScreen('home-default');
    }
}

/* ==========================================
   🚀 SCREEN INITIALIZATION
   ========================================== */

function initializeScreen(screenId) {
    console.log(`🔧 Initializing screen: ${screenId}`);
    
    switch(screenId) {
        case 'home-default':
            updateCurrencyDisplay();
            break;
        case 'challenge-active':
            updateChallengeDisplay();
            break;
        case 'challenges-page':
            updateChallengeDisplay();
            break;
        case 'currency-rewards':
            updateCurrencyDisplay();
            console.log('💰 Currency screen initialized');
            break;
        case 'claim-butterflies':
            updateRewardDisplay();
            break;
    }
}

/* ==========================================
   �� CURRENCY SYSTEM
   ========================================== */

function updateCurrencyDisplay() {
    const currencyElements = document.querySelectorAll('.currency-amount');
    currencyElements.forEach(element => {
        element.textContent = SimpleApp.butterflyCount.toString();
    });
}

function updateRewardDisplay() {
    updateCurrencyDisplay();
}

/* ==========================================
   ⏱️ CHALLENGE SYSTEM
   ========================================== */

function updateChallengeDisplay() {
    const challengeBtn = document.getElementById('challenge-btn');
    const challengeBtnText = document.getElementById('challenge-btn-text');
    
    if (challengeBtn && challengeBtnText) {
        if (SimpleApp.challengeActive) {
            challengeBtnText.textContent = `Pause ${formatTime(SimpleApp.timeRemaining)}`;
        } else {
            challengeBtnText.textContent = 'Start Challenge';
        }
    }
}

function startChallenge() {
    SimpleApp.challengeActive = true;
    updateChallengeDisplay();
    
    const timer = setInterval(() => {
        SimpleApp.timeRemaining--;
        updateChallengeDisplay();
        
        if (SimpleApp.timeRemaining <= 0) {
            clearInterval(timer);
            completeChallenge();
        }
    }, 1000);
}

function completeChallenge() {
    SimpleApp.challengeActive = false;
    SimpleApp.timeRemaining = 120;
    showScreen('claim-butterflies');
}

function claimReward() {
    SimpleApp.butterflyCount += 100;
    updateCurrencyDisplay();
    
    setTimeout(() => {
        showScreen('home-default');
    }, 2000);
}

/* ==========================================
   �� UTILITY FUNCTIONS
   ========================================== */

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/* ==========================================
   🌐 GLOBAL FUNCTION EXPORTS
   ========================================== */

// Navigation functions
window.progressToHomepage = () => showScreen('home-default');
window.navigateToHome = () => showScreen('home-default');
window.navigateToChallenge = () => showScreen('challenge-active');
window.navigateToChallengesPage = () => showScreen('challenges-page');
window.openCurrencyScreen = () => {
    console.log('💰 Opening currency screen');
    showScreen('currency-rewards');
};
window.closeCurrencyScreen = () => {
    console.log('❌ Closing currency screen');
    showScreen('home-default');
};

// Challenge functions
window.handleChallengeAction = () => {
    if (SimpleApp.challengeActive) {
        SimpleApp.challengeActive = false;
        updateChallengeDisplay();
    } else {
        startChallenge();
    }
};
window.markChallengeComplete = completeChallenge;
window.claimReward = claimReward;

// Currency functions
window.markCompleteInCurrency = () => {
    console.log('✅ Marking task complete in currency screen');
    alert('Task marked as complete!');
};

/* ==========================================
   🚀 INITIALIZATION
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('��️ Simple Navigation System Initialized');
    
    // Check for hash navigation first
    const hash = window.location.hash.substring(1);
    if (hash && hash !== '') {
        console.log('🔄 Hash navigation detected:', hash);
        setTimeout(() => showScreen(hash), 100);
    } else {
        // Start with welcome screen
        showScreen('initial-load');
    }
    
    // Setup bottom navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item, index) => {
        item.onclick = function() {
            switch(index) {
                case 0: showScreen('home-default'); break;
                case 1: console.log('Benefits clicked'); break;
                case 2: showScreen('challenge-active'); break;
                case 3: console.log('Social clicked'); break;
                case 4: console.log('Buddy clicked'); break;
            }
        };
    });
});

console.log('��️ Simple Navigation System Ready!');
