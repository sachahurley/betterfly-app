# Bottom Navigation Component Reference

## Overview
The bottom navigation component is a fixed navigation bar that provides primary navigation access to the main sections of the app. It remains locked to the bottom of the viewport and maintains consistent spacing and behavior across all pages.

## Visual Specifications

### Layout & Positioning
- **Position**: Fixed to bottom of viewport
- **Width**: Full width (100%)
- **Height**: 82px
- **Background Color**: `#0F1C14` (dark gray/black)
- **Padding**: `2px 16px 20px` (top: 2px, horizontal: 16px, bottom: 20px)

### Typography
- **Font Family**: `Roboto, -apple-system, "system-ui", sans-serif`
- **Font Size**: `14px`
- **Text Color**: `#0F1C14` (dark gray/black)
- **Font Weight**: Regular (400)

### Navigation Items
The bottom nav contains exactly **5 navigation items**, evenly spaced:

1. **Home**
   - Icon: House icon
   - Label: "Home"
   - Position: Leftmost

2. **Benefits**
   - Icon: Star icon
   - Label: "Benefits"
   - Position: Second from left

3. **Challenges**
   - Icon: Line graph icon
   - Label: "Challenges"
   - Position: Center

4. **Social**
   - Icon: Two overlapping person icons
   - Label: "Social"
   - Position: Second from right

5. **Profile**
   - Icon: Circular avatar/profile icon (light blue)
   - Label: None (icon only)
   - Position: Rightmost

## Behavior Specifications

### Fixed Positioning
- **Position**: `fixed`
- **Bottom**: `0`
- **Left**: `0`
- **Right**: `0`
- **Z-index**: High enough to stay above content (recommend `1000` or higher)

### Responsive Behavior
- **Mobile**: Full width, locked to bottom
- **Tablet**: Full width, locked to bottom
- **Desktop**: Full width, locked to bottom
- **Safe Area**: Respects device safe areas (notch, home indicator)

### Interaction States
- **Default**: Normal opacity and color
- **Hover**: Subtle highlight (optional)
- **Active/Selected**: Distinct visual state to show current page
- **Disabled**: Reduced opacity (if applicable)

### Accessibility
- **Role**: `navigation`
- **Aria Label**: "Main navigation"
- **Keyboard Navigation**: Tab-accessible
- **Focus Indicators**: Visible focus states
- **Screen Reader**: Each item should have descriptive labels

## Implementation Guidelines

### HTML Structure
```html
<nav class="bottom-nav" role="navigation" aria-label="Main navigation">
  <div class="nav-item" onclick="navigateToHome()">
    <div class="nav-icon">🏠</div>
    <span class="nav-label">Home</span>
  </div>
  <div class="nav-item" onclick="navigateToBenefits()">
    <div class="nav-icon">⭐</div>
    <span class="nav-label">Benefits</span>
  </div>
  <div class="nav-item" onclick="navigateToChallenges()">
    <div class="nav-icon">📈</div>
    <span class="nav-label">Challenges</span>
  </div>
  <div class="nav-item" onclick="navigateToSocial()">
    <div class="nav-icon">👥</div>
    <span class="nav-label">Social</span>
  </div>
  <div class="nav-item" onclick="navigateToProfile()">
    <div class="nav-icon profile-avatar">👤</div>
  </div>
</nav>
```

### CSS Specifications
```css
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 82px;
  background-color: #0F1C14;
  padding: 2px 16px 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
  font-family: 'Roboto', -apple-system, 'system-ui', sans-serif;
  font-size: 14px;
  color: #0F1C14;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.nav-item:hover {
  opacity: 0.8;
}

.nav-item.active {
  /* Add active state styling */
}

.nav-icon {
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-label {
  font-size: 12px;
  text-align: center;
  line-height: 1.2;
}

.profile-avatar {
  background-color: #3B82F6; /* Light blue */
  border-radius: 50%;
  color: white;
}
```

## Usage Notes

### When to Use
- **Primary Navigation**: Use on all main app pages
- **Consistent Access**: Provides consistent access to core features
- **Mobile-First**: Essential for mobile user experience

### When NOT to Use
- **Modal Overlays**: Hide during full-screen modals
- **Onboarding Flows**: May be hidden during initial setup
- **Landing Pages**: Not needed on marketing/landing pages

### State Management
- **Active State**: Highlight the current page/section
- **Navigation**: Use JavaScript functions for page transitions
- **Persistence**: Maintain state across page loads

## Browser Support
- **iOS Safari**: Full support with safe area handling
- **Android Chrome**: Full support
- **Desktop Browsers**: Full support
- **Legacy Browsers**: Graceful degradation

## Testing Checklist
- [ ] Fixed positioning works on all screen sizes
- [ ] All 5 navigation items are visible and clickable
- [ ] Icons and labels are properly aligned
- [ ] Active state shows current page
- [ ] Keyboard navigation works
- [ ] Screen reader announces navigation properly
- [ ] Safe area handling on devices with notches
- [ ] Smooth transitions between pages

---

**Last Updated**: [Current Date]
**Version**: 1.0
**Maintained By**: Design System Team
