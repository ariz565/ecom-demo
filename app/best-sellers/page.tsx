"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import EnhancedProductCard, {
  Product,
} from "@/components/enhanced-product-card";
import AnimatedBackground from "@/components/animated-background";

// Sample best seller products
const bestSellerProducts: Product[] = [
  {
    id: 1,
    name: "Premium Cotton Oxford Shirt",
    basePrice: 2499,
    category: "Shirts",
    badge: {
      text: "Best Seller",
      color: "bg-blue-500",
    },
    variants: [
      {
        color: "#FFFFFF",
        colorName: "White",
        sizes: [
          { name: "S", price: 2499, stock: 10 },
          { name: "M", price: 2499, stock: 15 },
          { name: "L", price: 2599, stock: 8 },
          { name: "XL", price: 2699, stock: 5 },
        ],
        image:
          "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=400&h=500&auto=format&fit=crop",
      },
      {
        color: "#87CEEB",
        colorName: "Light Blue",
        sizes: [
          { name: "S", price: 2499, stock: 7 },
          { name: "M", price: 2499, stock: 12 },
          { name: "L", price: 2599, stock: 6 },
          { name: "XL", price: 2699, stock: 3 },
        ],
        image:
          "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=400&h=500&auto=format&fit=crop",
      },
      {
        color: "#000000",
        colorName: "Black",
        sizes: [
          { name: "S", price: 2499, stock: 8 },
          { name: "M", price: 2499, stock: 10 },
          { name: "L", price: 2599, stock: 5 },
          { name: "XL", price: 2699, stock: 0 },
        ],
        image:
          "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=400&h=500&auto=format&fit=crop",
      },
    ],
    description:
      "A premium cotton Oxford shirt perfect for both casual and formal occasions. Features a comfortable fit and durable construction.",
    rating: 4.5,
    reviewCount: 128,
  },
  {
    id: 3,
    name: "Leather Jacket",
    basePrice: 7999,
    category: "Outerwear",
    badge: {
      text: "Premium",
      color: "bg-amber-500",
    },
    variants: [
      {
        color: "#6B4423",
        colorName: "Brown",
        sizes: [
          { name: "S", price: 7999, stock: 5 },
          { name: "M", price: 7999, stock: 8 },
          { name: "L", price: 8499, stock: 6 },
          { name: "XL", price: 8999, stock: 3 },
        ],
        image:
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400&h=500&auto=format&fit=crop",
      },
      {
        color: "#000000",
        colorName: "Black",
        sizes: [
          { name: "S", price: 7999, stock: 4 },
          { name: "M", price: 7999, stock: 7 },
          { name: "L", price: 8499, stock: 5 },
          { name: "XL", price: 8999, stock: 2 },
        ],
        image:
          "https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=400&h=500&auto=format&fit=crop",
      },
    ],
    description:
      "Premium leather jacket with a classic design. Features a soft inner lining and durable construction for long-lasting wear.",
    rating: 4.8,
    reviewCount: 64,
  },
  {
    id: 4,
    name: "Premium Denim Jeans",
    basePrice: 3499,
    category: "Pants",
    variants: [
      {
        color: "#1E2F4D",
        colorName: "Dark Blue",
        sizes: [
          { name: "30", price: 3499, stock: 15 },
          { name: "32", price: 3499, stock: 20 },
          { name: "34", price: 3699, stock: 12 },
          { name: "36", price: 3899, stock: 8 },
        ],
        image:
          "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=400&h=500&auto=format&fit=crop",
      },
      {
        color: "#000000",
        colorName: "Black",
        sizes: [
          { name: "30", price: 3499, stock: 10 },
          { name: "32", price: 3499, stock: 15 },
          { name: "34", price: 3699, stock: 8 },
          { name: "36", price: 3899, stock: 5 },
        ],
        image:
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=400&h=500&auto=format&fit=crop",
      },
    ],
    description:
      "Premium denim jeans with a classic five-pocket design. Features a comfortable stretch fabric and durable construction.",
    rating: 4.6,
    reviewCount: 112,
  },
  {
    id: 5,
    name: "Casual Sneakers",
    basePrice: 4999,
    category: "Footwear",
    badge: {
      text: "New",
      color: "bg-green-500",
    },
    variants: [
      {
        color: "#FFFFFF",
        colorName: "White",
        sizes: [
          { name: "UK 7", price: 4999, stock: 10 },
          { name: "UK 8", price: 4999, stock: 15 },
          { name: "UK 9", price: 5199, stock: 8 },
          { name: "UK 10", price: 5399, stock: 5 },
        ],
        image:
          "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=400&h=500&auto=format&fit=crop",
      },
      {
        color: "#000000",
        colorName: "Black",
        sizes: [
          { name: "UK 7", price: 4999, stock: 8 },
          { name: "UK 8", price: 4999, stock: 12 },
          { name: "UK 9", price: 5199, stock: 6 },
          { name: "UK 10", price: 5399, stock: 3 },
        ],
        image:
          "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=400&h=500&auto=format&fit=crop",
      },
    ],
    description:
      "Casual sneakers with a modern design. Features a comfortable fit and durable construction for everyday wear.",
    rating: 4.7,
    reviewCount: 86,
  },
  {
    id: 8,
    name: "Tailored Blazer",
    basePrice: 6999,
    category: "Formal",
    badge: {
      text: "Premium",
      color: "bg-amber-500",
    },
    variants: [
      {
        color: "#1E2F4D",
        colorName: "Navy",
        sizes: [
          { name: "S", price: 6999, stock: 6 },
          { name: "M", price: 6999, stock: 10 },
          { name: "L", price: 7499, stock: 5 },
          { name: "XL", price: 7999, stock: 3 },
        ],
        image:
          "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=400&h=500&auto=format&fit=crop",
      },
      {
        color: "#000000",
        colorName: "Black",
        sizes: [
          { name: "S", price: 6999, stock: 5 },
          { name: "M", price: 6999, stock: 8 },
          { name: "L", price: 7499, stock: 4 },
          { name: "XL", price: 7999, stock: 2 },
        ],
        image:
          "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=400&h=500&auto=format&fit=crop",
      },
    ],
    description:
      "Tailored blazer made from premium wool blend. Features a classic fit and elegant design for formal occasions.",
    rating: 4.7,
    reviewCount: 52,
  },
  {
    id: 9,
    name: "Graphic Print T-Shirt",
    basePrice: 1499,
    category: "T-Shirts",
    badge: {
      text: "Trending",
      color: "bg-purple-500",
    },
    variants: [
      {
        color: "#FFFFFF",
        colorName: "White",
        sizes: [
          { name: "S", price: 1499, stock: 15 },
          { name: "M", price: 1499, stock: 20 },
          { name: "L", price: 1599, stock: 12 },
          { name: "XL", price: 1699, stock: 8 },
        ],
        image:
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=400&h=500&auto=format&fit=crop",
      },
      {
        color: "#000000",
        colorName: "Black",
        sizes: [
          { name: "S", price: 1499, stock: 12 },
          { name: "M", price: 1499, stock: 18 },
          { name: "L", price: 1599, stock: 10 },
          { name: "XL", price: 1699, stock: 6 },
        ],
        image:
          "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=400&h=500&auto=format&fit=crop",
      },
    ],
    description:
      "Graphic print t-shirt made from soft cotton. Features a comfortable fit and unique design for casual wear.",
    rating: 4.2,
    reviewCount: 98,
  },
  {
    id: 2,
    name: "Slim Fit Chinos",
    basePrice: 1999,
    category: "Pants",
    variants: [
      {
        color: "#1E2F4D",
        colorName: "Navy",
        sizes: [
          { name: "30", price: 1999, stock: 12 },
          { name: "32", price: 1999, stock: 15 },
          { name: "34", price: 2099, stock: 10 },
          { name: "36", price: 2199, stock: 5 },
        ],
        image:
          "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=400&h=500&auto=format&fit=crop",
      },
      {
        color: "#8C7D70",
        colorName: "Khaki",
        sizes: [
          { name: "30", price: 1999, stock: 8 },
          { name: "32", price: 1999, stock: 14 },
          { name: "34", price: 2099, stock: 7 },
          { name: "36", price: 2199, stock: 3 },
        ],
        image:
          "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=400&h=500&auto=format&fit=crop",
      },
    ],
    description:
      "Slim fit chinos made from premium cotton twill. Features a comfortable stretch fabric and classic design.",
    rating: 4.3,
    reviewCount: 96,
  },
  {
    id: 7,
    name: "Wool Blend Sweater",
    basePrice: 3499,
    category: "Knitwear",
    variants: [
      {
        color: "#1E2F4D",
        colorName: "Navy",
        sizes: [
          { name: "S", price: 3499, stock: 8 },
          { name: "M", price: 3499, stock: 12 },
          { name: "L", price: 3699, stock: 6 },
          { name: "XL", price: 3899, stock: 4 },
        ],
        image:
          "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=400&h=500&auto=format&fit=crop",
      },
      {
        color: "#8B4513",
        colorName: "Brown",
        sizes: [
          { name: "S", price: 3499, stock: 6 },
          { name: "M", price: 3499, stock: 10 },
          { name: "L", price: 3699, stock: 5 },
          { name: "XL", price: 3899, stock: 3 },
        ],
        image:
          "https://images.unsplash.com/photo-1638643391904-9b551ba91eaa?q=80&w=400&h=500&auto=format&fit=crop",
      },
    ],
    description:
      "Wool blend sweater with a classic design. Features a comfortable fit and warm construction for colder weather.",
    rating: 4.5,
    reviewCount: 68,
  },
];

export default function BestSellersPage() {
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
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <AnimatedBackground />

      <main className="flex-1 pt-16">
        {/* Hero Banner */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Best Sellers
              </h1>
              <p className="text-lg max-w-xl mx-auto">
                Our most popular products based on customer favorites and top
                sales
              </p>
            </div>
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 py-4">
          <div className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Best Sellers</span>
          </div>
        </div>

        <div ref={sectionRef} className="container mx-auto px-4 py-12">
          <div
            className={cn(
              "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-700 transform",
              visibleSections.includes(1)
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            )}
          >
            {bestSellerProducts.map((product, index) => (
              <EnhancedProductCard
                key={product.id}
                product={product}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
