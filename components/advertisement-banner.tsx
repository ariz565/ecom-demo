"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AdvertisementBanner() {
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => [...prev, 1]);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-6 md:py-10">
      <div className="container mx-auto px-3 md:px-4">
        <div
          className={cn(
            "relative overflow-hidden rounded-lg md:rounded-xl transition-all duration-700 transform",
            visibleSections.includes(1)
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          )}
        >
          <div className="relative aspect-[3/2] sm:aspect-[21/9] md:aspect-[21/6] overflow-hidden">
            {/* Mobile-optimized image */}
            <Image
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1920&h=600&auto=format&fit=crop"
              alt="Summer Collection Advertisement"
              fill
              className="object-cover object-right-top sm:object-center"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent sm:from-black/70 sm:via-black/40"></div>

            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-xs sm:max-w-sm md:max-w-lg text-white ml-3 md:ml-12">
                  <span className="inline-block px-2 py-0.5 md:px-3 md:py-1 bg-primary text-white text-xs md:text-sm font-bold rounded-full mb-2 md:mb-4 animate-pulse">
                    NEW COLLECTION
                  </span>
                  <h2 className="text-xl sm:text-3xl md:text-5xl font-bold mb-2 md:mb-4 leading-tight">
                    Summer 2025 Collection
                  </h2>
                  <p className="text-sm md:text-lg mb-3 md:mb-6 max-w-md leading-snug line-clamp-2 sm:line-clamp-none">
                    Discover our latest summer styles. Light fabrics, vibrant
                    colors, and timeless designs.
                  </p>
                  <div className="flex gap-2 md:gap-4 flex-wrap">
                    <Button
                      asChild
                      size="sm"
                      className="bg-white text-black hover:bg-white/90 text-xs h-8 md:h-auto md:text-base md:size-lg"
                    >
                      <Link href="/collections/summer">
                        Shop Now
                        <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-white text-white bg-black/30 hover:bg-white/20 text-xs h-8 md:h-auto md:text-base md:size-lg"
                    >
                      <Link href="/lookbook">View Lookbook</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
