import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Shield, Lock, CheckCircle, FileText, Users, ClipboardList, Home, BarChart3, Building2, Phone, Mail, MapPin, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroVideoThumbnail from "@/assets/hero-video-thumbnail.jpg";
import fiveStepDiagram from "@/assets/5-step-diagram.png";
import privacyBadges from "@/assets/privacy-badges.png";

const TampaLandingPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: ""
  });

  const [stickyVisible, setStickyVisible] = useState(true);
  const [showNDAModal, setShowNDAModal] = useState(false);
  const [showSampleModal, setShowSampleModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.address || !formData.email) {
      toast({
        title: "Please fill in all required fields",
        description: "Full name, address, and email are required.",
        variant: "destructive"
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      toast({
        title: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to Google Sheets backend (Apps Script Web App)
      const endpoint = import.meta.env.VITE_SHEETS_WEBAPP_URL as string | undefined;
      if (!endpoint) {
        throw new Error('Missing VITE_SHEETS_WEBAPP_URL');
      }

      // Send a "simple" request to avoid CORS preflight with Apps Script
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          name: formData.name,
          address: formData.address,
          email: formData.email,
          phone: formData.phone,
          timestamp: new Date().toISOString(),
          source: 'Tampa Landing Page'
        })
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text || `Sheets endpoint error (${res.status})`);
      }
      
      // Fire analytics event
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({ event: 'form_submit_success' });
      }

      setFormSubmitted(true);
      toast({
        title: "Thank you!",
        description: "We'll review your answers and email next steps within 24 hours.",
      });
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your form. Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const trackEvent = (eventName: string, data?: any) => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({ event: eventName, ...data });
    }
  };

  const scrollToGetStarted = () => {
    trackEvent('cta_get_started_click');
    document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-heading font-bold text-navy">Safe Secure Trust</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#what" className="text-sm font-medium text-foreground hover:text-navy transition-colors focus-trust">
                What it is
              </a>
              <a href="#how" className="text-sm font-medium text-foreground hover:text-navy transition-colors focus-trust">
                How it works
              </a>
              <a href="#privacy" className="text-sm font-medium text-foreground hover:text-navy transition-colors focus-trust">
                Privacy & NDA
              </a>
              <a href="#faq" className="text-sm font-medium text-foreground hover:text-navy transition-colors focus-trust">
                FAQ
              </a>
              <Button 
                onClick={scrollToGetStarted}
                className="bg-navy hover:bg-navy/90 text-white focus-trust"
              >
                Get Started
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="py-16 md:py-24 bg-gradient-hero text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
                Keep more of what your people earn—without upfront fees.
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                A no-cost pilot for <strong>Tampa</strong> senior & executive pastors: a guided, 
                <strong> bank-verified</strong> trust setup paired with <strong>standard insurance</strong> illustrations—privacy first, plain English.
              </p>
              
              <Button 
                size="lg" 
                onClick={scrollToGetStarted}
                className="bg-accent-gold text-navy hover:bg-accent-gold/90 text-lg px-8 py-4 font-semibold focus-trust shadow-cta"
              >
                Get Started Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>

              <div className="flex flex-wrap gap-4">
                <div className="trust-badge">
                  <CheckCircle className="h-4 w-4 text-teal" />
                  <span className="text-sm font-medium">Pilot: <strong>No upfront fee</strong></span>
                </div>
                <div className="trust-badge">
                  <Shield className="h-4 w-4 text-teal" />
                  <span className="text-sm font-medium"><strong>NDA</strong> available</span>
                </div>
                <div className="trust-badge">
                  <Lock className="h-4 w-4 text-teal" />
                  <span className="text-sm font-medium"><strong>Least-privilege</strong> data</span>
                </div>
                <div className="trust-badge">
                  <Building2 className="h-4 w-4 text-teal" />
                  <span className="text-sm font-medium"><strong>Bank-verified</strong> setup</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-lg overflow-hidden">
                <video 
                  className="w-full h-auto"
                  controls
                  poster={heroVideoThumbnail}
                  preload="metadata"
                >
                  <source 
                    src="https://storage.googleapis.com/videoronron/The%20Landing%20Page%20Video.mp4" 
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Safe Secure Trust */}
      <section id="what" className="py-16 bg-soft-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy">
              What is Safe Secure Trust?
            </h2>
            
            <div className="text-left space-y-6">
              <p className="text-lg leading-relaxed">
                Safe Secure Trust is a <strong>guided, bank-verified</strong> way for a household to establish a 
                <strong> personal trust</strong> and pair it with <strong>standard insurance</strong> products 
                (e.g., life/IUL, annuities). The aim is to <strong>protect income</strong> and use lawful, 
                <strong> tax-advantaged</strong> planning—explained in plain English with clear disclosures—
                <strong>no upfront fee during the pilot</strong>.
              </p>

              <div className="bg-white rounded-lg p-6 border border-border">
                <h3 className="text-xl font-heading font-semibold text-navy mb-4">What it isn't:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-teal mt-2 flex-shrink-0"></div>
                    <span>Not a 501(c)(3) or church charity; the trust is distinct.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-teal mt-2 flex-shrink-0"></div>
                    <span>Not a budgeting or "cut spending" program; no lifestyle change required.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-teal mt-2 flex-shrink-0"></div>
                    <span>Not legal/tax advice; <strong>illustrations are examples</strong>, not guarantees.</span>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    trackEvent('click_privacy');
                    document.getElementById('privacy')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="focus-trust"
                >
                  Read privacy & NDA details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-8 mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy">
                How it works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A simple 5-step process designed specifically for church leadership
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-navy text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-navy mb-2">
                      <Users className="inline h-5 w-5 mr-2" />
                      Invite your leadership cohort
                    </h3>
                    <p className="text-muted-foreground">Bring together your senior and executive pastor team</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-navy text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-navy mb-2">
                      <ClipboardList className="inline h-5 w-5 mr-2" />
                      Short intake (essentials only)
                    </h3>
                    <p className="text-muted-foreground">Quick form with just the information we need</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-navy text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-navy mb-2">
                      <Home className="inline h-5 w-5 mr-2" />
                      Plan fit assessment
                    </h3>
                    <p className="text-muted-foreground">Single, couple, family, or retiree—we tailor to your situation</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-navy text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-navy mb-2">
                      <BarChart3 className="inline h-5 w-5 mr-2" />
                      Standard insurance illustration
                    </h3>
                    <p className="text-muted-foreground">Plain-English examples of potential outcomes</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-navy text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-navy mb-2">
                      <CheckCircle className="inline h-5 w-5 mr-2" />
                      Delivery & verification
                    </h3>
                    <p className="text-muted-foreground">ID, notarization, trust bank account, optional payroll switch</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <img 
                  src={fiveStepDiagram} 
                  alt="Invite, Intake, Plan, Illustration, Delivery/Verification process diagram"
                  className="w-full max-w-md mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Tampa Leadership */}
      <section id="for-whom" className="py-16 bg-gradient-trust">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy">
              For Tampa church leadership
            </h2>
            <div className="flex items-center justify-center gap-2 text-lg">
              <MapPin className="h-5 w-5 text-teal" />
              <span>
                Designed for <strong>senior & executive pastors</strong> and their leadership cohort in 
                <strong> Hillsborough, Pinellas, and Pasco</strong>. Starting small so each church receives white-glove support.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & NDA */}
      <section id="privacy" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy text-center">
              Privacy, NDA & Compliance
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card className="trust-card text-center p-6">
                <Shield className="h-12 w-12 text-teal mx-auto mb-4" />
                <h3 className="font-semibold text-navy">NDA available</h3>
              </Card>
              <Card className="trust-card text-center p-6">
                <Lock className="h-12 w-12 text-teal mx-auto mb-4" />
                <h3 className="font-semibold text-navy">Least-privilege data access</h3>
              </Card>
              <Card className="trust-card text-center p-6">
                <Building2 className="h-12 w-12 text-teal mx-auto mb-4" />
                <h3 className="font-semibold text-navy">Bank-verified setup</h3>
              </Card>
              <Card className="trust-card text-center p-6">
                <FileText className="h-12 w-12 text-teal mx-auto mb-4" />
                <h3 className="font-semibold text-navy">DocuSign / Notary as needed</h3>
              </Card>
            </div>

            <div className="bg-soft-gray rounded-lg p-8">
              <p className="text-lg leading-relaxed mb-6">
                We protect your leadership's information with <strong>NDA on request</strong>, minimal-data handling 
                (<strong>least-privilege access</strong>), and <strong>bank-verified</strong> steps. We document 
                signatures, notarization, and device hygiene so delivery agents don't retain client data.
              </p>
              
              <div className="text-center">
                <Dialog open={showNDAModal} onOpenChange={setShowNDAModal}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="focus-trust">
                      Request NDA & privacy notes
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Request NDA & Privacy Notes</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4">
                      <Input placeholder="Your name" required />
                      <Input type="email" placeholder="Email address" required />
                      <Input placeholder="Church name" required />
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="nda-checkbox" className="rounded border-border" />
                        <label htmlFor="nda-checkbox" className="text-sm">Send NDA along with privacy notes</label>
                      </div>
                      <Button type="submit" className="w-full bg-navy hover:bg-navy/90">
                        Send Request
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Examples & Expectations */}
      <section id="examples" className="py-16 bg-soft-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy text-center">
              Examples & Expectations
            </h2>
            
            <div className="bg-white rounded-lg p-8">
              <p className="text-lg leading-relaxed mb-6">
                We use <strong>standard insurance illustrations</strong> to explain potential outcomes—what's 
                guaranteed, what's not—and how the trust structure interacts with them. 
                <strong> Examples, not promises.</strong>
              </p>
              
              <Card className="trust-card p-6">
                <CardHeader>
                  <CardTitle className="text-navy">Request a sample illustration</CardTitle>
                  <CardDescription>
                    Optional; we can send under NDA for your review
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog open={showSampleModal} onOpenChange={setShowSampleModal}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="focus-trust">
                        Request Sample Illustration
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Request Sample Illustration</DialogTitle>
                      </DialogHeader>
                      <form className="space-y-4">
                        <Input placeholder="Your name" required />
                        <Input type="email" placeholder="Email address" required />
                        <Input placeholder="Church name" required />
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="sample-nda-checkbox" className="rounded border-border" />
                          <label htmlFor="sample-nda-checkbox" className="text-sm">Send under NDA?</label>
                        </div>
                        <Button type="submit" className="w-full bg-navy hover:bg-navy/90">
                          Send Request
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="trust-card p-6">
                <AccordionTrigger 
                  className="text-left text-lg font-semibold text-navy hover:no-underline"
                  onClick={() => trackEvent('faq_open', { question: 'is-501c3' })}
                >
                  Is this a 501(c)(3)?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-4">
                  No. The trust is distinct from a charity and may operate for-profit. We explain the differences in plain English.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="trust-card p-6">
                <AccordionTrigger 
                  className="text-left text-lg font-semibold text-navy hover:no-underline"
                  onClick={() => trackEvent('faq_open', { question: 'budgeting' })}
                >
                  Do members have to budget or cut spending?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-4">
                  No. This is not a budgeting program and doesn't require lifestyle changes.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="trust-card p-6">
                <AccordionTrigger 
                  className="text-left text-lg font-semibold text-navy hover:no-underline"
                  onClick={() => trackEvent('faq_open', { question: 'fees' })}
                >
                  What's the catch—fees?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-4">
                  The <strong>pilot has no upfront fee</strong>. Revenue ties to standard products with clear disclosures.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="trust-card p-6">
                <AccordionTrigger 
                  className="text-left text-lg font-semibold text-navy hover:no-underline"
                  onClick={() => trackEvent('faq_open', { question: 'privacy' })}
                >
                  How private is the process?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-4">
                  NDA, least-privilege data access, bank-verified steps, DocuSign/notary as needed.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Get Started Form */}
      <section id="get-started" className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center space-y-6 mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold">
                Ready to explore this for your leadership?
              </h2>
              <p className="text-xl text-white/90">
                This quick form helps us fit your cohort to the right plan. We'll follow up with next steps and an optional NDA.
              </p>
            </div>

            {!formSubmitted ? (
              <Card className="trust-card p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Full name *
                    </label>
                    <Input 
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="focus-trust"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Address *
                    </label>
                    <Input 
                      required
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="focus-trust"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Email *
                    </label>
                    <Input 
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="focus-trust"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Phone number
                    </label>
                    <Input 
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="focus-trust"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-accent-gold text-navy hover:bg-accent-gold/90 text-lg font-semibold focus-trust shadow-cta disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Get Started"}
                  </Button>
                </form>
              </Card>
            ) : (
              <Card className="trust-card p-8 text-center">
                <CheckCircle className="h-16 w-16 text-teal mx-auto mb-6" />
                <h3 className="text-2xl font-heading font-bold text-navy mb-4">
                  Thanks for your submission!
                </h3>
                <div className="bg-soft-gray rounded-lg p-6">
                  <h4 className="font-semibold text-navy mb-3">Next Steps:</h4>
                  <ul className="text-left space-y-2 text-muted-foreground">
                    <li>• We'll review your answers and email next steps within 24 hours</li>
                    <li>• If you requested an NDA, it will be included in our response</li>
                    <li>• You'll receive a short summary you can share with your elders</li>
                  </ul>
                </div>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="py-12 bg-navy text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <p className="text-sm text-white/80 leading-relaxed">
                <strong>Disclosure:</strong> General information only—<strong>not legal, tax, or investment advice</strong>. 
                Eligibility, product availability, and outcomes vary. <strong>Illustrations are examples, not guarantees</strong>. 
                Full disclosures and NDAs available upon request.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#" className="text-white/80 hover:text-white transition-colors focus-trust">
                Privacy Policy
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors focus-trust">
                Terms
              </a>
              <a href="mailto:contact@safesecuretrust.com" className="text-white/80 hover:text-white transition-colors focus-trust">
                <Mail className="inline h-4 w-4 mr-1" />
                Contact
              </a>
            </div>
            
            <div className="text-center pt-8 border-t border-white/20">
              <p className="text-white/60 text-sm">
                © 2024 Safe Secure Trust. Tampa Bay Pastor Pilot Program.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      {stickyVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-navy text-white p-4 border-t border-white/20">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-sm">Ready to get started?</p>
              <p className="text-xs text-white/80">2–3 minute questionnaire</p>
            </div>
            <Button 
              onClick={scrollToGetStarted}
              className="bg-accent-gold text-navy hover:bg-accent-gold/90 font-semibold focus-trust"
            >
              Start Now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TampaLandingPage;