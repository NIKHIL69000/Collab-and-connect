import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ChatInterface } from "@/components/chat/chat-interface"

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Connect & Collaborate
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start conversations with brands and influencers. Build meaningful partnerships through direct
              communication.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <ChatInterface />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
