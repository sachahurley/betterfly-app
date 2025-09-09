// 📝 LEARNING NOTE: Betterfly Post-Onboarding JavaScript
// This file handles all the interactive functionality for the post-onboarding flow
// including screen transitions, challenge timers, and state management

/* ==========================================
   🎯 STATE MANAGEMENT
   ========================================== */

// 📝 Global application state
const AppState = {
    currentScreen: 'initial-load',
    challengeStatus: 'not-started', // 'not-started', 'active', 'paused', 'completed'
    timeRemaining: 120, // 2 minutes in seconds
    totalTime: 120,
    activeTime: 0, // Time challenge has been active (for mark complete button)
    showMarkComplete: false,
    butterflyCount: 165,
    completedChallenges: 0,
    
    // Currency screen state
    previousScreen: null, // Track which screen to return to when closing currency screen
    
    // Dynamic task management
    tasks: {
        'questionnaire': { id: 'questionnaire', name: 'Questionnaire', reward: 0, completed: true, time: '0 min' },
        'connect-wearable': { id: 'connect-wearable', name: 'Connect Wearable', reward: 0, completed: true, time: '0 min' },
        'create-profile': { id: 'create-profile', name: 'Create Profile', reward: 0, completed: true, time: '0 min' },
        'complete-challenge': { id: 'complete-challenge', name: 'Complete Your Next Challenge', reward: 100, completed: false, time: '5 min' },
        'discover-store': { id: 'discover-store', name: 'Discover The Rewards Store', reward: 25, completed: false, time: '3 min' },
        'redeem-reward': { id: 'redeem-reward', name: 'Redeem Your First Reward', reward: 0, completed: false, time: '2 min' },
        'explore-lsa': { id: 'explore-lsa', name: 'Explore Your LSA Benefit Card', reward: 50, completed: false, time: '2 min' },
        'review-profile': { id: 'review-profile', name: 'Review Your Profile', reward: 25, completed: false, time: '1 min' }
    },
    
    // Timer references
    challengeTimer: null,
    markCompleteTimer: null
};

/* ==========================================
   🚀 INITIALIZATION
   ========================================== */

// 📝 LEARNING NOTE: Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🦋 Betterfly Post-Onboarding Flow Initialized');
    
    // Check for hash fragment to determine initial screen
    const hash = window.location.hash.substring(1); // Remove the # symbol
    
    if (hash === 'currency-rewards') {
        // If navigating directly to currency rewards, show home screen first then currency
        showScreen('home-default');
        // Small delay to ensure home screen is loaded before showing currency overlay
        setTimeout(() => {
            document.getElementById('currency-rewards').classList.add('active');
        }, 100);
    } else {
        // Start with welcome screen (no auto-transition)
        showScreen('initial-load');
    }
    
    // Initialize event listeners
    initializeEventListeners();
    
    // Load saved state first
    loadAppState();
    
    // Initialize UI state
    updateUI();
});

/* ==========================================
   📱 SCREEN MANAGEMENT
   ========================================== */

// 📝 LEARNING NOTE: CTA Button Handler for Welcome Screen
function progressToHomepage() {
    console.log('🚀 CTA Button clicked - Progressing to homepage');
    showScreen('home-default');
}

// 📝 LEARNING NOTE: Handle screen transitions with smooth animations
function showScreen(screenId) {
    console.log(`📱 Transitioning to screen: ${screenId}`);
    console.log(`Previous screen: ${AppState.currentScreen}`);
    
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    console.log(`Found ${screens.length} screen elements`);
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen with a slight delay for smooth transition
    setTimeout(() => {
        const targetScreen = document.getElementById(screenId);
        console.log(`Target screen element:`, targetScreen);
        if (targetScreen) {
            targetScreen.classList.add('active');
            console.log(`✅ Screen ${screenId} is now active`);
            AppState.currentScreen = screenId;
            
            // Update navigation state
            updateNavigationState(screenId);
            
            // Screen-specific initialization
            onScreenEnter(screenId);
            
            // Verify the screen is actually visible
            setTimeout(() => {
                const isVisible = targetScreen.classList.contains('active');
                console.log(`🔍 Screen ${screenId} visibility check: ${isVisible}`);
                if (!isVisible) {
                    console.error(`❌ Screen ${screenId} failed to become visible!`);
                }
            }, 50);
        } else {
            console.error(`❌ Screen not found: ${screenId}`);
            console.error(`Available screens:`, Array.from(document.querySelectorAll('.screen')).map(s => s.id));
        }
    }, 100);
}

