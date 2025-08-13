// Reusable Components for Onboarding V2

// Progress Bar Component
class ProgressBar {
  constructor(currentStep, totalSteps) {
    this.currentStep = currentStep;
    this.totalSteps = totalSteps;
  }

  render() {
    const percentage = Math.round((this.currentStep / this.totalSteps) * 100);
    return `
      <div class="progress-container">
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${percentage}%"></div>
        </div>
      </div>
    `;
  }

  static mount(containerId, currentStep, totalSteps) {
    const container = document.getElementById(containerId);
    if (container) {
      const progressBar = new ProgressBar(currentStep, totalSteps);
      container.innerHTML = progressBar.render();
    }
  }
}

// Mascot Bubble Component
class MascotBubble {
  constructor(text, tone = 'info') {
    this.text = text;
    this.tone = tone;
  }

  render() {
    const mascotImage = '<img src="assets/betterfly-mascot.png" alt="Betterfly Mascot" style="width: 80px; height: 80px; object-fit: contain;">';
    const bubbleClass = `mascot-bubble mascot-bubble-${this.tone}`;
    
    return `
      <div class="${bubbleClass}">
        <div class="mascot-avatar">${mascotImage}</div>
        <div class="mascot-speech">
          <div class="speech-bubble">${this.text}</div>
        </div>
      </div>
    `;
  }

  static mount(containerId, text, tone = 'info') {
    const container = document.getElementById(containerId);
    if (container) {
      const mascot = new MascotBubble(text, tone);
      container.innerHTML = mascot.render();
    }
  }
}

// CTA Group Component (Sticky Bottom Bar)
class CTAGroup {
  constructor(options = {}) {
    this.primaryLabel = options.primaryLabel || 'Continue';
    this.onPrimary = options.onPrimary || (() => {});
    this.secondaryLabel = options.secondaryLabel;
    this.onSecondary = options.onSecondary;
    this.disabled = options.disabled || false;
    this.primaryId = options.primaryId || 'primaryBtn';
    this.secondaryId = options.secondaryId || 'secondaryBtn';
    this.primaryButtonClass = options.primaryButtonClass || 'btn-primary';
  }

  render() {
    const primaryClass = `btn ${this.primaryButtonClass} ${this.disabled ? 'btn-disabled' : ''}`;
    const secondaryButton = this.secondaryLabel ? 
      `<button id="${this.secondaryId}" class="btn btn-secondary">${this.secondaryLabel}</button>` : '';
    
    return `
      <div class="cta-group">
        <div class="cta-container">
          <button id="${this.primaryId}" class="${primaryClass}" ${this.disabled ? 'disabled' : ''}>
            ${this.primaryLabel}
          </button>
          ${secondaryButton}
        </div>
      </div>
    `;
  }

  mount(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = this.render();
      
      // Attach event listeners
      const primaryBtn = document.getElementById(this.primaryId);
      if (primaryBtn) {
        primaryBtn.addEventListener('click', (e) => {
          if (!this.disabled) {
            this.onPrimary(e);
          }
        });
      }
      
      if (this.secondaryLabel) {
        const secondaryBtn = document.getElementById(this.secondaryId);
        if (secondaryBtn) {
          secondaryBtn.addEventListener('click', this.onSecondary);
        }
      }
    }
  }

  updateDisabled(disabled) {
    this.disabled = disabled;
    const primaryBtn = document.getElementById(this.primaryId);
    if (primaryBtn) {
      if (disabled) {
        primaryBtn.classList.add('btn-disabled');
        primaryBtn.disabled = true;
      } else {
        primaryBtn.classList.remove('btn-disabled');
        primaryBtn.disabled = false;
      }
    }
  }

  static mount(containerId, options = {}) {
    const ctaGroup = new CTAGroup(options);
    ctaGroup.mount(containerId);
    return ctaGroup;
  }
}

// Selection List Component (for questions with options)
class SelectionList {
  constructor(options = {}) {
    this.items = options.items || [];
    this.multiple = options.multiple || false;
    this.selected = new Set();
    this.onChange = options.onChange || (() => {});
  }

  render() {
    return `
      <div class="selection-list">
        ${this.items.map((item, index) => `
          <div class="selection-item ${this.selected.has(item.value) ? 'selected' : ''}" 
               data-value="${item.value}"
               data-index="${index}">
            <div class="selection-icon">${item.emoji || ''}</div>
            <div class="selection-text">${item.label}</div>
            <div class="selection-check">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="2"/>
                <path d="M6 10l2.5 2.5L14 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-mark"/>
              </svg>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  mount(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = this.render();
      
      // Attach event listeners
      container.querySelectorAll('.selection-item').forEach(item => {
        item.addEventListener('click', (e) => {
          const value = item.dataset.value;
          
          if (!this.multiple) {
            // Single selection - clear others
            this.selected.clear();
            container.querySelectorAll('.selection-item').forEach(i => {
              i.classList.remove('selected');
            });
          }
          
          if (this.selected.has(value)) {
            this.selected.delete(value);
            item.classList.remove('selected');
          } else {
            this.selected.add(value);
            item.classList.add('selected');
          }
          
          // Call onChange with the current selection
          if (this.multiple) {
            this.onChange(Array.from(this.selected));
          } else {
            this.onChange(this.selected.size > 0 ? value : null);
          }
        });
      });
    }
  }

  getSelected() {
    return this.multiple ? Array.from(this.selected) : this.selected.values().next().value;
  }

  static mount(containerId, options = {}) {
    const list = new SelectionList(options);
    list.mount(containerId);
    return list;
  }
}

// iOS Back Button Component
class BackButton {
  constructor(options = {}) {
    this.text = options.text || 'Back';
    this.onBack = options.onBack || this.defaultBackNavigation.bind(this);
    this.disabled = options.disabled || false;
    this.title = options.title || '';
  }

  defaultBackNavigation() {
    const currentRoute = OnboardingRoutes.getCurrentRoute();
    
    // Define the back navigation flow
    const backFlow = {
      'q2-main-concern': 'q1-health-feeling',
 
      'q3-biggest-challenge': this.getPreviousFromQ2(),
      'q4-past-experience': 'q3-biggest-challenge',
      'q5-wearable': 'q4-past-experience',
      'q6-motivation': 'q5-wearable',
      'q7-support-preference': 'q6-motivation',
      'q8-lifestyle': 'q7-support-preference',
      'q9-success': 'q8-lifestyle',
      'q10-commitment': 'q9-success',
      'review': 'q10-commitment',
      'challenges-intro': 'review',
      'save-preferences': 'challenges-intro'
    };

    const previousRoute = backFlow[currentRoute];
    if (previousRoute) {
      // Add haptic feedback (if available)
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
      
      OnboardingRoutes.navigate(previousRoute);
    } else {
      // Fallback to browser back
      window.history.back();
    }
  }

  getPreviousFromQ2() {
    // Always return q2-main-concern since q2-follow-up has been removed
    return 'q2-main-concern';
  }

  render() {
    const buttonClass = `back-button ${this.disabled ? 'disabled' : ''}`;
    
    return `
      <div class="nav-bar">
        <button class="${buttonClass}" ${this.disabled ? 'disabled' : ''}>
          <i data-lucide="chevron-left" class="back-button-icon"></i>
        </button>
        ${this.title ? `<div class="nav-title">${this.title}</div>` : ''}
        <div id="coinCounterContainer" class="nav-coin-container"></div>
      </div>
    `;
  }

  mount(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = this.render();
      
      // Initialize Lucide icons
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
      
      // Mount coin counter
      const coinCount = OnboardingState.getCoinCount ? OnboardingState.getCoinCount() : 0;
      const coinCounter = CoinCounter.mount('coinCounterContainer', coinCount);
      
      const backBtn = container.querySelector('.back-button');
      if (backBtn && !this.disabled) {
        backBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.onBack();
        });
      }
      
      // Store reference for coin updates
      this.coinCounter = coinCounter;
      return this;
    }
  }

  static mount(containerId, options = {}) {
    const backButton = new BackButton(options);
    backButton.mount(containerId);
    
    // Store global reference to coin counter for updates
    if (backButton.coinCounter) {
      window.globalCoinCounter = backButton.coinCounter;
    }
    
    return backButton;
  }
}

// Coin Counter Component
class CoinCounter {
  constructor(coinCount = 0) {
    this.coinCount = coinCount;
    this.animating = false;
    this.currentBottomSheet = null;
  }

