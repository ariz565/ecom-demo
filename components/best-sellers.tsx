"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Eye, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const products = [
  {
    id: 1,
    name: "Classic Oxford Shirt",
    price: 3499,
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=400&h=500&auto=format&fit=crop",
    category: "Shirts",
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Slim Fit Chinos",
    price: 2799,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=400&h=500&auto=format&fit=crop",
    category: "Pants",
    color: "bg-amber-500",
  },
  {
    id: 3,
    name: "Leather Jacket",
    price: 8999,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400&h=500&auto=format&fit=crop",
    category: "Outerwear",
    color: "bg-red-500",
  },
  {
    id: 4,
    name: "Premium Denim Jeans",
    price: 4599,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=400&h=500&auto=format&fit=crop",
    category: "Pants",
    color: "bg-green-500",
  },
]

export default function BestSellers() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Best Sellers
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mb-6"></div>
          <p className="text-muted-foreground text-center max-w-2xl">
            Our most popular products based on sales. Updated daily.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Card
              key={product.id}
              className={cn(
                "group border-none shadow-sm overflow-hidden transition-all duration-500 transform hover:shadow-lg hover:-translate-y-1",
                visibleSections.includes(1) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className={cn(
                    "object-cover transition-transform duration-500",
                    hoveredProduct === product.id ? "scale-110" : "scale-100",
                  )}
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-black/5 flex items-center justify-center gap-2 transition-all duration-300",
                    hoveredProduct === product.id ? "opacity-100" : "opacity-0",
                  )}
                >
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full bg-white/80 text-black hover:bg-white"
                  >
                    <ShoppingBag className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full bg-white/80 text-black hover:bg-white"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full bg-white/80 text-black hover:bg-white"
                  >
                    <Eye className="h-5 w-5" />
                  </Button>
                </div>
                <div
                  className={cn(
                    "absolute top-2 left-2 text-xs font-medium px-2 py-1 rounded text-white",
                    product.color,
                  )}
                >
                  Best Seller
                </div>
              </div>
              <CardContent className="pt-4">
                <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
                <Link href={`/product/${product.id}`} className="font-medium hover:underline">
                  {product.name}
                </Link>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between items-center">
                <span className="font-semibold">{formatPrice(product.price)}</span>
                <div className="text-xs px-2 py-1 bg-tertiary/10 text-tertiary rounded-full">20% OFF</div>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="group border-primary text-primary hover:bg-primary hover:text-white"
          >
            <Link href="/shop">
              View All Best Sellers
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

