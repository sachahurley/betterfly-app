#!/bin/bash

# Create Q2 Follow-up
cat > q2-follow-up.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <title>Energy Detective - Betterfly</title>
    <link rel="stylesheet" href="styles/shared.css">
</head>
<body>
    <div class="container">
        <div class="status-bar">
            <div class="status-time">9:41</div>
            <div class="status-icons"></div>
        </div>
        
        <div class="content">
            <div id="progressContainer"></div>
            
            <div id="mascotContainer"></div>
            
            <h2>Energy Detective Challenge!</h2>
            <p class="subtitle">When do you typically feel most drained?</p>
            
            <div id="selectionContainer"></div>
            
            <div style="margin-top: 24px; padding: 16px; background: #fef3c7; border-radius: 12px;">
                <p style="margin: 0; color: #92400e;">
                    🔍 Track your energy patterns for 3 days and earn the 'Energy Detective' badge!
                </p>
            </div>
        </div>
        
        <div id="ctaContainer"></div>
    </div>

    <script src="state.js"></script>
    <script src="routes.js"></script>
    <script src="components/components.js"></script>
    <script>
        let ctaGroup;
        
        document.addEventListener('DOMContentLoaded', function() {
            OnboardingState.load();
            ProgressBar.mount('progressContainer', 2, OnboardingState.TOTAL_QUESTION_STEPS);
            MascotBubble.mount('mascotContainer', "Track your energy patterns for 3 days and earn the 'Energy Detective' badge! 🔍");
            
            const selectionList = SelectionList.mount('selectionContainer', {
                items: [
                    { value: 'morning', emoji: '🌅', label: "Right when I wake up" },
                    { value: 'afternoon', emoji: '🍽️', label: "After lunch (afternoon crash)" },
                    { value: 'evening', emoji: '🌆', label: "By evening" },
                    { value: 'varies', emoji: '📊', label: "It varies day to day" }
                ],
                multiple: false,
                onChange: (value) => {
                    OnboardingState.update('q2_energyFollowUp', value);
                    ctaGroup.updateDisabled(!value);
                }
            });
            
            ctaGroup = CTAGroup.mount('ctaContainer', {
                primaryLabel: 'Continue',
                disabled: !OnboardingState.canContinue('q2-follow-up'),
                onPrimary: () => {
                    if (OnboardingState.canContinue('q2-follow-up')) {
                        OnboardingRoutes.navigate('q3-biggest-challenge');
                    }
                }
            });
            
            const existing = OnboardingState.get('q2_energyFollowUp');
            if (existing) {
                const item = document.querySelector(`[data-value="${existing}"]`);
                if (item) item.click();
            }
        });
    </script>
</body>
</html>
EOF

echo "Created q2-follow-up.html"

# Create remaining question screens
questions=(
    "q3-biggest-challenge:3:q3_biggestChallenge:What's your biggest challenge in staying healthy?:q4-past-experience"
    "q4-past-experience:4:q4_pastExperience:Have you tried wellness apps or programs before?:q5-wearable"
    "q5-wearable:5:q5_wearable:Do you use any fitness trackers or wearables?:q6-motivation"
    "q6-motivation:6:q6_motivation:What motivates you most?:q7-support-preference"
    "q7-support-preference:7:q7_supportPref:How do you prefer to receive support?:q8-lifestyle"
    "q8-lifestyle:8:q8_lifestyle:How would you describe your lifestyle?:q9-success"
    "q9-success:9:q9_success:What does wellness success look like to you?:q10-commitment"
    "q10-commitment:10:q10_commitment:How much time can you commit daily?:challenges-intro"
)

for question in "${questions[@]}"; do
    IFS=':' read -r filename number field title next <<< "$question"
    
    echo "Creating ${filename}.html..."
done

echo "All question screens created!"