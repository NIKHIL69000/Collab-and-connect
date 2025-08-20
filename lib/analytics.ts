// Analytics and reporting system types and utilities

export interface CampaignAnalytics {
  campaignId: string
  campaignTitle: string
  startDate: string
  endDate: string
  status: "active" | "completed" | "paused"
  metrics: {
    reach: number
    impressions: number
    engagement: number
    clicks: number
    conversions: number
    engagementRate: number
    clickThroughRate: number
    conversionRate: number
    costPerClick: number
    costPerConversion: number
    roi: number
  }
  demographics: {
    ageGroups: { range: string; percentage: number }[]
    genderSplit: { gender: string; percentage: number }[]
    topLocations: { location: string; percentage: number }[]
  }
  platformBreakdown: {
    platform: string
    reach: number
    engagement: number
    clicks: number
  }[]
  timeSeriesData: {
    date: string
    reach: number
    engagement: number
    clicks: number
    conversions: number
  }[]
}

export interface InfluencerAnalytics {
  userId: string
  period: "7d" | "30d" | "90d" | "1y"
  followerGrowth: {
    platform: string
    current: number
    growth: number
    growthRate: number
    data: { date: string; followers: number }[]
  }[]
  engagementMetrics: {
    averageEngagementRate: number
    totalLikes: number
    totalComments: number
    totalShares: number
    bestPerformingPost: {
      id: string
      platform: string
      engagement: number
      reach: number
    }
  }
  audienceInsights: {
    demographics: {
      ageGroups: { range: string; percentage: number }[]
      genderSplit: { gender: string; percentage: number }[]
      topLocations: { location: string; percentage: number }[]
    }
    interests: { category: string; percentage: number }[]
    activeHours: { hour: number; activity: number }[]
  }
  campaignPerformance: {
    totalCampaigns: number
    completedCampaigns: number
    averageRating: number
    totalEarnings: number
    averageEarningsPerCampaign: number
    topPerformingCampaigns: {
      id: string
      title: string
      brand: string
      earnings: number
      roi: number
    }[]
  }
}

export interface BrandAnalytics {
  userId: string
  period: "7d" | "30d" | "90d" | "1y"
  campaignOverview: {
    totalCampaigns: number
    activeCampaigns: number
    completedCampaigns: number
    totalSpent: number
    averageROI: number
    totalReach: number
    totalEngagement: number
  }
  influencerPerformance: {
    totalInfluencers: number
    topPerformers: {
      id: string
      name: string
      campaigns: number
      totalReach: number
      averageEngagement: number
      roi: number
    }[]
    averageRating: number
  }
  budgetAnalysis: {
    totalBudget: number
    spentBudget: number
    remainingBudget: number
    budgetUtilization: number
    spendingTrends: { date: string; amount: number }[]
    categoryBreakdown: { category: string; amount: number; percentage: number }[]
  }
  performanceMetrics: {
    reachTrends: { date: string; reach: number }[]
    engagementTrends: { date: string; engagement: number }[]
    conversionTrends: { date: string; conversions: number }[]
    roiTrends: { date: string; roi: number }[]
  }
}

