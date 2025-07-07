// Analytics and CTA tracking utilities

export const CALENDLY_URL = 'https://calendly.com/sachmeet-kartar/30min';

// Track CTA events (can be integrated with Google Analytics, Mixpanel, etc.)
export const trackEvent = (eventName, properties = {}) => {
  // Console log for development - replace with your analytics service
  console.log('Event tracked:', eventName, properties);
  
  // Example: Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, properties);
  }
  
  // Example: Mixpanel
  if (typeof mixpanel !== 'undefined') {
    mixpanel.track(eventName, properties);
  }
  
  // You can add other analytics services here
};

// Handle CTA button clicks
export const handleCTAClick = (ctaType, source = '') => {
  // Track the event
  trackEvent('cta_clicked', {
    cta_type: ctaType,
    source: source,
    timestamp: new Date().toISOString(),
    url: window.location.href
  });
  
  // Open Calendly in a new tab
  window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
};

// Handle case study clicks
export const handleCaseStudyClick = (caseStudyTitle, source = '') => {
  trackEvent('case_study_clicked', {
    case_study: caseStudyTitle,
    source: source,
    timestamp: new Date().toISOString(),
    url: window.location.href
  });
  
  // Navigate to WIP page
  window.location.href = '/case-study-wip';
};

// Handle demo requests
export const handleDemoRequest = (source = '') => {
  trackEvent('demo_requested', {
    source: source,
    timestamp: new Date().toISOString(),
    url: window.location.href
  });
  
  // Open Calendly for demo booking
  window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
};

// Handle consultation requests
export const handleConsultationRequest = (source = '') => {
  trackEvent('consultation_requested', {
    source: source,
    timestamp: new Date().toISOString(),
    url: window.location.href
  });
  
  // Open Calendly for consultation booking
  window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
};
