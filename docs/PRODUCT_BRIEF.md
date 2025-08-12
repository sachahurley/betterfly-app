# BetterFly Product Brief

## Project Overview / Description

BetterFly is a gamified wellness application that combines an engaging onboarding experience with a 5-day challenge system to help users build healthy habits. The app features a Duolingo-inspired onboarding flow where users provide health preferences and complete the first day of their wellness challenge simultaneously. Upon completion, users enter a dashboard experience that tracks progress, manages preferences, and rewards achievements through a virtual currency system.

## Target Audience

- **Primary**: Health-conscious individuals seeking to build sustainable wellness routines
- **Secondary**: Users who enjoy gamified experiences and progress tracking
- **Demographics**: Adults 18-45 who value both health and technology
- **Behavioral**: People who prefer bite-sized, daily micro-habits over overwhelming lifestyle changes

## Primary Benefits / Features

### 🎯 **Connected Onboarding & Challenge System**
- **Seamless Integration**: Onboarding completion automatically counts as Day 1 of the 5-day challenge
- **Progressive Disclosure**: Users learn about the challenge while providing their preferences
- **Immediate Value**: Users see results from their first interaction

### 🎮 **Gamified Wellness Experience**
- **5-Day Challenge Structure**: Daily micro-habits with progressive difficulty
- **Progress Tracking**: Visual representation of challenge completion and streaks
- **Achievement System**: Points, badges, and milestones for motivation
- **Virtual Currency**: Coins earned through completion for future features

### 🔄 **Adaptive User Experience**
- **Preference Management**: Users can modify health goals and preferences post-onboarding
- **Personalized Content**: Challenge content adapts based on user preferences
- **Flexible Time Commitment**: Options for 15-30 minute daily routines

### 📱 **Mobile-First Design**
- **iOS-Style Interface**: Native mobile app feel with status bars and mobile-optimized UI
- **Responsive Design**: Works across different screen sizes and devices
- **Offline Capability**: Local storage for user data and progress

## High-Level Tech/Architecture

### **Frontend Framework**
- **Pure HTML/CSS/JavaScript**: Lightweight, fast-loading web application
- **Progressive Web App (PWA)**: Mobile app-like experience without app store installation
- **Responsive Design**: Mobile-first approach with iOS-style components

### **State Management**
- **Local Storage**: User preferences, onboarding data, and progress tracking
- **Session Management**: Login/logout functionality with dev mode for testing
- **Data Persistence**: User data survives browser sessions and device changes

### **UI Components & Libraries**
- **Canvas Confetti**: Celebration animations for achievements
- **Lucide React Icons**: Modern, consistent iconography
- **Custom CSS Framework**: Tailored design system with wellness-focused color palette

### **Architecture Pattern**
- **Version-Based System**: Multiple versions of onboarding and dashboard flows
- **Modular Structure**: Separate flows for onboarding, dashboard, and shared components
- **Component Reusability**: Shared user state and utility functions

### **Data Flow**
1. **Onboarding**: User preferences → Local storage → Challenge initialization
2. **Dashboard**: Local storage → Challenge progress → Achievement tracking
3. **Settings**: User modifications → Local storage → UI updates

## Current Implementation Status

### ✅ **Completed Features**
- Multi-step onboarding questionnaire (6 steps)
- Welcome screen with character-based design
- 5-day challenge dashboard with progress tracking
- User preference management system
- Local storage for data persistence
- Celebration animations and gamification elements

### 🚧 **In Development**
- Version 2 iterations of both onboarding and dashboard
- Enhanced gamification features
- Additional challenge types and customization options

### 🔮 **Future Considerations**
- Backend integration for multi-device sync
- Social features and community challenges
- Advanced analytics and progress insights
- Premium features unlocked by earned currency

## Success Metrics

- **User Engagement**: Onboarding completion rate and daily challenge participation
- **Retention**: 5-day challenge completion rate and return user engagement
- **User Satisfaction**: Preference modification frequency and feature utilization
- **Technical Performance**: Page load times and mobile responsiveness scores

---

*This brief captures the current state of BetterFly as an in-flight project with existing implementations, focusing on the connected onboarding and challenge system that provides immediate value to users while building long-term engagement through gamification.*