// 📝 Handle screen-specific setup when entering a screen
function onScreenEnter(screenId) {
    switch(screenId) {
        case 'initial-load':
            // Add loading animation or effects here
            break;
            
        case 'home-default':
            // Update task list, currency counter, etc.
            updateTaskList();
            updateCurrencyDisplay();
            setupCurrencyCounterForScreen();
            break;
            
        case 'challenge-active':
            // Initialize challenge state
            updateChallengeDisplay();
            break;
            
        case 'claim-butterflies':
            // Initialize reward display
            updateRewardDisplay();
            break;
            
        case 'currency-rewards':
            // Initialize currency screen
            updateCurrencyDisplay();
            break;
            
        case 'challenges-page':
            // Initialize challenges page interactions
            initializeChallengesPage();
            updateCurrencyDisplay();
            setupCurrencyCounterForScreen();
            break;
    }
}

// 📝 Update bottom navigation active state
function updateNavigationState(screenId) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    // Map screens to navigation items
    const navMapping = {
        'home-default': 0,
        'challenge-active': 2, // Journey tab
    };
    
    const activeIndex = navMapping[screenId];
    if (activeIndex !== undefined && navItems[activeIndex]) {
        navItems[activeIndex].classList.add('active');
    }
}

/* ==========================================
   🎮 EVENT LISTENERS
   ========================================== */

// 📝 LEARNING NOTE: Set up all interactive elements
function initializeEventListeners() {
    // Bottom navigation
    setupBottomNavigation();
    
    // Challenge interactions
    setupChallengeInteractions();
    
    // Task interactions
    setupTaskInteractions();
    
    // Reward interactions
    setupRewardInteractions();
    
    // Currency counter interactions
    setupCurrencyCounterInteractions();
}

// 📝 Bottom navigation setup
function setupBottomNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            switch(index) {
                case 0: // Home
                    showScreen('home-default');
                    break;
                case 1: // Benefits
                    // Could navigate to benefits screen (not implemented)
                    console.log('🌟 Benefits navigation clicked');
                    break;
                case 2: // Journey
                    showScreen('challenge-active');
                    break;
                case 3: // Social
                    // Could navigate to social screen (not implemented)
                    console.log('👥 Social navigation clicked');
                    break;
                case 4: // Buddy
                    // Could show buddy interactions (not implemented)
                    console.log('🤖 Buddy clicked');
                    break;
            }
        });
    });
}

// 📝 Challenge interaction setup
function setupChallengeInteractions() {
    // Challenge button click handler is set up via onclick in HTML
    // Mark complete button click handler is set up via onclick in HTML
}

// 📝 Task interaction setup  
function setupTaskInteractions() {
    // Task click handlers are set up via onclick in HTML
}

// 📝 Reward interaction setup
function setupRewardInteractions() {
    // Claim button click handler is set up via onclick in HTML
}

// 📝 Currency counter interactions setup
function setupCurrencyCounterInteractions() {
    console.log('💰 Setting up currency counter interactions - initial setup');
    
    // This will be called on DOM ready
    setupCurrencyCounterForScreen();
}

// 📝 Setup currency counters for the current screen
function setupCurrencyCounterForScreen() {
    console.log('💰 Setting up currency counter for current screen');
    
    // Find all currency counters in the app
    const currencyCounters = document.querySelectorAll('.currency-counter');
    console.log(`💰 Found ${currencyCounters.length} currency counters`);
    
    currencyCounters.forEach((counter, index) => {
        console.log(`💰 Setting up counter ${index + 1}`);
        
        // Clear any existing handlers
        counter.onclick = null;
        
        // Add multiple ways to ensure the click works
        counter.onclick = function(e) {
            console.log('💰 Currency counter clicked (onclick)!');
            e.preventDefault();
            e.stopPropagation();
            
            // Call the function directly
            if (typeof window.openCurrencyScreen === 'function') {
                window.openCurrencyScreen();
            } else {
                console.error('❌ openCurrencyScreen function not available');
            }
            return false;
        };
        
        // Also add event listener as backup
        counter.addEventListener('click', function(e) {
            console.log('💰 Currency counter clicked (listener)!');
            e.preventDefault();
            e.stopPropagation();
            
            if (typeof window.openCurrencyScreen === 'function') {
                window.openCurrencyScreen();
            } else {
                console.error('❌ openCurrencyScreen function not available');
            }
        });
        
        // Add visual feedback
        counter.style.cursor = 'pointer';
        counter.title = 'Open rewards store';
    });
}

