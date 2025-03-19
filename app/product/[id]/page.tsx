"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Minus,
  Plus,
  Heart,
  Share2,
  ShoppingBag,
  Truck,
  RotateCcw,
  Shield,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import EnhancedProductCard, {
  Product,
} from "@/components/enhanced-product-card";
import AnimatedBackground from "@/components/animated-background";

// Sample product data (would come from an API in a real app)
const product: Product = {
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
    "A premium cotton Oxford shirt perfect for both casual and formal occasions. Features a comfortable fit and durable construction that will last for years. Made from 100% organic cotton that's soft on your skin and environmentally friendly.",
  rating: 4.5,
  reviewCount: 128,
};

// Sample related products
const relatedProducts: Product[] = [
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
    ],
    description:
      "Formal dress shirt made from premium cotton. Features a classic fit and elegant design for professional settings.",
    rating: 4.4,
    reviewCount: 74,
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
    ],
    description:
      "Slim fit polo shirt made from premium cotton pique. Features a classic design and comfortable fit for casual wear.",
    rating: 4.4,
    reviewCount: 82,
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

// Sample reviews
const reviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    rating: 5,
    date: "2 months ago",
    comment:
      "Excellent quality shirt. The fabric is soft and comfortable, and the fit is perfect. I've already ordered another one in a different color.",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Priya Patel",
    rating: 4,
    date: "1 month ago",
    comment:
      "Good quality shirt, but the sizing runs a bit large. I would recommend ordering a size down from your usual size.",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Amit Kumar",
    rating: 5,
    date: "3 weeks ago",
    comment:
      "Very comfortable and stylish. The material is breathable and perfect for summer. Will definitely buy more.",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Neha Singh",
    rating: 3,
    date: "2 weeks ago",
    comment:
      "The shirt is good quality, but the color is slightly different from what's shown in the picture. Still a decent purchase though.",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
];

