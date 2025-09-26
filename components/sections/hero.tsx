import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { AuthForm } from "@/components/auth/auth-form"
import { ArrowRight, Play } from "lucide-react"

export function Hero() {
  return (
    <section className="relative section-padding container-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background z-10"></div>

      <div className="container mx-auto text-center relative z-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight text-balance">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Connect Influencers
            </span>
            <br />
            <span className="text-foreground">with Brands</span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 md:mb-12 leading-relaxed max-w-2xl mx-auto text-balance px-4 md:px-0">
            The ultimate platform for authentic collaborations that drive real results. Join thousands of creators and
            brands building meaningful partnerships.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 md:mb-16 items-center px-4 md:px-0">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto min-w-[200px]"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-card border-white/20 max-w-md mx-4">
                <AuthForm defaultTab="signup" />
              </DialogContent>
            </Dialog>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 text-foreground font-semibold px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg transition-all duration-300 hover:scale-105 w-full sm:w-auto min-w-[200px] bg-transparent"
            >
              <Play className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              Explore Campaigns
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
