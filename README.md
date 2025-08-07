# Betterfly - 5-Day Wellness Challenge

A beautiful, mobile-first wellness challenge app that helps users build healthy habits through daily micro-challenges.

## 🚀 Features

### Core Functionality
- **5-Day Challenge Structure**: Complete daily habits to build lasting wellness routines
- **Habit Tracking**: Check off daily micro-habits and earn points
- **Progress Visualization**: See your points, streak, and completed habits
- **Interactive UI**: Smooth animations and iOS-style design
- **Local Storage**: Your progress is automatically saved

### Daily Habits
Each day includes 3 micro-habits with different point values:
- **Day 1**: Drink water, deep breathing, gratitude writing
- **Day 2**: Morning walk, eat fruit, stretching
- **Day 3**: Water, phone-free time, social connection
- **Day 4**: Push-ups, breathing, reading
- **Day 5**: Walking, music, planning

### Settings & Customization
- **Primary Goal**: Choose your main wellness focus
- **Biggest Blocker**: Identify what holds you back
- **Top Interests**: Select wellness areas you're passionate about
- **Daily Time Available**: Set realistic time expectations
- **Support Type**: Choose how you want to be supported

### Interactive Elements
- **Celebration Modals**: Celebrate completing days and the full challenge
- **Confetti Effects**: Visual rewards for completing habits
- **Toast Notifications**: Feedback when updating preferences
- **Bottom Navigation**: Easy navigation between app sections
- **Expandable Day Cards**: Tap to see daily habits

## 📱 How to Use

### Getting Started
1. Open `index.html` in your web browser
2. The app will load with Day 1 expanded by default
3. Start by completing the first day's habits

### Completing Habits
1. **Tap on a day card** to expand it and see the habits
2. **Tap on any habit** to mark it as complete
3. **Watch your points increase** and confetti appear
4. **Complete all habits in a day** to unlock the next day

### Using Settings
1. **Tap the settings icon** (gear) in the top right
2. **Choose any preference** to customize your experience
3. **Tap on options** to change your selections
4. **Your choices are automatically saved**

### Navigation
- **Bottom navigation bar** lets you switch between sections
- **Back button** returns to previous screens
- **Settings button** opens preferences

## 🎨 Design Features

### Mobile-First Design
- Optimized for mobile devices and touch interactions
- iOS-style status bar and navigation
- Responsive layout that works on all screen sizes

### Visual Feedback
- **Color-coded states**: Active (blue), completed (green), default (gray)
- **Smooth animations**: Transitions between states
- **Haptic-like feedback**: Visual responses to interactions

### Accessibility
- High contrast colors for readability
- Clear touch targets (minimum 44px)
- Semantic HTML structure
- Screen reader friendly

## 🛠 Technical Details

### File Structure
```
betterfly/
├── index.html      # Main HTML file
├── styles.css      # All styling and animations
├── script.js       # JavaScript functionality
└── README.md       # This file
```

### Technologies Used
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with Flexbox and Grid
- **Vanilla JavaScript**: No frameworks, pure functionality
- **Local Storage**: Data persistence

### Browser Compatibility
- Modern browsers (Chrome, Safari, Firefox, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive Web App ready

## 🎯 How It Works

### State Management
- **Game State**: Tracks current day, points, completed habits
- **Settings State**: Stores user preferences
- **Local Storage**: Persists data between sessions

### Habit System
- Each habit has an ID, text, and point value
- Habits are organized by day
- Completion state is tracked individually
- Day completion requires all habits to be done

### Scoring System
- **Individual habits**: 10-25 points each
- **Daily completion**: Automatic progression to next day
- **Challenge completion**: Special celebration and massive confetti

## 🚀 Running the App

### Simple Method
1. Navigate to the `betterfly` folder
2. Double-click `index.html` to open in your browser
3. Start using the app immediately

### Local Server (Recommended)
For the best experience, run a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have it installed)
npx serve .

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 🎨 Customization

### Changing Habits
Edit the `APP_CONFIG.dailyHabits` object in `script.js` to modify:
- Habit text and descriptions
- Point values
- Number of habits per day

### Styling
Modify `styles.css` to change:
- Colors and themes
- Animations and transitions
- Layout and spacing
- Typography

### Adding Features
The modular JavaScript structure makes it easy to add:
- New habit types
- Different challenge lengths
- Additional settings
- Social features

## 📊 Data Storage

The app uses browser localStorage to save:
- **Game progress**: Completed habits, points, current day
- **User preferences**: Settings and customization choices
- **App state**: Expanded days, navigation state

Data persists between browser sessions and is stored locally on your device.

## 🎉 Enjoy Your Wellness Journey!

This app is designed to make building healthy habits fun and rewarding. The 5-day structure helps you establish routines that can last a lifetime.

Happy habit building! 🌟
