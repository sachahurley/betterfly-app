// 🛡️ BULLETPROOF NAVIGATION SYSTEM
// Refactored for maximum reliability while maintaining exact design
// This replaces fragile inline handlers with robust event delegation

/* ==========================================
   🎯 ROBUST STATE MANAGEMENT
   ========================================== */

const BetterflyApp = {
    // Single source of truth for current state
    currentScreen: 'initial-load',
    previousScreen: null,
    
    // Challenge state
    challengeActive: false,
    timeRemaining: 120,
    challengeTimer: null,
    
    // Currency state
    butterflyCount: 165,
    
    // Debug mode (auto-detects environment)
    debug: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
    
    // Error tracking
    errorCount: 0,
    maxErrors: 5
};

/* ==========================================
   🛡️ BULLETPROOF NAVIGATION CORE
   ========================================== */

function navigateToScreen(screenId) {
    try {
        // Validate input
        if (!screenId || typeof screenId !== 'string') {
            throw new Error(`Invalid screen ID: ${screenId}`);
        }
        
        log(`🔄 Navigating to: ${screenId}`);
        
        // Store previous screen for back navigation
        BetterflyApp.previousScreen = BetterflyApp.currentScreen;
        
        // Hide all screens with error handling
        hideAllScreens();
        
        // Check if screen exists in DOM
        let targetScreen = document.getElementById(screenId);
        
        // If screen exists but is empty, load content from standalone file
        if (targetScreen && targetScreen.children.length === 0) {
            loadScreenContent(screenId, targetScreen);
        }
        
        if (!targetScreen) {
            throw new Error(`Screen not found: ${screenId}`);
        }
        
        // Show the target screen
        showScreen(targetScreen, screenId);
        
        // Initialize screen-specific functionality
        initializeScreen(screenId);
        
        log(`✅ Successfully navigated to: ${screenId}`);
        
    } catch (error) {
        handleError('Navigation failed', error);
        // Fallback to home screen
        if (screenId !== 'home-default') {
            navigateToScreen('home-default');
        }
    }
}

function hideAllScreens() {
    try {
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => {
            screen.classList.remove('active');
            screen.style.display = 'none';
        });
    } catch (error) {
        log('⚠️ Error hiding screens:', error);
        // Force hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.style.display = 'none';
        });
    }
}

function showScreen(screenElement, screenId) {
    try {
        log(`🔄 Showing screen: ${screenId}`);
        console.log(`🔄 Showing screen: ${screenId}`);
        
        screenElement.style.display = 'block';
        screenElement.classList.add('active');
        BetterflyApp.currentScreen = screenId;
        
        log(`✅ Screen ${screenId} displayed`);
        console.log(`✅ Screen ${screenId} displayed`);
        log(`   - Display: ${screenElement.style.display}`);
        console.log(`   - Display: ${screenElement.style.display}`);
        log(`   - Classes: ${screenElement.className}`);
        console.log(`   - Classes: ${screenElement.className}`);
        log(`   - Height: ${screenElement.offsetHeight}px`);
        console.log(`   - Height: ${screenElement.offsetHeight}px`);
        
        // Ensure screen is visible
        if (screenElement.offsetHeight === 0) {
            log('⚠️ Screen has no height, forcing visibility');
            console.log('⚠️ Screen has no height, forcing visibility');
            screenElement.style.minHeight = '100vh';
        }
        
    } catch (error) {
        log(`❌ Failed to show screen ${screenId}: ${error.message}`);
        console.error(`❌ Failed to show screen ${screenId}: ${error.message}`);
        throw new Error(`Failed to show screen ${screenId}: ${error.message}`);
    }
}

/* ==========================================
   🚀 SCREEN INITIALIZATION
   ========================================== */

function initializeScreen(screenId) {
    try {
        log(`🔧 Initializing screen: ${screenId}`);
        
        switch(screenId) {
            case 'home-default':
                initializeHomeScreen();
                break;
            case 'challenge-active':
                initializeChallengeScreen();
                break;
            case 'challenges-page':
                initializeChallengesPage();
                break;
            case 'currency-rewards':
                initializeCurrencyScreen();
                break;
            case 'claim-butterflies':
                initializeClaimScreen();
                break;
            default:
                log(`ℹ️ No specific initialization for: ${screenId}`);
        }
        
    } catch (error) {
        handleError(`Screen initialization failed for ${screenId}`, error);
    }
}

