// 🧭 CLEAN NAVIGATION SYSTEM
// Simple, direct navigation between standalone pages
// No complex state management or conflicting systems

const Navigation = {
    // Core navigation functions
    home: () => {
        console.log('🏠 Navigating to home...');
        window.location.href = 'home.html';
    },
    
    challenges: () => {
        console.log('🎯 Navigating to challenges...');
        window.location.href = 'challenges.html';
    },
    
    currency: () => {
        console.log('💰 Navigating to currency rewards page...');
        console.log('💰 Current location:', window.location.href);
        window.location.href = 'currency-rewards.html';
    },
    
    welcome: () => {
        console.log('👋 Navigating to welcome...');
        window.location.href = 'welcome.html';
    },
    
    challengeActive: () => {
        console.log('⚡ Navigating to active challenge...');
        window.location.href = 'challenge-active.html';
    },
    
    claimRewards: () => {
        console.log('🎉 Navigating to claim rewards...');
        window.location.href = 'claim-butterflies.html';
    },
    
    benefits: () => {
        console.log('💼 Navigating to benefits...');
        window.location.href = 'benefits.html';
    },
    
    social: () => {
        console.log('👥 Navigating to social...');
        window.location.href = 'social.html';
    },
    
    // Back navigation
    back: () => {
        console.log('⬅️ Going back...');
        if (window.history.length > 1) {
            window.history.back();
        } else {
            // Fallback to home if no history
            Navigation.home();
        }
    },
    
    // Initialize navigation
    init: () => {
        console.log('🧭 Clean Navigation System Ready');
    }
};

// Global functions for onclick handlers
window.navigateToHome = Navigation.home;
window.navigateToChallenges = Navigation.challenges;
window.navigateToCurrency = Navigation.currency;
window.navigateToWelcome = Navigation.welcome;
window.navigateToChallengeActive = Navigation.challengeActive;
window.navigateToClaimRewards = Navigation.claimRewards;
window.navigateToBenefits = Navigation.benefits;
window.navigateToSocial = Navigation.social;
window.goBack = Navigation.back;

// Initialize on load
document.addEventListener('DOMContentLoaded', Navigation.init);

console.log('🧭 Clean Navigation System Loaded!');
