// Chat and messaging system types and utilities

export interface Message {
  id: string
  conversationId: string
  senderId: string
  senderName: string
  senderAvatar?: string
  content: string
  type: "text" | "image" | "file" | "system"
  timestamp: string
  isRead: boolean
  reactions?: MessageReaction[]
  replyTo?: string
  attachments?: MessageAttachment[]
}

export interface MessageReaction {
  emoji: string
  userId: string
  userName: string
}

export interface MessageAttachment {
  id: string
  name: string
  url: string
  type: "image" | "document" | "video" | "audio"
  size: number
}

export interface Conversation {
  id: string
  type: "direct" | "group" | "campaign"
  name?: string
  participants: ConversationParticipant[]
  lastMessage?: Message
  unreadCount: number
  createdAt: string
  updatedAt: string
  campaignId?: string
  isArchived: boolean
}

export interface ConversationParticipant {
  userId: string
  userName: string
  userAvatar?: string
  role: "influencer" | "brand" | "admin"
  isOnline: boolean
  lastSeen: string
  joinedAt: string
}

export interface TypingIndicator {
  conversationId: string
  userId: string
  userName: string
  timestamp: string
}

// Mock data for conversations
export const mockConversations: Conversation[] = [
  {
    id: "conv1",
    type: "direct",
    participants: [
      {
        userId: "user1",
        userName: "Sarah Chen",
        role: "influencer",
        isOnline: true,
        lastSeen: new Date().toISOString(),
        joinedAt: "2024-01-15T10:00:00Z",
      },
      {
        userId: "user2",
        userName: "TechStyle Co.",
        role: "brand",
        isOnline: false,
        lastSeen: "2024-01-20T15:30:00Z",
        joinedAt: "2024-01-15T10:00:00Z",
      },
    ],
    lastMessage: {
      id: "msg1",
      conversationId: "conv1",
      senderId: "user1",
      senderName: "Sarah Chen",
      content: "Thanks for the campaign details! I'm excited to work together.",
      type: "text",
      timestamp: "2024-01-20T16:45:00Z",
      isRead: false,
    },
    unreadCount: 2,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T16:45:00Z",
    isArchived: false,
  },
  {
    id: "conv2",
    type: "campaign",
    name: "Summer Tech Fashion Launch",
    campaignId: "campaign1",
    participants: [
      {
        userId: "user1",
        userName: "Sarah Chen",
        role: "influencer",
        isOnline: true,
        lastSeen: new Date().toISOString(),
        joinedAt: "2024-01-16T09:00:00Z",
      },
      {
        userId: "user2",
        userName: "TechStyle Co.",
        role: "brand",
        isOnline: false,
        lastSeen: "2024-01-20T14:20:00Z",
        joinedAt: "2024-01-16T09:00:00Z",
      },
      {
        userId: "user3",
        userName: "Alex Rodriguez",
        role: "influencer",
        isOnline: true,
        lastSeen: new Date().toISOString(),
        joinedAt: "2024-01-16T11:30:00Z",
      },
    ],
    lastMessage: {
      id: "msg2",
      conversationId: "conv2",
      senderId: "user2",
      senderName: "TechStyle Co.",
      content: "Great work everyone! The campaign launch is scheduled for next week.",
      type: "text",
      timestamp: "2024-01-20T14:20:00Z",
      isRead: true,
    },
    unreadCount: 0,
    createdAt: "2024-01-16T09:00:00Z",
    updatedAt: "2024-01-20T14:20:00Z",
    isArchived: false,
  },
  {
    id: "conv3",
    type: "direct",
    participants: [
      {
        userId: "user1",
        userName: "FitLife Nutrition",
        role: "brand",
        isOnline: false,
        lastSeen: "2024-01-19T18:45:00Z",
        joinedAt: "2024-01-18T14:00:00Z",
      },
      {
        userId: "user2",
        userName: "Current User",
        role: "influencer",
        isOnline: true,
        lastSeen: new Date().toISOString(),
        joinedAt: "2024-01-18T14:00:00Z",
      },
    ],
    lastMessage: {
      id: "msg3",
      conversationId: "conv3",
      senderId: "user1",
      senderName: "FitLife Nutrition",
      content: "We'd love to discuss a potential collaboration opportunity with you!",
      type: "text",
      timestamp: "2024-01-19T18:45:00Z",
      isRead: true,
    },
    unreadCount: 0,
    createdAt: "2024-01-18T14:00:00Z",
    updatedAt: "2024-01-19T18:45:00Z",
    isArchived: false,
  },
]