function initializeHomeScreen() {
    updateCurrencyDisplay();
    setupTaskInteractions();
}

function initializeChallengeScreen() {
    updateChallengeDisplay();
    updateCurrencyDisplay();
}

function initializeChallengesPage() {
    updateChallengeDisplay();
    updateCurrencyDisplay();
}

function initializeCurrencyScreen() {
    log('💰 Initializing currency screen');
    updateCurrencyDisplay();
    
    // Validate currency screen elements
    const currencyScreen = document.getElementById('currency-rewards');
    if (currencyScreen) {
        log('✅ Currency screen validated');
    } else {
        throw new Error('Currency screen not found during initialization');
    }
}

function initializeClaimScreen() {
    updateRewardDisplay();
}

/* ==========================================
   💰 CURRENCY SYSTEM
   ========================================== */

function updateCurrencyDisplay() {
    try {
        const currencyElements = document.querySelectorAll('.currency-amount');
        currencyElements.forEach(element => {
            element.textContent = BetterflyApp.butterflyCount.toString();
        });
        log(`💰 Updated currency display: ${BetterflyApp.butterflyCount}`);
    } catch (error) {
        handleError('Currency display update failed', error);
    }
}

function updateRewardDisplay() {
    updateCurrencyDisplay();
}

function addButterflies(amount) {
    try {
        BetterflyApp.butterflyCount += amount;
        updateCurrencyDisplay();
        log(`💰 Added ${amount} butterflies. Total: ${BetterflyApp.butterflyCount}`);
    } catch (error) {
        handleError('Failed to add butterflies', error);
    }
}

/* ==========================================
   ⏱️ CHALLENGE SYSTEM
   ========================================== */

function updateChallengeDisplay() {
    try {
        const challengeBtn = document.getElementById('challenge-btn');
        const challengeBtnText = document.getElementById('challenge-btn-text');
        
        if (challengeBtn && challengeBtnText) {
            if (BetterflyApp.challengeActive) {
                challengeBtnText.textContent = `Pause ${formatTime(BetterflyApp.timeRemaining)}`;
            } else {
                challengeBtnText.textContent = 'Start Challenge';
            }
        }
    } catch (error) {
        handleError('Challenge display update failed', error);
    }
}

function startChallenge() {
    try {
        BetterflyApp.challengeActive = true;
        updateChallengeDisplay();
        
        // Clear any existing timer
        if (BetterflyApp.challengeTimer) {
            clearInterval(BetterflyApp.challengeTimer);
        }
        
        // Start new timer
        BetterflyApp.challengeTimer = setInterval(() => {
            BetterflyApp.timeRemaining--;
            updateChallengeDisplay();
            
            if (BetterflyApp.timeRemaining <= 0) {
                completeChallenge();
            }
        }, 1000);
        
        log('⏱️ Challenge started');
    } catch (error) {
        handleError('Failed to start challenge', error);
    }
}

function pauseChallenge() {
    try {
        BetterflyApp.challengeActive = false;
        if (BetterflyApp.challengeTimer) {
            clearInterval(BetterflyApp.challengeTimer);
            BetterflyApp.challengeTimer = null;
        }
        updateChallengeDisplay();
        log('⏸️ Challenge paused');
    } catch (error) {
        handleError('Failed to pause challenge', error);
    }
}

function completeChallenge() {
    try {
        BetterflyApp.challengeActive = false;
        BetterflyApp.timeRemaining = 120;
        if (BetterflyApp.challengeTimer) {
            clearInterval(BetterflyApp.challengeTimer);
            BetterflyApp.challengeTimer = null;
        }
        
        log('✅ Challenge completed');
        navigateToScreen('claim-butterflies');
    } catch (error) {
        handleError('Failed to complete challenge', error);
    }
}

function claimReward() {
    try {
        addButterflies(100);
        
        // Show success message
        log('🎉 Reward claimed!');
        
        // Navigate back to home after delay
        setTimeout(() => {
            navigateToScreen('home-default');
        }, 2000);
    } catch (error) {
        handleError('Failed to claim reward', error);
    }
}

/* ==========================================
   🔧 TASK INTERACTIONS
   ========================================== */

function setupTaskInteractions() {
    try {
        // Find the challenge task and make it clickable
        const challengeTask = document.querySelector('.task.pending');
        if (challengeTask && challengeTask.textContent.includes('Complete Your Next Challenge')) {
            challengeTask.style.cursor = 'pointer';
            log('✅ Challenge task interaction setup');
        }
    } catch (error) {
        handleError('Task interaction setup failed', error);
    }
}

