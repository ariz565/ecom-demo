"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const collections = [
  {
    id: 1,
    name: "Summer Essentials",
    description: "Light and breathable pieces for the warmer months",
    image:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=800&h=600&auto=format&fit=crop",
    link: "/collections/summer-essentials",
    color: "from-blue-500/60 to-blue-500/10",
    video:
      "https://player.vimeo.com/external/320725139.sd.mp4?s=446ed79c9458be9164797c6a01e99909b29b7fbc&profile_id=164&oauth2_token_id=57447761",
  },
  {
    id: 2,
    name: "Office Attire",
    description: "Professional looks for the modern workplace",
    image:
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=800&h=600&auto=format&fit=crop",
    link: "/collections/office-attire",
    color: "from-purple-500/60 to-purple-500/10",
    video:
      "https://player.vimeo.com/external/370467553.sd.mp4?s=db47878e6a468056667ba4e0ffe0417dc8b30be9&profile_id=164&oauth2_token_id=57447761",
  },
  {
    id: 3,
    name: "Weekend Casual",
    description: "Comfortable styles for your days off",
    image:
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&h=600&auto=format&fit=crop",
    link: "/collections/weekend-casual",
    color: "from-amber-500/60 to-amber-500/10",
    video:
      "https://player.vimeo.com/external/364516332.sd.mp4?s=4bcbcf8d0bf0caeaab0ea4fa4b515f6c2cf9f3e9&profile_id=164&oauth2_token_id=57447761",
  },
  {
    id: 4,
    name: "Active Wear",
    description: "Performance clothing for your workout routine",
    image:
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=800&h=600&auto=format&fit=crop",
    link: "/collections/active-wear",
    color: "from-green-500/60 to-green-500/10",
    video:
      "https://player.vimeo.com/external/368727434.sd.mp4?s=c7b0e7f75a2cc7adedd5962a863d90a5f8e273f5&profile_id=164&oauth2_token_id=57447761",
  },
];

export default function EnhancedCollections() {
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCollection, setActiveCollection] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState<number | null>(null);

  // Animation on scroll
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

  // Auto rotate collections
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCollection((prev) => (prev + 1) % collections.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f6f6f8 0%, #e0e5ec 100%)",
      }}
    >
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-pulse-subtle" />
        <div
          className="absolute -bottom-20 right-1/3 w-80 h-80 rounded-full bg-tertiary/5 blur-3xl animate-pulse-subtle"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <div
          className={cn(
            "flex flex-col items-center mb-16 transition-all duration-700 transform",
            visibleSections.includes(1)
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-accent to-tertiary bg-clip-text text-transparent">
            Curated Collections
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-tertiary mb-6"></div>
          <p className="text-muted-foreground text-center max-w-2xl">
            Explore our carefully curated collections designed to help you find
            exactly what you're looking for.
          </p>
        </div>

        {/* Collection Navigation */}
        <div
          className={cn(
            "flex justify-center mb-10 transition-all duration-700 transform",
            visibleSections.includes(1)
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          )}
        >
          <div className="flex space-x-2 bg-white rounded-full p-1.5 shadow-md">
            {collections.map((collection, index) => (
              <button
                key={collection.id}
                className={cn(
                  "px-4 py-2 rounded-full transition-all text-sm font-medium",
                  activeCollection === index
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                )}
                onClick={() => setActiveCollection(index)}
              >
                {collection.name}
              </button>
            ))}
          </div>
        </div>

        {/* Collections Display */}
        <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-2xl">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className={cn(
                "absolute inset-0 transition-all duration-1000 ease-in-out transform",
                activeCollection === index
                  ? "opacity-100 translate-x-0 z-10"
                  : index < activeCollection
                  ? "opacity-0 -translate-x-full z-0"
                  : "opacity-0 translate-x-full z-0"
              )}
            >
              <Image
                src={collection.image || "/placeholder.svg"}
                alt={collection.name}
                fill
                className="object-cover"
              />
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-r",
                  collection.color
                )}
              />

              <div className="absolute inset-0 flex flex-col justify-center p-10 md:p-16">
                <div className="max-w-md">
                  <h3
                    className={cn(
                      "text-3xl md:text-4xl font-bold mb-4 text-white transition-all duration-1000 transform",
                      activeCollection === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    )}
                  >
                    {collection.name}
                  </h3>
                  <p
                    className={cn(
                      "text-white/90 mb-8 transition-all duration-1000 delay-100 transform",
                      activeCollection === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    )}
                  >
                    {collection.description}
                  </p>
                  <div
                    className={cn(
                      "flex gap-4 transition-all duration-1000 delay-200 transform",
                      activeCollection === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    )}
                  >
                    <Button
                      asChild
                      className="bg-white text-black hover:bg-white/90"
                    >
                      <Link href={collection.link}>
                        Explore Collection
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="border-white bg-white/20 text-white hover:bg-white/30 gap-2 backdrop-blur-sm"
                        >
                          <Play className="h-4 w-4" fill="currentColor" />
                          Watch
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black">
                        <video
                          className="w-full h-auto"
                          controls
                          autoPlay
                          src={collection.video}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {collections.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all",
                  activeCollection === index
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/70"
                )}
                onClick={() => setActiveCollection(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