/* ==========================================
   🎯 NAVIGATION FUNCTIONS
   ========================================== */

// 📝 LEARNING NOTE: These functions are called from HTML onclick attributes
// This approach makes the connection between HTML and JS very clear for learning

function navigateToHome() {
    console.log('🏠 Navigating to home');
    showScreen('home-default');
}

function navigateToChallenge() {
    console.log('🎯 Navigating to challenge');
    showScreen('challenge-active');
}

function navigateToClaimReward() {
    console.log('🎉 Navigating to claim reward');
    showScreen('claim-butterflies');
}

function navigateToChallengesPage() {
    console.log('🎯 Navigating to challenges page');
    console.log('Current screen before navigation:', AppState.currentScreen);
    
    // Ensure the challenges page element exists
    const challengesPageElement = document.getElementById('challenges-page');
    if (!challengesPageElement) {
        console.error('❌ Challenges page element not found! Falling back to challenge-active screen');
        showScreen('challenge-active');
        return;
    }
    
    console.log('Challenges page element found:', challengesPageElement);
    
    // Navigate to challenges page
    showScreen('challenges-page');
    
    // Add a small delay to ensure the screen transition completes
    setTimeout(() => {
        console.log('Challenges page should now be visible');
        console.log('Current screen after navigation:', AppState.currentScreen);
        
        // Fallback check: if we're still not on the challenges page, try challenge-active
        if (AppState.currentScreen !== 'challenges-page') {
            console.log('⚠️ Challenges page navigation failed, falling back to challenge-active');
            showScreen('challenge-active');
        }
    }, 200);
}

// 📝 LEARNING NOTE: Currency Screen Navigation Functions
// These functions handle opening and closing the currency/rewards screen

// 📝 Make this function globally available
window.openCurrencyScreen = function openCurrencyScreen() {
    console.log('💰 Opening currency screen');
    console.log('Currency rewards element:', document.getElementById('currency-rewards'));
    
    // Store the current screen so we can return to it
    AppState.previousScreen = AppState.currentScreen;
    
    // Navigate to currency screen
    showScreen('currency-rewards');
    console.log('Screen should now be active');
}

// 📝 Make this function globally available
window.closeCurrencyScreen = function closeCurrencyScreen() {
    console.log('❌ Closing currency screen');
    
    // Return to the previous screen
    if (AppState.previousScreen) {
        showScreen(AppState.previousScreen);
        AppState.previousScreen = null; // Clear the stored screen
    } else {
        // Fallback to home screen if no previous screen is stored
        showScreen('home-default');
    }
}

/* ==========================================
   ⏱️ CHALLENGE TIMER SYSTEM
   ========================================== */

// 📝 LEARNING NOTE: Complete challenge timer system with multiple states
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
    
    updateChallengeDisplay();
}

// 📝 Start the challenge timer
function startChallenge() {
    console.log('▶️ Starting challenge');
    AppState.challengeStatus = 'active';
    AppState.activeTime = 0;
    AppState.showMarkComplete = false;
    
    // Start main timer
    AppState.challengeTimer = setInterval(() => {
        AppState.timeRemaining--;
        
        if (AppState.timeRemaining <= 0) {
            completeChallenge();
        }
        
        updateChallengeDisplay();
    }, 1000);
    
    // Start mark complete timer
    AppState.markCompleteTimer = setInterval(() => {
        AppState.activeTime++;
        
        // Show "Mark as complete" after 3 seconds
        if (AppState.activeTime >= 3) {
            AppState.showMarkComplete = true;
            updateMarkCompleteButton();
        }
    }, 1000);
}

