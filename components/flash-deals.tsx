"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Type for standardized flash deal structure
type StandardizedFlashDeal = {
  id: number;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  image: string;
  category: string;
  endTime: Date;
  colors: { code: string; name: string }[];
  sizes: { name: string; price: number; stock: number }[];
};

// Original flash deal type for backward compatibility
type FlashDeal = {
  id: number;
  name: string;
  originalPrice?: number;
  basePrice?: number;
  discountedPrice?: number;
  discount?: number;
  discountPercentage?: number;
  image?: string;
  category: string;
  endTime?: Date;
  colors?: string[];
  sizes?: { name: string; price: number; stock: number }[];
  description?: string;
  variants?: {
    color: string;
    colorName: string;
    colorCode: string;
    images: string[];
    sizes: { name: string; price: number; stock: number }[];
  }[];
  badges?: { text: string; color: string }[];
  rating?: number;
  reviewCount?: number;
};

// Original flash deals data
const flashDealsData: FlashDeal[] = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    originalPrice: 1999,
    discountedPrice: 999,
    discountPercentage: 50,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&h=500&auto=format&fit=crop",
    category: "T-Shirts",
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    colors: ["#000000", "#FFFFFF", "#6C63FF", "#E83A59"],
    sizes: [
      { name: "S", price: 999, stock: 10 },
      { name: "M", price: 999, stock: 15 },
      { name: "L", price: 1099, stock: 8 },
      { name: "XL", price: 1199, stock: 5 },
    ],
  },
  {
    id: 2,
    name: "Slim Fit Denim Jeans",
    originalPrice: 3999,
    discountedPrice: 2399,
    discountPercentage: 40,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=400&h=500&auto=format&fit=crop",
    category: "Jeans",
    endTime: new Date(Date.now() + 12 * 60 * 60 * 1000),
    colors: ["#000080", "#1E2F4D", "#4A4A4A"],
    sizes: [
      { name: "30", price: 2399, stock: 7 },
      { name: "32", price: 2399, stock: 12 },
      { name: "34", price: 2499, stock: 9 },
      { name: "36", price: 2599, stock: 4 },
    ],
  },
  {
    id: 3,
    name: "Casual Sneakers",
    originalPrice: 4999,
    discountedPrice: 2999,
    discountPercentage: 40,
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=400&h=500&auto=format&fit=crop",
    category: "Footwear",
    endTime: new Date(Date.now() + 8 * 60 * 60 * 1000),
    colors: ["#FFFFFF", "#000000", "#E83A59"],
    sizes: [
      { name: "UK 7", price: 2999, stock: 6 },
      { name: "UK 8", price: 2999, stock: 8 },
      { name: "UK 9", price: 3099, stock: 5 },
    ],
  },
  {
    id: 101,
    name: "Premium Denim Jacket",
    basePrice: 4999,
    category: "Outerwear",
    description:
      "Stylish denim jacket perfect for layering in any season. Features quality craftsmanship and classic design.",
    badges: [
      {
        text: "Limited Time",
        color: "bg-red-500",
      },
    ],
    discount: 40,
    rating: 4.8,
    reviewCount: 156,
    isTrending: true,
    variants: [
      {
        color: "blue",
        colorName: "Indigo Blue",
        colorCode: "#3b5998",
        images: [
          "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1576871337649-a4903a5f5fa8?q=80&w=400&h=500&auto=format&fit=crop",
        ],
        sizes: [
          { name: "S", price: 4999, stock: 12 },
          { name: "M", price: 4999, stock: 15 },
          { name: "L", price: 4999, stock: 8 },
          { name: "XL", price: 5499, stock: 6 },
        ],
      },
      {
        color: "black",
        colorName: "Vintage Black",
        colorCode: "#000000",
        images: [
          "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1611312449537-86145f0b618c?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1611312449297-a1b5b9a9f04e?q=80&w=400&h=500&auto=format&fit=crop",
        ],
        sizes: [
          { name: "S", price: 4999, stock: 7 },
          { name: "M", price: 4999, stock: 9 },
          { name: "L", price: 4999, stock: 5 },
          { name: "XL", price: 5499, stock: 0 },
        ],
      },
    ],
  },
  {
    id: 102,
    name: "Premium Leather Wallet",
    basePrice: 1999,
    category: "Accessories",
    description:
      "Handcrafted genuine leather wallet with multiple card slots and RFID protection technology.",
    badges: [
      {
        text: "Flash Sale",
        color: "bg-tertiary",
      },
    ],
    discount: 35,
    rating: 4.6,
    reviewCount: 98,
    variants: [
      {
        color: "brown",
        colorName: "Tan Brown",
        colorCode: "#A47551",
        images: [
          "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=400&h=500&auto=format&fit=crop",
        ],
        sizes: [{ name: "One Size", price: 1999, stock: 25 }],
      },
      {
        color: "black",
        colorName: "Classic Black",
        colorCode: "#000000",
        images: [
          "https://images.unsplash.com/photo-1623998021661-4ae1f8202b9e?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1623998021661-4ae1f8202b9e?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1623998021661-4ae1f8202b9e?q=80&w=400&h=500&auto=format&fit=crop",
        ],
        sizes: [{ name: "One Size", price: 1999, stock: 18 }],
      },
    ],
  },
  {
    id: 103,
    name: "Smart Fitness Watch",
    basePrice: 7999,
    category: "Accessories",
    description:
      "Premium smart watch with fitness tracking, heart rate monitoring, and smartphone notifications.",
    badges: [
      {
        text: "Hot Deal",
        color: "bg-secondary",
      },
    ],
    discount: 25,
    rating: 4.7,
    reviewCount: 203,
    variants: [
      {
        color: "black",
        colorName: "Midnight Black",
        colorCode: "#000000",
        images: [
          "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&h=500&auto=format&fit=crop",
        ],
        sizes: [{ name: "One Size", price: 7999, stock: 15 }],
      },
      {
        color: "silver",
        colorName: "Silver",
        colorCode: "#C0C0C0",
        images: [
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=400&h=500&auto=format&fit=crop",
        ],
        sizes: [{ name: "One Size", price: 7999, stock: 8 }],
      },
    ],
  },
];

