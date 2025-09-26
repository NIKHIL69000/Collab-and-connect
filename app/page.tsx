"use client"

import { useEffect, useRef } from "react"
import { Hero } from "@/components/sections/hero"
import { Features } from "@/components/sections/features"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Stats } from "@/components/sections/stats"
import { CTA } from "@/components/sections/cta"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { DashboardPreview } from "@/components/sections/dashboard-preview"

export default function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view")
        }
      })
    }, observerOptions)

    const animatedElements = document.querySelectorAll(".scroll-animate")
    animatedElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement("div")
      particle.className = "particle"
      particle.style.left = Math.random() * 100 + "%"
      particle.style.width = particle.style.height = Math.random() * 4 + 2 + "px"
      particle.style.animationDuration = Math.random() * 10 + 10 + "s"
      particle.style.animationDelay = Math.random() * 5 + "s"

      const particlesContainer = document.querySelector(".particles")
      if (particlesContainer) {
        particlesContainer.appendChild(particle)

        setTimeout(() => {
          particle.remove()
        }, 20000)
      }
    }

    const particleInterval = setInterval(createParticle, 2000)
    return () => clearInterval(particleInterval)
  }, [])

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="particles"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float"></div>
        <div
          className="absolute top-3/4 right-1/4 w-24 h-24 bg-accent/20 rounded-full blur-xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-secondary/20 rounded-full blur-xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/3 w-28 h-28 bg-primary/15 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/2 w-36 h-36 bg-accent/15 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 animate-pulse"></div>
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10">
        <Header />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded z-50"
        >
          Skip to main content
        </a>
        <main id="main-content">
          <div className="scroll-animate">
            <Hero />
          </div>
          <div className="scroll-animate">
            <DashboardPreview />
          </div>
          <div className="scroll-animate">
            <Features />
          </div>
          <div className="scroll-animate">
            <HowItWorks />
          </div>
          <div className="scroll-animate">
            <Stats />
          </div>
          <div className="scroll-animate">
            <CTA />
          </div>
        </main>
        <div className="scroll-animate">
          <Footer />
        </div>
      </div>
    </div>
  )
}
