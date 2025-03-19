"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BackgroundPaths } from "@/components/ui/background-paths";

const slides = [
  {
    id: 1,
    title: "Summer Collection 2025",
    description: "Discover the latest trends in men's fashion",
    cta: "Shop Now",
    image:
      "https://images.unsplash.com/photo-1550246140-5119ae4790b8?q=80&w=1920&h=1080&auto=format&fit=crop",
    position: "left",
    // Updated color gradient for better visibility and premium look
    color: "from-primary/60 via-primary/30 to-transparent",
    type: "regular",
  },
  {
    id: 2,
    title: "Exclusive Styles",
    description: "Premium quality clothing for the modern man",
    cta: "Explore",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1920&h=1080&auto=format&fit=crop",
    position: "right",
    // Refined color with tertiary color for elegant feel
    color: "from-tertiary/50 via-tertiary/30 to-transparent",
    type: "regular",
  },
  {
    id: 3,
    title: "New Season Arrivals",
    description: "Be the first to wear our latest designs",
    cta: "View Collection",
    image:
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1920&h=1080&auto=format&fit=crop",
    position: "center",
    // Adjusted to use a more neutral, sophisticated palette
    color: "from-black/60 via-black/40 to-transparent",
    type: "regular",
  },
  {
    id: 4,
    title: "Coming Soon",
    description: "",
    cta: "Join Waitlist",
    image: "",
    position: "center",
    // Elegant background for animation slide
    color: "from-accent/30 to-accent/5",
    type: "animation",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Detect client-side rendering to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        setIsAnimating(false);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, [isClient]);

  // Return a loading state or simplified version during server render
  if (!isClient) {
    return (
      <section className="relative h-screen w-full overflow-hidden pt-16">
        <div className="absolute inset-0">
          <Image
            src={slides[0].image || "/placeholder.svg"}
            alt={slides[0].title}
            fill
            priority
            className="object-cover"
          />
          <div
            className={cn("absolute inset-0 bg-gradient-to-r", slides[0].color)}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen w-full overflow-hidden pt-16">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === currentSlide
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          )}
        >
          {slide.type === "regular" ? (
            <>
              <Image
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                fill
                priority
                className="object-cover"
              />
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-r",
                  slide.color,
                  // Add a subtle overlay to improve text readability
                  slide.position === "left"
                    ? "bg-gradient-to-r"
                    : slide.position === "right"
                    ? "bg-gradient-to-l"
                    : "bg-gradient-to-t"
                )}
              />
              <div className="container relative h-full mx-auto px-4 flex items-center">
                <div
                  className={cn(
                    "max-w-lg text-white transition-all duration-700 transform",
                    index === currentSlide
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0",
                    isAnimating ? "scale-95 blur-sm" : "scale-100 blur-0",
                    slide.position === "left"
                      ? "text-left"
                      : slide.position === "right"
                      ? "ml-auto text-right"
                      : "mx-auto text-center"
                  )}
                >
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-6 drop-shadow">
                    {slide.description}
                  </p>
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
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black">
              <BackgroundPaths title="Coming Soon" />
            </div>
          )}
        </div>
      ))}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              index === currentSlide
                ? "bg-white scale-100 w-8"
                : "bg-white/50 scale-75 hover:bg-white/70"
            )}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}