  render() {
    return `
      <div class="coin-counter coin-counter-tappable" 
           role="button" 
           tabindex="0" 
           aria-label="View coin information. Current balance: ${this.coinCount} coins"
           data-coins="${this.coinCount}">
        <img src="assets/betterfly-coin-icon-2.png" alt="Coins" class="coin-icon" />
        <span class="coin-count">${this.coinCount}</span>
      </div>
    `;
  }

  mount(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = this.render();
      this.setupTapHandler(containerId);
    }
  }

  setupTapHandler(containerId) {
    const coinCounter = document.querySelector(`#${containerId} .coin-counter-tappable`);
    if (!coinCounter) return;

    // Touch feedback and tap handler
    const handleTap = () => {
      this.showCoinExplanationBottomSheet();
    };

    // Mouse events
    coinCounter.addEventListener('click', handleTap);
    
    // Touch events for mobile
    coinCounter.addEventListener('touchstart', (e) => {
      e.preventDefault();
      coinCounter.classList.add('coin-counter-pressed');
    });
    
    coinCounter.addEventListener('touchend', (e) => {
      e.preventDefault();
      coinCounter.classList.remove('coin-counter-pressed');
      handleTap();
    });
    
    coinCounter.addEventListener('touchcancel', () => {
      coinCounter.classList.remove('coin-counter-pressed');
    });
    
    // Keyboard accessibility
    coinCounter.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleTap();
      }
    });

    // Hover effects for desktop
    coinCounter.addEventListener('mouseenter', () => {
      if (!coinCounter.classList.contains('coin-counter-pressed')) {
        coinCounter.classList.add('coin-counter-hover');
      }
    });
    
    coinCounter.addEventListener('mouseleave', () => {
      coinCounter.classList.remove('coin-counter-hover');
    });
  }

  updateCount(newCount, animate = false) {
    if (this.animating) return; // Prevent overlapping animations
    
    const oldCount = this.coinCount;
    this.coinCount = newCount;
    
    const countElement = document.querySelector('.coin-count');
    const coinIcon = document.querySelector('.coin-icon');
    const coinCounter = document.querySelector('.coin-counter-tappable');
    
    if (countElement) {
      if (animate && newCount > oldCount) {
        this.animating = true;
        
        // Add bounce animation to coin icon
        if (coinIcon) {
          coinIcon.classList.add('coin-bounce');
        }
        
        // Add glow animation to counter
        countElement.classList.add('coin-highlight');
        
        // Animate the number increment
        const difference = newCount - oldCount;
        let currentCount = oldCount;
        const incrementStep = difference / 20; // 20 frames for smooth animation
        
        const incrementAnimation = setInterval(() => {
          currentCount += incrementStep;
          if (currentCount >= newCount) {
            currentCount = newCount;
            countElement.textContent = currentCount;
            clearInterval(incrementAnimation);
            
            // Clean up animations after delay
            setTimeout(() => {
              if (coinIcon) coinIcon.classList.remove('coin-bounce');
              countElement.classList.remove('coin-highlight');
              this.animating = false;
            }, 200);
          } else {
            countElement.textContent = Math.floor(currentCount);
          }
        }, 50);
      } else {
        countElement.textContent = newCount;
      }
      
      // Update accessibility attributes
      if (coinCounter) {
        coinCounter.setAttribute('aria-label', `View coin information. Current balance: ${newCount} coins`);
        coinCounter.setAttribute('data-coins', newCount);
      }
    }
  }

  showCoinExplanationBottomSheet() {
    // Prevent multiple bottom sheets
    if (this.currentBottomSheet) {
      return;
    }

    // Get current coin count
    const currentCoins = this.coinCount;
    
    // Create backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'followup-backdrop';
    
    // Create bottom sheet
    const bottomSheet = document.createElement('div');
    bottomSheet.className = 'followup-bottom-sheet coin-explanation-sheet';
    
    bottomSheet.innerHTML = `
      <div class="followup-handle"></div>
      <div class="followup-header">
        <h3 class="followup-title">Betterfly Coins</h3>
        <button class="followup-close" id="coinExplanationClose">
          <i data-lucide="x"></i>
        </button>
      </div>
      <div class="followup-content">
        <div class="coin-explanation-content">
          <div class="coin-balance-display">
            <img src="assets/betterfly-coin-icon-2.png" alt="Coins" class="coin-explanation-icon" />
            <span class="coin-explanation-count">${currentCoins}</span>
            <span class="coin-balance-label">Total Coins</span>
          </div>
          <p class="coin-explanation-text">
            Earn coins by completing wellness challenges and redeem them for employer-sponsored benefits and subsidies that support your health and well-being.
          </p>
        </div>
      </div>
    `;
    
    // Store references
    this.currentBottomSheet = { backdrop, bottomSheet };
    
    // Add to DOM
    document.body.appendChild(backdrop);
    document.body.appendChild(bottomSheet);
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
    
    // Animate in
    requestAnimationFrame(() => {
      backdrop.classList.add('visible');
      bottomSheet.classList.add('visible');
    });
    
    // Set up event listeners
    this.setupCoinBottomSheetListeners();
  }

  setupCoinBottomSheetListeners() {
    const { backdrop, bottomSheet } = this.currentBottomSheet;
    
    // Close button
    const closeBtn = bottomSheet.querySelector('#coinExplanationClose');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.dismissCoinBottomSheet();
      });
    }
    
    // Backdrop click
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        this.dismissCoinBottomSheet();
      }
    });
    
    // Swipe to dismiss (simplified touch handling)
    let startY = 0;
    let currentY = 0;
    
    bottomSheet.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
    });
    
    bottomSheet.addEventListener('touchmove', (e) => {
      currentY = e.touches[0].clientY;
      const diffY = currentY - startY;
      
      if (diffY > 0) {
        bottomSheet.style.transform = `translateY(${diffY}px)`;
        bottomSheet.style.opacity = Math.max(0.5, 1 - (diffY / 300));
      }
    });
    
    bottomSheet.addEventListener('touchend', () => {
      const diffY = currentY - startY;
      
      if (diffY > 100) {
        this.dismissCoinBottomSheet();
      } else {
        bottomSheet.style.transform = 'translateY(0)';
        bottomSheet.style.opacity = '1';
      }
    });
    
    // Keyboard escape
    const handleKeydown = (e) => {
      if (e.key === 'Escape') {
        this.dismissCoinBottomSheet();
        document.removeEventListener('keydown', handleKeydown);
      }
    };
    document.addEventListener('keydown', handleKeydown);
  }

  dismissCoinBottomSheet() {
    if (!this.currentBottomSheet) {
      return;
    }
    
    const { backdrop, bottomSheet } = this.currentBottomSheet;
    
    // Animate out
    backdrop.classList.remove('visible');
    bottomSheet.classList.remove('visible');
    
    setTimeout(() => {
      if (backdrop.parentNode) backdrop.remove();
      if (bottomSheet.parentNode) bottomSheet.remove();
      this.currentBottomSheet = null;
    }, 300);
  }

  static mount(containerId, coinCount = 0) {
    const coinCounter = new CoinCounter(coinCount);
    coinCounter.mount(containerId);
    return coinCounter;
  }
}

// Coin Toast Manager - Handles coin award toast notifications
class CoinAnimationManager {
  static isAnimating = false;
  