/* ==========================================
   📁 SCREEN CONTENT LOADING
   ========================================== */

function loadScreenContent(screenId, targetScreen) {
    try {
        // Map screen IDs to their file paths
        const screenFiles = {
            'challenges-page': 'screens/challenges-page.html',
            'currency-rewards': 'screens/currency-rewards.html',
            'challenge-active': 'screens/challenge-active.html',
            'claim-butterflies': 'screens/claim-butterflies.html',
            'welcome': 'screens/welcome.html',
            'home': 'screens/home.html'
        };
        
        const filePath = screenFiles[screenId];
        if (!filePath) {
            log(`⚠️ No standalone file found for screen: ${screenId}`);
            return;
        }
        
        // Fetch the screen file
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load screen file: ${filePath}`);
                }
                return response.text();
            })
            .then(html => {
                // Create a temporary container to parse the HTML
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                
                // Find the screen element
                const screenElement = tempDiv.querySelector(`#${screenId}`);
                if (!screenElement) {
                    log(`⚠️ Screen element not found in file: ${filePath}`);
                    return;
                }
                
                // Copy the content to the target screen
                targetScreen.innerHTML = screenElement.innerHTML;
                
                // Re-setup event delegation for the new content
                setupEventDelegation();
                
                log(`✅ Loaded content for screen: ${screenId}`);
            })
            .catch(error => {
                log(`❌ Failed to load screen content: ${screenId}`, error);
            });
            
    } catch (error) {
        log(`❌ Error loading screen content: ${screenId}`, error);
    }
}

/* ==========================================
   🛠️ UTILITY FUNCTIONS
   ========================================== */

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function goBack() {
    try {
        if (BetterflyApp.previousScreen) {
            navigateToScreen(BetterflyApp.previousScreen);
        } else {
            navigateToScreen('home-default');
        }
    } catch (error) {
        handleError('Back navigation failed', error);
        navigateToScreen('home-default');
    }
}

function log(message, data = null) {
    if (BetterflyApp.debug) {
        if (data) {
            console.log(message, data);
        } else {
            console.log(message);
        }
    }
}

function handleError(context, error) {
    BetterflyApp.errorCount++;
    
    log(`❌ ${context}:`, error);
    
    if (BetterflyApp.errorCount >= BetterflyApp.maxErrors) {
        log('🚨 Too many errors, resetting to home screen');
        BetterflyApp.errorCount = 0;
        navigateToScreen('home-default');
    }
}

/* ==========================================
   🌐 EVENT DELEGATION SYSTEM
   ========================================== */

function setupEventDelegation() {
    try {
        // Use event delegation for all interactions
        document.addEventListener('click', function(event) {
            const target = event.target.closest('[data-action]');
            if (!target) return;
            
            const action = target.getAttribute('data-action');
            if (!action) return;
            
            event.preventDefault();
            event.stopPropagation();
            
            handleAction(action, target);
        });
        
        log('✅ Event delegation system initialized');
    } catch (error) {
        handleError('Event delegation setup failed', error);
    }
}

function handleAction(action, element) {
    try {
        log(`🎯 Handling action: ${action}`);
        console.log(`🎯 Handling action: ${action}`, element); // Additional debugging
        
        switch(action) {
            case 'progress-to-homepage':
                navigateToScreen('home-default');
                break;
            case 'open-currency-screen':
                navigateToScreen('currency-rewards');
                break;
            case 'navigate-to-challenge':
                navigateToScreen('challenge-active');
                break;
            case 'navigate-to-challenges-page':
                navigateToScreen('challenges-page');
                break;
            case 'navigate-to-home':
                navigateToScreen('home-default');
                break;
            case 'close-currency-screen':
                goBack();
                break;
            case 'handle-challenge-action':
                if (BetterflyApp.challengeActive) {
                    pauseChallenge();
                } else {
                    startChallenge();
                }
                break;
            case 'mark-challenge-complete':
                completeChallenge();
                break;
            case 'claim-reward':
                claimReward();
                break;
            case 'mark-complete-in-currency':
                markCompleteInCurrency();
                break;
            case 'start-daily-challenge':
                startDailyChallenge();
                break;
            case 'view-challenge-details':
                viewChallengeDetails();
                break;
            default:
                log(`⚠️ Unknown action: ${action}`);
        }
    } catch (error) {
        handleError(`Action handling failed for ${action}`, error);
    }
}

