// App Configuration
let APP_CONFIG = {
    dailyHabits: {
        1: [
            { id: 1, text: "Drink a glass of water", points: 10 },
            { id: 2, text: "Take 5 deep breaths", points: 15 },
            { id: 3, text: "Write 3 gratitudes", points: 20 }
        ],
        2: [
            { id: 4, text: "5-minute morning walk", points: 15 },
            { id: 5, text: "Eat a piece of fruit", points: 10 },
            { id: 6, text: "Stretch for 3 minutes", points: 15 }
        ],
        3: [
            { id: 1, text: "Drink a glass of water", points: 10 },
            { id: 7, text: "No phone for 30 min", points: 25 },
            { id: 8, text: "Connect with a friend", points: 20 }
        ],
        4: [
            { id: 9, text: "10 push-ups", points: 20 },
            { id: 2, text: "Take 5 deep breaths", points: 15 },
            { id: 10, text: "Read for 10 minutes", points: 15 }
        ],
        5: [
            { id: 4, text: "5-minute morning walk", points: 15 },
            { id: 11, text: "Listen to calm music", points: 10 },
            { id: 12, text: "Plan tomorrow", points: 20 }
        ]
    },
    dayNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    settingsOptions: {
        primaryGoal: {
            title: 'Primary Goal',
            options: ['Improve Wellness', 'Boost Productivity', 'Sleep Better', 'Reduce Stress', 'Build Strength', 'Lose Weight'],
            valueId: 'primaryGoalValue',
            multiSelect: false
        },
        biggestBlocker: {
            title: 'Biggest Blocker',
            options: ['Lack of Time', 'Low Motivation', 'No Clear Plan', 'Too Tired', 'Lack of Support', 'Inconsistent Schedule'],
            valueId: 'biggestBlockerValue',
            multiSelect: true
        },
        topInterests: {
            title: 'Top Interests',
            options: ['Mindfulness & Fitness', 'Nutrition & Diet', 'Mental Health', 'Yoga & Meditation', 'Running & Cardio', 'Strength Training'],
            valueId: 'topInterestsValue',
            multiSelect: true
        },
        dailyTime: {
            title: 'Daily Time Available',
            options: ['5-10 minutes', '15-30 minutes', '30-45 minutes', '45-60 minutes', 'Over 1 hour'],
            valueId: 'dailyTimeValue',
            multiSelect: false
        },
        supportType: {
            title: 'Preferred Support Type',
            options: ['Daily Reminders', 'Weekly Check-ins', 'Community Support', 'Personal Coach', 'Progress Reports', 'Achievement Badges'],
            valueId: 'supportTypeValue',
            multiSelect: true
        }
    }
};

// App State
let gameState = {
    currentDay: 1,
    totalPoints: 0,
    daysCompleted: {},
    habitsCompleted: {},
    expandedDays: { 1: true },
    todayProgress: 0
};

let currentSettingType = null;
let tempMultiSelectValues = [];

// Initialize App
function initializeApp() {
    console.log('Initializing app...');
    
    // 🔴 ADDED: Check if user has completed onboarding
    checkOnboardingStatus();
    
    loadGameState();
    console.log('Game state loaded:', gameState);
    
    // 🔴 ADDED: Personalize challenge based on user preferences
    personalizeChallenge();
    
    initializeDays();
    loadSettings();
    setupEventListeners();
    console.log('App initialization complete');
}

// 🔴 NEW FUNCTION: Check onboarding completion status
function checkOnboardingStatus() {
    // Import UserState if not already available
    if (typeof UserState === 'undefined') {
        const script = document.createElement('script');
        script.src = '../../../shared/user-state.js';
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
        window.location.href = '../onboarding/v1/welcome.html';
        return;
    }
    
    console.log('User has completed onboarding, proceeding with dashboard...');
}

// 🔴 NEW FUNCTION: Personalize challenge based on user preferences
function personalizeChallenge() {
    if (typeof UserState === 'undefined') {
        console.log('UserState not available, using default challenge');
        return;
    }
    
    try {
        // Import challenge templates
        const script = document.createElement('script');
        script.src = '../../../config/challenge-templates.js';
        script.onload = () => {
            applyPersonalizedChallenge();
        };
        document.head.appendChild(script);
    } catch (e) {
        console.error('Error loading challenge templates:', e);
    }
}

function applyPersonalizedChallenge() {
    if (typeof getChallengeTemplate === 'undefined') {
        console.log('Challenge templates not available, using default');
        return;
    }
    
    const userPreferences = UserState.getPreferences();
    console.log('User preferences for personalization:', userPreferences);
    
    // Get personalized challenge template
    const template = getChallengeTemplate(userPreferences);
    const customized = customizeHabits(template, userPreferences);
    
    // Update APP_CONFIG with personalized habits
    APP_CONFIG.dailyHabits = customized.dailyHabits;
    APP_CONFIG.challengeName = customized.name;
    APP_CONFIG.challengeDescription = customized.description;
    
    console.log('Challenge personalized:', customized.name);
    
    // Update the challenge header with personalized content
    updateChallengeHeader(customized);
    
    // Update the display if days are already initialized
    if (document.getElementById('daysContainer')) {
        initializeDays();
    }
}

