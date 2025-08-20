"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Users, Target, Star, Heart, MessageCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export function MatchingDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("recommendations")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Smart Matching
          </h1>
          <p className="text-white/70 mt-2">AI-powered recommendations tailored to your profile and preferences</p>
        </div>
      </div>

      {/* Matching Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">87%</p>
                <p className="text-white/60 text-sm">Avg Match Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm border border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">24</p>
                <p className="text-white/60 text-sm">Active Matches</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/20 to-blue-900/20 backdrop-blur-sm border border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">12</p>
                <p className="text-white/60 text-sm">Mutual Interests</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-900/20 to-red-900/20 backdrop-blur-sm border border-pink-500/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-pink-500/20 rounded-lg">
                <Star className="w-6 h-6 text-pink-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">4.9</p>
                <p className="text-white/60 text-sm">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Matching Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-black/50 border border-purple-500/20">
          <TabsTrigger value="recommendations" className="data-[state=active]:bg-purple-500/20">
            AI Recommendations
          </TabsTrigger>
          <TabsTrigger value="mutual" className="data-[state=active]:bg-purple-500/20">
            Mutual Interests
          </TabsTrigger>
          <TabsTrigger value="saved" className="data-[state=active]:bg-purple-500/20">
            Saved Matches
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-6">
          <RecommendationsSection />
        </TabsContent>

        <TabsContent value="mutual" className="space-y-6">
          <MutualInterestsSection />
        </TabsContent>

        <TabsContent value="saved" className="space-y-6">
          <SavedMatchesSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function RecommendationsSection() {
  const recommendations = [
    {
      id: "1",
      type: "brand",
      name: "EcoStyle Fashion",
      matchScore: 94,
      reason: "Perfect audience alignment and sustainable fashion focus",
      avatar: "E",
      tags: ["Fashion", "Sustainability", "Lifestyle"],
      budget: "$3K - $8K",
      followers: "50K+",
    },
    {
      id: "2",
      type: "influencer",
      name: "Sarah Chen",
      matchScore: 89,
      reason: "Similar content style and engaged audience",
      avatar: "S",
      tags: ["Beauty", "Skincare", "Wellness"],
      budget: "$2K - $5K",
      followers: "75K",
    },
    {
      id: "3",
      type: "brand",
      name: "TechGear Pro",
      matchScore: 87,
      reason: "Tech-savvy audience and product alignment",
      avatar: "T",
      tags: ["Tech", "Gaming", "Reviews"],
      budget: "$4K - $10K",
      followers: "25K+",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recommendations.map((rec) => (
        <Card
          key={rec.id}
          className="bg-gradient-to-br from-black/40 to-purple-900/20 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-all"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                  {rec.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{rec.name}</h3>
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 text-xs">
                    {rec.type}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-400">{rec.matchScore}%</div>
                <div className="text-xs text-white/50">Match</div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-white/80 text-sm">{rec.reason}</p>

            <div className="flex flex-wrap gap-1">
              {rec.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="border-white/20 text-white/60 text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="space-y-2 text-sm text-white/70">
              <div>Budget: {rec.budget}</div>
              <div>Followers: {rec.followers}</div>
            </div>

            <div className="flex space-x-2">
              <Button
                size="sm"
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Heart className="w-4 h-4 mr-1" />
                Connect
              </Button>
              <Button size="sm" variant="outline" className="border-purple-500/50 text-purple-300 bg-transparent">
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function MutualInterestsSection() {
  return (
    <div className="text-center py-12">
      <p className="text-white/60 text-lg">No mutual interests yet.</p>
      <p className="text-white/40 mt-2">Start connecting with brands and influencers to see mutual interests here.</p>
    </div>
  )
}

function SavedMatchesSection() {
  return (
    <div className="text-center py-12">
      <p className="text-white/60 text-lg">No saved matches yet.</p>
      <p className="text-white/40 mt-2">Save interesting matches to review them later.</p>
    </div>
  )
}
