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
    <section ref={sectionRef} className="py-10">
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "relative overflow-hidden rounded-xl transition-all duration-700 transform",
            visibleSections.includes(1)
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          )}
        >
          <div className="relative aspect-[21/9] md:aspect-[21/6] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1920&h=600&auto=format&fit=crop"
              alt="Summer Collection Advertisement"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-lg text-white ml-4 md:ml-12">
                  <span className="inline-block px-3 py-1 bg-primary text-white text-sm font-bold rounded-full mb-4 animate-pulse">
                    NEW COLLECTION
                  </span>
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    Summer 2025 Collection
                  </h2>
                  <p className="text-lg mb-6 max-w-md">
                    Discover our latest summer styles. Light fabrics, vibrant
                    colors, and timeless designs.
                  </p>
                  <div className="flex gap-4">
                    <Button
                      asChild
                      size="lg"
                      className="bg-white text-black hover:bg-white/90"
                    >
                      <Link href="/collections/summer">
                        Shop Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="border-white text-white bg-black/30 hover:bg-white/20"
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
