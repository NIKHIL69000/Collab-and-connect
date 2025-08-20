"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2 } from "lucide-react"

interface PortfolioItem {
  id: string
  title: string
  description: string
  imageUrl: string
  campaignType: string
  results?: string
  metrics?: {
    views?: number
    engagement?: number
    clicks?: number
  }
}

export function PortfolioManager() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: "1",
      title: "Summer Fashion Campaign",
      description: "Collaborated with fashion brand for summer collection launch",
      imageUrl: "/modern-fashion-campaign.png",
      campaignType: "Fashion",
      results: "25% increase in brand awareness",
      metrics: { views: 150000, engagement: 12500, clicks: 3200 },
    },
  ])

  const [isAddingItem, setIsAddingItem] = useState(false)
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null)
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    imageUrl: "",
    campaignType: "",
    results: "",
  })

  const handleAddItem = () => {
    const item: PortfolioItem = {
      id: Date.now().toString(),
      ...newItem,
      imageUrl: newItem.imageUrl || "/portfolio-item.png",
    }
    setPortfolioItems([...portfolioItems, item])
    setNewItem({ title: "", description: "", imageUrl: "", campaignType: "", results: "" })
    setIsAddingItem(false)
  }

  const handleDeleteItem = (id: string) => {
    setPortfolioItems(portfolioItems.filter((item) => item.id !== id))
  }

  return (
    <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold text-purple-300">Portfolio</CardTitle>
        <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black/90 border border-purple-500/30 text-white">
            <DialogHeader>
              <DialogTitle className="text-purple-300">Add Portfolio Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Project Title"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                className="bg-black/50 border-purple-500/30 text-white"
              />
              <Textarea
                placeholder="Project Description"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                className="bg-black/50 border-purple-500/30 text-white"
              />
              <Input
                placeholder="Campaign Type (e.g., Fashion, Tech)"
                value={newItem.campaignType}
                onChange={(e) => setNewItem({ ...newItem, campaignType: e.target.value })}
                className="bg-black/50 border-purple-500/30 text-white"
              />
              <Input
                placeholder="Image URL (optional)"
                value={newItem.imageUrl}
                onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })}
                className="bg-black/50 border-purple-500/30 text-white"
              />
              <Textarea
                placeholder="Results & Metrics"
                value={newItem.results}
                onChange={(e) => setNewItem({ ...newItem, results: e.target.value })}
                className="bg-black/50 border-purple-500/30 text-white"
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddingItem(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddItem} className="bg-purple-500 hover:bg-purple-600">
                  Add Item
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="bg-black/30 rounded-lg border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all group"
            >
              <div className="relative">
                <img src={item.imageUrl || "/placeholder.svg"} alt={item.title} className="w-full h-48 object-cover" />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline" className="w-8 h-8 p-0 bg-transparent">
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-8 h-8 p-0 text-red-400 hover:text-red-300 bg-transparent"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">{item.title}</h4>
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                    {item.campaignType}
                  </Badge>
                </div>
                <p className="text-white/70 text-sm mb-3">{item.description}</p>
                {item.results && <p className="text-green-400 text-sm mb-3">{item.results}</p>}
                {item.metrics && (
                  <div className="flex justify-between text-xs text-white/60">
                    <span>{item.metrics.views?.toLocaleString()} views</span>
                    <span>{item.metrics.engagement?.toLocaleString()} engagement</span>
                    <span>{item.metrics.clicks?.toLocaleString()} clicks</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
