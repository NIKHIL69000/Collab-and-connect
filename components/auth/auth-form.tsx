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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

type UserRole = "influencer" | "brand" | "admin"

interface AuthFormProps {
  defaultTab?: "signin" | "signup"
  onSuccess?: () => void
}

interface FormErrors {
  email?: string
  password?: string
  confirmPassword?: string
  firstName?: string
  lastName?: string
}

export function AuthForm({ defaultTab = "signin", onSuccess }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState<UserRole>("influencer")
  const [isVisible, setIsVisible] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  })
  const [generalError, setGeneralError] = useState("")

  const { signIn, signUp } = useAuth()
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const validateForm = (isSignUp = false): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (isSignUp) {
      if (!formData.firstName) {
        newErrors.firstName = "First name is required"
      }
      if (!formData.lastName) {
        newErrors.lastName = "Last name is required"
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password"
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
    setGeneralError("")
  }

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true)
    setGeneralError("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const mockUser = {
        id: `${provider}-${Date.now()}`,
        email: `user@${provider}.com`,
        firstName: "Social",
        lastName: "User",
        role: selectedRole,
        avatar: `/placeholder.svg?height=40&width=40&query=${provider} user avatar`,
        isVerified: true,
        createdAt: new Date().toISOString(),
      }

      await signIn(mockUser.email, "social-login", mockUser)
      onSuccess?.()
      router.push("/dashboard")
    } catch (error) {
      setGeneralError(`Failed to sign in with ${provider}. Please try again.`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailAuth = async (e: React.FormEvent, isSignUp = false) => {
    e.preventDefault()
    setGeneralError("")

    if (!validateForm(isSignUp)) {
      return
    }

    setIsLoading(true)

    try {
      if (isSignUp) {
        await signUp(formData.email, formData.password, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: selectedRole,
        })
      } else {
        await signIn(formData.email, formData.password)
      }

      onSuccess?.()
      router.push("/dashboard")
    } catch (error) {
      setGeneralError(isSignUp ? "Failed to create account. Please try again." : "Invalid email or password.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`transition-all duration-500 ${isVisible ? "animate-scale-in" : "opacity-0"}`}>
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 glass mb-6 hover-lift">
          <TabsTrigger
            value="signin"
            className="font-sans transition-all duration-300 hover:scale-105 data-[state=active]:bg-primary/20"
          >
            Sign In
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            className="font-sans transition-all duration-300 hover:scale-105 data-[state=active]:bg-primary/20"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>

        {generalError && (
          <Alert className="mb-4 border-red-500/50 bg-red-500/10 animate-slide-up">
            <AlertDescription className="text-red-400">{generalError}</AlertDescription>
          </Alert>
        )}

        <TabsContent value="signin" className="animate-slide-up">
          <Card className="border-0 bg-transparent shadow-none">
            <CardHeader className="text-center pb-4">
              <CardTitle className="font-serif text-2xl animate-slide-up bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
              <CardDescription
                className="font-sans animate-slide-up text-muted-foreground"
                style={{ animationDelay: "0.1s" }}
              >
                Sign in to your CollabConnect account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={(e) => handleEmailAuth(e, false)} className="space-y-4">
                <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                  <Label htmlFor="email" className="font-sans text-sm font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`glass border-border/50 input-glow transition-all duration-300 hover:border-primary/50 ${
                      errors.email ? "input-error" : ""
                    }`}
                    required
                  />
                  {errors.email && <p className="text-red-400 text-xs animate-slide-up">{errors.email}</p>}
                </div>
                <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.3s" }}>
                  <Label htmlFor="password" className="font-sans text-sm font-medium">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`glass border-border/50 input-glow transition-all duration-300 hover:border-primary/50 ${
                      errors.password ? "input-error" : ""
                    }`}
                    required
                  />
                  {errors.password && <p className="text-red-400 text-xs animate-slide-up">{errors.password}</p>}
                </div>
                <Button
                  type="submit"
                  className="w-full neon-glow font-sans font-medium btn-hover-glow animate-slide-up"
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
                  <Separator className="w-full bg-border/30" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-3 text-muted-foreground font-sans">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 animate-slide-up" style={{ animationDelay: "0.6s" }}>
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin("google")}
                  disabled={isLoading}
                  className="glass border-border/50 btn-hover-glow font-sans transition-all duration-300"
                >
                  <Icons.google className="mr-2 h-4 w-4" />
                  Google
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin("facebook")}
                  disabled={isLoading}
                  className="glass border-border/50 btn-hover-glow font-sans transition-all duration-300"
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
                  className="glass border-border/50 btn-hover-glow font-sans transition-all duration-300"
                >
                  <Icons.linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin("twitter")}
                  disabled={isLoading}
                  className="glass border-border/50 btn-hover-glow font-sans transition-all duration-300"
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
              <CardTitle className="font-serif text-2xl animate-slide-up bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Join CollabConnect
              </CardTitle>
              <CardDescription
                className="font-sans animate-slide-up text-muted-foreground"
                style={{ animationDelay: "0.1s" }}
              >
                Create your account and start collaborating
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={(e) => handleEmailAuth(e, true)} className="space-y-4">
                <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                  <Label htmlFor="role" className="font-sans text-sm font-medium">
                    I am a
                  </Label>
                  <Select value={selectedRole} onValueChange={(value: UserRole) => setSelectedRole(value)}>
                    <SelectTrigger className="glass border-border/50 input-glow btn-hover-glow transition-all duration-300">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent className="glass-card border-border/50 animate-scale-in">
                      <SelectItem value="influencer" className="hover-lift transition-all duration-200">
                        🌟 Influencer
                      </SelectItem>
                      <SelectItem value="brand" className="hover-lift transition-all duration-200">
                        🏢 Brand
                      </SelectItem>
                      <SelectItem value="admin" className="hover-lift transition-all duration-200">
                        ⚡ Admin
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3 animate-slide-up" style={{ animationDelay: "0.3s" }}>
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="font-sans text-sm font-medium">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className={`glass border-border/50 input-glow transition-all duration-300 hover:border-primary/50 ${
                        errors.firstName ? "input-error" : ""
                      }`}
                      required
                    />
                    {errors.firstName && <p className="text-red-400 text-xs animate-slide-up">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="font-sans text-sm font-medium">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className={`glass border-border/50 input-glow transition-all duration-300 hover:border-primary/50 ${
                        errors.lastName ? "input-error" : ""
                      }`}
                      required
                    />
                    {errors.lastName && <p className="text-red-400 text-xs animate-slide-up">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.4s" }}>
                  <Label htmlFor="signupEmail" className="font-sans text-sm font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="signupEmail"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`glass border-border/50 input-glow transition-all duration-300 hover:border-primary/50 ${
                      errors.email ? "input-error" : ""
                    }`}
                    required
                  />
                  {errors.email && <p className="text-red-400 text-xs animate-slide-up">{errors.email}</p>}
                </div>

                <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.5s" }}>
                  <Label htmlFor="signupPassword" className="font-sans text-sm font-medium">
                    Password
                  </Label>
                  <Input
                    id="signupPassword"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`glass border-border/50 input-glow transition-all duration-300 hover:border-primary/50 ${
                      errors.password ? "input-error" : ""
                    }`}
                    required
                  />
                  {errors.password && <p className="text-red-400 text-xs animate-slide-up">{errors.password}</p>}
                </div>

                <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.6s" }}>
                  <Label htmlFor="confirmPassword" className="font-sans text-sm font-medium">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={`glass border-border/50 input-glow transition-all duration-300 hover:border-primary/50 ${
                      errors.confirmPassword ? "input-error" : ""
                    }`}
                    required
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-xs animate-slide-up">{errors.confirmPassword}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full neon-glow font-sans font-medium btn-hover-glow animate-slide-up"
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
                  <Separator className="w-full bg-border/30" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-3 text-muted-foreground font-sans">Or sign up with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 animate-slide-up" style={{ animationDelay: "0.9s" }}>
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin("google")}
                  disabled={isLoading}
                  className="glass border-border/50 btn-hover-glow font-sans transition-all duration-300"
                >
                  <Icons.google className="mr-2 h-4 w-4" />
                  Google
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin("facebook")}
                  disabled={isLoading}
                  className="glass border-border/50 btn-hover-glow font-sans transition-all duration-300"
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
