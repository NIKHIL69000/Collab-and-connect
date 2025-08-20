"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, Users, Eye, Heart, DollarSign, Target, Download, BarChart3 } from "lucide-react"
import { type InfluencerAnalytics, type BrandAnalytics, analyticsService } from "@/lib/analytics"
import { useAuth } from "@/contexts/auth-context"

export function AnalyticsDashboard() {
  const { user } = useAuth()
  const [period, setPeriod] = useState("30d")
  const [influencerData, setInfluencerData] = useState<InfluencerAnalytics | null>(null)
  const [brandData, setBrandData] = useState<BrandAnalytics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isExporting, setIsExporting] = useState(false)

  useEffect(() => {
    loadAnalytics()
  }, [period, user])

  const loadAnalytics = async () => {
    if (!user) return

    setIsLoading(true)
    try {
      if (user.role === "influencer") {
        const data = await analyticsService.getInfluencerAnalytics(user.id, period)
        setInfluencerData(data)
      } else if (user.role === "brand") {
        const data = await analyticsService.getBrandAnalytics(user.id, period)
        setBrandData(data)
      }
    } catch (error) {
      console.error("Failed to load analytics:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExport = async (format: "pdf" | "csv" | "excel") => {
    if (!user) return

    setIsExporting(true)
    try {
      const filename = await analyticsService.exportAnalytics(user.id, format)
      console.log(`Exported analytics report: ${filename}`)
    } catch (error) {
      console.error("Failed to export analytics:", error)
    } finally {
      setIsExporting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-white/70 mt-2">
            {user?.role === "influencer"
              ? "Track your performance, growth, and campaign success"
              : "Monitor campaign performance, ROI, and influencer metrics"}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32 bg-black/50 border-purple-500/30 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-purple-500/30">
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={() => handleExport("pdf")}
            disabled={isExporting}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Role-specific dashboards */}
      {user?.role === "influencer" && influencerData && <InfluencerAnalyticsDashboard data={influencerData} />}
      {user?.role === "brand" && brandData && <BrandAnalyticsDashboard data={brandData} />}
    </div>
  )
}

interface InfluencerAnalyticsDashboardProps {
  data: InfluencerAnalytics
}

function InfluencerAnalyticsDashboard({ data }: InfluencerAnalyticsDashboardProps) {
  const colors = ["#8b5cf6", "#ec4899", "#06b6d4", "#10b981", "#f59e0b"]

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{data.followerGrowth[0]?.current.toLocaleString()}</p>
                <p className="text-white/60 text-sm">Total Followers</p>
                <p className="text-green-400 text-xs">
                  +{data.followerGrowth[0]?.growth.toLocaleString()} ({data.followerGrowth[0]?.growthRate}%)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-sm border border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Heart className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{data.engagementMetrics.averageEngagementRate}%</p>
                <p className="text-white/60 text-sm">Avg Engagement</p>
                <p className="text-blue-400 text-xs">{data.engagementMetrics.totalLikes.toLocaleString()} likes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-sm border border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  ${data.campaignPerformance.totalEarnings.toLocaleString()}
                </p>
                <p className="text-white/60 text-sm">Total Earnings</p>
                <p className="text-green-400 text-xs">
                  ${data.campaignPerformance.averageEarningsPerCampaign.toLocaleString()} avg
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/20 to-red-900/20 backdrop-blur-sm border border-orange-500/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Target className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{data.campaignPerformance.completedCampaigns}</p>
                <p className="text-white/60 text-sm">Campaigns Done</p>
                <p className="text-orange-400 text-xs">{data.campaignPerformance.averageRating}/5 rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="growth" className="space-y-6">
        <TabsList className="bg-black/50 border border-purple-500/20">
          <TabsTrigger value="growth" className="data-[state=active]:bg-purple-500/20">
            Follower Growth
          </TabsTrigger>
          <TabsTrigger value="demographics" className="data-[state=active]:bg-purple-500/20">
            Audience Insights
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="data-[state=active]:bg-purple-500/20">
            Campaign Performance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="growth" className="space-y-6">
          <Card className="bg-gradient-to-br from-black/40 to-purple-900/20 backdrop-blur-sm border border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Follower Growth Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.followerGrowth[0]?.data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F3F4F6",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="followers"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-black/40 to-purple-900/20 backdrop-blur-sm border border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-xl text-white">Age Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.audienceInsights.demographics.ageGroups}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="percentage"
                        nameKey="range"
                      >
                        {data.audienceInsights.demographics.ageGroups.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                          color: "#F3F4F6",
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-black/40 to-purple-900/20 backdrop-blur-sm border border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-xl text-white">Top Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.audienceInsights.interests}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="category" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                          color: "#F3F4F6",
                        }}
                      />
                      <Bar dataKey="percentage" fill="#ec4899" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <Card className="bg-gradient-to-br from-black/40 to-purple-900/20 backdrop-blur-sm border border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-xl text-white">Top Performing Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.campaignPerformance.topPerformingCampaigns.map((campaign, index) => (
                  <div
                    key={campaign.id}
                    className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-white/10"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{campaign.title}</h4>
                        <p className="text-white/60 text-sm">{campaign.brand}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-white">${campaign.earnings.toLocaleString()}</p>
                      <p className="text-green-400 text-sm">{campaign.roi}% ROI</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface BrandAnalyticsDashboardProps {
  data: BrandAnalytics
}

function BrandAnalyticsDashboard({ data }: BrandAnalyticsDashboardProps) {
  const colors = ["#8b5cf6", "#ec4899", "#06b6d4", "#10b981", "#f59e0b"]

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-sm border border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{data.campaignOverview.totalCampaigns}</p>
                <p className="text-white/60 text-sm">Total Campaigns</p>
                <p className="text-blue-400 text-xs">{data.campaignOverview.activeCampaigns} active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-sm border border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">${data.campaignOverview.totalSpent.toLocaleString()}</p>
                <p className="text-white/60 text-sm">Total Spent</p>
                <p className="text-green-400 text-xs">{data.campaignOverview.averageROI}% avg ROI</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Eye className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {(data.campaignOverview.totalReach / 1000000).toFixed(1)}M
                </p>
                <p className="text-white/60 text-sm">Total Reach</p>
                <p className="text-purple-400 text-xs">
                  {(data.campaignOverview.totalEngagement / 1000).toFixed(0)}K engagement
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/20 to-red-900/20 backdrop-blur-sm border border-orange-500/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Users className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{data.influencerPerformance.totalInfluencers}</p>
                <p className="text-white/60 text-sm">Influencers</p>
                <p className="text-orange-400 text-xs">{data.influencerPerformance.averageRating}/5 rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="bg-black/50 border border-purple-500/20">
          <TabsTrigger value="performance" className="data-[state=active]:bg-purple-500/20">
            Performance Trends
          </TabsTrigger>
          <TabsTrigger value="budget" className="data-[state=active]:bg-purple-500/20">
            Budget Analysis
          </TabsTrigger>
          <TabsTrigger value="influencers" className="data-[state=active]:bg-purple-500/20">
            Top Influencers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-black/40 to-purple-900/20 backdrop-blur-sm border border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-xl text-white">Reach & Engagement Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.performanceMetrics.reachTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                          color: "#F3F4F6",
                        }}
                      />
                      <Area type="monotone" dataKey="reach" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-black/40 to-purple-900/20 backdrop-blur-sm border border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-xl text-white">ROI Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.performanceMetrics.roiTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                          color: "#F3F4F6",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="roi"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="budget" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-black/40 to-purple-900/20 backdrop-blur-sm border border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-xl text-white">Budget Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.budgetAnalysis.categoryBreakdown}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="amount"
                        nameKey="category"
                      >
                        {data.budgetAnalysis.categoryBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                          color: "#F3F4F6",
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-black/40 to-purple-900/20 backdrop-blur-sm border border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-xl text-white">Spending Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.budgetAnalysis.spendingTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                          color: "#F3F4F6",
                        }}
                      />
                      <Area type="monotone" dataKey="amount" stroke="#ec4899" fill="#ec4899" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="influencers" className="space-y-6">
          <Card className="bg-gradient-to-br from-black/40 to-purple-900/20 backdrop-blur-sm border border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-xl text-white">Top Performing Influencers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.influencerPerformance.topPerformers.map((influencer, index) => (
                  <div
                    key={influencer.id}
                    className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-white/10"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{influencer.name}</h4>
                        <p className="text-white/60 text-sm">{influencer.campaigns} campaigns</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-white">{(influencer.totalReach / 1000).toFixed(0)}K reach</p>
                      <p className="text-green-400 text-sm">{influencer.roi}% ROI</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
