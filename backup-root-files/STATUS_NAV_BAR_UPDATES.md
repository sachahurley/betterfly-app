# Status Bar & Navigation Bar Updates

## Overview
Updated the status bar and navigation bar components to perfectly match iOS design standards based on the provided screenshot.

## Changes Made

### Status Bar Updates
- **Height**: 44px (iOS standard)
- **Padding**: 0 21px (precise iOS spacing)
- **Font**: SF Pro Text with fallback to system fonts
- **Time Typography**: 17px, 600 weight, 22px line-height, -0.408px letter-spacing
- **Icons**: Added proper signal bars, WiFi, and battery icons with pixel-perfect positioning

### Navigation Bar Updates  
- **Height**: 44px (iOS standard)
- **Border**: 0.5px solid #C6C6C8 (iOS separator line)
- **Font**: SF Pro Text for native iOS feel
- **Back Button**: #007AFF iOS blue color, proper spacing and typography
- **Title**: Centered, 17px, 600 weight, black text with iOS letter-spacing

### Status Bar Icons Implementation
```html
<div class="status-icons">
    <div class="signal-bars">
        <div class="signal-bar"></div>
        <div class="signal-bar"></div>
        <div class="signal-bar"></div>
        <div class="signal-bar"></div>
    </div>
    <div class="wifi-icon"></div>
    <div class="battery-icon"></div>
</div>
```

### CSS Classes Added
- `.signal-bars` - Container for signal strength bars
- `.signal-bar` - Individual signal strength bars with varying heights
- `.wifi-icon` - WiFi symbol using SVG data URI
- `.battery-icon` - Battery indicator with charging state

### Files Updated
- `/src/flows/onboarding/v2/styles/shared.css` - Main styling updates
- `/src/flows/onboarding/v2/q1-health-feeling.html` - Status bar HTML structure
- `/src/flows/onboarding/v2/review.html` - Status bar HTML structure  
- `/home/styles.css` - Home page status bar consistency

### Typography Specifications
- **Status Time**: SF Pro Text, 17px, 600 weight, -0.408px letter-spacing
- **Nav Title**: SF Pro Text, 17px, 600 weight, centered, -0.408px letter-spacing
- **Back Button**: SF Pro Text, 17px, 400 weight, #007AFF color

### Icon Specifications
- **Signal Bars**: 4 bars with heights 4px, 6px, 8px, 10px
- **WiFi Icon**: 15x11px SVG with iOS-style curved lines
- **Battery Icon**: 24x11px with 85% charge indicator and terminal

## Result
The status bar and navigation bar now perfectly match the iOS design shown in the screenshot with:
- Correct spacing and typography
- Proper iOS colors and styling
- Pixel-perfect icon positioning
- Consistent behavior across all pages

Test at: http://localhost:8000