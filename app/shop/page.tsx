"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  Filter,
  SlidersHorizontal,
  Grid3X3,
  LayoutGrid,
  ArrowUpDown,
  X,
  Heart,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import EnhancedProductCard, {
  Product,
} from "@/components/enhanced-product-card";
import AnimatedBackground from "@/components/animated-background";

// Sample product data
const products: Product[] = [
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
      {
        color: "#4A4A4A",
        colorName: "Charcoal",
        sizes: [
          { name: "30", price: 1999, stock: 6 },
          { name: "32", price: 1999, stock: 10 },
          { name: "34", price: 2099, stock: 4 },
          { name: "36", price: 2199, stock: 0 },
        ],
        image:
          "https://images.unsplash.com/photo-1490551632573-78c6c247f5d3?q=80&w=400&h=500&auto=format&fit=crop",
      },
    ],
    description:
      "Slim fit chinos made from premium cotton twill. Features a comfortable stretch fabric and classic design.",
    rating: 4.3,
    reviewCount: 96,
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
      {
        color: "#4A4A4A",
        colorName: "Grey",
        sizes: [
          { name: "30", price: 3499, stock: 8 },
          { name: "32", price: 3499, stock: 12 },
          { name: "34", price: 3699, stock: 6 },
          { name: "36", price: 3899, stock: 0 },
        ],
        image:
          "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?q=80&w=400&h=500&auto=format&fit=crop",
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
      {
        color: "#E83A59",
        colorName: "Red",
        sizes: [
          { name: "UK 7", price: 4999, stock: 5 },
          { name: "UK 8", price: 4999, stock: 8 },
          { name: "UK 9", price: 5199, stock: 4 },
          { name: "UK 10", price: 5399, stock: 0 },
        ],
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&h=500&auto=format&fit=crop",
      },
    ],
    description:
      "Casual sneakers with a modern design. Features a comfortable fit and durable construction for everyday wear.",
    rating: 4.7,
    reviewCount: 86,
  },
  {
    id: 6,
    name: "Formal Dress Shirt",
    basePrice: 2999,
    category: "Shirts",
    variants: [
      {
        color: "#FFFFFF",
        colorName: "White",
        sizes: [
          { name: "S", price: 2999, stock: 12 },
          { name: "M", price: 2999, stock: 18 },
          { name: "L", price: 3199, stock: 10 },
          { name: "XL", price: 3399, stock: 6 },
        ],
        image:
          "https://images.unsplash.com/photo-1563630423918-b58f07336ac9?q=80&w=400&h=500&auto=format&fit=crop",
      },
      {
        color: "#87CEEB",
        colorName: "Light Blue",
        sizes: [
          { name: "S", price: 2999, stock: 10 },
          { name: "M", price: 2999, stock: 15 },
          { name: "L", price: 3199, stock: 8 },
          { name: "XL", price: 3399, stock: 4 },
        ],
        image:
          "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?q=80&w=400&h=500&auto=format&fit=crop",
      },
      {
        color: "#FFC0CB",
        colorName: "Pink",
        sizes: [
          { name: "S", price: 2999, stock: 8 },
          { name: "M", price: 2999, stock: 12 },
          { name: "L", price: 3199, stock: 6 },
          { name: "XL", price: 3399, stock: 0 },
        ],
        image:
          "https://images.unsplash.com/photo-1626497764746-6dc36546b388?q=80&w=400&h=500&auto=format&fit=crop",
      },
    ],
    description:
      "Formal dress shirt made from premium cotton. Features a classic fit and elegant design for professional settings.",
    rating: 4.4,
    reviewCount: 74,
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
      {
        color: "#808080",
        colorName: "Grey",
        sizes: [
          { name: "S", price: 3499, stock: 7 },
          { name: "M", price: 3499, stock: 11 },
          { name: "L", price: 3699, stock: 5 },
          { name: "XL", price: 3899, stock: 0 },
        ],
        image:
          "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=400&h=500&auto=format&fit=crop",
      },
    ],
    description:
      "Wool blend sweater with a classic design. Features a comfortable fit and warm construction for colder weather.",
    rating: 4.5,
    reviewCount: 68,
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
      {
        color: "#808080",
        colorName: "Grey",
        sizes: [
          { name: "S", price: 6999, stock: 4 },
          { name: "M", price: 6999, stock: 7 },
          { name: "L", price: 7499, stock: 3 },
          { name: "XL", price: 7999, stock: 0 },
        ],
        image:
          "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=400&h=500&auto=format&fit=crop",
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
      {
        color: "#808080",
        colorName: "Grey",
        sizes: [
          { name: "S", price: 1499, stock: 10 },
          { name: "M", price: 1499, stock: 15 },
          { name: "L", price: 1599, stock: 8 },
          { name: "XL", price: 1699, stock: 0 },
        ],
        image:
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=400&h=500&auto=format&fit=crop",
      },
    ],
    description:
      "Graphic print t-shirt made from soft cotton. Features a comfortable fit and unique design for casual wear.",
    rating: 4.2,
    reviewCount: 98,
  },
  {
    id: 10,
    name: "Slim Fit Polo Shirt",
    basePrice: 1999,
    category: "Polos",
    variants: [
      {
        color: "#FFFFFF",
        colorName: "White",
        sizes: [
          { name: "S", price: 1999, stock: 12 },
          { name: "M", price: 1999, stock: 18 },
          { name: "L", price: 2099, stock: 10 },
          { name: "XL", price: 2199, stock: 6 },
        ],
        image:
          "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=400&h=500&auto=format&fit=crop",
      },
      {
        color: "#1E2F4D",
        colorName: "Navy",
        sizes: [
          { name: "S", price: 1999, stock: 10 },
          { name: "M", price: 1999, stock: 15 },
          { name: "L", price: 2099, stock: 8 },
          { name: "XL", price: 2199, stock: 4 },
        ],
        image:
          "https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=400&h=500&auto=format&fit=crop",
      },
      {
        color: "#E83A59",
        colorName: "Red",
        sizes: [
          { name: "S", price: 1999, stock: 8 },
          { name: "M", price: 1999, stock: 12 },
          { name: "L", price: 2099, stock: 6 },
          { name: "XL", price: 2199, stock: 0 },
        ],
        image:
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=400&h=500&auto=format&fit=crop",
      },
    ],
    description:
      "Slim fit polo shirt made from premium cotton pique. Features a classic design and comfortable fit for casual wear.",
    rating: 4.4,
    reviewCount: 82,
  },
  {
    id: 11,
    name: "Linen Summer Shorts",
    basePrice: 1799,
    category: "Shorts",
    variants: [
      {
        color: "#F5F5DC",
        colorName: "Beige",
        sizes: [
          { name: "30", price: 1799, stock: 10 },
          { name: "32", price: 1799, stock: 15 },
          { name: "34", price: 1899, stock: 8 },
          { name: "36", price: 1999, stock: 5 },
        ],
        image:
          "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=400&h=500&auto=format&fit=crop",
      },
      {
        color: "#1E2F4D",
        colorName: "Navy",
        sizes: [
          { name: "30", price: 1799, stock: 8 },
          { name: "32", price: 1799, stock: 12 },
          { name: "34", price: 1899, stock: 6 },
          { name: "36", price: 1999, stock: 3 },
        ],
        image:
          "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=400&h=500&auto=format&fit=crop",
      },
      {
        color: "#808080",
        colorName: "Grey",
        sizes: [
          { name: "30", price: 1799, stock: 6 },
          { name: "32", price: 1799, stock: 10 },
          { name: "34", price: 1899, stock: 5 },
          { name: "36", price: 1999, stock: 0 },
        ],
        image:
          "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=400&h=500&auto=format&fit=crop",
      },
    ],
    description:
      "Linen summer shorts with a comfortable fit. Features a lightweight construction and classic design for warm weather.",
    rating: 4.3,
    reviewCount: 76,
  },
  {
    id: 12,
    name: "Lightweight Bomber Jacket",
    basePrice: 4499,
    category: "Jackets",
    badge: {
      text: "New",
      color: "bg-green-500",
    },
    variants: [
      {
        color: "#1E2F4D",
        colorName: "Navy",
        sizes: [
          { name: "S", price: 4499, stock: 8 },
          { name: "M", price: 4499, stock: 12 },
          { name: "L", price: 4699, stock: 6 },
          { name: "XL", price: 4899, stock: 4 },
        ],
        image:
          "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=400&h=500&auto=format&fit=crop",
      },
      {
        color: "#000000",
        colorName: "Black",
        sizes: [
          { name: "S", price: 4499, stock: 7 },
          { name: "M", price: 4499, stock: 10 },
          { name: "L", price: 4699, stock: 5 },
          { name: "XL", price: 4899, stock: 3 },
        ],
        image:
          "https://images.unsplash.com/photo-1548126032-079a0fb0099d?q=80&w=400&h=500&auto=format&fit=crop",
      },
      {
        color: "#808080",
        colorName: "Grey",
        sizes: [
          { name: "S", price: 4499, stock: 6 },
          { name: "M", price: 4499, stock: 9 },
          { name: "L", price: 4699, stock: 4 },
          { name: "XL", price: 4899, stock: 0 },
        ],
        image:
          "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?q=80&w=400&h=500&auto=format&fit=crop",
      },
    ],
    description:
      "Lightweight bomber jacket with a modern design. Features a comfortable fit and durable construction for everyday wear.",
    rating: 4.6,
    reviewCount: 58,
  },
];