  static showCoinToast(coinsAwarded = 10, callback = () => {}, autoCloseDelay = 600) {
    console.log('showCoinToast called with auto-close after', autoCloseDelay, 'ms');
    console.log('DEBUGGING: showCoinToast stack trace:', new Error().stack);
    console.log('DEBUGGING: isAnimating status:', this.isAnimating);
    if (this.isAnimating) {
      console.log('DEBUGGING: Already animating - calling callback immediately and returning!');
      callback();
      return;
    }
    
    this.isAnimating = true;
    
    // Disable CTA buttons during animation
    const ctaButtons = document.querySelectorAll('.btn');
    ctaButtons.forEach(btn => {
      btn.disabled = true;
      btn.classList.add('btn-disabled', 'coin-animating');
    });
    
    // No dimmer for regular coin toasts
    
    // Create toast element without tap instruction
    const toast = document.createElement('div');
    toast.className = 'coin-toast';
    toast.innerHTML = `
      <div class="coin-toast-content">
        <img src="assets/betterfly-coin-icon-2.png" alt="Coins" class="toast-coin-icon" />
        <span class="toast-coin-text">+${coinsAwarded} coins earned!</span>
      </div>
    `;
    
    // Position toast at bottom of screen initially (off-screen)
    toast.style.cssText = `
      position: fixed;
      left: 24px;
      right: 24px;
      bottom: -100px;
      z-index: 10000;
      pointer-events: none;
    `;
    
    document.body.appendChild(toast);
    
    // Auto-close timer
    let autoCloseTimer = null;
    
    // Function to handle toast dismissal
    const dismissToast = () => {
      console.log('DEBUGGING: dismissToast called - auto-closing toast');
      
      // Clear timer if it exists
      if (autoCloseTimer) {
        clearTimeout(autoCloseTimer);
        autoCloseTimer = null;
      }
      
      // Slide toast down
      toast.style.bottom = '-100px';
      
      // Cleanup after animations complete
      setTimeout(() => {
        // Remove toast
        if (toast.parentNode) {
          toast.remove();
        }
        
        // Re-enable buttons
        ctaButtons.forEach(btn => {
          btn.disabled = false;
          btn.classList.remove('btn-disabled', 'coin-animating');
        });
        
        this.isAnimating = false;
        
        // Proceed to next screen
        console.log('DEBUGGING: Calling navigation callback after auto-close');
        callback();
      }, 400); // Wait for slide down animation to complete
    };
    
    // Animate toast sliding up
    setTimeout(() => {
      // Slide up toast
      toast.style.transition = 'bottom 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      toast.style.bottom = '81px';
      
      // Start auto-close timer after slide up animation completes
      setTimeout(() => {
        console.log('DEBUGGING: Starting auto-close timer for', autoCloseDelay, 'ms');
        autoCloseTimer = setTimeout(() => {
          console.log('DEBUGGING: Auto-close timer triggered');
          dismissToast();
        }, autoCloseDelay);
      }, 400); // Wait for slide up animation to complete
      
    }, 100);
    
    // Update counter when toast becomes fully visible
    setTimeout(() => {
      if (window.globalCoinCounter) {
        window.globalCoinCounter.updateCount(OnboardingState.getCoinCount(), true);
      }
    }, 500); // 400ms slide + 100ms buffer for full visibility
  }
  