// 📝 Pause the challenge
function pauseChallenge() {
    console.log('⏸️ Pausing challenge');
    AppState.challengeStatus = 'paused';
    
    if (AppState.challengeTimer) {
        clearInterval(AppState.challengeTimer);
        AppState.challengeTimer = null;
    }
    
    if (AppState.markCompleteTimer) {
        clearInterval(AppState.markCompleteTimer);
        AppState.markCompleteTimer = null;
    }
}

// 📝 Resume the challenge
function resumeChallenge() {
    console.log('▶️ Resuming challenge');
    AppState.challengeStatus = 'active';
    
    // Restart timers
    AppState.challengeTimer = setInterval(() => {
        AppState.timeRemaining--;
        
        if (AppState.timeRemaining <= 0) {
            completeChallenge();
        }
        
        updateChallengeDisplay();
    }, 1000);
    
    AppState.markCompleteTimer = setInterval(() => {
        AppState.activeTime++;
        
        if (AppState.activeTime >= 3) {
            AppState.showMarkComplete = true;
            updateMarkCompleteButton();
        }
    }, 1000);
}

// 📝 Complete the challenge (either by timer or manual mark)
function completeChallenge() {
    console.log('✅ Challenge completed');
    AppState.challengeStatus = 'completed';
    AppState.completedChallenges++;
    
    // Clear timers
    if (AppState.challengeTimer) {
        clearInterval(AppState.challengeTimer);
        AppState.challengeTimer = null;
    }
    
    if (AppState.markCompleteTimer) {
        clearInterval(AppState.markCompleteTimer);
        AppState.markCompleteTimer = null;
    }
    
    updateChallengeDisplay();
    
    // Auto-navigate to claim screen after a short delay
    setTimeout(() => {
        navigateToClaimReward();
    }, 1500);
}

// 📝 Reset challenge to initial state
function resetChallenge() {
    console.log('🔄 Resetting challenge');
    AppState.challengeStatus = 'not-started';
    AppState.timeRemaining = AppState.totalTime;
    AppState.activeTime = 0;
    AppState.showMarkComplete = false;
    
    // Clear any active timers
    if (AppState.challengeTimer) {
        clearInterval(AppState.challengeTimer);
        AppState.challengeTimer = null;
    }
    
    if (AppState.markCompleteTimer) {
        clearInterval(AppState.markCompleteTimer);
        AppState.markCompleteTimer = null;
    }
}

// 📝 Manual challenge completion
function markChallengeComplete() {
    console.log('✋ Manually marking challenge complete');
    completeChallenge();
}

/* ==========================================
   🎯 CHALLENGES PAGE INTERACTIONS
   ========================================== */

// 📝 LEARNING NOTE: New functions for the challenges page interactions
// These handle the specific interactions on the challenges page

// 📝 Handle challenge action button on challenges page
function handleChallengesPageAction() {
    console.log('🎯 Challenges page action clicked');
    
    // For now, navigate to the existing challenge flow
    // This could be expanded to handle different types of challenges
    navigateToChallenge();
}

// 📝 Handle weekly challenge group expansion/collapse
function toggleWeekGroup(weekElement) {
    console.log('📅 Toggling week group');
    
    const isExpanded = weekElement.classList.contains('expanded');
    
    if (isExpanded) {
        weekElement.classList.remove('expanded');
        // Hide daily challenges list
        const dailyList = weekElement.querySelector('.daily-challenges-list');
        if (dailyList) {
            dailyList.style.display = 'none';
        }
        // Update expand icon
        const expandIcon = weekElement.querySelector('.expand-icon');
        if (expandIcon) {
            expandIcon.classList.remove('up');
            expandIcon.classList.add('down');
        }
    } else {
        weekElement.classList.add('expanded');
        // Show daily challenges list
        const dailyList = weekElement.querySelector('.daily-challenges-list');
        if (dailyList) {
            dailyList.style.display = 'flex';
        }
        // Update expand icon
        const expandIcon = weekElement.querySelector('.expand-icon');
        if (expandIcon) {
            expandIcon.classList.remove('down');
            expandIcon.classList.add('up');
        }
    }
}

