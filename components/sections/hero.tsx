import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { AuthForm } from "@/components/auth/auth-form"
import { ArrowRight, Users, Zap, TrendingUp } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80 z-10"></div>

      <div className="absolute inset-0 z-0">
        <Image
          src="/futuristic-collaboration-network-background.jpg"
          alt="Collaboration network background"
          fill
          className="object-cover opacity-20"
          priority
          sizes="100vw"
        />
      </div>

      <div className="container mx-auto text-center relative z-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-responsive-5xl md:text-responsive-7xl font-serif font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent block">
              Connect.
            </span>
            <span className="bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent block">
              Collaborate.
            </span>
            <span className="bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent block">
              Create.
            </span>
          </h1>

          <p className="text-responsive-lg md:text-responsive-xl text-muted-foreground mb-8 font-sans leading-relaxed max-w-3xl mx-auto text-balance">
            The ultimate platform where <span className="text-primary font-semibold">influencers</span> and{" "}
            <span className="text-accent font-semibold">brands</span> come together to create authentic, impactful
            collaborations that drive real results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="neon-glow bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-responsive-base px-6 py-4 sm:px-8 sm:py-6 min-h-[48px] w-full sm:w-auto max-w-xs btn-hover-glow focus-visible"
                >
                  Start Collaborating
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-card border-white/20 max-w-md mx-4">
                <AuthForm defaultTab="signup" />
              </DialogContent>
            </Dialog>

            <Button
              size="lg"
              variant="outline"
              className="border-white/20 hover:bg-white/5 text-responsive-base px-6 py-4 sm:px-8 sm:py-6 bg-transparent min-h-[48px] w-full sm:w-auto max-w-xs btn-hover-glow focus-visible"
            >
              Watch Demo
            </Button>
          </div>

          <div className="grid-responsive-3 max-w-4xl mx-auto">
            <div className="glass-card p-6 rounded-xl border border-white/10 hover-lift">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" aria-hidden="true" />
              <div className="text-responsive-2xl font-bold text-primary" aria-label="10,000 plus active creators">
                10K+
              </div>
              <div className="text-responsive-sm text-muted-foreground">Active Creators</div>
            </div>
            <div className="glass-card p-6 rounded-xl border border-white/10 hover-lift">
              <Zap className="h-8 w-8 text-accent mx-auto mb-2" aria-hidden="true" />
              <div className="text-responsive-2xl font-bold text-accent" aria-label="500 plus brand partners">
                500+
              </div>
              <div className="text-responsive-sm text-muted-foreground">Brand Partners</div>
            </div>
            <div className="glass-card p-6 rounded-xl border border-white/10 hover-lift">
              <TrendingUp className="h-8 w-8 text-secondary mx-auto mb-2" aria-hidden="true" />
              <div
                className="text-responsive-2xl font-bold text-secondary"
                aria-label="2 million dollars plus paid out"
              >
                $2M+
              </div>
              <div className="text-responsive-sm text-muted-foreground">Paid Out</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