function markCompleteInCurrency() {
    try {
        log('✅ Marking task complete in currency screen');
        // Add any specific logic for marking complete in currency screen
        alert('Task marked as complete!');
    } catch (error) {
        handleError('Mark complete in currency failed', error);
    }
}

function startDailyChallenge() {
    try {
        log('🚀 Starting daily challenge');
        // Navigate to challenge active screen for daily challenge
        navigateToScreen('challenge-active');
    } catch (error) {
        handleError('Failed to start daily challenge', error);
    }
}

function viewChallengeDetails() {
    try {
        log('👁️ Viewing challenge details');
        // For now, just show an alert - could be expanded to show modal or navigate
        alert('Challenge details would be shown here');
    } catch (error) {
        handleError('Failed to view challenge details', error);
    }
}

/* ==========================================
   🌐 GLOBAL FUNCTION EXPORTS
   ========================================== */

// Export all functions to global scope for backward compatibility
window.progressToHomepage = () => navigateToScreen('home-default');
window.navigateToHome = () => navigateToScreen('home-default');
window.navigateToChallenge = () => navigateToScreen('challenge-active');
window.navigateToChallengesPage = () => navigateToScreen('challenges-page');
window.openCurrencyScreen = () => navigateToScreen('currency-rewards');
window.closeCurrencyScreen = () => goBack();
window.handleChallengeAction = () => handleAction('handle-challenge-action', null);
window.markChallengeComplete = () => handleAction('mark-challenge-complete', null);
window.claimReward = () => handleAction('claim-reward', null);
window.markCompleteInCurrency = () => handleAction('mark-complete-in-currency', null);
window.startDailyChallenge = () => handleAction('start-daily-challenge', null);
window.viewChallengeDetails = () => handleAction('view-challenge-details', null);
window.goBack = goBack;

/* ==========================================
   🚀 INITIALIZATION
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    try {
        log('🛡️ Bulletproof Navigation System Initializing...');
        console.log('🛡️ Bulletproof Navigation System Initializing...');
        
        // Setup event delegation first
        setupEventDelegation();
        
        // Check for hash navigation
        const hash = window.location.hash.substring(1);
        if (hash && hash !== '') {
            log(`🔄 Hash navigation detected: ${hash}`);
            console.log(`🔄 Hash navigation detected: ${hash}`);
            setTimeout(() => navigateToScreen(hash), 100);
        } else {
            // Start with home screen by default (not welcome screen)
            log('🔄 Starting with home screen...');
            console.log('🔄 Starting with home screen...');
            
            // Check if home screen exists
            const homeScreen = document.getElementById('home-default');
            if (homeScreen) {
                log('✅ Home screen found in DOM');
                console.log('✅ Home screen found in DOM');
                log(`   - Classes: ${homeScreen.className}`);
                console.log(`   - Classes: ${homeScreen.className}`);
                log(`   - Display: ${homeScreen.style.display}`);
                console.log(`   - Display: ${homeScreen.style.display}`);
            } else {
                log('❌ Home screen NOT found in DOM');
                console.log('❌ Home screen NOT found in DOM');
            }
            
            navigateToScreen('home-default');
        }
        
        // Setup bottom navigation
        setupBottomNavigation();
        
        log('✅ Bulletproof Navigation System Ready!');
        console.log('✅ Bulletproof Navigation System Ready!');
        
    } catch (error) {
        handleError('System initialization failed', error);
        console.error('System initialization failed', error);
        // Fallback: try to show home screen
        setTimeout(() => navigateToScreen('home-default'), 1000);
    }
});

function setupBottomNavigation() {
    try {
        // 📝 LEARNING NOTE: Bottom Navigation is now handled by direct onclick handlers
        // This prevents conflicts with the old navigation system
        log('✅ Bottom navigation now uses direct onclick handlers - no setup needed');
    } catch (error) {
        handleError('Bottom navigation setup failed', error);
    }
}

// Add hash change listener for deep linking
window.addEventListener('hashchange', function() {
    const hash = window.location.hash.substring(1);
    if (hash && hash !== '') {
        log(`🔄 Hash change detected: ${hash}`);
        navigateToScreen(hash);
    }
});

log('🛡️ Bulletproof Navigation System Loaded!');