// 📝 Handle individual daily challenge item click
function handleDailyChallengeClick(challengeElement) {
    console.log('📝 Daily challenge clicked');
    
    const challengeStatus = challengeElement.classList.contains('completed') ? 'completed' : 
                           challengeElement.classList.contains('active') ? 'active' : 'pending';
    
    console.log(`Challenge status: ${challengeStatus}`);
    
    // For active challenges, navigate to challenge flow
    if (challengeStatus === 'active') {
        navigateToChallenge();
    } else if (challengeStatus === 'pending') {
        // Could show a message or navigate to challenge setup
        console.log('Challenge not yet available');
    } else {
        // Completed challenge - could show details or do nothing
        console.log('Challenge already completed');
    }
}

// 📝 Initialize challenges page interactions
function initializeChallengesPage() {
    console.log('🎯 Initializing challenges page interactions');
    
    // Add click handlers to weekly challenge groups
    const weekGroups = document.querySelectorAll('.week-group');
    weekGroups.forEach(weekGroup => {
        const header = weekGroup.querySelector('.week-group-header');
        if (header) {
            header.addEventListener('click', () => toggleWeekGroup(weekGroup));
        }
    });
    
    // Add click handlers to daily challenge items
    const dailyChallenges = document.querySelectorAll('.challenge-item');
    dailyChallenges.forEach(challenge => {
        challenge.addEventListener('click', () => handleDailyChallengeClick(challenge));
    });
    
    // Add click handler to challenge action button
    const challengeActionBtn = document.querySelector('.challenge-action-button');
    if (challengeActionBtn) {
        challengeActionBtn.addEventListener('click', handleChallengesPageAction);
    }
}

/* ==========================================
   🎨 UI UPDATE FUNCTIONS
   ========================================== */

// 📝 LEARNING NOTE: Update all UI elements to reflect current state
function updateUI() {
    updateChallengeDisplay();
    updateCurrencyDisplay();
    updateTaskList();
    updateMarkCompleteButton();
}

