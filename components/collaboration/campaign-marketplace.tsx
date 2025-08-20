"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Search, Calendar, DollarSign, Users, Send } from "lucide-react"
import { mockCampaigns, getMatchingCampaigns, type Campaign, type MatchingScore } from "@/lib/matching"
import { useAuth } from "@/contexts/auth-context"

export function CampaignMarketplace() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [budgetRange, setBudgetRange] = useState("all")
  const [campaigns] = useState(() => {
    if (user?.role === "influencer") {
      return getMatchingCampaigns(user)
    }
    return mockCampaigns.map((campaign) => ({ ...campaign, matchingScore: null }))
  })

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.brandName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory =
      selectedCategory === "all" || campaign.category.toLowerCase() === selectedCategory.toLowerCase()

    const matchesBudget =
      budgetRange === "all" ||
      (budgetRange === "1000-5000" && campaign.budget.max <= 5000) ||
      (budgetRange === "5000-10000" && campaign.budget.min >= 5000 && campaign.budget.max <= 10000) ||
      (budgetRange === "10000+" && campaign.budget.min >= 10000)

    return matchesSearch && matchesCategory && matchesBudget
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {user?.role === "influencer" ? "Discover Campaigns" : "Campaign Marketplace"}
          </h1>
          <p className="text-white/70 mt-2">
            {user?.role === "influencer"
              ? "Find the perfect brand collaborations tailored to your audience"
              : "Browse all active campaigns and collaboration opportunities"}
          </p>
        </div>
        {user?.role === "brand" && (
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            Create Campaign
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
              <Input
                placeholder="Search campaigns, brands, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black/50 border-purple-500/30 text-white"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48 bg-black/50 border-purple-500/30 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-purple-500/30">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="fitness">Fitness</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="tech">Tech</SelectItem>
                <SelectItem value="beauty">Beauty</SelectItem>
                <SelectItem value="food">Food</SelectItem>
              </SelectContent>
            </Select>
            <Select value={budgetRange} onValueChange={setBudgetRange}>
              <SelectTrigger className="w-full md:w-48 bg-black/50 border-purple-500/30 text-white">
                <SelectValue placeholder="Budget Range" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-purple-500/30">
                <SelectItem value="all">All Budgets</SelectItem>
                <SelectItem value="1000-5000">$1K - $5K</SelectItem>
                <SelectItem value="5000-10000">$5K - $10K</SelectItem>
                <SelectItem value="10000+">$10K+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Campaign Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            matchingScore={campaign.matchingScore}
            userRole={user?.role}
          />
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/60 text-lg">No campaigns found matching your criteria.</p>
          <p className="text-white/40 mt-2">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  )
}

interface CampaignCardProps {
  campaign: Campaign & { matchingScore?: MatchingScore | null }
  matchingScore?: MatchingScore | null
  userRole?: string
}

function CampaignCard({ campaign, matchingScore, userRole }: CampaignCardProps) {
  const [isApplying, setIsApplying] = useState(false)
  const [applicationData, setApplicationData] = useState({
    proposedRate: "",
    message: "",
  })

  const handleApply = () => {
    // TODO: Implement application submission
    console.log("Applying to campaign:", campaign.id, applicationData)
    setIsApplying(false)
    setApplicationData({ proposedRate: "", message: "" })
  }

  const getMatchingColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <Card className="bg-gradient-to-br from-black/40 to-purple-900/20 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-all group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
              {campaign.brandName.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                {campaign.title}
              </h3>
              <p className="text-white/60 text-sm">{campaign.brandName}</p>
            </div>
          </div>
          {matchingScore && (
            <div className="text-right">
              <div className={`text-lg font-bold ${getMatchingColor(matchingScore.overall)}`}>
                {matchingScore.overall}%
              </div>
              <div className="text-xs text-white/50">Match</div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-white/80 text-sm line-clamp-3">{campaign.description}</p>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
            {campaign.category}
          </Badge>
          {campaign.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="border-white/20 text-white/60 text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center text-white/70">
            <DollarSign className="w-4 h-4 mr-2 text-green-400" />${campaign.budget.min.toLocaleString()} - $
            {campaign.budget.max.toLocaleString()}
          </div>
          <div className="flex items-center text-white/70">
            <Users className="w-4 h-4 mr-2 text-blue-400" />
            {campaign.requirements.minFollowers.toLocaleString()}+ followers
          </div>
          <div className="flex items-center text-white/70">
            <Calendar className="w-4 h-4 mr-2 text-purple-400" />
            Apply by {new Date(campaign.timeline.applicationDeadline).toLocaleDateString()}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-white/50">{campaign.applicationsCount} applications</div>

          {userRole === "influencer" && (
            <Dialog open={isApplying} onOpenChange={setIsApplying}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Apply Now
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-black/90 border border-purple-500/30 text-white">
                <DialogHeader>
                  <DialogTitle className="text-purple-300">Apply to Campaign</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">{campaign.title}</h4>
                    <p className="text-white/70 text-sm">{campaign.brandName}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Proposed Rate (USD)</label>
                    <Input
                      type="number"
                      placeholder="Enter your rate"
                      value={applicationData.proposedRate}
                      onChange={(e) => setApplicationData({ ...applicationData, proposedRate: e.target.value })}
                      className="bg-black/50 border-purple-500/30 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Application Message</label>
                    <Textarea
                      placeholder="Tell the brand why you're perfect for this campaign..."
                      value={applicationData.message}
                      onChange={(e) => setApplicationData({ ...applicationData, message: e.target.value })}
                      className="bg-black/50 border-purple-500/30 text-white"
                      rows={4}
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsApplying(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleApply} className="bg-purple-500 hover:bg-purple-600">
                      <Send className="w-4 h-4 mr-2" />
                      Submit Application
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {matchingScore && userRole === "influencer" && (
          <div className="border-t border-white/10 pt-3 mt-3">
            <div className="text-xs text-white/60 mb-2">Compatibility Breakdown:</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-white/50">Audience:</span>
                <span className={getMatchingColor(matchingScore.audienceMatch)}>{matchingScore.audienceMatch}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Content:</span>
                <span className={getMatchingColor(matchingScore.contentMatch)}>{matchingScore.contentMatch}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Budget:</span>
                <span className={getMatchingColor(matchingScore.budgetMatch)}>{matchingScore.budgetMatch}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Engagement:</span>
                <span className={getMatchingColor(matchingScore.engagementMatch)}>
                  {matchingScore.engagementMatch}%
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
