"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
  ChevronDown,
  Home,
  Grid,
  Heart,
  Package,
  Zap,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

// Add type for search results
type ProductType = {
  id: number;
  name: string;
  basePrice: number;
  category: string;
  discount?: number;
  variants: {
    color: string;
    colorName: string;
    colorCode: string;
    images: string[];
  }[];
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [typewriterComplete, setTypewriterComplete] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const [username, setUsername] = useState("Guest");

  // Add search results state
  const [searchResults, setSearchResults] = useState<ProductType[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const placeholderTexts = [
    "Search for shirts...",
    "Find the perfect jeans...",
    "Discover new arrivals...",
    "Explore collections...",
  ];
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isSearchOpen) return;

    let currentText = "";
    let charIndex = 0;
    setIsTyping(true);

    const typeNextChar = () => {
      if (charIndex < placeholderTexts[currentPlaceholderIndex].length) {
        currentText += placeholderTexts[currentPlaceholderIndex][charIndex];
        setCurrentPlaceholder(currentText);
        charIndex++;
        setTimeout(typeNextChar, 100);
      } else {
        setIsTyping(false);
        setTimeout(() => {
          setIsTyping(true);
          eraseText();
        }, 2000);
      }
    };

    const eraseText = () => {
      if (currentText.length > 0) {
        currentText = currentText.slice(0, -1);
        setCurrentPlaceholder(currentText);
        setTimeout(eraseText, 50);
      } else {
        setIsTyping(false);
        setCurrentPlaceholderIndex(
          (prev) => (prev + 1) % placeholderTexts.length
        );
        setTimeout(() => {
          charIndex = 0;
          setIsTyping(true);
          typeNextChar();
        }, 500);
      }
    };

    typeNextChar();

    return () => {
      setCurrentPlaceholder("");
    };
  }, [isSearchOpen, currentPlaceholderIndex]);

  const toggleCategory = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory(null);
    } else {
      setActiveCategory(category);
    }
  };

  // Updated shop categories based on enhanced-navbar
  const shopCategories = {
    clothing: [
      { name: "T-Shirts", href: "/category/t-shirts" },
      { name: "Shirts", href: "/category/shirts" },
      { name: "Polos", href: "/category/polos" },
      { name: "Jeans", href: "/category/jeans" },
      { name: "Trousers", href: "/category/trousers" },
      { name: "Jackets", href: "/category/jackets" },
    ],
    outerwear: [
      { name: "Jackets", href: "/category/jackets" },
      { name: "Coats", href: "/category/coats" },
      { name: "Sweaters", href: "/category/sweaters" },
      { name: "Hoodies", href: "/category/hoodies" },
      { name: "Blazers", href: "/category/blazers" },
    ],
    accessories: [
      { name: "Watches", href: "/category/watches" },
      { name: "Belts", href: "/category/belts" },
      { name: "Wallets", href: "/category/wallets" },
      { name: "Sunglasses", href: "/category/sunglasses" },
      { name: "Bags", href: "/category/bags" },
    ],
    footwear: [
      { name: "Sneakers", href: "/category/sneakers" },
      { name: "Formal Shoes", href: "/category/formal-shoes" },
      { name: "Boots", href: "/category/boots" },
      { name: "Sandals", href: "/category/sandals" },
      { name: "Loafers", href: "/category/loafers" },
    ],
  };

  // Collections dropdown items
  const collections = [
    { name: "Summer Essentials", href: "/collections/summer-essentials" },
    { name: "Office Attire", href: "/collections/office-attire" },
    { name: "Weekend Casual", href: "/collections/weekend-casual" },
    { name: "Active Wear", href: "/collections/active-wear" },
  ];

  // Add mock search functionality
  useEffect(() => {
    if (searchText.length > 2) {
      setIsSearching(true);

      // Simulate API delay
      const timer = setTimeout(() => {
        // Mock results - replace with actual API call in production
        setSearchResults([
          {
            id: 101,
            name: "Premium Denim Jacket",
            basePrice: 4999,
            category: "Outerwear",
            discount: 40,
            variants: [
              {
                color: "blue",
                colorName: "Indigo Blue",
                colorCode: "#3b5998",
                images: [
                  "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=400&h=500&auto=format&fit=crop",
                ],
              },
            ],
          },
          {
            id: 201,
            name: "Classic Oxford Shirt",
            basePrice: 3499,
            category: "Shirts",
            variants: [
              {
                color: "blue",
                colorName: "Sky Blue",
                colorCode: "#87CEEB",
                images: [
                  "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=400&h=500&auto=format&fit=crop",
                ],
              },
            ],
          },
          {
            id: 301,
            name: "Premium Leather Wallet",
            basePrice: 1999,
            category: "Accessories",
            discount: 35,
            variants: [
              {
                color: "brown",
                colorName: "Tan Brown",
                colorCode: "#A47551",
                images: [
                  "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=400&h=500&auto=format&fit=crop",
                ],
              },
            ],
          },
        ]);
        setIsSearching(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchText]);

  // Add search form submit handler
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText.trim().length > 0) {
      // In a real app, you would navigate to search results page
      console.log("Search for:", searchText);
      window.location.href = `/search?q=${encodeURIComponent(searchText)}`;
    }
    setIsSearchOpen(false);
  };

  // Add price formatter
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm py-2"
            : "bg-transparent py-3"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo on the left */}
            <Link
              href="/"
              className="flex flex-col items-center md:items-start py-2"
            >
              <span className="text-xl md:text-2xl font-bold tracking-tight text-[#1A1A1A] uppercase relative">
                THE BRAND&apos;S
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C9A87A] to-transparent"></span>
              </span>
              <span className="text-sm md:text-base font-light tracking-[0.3em] text-[#1A1A1A] uppercase">
                STORE
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {/* Home Link */}
              <Link
                href="/"
                className={cn(
                  "text-sm font-medium hover:text-primary transition-colors",
                  pathname === "/" ? "text-primary" : ""
                )}
              >
                Home
              </Link>

              {/* Shop Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
                  Shop
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="grid gap-1 p-2">
                    <h3 className="px-3 py-1 text-xs font-medium text-muted-foreground">
                      Clothing
                    </h3>
                    {shopCategories.clothing.slice(0, 4).map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 hover:bg-muted rounded-md transition-colors text-sm"
                      >
                        {item.name}
                      </Link>
                    ))}
                    <h3 className="px-3 py-1 text-xs font-medium text-muted-foreground mt-1">
                      Outerwear
                    </h3>
                    {shopCategories.outerwear.slice(0, 3).map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 hover:bg-muted rounded-md transition-colors text-sm"
                      >
                        {item.name}
                      </Link>
                    ))}
                    <div className="p-2 mt-1 border-t">
                      <Link
                        href="/shop"
                        className="block px-2 py-2 text-sm text-primary hover:bg-primary/5 rounded-md transition-colors text-center"
                      >
                        View All Categories
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Collections Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
                  Collections
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="grid gap-1 p-2">
                    {collections.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 hover:bg-muted rounded-md transition-colors text-sm"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* New Arrivals Link */}
              <Link
                href="/new-arrivals"
                className={cn(
                  "text-sm font-medium hover:text-primary transition-colors flex items-center",
                  pathname === "/new-arrivals" ? "text-primary" : ""
                )}
              >
                New Arrivals
                <Badge
                  variant="secondary"
                  className="ml-1.5 px-1.5 py-0 text-[10px]"
                >
                  New
                </Badge>
              </Link>

              {/* Best Sellers Link */}
              <Link
                href="/best-sellers"
                className={cn(
                  "text-sm font-medium hover:text-primary transition-colors",
                  pathname === "/best-sellers" ? "text-primary" : ""
                )}
              >
                Best Sellers
              </Link>

              {/* Sale Link */}
              <Link
                href="/sale"
                className={cn(
                  "text-sm font-medium hover:text-primary transition-colors flex items-center",
                  pathname === "/sale" ? "text-primary" : ""
                )}
              >
                Sale
                <Badge
                  variant="destructive"
                  className="ml-1.5 px-1.5 py-0 text-[10px]"
                >
                  Hot
                </Badge>
              </Link>
            </nav>

            {/* Desktop Search and Icons AND Mobile Menu Trigger (moved to the right) */}
            <div className="flex items-center gap-4">
              {/* Desktop Search and Account/Cart icons */}
              <div className="hidden md:flex items-center gap-4">
                <div
                  className={cn(
                    "transition-all duration-300 overflow-hidden relative",
                    isSearchOpen ? "w-64" : "w-0"
                  )}
                >
                  <div className="relative">
                    <form onSubmit={handleSearchSubmit}>
                      <Input
                        ref={searchInputRef}
                        type="search"
                        placeholder={currentPlaceholder}
                        className="pr-8 bg-transparent border-secondary/30 focus:border-primary"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onBlur={() => {
                          if (!searchText && !searchResults.length) {
                            setTimeout(() => setIsSearchOpen(false), 200);
                          }
                        }}
                      />
                    </form>
                    {isTyping && (
                      <span className="absolute right-10 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary animate-blink"></span>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchText("");
                        setSearchResults([]);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Search Results Dropdown */}
                  {searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-lg rounded-md overflow-hidden z-50 max-h-[60vh] overflow-y-auto">
                      <div className="p-2">
                        <h3 className="text-xs font-medium text-gray-500 px-2 mb-2">
                          Search Results
                        </h3>
                        <div className="space-y-2">
                          {searchResults.map((product) => (
                            <Link
                              key={product.id}
                              href={`/product/${product.id}`}
                              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md"
                              onClick={() => {
                                setIsSearchOpen(false);
                                setSearchText("");
                                setSearchResults([]);
                              }}
                            >
                              <div className="relative w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                <Image
                                  src={
                                    product.variants[0].images[0] ||
                                    "/placeholder.svg"
                                  }
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-gray-900 truncate">
                                  {product.name}
                                </h4>
                                <p className="text-xs text-gray-500">
                                  {product.category}
                                </p>
                                <p className="text-xs font-medium text-primary">
                                  {product.discount
                                    ? formatPrice(
                                        product.basePrice -
                                          (product.basePrice *
                                            product.discount) /
                                            100
                                      )
                                    : formatPrice(product.basePrice)}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-2 pt-2 border-t border-gray-100 text-center">
                          <Button
                            variant="link"
                            size="sm"
                            className="text-primary text-xs h-8"
                            onClick={handleSearchSubmit}
                          >
                            View all results for "{searchText}"
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* No Results Message */}
                  {searchText.length > 2 &&
                    searchResults.length === 0 &&
                    !isSearching && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-lg rounded-md overflow-hidden z-50">
                        <div className="py-6 text-center">
                          <p className="text-sm text-gray-500">
                            No results found for "{searchText}"
                          </p>
                        </div>
                      </div>
                    )}

                  {/* Popular Searches - show only when search is open but no query entered */}
                  {isSearchOpen && searchText.length === 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-lg rounded-md overflow-hidden z-50 p-3">
                      <h3 className="text-xs font-medium text-gray-500 mb-2">
                        Popular Searches
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Shirts",
                          "Jackets",
                          "Denim",
                          "Sneakers",
                          "Watches",
                        ].map((term) => (
                          <Button
                            key={term}
                            variant="outline"
                            size="sm"
                            className="rounded-full text-xs h-7 px-3"
                            onClick={() => {
                              setSearchText(term);
                              searchInputRef.current?.focus();
                            }}
                          >
                            {term}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsSearchOpen(true);
                    setTimeout(() => {
                      searchInputRef.current?.focus();
                    }, 100);
                  }}
                  className={isSearchOpen ? "hidden" : ""}
                >
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative animate-bounce-subtle"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Cart</span>
                  <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                    3
                  </span>
                </Button>
              </div>

              {/* Mobile Cart Button */}
              <div className="md:hidden flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative animate-bounce-subtle"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                    3
                  </span>
                </Button>

                {/* Mobile Menu Hamburger - moved to right */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="w-[300px] sm:w-[400px] bg-gradient-to-br from-background to-secondary/5 p-0"
                  >
                    {/* User greeting header */}
                    <div className="flex items-center justify-between p-4 border-b">
                      <div className="flex flex-col">
                        <h2 className="font-semibold text-lg">Menu</h2>
                        <p className="text-sm text-gray-500">
                          Hello, {username}!
                        </p>
                      </div>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <X className="h-5 w-5" />
                        </Button>
                      </SheetTrigger>
                    </div>

                    {/* Navigation items */}
                    <div className="overflow-y-auto flex-1 h-[calc(100vh-160px)]">
                      <nav className="flex flex-col gap-4 p-4">
                        {/* Home Link */}
                        <Link
                          href="/"
                          className="text-lg font-medium hover:text-primary transition-colors"
                        >
                          Home
                        </Link>

                        {/* Shop Category */}
                        <div>
                          <button
                            onClick={() => toggleCategory("shop")}
                            className="flex items-center justify-between w-full text-lg font-medium hover:text-primary transition-colors"
                          >
                            Shop
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 transition-transform",
                                activeCategory === "shop" ? "rotate-180" : ""
                              )}
                            />
                          </button>
                          <div
                            className={cn(
                              "grid gap-2 pl-4 mt-2 overflow-hidden transition-all",
                              activeCategory === "shop"
                                ? "grid-rows-[1fr] opacity-100"
                                : "grid-rows-[0fr] opacity-0"
                            )}
                          >
                            <div className="overflow-hidden">
                              <div className="mb-2">
                                <span className="font-medium text-sm">
                                  Clothing
                                </span>
                                <div className="pl-2 mt-1 space-y-1">
                                  {shopCategories.clothing.map((item) => (
                                    <Link
                                      key={item.name}
                                      href={item.href}
                                      className="block py-1 text-muted-foreground hover:text-primary transition-colors"
                                    >
                                      {item.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>

                              <div className="mb-2">
                                <span className="font-medium text-sm">
                                  Outerwear
                                </span>
                                <div className="pl-2 mt-1 space-y-1">
                                  {shopCategories.outerwear.map((item) => (
                                    <Link
                                      key={item.name}
                                      href={item.href}
                                      className="block py-1 text-muted-foreground hover:text-primary transition-colors"
                                    >
                                      {item.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>

                              <div className="mb-2">
                                <span className="font-medium text-sm">
                                  Accessories
                                </span>
                                <div className="pl-2 mt-1 space-y-1">
                                  {shopCategories.accessories.map((item) => (
                                    <Link
                                      key={item.name}
                                      href={item.href}
                                      className="block py-1 text-muted-foreground hover:text-primary transition-colors"
                                    >
                                      {item.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>

                              <div className="mb-2">
                                <span className="font-medium text-sm">
                                  Footwear
                                </span>
                                <div className="pl-2 mt-1 space-y-1">
                                  {shopCategories.footwear.map((item) => (
                                    <Link
                                      key={item.name}
                                      href={item.href}
                                      className="block py-1 text-muted-foreground hover:text-primary transition-colors"
                                    >
                                      {item.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Collections Category */}
                        <div>
                          <button
                            onClick={() => toggleCategory("collections")}
                            className="flex items-center justify-between w-full text-lg font-medium hover:text-primary transition-colors"
                          >
                            Collections
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 transition-transform",
                                activeCategory === "collections"
                                  ? "rotate-180"
                                  : ""
                              )}
                            />
                          </button>
                          <div
                            className={cn(
                              "grid gap-2 pl-4 mt-2 overflow-hidden transition-all",
                              activeCategory === "collections"
                                ? "grid-rows-[1fr] opacity-100"
                                : "grid-rows-[0fr] opacity-0"
                            )}
                          >
                            <div className="overflow-hidden">
                              {collections.map((item) => (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  className="block py-1 text-muted-foreground hover:text-primary transition-colors"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* New Arrivals Link */}
                        <Link
                          href="/new-arrivals"
                          className="text-lg font-medium hover:text-primary transition-colors flex items-center"
                        >
                          New Arrivals
                          <Badge
                            variant="secondary"
                            className="ml-2 px-1.5 py-0 text-[10px]"
                          >
                            New
                          </Badge>
                        </Link>

                        {/* Best Sellers Link */}
                        <Link
                          href="/best-sellers"
                          className="text-lg font-medium hover:text-primary transition-colors flex items-center"
                        >
                          Best Sellers
                        </Link>

                        {/* Sale Link */}
                        <Link
                          href="/sale"
                          className="text-lg font-medium hover:text-primary transition-colors flex items-center"
                        >
                          Sale
                          <Badge
                            variant="destructive"
                            className="ml-2 px-1.5 py-0 text-[10px]"
                          >
                            Hot
                          </Badge>
                        </Link>
                      </nav>
                    </div>

                    {/* Sign in/register buttons at the bottom */}
                    <div className="p-4 border-t mt-auto">
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/account/login">Sign In</Link>
                        </Button>
                        <Button className="w-full" asChild>
                          <Link href="/account/register">Register</Link>
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>

          {/* Mobile Search Bar - Below Logo */}
          <div className="md:hidden mb-2 mt-1">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pr-10 pl-10 bg-transparent border-secondary/20 focus:border-primary rounded-full text-sm"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={() => setSearchText("")}
                  type="button"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </form>

            {/* Mobile Search Results */}
            {searchResults.length > 0 && searchText.length > 2 && (
              <div className="absolute left-4 right-4 bg-white shadow-lg rounded-md mt-1 z-40 max-h-[50vh] overflow-y-auto">
                <div className="p-3">
                  <h3 className="text-xs font-medium text-gray-500 mb-2">
                    Search Results
                  </h3>
                  <div className="space-y-3">
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        className="flex items-center gap-3 py-2"
                      >
                        <div className="relative w-14 h-14 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={
                              product.variants[0].images[0] ||
                              "/placeholder.svg"
                            }
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {product.name}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {product.category}
                          </p>
                          <p className="text-xs font-medium text-primary">
                            {product.discount
                              ? formatPrice(
                                  product.basePrice -
                                    (product.basePrice * product.discount) / 100
                                )
                              : formatPrice(product.basePrice)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t text-center">
                    <Button
                      variant="link"
                      size="sm"
                      className="text-primary text-xs"
                      onClick={handleSearchSubmit}
                    >
                      View all results
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] md:hidden z-50">
        <div className="flex justify-around items-center h-16 px-2">
          <Link
            href="/"
            className={cn(
              "flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors",
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Home
              className={cn("h-5 w-5", pathname === "/" && "fill-primary")}
            />
            <span className="text-xs mt-1">Home</span>
          </Link>

          <Link
            href="/categories"
            className={cn(
              "flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors",
              pathname.includes("/categories")
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <Grid
              className={cn(
                "h-5 w-5",
                pathname.includes("/categories") &&
                  "fill-primary/10 stroke-primary"
              )}
            />
            <span className="text-xs mt-1">Categories</span>
          </Link>

          <Link
            href="/wishlist"
            className={cn(
              "flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors",
              pathname === "/wishlist"
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <Heart
              className={cn(
                "h-5 w-5",
                pathname === "/wishlist" && "fill-primary/10 stroke-primary"
              )}
            />
            <span className="text-xs mt-1">Wishlist</span>
          </Link>

          <Link
            href="/account"
            className={cn(
              "flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors",
              pathname === "/account" ? "text-primary" : "text-muted-foreground"
            )}
          >
            <User
              className={cn(
                "h-5 w-5",
                pathname === "/account" && "stroke-primary"
              )}
            />
            <span className="text-xs mt-1">Account</span>
          </Link>
        </div>
      </div>
    </>
  );
}
