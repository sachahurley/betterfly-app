#!/bin/bash

# Function to update a questionnaire file
update_questionnaire() {
    local file=$1
    local question_num=$2
    local title="Question $question_num of 10"
    
    # Update the container structure
    sed -i '' 's|<div class="content">|<div id="backButtonContainer"></div>\
        \
        <div class="content with-nav">|g' "$file"
    
    # Add back button mount code after OnboardingState.load()
    sed -i '' "/OnboardingState.load();/a\\
            \\
            // Mount back button\\
            BackButton.mount('backButtonContainer', {\\
                title: '$title'\\
            });\\
" "$file"
}

# Update all questionnaire files
echo "Updating questionnaire files with back buttons..."

update_questionnaire "q2-follow-up.html" 2
update_questionnaire "q3-biggest-challenge.html" 3  
update_questionnaire "q4-past-experience.html" 4
update_questionnaire "q5-wearable.html" 5
update_questionnaire "q6-motivation.html" 6
update_questionnaire "q7-support-preference.html" 7
update_questionnaire "q8-lifestyle.html" 8
update_questionnaire "q9-success.html" 9
update_questionnaire "q10-commitment.html" 10

echo "All questionnaire files updated!"