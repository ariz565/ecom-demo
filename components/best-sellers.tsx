"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, Eye, ShoppingCart, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { toast } from "sonner";

// Using the existing product type, but ensuring we reference the correct fields
import type { ProductType } from "@/components/productcard/product-card";

const products: ProductType[] = [
  {
    id: 201,
    name: "Classic Oxford Shirt",
    basePrice: 3499,
    category: "Shirts",
    description:
      "Timeless Oxford shirt crafted from premium cotton for everyday sophistication and comfort.",
    badges: [
      {
        text: "Best Seller",
        color: "bg-primary",
      },
    ],
    rating: 4.9,
    reviewCount: 245,
    isBestSeller: true,
    variants: [
      {
        color: "blue",
        colorName: "Sky Blue",
        colorCode: "#87CEEB",
        images: [
          "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=400&h=500&auto=format&fit=crop",
        ],
        sizes: [
          { name: "S", price: 3499, stock: 20 },
          { name: "M", price: 3499, stock: 32 },
          { name: "L", price: 3499, stock: 15 },
          { name: "XL", price: 3899, stock: 8 },
        ],
      },
      {
        color: "white",
        colorName: "White",
        colorCode: "#FFFFFF",
        images: [
          "https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=400&h=500&auto=format&fit=crop",
        ],
        sizes: [
          { name: "S", price: 3499, stock: 18 },
          { name: "M", price: 3499, stock: 26 },
          { name: "L", price: 3499, stock: 12 },
          { name: "XL", price: 3899, stock: 5 },
        ],
      },
      {
        color: "pink",
        colorName: "Light Pink",
        colorCode: "#FFB6C1",
        images: [
          "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?q=80&w=400&h=500&auto=format&fit=crop",
        ],
        sizes: [
          { name: "S", price: 3499, stock: 15 },
          { name: "M", price: 3499, stock: 22 },
          { name: "L", price: 3499, stock: 10 },
          { name: "XL", price: 3899, stock: 0 },
        ],
      },
    ],
  },
  {
    id: 202,
    name: "Slim Fit Chinos",
    basePrice: 2799,
    category: "Pants",
    description:
      "Modern slim fit chinos designed for comfort and style. Perfect for both casual and semi-formal occasions.",
    badges: [
      {
        text: "Best Seller",
        color: "bg-primary",
      },
    ],
    rating: 4.7,
    reviewCount: 189,
    isBestSeller: true,
    discount: 10,
    variants: [
      {
        color: "beige",
        colorName: "Khaki",
        colorCode: "#F5F5DC",
        images: [
          "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=400&h=500&auto=format&fit=crop",
        ],
        sizes: [
          { name: "30", price: 2799, stock: 14 },
          { name: "32", price: 2799, stock: 22 },
          { name: "34", price: 2799, stock: 18 },
          { name: "36", price: 3099, stock: 7 },
        ],
      },
      {
        color: "navy",
        colorName: "Navy Blue",
        colorCode: "#000080",
        images: [
          "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=400&h=500&auto=format&fit=crop",
        ],
        sizes: [
          { name: "30", price: 2799, stock: 12 },
          { name: "32", price: 2799, stock: 19 },
          { name: "34", price: 2799, stock: 15 },
          { name: "36", price: 3099, stock: 6 },
        ],
      },
      {
        color: "gray",
        colorName: "Charcoal Gray",
        colorCode: "#36454F",
        images: [
          "https://images.unsplash.com/photo-1490551646139-5be357ab8148?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1490551646139-5be357ab8148?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1490551646139-5be357ab8148?q=80&w=400&h=500&auto=format&fit=crop",
        ],
        sizes: [
          { name: "30", price: 2799, stock: 10 },
          { name: "32", price: 2799, stock: 17 },
          { name: "34", price: 2799, stock: 13 },
          { name: "36", price: 3099, stock: 4 },
        ],
      },
    ],
  },
  {
    id: 203,
    name: "Leather Jacket",
    basePrice: 8999,
    category: "Outerwear",
    description:
      "Luxurious leather jacket with a classic design. Built to last and improve with age.",
    badges: [
      {
        text: "Best Seller",
        color: "bg-primary",
      },
    ],
    rating: 4.8,
    reviewCount: 173,
    isBestSeller: true,
    variants: [
      {
        color: "brown",
        colorName: "Vintage Brown",
        colorCode: "#964B00",
        images: [
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400&h=500&auto=format&fit=crop",
        ],
        sizes: [
          { name: "S", price: 8999, stock: 7 },
          { name: "M", price: 8999, stock: 12 },
          { name: "L", price: 8999, stock: 9 },
          { name: "XL", price: 9799, stock: 5 },
        ],
      },
      {
        color: "black",
        colorName: "Black",
        colorCode: "#000000",
        images: [
          "https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=400&h=500&auto=format&fit=crop",
        ],
        sizes: [
          { name: "S", price: 8999, stock: 8 },
          { name: "M", price: 8999, stock: 13 },
          { name: "L", price: 8999, stock: 10 },
          { name: "XL", price: 9799, stock: 6 },
        ],
      },
    ],
  },
  {
    id: 204,
    name: "Premium Denim Jeans",
    basePrice: 4599,
    category: "Pants",
    description:
      "Premium quality denim jeans with perfect fit and exceptional durability. A wardrobe essential.",
    badges: [
      {
        text: "Best Seller",
        color: "bg-primary",
      },
    ],
    rating: 4.6,
    reviewCount: 211,
    isBestSeller: true,
    discount: 15,
    variants: [
      {
        color: "blue",
        colorName: "Indigo Blue",
        colorCode: "#3F51B5",
        images: [
          "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=400&h=500&auto=format&fit=crop",
        ],
        sizes: [
          { name: "30", price: 4599, stock: 16 },
          { name: "32", price: 4599, stock: 24 },
          { name: "34", price: 4599, stock: 19 },
          { name: "36", price: 4999, stock: 8 },
        ],
      },
      {
        color: "black",
        colorName: "Black",
        colorCode: "#000000",
        images: [
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=400&h=500&auto=format&fit=crop",
        ],
        sizes: [
          { name: "30", price: 4599, stock: 14 },
          { name: "32", price: 4599, stock: 22 },
          { name: "34", price: 4599, stock: 17 },
          { name: "36", price: 4999, stock: 7 },
        ],
      },
      {
        color: "gray",
        colorName: "Washed Gray",
        colorCode: "#808080",
        images: [
          "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?q=80&w=400&h=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?q=80&w=400&h=500&auto=format&fit=crop",
        ],
        sizes: [
          { name: "30", price: 4599, stock: 12 },
          { name: "32", price: 4599, stock: 20 },
          { name: "34", price: 4599, stock: 15 },
          { name: "36", price: 4999, stock: 6 },
        ],
      },
    ],
  },
];

