"use client"
import { Button } from "@/components/ui/button"
import {
  X,
  User,
  Settings,
  CreditCard,
  LogOut,
  BarChart3,
  MessageCircle,
  DollarSign,
  Bell,
  Shield,
  HelpCircle,
  Star,
  Users,
  Calendar,
  FileText,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

interface UserSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function UserSidebar({ isOpen, onClose }: UserSidebarProps) {
  const { user, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
    onClose()
  }

  const handleNavigation = (path: string) => {
    router.push(path)
    onClose()
  }

  if (!user) return null

  const menuItems = [
    {
      category: "Main",
      items: [
        { icon: BarChart3, label: "Dashboard", path: "/dashboard" },
        { icon: MessageCircle, label: "Messages", path: "/dashboard/messages" },
        { icon: Users, label: "Collaborations", path: "/dashboard/campaigns" },
        { icon: Calendar, label: "Calendar", path: "/dashboard/calendar" },
      ],
    },
    {
      category: "Account",
      items: [
        { icon: User, label: "Profile", path: "/dashboard/profile" },
        { icon: Settings, label: "Settings", path: "/dashboard/settings" },
        { icon: CreditCard, label: "Subscription", path: "/pricing" },
        { icon: DollarSign, label: "Payments", path: "/dashboard/payments" },
      ],
    },
    {
      category: "Analytics & Reports",
      items: [
        { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
        { icon: FileText, label: "Reports", path: "/dashboard/reports" },
        { icon: Star, label: "Reviews", path: "/dashboard/reviews" },
      ],
    },
    {
      category: "Support",
      items: [
        { icon: Bell, label: "Notifications", path: "/dashboard/notifications" },
        { icon: HelpCircle, label: "Help Center", path: "/help" },
        { icon: Shield, label: "Privacy", path: "/privacy" },
      ],
    },
  ]

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] glass-card backdrop-blur-xl bg-background/95 border-l border-white/20 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-foreground">{user.name}</p>
                <p className="text-xs text-foreground/60">{user.email}</p>
                <p className="text-xs text-primary capitalize font-medium">{user.role}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-white/10 transition-all duration-200"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {menuItems.map((category, categoryIndex) => (
              <div key={category.category} className="space-y-2">
                <h3 className="text-xs font-semibold text-foreground/60 uppercase tracking-wider px-2">
                  {category.category}
                </h3>
                <div className="space-y-1">
                  {category.items.map((item, itemIndex) => {
                    const Icon = item.icon
                    return (
                      <Button
                        key={item.label}
                        variant="ghost"
                        onClick={() => handleNavigation(item.path)}
                        className="w-full justify-start text-left hover:bg-white/10 transition-all duration-200 animate-slide-in-right"
                        style={{ animationDelay: `${(categoryIndex * 4 + itemIndex) * 0.05}s` }}
                      >
                        <Icon className="h-4 w-4 mr-3" />
                        {item.label}
                      </Button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="w-full justify-start text-left hover:bg-red-500/20 hover:text-red-400 transition-all duration-200"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