// Mock analytics data
export const mockInfluencerAnalytics: InfluencerAnalytics = {
  userId: "user1",
  period: "30d",
  followerGrowth: [
    {
      platform: "Instagram",
      current: 125000,
      growth: 5200,
      growthRate: 4.3,
      data: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        followers: 120000 + i * 170 + Math.random() * 200,
      })),
    },
    {
      platform: "TikTok",
      current: 89000,
      growth: 3100,
      growthRate: 3.6,
      data: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        followers: 86000 + i * 100 + Math.random() * 150,
      })),
    },
    {
      platform: "YouTube",
      current: 45000,
      growth: 1200,
      growthRate: 2.7,
      data: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        followers: 44000 + i * 40 + Math.random() * 60,
      })),
    },
  ],
  engagementMetrics: {
    averageEngagementRate: 4.8,
    totalLikes: 245000,
    totalComments: 18500,
    totalShares: 12300,
    bestPerformingPost: {
      id: "post1",
      platform: "Instagram",
      engagement: 15600,
      reach: 89000,
    },
  },
  audienceInsights: {
    demographics: {
      ageGroups: [
        { range: "18-24", percentage: 35 },
        { range: "25-34", percentage: 42 },
        { range: "35-44", percentage: 18 },
        { range: "45+", percentage: 5 },
      ],
      genderSplit: [
        { gender: "Female", percentage: 68 },
        { gender: "Male", percentage: 30 },
        { gender: "Other", percentage: 2 },
      ],
      topLocations: [
        { location: "United States", percentage: 45 },
        { location: "Canada", percentage: 18 },
        { location: "United Kingdom", percentage: 12 },
        { location: "Australia", percentage: 8 },
        { location: "Germany", percentage: 6 },
      ],
    },
    interests: [
      { category: "Fashion", percentage: 78 },
      { category: "Technology", percentage: 65 },
      { category: "Lifestyle", percentage: 58 },
      { category: "Travel", percentage: 42 },
      { category: "Fitness", percentage: 35 },
    ],
    activeHours: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      activity: Math.random() * 100,
    })),
  },
  campaignPerformance: {
    totalCampaigns: 24,
    completedCampaigns: 22,
    averageRating: 4.7,
    totalEarnings: 48500,
    averageEarningsPerCampaign: 2200,
    topPerformingCampaigns: [
      {
        id: "camp1",
        title: "Summer Tech Fashion Launch",
        brand: "TechStyle Co.",
        earnings: 5000,
        roi: 340,
      },
      {
        id: "camp2",
        title: "Fitness Transformation Challenge",
        brand: "FitLife Nutrition",
        earnings: 4200,
        roi: 285,
      },
      {
        id: "camp3",
        title: "Travel Gear Review",
        brand: "Wanderlust Travel",
        earnings: 3800,
        roi: 220,
      },
    ],
  },
}

export const mockBrandAnalytics: BrandAnalytics = {
  userId: "brand1",
  period: "30d",
  campaignOverview: {
    totalCampaigns: 12,
    activeCampaigns: 3,
    completedCampaigns: 8,
    totalSpent: 125000,
    averageROI: 285,
    totalReach: 2400000,
    totalEngagement: 156000,
  },
  influencerPerformance: {
    totalInfluencers: 18,
    topPerformers: [
      {
        id: "inf1",
        name: "Sarah Chen",
        campaigns: 3,
        totalReach: 450000,
        averageEngagement: 4.8,
        roi: 340,
      },
      {
        id: "inf2",
        name: "Alex Rodriguez",
        campaigns: 2,
        totalReach: 320000,
        averageEngagement: 5.2,
        roi: 295,
      },
      {
        id: "inf3",
        name: "Emma Wilson",
        campaigns: 2,
        totalReach: 280000,
        averageEngagement: 4.1,
        roi: 265,
      },
    ],
    averageRating: 4.6,
  },
  budgetAnalysis: {
    totalBudget: 200000,
    spentBudget: 125000,
    remainingBudget: 75000,
    budgetUtilization: 62.5,
    spendingTrends: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      amount: Math.random() * 5000 + 1000,
    })),
    categoryBreakdown: [
      { category: "Influencer Payments", amount: 85000, percentage: 68 },
      { category: "Platform Fees", amount: 25000, percentage: 20 },
      { category: "Content Production", amount: 10000, percentage: 8 },
      { category: "Analytics Tools", amount: 5000, percentage: 4 },
    ],
  },
  performanceMetrics: {
    reachTrends: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      reach: Math.random() * 100000 + 50000,
    })),
    engagementTrends: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      engagement: Math.random() * 8000 + 2000,
    })),
    conversionTrends: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      conversions: Math.random() * 500 + 100,
    })),
    roiTrends: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      roi: Math.random() * 200 + 150,
    })),
  },
}

// Analytics service functions
export const analyticsService = {
  async getInfluencerAnalytics(userId: string, period: string): Promise<InfluencerAnalytics> {
    await new Promise((resolve) => setTimeout(resolve, 800))
    return mockInfluencerAnalytics
  },

  async getBrandAnalytics(userId: string, period: string): Promise<BrandAnalytics> {
    await new Promise((resolve) => setTimeout(resolve, 800))
    return mockBrandAnalytics
  },

  async exportAnalytics(userId: string, format: "pdf" | "csv" | "excel"): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return `analytics-report-${Date.now()}.${format}`
  },
}
