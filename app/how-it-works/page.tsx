import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  UserPlus,
  Search,
  MessageCircle,
  Handshake,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Users,
  Target,
  Zap,
} from "lucide-react"
import Link from "next/link"

export default function HowItWorksPage() {
  const steps = [
    {
      step: "01",
      icon: <UserPlus className="h-8 w-8" />,
      title: "Create Your Profile",
      description:
        "Sign up and build a comprehensive profile showcasing your brand or influence. Add your portfolio, audience insights, and collaboration preferences.",
      details: [
        "Complete profile setup with verification",
        "Upload portfolio and past work samples",
        "Set collaboration preferences and rates",
        "Connect social media accounts",
      ],
      userType: "Both",
    },
    {
      step: "02",
      icon: <Search className="h-8 w-8" />,
      title: "Discover Perfect Matches",
      description:
        "Use our AI-powered matching system to find ideal collaboration partners. Browse campaigns or search for influencers based on your specific criteria.",
      details: [
        "AI-powered smart matching algorithm",
        "Advanced filtering and search options",
        "Compatibility scoring system",
        "Personalized recommendations",
      ],
      userType: "Both",
    },
    {
      step: "03",
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Connect & Communicate",
      description:
        "Reach out to potential partners through our secure messaging platform. Discuss campaign details, negotiate terms, and build relationships.",
      details: [
        "Secure in-platform messaging",
        "File sharing and media attachments",
        "Campaign proposal templates",
        "Real-time communication",
      ],
      userType: "Both",
    },
    {
      step: "04",
      icon: <Handshake className="h-8 w-8" />,
      title: "Finalize Collaboration",
      description:
        "Agree on campaign terms, set milestones, and secure payments through our escrow system. Everything is protected and transparent.",
      details: [
        "Secure contract management",
        "Milestone-based payment system",
        "Escrow protection for both parties",
        "Clear terms and deliverables",
      ],
      userType: "Both",
    },
    {
      step: "05",
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Execute & Track",
      description:
        "Launch your campaign and track performance in real-time. Monitor metrics, communicate progress, and optimize for better results.",
      details: [
        "Real-time performance tracking",
        "Campaign milestone management",
        "Progress communication tools",
        "Performance optimization insights",
      ],
      userType: "Both",
    },
    {
      step: "06",
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Complete & Review",
      description:
        "Finalize the campaign, release payments, and leave reviews. Build your reputation and prepare for future collaborations.",
      details: [
        "Campaign completion verification",
        "Automatic payment release",
        "Mutual review system",
        "Performance report generation",
      ],
      userType: "Both",
    },
  ]

  const benefits = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Trusted Network",
      description: "Join a verified community of professional brands and influencers",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Perfect Matches",
      description: "AI-powered matching ensures optimal brand-influencer partnerships",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Streamlined Process",
      description: "Simplified workflow from discovery to campaign completion",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="floating-particles"></div>
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 animate-pulse">How It Works</Badge>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-fade-in">
            Simple Steps to
            <br />
            <span className="text-gradient">Successful Collaborations</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            From profile creation to campaign completion, our streamlined process makes influencer-brand partnerships
            effortless and effective.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-24 bg-gradient-to-b from-primary/50 to-accent/50 hidden md:block"></div>
                )}

                <Card className="glass border-border/50 hover:border-primary/50 transition-all duration-300 hover-lift">
                  <CardHeader>
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center border border-primary/30">
                          <span className="text-2xl font-bold text-primary">{step.step}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-2 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 text-primary">
                            {step.icon}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {step.userType}
                          </Badge>
                        </div>
                        <CardTitle className="text-2xl font-serif mb-3 text-gradient">{step.title}</CardTitle>
                        <CardDescription className="text-muted-foreground text-lg leading-relaxed mb-6">
                          {step.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="ml-22 grid grid-cols-1 md:grid-cols-2 gap-3">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <ArrowRight className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Why Choose CollabConnect?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the benefits of our streamlined collaboration platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="glass border-border/50 text-center hover-lift">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center text-primary mb-4">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-xl font-serif">{benefit.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{benefit.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="glass p-12 rounded-2xl border border-border/50 max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of successful collaborations happening on our platform every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button
                  size="lg"
                  className="neon-glow bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 btn-hover-glow"
                >
                  Get Started Now
                </Button>
              </Link>
              <Link href="/features">
                <Button size="lg" variant="outline" className="glass border-border/50 btn-hover-glow bg-transparent">
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