  static showCelebrationToast(coinsAwarded = 100, callback = () => {}, autoCloseDelay = 600) {
    if (this.isAnimating) {
      callback();
      return;
    }
    
    this.isAnimating = true;
    
    // Disable CTA buttons during animation
    const ctaButtons = document.querySelectorAll('.btn');
    ctaButtons.forEach(btn => {
      btn.disabled = true;
      btn.classList.add('btn-disabled', 'coin-animating');
    });
    
    // Create dimmer overlay
    const dimmer = document.createElement('div');
    dimmer.className = 'coin-celebration-dimmer';
    dimmer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    `;
    
    // Create celebration toast element with tap instruction
    const toast = document.createElement('div');
    toast.className = 'coin-celebration-toast';
    toast.innerHTML = `
      <div class="celebration-toast-content">
        <img src="assets/betterfly-coin-icon-2.png" alt="Coins" class="celebration-coin-icon" />
        <span class="celebration-coin-text">+${coinsAwarded} coins!</span>
        <div class="celebration-subtitle">Amazing work!</div>
        <div class="celebration-tap-instruction">Tap to continue</div>
      </div>
    `;
    
    // Position toast at bottom of screen initially (off-screen)
    toast.style.cssText = `
      position: fixed;
      left: 24px;
      right: 24px;
      bottom: -150px;
      z-index: 10000;
      pointer-events: all;
      cursor: pointer;
    `;
    
    document.body.appendChild(dimmer);
    document.body.appendChild(toast);
    
    // Function to handle toast dismissal
    const dismissToast = () => {
      console.log('DEBUGGING: dismissToast called on celebration toast - tap to dismiss');
      
      // Fade out dimmer and slide toast down simultaneously
      dimmer.style.opacity = '0';
      toast.style.bottom = '-150px';
      
      // Cleanup after slide down animation
      setTimeout(() => {
        // Remove toast and dimmer
        if (toast.parentNode) {
          toast.remove();
        }
        if (dimmer.parentNode) {
          dimmer.remove();
        }
        
        // Re-enable buttons
        ctaButtons.forEach(btn => {
          btn.disabled = false;
          btn.classList.remove('btn-disabled', 'coin-animating');
        });
        
        this.isAnimating = false;
        
        // Proceed to next screen
        console.log('DEBUGGING: Calling navigation callback after celebration toast auto-close');
        callback();
      }, 600); // Wait for slide down animation to complete
    };
    
    // Animate dimmer fade in and toast sliding up with bounce
    setTimeout(() => {
      // Fade in dimmer
      dimmer.style.opacity = '1';
      
      // Slide up toast with bounce
      toast.style.transition = 'bottom 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'; // Bouncy easing
      toast.style.bottom = '81px';
      
      // Add click event listeners for tap-to-dismiss
      setTimeout(() => {
        console.log('DEBUGGING: Adding click event listeners to celebration toast');
        toast.addEventListener('click', dismissToast);
        dimmer.addEventListener('click', dismissToast);
      }, 600); // Wait for slide up animation to complete
      
    }, 100);
    
    // Update counter when toast becomes fully visible
    setTimeout(() => {
      if (window.globalCoinCounter) {
        window.globalCoinCounter.updateCount(OnboardingState.getCoinCount(), true);
      }
    }, 700); // 600ms slide + 100ms buffer for full visibility
  }

  // Legacy method name for compatibility
  static animateCoinToCounter(coinsAwarded, callback) {
    this.showCoinToast(coinsAwarded, callback);
  }
}

// Edit Mode Helper - Handles navigation back to review after editing
class EditModeHelper {
  static isEditMode() {
    return sessionStorage.getItem('reviewEditMode') === 'true';
  }
  
  static getReturnUrl() {
    return sessionStorage.getItem('reviewReturnUrl') || 'review.html';
  }
  
  static clearEditMode() {
    sessionStorage.removeItem('reviewEditMode');
    sessionStorage.removeItem('reviewReturnUrl');
  }
  
  static returnToReview() {
    const returnUrl = this.getReturnUrl();
    this.clearEditMode();
    window.location.href = returnUrl;
  }
  
  // Update CTA button behavior when in edit mode
  static setupEditModeCTA(ctaGroup, normalCallback) {
    if (this.isEditMode()) {
      // Override the primary button to return to review instead of continuing
      return {
        primaryLabel: 'Back to Review',
        onPrimary: () => {
          this.returnToReview();
        }
      };
    } else {
      // Use normal behavior with follow-up system integration
      return {
        primaryLabel: ctaGroup.primaryLabel,
        onPrimary: () => {
          console.log('CTA Primary button clicked');
          
          // Get current route for follow-up system
          const currentRoute = OnboardingRoutes.getCurrentRoute();
          console.log('Current route for follow-up:', currentRoute);
          
          // Use follow-up system to handle coin awards and potential follow-up
          const followUpSystem = FollowUpQuestionnaireSystem.getInstance();
          console.log('Follow-up system instance:', followUpSystem);
          
          followUpSystem.processFollowUpTrigger(currentRoute, () => {
            console.log('Follow-up processing complete, executing normal callback');
            // Execute normal callback after follow-up (or standard coins)
            normalCallback();
          });
        }
      };
    }
  }
}

// iOS Bottom Sheet Follow-Up Questionnaire System
class FollowUpQuestionnaireSystem {
  constructor() {
    this.currentBottomSheet = null;
    this.coinReward = 15;
    this.questionBank = this.initializeQuestionBank();
    this.informationalBank = this.initializeInformationalBank();
  }

  initializeQuestionBank() {
    return {
      'q1-health-feeling': [
        {
          id: 'q1_energy_timing',
          title: 'Energy Patterns',
          description: 'When do you typically feel most energized?',
          options: [
            { id: 1, text: 'Morning hours', icon: '🌅' },
            { id: 2, text: 'Afternoon', icon: '☀️' },
            { id: 3, text: 'Evening', icon: '🌆' },
            { id: 4, text: 'Late night', icon: '🌙' }
          ]
        },
        {
          id: 'q1_mood_factors',
          title: 'Mood Influences',
          description: 'What affects your mood the most?',
          options: [
            { id: 1, text: 'Sleep quality', icon: '😴' },
            { id: 2, text: 'Exercise', icon: '💪' },
            { id: 3, text: 'Social interactions', icon: '👥' },
            { id: 4, text: 'Work stress', icon: '💼' }
          ]
        }
      ],
      'q2-main-concern': [
        {
          id: 'q2_concern_duration',
          title: 'Duration Check',
          description: 'How long have you been experiencing this concern?',
          options: [
            { id: 1, text: 'Less than 1 month', icon: '📅' },
            { id: 2, text: '1-3 months', icon: '📆' },
            { id: 3, text: '3-6 months', icon: '🗓️' },
            { id: 4, text: 'More than 6 months', icon: '📋' }
          ]
        },
        {
          id: 'q2_impact_level',
          title: 'Impact Assessment',
          description: 'How much does this affect your daily life?',
          options: [
            { id: 1, text: 'Minimal impact', icon: '🟢' },
            { id: 2, text: 'Some disruption', icon: '🟡' },
            { id: 3, text: 'Significant impact', icon: '🟠' },
            { id: 4, text: 'Major disruption', icon: '🔴' }
          ]
        }
      ],
      'q3-biggest-challenge': [
        {
          id: 'q3_challenge_frequency',
          title: 'Challenge Frequency',
          description: 'How often does this challenge occur?',
          options: [
            { id: 1, text: 'Daily', icon: '📊' },
            { id: 2, text: 'Few times a week', icon: '📈' },
            { id: 3, text: 'Weekly', icon: '📉' },
            { id: 4, text: 'Monthly', icon: '📋' }
          ]
        },
        {
          id: 'q3_coping_strategy',
          title: 'Coping Methods',
          description: 'What do you currently do to handle this challenge?',
          options: [
            { id: 1, text: 'Talk to friends', icon: '💬' },
            { id: 2, text: 'Exercise or walk', icon: '🚶' },
            { id: 3, text: 'Take breaks', icon: '⏸️' },
            { id: 4, text: 'Nothing specific', icon: '🤷' }
          ]
        }
      ],
      'q4-past-experience': [
        {
          id: 'q4_program_length',
          title: 'Program Duration',
          description: 'How long was your most successful wellness program?',
          options: [
            { id: 1, text: '1-2 weeks', icon: '⏱️' },
            { id: 2, text: '1 month', icon: '📅' },
            { id: 3, text: '2-3 months', icon: '📆' },
            { id: 4, text: '6+ months', icon: '🗓️' }
          ]
        },
        {
          id: 'q4_success_factor',
          title: 'Success Factors',
          description: 'What made that program work for you?',
          options: [
            { id: 1, text: 'Clear structure', icon: '📋' },
            { id: 2, text: 'Community support', icon: '👥' },
            { id: 3, text: 'Flexible schedule', icon: '⏰' },
            { id: 4, text: 'Quick results', icon: '⚡' }
          ]
        }
      ],
      'q5-wearable': [
        {
          id: 'q5_tracking_preference',
          title: 'Tracking Style',
          description: 'How do you prefer to track your progress?',
          options: [
            { id: 1, text: 'Automatic tracking', icon: '🤖' },
            { id: 2, text: 'Manual logging', icon: '✍️' },
            { id: 3, text: 'Weekly check-ins', icon: '📊' },
            { id: 4, text: 'No tracking needed', icon: '🚫' }
          ]
        },
        {
          id: 'q5_data_importance',
          title: 'Data Priority',
          description: 'Which health metric is most important to you?',
          options: [
            { id: 1, text: 'Steps/Activity', icon: '👟' },
            { id: 2, text: 'Sleep quality', icon: '💤' },
            { id: 3, text: 'Heart rate', icon: '❤️' },
            { id: 4, text: 'Stress levels', icon: '😌' }
          ]
        }
      ],
      'q6-motivation': [
        {
          id: 'q6_motivation_style',
          title: 'Motivation Type',
          description: 'What type of motivation works best for you?',
          options: [
            { id: 1, text: 'Positive reinforcement', icon: '🎉' },
            { id: 2, text: 'Goal achievement', icon: '🎯' },
            { id: 3, text: 'Competition', icon: '🏆' },
            { id: 4, text: 'Self-improvement', icon: '📈' }
          ]
        },
        {
          id: 'q6_reward_preference',
          title: 'Reward System',
          description: 'What kind of rewards motivate you most?',
          options: [
            { id: 1, text: 'Digital badges', icon: '🏅' },
            { id: 2, text: 'Progress tracking', icon: '📊' },
            { id: 3, text: 'Social recognition', icon: '👏' },
            { id: 4, text: 'Personal satisfaction', icon: '😊' }
          ]
        }
      ],
      'q7-support-preference': [
        {
          id: 'q7_support_timing',
          title: 'Support Timing',
          description: 'When do you most need support and encouragement?',
          options: [
            { id: 1, text: 'Morning motivation', icon: '🌅' },
            { id: 2, text: 'Midday check-ins', icon: '☀️' },
            { id: 3, text: 'Evening reflection', icon: '🌙' },
            { id: 4, text: 'When struggling', icon: '💪' }
          ]
        },
        {
          id: 'q7_communication_style',
          title: 'Communication Style',
          description: 'How do you prefer to receive guidance?',
          options: [
            { id: 1, text: 'Gentle reminders', icon: '🔔' },
            { id: 2, text: 'Direct coaching', icon: '📢' },
            { id: 3, text: 'Tips and insights', icon: '💡' },
            { id: 4, text: 'Celebration messages', icon: '🎊' }
          ]
        }
      ],
      'q8-lifestyle': [
        {
          id: 'q8_schedule_flexibility',
          title: 'Schedule Flexibility',
          description: 'How flexible is your daily routine?',
          options: [
            { id: 1, text: 'Very structured', icon: '📋' },
            { id: 2, text: 'Mostly predictable', icon: '⏰' },
            { id: 3, text: 'Somewhat variable', icon: '🔄' },
            { id: 4, text: 'Highly unpredictable', icon: '🌪️' }
          ]
        },
        {
          id: 'q8_wellness_priority',
          title: 'Wellness Priority',
          description: 'Where does wellness fit in your priorities?',
          options: [
            { id: 1, text: 'Top priority', icon: '⭐' },
            { id: 2, text: 'Important focus', icon: '🎯' },
            { id: 3, text: 'When time allows', icon: '⏳' },
            { id: 4, text: 'Would like more focus', icon: '💭' }
          ]
        }
      ],
      'q9-success': [
        {
          id: 'q9_success_timeline',
          title: 'Success Timeline',
          description: 'How quickly do you expect to see results?',
          options: [
            { id: 1, text: 'Within a week', icon: '⚡' },
            { id: 2, text: '2-4 weeks', icon: '📅' },
            { id: 3, text: '1-2 months', icon: '📆' },
            { id: 4, text: '3+ months', icon: '🗓️' }
          ]
        },
        {
          id: 'q9_measurement_method',
          title: 'Success Measurement',
          description: 'How will you know you\'re making progress?',
          options: [
            { id: 1, text: 'How I feel', icon: '😊' },
            { id: 2, text: 'Energy levels', icon: '⚡' },
            { id: 3, text: 'Data metrics', icon: '📊' },
            { id: 4, text: 'Others\' feedback', icon: '👥' }
          ]
        }
      ],
      'q10-commitment': [
        {
          id: 'q10_commitment_level',
          title: 'Commitment Level',
          description: 'How committed are you to making changes?',
          options: [
            { id: 1, text: 'Extremely committed', icon: '🔥' },
            { id: 2, text: 'Very committed', icon: '💪' },
            { id: 3, text: 'Moderately committed', icon: '👍' },
            { id: 4, text: 'Trying it out', icon: '🤔' }
          ]
        },
        {
          id: 'q10_obstacle_handling',
          title: 'Obstacle Management',
          description: 'How do you typically handle setbacks?',
          options: [
            { id: 1, text: 'Learn and adjust', icon: '🎓' },
            { id: 2, text: 'Get back on track', icon: '🔄' },
            { id: 3, text: 'Seek support', icon: '🤝' },
            { id: 4, text: 'Take a break', icon: '⏸️' }
          ]
        }
      ]
    };
  }

  // Initialize contextual informational content bank based on user answers
  initializeInformationalBank() {
    return {
      // Content for users struggling with health
      struggling: {
        financial: [
          {
            id: 'chronic_disease_costs',
            category: 'financial',
            title: 'Did You Know?',
            content: 'People with chronic conditions like diabetes spend an average of $9,601 more per year on medical costs. Early intervention can significantly reduce these expenses.',
            source: {
              text: 'American Diabetes Association',
              url: 'https://diabetesjournal.org/action/showPdf?pii=S0149-2918%2818%2930368-0'
            }
          },
          {
            id: 'emergency_costs',
            category: 'financial',
            title: 'Did You Know?',
            content: 'Emergency room visits cost an average of $2,200 per visit. Many health issues leading to ER visits can be prevented with consistent self-care.',
            source: {
              text: 'Healthcare Financial Management Association',
              url: 'https://www.hfma.org/topics/news/2019/03/the-true-cost-of-emergency-department-visits.html'
            }
          }
        ],
        behavioral: [
          {
            id: 'small_wins_motivation',
            category: 'behavioral',
            title: 'Small Changes, Big Impact',
            content: 'Starting with just 5 minutes of daily movement can improve energy levels by 20% and boost motivation for bigger changes.',
            source: {
              text: 'Journal of Health Psychology',
              url: 'https://journals.sagepub.com/doi/abs/10.1177/1359105315618994'
            }
          },
          {
            id: 'stress_reduction_basics',
            category: 'behavioral',
            title: 'Small Changes, Big Impact',
            content: 'Three deep breaths taken 3 times per day can reduce cortisol levels by 15% and improve overall well-being.',
            source: {
              text: 'American Psychological Association',
              url: 'https://www.apa.org/science/about/psa/2019/06/stress-relief'
            }
          }
        ]
      },
      
      // Content for users doing okay but wanting improvement
      improving: {
        financial: [
          {
            id: 'prevention_savings',
            category: 'financial',
            title: 'Did You Know?',
            content: 'Preventive care saves an average of $7 for every $1 spent. Regular health maintenance can prevent costly conditions later.',
            source: {
              text: 'CDC - Prevention and Wellness',
              url: 'https://www.cdc.gov/chronicdisease/about/prevention.htm'
            }
          },
          {
            id: 'fitness_investment_roi',
            category: 'financial',
            title: 'Did You Know?',
            content: 'Regular exercise can reduce healthcare costs by $2,500 per year through reduced doctor visits and medication needs.',
            source: {
              text: 'Journal of American Heart Association',
              url: 'https://www.ahajournals.org/doi/full/10.1161/JAHA.116.003614'
            }
          }
        ],
        behavioral: [
          {
            id: 'habit_stacking_power',
            category: 'behavioral',
            title: 'Small Changes, Big Impact',
            content: 'Adding one healthy habit to an existing routine increases success rates by 65% compared to starting from scratch.',
            source: {
              text: 'British Journal of Health Psychology',
              url: 'https://bpspsychub.onlinelibrary.wiley.com/doi/abs/10.1348/135910706X96560'
            }
          },
          {
            id: 'incremental_improvements',
            category: 'behavioral',
            title: 'Small Changes, Big Impact',
            content: 'Improving just 1% each day compounds to 37x better results over a year. Small, consistent changes create lasting transformation.',
            source: {
              text: 'Harvard Business Review - The Power of Small Wins',
              url: 'https://hbr.org/2011/05/the-power-of-small-wins'
            }
          }
        ]
      },

      // Content for users doing well but wanting optimization
      optimizing: {
        financial: [
          {
            id: 'longevity_investment',
            category: 'financial',
            title: 'Did You Know?',
            content: 'Maintaining optimal health can add 7-10 years to your lifespan, potentially saving $50,000+ in end-of-life medical costs.',
            source: {
              text: 'Harvard T.H. Chan School of Public Health',
              url: 'https://www.hsph.harvard.edu/news/press-releases/healthy-lifestyle-longer-life/'
            }
          },
          {
            id: 'productivity_gains',
            category: 'financial',
            title: 'Did You Know?',
            content: 'Peak physical condition can increase work productivity by 23%, potentially adding $15,000+ to annual earning potential.',
            source: {
              text: 'Journal of Occupational and Environmental Medicine',
              url: 'https://journals.lww.com/joem/Abstract/2014/04000/Workplace_Physical_Activity_Programs.1.aspx'
            }
          }
        ],
        behavioral: [
          {
            id: 'performance_optimization',
            category: 'behavioral',
            title: 'Small Changes, Big Impact',
            content: 'Elite athletes improve performance through 1% optimizations. Small tweaks to sleep, nutrition, and recovery compound significantly.',
            source: {
              text: 'Sports Medicine Journal',
              url: 'https://link.springer.com/article/10.1007/s40279-017-0793-0'
            }
          },
          {
            id: 'biohacking_basics',
            category: 'behavioral',
            title: 'Small Changes, Big Impact',
            content: 'Tracking HRV and optimizing circadian rhythms can improve cognitive performance by 12% and energy levels by 18%.',
            source: {
              text: 'Nature - Circadian Rhythms and Health',
              url: 'https://www.nature.com/articles/nature23017'
            }
          }
        ]
      },

      // Content for users who are thriving
      thriving: {
        financial: [
          {
            id: 'health_legacy_value',
            category: 'financial',
            title: 'Did You Know?',
            content: 'Maintaining excellent health can reduce family healthcare burdens by 40% and increase inheritance value by extending earning years.',
            source: {
              text: 'National Institute on Aging',
              url: 'https://www.nia.nih.gov/health/healthy-aging'
            }
          },
          {
            id: 'insurance_premiums_healthy',
            category: 'financial',
            title: 'Did You Know?',
            content: 'People in excellent health can qualify for life insurance premiums 75% lower than average, saving thousands annually.',
            source: {
              text: 'American Council of Life Insurers',
              url: 'https://www.acli.com/posting/healthy-living-can-lower-life-insurance-premiums'
            }
          }
        ],
        behavioral: [
          {
            id: 'maintenance_consistency',
            category: 'behavioral',
            title: 'Small Changes, Big Impact',
            content: 'Maintaining peak health requires only 80% consistency. Perfect is not necessary - sustainable excellence is the goal.',
            source: {
              text: 'American Journal of Preventive Medicine',
              url: 'https://www.ajpmonline.org/article/S0749-3797(16)30513-6/fulltext'
            }
          },
          {
            id: 'influence_ripple_effect',
            category: 'behavioral',
            title: 'Small Changes, Big Impact',
            content: 'Your healthy habits influence an average of 3 people in your network, creating positive ripple effects in your community.',
            source: {
              text: 'New England Journal of Medicine',
              url: 'https://www.nejm.org/doi/full/10.1056/NEJMsa066082'
            }
          }
        ]
      },

      // Content for users who are unsure
      unsure: {
        financial: [
          {
            id: 'health_assessment_value',
            category: 'financial',
            title: 'Did You Know?',
            content: 'A comprehensive health assessment can identify risk factors early, potentially preventing $25,000+ in future medical costs.',
            source: {
              text: 'Preventive Medicine Journal',
              url: 'https://www.sciencedirect.com/journal/preventive-medicine'
            }
          }
        ],
        behavioral: [
          {
            id: 'self_awareness_first_step',
            category: 'behavioral',
            title: 'Small Changes, Big Impact',
            content: 'Simply tracking your current habits for one week can increase self-awareness by 40% and motivation for change by 25%.',
            source: {
              text: 'Health Psychology Review',
              url: 'https://www.tandfonline.com/doi/abs/10.1080/17437199.2013.837729'
            }
          }
        ]
      }
    };
  }

  // Get random follow-up question for a given main question
  getRandomFollowUpQuestion(mainQuestionId) {
    const questions = this.questionBank[mainQuestionId];
    if (!questions || questions.length === 0) return null;
    
    // Get previously shown questions from state safely
    let shownQuestions = [];
    try {
      const followUpData = OnboardingState.get('followUp');
      if (followUpData && typeof followUpData === 'object') {
        shownQuestions = Array.isArray(followUpData.shownQuestions) ? followUpData.shownQuestions : [];
      }
    } catch (e) {
      console.warn('Error accessing followUp.shownQuestions:', e);
      shownQuestions = [];
    }
    
    // Filter out already shown questions
    const availableQuestions = questions.filter(q => !shownQuestions.includes(q.id));
    
    // If no available questions, return null
    if (availableQuestions.length === 0) return null;
    
    // Return random available question
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    return availableQuestions[randomIndex];
  }

  // Check if follow-up should trigger
  shouldTriggerFollowUp(currentQuestionId) {
    console.log('shouldTriggerFollowUp called for:', currentQuestionId);
    
    // Don't trigger on excluded pages
    const excludedPages = ['loading', 'review', 'challenges-intro', 'profile-prompt', 'signup-'];
    if (excludedPages.some(excluded => currentQuestionId.includes(excluded))) {
      console.log('Excluded page, not triggering follow-up');
      return false;
    }

    try {
      // Get completed questions count safely
      const coinsData = OnboardingState.get('coins') || {};
      let completedQuestions = coinsData.completedQuestions;
      
      // Handle case where completedQuestions might be undefined or not a Set
      if (!completedQuestions) {
        completedQuestions = new Set();
      } else if (Array.isArray(completedQuestions)) {
        completedQuestions = new Set(completedQuestions);
      } else if (!(completedQuestions instanceof Set)) {
        // If it's an object or other type, convert to Set
        completedQuestions = new Set(Object.keys(completedQuestions));
      }
      
      const questionKeys = Array.from(completedQuestions).filter(key => 
        typeof key === 'string' && key.startsWith('q') && !key.includes('_')
      );
      
      // Get already triggered pages safely
      let triggeredPages = [];
      try {
        const followUpData = OnboardingState.get('followUp') || {};
        triggeredPages = followUpData.triggeredPages || [];
      } catch (e) {
        triggeredPages = [];
      }
      
      // Don't trigger if already triggered on this page
      if (triggeredPages.includes(currentQuestionId)) {
        console.log('Already triggered on this page, skipping');
        return false;
      }

      // Simple deterministic logic: trigger on question 2 and question 6
      console.log('Current question ID:', currentQuestionId);
      console.log('Already triggered pages:', triggeredPages);
      
      // Define specific pages where follow-ups should trigger
      const followUpTriggerPages = ['q2-main-concern', 'q6-motivation'];
      
      // Check if current page is one of the designated follow-up pages
      const shouldTrigger = followUpTriggerPages.includes(currentQuestionId);
      console.log('Should trigger follow-up (fixed on q2 and q6):', shouldTrigger);
      return shouldTrigger;
    } catch (error) {
      console.error('Error in shouldTriggerFollowUp:', error);
      return false;
    }
  }

  // Create and show iOS bottom sheet
  showFollowUpBottomSheet(question, onComplete, onSkip) {
    console.log('showFollowUpBottomSheet called with question:', question);
    
    if (this.currentBottomSheet) {
      console.log('Existing bottom sheet found, dismissing...');
      this.dismissBottomSheet();
    }

    // Create backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'followup-backdrop';
    console.log('Created backdrop:', backdrop);
    
    // Create bottom sheet
    const bottomSheet = document.createElement('div');
    bottomSheet.className = 'followup-bottom-sheet';
    console.log('Created bottom sheet:', bottomSheet);
    
    bottomSheet.innerHTML = `
      <div class="followup-handle"></div>
      <div class="followup-header">
        <h3 class="followup-title">Quick Follow-up</h3>
        <button class="followup-close" id="followupClose">
          <i data-lucide="x"></i>
        </button>
      </div>
      <div class="followup-content">
        <div class="followup-coin-badge">
          <img src="assets/betterfly-coin-icon-2.png" alt="Coins" class="followup-coin-icon" />
          <span class="followup-coin-text">+${this.coinReward} COINS</span>
        </div>
        <h4 class="followup-question-title">${question.title}</h4>
        <p class="followup-question-description">${question.description}</p>
        <div class="followup-options" id="followupOptions">
          ${question.options.map(option => `
            <div class="followup-option" data-option-id="${option.id}">
              <div class="followup-option-icon">${option.icon || '📷'}</div>
              <span class="followup-option-text">${option.text}</span>
              <div class="followup-option-radio"></div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Add to DOM
    console.log('Adding elements to DOM...');
    document.body.appendChild(backdrop);
    document.body.appendChild(bottomSheet);
    console.log('Elements added. Body children count:', document.body.children.length);
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
    
    this.currentBottomSheet = { backdrop, bottomSheet, question };
    
    // Animate in
    console.log('Starting animations...');
    requestAnimationFrame(() => {
      console.log('Animation frame - adding visible classes');
      backdrop.classList.add('visible');
      bottomSheet.classList.add('visible');
      console.log('Backdrop classes:', backdrop.className);
      console.log('Bottom sheet classes:', bottomSheet.className);
    });
    
    // Set up event listeners
    this.setupBottomSheetListeners(onComplete, onSkip);
  }

  setupBottomSheetListeners(onComplete, onSkip) {
    const { backdrop, bottomSheet, question } = this.currentBottomSheet;
    let selectedOption = null;
    
    // Close button
    const closeBtn = bottomSheet.querySelector('#followupClose');
    closeBtn.addEventListener('click', () => {
      this.dismissBottomSheet(() => onSkip());
    });
    
    // Backdrop click
    backdrop.addEventListener('click', () => {
      this.dismissBottomSheet(() => onSkip());
    });
    
    // Option selection
    const optionsContainer = bottomSheet.querySelector('#followupOptions');
    optionsContainer.addEventListener('click', (e) => {
      const option = e.target.closest('.followup-option');
      if (!option) return;
      
      // Clear previous selections
      optionsContainer.querySelectorAll('.followup-option').forEach(opt => {
        opt.classList.remove('selected');
      });
      
      // Select current option
      option.classList.add('selected');
      selectedOption = {
        questionId: question.id,
        optionId: parseInt(option.dataset.optionId),
        optionText: option.querySelector('.followup-option-text').textContent,
        questionTitle: question.title,
        questionDescription: question.description
      };
      
      // Auto-submit after selection (with slight delay for visual feedback)
      setTimeout(() => {
        onComplete(selectedOption);
      }, 300);
    });
    
    // Swipe to dismiss (simplified touch handling)
    let startY = 0;
    let currentY = 0;
    
    bottomSheet.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
    });
    
    bottomSheet.addEventListener('touchmove', (e) => {
      currentY = e.touches[0].clientY;
      const diffY = currentY - startY;
      
      if (diffY > 0) {
        bottomSheet.style.transform = `translateY(${Math.min(diffY, 100)}px)`;
        bottomSheet.style.opacity = Math.max(1 - (diffY / 200), 0.5);
      }
    });
    
    bottomSheet.addEventListener('touchend', () => {
      const diffY = currentY - startY;
      
      if (diffY > 100) {
        this.dismissBottomSheet(() => onSkip());
      } else {
        bottomSheet.style.transform = 'translateY(0)';
        bottomSheet.style.opacity = '1';
      }
    });
  }

  dismissBottomSheet(callback = () => {}) {
    if (!this.currentBottomSheet) {
      callback();
      return;
    }
    
    const { backdrop, bottomSheet } = this.currentBottomSheet;
    
    // Animate out
    backdrop.classList.remove('visible');
    bottomSheet.classList.remove('visible');
    
    setTimeout(() => {
      if (backdrop.parentNode) backdrop.remove();
      if (bottomSheet.parentNode) bottomSheet.remove();
      this.currentBottomSheet = null;
      callback();
    }, 300);
  }

  // NEW: Show completion state with 1-second pause, then close
  showCompletionStateAndClose(selectedOption, callback = () => {}) {
    if (!this.currentBottomSheet) {
      callback();
      return;
    }

    const { bottomSheet } = this.currentBottomSheet;
    
    // Update bottom sheet to show completion state
    const completionHTML = `
      <div class="followup-handle"></div>
      <div class="followup-header">
        <h3 class="followup-title">Thank you!</h3>
        <button class="followup-close" id="completionClose">
          <i data-lucide="x"></i>
        </button>
      </div>
      <div class="followup-completion-content">
        <div class="followup-completion-check">
          <div class="completion-checkmark">
            <i data-lucide="check" class="completion-check-icon"></i>
          </div>
        </div>
        <p class="followup-completion-text">Your response: "${selectedOption.optionText}"</p>
        <div class="followup-coin-badge completion-badge">
          <img src="assets/betterfly-coin-icon-2.png" alt="Coins" class="followup-coin-icon" />
          <span class="followup-coin-text">+${this.coinReward} COINS EARNED!</span>
        </div>
      </div>
    `;

    // Update content with completion state
    bottomSheet.innerHTML = completionHTML;
    
    // Re-initialize Lucide icons for the checkmark and close button
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    // Add completion animation class
    bottomSheet.classList.add('completion-state');

    // Add manual close functionality
    const closeBtn = document.getElementById('completionClose');
    const { backdrop } = this.currentBottomSheet;

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.dismissBottomSheet(() => {
          // 800ms delay after bottom sheet is gone before coin toast
          setTimeout(() => {
            callback();
          }, 800);
        });
      });
    }

    // Close on backdrop click
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        this.dismissBottomSheet(() => {
          // 800ms delay after bottom sheet is gone before coin toast
          setTimeout(() => {
            callback();
          }, 800);
        });
      }
    });
  }

  // Process follow-up trigger for a given page
  processFollowUpTrigger(currentQuestionId, onNavigationContinue) {
    console.log('processFollowUpTrigger called for:', currentQuestionId);
    
    // Check both follow-up questions and informational content
    const shouldTriggerFollowUp = this.shouldTriggerFollowUp(currentQuestionId);
    const shouldTriggerInformational = this.shouldTriggerInformational(currentQuestionId);
    console.log('Should trigger follow-up:', shouldTriggerFollowUp);
    console.log('Should trigger informational:', shouldTriggerInformational);
    
    // Award coins immediately when Continue is tapped (after checking triggers)
    const baseCoins = OnboardingState.progressAndAwardCoins();
    console.log('Base coins awarded:', baseCoins);
    
    // Priority: Follow-up questions take precedence over informational content
    if (shouldTriggerFollowUp) {
      this.handleFollowUpQuestion(currentQuestionId, baseCoins, onNavigationContinue);
    } else if (shouldTriggerInformational) {
      this.handleInformationalContent(currentQuestionId, baseCoins, onNavigationContinue);
    } else {
      console.log('No bottom sheet triggered, proceeding with normal flow');
      // No bottom sheet, proceed with normal coin toast
      if (baseCoins > 0) {
        console.log('Normal flow: showing standard coin toast with', baseCoins, 'coins');
        CoinAnimationManager.showCoinToast(baseCoins, onNavigationContinue);
      } else {
        onNavigationContinue();
      }
    }
  }

  // Handle follow-up question flow
  handleFollowUpQuestion(currentQuestionId, baseCoins, onNavigationContinue) {

    const followUpQuestion = this.getRandomFollowUpQuestion(currentQuestionId);
    if (!followUpQuestion) {
      // No available questions, proceed normally
      if (baseCoins > 0) {
        CoinAnimationManager.showCoinToast(baseCoins, onNavigationContinue);
      } else {
        onNavigationContinue();
      }
      return;
    }

    // Mark this page as triggered safely
    let followUpData = {};
    try {
      followUpData = OnboardingState.get('followUp') || {};
    } catch (e) {
      followUpData = {};
    }
    
    let triggeredPages = Array.isArray(followUpData.triggeredPages) ? followUpData.triggeredPages : [];
    triggeredPages.push(currentQuestionId);
    
    // Update the entire followUp object
    followUpData.triggeredPages = triggeredPages;
    OnboardingState.update('followUp', followUpData);
    
    // Show follow-up bottom sheet AFTER Continue button is tapped
    this.showFollowUpBottomSheet(
      followUpQuestion,
      // onComplete - NEW TIMING SEQUENCE
      (selectedOption) => {
        // Save follow-up answer immediately
        let followUpAnswers = {};
        let shownQuestions = [];
        let followUpData = {};
        
        try {
          followUpData = OnboardingState.get('followUp') || {};
          followUpAnswers = followUpData.answers || {};
          shownQuestions = Array.isArray(followUpData.shownQuestions) ? followUpData.shownQuestions : [];
        } catch (e) {
          followUpAnswers = {};
          shownQuestions = [];
          followUpData = {};
        }
        
        followUpAnswers[followUpQuestion.id] = selectedOption;
        shownQuestions.push(followUpQuestion.id);
        
        // Update the entire followUp object
        followUpData.answers = followUpAnswers;
        followUpData.shownQuestions = shownQuestions;
        OnboardingState.update('followUp', followUpData);
        
        // Award follow-up coins manually
        const followUpCoinsAwarded = this.coinReward;
        // Add coins directly to the count (safe update)
        const coinsData = OnboardingState.get('coins') || { count: 0, completedQuestions: new Set() };
        coinsData.count = (coinsData.count || 0) + this.coinReward;
        OnboardingState.update('coins', coinsData);
        
        // NEW: Show completion state and implement 1-second pause
        this.showCompletionStateAndClose(selectedOption, () => {
          // After 1-second pause and bottom sheet closes, show combined coin toast
          const totalCoins = baseCoins + this.coinReward;
          console.log('FOLLOW-UP COMPLETION: About to show coin toast');
          console.log('FOLLOW-UP COMPLETION: Total coins:', totalCoins);
          console.log('FOLLOW-UP COMPLETION: This is follow-up completion path - should require tap');
          
          // Add small delay to ensure bottom sheet is completely gone
          setTimeout(() => {
            console.log('FOLLOW-UP COMPLETION: Calling showCoinToast after cleanup delay...');
            
            // Reset animation flag to ensure fresh state
            console.log('DEBUGGING: Resetting isAnimating flag before showing toast');
            CoinAnimationManager.isAnimating = false;
            
            // Wrap the navigation callback with debugging
            const debuggedCallback = () => {
              console.log('DEBUGGING: Navigation callback called! This should only happen on user tap.');
              console.log('DEBUGGING: Callback stack trace:', new Error().stack);
              onNavigationContinue();
            };
            
            CoinAnimationManager.showCoinToast(totalCoins, debuggedCallback);
          }, 100);
        });
      },
      // onSkip - Immediate close, no pause
      () => {
        // Immediately close and show only base coins
        if (baseCoins > 0) {
          console.log('Follow-up skipped: showing base coin toast with', baseCoins, 'coins');
          CoinAnimationManager.showCoinToast(baseCoins, onNavigationContinue);
        } else {
          onNavigationContinue();
        }
      }
    );
  }

  // Handle informational content flow
  handleInformationalContent(currentQuestionId, baseCoins, onNavigationContinue) {
    const informationalContent = this.getRandomInformationalContent();
    if (!informationalContent) {
      // No available content, proceed normally
      if (baseCoins > 0) {
        CoinAnimationManager.showCoinToast(baseCoins, onNavigationContinue);
      } else {
        onNavigationContinue();
      }
      return;
    }

    // Mark this page as triggered for informational content
    let followUpData = {};
    try {
      followUpData = OnboardingState.get('followUp') || {};
    } catch (e) {
      followUpData = {};
    }
    
    let informationalTriggered = Array.isArray(followUpData.informationalTriggered) ? followUpData.informationalTriggered : [];
    informationalTriggered.push(currentQuestionId);
    
    // Update the entire followUp object
    followUpData.informationalTriggered = informationalTriggered;
    OnboardingState.update('followUp', followUpData);

    // Show informational bottom sheet
    this.showInformationalBottomSheet(informationalContent, () => {
      // After informational sheet closes, show normal coin toast (no extra coins for informational)
      if (baseCoins > 0) {
        CoinAnimationManager.showCoinToast(baseCoins, onNavigationContinue);
      } else {
        onNavigationContinue();
      }
    });
  }

  // Get follow-up answers for review page
  getFollowUpAnswersForReview() {
    const answers = OnboardingState.get('followUp.answers') || {};
    return Object.values(answers).map(answer => ({
      label: answer.questionTitle,
      value: answer.optionText,
      description: answer.questionDescription
    }));
  }

  // Get contextual informational content based on most recent answer
  getRandomInformationalContent() {
    // Check if user has opted out of informational sheets
    const userPreferences = OnboardingState.get('preferences') || {};
    if (userPreferences.hideInformationalSheets) {
      console.log('User has opted out of informational sheets');
      return null;
    }

    // Get the most recent answer to determine context
    const recentAnswer = this.getMostRecentAnswer();
    console.log('Most recent answer for contextual content:', recentAnswer);
    
    if (!recentAnswer) {
      console.log('No recent answer found, cannot determine context');
      return null;
    }

    // Get contextual content based on the most recent answer
    const contextualContent = this.getContextualContent(recentAnswer);
    
    // Get previously shown informational content
    let shownInformational = [];
    try {
      const followUpData = OnboardingState.get('followUp') || {};
      shownInformational = followUpData.shownInformational || [];
    } catch (e) {
      shownInformational = [];
    }

    // Filter out already shown content
    const availableContent = contextualContent.filter(content => !shownInformational.includes(content.id));
    
    if (availableContent.length === 0) {
      console.log('No available contextual informational content');
      return null;
    }

    // Return random available content from contextual options
    const randomIndex = Math.floor(Math.random() * availableContent.length);
    return availableContent[randomIndex];
  }

  // Get the most recent questionnaire answer
  getMostRecentAnswer() {
    // Define the question order and their answer mappings
    const questionOrder = [
      'q1_healthFeeling',    // struggling, okay, well, thriving, unsure
      'q2_mainConcern',      // energy, weight, stress, sleep, nutrition, fitness
      'q3_biggestChallenge', // time, motivation, knowledge, support, habits
      'q4_pastExperience'    // never, failed, some-success, very-successful
    ];

    // Look through questions in reverse order to find most recent answer
    for (let i = questionOrder.length - 1; i >= 0; i--) {
      const questionKey = questionOrder[i];
      const answer = OnboardingState.get(questionKey);
      if (answer) {
        console.log(`Found recent answer: ${questionKey} = ${answer}`);
        return {
          question: questionKey,
          answer: answer
        };
      }
    }

    return null;
  }

  // Get contextual content based on the user's answer
  getContextualContent(recentAnswer) {
    const { question, answer } = recentAnswer;
    
    // Map answers to content categories
    let contentCategory = 'improving'; // default
    
    if (question === 'q1_healthFeeling') {
      const categoryMap = {
        'struggling': 'struggling',
        'okay': 'improving', 
        'well': 'optimizing',
        'thriving': 'thriving',
        'unsure': 'unsure'
      };
      contentCategory = categoryMap[answer] || 'improving';
    } else if (question === 'q2_mainConcern') {
      // For main concerns, provide relevant content
      const concernMap = {
        'energy': 'struggling',
        'weight': 'improving',
        'stress': 'struggling', 
        'sleep': 'improving',
        'nutrition': 'improving',
        'fitness': 'optimizing'
      };
      contentCategory = concernMap[answer] || 'improving';
    } else if (question === 'q4_pastExperience') {
      const experienceMap = {
        'never': 'struggling',
        'failed': 'struggling',
        'some-success': 'improving',
        'very-successful': 'optimizing'
      };
      contentCategory = experienceMap[answer] || 'improving';
    }

    console.log(`Using content category: ${contentCategory} for ${question}=${answer}`);

    // Get content from the determined category
    const categoryContent = this.informationalBank[contentCategory];
    if (!categoryContent) {
      console.log(`No content found for category: ${contentCategory}`);
      return [];
    }

    // Combine financial and behavioral content for this category
    const allContent = [...(categoryContent.financial || []), ...(categoryContent.behavioral || [])];
    console.log(`Found ${allContent.length} pieces of contextual content for ${contentCategory}`);
    
    return allContent;
  }

  // Check if informational bottom sheet should trigger
  shouldTriggerInformational(currentQuestionId) {
    console.log('shouldTriggerInformational called for:', currentQuestionId);

    // Check if user has opted out
    const userPreferences = OnboardingState.get('preferences') || {};
    if (userPreferences.hideInformationalSheets) {
      console.log('User has opted out of informational sheets');
      return false;
    }

    // Target questions 4 and 8 for informational sheets
    const informationalTriggerPages = ['q4-past-experience', 'q8-lifestyle'];
    
    // Get already triggered pages for both follow-up and informational
    let triggeredPages = [];
    let informationalTriggered = [];
    try {
      const followUpData = OnboardingState.get('followUp') || {};
      triggeredPages = followUpData.triggeredPages || [];
      informationalTriggered = followUpData.informationalTriggered || [];
    } catch (e) {
      triggeredPages = [];
      informationalTriggered = [];
    }

    // Don't show informational if already shown on this page
    if (informationalTriggered.includes(currentQuestionId)) {
      console.log('Informational already shown on this page');
      return false;
    }

    // Don't show informational if follow-up question is showing on this page
    if (triggeredPages.includes(currentQuestionId)) {
      console.log('Follow-up question takes priority on this page');
      return false;
    }

    // Check if this is a target page for informational sheets
    const shouldTrigger = informationalTriggerPages.includes(currentQuestionId);
    console.log('Should trigger informational (q5 or q8):', shouldTrigger);
    return shouldTrigger;
  }

  // Show informational bottom sheet
  showInformationalBottomSheet(content, onClose) {
    console.log('showInformationalBottomSheet called with content:', content);
    
    if (this.currentBottomSheet) {
      console.log('Existing bottom sheet found, dismissing...');
      this.dismissBottomSheet();
    }

    // Create backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'followup-backdrop';
    
    // Create bottom sheet
    const bottomSheet = document.createElement('div');
    bottomSheet.className = 'followup-bottom-sheet';
    
    bottomSheet.innerHTML = `
      <div class="followup-handle"></div>
      <div class="followup-header">
        <h3 class="followup-title">${content.title}</h3>
        <button class="followup-close" id="informationalClose">
          <i data-lucide="x"></i>
        </button>
      </div>
      <div class="followup-content">
        <div class="informational-content">
          <p class="informational-text">${content.content}</p>
          <div class="informational-source">
            <a href="${content.source.url}" target="_blank" rel="noopener noreferrer" class="source-link">
              <i data-lucide="external-link"></i>
              ${content.source.text}
            </a>
          </div>
        </div>
        <div class="informational-checkbox">
          <label class="checkbox-container">
            <input type="checkbox" id="hideInformationalCheckbox">
            <span class="checkmark"></span>
            <span class="checkbox-text">Don't show me information like this again</span>
          </label>
        </div>
      </div>
    `;

    // Store references
    this.currentBottomSheet = { backdrop, bottomSheet };

    // Add elements to DOM
    document.body.appendChild(backdrop);
    document.body.appendChild(bottomSheet);
    console.log('Elements added. Body children count:', document.body.children.length);

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    // Animation frame for smooth transition
    requestAnimationFrame(() => {
      console.log('Starting animations...');
      backdrop.classList.add('visible');
      bottomSheet.classList.add('visible');
      console.log('Animation frame - adding visible classes');
      console.log('Backdrop classes:', backdrop.className);
      console.log('Bottom sheet classes:', bottomSheet.className);
    });

    // Event listeners
    const closeBtn = document.getElementById('informationalClose');
    const checkbox = document.getElementById('hideInformationalCheckbox');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.handleInformationalClose(content, checkbox.checked, onClose);
      });
    }

    // Close on backdrop click
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        this.handleInformationalClose(content, checkbox.checked, onClose);
      }
    });
  }

  // Handle informational bottom sheet close
  handleInformationalClose(content, hideAgain, onClose) {
    // Save user preference if they opted out
    if (hideAgain) {
      const preferences = OnboardingState.get('preferences') || {};
      preferences.hideInformationalSheets = true;
      OnboardingState.update('preferences', preferences);
      console.log('User opted out of informational sheets');
    }

    // Mark this content as shown
    let followUpData = {};
    try {
      followUpData = OnboardingState.get('followUp') || {};
    } catch (e) {
      followUpData = {};
    }

    let shownInformational = Array.isArray(followUpData.shownInformational) ? followUpData.shownInformational : [];
    let informationalTriggered = Array.isArray(followUpData.informationalTriggered) ? followUpData.informationalTriggered : [];
    
    if (!shownInformational.includes(content.id)) {
      shownInformational.push(content.id);
    }
    
    if (!informationalTriggered.includes(content.category)) {
      informationalTriggered.push(content.category);
    }

    followUpData.shownInformational = shownInformational;
    followUpData.informationalTriggered = informationalTriggered;
    OnboardingState.update('followUp', followUpData);

    // Dismiss the bottom sheet
    this.dismissBottomSheet(onClose);
  }

  static instance = null;
  
  static getInstance() {
    if (!this.instance) {
      this.instance = new FollowUpQuestionnaireSystem();
    }
    return this.instance;
  }

}