// Categories for filtering
const categories = [
  { id: "shirts", name: "Shirts" },
  { id: "t-shirts", name: "T-Shirts" },
  { id: "polos", name: "Polos" },
  { id: "pants", name: "Pants" },
  { id: "shorts", name: "Shorts" },
  { id: "outerwear", name: "Outerwear" },
  { id: "jackets", name: "Jackets" },
  { id: "knitwear", name: "Knitwear" },
  { id: "formal", name: "Formal" },
  { id: "footwear", name: "Footwear" },
];

// Colors for filtering
const colors = [
  { id: "white", name: "White", value: "#FFFFFF" },
  { id: "black", name: "Black", value: "#000000" },
  { id: "navy", name: "Navy", value: "#1E2F4D" },
  { id: "grey", name: "Grey", value: "#808080" },
  { id: "red", name: "Red", value: "#E83A59" },
  { id: "blue", name: "Light Blue", value: "#87CEEB" },
  { id: "brown", name: "Brown", value: "#8B4513" },
  { id: "beige", name: "Beige", value: "#F5F5DC" },
];

// Sizes for filtering
const sizes = [
  { id: "s", name: "S" },
  { id: "m", name: "M" },
  { id: "l", name: "L" },
  { id: "xl", name: "XL" },
  { id: "30", name: "30" },
  { id: "32", name: "32" },
  { id: "34", name: "34" },
  { id: "36", name: "36" },
  { id: "uk7", name: "UK 7" },
  { id: "uk8", name: "UK 8" },
  { id: "uk9", name: "UK 9" },
  { id: "uk10", name: "UK 10" },
];

