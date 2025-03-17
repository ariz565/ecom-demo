"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

const categories = [
  {
    id: 1,
    name: "Shirts",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=400&h=400&auto=format&fit=crop",
    count: 42,
    link: "/category/shirts",
    color: "from-primary/70 to-transparent",
  },
  {
    id: 2,
    name: "Pants",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=400&h=400&auto=format&fit=crop",
    count: 36,
    link: "/category/pants",
    color: "from-secondary/70 to-transparent",
  },
  {
    id: 3,
    name: "Outerwear",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=400&h=400&auto=format&fit=crop",
    count: 28,
    link: "/category/outerwear",
    color: "from-tertiary/70 to-transparent",
  },
  {
    id: 4,
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=400&h=400&auto=format&fit=crop",
    count: 54,
    link: "/category/accessories",
    color: "from-accent/70 to-transparent",
  },
  {
    id: 5,
    name: "Footwear",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=400&h=400&auto=format&fit=crop",
    count: 31,
    link: "/category/footwear",
    color: "from-primary/70 to-transparent",
  },
  {
    id: 6,
    name: "Formal",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=400&h=400&auto=format&fit=crop",
    count: 25,
    link: "/category/formal",
    color: "from-secondary/70 to-transparent",
  },
]

export default function Categories() {
  const [visibleSections, setVisibleSections] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)

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
    <section ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "flex flex-col items-center mb-12 transition-all duration-700 transform",
            visibleSections.includes(1) ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">
            Shop by Category
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary via-secondary to-tertiary mb-6"></div>
          <p className="text-muted-foreground text-center max-w-2xl">
            Browse our wide selection of products by category.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={category.link}
              className={cn(
                "group relative overflow-hidden rounded-lg transition-all duration-500 transform",
                visibleSections.includes(1) ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
                hoveredCategory === category.id ? "scale-105 shadow-lg z-10" : "scale-100",
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t transition-opacity duration-300",
                    category.color,
                    hoveredCategory === category.id ? "opacity-90" : "opacity-70",
                  )}
                />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h3
                  className={cn(
                    "text-xl font-bold mb-1 transition-transform duration-300",
                    hoveredCategory === category.id ? "scale-110" : "scale-100",
                  )}
                >
                  {category.name}
                </h3>
                <p
                  className={cn(
                    "text-sm opacity-90 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300",
                    hoveredCategory === category.id ? "opacity-100 transform-none" : "opacity-90",
                  )}
                >
                  {category.count} Products
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

