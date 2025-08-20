"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, Instagram, Youtube, Twitter } from "lucide-react"
import { PortfolioManager } from "./portfolio-manager"
import { VerificationSystem } from "./verification-system"

export function ProfileForm() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    location: user?.location || "",
    website: user?.website || "",
    phone: user?.phone || "",
  })

  const handleSave = async () => {
    // TODO: Implement profile update API call
    console.log("Saving profile:", formData)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      {/* Basic Profile Information */}
      <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Profile Information
          </CardTitle>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant="outline"
            className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold text-white">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              {isEditing && (
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-purple-500 hover:bg-purple-600"
                >
                  <Upload className="w-4 h-4" />
                </Button>
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">{user?.name}</h3>
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 capitalize">
                {user?.role}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Name</label>
              {isEditing ? (
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-black/50 border-purple-500/30 text-white"
                />
              ) : (
                <p className="text-white">{formData.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Email</label>
              <p className="text-white/80">{user?.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Location</label>
              {isEditing ? (
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="bg-black/50 border-purple-500/30 text-white"
                  placeholder="City, Country"
                />
              ) : (
                <p className="text-white">{formData.location || "Not specified"}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Website</label>
              {isEditing ? (
                <Input
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="bg-black/50 border-purple-500/30 text-white"
                  placeholder="https://yourwebsite.com"
                />
              ) : (
                <p className="text-white">{formData.website || "Not specified"}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Bio</label>
            {isEditing ? (
              <Textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="bg-black/50 border-purple-500/30 text-white"
                placeholder="Tell us about yourself..."
                rows={4}
              />
            ) : (
              <p className="text-white">{formData.bio || "No bio added yet"}</p>
            )}
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-2">
              <Button
                onClick={() => setIsEditing(false)}
                variant="outline"
                className="border-gray-500/50 text-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Save Changes
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Verification System */}
      <VerificationSystem />

      {/* Role-specific profile sections */}
      {user?.role === "influencer" && (
        <>
          <InfluencerProfileSection />
          <PortfolioManager />
        </>
      )}
      {user?.role === "brand" && <BrandProfileSection />}
      {user?.role === "admin" && <AdminProfileSection />}
    </div>
  )
}

function InfluencerProfileSection() {
  const [socialMedia, setSocialMedia] = useState({
    instagram: { username: "", followers: 0, verified: false },
    youtube: { username: "", subscribers: 0, verified: false },
    twitter: { username: "", followers: 0, verified: false },
  })

  return (
    <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm border border-blue-500/20">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-blue-300">Influencer Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Social Media Accounts */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Social Media Accounts</h4>
          <div className="space-y-4">
            {Object.entries(socialMedia).map(([platform, data]) => (
              <div
                key={platform}
                className="flex items-center space-x-4 p-4 bg-black/30 rounded-lg border border-white/10"
              >
                <div className="flex items-center space-x-2">
                  {platform === "instagram" && <Instagram className="w-5 h-5 text-pink-400" />}
                  {platform === "youtube" && <Youtube className="w-5 h-5 text-red-400" />}
                  {platform === "twitter" && <Twitter className="w-5 h-5 text-blue-400" />}
                  <span className="capitalize text-white font-medium">{platform}</span>
                </div>
                <Input
                  placeholder={`@${platform}username`}
                  value={data.username}
                  onChange={(e) =>
                    setSocialMedia({
                      ...socialMedia,
                      [platform]: { ...data, username: e.target.value },
                    })
                  }
                  className="bg-black/50 border-white/20 text-white flex-1"
                />
                <Input
                  type="number"
                  placeholder="Followers"
                  value={data.followers || ""}
                  onChange={(e) =>
                    setSocialMedia({
                      ...socialMedia,
                      [platform]: { ...data, followers: Number.parseInt(e.target.value) || 0 },
                    })
                  }
                  className="bg-black/50 border-white/20 text-white w-32"
                />
                <Badge variant={data.verified ? "default" : "secondary"}>
                  {data.verified ? "Verified" : "Unverified"}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Content Categories */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Content Categories</h4>
          <div className="flex flex-wrap gap-2">
            {["Fashion", "Beauty", "Lifestyle", "Tech", "Travel", "Food", "Fitness", "Gaming"].map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="border-blue-500/50 text-blue-300 hover:bg-blue-500/20 cursor-pointer"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Rates */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Rates (USD)</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Post Rate</label>
              <Input type="number" placeholder="$0" className="bg-black/50 border-white/20 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Story Rate</label>
              <Input type="number" placeholder="$0" className="bg-black/50 border-white/20 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Video Rate</label>
              <Input type="number" placeholder="$0" className="bg-black/50 border-white/20 text-white" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function BrandProfileSection() {
  return (
    <Card className="bg-gradient-to-br from-green-900/20 to-blue-900/20 backdrop-blur-sm border border-green-500/20">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-green-300">Brand Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Company Name</label>
            <Input className="bg-black/50 border-white/20 text-white" placeholder="Your Company" />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Industry</label>
            <Input className="bg-black/50 border-white/20 text-white" placeholder="e.g., Fashion, Tech" />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Company Size</label>
            <Input className="bg-black/50 border-white/20 text-white" placeholder="e.g., 1-10 employees" />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Budget Range</label>
            <div className="flex space-x-2">
              <Input className="bg-black/50 border-white/20 text-white" placeholder="Min $" />
              <Input className="bg-black/50 border-white/20 text-white" placeholder="Max $" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">Company Description</label>
          <Textarea
            className="bg-black/50 border-white/20 text-white"
            placeholder="Describe your company and what you do..."
            rows={4}
          />
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Campaign Types</h4>
          <div className="flex flex-wrap gap-2">
            {["Product Launch", "Brand Awareness", "Event Promotion", "Content Creation", "Reviews"].map((type) => (
              <Badge
                key={type}
                variant="outline"
                className="border-green-500/50 text-green-300 hover:bg-green-500/20 cursor-pointer"
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function AdminProfileSection() {
  return (
    <Card className="bg-gradient-to-br from-red-900/20 to-orange-900/20 backdrop-blur-sm border border-red-500/20">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-red-300">Admin Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">Department</label>
          <Input className="bg-black/50 border-white/20 text-white" placeholder="e.g., Operations, Support" />
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Permissions</h4>
          <div className="flex flex-wrap gap-2">
            {["User Management", "Content Moderation", "Analytics", "System Settings", "Support"].map((permission) => (
              <Badge
                key={permission}
                variant="outline"
                className="border-red-500/50 text-red-300 hover:bg-red-500/20 cursor-pointer"
              >
                {permission}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
