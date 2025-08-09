// Home page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    loadUserData();
    updateProgress();
    updateStats();
    
    // Set up event listeners
    setupEventListeners();
});

// Load user data from localStorage
function loadUserData() {
    const gameState = JSON.parse(localStorage.getItem('gameState')) || {
        totalPoints: 0,
        currentStreak: 0,
        habitsCompleted: 0,
        todayProgress: 0
    };
    
    // Update display with loaded data
    document.getElementById('totalPoints').textContent = gameState.totalPoints;
    document.getElementById('currentStreak').textContent = gameState.currentStreak;
    document.getElementById('habitsCompleted').textContent = gameState.habitsCompleted;
    
    // Update progress bar
    updateProgressBar(gameState.todayProgress);
}

// Update progress bar
function updateProgressBar(percentage) {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('todayProgress');
    
    progressFill.style.width = percentage + '%';
    progressText.textContent = percentage + '%';
}

// Update stats display
function updateStats() {
    // This would typically fetch from an API or localStorage
    // For now, we'll use the data loaded in loadUserData()
}

// Update progress section
function updateProgress() {
    const gameState = JSON.parse(localStorage.getItem('gameState')) || {};
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
function startChallenge() {
    // Navigate to the challenge page
    window.location.href = '../dashboard/index.html';
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

// Add some sample data for demonstration
function addSampleData() {
    const sampleData = {
        totalPoints: 1250,
        currentStreak: 7,
        habitsCompleted: 23,
        todayProgress: 65
    };
    
    localStorage.setItem('gameState', JSON.stringify(sampleData));
    loadUserData();
}

// Uncomment the line below to add sample data for testing
addSampleData();
