"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Flame,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ProductType,
  formatPrice,
} from "@/components/productcard/product-card";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

const products: ProductType[] = [
  {
    id: 401,
    name: "Premium Sneakers",
    basePrice: 5999,
    category: "Footwear",
    description:
      "Lightweight, comfortable, and stylish sneakers for everyday wear. Features cushioned insoles and durable construction.",
    badges: [
      {
        text: "Trending",
        color: "bg-tertiary",
      },
    ],
    rating: 4.9,
    reviewCount: 178,
    isTrending: true,
    variants: [
      {
        color: "white",
        colorName: "White",
        colorCode: "#FFFFFF",
        images: [
          // Updated to a cleaner, more professional sneaker image
          "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=600&h=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=600&h=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=600&h=600&auto=format&fit=crop",
        ],
        sizes: [
          { name: "UK 7", price: 5999, stock: 15 },
          { name: "UK 8", price: 5999, stock: 18 },
          { name: "UK 9", price: 5999, stock: 12 },
          { name: "UK 10", price: 5999, stock: 8 },
          { name: "UK 11", price: 6499, stock: 5 },
        ],
      },
      {
        color: "black",
        colorName: "Black",
        colorCode: "#000000",
        images: [
          "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=600&h=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=600&h=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=600&h=600&auto=format&fit=crop",
        ],
        sizes: [
          { name: "UK 7", price: 5999, stock: 12 },
          { name: "UK 8", price: 5999, stock: 15 },
          { name: "UK 9", price: 5999, stock: 10 },
          { name: "UK 10", price: 5999, stock: 6 },
          { name: "UK 11", price: 6499, stock: 3 },
        ],
      },
      {
        color: "blue",
        colorName: "Navy Blue",
        colorCode: "#000080",
        images: [
          "https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=600&h=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=600&h=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=600&h=600&auto=format&fit=crop",
        ],
        sizes: [
          { name: "UK 7", price: 5999, stock: 10 },
          { name: "UK 8", price: 5999, stock: 14 },
          { name: "UK 9", price: 5999, stock: 8 },
          { name: "UK 10", price: 5999, stock: 5 },
          { name: "UK 11", price: 6499, stock: 0 },
        ],
      },
    ],
  },
  {
    id: 402,
    name: "Designer Watch",
    basePrice: 12999,
    category: "Accessories",
    description:
      "Elegant timepiece with premium materials and precision movement. The perfect accessory for any occasion.",
    badges: [
      {
        text: "Hot Pick",
        color: "bg-accent",
      },
    ],
    rating: 4.8,
    reviewCount: 132,
    isTrending: true,
    variants: [
      {
        color: "silver",
        colorName: "Silver",
        colorCode: "#C0C0C0",
        images: [
          // Updated to a more premium-looking watch image
          "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=600&h=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=600&h=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=600&h=600&auto=format&fit=crop",
        ],
        sizes: [{ name: "One Size", price: 12999, stock: 10 }],
      },
      {
        color: "gold",
        colorName: "Gold",
        colorCode: "#FFD700",
        images: [
          "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?q=80&w=600&h=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?q=80&w=600&h=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?q=80&w=600&h=600&auto=format&fit=crop",
        ],
        sizes: [{ name: "One Size", price: 14999, stock: 5 }],
      },
      {
        color: "black",
        colorName: "Black",
        colorCode: "#000000",
        images: [
          "https://images.unsplash.com/photo-1539874754764-5a96559165b0?q=80&w=600&h=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1539874754764-5a96559165b0?q=80&w=600&h=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1539874754764-5a96559165b0?q=80&w=600&h=600&auto=format&fit=crop",
        ],
        sizes: [{ name: "One Size", price: 12999, stock: 8 }],
      },
    ],
  },
  {
    id: 403,
    name: "Premium Sunglasses",
    basePrice: 4999,
    category: "Accessories",
    description:
      "High-quality sunglasses with UV protection and polarized lenses. Stylish design for both fashion and function.",
    badges: [
      {
        text: "Trending",
        color: "bg-tertiary",
      },
    ],
    rating: 4.7,
    reviewCount: 156,
    isTrending: true,
    discount: 20,
    variants: [
      {
        color: "black",
        colorName: "Black",
        colorCode: "#000000",
        images: [
          // Updated to a more stylish sunglasses image with better composition
          "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&h=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&h=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&h=600&auto=format&fit=crop",
        ],
        sizes: [{ name: "One Size", price: 4999, stock: 20 }],
      },
      {
        color: "brown",
        colorName: "Tortoise",
        colorCode: "#8B4513",
        images: [
          "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=600&h=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=600&h=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=600&h=600&auto=format&fit=crop",
        ],
        sizes: [{ name: "One Size", price: 4999, stock: 15 }],
      },
    ],
  },
];

