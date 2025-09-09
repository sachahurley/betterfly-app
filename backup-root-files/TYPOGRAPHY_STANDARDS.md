# Betterfly Typography Standards

## Overview
This document outlines the standardized Roboto typography system implemented across the entire Betterfly application.

## Font Implementation

### Primary Font Family
- **Font**: Roboto (Google Fonts)
- **Import**: `@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,400;1,500&display=swap');`
- **Fallback**: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

## Typography Hierarchy

### Headings
- **H1**: 28px, Bold (700), 1.3 line-height - Used for main page titles
- **H2 (.questionnaire-h2)**: 20px, Medium (500), 1.4 line-height - Used for questionnaire questions
- **H3**: 18px, Medium (500), 1.4 line-height - Used for section headers

### Body Text
- **Body Text (.body-text, .questionnaire-copy)**: 14px, Regular (400), 1.5 line-height
- **Subtitle**: 14px, Regular (400), 1.5 line-height - Used for descriptive text
- **Small Text (.text-small)**: 12px, Regular (400), 1.4 line-height - Used for labels/captions

## Component Typography

### Buttons
- **Size**: 14px
- **Weight**: Medium (500)
- **Line Height**: 1.4

### Form Elements
- **Labels**: 14px, Medium (500), 1.4 line-height
- **Input Fields**: 14px, Regular (400), 1.5 line-height
- **Placeholders**: 14px, Regular (400)
- **Error Text**: 14px, Regular (400), 1.4 line-height

### Navigation
- **Status Bar**: 14px, Medium (500), 1.4 line-height
- **Nav Titles**: 14px, Medium (500), 1.4 line-height
- **Back Button**: 14px, Regular (400), 1.4 line-height

### Selection Lists
- **Selection Text**: 14px, Regular (400), 1.5 line-height

### Speech Bubbles / Mascot
- **Speech Bubble**: 14px, Regular (400), 1.5 line-height

## Color Standards
- **Primary Text**: `var(--text-primary)` - Dark text for main content
- **Secondary Text**: `var(--text-secondary)` - Lighter text for descriptions
- **Link/Interactive Text**: `var(--primary-color)` - Brand green for links

## Files Updated

### Core Stylesheets
- `/src/flows/onboarding/v2/styles/shared.css` - Main onboarding typography
- `/home/styles.css` - Home page typography
- `/src/flows/dashboard/v1/styles.css` - Dashboard v1 typography
- `/src/flows/dashboard/v2/styles.css` - Dashboard v2 typography

### Individual Pages
- `/src/flows/onboarding/v2/review.html` - Custom review page typography
- `/src/flows/onboarding/v2/welcome.html` - Welcome page subtitle
- `/src/flows/onboarding/v2/completion.html` - Completion page font import

## CSS Classes Available

### Typography Classes
```css
.questionnaire-h2      /* 20px heading for questions */
.questionnaire-copy    /* 14px body text for questionnaires */
.body-text            /* 14px standard body text */
.text-primary         /* Primary text color */
.text-secondary       /* Secondary text color */
.text-small           /* 12px small text */
.text-medium          /* 14px medium text */
.text-large           /* 16px large text */
```

## Quality Assurance Checklist

### ✅ Completed
- [x] Roboto font imported across all major CSS files
- [x] H2 headings standardized to 20px Roboto Medium
- [x] Body copy standardized to 14px Roboto Regular
- [x] Form elements use consistent Roboto typography
- [x] Buttons use 14px Roboto Medium
- [x] Navigation elements use consistent sizing
- [x] Review page custom typography updated
- [x] All major flows (onboarding, home, dashboard) updated

### Accessibility & Performance
- [x] Proper line-heights for readability (1.4-1.5)
- [x] Fallback fonts specified for loading states
- [x] Font weights limited to necessary variants (300, 400, 500, 700)
- [x] Display=swap parameter for faster font loading

## Browser Support
- Modern browsers with Google Fonts support
- Fallback to system fonts when Roboto unavailable
- Optimized font loading with display=swap

## Maintenance Notes
- All new components should use the standardized typography classes
- Custom font sizes should be avoided in favor of the established hierarchy
- Any deviation from these standards should be documented and approved