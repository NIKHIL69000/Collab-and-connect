import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  MessageSquare,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  BarChart3,
  CreditCard,
  Search,
  Star,
  Target,
  Smartphone,
} from "lucide-react"
import Link from "next/link"

export default function FeaturesPage() {
  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Smart Matching Algorithm",
      description:
        "AI-powered matching system that connects brands with perfect influencers based on audience demographics, engagement rates, and content alignment.",
      category: "Matching",
      highlights: ["99% accuracy rate", "Real-time matching", "Advanced filtering"],
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Real-time Communication",
      description:
        "Seamless messaging platform with file sharing, group chats, and campaign-specific communication channels.",
      category: "Communication",
      highlights: ["Instant messaging", "File sharing", "Group collaboration"],
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Advanced Analytics",
      description:
        "Comprehensive performance tracking with detailed insights, ROI analysis, and campaign optimization recommendations.",
      category: "Analytics",
      highlights: ["Real-time metrics", "ROI tracking", "Performance insights"],
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure Escrow System",
      description:
        "Protected payment processing with milestone-based releases, dispute resolution, and secure fund management.",
      category: "Payments",
      highlights: ["Milestone payments", "Dispute resolution", "Secure transactions"],
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Campaign Management",
      description:
        "End-to-end campaign lifecycle management from creation to completion with automated workflows and progress tracking.",
      category: "Management",
      highlights: ["Automated workflows", "Progress tracking", "Task management"],
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Reach",
      description:
        "Connect with influencers and brands worldwide with multi-language support and regional market insights.",
      category: "Global",
      highlights: ["Multi-language", "Global network", "Regional insights"],
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Performance Metrics",
      description:
        "Track engagement rates, reach, conversions, and ROI with detailed reporting and exportable analytics.",
      category: "Metrics",
      highlights: ["Engagement tracking", "Conversion analysis", "Custom reports"],
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Flexible Pricing",
      description:
        "Multiple pricing tiers and payment options to suit businesses of all sizes from startups to enterprises.",
      category: "Pricing",
      highlights: ["Multiple tiers", "Flexible payments", "Enterprise solutions"],
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "Advanced Search",
      description:
        "Powerful search and filtering capabilities to find the perfect collaboration partners based on specific criteria.",
      category: "Discovery",
      highlights: ["Smart filters", "Saved searches", "Recommendation engine"],
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Reputation System",
      description:
        "Comprehensive rating and review system to build trust and showcase successful collaboration history.",
      category: "Trust",
      highlights: ["Rating system", "Review management", "Trust badges"],
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Audience Insights",
      description:
        "Deep audience analytics including demographics, interests, and behavior patterns for better targeting.",
      category: "Insights",
      highlights: ["Demographic data", "Interest mapping", "Behavior analysis"],
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile Optimized",
      description:
        "Fully responsive platform with mobile apps for iOS and Android, ensuring seamless experience across all devices.",
      category: "Mobile",
      highlights: ["Mobile apps", "Responsive design", "Cross-platform"],
    },
  ]

  const categories = ["All", "Matching", "Communication", "Analytics", "Payments", "Management", "Global"]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="floating-particles"></div>
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 animate-pulse">Platform Features</Badge>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-fade-in">
            Powerful Features for
            <br />
            <span className="text-gradient">Modern Collaboration</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            Discover the comprehensive suite of tools designed to revolutionize influencer-brand partnerships and drive
            exceptional campaign results.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="glass border-border/50 hover:border-primary/50 transition-all duration-300 hover-lift group"
              >
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 text-primary group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {feature.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-serif group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {feature.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-accent"></div>
                        <span className="text-muted-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
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
              Ready to Experience These Features?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of successful brands and influencers who are already leveraging our powerful platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button
                  size="lg"
                  className="neon-glow bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 btn-hover-glow"
                >
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="glass border-border/50 btn-hover-glow bg-transparent">
                  View Pricing
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
