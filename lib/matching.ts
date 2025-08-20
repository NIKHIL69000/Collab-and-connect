// Collaboration matching system types and utilities

export interface Campaign {
  id: string
  brandId: string
  brandName: string
  brandLogo?: string
  title: string
  description: string
  category: string
  budget: {
    min: number
    max: number
  }
  requirements: {
    minFollowers: number
    maxFollowers?: number
    ageRange?: string[]
    locations?: string[]
    contentTypes: string[]
    platforms: string[]
  }
  deliverables: string[]
  timeline: {
    applicationDeadline: string
    campaignStart: string
    campaignEnd: string
  }
  status: "draft" | "active" | "in-progress" | "completed" | "cancelled"
  applicationsCount: number
  selectedInfluencers?: string[]
  createdAt: string
  tags: string[]
}

export interface InfluencerApplication {
  id: string
  campaignId: string
  influencerId: string
  influencerName: string
  proposedRate: number
  message: string
  portfolio: string[]
  status: "pending" | "accepted" | "rejected" | "withdrawn"
  appliedAt: string
}

export interface MatchingScore {
  overall: number
  audienceMatch: number
  contentMatch: number
  budgetMatch: number
  engagementMatch: number
  locationMatch: number
}

// Mock data for campaigns
export const mockCampaigns: Campaign[] = [
  {
    id: "1",
    brandId: "brand1",
    brandName: "TechStyle Co.",
    title: "Summer Tech Fashion Launch",
    description:
      "Looking for tech-savvy fashion influencers to showcase our new smart clothing line. Perfect for creators who blend technology with style.",
    category: "Fashion",
    budget: { min: 1000, max: 5000 },
    requirements: {
      minFollowers: 10000,
      maxFollowers: 100000,
      ageRange: ["18-24", "25-34"],
      locations: ["United States", "Canada"],
      contentTypes: ["Posts", "Stories", "Reels"],
      platforms: ["Instagram", "TikTok"],
    },
    deliverables: ["3 Instagram posts", "5 Instagram stories", "1 TikTok video"],
    timeline: {
      applicationDeadline: "2024-02-15",
      campaignStart: "2024-02-20",
      campaignEnd: "2024-03-20",
    },
    status: "active",
    applicationsCount: 24,
    createdAt: "2024-01-15",
    tags: ["Fashion", "Tech", "Lifestyle", "Innovation"],
  },
  {
    id: "2",
    brandId: "brand2",
    brandName: "FitLife Nutrition",
    title: "Fitness Transformation Challenge",
    description:
      "Partner with us for a 30-day fitness transformation challenge. Share your journey and inspire others to live healthier lives.",
    category: "Fitness",
    budget: { min: 2000, max: 8000 },
    requirements: {
      minFollowers: 25000,
      contentTypes: ["Posts", "Stories", "Videos"],
      platforms: ["Instagram", "YouTube"],
    },
    deliverables: ["Daily workout posts", "Weekly progress videos", "Nutrition tips"],
    timeline: {
      applicationDeadline: "2024-02-10",
      campaignStart: "2024-02-15",
      campaignEnd: "2024-03-15",
    },
    status: "active",
    applicationsCount: 18,
    createdAt: "2024-01-10",
    tags: ["Fitness", "Health", "Transformation", "Motivation"],
  },
  {
    id: "3",
    brandId: "brand3",
    brandName: "Wanderlust Travel",
    title: "Exotic Destinations Showcase",
    description:
      "Showcase breathtaking travel destinations and create content that inspires wanderlust. Perfect for travel enthusiasts and photographers.",
    category: "Travel",
    budget: { min: 3000, max: 12000 },
    requirements: {
      minFollowers: 50000,
      contentTypes: ["Posts", "Stories", "Reels", "Videos"],
      platforms: ["Instagram", "YouTube", "TikTok"],
    },
    deliverables: ["Destination photo series", "Travel vlogs", "Location reviews"],
    timeline: {
      applicationDeadline: "2024-02-20",
      campaignStart: "2024-03-01",
      campaignEnd: "2024-04-01",
    },
    status: "active",
    applicationsCount: 31,
    createdAt: "2024-01-20",
    tags: ["Travel", "Photography", "Adventure", "Culture"],
  },
]

// Matching algorithm
export const calculateMatchingScore = (campaign: Campaign, influencerProfile: any): MatchingScore => {
  // Mock matching algorithm - in real app, this would be more sophisticated
  const audienceMatch = Math.random() * 100
  const contentMatch = Math.random() * 100
  const budgetMatch = Math.random() * 100
  const engagementMatch = Math.random() * 100
  const locationMatch = Math.random() * 100

  const overall = (audienceMatch + contentMatch + budgetMatch + engagementMatch + locationMatch) / 5

  return {
    overall: Math.round(overall),
    audienceMatch: Math.round(audienceMatch),
    contentMatch: Math.round(contentMatch),
    budgetMatch: Math.round(budgetMatch),
    engagementMatch: Math.round(engagementMatch),
    locationMatch: Math.round(locationMatch),
  }
}

export const getMatchingCampaigns = (influencerProfile: any): (Campaign & { matchingScore: MatchingScore })[] => {
  return mockCampaigns
    .map((campaign) => ({
      ...campaign,
      matchingScore: calculateMatchingScore(campaign, influencerProfile),
    }))
    .sort((a, b) => b.matchingScore.overall - a.matchingScore.overall)
}
