"use client"

import { useAuth } from "@/contexts/auth-context"
import { CampaignMarketplace } from "@/components/collaboration/campaign-marketplace"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CampaignsPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <CampaignMarketplace />
      </div>
    </div>
  )
}
