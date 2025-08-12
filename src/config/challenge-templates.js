// Challenge Templates Configuration
// This file defines different types of challenges and their configurations
// based on user preferences from onboarding

const CHALLENGE_TEMPLATES = {
    // Wellness-focused challenge template
    wellness: {
        name: "Wellness Journey",
        description: "Focus on overall health and well-being",
        dailyHabits: {
            1: [
                { id: 1, text: "Drink a glass of water", points: 10, category: "hydration" },
                { id: 2, text: "Take 5 deep breaths", points: 15, category: "mindfulness" },
                { id: 3, text: "Write 3 gratitudes", points: 20, category: "mental-health" }
            ],
            2: [
                { id: 4, text: "5-minute morning walk", points: 15, category: "exercise" },
                { id: 5, text: "Eat a piece of fruit", points: 10, category: "nutrition" },
                { id: 6, text: "Stretch for 3 minutes", points: 15, category: "flexibility" }
            ],
            3: [
                { id: 1, text: "Drink a glass of water", points: 10, category: "hydration" },
                { id: 7, text: "No phone for 30 min", points: 25, category: "digital-wellness" },
                { id: 8, text: "Connect with a friend", points: 20, category: "social" }
            ],
            4: [
                { id: 9, text: "10 push-ups", points: 20, category: "strength" },
                { id: 2, text: "Take 5 deep breaths", points: 15, category: "mindfulness" },
                { id: 10, text: "Read for 10 minutes", points: 15, category: "learning" }
            ],
            5: [
                { id: 4, text: "5-minute morning walk", points: 15, category: "exercise" },
                { id: 11, text: "Listen to calm music", points: 10, category: "relaxation" },
                { id: 12, text: "Plan tomorrow", points: 20, category: "productivity" }
            ]
        }
    },

    // Productivity-focused challenge template
    productivity: {
        name: "Productivity Boost",
        description: "Enhance focus and accomplish more each day",
        dailyHabits: {
            1: [
                { id: 1, text: "Plan your top 3 priorities", points: 20, category: "planning" },
                { id: 2, text: "Eliminate one distraction", points: 15, category: "focus" },
                { id: 3, text: "Complete one task before 10 AM", points: 25, category: "execution" }
            ],
            2: [
                { id: 4, text: "Take a 5-minute break every hour", points: 15, category: "recovery" },
                { id: 5, text: "Review and adjust your plan", points: 15, category: "reflection" },
                { id: 6, text: "Learn one new skill", points: 20, category: "growth" }
            ],
            3: [
                { id: 7, text: "Delegate one task", points: 20, category: "leadership" },
                { id: 8, text: "Organize your workspace", points: 15, category: "environment" },
                { id: 9, text: "Set boundaries for tomorrow", points: 20, category: "planning" }
            ],
            4: [
                { id: 10, text: "Track your time usage", points: 15, category: "awareness" },
                { id: 11, text: "Optimize one process", points: 25, category: "efficiency" },
                { id: 12, text: "Celebrate one win", points: 15, category: "recognition" }
            ],
            5: [
                { id: 13, text: "Reflect on your week", points: 20, category: "reflection" },
                { id: 14, text: "Plan next week's goals", points: 25, category: "planning" },
                { id: 15, text: "Share one lesson learned", points: 15, category: "knowledge-sharing" }
            ]
        }
    },

    // Fitness-focused challenge template
    fitness: {
        name: "Fitness Foundation",
        description: "Build strength, endurance, and healthy habits",
        dailyHabits: {
            1: [
                { id: 1, text: "10-minute warm-up routine", points: 15, category: "warmup" },
                { id: 2, text: "20 bodyweight squats", points: 20, category: "strength" },
                { id: 3, text: "5-minute cool-down stretch", points: 15, category: "recovery" }
            ],
            2: [
                { id: 4, text: "15-minute cardio session", points: 25, category: "cardio" },
                { id: 5, text: "10 push-ups", points: 20, category: "strength" },
                { id: 6, text: "Hydrate with 8 glasses of water", points: 15, category: "nutrition" }
            ],
            3: [
                { id: 7, text: "30-second plank hold", points: 15, category: "core" },
                { id: 8, text: "10-minute yoga flow", points: 20, category: "flexibility" },
                { id: 9, text: "Track your sleep quality", points: 15, category: "recovery" }
            ],
            4: [
                { id: 10, text: "20-minute walk or run", points: 25, category: "cardio" },
                { id: 11, text: "15 lunges (each leg)", points: 20, category: "strength" },
                { id: 12, text: "Prepare a healthy meal", points: 20, category: "nutrition" }
            ],
            5: [
                { id: 13, text: "Full body stretch routine", points: 20, category: "flexibility" },
                { id: 14, text: "Measure your progress", points: 15, category: "tracking" },
                { id: 15, text: "Plan next week's workouts", points: 20, category: "planning" }
            ]
        }
    }
};

// Function to get challenge template based on user preferences
function getChallengeTemplate(preferences) {
    const primaryGoal = preferences.primaryGoal || 'Improve Wellness';
    
    // Map primary goals to challenge templates
    if (primaryGoal.toLowerCase().includes('wellness') || 
        primaryGoal.toLowerCase().includes('health')) {
        return CHALLENGE_TEMPLATES.wellness;
    } else if (primaryGoal.toLowerCase().includes('productivity') || 
               primaryGoal.toLowerCase().includes('focus')) {
        return CHALLENGE_TEMPLATES.productivity;
    } else if (primaryGoal.toLowerCase().includes('fitness') || 
               primaryGoal.toLowerCase().includes('exercise')) {
        return CHALLENGE_TEMPLATES.fitness;
    }
    
    // Default to wellness template
    return CHALLENGE_TEMPLATES.wellness;
}

// Function to customize habits based on user preferences
function customizeHabits(template, preferences) {
    const customized = JSON.parse(JSON.stringify(template)); // Deep copy
    
    // Adjust difficulty based on daily time available
    const dailyTime = preferences.dailyTime || '15-30 minutes';
    
    if (dailyTime.includes('5-10')) {
        // Reduce points and simplify habits for shorter time
        Object.keys(customized.dailyHabits).forEach(day => {
            customized.dailyHabits[day].forEach(habit => {
                habit.points = Math.max(5, Math.floor(habit.points * 0.7));
            });
        });
    } else if (dailyTime.includes('45-60') || dailyTime.includes('Over 1 hour')) {
        // Increase points and add complexity for longer time
        Object.keys(customized.dailyHabits).forEach(day => {
            customized.dailyHabits[day].forEach(habit => {
                habit.points = Math.floor(habit.points * 1.3);
            });
        });
    }
    
    return customized;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CHALLENGE_TEMPLATES,
        getChallengeTemplate,
        customizeHabits
    };
}
