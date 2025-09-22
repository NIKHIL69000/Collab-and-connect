"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, User } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { UserSidebar } from "./user-sidebar"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const { user, signOut, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/")
    } catch (error) {
      console.error("Sign out failed:", error)
    }
  }

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 hover-lift cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center animate-glow-pulse">
                <span className="text-white font-bold text-sm">CC</span>
              </div>
              <span className="text-xl font-serif font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                CollabConnect
              </span>
            </Link>
            <div className="w-32 h-10"></div> {/* Placeholder to prevent layout shift */}
          </div>
        </div>
      </header>
    )
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass-card border-b border-white/20 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 hover-lift cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center animate-glow-pulse">
                <span className="text-white font-bold text-sm">CC</span>
              </div>
              <span className="text-xl font-serif font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                CollabConnect
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/features"
                className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105 relative hover-glow"
              >
                Features
              </Link>
              <Link
                href="/how-it-works"
                className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105 relative hover-glow"
              >
                How It Works
              </Link>
              <Link
                href="/pricing"
                className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105 relative hover-glow"
              >
                Subscription
              </Link>
              <Link
                href="/about"
                className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105 relative hover-glow"
              >
                About
              </Link>
              <Link
                href="/chat"
                className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105 relative hover-glow"
              >
                Chat
              </Link>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated && user ? (
                <Button
                  variant="ghost"
                  onClick={() => setIsSidebarOpen(true)}
                  className="flex items-center space-x-2 text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105 btn-hover-glow"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span>{user.name}</span>
                </Button>
              ) : (
                <>
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105 btn-hover-glow relative"
                    >
                      Sign In
                    </Button>
                  </Link>

                  <Link href="/login">
                    <Button className="neon-glow bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 btn-hover-glow transition-all duration-300">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
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
            <div className="mt-4 pb-4 border-t border-white/10 glass-card backdrop-blur-xl bg-background/95 rounded-lg mx-2 p-4">
              <nav className="flex flex-col space-y-4">
                {[
                  { name: "Features", href: "/features" },
                  { name: "How It Works", href: "/how-it-works" },
                  { name: "Subscription", href: "/pricing" },
                  { name: "About", href: "/about" },
                  { name: "Chat", href: "/chat" },
                ].map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-foreground/80 hover:text-primary transition-all duration-300 hover:translate-x-2 animate-slide-in-left"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex flex-col space-y-2 pt-4 border-t border-white/10">
                  {isAuthenticated && user ? (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setIsSidebarOpen(true)
                        setIsMenuOpen(false)
                      }}
                      className="justify-start btn-hover-glow"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Account Menu
                    </Button>
                  ) : (
                    <>
                      <Link href="/login">
                        <Button
                          variant="ghost"
                          className="justify-start btn-hover-glow w-full"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/login">
                        <Button
                          className="neon-glow bg-gradient-to-r from-primary to-accent btn-hover-glow w-full"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Get Started
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {isAuthenticated && user && <UserSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}
    </>
  )
}
