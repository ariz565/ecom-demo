"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const products = [
  {
    id: 1,
    name: "Merino Wool Sweater",
    price: 5299,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=400&h=500&auto=format&fit=crop",
    category: "Knitwear",
    tag: "New",
    tagColor: "bg-secondary",
  },
  {
    id: 2,
    name: "Tailored Blazer",
    price: 7999,
    image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=400&h=500&auto=format&fit=crop",
    category: "Formal",
    tag: "New",
    tagColor: "bg-secondary",
  },
  {
    id: 3,
    name: "Graphic Print T-Shirt",
    price: 1999,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=400&h=500&auto=format&fit=crop",
    category: "T-Shirts",
    tag: "New",
    tagColor: "bg-secondary",
  },
  {
    id: 4,
    name: "Lightweight Bomber Jacket",
    price: 6499,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=400&h=500&auto=format&fit=crop",
    category: "Jackets",
    tag: "New",
    tagColor: "bg-secondary",
  },
  {
    id: 5,
    name: "Slim Fit Polo Shirt",
    price: 2499,
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=400&h=500&auto=format&fit=crop",
    category: "Polos",
    tag: "New",
    tagColor: "bg-secondary",
  },
  {
    id: 6,
    name: "Linen Summer Shorts",
    price: 2999,
    image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=400&h=500&auto=format&fit=crop",
    category: "Shorts",
    tag: "New",
    tagColor: "bg-secondary",
  },
]

export default function NewArrivals() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
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

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = direction === "left" ? -current.offsetWidth / 2 : current.offsetWidth / 2
      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "flex justify-between items-end mb-12 transition-all duration-700 transform",
            visibleSections.includes(1) ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
          )}
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              New Arrivals
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-secondary to-accent mb-6"></div>
            <p className="text-muted-foreground max-w-2xl">
              The latest additions to our collection. Fresh styles just for you.
            </p>
          </div>
          <div className="hidden md:flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              className="border-secondary text-secondary hover:bg-secondary hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              className="border-secondary text-secondary hover:bg-secondary hover:text-white"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div
          ref={scrollContainerRef}
          className={cn(
            "flex gap-6 overflow-x-auto pb-6 snap-x scrollbar-hide transition-all duration-700 transform",
            visibleSections.includes(1) ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
          )}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product, index) => (
            <Card
              key={product.id}
              className="min-w-[280px] max-w-[280px] border-none shadow-sm snap-start transition-all duration-500 transform hover:shadow-lg hover:-translate-y-1"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div
                  className={cn(
                    "absolute top-2 left-2 text-xs font-medium px-2 py-1 rounded text-white",
                    product.tagColor,
                  )}
                >
                  {product.tag}
                </div>
              </div>
              <CardContent className="pt-4">
                <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
                <Link href={`/product/${product.id}`} className="font-medium hover:underline">
                  {product.name}
                </Link>
              </CardContent>
              <CardFooter className="pt-0">
                <span className="font-semibold">{formatPrice(product.price)}</span>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div
          className={cn(
            "flex justify-center mt-12 transition-all duration-700 transform",
            visibleSections.includes(1) ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
          )}
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="group border-secondary text-secondary hover:bg-secondary hover:text-white"
          >
            <Link href="/new-arrivals">
              View All New Arrivals
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

