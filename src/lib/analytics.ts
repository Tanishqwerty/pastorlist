// Analytics and UTM tracking utilities
// Safe Secure Trust - Tampa Bay Pastors Landing Page

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export const captureUTMParameters = () => {
  const urlParams = new URLSearchParams(window.location.search);
  
  return {
    utm_source: urlParams.get('utm_source') || '',
    utm_medium: urlParams.get('utm_medium') || '',
    utm_campaign: urlParams.get('utm_campaign') || '',
    utm_content: urlParams.get('utm_content') || '',
    utm_term: urlParams.get('utm_term') || '',
    gclid: urlParams.get('gclid') || '',
    fbclid: urlParams.get('fbclid') || '',
    referrer: document.referrer || '',
    page_url: window.location.href,
    timestamp: new Date().toISOString(),
    user_agent: navigator.userAgent
  };
};

export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  // Google Tag Manager / Google Analytics 4
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
      ...eventData
    });
  }

  // Optional: Also track with gtag directly if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...eventData,
      custom_parameter_timestamp: new Date().toISOString()
    });
  }

  // Console log for development debugging
  if (process.env.NODE_ENV === 'development') {
    console.log(`Analytics Event: ${eventName}`, eventData);
  }
};

export const initializeAnalytics = () => {
  // Capture UTM parameters on page load
  const utmData = captureUTMParameters();
  
  // Store UTM data in sessionStorage for form submission
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('utmData', JSON.stringify(utmData));
    
    // Fire page view event
    trackEvent('page_view', {
      page_title: document.title,
      ...utmData
    });
    
    // Fire hero view event when hero is in viewport
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              trackEvent('view_hero');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      observer.observe(heroSection);
    }
  }
};

export const getStoredUTMData = () => {
  if (typeof window !== 'undefined') {
    const stored = sessionStorage.getItem('utmData');
    return stored ? JSON.parse(stored) : {};
  }
  return {};
};

// FAQ tracking helper
export const trackFAQInteraction = (questionId: string, action: 'open' | 'close') => {
  trackEvent('faq_interaction', {
    question_id: questionId,
    action: action
  });
};

// Form interaction tracking
export const trackFormStart = (formId: string) => {
  trackEvent('form_start', {
    form_id: formId,
    form_name: 'tampa_pastor_interest'
  });
};

export const trackFormSubmit = (formId: string, formData: Record<string, any>) => {
  const utmData = getStoredUTMData();
  
  trackEvent('form_submit_success', {
    form_id: formId,
    form_name: 'tampa_pastor_interest',
    lead_county: formData.county,
    lead_role: formData.role,
    cohort_size: formData.cohortSize,
    prefers_nda: formData.preferNDA,
    ...utmData
  });
};

export const trackCTAClick = (ctaLocation: string, ctaText: string) => {
  trackEvent('cta_click', {
    cta_location: ctaLocation,
    cta_text: ctaText,
    target_section: 'get-started'
  });
};