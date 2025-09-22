"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Paperclip, Smile, MoreVertical, Phone, Video, Search, AlertCircle } from "lucide-react"
import { type Conversation, type Message, chatService } from "@/lib/chat"
import { useAuth } from "@/contexts/auth-context"

export function ChatInterface() {
  const { user, isAuthenticated } = useAuth()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isAuthenticated && user) {
      loadConversations()
    } else {
      setIsLoading(false)
    }
  }, [isAuthenticated, user])

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation.id)
    }
  }, [selectedConversation])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadConversations = async () => {
    try {
      setError(null)
      const convs = await chatService.getConversations()
      setConversations(convs)
      if (convs.length > 0 && !selectedConversation) {
        setSelectedConversation(convs[0])
      }
    } catch (error) {
      console.error("Failed to load conversations:", error)
      setError("Failed to load conversations. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const loadMessages = async (conversationId: string) => {
    try {
      setError(null)
      const msgs = await chatService.getMessages(conversationId)
      setMessages(msgs)
      await chatService.markAsRead(conversationId)
    } catch (error) {
      console.error("Failed to load messages:", error)
      setError("Failed to load messages. Please try again.")
    }
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || isSending || !user) return

    setIsSending(true)
    try {
      setError(null)
      const message = await chatService.sendMessage(selectedConversation.id, newMessage.trim())
      setMessages((prev) => [...prev, message])
      setNewMessage("")
    } catch (error) {
      console.error("Failed to send message:", error)
      setError("Failed to send message. Please try again.")
    } finally {
      setIsSending(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const filteredConversations = conversations.filter((conv) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      conv.name?.toLowerCase().includes(searchLower) ||
      conv.participants.some((p) => p.userName.toLowerCase().includes(searchLower)) ||
      conv.lastMessage?.content.toLowerCase().includes(searchLower)
    )
  })

  const getConversationName = (conversation: Conversation) => {
    if (conversation.name) return conversation.name
    const otherParticipant = conversation.participants.find((p) => p.userId !== user?.id)
    return otherParticipant?.userName || "Unknown"
  }

  const getConversationAvatar = (conversation: Conversation) => {
    if (conversation.type === "campaign") return "C"
    const otherParticipant = conversation.participants.find((p) => p.userId !== user?.id)
    return otherParticipant?.userName?.charAt(0).toUpperCase() || "?"
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Authentication Required</h3>
          <p className="text-white/60">Please sign in to access the chat interface</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Something went wrong</h3>
          <p className="text-white/60 mb-4">{error}</p>
          <Button
            onClick={() => {
              setError(null)
              loadConversations()
            }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-[600px] bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl overflow-hidden">
      {/* Conversations Sidebar */}
      <div className="w-80 border-r border-purple-500/20 flex flex-col">
        {/* Search Header */}
        <div className="p-4 border-b border-purple-500/20">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/50 border-purple-500/30 text-white"
            />
          </div>
        </div>

        {/* Conversations List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredConversations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-white/60">No conversations found</p>
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`p-3 rounded-lg cursor-pointer transition-all hover:bg-purple-500/10 ${
                    selectedConversation?.id === conversation.id ? "bg-purple-500/20" : ""
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold">
                          {getConversationAvatar(conversation)}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.participants.some((p) => p.isOnline && p.userId !== user?.id) && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-white truncate">{getConversationName(conversation)}</h4>
                        <div className="flex items-center space-x-1">
                          {conversation.unreadCount > 0 && (
                            <Badge className="bg-purple-500 text-white text-xs px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                          <span className="text-xs text-white/50">
                            {conversation.lastMessage &&
                              new Date(conversation.lastMessage.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-white/70 truncate mt-1">
                        {conversation.lastMessage?.content || "No messages yet"}
                      </p>
                      {conversation.type === "campaign" && (
                        <Badge variant="outline" className="border-blue-500/50 text-blue-300 text-xs mt-1">
                          Campaign
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-purple-500/20 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold">
                    {getConversationAvatar(selectedConversation)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-white">{getConversationName(selectedConversation)}</h3>
                  <p className="text-sm text-white/60">
                    {selectedConversation.participants.length} participants
                    {selectedConversation.participants.some((p) => p.isOnline && p.userId !== user?.id) && (
                      <span className="text-green-400 ml-2">• Online</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost" className="text-white/70 hover:text-white">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-white/70 hover:text-white">
                  <Video className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-white/70 hover:text-white">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-white/60">No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      isOwn={message.senderId === user?.id || message.senderId === "current-user"}
                    />
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-purple-500/20">
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost" className="text-white/70 hover:text-white">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="bg-black/50 border-purple-500/30 text-white pr-12"
                    disabled={isSending}
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
                  >
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || isSending}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Select a conversation</h3>
              <p className="text-white/60">Choose a conversation from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

interface MessageBubbleProps {
  message: Message
  isOwn: boolean
}

function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (message.type === "system") {
    return (
      <div className="flex justify-center">
        <div className="bg-white/10 text-white/70 text-sm px-3 py-1 rounded-full">{message.content}</div>
      </div>
    )
  }

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div className={`flex items-end space-x-2 max-w-[70%] ${isOwn ? "flex-row-reverse space-x-reverse" : ""}`}>
        {!isOwn && (
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs">
              {message.senderName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
        <div
          className={`px-4 py-2 rounded-2xl ${
            isOwn
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              : "bg-white/10 text-white border border-white/20"
          }`}
        >
          {!isOwn && <p className="text-xs text-white/70 mb-1">{message.senderName}</p>}
          <p className="text-sm">{message.content}</p>
          <p className={`text-xs mt-1 ${isOwn ? "text-white/80" : "text-white/60"}`}>{formatTime(message.timestamp)}</p>
        </div>
      </div>
    </div>
  )
}
