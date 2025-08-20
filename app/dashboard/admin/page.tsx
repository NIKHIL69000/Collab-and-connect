"use client"

import { useAuth } from "@/contexts/auth-context"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Users,
  Shield,
  DollarSign,
  BarChart3,
  Settings,
  Search,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Activity,
} from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "influencer" | "brand" | "admin"
  status: "active" | "suspended" | "pending"
  joinDate: string
  lastActive: string
  avatar: string
  verified: boolean
}

interface Campaign {
  id: string
  title: string
  brand: string
  status: "pending" | "approved" | "rejected" | "active" | "completed"
  budget: number
  createdAt: string
  flagged: boolean
}

interface Transaction {
  id: string
  amount: number
  type: "payment" | "escrow" | "refund"
  status: "completed" | "pending" | "failed"
  date: string
  from: string
  to: string
}

export default function AdminPanel() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data
  const [users] = useState<User[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "influencer",
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "2024-01-20",
      avatar: "/diverse-influencer.png",
      verified: true,
    },
    {
      id: "2",
      name: "Nike Brand",
      email: "marketing@nike.com",
      role: "brand",
      status: "active",
      joinDate: "2024-01-10",
      lastActive: "2024-01-19",
      avatar: "/nike-logo.png",
      verified: true,
    },
    {
      id: "3",
      name: "John Doe",
      email: "john@example.com",
      role: "influencer",
      status: "pending",
      joinDate: "2024-01-18",
      lastActive: "2024-01-18",
      avatar: "/john-influencer.png",
      verified: false,
    },
  ])

  const [campaigns] = useState<Campaign[]>([
    {
      id: "1",
      title: "Summer Fashion Campaign",
      brand: "Nike",
      status: "pending",
      budget: 5000,
      createdAt: "2024-01-19",
      flagged: false,
    },
    {
      id: "2",
      title: "Tech Product Launch",
      brand: "Apple",
      status: "approved",
      budget: 10000,
      createdAt: "2024-01-18",
      flagged: true,
    },
  ])

  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      amount: 2500,
      type: "payment",
      status: "completed",
      date: "2024-01-19",
      from: "Nike",
      to: "Sarah Johnson",
    },
    {
      id: "2",
      amount: 5000,
      type: "escrow",
      status: "pending",
      date: "2024-01-18",
      from: "Apple",
      to: "Escrow Account",
    },
  ])

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "admin")) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isLoading, user, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
      </div>
    )
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return null
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-500/20 text-green-400 border-green-500/50",
      pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
      suspended: "bg-red-500/20 text-red-400 border-red-500/50",
      approved: "bg-green-500/20 text-green-400 border-green-500/50",
      rejected: "bg-red-500/20 text-red-400 border-red-500/50",
      completed: "bg-blue-500/20 text-blue-400 border-blue-500/50",
      failed: "bg-red-500/20 text-red-400 border-red-500/50",
    }
    return variants[status as keyof typeof variants] || "bg-gray-500/20 text-gray-400 border-gray-500/50"
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-2">
              Admin Panel
            </h1>
            <p className="text-white/70">Manage users, content, and platform settings</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="glass border-border/50 bg-background/50 backdrop-blur-sm">
              <TabsTrigger value="overview" className="data-[state=active]:bg-red-500/20">
                <BarChart3 className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-red-500/20">
                <Users className="w-4 h-4 mr-2" />
                Users
              </TabsTrigger>
              <TabsTrigger value="content" className="data-[state=active]:bg-red-500/20">
                <Shield className="w-4 h-4 mr-2" />
                Content
              </TabsTrigger>
              <TabsTrigger value="financial" className="data-[state=active]:bg-red-500/20">
                <DollarSign className="w-4 h-4 mr-2" />
                Financial
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-red-500/20">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="glass-card border-border/50 bg-background/50 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-red-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">2,847</div>
                    <p className="text-xs text-green-400 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +12% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass-card border-border/50 bg-background/50 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Active Campaigns</CardTitle>
                    <Activity className="h-4 w-4 text-orange-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">156</div>
                    <p className="text-xs text-green-400 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +8% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass-card border-border/50 bg-background/50 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-green-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">$89,432</div>
                    <p className="text-xs text-green-400 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +23% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass-card border-border/50 bg-background/50 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Pending Reviews</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">23</div>
                    <p className="text-xs text-yellow-400">Requires attention</p>
                  </CardContent>
                </Card>
              </div>

              <Alert className="border-yellow-500/50 bg-yellow-500/10">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-yellow-400">
                  You have 5 users pending verification and 3 campaigns awaiting approval.
                </AlertDescription>
              </Alert>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 glass border-border/50 bg-background/50"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40 glass border-border/50 bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-card border-border/50">
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="influencer">Influencers</SelectItem>
                      <SelectItem value="brand">Brands</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Card className="glass-card border-border/50 bg-background/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">User Management</CardTitle>
                  <CardDescription>Manage user accounts and permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-4 glass rounded-lg border border-border/30"
                      >
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={user.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <p className="font-medium text-white">{user.name}</p>
                              {user.verified && <CheckCircle className="w-4 h-4 text-green-400" />}
                            </div>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge className={`text-xs ${getStatusBadge(user.status)}`}>{user.status}</Badge>
                              <Badge variant="outline" className="text-xs border-border/50">
                                {user.role}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {user.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/50"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-500/50 text-red-400 hover:bg-red-500/20 bg-transparent"
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-white">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-6">
              <Card className="glass-card border-border/50 bg-background/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Content Moderation</CardTitle>
                  <CardDescription>Review and moderate campaigns and content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {campaigns.map((campaign) => (
                      <div
                        key={campaign.id}
                        className="flex items-center justify-between p-4 glass rounded-lg border border-border/30"
                      >
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-white">{campaign.title}</p>
                            {campaign.flagged && <AlertTriangle className="w-4 h-4 text-yellow-400" />}
                          </div>
                          <p className="text-sm text-muted-foreground">by {campaign.brand}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={`text-xs ${getStatusBadge(campaign.status)}`}>{campaign.status}</Badge>
                            <span className="text-sm text-green-400">${campaign.budget.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {campaign.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/50"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-500/50 text-red-400 hover:bg-red-500/20 bg-transparent"
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-white">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="financial" className="space-y-6">
              <Card className="glass-card border-border/50 bg-background/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Financial Management</CardTitle>
                  <CardDescription>Monitor transactions and financial activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 glass rounded-lg border border-border/30"
                      >
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-white">${transaction.amount.toLocaleString()}</p>
                            <Badge className={`text-xs ${getStatusBadge(transaction.status)}`}>
                              {transaction.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {transaction.type} from {transaction.from} to {transaction.to}
                          </p>
                          <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        </div>
                        <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-white">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-card border-border/50 bg-background/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Platform Settings</CardTitle>
                    <CardDescription>Configure platform-wide settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">Platform Fee (%)</label>
                      <Input defaultValue="5" className="glass border-border/50 bg-background/50" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">Minimum Campaign Budget</label>
                      <Input defaultValue="100" className="glass border-border/50 bg-background/50" />
                    </div>
                    <Button className="w-full neon-glow bg-gradient-to-r from-red-500 to-orange-500">
                      Save Settings
                    </Button>
                  </CardContent>
                </Card>

                <Card className="glass-card border-border/50 bg-background/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Security Settings</CardTitle>
                    <CardDescription>Manage security and access controls</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">Session Timeout (minutes)</label>
                      <Input defaultValue="60" className="glass border-border/50 bg-background/50" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">Max Login Attempts</label>
                      <Input defaultValue="5" className="glass border-border/50 bg-background/50" />
                    </div>
                    <Button className="w-full neon-glow bg-gradient-to-r from-red-500 to-orange-500">
                      Update Security
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
