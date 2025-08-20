// Authentication utilities and types
export interface User {
  id: string
  email: string
  name: string
  role: "influencer" | "brand" | "admin"
  avatar?: string
  isVerified: boolean
  createdAt: string
  // Profile fields
  bio?: string
  location?: string
  website?: string
  phone?: string
  // Role-specific fields
  influencerProfile?: InfluencerProfile
  brandProfile?: BrandProfile
  adminProfile?: AdminProfile
}

export interface InfluencerProfile {
  categories: string[]
  socialMedia: {
    instagram?: { username: string; followers: number; verified: boolean }
    youtube?: { username: string; subscribers: number; verified: boolean }
    tiktok?: { username: string; followers: number; verified: boolean }
    twitter?: { username: string; followers: number; verified: boolean }
  }
  demographics: {
    ageRange: string
    genderSplit: { male: number; female: number; other: number }
    topCountries: string[]
  }
  rates: {
    postRate?: number
    storyRate?: number
    videoRate?: number
  }
  portfolio: {
    id: string
    title: string
    description: string
    imageUrl: string
    campaignType: string
    results?: string
  }[]
  availability: boolean
}

export interface BrandProfile {
  companyName: string
  industry: string
  companySize: string
  website: string
  description: string
  logo?: string
  budgetRange: {
    min: number
    max: number
  }
  campaignTypes: string[]
  targetAudience: {
    ageRange: string[]
    interests: string[]
    locations: string[]
  }
  previousCampaigns: {
    id: string
    title: string
    description: string
    budget: number
    results?: string
  }[]
}

export interface AdminProfile {
  permissions: string[]
  department: string
  lastLogin: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

// Mock authentication functions (replace with real API calls)
export const authService = {
  async signUp(email: string, password: string, name: string, role: "influencer" | "brand"): Promise<User> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role,
      isVerified: false,
      createdAt: new Date().toISOString(),
    }

    // Store in localStorage for demo
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("isAuthenticated", "true")

    return user
  },

  async signIn(email: string, password: string): Promise<User> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split("@")[0],
      role: email.includes("brand") ? "brand" : "influencer",
      isVerified: true,
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("isAuthenticated", "true")

    return user
  },

  async signOut(): Promise<void> {
    localStorage.removeItem("user")
    localStorage.removeItem("isAuthenticated")
  },

  async getCurrentUser(): Promise<User | null> {
    const userStr = localStorage.getItem("user")
    const isAuthenticated = localStorage.getItem("isAuthenticated")

    if (userStr && isAuthenticated === "true") {
      return JSON.parse(userStr)
    }

    return null
  },

  async resetPassword(email: string): Promise<void> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Password reset email sent to:", email)
  },
}
