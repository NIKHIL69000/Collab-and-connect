import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Users, TrendingUp, Award, Quote } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"

export default function AboutPage() {
  const stats = [
    { icon: <Users className="h-8 w-8" />, value: "50K+", label: "Active Users" },
    { icon: <TrendingUp className="h-8 w-8" />, value: "$2M+", label: "Campaigns Completed" },
    { icon: <Award className="h-8 w-8" />, value: "98%", label: "Success Rate" },
    { icon: <Star className="h-8 w-8" />, value: "4.9", label: "User Rating" },
  ]

  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Fashion Influencer",
      avatar: "/diverse-influencer.png",
      rating: 5,
      review:
        "CollabConnect transformed my influencer career. I've connected with amazing brands and doubled my income in just 6 months!",
    },
    {
      name: "Nike Marketing Team",
      role: "Global Brand",
      avatar: "/nike-logo.png",
      rating: 5,
      review:
        "The platform's matching algorithm is incredible. We found the perfect influencers for our campaigns with minimal effort.",
    },
    {
      name: "John Smith",
      role: "Lifestyle Influencer",
      avatar: "/john-influencer.png",
      rating: 5,
      review:
        "The analytics and payment system are top-notch. I can track my performance and get paid securely every time.",
    },
    {
      name: "Emma Davis",
      role: "Beauty Brand Owner",
      avatar: "/diverse-influencer.png",
      rating: 5,
      review:
        "As a small brand, CollabConnect helped us reach our target audience through authentic influencer partnerships.",
    },
    {
      name: "Michael Chen",
      role: "Tech Influencer",
      avatar: "/john-influencer.png",
      rating: 5,
      review: "The real-time chat and collaboration tools make working with brands seamless. Highly recommended!",
    },
    {
      name: "Adidas Creative Team",
      role: "Sports Brand",
      avatar: "/nike-logo.png",
      rating: 5,
      review:
        "CollabConnect's escrow system gives us confidence in every collaboration. Professional and reliable platform.",
    },
  ]

  const team = [
    {
      name: "Alex Rodriguez",
      role: "CEO & Founder",
      bio: "Former marketing executive with 10+ years in influencer marketing",
      avatar: "/john-influencer.png",
    },
    {
      name: "Priya Patel",
      role: "CTO",
      bio: "Tech visionary who built the AI matching algorithm",
      avatar: "/diverse-influencer.png",
    },
    {
      name: "Marcus Thompson",
      role: "Head of Partnerships",
      bio: "Connects top brands with the perfect influencer matches",
      avatar: "/john-influencer.png",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              About CollabConnect
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're revolutionizing influencer marketing by connecting authentic creators with brands that share their
              values, creating meaningful partnerships that drive real results.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="glass border-border/50 text-center p-6 hover:border-primary/50 transition-all duration-300 animate-slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-primary mb-2 flex justify-center">{stat.icon}</div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>

          {/* Mission Section */}
          <div className="mb-20 animate-fade-in">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-bold mb-8">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-8">
                At CollabConnect, we believe in the power of authentic storytelling. Our platform bridges the gap
                between creative influencers and innovative brands, fostering partnerships that resonate with audiences
                and drive meaningful engagement.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="glass rounded-lg p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Community First</h3>
                  <p className="text-sm text-muted-foreground">
                    Building a supportive ecosystem where creators and brands thrive together.
                  </p>
                </div>
                <div className="glass rounded-lg p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-accent to-secondary rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Data-Driven</h3>
                  <p className="text-sm text-muted-foreground">
                    Using AI and analytics to create perfect matches and measure success.
                  </p>
                </div>
                <div className="glass rounded-lg p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-secondary to-primary rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Excellence</h3>
                  <p className="text-sm text-muted-foreground">
                    Committed to delivering exceptional results for every collaboration.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">What Our Users Say</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <Card
                  key={index}
                  className="glass border-border/50 p-6 hover:border-primary/50 transition-all duration-300 animate-slide-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <img
                        src={review.avatar || "/placeholder.svg"}
                        alt={review.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-semibold">{review.name}</h4>
                        <p className="text-sm text-muted-foreground">{review.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <Quote className="h-4 w-4 text-primary mb-2" />
                    <p className="text-sm text-muted-foreground italic">{review.review}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">Meet Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <Card
                  key={index}
                  className="glass border-border/50 text-center p-6 hover:border-primary/50 transition-all duration-300 animate-slide-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <img
                    src={member.avatar || "/placeholder.svg"}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-primary text-sm mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center glass rounded-2xl p-12 animate-fade-in">
            <h2 className="text-3xl font-serif font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of influencers and brands who are already creating amazing collaborations on CollabConnect.
            </p>
            <Link href="/login">
              <Button className="neon-glow bg-gradient-to-r from-primary to-accent btn-hover-glow text-lg px-8 py-3">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