// 📝 Update challenge button and timer display
function updateChallengeDisplay() {
    const challengeBtn = document.getElementById('challenge-btn');
    const challengeBtnText = document.getElementById('challenge-btn-text');
    const buttonIcon = challengeBtn?.querySelector('.button-icon');
    
    if (!challengeBtn || !challengeBtnText || !buttonIcon) return;
    
    // Update button text and icon based on challenge status
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

// 📝 Update mark complete button visibility
function updateMarkCompleteButton() {
    const markCompleteBtn = document.getElementById('mark-complete-btn');
    if (!markCompleteBtn) return;
    
    const shouldShow = AppState.showMarkComplete && 
                      (AppState.challengeStatus === 'active' || AppState.challengeStatus === 'paused');
    
    if (shouldShow) {
        markCompleteBtn.classList.remove('hidden');
    } else {
        markCompleteBtn.classList.add('hidden');
    }
}

// 📝 Update currency display throughout the app
function updateCurrencyDisplay() {
    // Update currency counter in navigation
    const currencyElements = document.querySelectorAll('.currency-amount');
    currencyElements.forEach(element => {
        element.textContent = AppState.butterflyCount.toString();
    });
    
    // Update "Available Betterflies" section on currency screen
    const availableAmount = document.querySelector('.available-amount');
    if (availableAmount) {
        availableAmount.textContent = AppState.butterflyCount.toString();
    }
    
    console.log(`💰 Currency display updated: ${AppState.butterflyCount} butterflies`);
}

// 📝 LEARNING NOTE: Dynamic Task Management System
// This system allows tasks to be completed in any order and updates the UI accordingly

// 📝 Update task list progress dynamically
function updateTaskList() {
    console.log('📝 Updating task list dynamically');
    
    // Get all task elements
    const taskElements = document.querySelectorAll('.task');
    
    // Find the index of the first pending task after completed tasks
    let firstPendingIndex = -1;
    const tasksArray = Object.values(AppState.tasks);
    for (let i = 0; i < tasksArray.length; i++) {
        if (!tasksArray[i].completed) {
            firstPendingIndex = i;
            break;
        }
    }
    
    // Update each task based on current state
    tasksArray.forEach((task, index) => {
        if (taskElements[index]) {
            const taskElement = taskElements[index];
            const taskIcon = taskElement.querySelector('.task-icon');
            const taskText = taskElement.querySelector('.task-text');
            const taskChevron = taskElement.querySelector('.task-chevron');
            
            // Update task classes
            taskElement.className = `task ${task.completed ? 'completed' : 'pending'}`;
            
            // Update icon - first pending task gets the blue arrow icon
            if (taskIcon) {
                if (task.completed) {
                    taskIcon.className = 'task-icon check';
                } else if (index === firstPendingIndex) {
                    taskIcon.className = 'task-icon active';  // Blue arrow for first pending task
                } else {
                    taskIcon.className = 'task-icon pending';
                }
            }
            
            // Update text
            if (taskText) {
                taskText.textContent = task.name;
            }
            
            // Hide chevron for completed tasks
            if (taskChevron) {
                taskChevron.style.display = task.completed ? 'none' : 'block';
            }
            
            // Add click handler for incomplete tasks
            if (!task.completed) {
                // Special handling for the complete-challenge task
                if (task.id === 'complete-challenge') {
                    taskElement.onclick = () => {
                        console.log('🎯 Complete challenge task clicked');
                        // Try challenges page first, fallback to challenge-active if needed
                        navigateToChallengesPage();
                    };
                } else {
                    taskElement.onclick = () => completeTask(task.id);
                }
                taskElement.style.cursor = 'pointer';
            } else {
                taskElement.onclick = null;
                taskElement.style.cursor = 'default';
            }
        }
    });
    
    // Update progress indicator
    updateProgressIndicator();
}

// 📝 Complete a task and update state
function completeTask(taskId) {
    console.log(`✅ Completing task: ${taskId}`);
    
    const task = AppState.tasks[taskId];
    if (!task || task.completed) {
        console.log('❌ Task not found or already completed');
        return;
    }
    
    // Mark task as completed
    task.completed = true;
    
    // Add reward to butterfly count
    if (task.reward > 0) {
        AppState.butterflyCount += task.reward;
        console.log(`💰 Added ${task.reward} butterflies. New total: ${AppState.butterflyCount}`);
    }
    
    // Update UI
    updateTaskList();
    updateCurrencyDisplay();
    
    // Save state
    saveAppState();
    
    // Show completion feedback
    showTaskCompletionFeedback(task);
}

// 📝 Update progress indicator (3/8, 4/8, etc.)
function updateProgressIndicator() {
    const completedCount = Object.values(AppState.tasks).filter(task => task.completed).length;
    const totalCount = Object.keys(AppState.tasks).length;
    
    const progressText = document.querySelector('.progress-text');
    if (progressText) {
        progressText.textContent = `${completedCount}/${totalCount} completed`;
    }
    
    // Calculate percentage
    const percentage = (completedCount / totalCount) * 100;
    
    // Update progress bar
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }
    
    console.log(`📊 Progress updated: ${completedCount}/${totalCount} (${Math.round(percentage)}%)`);
}

// 📝 Show task completion feedback
function showTaskCompletionFeedback(task) {
    console.log(`🎉 Task completed: ${task.name}`);
    
    // Create a simple toast notification
    const toast = document.createElement('div');
    toast.className = 'task-completion-toast';
    toast.innerHTML = `
        <div class="toast-content">
            <div class="toast-icon">✅</div>
            <div class="toast-text">
                <div class="toast-title">Task Completed!</div>
                <div class="toast-message">${task.name}</div>
                ${task.reward > 0 ? `<div class="toast-reward">+${task.reward} butterflies</div>` : ''}
            </div>
        </div>
    `;
    
    // Add toast styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--background-white);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-md);
        padding: var(--spacing-md);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        animation: slideDown 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// 📝 Update reward display
function updateRewardDisplay() {
    // This could show different reward amounts based on challenge completion
    console.log('🎁 Reward display updated');
}

/* ==========================================
   🎉 REWARD SYSTEM
   ========================================== */

// 📝 Handle claiming rewards
function claimReward() {
    console.log('🎉 Claiming reward!');
    
    // Add butterflies to total
    const rewardAmount = 100;
    AppState.butterflyCount += rewardAmount;
    
    // Update UI
    updateCurrencyDisplay();
    
    // Add celebration effect
    addCelebrationEffect();
    
    // Navigate back to home after a delay
    setTimeout(() => {
        showScreen('home-default');
    }, 2000);
}

// 📝 Add visual celebration effect
function addCelebrationEffect() {
    console.log('🎊 Adding celebration effect');
    
    // Create confetti or other visual effects
    const button = document.querySelector('.animated-claim-button');
    if (button) {
        button.style.transform = 'scale(1.1)';
        button.style.boxShadow = '0 10px 30px rgba(13, 229, 91, 0.4)';
        
        setTimeout(() => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = 'var(--shadow-lg)';
        }, 300);
    }
    
    // Could add particle effects, sound, etc.
}