// Function to standardize flash deal data
const standardizeFlashDeals = (deals: FlashDeal[]): StandardizedFlashDeal[] => {
  return deals.map((deal) => {
    // For newer product structure (with variants)
    if (deal.variants) {
      const firstVariant = deal.variants[0]; // Use first variant as default
      const discountPercentage = deal.discount || 0;
      const originalPrice = deal.basePrice || 0;
      const discountedPrice = Math.round(
        originalPrice * (1 - discountPercentage / 100)
      );

      return {
        id: deal.id,
        name: deal.name,
        originalPrice,
        discountedPrice,
        discountPercentage,
        image: firstVariant.images[0],
        category: deal.category,
        endTime: new Date(
          Date.now() + (Math.random() * 24 + 1) * 60 * 60 * 1000
        ), // Random end time in the next 24 hours
        colors: deal.variants.map((v) => ({
          code: v.colorCode,
          name: v.colorName,
        })),
        sizes: firstVariant.sizes,
      };
    }
    // For original product structure
    else {
      return {
        id: deal.id,
        name: deal.name,
        originalPrice: deal.originalPrice || 0,
        discountedPrice: deal.discountedPrice || 0,
        discountPercentage: deal.discountPercentage || 0,
        image: deal.image || "",
        category: deal.category,
        endTime: deal.endTime || new Date(Date.now() + 24 * 60 * 60 * 1000),
        colors: (deal.colors || []).map((code) => ({ code, name: "" })),
        sizes: deal.sizes || [],
      };
    }
  });
};

// Standardize flash deals
const flashDeals = standardizeFlashDeals(flashDealsData);

