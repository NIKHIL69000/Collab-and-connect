import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { AuthForm } from "@/components/auth/auth-form"
import { ArrowRight, Users, Zap, TrendingUp } from "lucide-react"

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Connect.
            </span>
            <br />
            <span className="bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
              Collaborate.
            </span>
            <br />
            <span className="bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
              Create.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-sans leading-relaxed">
            The ultimate platform where <span className="text-primary font-semibold">influencers</span> and{" "}
            <span className="text-accent font-semibold">brands</span> come together to create authentic, impactful
            collaborations that drive real results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="neon-glow bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-lg px-8 py-6"
                >
                  Start Collaborating
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-card border-white/20 max-w-md">
                <AuthForm defaultTab="signup" />
              </DialogContent>
            </Dialog>

            <Button
              size="lg"
              variant="outline"
              className="border-white/20 hover:bg-white/5 text-lg px-8 py-6 bg-transparent"
            >
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="glass-card p-6 rounded-xl border border-white/10">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Active Creators</div>
            </div>
            <div className="glass-card p-6 rounded-xl border border-white/10">
              <Zap className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-accent">500+</div>
              <div className="text-sm text-muted-foreground">Brand Partners</div>
            </div>
            <div className="glass-card p-6 rounded-xl border border-white/10">
              <TrendingUp className="h-8 w-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold text-secondary">$2M+</div>
              <div className="text-sm text-muted-foreground">Paid Out</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
