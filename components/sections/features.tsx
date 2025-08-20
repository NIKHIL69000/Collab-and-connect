import { Card } from "@/components/ui/card"
import { Search, MessageSquare, Shield, BarChart3, Zap, Users } from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Smart Matching",
    description: "AI-powered algorithm matches influencers with brands based on audience, niche, and engagement rates.",
  },
  {
    icon: MessageSquare,
    title: "Real-time Chat",
    description: "Seamless communication tools with file sharing, video calls, and project management features.",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Escrow system ensures safe transactions with milestone-based payments and dispute resolution.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Comprehensive insights on campaign performance, ROI tracking, and audience analytics.",
  },
  {
    icon: Zap,
    title: "Campaign Management",
    description: "End-to-end project management from brief creation to content delivery and approval.",
  },
  {
    icon: Users,
    title: "Community Hub",
    description: "Connect with other creators, share experiences, and discover collaboration opportunities.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create successful influencer-brand partnerships
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="glass-card p-6 border-white/10 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="mb-4">
                <feature.icon className="h-12 w-12 text-primary group-hover:text-accent transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
