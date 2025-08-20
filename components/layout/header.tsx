"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { AuthForm } from "@/components/auth/auth-form"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-card border-b border-white/20 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 hover-lift cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center animate-glow-pulse">
              <span className="text-white font-bold text-sm">CC</span>
            </div>
            <span className="text-xl font-serif font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              CollabConnect
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105 relative hover-glow"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105 relative hover-glow"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105 relative hover-glow"
            >
              Pricing
            </a>
            <a
              href="#about"
              className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105 relative hover-glow"
            >
              About
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105 hover-glow"
                >
                  Sign In
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-card border-white/20 max-w-md modal-content">
                <AuthForm />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="neon-glow bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 transition-all duration-300 hover:scale-105">
                  Get Started
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-card border-white/20 max-w-md modal-content">
                <AuthForm defaultTab="signup" />
              </DialogContent>
            </Dialog>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden transition-all duration-300 hover:scale-110 hover:rotate-90"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-4 pb-4 border-t border-white/10">
            <nav className="flex flex-col space-y-4 mt-4">
              {["Features", "How It Works", "Pricing", "About"].map((item, index) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-foreground/80 hover:text-primary transition-all duration-300 hover:translate-x-2 animate-slide-in-left"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-white/10">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="justify-start hover-lift">
                      Sign In
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass-card border-white/20 max-w-md modal-content">
                    <AuthForm />
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="neon-glow bg-gradient-to-r from-primary to-accent hover-lift">
                      Get Started
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass-card border-white/20 max-w-md modal-content">
                    <AuthForm defaultTab="signup" />
                  </DialogContent>
                </Dialog>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
