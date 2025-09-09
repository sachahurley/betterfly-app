# Day 2 Post-Onboarding Experience: Detailed User Journey

## Entry Point

User opens the app having completed onboarding the previous day. They've provided personal data (fitness goals, interests, workplace preferences, wearable device info, etc.) through the questionnaire.

## Home Dashboard Landing

**Initial State:**

- User sees personalized welcome message: "Good morning [Name], let's get started with your [Company] benefits!"
- Home screen displays completed items from onboarding:
  - ✅ "Complete Questionnaire" - Completed during onboarding
  - ✅ "Connect Wearable" - Completed during onboarding
  - ✅ "Profile Created" - Completed during onboarding
- Home screen shows a "Getting Started" to-do list with 5 personalized items based on their onboarding responses
- Progress indicator shows "3 of 8 completed" (including the pre-completed items)
- Each to-do item shows estimated time and betterfly reward potential

**To-Do List Items (In Priority Order):**

1. "Complete Your Next Challenge" - 5 min, 100 betterflies
2. "Discover the Rewards Store" - 3 min, 25 betterflies
3. "Redeem Your First Reward" - 2 min, 0 betterflies (uses earned currency)
4. "Explore Your LSA Benefit Card" - 2 min, 50 betterflies
5. "Review Your Profile" - 1 min, 25 betterflies

## User Journey Example (Flexible Order)

### Action 1: User Taps "Complete Your Next Challenge"

**Experience:**

- Navigates to Challenges page showing three categories: Daily, Weekly, Monthly
- Sees personalized easy challenge based on onboarding: "Take a 10-minute walk" (if they indicated interest in fitness)
- Challenge shows: description, betterfly reward (100), time estimate, "Start Challenge" button
- User taps "Start Challenge" → brief explanation of how tracking works
- Completion flow: "Great job! You earned 100 betterflies" with animated currency visual
- **Daily Streak Experience:** First-time daily streak celebration appears: "🔥 Daily Streak Started! Come back tomorrow to keep it going!" with special animation
- Returns to home with updated to-do (4 of 8 completed) and betterfly balance visible

### Action 2: User Taps "Discover the Rewards Store"

**Experience:**

- Navigates to Store page showing reward categories: Gift Cards, Company Swag, Experiences, Donations
- Can browse available rewards with betterfly costs (e.g., "$10 Amazon Gift Card - 400 betterflies")
- Filters and search functionality
- Completion triggered by browsing: "You earned 25 betterflies for checking out the store!"
- **Daily Streak Experience:** Since daily streak already triggered today, this doesn't appear again
- Returns to home (5 of 8 completed)

### Action 3: User Taps "Redeem Your First Reward"

**Experience:**

- Returns to Store page with current betterfly balance highlighted
- Shows affordable rewards based on earned currency (125 betterflies total earned)
- User selects small reward: "Company Sticker Pack - 100 betterflies"
- Redemption flow: confirm selection → processing → success confirmation
- Shows remaining balance: "25 betterflies remaining"
- Returns to home (6 of 8 completed)

### Action 4: User Taps "Explore Your LSA Benefit Card"

**Experience:**

- Navigates to Benefits page showing available benefits (LSA card prominently featured)
- Taps LSA card → detailed benefit page explaining balance, how to use, where accepted
- Shows current balance: "$25.00 available"
- "How to Use" section with step-by-step guidance
- Completion triggers: "You earned 50 betterflies for exploring your benefits!"
- Returns to home (7 of 8 completed, betterfly balance updated)

### Action 5: User Taps "Review Your Profile"

**Experience:**

- Shows summary of onboarding questionnaire responses
- Displays connected wearable status (confirmed as connected)
- Shows preferences for challenge types, communication, etc.
- Option to update any information
- Completion: "You earned 25 betterflies for reviewing your profile!"
- Returns to home (8 of 8 completed)

## Completion Experience

**All 8 Items Complete:**

- Home screen transforms with celebration animation
- "Congratulations! You've mastered the basics" message
- To-do list updates to "Today's Opportunities" showing:
    - New daily challenge available
    - Benefit reminder or tip
    - Progress toward next reward milestone
