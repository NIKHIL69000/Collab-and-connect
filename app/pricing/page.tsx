import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Star, Zap, Crown, Rocket } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for new influencers getting started",
      icon: <Star className="h-6 w-6" />,
      features: [
        "Basic profile creation",
        "Browse campaigns",
        "Apply to 3 campaigns/month",
        "Basic analytics",
        "Community support",
      ],
      popular: false,
      gradient: "from-blue-500 to-purple-600",
    },
    {
      name: "Professional",
      price: "$29",
      description: "For growing influencers and small brands",
      icon: <Zap className="h-6 w-6" />,
      features: [
        "Everything in Starter",
        "Unlimited campaign applications",
        "Advanced analytics",
        "Priority support",
        "Portfolio showcase",
        "Direct messaging",
        "Campaign management tools",
      ],
      popular: true,
      gradient: "from-purple-500 to-pink-600",
    },
    {
      name: "Enterprise",
      price: "$99",
      description: "For established brands and agencies",
      icon: <Crown className="h-6 w-6" />,
      features: [
        "Everything in Professional",
        "White-label solution",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced reporting",
        "API access",
        "Custom contracts",
        "Priority campaign placement",
      ],
      popular: false,
      gradient: "from-pink-500 to-red-600",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full px-4 py-2 mb-6">
              <Rocket className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Choose Your Plan</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Subscription Plans
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect subscription plan for your needs. Start for free and scale as you grow.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={plan.name}
                className={`relative glass border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-105 animate-slide-in-up ${
                  plan.popular ? "ring-2 ring-primary/50 shadow-2xl shadow-primary/20" : ""
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <div
                    className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r ${plan.gradient} flex items-center justify-center text-white`}
                  >
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl font-serif">{plan.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Free" && <span className="text-muted-foreground">/month</span>}
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/login">
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "neon-glow bg-gradient-to-r from-primary to-accent"
                          : "glass border-border/50 hover:border-primary/50"
                      } btn-hover-glow transition-all duration-300`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-serif font-bold mb-8">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="glass rounded-lg p-6 text-left">
                <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </div>
              <div className="glass rounded-lg p-6 text-left">
                <h3 className="font-semibold mb-2">Is there a free trial?</h3>
                <p className="text-muted-foreground text-sm">
                  Our Starter plan is completely free forever. Upgrade when you're ready to unlock more features.
                </p>
              </div>
              <div className="glass rounded-lg p-6 text-left">
                <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground text-sm">
                  We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
                </p>
              </div>
              <div className="glass rounded-lg p-6 text-left">
                <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, we offer a 30-day money-back guarantee for all paid plans.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
