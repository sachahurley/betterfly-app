// 🛡️ BULLETPROOF NAVIGATION SYSTEM
// This replaces the fragile navigation with a rock-solid system

/* ==========================================
   🎯 BULLETPROOF STATE MANAGEMENT
   ========================================== */

const StableApp = {
    // Single source of truth for current screen
    currentScreen: 'initial-load',
    
    // Simple state that can't get corrupted
    challengeActive: false,
    timeRemaining: 120,
    butterflyCount: 165,
    
    // Navigation history for fallbacks
    previousScreen: null,
    
    // Debug mode for troubleshooting
    debug: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
};

/* ==========================================
   🛡️ BULLETPROOF NAVIGATION SYSTEM
   ========================================== */

function navigateTo(screenId) {
    // Log navigation attempt
    if (StableApp.debug) {
        console.log(`🛡️ Navigating from ${StableApp.currentScreen} to ${screenId}`);
    }
    
    // Validate screen exists
    const targetScreen = document.getElementById(screenId);
    if (!targetScreen) {
        console.error(`❌ Screen ${screenId} not found! Falling back to home.`);
        navigateTo('home-default');
        return;
    }
    
    // Store previous screen for fallback
    StableApp.previousScreen = StableApp.currentScreen;
    
    // Hide all screens with error handling
    try {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
    } catch (error) {
        console.error('❌ Error hiding screens:', error);
        // Force hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.style.display = 'none';
        });
    }
    
    // Show target screen with error handling
    try {
        targetScreen.classList.add('active');
        targetScreen.style.display = 'block';
        StableApp.currentScreen = screenId;
        
        if (StableApp.debug) {
            console.log(`✅ Successfully navigated to ${screenId}`);
            console.log(`✅ Target screen classes: ${targetScreen.className}`);
            console.log(`✅ Target screen computed display: ${window.getComputedStyle(targetScreen).display}`);
        }
        
        // Initialize screen-specific functionality
        initializeScreen(screenId);
        
    } catch (error) {
        console.error(`❌ Error showing screen ${screenId}:`, error);
        // Fallback to home screen
        navigateTo('home-default');
    }
}

/* ==========================================
   🚀 SCREEN INITIALIZATION
   ========================================== */

function initializeScreen(screenId) {
    switch(screenId) {
        case 'home-default':
            setupHomeScreen();
            break;
        case 'challenge-active':
            setupChallengeScreen();
            break;
        case 'challenges-page':
            setupChallengesPage();
            break;
        case 'currency-rewards':
            setupCurrencyScreen();
            break;
        case 'claim-butterflies':
            setupClaimScreen();
            break;
    }
}

function setupHomeScreen() {
    // Setup home screen interactions
    setupCurrencyCounters();
    setupTaskInteractions();
}

function setupChallengeScreen() {
    // Setup challenge screen interactions
    updateChallengeDisplay();
}

function setupChallengesPage() {
    // Setup challenges page interactions
    updateChallengeDisplay();
}

function setupCurrencyScreen() {
    console.log('💰 Setting up currency screen');
    // Setup currency screen interactions
    updateCurrencyDisplay();
    
    // Debug: Check if currency screen elements exist
    const currencyScreen = document.getElementById('currency-rewards');
    if (currencyScreen) {
        console.log('✅ Currency screen found:', currencyScreen);
        console.log('✅ Currency screen classes:', currencyScreen.className);
        console.log('✅ Currency screen display:', window.getComputedStyle(currencyScreen).display);
    } else {
        console.error('❌ Currency screen not found!');
    }
}

function setupClaimScreen() {
    // Setup claim screen interactions
    updateRewardDisplay();
}

/* ==========================================
   🎮 INTERACTION SETUP
   ========================================== */

function setupCurrencyCounters() {
    const counters = document.querySelectorAll('.currency-counter');
    counters.forEach(counter => {
        // Don't override the onclick attribute - let it call openCurrencyScreen()
        // The onclick="openCurrencyScreen()" attribute should handle the modal opening
        console.log('Currency counter found, preserving onclick attribute');
    });
}

function setupTaskInteractions() {
    // Find the challenge task and make it clickable
    const challengeTask = document.querySelector('.task.pending');
    if (challengeTask && challengeTask.textContent.includes('Complete Your Next Challenge')) {
        challengeTask.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            navigateTo('challenges-page');
        };
        challengeTask.style.cursor = 'pointer';
    }
}

/* ==========================================
   ⏱️ CHALLENGE SYSTEM
   ========================================== */

