# Safe Secure Trust - Tampa Bay Pastors Landing Page

A high-converting, accessible, mobile-first landing page designed specifically for senior & executive pastors in Tampa Bay. Built with React, TypeScript, Tailwind CSS, and shadcn/ui components.

## 🎯 Key Features

- **Mobile-first responsive design** optimized for all devices
- **Accessibility-compliant** (WCAG AA standards)
- **Performance optimized** for 95+ Lighthouse mobile score
- **Tampa-specific messaging** for Hillsborough, Pinellas, and Pasco counties
- **Trust-building design** with navy/teal professional color scheme
- **Single CTA focus**: "Start the 2–3 minute Questionnaire"

## 🎨 Design System

### Brand Colors
- **Navy**: `#102A43` - Primary brand color
- **Teal**: `#2CB1BC` - Trust accent color  
- **Soft Gray**: `#F5F7FA` - Clean backgrounds
- **Accent Gold**: `#F0B429` - CTA/attention color

### Typography
- **Headings**: Inter font family
- **Body**: Source Sans Pro font family
- **System fallback**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif

## 📁 File Structure

```
src/
├── components/
│   ├── TampaLandingPage.tsx      # Main landing page component
│   └── ui/                       # shadcn/ui components
├── assets/
│   ├── hero-video-thumbnail.jpg  # Video thumbnail (896x512)
│   ├── 5-step-diagram.png       # Process diagram (1024x512)  
│   └── privacy-badges.png       # Trust badges (800x512)
├── pages/
│   └── Index.tsx                # Main route
└── hooks/
    └── use-toast.ts             # Toast notifications
```

## 📋 Form Schema

The main contact form (`#get-started`) captures the following data:

### Required Fields
- **name** (string): Contact's full name
- **role** (enum): "senior-pastor" | "executive-pastor" | "other"  
- **church** (string): Church name
- **county** (enum): "hillsborough" | "pinellas" | "pasco"
- **email** (string): Valid email address (validated)

### Optional Fields
- **phone** (string): Phone number (E.164 format recommended)
- **cohortSize** (enum): "1-3" | "4-7" | "8-12" | "13+"
- **preferNDA** (enum): "yes" | "no"
- **category** (enum): "single" | "couple" | "family" | "retiree"
- **concerns** (text): Privacy/compliance concerns

### Hidden Fields (Auto-captured)
UTM parameters and tracking data should be captured via JavaScript:
- `utm_source`
- `utm_medium` 
- `utm_campaign`
- `utm_content`
- `utm_term`
- `gclid` (Google Click ID)
- `fbclid` (Facebook Click ID)
- `referrer`

## 🎥 Asset Integration

### Required Assets to Replace Placeholders

1. **Hero Video** (`src/assets/hero-video-thumbnail.jpg`)
   - Replace with actual 90-second explainer video thumbnail
   - Recommended size: 896x512px (16:9 aspect ratio)
   - Should show trustworthy pastor/executive in professional attire

2. **Process Diagram** (`src/assets/5-step-diagram.png`)
   - Replace with final 5-step process visualization  
   - Current placeholder shows: Invite → Intake → Plan → Illustration → Delivery
   - Recommended size: 1024x512px

3. **Privacy Badges** (`src/assets/privacy-badges.png`)
   - Replace with final trust badge designs
   - Should include: NDA shield, data security lock, bank verification, DocuSign
   - Recommended size: 800x512px

### Video Integration

To connect the actual explainer video:

1. Update the video thumbnail click handler in `TampaLandingPage.tsx`
2. Replace `window.location.href = "#video"` with your video player integration
3. Ensure video has captions for accessibility compliance

## 🔧 Form Handler Integration

The form submission is currently simulated. To connect to your backend:

1. **Update form submission** in `TampaLandingPage.tsx` (line ~60-75)
2. **Replace console.log** with actual API call
3. **Capture UTM parameters** on page load and include in form data
4. **Handle form validation** server-side as well

Example integration:
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const response = await fetch('/api/submit-interest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        // Add UTM parameters captured on page load
        utm_source: capturedUTMs.source,
        utm_medium: capturedUTMs.medium,
        // etc.
      })
    });
    
    if (response.ok) {
      setFormSubmitted(true);
      trackEvent('form_submit_success');
    }
  } catch (error) {
    // Handle error
  }
};
```

## 📊 Analytics Events

The page fires these custom events to `window.dataLayer`:

- `view_hero` - Hero section viewed
- `click_video` - Video thumbnail clicked  
- `click_privacy` - Privacy section accessed
- `faq_open` - FAQ question expanded (includes question ID)
- `cta_get_started_click` - Main CTA clicked
- `form_start` - Form interaction started
- `form_submit_success` - Form successfully submitted

## 🚀 Performance Optimizations

- **Lazy loading** for below-the-fold images
- **Semantic HTML** structure for SEO
- **Optimized images** with proper alt text
- **Smooth scrolling** navigation
- **Mobile-first CSS** with efficient selectors

## 🔍 SEO Features

- **Structured data** ready for FAQ schema markup
- **Semantic HTML5** elements
- **Optimized meta tags** for Tampa Bay pastor targeting
- **Clean URLs** with anchor navigation
- **Mobile-responsive** design

## 🎯 Accessibility Features

- **WCAG AA compliant** color contrast
- **Focus visible** states on all interactive elements  
- **Semantic markup** with proper heading hierarchy
- **Screen reader friendly** with descriptive alt text
- **Keyboard navigation** support
- **44px minimum** touch targets for mobile

## 📱 Mobile Experience

- **Sticky footer CTA** for mobile users
- **Touch-friendly** interface with proper spacing
- **Responsive typography** that scales appropriately
- **Optimized forms** for mobile input

## 🛡️ Privacy & Compliance

- **GDPR-ready** data collection practices
- **NDA integration** for sensitive information
- **Minimal data collection** (least-privilege principle)  
- **Clear disclosures** about data usage

---

## Development Commands

```bash
# Install dependencies
npm install

# Start development server  
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

For questions about integration or customization, refer to the component code or contact the development team.