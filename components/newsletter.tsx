"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function Newsletter() {
  const [visibleSections, setVisibleSections] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => [...prev, 1])
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setTimeout(() => {
        setEmail("")
        setIsSubmitted(false)
      }, 3000)
    }
  }

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-r from-primary via-secondary to-tertiary text-white">
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "max-w-3xl mx-auto text-center transition-all duration-700 transform",
            visibleSections.includes(1) ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="mb-8 opacity-90">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={handleSubmit}>
            {!isSubmitted ? (
              <>
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/70 focus:border-white"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90 transition-all duration-300 hover:scale-105"
                >
                  Subscribe
                </Button>
              </>
            ) : (
              <div className="w-full py-2 px-4 bg-white/20 backdrop-blur-sm rounded-md text-white animate-pulse-subtle">
                Thanks for subscribing!
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

