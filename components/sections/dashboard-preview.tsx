import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, DollarSign, BarChart3, Calendar, MessageSquare } from "lucide-react"

export function DashboardPreview() {
  return (
    <section className="section-padding container-padding bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-balance">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Powerful Dashboard
            </span>
            <br />
            <span className="text-foreground">Built for Results</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            Get real-time insights, manage campaigns effortlessly, and track your performance with our intuitive
            dashboard designed for creators and brands.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Dashboard Mockup */}
          <div className="relative order-2 lg:order-1">
            <div className="bg-gradient-to-br from-card to-muted/50 rounded-2xl p-4 md:p-6 border border-border/50 shadow-2xl">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 gap-2">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">Analytics Overview</h3>
                  <p className="text-sm text-muted-foreground">Last 30 days</p>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 w-fit">
                  Live Data
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="bg-background/50 rounded-lg p-3 md:p-4 border border-border/30">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                    <span className="text-xs md:text-sm text-muted-foreground">Engagement</span>
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-foreground">94.2%</div>
                  <div className="text-xs text-primary">+12.5%</div>
                </div>

                <div className="bg-background/50 rounded-lg p-3 md:p-4 border border-border/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-3 w-3 md:h-4 md:w-4 text-accent" />
                    <span className="text-xs md:text-sm text-muted-foreground">Reach</span>
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-foreground">2.4M</div>
                  <div className="text-xs text-accent">+8.3%</div>
                </div>

                <div className="bg-background/50 rounded-lg p-3 md:p-4 border border-border/30">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-3 w-3 md:h-4 md:w-4 text-secondary" />
                    <span className="text-xs md:text-sm text-muted-foreground">Revenue</span>
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-foreground">$12.8K</div>
                  <div className="text-xs text-secondary">+23.1%</div>
                </div>

                <div className="bg-background/50 rounded-lg p-3 md:p-4 border border-border/30">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                    <span className="text-xs md:text-sm text-muted-foreground">Campaigns</span>
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-foreground">24</div>
                  <div className="text-xs text-primary">+4 active</div>
                </div>
              </div>

              {/* Chart Placeholder */}
              <div className="bg-background/30 rounded-lg p-3 md:p-4 border border-border/20 mb-3 md:mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs md:text-sm font-medium text-foreground">Performance Trends</span>
                  <div className="flex gap-1 md:gap-2">
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary"></div>
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-accent"></div>
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-secondary"></div>
                  </div>
                </div>
                <div className="h-16 md:h-24 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded opacity-60"></div>
              </div>

              {/* Recent Activity */}
              <div className="space-y-2 md:space-y-3">
                <h4 className="text-xs md:text-sm font-medium text-foreground">Recent Activity</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm">
                    <Calendar className="h-3 w-3 md:h-4 md:w-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground flex-1 min-w-0">New campaign started with Brand X</span>
                    <span className="text-xs text-muted-foreground flex-shrink-0">2h ago</span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm">
                    <MessageSquare className="h-3 w-3 md:h-4 md:w-4 text-accent flex-shrink-0" />
                    <span className="text-muted-foreground flex-1 min-w-0">5 new collaboration requests</span>
                    <span className="text-xs text-muted-foreground flex-shrink-0">4h ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">Track Your Performance</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Monitor engagement rates, reach, and revenue in real-time with comprehensive analytics and insights.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 md:h-6 md:w-6 text-accent" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">Manage Campaigns with Ease</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Streamline your workflow with intuitive campaign management tools and automated reporting.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-5 w-5 md:h-6 md:w-6 text-secondary" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">Seamless Communication</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Connect directly with brands and creators through our integrated messaging and collaboration tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