// Define proper param types for Next.js dynamic routes
type ProductPageProps = {
  params: {
    id: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
};

// Update the component signature to match Next.js page component requirements
export default function ProductPage({
  params,
  searchParams,
}: ProductPageProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(
    product.variants[0].sizes[0].name
  );
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const selectedVariant = product.variants[selectedVariantIndex];
  const selectedSizeInfo = selectedVariant.sizes.find(
    (size) => size.name === selectedSize
  );
  const currentPrice = selectedSizeInfo
    ? selectedSizeInfo.price
    : product.basePrice;
  const currentStock = selectedSizeInfo ? selectedSizeInfo.stock : 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= currentStock) {
      setQuantity(newQuantity);
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  // Generate additional images for the gallery
  const productImages = [
    selectedVariant.image,
    `https://images.unsplash.com/photo-${
      selectedVariantIndex === 0
        ? "1598033129183-c4f50c736f10"
        : selectedVariantIndex === 1
        ? "1594938298603-c8148c4dae35"
        : "1603252109303-2751441dd157"
    }?q=80&w=400&h=500&auto=format&fit=crop&view=back`,
    `https://images.unsplash.com/photo-${
      selectedVariantIndex === 0
        ? "1598033129183-c4f50c736f10"
        : selectedVariantIndex === 1
        ? "1594938298603-c8148c4dae35"
        : "1603252109303-2751441dd157"
    }?q=80&w=400&h=500&auto=format&fit=crop&view=detail`,
    `https://images.unsplash.com/photo-${
      selectedVariantIndex === 0
        ? "1598033129183-c4f50c736f10"
        : selectedVariantIndex === 1
        ? "1594938298603-c8148c4dae35"
        : "1603252109303-2751441dd157"
    }?q=80&w=400&h=500&auto=format&fit=crop&view=model`,
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <AnimatedBackground />

      <main className="flex-1 pt-16">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 py-4">
          <div className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:text-primary">
              Shop
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/category/${product.category.toLowerCase()}`}
              className="hover:text-primary"
            >
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span>{product.name}</span>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg border">
                <Image
                  src={productImages[activeImageIndex] || "/placeholder.svg"}
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

              <div className="grid grid-cols-4 gap-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    className={cn(
                      "relative aspect-square overflow-hidden rounded-md border",
                      activeImageIndex === index ? "ring-2 ring-primary" : ""
                    )}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - View ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : i < product.rating
                            ? "text-yellow-400 fill-yellow-400 opacity-50"
                            : "text-gray-300 fill-gray-300"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <div className="text-2xl font-bold">
                {formatPrice(currentPrice)}
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">
                    Color: {selectedVariant.colorName}
                  </p>
                  <div className="flex gap-2">
                    {product.variants.map((variant, index) => (
                      <button
                        key={variant.color}
                        className={cn(
                          "w-10 h-10 rounded-full transition-all",
                          selectedVariantIndex === index
                            ? "ring-2 ring-offset-2 ring-primary"
                            : ""
                        )}
                        style={{ backgroundColor: variant.color }}
                        onClick={() => {
                          setSelectedVariantIndex(index);
                          // Reset size to first available size in new variant
                          setSelectedSize(variant.sizes[0].name);
                          setActiveImageIndex(0);
                        }}
                        aria-label={`Select color ${variant.colorName}`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Size:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedVariant.sizes.map((size) => (
                      <button
                        key={size.name}
                        className={cn(
                          "px-4 py-2 border rounded text-sm transition-all",
                          selectedSize === size.name
                            ? "bg-primary text-white border-primary"
                            : "border-gray-300 hover:border-primary",
                          size.stock === 0 && "opacity-50 cursor-not-allowed"
                        )}
                        onClick={() =>
                          size.stock > 0 && setSelectedSize(size.name)
                        }
                        disabled={size.stock === 0}
                      >
                        {size.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-sm">
                  <span
                    className={cn(
                      "font-medium",
                      currentStock < 5 ? "text-red-500" : "text-green-600"
                    )}
                  >
                    {currentStock > 0
                      ? `${currentStock} in stock`
                      : "Out of stock"}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-none"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1 || currentStock === 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-none"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= currentStock || currentStock === 0}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    className="flex-1"
                    size="lg"
                    disabled={currentStock === 0}
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={handleWishlist}
                  >
                    <Heart
                      className={cn(
                        "h-5 w-5",
                        isWishlisted ? "fill-red-500 text-red-500" : ""
                      )}
                    />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Free Shipping</p>
                    <p className="text-sm text-muted-foreground">
                      On orders over ₹999
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <RotateCcw className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Easy Returns</p>
                    <p className="text-sm text-muted-foreground">
                      30-day return policy
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Secure Checkout</p>
                    <p className="text-sm text-muted-foreground">
                      100% secure payment
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
                <TabsTrigger
                  value="description"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent px-4 py-2"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent px-4 py-2"
                >
                  Details & Care
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent px-4 py-2"
                >
                  Reviews ({reviews.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="pt-6">
                <div className="prose max-w-none">
                  <p>{product.description}</p>
                  <p>
                    This versatile shirt can be dressed up with a blazer for a
                    formal look or worn casually with jeans. The breathable
                    fabric ensures comfort throughout the day, while the durable
                    construction means it will remain a staple in your wardrobe
                    for years to come.
                  </p>
                  <p>
                    Our Oxford shirts are crafted with attention to detail,
                    featuring reinforced stitching at stress points and premium
                    buttons that won't break or fall off easily. The classic
                    design ensures it will never go out of style.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="details" className="pt-6">
                <div className="prose max-w-none">
                  <h3 className="text-lg font-medium">Product Details</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>100% premium cotton</li>
                    <li>Button-down collar</li>
                    <li>Regular fit</li>
                    <li>Long sleeves with buttoned cuffs</li>
                    <li>Front button closure</li>
                    <li>Chest pocket</li>
                    <li>Machine washable</li>
                  </ul>

                  <h3 className="text-lg font-medium mt-6">Size & Fit</h3>
                  <p>Model is 6'0" and wears size M</p>

                  <h3 className="text-lg font-medium mt-6">
                    Care Instructions
                  </h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Machine wash cold with similar colors</li>
                    <li>Do not bleach</li>
                    <li>Tumble dry low</li>
                    <li>Warm iron if needed</li>
                    <li>Do not dry clean</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="pt-6">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Customer Reviews</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4",
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : i < product.rating
                                  ? "text-yellow-400 fill-yellow-400 opacity-50"
                                  : "text-gray-300 fill-gray-300"
                              )}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Based on {product.reviewCount} reviews
                        </span>
                      </div>
                    </div>

                    <Button>Write a Review</Button>
                  </div>

                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b pb-6">
                        <div className="flex items-start gap-4">
                          <div className="relative w-10 h-10 rounded-full overflow-hidden">
                            <Image
                              src={review.avatar || "/placeholder.svg"}
                              alt={review.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{review.name}</h4>
                              <span className="text-sm text-muted-foreground">
                                {review.date}
                              </span>
                            </div>

                            <div className="flex mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    "h-4 w-4",
                                    i < review.rating
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300 fill-gray-300"
                                  )}
                                />
                              ))}
                            </div>

                            <p className="mt-2 text-sm">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <EnhancedProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
