"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Settings,
  ShoppingCart,
  Sparkles,
  Zap,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { useSidebar } from "@/hooks/use-sidebar";
import type { ProductType } from "@/components/ui/product-card";

const navLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Shop",
    href: "#",
    megamenu: true,
    categories: [
      {
        name: "Clothing",
        items: [
          { name: "T-Shirts", href: "/category/t-shirts" },
          { name: "Shirts", href: "/category/shirts" },
          { name: "Polos", href: "/category/polos" },
          { name: "Pants", href: "/category/pants" },
          { name: "Jeans", href: "/category/jeans" },
          { name: "Shorts", href: "/category/shorts" },
        ],
      },
      {
        name: "Outerwear",
        items: [
          { name: "Jackets", href: "/category/jackets" },
          { name: "Coats", href: "/category/coats" },
          { name: "Sweaters", href: "/category/sweaters" },
          { name: "Hoodies", href: "/category/hoodies" },
          { name: "Blazers", href: "/category/blazers" },
        ],
      },
      {
        name: "Accessories",
        items: [
          { name: "Watches", href: "/category/watches" },
          { name: "Belts", href: "/category/belts" },
          { name: "Wallets", href: "/category/wallets" },
          { name: "Sunglasses", href: "/category/sunglasses" },
          { name: "Bags", href: "/category/bags" },
        ],
      },
      {
        name: "Footwear",
        items: [
          { name: "Sneakers", href: "/category/sneakers" },
          { name: "Formal Shoes", href: "/category/formal-shoes" },
          { name: "Boots", href: "/category/boots" },
          { name: "Sandals", href: "/category/sandals" },
        ],
      },
    ],
  },
  {
    title: "Collections",
    href: "#",
    dropdown: [
      { name: "Summer Essentials", href: "/collections/summer-essentials" },
      { name: "Office Attire", href: "/collections/office-attire" },
      { name: "Weekend Casual", href: "/collections/weekend-casual" },
      { name: "Active Wear", href: "/collections/active-wear" },
    ],
  },
  {
    title: "New Arrivals",
    href: "/new-arrivals",
    badge: "New",
  },
  {
    title: "Best Sellers",
    href: "/best-sellers",
  },
  {
    title: "Sale",
    href: "/sale",
    badge: "Hot",
  },
];

