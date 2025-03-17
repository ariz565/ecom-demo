"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, Search, ShoppingCart, User, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [typewriterComplete, setTypewriterComplete] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const placeholderTexts = [
    "Search for shirts...",
    "Find the perfect jeans...",
    "Discover new arrivals...",
    "Explore collections...",
  ]
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0)
  const [currentPlaceholder, setCurrentPlaceholder] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!isSearchOpen) return

    let currentText = ""
    let charIndex = 0
    setIsTyping(true)

    const typeNextChar = () => {
      if (charIndex < placeholderTexts[currentPlaceholderIndex].length) {
        currentText += placeholderTexts[currentPlaceholderIndex][charIndex]
        setCurrentPlaceholder(currentText)
        charIndex++
        setTimeout(typeNextChar, 100)
      } else {
        setIsTyping(false)
        setTimeout(() => {
          setIsTyping(true)
          eraseText()
        }, 2000)
      }
    }

    const eraseText = () => {
      if (currentText.length > 0) {
        currentText = currentText.slice(0, -1)
        setCurrentPlaceholder(currentText)
        setTimeout(eraseText, 50)
      } else {
        setIsTyping(false)
        setCurrentPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length)
        setTimeout(() => {
          charIndex = 0
          setIsTyping(true)
          typeNextChar()
        }, 500)
      }
    }

    typeNextChar()

    return () => {
      setCurrentPlaceholder("")
    }
  }, [isSearchOpen, currentPlaceholderIndex])

  const toggleCategory = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory(null)
    } else {
      setActiveCategory(category)
    }
  }

  const categories = {
    clothing: ["T-Shirts", "Shirts", "Jeans", "Trousers", "Jackets", "Sweaters"],
    accessories: ["Watches", "Belts", "Sunglasses", "Ties", "Wallets"],
    footwear: ["Sneakers", "Formal Shoes", "Boots", "Sandals", "Loafers"],
  }

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-3",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] sm:w-[400px] bg-gradient-to-br from-background to-secondary/5"
              >
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="/" className="text-lg font-medium hover:text-primary transition-colors">
                    Home
                  </Link>
                  <div>
                    <button
                      onClick={() => toggleCategory("clothing")}
                      className="flex items-center justify-between w-full text-lg font-medium hover:text-primary transition-colors"
                    >
                      Clothing
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          activeCategory === "clothing" ? "rotate-180" : "",
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "grid gap-2 pl-4 mt-2 overflow-hidden transition-all",
                        activeCategory === "clothing" ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        {categories.clothing.map((item) => (
                          <Link
                            key={item}
                            href={`/category/${item.toLowerCase()}`}
                            className="block py-1 text-muted-foreground hover:text-primary transition-colors"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => toggleCategory("accessories")}
                      className="flex items-center justify-between w-full text-lg font-medium hover:text-primary transition-colors"
                    >
                      Accessories
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          activeCategory === "accessories" ? "rotate-180" : "",
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "grid gap-2 pl-4 mt-2 overflow-hidden transition-all",
                        activeCategory === "accessories" ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        {categories.accessories.map((item) => (
                          <Link
                            key={item}
                            href={`/category/${item.toLowerCase()}`}
                            className="block py-1 text-muted-foreground hover:text-primary transition-colors"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => toggleCategory("footwear")}
                      className="flex items-center justify-between w-full text-lg font-medium hover:text-primary transition-colors"
                    >
                      Footwear
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          activeCategory === "footwear" ? "rotate-180" : "",
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "grid gap-2 pl-4 mt-2 overflow-hidden transition-all",
                        activeCategory === "footwear" ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        {categories.footwear.map((item) => (
                          <Link
                            key={item}
                            href={`/category/${item.toLowerCase()}`}
                            className="block py-1 text-muted-foreground hover:text-primary transition-colors"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Link href="/about" className="text-lg font-medium hover:text-primary transition-colors">
                    About
                  </Link>
                  <Link href="/contact" className="text-lg font-medium hover:text-primary transition-colors">
                    Contact
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex flex-col items-center md:items-start py-2">
              <span className="text-xl md:text-2xl font-bold tracking-tight text-[#1A1A1A] uppercase relative">
                THE BRAND&apos;S
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C9A87A] to-transparent"></span>
              </span>
              <span className="text-sm md:text-base font-light tracking-[0.3em] text-[#1A1A1A] uppercase">STORE</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
                Clothing
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="grid gap-1 p-2">
                  {categories.clothing.map((item) => (
                    <Link
                      key={item}
                      href={`/category/${item.toLowerCase()}`}
                      className="block px-3 py-2 hover:bg-muted rounded-md transition-colors"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
                Accessories
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="grid gap-1 p-2">
                  {categories.accessories.map((item) => (
                    <Link
                      key={item}
                      href={`/category/${item.toLowerCase()}`}
                      className="block px-3 py-2 hover:bg-muted rounded-md transition-colors"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
                Footwear
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="grid gap-1 p-2">
                  {categories.footwear.map((item) => (
                    <Link
                      key={item}
                      href={`/category/${item.toLowerCase()}`}
                      className="block px-3 py-2 hover:bg-muted rounded-md transition-colors"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/new-arrivals" className="text-sm font-medium hover:text-primary transition-colors">
              New Arrivals
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <div className={cn("transition-all duration-300 overflow-hidden", isSearchOpen ? "w-64" : "w-0")}>
              <div className="relative">
                <Input
                  ref={searchInputRef}
                  type="search"
                  placeholder={currentPlaceholder}
                  className="pr-8"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onBlur={() => {
                    if (!searchText) {
                      setIsSearchOpen(false)
                    }
                  }}
                />
                {isTyping && (
                  <span className="absolute right-10 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary animate-blink"></span>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => {
                    setIsSearchOpen(false)
                    setSearchText("")
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsSearchOpen(true)
                setTimeout(() => {
                  searchInputRef.current?.focus()
                }, 100)
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
            <Button variant="ghost" size="icon" className="relative animate-bounce-subtle">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                3
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