/* ==========================================
   🔧 UTILITY FUNCTIONS
   ========================================== */

// 📝 Format time in MM:SS format
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// 📝 Add fade-in animation to elements
function addFadeInAnimation(element) {
    if (element) {
        element.classList.add('fade-in');
        setTimeout(() => {
            element.classList.remove('fade-in');
        }, 500);
    }
}

// 📝 Add slide-in animation to elements
function addSlideInAnimation(element) {
    if (element) {
        element.classList.add('slide-in');
        setTimeout(() => {
            element.classList.remove('slide-in');
        }, 300);
    }
}

// 📝 Show toast notification (could be expanded)
function showToast(message, type = 'info') {
    console.log(`🍞 Toast: ${message} (${type})`);
    // Could create actual toast UI element here
}

// 📝 Haptic feedback for mobile devices
function triggerHaptic() {
    if (navigator.vibrate) {
        navigator.vibrate(50); // 50ms vibration
    }
}

/* ==========================================
   📊 ANALYTICS & TRACKING
   ========================================== */

// 📝 Track user interactions (could integrate with analytics service)
function trackEvent(eventName, properties = {}) {
    console.log('📊 Event tracked:', eventName, properties);
    
    // Example analytics tracking
    const eventData = {
        event: eventName,
        timestamp: new Date().toISOString(),
        screen: AppState.currentScreen,
        ...properties
    };
    
    // Could send to analytics service here
    // analytics.track(eventData);
}

// 📝 Track screen views
function trackScreenView(screenName) {
    trackEvent('screen_view', {
        screen_name: screenName,
        previous_screen: AppState.currentScreen
    });
}

// 📝 Track challenge interactions
function trackChallengeEvent(action) {
    trackEvent('challenge_interaction', {
        action: action,
        challenge_status: AppState.challengeStatus,
        time_remaining: AppState.timeRemaining,
        active_time: AppState.activeTime
    });
}

/* ==========================================
   💾 DATA PERSISTENCE
   ========================================== */

// 📝 Save app state to localStorage
function saveAppState() {
    try {
        const stateToSave = {
            butterflyCount: AppState.butterflyCount,
            completedChallenges: AppState.completedChallenges,
            tasks: AppState.tasks,
            lastSession: new Date().toISOString()
        };
        
        localStorage.setItem('betterfly_post_onboarding_state', JSON.stringify(stateToSave));
        console.log('💾 App state saved');
    } catch (error) {
        console.error('❌ Failed to save app state:', error);
    }
}

// 📝 Load app state from localStorage
function loadAppState() {
    try {
        const savedState = localStorage.getItem('betterfly_post_onboarding_state');
        if (savedState) {
            const parsedState = JSON.parse(savedState);
            
            AppState.butterflyCount = parsedState.butterflyCount || 165;
            AppState.completedChallenges = parsedState.completedChallenges || 0;
            
            // Load task states if available
            if (parsedState.tasks) {
                Object.keys(parsedState.tasks).forEach(taskId => {
                    if (AppState.tasks[taskId]) {
                        AppState.tasks[taskId].completed = parsedState.tasks[taskId].completed;
                    }
                });
            }
            
            console.log('💾 App state loaded');
            updateUI();
        }
    } catch (error) {
        console.error('❌ Failed to load app state:', error);
    }
}