- Persistent navigation now emphasizes ongoing engagement rather than setup

## Key Interaction Patterns

- **Loading states:** Smooth transitions between actions with progress indicators
- **Error handling:** Gentle guidance if challenges can't be completed or rewards are unavailable
- **Progress tracking:** Visual betterfly accumulation with satisfying micro-animations
- **Daily Streak:** Special celebration that only appears once per day on first completed action, encouraging daily return
- **Contextual help:** Tooltips and explanations without overwhelming the interface
- **Data persistence:** All user choices and progress carry forward from onboarding questionnaire

## Post-Completion Interaction Flow

**Immediate Post-Completion (Step Completion Screen):**
- Success animation plays (confetti burst or checkmark animation)
- Betterfly reward counter animates upward with coin/butterfly visual effects
- Daily streak celebration (if first action of day) overlays with flame icon and streak counter
- Primary CTA button appears: "Continue" or "Back to Home"

**Transition Animation:**
- Fade/slide transition back to home dashboard
- Updated progress ring/bar animates from old count to new count (e.g., "4 of 8" → "5 of 8")
- Completed item gets checkmark animation and moves to "completed" section
- Next priority item in the to-do list gets subtle highlight/glow effect

**Home Dashboard State:**
- **Progress indicator:** Circular progress ring fills incrementally with smooth animation
- **Completed item treatment:** 
  - Checkmark icon appears with green accent
  - Item text gets strikethrough or fades to gray
  - Moves to collapsed "Completed" section at top
- **Next suggested action:**
  - Next to-do list item gets subtle pulsing border or gradient background
  - Small "Next" badge or arrow indicator
  - Slightly larger text treatment or bold weight

**Call-to-Action for Next Step:**
- **Primary approach:** Next item in list automatically becomes visually prominent
- **Secondary prompt:** Toast notification appears briefly: "Ready for your next step?" with quick action button
- **Gentle nudge:** After 3-5 seconds of inactivity, next item gets gentle bounce animation

**Micro-interactions:**
- Haptic feedback on completion
- Sound effect for betterfly earning (optional)
- Smooth spring animations for all state changes
- Staggered animations if multiple items update simultaneously

## Success Outcome

User understands the core app ecosystem: earn betterflies through challenges/engagement → redeem for real-world value. They've experienced the full value loop, started their daily streak habit, and are ready for ongoing daily engagement.

---

## 📊 Implementation Analysis Notes

### Current Implementation vs Intended Journey

**✅ Currently Implemented:**
- Basic home dashboard with task list
- Challenge system with timer functionality
- Reward claiming flow
- Betterfly currency tracking
- Progress indicators
- Bottom navigation

**❌ Missing Key Elements:**
- Personalized welcome messages
- Dynamic to-do list based on onboarding data
- Store/rewards browsing functionality
- LSA benefit card integration
- Profile review screen
- Daily streak celebration system
- Post-completion micro-interactions
- Progressive task highlighting
- Toast notifications and gentle nudges

**⚠️ Partially Implemented:**
- Task completion flow (basic version exists)
- Progress tracking (static 3/8, not dynamic)
- Challenge categories (monthly challenges shown, but not daily/weekly)
- Celebration animations (basic reward claiming, needs enhancement)

### Priority Enhancement Areas

1. **HIGH PRIORITY - Core Journey Flow**
   - Dynamic task list that updates based on completion
   - Proper progress tracking (3/8 → 4/8 → etc.)
   - Post-completion state management

2. **MEDIUM PRIORITY - Engagement Features**
   - Daily streak system
   - Enhanced micro-interactions
   - Toast notifications
   - Progressive visual cues

3. **LOW PRIORITY - Advanced Features**
   - Store integration
   - LSA benefit cards
   - Profile review screens
   - Personalized messaging

### Testing Focus Areas

1. **User Flow Completeness**: Can a user complete the intended journey?
2. **State Management**: Does progress persist and update correctly?
3. **Visual Feedback**: Are completion states clear and rewarding?
4. **Navigation Logic**: Do transitions make sense and feel natural?
5. **Engagement Hooks**: Are there clear calls-to-action for next steps?
