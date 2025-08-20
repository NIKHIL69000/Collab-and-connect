// Payment and escrow system types and utilities

export interface PaymentMethod {
  id: string
  type: "card" | "bank" | "paypal" | "crypto"
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  bankName?: string
  accountLast4?: string
  email?: string
  isDefault: boolean
  createdAt: string
}

export interface Transaction {
  id: string
  campaignId: string
  campaignTitle: string
  fromUserId: string
  fromUserName: string
  toUserId: string
  toUserName: string
  amount: number
  currency: "USD" | "EUR" | "GBP"
  type: "payment" | "refund" | "fee" | "payout"
  status: "pending" | "processing" | "completed" | "failed" | "cancelled"
  description: string
  createdAt: string
  completedAt?: string
  paymentMethodId?: string
  escrowId?: string
  fees: {
    platformFee: number
    processingFee: number
    total: number
  }
}

export interface EscrowAccount {
  id: string
  campaignId: string
  campaignTitle: string
  brandId: string
  brandName: string
  influencerId: string
  influencerName: string
  totalAmount: number
  heldAmount: number
  releasedAmount: number
  currency: "USD" | "EUR" | "GBP"
  status: "active" | "completed" | "disputed" | "cancelled"
  milestones: EscrowMilestone[]
  createdAt: string
  completedAt?: string
  disputeReason?: string
  disputeStatus?: "open" | "resolved" | "escalated"
}

export interface EscrowMilestone {
  id: string
  title: string
  description: string
  amount: number
  status: "pending" | "in-progress" | "completed" | "disputed"
  dueDate: string
  completedAt?: string
  deliverables: string[]
  approvalRequired: boolean
  isApproved?: boolean
  approvedAt?: string
  approvedBy?: string
}

export interface Invoice {
  id: string
  campaignId: string
  fromUserId: string
  toUserId: string
  amount: number
  currency: "USD" | "EUR" | "GBP"
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled"
  dueDate: string
  items: InvoiceItem[]
  taxes: {
    rate: number
    amount: number
  }
  createdAt: string
  paidAt?: string
}

export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

// Mock data
export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "pm1",
    type: "card",
    last4: "4242",
    brand: "Visa",
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "pm2",
    type: "bank",
    bankName: "Chase Bank",
    accountLast4: "1234",
    isDefault: false,
    createdAt: "2024-01-10T14:30:00Z",
  },
  {
    id: "pm3",
    type: "paypal",
    email: "user@example.com",
    isDefault: false,
    createdAt: "2024-01-05T09:15:00Z",
  },
]

export const mockTransactions: Transaction[] = [
  {
    id: "txn1",
    campaignId: "campaign1",
    campaignTitle: "Summer Tech Fashion Launch",
    fromUserId: "brand1",
    fromUserName: "TechStyle Co.",
    toUserId: "user1",
    toUserName: "Sarah Chen",
    amount: 3500,
    currency: "USD",
    type: "payment",
    status: "completed",
    description: "Campaign payment - Milestone 1",
    createdAt: "2024-01-20T10:00:00Z",
    completedAt: "2024-01-20T10:05:00Z",
    paymentMethodId: "pm1",
    escrowId: "escrow1",
    fees: {
      platformFee: 175,
      processingFee: 105,
      total: 280,
    },
  },
  {
    id: "txn2",
    campaignId: "campaign2",
    campaignTitle: "Fitness Transformation Challenge",
    fromUserId: "brand2",
    fromUserName: "FitLife Nutrition",
    toUserId: "user1",
    toUserName: "Current User",
    amount: 2000,
    currency: "USD",
    type: "payment",
    status: "processing",
    description: "Campaign deposit to escrow",
    createdAt: "2024-01-19T15:30:00Z",
    paymentMethodId: "pm1",
    escrowId: "escrow2",
    fees: {
      platformFee: 100,
      processingFee: 60,
      total: 160,
    },
  },
]