export default function ShopPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State for filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // State for filtered products
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  // Apply filters
  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.includes(product.category.toLowerCase())
      );
    }

    // Filter by color
    if (selectedColors.length > 0) {
      result = result.filter((product) =>
        product.variants.some((variant) =>
          selectedColors.includes(variant.color.toLowerCase())
        )
      );
    }

    // Filter by size
    if (selectedSizes.length > 0) {
      result = result.filter((product) =>
        product.variants.some((variant) =>
          variant.sizes.some(
            (size) =>
              selectedSizes.includes(size.name.toLowerCase()) && size.stock > 0
          )
        )
      );
    }

    // Filter by price range
    result = result.filter(
      (product) =>
        product.basePrice >= priceRange[0] && product.basePrice <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case "price-low-high":
        result.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case "price-high-low":
        result.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case "newest":
        // In a real app, you would sort by date
        // Here we'll just use the ID as a proxy for "newest"
        result.sort((a, b) => b.id - a.id);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // "featured" - no specific sorting
        break;
    }

    setFilteredProducts(result);
  }, [selectedCategories, selectedColors, selectedSizes, priceRange, sortBy]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleColor = (colorId: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorId)
        ? prev.filter((id) => id !== colorId)
        : [...prev, colorId]
    );
  };

  const toggleSize = (sizeId: string) => {
    setSelectedSizes((prev) =>
      prev.includes(sizeId)
        ? prev.filter((id) => id !== sizeId)
        : [...prev, sizeId]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceRange([0, 10000]);
    setSortBy("featured");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <AnimatedBackground />

      <main className="flex-1 pt-16">
        {/* Hero Banner */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1920&h=600&auto=format&fit=crop"
            alt="Shop Banner"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Shop Collection
              </h1>
              <p className="text-lg max-w-xl mx-auto">
                Discover our latest styles and timeless classics
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
            <span>Shop</span>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters (Desktop) */}
            <div className="hidden lg:block w-64 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-primary hover:text-primary/80"
                >
                  Clear All
                </Button>
              </div>

              <Accordion
                type="multiple"
                defaultValue={["categories", "price", "colors", "sizes"]}
              >
                <AccordionItem value="categories">
                  <AccordionTrigger>Categories</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div
                          key={category.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`category-${category.id}`}
                            checked={selectedCategories.includes(category.id)}
                            onCheckedChange={() => toggleCategory(category.id)}
                          />
                          <label
                            htmlFor={`category-${category.id}`}
                            className="text-sm cursor-pointer"
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="price">
                  <AccordionTrigger>Price Range</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Slider
                        defaultValue={[0, 10000]}
                        max={10000}
                        step={500}
                        value={priceRange}
                        onValueChange={(value) =>
                          setPriceRange(value as [number, number])
                        }
                        className="my-6"
                      />
                      <div className="flex justify-between">
                        <span>{formatPrice(priceRange[0])}</span>
                        <span>{formatPrice(priceRange[1])}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="colors">
                  <AccordionTrigger>Colors</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-wrap gap-2">
                      {colors.map((color) => (
                        <button
                          key={color.id}
                          className={cn(
                            "w-8 h-8 rounded-full transition-all",
                            selectedColors.includes(color.id)
                              ? "ring-2 ring-offset-2 ring-primary"
                              : ""
                          )}
                          style={{ backgroundColor: color.value }}
                          onClick={() => toggleColor(color.id)}
                          aria-label={`Filter by color ${color.name}`}
                        />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="sizes">
                  <AccordionTrigger>Sizes</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((size) => (
                        <button
                          key={size.id}
                          className={cn(
                            "px-3 py-1 border rounded text-sm transition-all",
                            selectedSizes.includes(size.id)
                              ? "bg-primary text-white border-primary"
                              : "border-gray-300 hover:border-primary"
                          )}
                          onClick={() => toggleSize(size.id)}
                        >
                          {size.name}
                        </button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Mobile Filters */}
            <Sheet
              open={isMobileFilterOpen}
              onOpenChange={setIsMobileFilterOpen}
            >
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="lg:hidden flex items-center gap-2 mb-4"
                  onClick={() => setIsMobileFilterOpen(true)}
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Narrow down your product search
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-primary hover:text-primary/80 mb-4"
                  >
                    Clear All
                  </Button>

                  <Accordion
                    type="multiple"
                    defaultValue={["categories", "price", "colors", "sizes"]}
                  >
                    <AccordionItem value="categories">
                      <AccordionTrigger>Categories</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {categories.map((category) => (
                            <div
                              key={category.id}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`mobile-category-${category.id}`}
                                checked={selectedCategories.includes(
                                  category.id
                                )}
                                onCheckedChange={() =>
                                  toggleCategory(category.id)
                                }
                              />
                              <label
                                htmlFor={`mobile-category-${category.id}`}
                                className="text-sm cursor-pointer"
                              >
                                {category.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="price">
                      <AccordionTrigger>Price Range</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <Slider
                            defaultValue={[0, 10000]}
                            max={10000}
                            step={500}
                            value={priceRange}
                            onValueChange={(value) =>
                              setPriceRange(value as [number, number])
                            }
                            className="my-6"
                          />
                          <div className="flex justify-between">
                            <span>{formatPrice(priceRange[0])}</span>
                            <span>{formatPrice(priceRange[1])}</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="colors">
                      <AccordionTrigger>Colors</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-wrap gap-2">
                          {colors.map((color) => (
                            <button
                              key={color.id}
                              className={cn(
                                "w-8 h-8 rounded-full transition-all",
                                selectedColors.includes(color.id)
                                  ? "ring-2 ring-offset-2 ring-primary"
                                  : ""
                              )}
                              style={{ backgroundColor: color.value }}
                              onClick={() => toggleColor(color.id)}
                              aria-label={`Filter by color ${color.name}`}
                            />
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="sizes">
                      <AccordionTrigger>Sizes</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-wrap gap-2">
                          {sizes.map((size) => (
                            <button
                              key={size.id}
                              className={cn(
                                "px-3 py-1 border rounded text-sm transition-all",
                                selectedSizes.includes(size.id)
                                  ? "bg-primary text-white border-primary"
                                  : "border-gray-300 hover:border-primary"
                              )}
                              onClick={() => toggleSize(size.id)}
                            >
                              {size.name}
                            </button>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div className="mt-6">
                  <Button
                    className="w-full"
                    onClick={() => setIsMobileFilterOpen(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            {/* Product Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {filteredProducts.length} Products
                  </span>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="flex-1 sm:flex-none">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="price-low-high">
                          Price: Low to High
                        </SelectItem>
                        <SelectItem value="price-high-low">
                          Price: High to Low
                        </SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="rating">Rating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="hidden sm:flex border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "rounded-none",
                        viewMode === "grid" ? "bg-muted" : ""
                      )}
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "rounded-none",
                        viewMode === "list" ? "bg-muted" : ""
                      )}
                      onClick={() => setViewMode("list")}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedCategories.length > 0 ||
                selectedColors.length > 0 ||
                selectedSizes.length > 0 ||
                priceRange[0] > 0 ||
                priceRange[1] < 10000) && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-sm font-medium">Active Filters:</span>

                    {selectedCategories.map((categoryId) => {
                      const category = categories.find(
                        (c) => c.id === categoryId
                      );
                      return category ? (
                        <div
                          key={categoryId}
                          className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full text-xs"
                        >
                          {category.name}
                          <button onClick={() => toggleCategory(categoryId)}>
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ) : null;
                    })}

                    {selectedColors.map((colorId) => {
                      const color = colors.find((c) => c.id === colorId);
                      return color ? (
                        <div
                          key={colorId}
                          className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full text-xs"
                        >
                          <span
                            className="w-3 h-3 rounded-full inline-block mr-1"
                            style={{ backgroundColor: color.value }}
                          ></span>
                          {color.name}
                          <button onClick={() => toggleColor(colorId)}>
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ) : null;
                    })}

                    {selectedSizes.map((sizeId) => {
                      const size = sizes.find((s) => s.id === sizeId);
                      return size ? (
                        <div
                          key={sizeId}
                          className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full text-xs"
                        >
                          Size: {size.name}
                          <button onClick={() => toggleSize(sizeId)}>
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ) : null;
                    })}

                    {(priceRange[0] > 0 || priceRange[1] < 10000) && (
                      <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full text-xs">
                        Price: {formatPrice(priceRange[0])} -{" "}
                        {formatPrice(priceRange[1])}
                        <button onClick={() => setPriceRange([0, 10000])}>
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-primary hover:text-primary/80 text-xs"
                    >
                      Clear All
                    </Button>
                  </div>
                </div>
              )}

              {/* Products */}
              {filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="text-muted-foreground mb-4">
                    <SlidersHorizontal className="h-12 w-12 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">
                      No products found
                    </h3>
                    <p>
                      Try adjusting your filters to find what you're looking
                      for.
                    </p>
                  </div>
                  <Button onClick={clearAllFilters}>Clear All Filters</Button>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <EnhancedProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex flex-col sm:flex-row gap-4 border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="relative w-full sm:w-48 h-48">
                        <Image
                          src={product.variants[0].image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                        {product.badge && (
                          <div
                            className={cn(
                              "absolute top-2 left-2 text-xs font-medium px-2 py-1 rounded text-white",
                              product.badge.color
                            )}
                          >
                            {product.badge.text}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 p-4 flex flex-col">
                        <div className="text-sm text-muted-foreground mb-1">
                          {product.category}
                        </div>
                        <Link
                          href={`/product/${product.id}`}
                          className="font-medium hover:underline"
                        >
                          {product.name}
                        </Link>

                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={cn(
                                  "w-3 h-3",
                                  i < product.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300 fill-gray-300"
                                )}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            ({product.reviewCount})
                          </span>
                        </div>

                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {product.description}
                        </p>

                        <div className="mt-auto pt-4 flex justify-between items-center">
                          <span className="font-semibold">
                            {formatPrice(product.basePrice)}
                          </span>
                          <div className="flex gap-2">
                            <Button size="sm">Add to Cart</Button>
                            <Button variant="outline" size="icon">
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" disabled>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-primary text-white"
                  >
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <span className="px-2">...</span>
                  <Button variant="outline" size="sm">
                    10
                  </Button>
                  <Button variant="outline" size="icon">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
