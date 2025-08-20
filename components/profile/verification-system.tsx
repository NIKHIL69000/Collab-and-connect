"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, Shield, Mail, Instagram, Youtube, Twitter } from "lucide-react"

interface VerificationStatus {
  email: boolean
  phone: boolean
  identity: boolean
  socialMedia: {
    instagram: boolean
    youtube: boolean
    twitter: boolean
  }
}

export function VerificationSystem() {
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>({
    email: true,
    phone: false,
    identity: false,
    socialMedia: {
      instagram: false,
      youtube: false,
      twitter: false,
    },
  })

  const [isVerifying, setIsVerifying] = useState<string | null>(null)

  const handleVerification = async (type: string) => {
    setIsVerifying(type)
    // Simulate verification process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (type === "phone") {
      setVerificationStatus((prev) => ({ ...prev, phone: true }))
    } else if (type === "identity") {
      setVerificationStatus((prev) => ({ ...prev, identity: true }))
    } else if (type.startsWith("social-")) {
      const platform = type.replace("social-", "") as keyof typeof verificationStatus.socialMedia
      setVerificationStatus((prev) => ({
        ...prev,
        socialMedia: { ...prev.socialMedia, [platform]: true },
      }))
    }

    setIsVerifying(null)
  }

  const getVerificationIcon = (isVerified: boolean, isLoading: boolean) => {
    if (isLoading) return <Clock className="w-4 h-4 text-yellow-400 animate-spin" />
    if (isVerified) return <CheckCircle className="w-4 h-4 text-green-400" />
    return <XCircle className="w-4 h-4 text-red-400" />
  }

  const getVerificationBadge = (isVerified: boolean, isLoading: boolean) => {
    if (isLoading) return <Badge className="bg-yellow-500/20 text-yellow-300">Verifying...</Badge>
    if (isVerified) return <Badge className="bg-green-500/20 text-green-300">Verified</Badge>
    return (
      <Badge variant="outline" className="border-red-500/50 text-red-300">
        Unverified
      </Badge>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm border border-blue-500/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-300 flex items-center">
          <Shield className="w-6 h-6 mr-2" />
          Account Verification
        </CardTitle>
        <p className="text-white/70">Verify your account to build trust and unlock premium features</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Email Verification */}
        <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-white/10">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-blue-400" />
            <div>
              <h4 className="font-semibold text-white">Email Verification</h4>
              <p className="text-white/60 text-sm">Verify your email address</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getVerificationIcon(verificationStatus.email, isVerifying === "email")}
            {getVerificationBadge(verificationStatus.email, isVerifying === "email")}
          </div>
        </div>

        {/* Phone Verification */}
        <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center text-xs font-bold text-black">
              #
            </div>
            <div>
              <h4 className="font-semibold text-white">Phone Verification</h4>
              <p className="text-white/60 text-sm">Verify your phone number</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getVerificationIcon(verificationStatus.phone, isVerifying === "phone")}
            {!verificationStatus.phone && (
              <Button
                size="sm"
                onClick={() => handleVerification("phone")}
                disabled={isVerifying === "phone"}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Verify
              </Button>
            )}
            {getVerificationBadge(verificationStatus.phone, isVerifying === "phone")}
          </div>
        </div>

        {/* Identity Verification */}
        <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-white/10">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-purple-400" />
            <div>
              <h4 className="font-semibold text-white">Identity Verification</h4>
              <p className="text-white/60 text-sm">Upload government ID for premium features</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getVerificationIcon(verificationStatus.identity, isVerifying === "identity")}
            {!verificationStatus.identity && (
              <Button
                size="sm"
                onClick={() => handleVerification("identity")}
                disabled={isVerifying === "identity"}
                className="bg-purple-500 hover:bg-purple-600"
              >
                Upload ID
              </Button>
            )}
            {getVerificationBadge(verificationStatus.identity, isVerifying === "identity")}
          </div>
        </div>

        {/* Social Media Verification */}
        <div className="space-y-3">
          <h4 className="font-semibold text-white">Social Media Verification</h4>

          {Object.entries(verificationStatus.socialMedia).map(([platform, isVerified]) => (
            <div
              key={platform}
              className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-white/10"
            >
              <div className="flex items-center space-x-3">
                {platform === "instagram" && <Instagram className="w-5 h-5 text-pink-400" />}
                {platform === "youtube" && <Youtube className="w-5 h-5 text-red-400" />}
                {platform === "twitter" && <Twitter className="w-5 h-5 text-blue-400" />}
                <div>
                  <h5 className="font-medium text-white capitalize">{platform}</h5>
                  <p className="text-white/60 text-sm">Connect and verify your {platform} account</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getVerificationIcon(isVerified, isVerifying === `social-${platform}`)}
                {!isVerified && (
                  <Button
                    size="sm"
                    onClick={() => handleVerification(`social-${platform}`)}
                    disabled={isVerifying === `social-${platform}`}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    Connect
                  </Button>
                )}
                {getVerificationBadge(isVerified, isVerifying === `social-${platform}`)}
              </div>
            </div>
          ))}
        </div>

        {/* Verification Benefits */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
          <h4 className="font-semibold text-white mb-2">Verification Benefits</h4>
          <ul className="text-white/70 text-sm space-y-1">
            <li>• Increased trust from brands and collaborators</li>
            <li>• Access to premium collaboration opportunities</li>
            <li>• Higher visibility in search results</li>
            <li>• Priority customer support</li>
            <li>• Reduced transaction fees</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