export const mockEscrowAccounts: EscrowAccount[] = [
  {
    id: "escrow1",
    campaignId: "campaign1",
    campaignTitle: "Summer Tech Fashion Launch",
    brandId: "brand1",
    brandName: "TechStyle Co.",
    influencerId: "user1",
    influencerName: "Sarah Chen",
    totalAmount: 5000,
    heldAmount: 1500,
    releasedAmount: 3500,
    currency: "USD",
    status: "active",
    createdAt: "2024-01-15T10:00:00Z",
    milestones: [
      {
        id: "m1",
        title: "Content Creation",
        description: "Create 3 Instagram posts and 5 stories",
        amount: 3500,
        status: "completed",
        dueDate: "2024-01-25T23:59:59Z",
        completedAt: "2024-01-20T16:30:00Z",
        deliverables: ["3 Instagram posts", "5 Instagram stories"],
        approvalRequired: true,
        isApproved: true,
        approvedAt: "2024-01-20T18:00:00Z",
        approvedBy: "TechStyle Co.",
      },
      {
        id: "m2",
        title: "Performance Report",
        description: "Provide engagement metrics and performance analysis",
        amount: 1500,
        status: "in-progress",
        dueDate: "2024-02-01T23:59:59Z",
        deliverables: ["Performance report", "Analytics screenshots"],
        approvalRequired: true,
      },
    ],
  },
  {
    id: "escrow2",
    campaignId: "campaign2",
    campaignTitle: "Fitness Transformation Challenge",
    brandId: "brand2",
    brandName: "FitLife Nutrition",
    influencerId: "user1",
    influencerName: "Current User",
    totalAmount: 2000,
    heldAmount: 2000,
    releasedAmount: 0,
    currency: "USD",
    status: "active",
    createdAt: "2024-01-19T15:30:00Z",
    milestones: [
      {
        id: "m3",
        title: "Week 1-2 Content",
        description: "Daily workout posts and progress updates",
        amount: 1000,
        status: "pending",
        dueDate: "2024-02-05T23:59:59Z",
        deliverables: ["14 workout posts", "2 progress videos"],
        approvalRequired: true,
      },
      {
        id: "m4",
        title: "Week 3-4 Content",
        description: "Continued content creation and final results",
        amount: 1000,
        status: "pending",
        dueDate: "2024-02-19T23:59:59Z",
        deliverables: ["14 workout posts", "Final transformation video"],
        approvalRequired: true,
      },
    ],
  },
]

// Payment service functions
export const paymentService = {
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockPaymentMethods
  },

  async addPaymentMethod(method: Omit<PaymentMethod, "id" | "createdAt">): Promise<PaymentMethod> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const newMethod: PaymentMethod = {
      ...method,
      id: `pm${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    mockPaymentMethods.push(newMethod)
    return newMethod
  },

  async processPayment(
    amount: number,
    paymentMethodId: string,
    campaignId: string,
    description: string,
  ): Promise<Transaction> {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const transaction: Transaction = {
      id: `txn${Date.now()}`,
      campaignId,
      campaignTitle: "Campaign Payment",
      fromUserId: "current-user",
      fromUserName: "Current User",
      toUserId: "recipient",
      toUserName: "Recipient",
      amount,
      currency: "USD",
      type: "payment",
      status: "completed",
      description,
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      paymentMethodId,
      fees: {
        platformFee: Math.round(amount * 0.05),
        processingFee: Math.round(amount * 0.03),
        total: Math.round(amount * 0.08),
      },
    }

    mockTransactions.push(transaction)
    return transaction
  },

  async getTransactions(): Promise<Transaction[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockTransactions
  },

  async getEscrowAccounts(): Promise<EscrowAccount[]> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    return mockEscrowAccounts
  },

  async releaseMilestone(escrowId: string, milestoneId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const escrow = mockEscrowAccounts.find((e) => e.id === escrowId)
    if (escrow) {
      const milestone = escrow.milestones.find((m) => m.id === milestoneId)
      if (milestone) {
        milestone.status = "completed"
        milestone.completedAt = new Date().toISOString()
        milestone.isApproved = true
        milestone.approvedAt = new Date().toISOString()
        escrow.releasedAmount += milestone.amount
        escrow.heldAmount -= milestone.amount
      }
    }
  },

  async disputeMilestone(escrowId: string, milestoneId: string, reason: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 800))

    const escrow = mockEscrowAccounts.find((e) => e.id === escrowId)
    if (escrow) {
      const milestone = escrow.milestones.find((m) => m.id === milestoneId)
      if (milestone) {
        milestone.status = "disputed"
        escrow.status = "disputed"
        escrow.disputeReason = reason
        escrow.disputeStatus = "open"
      }
    }
  },
}