// 📝 Clear saved state (for testing/reset)
function clearAppState() {
    localStorage.removeItem('betterfly_post_onboarding_state');
    console.log('🗑️ App state cleared');
}

/* ==========================================
   🔧 DEBUG & DEVELOPMENT HELPERS
   ========================================== */

// 📝 LEARNING NOTE: Development helpers for testing and debugging
// These functions can be called from browser console during development

window.BetterflyDebug = {
    // Quick screen navigation
    showScreen: showScreen,
    
    // State inspection
    getState: () => AppState,
    setState: (newState) => Object.assign(AppState, newState),
    
    // Challenge testing
    startChallenge: startChallenge,
    completeChallenge: completeChallenge,
    resetChallenge: resetChallenge,
    
    // Reward testing
    addButterflies: (amount) => {
        AppState.butterflyCount += amount;
        updateCurrencyDisplay();
    },
    
    // Data management
    saveState: saveAppState,
    loadState: loadAppState,
    clearState: clearAppState,
    
    // UI testing
    updateUI: updateUI,
    
    // Analytics testing
    trackEvent: trackEvent,
    
    // Task management testing
    completeTask: completeTask,
    resetTasks: () => {
        Object.values(AppState.tasks).forEach(task => {
            if (task.id !== 'questionnaire' && task.id !== 'connect-wearable' && task.id !== 'create-profile') {
                task.completed = false;
            }
        });
        AppState.butterflyCount = 165;
        updateUI();
        saveAppState();
        console.log('🔄 Tasks reset to initial state');
    }
};

// 📝 Log debug helper availability
console.log('🐛 Debug helpers available at window.BetterflyDebug');
console.log('🎯 Try: BetterflyDebug.showScreen("challenge-active")');
console.log('💰 Try: BetterflyDebug.addButterflies(100)');
console.log('✅ Try: BetterflyDebug.completeTask("discover-store")');
console.log('🔄 Try: BetterflyDebug.resetTasks()');

/* ==========================================
   🧹 CLEANUP & ERROR HANDLING
   ========================================== */

// 📝 Clean up timers when page unloads
window.addEventListener('beforeunload', () => {
    if (AppState.challengeTimer) {
        clearInterval(AppState.challengeTimer);
    }
    
    if (AppState.markCompleteTimer) {
        clearInterval(AppState.markCompleteTimer);
    }
    
    // Save state before leaving
    saveAppState();
});

// 📝 Global error handling
window.addEventListener('error', (event) => {
    console.error('❌ JavaScript error:', event.error);
    
    // Could send error reports to monitoring service
    trackEvent('javascript_error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
    });
});

// 📝 Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('❌ Unhandled promise rejection:', event.reason);
    
    trackEvent('unhandled_promise_rejection', {
        reason: event.reason?.toString()
    });
});

/* ==========================================
   🚀 INITIALIZATION COMPLETE
   ========================================== */

// 📝 FINAL GLOBAL FUNCTION SETUP - Ensure currency functions are available
// This is a backup in case the earlier assignments didn't work
if (typeof window.openCurrencyScreen === 'undefined') {
    window.openCurrencyScreen = function() {
        console.log('💰 Opening currency screen (global fallback)');
        AppState.previousScreen = AppState.currentScreen;
        showScreen('currency-rewards');
    };
}

if (typeof window.closeCurrencyScreen === 'undefined') {
    window.closeCurrencyScreen = function() {
        console.log('❌ Closing currency screen (global fallback)');
        if (AppState.previousScreen) {
            showScreen(AppState.previousScreen);
            AppState.previousScreen = null;
        } else {
            showScreen('home-default');
        }
    };
}

// Add to debug helpers
window.BetterflyDebug.openCurrencyScreen = window.openCurrencyScreen;
window.BetterflyDebug.closeCurrencyScreen = window.closeCurrencyScreen;

console.log('✅ Betterfly Post-Onboarding JavaScript loaded successfully');
console.log('🦋 Ready for user interaction');
console.log('💰 Currency functions available:', typeof window.openCurrencyScreen, typeof window.closeCurrencyScreen);

// 📝 LEARNING NOTE: End of JavaScript file
// This comprehensive script handles all the interactive functionality
// while maintaining clear separation of concerns and educational comments