function startChallenge() {
    StableApp.challengeActive = true;
    updateChallengeDisplay();
    
    // Start timer
    const timer = setInterval(() => {
        StableApp.timeRemaining--;
        updateChallengeDisplay();
        
        if (StableApp.timeRemaining <= 0) {
            clearInterval(timer);
            completeChallenge();
        }
    }, 1000);
}

function pauseChallenge() {
    StableApp.challengeActive = false;
    updateChallengeDisplay();
}

function completeChallenge() {
    StableApp.challengeActive = false;
    StableApp.timeRemaining = 120;
    navigateTo('claim-butterflies');
}

function updateChallengeDisplay() {
    const challengeBtn = document.getElementById('challenge-btn');
    const challengeBtnText = document.getElementById('challenge-btn-text');
    
    if (challengeBtn && challengeBtnText) {
        if (StableApp.challengeActive) {
            challengeBtnText.textContent = `Pause ${formatTime(StableApp.timeRemaining)}`;
            challengeBtn.onclick = pauseChallenge;
        } else {
            challengeBtnText.textContent = 'Start Challenge';
            challengeBtn.onclick = startChallenge;
        }
    }
}

/* ==========================================
   💰 CURRENCY SYSTEM
   ========================================== */

function updateCurrencyDisplay() {
    const currencyElements = document.querySelectorAll('.currency-amount');
    currencyElements.forEach(element => {
        element.textContent = StableApp.butterflyCount.toString();
    });
}

function updateRewardDisplay() {
    console.log('🎁 Updating reward display');
    // Update any reward-related displays
    updateCurrencyDisplay();
}

function claimReward() {
    StableApp.butterflyCount += 100;
    updateCurrencyDisplay();
    
    // Navigate back to home after delay
    setTimeout(() => {
        navigateTo('home-default');
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

function goBack() {
    if (StableApp.previousScreen) {
        navigateTo(StableApp.previousScreen);
    } else {
        navigateTo('home-default');
    }
}

/* ==========================================
   🚀 INITIALIZATION
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🛡️ Stable Navigation System Initialized');
    
    // Start with welcome screen
    navigateTo('initial-load');
    
    // Setup global event listeners
    setupGlobalListeners();
});

function setupGlobalListeners() {
    // Bottom navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item, index) => {
        item.onclick = function() {
            switch(index) {
                case 0: navigateTo('home-default'); break;
                case 1: console.log('Benefits clicked'); break;
                case 2: navigateTo('challenge-active'); break;
                case 3: console.log('Social clicked'); break;
                case 4: console.log('Buddy clicked'); break;
            }
        };
    });
    
    // Currency page is now a regular screen, no modal click handler needed
}

/* ==========================================
   🌐 GLOBAL FUNCTION EXPORTS
   ========================================== */

// Make all functions globally available
window.navigateTo = navigateTo;
window.progressToHomepage = () => navigateTo('home-default');
window.navigateToHome = () => navigateTo('home-default');
window.navigateToChallenge = () => navigateTo('challenge-active');
window.navigateToChallengesPage = () => navigateTo('challenges-page');
window.navigateToClaimReward = () => navigateTo('claim-butterflies');
window.openCurrencyScreen = () => {
    console.log('💰 Opening currency page');
    navigateTo('currency-rewards');
};

// Add support for hash-based navigation
window.addEventListener('hashchange', function() {
    const hash = window.location.hash.substring(1);
    if (hash && hash !== '') {
        console.log('🔄 Hash navigation detected:', hash);
        navigateTo(hash);
    }
});

// Check for initial hash on page load
document.addEventListener('DOMContentLoaded', function() {
    const hash = window.location.hash.substring(1);
    if (hash && hash !== '') {
        console.log('🔄 Initial hash navigation:', hash);
        // Delay to ensure DOM is ready
        setTimeout(() => navigateTo(hash), 100);
    }
});

window.closeCurrencyScreen = () => {
    console.log('❌ Closing currency page - going back');
    goBack();
};

// Add missing function for currency screen mark complete button
window.markCompleteInCurrency = () => {
    console.log('✅ Marking task complete in currency screen');
    // Add any specific logic for marking complete in currency screen
    // For now, just show a success message
    alert('Task marked as complete!');
};
window.handleChallengeAction = () => {
    if (StableApp.challengeActive) {
        pauseChallenge();
    } else {
        startChallenge();
    }
};
window.markChallengeComplete = completeChallenge;
window.claimReward = claimReward;
window.goBack = goBack;

console.log('🛡️ Bulletproof Navigation System Ready!');
