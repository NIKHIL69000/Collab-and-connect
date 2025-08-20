"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { CreditCard, DollarSign, TrendingUp, Shield, Clock, CheckCircle, AlertTriangle, Download } from "lucide-react"
import { type Transaction, type EscrowAccount, paymentService } from "@/lib/payments"
import { useAuth } from "@/contexts/auth-context"

export function PaymentDashboard() {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [escrowAccounts, setEscrowAccounts] = useState<EscrowAccount[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadPaymentData()
  }, [])

  const loadPaymentData = async () => {
    try {
      const [txns, escrows] = await Promise.all([paymentService.getTransactions(), paymentService.getEscrowAccounts()])
      setTransactions(txns)
      setEscrowAccounts(escrows)
    } catch (error) {
      console.error("Failed to load payment data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const totalEarnings = transactions
    .filter((t) => t.toUserId === user?.id && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalSpent = transactions
    .filter((t) => t.fromUserId === user?.id && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalEscrow = escrowAccounts.reduce((sum, e) => sum + e.heldAmount, 0)

  const pendingPayments = transactions.filter((t) => t.status === "pending" || t.status === "processing").length

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Payments & Escrow
          </h1>
          <p className="text-white/70 mt-2">Manage your payments, escrow accounts, and financial transactions</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-sm border border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">${totalEarnings.toLocaleString()}</p>
                <p className="text-white/60 text-sm">Total Earnings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-sm border border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">${totalSpent.toLocaleString()}</p>
                <p className="text-white/60 text-sm">Total Spent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">${totalEscrow.toLocaleString()}</p>
                <p className="text-white/60 text-sm">In Escrow</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/20 to-red-900/20 backdrop-blur-sm border border-orange-500/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Clock className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{pendingPayments}</p>
                <p className="text-white/60 text-sm">Pending Payments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="escrow" className="space-y-6">
        <TabsList className="bg-black/50 border border-purple-500/20">
          <TabsTrigger value="escrow" className="data-[state=active]:bg-purple-500/20">
            Escrow Accounts
          </TabsTrigger>
          <TabsTrigger value="transactions" className="data-[state=active]:bg-purple-500/20">
            Transactions
          </TabsTrigger>
          <TabsTrigger value="methods" className="data-[state=active]:bg-purple-500/20">
            Payment Methods
          </TabsTrigger>
        </TabsList>

        <TabsContent value="escrow" className="space-y-6">
          <EscrowAccountsSection escrowAccounts={escrowAccounts} onUpdate={loadPaymentData} />
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <TransactionsSection transactions={transactions} />
        </TabsContent>

        <TabsContent value="methods" className="space-y-6">
          <PaymentMethodsSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface EscrowAccountsSectionProps {
  escrowAccounts: EscrowAccount[]
  onUpdate: () => void
}

function EscrowAccountsSection({ escrowAccounts, onUpdate }: EscrowAccountsSectionProps) {
  const handleReleaseMilestone = async (escrowId: string, milestoneId: string) => {
    try {
      await paymentService.releaseMilestone(escrowId, milestoneId)
      onUpdate()
    } catch (error) {
      console.error("Failed to release milestone:", error)
    }
  }

  const handleDisputeMilestone = async (escrowId: string, milestoneId: string) => {
    try {
      await paymentService.disputeMilestone(escrowId, milestoneId, "Deliverables not met")
      onUpdate()
    } catch (error) {
      console.error("Failed to dispute milestone:", error)
    }
  }

  return (
    <div className="space-y-6">
      {escrowAccounts.map((escrow) => (
        <Card
          key={escrow.id}
          className="bg-gradient-to-br from-black/40 to-purple-900/20 backdrop-blur-sm border border-purple-500/20"
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl text-white">{escrow.campaignTitle}</CardTitle>
                <p className="text-white/70 mt-1">
                  {escrow.brandName} → {escrow.influencerName}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">${escrow.totalAmount.toLocaleString()}</p>
                <Badge
                  variant={
                    escrow.status === "active" ? "default" : escrow.status === "disputed" ? "destructive" : "secondary"
                  }
                  className="mt-1"
                >
                  {escrow.status}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Escrow Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Progress</span>
                <span className="text-white">
                  ${escrow.releasedAmount.toLocaleString()} / ${escrow.totalAmount.toLocaleString()}
                </span>
              </div>
              <Progress value={(escrow.releasedAmount / escrow.totalAmount) * 100} className="h-2 bg-white/10" />
            </div>

            {/* Milestones */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Milestones</h4>
              {escrow.milestones.map((milestone) => (
                <div key={milestone.id} className="p-4 bg-black/30 rounded-lg border border-white/10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h5 className="font-medium text-white">{milestone.title}</h5>
                        <Badge
                          variant={
                            milestone.status === "completed"
                              ? "default"
                              : milestone.status === "disputed"
                                ? "destructive"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {milestone.status}
                        </Badge>
                      </div>
                      <p className="text-white/70 text-sm mb-2">{milestone.description}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {milestone.deliverables.map((deliverable, index) => (
                          <Badge key={index} variant="outline" className="border-white/20 text-white/60 text-xs">
                            {deliverable}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-white/50">Due: {new Date(milestone.dueDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-semibold text-white">${milestone.amount.toLocaleString()}</p>
                      {milestone.status === "in-progress" && milestone.approvalRequired && (
                        <div className="flex space-x-2 mt-2">
                          <Button
                            size="sm"
                            onClick={() => handleReleaseMilestone(escrow.id, milestone.id)}
                            className="bg-green-500 hover:bg-green-600 text-xs"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDisputeMilestone(escrow.id, milestone.id)}
                            className="border-red-500/50 text-red-300 hover:bg-red-500/20 text-xs"
                          >
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Dispute
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {escrowAccounts.length === 0 && (
        <div className="text-center py-12">
          <Shield className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <p className="text-white/60 text-lg">No escrow accounts found</p>
          <p className="text-white/40 mt-2">Escrow accounts will appear here when you start campaigns</p>
        </div>
      )}
    </div>
  )
}

interface TransactionsSectionProps {
  transactions: Transaction[]
}

function TransactionsSection({ transactions }: TransactionsSectionProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400"
      case "processing":
        return "text-yellow-400"
      case "failed":
        return "text-red-400"
      default:
        return "text-white/60"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "processing":
        return <Clock className="w-4 h-4 text-yellow-400" />
      case "failed":
        return <AlertTriangle className="w-4 h-4 text-red-400" />
      default:
        return <Clock className="w-4 h-4 text-white/60" />
    }
  }

  return (
    <Card className="bg-gradient-to-br from-black/40 to-purple-900/20 backdrop-blur-sm border border-purple-500/20">
      <CardHeader>
        <CardTitle className="text-xl text-white">Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-white/10"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">{getStatusIcon(transaction.status)}</div>
                <div>
                  <h4 className="font-medium text-white">{transaction.description}</h4>
                  <p className="text-white/60 text-sm">{transaction.campaignTitle}</p>
                  <p className="text-white/50 text-xs">
                    {new Date(transaction.createdAt).toLocaleDateString()} • {transaction.fromUserName} →{" "}
                    {transaction.toUserName}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-white">
                  {transaction.type === "payment" ? "+" : "-"}${transaction.amount.toLocaleString()}
                </p>
                <p className={`text-sm capitalize ${getStatusColor(transaction.status)}`}>{transaction.status}</p>
                <p className="text-xs text-white/50">Fee: ${transaction.fees.total}</p>
              </div>
            </div>
          ))}
        </div>

        {transactions.length === 0 && (
          <div className="text-center py-12">
            <CreditCard className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <p className="text-white/60 text-lg">No transactions found</p>
            <p className="text-white/40 mt-2">Your payment history will appear here</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function PaymentMethodsSection() {
  return (
    <Card className="bg-gradient-to-br from-black/40 to-purple-900/20 backdrop-blur-sm border border-purple-500/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl text-white">Payment Methods</CardTitle>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
          Add Payment Method
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-white/10">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <CreditCard className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium text-white">Visa •••• 4242</h4>
                <p className="text-white/60 text-sm">Expires 12/25</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-500/20 text-green-300">Default</Badge>
              <Button size="sm" variant="outline" className="border-white/20 text-white/70 bg-transparent">
                Edit
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-white/10">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <CreditCard className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h4 className="font-medium text-white">Chase Bank •••• 1234</h4>
                <p className="text-white/60 text-sm">Checking Account</p>
              </div>
            </div>
            <Button size="sm" variant="outline" className="border-white/20 text-white/70 bg-transparent">
              Edit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
