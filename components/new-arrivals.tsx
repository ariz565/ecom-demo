"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Eye,
  ShoppingCart,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { toast } from "sonner";

// Use similar product structure as bestsellers
const products = [
  {
    id: 1,
    name: "Merino Wool Sweater",
    basePrice: 5299,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=400&h=500&auto=format&fit=crop",
    category: "Knitwear",
    badge: "New",
    variants: [
      {
        color: "gray",
        colorName: "Heather Gray",
        colorCode: "#808080",
        images: [
          "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=400&h=500&auto=format&fit=crop",
        ],
      },
      {
        color: "navy",
        colorName: "Navy Blue",
        colorCode: "#000080",
        images: [
          "https://images.unsplash.com/photo-1609337449311-4c6da2a65be5?q=80&w=400&h=500&auto=format&fit=crop",
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Tailored Blazer",
    basePrice: 7999,
    image:
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=400&h=500&auto=format&fit=crop",
    category: "Formal",
    badge: "New",
    variants: [
      {
        color: "black",
        colorName: "Jet Black",
        colorCode: "#000000",
        images: [
          "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=400&h=500&auto=format&fit=crop",
        ],
      },
      {
        color: "navy",
        colorName: "Navy Blue",
        colorCode: "#000080",
        images: [
          "https://images.unsplash.com/photo-1598885932161-79e995ac6d08?q=80&w=400&h=500&auto=format&fit=crop",
        ],
      },
    ],
    rating: 4.9,
    reviewCount: 32,
  },
  {
    id: 3,
    name: "Graphic Print T-Shirt",
    basePrice: 1999,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=400&h=500&auto=format&fit=crop",
    category: "T-Shirts",
    badge: "New",
    variants: [
      {
        color: "white",
        colorName: "White",
        colorCode: "#FFFFFF",
        images: [
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=400&h=500&auto=format&fit=crop",
        ],
      },
      {
        color: "black",
        colorName: "Black",
        colorCode: "#000000",
        images: [
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=400&h=500&auto=format&fit=crop",
        ],
      },
    ],
    rating: 4.7,
    reviewCount: 45,
  },
  {
    id: 4,
    name: "Lightweight Bomber Jacket",
    basePrice: 6499,
    discount: 10,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400&h=500&auto=format&fit=crop",
    category: "Jackets",
    badge: "New",
    variants: [
      {
        color: "brown",
        colorName: "Vintage Brown",
        colorCode: "#8B4513",
        images: [
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400&h=500&auto=format&fit=crop",
        ],
      },
      {
        color: "black",
        colorName: "Black",
        colorCode: "#000000",
        images: [
          "https://images.unsplash.com/photo-1509957660513-3cfee9a1c7e5?q=80&w=400&h=500&auto=format&fit=crop",
        ],
      },
    ],
    rating: 4.8,
    reviewCount: 28,
  },
  {
    id: 5,
    name: "Slim Fit Polo Shirt",
    basePrice: 2499,
    image:
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=400&h=500&auto=format&fit=crop",
    category: "Polos",
    badge: "New",
    variants: [
      {
        color: "blue",
        colorName: "Sky Blue",
        colorCode: "#87CEEB",
        images: [
          "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=400&h=500&auto=format&fit=crop",
        ],
      },
      {
        color: "red",
        colorName: "Bright Red",
        colorCode: "#FF0000",
        images: [
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=400&h=500&auto=format&fit=crop",
        ],
      },
    ],
    rating: 4.6,
    reviewCount: 52,
  },
  {
    id: 6,
    name: "Linen Summer Shorts",
    basePrice: 2999,
    discount: 15,
    image:
      "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=400&h=500&auto=format&fit=crop",
    category: "Shorts",
    badge: "New",
    variants: [
      {
        color: "beige",
        colorName: "Sand",
        colorCode: "#F5F5DC",
        images: [
          "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=400&h=500&auto=format&fit=crop",
        ],
      },
      {
        color: "olive",
        colorName: "Olive Green",
        colorCode: "#808000",
        images: [
          "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=400&h=500&auto=format&fit=crop",
        ],
      },
    ],
    rating: 4.5,
    reviewCount: 37,
  },
];

export default function NewArrivals() {
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

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

  // Helper functions
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getDiscountedPrice = (product: any) => {
    const price = product.basePrice;
    const discount = product.discount || 0;
    return discount > 0 ? price * (1 - discount / 100) : price;
  };

  // Action handlers
  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`${product.name} added to wishlist!`);
  };

  const handleQuickView = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.info(`Quick view: ${product.name}`);
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 relative overflow-hidden bg-gradient-to-b from-muted/30 to-background"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/5 rounded-full" />
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-tertiary/5 rounded-full" />
        <div className="absolute -bottom-40 left-1/3 w-80 h-80 bg-accent/5 rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div
          className={cn(
            "flex flex-col items-center justify-between mb-10 transition-all duration-700 transform",
            visibleSections.includes(1)
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          )}
        >
          <div className="text-center mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              New Arrivals
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-secondary to-accent mb-6 mx-auto"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The latest additions to our collection. Fresh styles just for you.
            </p>
          </div>
        </div>

        {/* Products swiper */}
        <div className="transition-opacity duration-300">
          <Swiper
            modules={[Pagination, Navigation]}
            pagination={{
              clickable: true,
              el: ".new-arrivals-pagination",
            }}
            navigation={{
              nextEl: ".swiper-next",
              prevEl: ".swiper-prev",
            }}
            slidesPerView={2.2}
            spaceBetween={12}
            breakpoints={{
              540: { slidesPerView: 3, spaceBetween: 16 },
              768: { slidesPerView: 4, spaceBetween: 16 },
              1024: { slidesPerView: 5, spaceBetween: 20 },
            }}
            className="w-full"
          >
            {products.map((product, index) => (
              <SwiperSlide key={product.id}>
                <div
                  className={cn(
                    "transition-all duration-700 transform",
                    visibleSections.includes(1)
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Link
                    href={`/product/${product.id}`}
                    className="group block relative"
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <div className="relative rounded-md overflow-hidden aspect-[3/4] border bg-gray-50">
                      {/* Product image */}
                      <Image
                        src={product.image || "/placeholder.jpg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Discount tag */}
                      {product.discount && product.discount > 0 && (
                        <div className="absolute top-2 left-2 z-10">
                          <Badge
                            className={cn(
                              "px-2 py-1 text-xs font-bold",
                              product.discount >= 40
                                ? "bg-red-500"
                                : product.discount >= 25
                                ? "bg-orange-500"
                                : product.discount >= 15
                                ? "bg-amber-500"
                                : "bg-green-500",
                              "text-white"
                            )}
                          >
                            {product.discount}% OFF
                          </Badge>
                        </div>
                      )}

                      {/* New Badge */}
                      {product.badge && (
                        <div className="absolute top-2 right-2 z-10">
                          <Badge className="bg-secondary text-white px-2 py-1 text-xs font-medium">
                            {product.badge}
                          </Badge>
                        </div>
                      )}

                      {/* Hover action buttons */}
                      <div
                        className={cn(
                          "absolute bottom-0 left-0 right-0 py-2 px-2 bg-black/70 backdrop-blur-sm transition-all duration-300 flex justify-center items-center gap-2",
                          hoveredProduct === product.id
                            ? "translate-y-0 opacity-100"
                            : "translate-y-full opacity-0"
                        )}
                      >
                        <button
                          onClick={(e) => handleAddToCart(product, e)}
                          className="h-8 w-8 rounded-full bg-white text-gray-900 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors"
                          aria-label="Add to cart"
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => handleAddToWishlist(product, e)}
                          className="h-8 w-8 rounded-full bg-white text-gray-900 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors"
                          aria-label="Add to wishlist"
                        >
                          <Heart className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => handleQuickView(product, e)}
                          className="h-8 w-8 rounded-full bg-white text-gray-900 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors"
                          aria-label="Quick view"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Product info */}
                    <div className="mt-2 px-1">
                      <h3 className="text-sm font-medium line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {product.category}
                      </p>

                      {/* Rating */}
                      {product.rating && (
                        <div className="flex items-center gap-1 mt-1">
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-3 w-3",
                                  i < Math.floor(product.rating)
                                    ? "text-amber-400 fill-amber-400"
                                    : "text-gray-300"
                                )}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            ({product.reviewCount})
                          </span>
                        </div>
                      )}

                      {/* Price */}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-semibold text-secondary">
                          {formatPrice(getDiscountedPrice(product))}
                        </span>
                        {product.discount && product.discount > 0 && (
                          <span className="text-xs line-through text-muted-foreground">
                            {formatPrice(product.basePrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom navigation buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <Button
              size="icon"
              variant="outline"
              className="swiper-prev h-8 w-8 rounded-full border-secondary/50 text-secondary hover:bg-secondary hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="swiper-next h-8 w-8 rounded-full border-secondary/50 text-secondary hover:bg-secondary hover:text-white"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Custom pagination container */}
          <div className="new-arrivals-pagination flex justify-center mt-6"></div>
        </div>

        <div
          className={cn(
            "flex justify-center mt-10 transition-all duration-700 transform",
            visibleSections.includes(1)
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
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
  );
}
