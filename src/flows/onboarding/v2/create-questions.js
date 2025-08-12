// Question screen configurations
const questions = [
  {
    file: 'q2-main-concern.html',
    number: 2,
    title: "What's your main health concern right now?",
    mascot: "Let's focus on what matters most to you",
    items: [
      { value: 'low_energy', emoji: '😴', label: "I'm always tired and low on energy" },
      { value: 'stress', emoji: '😰', label: "I'm stressed and overwhelmed" },
      { value: 'weight', emoji: '⚖️', label: "I want to manage my weight better" },
      { value: 'sleep', emoji: '🛌', label: "I can't get quality sleep" },
      { value: 'focus', emoji: '🧠', label: "I struggle with focus and productivity" },
      { value: 'pain', emoji: '💢', label: "I have chronic pain or discomfort" }
    ],
    next: 'dynamic' // Special handling for conditional routing
  },
  {
    file: 'q2-follow-up.html',
    number: 2,
    title: "Energy Detective Challenge!",
    subtitle: "When do you typically feel most drained?",
    mascot: "Track your energy patterns for 3 days and earn the 'Energy Detective' badge! 🔍",
    items: [
      { value: 'morning', emoji: '🌅', label: "Right when I wake up" },
      { value: 'afternoon', emoji: '🍽️', label: "After lunch (afternoon crash)" },
      { value: 'evening', emoji: '🌆', label: "By evening" },
      { value: 'varies', emoji: '📊', label: "It varies day to day" }
    ],
    next: 'q3-biggest-challenge'
  },
  {
    file: 'q3-biggest-challenge.html',
    number: 3,
    title: "What's your biggest challenge in staying healthy?",
    items: [
      { value: 'time', emoji: '⏰', label: "Not enough time" },
      { value: 'motivation', emoji: '🔋', label: "Lack of motivation" },
      { value: 'knowledge', emoji: '📚', label: "Don't know where to start" },
      { value: 'consistency', emoji: '📅', label: "Can't stay consistent" },
      { value: 'support', emoji: '👥', label: "No support system" }
    ],
    next: 'q4-past-experience'
  },
  {
    file: 'q4-past-experience.html',
    number: 4,
    title: "Have you tried wellness apps or programs before?",
    subtitle: "We validate past struggles and show we understand your journey",
    items: [
      { value: 'many_failed', emoji: '😔', label: "Yes, many times but they didn't stick" },
      { value: 'some_success', emoji: '🤔', label: "A few times with some success" },
      { value: 'first_time', emoji: '🆕', label: "This is my first time" },
      { value: 'current', emoji: '📱', label: "I'm using other apps currently" }
    ],
    next: 'q5-wearable'
  },
  {
    file: 'q5-wearable.html',
    number: 5,
    title: "Do you use any fitness trackers or wearables?",
    items: [
      { value: 'apple_watch', emoji: '⌚', label: "Apple Watch" },
      { value: 'fitbit', emoji: '📱', label: "Fitbit" },
      { value: 'garmin', emoji: '⌚', label: "Garmin" },
      { value: 'other', emoji: '📟', label: "Other wearable" },
      { value: 'phone', emoji: '📱', label: "Just my phone" },
      { value: 'none', emoji: '🚫', label: "No tracking devices" }
    ],
    next: 'q6-motivation'
  },
  {
    file: 'q6-motivation.html',
    number: 6,
    title: "What motivates you most?",
    items: [
      { value: 'competition', emoji: '🏆', label: "Competition and challenges" },
      { value: 'progress', emoji: '📈', label: "Seeing my progress" },
      { value: 'rewards', emoji: '🎁', label: "Earning rewards" },
      { value: 'community', emoji: '👥', label: "Community support" },
      { value: 'health', emoji: '❤️', label: "Health improvements" }
    ],
    next: 'q7-support-preference'
  },
  {
    file: 'q7-support-preference.html',
    number: 7,
    title: "How do you prefer to receive support?",
    items: [
      { value: 'reminders', emoji: '🔔', label: "Daily reminders" },
      { value: 'coach', emoji: '🗣️', label: "Personal coaching" },
      { value: 'community', emoji: '👥', label: "Community forums" },
      { value: 'ai', emoji: '🤖', label: "AI guidance" },
      { value: 'solo', emoji: '🧘', label: "I prefer going solo" }
    ],
    next: 'q8-lifestyle'
  },
  {
    file: 'q8-lifestyle.html',
    number: 8,
    title: "How would you describe your lifestyle?",
    items: [
      { value: 'sedentary', emoji: '💻', label: "Mostly sedentary" },
      { value: 'light', emoji: '🚶', label: "Lightly active" },
      { value: 'moderate', emoji: '🏃', label: "Moderately active" },
      { value: 'very', emoji: '🏋️', label: "Very active" },
      { value: 'athlete', emoji: '⚡', label: "Athlete level" }
    ],
    next: 'q9-success'
  },
  {
    file: 'q9-success.html',
    number: 9,
    title: "What does wellness success look like to you?",
    items: [
      { value: 'energy', emoji: '⚡', label: "More energy throughout the day" },
      { value: 'happiness', emoji: '😊', label: "Feeling happier and calmer" },
      { value: 'strength', emoji: '💪', label: "Getting stronger and fitter" },
      { value: 'habits', emoji: '✅', label: "Building lasting habits" },
      { value: 'balance', emoji: '⚖️', label: "Better work-life balance" }
    ],
    next: 'q10-commitment'
  },
  {
    file: 'q10-commitment.html',
    number: 10,
    title: "How much time can you commit daily?",
    items: [
      { value: '5min', emoji: '⚡', label: "5 minutes" },
      { value: '15min', emoji: '⏱️', label: "15 minutes" },
      { value: '30min', emoji: '⏰', label: "30 minutes" },
      { value: '60min', emoji: '🕐', label: "1 hour" },
      { value: 'varies', emoji: '📅', label: "It varies" }
    ],
    next: 'challenges-intro'
  }
];

// Export for use
if (typeof module !== 'undefined') {
  module.exports = questions;
}