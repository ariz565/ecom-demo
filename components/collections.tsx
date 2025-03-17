"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const collections = [
  {
    id: 1,
    name: "Summer Essentials",
    description: "Light and breathable pieces for the warmer months",
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=800&h=600&auto=format&fit=crop",
    link: "/collections/summer-essentials",
    color: "from-primary/60 to-primary/10",
  },
  {
    id: 2,
    name: "Office Attire",
    description: "Professional looks for the modern workplace",
    image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=800&h=600&auto=format&fit=crop",
    link: "/collections/office-attire",
    color: "from-secondary/60 to-secondary/10",
  },
  {
    id: 3,
    name: "Weekend Casual",
    description: "Comfortable styles for your days off",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&h=600&auto=format&fit=crop",
    link: "/collections/weekend-casual",
    color: "from-tertiary/60 to-tertiary/10",
  },
]

export default function Collections() {
  const [visibleSections, setVisibleSections] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

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

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "flex flex-col items-center mb-12 transition-all duration-700 transform",
            visibleSections.includes(1) ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-accent to-tertiary bg-clip-text text-transparent">
            Collections
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-tertiary mb-6"></div>
          <p className="text-muted-foreground text-center max-w-2xl">
            Curated collections to help you find exactly what you're looking for.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className={cn(
                "group relative overflow-hidden rounded-lg transition-all duration-700 transform",
                visibleSections.includes(1) ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
              )}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className={cn("absolute inset-0 bg-gradient-to-t", collection.color)} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{collection.name}</h3>
                <p className="mb-4 opacity-90">{collection.description}</p>
                <Button
                  asChild
                  variant="secondary"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/40 border border-white/50 group"
                >
                  <Link href={collection.link}>
                    Explore Collection
                    <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