// Load saved game state
function loadGameState() {
    const savedState = localStorage.getItem('betterflyMinimal');
    if (savedState) {
        try {
            gameState = JSON.parse(savedState);
            console.log('Loaded existing challenge state:', gameState);
        } catch (e) {
            console.error('Error loading game state:', e);
            // Fall back to default state
            gameState = getDefaultGameState();
        }
    } else {
        console.log('No existing challenge state found, using default');
        gameState = getDefaultGameState();
    }
    
    // Ensure expandedDays is properly initialized
    if (!gameState.expandedDays) {
        gameState.expandedDays = { 1: true };
        saveState();
    }
}

// 🔴 NEW FUNCTION: Get default game state for new users
function getDefaultGameState() {
    return {
        currentDay: 1,
        totalPoints: 0,
        daysCompleted: {},
        habitsCompleted: {},
        expandedDays: { 1: true },
        todayProgress: 0,
        challengeStartDate: new Date().toISOString(),
        lastModified: new Date().toISOString()
    };
}

// Save game state
function saveState() {
    localStorage.setItem('betterflyMinimal', JSON.stringify(gameState));
    
    // 🔴 ADDED: Also update userData for consistency
    if (typeof UserState !== 'undefined') {
        UserState.updateChallengeProgress(gameState);
    }
}

// 🔴 NEW FUNCTION: Update challenge header with personalized content
function updateChallengeHeader(challengeData) {
    const titleElement = document.getElementById('challengeTitle');
    const subtitleElement = document.getElementById('challengeSubtitle');
    
    if (titleElement && challengeData.name) {
        titleElement.textContent = challengeData.name;
    }
    
    if (subtitleElement && challengeData.description) {
        subtitleElement.textContent = challengeData.description;
    }
}

// Initialize days display
function initializeDays() {
    const container = document.getElementById('daysContainer');
    if (!container) {
        console.error('daysContainer not found');
        alert('daysContainer not found!');
        return;
    }
    
    console.log('Initializing days with gameState:', gameState);
    container.innerHTML = '';

    for (let day = 1; day <= 5; day++) {
        const dayCard = createDayCard(day);
        container.appendChild(dayCard);
    }

    updateStats();
    console.log('Days initialization complete. Container children:', container.children.length);
}

// Create day card element
function createDayCard(day) {
    const isCompleted = gameState.daysCompleted[day];
    const isExpanded = gameState.expandedDays[day];
    const isActive = day === gameState.currentDay;
    
    console.log(`Creating day card ${day}:`, { isCompleted, isExpanded, isActive });
    
    const dayCard = document.createElement('div');
    dayCard.className = `day-card ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`;

    const habits = APP_CONFIG.dailyHabits[day];
    console.log(`Habits for day ${day}:`, habits);
    
    const dayPoints = habits.reduce((sum, h) => sum + h.points, 0);
    const earnedPoints = habits.reduce((sum, h) => {
        const key = `day${day}_habit${h.id}`;
        return sum + (gameState.habitsCompleted[key] ? h.points : 0);
    }, 0);
    
    console.log(`Day ${day} points: ${earnedPoints}/${dayPoints}`);

    const habitsHtml = habits.map(habit => {
        const habitKey = `day${day}_habit${habit.id}`;
        const isChecked = gameState.habitsCompleted[habitKey] || false;
        
        return `
            <div class="habit-chip ${isChecked ? 'checked' : ''}" onclick="event.stopPropagation(); toggleHabit(${day}, ${habit.id}, this)">
                <div class="habit-checkbox ${isChecked ? 'checked' : ''}">
                    ${isChecked ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0167fe" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 12 2 2 4-4"/></svg>' : ''}
                </div>
                <div class="habit-content">
                    <span class="habit-text">${habit.text}</span>
                    <span class="habit-points">+${habit.points}</span>
                </div>
            </div>
        `;
    }).join('');

    dayCard.innerHTML = `
        <div class="day-header" onclick="toggleDay(${day})">
            <div class="day-info">
                <div class="day-number">${isCompleted ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 12 2 2 4-4"/></svg>' : day}</div>
                <div class="day-text">
                    <span class="day-label">Day ${day}</span>
                    <span class="day-date">${APP_CONFIG.dayNames[day - 1]}</span>
                </div>
            </div>
            <div class="day-header-right">
                <span class="day-points">${earnedPoints}/${dayPoints} pts</span>
                <div class="expand-icon ${isExpanded ? 'expanded' : ''}">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M6 8L10 12L14 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
        </div>
        <div class="day-content ${isExpanded ? 'expanded' : ''}">
            <div class="habits-list">
                ${habitsHtml}
            </div>
        </div>
    `;

    return dayCard;
}

