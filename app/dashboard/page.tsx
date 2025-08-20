"use client"

import { useAuth } from "@/contexts/auth-context"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth()
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
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Welcome to your Dashboard, {user?.name}!
            </h1>
            <p className="text-white/70 text-lg mb-6">
              You're logged in as a <span className="text-purple-400 font-semibold capitalize">{user?.role}</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
              <div
                className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6 hover:bg-purple-500/20 transition-all cursor-pointer"
                onClick={() => router.push("/dashboard/profile")}
              >
                <h3 className="text-xl font-semibold text-purple-300 mb-2">Profile</h3>
                <p className="text-white/60">Manage your profile settings</p>
              </div>

              <div
                className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-6 hover:bg-pink-500/20 transition-all cursor-pointer"
                onClick={() => router.push("/dashboard/campaigns")}
              >
                <h3 className="text-xl font-semibold text-pink-300 mb-2">Campaigns</h3>
                <p className="text-white/60">
                  {user?.role === "influencer" ? "Discover collaborations" : "Manage your campaigns"}
                </p>
              </div>

              <div
                className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 hover:bg-blue-500/20 transition-all cursor-pointer"
                onClick={() => router.push("/dashboard/matching")}
              >
                <h3 className="text-xl font-semibold text-blue-300 mb-2">Smart Matching</h3>
                <p className="text-white/60">AI-powered recommendations</p>
              </div>

              <div
                className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 hover:bg-green-500/20 transition-all cursor-pointer"
                onClick={() => router.push("/dashboard/messages")}
              >
                <h3 className="text-xl font-semibent text-green-300 mb-2">Messages</h3>
                <p className="text-white/60">Chat with collaborators</p>
              </div>

              <div
                className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 hover:bg-yellow-500/20 transition-all cursor-pointer"
                onClick={() => router.push("/dashboard/payments")}
              >
                <h3 className="text-xl font-semibold text-yellow-300 mb-2">Payments</h3>
                <p className="text-white/60">Manage payments & escrow</p>
              </div>

              <div
                className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-6 hover:bg-indigo-500/20 transition-all cursor-pointer"
                onClick={() => router.push("/dashboard/analytics")}
              >
                <h3 className="text-xl font-semibold text-indigo-300 mb-2">Analytics</h3>
                <p className="text-white/60">Performance insights</p>
              </div>

              {user?.role === "admin" && (
                <div
                  className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 hover:bg-red-500/20 transition-all cursor-pointer"
                  onClick={() => router.push("/dashboard/admin")}
                >
                  <h3 className="text-xl font-semibold text-red-300 mb-2">Admin Panel</h3>
                  <p className="text-white/60">Platform management</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