// Mock messages for conversations
export const mockMessages: Record<string, Message[]> = {
  conv1: [
    {
      id: "msg1-1",
      conversationId: "conv1",
      senderId: "user2",
      senderName: "TechStyle Co.",
      content:
        "Hi Sarah! We came across your profile and love your tech-fashion content. We have an exciting campaign opportunity for you.",
      type: "text",
      timestamp: "2024-01-20T10:00:00Z",
      isRead: true,
    },
    {
      id: "msg1-2",
      conversationId: "conv1",
      senderId: "user1",
      senderName: "Sarah Chen",
      content: "Hi! Thank you for reaching out. I'd love to hear more about the campaign!",
      type: "text",
      timestamp: "2024-01-20T10:15:00Z",
      isRead: true,
    },
    {
      id: "msg1-3",
      conversationId: "conv1",
      senderId: "user2",
      senderName: "TechStyle Co.",
      content:
        "Perfect! We're launching a new smart clothing line and think your audience would be perfect. The campaign budget is $3,000-$5,000.",
      type: "text",
      timestamp: "2024-01-20T10:30:00Z",
      isRead: true,
    },
    {
      id: "msg1-4",
      conversationId: "conv1",
      senderId: "user1",
      senderName: "Sarah Chen",
      content: "Thanks for the campaign details! I'm excited to work together.",
      type: "text",
      timestamp: "2024-01-20T16:45:00Z",
      isRead: false,
    },
  ],
  conv2: [
    {
      id: "msg2-1",
      conversationId: "conv2",
      senderId: "system",
      senderName: "System",
      content: "Campaign chat created for Summer Tech Fashion Launch",
      type: "system",
      timestamp: "2024-01-16T09:00:00Z",
      isRead: true,
    },
    {
      id: "msg2-2",
      conversationId: "conv2",
      senderId: "user2",
      senderName: "TechStyle Co.",
      content: "Welcome to the campaign chat! Looking forward to working with both of you.",
      type: "text",
      timestamp: "2024-01-16T09:05:00Z",
      isRead: true,
    },
    {
      id: "msg2-3",
      conversationId: "conv2",
      senderId: "user1",
      senderName: "Sarah Chen",
      content: "Excited to be part of this campaign! 🚀",
      type: "text",
      timestamp: "2024-01-16T09:10:00Z",
      isRead: true,
    },
    {
      id: "msg2-4",
      conversationId: "conv2",
      senderId: "user3",
      senderName: "Alex Rodriguez",
      content: "Same here! Can't wait to see what we create together.",
      type: "text",
      timestamp: "2024-01-16T11:35:00Z",
      isRead: true,
    },
    {
      id: "msg2-5",
      conversationId: "conv2",
      senderId: "user2",
      senderName: "TechStyle Co.",
      content: "Great work everyone! The campaign launch is scheduled for next week.",
      type: "text",
      timestamp: "2024-01-20T14:20:00Z",
      isRead: true,
    },
  ],
  conv3: [
    {
      id: "msg3-1",
      conversationId: "conv3",
      senderId: "user1",
      senderName: "FitLife Nutrition",
      content: "Hi there! We've been following your fitness content and are impressed by your engagement rates.",
      type: "text",
      timestamp: "2024-01-19T18:30:00Z",
      isRead: true,
    },
    {
      id: "msg3-2",
      conversationId: "conv3",
      senderId: "user1",
      senderName: "FitLife Nutrition",
      content: "We'd love to discuss a potential collaboration opportunity with you!",
      type: "text",
      timestamp: "2024-01-19T18:45:00Z",
      isRead: true,
    },
  ],
}

// Chat service functions
export const chatService = {
  async getConversations(): Promise<Conversation[]> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockConversations
  },

  async getMessages(conversationId: string): Promise<Message[]> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockMessages[conversationId] || []
  },

  async sendMessage(
    conversationId: string,
    content: string,
    type: "text" | "image" | "file" = "text",
  ): Promise<Message> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 200))

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: "current-user",
      senderName: "You",
      content,
      type,
      timestamp: new Date().toISOString(),
      isRead: false,
    }

    // Add to mock messages
    if (!mockMessages[conversationId]) {
      mockMessages[conversationId] = []
    }
    mockMessages[conversationId].push(newMessage)

    return newMessage
  },

  async markAsRead(conversationId: string): Promise<void> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 100))

    // Update conversation unread count
    const conversation = mockConversations.find((c) => c.id === conversationId)
    if (conversation) {
      conversation.unreadCount = 0
    }
  },
}