// Toggle day expansion
function toggleDay(day) {
    gameState.expandedDays[day] = !gameState.expandedDays[day];
    saveState();
    initializeDays();
}

// Toggle habit completion
function toggleHabit(day, habitId, element) {
    const habitKey = `day${day}_habit${habitId}`;
    const habit = APP_CONFIG.dailyHabits[day].find(h => h.id === habitId);
    
    if (!gameState.habitsCompleted[habitKey]) {
        gameState.habitsCompleted[habitKey] = true;
        gameState.totalPoints += habit.points;
        
        createMiniConfetti();
        
        const dayHabitsCompleted = APP_CONFIG.dailyHabits[day].every(h => 
            gameState.habitsCompleted[`day${day}_habit${h.id}`]
        );
        
        if (dayHabitsCompleted && !gameState.daysCompleted[day]) {
            gameState.daysCompleted[day] = true;
            
            if (day === gameState.currentDay && gameState.currentDay < 5) {
                gameState.currentDay++;
            }
            
            const completedDays = Object.keys(gameState.daysCompleted).length;
            const isFinalDay = completedDays === 5;
            
            // Only show day completion celebration if it's not the final day
            if (!isFinalDay) {
                // Medium confetti for completing a day
                createMediumConfetti();
                
                setTimeout(() => {
                    showCelebration(
                        'Day Complete! 🎯',
                        `Amazing! You've completed all habits for Day ${day}.`,
                        '🏆'
                    );
                }, 300);
            } else {
                // For the final day, show challenge completion celebration with more delay
                setTimeout(() => {
                    showCelebration(
                        'Challenge Complete! 🎊',
                        `Incredible! You've earned ${gameState.totalPoints} points and built amazing habits!`,
                        '🏅'
                    );
                    createMassiveConfetti();
                }, 500);
            }
        }
    } else {
        gameState.habitsCompleted[habitKey] = false;
        gameState.totalPoints -= habit.points;
        if (gameState.daysCompleted[day]) {
            gameState.daysCompleted[day] = false;
            if (gameState.currentDay > day) {
                gameState.currentDay = day;
            }
        }
    }
    
    saveState();
    initializeDays();
}

// Update statistics display
function updateStats() {
    console.log('Updating stats with gameState:', gameState);
    
    const totalPointsEl = document.getElementById('totalPoints');
    const currentStreakEl = document.getElementById('currentStreak');
    const habitsCountEl = document.getElementById('habitsCount');
    
    if (totalPointsEl) {
        totalPointsEl.textContent = gameState.totalPoints;
        console.log('Updated totalPoints:', gameState.totalPoints);
    } else {
        console.error('totalPoints element not found');
    }
    
    const streak = Object.keys(gameState.daysCompleted).length;
    if (currentStreakEl) {
        currentStreakEl.textContent = streak;
        console.log('Updated streak:', streak);
    } else {
        console.error('currentStreak element not found');
    }
    
    const habitsCount = Object.keys(gameState.habitsCompleted)
        .filter(k => gameState.habitsCompleted[k]).length;
    if (habitsCountEl) {
        habitsCountEl.textContent = habitsCount;
        console.log('Updated habitsCount:', habitsCount);
    } else {
        console.error('habitsCount element not found');
    }
}

// Show celebration modal
function showCelebration(title, message, emoji) {
    const modal = document.getElementById('celebrationModal');
    const titleEl = document.getElementById('celebrationTitle');
    const messageEl = document.getElementById('celebrationMessage');
    const emojiEl = document.getElementById('celebrationEmoji');
    
    if (titleEl) titleEl.textContent = title;
    if (messageEl) messageEl.textContent = message;
    if (emojiEl) {
        // Replace emoji with SVG icon
        const svgIcon = '<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
        emojiEl.innerHTML = svgIcon;
    }
    if (modal) {
        modal.classList.add('show');
        setTimeout(() => closeCelebration(), 3000);
    }
}

// Close celebration modal
function closeCelebration() {
    const modal = document.getElementById('celebrationModal');
    if (modal) modal.classList.remove('show');
}

// Create mini confetti effect for micro habits
function createMiniConfetti() {
    confetti({
        particleCount: 5,
        spread: 4,
        origin: { y: 0.9, x: 0.5 },
        colors: ['#0167fe'],
        startVelocity: 5,
        gravity: 1.5,
        ticks: 25
    });
}

// Create medium confetti effect for completing a day
function createMediumConfetti() {
    confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#0167fe', '#34c759', '#ff9500', '#af52de', '#ff3b30', '#5856d6', '#ff2d92', '#007aff', '#5ac8fa', '#ffcc02']
    });
}

