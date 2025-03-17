"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const slides = [
  {
    id: 1,
    title: "Summer Collection 2025",
    description: "Discover the latest trends in men's fashion",
    cta: "Shop Now",
    image: "https://images.unsplash.com/photo-1550246140-5119ae4790b8?q=80&w=1920&h=1080&auto=format&fit=crop",
    position: "left",
    color: "from-primary/80 to-primary/20",
  },
  {
    id: 2,
    title: "Exclusive Styles",
    description: "Premium quality clothing for the modern man",
    cta: "Explore",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1920&h=1080&auto=format&fit=crop",
    position: "right",
    color: "from-secondary/80 to-secondary/20",
  },
  {
    id: 3,
    title: "New Season Arrivals",
    description: "Be the first to wear our latest designs",
    cta: "View Collection",
    image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1920&h=1080&auto=format&fit=crop",
    position: "center",
    color: "from-tertiary/80 to-tertiary/20",
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
        setIsAnimating(false)
      }, 500)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden pt-16">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
        >
          <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill priority className="object-cover" />
          <div className={cn("absolute inset-0 bg-gradient-to-r", slide.color)} />
          <div className="container relative h-full mx-auto px-4 flex items-center">
            <div
              className={cn(
                "max-w-lg text-white transition-all duration-700 transform",
                index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
                isAnimating ? "scale-95 blur-sm" : "scale-100 blur-0",
                slide.position === "left"
                  ? "text-left"
                  : slide.position === "right"
                    ? "ml-auto text-right"
                    : "mx-auto text-center",
              )}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{slide.title}</h1>
              <p className="text-lg md:text-xl mb-6 drop-shadow">{slide.description}</p>
              <Button
                asChild
                size="lg"
                className="group bg-white/20 backdrop-blur-sm hover:bg-white/40 border border-white/50"
              >
                <Link href="/shop">
                  {slide.cta}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              index === currentSlide ? "bg-white scale-100 w-8" : "bg-white/50 scale-75 hover:bg-white/70",
            )}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}