export default function EnhancedBestSellers() {
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [animating, setAnimating] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  // Static categories list
  const categories = [
    "All",
    "Shirts",
    "Tshirts",
    "Jeans",
    "Trousers",
    "Lowers",
    "Pants",
    "Outerwear",
  ];

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

  // Modified filter logic to handle the custom categories
  const filteredProducts = (() => {
    if (activeCategory === "All") {
      return products;
    }

    // Group related categories for filtering
    const categoryMappings: Record<string, string[]> = {
      Pants: ["Pants", "Trousers", "Lowers", "Jeans"],
      Tshirts: ["Tshirts", "T-Shirts"],
      Shirts: ["Shirts"],
      Outerwear: ["Outerwear"],
      Jeans: ["Jeans"],
      Trousers: ["Trousers", "Pants"],
      Lowers: ["Lowers", "Pants", "Trousers"],
    };

    const relatedCategories = categoryMappings[activeCategory] || [
      activeCategory,
    ];

    return products.filter((product) =>
      relatedCategories.some(
        (cat) =>
          product.category.toLowerCase() === cat.toLowerCase() ||
          product.description?.toLowerCase().includes(cat.toLowerCase())
      )
    );
  })();

  // Helper functions
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getDiscountedPrice = (product: ProductType) => {
    const price = product.basePrice;
    const discount = product.discount || 0;
    return discount > 0 ? price * (1 - discount / 100) : price;
  };

  // Action handlers
  const handleAddToCart = (product: ProductType, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = (product: ProductType, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`${product.name} added to wishlist!`);
  };

  const handleQuickView = (product: ProductType, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.info(`Quick view: ${product.name}`);
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #ffffff, #f8f9fa)",
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full" />
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-secondary/5 rounded-full" />
        <div className="absolute -bottom-40 left-1/3 w-80 h-80 bg-tertiary/5 rounded-full" />
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Best Sellers
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mb-6 mx-auto"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our most popular products based on customer preferences and sales.
              Quality you can trust.
            </p>
          </div>
        </div>

        {/* Category filters */}
        <div
          className={cn(
            "flex gap-2 mb-6 overflow-x-auto pb-2 transition-all duration-700 transform",
            visibleSections.includes(1)
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          )}
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              className={cn(
                "transition-all whitespace-nowrap",
                activeCategory === category ? "bg-primary text-white" : ""
              )}
              onClick={() => {
                setAnimating(true);
                setActiveCategory(category);
                setTimeout(() => setAnimating(false), 300);
              }}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products swiper */}
        <div
          className={cn(
            "transition-opacity duration-300",
            animating ? "opacity-0" : "opacity-100"
          )}
        >
          <Swiper
            modules={[Pagination, Navigation]}
            pagination={{
              clickable: true,
              el: ".best-sellers-pagination",
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
            {filteredProducts.map((product, index) => (
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
                        src={
                          product.variants?.[0].images[0] || "/placeholder.jpg"
                        }
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

                      {/* Best Seller tag */}
                      {product.isBestSeller && (
                        <div className="absolute top-2 right-2 z-10">
                          <Badge className="bg-primary text-white px-2 py-1 text-xs font-medium">
                            Best Seller
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
                          className="h-8 w-8 rounded-full bg-white text-gray-900 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                          aria-label="Add to cart"
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => handleAddToWishlist(product, e)}
                          className="h-8 w-8 rounded-full bg-white text-gray-900 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                          aria-label="Add to wishlist"
                        >
                          <Heart className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => handleQuickView(product, e)}
                          className="h-8 w-8 rounded-full bg-white text-gray-900 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
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
                        <span className="text-sm font-semibold text-primary">
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
              className="swiper-prev h-8 w-8 rounded-full border-primary/50 text-primary hover:bg-primary hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="swiper-next h-8 w-8 rounded-full border-primary/50 text-primary hover:bg-primary hover:text-white"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Custom pagination container */}
          <div className="best-sellers-pagination flex justify-center mt-6"></div>
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
            className="group border-primary text-primary hover:bg-primary hover:text-white"
          >
            <Link href="/best-sellers">
              View All Best Sellers
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