export default function EnhancedNavbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ProductType[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { openSidebar } = useSidebar();
  const [username, setUsername] = useState("Guest");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMegaMenu(null);
    setActiveDropdown(null);
  }, [pathname]);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Mock search functionality
  useEffect(() => {
    // In a real app, this would be an API call
    if (searchQuery.length > 2) {
      // Simulate API delay
      const timer = setTimeout(() => {
        // Mock results
        setSearchResults([
          {
            id: 101,
            name: "Premium Denim Jacket",
            basePrice: 4999,
            category: "Outerwear",
            description:
              "Stylish denim jacket perfect for layering in any season.",
            badges: [{ text: "Limited Time", color: "bg-red-500" }],
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
                ],
                sizes: [{ name: "M", price: 4999, stock: 15 }],
              },
            ],
          },
          {
            id: 201,
            name: "Classic Oxford Shirt",
            basePrice: 3499,
            category: "Shirts",
            description: "Timeless Oxford shirt crafted from premium cotton.",
            badges: [{ text: "Best Seller", color: "bg-primary" }],
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
                ],
                sizes: [{ name: "M", price: 3499, stock: 32 }],
              },
            ],
          },
        ]);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would navigate to search results page
    console.log("Search for:", searchQuery);
    setSearchOpen(false);
  };

  // Toggle mega menu
  const toggleMegaMenu = (title: string) => {
    if (activeMegaMenu === title) {
      setActiveMegaMenu(null);
    } else {
      setActiveMegaMenu(title);
      setActiveDropdown(null);
    }
  };

  // Toggle dropdown
  const toggleDropdown = (title: string) => {
    if (activeDropdown === title) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(title);
      setActiveMegaMenu(null);
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white shadow-md py-2"
            : "bg-white/80 backdrop-blur-md py-4"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-10">
              <div className="flex items-center">
                <h1 className="text-2xl font-serif font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  THE BRAND&apos;S
                </h1>
                <span className="ml-1 text-xs uppercase tracking-widest font-light">
                  Store
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <div key={link.title} className="relative group">
                  {link.megamenu ? (
                    <button
                      className={cn(
                        "px-3 py-2 text-sm font-medium rounded-md flex items-center transition-colors",
                        activeMegaMenu === link.title
                          ? "text-primary"
                          : "text-gray-700 hover:text-primary hover:bg-gray-100/80"
                      )}
                      onClick={() => toggleMegaMenu(link.title)}
                    >
                      {link.title}
                      <ChevronDown
                        className={cn(
                          "ml-1 h-4 w-4 transition-transform",
                          activeMegaMenu === link.title ? "rotate-180" : ""
                        )}
                      />
                      {link.badge && (
                        <Badge
                          variant="secondary"
                          className="ml-1 px-1.5 py-0.5 text-[10px]"
                        >
                          {link.badge}
                        </Badge>
                      )}
                    </button>
                  ) : link.dropdown ? (
                    <button
                      className={cn(
                        "px-3 py-2 text-sm font-medium rounded-md flex items-center transition-colors",
                        activeDropdown === link.title
                          ? "text-primary"
                          : "text-gray-700 hover:text-primary hover:bg-gray-100/80"
                      )}
                      onClick={() => toggleDropdown(link.title)}
                    >
                      {link.title}
                      <ChevronDown
                        className={cn(
                          "ml-1 h-4 w-4 transition-transform",
                          activeDropdown === link.title ? "rotate-180" : ""
                        )}
                      />
                      {link.badge && (
                        <Badge
                          variant="secondary"
                          className="ml-1 px-1.5 py-0.5 text-[10px]"
                        >
                          {link.badge}
                        </Badge>
                      )}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        "px-3 py-2 text-sm font-medium rounded-md flex items-center transition-colors",
                        pathname === link.href
                          ? "text-primary"
                          : "text-gray-700 hover:text-primary hover:bg-gray-100/80"
                      )}
                    >
                      {link.title}
                      {link.badge && (
                        <Badge
                          variant={
                            link.badge === "Hot" ? "destructive" : "secondary"
                          }
                          className="ml-1 px-1.5 py-0.5 text-[10px]"
                        >
                          {link.badge}
                        </Badge>
                      )}
                    </Link>
                  )}

                  {/* Mega Menu */}
                  {link.megamenu && (
                    <AnimatePresence>
                      {activeMegaMenu === link.title && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 w-screen bg-white shadow-xl rounded-b-xl border-t z-50"
                          style={{ marginLeft: "calc(-50vw + 50%)" }}
                        >
                          <div className="container mx-auto p-6 grid grid-cols-4 gap-8">
                            {link.categories?.map((category) => (
                              <div key={category.name}>
                                <h3 className="font-medium text-gray-900 mb-4">
                                  {category.name}
                                </h3>
                                <ul className="space-y-2">
                                  {category.items.map((item) => (
                                    <li key={item.name}>
                                      <Link
                                        href={item.href}
                                        className="text-gray-600 hover:text-primary transition-colors"
                                        onClick={() => setActiveMegaMenu(null)}
                                      >
                                        {item.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                            <div className="col-span-1">
                              <div className="relative h-full rounded-lg overflow-hidden">
                                <Image
                                  src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=300&h=400&auto=format&fit=crop"
                                  alt="Featured Collection"
                                  fill
                                  className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                                  <h3 className="text-white font-bold mb-2">
                                    Summer Collection
                                  </h3>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="bg-white/20 backdrop-blur-sm border-white text-white hover:bg-white hover:text-black w-full"
                                  >
                                    Shop Now
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 py-3 px-6 flex justify-between items-center rounded-b-xl">
                            <div className="flex items-center gap-6">
                              <Link
                                href="/new-arrivals"
                                className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary"
                                onClick={() => setActiveMegaMenu(null)}
                              >
                                <Sparkles className="h-4 w-4" />
                                New Arrivals
                              </Link>
                              <Link
                                href="/best-sellers"
                                className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary"
                                onClick={() => setActiveMegaMenu(null)}
                              >
                                <TrendingUp className="h-4 w-4" />
                                Best Sellers
                              </Link>
                              <Link
                                href="/sale"
                                className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary"
                                onClick={() => setActiveMegaMenu(null)}
                              >
                                <Zap className="h-4 w-4" />
                                Sale Items
                              </Link>
                            </div>
                            <Button
                              variant="link"
                              size="sm"
                              className="text-primary"
                              onClick={() => setActiveMegaMenu(null)}
                            >
                              Close
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  {/* Dropdown Menu */}
                  {link.dropdown && (
                    <AnimatePresence>
                      {activeDropdown === link.title && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md border mt-1 z-50"
                        >
                          <ul className="py-1">
                            {link.dropdown.map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-1">
              {/* Search */}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>

              {/* Wishlist */}
              <Button variant="ghost" size="icon" className="relative" asChild>
                <Link href="/wishlist">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Wishlist</span>
                  {wishlist.length > 0 && (
                    <Badge
                      variant="secondary"
                      className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-[10px]"
                    >
                      {wishlist.length}
                    </Badge>
                  )}
                </Link>
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => openSidebar("cart")}
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Cart</span>
                {cart.items.length > 0 && (
                  <Badge
                    variant="secondary"
                    className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-[10px]"
                  >
                    {cart.items.length}
                  </Badge>
                )}
              </Button>

              {/* User */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/account/profile"
                      className="flex items-center cursor-pointer"
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/account/orders"
                      className="flex items-center cursor-pointer"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      <span>Orders</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/wishlist"
                      className="flex items-center cursor-pointer"
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      <span>Wishlist</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/account/settings"
                      className="flex items-center cursor-pointer"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-xl flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex flex-col">
                  <h2 className="font-semibold text-lg">Menu</h2>
                  <p className="text-sm text-gray-500">Hello, {username}!</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <nav className="flex flex-col p-4">
                  {navLinks.map((link) => (
                    <div key={link.title} className="py-1">
                      {link.megamenu || link.dropdown ? (
                        <div className="mb-2">
                          <button
                            className="flex items-center justify-between w-full py-2 text-left"
                            onClick={() => {
                              if (link.megamenu) {
                                toggleMegaMenu(link.title);
                              } else if (link.dropdown) {
                                toggleDropdown(link.title);
                              }
                            }}
                          >
                            <span className="font-medium">{link.title}</span>
                            <ChevronDown
                              className={cn(
                                "h-5 w-5 transition-transform",
                                activeMegaMenu === link.title ||
                                  activeDropdown === link.title
                                  ? "rotate-180"
                                  : ""
                              )}
                            />
                          </button>

                          {/* Mobile Mega Menu */}
                          {link.megamenu && activeMegaMenu === link.title && (
                            <div className="ml-4 mt-2 space-y-4">
                              {link.categories?.map((category) => (
                                <div key={category.name} className="mb-4">
                                  <h3 className="font-medium text-gray-900 mb-2">
                                    {category.name}
                                  </h3>
                                  <ul className="space-y-2 ml-2">
                                    {category.items.map((item) => (
                                      <li key={item.name}>
                                        <Link
                                          href={item.href}
                                          className="text-gray-600 hover:text-primary block py-1"
                                          onClick={() =>
                                            setMobileMenuOpen(false)
                                          }
                                        >
                                          {item.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Mobile Dropdown */}
                          {link.dropdown && activeDropdown === link.title && (
                            <ul className="ml-4 mt-2 space-y-2">
                              {link.dropdown.map((item) => (
                                <li key={item.name}>
                                  <Link
                                    href={item.href}
                                    className="text-gray-600 hover:text-primary block py-1"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={link.href}
                          className={cn(
                            "block py-2 font-medium",
                            pathname === link.href
                              ? "text-primary"
                              : "text-gray-900"
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.title}
                          {link.badge && (
                            <Badge
                              variant={
                                link.badge === "Hot"
                                  ? "destructive"
                                  : "secondary"
                              }
                              className="ml-2 px-1.5 py-0.5 text-[10px]"
                            >
                              {link.badge}
                            </Badge>
                          )}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
              <div className="p-4 border-t">
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/account/login">Sign In</Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link href="/account/register">Register</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50 pt-20"
            onClick={() => setSearchOpen(false)}
          >
            <div
              className="bg-white p-4 max-w-4xl mx-auto rounded-lg shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearchSubmit} className="relative">
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search for products..."
                  className="w-full pl-10 pr-4 py-3 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setSearchOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </form>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="mt-4 max-h-[60vh] overflow-y-auto">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Search Results
                  </h3>
                  <div className="space-y-4">
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-md"
                        onClick={() => setSearchOpen(false)}
                      >
                        <div className="relative w-16 h-16 bg-gray-100 rounded">
                          <Image
                            src={
                              product.variants[0].images[0] ||
                              "/placeholder.svg"
                            }
                            alt={product.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {product.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {product.category}
                          </p>
                          <p className="text-sm font-medium text-primary">
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
                  <div className="mt-4 text-center">
                    <Button
                      variant="link"
                      className="text-primary"
                      onClick={handleSearchSubmit}
                    >
                      View all results
                    </Button>
                  </div>
                </div>
              )}

              {searchQuery.length > 0 && searchResults.length === 0 && (
                <div className="mt-4 text-center py-8">
                  <p className="text-gray-500">
                    No results found for "{searchQuery}"
                  </p>
                </div>
              )}

              {searchQuery.length === 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Popular Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Shirts",
                      "Jackets",
                      "Denim",
                      "Sneakers",
                      "Watches",
                      "Summer Collection",
                    ].map((term) => (
                      <Button
                        key={term}
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                        onClick={() => setSearchQuery(term)}
                      >
                        {term}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Helper function to format price
function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}