const featuredProduct: ProductType = {
  id: 404,
  name: "Luxury Leather Backpack",
  basePrice: 9999,
  category: "Accessories",
  description:
    "Handcrafted premium leather backpack with spacious compartments and durable construction. Perfect for work, travel, or everyday use.",
  badges: [
    {
      text: "Editor's Choice",
      color: "bg-primary",
    },
  ],
  rating: 4.9,
  reviewCount: 217,
  isTrending: true,
  variants: [
    {
      color: "brown",
      colorName: "Vintage Brown",
      colorCode: "#964B00",
      images: [
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&h=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&h=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&h=800&auto=format&fit=crop",
      ],
      sizes: [{ name: "One Size", price: 9999, stock: 25 }],
    },
    {
      color: "black",
      colorName: "Classic Black",
      colorCode: "#000000",
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&h=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&h=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&h=800&auto=format&fit=crop",
      ],
      sizes: [{ name: "One Size", price: 9999, stock: 18 }],
    },
  ],
};

export default function EnhancedTrendingProducts() {
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

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

  return (
    <section
      ref={sectionRef}
      className="py-8 md:py-12 relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, #ffffff, #fcfcfc, #f9f9f9, #f7f7f7, #f5f5f5)",
      }}
    >
      {/* Floating Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-tertiary/5 blur-3xl animate-pulse-subtle"
          style={{ animationDuration: "7s" }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-pulse-subtle"
          style={{ animationDuration: "10s", animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-2/3 w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-pulse-subtle"
          style={{ animationDuration: "8s", animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto px-3 md:px-4 relative">
        <div
          className={cn(
            "flex flex-col items-center mb-6 md:mb-8 transition-all duration-700 transform",
            visibleSections.includes(1)
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          )}
        >
          <div className="flex items-center gap-2 mb-2 md:mb-3">
            <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-tertiary" />
            <h2 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-tertiary to-primary bg-clip-text text-transparent">
              Trending Now
            </h2>
            <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-primary" />
          </div>
          <p className="text-xs md:text-sm text-muted-foreground text-center max-w-2xl">
            Discover the styles everyone's raving about. Fresh, bold, and
            impossible to ignore.
          </p>
        </div>

        {/* Modern Bento Grid Layout - Mobile Optimized */}
        <div
          className={cn(
            "transition-all duration-700 transform",
            visibleSections.includes(1)
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          )}
        >
          <BentoGrid className="gap-3 md:gap-4 md:auto-rows-[16rem]">
            {/* Featured Product - Takes full width on mobile, larger on desktop */}
            <BentoGridItem
              className="col-span-2 row-span-2 md:col-span-2 md:row-span-2 bg-gradient-to-br from-tertiary/5 to-primary/5"
              title={featuredProduct.name}
              price={formatPrice(featuredProduct.basePrice)}
              image={featuredProduct.variants[0].images[0]}
              aspectRatio="aspect-[3/2] md:aspect-[4/3]"
              objectFit="contain"
              badge={featuredProduct.badges?.map((badge, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.5 text-xs rounded-full font-medium bg-white/80 backdrop-blur-sm shadow-sm flex items-center gap-1 sm:px-2"
                >
                  <Flame className="h-2.5 w-2.5 md:h-3 md:w-3 text-tertiary" />
                  <span className="text-xs bg-gradient-to-r from-tertiary to-primary bg-clip-text text-transparent">
                    {badge.text}
                  </span>
                </span>
              ))}
              footer={
                <div className="flex gap-1.5 w-full sm:gap-2">
                  <Button
                    size="sm"
                    className="flex-1 h-7 md:h-8 gap-1 bg-gradient-to-r from-tertiary to-primary hover:from-tertiary/90 hover:to-primary/90 text-xs px-1.5 sm:px-2"
                  >
                    <ShoppingBag className="h-3 w-3 md:h-3.5 md:w-3.5" />
                    <span className="text-xs">Add to Cart</span>
                  </Button>
                  <Button
                    asChild
                    size="icon"
                    variant="outline"
                    className="h-7 w-7 md:h-8 md:w-8 border-tertiary text-tertiary hover:bg-tertiary/10 p-0"
                  >
                    <Link href={`/product/${featuredProduct.id}`}>
                      <ArrowUpRight className="h-3 w-3 md:h-3.5 md:w-3.5" />
                    </Link>
                  </Button>
                </div>
              }
            />

            {/* Regular Trending Products */}
            {products.map((product, index) => (
              <BentoGridItem
                key={product.id}
                className={cn(
                  // First product takes full width on mobile, wider on desktop
                  index === 0
                    ? "col-span-2 md:col-span-2"
                    : "col-span-1 md:col-span-1",
                  index % 2 === 0
                    ? "bg-gradient-to-br from-blue-50/50 to-cyan-50/50"
                    : "bg-gradient-to-br from-amber-50/50 to-yellow-50/50"
                )}
                title={product.name}
                price={
                  <div className="flex items-baseline gap-1 sm:gap-2">
                    <span className="text-xs sm:text-sm">
                      {formatPrice(product.basePrice)}
                    </span>
                    {product.discount && (
                      <span className="text-[10px] sm:text-xs text-muted-foreground line-through">
                        {formatPrice(
                          Math.round(
                            product.basePrice * (1 + product.discount / 100)
                          )
                        )}
                      </span>
                    )}
                  </div>
                }
                image={product.variants[0].images[0]}
                aspectRatio={index === 0 ? "aspect-[2/1]" : "aspect-square"}
                objectFit={product.id === 402 ? "contain" : "cover"}
                imagePosition={
                  index === 0 ? "center" : product.id === 403 ? "top" : "center"
                }
                badge={
                  product.badges &&
                  product.badges[0] && (
                    <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-1.5 py-0.5 rounded-full shadow-sm scale-90 sm:scale-100">
                      <TrendingUp className="h-2.5 w-2.5 md:h-3 md:w-3 text-tertiary" />
                      <span className="text-[10px] sm:text-xs font-medium bg-gradient-to-r from-tertiary to-primary bg-clip-text text-transparent">
                        {product.badges[0].text}
                      </span>
                    </div>
                  )
                }
                footer={
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Button
                      asChild
                      className="flex-1 h-6 sm:h-7 text-[10px] sm:text-xs font-medium group-hover/bento:bg-tertiary transition-colors duration-300 px-1.5 sm:px-2"
                      size="sm"
                    >
                      <Link
                        href={`/product/${product.id}`}
                        className="flex items-center justify-center"
                      >
                        View
                        <ArrowUpRight className="ml-1 h-2.5 w-2.5 sm:h-3 sm:w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </Button>
                    <Button
                      size="icon"
                      className="h-6 w-6 sm:h-7 sm:w-7 bg-white text-tertiary hover:text-white hover:bg-tertiary border border-tertiary/20 transition-colors duration-300 p-0"
                    >
                      <ShoppingBag className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    </Button>
                  </div>
                }
              />
            ))}

            {/* New Arrivals Card - Hidden on smallest screens */}
            <BentoGridItem
              className="hidden sm:flex bg-gradient-to-br from-violet-50 to-indigo-50 flex-col"
              title="New Arrivals"
              price={
                <span className="text-[10px] sm:text-xs text-violet-600">
                  Fresh styles added weekly
                </span>
              }
              footer={
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full h-6 sm:h-7 text-[10px] sm:text-xs border-violet-400 text-violet-600 hover:bg-violet-100"
                >
                  <Link href="/new-arrivals">Explore New Styles</Link>
                </Button>
              }
              image="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&h=600&auto=format&fit=crop"
              aspectRatio="aspect-[1/1.2]"
              objectFit="cover"
              imagePosition="center"
            />

            {/* Sale Card - Hidden on smallest screens */}
            <BentoGridItem
              className="hidden sm:flex bg-gradient-to-br from-rose-50 to-red-50 flex-col"
              title={
                <span className="text-base font-bold text-rose-600">SALE</span>
              }
              price={
                <span className="text-[10px] sm:text-xs text-rose-600">
                  Up to 50% off
                </span>
              }
              footer={
                <Button
                  asChild
                  size="sm"
                  className="w-full h-6 sm:h-7 text-[10px] sm:text-xs bg-rose-500 hover:bg-rose-600"
                >
                  <Link href="/sale">Shop Sale</Link>
                </Button>
              }
              image="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=600&h=600&auto=format&fit=crop"
              aspectRatio="aspect-square"
              objectFit="cover"
              imagePosition="center"
            />
          </BentoGrid>
        </div>

        {/* Bottom CTA */}
        <div
          className={cn(
            "flex justify-center mt-6 md:mt-8 transition-all duration-700 transform",
            visibleSections.includes(1)
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          )}
        >
          <Button
            asChild
            size="sm"
            className="bg-gradient-to-r from-tertiary to-primary hover:from-tertiary/90 hover:to-primary/90 gap-1 shadow-md hover:shadow-lg transition-all duration-300 group text-xs md:text-sm py-1 h-8 md:h-9"
          >
            <Link href="/trending">
              <span>View All Trending Products</span>
              <ArrowUpRight className="h-3 w-3 md:h-3.5 md:w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
