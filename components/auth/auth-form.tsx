"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/ui/icons"

type UserRole = "influencer" | "brand" | "admin"

interface AuthFormProps {
  defaultTab?: "signin" | "signup"
}

export function AuthForm({ defaultTab = "signin" }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState<UserRole>("influencer")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true)
    // TODO: Implement social login
    setTimeout(() => setIsLoading(false), 2000)
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement email authentication
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className={`transition-all duration-500 ${isVisible ? "animate-scale-in" : "opacity-0"}`}>
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 glass mb-6 hover-lift">
          <TabsTrigger value="signin" className="font-sans transition-all duration-300 hover:scale-105">
            Sign In
          </TabsTrigger>
          <TabsTrigger value="signup" className="font-sans transition-all duration-300 hover:scale-105">
            Sign Up
          </TabsTrigger>
        </TabsList>

        <TabsContent value="signin" className="animate-slide-up">
          <Card className="border-0 bg-transparent shadow-none">
            <CardHeader className="text-center pb-4">
              <CardTitle className="font-serif text-xl animate-slide-up">Welcome Back</CardTitle>
              <CardDescription className="font-sans animate-slide-up" style={{ animationDelay: "0.1s" }}>
                Sign in to your CollabConnect account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleEmailAuth} className="space-y-4">
                <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                  <Label htmlFor="email" className="font-sans">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="glass border-border/50 focus:neon-glow transition-all duration-300 hover:border-primary/50"
                    required
                  />
                </div>
                <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.3s" }}>
                  <Label htmlFor="password" className="font-sans">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="glass border-border/50 focus:neon-glow transition-all duration-300 hover:border-primary/50"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full neon-glow font-sans font-medium hover-lift animate-slide-up"
                  style={{ animationDelay: "0.4s" }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              <div className="relative animate-slide-up" style={{ animationDelay: "0.5s" }}>
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full bg-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground font-sans">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 animate-slide-up" style={{ animationDelay: "0.6s" }}>
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin("google")}
                  disabled={isLoading}
                  className="glass border-border/50 hover:neon-glow-blue font-sans hover-lift transition-all duration-300"
                >
                  <Icons.google className="mr-2 h-4 w-4" />
                  Google
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin("facebook")}
                  disabled={isLoading}
                  className="glass border-border/50 hover:neon-glow-blue font-sans hover-lift transition-all duration-300"
                >
                  <Icons.facebook className="mr-2 h-4 w-4" />
                  Facebook
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3 animate-slide-up" style={{ animationDelay: "0.7s" }}>
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin("linkedin")}
                  disabled={isLoading}
                  className="glass border-border/50 hover:neon-glow-blue font-sans hover-lift transition-all duration-300"
                >
                  <Icons.linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin("twitter")}
                  disabled={isLoading}
                  className="glass border-border/50 hover:neon-glow-blue font-sans hover-lift transition-all duration-300"
                >
                  <Icons.twitter className="mr-2 h-4 w-4" />
                  Twitter
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signup" className="animate-slide-up">
          <Card className="border-0 bg-transparent shadow-none">
            <CardHeader className="text-center pb-4">
              <CardTitle className="font-serif text-xl animate-slide-up">Join CollabConnect</CardTitle>
              <CardDescription className="font-sans animate-slide-up" style={{ animationDelay: "0.1s" }}>
                Create your account and start collaborating
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleEmailAuth} className="space-y-4">
                <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                  <Label htmlFor="role" className="font-sans">
                    I am a
                  </Label>
                  <Select value={selectedRole} onValueChange={(value: UserRole) => setSelectedRole(value)}>
                    <SelectTrigger className="glass border-border/50 focus:neon-glow hover-lift transition-all duration-300">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent className="glass-card border-border/50 animate-scale-in">
                      <SelectItem value="influencer" className="hover-lift">
                        Influencer
                      </SelectItem>
                      <SelectItem value="brand" className="hover-lift">
                        Brand
                      </SelectItem>
                      <SelectItem value="admin" className="hover-lift">
                        Admin
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3 animate-slide-up" style={{ animationDelay: "0.3s" }}>
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="font-sans">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      className="glass border-border/50 focus:neon-glow transition-all duration-300 hover:border-primary/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="font-sans">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      className="glass border-border/50 focus:neon-glow transition-all duration-300 hover:border-primary/50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.4s" }}>
                  <Label htmlFor="signupEmail" className="font-sans">
                    Email
                  </Label>
                  <Input
                    id="signupEmail"
                    type="email"
                    placeholder="Enter your email"
                    className="glass border-border/50 focus:neon-glow transition-all duration-300 hover:border-primary/50"
                    required
                  />
                </div>

                <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.5s" }}>
                  <Label htmlFor="signupPassword" className="font-sans">
                    Password
                  </Label>
                  <Input
                    id="signupPassword"
                    type="password"
                    placeholder="Create a password"
                    className="glass border-border/50 focus:neon-glow transition-all duration-300 hover:border-primary/50"
                    required
                  />
                </div>

                <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.6s" }}>
                  <Label htmlFor="confirmPassword" className="font-sans">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    className="glass border-border/50 focus:neon-glow transition-all duration-300 hover:border-primary/50"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full neon-glow font-sans font-medium hover-lift animate-slide-up"
                  style={{ animationDelay: "0.7s" }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>

              <div className="relative animate-slide-up" style={{ animationDelay: "0.8s" }}>
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full bg-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground font-sans">Or sign up with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 animate-slide-up" style={{ animationDelay: "0.9s" }}>
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin("google")}
                  disabled={isLoading}
                  className="glass border-border/50 hover:neon-glow-blue font-sans hover-lift transition-all duration-300"
                >
                  <Icons.google className="mr-2 h-4 w-4" />
                  Google
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin("facebook")}
                  disabled={isLoading}
                  className="glass border-border/50 hover:neon-glow-blue font-sans hover-lift transition-all duration-300"
                >
                  <Icons.facebook className="mr-2 h-4 w-4" />
                  Facebook
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