export default function FlashDeals() {
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState<{
    [key: number]: { hours: number; minutes: number; seconds: number };
  }>({});
  const [selectedColor, setSelectedColor] = useState<{ [key: number]: string }>(
    {}
  );
  const [selectedSize, setSelectedSize] = useState<{ [key: number]: string }>(
    {}
  );
  const [currentPrice, setCurrentPrice] = useState<{ [key: number]: number }>(
    {}
  );
  const [currentStock, setCurrentStock] = useState<{ [key: number]: number }>(
    {}
  );

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialColors: { [key: number]: string } = {};
    const initialSizes: { [key: number]: string } = {};
    const initialPrices: { [key: number]: number } = {};
    const initialStocks: { [key: number]: number } = {};

    flashDeals.forEach((deal) => {
      initialColors[deal.id] = deal.colors[0]?.code || "";
      initialSizes[deal.id] = deal.sizes[0]?.name || "";
      initialPrices[deal.id] = deal.sizes[0]?.price || deal.discountedPrice;
      initialStocks[deal.id] = deal.sizes[0]?.stock || 0;
    });

    setSelectedColor(initialColors);
    setSelectedSize(initialSizes);
    setCurrentPrice(initialPrices);
    setCurrentStock(initialStocks);
  }, []);

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

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const newTimeLeft: {
        [key: number]: { hours: number; minutes: number; seconds: number };
      } = {};

      flashDeals.forEach((deal) => {
        const difference = deal.endTime.getTime() - now.getTime();

        if (difference > 0) {
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((difference / 1000 / 60) % 60);
          const seconds = Math.floor((difference / 1000) % 60);

          newTimeLeft[deal.id] = { hours, minutes, seconds };
        } else {
          newTimeLeft[deal.id] = { hours: 0, minutes: 0, seconds: 0 };
        }
      });

      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleColorChange = (dealId: number, color: string) => {
    setSelectedColor((prev) => ({ ...prev, [dealId]: color }));

    // If product has variants, update sizes based on selected color
    const deal = flashDeals.find((d) => d.id === dealId);
    if (deal) {
      // Find sizes for this color if we're working with variant-based products
      const colorVariantIndex = deal.colors.findIndex((c) => c.code === color);
      if (colorVariantIndex >= 0 && colorVariantIndex < deal.sizes.length) {
        setSelectedSize((prev) => ({
          ...prev,
          [dealId]: deal.sizes[0]?.name || "",
        }));
        setCurrentPrice((prev) => ({
          ...prev,
          [dealId]: deal.sizes[0]?.price || deal.discountedPrice,
        }));
        setCurrentStock((prev) => ({
          ...prev,
          [dealId]: deal.sizes[0]?.stock || 0,
        }));
      }
    }
  };

  const handleSizeChange = (dealId: number, size: string) => {
    setSelectedSize((prev) => ({ ...prev, [dealId]: size }));
    const deal = flashDeals.find((d) => d.id === dealId);
    if (deal) {
      const sizeInfo = deal.sizes.find((s) => s.name === size);
      if (sizeInfo) {
        setCurrentPrice((prev) => ({ ...prev, [dealId]: sizeInfo.price }));
        setCurrentStock((prev) => ({ ...prev, [dealId]: sizeInfo.stock }));
      }
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatTime = (time: {
    hours: number;
    minutes: number;
    seconds: number;
  }) => {
    return `${String(time.hours).padStart(2, "0")}:${String(
      time.minutes
    ).padStart(2, "0")}:${String(time.seconds).padStart(2, "0")}`;
  };

  return (
    <section ref={sectionRef} className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-orange-50 opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div
          className={cn(
            "flex flex-col items-center mb-8 transition-all duration-700 transform",
            visibleSections.includes(1)
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
              LIVE
            </span>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Flash Deals
            </h2>
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-orange-500 mb-4"></div>
          <p className="text-sm text-muted-foreground text-center max-w-2xl">
            Limited-time offers at unbeatable prices. Hurry before they're gone!
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Swiper
            modules={[Pagination]}
            pagination={{
              clickable: true,
              el: ".flash-deals-pagination",
            }}
            slidesPerView={2}
            spaceBetween={16}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 16 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="w-full"
          >
            {flashDeals.map((deal, index) => (
              <SwiperSlide key={deal.id}>
                <Card
                  className={cn(
                    "group border-none shadow-md overflow-hidden transition-all duration-500 transform hover:shadow-xl h-full",
                    visibleSections.includes(1)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={deal.image || "/placeholder.svg"}
                      alt={deal.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-0 left-0 w-full p-2 flex justify-between items-center">
                      <span className="px-1 py-1 bg-red-500 text-white text-xs font-bold rounded">
                        {deal.discountPercentage}% OFF
                      </span>
                      <div className="flex items-center gap-1 px-2 py-1 bg-black/70 text-white text-xs font-mono rounded">
                        <Clock className="h-3 w-3" />
                        {timeLeft[deal.id]
                          ? formatTime(timeLeft[deal.id])
                          : "00:00:00"}
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex flex-col text-white">
                        <span className="text-xs opacity-80">
                          {deal.category}
                        </span>
                        <h3 className="font-medium text-sm sm:text-base line-clamp-1">
                          {deal.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-bold">
                            {formatPrice(
                              currentPrice[deal.id] || deal.discountedPrice
                            )}
                          </span>
                          <span className="text-xs line-through opacity-70">
                            {formatPrice(deal.originalPrice)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="pt-3 px-3 pb-0">
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Color:
                        </p>
                        <div className="flex gap-1">
                          {deal.colors.map((color) => (
                            <button
                              key={color.code}
                              className={cn(
                                "w-4 h-4 rounded-full transition-all",
                                selectedColor[deal.id] === color.code
                                  ? "ring-1 ring-offset-1 ring-primary"
                                  : ""
                              )}
                              style={{ backgroundColor: color.code }}
                              onClick={() =>
                                handleColorChange(deal.id, color.code)
                              }
                              aria-label={`Select color ${
                                color.name || color.code
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Size:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {deal.sizes.map((size) => (
                            <button
                              key={size.name}
                              className={cn(
                                "px-2 py-0.5 border rounded text-xs transition-all",
                                selectedSize[deal.id] === size.name
                                  ? "bg-primary text-white border-primary"
                                  : "border-gray-300 hover:border-primary",
                                size.stock === 0 &&
                                  "opacity-50 cursor-not-allowed"
                              )}
                              onClick={() =>
                                size.stock > 0 &&
                                handleSizeChange(deal.id, size.name)
                              }
                              disabled={size.stock === 0}
                            >
                              {size.name}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="text-xs">
                        <span
                          className={cn(
                            "font-medium",
                            (currentStock[deal.id] || 0) < 5
                              ? "text-red-500"
                              : "text-green-600"
                          )}
                        >
                          {(currentStock[deal.id] || 0) > 0
                            ? `${currentStock[deal.id]} in stock`
                            : "Out of stock"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 pb-3 px-3 flex gap-1">
                    <Button
                      className="w-full text-xs py-1 h-auto bg-primary hover:bg-primary/90"
                      disabled={(currentStock[deal.id] || 0) <= 0}
                    >
                      Add to Cart
                    </Button>
                    <Button variant="outline" size="icon" className="h-7 w-7">
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </CardFooter>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom pagination container */}
          <div className="flash-deals-pagination flex justify-center mt-6"></div>
        </div>

        <div className="flex justify-center mt-8">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="group border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            <Link href="/flash-deals">
              View All Flash Deals
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
