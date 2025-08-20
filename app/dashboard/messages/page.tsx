"use client"

import { useAuth } from "@/contexts/auth-context"
import { ChatInterface } from "@/components/chat/chat-interface"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function MessagesPage() {
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
        <div className="mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Messages
          </h1>
          <p className="text-white/70 mt-2">Connect and collaborate with brands and influencers</p>
        </div>
        <ChatInterface />
      </div>
    </div>
  )
}