// Create massive confetti effect for completing the 5-day challenge
function createMassiveConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff0000', '#00ff00', '#0000ff', '#0167fe', '#34c759', '#ff9500', '#af52de', '#ff3b30', '#5856d6', '#ff2d92', '#007aff', '#5ac8fa', '#ffcc02']
    });
}

// Settings functions
function openSettings() {
    const settingsPage = document.getElementById('settingsPage');
    if (settingsPage) settingsPage.classList.add('show');
}

function closeSettings() {
    const settingsPage = document.getElementById('settingsPage');
    if (settingsPage) settingsPage.classList.remove('show');
}

function openBottomSheet(type) {
    currentSettingType = type;
    const setting = APP_CONFIG.settingsOptions[type];
    const currentValue = document.getElementById(setting.valueId)?.textContent || '';
    
    const titleEl = document.getElementById('bottomSheetTitle');
    if (titleEl) titleEl.textContent = setting.title;
    
    const optionsContainer = document.getElementById('bottomSheetOptions');
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
        
        setting.options.forEach(option => {
            const optionDiv = document.createElement('div');
            optionDiv.className = `option-item ${option === currentValue ? 'selected' : ''}`;
            optionDiv.innerHTML = `
                <span class="option-text">${option}</span>
                <div class="option-check">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m9 12 2 2 4-4"/>
                    </svg>
                </div>
            `;
            optionDiv.addEventListener('click', () => selectOption(option));
            optionsContainer.appendChild(optionDiv);
        });
    }
    
    const backdrop = document.getElementById('bottomSheetBackdrop');
    const sheet = document.getElementById('bottomSheet');
    if (backdrop) backdrop.classList.add('show');
    if (sheet) sheet.classList.add('show');
}

function closeBottomSheet() {
    const backdrop = document.getElementById('bottomSheetBackdrop');
    const sheet = document.getElementById('bottomSheet');
    if (backdrop) backdrop.classList.remove('show');
    if (sheet) sheet.classList.remove('show');
}

function selectOption(option) {
    if (currentSettingType) {
        const setting = APP_CONFIG.settingsOptions[currentSettingType];
        const valueEl = document.getElementById(setting.valueId);
        const oldValue = valueEl ? valueEl.textContent : '';
        
        if (oldValue !== option && valueEl) {
            valueEl.textContent = option;
            showToast(`${setting.title} updated to "${option}"`);
            
            // Save to both localStorage and UserState
            const savedSettings = JSON.parse(localStorage.getItem('betterflySettings') || '{}');
            savedSettings[currentSettingType] = option;
            localStorage.setItem('betterflySettings', JSON.stringify(savedSettings));
            
            // Also update UserState for persistence
            UserState.updatePreference(currentSettingType, option);
        }
    }
    
    closeBottomSheet();
}

function showToast(message) {
    const toast = document.getElementById('toastNotification');
    const messageEl = document.getElementById('toastMessage');
    
    if (messageEl) messageEl.textContent = message;
    if (toast) {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
}

function loadSettings() {
    try {
        // First try to load from UserState (from onboarding)
        const userPreferences = UserState.getPreferences();
        let savedSettings = {};
        
        // Map UserState preferences to dashboard settings
        if (userPreferences.primaryGoal) {
            savedSettings.primaryGoal = userPreferences.primaryGoal;
        }
        if (userPreferences.biggestBlocker) {
            savedSettings.biggestBlocker = userPreferences.biggestBlocker;
        }
        if (userPreferences.topInterests) {
            savedSettings.topInterests = userPreferences.topInterests;
        }
        if (userPreferences.dailyTime) {
            savedSettings.dailyTime = userPreferences.dailyTime;
        }
        if (userPreferences.supportType) {
            savedSettings.supportType = userPreferences.supportType;
        }
        
        // Also check for locally saved settings (in case user updated them)
        const localSettings = JSON.parse(localStorage.getItem('betterflySettings') || '{}');
        savedSettings = { ...savedSettings, ...localSettings };
        
        Object.keys(savedSettings).forEach(key => {
            if (APP_CONFIG.settingsOptions[key]) {
                const element = document.getElementById(APP_CONFIG.settingsOptions[key].valueId);
                if (element) {
                    element.textContent = savedSettings[key];
                }
            }
        });
    } catch (error) {
        console.error('Error loading settings');
    }
}

// Setup event listeners
function setupEventListeners() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.nav-item').forEach(nav => {
                nav.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
}

// 🔴 NEW FUNCTION: Open currency rewards page
function openCurrencyRewards() {
    console.log('Opening currency rewards page');
    // Navigate to the standalone currency rewards page
    window.location.href = '../post-onboarding/v2/currency-rewards.html';
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
