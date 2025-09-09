# Header Navigation Component Reference

## Overview
The header navigation component is a fixed navigation bar that provides user account access, notifications, and menu controls. It remains locked to the top of the viewport and maintains consistent spacing and behavior across all pages.

## Visual Specifications

### Layout & Positioning
- **Position**: Fixed to top of viewport
- **Width**: Full width (100%)
- **Height**: 64px
- **Background Color**: `#0F1C14` (dark gray/black)
- **Padding**: `0px 24px` (top/bottom: 0px, horizontal: 24px)

### Typography
- **Font Family**: `Roboto, -apple-system, "system-ui", sans-serif`
- **Font Size**: `14px`
- **Text Color**: `#0F1C14` (dark gray/black)
- **Font Weight**: Regular (400)

### Header Elements
The header nav contains exactly **3 main elements**, arranged horizontally:

1. **User Avatar (Left)**
   - **Type**: Circular avatar with user initials
   - **Background**: Light blue (`#3B82F6` or similar)
   - **Text**: User initials (e.g., "AB")
   - **Text Color**: White
   - **Size**: Approximately 32px × 32px
   - **Position**: Left side of header

2. **Notification Badge (Center-Right)**
   - **Icon**: Person with speech bubble icon
   - **Count**: Notification number (e.g., "265")
   - **Background**: Light blue (`#3B82F6` or similar)
   - **Text Color**: White
   - **Position**: Center-right area
   - **Spacing**: Centered between avatar and menu

3. **Hamburger Menu (Right)**
   - **Icon**: Three horizontal lines
   - **Color**: Light blue (`#3B82F6` or similar)
   - **Size**: Standard hamburger menu size
   - **Position**: Rightmost side of header

## Behavior Specifications

### Fixed Positioning
- **Position**: `fixed`
- **Top**: `0`
- **Left**: `0`
- **Right**: `0`
- **Z-index**: High enough to stay above content (recommend `1000` or higher)

### Responsive Behavior
- **Mobile**: Full width, locked to top
- **Tablet**: Full width, locked to top
- **Desktop**: Full width, locked to top
- **Safe Area**: Respects device safe areas (notch, status bar)

### Interaction States
- **Default**: Normal opacity and color
- **Hover**: Subtle highlight (optional)
- **Active/Selected**: Distinct visual state for current user
- **Notification Badge**: Pulsing animation for new notifications

### Accessibility
- **Role**: `banner` or `navigation`
- **Aria Label**: "Main header navigation"
- **Keyboard Navigation**: Tab-accessible
- **Focus Indicators**: Visible focus states
- **Screen Reader**: Each element should have descriptive labels

## Implementation Guidelines

### HTML Structure
```html
<header class="header-nav" role="banner" aria-label="Main header navigation">
  <div class="header-left">
    <div class="user-avatar" onclick="navigateToProfile()" tabindex="0" role="button" aria-label="User profile">
      <span class="avatar-initials">AB</span>
    </div>
  </div>
  
  <div class="header-center">
    <div class="notification-badge" onclick="navigateToNotifications()" tabindex="0" role="button" aria-label="Notifications">
      <div class="notification-icon">💬</div>
      <span class="notification-count">265</span>
    </div>
  </div>
  
  <div class="header-right">
    <button class="hamburger-menu" onclick="toggleMainMenu()" aria-label="Open main menu" aria-expanded="false">
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>
  </div>
</header>
```

### CSS Specifications
```css
.header-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 64px;
  background-color: #0F1C14;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  font-family: 'Roboto', -apple-system, 'system-ui', sans-serif;
  font-size: 14px;
  color: #0F1C14;
}

.header-left,
.header-center,
.header-right {
  display: flex;
  align-items: center;
  height: 100%;
}

.user-avatar {
  width: 32px;
  height: 32px;
  background-color: #3B82F6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.user-avatar:hover {
  opacity: 0.8;
}

.avatar-initials {
  color: white;
  font-weight: 600;
  font-size: 14px;
}

.notification-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #3B82F6;
  padding: 6px 12px;
  border-radius: 16px;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.notification-badge:hover {
  opacity: 0.8;
}

.notification-icon {
  font-size: 16px;
  color: white;
}

.notification-count {
  color: white;
  font-weight: 600;
  font-size: 12px;
}

.hamburger-menu {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  transition: opacity 0.2s ease;
}

.hamburger-menu:hover {
  opacity: 0.8;
}

.hamburger-line {
  width: 20px;
  height: 2px;
  background-color: #3B82F6;
  border-radius: 1px;
  transition: all 0.3s ease;
}

/* Hamburger animation when menu is open */
.hamburger-menu[aria-expanded="true"] .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger-menu[aria-expanded="true"] .hamburger-line:nth-child(2) {
  opacity: 0;
}

.hamburger-menu[aria-expanded="true"] .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}
```

## JavaScript Functionality

### Required Functions
```javascript
// Navigation functions
function navigateToProfile() {
  console.log('👤 Navigating to profile...');
  // Implement profile navigation
}

function navigateToNotifications() {
  console.log('🔔 Navigating to notifications...');
  // Implement notifications navigation
}

function toggleMainMenu() {
  console.log('🍔 Toggling main menu...');
  const menu = document.getElementById('main-menu');
  const button = document.querySelector('.hamburger-menu');
  
  if (menu && button) {
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    menu.style.display = isOpen ? 'none' : 'block';
    button.setAttribute('aria-expanded', !isOpen);
  }
}

// Notification badge animation
function animateNotificationBadge() {
  const badge = document.querySelector('.notification-badge');
  if (badge) {
    badge.style.animation = 'pulse 1s ease-in-out';
    setTimeout(() => {
      badge.style.animation = '';
    }, 1000);
  }
}

// Update notification count
function updateNotificationCount(count) {
  const countElement = document.querySelector('.notification-count');
  if (countElement) {
    countElement.textContent = count;
    animateNotificationBadge();
  }
}
```

## Usage Notes

### When to Use
- **All Main Pages**: Use on all primary app pages
- **Consistent Access**: Provides consistent access to user features
- **Mobile-First**: Essential for mobile user experience

### When NOT to Use
- **Modal Overlays**: May be hidden during full-screen modals
- **Onboarding Flows**: May be hidden during initial setup
- **Landing Pages**: Not needed on marketing/landing pages

### State Management
- **User Avatar**: Update initials based on current user
- **Notification Count**: Update based on unread notifications
- **Menu State**: Track open/closed state for hamburger menu

## Animation Specifications

### Notification Badge Pulse
```css
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
```

### Hamburger Menu Animation
- **Closed State**: Three horizontal lines
- **Open State**: X shape (rotated lines)
- **Transition**: Smooth 0.3s ease

## Browser Support
- **iOS Safari**: Full support with safe area handling
- **Android Chrome**: Full support
- **Desktop Browsers**: Full support
- **Legacy Browsers**: Graceful degradation

## Testing Checklist
- [ ] Fixed positioning works on all screen sizes
- [ ] All 3 header elements are visible and clickable
- [ ] User avatar shows correct initials
- [ ] Notification count updates properly
- [ ] Hamburger menu toggles correctly
- [ ] Keyboard navigation works
- [ ] Screen reader announces elements properly
- [ ] Safe area handling on devices with notches
- [ ] Animations work smoothly
- [ ] Hover states provide visual feedback

---

**Last Updated**: [Current Date]
**Version**: 1.0
**Maintained By**: Design System Team
