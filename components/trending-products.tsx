"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const trendingProducts = [
  {
    id: 1,
    name: "Premium Sneakers",
    description: "Lightweight, comfortable, and stylish sneakers for everyday wear.",
    price: 5999,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=600&h=600&auto=format&fit=crop",
    badge: "Trending",
    color: "from-primary to-secondary",
  },
  {
    id: 2,
    name: "Designer Watch",
    description: "Elegant timepiece with premium materials and precision movement.",
    price: 12999,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=600&h=600&auto=format&fit=crop",
    badge: "Best Seller",
    color: "from-secondary to-accent",
  },
]

export default function TrendingProducts() {
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <section ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "flex flex-col items-center mb-12 transition-all duration-700 transform",
            visibleSections.includes(1) ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-tertiary to-accent bg-clip-text text-transparent">
            Trending Now
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-tertiary to-accent mb-6"></div>
          <p className="text-muted-foreground text-center max-w-2xl">
            The hottest styles that everyone is talking about right now.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {trendingProducts.map((product, index) => (
            <div
              key={product.id}
              className={cn(
                "group relative overflow-hidden rounded-lg transition-all duration-700 transform",
                visibleSections.includes(1) ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
              )}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="relative aspect-square md:aspect-[4/3] overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div
                  className={cn(
                    "absolute top-4 left-4 text-sm font-medium px-3 py-1 rounded text-white bg-gradient-to-r",
                    product.color,
                  )}
                >
                  {product.badge}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <p className="mb-4 opacity-90 max-w-md">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">{formatPrice(product.price)}</span>
                  <Button
                    asChild
                    variant="secondary"
                    className="group bg-white/20 backdrop-blur-sm hover:bg-white/40 border border-white/50"
                  >
                    <Link href={`/product/${product.id}`}>
                      Shop Now
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

