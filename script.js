// App Configuration
const APP_CONFIG = {
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
    expandedDays: { 1: true }
};

let currentSettingType = null;
let tempMultiSelectValues = [];

// Initialize App
function initializeApp() {
    loadGameState();
    initializeDays();
    loadSettings();
    setupEventListeners();
}

// Load saved game state
function loadGameState() {
    const savedState = localStorage.getItem('betterflyMinimal');
    if (savedState) {
        try {
            gameState = JSON.parse(savedState);
        } catch (e) {
            console.error('Error loading game state');
        }
    }
}

// Save game state
function saveState() {
    localStorage.setItem('betterflyMinimal', JSON.stringify(gameState));
}

// Initialize days display
function initializeDays() {
    const container = document.getElementById('daysContainer');
    if (!container) return;
    
    container.innerHTML = '';

    for (let day = 1; day <= 5; day++) {
        const dayCard = createDayCard(day);
        container.appendChild(dayCard);
    }

    updateStats();
}

// Create day card element
function createDayCard(day) {
    const isCompleted = gameState.daysCompleted[day];
    const isExpanded = gameState.expandedDays[day];
    const isActive = day === gameState.currentDay;
    
    const dayCard = document.createElement('div');
    dayCard.className = `day-card ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`;

    const habits = APP_CONFIG.dailyHabits[day];
    const dayPoints = habits.reduce((sum, h) => sum + h.points, 0);
    const earnedPoints = habits.reduce((sum, h) => {
        const key = `day${day}_habit${h.id}`;
        return sum + (gameState.habitsCompleted[key] ? h.points : 0);
    }, 0);

    const habitsHtml = habits.map(habit => {
        const habitKey = `day${day}_habit${habit.id}`;
        const isChecked = gameState.habitsCompleted[habitKey] || false;
        
        return `
            <div class="habit-chip ${isChecked ? 'checked' : ''}" onclick="event.stopPropagation(); toggleHabit(${day}, ${habit.id}, this)">
                <div class="habit-checkbox ${isChecked ? 'checked' : ''}"></div>
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
                <div class="day-number">${isCompleted ? '✓' : day}</div>
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
            
            setTimeout(() => {
                showCelebration(
                    'Day Complete! 🎯',
                    `Amazing! You've completed all habits for Day ${day}.`,
                    '🏆'
                );
                
                const completedDays = Object.keys(gameState.daysCompleted).length;
                if (completedDays === 5) {
                    setTimeout(() => {
                        showCelebration(
                            'Challenge Complete! 🎊',
                            `Incredible! You've earned ${gameState.totalPoints} points and built amazing habits!`,
                            '🏅'
                        );
                        createMassiveConfetti();
                    }, 2000);
                }
            }, 300);
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
    const totalPointsEl = document.getElementById('totalPoints');
    const currentStreakEl = document.getElementById('currentStreak');
    const habitsCountEl = document.getElementById('habitsCount');
    
    if (totalPointsEl) totalPointsEl.textContent = gameState.totalPoints;
    
    const streak = Object.keys(gameState.daysCompleted).length;
    if (currentStreakEl) currentStreakEl.textContent = streak;
    
    const habitsCount = Object.keys(gameState.habitsCompleted)
        .filter(k => gameState.habitsCompleted[k]).length;
    if (habitsCountEl) habitsCountEl.textContent = habitsCount;
}

// Show celebration modal
function showCelebration(title, message, emoji) {
    const modal = document.getElementById('celebrationModal');
    const titleEl = document.getElementById('celebrationTitle');
    const messageEl = document.getElementById('celebrationMessage');
    const emojiEl = document.getElementById('celebrationEmoji');
    
    if (titleEl) titleEl.textContent = title;
    if (messageEl) messageEl.textContent = message;
    if (emojiEl) emojiEl.textContent = emoji;
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

// Create mini confetti effect
function createMiniConfetti() {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = (Math.random() * 100) + '%';
            confetti.style.top = '40%';
            confetti.style.background = ['#0167fe', '#34c759', '#ff9500', '#af52de'][Math.floor(Math.random() * 4)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }, i * 50);
    }
}

// Create massive confetti effect
function createMassiveConfetti() {
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = (Math.random() * 100) + '%';
            confetti.style.top = '-10px';
            confetti.style.background = ['#0167fe', '#34c759', '#ff9500', '#af52de', '#ff3b30'][Math.floor(Math.random() * 5)];
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = (Math.random() * 10 + 5) + 'px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }
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
                <div class="option-check"></div>
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
            
            const savedSettings = JSON.parse(localStorage.getItem('betterflySettings') || '{}');
            savedSettings[currentSettingType] = option;
            localStorage.setItem('betterflySettings', JSON.stringify(savedSettings));
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
        const savedSettings = JSON.parse(localStorage.getItem('betterflySettings') || '{}');
        
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

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
